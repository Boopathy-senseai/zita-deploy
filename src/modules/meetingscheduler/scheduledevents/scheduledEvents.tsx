import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Flex, InputSwitch, Text } from '../../../uikit';
import CalendarTypeMenu from '../../calendarModule/CalendarTypeMenu';
import { getDateString } from '../../../uikit/helper';
import { AppDispatch } from '../../../store';
import { dashboardCalenderMiddleWare } from '../../dashboardmodule/empdashboard/store/dashboardmiddleware';
import { SvgCalendar } from '../../../icons';
import { calendarRoute } from '../../../appRoutesPath';
import Table from './eventsTable';
import styles from './scheduledEvents.module.css';

const ScheduledEventsPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [event, setEvent] = useState([{ title: '', start: '', end: '', web_url: '' }]);
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false);
  const history = useHistory()
  const gotoCalander = () => {
    history.push(calendarRoute,{ openScheduleEvent: true});
  }
  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };
  const formik = useFormik({
    initialValues: { date: getDateString(new Date(), 'MM/DD/YYYY') },
    onSubmit: () => { },
  });
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
          <InputSwitch checked={true} onClick={() => {}} />
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
                  <SvgCalendar width={16} height={16}/>
                </label>
              </div>
            </div>
          </Flex>
        </Flex>
        <Flex>
          <Flex row center></Flex>
          <Button className={styles.scheduleButton} onClick={gotoCalander}>
            Schedule Events
          </Button>
        </Flex>
      </Flex>
      <Flex style={{ padding: '10px' }}>
        <Table />
      </Flex>
    </>
  );
};
export default ScheduledEventsPage;
