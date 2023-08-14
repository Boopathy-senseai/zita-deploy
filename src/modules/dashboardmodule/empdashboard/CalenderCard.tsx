// import axios from 'axios';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import SvgCalendar from '../../../icons/SvgCalendar';
// import SvgNewTab from '../../../icons/SvgNewTab';
import SvgRefresh from '../../../icons/SvgRefresh';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Loader from '../../../uikit/Loader/Loader';
import { BLACK, PRIMARY, WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import {
  getDateString,
  // isEmpty
} from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
// import {
//   calenderTokenGetMiddleWare,
//   calenderTokenMiddleWare,
// } from '../../accountsettingsmodule/integrationmodule/store/middleware/integrationmiddleware';
import {
  syncOutlookMiddleWare,
  // syncGoogleMiddleWare,
  checkAuthMiddleware,
  getGoogleEventsMiddleware,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
// import { clientSecret, googleClientId } from '../../accountsettingsmodule/integrationmodule/IntegrationScreen';
import styles from './calendercard.module.css';
import { EventsEntity } from './DashBoardTypes';
import { dashboardCalenderMiddleWare } from './store/dashboardmiddleware';
import { outlookTimeZone } from './mock';


const email = getGoogleEventsMiddleware;




const cx = classNames.bind(styles);

type Props = {
  events: EventsEntity[];
  checkCalendar: boolean;
  checkCalendarOutlook: boolean;
  outlook: any;
  google: any;
};

const CalenderCard = ({
  events,
  checkCalendar,
  checkCalendarOutlook,
  outlook,
  google,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isCalLoad, setCalLoad] = useState(false);
  const [show, setshow] = useState(false);

  const formik = useFormik({
    initialValues: { date: getDateString(new Date(), 'MM/DD/YYYY') },
    onSubmit: () => { },
  });
  const getOutLookTime: any = 'Asia/Kolkata';
  // outlook && outlook[0].timeZone;

  useEffect(() => {
    if (checkCalendar) {
      localStorage.setItem(
        'timeZone',
        checkCalendarOutlook ? getOutLookTime : google[0].timeZone,
      );
    }
  }, [outlook, google, checkCalendarOutlook, checkCalendar]);

  
  const [isGoogle, setIsGoogle] = useState(0);
  const [active, setActive] = useState(0);
  const [event, setEvent] = useState([{ title: '', start: '', end: '', web_url: '' }]);
  const [tz, setTz] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const getEventHandler = (account: string) => {
    if (account === 'google') {
      console.log('google');
      
      dispatch(getGoogleEventsMiddleware({ tz })).then((res) => {

        const data = res.payload.events;
       
        
        console.log("gmail  ", data);
        
        setEvent(
          data.map((items: { summary: any; start: { dateTime: any }; end: { dateTime: any }; hangoutLink: any }) => {
            //   if(items.start.dateTime!==null){
            //  if(getDateString(items.start.dateTime, 'MM/DD/YYYY') === formik.values.date){
              
            return {
               
              title: items.summary,
              start: new Date(items.start.dateTime),
              end: new Date(items.end.dateTime),
              web_url: items.hangoutLink,
            };
          // }}
         
          }),
        );
        
      });
    } else {
      

      dispatch(syncOutlookMiddleWare()).then((res) => {
        const dataout = res.payload.events;
        console.log("outlook", dataout);
        setEvent(
          res.payload.events.map(
            (items: {
              title: any;
              start_time: string | number | Date;
              end_time: string | number | Date;
              web_url: any;
            }) => {
              // if(getDateString(items.start_time, 'MM/DD/YYYY') === formik.values.date){
              return {
                title: items.title,
                start: new Date(items.start_time),
                end: new Date(items.end_time),
                web_url: items.web_url,
              };
            //}
            },
          ),
        );
      });
    }
  };
  const checkAuth = () => {
    dispatch(checkAuthMiddleware())
      .then((res) => {
        console.log("checkauth:::", res.payload);
        if (res.payload.status === true) {
          console.log(res.payload);
          if (res.payload.account === 'google') {
            console.log('inside if');
            setIsGoogle(1);
          } else {
            console.log('inside else');
            setIsGoogle(0);
          }
          setActive(1);
          console.log('nothing');
          getEventHandler(res.payload.account);
        } else {
          console.log('error');
          setActive(0);
        }
      })
      .catch(() => {
        console.log('Error');
      });

  };
  useEffect(() => {
    checkAuth();
  }, []);
  const getOut: any = localStorage.getItem('timeZone');
  console.log(typeof setCalLoad, events);
  console.log(event);
  // const hanldeRefresh = () => {
  //   setCalLoad(true);
  //   dispatch(calenderTokenGetMiddleWare()).then((res) => {
  //     console.log(res)
  //     if (!isEmpty(res.payload.google)) {
  //       console.log(res.payload.google[0].accessToken);
  //       axios
  //         .request({
  //           method: 'post',
  //           url: 'https://oauth2.googleapis.com/token',
  //           headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //           params: {
  //             client_id:googleClientId,
  //             client_secret: clientSecret,
  //             refresh_token: res.payload.google[0].accessToken,
  //             grant_type: 'refresh_token',
  //           },
  //         })
  //         .then((refresh) => {
  //           console.log("refersh",refresh);
  //           dispatch(
  //             calenderTokenMiddleWare({
  //               calendar: 'google',
  //               info: {
  //                 accessToken: refresh.data.access_token,
  //                 email: res.payload.google[0].email,
  //                 timeZone:getOut
  //               },
  //             }),
  //           );
  //         })
  //         .then(() => {
  //           dispatch(syncGoogleMiddleWare()).then(() => {
  //             dispatch(
  //               dashboardCalenderMiddleWare({
  //                 date: getDateString(new Date(), 'YYYY-MM-DD'),
  //               }),
  //             ).then(() => {
  //               formik.setFieldValue(
  //                 'date',
  //                 getDateString(new Date(), 'MM/DD/YYYY'),
  //               );
  //               setCalLoad(false);
  //             });
  //           });
  //         })
  //         .catch(() => {
  //           setCalLoad(false);
  //         });
  //     }

  //     if (!isEmpty(res.payload.outlook)) {
  //       dispatch(syncOutlookMiddleWare()).then(() => {
  //         dispatch(
  //           dashboardCalenderMiddleWare({
  //             date: getDateString(new Date(), 'YYYY-MM-DD'),
  //           }),
  //         ).then(() => {
  //           formik.setFieldValue(
  //             'date',
  //             getDateString(new Date(), 'MM/DD/YYYY'),
  //           );
  //           setCalLoad(false);
  //         });
  //       });
  //     }
  //   });
  // };
  // const [date,setDate] = useState(getDateString(new Date(), 'MM/DD/YYYY'));
  console.log(event, isGoogle);
  return (
    <Card className={styles.overAll}>
      {console.log("event", event)}
      <Flex row between className={styles.msgText}>
        <Flex row>
          <Flex>
            <Text bold size={16} color="theme" style={{ marginRight: 5, marginTop: 5 }}>
              Calendar
            </Text></Flex>
          {active === 1 &&
            <Flex marginTop={9}>
              <Text color="gray" size={12}>
                (Timezone){outlookTimeZone[getOut]}
                {checkCalendarOutlook
                  ? outlookTimeZone[getOut]
                  : localStorage.getItem('timeZone')
                }



              </Text>
            </Flex>}

        </Flex>

        {/* <Flex row >
          <Flex>
            <Button
              types="tertiary"
              className={styles.syncBtn}
              onClick={checkAuth}

            >
              <Flex row center marginTop={5} >
                <Flex>
                  <Text
                
                    bold
                    size={12}
                    style={{ cursor: 'pointer', color: "white"}}
                  >
                    Sync        <SvgRefresh height={14} width={14} fill={WHITE} />
                  </Text>
                </Flex> */}
        {/* <Flex marginTop={3} >
                  <SvgRefresh height={14} width={14} fill={WHITE} />
                </Flex> */}
        {/* </Flex>
            </Button>
          </Flex>
          <Flex marginLeft={10}>
            <div style={{ position: 'relative', display: 'flex' }}>

              <DatePicker
                id="calendar___open"
                value={formik.values.date}
                onChange={(date) => {
                  formik.setFieldValue('date', getDateString(date, 'MM/DD/YYYY'));
                  // calender api call
                  // setDate(getDateString(date, 'MM/DD/YYYY'))
                  dispatch(
                    dashboardCalenderMiddleWare({
                      date: getDateString(date, 'YYYY-MM-DD'),
                    }),
                  );
                }}
                className={styles.datePicker}
              />
              <div style={{ position: 'absolute', left: 7, top: 3 }}>
                <label htmlFor="calendar___open">
                  <SvgCalendar width={16} height={16} />
                </label>
              </div>
            </div>
          </Flex>

        </Flex> */}
        {active === 1 && (
          <Flex
            row

          >
            <Flex row center >

              <Flex >
                <Flex >
                  <Button
                    types="primary"
                    className={styles.syncBtn}
                    onClick={checkAuth}

                  >
                    <Flex row center>
                      {/* <Flex> */}
                        <Text
                          bold
                          size={14}
                          style={{ cursor: 'pointer', color: "white" }}
                        >
                          Sync
                        </Text>
                      {/* </Flex> */}
                      <Flex marginLeft={8}>
                        <SvgRefresh height={14} width={14} fill={WHITE} />
                      </Flex>
                    </Flex>
                  </Button>
                  {isCalLoad && (
                    <div style={{ marginLeft: 16 }}>
                      <Loader withOutOverlay size={'medium'} />
                    </div>
                  )}
                </Flex>
              </Flex>
              <Flex marginLeft={10}>
                <Flex>
                  <div style={{ position: 'relative', display: 'flex' }}>

                    <DatePicker
                      id="calendar___open"
                      dateFormat="DD/MM/YYYY"
                      value={formik.values.date}
                      onChange={(date) => {
                        formik.setFieldValue('date', getDateString(date, 'MM/DD/YYYY'));
                        // calender api call
                        // setDate(getDateString(date, 'MM/DD/YYYY'))
                        dispatch(
                          dashboardCalenderMiddleWare({
                            date: getDateString(date, 'YYYY-MM-DD'),
                          }),
                        ).then((res) => {
                          const dataout = res.payload.events;
                          console.log("outlook", dataout);
                          setEvent(
                            res.payload.events.map(
                              (items: {
                                title: any;
                                start_time: string | number | Date;
                                end_time: string | number | Date;
                                web_url: any;
                              }) => {
                                return {
                                  title: items.title,
                                  start: new Date(items.start_time),
                                  end: new Date(items.end_time),
                                  web_url: items.web_url,
                                };
                              },
                            ),
                          );
                        });

                        { console.log("date", date) }
                      }}
                      className={styles.datePicker}
                    />
                    <div style={{ position: 'absolute', left: 7, top: 3 }}>
                      <label htmlFor="calendar___open">
                        <SvgCalendar width={16} height={16} />
                      </label>
                    </div>
                  </div>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex
        columnFlex
        className={cx('scrollStyle', {
          scrollStyleOne: checkCalendar,
          scrollStyleTwo: !checkCalendar,
        })}
      >
        {active === 0 ? (
          <Flex center flex={1} middle columnFlex className={styles.noContent}>
            <Text color="gray" style={{ marginBottom: 16 }}>
              Integrate your calendar with zita to schedule your
              meetings
            </Text>
            <LinkWrapper
              onClick={() => {
                sessionStorage.setItem('superUserTab', '4');
                sessionStorage.setItem('superUserFalseTab', '3');
              }}
              to="/account_setting/settings"
            >
              <Button>Integrate</Button>
            </LinkWrapper>
          </Flex>
        ) : event.length > 1 ? (
          event.map((list, index) => {

            if (
              getDateString(list.start, 'MM/DD/YYYY') === formik.values.date) {
              
              console.log("title", list.title);
              const startTime = moment(list.start);
              const endTime = moment(list.end);
              const duration = moment.duration(endTime.diff(startTime));
              const durationInMinutes = Math.floor(duration.asMinutes());
              const hours = Math.floor(durationInMinutes / 60);
              const minutes = durationInMinutes % 60;
              return (

                <Card key={list.title + index} className={styles.cardListStyle}>

                  <Flex row between center>

                    <Flex row center>
                      <Flex className={styles.borderRight} marginLeft={10}>
                        <Text bold style={{ color: '#581845' }}>{moment(list.start).format('dddd')}</Text>
                        <Text size={12}>{getDateString(list.start, 'hh:mm A')}-{getDateString(list.end, 'hh:mm A')}</Text>
                        <Text size={12}>( {hours}hour {minutes === 0 ? <Text> )</Text> : <Text size={12}>{minutes}minutes )</Text>}
                        </Text>

                      </Flex>
                      <Text bold style={{ color: "#581845" }}>{list.title}</Text>

                      {console.log("eventlength:", event.length)}
                    </Flex>
                    <Flex marginRight={8}>
                      <Button onClick={() => window.open(list.web_url)} >
                        Join
                      </Button></Flex>
                  </Flex>
                </Card>)
              // : null}

            }
          })
        ) : (
          <Flex flex={1} center middle columnFlex className={styles.noContent}>
            {console.log("cal_eventlength", event.length)}
            <Text color="gray"> No event scheduled</Text>
          </Flex>
        )
        }
        {/* (show===false)&&
        {
          <Flex flex={1} center middle columnFlex className={styles.noContent}>{setshow(!show)} <Text color="gray"> No event scheduled</Text></Flex>
        } */}
      </Flex>
    </Card>
  );
};

export default CalenderCard;
