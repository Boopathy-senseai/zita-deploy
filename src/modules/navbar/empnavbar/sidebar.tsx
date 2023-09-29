import classNames from 'classnames/bind';
import { useEffect, useState, createRef, useRef } from 'react';
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

// PopupDropdown Set State
  const [isOverviewPopupDropdownOpen, setOverviewPopupDropdownOpen] = useState(false);
  const [isJobsPopupDropdownOpen, setJobsPopupDropdownOpen] = useState(false);
  const [isCandiPopupDropdownOpen, setCandiPopupDropdownOpen] = useState(false);
  const [isCommPopupDropdownOpen, setCommPopupDropdownOpen] = useState(false);
  const [isBrandPopupDropdownOpen, setBrandPopupDropdownOpen] = useState(false);
  const [isMyaccPopupDropdownOpen, setMyaccPopupDropdownOpen] = useState(false);

// SessionStorage Values and Dropdown Set states for DropDown menus

  const initialIsOverviewDropdownOpen = sessionStorage.getItem('OverviewDropdown') === '1';
  const [isOverviewDropdownOpen, setOverviewDropdownOpen] = useState(initialIsOverviewDropdownOpen);

  const initialIsJobsDropdownOpen = sessionStorage.getItem('JobsDropdown') === '1';
  const [isJobsDropdownOpen, setJobsDropdownOpen] = useState(initialIsJobsDropdownOpen);

  const initialIsCandiDropdownOpen = sessionStorage.getItem('CandidateDropdown') === '1';
  const [isCandiDropdownOpen, setCandiDropdownOpen] = useState(initialIsCandiDropdownOpen);

  const initialIsCommDropdownOpen = sessionStorage.getItem('CommunicationDropdown') === '1';
  const [isCommDropdownOpen, setCommDropdownOpen] = useState(initialIsCommDropdownOpen);

  const initialIsBrandDropdownOpen = sessionStorage.getItem('BrandingDropdown') === '1';
  const [isBrandDropdownOpen, setBrandDropdownOpen] = useState(initialIsBrandDropdownOpen);

  const initialIsMyaccDropdownOpen = sessionStorage.getItem('MyAccountDropdown') === '1';
  const [isMyaccDropdownOpen, setMyaccDropdownOpen] = useState(initialIsMyaccDropdownOpen);



