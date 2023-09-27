import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { meetingScheduler, reports } from '../../../appRoutesPath';
import SvgRight1 from '../../../icons/SvgRight1';
import SvgCommunication from '../../../icons/SvgCommunication';
import SvgBranding from '../../../icons/SvgBranding';
import SvgDashboard from '../../../icons/SvgDashboard';
import SvgExpand from '../../../icons/SvgExpant';
import SvgJobPost from '../../../icons/SvgJobPost';
import SvgSetting from '../../../icons/SvgSetting';
import SvgMyAccount from '../../../icons/SvgMyAccount';
import SvgUserSearch from '../../../icons/SvgUserSearch';
import SvgArrowDown1 from '../../../icons/SvgArrowDown1';
import { LEAVE_THIS_SITE } from '../../constValue';
import Button from '../../../uikit/Button/Button';
import { routesPath } from '../../../routes/routesPath';
import { AppDispatch, RootState } from '../../../store';
import { jobSelect } from '../../../appRoutesPath';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import SvgCollapse from '../../../icons/Svgcollapse';
import styles from './notification.module.css';


const cx = classNames.bind(styles);
type props = {
  changes: (arg: boolean) => void;
  data: () => void;
};

const Sidebar = ({ changes, data }: props) => {
  const dispatch: AppDispatch = useDispatch();
  //const [Select, setSelect] = useState('/');
  const [Expent, setExpent] = useState();
  const { pathname } = useLocation();
  const history = useHistory();
  const changeurl = sessionStorage.getItem('changingurl');
  const [checkplan, setcheckplan] = useState(false);
  const [isOverviewDropdownOpen, setOverviewDropdownOpen] = useState(false);
  const [isOverviewPopupDropdownOpen, setOverviewPopupDropdownOpen] = useState(false);
  const [isJobsDropdownOpen, setJobsDropdownOpen] = useState(false);
  const [isJobsPopupDropdownOpen, setJobsPopupDropdownOpen] = useState(false);
  const [isCandiDropdownOpen, setCandiDropdownOpen] = useState(false);
  const [isCandiPopupDropdownOpen, setCandiPopupDropdownOpen] = useState(false);
  const [isCommDropdownOpen, setCommDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [isMyaccDropdownOpen, setMyaccDropdownOpen] = useState(false);
  const [isCommPopupDropdownOpen, setCommPopupDropdownOpen] = useState(false);
  const [isBrandPopupDropdownOpen, setBrandPopupDropdownOpen] = useState(false);
  const [isMyaccPopupDropdownOpen, setMyaccPopupDropdownOpen] = useState(false);
  const [isOptionClicked, setIsOptionClicked] = useState(false);


  const toggleOverviewDropdown = () => {
    setOverviewDropdownOpen(!isOverviewDropdownOpen)
  };

  const toggleJobsDropdown = () => {
    setJobsDropdownOpen(!isJobsDropdownOpen);  
  };
  const toggleCandiDropdown = () => {
    setCandiDropdownOpen(!isCandiDropdownOpen);
  };
  const toggleCommDropdown = () => {
    setCommDropdownOpen(!isCommDropdownOpen);
  };
  const toggleBrandDropdown = () => {
    setBrandDropdownOpen(!isBrandDropdownOpen);
  };
  const toggleMyaccDropdown = () => {
    setMyaccDropdownOpen(!isMyaccDropdownOpen);
  };

  const IntegrationNav = () => {
    sessionStorage.setItem('superUserTabTwo','2')
    sessionStorage.setItem('superUserFalseTab', '1');
    sessionStorage.setItem('superUserTab', '4'); 
  }
  // Side Menu Popups When Sidebar is collapsed

  const toggleOverviewPopupDropdown = () => {
    setOverviewPopupDropdownOpen(!isOverviewPopupDropdownOpen);
    setJobsPopupDropdownOpen(false);  
    setCandiPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
    setBrandPopupDropdownOpen(false);
    setMyaccPopupDropdownOpen(false);
  };
  const toggleJobsPopupDropdown = () => {
    setJobsPopupDropdownOpen(!isJobsPopupDropdownOpen);
    setOverviewPopupDropdownOpen(false);
    setCandiPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
    setBrandPopupDropdownOpen(false);
    setMyaccPopupDropdownOpen(false);
  };
  const toggleCandiPopupDropdown = () => {
    setCandiPopupDropdownOpen(!isCandiPopupDropdownOpen);
    setJobsPopupDropdownOpen(false);
    setOverviewPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
    setBrandPopupDropdownOpen(false);
    setMyaccPopupDropdownOpen(false);
  };
  const toggleCommPopupDropdown = () => {
    setCommPopupDropdownOpen(!isCommPopupDropdownOpen);
    setJobsPopupDropdownOpen(false);
    setOverviewPopupDropdownOpen(false);
    setBrandPopupDropdownOpen(false);
    setMyaccPopupDropdownOpen(false);
    setCandiPopupDropdownOpen(false);
  };
  const toggleBrandPopupDropdown = () => {
    setBrandPopupDropdownOpen(!isBrandPopupDropdownOpen);
    setMyaccPopupDropdownOpen(false);
    setCandiPopupDropdownOpen(false);
    setJobsPopupDropdownOpen(false);
    setOverviewPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
  };
  const toggleMyaccPopupDropdown = () => {
    setMyaccPopupDropdownOpen(!isMyaccPopupDropdownOpen);
    setBrandPopupDropdownOpen(false);
    setCandiPopupDropdownOpen(false);
    setJobsPopupDropdownOpen(false);
    setOverviewPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
  };

  const handleNavigate = (val) => {};
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
    setOverviewDropdownOpen(false);
    setJobsDropdownOpen(false);
    setCandiDropdownOpen(false);
    setCommDropdownOpen(false);
    setBrandDropdownOpen(false);
    setMyaccDropdownOpen(false);
    setOverviewPopupDropdownOpen(false);
    setJobsPopupDropdownOpen(false);  
    setCandiPopupDropdownOpen(false);
    setCommPopupDropdownOpen(false);
    setBrandPopupDropdownOpen(false);
    setMyaccPopupDropdownOpen(false);
  };
  const { permission, is_plan, isProfile, plan_id, career_page_url, super_user } = useSelector(
    ({ permissionReducers, userProfileReducers, myJobPostingDataReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        is_plan: permissionReducers.is_plan,
        isProfile: userProfileReducers.profile,
        plan_id: permissionReducers.plan_id,
        career_page_url: myJobPostingDataReducers.career_page_url,
        super_user: permissionReducers.super_user,
      };
    },
  );
  const accountPath = '/account_setting/settings';
  useEffect(() => {
    if (plan_id !== 1 && plan_id !== 0) {
      setcheckplan(true);
    }
  }, [plan_id]);
  const clearTab = () => {
    sessionStorage.removeItem('superUserTab');
    sessionStorage.removeItem('superUserFalseTab');
    sessionStorage.removeItem('template');
    sessionStorage.removeItem('pipeline');
    sessionStorage.removeItem('button');
    sessionStorage.removeItem('wk_id');
  };

  const clearTabs = (e) => {

    e.stopPropagation();
    if (window.confirm(LEAVE_THIS_SITE)) {
      history.push('/');
    } else {
      e.preventDefault();
    }
  };
  return (
    <>
     {console.log('Overview Dropdown', isOverviewDropdownOpen)}
     {console.log('Jobs Dropdown', isJobsDropdownOpen)}
     {console.log('Candidates Dropdown', isCandiDropdownOpen)}
     {console.log('Communication Dropdown', isCommDropdownOpen)}
     {console.log('Branding Dropdown', isBrandDropdownOpen)}
     {console.log('My Account Dropdown', isMyaccDropdownOpen)}

      <div
        className={Expent === '0' ? styles.sidebar : styles.sidebarmini}
        style={{ marginTop: '50px', display:"flex", flexWrap:"wrap", alignContent:"space-between" }}
      >
        <div 
        className={Expent === '0' ? styles.sidemenucontent : styles.sidemenucontentmini}
        >
        <ul style={{width:'100%'}}>
{/* Overview Dropdown */}
          <li
          >
            <Flex row
              title="Overview"
              className={styles.filtername}
              onClick={Expent === "0" ? ()=>{toggleOverviewDropdown()} : ()=>{toggleOverviewPopupDropdown()}}
              
            >
              <Flex row>
                <text 
                  style={{ verticalAlign: 'middle', marginLeft:'-6px' }}>
                  <SvgDashboard height={28} width={28} />
                    </text>
                      <Text
                        size= {13}
                        color="theme"
                        style={{ cursor: 'Pointer'}}
                        className={Expent === '0' ? styles.maintext : styles.classpan}
                      >
                      Overview
                        </Text>
                </Flex>
              {isOverviewDropdownOpen ? (
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              ):(
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgRight1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              )}
              </Flex>
              </li>
            {isOverviewDropdownOpen && (
              <>
              <Flex style={{backgroundColor: "#f7f7f7", textIndent:"7px"}}>
              {/* DashBoard */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.select_row : ''}
                    >
                      <Flex>
                      <LinkWrapper className={styles.hoverview} 
                      onClick={clearTabs}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)} 
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Dashboard
                        </Text>
                      </LinkWrapper>
                      </Flex>
                    </li>
                  ) : (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.select_row : ''}
                    >
                      <Flex>
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}

                        to={is_plan ? '/' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}

                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Dashboard
                        </Text>
                      </LinkWrapper>
                      </Flex>
                    </li>
                  )
                ) : (
                  <li
                    title="Dashboard"
                    className={pathname === '/' ? styles.select_row : ''}
                  >
                    <Flex>
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        onClick={() => {handleNavigate(1)}}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Dashboard
                      </Text>
                    </a>
                    </Flex>
                  </li>
                )}  
              {/* Reports */}
              {permission.includes('reports') ? (
                <>
                  {is_plan ? (
                    changes ? (
                      <li
                      style={plan_id === 1?({cursor:'not-allowed !important'}):(null)}
                        title={
                          plan_id === 1
                            ? 'Please subscribe to any of the paid plans to view the job metrics'
                            : 'Reports'
                        }
                        className={
                          pathname.includes('/reports')&& plan_id===1 ? styles.select_row : plan_id===1?styles.select_item:""
                        }
                        
                      >
                        <LinkWrapper
                          className={styles.hoverview}
                          onClick={clearTabs}
                          to={
                            plan_id === 1
                              ? '/'
                              : plan_id !== 1 && is_plan
                              ? reports
                              : accountPath
                          }
                        >
                          <Text>
                            -
                            </Text>
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={Expent === '0' ? styles.text : styles.classpan}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
                              // marginLeft: '18px' 
                            }}
                          >
                            Reports
                          </Text>
                        </LinkWrapper>
                      </li>
                    ) : (
                      <li
                        title={
                          plan_id === 1
                            ? 'Please subscribe to any of the paid plans to view the job metrics'
                            : 'Reports'
                        }
                        style={plan_id === 1?({cursor:'not-allowed !important'}):(null)}
                        className={
                          pathname.includes('/reports') ? styles.select_row : ''
                        }
                      
                      >
                        <LinkWrapper
                          className={plan_id===1?styles.selectitem:styles.hoverview}
                          onClick={clearTab}
                          to={
                            plan_id === 1
                              ? '#'
                              : plan_id !== 1 && is_plan
                              ? reports
                              : accountPath
                          }
                          
                        >
                          <Text>
                            -
                            </Text>
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={Expent === '0' ? styles.text : styles.classpan}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
                              // marginLeft: '18px' 
                            }}
                          >
                            Reports
                          </Text>
                        </LinkWrapper>
                      </li>
                    )
                  ) : (
                    <li
                      title="Reports"
                      className={
                        pathname.includes('/reports') ? styles.select_row : styles.select_item
                      }
                      style={{cursor:'not-allowed'}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text>
                          -
                          </Text>
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
                            // marginLeft: '18px', 
                            cursor:'not-allowed'
                          }}
                        >
                          Reports
                        </Text>
                      </a>
                    </li>
                  )}
                </>
                ):(
                  <li
                      title="Reports"
                      className={
                        pathname.includes('/reports') ? styles.select_row : styles.select_item
                      }
                      style={{cursor:'not-allowed'}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text>-</Text>
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
                            // marginLeft: '18px', 
                            cursor:'not-allowed'
                          }}
                        >
                          Reports
                        </Text>
                      </a>
                    </li>
                )}
                </Flex>
              </>
            )}
{/* Jobs Dropdown */}
          <li>
            <Flex row
              title="Jobs"
              className={styles.filtername}
              // onClick={() => {toggleJobsDropdown()}}
              onClick={Expent === "0" ? ()=>{toggleJobsDropdown()} : ()=>{toggleJobsPopupDropdown()}}

            >
                <Flex row>
                  <text style={{ verticalAlign: 'middle' }}>
                    <SvgJobPost height={16} width={16} />
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer', marginLeft:"18px"}}
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                  >
                    Jobs
                  </Text>
                </Flex>
                {!isJobsDropdownOpen ? (
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgRight1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              ):(
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              )}
              </Flex>
              </li>
            {isJobsDropdownOpen && 
            <>
            <Flex style={{backgroundColor:'#f7f7f7', textIndent:"7px"}}>
            {/* Job Posting */}
              {is_plan ? (
                changes ? (
                  <li
                    title="Job Postings"
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
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
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
                    title="Job Postings"
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
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(2)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Job Posting
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Job Postings"
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
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
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
            {/* Post Jobs */}
            {permission.includes('create_post') && 
            <>
            {is_plan ? (
                changes ? (
                  <li
                    title="Post Jobs"
                    className={
                      pathname === jobSelect
                        ? styles.select_row
                        : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? jobSelect : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(2)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Post Jobs
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Post Jobs"
                    className={
                      pathname === jobSelect
                        ? styles.select_row
                        : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? jobSelect : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(2)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Post Jobs
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Post Jobs"
                  className={
                    pathname === jobSelect
                      ? styles.select_row
                      : ''
                  }
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      // onClick={() => handleNavigate(2)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Post Jobs
                    </Text>
                  </a>
                </li>
              )}
            </>
            }
            {/* Customized WorkFlow */}
            {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      // className={pathname === '/' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Tailor Workflow
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Tailor Workflow"
                      // className={pathname === '/' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                          sessionStorage.setItem('superUserTabTwo','3')
                          sessionStorage.setItem('superUserFalseTab', '2');
                          sessionStorage.setItem('superUserTab', '7'); 
                        }}
                        to={accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Tailor Workflow
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Tailor Workflow"
                    // className={pathname === '/' ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '3' &&
                      sessionStorage.getItem('superUserFalseTab') === '2' &&
                      sessionStorage.getItem('superUserTab') === '7'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Tailor Workflow
                      </Text>
                    </a>
                  </li>
                )} 
              </Flex>
            </>
            }
{/* Candidates Dropdown */}
            <li>
              <Flex row
                  title="Candidates"
                  className={styles.filtername}
                  // onClick={() => {toggleCandiDropdown()}}
                  onClick={Expent === "0" ? ()=>{toggleCandiDropdown()} : ()=>{toggleCandiPopupDropdown()}}

                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  <SvgUserSearch
                          fill={'#581845'}
                          width={22}
                          height={22}
                        />
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer'}}
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                  >
                    Candidates
                  </Text>
                  </Flex>
                  {!isCandiDropdownOpen ? (
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgRight1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              ):(
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              )}
              </Flex>
                  </li>
          {isCandiDropdownOpen && (
            <Flex style={{backgroundColor:'#f7f7f7', textIndent:"7px"}}>
            {permission.includes('my_database') && (
            <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Database"
                    className={
                      pathname === '/mydatabase' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTabs}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
                          // marginLeft: '20px',
                        }}
                      >
                        Database
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Database"
                    className={
                      pathname === '/mydatabase' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTab}
                    >
                      <Text style={{ verticalAlign: 'middle ' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
                          // marginLeft: '20px',
                        }}
                      >
                        Database
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Database"
                  className={
                    pathname === '/mydatabase' ? styles.select_row : ''
                  }
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      onClick={() => handleNavigate(3)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{
                        color: '#581845',
                        marginRight: '10px',
                        // marginLeft: '20px',
                      }}
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
              {is_plan ? (
                changes ? (
                  <li
                    title="Talent Sourcing"
                    className={
                      pathname === '/talent_sourcing' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(4)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Talent Sourcing
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Talent Sourcing"
                    className={
                      pathname === '/talent_sourcing' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(4)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Talent Sourcing
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Talent Sourcing"
                  className={
                    pathname === '/talent_sourcing' ? styles.select_row : ''
                  }
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
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
              {is_plan ? (
                changes ? (
                  <li
                    title="Import Candidates"
                    className={
                      pathname === '/bulk_import' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >
                      <Text>-</Text>

                      <Text
                        onClick={() => handleNavigate(5)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Import Candidates
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Import Candidates"
                    className={
                      pathname === '/bulk_import' ? styles.select_row : ''
                    }
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >
                      <Text>-</Text>

                      <Text
                        onClick={() => handleNavigate(5)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Import Candidates
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Import Candidates"
                  className={
                    pathname === '/bulk_import' ? styles.select_row : ''
                  }
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text>-</Text>
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
            </Flex>
          )}
{/* Communications Dropdown */}
            <li>
            <Flex row
                  title="Communications"
                  className={styles.filtername}
                  // onClick={() => {toggleCommDropdown()}}
                  onClick={Expent === "0" ? ()=>{toggleCommDropdown()} : ()=>{toggleCommPopupDropdown()}}
                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  <SvgCommunication width={21} height={21}/>
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer'}}
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                  >
                     Communications
                  </Text>
                  </Flex>
                  {!isCommDropdownOpen ? (
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgRight1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              ):(
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              )}
              </Flex>
            </li>  
            {isCommDropdownOpen && (
                <> 
                <Flex style={{backgroundColor: "#f7f7f7", textIndent:"7px"}}>
            {/* Calendar */}
                {(
                  <>
                    {is_plan ? (
                      changes ? (
                        <li
                          className={
                            pathname === '/calendar' ? styles.select_row : ''
                          }
                          title="Calendar"
                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(7)}
                              className={
                                Expent === '0' ? styles.text : styles.classpan
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Calendar
                            </Text>
                          </LinkWrapper>
                        </li>
                      ) : (
                        <li
                          className={
                            pathname === '/calendar' ? styles.select_row : ''
                          }
                          title="Calendar"
                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(7)}
                              className={
                                Expent === '0' ? styles.text : styles.classpan
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Calendar
                            </Text>
                          </LinkWrapper>
                        </li>
                      )
                    ) : (
                      <li
                        className={pathname === '/calendar' ? styles.select_row : ''}
                        title="Calendar"
                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Text style={{ verticalAlign: 'middle' }}>
                            -
                          </Text>
                          <Text
                            onClick={() => handleNavigate(7)}
                            className={Expent === '0' ? styles.text : styles.classpan}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px'}}
                          >
                            Calendar
                          </Text>
                        </a>
                      </li>
                    )}
                  </>
                )}
            {/* Integrations */}
            {is_plan ? (
                  changes ? (
                    <li
                      title="Integrations"
                      // className={pathname === '/account_setting/settings' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '4'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Integrations
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Integrations"
                      // className={pathname === '/account_setting/settings' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '4'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          IntegrationNav()}}
                        to= {accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Integrations
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Integrations"
                    // className={pathname === '/account_setting/settings' ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '2' &&
                      sessionStorage.getItem('superUserFalseTab') === '1' &&
                      sessionStorage.getItem('superUserTab') === '4'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Integrations
                      </Text>
                    </a>
                  </li>
                )} 
            {/* Interview Scheduler */}
                {(
                  <>
                    {is_plan ? (
                      changes ? (
                        <li
                          title=" Interview Scheduler"
                          className={
                            pathname === meetingScheduler ? styles.select_row : ''
                          }
                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? meetingScheduler : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(8)}
                              className={
                                Expent === '0' ? styles.text : styles.classpan
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Interview Scheduler
                            </Text>
                          </LinkWrapper>
                        </li>
                      ) : (
                        <li
                          title=" Interview Scheduler"
                          className={
                            pathname === meetingScheduler ? styles.select_row : ''
                          }
                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? meetingScheduler : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(8)}
                              className={
                                Expent === '0' ? styles.text : styles.classpan
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Interview Scheduler
                            </Text>
                          </LinkWrapper>
                        </li>
                      )
                    ) : (
                      <li
                        title=" Interview Scheduler"
                        className={
                          pathname === meetingScheduler ? styles.select_row : ''
                        }
                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Text style={{ verticalAlign: 'middle' }}>
                            -
                          </Text>
                          <Text
                            onClick={() => handleNavigate(8)}
                            className={Expent === '0' ? styles.text : styles.classpan}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px'}}
                          >
                            Interview Scheduler
                          </Text>
                        </a>
                      </li>
                    )}
                  </>
                )}
            {/* Mailbox */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="MailBox"
                      className={pathname === '/mail' ? styles.select_row : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTabs}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                        <Text
                          onClick={() => handleNavigate(7)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px'}}
                        >
                          Mailbox
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li title='Mailbox' className={pathname === '/mail' ? styles.select_row : ''}>
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                          <Text
                            onClick={() => handleNavigate(7)}
                            className={Expent === '0' ? styles.text : styles.classpan}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px' }}
                          >
                            Mailbox
                          </Text>
                        </LinkWrapper>
                      </li>
                    )
                  ) : (
                    <li title='Mailbox' className={pathname === '/mail' ? styles.select_row : ''}>
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        > 
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                        <Text
                          onClick={() => handleNavigate(7)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px'}}
                        >
                          Mailbox
                        </Text>
                        </a>
                    </li>
                  )}
                  </Flex>
                </>
            )}
{/* Branding Dropdown */}
            <li>
            <Flex row
                  title="Branding"
                  className={styles.filtername}
                  // onClick={() => {toggleBrandDropdown()}}
                  onClick={Expent === "0" ? ()=>{toggleBrandDropdown()} : ()=>{toggleBrandPopupDropdown()}}

                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  <SvgBranding width={22} height={22}/>
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer'}}
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                  >
                     Branding
                  </Text>
                  </Flex>
                  {!isBrandDropdownOpen ? (
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgRight1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              ):(
                <Flex
                className={Expent === '0' ? styles.maintext : styles.classpan}
                >
                  <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                </Flex>
              )}
              </Flex>
              </li>
            {isBrandDropdownOpen && (
              <>
              <Flex style={{backgroundColor:"#f7f7f7", textIndent:"7px"}}>
              {/* Careers Page */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Careers Page"
                      // className={pathname === '/' ? styles.select_row : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Careers Page"
                      // className={pathname === '/' ? styles.select_row : ''}
                    > 
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                        to={
                          isEmpty(career_page_url)
                            ? `/account_setting/settings?tab=1`
                            : `/${career_page_url}/careers`
                        }
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Careers Page"
                    // className={pathname === '/' ? styles.select_row : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Careers Page
                      </Text>
                    </a>
                  </li>
                )} 
              {/* Build Your Careers Page */}
              {super_user === true &&
              <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Setup Careers Page"
                      // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '1' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '1'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Setup Careers Page
                        </Text> 
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Setup Careers Page"
                      // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '1' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '1'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=1' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Setup Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Setup Careers Page"
                    // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '1' &&
                      sessionStorage.getItem('superUserFalseTab') === '1' &&
                      sessionStorage.getItem('superUserTab') === '1'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Setup Careers Page
                      </Text>
                    </a>
                  </li>
                )}
              </>
              }
                </Flex>
              </>
            )}
{/* Account Settings*/}
            <li>
            <Flex row
                  title="My Account"
                  className={styles.filtername}
                  // onClick={() => {toggleMyaccDropdown()}}
                  onClick={Expent === "0" ? ()=>{toggleMyaccDropdown()} : ()=>{toggleMyaccPopupDropdown()}}
                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  {/* <SvgSetting fill={'#581845'} height={20} width={20} /> */}
                  <SvgMyAccount height={20} width={20}/>
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer'}}
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                  >
                      My Account
                  </Text>
                  </Flex>
                  {!isMyaccDropdownOpen ? (
                    <Flex
                      className={Expent === '0' ? styles.maintext : styles.classpan}
                      >
                        <SvgRight1 height={10} width={10} fill={'#581845'}/>
                    </Flex>
                  ) : (
                    <Flex
                    className={Expent === '0' ? styles.maintext : styles.classpan}
                    >
                      <SvgArrowDown1 height={10} width={10} fill={'#581845'}/>
                    </Flex>
                  )}
              </Flex>
              </li>
            {isMyaccDropdownOpen && (
              <>
              <Flex style={{backgroundColor:"#f7f7f7", textIndent:"7px"}}>
              {/* Profiles */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Profiles"
                      // className={pathname.includes('/account_setting/settings?tab=0') ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '0' &&
                        sessionStorage.getItem('superUserFalseTab') === '0' &&
                        sessionStorage.getItem('superUserTab') === '0'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profiles
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Profiles"
                      // className={pathname.includes('/account_setting/settings?tab=0') ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '0' &&
                        sessionStorage.getItem('superUserFalseTab') === '0' &&
                        sessionStorage.getItem('superUserTab') === '0'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=0' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profiles
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Profiles"
                    // className={pathname.includes('/account_setting/settings?tab=0') ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '0' &&
                      sessionStorage.getItem('superUserFalseTab') === '0' &&
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(9)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profiles
                      </Text>
                    </a>
                  </li>
                )} 
              {/* Subscription */}
              {super_user === true ? (
                <>
                { is_plan ? (
                  changes ? (
                    <li
                      title="Subscription"
                      // className={pathname === '/account_setting/settings?tab=2' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '2'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Subscription
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Subscription"
                      // className={pathname === '/account_setting/settings?tab=2' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '2'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=2' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Subscription
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Subscription"
                    // className={pathname === '/account_setting/settings?tab=2' ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '2' &&
                      sessionStorage.getItem('superUserFalseTab') === '2' &&
                      sessionStorage.getItem('superUserTab') === '2'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Subscription
                      </Text>
                    </a>
                  </li>
                )}
                </>
              ):("")}
              {/* Manage Users */}
              {super_user === true ? (
                <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Manage Users"
                      // className={pathname === '/account_setting/settings/tab=3' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '3' &&
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Manage Users
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Manage Users"
                      // className={pathname === '/account_setting/settings/tab=3' ? styles.select_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '3' &&
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=3' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Manage Users
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Manage Users"
                    // className={pathname === '/account_setting/settings/tab=3' ? styles.select_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '3' &&
                      sessionStorage.getItem('superUserFalseTab') === '3' &&
                      sessionStorage.getItem('superUserTab') === '3'
                        ? styles.select_row
                        : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Manage Users
                      </Text>
                    </a>
                  </li>
                )} 
                </>
              ):("")} 
                </Flex>  
              </>
            )}
        </ul>
      </div>                

        <ul className={styles.setting} >
          {is_plan ? (
            <li
              title="Settings"
              className={
                Expent === '0' ? styles.sidebarexpand : styles.sidebarmin
              }
              // style={{
              //   height: '35px',
              //   width: '145px',
              //   position: 'relative',
              //   bottom: '25px',
              // }}
            >
              <LinkWrapper onClick={clearTab} to={'/account_setting/settings'}>
                <SvgSetting fill={'#581845'} height={20} width={20} />

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
              <a
              style={{    position: 'relative',
                bottom: '20px'}}
                href={' '}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <SvgSetting fill={'#581845'} height={20} width={20} />
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
          <li>
            {Expent === '0' ? (
              <Flex  title='Collapse sidebar'>
                <Button
                  style={{
                    height: '19px',
                    width: '19px',
                    position: 'relative',
                    bottom: '51px',
                  }}
                  types="link"
                  className={styles.collapse}
                  onClick={() => handlecheck('1')}
                >
                  <SvgCollapse height={16} width={16} />
                </Button>
              </Flex>
            ) : (
              <Flex title='Expand Sidebar'>
                <Button
                className={styles.Expend}
                types="link"
                onClick={() => handlecheck('0')}
              >
                <SvgExpand height={16} width={16} />
              </Button>

              </Flex>
              
            )}
          </li>
        </ul>
      </div>
      <div>
      {isOverviewPopupDropdownOpen && (
              <>
              <Flex
               className={styles.overviewpopupdropdown}
               style={{textIndent:"12px"}}
               >
              {/* DashBoard */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview}
                      onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          // className={Expent === '0' ? styles.text : styles.classpan}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Dashboard
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}


                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Dashboard
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Dashboard"
                    className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(1)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Dashboard
                      </Text>
                    </a>
                  </li>
                )}  
              {/* Reports */}
              {permission.includes('reports') ? (
                <>
                  {is_plan ? (
                    changes ? (
                      <li
                      style={plan_id === 1?({cursor:'not-allowed !important'}):({width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"})}
                        title={
                          plan_id === 1
                            ? 'Please subscribe to any of the paid plans to view the job metrics'
                            : 'Reports'
                        }
                        className={
                          pathname.includes('/reports')&& plan_id===1 ? styles.selectpopup_row : plan_id===1?styles.select_item:""
                        }
                        
                      >
                        <LinkWrapper
                          className={styles.hoverview}
                          onClick={clearTabs}
                          to={
                            plan_id === 1
                              ? '/'
                              : plan_id !== 1 && is_plan
                              ? reports
                              : accountPath
                          }
                        >
                          -
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={styles.text}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
                              // marginLeft: '18px' 
                            }}
                          >
                            Reports
                          </Text>
                        </LinkWrapper>
                      </li>
                    ) : (
                      <li
                        title={
                          plan_id === 1
                            ? 'Please subscribe to any of the paid plans to view the job metrics'
                            : 'Reports'
                        }
                        style={plan_id === 1?({cursor:'not-allowed !important'}):({width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"})}
                        className={
                          pathname.includes('/reports') ? styles.selectpopup_row : ''
                        }
                      
                      >
                        <LinkWrapper
                          className={plan_id===1?styles.selectitem:styles.hoverview}
                          onClick={clearTab}
                          to={
                            plan_id === 1
                              ? '#'
                              : plan_id !== 1 && is_plan
                              ? reports
                              : accountPath
                          }
                          
                        >
                          <Text>-</Text>
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={styles.text}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
                              // marginLeft: '18px' 
                            }}
                          >
                            Reports
                          </Text>
                        </LinkWrapper>
                      </li>
                    )
                  ) : (
                    <li
                      title="Reports"
                      className={
                        pathname.includes('/reports') ? styles.selectpopup_row : styles.select_item
                      }
                      style={{cursor:'not-allowed',width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text>-</Text>
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={styles.text}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
                            // marginLeft: '18px', 
                            cursor:'not-allowed'
                          }}
                        >
                          Reports
                        </Text>
                      </a>
                    </li>
                  )}
                </>
                ):(
                  <li
                      title="Reports"
                      className={
                        pathname.includes('/reports') ? styles.selectpopup_row : styles.select_item
                      }
                      style={{cursor:'not-allowed',width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text>-</Text>
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={styles.text}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
                            // marginLeft: '18px', 
                            cursor:'not-allowed'
                          }}
                        >
                          Reports
                        </Text>
                      </a>
                    </li>
                )}
                </Flex>
              </>
            )}
      {isJobsPopupDropdownOpen && 
            <>
            <Flex 
              className={styles.jobspopupdropdown}
              style={{textIndent:"12px"}}
              >
            {/* Job Posting */}
              {is_plan ? (
                changes ? (
                  <li
                    title="Job Postings"
                    className={
                      pathname === '/job_list' ||
                      pathname.includes('/jobs') ||
                      pathname.includes('/job_view') ||
                      pathname.includes('/zita_match_candidate') ||
                      pathname.includes('/applicant_pipe_line')
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(2)}
                        // className={Expent === '0' ? styles.text : styles.classpan}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Job Postings
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Job Postings"
                    className={
                      pathname === '/job_list' ||
                      pathname.includes('/jobs') ||
                      pathname.includes('/job_view') ||
                      pathname.includes('/zita_match_candidate') ||
                      pathname.includes('/applicant_pipe_line')
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(2)}
                        // className={Expent === '0' ? styles.text : styles.classpan}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Job Posting
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Job Postings"
                  className={
                    pathname === '/job_list' ||
                    pathname.includes('/jobs') ||
                    pathname.includes('/job_view') ||
                    pathname.includes('/zita_match_candidate') ||
                    pathname.includes('/applicant_pipe_line')
                      ? styles.selectpopup_row
                      : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      onClick={() => handleNavigate(2)}
                      className={styles.text}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Job Postings
                    </Text>
                  </a>
                </li>
              )}
            {/* Post Jobs */}
            {permission.includes('create_post') && 
            <>
            {is_plan ? (
                changes ? (
                  <li
                    title="Post Jobs"
                    className={
                      pathname === jobSelect
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? jobSelect : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(2)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Post Jobs
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Post Jobs"
                    className={
                      pathname === '/job_list' ||
                      pathname.includes('/jobs') ||
                      pathname.includes('/job_view') ||
                      pathname.includes('/zita_match_candidate') ||
                      pathname.includes('/applicant_pipe_line')
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? jobSelect : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(2)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Post Jobs
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Post Jobs"
                  className={
                    pathname === '/job_list' ||
                    pathname.includes('/jobs') ||
                    pathname.includes('/job_view') ||
                    pathname.includes('/zita_match_candidate') ||
                    pathname.includes('/applicant_pipe_line')
                      ? styles.selectpopup_row
                      : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      // onClick={() => handleNavigate(2)}
                      className={styles.text}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Post Jobs
                    </Text>
                  </a>
                </li>
              )}
            </>
            }
            {/* Customized WorkFlow */}
            {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      // className={pathname === '/' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Tailor Workflow
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Tailor Workflow"
                      // className={pathname === '/' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                          sessionStorage.setItem('superUserTabTwo','3')
                          sessionStorage.setItem('superUserFalseTab', '2');
                          sessionStorage.setItem('superUserTab', '7'); 
                        }}
                        to={accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Tailor Workflow
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Tailor Workflow"
                    // className={pathname === '/' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '3' &&
                      sessionStorage.getItem('superUserFalseTab') === '2' &&
                      sessionStorage.getItem('superUserTab') === '7'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Tailor Workflow
                      </Text>
                    </a>
                  </li>
                )} 
              </Flex>
            </>
            }
      {isCandiPopupDropdownOpen && (
            <Flex 
            className={styles.candipopupdropdown}
            style={{textIndent:"12px"}}
            >
            {permission.includes('my_database') && (
            <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Database"
                    className={
                      pathname === '/mydatabase' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTabs}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                         styles.text
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
                          // marginLeft: '20px',
                        }}
                      >
                        Database
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Database"
                    className={
                      pathname === '/mydatabase' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTab}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                        styles.text
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
                          // marginLeft: '20px',
                        }}
                      >
                        Database
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Database"
                  className={
                    pathname === '/mydatabase' ? styles.selectpopup_row : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      onClick={() => handleNavigate(3)}
                      className={styles.text}
                      color="primary"
                      style={{
                        color: '#581845',
                        marginRight: '10px',
                        // marginLeft: '20px',
                      }}
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
              {is_plan ? (
                changes ? (
                  <li
                    title="Talent Sourcing"
                    className={
                      pathname === '/talent_sourcing' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(4)}
                        className={
                        styles.text
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Talent Sourcing
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Talent Sourcing"
                    className={
                      pathname === '/talent_sourcing' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >
                      <Text style={{ verticalAlign: 'middle' }}>
                        -
                      </Text>
                      <Text
                        onClick={() => handleNavigate(4)}
                        className={
                          styles.text
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Talent Sourcing
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Talent Sourcing"
                  className={
                    pathname === '/talent_sourcing' ? styles.selectpopup_row : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text style={{ verticalAlign: 'middle' }}>
                      -
                    </Text>
                    <Text
                      onClick={() => handleNavigate(4)}
                      className={styles.text}
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
              {is_plan ? (
                changes ? (
                  <li
                    title="Import Candidates"
                    className={
                      pathname === '/bulk_import' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >
                      <Text>-</Text>

                      <Text
                        onClick={() => handleNavigate(5)}
                        className={
                          styles.text
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Import Candidates
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Import Candidates"
                    className={
                      pathname === '/bulk_import' ? styles.selectpopup_row : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >
                      <Text>-</Text>

                      <Text
                        onClick={() => handleNavigate(5)}
                        className={
                          styles.text
                        }
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Import Candidates
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Import Candidates"
                  className={
                    pathname === '/bulk_import' ? styles.selectpopup_row : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Text>-</Text>
                    <Text
                      onClick={() => handleNavigate(5)}
                      className={styles.text}
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
            </Flex>
          )}
      {isCommPopupDropdownOpen && (
                <> 
            <Flex 
            className={styles.commpopupdropdown}
            style={{textIndent:"12px"}}
            >
            {/* Calendar */}
                {(
                  <>
                    {is_plan ? (
                      changes ? (
                        <li
                          className={
                            pathname === '/calendar' ? styles.selectpopup_row : ''
                          }
                          title="Calendar"
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(7)}
                              className={styles.text
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Calendar
                            </Text>
                          </LinkWrapper>
                        </li>
                      ) : (
                        <li
                          className={
                            pathname === '/calendar' ? styles.selectpopup_row : ''
                          }
                          title="Calendar"
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(7)}
                              className={styles.text
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Calendar
                            </Text>
                          </LinkWrapper>
                        </li>
                      )
                    ) : (
                      <li
                        className={pathname === '/calendar' ? styles.selectpopup_row : ''}
                        title="Calendar"
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Text style={{ verticalAlign: 'middle' }}>
                            -
                          </Text>
                          <Text
                            onClick={() => handleNavigate(7)}
                            className={styles.text}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px'}}
                          >
                            Calendar
                          </Text>
                        </a>
                      </li>
                    )}
                  </>
                )}
            {/* Integrations */}
            {is_plan ? (
                  changes ? (
                    <li
                      title="Integrations"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '4'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Integrations
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Integrations"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '4'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          sessionStorage.setItem('superUserTabTwo','2')
                          sessionStorage.setItem('superUserFalseTab', '1');
                          sessionStorage.setItem('superUserTab', '4'); 
                        }}
                        to= {accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Integrations
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Integrations"
                    // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '2' &&
                      sessionStorage.getItem('superUserFalseTab') === '1' &&
                      sessionStorage.getItem('superUserTab') === '4'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Integrations
                      </Text>
                    </a>
                  </li>
                )} 
            {/* Interview Scheduler */}
                {(
                  <>
                    {is_plan ? (
                      changes ? (
                        <li
                          title=" Interview Scheduler"
                          className={
                            pathname === meetingScheduler ? styles.selectpopup_row : ''
                          }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? meetingScheduler : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(8)}
                              className={styles.text
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Interview Scheduler
                            </Text>
                          </LinkWrapper>
                        </li>
                      ) : (
                        <li
                          title=" Interview Scheduler"
                          className={
                            pathname === meetingScheduler ? styles.selectpopup_row : ''
                          }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? meetingScheduler : accountPath}
                          >
                            <Text style={{ verticalAlign: 'middle' }}>
                              -
                            </Text>
                            <Text
                              onClick={() => handleNavigate(8)}
                              className={styles.text
                              }
                              color="primary"
                              style={{ color: '#581845', marginRight: '10px'}}
                            >
                              Interview Scheduler
                            </Text>
                          </LinkWrapper>
                        </li>
                      )
                    ) : (
                      <li
                        title=" Interview Scheduler"
                        className={
                          pathname === meetingScheduler ? styles.selectpopup_row : ''
                        }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
                          <Text style={{ verticalAlign: 'middle' }}>
                            -
                          </Text>
                          <Text
                            onClick={() => handleNavigate(8)}
                            className={styles.text}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px'}}
                          >
                            Interview Scheduler
                          </Text>
                        </a>
                      </li>
                    )}
                  </>
                )}
            {/* Mailbox */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="MailBox"
                      className={pathname === '/mail' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTabs}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                        <Text
                          onClick={() => handleNavigate(7)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px'}}
                        >
                          Mailbox
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li title='Mailbox' className={pathname === '/mail' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                          <Text
                            onClick={() => handleNavigate(7)}
                            className={styles.text}
                            color="primary"
                            style={{ color: '#581845', marginRight: '10px' }}
                          >
                            Mailbox
                          </Text>
                        </LinkWrapper>
                      </li>
                    )
                  ) : (
                    <li title='Mailbox' className={pathname === '/mail' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}
                    >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        > 
                        <Text style={{ verticalAlign: 'middle' }}>
                          -
                        </Text>

                        <Text
                          onClick={() => handleNavigate(7)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px'}}
                        >
                          Mailbox
                        </Text>
                        </a>
                    </li>
                  )}
                  </Flex>
                </>
            )}
      {isBrandPopupDropdownOpen && (
              <>
            <Flex 
            className={styles.brandpopupdropdown}
            style={{textIndent:"12px"}}
            >
              {/* Careers Page */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Careers Page"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Careers Page"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    > 
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                        to={
                          isEmpty(career_page_url)
                            ? `/account_setting/settings?tab=1`
                            : `/${career_page_url}/careers`
                        }
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Careers Page"
                    className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Careers Page
                      </Text>
                    </a>
                  </li>
                )} 
              {/* Build Your Careers Page */}
              {super_user === true &&
              <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Setup Careers Page"
                      // className={pathname === '/account_setting/settings?tab=1' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '1' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '1'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Setup Careers Page
                        </Text> 
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Setup Careers Page"
                      // className={pathname === '/account_setting/settings?tab=1' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '1' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '1'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=1' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Setup Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Setup Careers Page"
                    // className={pathname === '/account_setting/settings?tab=1' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '1' &&
                      sessionStorage.getItem('superUserFalseTab') === '1' &&
                      sessionStorage.getItem('superUserTab') === '1'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Setup Careers Page
                      </Text>
                    </a>
                  </li>
                )}
              </>
              }
                </Flex>
              </>
            )}
      {isMyaccPopupDropdownOpen && (
              <>
            <Flex 
            className={styles.myaccpopupdropdown}
            style={{textIndent:"12px"}}
            >
              {/* Profiles */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Profiles"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '0' &&
                        sessionStorage.getItem('superUserFalseTab') === '0' &&
                        sessionStorage.getItem('superUserTab') === '0'
                          ? styles.selectpopup_row
                          : ''}
                      
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profiles
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Profiles"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '0' &&
                        sessionStorage.getItem('superUserFalseTab') === '0' &&
                        sessionStorage.getItem('superUserTab') === '0'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=0' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profiles
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Profiles"
                    // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '0' &&
                      sessionStorage.getItem('superUserFalseTab') === '0' &&
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(9)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profiles
                      </Text>
                    </a>
                  </li>
                )} 
              {/* Subscription */}
              {super_user === true ? (
                <>
                { is_plan ? (
                  changes ? (
                    <li
                      title="Subscription"
                      // className={pathname === '/account_setting/settings?tab=2' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '2'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Subscription
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Subscription"
                      // className={pathname === '/account_setting/settings?tab=2' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '2'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=2' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          // onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Subscription
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Subscription"
                    // className={pathname === '/account_setting/settings?tab=2' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '2' &&
                      sessionStorage.getItem('superUserFalseTab') === '2' &&
                      sessionStorage.getItem('superUserTab') === '2'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Subscription
                      </Text>
                    </a>
                  </li>
                )}
                </>
              ):("")}
              {/* Manage Users */}
              {super_user === true ? (
                <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Manage Users"
                      // className={pathname === '/account_setting/settings/tab=3' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '3' &&
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Manage Users
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Manage Users"
                      // className={pathname === '/account_setting/settings/tab=3' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '3' &&
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=3' : accountPath}
                      >
                        <Text style={{ verticalAlign: 'middle'}}>
                          -
                        </Text>
                        <Text
                          onClick={() => handleNavigate(1)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Manage Users
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Manage Users"
                    // className={pathname === '/account_setting/settings/tab=3' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '3' &&
                      sessionStorage.getItem('superUserFalseTab') === '3' &&
                      sessionStorage.getItem('superUserTab') === '3'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"25px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <Text style={{ verticalAlign: 'middle'}}>
                        -
                      </Text>
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Manage Users
                      </Text>
                    </a>
                  </li>
                )} 
                </>
              ):("")} 
                </Flex>  
              </>
            )}
            </div>
    </>
  );
};

export default Sidebar;
