import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { reports } from '../../../appRoutesPath';
import SvgCalendar from '../../../icons/SvgDBCalandar';
import SvgDashboard from '../../../icons/SvgDashboard';
import SvgCollapse from '../../../icons/SvgCollapse';
import SvgExpand from '../../../icons/SvgExpant';
import SvgJobPost from '../../../icons/SvgJobPost';
import SvgSetting from '../../../icons/SvgSetting';
import SvgUserSearch from '../../../icons/SvgUserSearch';
import SvgImport from '../../../icons/SvgImport';
import SvgReport from '../../../icons/SvgReport';
import Button from '../../../uikit/Button/Button';
import SvgDb from '../../../icons/SvgDb';
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
import styles from './notification.module.css';
import NavigationSearch from './NavigationSearch';
import Notification from './Notification';

const cx = classNames.bind(styles);

const Sidebar = (props) => {
  const dispatch: AppDispatch = useDispatch();
  //const [Select, setSelect] = useState('/');
  const [Expent, setExpent] = useState();
  const { pathname } = useLocation();
  const handleNavigate = (val) => {
    // setSelect(val);
  };

  useEffect(() => {
    const toggle: any =
      sessionStorage.getItem('EmpToggle') === null
        ? '0'
        : sessionStorage.getItem('EmpToggle');
    setExpent(toggle);
  }, [Expent]);

  const handlecheck = (val) => {
    setExpent(val);
    props.data();
    sessionStorage.setItem('EmpToggle', val);
  };

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

  const accountPath = '/account_setting/settings';
  const clearTab = () => {
    sessionStorage.removeItem('superUserTab');
    sessionStorage.removeItem('superUserFalseTab');
  };

  return (
    <>
      {console.log('check', Expent)}
      <div className={Expent === '0' ? styles.sidebar : styles.sidebarmini}>
        <ul>
          {is_plan ? (
            <li className={pathname === '/' ? styles.select_row : ''}>
              <LinkWrapper
                className={styles.hoverview}
                onClick={clearTab}
                to={is_plan ? '/' : accountPath}
              >
                <SvgDashboard fill={'#581845'} />
                <Text
                  onClick={() => handleNavigate(1)}
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  My Dashboard
                </Text>
              </LinkWrapper>
            </li>
          ) : (
            <li className={pathname === '/' ? styles.select_row : ''}>
              <SvgDashboard fill={'#581845'} />
              <Text
                onClick={() => handleNavigate(1)}
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                My Dashboard
              </Text>
            </li>
          )}

          {is_plan ? (
            <li
              className={
                pathname === '/job_list' ||
                pathname.includes('/jobs') ||
                pathname.includes('/job_view') ||
                pathname.includes('/zita_match_candidate') ||
                pathname.includes('/applicant_pipe_line')
                  ? styles.select_row
                  : ''
              }
            >
              <LinkWrapper
                className={styles.hoverview}
                onClick={clearTab}
                to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
              >
                <SvgJobPost fill={'#581845'} />
                <Text
                  onClick={() => handleNavigate(2)}
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Job Postings
                </Text>
              </LinkWrapper>
            </li>
          ) : (
            <li
              className={
                pathname === '/job_list' ||
                pathname.includes('/jobs') ||
                pathname.includes('/job_view') ||
                pathname.includes('/zita_match_candidate') ||
                pathname.includes('/applicant_pipe_line')
                  ? styles.select_row
                  : ''
              }
            >
              <SvgJobPost fill={'#581845'} />
              <Text
                onClick={() => handleNavigate(2)}
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Job Postings
              </Text>
            </li>
          )}

          {permission.includes('my_database') && (
            <>
              {is_plan ? (
                <li
                  className={
                    pathname === '/mydatabase' ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    to={is_plan ? routesPath.MYDATABASE : accountPath}
                    onClick={clearTab}
                  >
                    <SvgDb fill={'#581845'} />
                    <Text
                      onClick={() => handleNavigate(3)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Database
                    </Text>
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  className={
                    pathname === '/mydatabase' ? styles.select_row : ''
                  }
                >
                  <SvgDb fill={'#581845'} />
                  <Text
                    onClick={() => handleNavigate(3)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Database
                  </Text>
                </li>
              )}
            </>
          )}

          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (
                <li
                  className={
                    pathname === '/talent_sourcing' ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                  >
                    <SvgUserSearch fill={'#none'} />
                    <Text
                      onClick={() => handleNavigate(4)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Talent Sourcing
                    </Text>
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  className={
                    pathname === '/talent_sourcing' ? styles.select_row : ''
                  }
                >
                  <Text
                    onClick={() => handleNavigate(4)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Talent Sourcing
                  </Text>
                </li>
              )}
            </>
          )}

          {permission.includes('bulkImport_candidates') && (
            <>
              {is_plan ? (
                <li
                  className={
                    pathname === '/bulk_import' ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                  >
                    <SvgImport fill={'none'} />
                    <Text
                      onClick={() => handleNavigate(5)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Import Candidates
                    </Text>
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  className={
                    pathname === '/bulk_import' ? styles.select_row : ''
                  }
                >
                  <Text
                    onClick={() => handleNavigate(5)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Import Candidates
                  </Text>
                </li>
              )}
            </>
          )}

          {plan_id !== 1 && (
            <>
              {is_plan ? (
                <li
                  className={
                    pathname.includes('/reports') ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? reports : accountPath}
                  >
                    <SvgReport fill={'none'} />
                    <Text
                      onClick={() => handleNavigate(6)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Reports
                    </Text>
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  className={
                    pathname.includes('/reports') ? styles.select_row : ''
                  }
                >
                  <SvgReport fill={'none'} />
                  <Text
                    onClick={() => handleNavigate(6)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Reports
                  </Text>
                </li>
              )}
            </>
          )}

          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (
                <li
                  className={pathname === '/calendar' ? styles.select_row : ''}
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? routesPath.CALENDAR : accountPath}
                  >
                    <SvgCalendar fill={'none'} height={22} width={22} />
                    <Text
                      onClick={() => handleNavigate(7)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Calendar
                    </Text>
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  className={pathname === '/calendar' ? styles.select_row : ''}
                >
                  <SvgCalendar fill={'#581845'} height={22} width={22} />
                  <Text
                    onClick={() => handleNavigate(7)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Calendar
                  </Text>
                </li>
              )}
            </>
          )}
        </ul>

        <ul className={styles.setting}>
          {is_plan ? (
            <li>
              <LinkWrapper onClick={clearTab} to={'/account_setting/settings'}>
                <SvgSetting fill={'#581845'} />
                <Text
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Settings
                </Text>
              </LinkWrapper>
            </li>
          ) : (
            <li>
              <Text
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Settings
              </Text>
            </li>
          )}
          <li>
            {Expent === '0' ? (
              <div>
                <Button
                  types="link"
                  className={styles.collapse}
                  onClick={() => handlecheck('1')}
                >
                  <SvgCollapse fill={'#581845'} height={20} width={20} />
                </Button>
              </div>
            ) : (
              <Button
                className={styles.Expend}
                types="link"
                onClick={() => handlecheck('0')}
              >
                <SvgExpand fill={'#581845'} height={20} width={20} />
              </Button>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