// Toggle functionality for Dropdown and Popup

  const toggleOverviewDropdown = () => {
    if (Expent === "0") {
      const overviewdropdownvalue = !isOverviewDropdownOpen;
      setOverviewDropdownOpen(overviewdropdownvalue);
      sessionStorage.setItem('OverviewDropdown', overviewdropdownvalue ? '1' : '0');
    } else if (Expent === "1") {
        setOverviewPopupDropdownOpen(!isOverviewPopupDropdownOpen);
        setJobsPopupDropdownOpen(false);  
        setCandiPopupDropdownOpen(false);
        setCommPopupDropdownOpen(false);
        setBrandPopupDropdownOpen(false);
        setMyaccPopupDropdownOpen(false);
    }
  };
  const toggleJobsDropdown = () => {
    if (Expent === "0") {
      const jobsdropdownvalue = !isJobsDropdownOpen;
      setJobsDropdownOpen(jobsdropdownvalue);
      sessionStorage.setItem('JobsDropdown', jobsdropdownvalue ? '1' : '0');
    } else if (Expent === "1"){
      setJobsPopupDropdownOpen(!isJobsPopupDropdownOpen);
      setOverviewPopupDropdownOpen(false);
      setCandiPopupDropdownOpen(false);
      setCommPopupDropdownOpen(false);
      setBrandPopupDropdownOpen(false);
      setMyaccPopupDropdownOpen(false);
    }
  };
  const toggleCandiDropdown = () => {
    if (Expent === "0") {
      const candidropdownvalue = !isCandiDropdownOpen;
      setCandiDropdownOpen(candidropdownvalue);
      sessionStorage.setItem('CandidateDropdown', candidropdownvalue ? '1' : '0');
    } else if (Expent === "1"){
      setCandiPopupDropdownOpen(!isCandiPopupDropdownOpen);
      setJobsPopupDropdownOpen(false);
      setOverviewPopupDropdownOpen(false);
      setCommPopupDropdownOpen(false);
      setBrandPopupDropdownOpen(false);
      setMyaccPopupDropdownOpen(false);
    }
  };
  const toggleCommDropdown = () => {
    if (Expent === "0") {
      const commdropdownvalue = !isCommDropdownOpen;
      setCommDropdownOpen(commdropdownvalue);
      sessionStorage.setItem('CommunicationDropdown', commdropdownvalue ? '1' : '0');
    } else if (Expent === "1") {
      setCommPopupDropdownOpen(!isCommPopupDropdownOpen);
      setJobsPopupDropdownOpen(false);
      setOverviewPopupDropdownOpen(false);
      setBrandPopupDropdownOpen(false);
      setMyaccPopupDropdownOpen(false);
      setCandiPopupDropdownOpen(false);
    }
  };
  const toggleBrandDropdown = () => {
    if (Expent === "0") {
      const branddropdownvalue = !isBrandDropdownOpen;
      setBrandDropdownOpen(branddropdownvalue);
      sessionStorage.setItem('BrandingDropdown', branddropdownvalue ? '1' : '0');
    } else if (Expent === "1"){
      setBrandPopupDropdownOpen(!isBrandPopupDropdownOpen);
      setMyaccPopupDropdownOpen(false);
      setCandiPopupDropdownOpen(false);
      setJobsPopupDropdownOpen(false);
      setOverviewPopupDropdownOpen(false);
      setCommPopupDropdownOpen(false);
    }
  };
  const toggleMyaccDropdown = () => {
    if (Expent === "0") {
      const myaccdropdownvalue = !isMyaccDropdownOpen;
      setMyaccDropdownOpen(myaccdropdownvalue);
      sessionStorage.setItem('MyAccountDropdown', myaccdropdownvalue ? '1' : '0');
    } else if (Expent === "1"){
      setMyaccPopupDropdownOpen(!isMyaccPopupDropdownOpen);
      setBrandPopupDropdownOpen(false);
      setCandiPopupDropdownOpen(false);
      setJobsPopupDropdownOpen(false);
      setOverviewPopupDropdownOpen(false);
      setCommPopupDropdownOpen(false);
    }
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
  const { permission, is_plan, isProfile, plan_id, career_page_url, super_user, roles } = useSelector(
    ({ permissionReducers, userProfileReducers, myJobPostingDataReducers,dashboardEmpReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        is_plan: permissionReducers.is_plan,
        isProfile: userProfileReducers.profile,
        plan_id: permissionReducers.plan_id,
        career_page_url: dashboardEmpReducers.career_page_url,
        super_user: permissionReducers.super_user,
        roles: permissionReducers.roles,
        
      };
    },
  );
  const accountPath = '/account_setting/settings';
  useEffect(() => {
    if (plan_id !== 1 && plan_id !== 0) {
      setcheckplan(true);
    }
  }, [plan_id]);
  

  let integrationnavpath = '/account_setting/settings'

  if (super_user === true && roles === "Admin") {
    integrationnavpath='/account_setting/settings?tab=4' 
  } else if (super_user === false && roles === "Admin") {
    integrationnavpath='/account_setting/settings?tab=2'
  } else if (roles === "Hiring") {
    integrationnavpath='/account_setting/settings?tab=2'
  } else if (roles === "HR") {
    integrationnavpath='/account_setting/settings?tab=1'
  }

  let profilenavpath = '/account_setting/settings'

  if (super_user === true && roles === "Admin") {
    profilenavpath='/account_setting/settings?tab=0' 
  } else if (super_user === false && roles === "Admin") {
    profilenavpath='/account_setting/settings?tab=0'
  } else if (roles === "Hiring") {
    profilenavpath='/account_setting/settings?tab=0'
  } else if (roles === "HR") {
    profilenavpath='/account_setting/settings?tab=0'
  }

  let workflownavpath = '/account_setting/settings'

  if (super_user === true && roles === "Admin") {
    workflownavpath='/account_setting/settings?tab=7' 
  } else if (super_user === false && roles === "Admin") {
    workflownavpath='/account_setting/settings?tab=3'
  } else if (roles === "Hiring") {
    workflownavpath='/account_setting/settings?tab=3'
  } else if (roles === "HR") {
    workflownavpath='/account_setting/settings?tab=2'
  }
  
  const overviewdropdownRef = useRef(null);
  const jobsdropdownRef = useRef(null);
  const candidatesdropdownRef = useRef(null);
  const communicationdropdownRef = useRef(null);
  const brandingdropdownRef = useRef(null);
  const myaccountdropdownRef = useRef(null);


  const handleClickOutside = (event) => {
    if (overviewdropdownRef.current && !overviewdropdownRef.current.contains(event.target)) {
      setOverviewPopupDropdownOpen(false);
    } else if (jobsdropdownRef.current && !jobsdropdownRef.current.contains(event.target)) {
      setJobsPopupDropdownOpen(false)
    } else if (candidatesdropdownRef.current && !candidatesdropdownRef.current.contains(event.target)) {
      setCandiPopupDropdownOpen(false)
    } else if (communicationdropdownRef.current && !communicationdropdownRef.current.contains(event.target)) {
      setCommPopupDropdownOpen(false)
    } else if (brandingdropdownRef.current && !brandingdropdownRef.current.contains(event.target)) {
      setBrandPopupDropdownOpen(false)
    } else if (myaccountdropdownRef.current && !myaccountdropdownRef.current.contains(event.target)) {
      setMyaccPopupDropdownOpen(false)
    }
  };
  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isOverviewPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOverviewPopupDropdownOpen]);
  
  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isJobsPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isJobsPopupDropdownOpen]);

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isCandiPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isCandiPopupDropdownOpen]);

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isCommPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isCommPopupDropdownOpen]);

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isBrandPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isBrandPopupDropdownOpen]);

  useEffect(() => {
    const handleClick = (event) => {
      handleClickOutside(event);
    };

    if (isMyaccPopupDropdownOpen) {
      document.addEventListener('click', handleClick);
    }

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isMyaccPopupDropdownOpen]);

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
      <div 
        className={Expent === '0' ? styles.sidebar : styles.sidebarmini}
        style={{ marginTop: '50px', display:"flex", flexWrap:"wrap", alignContent:"space-between" }}
      >
        <div 
        className={Expent === '0' ? styles.sidemenucontent : styles.sidemenucontentmini}
        >
        <ul style={{width:'100%'}}>
{/* Overview Dropdown */}
          <li>
            <div
              >
            <Flex row
              title="Overview"
              className={styles.filtername}
              onClick={toggleOverviewDropdown}
            >
              <Flex row>
                <text 
                  style={{ verticalAlign: 'middle', marginLeft:'-6px' }}
                  >
                  <SvgDashboard height={28} width={28} />
                    </text>
                      <Text
                        size= {13}
                        color="theme"
                        style={{ cursor: 'Pointer', marginRight:"8px" }}
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
              </div>
              </li>
            {isOverviewDropdownOpen && (
              <>
              <Flex style={{backgroundColor: "#f7f7f7", textIndent:"22px"}}
              className={Expent === "0" ? "" : styles.classpan}
              >
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
                        <Text
                          onClick={() => {handleNavigate(1)}} 
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
                        <Text
                          onClick={() => {handleNavigate(1)}}
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
                          pathname.includes('/reports') && 
                          plan_id===1 ? styles.select_row : plan_id===1?styles.select_item:""
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
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
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
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
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
              onClick={() => {toggleJobsDropdown()}}

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
            {isJobsDropdownOpen && (
            <>
            <Flex style={{backgroundColor:'#f7f7f7', textIndent:"22px"}}
            className={Expent === "0" ? "" : styles.classpan}>
            {/* Job Posting */}
              {is_plan ? (
                changes ? (
                  <li
                    title="Job Postings"
                    className={
                      pathname === '/job_list' ||
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
                {super_user === true && roles === "Admin" && (
                <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      className={
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                        }}
                        to={"/account_setting/settings?tab=7"}

                      >

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
                    className={
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
              </> 
                )} 
                {super_user === false && roles === "Admin" && (
                <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      className={
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                      className={
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                        }}
                        to={"/account_setting/settings?tab=3"}

                      >

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
                    className={
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
              </> 
                )} 
                {roles === "Hiring" && (
                <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      className={
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                          sessionStorage.setItem('superUserTab', '3'); 
                        }}
                        to={"/account_setting/settings?tab=3"}

                      >

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
              </> 
                )}
                {roles === "HR" && (
                <>
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
                        to={"/account_setting/settings?tab=2"}

                      >

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
              </> 
                )}
              </Flex>
            </>
            )}
{/* Candidates Dropdown */}
            <li>
              <Flex row
                  title="Candidates"
                  className={styles.filtername}
                  onClick={() => {toggleCandiDropdown()}}
                  // onClick={Expent === "0" ? ()=>{toggleCandiDropdown()} : ()=>{toggleCandiPopupDropdown()}}

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
            <Flex style={{backgroundColor:'#f7f7f7', textIndent:"22px"}}
            className={Expent === "0" ? "" : styles.classpan}>
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

                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
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

                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                          Expent === '0' ? styles.text : styles.classpan
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
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

                    <Text
                      onClick={() => handleNavigate(3)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{
                        color: '#581845',
                        marginRight: '10px',
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
                  onClick={() => {toggleCommDropdown()}}
                  // onClick={Expent === "0" ? ()=>{toggleCommDropdown()} : ()=>{toggleCommPopupDropdown()}}
                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  <SvgCommunication width={21} height={21}/>
                    </text>
                  <Text
                    size= {13}
                    color="theme"
                    style={{ cursor: 'Pointer', marginRight:"8px"}}
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
                <Flex style={{backgroundColor: "#f7f7f7", textIndent:"22px"}}
                className={Expent === "0" ? "" : styles.classpan}>
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

            {super_user === true && roles === "Admin" && (
              <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Integrations"
                      className={
                      sessionStorage.getItem('superUserTab') === '4'
                        ? styles.select_row
                        : ''}
                        >
                          <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
                            <Text
                              className={Expent === '0' ? styles.text : styles.classpan}
                              color="primary"
                              style={{ color: '#581845' }}
                              >
                                Integrations
                                </Text> 
                                </LinkWrapper>
                                </li>
                              ) : (
                                <li
                                  title="Integrations"
                                  className={
                                    sessionStorage.getItem('superUserTab') === '4'
                                      ? styles.select_row
                                      : ''}
                                >
                                  <LinkWrapper
                                    className={styles.hoverview}
                                    onClick={()=>{
                                      clearTab()}
                                    }
                                    to={'/account_setting/settings?tab=4'}
                                  >
                                    <Text
                                      // onClick={() => handleNavigate(1)}
                                      className={Expent === '0' ? styles.text : styles.classpan}
                                      color="primary"
                                      style={{ color: '#581845'}}
                                    >
                                      Integrations
                                    </Text>
                                  </LinkWrapper>
                                </li>
                              )
                            ) : (
                              <li
                                title="Integrations"
                                className={
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
            
                                  <Text
                                    className={Expent === '0' ? styles.text : styles.classpan}
                                    color="primary"
                                    style={{ color: '#581845'}}
                                  >
                                    Integrations
                                  </Text>
                                </a>
                              </li>
                            )}
                  </>
            )} 
            {super_user === false && roles === "Admin" && (
              <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Integrations"
                    className={
                      sessionStorage.getItem('superUserFalseTab') === '2'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845' }}
                      >
                        Integrations
                      </Text> 
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Integrations"
                    className={
                      sessionStorage.getItem('superUserFalseTab') === '1'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={()=>{
                        clearTab()
                        // sessionStorage.setItem('superUserFalseTab', '2')
                        // sessionStorage.setItem('superUserTabTwo', '2')
                      }
                      }
                      to={'/account_setting/setting?tab=2'}
                    >
                      <Text
                        // onClick={() => handleNavigate(1)}
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845'}}
                      >
                        Integrations
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Integrations"
                  // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                  className={
                    sessionStorage.getItem('superUserTabTwo') === '2'
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

                    <Text
                      // onClick={() => handleNavigate(1)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845'}}
                    >
                      Integrations
                    </Text>
                  </a>
                </li>
              )}
                </>
            )} 
            {roles === "Hiring" && (
            <>
            {is_plan ? (
              changes ? (
                <li
                  title="Integrations"
                  className={
                    sessionStorage.getItem('superUserTab') === '2'
                      ? styles.select_row
                      : ''}
                >
                  <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845' }}
                    >
                      Integrations
                    </Text> 
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  title="Integrations"
                  className={
                    sessionStorage.getItem('superUserTab') === '2'
                      ? styles.select_row
                      : ''}
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={()=>{
                      clearTab()
                      sessionStorage.setItem('superUserTab', '2')}
                    }
                    to={'/account_setting/settings?tab=2'}
                  >
                    <Text
                      // onClick={() => handleNavigate(1)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845'}}
                    >
                      Integrations
                    </Text>
                  </LinkWrapper>
                </li>
              )
            ) : (
              <li
                title="Integrations"
                // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                className={
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

                  <Text
                    // onClick={() => handleNavigate(1)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845'}}
                  >
                    Integrations
                  </Text>
                </a>
              </li>
            )}
              </>
            )}
            {roles === "HR" && (
            <>
            {console.log("HRConsole", roles)}
            {is_plan ? (
              changes ? (
                <li
                  title="Integrations"
                  className={
                    sessionStorage.getItem('superUserTabTwo') === '1'
                      ? styles.select_row
                      : ''}
                >
                  <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845' }}
                    >
                      Integrations
                    </Text> 
                  </LinkWrapper>
                </li>
              ) : (
                <li
                  title="Integrations"
                  className={
                    sessionStorage.getItem('superUserTabTwo') === '2'
                      ? styles.select_row
                      : ''}
                >
                  <LinkWrapper
                    className={styles.hoverview}
                    onClick={()=>{
                      clearTab()
                     
                      // sessionStorage.setItem('superUserFalseTab', '2')
                    }
                    }
                    to={'/account_setting/settings?tab=1'}
                  >
                    <Text
                      // onClick={() => handleNavigate(1)}
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845'}}
                    >
                      Integrations
                    </Text>
                  </LinkWrapper>
                </li>
              )
            ) : (
              <li
                title="Integrations"
                // className={pathname === '/account_setting/settings?tab=1' ? styles.select_row : ''}
                className={
                  sessionStorage.getItem('superUserTabTwo') === '1'
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

                  <Text
                    // onClick={() => handleNavigate(1)}
                    className={Expent === '0' ? styles.text : styles.classpan}
                    color="primary"
                    style={{ color: '#581845'}}
                  >
                    Integrations
                  </Text>
                </a>
              </li>
            )}
              </>
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
                  onClick={() => {toggleBrandDropdown()}}
                >
                  <Flex row>
                  <text style={{ verticalAlign: 'middle'}}>
                  <SvgBranding width={21} height={21}/>
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
              <Flex style={{backgroundColor:"#f7f7f7", textIndent:"22px"}}
              className={Expent === "0" ? "" : styles.classpan}>
              {/* Careers Page */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Careers Page"
                      className={pathname === `/${career_page_url}/careers` ? styles.select_row : ''}
                    >
                      <LinkWrapper className={styles.hoverview}
                      onClick={clearTabs}
                      >

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
                      className={pathname === `/${career_page_url}/careers` ? styles.select_row : ''}
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

                        <Text
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
                    className={pathname === `/${career_page_url}/careers` ? styles.select_row : ''}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

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
              {roles !== "HR" &&
              <>
                {is_plan ? (
                  changes ? (
                    <li
                      title="Setup Careers Page"
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '1' &&
                        sessionStorage.getItem('superUserFalseTab') === '1' &&
                        sessionStorage.getItem('superUserTab') === '1'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845' }}
                        >
                          Setup Careers Page
                        </Text> 
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Setup Careers Page"
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
                        to={is_plan ? "/account_setting/settings?tab=1" : accountPath}
                      >

                        <Text
                          className={Expent === '0' ? styles.text : styles.classpan}
                          color="primary"
                          style={{ color: '#581845'}}
                        >
                          Setup Careers Page
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Setup Careers Page"
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

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845'}}
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
                  onClick={() => {toggleMyaccDropdown()}}
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
              <Flex style={{backgroundColor:"#f7f7f7", textIndent:"22px"}}
              className={Expent === "0" ? "" : styles.classpan}>
              {/* Profile */}
              {super_user === true && roles === "Admin" && (
              <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={ '/account_setting/settings?tab=0'}
                    >

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Profile"
                  className={
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

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Profile
                    </Text>
                  </a>
                </li>
              )}
              </>
              )} 
              {super_user === false && roles === "Admin" && (
              <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                     onClick={()=>{
                      // sessionStorage.setItem ('superUserTabTwo','0')
                    }}
                      to={ '/account_setting/settings?tab=0'}
                    >

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Profile"
                  className={
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

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Profile
                    </Text>
                  </a>
                </li>
              )}
              </>
              )} 
              {roles === "Hiring" && (
              <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={ '/account_setting/settings?tab=0'}
                    >

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Profile"
                  className={
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

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Profile
                    </Text>
                  </a>
                </li>
              )}
              </>
              )}
              {roles === "HR" && (
              <>
              {is_plan ? (
                changes ? (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                ) : (
                  <li
                    title="Profile"
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.select_row
                        : ''}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={'/account_setting/settings?tab=0'}
                    >

                      <Text
                        className={Expent === '0' ? styles.text : styles.classpan}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
                      </Text>
                    </LinkWrapper>
                  </li>
                )
              ) : (
                <li
                  title="Profile"
                  className={
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

                    <Text
                      className={Expent === '0' ? styles.text : styles.classpan}
                      color="primary"
                      style={{ color: '#581845', marginRight: '10px' }}
                    >
                      Profile
                    </Text>
                  </a>
                </li>
              )}
              </>
              )}

              {/* Subscription */}
              {super_user === true ? (
                <>
                { is_plan ? (
                  changes ? (
                    <li
                      title="Subscription"
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '2' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '2'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                        to={is_plan ? '/account_setting/settings?tab=2' : accountPath}
                      >

                        <Text
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
                    className={
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

                      <Text
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
                      className={
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                      className={
                        sessionStorage.getItem('superUserTab') === '3'
                          ? styles.select_row
                          : ''}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        to={is_plan ? '/account_setting/settings?tab=3' : accountPath}
                      >

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
                    className={
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

                      <Text
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
        <div ref={overviewdropdownRef}
              >
              <Flex
               className={styles.overviewpopupdropdown}
               >
              {/* DashBoard */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview}
                      onClick={clearTabs}>
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
                  ) : (
                    <li
                      title="Dashboard"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}


                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        to={is_plan ? '/' : accountPath}
                      >
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
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
                      style={plan_id === 1?({cursor:'not-allowed !important'}):({width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"})}
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
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={styles.text}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
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
                        style={plan_id === 1?({cursor:'not-allowed !important'}):({width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"})}
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
                          <Text
                            onClick={() => handleNavigate(6)}
                            className={styles.text}
                            color="primary"
                            style={{
                              color: '#581845',
                              marginRight: '10px',
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
                      style={{cursor:'not-allowed',width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={styles.text}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
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
                      style={{cursor:'not-allowed',width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                    >
                    
                      <a
                        className={styles.hoverview}
                        href={' '}
                        style={{cursor:'not-allowed'}}
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Text
                          onClick={() => handleNavigate(6)}
                          className={styles.text}
                          color="primary"
                          style={{
                            color: '#581845',
                            marginRight: '10px',
                            cursor:'not-allowed'
                          }}
                        >
                          Reports
                        </Text>
                      </a>
                    </li>
                )}
                </Flex>
          </div>
            )}
      {isJobsPopupDropdownOpen && (
        <div ref={jobsdropdownRef}>
            <Flex 
              className={styles.jobspopupdropdown}
              >
            {/* Job Posting */}
              {is_plan ? (
                changes ? (
                  <li
                    title="Job Postings"
                    className={
                      pathname === '/job_list' ||
                      pathname.includes('/job_view') ||
                      pathname.includes('/zita_match_candidate') ||
                      pathname.includes('/applicant_pipe_line')
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
                    >

                      <Text
                        onClick={() => handleNavigate(2)}
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
                      pathname.includes('/job_view') ||
                      pathname.includes('/zita_match_candidate') ||
                      pathname.includes('/applicant_pipe_line')
                        ? styles.selectpopup_row
                        : ''
                    }
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.MY_JOB_POSTING : accountPath}
                    >

                      <Text
                        onClick={() => handleNavigate(2)}
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
                    pathname.includes('/job_view') ||
                    pathname.includes('/zita_match_candidate') ||
                    pathname.includes('/applicant_pipe_line')
                      ? styles.selectpopup_row
                      : ''
                  }
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? jobSelect : accountPath}
                    >

                      <Text
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? jobSelect : accountPath}
                    >

                      <Text
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
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >

                    <Text
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
            <>
            {is_plan ? (
                  changes ? (
                    <li
                      title="Tailor Workflow"
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                      className={
                        sessionStorage.getItem('superUserTabTwo') === '3' &&
                        sessionStorage.getItem('superUserFalseTab') === '2' &&
                        sessionStorage.getItem('superUserTab') === '7'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {
                          clearTab();
                          sessionStorage.setItem('superUserTabTwo','3')
                          sessionStorage.setItem('superUserFalseTab', '2');
                          sessionStorage.setItem('superUserTab', '7'); 
                        }}
                        to={is_plan ? workflownavpath :accountPath}
                      >

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
                    className={
                      sessionStorage.getItem('superUserTabTwo') === '3' &&
                      sessionStorage.getItem('superUserFalseTab') === '2' &&
                      sessionStorage.getItem('superUserTab') === '7'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

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
            </>
              </Flex>
          </div>
            )}
      {isCandiPopupDropdownOpen && (
        <div ref={candidatesdropdownRef}>
            <Flex 
            className={styles.candipopupdropdown}
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTabs}
                    >

                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                         styles.text
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      to={is_plan ? routesPath.MYDATABASE : accountPath}
                      onClick={clearTab}
                    >

                      <Text
                        onClick={() => handleNavigate(3)}
                        className={
                        styles.text
                        }
                        color="primary"
                        style={{
                          color: '#581845',
                          marginRight: '10px',
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
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >

                    <Text
                      onClick={() => handleNavigate(3)}
                      className={styles.text}
                      color="primary"
                      style={{
                        color: '#581845',
                        marginRight: '10px',
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.TALENT_SOURCING : accountPath}
                    >

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
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTabs}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <LinkWrapper
                      className={styles.hoverview}
                      onClick={clearTab}
                      to={is_plan ? routesPath.BULK_IMPORT : accountPath}
                    >

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
                  style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                >
                  <a
                    className={styles.hoverview}
                    href={' '}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
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
          </div>
            )}
      {isCommPopupDropdownOpen && (
        <div ref={communicationdropdownRef}> 
            <Flex 
            className={styles.commpopupdropdown}
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? routesPath.CALENDAR : accountPath}
                          >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={() => {clearTab()}}
                        to= {is_plan ? integrationnavpath : accountPath}
                      >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTabs}
                            to={is_plan ? meetingScheduler : accountPath}
                          >
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                        >
                          <LinkWrapper
                            className={styles.hoverview}
                            onClick={clearTab}
                            to={is_plan ? meetingScheduler : accountPath}
                          >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                      >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        >
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTabs}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        to={is_plan ? routesPath.MAIL : accountPath}
                      >


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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}
                    >
                        <a
                          className={styles.hoverview}
                          href={' '}
                          onClick={(e) => {
                            e.preventDefault();
                          }}
                        > 

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
          </div>
            )}
      {isBrandPopupDropdownOpen && (
        <div ref={brandingdropdownRef}>
            <Flex 
            className={styles.brandpopupdropdown}
            >
              {/* Careers Page */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Careers Page"
                      className={pathname === '/' ? styles.selectpopup_row : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

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
              {roles !== "HR" &&
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=1' : accountPath}
                      >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

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
          </div>
            )}
      {isMyaccPopupDropdownOpen && (
        <div ref={myaccountdropdownRef}>
            <Flex 
            className={styles.myaccpopupdropdown}
            >
              {/* Profile */}
                {is_plan ? (
                  changes ? (
                    <li
                      title="Profile"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                        sessionStorage.getItem('superUserTab') === '0'
                          ? styles.selectpopup_row
                          : ''}
                      
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profile
                        </Text>
                      </LinkWrapper>
                    </li>
                  ) : (
                    <li
                      title="Profile"
                      // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                      className={
                          sessionStorage.getItem('superUserTab') === '0'
                          ? styles.selectpopup_row
                          : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? profilenavpath : accountPath}
                      >

                        <Text
                          // onClick={() => handleNavigate(9)}
                          className={styles.text}
                          color="primary"
                          style={{ color: '#581845', marginRight: '10px' }}
                        >
                          Profile
                        </Text>
                      </LinkWrapper>
                    </li>
                  )
                ) : (
                  <li
                    title="Profile"
                    // className={pathname === '/account_setting/settings' ? styles.selectpopup_row : ''}
                    className={
                      sessionStorage.getItem('superUserTab') === '0'
                        ? styles.selectpopup_row
                        : ''}
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

                      <Text
                        // onClick={() => handleNavigate(9)}
                        className={styles.text}
                        color="primary"
                        style={{ color: '#581845', marginRight: '10px' }}
                      >
                        Profile
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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=2' : accountPath}
                      >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper className={styles.hoverview} onClick={clearTabs}>

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                    >
                      <LinkWrapper
                        className={styles.hoverview}
                        onClick={clearTab}
                        // onClick={changeurlss}
                        to={is_plan ? '/account_setting/settings?tab=3' : accountPath}
                      >

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
                    style={{width:"100%", height:"100%", alignItems:"center",display:"flex", textIndent:"10px"}}

                  >
                    <a
                      className={styles.hoverview}
                      href={' '}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >

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
          </div>
            )}
            </div>
    </>
  );
};

export default Sidebar;
