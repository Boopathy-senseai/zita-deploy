import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { calendarRoute } from '../../appRoutesPath';
import SvgInfo from '../../icons/SvgInfo';
import SvgNotes from '../../icons/SvgNotes';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgMeetingicon from '../../icons/SvgMeetingicon';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import { BLACK, WHITE } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { firstNameChar, isEmpty } from '../../uikit/helper';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import {
  clientSecret,
  googleClientId,
} from '../accountsettingsmodule/integrationmodule/IntegrationScreen';
import {
  calenderTokenGetMiddleWare,
  calenderTokenMiddleWare,
} from '../accountsettingsmodule/integrationmodule/store/middleware/integrationmiddleware';
import RichText from '../common/RichText';
import Loader from '../../uikit/Loader/Loader';
import { CANCEL, config, mediaPath } from '../constValue';
import { outlookTimeZone } from '../dashboardmodule/empdashboard/mock';
import { meetingTitle } from './MeetingTable';
import NotesDropDown from './NotesDropDown';
import styles from './notestab.module.css';
import {
  applicantNotesMiddleWare,
  calenderMiddleWare,
  syncGoogleMiddleWare,
  syncOutlookMiddleWare,
  checkAuthMiddleware,
  eventsApplicantsMiddleware,
  IntergratemailMiddleWare,
} from './store/middleware/applicantProfileMiddleware';
var querystring = require('querystring');

const cx = classNames.bind(styles);

export type FormProps = {
  notes: string;
};
const initial: FormProps = {
  notes: '',
};

