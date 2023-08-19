import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Flex,
  InputRadio,
  InputSwitch,
  Loader,
  Text,
} from '../../../uikit';
import { getDateString, uniqueArray } from '../../../uikit/helper';
import { AppDispatch, RootState } from '../../../store';
import { SvgCalendar } from '../../../icons';
import { calendarRoute } from '../../../appRoutesPath';
import {
  EVENT_FILTER_OPTION,
  EVENT_TYPE,
  ICalendarEvent,
  ICalendarEventTableItem,
  IEvent,
  IEventData,
  IEventOrganiser,
  IEventTableItem,
  IEventTeamMember,
} from '../types';
import { TeamMemberType } from '../../calendarModule/types';
import { getUsersByCompanyMiddleware } from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import EventsMenu from '../components/eventsMenu';
import EventDeletePopUpModal from '../components/deleteEvent';
import {
  deleteEventMiddleWare,
  getEventsMiddleWare,
} from './store/middleware/eventsmiddleware';
import Table from './eventsTable';
import styles from './scheduledEvents.module.css';

const ScheduledEventsPage = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [event, setEvent] = useState([
    { title: '', start: '', end: '', web_url: '' },
  ]);
  const [deleteEvent, setDeleteEvent] = useState<{
    open: boolean;
    event: IEvent | ICalendarEvent;
    type: 'event' | 'calendar';
  } | null>(null);
  const [teamMembers, setTeamMembers] = useState<IEventTeamMember[]>([]);
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [filters, setFilters] = useState<{
    type: EVENT_TYPE;
    activeRadio: EVENT_FILTER_OPTION;
    isPast: boolean;
  }>({
    type: EVENT_TYPE.MY_EVENTS,
    activeRadio: EVENT_FILTER_OPTION.PAST_AND_UPCOMING,
    isPast: false,
  });

  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false);
  const gotoCalander = () => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };
  const formik = useFormik({
    initialValues: { date: new Date() },
    onSubmit: () => {},
  });

  const { scheduleEventState, user } = useSelector(
    ({ scheduledEventsReducers, userProfileReducers }: RootState) => ({
      scheduleEventState: scheduledEventsReducers,
      user: userProfileReducers?.user,
    }),
  );

  const getCurrentDate = (type: EVENT_FILTER_OPTION) => {
    if (type === EVENT_FILTER_OPTION.DATE) {
      return getDateString(formik.values.date, 'DD/MM/YYYY');
    }
    return undefined;
  };

  const getTrue = (type: EVENT_FILTER_OPTION) => {
    if (type === EVENT_FILTER_OPTION.DATE) {
      return 'False';
    }
    return 'True';
  };

  useEffect(() => {
    dispatch(getUsersByCompanyMiddleware())
      .then((res) => {
        setTeamMembers(
          res.payload.users.map((doc: TeamMemberType) => {
            return {
              id: doc.userId,
              user: doc.firstName,
              user__first_name: doc.firstName,
              user__last_name: doc.lastName,
              full_name: `${doc.firstName} ${doc.lastName}`,
              name_id: doc.userId,
            };
          }),
        );
      })
      .catch((err: Error) => {
        console.error(err);
      });

    dispatch(
      getEventsMiddleWare({
        event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
        date: getCurrentDate(filters.activeRadio),
        other_user: selectedPeople.length !== 0 ? selectedPeople : undefined,
      }),
    ).then((res) => {
      setSelectedPeople(
        ((res.payload as IEventData).teammembers || [])
          .filter((doc) =>
            filters.type === EVENT_TYPE.MY_EVENTS
              ? doc.user === user.id
              : doc.user !== user.id,
          )
          .map((doc) => doc.user),
      );
    });
  }, []);

  useEffect(() => {
    dispatch(
      getEventsMiddleWare({
        event:
          filters.type === EVENT_TYPE.MY_EVENTS
            ? getTrue(filters.activeRadio)
            : 'False',
        date: getCurrentDate(filters.activeRadio),
        other_user: selectedPeople.length !== 0 ? selectedPeople : undefined,
      }),
    );
    // .then((res) => {
    //   setSelectedPeople(((res.payload as IEventData).teammembers || []).filter(doc => filters.type === EVENT_TYPE.MY_EVENTS ? doc.user === user.id : doc.user !== user.id).map(doc => doc.id))
    // });
  }, [
    filters.type,
    filters.activeRadio,
    filters.isPast,
    selectedPeople.toString(),
  ]);

  const getEventsData = (date?: Date) => {
    dispatch(
      getEventsMiddleWare({
        event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
        date:
          filters.activeRadio === EVENT_FILTER_OPTION.DATE
            ? getDateString(date, 'DD/MM/YYYY')
            : undefined,
        other_user: selectedPeople.length !== 0 ? selectedPeople : undefined,
      }),
    );
    // .then((res) => {
    //   setSelectedPeople(((res.payload as IEventData).teammembers || []).filter(doc => filters.type === EVENT_TYPE.MY_EVENTS ? doc.user === user.id : doc.user !== user.id).map(doc => doc.id))
    // });
  };

  const handleJoinEvent = (doc: IEvent) => {
    window.open(doc.join_url, '_blank');
  };
  // const handleEditEvent = (doc: IEvent) => {
  //   history.push(calendarRoute, { openScheduleEvent: true });
  // };
  const handleDeleteEvent = (id: any) => {
    dispatch(
      deleteEventMiddleWare({
        params: { id },
        props: {
          event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
          date:
            filters.activeRadio === EVENT_FILTER_OPTION.DATE
              ? getCurrentDate(filters.activeRadio)
              : undefined,
          other_user: selectedPeople.length !== 0 ? selectedPeople : undefined,
        },
      }),
    ).then(() => {
      setDeleteEvent(null);
    });
  };

  const handleCalendarJoinEvent = (doc: ICalendarEvent) => {
    window.open(doc.join_url, '_blank');
  };
  const handleCalendarEditEvent = (doc: ICalendarEvent) => {
    history.push(calendarRoute, { recurringEventId: doc.eventId });
  };
  // const handleCalendarDeleteEvent = (doc: ICalendarEvent) => {
  //   dispatch(
  //     deleteEventMiddleWare({
  //       eventid: doc.id,
  //       event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
  //     }),
  //   );
  // };

  const handlePeopleChange = (value: number) => {
    setSelectedPeople((prev) => {
      const newArray = [...prev];
      const index = newArray.indexOf(value);
      if (index !== -1) {
        newArray.splice(index, 1);
        return newArray;
      }
      return [...newArray, value];
    });
  };

  const eventsList = (): IEventTableItem[] => {
    const organisers = uniqueArray(scheduleEventState.org_name);
    if (filters.activeRadio === EVENT_FILTER_OPTION.DATE) {
      return scheduleEventState?.event.map((doc) => {
        return {
          ...doc,
          interviewers: scheduleEventState?.interviewers.filter(
            (s) => s.event_id === doc.event_id,
          ),
          organisers: scheduleEventState.org_name,
        };
      });
    }
    if (filters.activeRadio === EVENT_FILTER_OPTION.PAST_AND_UPCOMING) {
      if (filters.isPast) {
        return scheduleEventState?.pastEvent.map((doc) => {
          return {
            ...doc,
            interviewers: scheduleEventState?.interviewers.filter(
              (s) => s.event_id === doc.event_id,
            ),
            organisers,
          };
        });
      }

      return scheduleEventState?.upcomingEvent.map((doc) => {
        return {
          ...doc,
          interviewers: scheduleEventState?.interviewers.filter(
            (s) => s.event_id === doc.event_id,
          ),
          organisers,
        };
      });
    }

    return [];
  };

  const renderTable = () => {
    if (scheduleEventState?.isLoading) {
      return <Loader />;
    }

    return (
        <Table
          list={eventsList()}
          pastEvents={filters.isPast}
          activeRadio={filters.activeRadio}
          deleteState={scheduleEventState?.deleteState}
          onJoin={handleJoinEvent}
          // onEdit={handleEditEvent}
          onDelete={(doc) =>
            setDeleteEvent({ open: true, event: doc, type: 'event' })
          }
        />
    );
  };

  const pastUpcoming = (
    <Flex row center>
      <Text
        size={13}
        className={styles.textStyles}
        style={{ marginRight: '5px' }}
      >
        Upcoming Events
      </Text>
      <InputSwitch
        checked={filters.isPast}
        onClick={() =>
          setFilters((past) => ({ ...past, isPast: !past.isPast }))
        }
      />
      <Text
        size={13}
        className={styles.textStyles}
        style={{ marginLeft: '5px' }}
      >
        Past Events
      </Text>
    </Flex>
  );

  const eventDate = (
    <Flex marginLeft={5}>
      <div style={{ position: 'relative', display: 'flex' }}>
        <DatePicker
          id="calendar___open"
          dateFormat="dd/MM/yyyy"
          selected={formik.values.date}
          onChange={(date) => {
            formik.setFieldValue('date', date);
            getEventsData(date);
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
  );

  return (
    <>
      {deleteEvent && (
        <EventDeletePopUpModal
          {...deleteEvent}
          onClose={() => setDeleteEvent(null)}
          onConfirm={handleDeleteEvent}
        />
      )}
      <Flex center between row className={styles.Container}>
        <Flex row center>
          <Flex marginRight={10}>
            <InputRadio
              label={pastUpcoming}
              checked={
                filters.activeRadio === EVENT_FILTER_OPTION.PAST_AND_UPCOMING
              }
              onClick={() => {
                setFilters((past) => ({
                  ...past,
                  activeRadio: EVENT_FILTER_OPTION.PAST_AND_UPCOMING,
                }));
                // setActiveFilter(EVENT_FILTER_OPTION.PAST_AND_UPCOMING);
                // getData(EVENT_FILTER_OPTION.PAST_AND_UPCOMING);
              }}
            />
          </Flex>
          <Flex>
            <InputRadio
              label={eventDate}
              checked={filters.activeRadio === EVENT_FILTER_OPTION.DATE}
              onClick={() => {
                setFilters((past) => ({
                  ...past,
                  activeRadio: EVENT_FILTER_OPTION.DATE,
                  isPast: false,
                }));
                // setPastEvents(false);
                // setActiveFilter(EVENT_FILTER_OPTION.DATE);
                // getData(EVENT_FILTER_OPTION.DATE);
              }}
            />
          </Flex>
        </Flex>

        <Flex row>
          <EventsMenu
            showDropDownMenu={showDropDownMenu}
            eventType={filters.type}
            onEventType={(v: EVENT_TYPE) => {
              setFilters((past) => ({
                ...past,
                type: v,
              }));
            }}
            handleDropDown={handleDropDown}
            onPeopleChange={handlePeopleChange}
            selectedPeople={selectedPeople}
            teamMembers={scheduleEventState.teammembers}
            currentUser={user}
          />

          <Button className={styles.scheduleButton} onClick={gotoCalander}>
            Schedule Events
          </Button>
        </Flex>
      </Flex>
      <Flex
        style={{
          padding: '10px',
          height: 'calc(100% - 61px)',
          overflow: 'auto',
        }}
      >
        {renderTable()}
      </Flex>
    </>
  );
};

export default ScheduledEventsPage;
