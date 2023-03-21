import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { reports } from '../../../appRoutesPath';
import SvgHelpOne from '../../../icons/SvgHelpOne';
import SvgLogout from '../../../icons/SvgLogOut';
import SvgSearch from '../../../icons/SvgSearch';
import SvgSetting from '../../../icons/SvgSetting';
import SvgUser from '../../../icons/SvgUser';
import { routesPath } from '../../../routes/routesPath';
import { AppDispatch, RootState } from '../../../store';
import { WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
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
  const [isSearch, setSearch] = useState(false);
  const { pathname } = useLocation();

  // initial api call
  useEffect(() => {
    dispatch(permissionMiddleWare());
    dispatch(userProfileMiddleWare());
  }, []);

  const { permission, is_plan, isProfile, plan_id } = useSelector(
    ({ permissionReducers, userProfileReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        is_plan: permissionReducers.is_plan,
        isProfile: userProfileReducers.profile,
        plan_id: permissionReducers.plan_id,
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
    <div className={styles.overAll}>
      {isLogOutLoader && <Loader />}
      <Flex row center between>
        <Flex row center>
          <img
          style={{objectFit: 'contain'}}
            alt="logo"
            src={
              process.env.REACT_APP_HOME_URL +
              'static/images/new_zita_white.png'
            }
            className={styles.logoStyle}
          />
          {is_plan ? (
            <LinkWrapper onClick={clearTab} to={is_plan ? '/' : accountPath}>
              <Text
                color="white"
                className={cx('linkTitle', { navFocusColor: pathname === '/' })}
              >
                My Dashboard
              </Text>
            </LinkWrapper>
          ) : (
            <Text
              color="white"
              className={cx('linkTitle', { navFocusColor: pathname === '/' })}
            >
              My Dashboard
            </Text>
          )}
          {is_plan ? (
            <LinkWrapper
              onClick={clearTab}
              to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
            >
              <Text
                color="white"
                className={cx('linkTitle', {
                  navFocusColor:
                    pathname === '/job_list' ||
                    pathname.includes('/jobs') ||
                    pathname.includes('/job_view') ||
                    pathname.includes('/zita_match_candidate') ||
                    pathname.includes('/applicant_pipe_line'),
                })}
              >
                My Job Postings
              </Text>
            </LinkWrapper>
          ) : (
            <Text
              color="white"
              className={cx('linkTitle', {
                navFocusColor:
                  pathname === '/job_list' ||
                  pathname.includes('/jobs') ||
                  pathname.includes('/job_view') ||
                  pathname.includes('/zita_match_candidate') ||
                  pathname.includes('/applicant_pipe_line'),
              })}
            >
              My Job Postings
            </Text>
          )}
          {permission.includes('my_database') && (
            <>
              {is_plan ? (
                <LinkWrapper
                  to={is_plan ? routesPath.MYDATABASE : accountPath}
                  onClick={clearTab}
                >
                  <Text
                    color="white"
                    className={cx('linkTitle', {
                      navFocusColor: pathname === '/mydatabase',
                    })}
                  >
                    My Database
                  </Text>
                </LinkWrapper>
              ) : (
                <Text
                  color="white"
                  className={cx('linkTitle', {
                    navFocusColor: pathname === '/mydatabase',
                  })}
                >
                  My Database
                </Text>
              )}
            </>
          )}
          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (
                <LinkWrapper
                  onClick={clearTab}
                  to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                >
                  <Text
                    color="white"
                    className={cx('profileStyle', {
                      navFocusColor: pathname === '/talent_sourcing',
                    })}
                  >
                    Talent Sourcing
                  </Text>
                </LinkWrapper>
              ) : (
                <Text
                  color="white"
                  className={cx('profileStyle', {
                    navFocusColor: pathname === '/talent_sourcing',
                  })}
                >
                  Talent Sourcing
                </Text>
              )}
            </>
          )}
          {permission.includes('bulkImport_candidates') && (
            <>
              {is_plan ? (
                <LinkWrapper
                  onClick={clearTab}
                  to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                >
                  <Text
                    color="white"
                    className={cx('profileStyle', {
                      navFocusColor: pathname === '/bulk_import',
                    })}
                  >
                    Bulk Import Candidates
                  </Text>
                </LinkWrapper>
              ) : (
                <Text
                  color="white"
                  className={cx('profileStyle', {
                    navFocusColor: pathname === '/bulk_import',
                  })}
                >
                  Bulk Import Candidates
                </Text>
              )}
            </>
          )}
          {plan_id !== 1 && (
            <>
              {is_plan ? (
                <LinkWrapper
                  onClick={clearTab}
                  to={is_plan ? reports : accountPath}
                >
                  <Text
                    color="white"
                    className={cx('profileStyle', {
                      navFocusColor: pathname.includes('/reports'),
                    })}
                  >
                    Reports
                  </Text>
                </LinkWrapper>
              ) : (
                <Text
                  color="white"
                  className={cx('profileStyle', {
                    navFocusColor: pathname.includes('/reports'),
                  })}
                >
                  Reports
                </Text>
              )}
            </>
          )}
          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (
                <LinkWrapper
                  onClick={clearTab}
                  to={is_plan ? routesPath.CALENDAR : accountPath}
                >
                  <Text
                    color="white"
                    className={cx('profileStyle', {
                      navFocusColor: pathname === '/calendar',
                    })}
                  >
                    Calendar
                  </Text>
                </LinkWrapper>
              ) : (
                <Text
                  color="white"
                  className={cx('profileStyle', {
                    navFocusColor: pathname === '/calendar',
                  })}
                >
                  Calendar
                </Text>
              )}
            </>
          )}
        </Flex>

        <Flex row center>
          {isSearch ? (
            <div className={cx('svgInputDiv')}>
              <NavigationSearch />
            </div>
          ) : (
            <div
              role={'button'}
              tabIndex={-1}
              onKeyDown={() => {}}
              onClick={() => setSearch(true)}
              title="Search"
              className={cx('svgMargin', { noPointer: !is_plan })}
            >
              <SvgSearch fill={WHITE} height={20} width={20} />
            </div>
          )}

          {!is_plan ? (
            <div title="Contact Support" className={cx('svgMargin')}>
              <SvgHelpOne fill={WHITE} height={20} width={20} />
            </div>
          ) : (
            <a
              rel="noreferrer"
              target={'_blank'}
              href={'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8'}
            >
              <div title="Contact Support" className={cx('svgMargin')}>
                <SvgHelpOne fill={WHITE} height={20} width={20} />
              </div>
            </a>
          )}
          <div
            style={{ position: 'relative' }}
            className={cx('svgMargin', {
              navFocusColor: pathname === '/change_password',
              noPointer: !is_plan
            })}
          >
            <Notification />
          </div>
          {is_plan ? (
            <LinkWrapper onClick={clearTab} to={'/account_setting/settings'}>
              <div
                title="Account Settings"
                className={cx('svgMargin', {
                  navFocusColor: pathname.includes('/account_setting'),
                })}
              >
                <SvgSetting height={20} width={20} />
              </div>
            </LinkWrapper>
          ) : (
            <div
              title="Account Settings"
              className={cx('svgMargin', {
                navFocusColor: pathname.includes('/account_setting'),
              })}
            >
              <SvgSetting height={20} width={20} />
            </div>
          )}

          <LinkWrapper onClick={handleLogout}>
            <div title="Logout" className={cx('svgMargin')}>
              <SvgLogout height={20} width={20} />
            </div>
          </LinkWrapper>
          <div className={cx('svgUserStyle')}>
            {isEmpty(isProfile) || isProfile === 'default.jpg' ? (
              <SvgUser height={30} width={32} />
            ) : (
              <img
              style={{objectFit: 'cover'}}
                src={mediaPath + isProfile}
                alt="profile"
                className={styles.candiProfile}
              />
            )}
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBar;