type Props = {
  isMeeting?: boolean;
  eventchang?: boolean;
};
const Notesmeet = ({ isMeeting, eventchang }: Props) => {
  const [isCollapse, setCollapse] = useState(false);
  const [isColor, setColor] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState('Add');
  const [getId, setGetId] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const [active, setActive] = useState(0);
  const [isGoogle, setIsGoogle] = useState(2);
  const [isLoad, setIsLoad] = useState(true);
  const [myevents, setMyevents] = useState<any[]>([]);
  const history = useHistory(); 
  useEffect(() => {
    dispatch(IntergratemailMiddleWare());
  }, []);
  const checkAuth = () => {
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          if (res.payload.account === 'google') {
            setIsGoogle(1);
          } else {
            setIsGoogle(0);
          }
          setActive(1);
          setIsLoad(false);
          dispatch(eventsApplicantsMiddleware({ can_id }))
            .then((response) => {
              if (response.payload.status === true) {
                setMyevents(
                  response.payload.data.map((items: any, index) => {
                    const Time = Math.floor(items.duration/60)  
                    return {
                      title: items.event_type + ' ' + items.applicant,
                      organizer: response.payload.user,
                      date: items.s_time,
                      time: `${moment(items.s_time.slice(11, 16), [
                        'HH.mm',
                      ]).format('hh:mm a')}  - ${moment(
                        items.e_time.slice(11, 16),
                        ['HH.mm'],
                      ).format('hh:mm a')}`,
                      web_url: items.eventId,
                      data: mail,
                      index: index,
                     Time: Time,
                    };
                  }),
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setActive(0);
          setIsLoad(false);
        }
      })
      .catch(() => {
        console.log('Error');
      });
  };
  useEffect(() => {
    checkAuth();
    const colorCode = [
      '#d08014',
      '#d04343',
      '#db1f77',
      '#c0399f',
      '#6367de',
      '#286eb4',
      '#0f828f',
      '#7ca10c',
      '#925ace',
      '#647987',
    ];

    setColor(colorCode);
  }, []);

  const {
    candidate_details,
    notes,
    can_id,
    // calenderEvent,
    email,
    mail,
    jd_id,
    jd,
    google,
    outlook,
    calenderLoader,
  } = useSelector(
    ({
      applicantNotesReducers,
      applicantProfileInitalReducers,
      calenderReducers,
      applicantIntegratemailReducers,
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        notes: applicantNotesReducers.notes,
        can_id: applicantProfileInitalReducers.can_id,
        // calenderEvent: calenderReducers.event,
        google: calenderReducers.google,
        outlook: calenderReducers.outlook,
        jd:applicantProfileInitalReducers.jd?.job_title,
        jd_id: applicantProfileInitalReducers.jd_id,
        calenderLoader: calenderReducers.isLoading,
        email:
          applicantIntegratemailReducers.email !== undefined ?
          applicantIntegratemailReducers.email[0]?.email:'',
        mail: applicantIntegratemailReducers?.mail,
      };
    },
  ); 
  const [utcDate, setUTCDate] = useState(new Date());
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  useEffect(() => {
    const interval = setInterval(() => {
      setUTCDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  // notes submit function
  const handleSubmit = (values: FormProps) => {
    const data = querystring.stringify({
      pk: can_id,
      notes: values.notes,
    });

    if (buttonName === 'Add') {
      axios.post(`candidate_notes?pk=${can_id}`, data).then(() => {
        setCollapse(false);
        dispatch(applicantNotesMiddleWare({ can_id }));
        Toast('Notes added successfully', 'LONG', 'success');
      });
    }

    const dataOne = querystring.stringify({
      pk: getId,
      notes: values.notes,
      update: 'update',
    });

    if (buttonName === 'Update') {
      axios.post(`candidate_notes?pk=${can_id}`, dataOne, config).then(() => {
        setCollapse(false);
        dispatch(applicantNotesMiddleWare({ can_id }));
        if (buttonName === 'Update') {
          Toast('Notes updated successfully', 'LONG', 'success');
        }
      });
    }
  };
  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });
  // add notes function
  const hanldeInputOpen = () => {
    setButtonName('Add');
    setCollapse(true);
    formik.setFieldValue('notes', '');
  };
  // close notes function
  const hanldeInputClose = () => {
    setCollapse(false);
    formik.setFieldValue('notes', '');
  };

  // notes delete function
  const handleDelete = (id: number) => {
    axios.delete('candidate_notes', { params: { pk: id } }).then(() => {
      Toast('Notes deleted successfully');
      dispatch(applicantNotesMiddleWare({ can_id }));
    });
  };

  // notes submit function
  const handleOpenEdit = (value: string, id: any) => {
    setButtonName('Update');
    setGetId(id);
    formik.setFieldValue('notes', value);
    setCollapse(true);
  };
  // const checkPlatForm =
  //   google && google.length === 0 && outlook && outlook.length === 0
  //     ? true
  //     : false;
  const getOut: any = localStorage.getItem('timeZone');

  // refresh calendar function
  const hanldeRefresh = () => {
    dispatch(calenderTokenGetMiddleWare()).then((res) => {
      if (!isEmpty(res.payload.google)) {
        axios
          .request({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            params: {
              client_id: googleClientId,
              client_secret: clientSecret,
              refresh_token: res.payload.google[0].accessToken,
              grant_type: 'refresh_token',
            },
          })
          .then((refresh) => {
            dispatch(
              calenderTokenMiddleWare({
                calendar: 'google',
                info: {
                  accessToken: refresh.data.access_token,
                  email: res.payload.google[0].email,
                  timeZone: getOut,
                },
              }),
            );
          })
          .then(() => {
            dispatch(syncGoogleMiddleWare()).then(() => {
              dispatch(calenderMiddleWare({ can_id }));
            });
          });
      }

      if (!isEmpty(res.payload.outlook)) {
        dispatch(syncOutlookMiddleWare()).then(() => {
          dispatch(calenderMiddleWare({ can_id }));
        });
      }
    });
  };
  const handleSetting = () => {
    sessionStorage.setItem('superUserTab', '4');
    sessionStorage.setItem('superUserFalseTab', '3');
    history.push('/account_setting/settings');
  };

  const meetingMemo = useMemo(() => meetingTitle(), [myevents]);

  const currentDate = new Date(); // This gives you the current date and time in the user's local time zone.
  const currentUtcDate = new Date(
    Date.UTC(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
    ),
  );
  const utcOptions = { timeZone: 'UTC' };
  const formattedUtcTime = currentUtcDate.toLocaleString('en-US', utcOptions);
  const offsetInMinutes = new Date().getTimezoneOffset();
  const schedulehandleClick = () => {
    
    window.open(calendarRoute);
    localStorage.setItem('Applicantname',candidate_details[0].first_name+' '+candidate_details[0].last_name)
    localStorage.setItem('Jdname',jd)
    localStorage.setItem('jdid',can_id) 
  }
  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 120}
    > 
      {isMeeting && (
        <Flex flex={6} columnFlex style={{ padding: '5px' }}>
          <Flex row between center marginTop={25} className={styles.borderbellow}>
            <Flex>
              <Flex>
                <Text color="theme" bold className={styles.meetingFlex}>
                  Details
                </Text>
              </Flex>
              <Flex >
                {isGoogle === 1 && (
                  <Flex>
                    <Flex row>
                      <Flex className={styles.syncedWidth}>
                        <Text color="theme" style={{ fontSize: '13px' }}>
                          Synced with :
                        </Text>
                      </Flex>
                      <Flex marginLeft={5}>
                        <Text>{email}</Text>
                      </Flex>
                    </Flex>
                    <Flex row>
                      <Flex className={styles.syncedWidth}>
                        <Text
                          color="theme"
                          style={{ fontSize: '13px', marginRight: '15px' }}
                        >
                          Time zone :
                        </Text>
                      </Flex>
                      <Flex>{userTimezone}</Flex>
                    </Flex>
                  </Flex>
                )}
                {isGoogle === 0 && (
                  <Flex>
                    <Flex row>
                      <Flex className={styles.syncedWidth}>
                        <Text color="theme" style={{ fontSize: '13px' }}>
                          Synced with :
                        </Text>
                      </Flex>
                      <Flex marginLeft={5}>
                        {' '}
                        <Text style={{ fontSize: '13px' }}>{email}</Text>{' '}
                      </Flex>
                    </Flex>
                    <Flex row>
                      <Flex className={styles.syncedWidth}>
                        <Text
                          color="theme"
                          style={{ fontSize: '13px', marginRight: '15px' }}
                        >
                          Time zone :
                        </Text>
                      </Flex>
                      <Flex style={{ fontSize: '13px' }}>{userTimezone}</Flex>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Flex>
            {active === 0 ? (
              <Flex row center middle className={styles.syncedWidth}>
                <Button
                  types="primary"
                  className={styles.settingBtn}
                  onClick={handleSetting}
                >
                  Integrate
                </Button>
              </Flex>
            ) : (
              <Flex row end center middle>
                <Flex end marginRight={10} height={30}>
                <Button
                
                  types="secondary"
                  className={styles.syncBtn}
                  onClick={hanldeRefresh}
                >
                  <Flex row center>
                    <Text
                      bold
                      style={{
                        marginRight: 4,
                        marginLeft: 4,
                        cursor: 'pointer',
                        color: '#333333',
                      }}
                    >
                      Sync
                    </Text>
                    <SvgRefresh height={14} width={14} fill={'#333333'} />
                  </Flex>
                </Button>
                </Flex>
                <Flex height={30} >
                  <Button  onClick={schedulehandleClick}  types="primary">
                  Schedule event
                  </Button>
                  </Flex>
              </Flex>
            )}
          </Flex>

          {active === 0 && (
            <Flex>
              <Flex center middle marginTop={100}>
                <SvgMeetingicon />
              </Flex>
              <Flex center middle marginTop={10}>
                <Text style={{ fontSize: '13px' }}>
                  Integrate your calendar with Zita to schedule meetings
                </Text>
              </Flex>
            </Flex>
          )}
          {active !== 0 && myevents.length === 0 && (
            <Flex>
              <Flex center middle marginTop={100}>
                <SvgMeetingicon />
              </Flex>
              <Flex center middle marginTop={10}>
                <Text style={{ fontSize: '13px' }}>
                  Meetings not yet scheduled
                </Text>
              </Flex>
            </Flex>
          )}
          {active !== 0 && myevents.length !== 0 && (
            <Flex>
              <Table
                border={'outline'}
                columns={meetingMemo}
                dataSource={myevents}
                empty="No meetings scheduled yet"
                isLoader={calenderLoader}
              />
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Notesmeet;
