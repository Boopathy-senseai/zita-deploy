import { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import SvgCalendar from '../../icons/SvgCalendar';
import SvgDownload from '../../icons/SvgDownload';
import SvgView from '../../icons/SvgView';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
// import Modal from '../../uikit/Modal/Modal';
import Card from '../../uikit/Card/Card';
// import SvgOrganizer from '../../icons/SvgOrganizer';
// import SvgInterviewCalendar from '../../icons/SvgInterviewCalendar';
// import SvgInterviewers from '../../icons/SvgInterviewers';
import {
  // GARY_4,
  PRIMARY,
} from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { getDateString, isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import Loader from '../../uikit/Loader/Loader';
import { ADD_FAV, dndBoardId, REMOVE_FAV } from '../constValue';
import {
  checkAuthMiddleware,
  getUsersByCompanyMiddleware,
  getEventsMiddleware,
  getGoogleEventsMiddleware,
  syncOutlookMiddleWare,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import MeetingSchedulingScreen from '../calendarModule/MeetingSchedulingScreen';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
import {
  CALENDAR,
  EditEventDetails,
  GoogleEventType,
  ZitaEventType,
} from '../calendarModule/types';
import { getEditEventsDetails } from '../calendarModule/util';
import SvgHeart from '../../icons/SvgHearts';
import {
  GoogleEntity,
  ICardSelectionData,
  JobDetailsEntity,
} from './applicantPipeLineTypes';
import { handleDownload, hanldeFavAction } from './dndBoardHelper';
import ProfileView from './ProfileView';

import styles from './multitask.module.css';
import { IStageColumn } from './dndBoardTypes';

type Props = {
  task: any;
  index: number;
  isBorder: string;
  column: IStageColumn;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
  job_details: JobDetailsEntity;
  onClick?: (data: ICardSelectionData) => void;
  isSelected: boolean;
};
const MultiTask = ({
  task,
  index,
  isBorder,
  column,
  google,
  outlook,
  job_details,
  onClick,
  isSelected,
}: Props) => {
  const { section, columnId, stage_name } = column;
  const [isCalender, setCalender] = useState('popup');
  const [isProfileView, setProfileView] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const workExp =
    task.work_exp > 1 ? task.work_exp + ' Years' : task.work_exp + ' Year';
  const match = isEmpty(task.match) ? 0 : task.match;

  useEffect(() => {
    if (google?.length === 0 && outlook?.length === 0) {
      setCalender('popup');
    }
    if (outlook?.length === 1) {
      setCalender('outlook');
    }
    if (google?.length === 1) {
      setCalender('google');
    }
  }, [google, outlook]);

  // const calenderTitle =
  //   isCalender === 'popup'
  //     ? 'Integrate your calendar to schedule meetings'
  //     : 'Schedule Meetings';

  // let link: string;
  // if (isCalender === 'outlook') {
  //   link = 'https://outlook.office365.com/calendar/view/week';
  // }
  // if (isCalender === 'google') {
  //   link = 'https://calendar.google.com/calendar/u/0/r?tab=rc';
  // }
  const getDate =
    getDateString(new Date(), 'DD MMM YYYY') ===
    getDateString(task.created_on, 'DD MMM YYYY');

  const hanldeProfileView = () => {
    setProfileView(true);
  };
  const [editDetails, setEditDetails] = useState<EditEventDetails>();
  const [editEvent, setEditEvent] = useState(false);
  const [eventId, setEventId] = useState('');
  const editEventHandler = () => {
    let candId = task.candidate_id_id;
    let jdId = task.jd_id_id;
    dispatch(getEventsMiddleware({ candId, jdId }))
      .then((res) => {
        console.log(res);
        if (res.payload.data === true) {
          setEventId(res.payload.event[0].eventId);
          setEditDetails(
            res.payload.event.map((event: ZitaEventType) =>
              getEditEventsDetails(event),
            ),
          );
          setEditEvent(true);
          console.log(res.payload.events);
        } else {
          console.log('error');
          setEditEvent(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const scheduleEventHandler = () => {
    setIsLoad(true);
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          if (res.payload.account === 'google') {
            setIsGoogle(1);
          } else {
            setIsGoogle(0);
          }
          getEventHandler(res.payload.account);
        } else {
          console.log('error');
          setActive(0);
        }
      })
      .then(() => {
        dispatch(getUsersByCompanyMiddleware()).then((res) => {
          setUsers(
            res.payload.users.map(
              (items: {
                email: string;
                first_name: string;
                last_name: string;
                user_id: number;
              }) => {
                return {
                  email: items.email,
                  firstName: items.first_name,
                  lastName: items.last_name,
                  userId: items.user_id,
                };
              },
            ),
          );
        });
      })
      .then(() => {
        // let candId = task.candidate_id_id
        // let jdId = task.jd_id_id
        // dispatch(getEventsMiddleware({candId,jdId})).then((res) => {
        //   console.log(res)
        //   if(res.payload.data === true){
        //     let stime = new Date(res.payload.event[0].s_time).toLocaleTimeString('en',
        //     { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
        //     let etime = new Date(res.payload.event[0].e_time).toLocaleTimeString('en',
        //     { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
        //     setValue([
        //       {
        //         'applicant':res.payload.event[0].applicant,
        //         'sDate':res.payload.event[0].s_time,
        //         'sTime':stime,
        //         'eTime':etime,
        //         'event':res.payload.event[0].event_type,
        //         'interviewers':res.payload.event[0].interviewers.split(",")
        //       }
        //     ])
        //     setIsLoad(false);
        //     setCard(true);
        //   }
        //   else{
        //     setIsLoad(false);
        //     openForm();
        //   }
        // }).catch(() => {
        //   setIsLoad(false);
        // })
        editEventHandler();
      });
  };
  // const [value,setValue] = useState<any[]>([]);
  // const [card,setCard] = useState(false);
  const [isGoogle, setIsGoogle] = useState(2);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [active, setActive] = useState(0);
  const [isLoad, setIsLoad] = useState(true);
  const [myevents, setMyevents] = useState<any[]>([]);
  const [userName, setUserName] = useState('');

  // const [download,setdownload]=useState(["candidate_resume/AnshulKhare_1_iLsbaL2.doc","candidate_resume/AmarJain_1_w74asKQ.doc"])

  const openForm = () => {
    setOpen((prevState) => !prevState);
  };
  const getEventHandler = (account: string) => {
    if (account === 'google') {
      console.log('google');
      let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      dispatch(getGoogleEventsMiddleware({ tz }))
        .then((res) => {
          console.log(res);
          const data = res.payload.events;
          let name = '';
          if (res.payload.user[0].user__first_name) {
            name += res.payload.user[0].user__first_name;
            name += ' ';
          }
          if (res.payload.user[0].user__last_name) {
            name += res.payload.user[0].user__last_name;
          }
          console.log('^^^^^^^^^^^^^66', name);
          setUserName(name);
          setMyevents(
            data.map((items: GoogleEventType) => {
              const eventData: any = {
                user: res.payload.userId,
                title: items.summary,
                start: new Date(items.start.dateTime),
                end: new Date(items.start.dateTime),
                link: 'hangoutLink' in items ? items.hangoutLink : '',
                eventId: items.id,
                color: '#fcba03',
                organizer: items.organizer.email,
                synced: res.payload.user[0].user__first_name,
              };

              if ('attendees' in items) {
                eventData['attendees'] = items.attendees.map(
                  (attendee: { email: any }) => {
                    return attendee.email;
                  },
                );
              }
              return eventData;
            }),
          );
          setIsLoad(false);
          setActive(1);
          setOpen(true);
        })
        .catch((err) => {
          setIsLoad(false);
          console.log(err);
        });
    } else {
      console.log('outlook');
      dispatch(syncOutlookMiddleWare())
        .then((res) => {
          console.log(res);
          let name = '';
          if (res.payload.user[0].user__first_name) {
            name += res.payload.user[0].user__first_name;
            name += ' ';
          }
          if (res.payload.user[0].user__last_name) {
            name += res.payload.user[0].user__last_name;
          }
          setUserName(name);
          setMyevents(
            res.payload.events.map(
              (items: {
                created_by: string;
                attendees: string;
                event_id: string;
                title: any;
                start_time: string | number | Date;
                end_time: string | number | Date;
              }) => {
                return {
                  user: res.payload.userId,
                  title: items.title,
                  start: new Date(items.start_time),
                  end: new Date(items.end_time),
                  eventId: items.event_id,
                  attendees: items.attendees,
                  organizer: items.created_by,
                  link: '',
                  color: '#fcba03',
                  synced: res.payload.user[0].user__first_name,
                };
              },
            ),
          );
          setIsLoad(false);
          setActive(1);
          setOpen(true);
        })
        .catch((err) => {
          setIsLoad(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setIsLoad(false);
  }, []);
  // const cardHandler = () => {
  //   setCard(false);
  // }

  return (
    <>
      {isLoad && <Loader />}
      {open && active === 1 ? (
        <div>
          {editEvent === true ? (
            <MeetingSchedulingScreen
              username={userName}
              currentUserEvents={myevents}
              cand_email={task.email}
              editEventDetails={editDetails}
              eventId={eventId}
              cand_id={task.candidate_id_id}
              jd_id={task.jd_id_id}
              cand_name={task.name}
              jd_name={job_details.job_title}
              // app_pipeline={true}
              calendarProvider={isGoogle ? CALENDAR.Google : CALENDAR.Outlook}
              teamMembers={users}
              openScheduleForm={open}
              handleEventScheduleForm={openForm}
            />
          ) : (
            <MeetingSchedulingScreen
              username={userName}
              currentUserEvents={myevents}
              cand_email={task.email}
              cand_id={task.candidate_id_id}
              jd_id={task.jd_id_id}
              cand_name={task.name}
              jd_name={job_details.job_title}
              // app_pipeline={true}
              calendarProvider={isGoogle ? CALENDAR.Google : CALENDAR.Outlook}
              teamMembers={users}
              openScheduleForm={open}
              handleEventScheduleForm={openForm}
            />
          )}
        </div>
      ) : null}
      {/* {card && 
        <Modal open={true}>
          <Flex column className={styles.overAll}>
            <Flex row marginBottom={"1%"}>
              <Text>{value[0].event}  with {value[0].applicant}</Text>
              <Flex onClick={cardHandler}>
                <SvgCloseSmall />
              </Flex>
            </Flex>
            <Flex row marginBottom={"2%"}>
              <SvgInterviewCalendar />
              <Flex column marginLeft={'1%'}>
                <Text>{value[0].sDate.slice(0,25)}</Text>
                <Flex row>
                  <Text>{value[0].sTime} to </Text>
                  <Text>{value[0].eTime}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex row marginBottom={'1%'}>
              <SvgInterviewers />
              <Flex marginLeft={'4%'}>
                {value[0].interviewers.length>0 ?
                    <Flex column>
                        <Text>Attendees</Text>
                        {value[0].interviewers.map((items: string) => (
                            <Text key={index}>{items}</Text>
                        ))}
                    </Flex>
                    : null
                }
              </Flex>
            </Flex>
            <Flex row marginBottom={'1%'}>
              <SvgOrganizer />
              <Flex column marginLeft={'4%'}>
                  <Text>{userName}</Text>
                  <Text>Organizer</Text>
              </Flex>
            </Flex>
          </Flex>

        </Modal>
      } */}
      <ProfileView
        open={isProfileView}
        cancel={() => setProfileView(false)}
        jobId={task.jd_id_id}
        candidateId={task.candidate_id_id}
      />
      <Draggable draggableId={task.id.toString() + dndBoardId} index={index}>
        {(provided) => (
          <div
            className={styles.container}
            style={{ cursor: 'pointer' }}
            ref={provided.innerRef}
            // eslint-disable-next-line
            {...provided.dragHandleProps}
            // eslint-disable-next-line
            {...provided.draggableProps}
            // isDragging={snapshot.isDragging}
          >
            <Card className={styles.cardStyle}>
              <Flex
                className={styles.cardFlexStyle}
                style={{
                  borderColor: isBorder,
                  borderLeftColor: isBorder,
                  backgroundColor: isSelected ? `${isBorder}40` : undefined,
                  cursor: 'pointer',
                }}
                onClick={() => {
                  if (onClick) {
                    onClick({ task, section, columnId });
                  }
                }}
              >
                <Flex
                  row
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ position: 'relative', cursor: 'pointer' }}>
                    <div
                      className={styles.profile}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        style={{ objectFit: 'contain' }}
                        alt=""
                        className={styles.profile}
                        src={`${process.env.REACT_APP_HOME_URL}media/${task.image}`}
                      />
                      <div className={styles.percentageStyle}>
                        <Text bold>{match}%</Text>
                      </div>
                    </div>
                  </div>
                  <Flex
                    columnFlex
                    className={styles.nameContainer}
                    style={{ cursor: 'pointer' }}
                  >
                    <Flex
                      row
                      center
                      marginRight={16}
                      style={{ cursor: 'pointer' }}
                    >
                      <Button
                        types="link"
                        className={styles.linkBtnStyle}
                        onClick={(e) => {
                          hanldeProfileView();
                          e.stopPropagation();
                        }}
                      >
                        <Text
                          bold
                          color="theme"
                          textStyle={'ellipsis'}
                          title={task.name}
                        >
                          {task.name}
                        </Text>
                      </Button>

                      <div
                        title={
                          isEmpty(task.viewed)
                            ? 'Yet to View'
                            : 'Profile Viewed'
                        }
                        className={styles.svgView}
                      >
                        <SvgView
                          nonView={isEmpty(task.viewed)}
                          width={16}
                          height={16}
                        />
                      </div>
                    </Flex>
                    <Flex row center style={{ cursor: 'pointer' }}>
                      {task.location && (
                        <Text
                          size={12}
                          color="black2"
                          textStyle="ellipsis"
                          title={task.location}
                          style={{ maxWidth: '40%', marginRight: 2 }}
                        >
                          {task.location}
                        </Text>
                      )}
                      {task.location && workExp && (
                        <Text color="black2"> | </Text>
                      )}
                      <Text
                        size={12}
                        color="black2"
                        textStyle="ellipsis"
                        style={{ marginLeft: 2 }}
                      >
                        {workExp}
                      </Text>
                    </Flex>
                    <Flex style={{ cursor: 'pointer' }}>
                      <Text size={12} color="black2" textStyle="ellipsis">
                        {task.qualification}
                      </Text>
                    </Flex>
                    <Flex style={{ cursor: 'pointer' }}>
                      <Text
                        size={12}
                        color="black2"
                        textStyle="ellipsis"
                        title={getDateString(task.created_on, 'll hh:mm A')}
                      >
                        {getDateString(task.created_on, 'll hh:mm A')}
                        {/* {task.created_on} */}
                        {/* {getDateString(user_info?.last_login, 'll hh:mm A')} */}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex row end center style={{ cursor: 'pointer' }}>
                  {columnId === 0 && getDate && (
                    <Flex
                      className={styles.svgNewTag}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        style={{ objectFit: 'contain' }}
                        alt=""
                        height={19}
                        width={45}
                        src="https://i.ibb.co/fFSqFCW/new.png"
                      />
                    </Flex>
                  )}
                  <Flex
                    row
                    end
                    center
                    className={styles.svgContainer}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* {console.log('--file download--', task.file)} */}
                    <div
                      title="Download Resume"
                      onClick={(e) => {
                        handleDownload(task.file);
                        e.stopPropagation();
                      }}
                      tabIndex={-1}
                      role={'button'}
                      onKeyPress={() => {}}
                    >
                      <SvgDownload
                        className={styles.svgDownloadStyle}
                        width={16}
                        height={16}
                      />
                    </div>
                    <div
                      title={isEmpty(task.fav) ? ADD_FAV : REMOVE_FAV}
                      onClick={(e) => {
                        hanldeFavAction(
                          task.candidate_id_id,
                          task.jd_id_id,
                          dispatch,
                        );
                        e.stopPropagation();
                      }}
                      tabIndex={-1}
                      role={'button'}
                      onKeyPress={() => {}}
                    >
                      <SvgHeart
                        className={styles.svgDownloadStyle}
                        width={16}
                        height={16}
                        filled={!isEmpty(task.fav)}
                        fill="#ED4857"
                      />
                    </div>
                    {columnId !== 0 && stage_name !== 'Rejected' && (
                      // <a
                      //   rel="noopener noreferrer"
                      //   title={calenderTitle}
                      //   className={
                      //     isCalender === 'popup'
                      //       ? styles.svgCalnStyle
                      //       : styles.svgDownloadStyle
                      //   }
                      //   href={link}
                      //   target={'_blank'}
                      // >
                      <Flex
                        onClick={scheduleEventHandler}
                        style={{ cursor: 'pointer' }}
                      >
                        <SvgCalendar fill={PRIMARY} width={16} height={16} />
                      </Flex>
                      // </a>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default MultiTask;
