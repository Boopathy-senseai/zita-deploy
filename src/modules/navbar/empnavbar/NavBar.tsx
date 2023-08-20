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
type Props = {
update: () => void;};
const NavBar = ({update}) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLogOutLoader, setLogOutLoader] = useState(false);
  const [isSearch, setSearch] = useState("");
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

const passwordchange=()=>{
update();
}
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
        {isLogOutLoader && <Loader />}
        <Flex row center between className={styles.nav} style={{height:'45px'}}>
          <Flex row center>
            <SvgZitaLogo />
          </Flex>

          <Flex row center>
            <div className={cx('svgInputDiv')}>
              <NavigationSearch />
            </div>

            {!is_plan ? (
              <div title="Contact Support" className={cx('svgMargin')}>
                <SvgHelp fill={'#581845'} height={22} width={22} />
              </div>
            ) : (
              <a
                rel="noreferrer"
                target={'_blank'}
                href={'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8'}
              >
                <div title="Contact Support" className={cx('svgMargin')}>
                  <SvgHelp fill={'#581845'} height={22} width={22} />
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
                              <text style={{verticalAlign:'3px'}}>
                                <SvgUser
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                </text>
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
                            <text style={{verticalAlign:'3px'}}>
                              <SvgUser
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                            </text>
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
                              <text style={{verticalAlign:'3px'}}>
                                <SvgSetting
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                              </text>
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
                            <text style={{verticalAlign:'3px'}}>
                              <SvgSetting
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                            </text>
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
                            <Flex
                              onClick={passwordchange}
                               
                            >
                              <div
                                style={{ marginLeft: '-10px' }}
                                title="Account Settings"
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                              <text style={{verticalAlign:'3px'}}>
                                <SvgLock
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                </text>

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',
                                  }}
                                >
                                  {/* < UserProfile /> */}
                                  Update Password
                                  
                                </span>
                              </div>
                            </Flex>
                          ) : (
                            <div
                              title="Account Settings"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                              
                            >
                            <text style={{verticalAlign:'3px',cursor:"pointer"}}>
                              <SvgLock
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              </text>

                              <span
                                style={{ color: '#581845', marginLeft: '15px',cursor:"pointer" }}
                              >
                                {/* < UserProfile /> */}
                                Update Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex style={{ color: '#FCC203', textAlign: 'center',fontSize:'14px' }}>
                          You have logged in as
                        </Flex>
                        {user && 
                        <Flex style={{ color: '#581845', textAlign: 'center',paddingLeft:'15px',paddingRight:'15px' }}>
                          {user.email}
                        </Flex>
                        }
                        <div
                          style={{
                            textAlign: 'center',
                            marginBottom: '10px',
                            marginTop: '10px',
                            display:"flex",
                            justifyContent:"center"
                          }}
                        >
                          <Button
                            className={styles.Signot}
                            onClick={handleLogout}
                            style={{verticalAlign:'1px', display:'flex',justifyContent:'center', alignItems:'center'}}
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
                              <text style={{verticalAlign:'3px'}}>
                                <SvgUser
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                               </text> 
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
                            <text style={{verticalAlign:'3px'}}>
                              <SvgUser
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                            </text>
                              <span
                                style={{ color: '#581845', marginLeft: '15px'}}
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
                              <text style={{verticalAlign:'3px'}}>
                                <SvgSetting
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                </text>
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
                            <text style={{verticalAlign:'3px'}}>
                              <SvgSetting
                                fill={'#581845'}
                                height={20}
                                width={20}
                              />
                              </text>
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
                            <Flex
                              onClick={passwordchange}
                              
                            >
                              <div
                                style={{ marginLeft: '-10px',cursor:"pointer" }}
                                className={cx('svgMargin', {
                                  navFocusColor:
                                    pathname.includes('/account_setting'),
                                })}
                              >
                              <text style={{verticalAlign:'3px'}}>
                                <SvgLock
                                  fill={'#581845'}
                                  height={20}
                                  width={20}
                                />
                                </text>

                                <span
                                  style={{
                                    color: '#581845',
                                    marginLeft: '15px',cursor:"pointer"
                                  }}
                                >
                                  Update Password
                                </span>
                              </div>
                            </Flex>
                          ) : (
                            <div
                              title="Account Settings"
                              className={cx('svgMargin', {
                                navFocusColor:
                                  pathname.includes('/account_setting'),
                              })}
                            >
                            <text style={{verticalAlign:'3px',cursor:"pointer"}}  >
                              <SvgLock
                                fill={'#581845'}
                                height={20}
                                width={20}
                               
                              />
                            </text>

                              <span
                                style={{ color: '#581845', marginLeft: '15px',cursor:"pointer" }}
                              >
                                Update Password
                              </span>
                            </div>
                          )}
                        </Dropdown.Item>
                        <Dropdown.Divider />

                        <Flex style={{ color: '#FCC203', textAlign: 'center',fontSize:'14px'  }}>
                          You have logged in as
                        </Flex>
                        {user !== undefined && 
                     
                        <Flex style={{ color: '#581845', textAlign: 'center',paddingLeft:'15px',paddingRight:'15px' }}>
                          {user.email}
                        </Flex>
                           }
                        <div
                          style={{
                            textAlign: 'center',
                            marginBottom: '10px',
                            marginTop: '10px',
                            display:"flex",
                            justifyContent:"center"
                          }}
                        >
                        <LinkWrapper >
                        <Button  className={styles.Signot} onClick={handleLogout} style={{verticalAlign:'1px', display:'flex',justifyContent:'center', alignItems:'center'}} >Log out</Button>
                      </LinkWrapper>
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