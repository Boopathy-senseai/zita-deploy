import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Flex, InputSwitch, Loader, Text } from '../../../uikit';
import { getDateString } from '../../../uikit/helper';
import { AppDispatch, RootState } from '../../../store';
import { dashboardCalenderMiddleWare } from '../../dashboardmodule/empdashboard/store/dashboardmiddleware';
import { SvgCalendar } from '../../../icons';
import { calendarRoute } from '../../../appRoutesPath';
import { EVENT_TYPE, IEvent } from '../types';
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
  const [pastEvents, setPastEvents] = useState<boolean>(true);
  const [eventType, setEventType] = useState<EVENT_TYPE>(EVENT_TYPE.MY_EVENTS);
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false);
  const gotoCalander = () => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };
  const formik = useFormik({
    initialValues: { date: getDateString(new Date(), 'MM/DD/YYYY') },
    onSubmit: () => {},
  });

  const { scheduleEventState } = useSelector(
    ({ scheduledEventsReducers }: RootState) => ({
      scheduleEventState: scheduledEventsReducers,
    }),
  );

  useEffect(() => {
    dispatch(
      getEventsMiddleWare({
        event: eventType === EVENT_TYPE.MY_EVENTS ? 'True' : 'False',
      }),
    );
  }, []);

  const handleJoinEvent = (doc: IEvent) => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleEditEvent = (doc: IEvent) => {
    history.push(calendarRoute, { openScheduleEvent: true });
  };
  const handleDeleteEvent = (doc: IEvent) => {
    dispatch(deleteEventMiddleWare({ eventid: doc.event_id }));
  };

  const renderTable = () => {
    if (scheduleEventState?.isLoading) {
      return <Loader />;
    }
    return (
      <Table
        list={
          pastEvents
            ? scheduleEventState?.pastEvent
            : scheduleEventState?.upcomingEvent
        }
        deleteState={scheduleEventState?.deleteState}
        onJoin={handleJoinEvent}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
      />
    );
  };

  return (
    <>
      <Flex center between row className={styles.Container}>
        <Flex row center>
          <Text
            size={14}
            className={styles.textStyles}
            style={{ marginRight: '10px' }}
          >
            Upcoming Events
          </Text>
          <InputSwitch
            checked={pastEvents}
            onClick={() => setPastEvents(!pastEvents)}
          />
          <Text
            size={14}
            className={styles.textStyles}
            style={{ marginLeft: '10px' }}
          >
            Past Events
          </Text>
          <Flex marginLeft={10}>
            <div style={{ position: 'relative', display: 'flex' }}>
              <DatePicker
                id="calendar___open"
                dateFormat="DD/MM/YYYY"
                value={formik.values.date}
                onChange={(date) => {
                  formik.setFieldValue(
                    'date',
                    getDateString(date, 'MM/DD/YYYY'),
                  );
                  dispatch(
                    dashboardCalenderMiddleWare({
                      date: getDateString(date, 'YYYY-MM-DD'),
                    }),
                  ).then((res) => {
                    const dataout = res.payload.events;
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
        <Flex row>
          <EventsMenu
            showDropDownMenu={showDropDownMenu}
            eventType={eventType}
            onEventType={(v: EVENT_TYPE) => {
              setEventType(v);
            }}
            handleDropDown={() => setShowDropDownMenu(!showDropDownMenu)}
          />

          <Button className={styles.scheduleButton} onClick={gotoCalander}>
            Schedule Events
          </Button>
        </Flex>
      </Flex>
      <Flex style={{ padding: '10px' }}>{renderTable()}</Flex>
    </>
  );
};
export default ScheduledEventsPage;
