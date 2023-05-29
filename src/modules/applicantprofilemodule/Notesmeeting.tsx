import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SvgInfo from '../../icons/SvgInfo';
import SvgNotes from '../../icons/SvgNotes';
import SvgRefresh from '../../icons/SvgRefresh';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import { BLACK } from '../../uikit/Colors/colors';
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
};
const Notesmeet = ({ isMeeting }: Props) => {
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

  const checkAuth = () => {
     
    dispatch(checkAuthMiddleware())
      .then((res) => {
        console.log(res);
        if (res.payload.status === true) {
          console.log(res.payload);
          if (res.payload.account === 'google') {
            setIsGoogle(1);
          } else {
            setIsGoogle(0);
          }
          setActive(1);
          setIsLoad(false);
          dispatch(eventsApplicantsMiddleware({ can_id }))
            .then((response) => {
              console.log(response);
              if (response.payload.status === true) {
                setMyevents(
                  response.payload.data.map((items: any) => {
                    return {
                      title: items.event_type + ' ' + items.applicant,
                      organizer: response.payload.user,
                      date: items.s_time,
                      time:
                        items.s_time.slice(12, 16) +
                        ' - ' +
                        items.e_time.slice(12, 16),
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
    // google,
    outlook,
    calenderLoader,
  } = useSelector(
    ({
      applicantNotesReducers,
      applicantProfileInitalReducers,
      calenderReducers,
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        notes: applicantNotesReducers.notes,
        can_id: applicantProfileInitalReducers.can_id,
        // calenderEvent: calenderReducers.event,
        // google: calenderReducers.google,
        outlook: calenderReducers.outlook,
        calenderLoader: calenderReducers.isLoading,
      };
    },
  );
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
  console.log(candidate_details);
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
  const checkCalendarOutlook = Array.isArray(outlook) && outlook.length !== 0;
  // const checkCalendarGoogle = Array.isArray(google);

  // const getOutLookTime: any = checkCalendarOutlook && outlook.length !==0 && outlook[0].timeZone;
  // const getGoogleTime: any = checkCalendarGoogle && google.length !==0 && google[0].timeZone;

  // const checkCalendar =
  //   checkCalendarGoogle === true || checkCalendarOutlook === true
  //     ? true
  //     : false;

  // useEffect(() => {
  //   if (checkCalendar) {
  //     localStorage.setItem(
  //       'timeZone',
  //       checkCalendarOutlook
  //         ? getOutLookTime
  //         : getGoogleTime,
  //     );
  //   }
  // }, [outlook, google, checkCalendarOutlook,checkCalendar]);

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      {/* <Flex
        flex={1}
        columnFlex
        className={cx({ notesOverAllContainer: isMeeting })}
      >
        <Flex row center between>
          <Text color="theme" bold>
            Notes
          </Text>
          <Button disabled={isCollapse} onClick={hanldeInputOpen}>
            Add Notes
          </Button>
        </Flex>
        {notes && notes.length === 0 && !isCollapse && (
          <Flex columnFlex flex={1} middle center>
            <SvgNotes />
            <Text color="gray">No notes created yet</Text>
          </Flex>
        )}
        {isCollapse && (
          <Flex>
            <div className={styles.textArea}>
              <RichText
                height={200}
                value={formik.values.notes}
                onChange={formik.handleChange('notes')}
                placeholder="You can add and save details regarding the candidate"
              />
            </div>
            <Flex row end>
              <Button onClick={hanldeInputClose} types="secondary">
                {CANCEL}
              </Button>
              <Button
                disabled={isEmpty(formik.values.notes)}
                onClick={formik.handleSubmit}
                className={styles.saveBtn}
              >
                {buttonName}
              </Button>
            </Flex>
          </Flex>
        )}

        {notes &&
          notes
            .map((list, indexList) => {
              return (
                <Flex
                  key={list.notes + indexList}
                  columnFlex
                  className={styles.notesOverAll}
                >
                  <Flex row center>
                    {isEmpty(list.emp_image) ||
                    list.emp_image === 'default.jpg' ? (
                      <div
                        className={cx('profile')}
                        style={{
                          backgroundColor: isColor[indexList % isColor.length],
                        }}
                      >
                        <Text color="white" transform="uppercase">
                          {!isEmpty(list.updated_by) &&
                            firstNameChar(list.updated_by)}
                        </Text>
                      </div>
                    ) : (
                      <img
                        alt="profile"
                        height={40}
                        width={40}
                        style={{
                          borderRadius: '100%',
                          objectFit: 'cover',
                          marginRight: 8,
                          height: 40,
                        }}
                        src={mediaPath + list.emp_image}
                      />
                    )}
                    <Text bold>{list.updated_by}</Text>
                  </Flex>
                  <Flex className={styles.noteListStyle}>
                    <NotesDropDown
                      notesList={list}
                      handleDelete={handleDelete}
                      handleOpenEdit={handleOpenEdit}
                    />
                    <td
                      className={styles.notesTextStyle}
                      dangerouslySetInnerHTML={{
                        __html: list.notes,
                      }}
                    />
                  </Flex>
                </Flex>
              );
            })
            .reverse()}
      </Flex>
      {isLoad && <Loader />} */}
      {isMeeting && (
        <Flex columnFlex>
          <Flex row center>
            <Text color="theme" bold className={styles.meetingFlex}>
              Meeting Detail:
            </Text>
            {active === 0 ? (
              <Flex row center className={styles.syncedWidth}>
                (<SvgInfo className={styles.svgInfo} height={14} width={14} />
                <Text>
                  Integrate your calendar with Zita to schedule meetings)
                </Text>
                <Button
                  types="tertiary"
                  className={styles.settingBtn}
                  onClick={handleSetting}
                >
                  Settings
                </Button>
              </Flex>
            ) : (
              <>
                {isGoogle === 1 && (
                  <Text className={styles.syncedWidth}>
                    (Synced with gmail)
                  </Text>
                )}

                {isGoogle === 0 && (
                  <Text className={styles.syncedWidth}>
                    (Synced with outlook)
                  </Text>
                )}
                <Flex row center>
                  <Button
                    types="tertiary"
                    className={styles.syncBtn}
                    onClick={hanldeRefresh}
                  >
                    <Flex row center>
                      <SvgRefresh height={14} width={14} fill={BLACK} />
                      <Text
                        bold
                        size={12}
                        style={{ marginLeft: 4, cursor: 'pointer' }}
                      >
                        Sync
                      </Text>
                    </Flex>
                  </Button>
                  <Text style={{ marginLeft: 8 }} color="gray" size={12}>
                    Timezone:{' '}
                    {checkCalendarOutlook ? outlookTimeZone[getOut] : getOut}
                  </Text>
                </Flex>
              </>
            )}
          </Flex>
          <Table
            columns={meetingMemo}
            dataSource={myevents}
            empty="No meetings scheduled yet"
            isLoader={calenderLoader}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default Notesmeet;
