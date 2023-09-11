import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import toast from 'react-hot-toast';
import { InputText } from '../../uikit';

import { AppDispatch } from '../../store';
import { friendsEventsMiddleware } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { Modal } from '../../uikit/v2';
import { TopLineLoader } from '../../uikit/v2/Loader';
import styles from './styles/addInterviewersUI.module.css';
import './styles/addInterviewers.css';
import {
  CalendarEventType,
  GoogleEventType,
  InterviewInfo,
  OutlookEventType,
  TeamMemberType,
  UserInfo,
  UserType,
} from './types';
import { getUsersByCompanyIdMiddleware } from './store/middleware/calendarmiddleware';
import SelectTeamMemberCheckBox from './SelectTeamMemberIcon';
import { getColor } from './colors';
import { formatEventTitle } from './util';
import SimpleToolBar from './calendar-components/SimpleToolBar';
import ColorEvent from './calendar-components/ColorEvent';
import WeekHeader from './calendar-components/WeekHeader';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// import WeekHeader from './calendar-components/WeekHeader';

let localizer = momentLocalizer(moment);
interface TeamInfo {
  id: number;
  name: string;
  email: string;
}

type Props = {
  openAddInterviewerModal: boolean;
  teamMembers: TeamMemberType[];
  currentUserEvents: CalendarEventType[];
  userLabel: string;
  jd: string;
  username: string;
  selectedInterviewers: TeamMemberType[];
  currentUser: UserInfo;
  closeAddInterviewerSlider: () => void;
  addTeamInterviewer: (info: InterviewInfo) => void;
  removeTeamInterviewer: (info: InterviewInfo) => void;
};

const AddInterviewersUI = ({
  openAddInterviewerModal,
  closeAddInterviewerSlider,
  teamMembers,
  currentUserEvents,
  addTeamInterviewer,
  removeTeamInterviewer,
  userLabel,
  jd,
  username,
  selectedInterviewers,
  currentUser,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [myTeam, setMyTeam] = useState<TeamMemberType[]>();
  const [teamMemberEvents, setTeamMemberEvents] =
    useState<CalendarEventType[]>(currentUserEvents);
  const [searchTerm, setSearchTerm] = useState<string>();

  useEffect(() => {
    dispatch(getUsersByCompanyIdMiddleware())
      .then((res) => {
        if (res.payload.users.length > 0) {
          const interviewers = res.payload.users.map((user: TeamMemberType) => {
            return {
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              calendarEmail: user.calendarEmail,
            };
          });
          setMyTeam(interviewers);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelectInterviewers = (member: TeamMemberType) => {
    setSearchTerm('');
    if (
      selectedInterviewers.filter((user) => user.userId === member.userId)
        .length === 0
    ) {
      addTeamInterviewer(member);
      setIsLoading(true);
      dispatch(friendsEventsMiddleware({ userId: member.userId }))
        .then((res) => {
          if (res.payload.account === 'Not Found') {
            toast.error('User does not have calendar integration', {
              duration: 3500,
            });
          } else if (res.payload.account === 'Google') {
            setTeamMemberEvents((prevState) => [
              ...prevState,
              ...res.payload.events.map((items: GoogleEventType) => {
                const eventData: any = {
                  userId: member.userId,
                  title: items.summary,
                  start: new Date(items.start.dateTime),
                  end: new Date(items.start.dateTime),
                  link: 'hangoutLink' in items ? items.hangoutLink : '',
                  eventId: items.id,
                  organizer: items.organizer.email,
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
            ]);
          } else if (res.payload.account === 'Outlook') {
            setTeamMemberEvents((prevState) => [
              ...prevState,
              ...res.payload.events.map((items: OutlookEventType) => {
                return {
                  userId: member.userId,
                  title: items.title,
                  start: new Date(items.start_time),
                  end: new Date(items.end_time),
                  eventId: items.event_id,
                  attendees: items.attendees,
                  organizer: items.created_by,
                  link: '',
                };
              }),
            ]);
          }
        })
        .catch((err: any) => {
          console.error(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      removeTeamInterviewer(member);
      setTeamMemberEvents((events) =>
        events.filter(
          (event) => Number(event.userId) !== Number(member.userId),
        ),
      );
    }
  };

  const getMemberFullName = (member: TeamMemberType) => {
    return `${member.firstName} ${member.lastName}`;
  };

  const InterviewerDropDown = (
    <>
      <TopLineLoader show={isLoading} />

      <div>
        <div className={styles.inputSearchWrapper}>
          <InputText
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            placeholder={'Select team members'}
            value={searchTerm}
            className={styles.inputSearch}
          />
        </div>
        <div style={{ margin: '2px 4px' }}>
          {myTeam
            ?.filter((member) => {
              if (!searchTerm) {
                return member;
              }
              return getMemberFullName(member)
                .toLowerCase()
                .includes(searchTerm?.toLowerCase());
            })
            .map((member, index) => {
              return (
                <SelectTeamMemberCheckBox
                  label={getMemberFullName(member)}
                  checked={
                    selectedInterviewers.filter(
                      (user) => user.userId === member.userId,
                    ).length > 0 || currentUser.id === member.userId
                  }
                  disabled={currentUser.id === member.userId}
                  color={getColor(member.userId)}
                  onClick={() => handleSelectInterviewers(member)}
                  key={index}
                />
              );
            })}
        </div>
      </div>
    </>
  );

  return (
    <Modal
      open={openAddInterviewerModal}
      onClose={() => {
        closeAddInterviewerSlider();
      }}
      center={false}
      top={0}
      right={0}
      backgroundColor={'none'}
      boxShadow={false}
    >
      <div className={styles.addInterviewerContainer}>
        <div className={styles.addInterviewer}>
          <div className={styles.menus}>{InterviewerDropDown}</div>
          <div className={styles.calenderContent} style={{width:window.innerWidth-370}}>
            {currentUserEvents && (
              <BigCalendar
                localizer={localizer}
                events={teamMemberEvents}
                defaultView={'day'}
                views={['day', 'work_week', 'week', 'month']}
                dayLayoutAlgorithm={'no-overlap'}
                selectable
                popup={true}
                className={styles.calendar}
                titleAccessor={formatEventTitle}
                formats={{
                  eventTimeRangeFormat: () => '',
                }}
                // onShowMore={(events, date) =>
                //       useState({ showModal: true, events })
                //     }
                showAllEvents={true}
                components={{
                  toolbar: SimpleToolBar,
                  event: ColorEvent,
                  week: {
                    header: WeekHeader,
                  },
                  work_week: {
                    header: WeekHeader,
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddInterviewersUI;
