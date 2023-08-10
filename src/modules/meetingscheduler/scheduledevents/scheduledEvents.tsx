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
import { getDateString } from '../../../uikit/helper';
import { AppDispatch, RootState } from '../../../store';
import { dashboardCalenderMiddleWare } from '../../dashboardmodule/empdashboard/store/dashboardmiddleware';
import { SvgCalendar } from '../../../icons';
import { calendarRoute } from '../../../appRoutesPath';
import {
  EVENT_FILTER_OPTION,
  EVENT_TYPE,
  IEvent,
  IEventTableItem,
} from '../types';
import { TeamMemberType } from '../../calendarModule/types';
import { getUsersByCompanyMiddleware } from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import Table from './eventsTable';
import styles from './scheduledEvents.module.css';
import EventsMenu from './eventsMenu';
import {
  deleteEventMiddleWare,
  getEventsMiddleWare,
} from './store/middleware/eventsmiddleware';

const ScheduledEventsPage = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [event, setEvent] = useState([
    { title: '', start: '', end: '', web_url: '' },
  ]);
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
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

  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(true);
  const gotoCalander = () => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };
  const formik = useFormik({
    initialValues: { date: getDateString(new Date(), 'DD/MM/YYYY') },
    onSubmit: () => {},
  });

  const { scheduleEventState } = useSelector(
    ({ scheduledEventsReducers }: RootState) => ({
      scheduleEventState: scheduledEventsReducers,
    }),
  );

  const getCurrentDate = (type: EVENT_FILTER_OPTION) => {
    if (type === EVENT_FILTER_OPTION.DATE) {
      return formik.values.date;
    }
    return undefined;
  };

  const getTrue = (type: EVENT_FILTER_OPTION) => {
    if (type === EVENT_FILTER_OPTION.DATE) {
      return 'Tru';
    }
    return 'True';
  };

  useEffect(() => {
    dispatch(getUsersByCompanyMiddleware())
      .then((res) => {
        setTeamMembers(
          res.payload.users.map((user: TeamMemberType) => {
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

    dispatch(
      getEventsMiddleWare({
        event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
        data: getCurrentDate(filters.activeRadio),
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getEventsMiddleWare({
        event:
          filters.type === EVENT_TYPE.MY_EVENTS
            ? getTrue(filters.activeRadio)
            : 'False',
        data: getCurrentDate(filters.activeRadio),
      }),
    );
  }, [filters.type, filters.activeRadio, filters.isPast]);

  const getEventsData = (value?: string) => {
    dispatch(
      getEventsMiddleWare({
        event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
        data:
          filters.activeRadio === EVENT_FILTER_OPTION.DATE ? value : undefined,
      }),
    );
  };

  const handleJoinEvent = (doc: IEvent) => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleEditEvent = (doc: IEvent) => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleDeleteEvent = (doc: IEvent) => {
    dispatch(
      deleteEventMiddleWare({
        eventid: doc.event_id,
        event: filters.type === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
      }),
    );
  };

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
    if (filters.isPast) {
      return scheduleEventState?.pastEvent.map((doc) => {
        return {
          ...doc,
          interviewers: scheduleEventState?.interviewers.filter(
            (s) => s.event_id === doc.event_id,
          ),
        };
      });
    }

    return scheduleEventState?.upcomingEvent.map((doc) => {
      return {
        ...doc,
        interviewers: scheduleEventState?.interviewers.filter(
          (s) => s.event_id === doc.event_id,
        ),
      };
    });
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
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    );
  };

  const pastUpcoming = (
    <Flex row center>
      <Text
        size={14}
        className={styles.textStyles}
        style={{ marginRight: '10px' }}
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
        size={14}
        className={styles.textStyles}
        style={{ marginLeft: '10px' }}
      >
        Past Events
      </Text>
    </Flex>
  );

  const eventDate = (
    <Flex marginLeft={10}>
      <div style={{ position: 'relative', display: 'flex' }}>
        <DatePicker
          id="calendar___open"
          dateFormat="DD/MM/YYYY"
          value={formik.values.date}
          onChange={(date) => {
            const value = getDateString(date, 'DD/MM/YYYY');
            formik.setFieldValue('date', value);
            getEventsData(value);
            // dispatch(
            //   dashboardCalenderMiddleWare({
            //     date: getDateString(date, 'YYYY-MM-DD'),
            //   }),
            // ).then((res) => {
            //   const dataout = res.payload.events;
            //   setEvent(
            //     res.payload.events.map(
            //       (items: {
            //         title: any;
            //         start_time: string | number | Date;
            //         end_time: string | number | Date;
            //         web_url: any;
            //       }) => {
            //         return {
            //           title: items.title,
            //           start: new Date(items.start_time),
            //           end: new Date(items.end_time),
            //           web_url: items.web_url,
            //         };
            //       },
            //     ),
            //   );
            // });
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
            teamMembers={teamMembers}
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
