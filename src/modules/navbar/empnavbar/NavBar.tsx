import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { reports } from '../../../appRoutesPath';
import SvgHelp from '../../../icons/SvgHelp';
import SvgZitaLogo from '../../../icons/SvgZitaLogo';

import SvgProfile from '../../../icons/SvgProfile';
import SvgLock from '../../../icons/SvgLock';
import SvgSearch from '../../../icons/SvgSearch';
import SvgSetting from '../../../icons/SvgSetting';
import SvgUser from '../../../icons/SvgUser';
import { routesPath } from '../../../routes/routesPath';
import { AppDispatch, RootState } from '../../../store';
import { WHITE } from '../../../uikit/Colors/colors';
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

const NavBar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLogOutLoader, setLogOutLoader] = useState(false);
  //const [isSearch, setSearch] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const { pathname } = useLocation();

  // initial api call
  useEffect(() => {
    dispatch(permissionMiddleWare());
    dispatch(userProfileMiddleWare());
  }, []);

  const { permission, is_plan, isProfile, plan_id, email } = useSelector(
    ({ permissionReducers, userProfileReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        is_plan: permissionReducers.is_plan,
        isProfile: userProfileReducers.profile,
        plan_id: permissionReducers.plan_id,
        email: userProfileReducers.user.email,
      };
    },
  );

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
  const accountPath = '/account_setting/settings';
  const clearTab = () => {
    sessionStorage.removeItem('superUserTab');
    sessionStorage.removeItem('superUserFalseTab');
  };
  return (
    <>
      <div className={styles.overAll}>
        {console.log('sdsdsdsd', isOpen)}
        {isLogOutLoader && <Loader />}
        <Flex row center between className={styles.nav}>
          <Flex row center>
            <SvgZitaLogo />
          </Flex>

          <Flex row center>
            <div className={cx('svgInputDiv')}>
              <NavigationSearch />
            </div>

            {!is_plan ? (
              <div title="Contact Support" className={cx('svgMargin')}>
                <SvgHelp fill={'#581845'} height={25} width={25} />
              </div>
            ) : (
              <a
                rel="noreferrer"
                target={'_blank'}
                href={'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8'}
              >
                <div title="Contact Support" className={cx('svgMargin')}>
                  <SvgHelp fill={'#581845'} height={25} width={25} />
                </div>
              </a>
            )}

            <div
              style={{ position: 'relative' }}
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
                height: '50px',
                backgroundColor: '#581845',
                marginLeft: '10px',
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
                        <SvgUser fill={'#581845'} height={30} width={32} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.dropdown_item}>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgUser
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
                                  }}
                                >
                                  Profile
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
                              <SvgUser
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Profile
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgSetting
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
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
                              <SvgSetting
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Settings
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgLock
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
                                  }}
                                >
                                  Update Password
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
                              <SvgLock
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />

                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Update Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex style={{ color: '#FCC203', textAlign: 'center' }}>
                          You have logged in as
                        </Flex>
                        <Flex style={{ color: '#581845', textAlign: 'center' }}>
                          {email}
                        </Flex>
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
                        <LinkWrapper onClick={() => setOpen(!isOpen)}>
                          <img
                            style={{ objectFit: 'cover' }}
                            src={mediaPath + isProfile}
                            alt="profile"
                            className={styles.candiProfile}
                          />
                        </LinkWrapper>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={styles.dropdown_item}>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgUser
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
                                  }}
                                >
                                  Profile
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
                              <SvgUser
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Profile
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgSetting
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
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
                              <SvgSetting
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Settings
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          {is_plan ? (
                            <LinkWrapper
                              onClick={clearTab}
                              to={'/account_setting/settings'}
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                                <SvgLock
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
                                  }}
                                >
                                  Update Password
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
                              <SvgLock
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />

                              <span
                                style={{ color: '#581845', marginLeft: '15px' }}
                              >
                                Update Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex style={{ color: '#FCC203', textAlign: 'center' }}>
                          You have logged in as
                        </Flex>
                        <Flex style={{ color: '#581845', textAlign: 'center' }}>
                          {email}
                        </Flex>
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
