import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { reports } from '../../../appRoutesPath';
import SvgCalendar from '../../../icons/SvgDBCalandar';
import SvgDashboard from '../../../icons/SvgDashboard';
import useUnsavedChangesWarning from '../../common/useUnsavedChangesWarning';
import SvgCollapse from '../../../icons/SvgCollapse';
import SvgExpand from '../../../icons/SvgExpant';
import SvgJobPost from '../../../icons/SvgJobPost';
import SvgSetting from '../../../icons/SvgSetting';
import SvgUserSearch from '../../../icons/SvgUserSearch';
import SvgImport from '../../../icons/SvgImport';
import { LEAVE_THIS_SITE } from '../../constValue';
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
 type props ={
  changes: (arg: boolean) => void;
  data: () => void;
 }
  
const Sidebar = ({changes,data }:props) => {
  const dispatch: AppDispatch = useDispatch();
  //const [Select, setSelect] = useState('/');
  const [Expent, setExpent] = useState();
  const { pathname } = useLocation();
  const history = useHistory();
  const changeurl= sessionStorage.getItem('changingurl');
  const handleNavigate = (val) => {
    
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
    data();
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
 
const clearTabs = (e) => {  
  e.stopPropagation();
  if(window.confirm(LEAVE_THIS_SITE)) {
    history.push('/')
} else {
  e.preventDefault()
}
};
  return (
    <>

      {console.log('check plan', is_plan)}
      <div className={Expent === '0' ? styles.sidebar : styles.sidebarmini} style={{marginTop:'50px'}}>

        <ul>
          {is_plan ? (
                changes  ?
              ( <li className={pathname === '/' ? styles.select_row : ''}>
              <LinkWrapper
                className={styles.hoverview}
                onClick={clearTabs} 
              >
              <text style={{verticalAlign:'middle',marginLeft:'-6px'}}>
                <SvgDashboard   height={28} width={28} />
                </text>
                <Text
                  onClick={() => handleNavigate(1)}
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Dashboard
                </Text>
              </LinkWrapper>
            </li>):
           (<li className={pathname === '/' ? styles.select_row : ''}>
              <LinkWrapper
                className={styles.hoverview}
                onClick={clearTab}
                // onClick={changeurlss}
                to={is_plan   ?  '/' : accountPath}  
              >
              <text style={{verticalAlign:'middle',marginLeft:'-6px'}}>
                <SvgDashboard   height={28} width={28} />
                </text>
                <Text
                  onClick={() => handleNavigate(1)}
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Dashboard
                </Text>
              </LinkWrapper>
            </li>)
          ) : (

            <li className={pathname === '/' ? styles.select_row : ''}>
            <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
              >

            <text style={{verticalAlign:'middle',marginLeft:'-6px'}}>
              <SvgDashboard height={28} width={28} />
            </text>
              <Text
                onClick={() => handleNavigate(1)}
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Dashboard
              </Text>
            </a>
            </li>
          )}

          {is_plan ? ( changes?
          (<li
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
              onClick={clearTabs}
              to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
            >
            <text style={{verticalAlign:'middle'}}>
              <SvgJobPost height={22} width={22} />
            </text>
              <Text
                onClick={() => handleNavigate(2)}
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Job Postings
              </Text>
            </LinkWrapper>
          </li>):(<li
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
              <text style={{verticalAlign:'middle'}}>
                <SvgJobPost height={22} width={22} />
              </text>
                <Text
                  onClick={() => handleNavigate(2)}
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Job Postings
                </Text>
              </LinkWrapper>
            </li>)
            
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
            <a
            className={styles.hoverview}
            href={" "} 
            onClick={(e)=>{
              e.preventDefault();
            }}
          >
             <text style={{verticalAlign:'middle'}}>
             <SvgJobPost height={22} width={22} />
              </text>
              <Text
                onClick={() => handleNavigate(2)}
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Job Postings
              </Text>
              </a>
            </li>
          )}

          {permission.includes('my_database') && (
            <>
              {is_plan ? (changes?
              ( <li
                className={
                  pathname === '/mydatabase' ? styles.select_row : ''
                }
              >
                <LinkWrapper
                  className={styles.hoverview}
                  to={is_plan ? routesPath.MYDATABASE : accountPath}
                  onClick={clearTabs}
                >
                <text style={{verticalAlign:'top'}}>
                  <SvgDb width={16} height={16} />
                </text>
                  <Text
                    onClick={() => handleNavigate(3)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                  >
                    Database
                  </Text>
                </LinkWrapper>
              </li>):( <li
                  className={
                    pathname === '/mydatabase' ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    to={is_plan ? routesPath.MYDATABASE : accountPath}
                    onClick={clearTab}
                  >
                  <text style={{verticalAlign:'top'}}>
                    <SvgDb width={16} height={16} />
                  </text>
                    <Text
                      onClick={() => handleNavigate(3)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                    >
                      Database
                    </Text>
                  </LinkWrapper>
                </li>)
               
              ) : (
                <li
                  className={
                    pathname === '/mydatabase' ? styles.select_row : ''
                  }
                >
                <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
              >
                <text style={{verticalAlign:'middle'}}>
                  <SvgDb width={16} height={16}
                  
                  />
                  </text>
                  <Text
                    onClick={() => handleNavigate(3)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                  >
                    Database
                  </Text>
                  </a>
                </li>
              )}
            </>
          )}

          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (changes?
              (<li
                className={
                  pathname === '/talent_sourcing' ? styles.select_row : ''
                }
              >
                <LinkWrapper
                  className={styles.hoverview}
                  onClick={clearTabs}
                  to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                >
                <text style={{verticalAlign:'middle'}}>
                  <SvgUserSearch fill={'#581845'} width={22} height={22} />
                </text>
                  <Text
                    onClick={() => handleNavigate(4)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Talent Sourcing
                  </Text>
                </LinkWrapper>
              </li>):(<li
                  className={
                    pathname === '/talent_sourcing' ? styles.select_row : ''
                  }
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                  >
                  <text style={{verticalAlign:'middle'}}>
                    <SvgUserSearch fill={'#581845'} width={22} height={22} />
                  </text>
                    <Text
                      onClick={() => handleNavigate(4)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Talent Sourcing
                    </Text>
                  </LinkWrapper>
                </li>)
                
              ) : (
                <li
                  className={
                    pathname === '/talent_sourcing' ? styles.select_row : ''
                  }
                >
                <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
              >
                 <text style={{verticalAlign:'middle'}}>
                    <SvgUserSearch fill={'#581845'} width={22} height={22} />
                  </text>
                  <Text
                    onClick={() => handleNavigate(4)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Talent Sourcing
                  </Text>
                  </a>
                </li>
              )}
            </>
          )}

          {permission.includes('bulkImport_candidates') && (
            <>
              {is_plan ? (changes?
              (<li
                className={
                  pathname === '/bulk_import' ? styles.select_row : ''
                }
              >
                <LinkWrapper
                  className={styles.hoverview}
                  onClick={clearTabs}
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
              </li>):(<li
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
                </li>)
                
              ) : (
                <li
                  className={
                    pathname === '/bulk_import' ? styles.select_row : ''
                  }
                >
                <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
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
                  </a>
                </li>
              )}
            </>
          )}

          {plan_id !== 1 && (
            <>
              {is_plan ? (changes?
              (<li
                className={
                  pathname.includes('/reports') ? styles.select_row : ''
                }
              >
                <LinkWrapper
                  className={styles.hoverview}
                  onClick={clearTabs}
                  to={is_plan ? reports : accountPath}
                >
                  <SvgReport fill={'none'} />
                  <Text
                    onClick={() => handleNavigate(6)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                  >
                     Reports
                  </Text>
                </LinkWrapper>
              </li>):(<li
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
                      style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                    >
                       Reports
                    </Text>
                  </LinkWrapper>
                </li>)
                
              ) : (
                <li
                  className={
                    pathname.includes('/reports') ? styles.select_row : ''
                  }
                >
                <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
              >
                  <SvgReport fill={'none'}  />
                  <Text
                    onClick={() => handleNavigate(6)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px',marginLeft:'20px' }}
                  >
                    Reports
                  </Text>
                  </a>
                </li>
              )}
            </>
          )}

          {permission.includes('talent_sourcing') && (
            <>
              {is_plan ? (changes?
              (<li
                className={pathname === '/calendar' ? styles.select_row : ''}
              >
                <LinkWrapper
                  className={styles.hoverview}
                  onClick={clearTabs}
                  to={is_plan ? routesPath.CALENDAR : accountPath}
                >
                <text style={{marginLeft:"-2px"}}>
                  <SvgCalendar  height={22} width={22} />
                </text>
                  <Text
                    onClick={() => handleNavigate(7)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Calendar
                  </Text>
                </LinkWrapper>
              </li>):(<li
                  className={pathname === '/calendar' ? styles.select_row : ''}
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={clearTab}
                    to={is_plan ? routesPath.CALENDAR : accountPath}
                  >
                  <text style={{marginLeft:"-2px"}}>
                    <SvgCalendar  height={22} width={22} />
                  </text>
                    <Text
                      onClick={() => handleNavigate(7)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Calendar
                    </Text>
                  </LinkWrapper>
                </li>)
                
              ) : (
                <li
                  className={pathname === '/calendar' ? styles.select_row : ''}
                >
                <a
                className={styles.hoverview}
                href={" "} 
                onClick={(e)=>{
                  e.preventDefault();
                }}
              >
                <text style={{marginLeft:"-2px"}}>
                <SvgCalendar  height={22} width={22} />
                </text>  
                  <Text
                    onClick={() => handleNavigate(7)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845', marginRight: '10px' }}
                  >
                    Calendar
                  </Text>
                  </a>
                </li>
              )}
            </>
          )}
        </ul>

        <ul className={styles.setting} >
          {is_plan ? (<li style={{height:'35px',width:'145px',position:'relative',bottom:'25px'}}>
              <LinkWrapper onClick={clearTab} to={'/account_setting/settings'} >
              
                <SvgSetting fill={'#581845'}  height={20} width={20}  />
              
                <Text
                  className={Expent === '0' ? styles.text : styles.classpan}
                  color="primary"
                  style={{ color: '#581845', marginRight: '10px' }}
                >
                  Settings
                </Text>
              </LinkWrapper>
            </li>)
            
           : (
            <li>
            <a
            
            href={" "} 
            onClick={(e)=>{
              e.preventDefault();
            }}
          >
            <SvgSetting fill={'#581845'}  height={20} width={20}  />
              <Text
                className={Expent === '0' ? styles.text : styles.classpan}
                color="primary"
                style={{ color: '#581845', marginRight: '10px' }}
              >
                Settings
              </Text>
              </a>
            </li>
          )}
          <li >
            {Expent === '0' ? (
              <div style={{}} >
                <Button style={{height:'19px',width:'19px',position:'relative',bottom:'52px',left:'-12px'}}
                  types="link"
                  className={styles.collapse}
                  onClick={() => handlecheck('1')}
                >
                  <SvgCollapse  height={19} width={18} />
                </Button>
              </div>
            ) : (
              <Button
                 style={{left:'3px'}}
                className={styles.Expend}
                types="link"
                onClick={() => handlecheck('0')}
              >
                <SvgExpand width={19} height={18} />
              </Button>
            )}
          </li>
        </ul>
      </div>
     
    </>
  );
};

export default Sidebar;
