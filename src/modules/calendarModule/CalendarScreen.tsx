import {
  momentLocalizer,
  SlotInfo,
  Calendar as BigCalendar,
  DateLocalizer,
} from 'react-big-calendar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import moment from 'moment';
import { Flex, Text, Button, LinkWrapper, SelectTag } from '../../uikit';
import { SvgCalendar } from '../../icons';
import { AppDispatch } from '../../store';
import {
  getGoogleEventsMiddleware,
  checkAuthMiddleware,
  syncOutlookMiddleWare,
  getUsersByCompanyMiddleware,
  friendsEventsMiddleware,
  getApplicantsMiddleware,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { TopLineLoader } from '../../uikit/v2/Loader';
import {
  CALENDAR,
  CalendarType,
  GoogleEventType,
  OutlookEventType,
  ZitaEventType,
  EventPopUpDetails,
  UserType,
  UserInfo,
  TeamMemberType,
  SlotRangeType,
  EditEventDetails,
  CalendarEventType,
  CalendarOptions,
  ApplicantTypes,
} from './types';

import {
  deleteGoogleEventMiddleware,
  deleteOutlookEventMiddleware,
  googleEditEventMiddleware,
  outlookEditEventMiddleware,
  verifyEventMiddleware,
  getUrlMiddleware,
} from './store/middleware/calendarmiddleware';
import styles from './styles/calendarScreen.module.css';
import CalendarTypeMenu from './CalendarTypeMenu';
import {
  formatEventTitle,
  getEventMeetingType,
  SlotRangeInitialState,
} from './util';
import EventPopUpModal from './EventPopUpModal';
import { setColor } from './colors';
import ToolBar from './calendar-components/ToolBar';
import ColorEvent from './calendar-components/ColorEvent';
import WeekHeader from './calendar-components/WeekHeader';
import MeetingSchedulingScreen from './MeetingSchedulingScreen';
import CalendarScreenLoader from './CalendarScreenLoader';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const Calendar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<UserInfo>({
    id: null,
    name: null,
  });
  const [currentUserEvents, setCurrentUserEvents] = useState<
    CalendarEventType[]
  >([]);
  const [eventPopUpDetails, setEventPopUpDetails] =
    useState<EventPopUpDetails>();
  const [currentEventId, setCurrentEventId] = useState<string>();
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<number[]>([0]);
  const [teamMemberEvents, setTeamMemberEvents] = useState<CalendarEventType[]>(
    [],
  );
  const [visibleEvents, setVisibleEvents] = useState<CalendarEventType[]>([]);
  const [openScheduleForm, setOpenScheduleForm] = useState<boolean>(false);
  const [isCalendarIntegrated, setIsCalendarIntegrated] =
    useState<boolean>(false);
  const [calendarProvider, setCalendarProvider] = useState<CALENDAR | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTopLineLoading, setIsTopLineLoading] = useState<boolean>(false);
  const [currentCalendarType, setCurrentCalendarType] = useState<CalendarType>(
    CalendarType.MyCalendar,
  );
  const [tz, _] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [slotRange, setSlotRange] = useState<SlotRangeType>(
    SlotRangeInitialState,
  );
  const [showEventPopUpModal, setShowEventPopUpModal] =
    useState<boolean>(false);
  const [isEditEvent, setIsEditEvent] = useState<boolean>(false);
  const [editEventDetails, setEditEventDetails] = useState<EditEventDetails[]>(
    [],
  );
  const [isEventCanUpdate, setIsEventCanUpdate] = useState<boolean>(false);
  const [globalZones, setGlobalZones] = useState<
    { label: string; value: string }[]
  >([]);
  const [currentTimeZone, setCurrentTimeZone] = useState<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [localizer, setLocalizer] = useState<DateLocalizer>(
    momentLocalizer(moment),
  );
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false);
  const [myCalendarOptions, setMyCalendarOptions] = useState<CalendarOptions>({
    personalEvents: true,
    zitaEvents: true,
  });
  const [applicants, setApplicants] = useState<UserType[]>([]);

  const [teamCalendarOptions, setTeamCalendarOptions] =
    useState<CalendarOptions>({
      personalEvents: true,
      zitaEvents: true,
    });

  useEffect(() => {
    if (currentUser.id) {
      setColor(currentUser.id);
    }
  }, [currentUser.id]);

  useEffect(() => {
    if (currentCalendarType === CalendarType.MyCalendar) {
      if (myCalendarOptions.personalEvents && myCalendarOptions.zitaEvents) {
        setVisibleEvents(currentUserEvents);
      } else if (
        myCalendarOptions.personalEvents &&
        !myCalendarOptions.zitaEvents
      ) {
        setVisibleEvents(() => {
          return currentUserEvents.filter((event) => {
            if (!event.title?.includes('Zita event')) return event;
          });
        });
      } else if (
        !myCalendarOptions.personalEvents &&
        myCalendarOptions.zitaEvents
      ) {
        setVisibleEvents(() => {
          return currentUserEvents.filter((event) => {
            if (event.title?.includes('Zita event')) return event;
          });
        });
      } else {
        setVisibleEvents([]);
      }
    } else {
      if (
        teamCalendarOptions.personalEvents &&
        teamCalendarOptions.zitaEvents
      ) {
        setVisibleEvents(teamMemberEvents);
      } else if (
        teamCalendarOptions.personalEvents &&
        !teamCalendarOptions.zitaEvents
      ) {
        setVisibleEvents(() => {
          return teamMemberEvents.filter((event) => {
            if (!event.title?.includes('Zita event')) return event;
          });
        });
      } else if (
        !teamCalendarOptions.personalEvents &&
        teamCalendarOptions.zitaEvents
      ) {
        setVisibleEvents(() => {
          return teamMemberEvents.filter((event) => {
            if (event.title?.includes('Zita event')) return event;
          });
        });
      } else {
        setVisibleEvents([]);
      }
    }
  }, [
    currentCalendarType,
    selectedTeamMembers,
    myCalendarOptions.personalEvents,
    myCalendarOptions.zitaEvents,
    teamCalendarOptions.personalEvents,
    teamCalendarOptions.zitaEvents,
    teamMemberEvents,
    currentUserEvents,
  ]);

  useEffect(() => {
    setTeamMemberEvents((events) => {
      return [
        ...events.filter((event) => event.userId !== currentUser.id),
        ...currentUserEvents,
      ];
    });
  }, [currentUserEvents]);

  useEffect(() => {
    authenticateCalendarProvider();
    dispatch(getUsersByCompanyMiddleware())
      .then((res) => {
        setTeamMembers(
          res.payload.users.map((user: TeamMemberType) => {
            setColor(user.userId);
            return {
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              calendarEmail: user.calendarEmail,
            };
          }),
        );
      })
      .catch((err: Error) => {
        console.error(err);
      });

    dispatch(getApplicantsMiddleware())
      .then((res: any) => {
        setApplicants(
          res.payload.applicants.map((user: ApplicantTypes) => {
            return {
              email: user.email,
              value: user.userId,
              label: [user.firstName, user.lastName].filter(Boolean).join(' '),
            };
          }),
        );
      })
      .catch((err: any) => {
        console.error(err);
      });

    const timezones = moment.tz.names();
    setGlobalZones(
      timezones.map((items) => {
        return { label: items, value: items };
      }),
    );
  }, []);

  const handleEventScheduleForm = () => {
    if (calendarProvider) handleGetEvents(calendarProvider);
    setIsEditEvent(false);
    setSlotRange(SlotRangeInitialState);
    setOpenScheduleForm((prevState) => !prevState);
  };

  const getUserNameFromResponse = (user: {
    user__first_name: string;
    user__last_name: string;
  }): string => {
    let name = '';
    if (user.user__first_name) {
      name += `${user.user__first_name} `;
    }
    if (user.user__last_name) {
      name += user.user__last_name;
    }
    return name;
  };

  const extractGoogleEvents = (
    events: GoogleEventType[],
    userId: number,
    userName: string,
  ): CalendarEventType[] => {
    return events.map((event) => {
      const eventData: any = {
        userId,
        title: event.summary,
        start: new Date(event.start.dateTime),
        end: new Date(event.end.dateTime),
        link: 'hangoutLink' in event ? event.hangoutLink : null,
        eventId: event.id,
        color: '#fcba03',
        organizer: event.organizer.email,
        syncedBy: userName,
      };

      if ('attendees' in event) {
        eventData['attendees'] = event.attendees.map((attendee) => {
          return attendee.email;
        });
      }
      return eventData;
    });
  };

  const extractOutlookEvents = (
    events: OutlookEventType[],
    userId: number,
    userName: string,
  ): CalendarEventType[] => {
    return events.map((event) => ({
      userId,
      title: event.title,
      start: new Date(event.start_time),
      end: new Date(event.end_time),
      eventId: event.event_id,
      attendees: event.attendees,
      organizer: event.created_by,
      link: null,
      color: '#fcba03',
      syncedBy: userName,
    }));
  };

  const handleGetEvents = (calendarAccount: CALENDAR) => {
    if (calendarAccount === CALENDAR.Google) {
      dispatch(getGoogleEventsMiddleware({ tz })).then((res) => {
        const events = extractGoogleEvents(
          res.payload.events,
          res.payload.userId,
          res.payload.user[0].user__first_name,
        );

        setCurrentUser(() => {
          return {
            name: getUserNameFromResponse(res.payload.user[0]),
            id: res.payload.userId,
          };
        });

        setCurrentUserEvents(events);
        if (teamMemberEvents.length <= 0) {
          setTeamMemberEvents(events);
        }
        setIsLoading(false);
      });
    } else {
      dispatch(syncOutlookMiddleWare()).then((res) => {
        const events = extractOutlookEvents(
          res.payload.events,
          res.payload.userId,
          res.payload.user[0].user__first_name,
        );

        setCurrentUser(() => {
          return {
            name: getUserNameFromResponse(res.payload.user[0]),
            id: res.payload.userId,
          };
        });

        setCurrentUserEvents(events);
        if (teamMemberEvents.length <= 0) {
          setTeamMemberEvents(events);
        }
        setIsLoading(false);
      });
    }
  };

  const authenticateCalendarProvider = () => {
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          if (res.payload.account === 'google') {
            setCalendarProvider(CALENDAR.Google);
            handleGetEvents(CALENDAR.Google);
          } else {
            setCalendarProvider(CALENDAR.Outlook);
            handleGetEvents(CALENDAR.Outlook);
          }
          localStorage.setItem('userId', res.payload.user);
          setIsCalendarIntegrated(true);
        } else {
          setIsCalendarIntegrated(false);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleTeamMemberEvents = (userId: number) => {
    if (
      selectedTeamMembers.filter((member: number) => member === userId)
        .length === 0
    ) {
      setIsTopLineLoading(true);
      setSelectedTeamMembers((prevState) => [...prevState, userId]);
      dispatch(friendsEventsMiddleware({ userId }))
        .then((res) => {
          if (res.payload.data === 'user not authenticated') {
            setIsTopLineLoading(false);
          } else if (res.payload.data === false) {
            setIsTopLineLoading(false);
          } else if (res.payload.account === 'Google') {
            setTeamMemberEvents((prevState) => [
              ...prevState,
              ...res.payload.events.map((event: GoogleEventType) => {
                const eventData: any = {
                  userId,
                  title: event.summary,
                  start: new Date(event.start.dateTime),
                  end: new Date(event.end.dateTime),
                  link: 'hangoutLink' in event ? event.hangoutLink : null,
                  organizer: event.organizer.email,
                  synced: res.payload.user[0].user__first_name,
                  eventId: event.id,
                };

                if ('attendees' in event) {
                  eventData['attendees'] = event.attendees.map((attendee) => {
                    return attendee.email;
                  });
                }

                return eventData;
              }),
            ]);
          } else {
            setTeamMemberEvents((prevState) => [
              ...prevState,
              ...res.payload.events.map((event: OutlookEventType) => {
                return {
                  userId,
                  title: event.title,
                  start: new Date(event.start_time),
                  end: new Date(event.end_time),
                  attendees: event.attendees,
                  organizer: event.created_by,
                  link: null,
                  synced: null,
                  eventId: event.event_id,
                };
              }),
            ]);
          }
          setIsTopLineLoading(false);
        })
        .catch((err: any) => {
          console.error(err);
        });
    } else {
      setTeamMemberEvents(
        teamMemberEvents.filter((event) => event.userId !== userId),
      );
      setSelectedTeamMembers(
        selectedTeamMembers.filter((member: number) => member !== userId),
      );
    }
  };

  const handleCalendarType = () => {
    if (currentCalendarType === CalendarType.MyCalendar) {
      setCurrentCalendarType(CalendarType.TeamCalendar);
    } else {
      setCurrentCalendarType(CalendarType.MyCalendar);
    }
  };

  const handleCloseEventPop = () => {
    setShowEventPopUpModal(false);
    // setEventPopUpDetails({});
  };

  const handleRemoveEvent = (setOpenEventDeleteModal = null) => {
    if (calendarProvider === CALENDAR.Google) {
      dispatch(
        deleteGoogleEventMiddleware({ eventId: eventPopUpDetails?.eventId! }),
      )
        .then((res: any) => {
          if (res.payload.status === true) {
            handleCloseEventPop();
            setTeamMemberEvents((events) =>
              events.filter(
                (event) => event.eventId !== eventPopUpDetails?.eventId,
              ),
            );
            setCurrentUserEvents((events) =>
              events.filter(
                (event) => event.eventId !== eventPopUpDetails?.eventId,
              ),
            );
            toast.success('Event cancelled successfully', {
              duration: 3500,
            });
          } else {
            toast.error('Failed to Delete Event', {
              duration: 3500,
            });
          }
        })
        .catch((err: any) => {
          console.error({ delete: err });
          setOpenEventDeleteModal(false);
          toast.error('Failed to Delete Event', {
            duration: 3500,
          });
        });
    } else {
      dispatch(
        deleteOutlookEventMiddleware({ eventId: eventPopUpDetails?.eventId! }),
      )
        .then((res: any) => {
          if (res.payload.status === true) {
            handleCloseEventPop();
            setTeamMemberEvents((events) =>
              events.filter(
                (event) => event.eventId !== eventPopUpDetails.eventId,
              ),
            );
            setCurrentUserEvents((events) =>
              events.filter(
                (event) => event.eventId !== eventPopUpDetails.eventId,
              ),
            );
          } else {
            toast.error('Failed to Delete Event', {
              duration: 3500,
            });
          }
        })
        .catch((err: any) => {
          console.error(err);
          toast.error('Failed to Delete Event', {
            duration: 3500,
          });
          setOpenEventDeleteModal(false);
        });
    }
    setOpenEventDeleteModal(false);
  };

  const handleOnSelectEvent = (event: CalendarEventType) => {
    if ('eventId' in event) {
      dispatch(
        verifyEventMiddleware({
          calendarProvider,
          eventId: event.eventId,
        }),
      )
        .then((res) => {
          if (res.payload.data === true) {
            setIsEventCanUpdate(true);
            setEventPopUpDetails((prevEvent) => ({
              ...prevEvent,
              eventId: event.eventId,
              syncedBy: null,
              applicantId: res.payload.event[0]['cand_id'],
            }));
          } else {
            setIsEventCanUpdate(false);
            setEventPopUpDetails((prevEvent) => ({
              ...prevEvent,
              eventId: null,
              syncedBy: event.syncedBy,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsEventCanUpdate(false);
      setEventPopUpDetails((prevEvent) => ({
        ...prevEvent,
        eventId: null,
        syncedBy: event.syncedBy,
      }));
    }

    setEventPopUpDetails((prevEvent) => {
      const eventData = {
        ...prevEvent,
        title: event.title,
        startDate: new Date(event.start),
        endDate: new Date(event.end),
        link: event.link,
        organizer: event.organizer,
        isZitaEvent: event.title.includes('Zita event'),
        canEdit: event.userId === currentUser.id,
      };

      if ('attendees' in event) {
        eventData['attendees'] = event.attendees;
      }

      return eventData;
    });

    setShowEventPopUpModal(true);
  };

  const handleMyCalendarOptions = (options: CalendarOptions) => {
    setMyCalendarOptions(options);
  };

  const handleTeamCalendarOptions = (options: CalendarOptions) => {
    setTeamCalendarOptions(options);
  };

  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };

  const handleChangeTimeZone = (timezone: string) => {
    moment.tz.setDefault(timezone);
    setLocalizer(momentLocalizer(moment));
    setCurrentTimeZone(timezone);
  };

  const handleJoinMeeting = (eventId: string) => {
    if (calendarProvider === CALENDAR.Google) {
      window.open(eventPopUpDetails.link);
    } else if (calendarProvider === CALENDAR.Outlook) {
      dispatch(getUrlMiddleware({ event_id: eventId }))
        .then((res) => {
          if (res.payload.data.onlineMeeting.joinUrl) {
            window.open(res.payload.data.onlineMeeting.joinUrl);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const getEditEventsDetails = (event: ZitaEventType): EditEventDetails => {
    const interviewerEmails = event.interviewers.split(',');
    const interviewers = teamMembers.filter((member) => {
      if (interviewerEmails.includes(member.email)) {
        return member;
      }
    });

    return {
      applicant: {
        name: event.applicant,
        id: event.cand_id,
      },
      jobRole: {
        label: JSON.parse(event.jd).label,
        value: JSON.parse(event.jd).value,
      },
      startDateTime: new Date(event.s_time),
      endDateTime: new Date(event.e_time),
      timeZone: event.timezone,
      interviewers,
      eventType: getEventMeetingType(event.event_type),
      location: event.location,
      notes: event.notes,
      privateNotes: event.private_notes,
    };
  };

  const handleEditEvent = () => {
    handleCloseEventPop();
    setCurrentEventId(eventPopUpDetails.eventId);
    if (calendarProvider === CALENDAR.Google) {
      dispatch(
        googleEditEventMiddleware({ eventId: eventPopUpDetails.eventId }),
      )
        .then((res) => {
          if (res.payload.data === true) {
            setEditEventDetails(
              res.payload.events.map((event: ZitaEventType) =>
                getEditEventsDetails(event),
              ),
            );
            setIsEditEvent(true);
            setOpenScheduleForm(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (calendarProvider === CALENDAR.Outlook) {
      dispatch(
        outlookEditEventMiddleware({ eventid: eventPopUpDetails.eventId }),
      )
        .then((res) => {
          if (res.payload.data === true) {
            setEditEventDetails(
              res.payload.events.map((event: ZitaEventType) =>
                getEditEventsDetails(event),
              ),
            );
            setIsEditEvent(true);
            setOpenScheduleForm(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleOnSelectSlot = (slotInfo: SlotInfo) => {
    setSlotRange(() => {
      const date = new Date(slotInfo.start);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setHours(0);
      return {
        start: slotInfo.start,
        end: slotInfo.end,
        date,
      };
    });
    setOpenScheduleForm(true);
  };

  const IntegrationMenuView = (
    <div>
      <Flex center flex={1} middle columnFlex className={styles.noContent}>
        <Text color="gray" style={{ marginBottom: 16 }}>
          Integrate your calendar with zita application to schedule your
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
    </div>
  );

  const TimeZoneView = (
    <div style={{ marginLeft: '10px', width: '200px' }}>
      <SelectTag
        labelBold
        options={globalZones}
        isSearchable={true}
        defaultValue={{ label: currentTimeZone, value: currentTimeZone }}
        onChange={(option) => handleChangeTimeZone(option.value)}
      />
    </div>
  );

  const CalendarHeaderView = (
    <>
      <div className={styles.headerMenu}>
        <div className={styles.calendarLogo}>
          {/* <SvgCalendar width={30} height={30} /> */}
          <Text bold size={16} color="theme">
            Calendar
          </Text>
          <div className={styles.triangle}> </div>
        </div>
      </div>
      <Flex row between>
        {' '}
        <Flex className={styles.calendarInputs}>
          <Flex row center marginRight={15}>
            <Text size={14} color="theme">
              Time Zone:
            </Text>
            {TimeZoneView}
          </Flex>

          <Flex row center>
            <Text size={14} color="theme">
              Calendar View:
            </Text>
            <CalendarTypeMenu
              style={{
                margin: '0px 10px',
              }}
              handleTeamMemberEvents={handleTeamMemberEvents}
              currentCalendarType={currentCalendarType}
              handleCalendarType={handleCalendarType}
              selectedTeamMembers={selectedTeamMembers}
              teamMembers={teamMembers}
              showDropDownMenu={showDropDownMenu}
              handleDropDown={handleDropDown}
              myCalendarOptions={myCalendarOptions}
              teamCalendarOptions={teamCalendarOptions}
              handleMyCalendarOptions={handleMyCalendarOptions}
              handleTeamCalendarOptions={handleTeamCalendarOptions}
            />
          </Flex>
        </Flex>
        <Flex>
          <Button
            className={styles.scheduleButton}
            onClick={handleEventScheduleForm}
          >
            Schedule Events
          </Button>
        </Flex>
      </Flex>
    </>
  );

  if (isLoading) {
    return <CalendarScreenLoader />;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        paddingBottom: 15,
      }}
    >
      <Toaster position="top-right" reverseOrder={false} />
      <TopLineLoader show={isTopLineLoading} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '-webkit-fill-available',
        }}
      >
        {isCalendarIntegrated ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
            }}
          >
            {CalendarHeaderView}
            {teamMemberEvents && (
              <>
                {currentTimeZone && (
                  <BigCalendar
                    localizer={localizer}
                    events={visibleEvents}
                    dayLayoutAlgorithm={'no-overlap'}
                    defaultView={'work_week'}
                    views={['day', 'month', 'work_week', 'week']}
                    onSelectSlot={(slotInfo) => {
                      handleOnSelectSlot(slotInfo);
                    }}
                    onSelectEvent={handleOnSelectEvent}
                    selectable
                    popup={true}
                    className={styles.calendar}
                    titleAccessor={formatEventTitle}
                    formats={{
                      eventTimeRangeFormat: () => '',
                    }}
                    components={{
                      toolbar: ToolBar,
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
                {showEventPopUpModal && (
                  <EventPopUpModal
                    handleCloseEventPopUpModal={() => handleCloseEventPop()}
                    handleEditEvent={handleEditEvent}
                    handleRemoveEvent={handleRemoveEvent}
                    isEventCanUpdate={isEventCanUpdate}
                    joinMeeting={handleJoinMeeting}
                    showEventPopUpModal={showEventPopUpModal}
                    eventPopUpDetails={eventPopUpDetails}
                  />
                )}
              </>
            )}
            {openScheduleForm && (
              <MeetingSchedulingScreen
                username={currentUser.name}
                applicants={applicants}
                currentUser={currentUser}
                currentUserEvents={currentUserEvents}
                eventId={currentEventId}
                calendarProvider={calendarProvider}
                editEventDetails={isEditEvent ? editEventDetails[0] : null}
                teamMembers={teamMembers}
                openScheduleForm={openScheduleForm}
                handleEventScheduleForm={handleEventScheduleForm}
                slotRange={slotRange}
                setIsTopLineLoading={setIsTopLineLoading}
              />
            )}
          </div>
        ) : (
          IntegrationMenuView
        )}
      </div>
    </div>
  );
};

export default Calendar;
