import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import SvgTriangle from '../../../icons/SvgTriangle';
import SvgInfo from '../../../icons/SvgInfo';

import SvgDashboardicon from '../../../icons/SvgDashboardicon';
import Loader from '../../../uikit/Loader/Loader';
import { getDateString, isEmpty } from '../../../uikit/helper';
import { AppDispatch, RootState } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import { WARNING } from '../../../uikit/Colors/colors';
import { companyPageInitalMiddleWare } from '../../accountsettingsmodule/store/middleware/accountsettingmiddleware';
import {
  dashboardCalenderMiddleWare,
  dashboardJobMetricsMiddleWare,
  dashboardMessageMiddleWare,
  dashBoardMiddleWare,
} from './store/dashboardmiddleware';

import CalenderCard from './CalenderCard';
import JobMetricsCard from './JobMetricsCard';
import MessageCard from './MessageCard';
import OverallJobActivities from './OverallJobActivities';
import styles from './dashboardscreen.module.css';
import ProfileCard from './ProfileCard';

const DashBoardScreen = () => {
  const [isLoader, setLoader] = useState(true);
  const [isLoaderMsg, setLoaderMsg] = useState(true);
  const [isCalLoader, setCalLoader] = useState(true);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const { is_plan, events, google, outlook, plan, jd_metrics } = useSelector(
    ({
      permissionReducers,
      dashboardCalenderStateReducers,
      dashboardEmpReducers,
    }: RootState) => {
      return {
        is_plan: permissionReducers.is_plan,
        events: dashboardCalenderStateReducers.events,
        google: dashboardEmpReducers.google,
        outlook: dashboardEmpReducers.outlook,
        plan: dashboardEmpReducers.plan,
        jd_metrics: dashboardEmpReducers.jd_metrics,
      };
    },
  );

  // plan based page redirection condition
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
  // loop 5 sec once message api
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(dashboardMessageMiddleWare());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // initial api call
  useEffect(() => {
    dispatch(dashBoardMiddleWare()).then((res) => {
      if (res.payload.jd_metrics.length !== 0) {
        dispatch(
          dashboardJobMetricsMiddleWare({
            jd_id: Number(res.payload.jd_metrics[0].id),
          }),
        );
      }
      setLoader(false);
      dispatch(dashboardMessageMiddleWare()).then(() => {
        setLoaderMsg(false);
      });
      dispatch(
        dashboardCalenderMiddleWare({
          date: getDateString(new Date(), 'YYYY-MM-DD'),
        }),
      ).then(() => {
        setCalLoader(false);
      });
    });
    dispatch(companyPageInitalMiddleWare());
  }, []);

  const checkCalendarGoogle = Array.isArray(google);
  const checkCalendarOutlook = Array.isArray(outlook);

  const checkCalendar =
    checkCalendarGoogle === true || checkCalendarOutlook === true
      ? true
      : false;
  const manageUser = () => {
    sessionStorage.setItem('superUserTab', '2');
    return window.location.replace(
      window.location.origin + '/account_setting/settings?planFocus=focus',
    );
  };
  const getFreeValue = localStorage.getItem('freeCheck');
  const flexHeight = jd_metrics.length !== 0 ? 70 : 60;
  if (isLoader || isLoaderMsg || isCalLoader) {
    return <Loader />;
  }
  return (
    //     <Flex className={styles.overAll} height={window.innerHeight - flexHeight} >
    //       <Flex row center>

    //         <div style={{ display: 'flex' }}>
    //           {isEmpty(getFreeValue) &&
    //             plan &&
    //             plan.plan_id_id === 1 &&
    //             plan.subscription_remains_days <= 7 && (
    //               <Flex columnFlex>
    //                 <Flex middle row center className={styles.warningFlex}>
    //                   <SvgInfo fill={WARNING} />
    //                   <Text
    //                     size={12}
    //                     bold
    //                     color="warning"
    //                     className={styles.warningText}
    //                   >
    //                     {`Your free trial ends in ${plan.subscription_remains_days
    //                       } ${plan.subscription_remains_days === 1 ? 'day' : 'days'
    //                       }. Please `}
    //                     <Text size={12} bold color="link" onClick={manageUser}>
    //                       upgrade{' '}
    //                     </Text>
    //                     to a paid plan to get uninterrupted access and enjoy more
    //                     zita platform features along with your branded careers page.
    //                   </Text>
    //                 </Flex>
    //               </Flex>
    //             )}
    //         </div>
    //       </Flex>

    //     <Flex >

    //         <Flex row className={styles.ribbon}>
    //           <Flex row between>

    //             <Flex  marginTop={9} marginLeft={8} >
    //                 <Text size={16}  bold color="theme" >
    //                    Dashboard
    //                 </Text>

    //              </Flex>
    //           <Flex marginLeft={1395}>

    //              <div className={styles.triangle}></div>
    //           </Flex>
    //           </Flex>
    //         </Flex>

    //           <Flex row>
    //             <Flex >
    //               <ProfileCard></ProfileCard>
    //             </Flex>
    //             <Flex  flex={6}>
    //               <Flex row>
    //               <Flex marginLeft={5} marginTop={5} flex={1}>
    //                 <OverallJobActivities></OverallJobActivities>
    //               </Flex>

    //               <Flex marginLeft={5} marginRight={5} marginTop={5} flex={5}>
    //                 <MessageCard></MessageCard>
    //               </Flex>
    //               </Flex>

    //               <Flex flex={6} marginLeft={5} marginTop={5}>
    //                 <CalenderCard
    //                   events={events}
    //                   checkCalendar={checkCalendar}
    //                   checkCalendarOutlook={checkCalendarOutlook}
    //                   google={google}
    //                   outlook={outlook}
    //                 />
    //               </Flex>
    //             </Flex>
    //           </Flex>
    //           <Flex marginLeft={5} marginTop={5} marginRight={5} marginBottom={5}>
    //             <JobMetricsCard />
    //           </Flex>

    //       </Flex>

    //     </Flex>
    //   );
    // };
    <Flex className={styles.scroll}>

    <Flex row className={styles.ribbon} between>
      

        <Flex marginTop={9} marginLeft={8} >
          <Text size={16} bold color="theme" >
            Dashboard
          </Text>

        </Flex>
        <Flex >

          <div className={styles.triangle}></div>
        </Flex>
      
    </Flex>
    <Flex className={styles.overAll}  >
    {console.log("dash==>",window.innerHeight,flexHeight )}
      <Flex row center>

        <div style={{ display: 'flex' ,marginBottom:"5px"}}>
          {isEmpty(getFreeValue) &&
            plan &&
            plan.plan_id_id === 1 &&
            plan.subscription_remains_days <= 7 && (
              <Flex columnFlex>
                <Flex middle row center className={styles.warningFlex}>
                  <SvgInfo fill={WARNING} />
                  <Text
                    size={12}
                    bold
                    color="warning"
                    className={styles.warningText}
                  >
                   
                    {`Your free trial ends in ${plan.subscription_remains_days
                      } ${plan.subscription_remains_days === 1 ? 'day' : 'days'
                      }. Please `}
                      <Text
                        style={{ fontWeight: 600 }}
                        color="link"
                        onClick={manageUser}
                      >
                        upgrade{' '}
                      </Text>
                      to a paid plan to get uninterrupted access and enjoy more
                      zita platform features along with your branded careers
                      page.
                    </Text>
                  </Flex>
                </Flex>
              )}
          </div>
        </Flex>

        <Flex row >
          <Flex flex={5}>
            <ProfileCard></ProfileCard>
          </Flex>
          <Flex flex={12}>
            <Flex row>
              <Flex marginLeft={5} marginTop={5} flex={5}>
                <OverallJobActivities></OverallJobActivities>
              </Flex>

              <Flex marginLeft={5} marginRight={5} marginTop={5} flex={15}>
                <MessageCard></MessageCard>
              </Flex>
            </Flex>

            <Flex flex={15} marginLeft={5} marginTop={5}>
              <CalenderCard
                events={events}
                checkCalendar={checkCalendar}
                checkCalendarOutlook={checkCalendarOutlook}
                google={google}
                outlook={outlook}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex marginLeft={5} marginTop={5} marginRight={5} marginBottom={5}>
          <JobMetricsCard />
        </Flex>
       
    </Flex>
  );
};

export default DashBoardScreen;
