import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { reports } from '../../../appRoutesPath';
import SvgHelp from '../../../icons/SvgHelp';
import SvgZitaLogo from '../../../icons/SvgZitaLogo';
import SvgSetting from '../../../icons/SvgSetting';
import SvgSettingnav from '../../../icons/SvgSettingnav';
import SvgLock from '../../../icons/SvgLock';
import SvgLocknav from '../../../icons/SvgLocknav';
import SvgSearch from '../../../icons/SvgSearch';
import SvgUser from '../../../icons/SvgUser';
import SvgUsernav from '../../../icons/SvgUsernav';
import { routesPath } from '../../../routes/routesPath';
import { AppDispatch, RootState } from '../../../store';
import { PRIMARY, WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Button from '../../../uikit/Button/Button';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';

import { userProfileMiddleWare } from '../../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import { mediaPath } from '../../constValue';
import { permissionMiddleWare } from '../../Login/store/middleware/loginMiddleWare';
import { logOutMiddleWare } from '../store/middleware/navbarmiddleware';

import styles from './navbar.module.css';
import NavigationSearch from './NavigationSearch';
import Notification from './Notification';

const cx = classNames.bind(styles);
type Props = {
  update: () => void;
};
const NavBar = ({ update }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLogOutLoader, setLogOutLoader] = useState(false);
  const [isSearch, setSearch] = useState('');
  const [isOpen, setOpen] = useState(true);

  const { pathname } = useLocation();

  // initial api call
  useEffect(() => {
    dispatch(permissionMiddleWare());
    dispatch(userProfileMiddleWare());
  }, []);

  const { permission, is_plan, isProfile, plan_id, user } = useSelector(
    ({ permissionReducers, userProfileReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        is_plan: permissionReducers.is_plan,
        isProfile: userProfileReducers.profile,
        plan_id: permissionReducers.plan_id,
        user: userProfileReducers.user,
      };
    },
  );

  const passwordchange = () => {
    update();
  };
  // logout function
  const handleLogout = () => {
    setLogOutLoader(true);
    dispatch(logOutMiddleWare()).then(() => {
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace(window.location.origin + '/login');
      setLogOutLoader(false);
    });
  };
  const imagefunction = (e) => {
    setOpen(!isOpen);
    e.preventDefault();
  };
  const accountPath = '/account_setting/settings';
  const clearTab = () => {
    sessionStorage.removeItem('superUserTab');
    sessionStorage.removeItem('superUserFalseTab');
  };
  return (
    <>
      <div className={styles.overAll}>
        {isLogOutLoader && <Loader />}
        <Flex
          row
          center
          between
          className={styles.nav}
          style={{ height: '45px' }}
        >
          <Flex row center>
            <SvgZitaLogo />
          </Flex>

          <Flex row center>
            <div className={cx('svgInputDiv')}>
              <NavigationSearch
                onButtonClick={update}
                onbuttonchange={imagefunction}
              />
            </div>

            {!is_plan ? (
              <div title="Contact Support" className={cx('svgMargin1')}>
                <SvgHelp fill={'#581845'} height={22} width={22} />
              </div>
            ) : (
              <a
                rel="noreferrer"
                target={'_blank'}
                href={'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8'}
              >
                <div title="Contact Support" className={cx('svgMargin1')}>
                  <SvgHelp fill={'#581845'} height={22} width={22} />
                </div>
              </a>
            )}

            <div
              style={{ position: 'relative', marginLeft: '5px' }}
              className={cx('svgMargin', {
                navFocusColor: pathname === '/change_password',
                noPointer: !is_plan,
              })}
            >
              <Notification />
            </div>

            <div
              style={{
                width: '1px',
                height: '30px',
                backgroundColor: '#581845',
                marginLeft: '15px',
              }}
            ></div>
            <div>
              <div className={cx('svgUserStyle')}>
                {isEmpty(isProfile) || isProfile === 'default.jpg' ? (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          backgroundColor: '#ffffff',
                          border: '#ffffff',
                          boxShadow: 'none',
                        }}
                      >
                        <SvgUser fill={'#581845'} height={28} width={30} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.dropdown_item}>
                        <Dropdown.Item
                          href="#"
                          style={{ width: '180px' }}
                        >
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{
                                  marginLeft: '-10px',
                                  padding: '3px 10px 3px 0px',
                                }}
                                title="Profile"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '3px' }}>
                                  <SvgUsernav
                                    fill={'#581845'}
                                    height={22}
                                    width={18}
                                  />
                                </text>
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    fontSize: '13px',
                                  }}
                                >
                                  Profile
                                </span>
                              </div>
                            </LinkWrapper>
                          ) : (
                            <div
                              title="Profile"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text
                                style={{
                                  verticalAlign: '3px',
                                  marginBottom: '-20px',
                                }}
                              >
                                <SvgUsernav
                                  fill={'#581845'}
                                  height={22}
                                  width={18}
                                />
                              </text>
                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  fontSize: '13px',
                                }}
                              >
                                Profile
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#" >
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{
                                  marginLeft: '-10px',
                                  padding: '3px 10px 3px 0px',
                                }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '2px' }}>
                                  <SvgSettingnav
                                    fill={'#581845'}
                                    height={22}
                                    width={18}
                                  />
                                </text>
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    fontSize: '13px',
                                  }}
                                >
                                  Settings
                                </span>
                              </div>
                            </LinkWrapper>
                          ) : (
                            <div
                              title="Account Settings"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text style={{ verticalAlign: '2px' }}>
                                <SvgSetting
                                  fill={'#581845'}
                                  height={22}
                                  width={18}
                                />
                              </text>
                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  fontSize: '13px',
                                }}
                              >
                                Settings
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#" >
                          {is_plan ? (
                            <Flex onClick={passwordchange}>
                              <div
                                style={{
                                  marginLeft: '-10px',
                                  padding: '3px 10px 3px 0px',
                                }}
                                title="Change Password"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '3px' }}>
                                  <SvgLocknav
                                    fill={'#581845'}
                                    height={22}
                                    width={18}
                                  />
                                </text>

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    fontSize: '13px',
                                  }}
                                >
                                  {/* < UserProfile /> */}
                                  Change Password
                                </span>
                              </div>
                            </Flex>
                          ) : (
                            <div
                              title="Change Password"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text
                                style={{
                                  verticalAlign: '3px',
                                  cursor: 'pointer',
                                }}
                              >
                                <SvgLocknav
                                  fill={'#581845'}
                                  height={22}
                                  width={18}
                                />
                              </text>

                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                }}
                              >
                                {/* < UserProfile /> */}
                                Change Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex
                          style={{
                            color: '#FCC203',
                            textAlign: 'center',
                            fontSize: '13px',
                          }}
                        >
                          You have logged in as
                        </Flex>
                        {user && (
                          <Flex
                            style={{
                              textAlign: 'center',
                              paddingLeft: '15px',
                              paddingRight: '15px',
                              fontSize: '13px',
                            }}
                          >
                            <Text
                              bold
                              style={{
                                // color: '#581845',
                                textAlign: 'center',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                fontSize: '13px',
                              }}
                            >
                              {user.first_name}{' '}
                            </Text>
                           <Text style={{color: "#581845"}} size={13}>
                           {user.email}
                            </Text> 
                          </Flex>
                        )}
                        <div
                          style={{
                            textAlign: 'center',
                            marginBottom: '10px',
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            className={styles.Signot}
                            onClick={handleLogout}
                            style={{
                              verticalAlign: '1px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            Log out
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                ) : (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{
                          backgroundColor: '#ffffff',
                          border: '#ffffff',
                          boxShadow: 'none',
                        }}
                      >
                        <a href={' '} onClick={imagefunction}>
                          <img
                            style={{ objectFit: 'cover' }}
                            src={mediaPath + isProfile}
                            alt="profile"
                            className={styles.candiProfile}
                          />
                        </a>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.dropdown_item}>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{
                                  marginLeft: '-10px',
                                  padding: '3px 10px 3px 0px',
                                }}
                                title="Profile"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '3px' }}>
                                  <SvgUsernav
                                    fill={'#581845'}
                                    height={22}
                                    width={18}
                                  />
                                </text>
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    fontSize: '13px',
                                  }}
                                >
                                  Profile
                                </span>
                              </div>
                            </LinkWrapper>
                          ) : (
                            <div
                              title="Profile"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text style={{ verticalAlign: '3px' }}>
                                <SvgUsernav
                                  fill={'#581845'}
                                  height={22}
                                  width={18}
                                />
                              </text>
                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  fontSize: '13px',
                                }}
                              >
                                Profile
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#" >
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{
                                  marginLeft: '-10px',
                                  padding: '3px 10px 3px 0px',
                                }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '2px' }}>
                                  <SvgSettingnav
                                    fill={'#581845'}
                                    height={18}
                                    width={18}
                                  />
                                </text>
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    fontSize: '13px',
                                  }}
                                >
                                  Settings
                                </span>
                              </div>
                            </LinkWrapper>
                          ) : (
                            <div
                              title="Account Settings"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text style={{ verticalAlign: '2px' }}>
                                <SvgSettingnav
                                  fill={'#581845'}
                                  height={18}
                                  width={14}
                                />
                              </text>
                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  fontSize: '13px',
                                }}
                              >
                                Settings
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#" >
                          {is_plan ? (
                            <Flex onClick={passwordchange}>
                              <div
                                title="Change Password"
                                style={{
                                  marginLeft: '-10px',
                                  cursor: 'pointer',
                                  padding: '3px 10px 3px 0px',
                                }}
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <text style={{ verticalAlign: '3px' }}>
                                  <SvgLocknav
                                    fill={'#581845'}
                                    height={22}
                                    width={18}
                                  />
                                </text>

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '10px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                  }}
                                >
                                  Change Password
                                </span>
                              </div>
                            </Flex>
                          ) : (
                            <div
                              title="Change Password"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                              <text
                                style={{
                                  verticalAlign: '3px',
                                  cursor: 'pointer',
                                }}
                              >
                                <SvgLocknav
                                  fill={'#581845'}
                                  height={22}
                                  width={18}
                                />
                              </text>

                              <span
                                style={{
                                  color: '#581845',
                                  marginLeft: '10px',
                                  cursor: 'pointer',
                                  fontSize: '13px',
                                }}
                              >
                                Change Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex
                          style={{
                            color: '#FCC203',
                            textAlign: 'center',
                            fontSize: '13px',
                          }}
                        >
                          You have logged in as
                        </Flex>
                        {user !== undefined && (
                          <Flex
                            style={{
                              color: '#581845',
                              textAlign: 'center',
                              paddingLeft: '15px',
                              paddingRight: '15px',
                              fontSize: '13px',
                            }}
                          >
                            <Text
                              bold
                              style={{
                                color: '#581845',
                                textAlign: 'center',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                fontSize: '13px',
                              }}
                            >
                              {user.first_name}{' '}
                            </Text>
                            {user.email}
                          </Flex>
                        )}
                        <div
                          style={{
                            textAlign: 'center',
                            marginBottom: '10px',
                            marginTop: '10px',
                          }}
                        >
                          <Button
                            className={styles.Signot}
                            onClick={handleLogout}
                            style={{ verticalAlign: '1px' }}
                          >
                            Log out
                          </Button>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </div>
          </Flex>
        </Flex>
      </div>
    </>
  );
};

export default NavBar;
