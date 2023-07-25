import { useEffect, useState } from 'react';
import { DayPicker, DayPickerProps } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment, { duration } from 'moment';
import { enUS } from 'date-fns/locale';
import { AppDispatch, RootState } from '../../../store';
import 'react-day-picker/dist/style.css';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Button from '../../../uikit/Button/Button';
import SvgPersonFill from '../../../icons/SvgPersonFill';
import SvgPeopleFill from '../../../icons/SvgPeopleFill';
import SvgCalendarEvent from '../../../icons/SvgCalendarEvent';
import SvgCheck2Circle from '../../../icons/SvgCheck2Circle';
import SvgClock from '../../../icons/SvgClock';
import SvgGlobe from '../../../icons/SvgGlobe';
import SvgInfoCircle from '../../../icons/SvgInfoCircle';
import Loader from '../../../uikit/Loader/Loader';
import SvgZitaLogo from '../../../icons/SvgZitaLogo';
import styles from './slotter.module.css';
import {
  getAvailbleSlot,
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from './store/middleware/eventmiddleware';
import { timezonedisplay } from './eventType';
import './DayPickerCustomStyles.css';

const slotter1 = (props) => {
  const { userpreview, setuserPreview } = props;
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid') ? searchParams.get('uid') : null;
  const eventid = searchParams.get('eventid');
  const [event, setEvent] = useState(parseInt(eventid));
  const [date, setDate] = useState(null);
  const [change, setChange] = useState(false);
  const [select, setSelect] = useState(false);
  const [footer, setFooter] = useState(false);
  const [divwidth, setWidth] = useState('500.5px');
  const [margin, setMargin] = useState('300px');
  const [confirm, setConfirm] = useState(false);
  const [selecttime, setSelectTime] = useState('');
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const [time, setTime] = useState([]);
  const [selecteddate1, setselectedDate1] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dashboard, setDashboard] = useState(false);
  const [finalIntervals, setfinalIntervals] = useState([]);
  const [selectDate, setSelectDate] = useState('');
  const [isProfile, setProfile] = useState(null);
  const [confromflag, SetConfromFlag] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [loader, setloader] = useState(false);

  const { data, interviewer, sharelink, addmembers, datetime, isLoading } =
    useSelector(({ schedulerReducers, slotterReducers }: RootState) => ({
      isLoading: schedulerReducers.isLoading,
      data: schedulerReducers.data,
      interviewer: schedulerReducers.interviewer,
      sharelink: schedulerReducers.shareLink,
      addmembers: schedulerReducers.addmembers,
      datetime: schedulerReducers.datetime,
      success: slotterReducers.success,
    }));

  const { success, slotterdata, slotmembers, candidate_name } = useSelector(
    ({ slotterReducers }: RootState) => ({
      isLoading: slotterReducers.isLoading,
      success: slotterReducers.success,
      slotterdata: slotterReducers.slotterdata,
      slotmembers: slotterReducers.slotmembers,
      candidate_name: slotterReducers.candidate_name,
      message: slotterReducers.message,
    }),
  );

  const { availbleslot } = useSelector(({ timezoneReducers }: RootState) => ({
    isLoading: timezoneReducers.isLoading,
    availbleslot: timezoneReducers.availbleslot,
  }));

  // const candi_name = 'John Smith';
  const candi_name = candidate_name ? candidate_name : 'candidate';

  useEffect(() => {
    const event_id = event;
    setloader(true);
    dispatch(getAvailbleSlot(event));
    dispatch(getScheduleMiddleWare(event));

    if (userpreview === undefined) {
      dispatch(getSlotterMiddleware({ uid, event_id })).then((res) => {
        if (slotterdata && slotterdata.length > 0) {
          setloader(true);
          setDashboard(true);
        }
      });
    }
    setloader(false);
  }, []);

  const onSubmit = (selectdate11, selecttime11) => {
    setConfirm(true);
    SetConfromFlag(true);
    var event_id = eventid;
    var selecteddate = selectDate;
    var selectedtime = selecttime11;
  };

  const getinter = (inter) => {
    switch (inter) {
      case 'On-site Interview':
        return 'Offline Interview';
      case 'Phone Interview':
        return 'Online Interview';
      case 'Microsoft Teams':
        return 'Online Interview';
      case 'Google Hangouts/Meet':
        return 'Online Interview';
      default:
        return inter;
    }
  };
  const timezones = (str) => {
    const display = data.map((li: any) => li.times_zone_display);
    if (
      display.includes(
        'Automatically detect and show the times in my invitees time zone',
      )
    ) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = moment.tz(userTimezone).format('Z');
      const userzone = `${userTimezone} (${offset})`;
      return userzone;
    } else if (
      display.includes('Lock the timezone (best for in-person events)')
    ) {
      const [timeOffset, locations] = str.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      // Create the desired string format: "(Location) Time Offset"
      const result = `${locationWithoutParentheses} (${timeOffset})`;
      // settimezone(locationWithoutParentheses)
      return result;
    }
  };

  const startTime = '9:00 AM';
  const endTime = '12:00 PM';
  const timezone = 'Pacific/Apia';

  // Format start time and end time in the desired timezone
  const formattedStartTime = moment(startTime, 'h:mm A')
    .tz(timezone)
    .format('h:mm A');
  const formattedEndTime = moment(endTime, 'h:mm A')
    .tz(timezone)
    .format('h:mm A');

  const userTimezone = 'Asia/Kolkata' + 5.3; // Replace with the user's timezone
  const targetTimezone = ' Pacific/Apia' + 13.0; // Replace with the target timezone

  const userDatetime = moment().tz(userTimezone);
  const targetDatetime = moment().tz(targetTimezone);

  const userTimezoneOffset = 5.5; // UTC offset for Asia/Kolkata is +5:30
  const targetTimezoneOffset = 13.0; // UTC offset for Pacific/Apia is +13:00

  const timeDifference = targetTimezoneOffset - userTimezoneOffset;

  return (
    <Flex>
      <Flex className={styles.element}>
        {loader && <Loader />}

        {dashboard === true ? (
          <Flex>
            {slotterdata && slotmembers ? (
              <InterviewDashBoard
                slotterdata={slotterdata}
                slotmembers={slotmembers}
                getinter={getinter}
                dashboard={data}
                isProfile={isProfile}
                timezones={timezones}
              />
            ) : (
              ' '
            )}
          </Flex>
        ) : confromflag === false && dashboard === false ? (
          <Flex>
            <SlotterDate
              event={eventid}
              response={data}
              margin={margin}
              change={change}
              days={days}
              setSelect={setSelect}
              selecttime={selecttime}
              setSelectTime={setSelectTime}
              onSubmit={onSubmit}
              setDays={setDays}
              date={date}
              select={select}
              divwidth={divwidth}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setMargin={setMargin}
              setselectedDate1={setselectedDate1}
              setWidth={setWidth}
              setChange={setChange}
              setDate={setDate}
              datetime={datetime}
              finalIntervals={finalIntervals}
              setfinalIntervals={setfinalIntervals}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              candidate_name={candi_name}
              getinter={getinter}
              isProfile={isProfile}
              timezones={timezones}
              availbleslot={availbleslot}
            />
          </Flex>
        ) : confromflag === true ? (
          <Flex>
            <Conformpage
              margin={margin}
              selecttime={selecttime}
              date={date}
              response={data}
              candidate_name={candi_name}
              getinter={getinter}
              isProfile={isProfile}
              timezones={timezones}
            />
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};

const SlotterDate = (props) => {
  const {
    event,
    change,
    setselectedDate1,
    setChange,
    setDate,
    setActive,
    onSubmit,
    days,
    setDays,
    date,
    select,
    selecttime,
    setSelectTime,
    // modifiers,
    setSelect,
    divwidth,
    response,
    setStartDate,
    setEndDate,
    datetime,
    finalIntervals,
    setfinalIntervals,
    setSelectDate,
    candidate_name,
    getinter,
    startDate,
    endDate,
    isProfile,
    timezones,
    availbleslot,
  } = props;

  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });
  const dispatch: AppDispatch = useDispatch();
  const [startMonth, setstartMonth] = useState(null);
  const [endMonth, setendMonth] = useState(null);
  const [availability, setavailbility] = useState([]);
  const [useravailble, setuseravailble] = useState([]);
  const [timezone, settimezone] = useState('');
  const [candidate, setCandidate] = useState(candidate_name);

  useEffect(() => {
    mount();
  }, [response, timezone]);

  const mount = () => {
    if (availbleslot !== undefined) {
      setuseravailble(availbleslot);
    }

    {
      response?.map((list) => {
        timezoneset(list.times_zone_display, list.times_zone);
        setSelectedRange({
          from: list.startdate,
          to: list.enddate,
        });

        const schedule = schdulearray(
          list.startdate,
          list.enddate,
          list.times_zone,
        );

        // setEndDate(enddate);
      });
    }
  };

  const timezoneset = (str, tzone) => {
    if (
      str === 'Automatically detect and show the times in my invitees time zone'
    ) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = moment.tz(userTimezone).format('Z');
      const userzone = `${userTimezone} (${offset})`;
      settimezone(userTimezone);
      return userzone;
    } else if (str === 'Lock the timezone (best for in-person events)') {
      const strValue = tzone;
      const [timeOffset, locations] = strValue.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses} (${timeOffset})`;
      settimezone(locationWithoutParentheses);
    }
  };

  const schdulearray = (start, end, time) => {
    const excludedWeekdays = [];
    // const exclude = datetime

    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'sunday') ||
      datetime.sunday.length === 0
    ) {
      excludedWeekdays.push(0);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'monday') ||
      datetime.monday.length === 0
    ) {
      excludedWeekdays.push(1);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'tuesday') ||
      datetime.tuesday.length === 0
    ) {
      excludedWeekdays.push(2);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'wednesday') ||
      datetime.wednesday.length === 0
    ) {
      excludedWeekdays.push(3);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'thursday') ||
      datetime.thursday.length === 0
    ) {
      excludedWeekdays.push(4);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'friday') ||
      datetime.friday.length === 0
    ) {
      excludedWeekdays.push(5);
    }
    if (
      !Object.prototype.hasOwnProperty.call(datetime, 'saturday') ||
      datetime.saturday.length === 0
    ) {
      excludedWeekdays.push(6);
    }
    const schedule = calculateSchedule(start, excludedWeekdays, end, time);
    setavailbility(schedule);
  };
  const dateconvert = (formattedDate) => {
    const convertedDate = moment(formattedDate).format('DD/MM/YYYY');
    return convertedDate;
  };
  const AvailbleSlots = (datetimes) => {
    const check = dateconvert(datetimes);
    const filteredData = Object.fromEntries(
      Object.entries(useravailble).filter(([key, value]) => key === check),
    );

    const day = datetimes.getDay();
    const intervalMinutes = parseInt(response.map((dur) => dur.duration));
    const dateformat = moment.tz(datetimes, timezone).toDate();
    const currentDay = (datetimes.getDay() + 1) % 7; // Get the current day in UTC
    const selectedDay = currentDay;
    const userTimeZone = 0;
    const adjustedDay = day === currentDay ? day : currentDay;

    const saturdayslot = generateIntervals(
      filteredData[check],
      intervalMinutes,
    );
    setfinalIntervals(saturdayslot);
  };

  const conversion = (data: any) => {
    return data?.map((obj) => {
      const { day, ...rest } = obj; // Destructure the "day" property
      return rest; // Return the object without the "day" property
    });
  };
  const convertion = (dateStr) => {
    const momentObj = moment(dateStr, 'DD/MM/YYYY');
    const formattedDate = momentObj.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    return formattedDate;
  };

  const calculateSchedule = (starDate, excludedWeekdays, enDate, tz) => {
    if (tz !== null && tz !== undefined) {
      const tzone = tz;
      // moment.tz.setDefault(tzone);
      const schedule = [];
      const startdate = convertion(starDate);
      const enddate = convertion(enDate);
      let currentDate = moment.tz(startdate, tzone).startOf('day');
      const lastDate = moment.tz(enddate, tzone).startOf('day');
      while (currentDate.isSameOrBefore(lastDate)) {
        const weekday = currentDate.weekday();
        if (!excludedWeekdays.includes(weekday)) {
          schedule.push(currentDate.toDate());
        }
        currentDate = currentDate.add(1, 'day');
      }
      return schedule;
    }
  };

  const getTimeSlotsForDay = (dat, timezuone) => {
    return [
      { startTime: '9:00 AM', endTime: '10:00 AM' },
      { startTime: '11:30 AM', endTime: '1:00 PM' },
      { startTime: '2:30 PM', endTime: '4:00 PM' },
    ];
  };

  const onDateChange = (datetimes: any) => {
    const currentDate = new Date(datetimes);

    const isInSchedule = availability.some((d) => {
      const scheduleDate = new Date(d);
      scheduleDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
      currentDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === currentDate.getTime();
    });

    if (isInSchedule) {
      AvailbleSlots(datetimes);
      const options = { weekday: 'long', day: '2-digit', month: 'long' };
      const formattedDate = datetimes.toLocaleDateString('en-US', options);
      setDate(formattedDate);
      setSelectTime('');
      setSelectDate(formattedDate);
      setselectedDate1(datetimes);
    } else {
      setDate(null);
      setfinalIntervals([]);
      setSelectTime('');
    }
  };

  const selectbutton = (obj) => {
    const { index, value } = obj;
    setSelect(true);
    setSelectTime(obj);
  };

  function parseTime(time) {
    const [timePart, amPm] = time.split(' ');
    let [hour, minute] = timePart.split(':').map(Number);

    if (amPm === 'PM' && hour < 12) {
      hour += 12;
    }
    return [hour, minute];
  }

  function generateIntervals(timeBreaks, intervalMinutes) {
    const intervals12 = [];
    // const intervals24 = [];
    for (const timeBreak of timeBreaks) {
      const { starttime, endtime } = timeBreak;

      const [startHour, startMinute] = parseTime(starttime);
      const [endHour, endMinute] = parseTime(endtime);
      let currentHour = startHour;
      let currentMinute = startMinute;
      while (
        currentHour < parseInt(endHour, 10) ||
        (currentHour === parseInt(endHour, 10) &&
          currentMinute <= parseInt(endMinute, 10) &&
          !(currentHour === 12 && currentMinute === 0 && startHour === 12))
      ) {
        const formattedStartHour12 =
          currentHour > 12 ? currentHour - 12 : currentHour;
        const formattedStartMinute = currentMinute.toString().padStart(2, '0');
        const stAmPm = currentHour < 12 && currentHour > 6 ? 'am' : 'pm';
        const startInterval12 = `${formattedStartHour12}:${formattedStartMinute} ${stAmPm}`;

        currentMinute += intervalMinutes;

        if (currentMinute >= 60) {
          currentHour++;
          currentMinute -= 60;
        }

        // Check if the current time exceeds the end time
        if (
          currentHour > parseInt(endHour, 10) ||
          (currentHour === parseInt(endHour, 10) &&
            currentMinute > parseInt(endMinute, 10))
        ) {
          break; // Skip adding the extra interval
        }

        const formattedEndHour12 =
          currentHour > 12 ? currentHour - 12 : currentHour;
        const formattedEndMinute = currentMinute.toString().padStart(2, '0');
        const endAmPm = currentHour < 12 && currentHour > 6 ? 'am' : 'pm';
        const endInterval12 = `${formattedEndHour12}:${formattedEndMinute} ${endAmPm}`;
        const interval12 = `${startInterval12} - ${endInterval12}`;
        intervals12.push(interval12);
      }
    }
    return intervals12;
  }

  const modifiers = {
    selected: availability,
  };
  const modifiersStyles = {
    selected: {
      backgroundColor: '#FFC203',
      color: 'black',
    },

    container: {
      height: '900px',
      width: '900px',
    },
  };

  const WEEKDAYS_LONG = [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ];
  const WEEKDAYS_SHORT = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];
  const currentDate = new Date();
  const startOfMonth = new Date(selectedRange.from);
  const endOfMonth = new Date(selectedRange.to);

  return (
    <Flex>
      <Flex row center className={styles.banner}>
        <SvgZitaLogo />
        <Text bold color="theme" size={16}>
          Interview Scheduling
        </Text>
      </Flex>
      <Flex row center className={styles.slotcontainer}>
        {response?.map((data, item) => (
          <Flex
            row
            key={item}
            className={styles.slotter}
            style={{ padding: '10px' }}
          >
            <Flex flex={4} className={styles.leftside}>
              <Flex row center>
                {data.company_logo !== '' ? (
                  <img
                    src={`${process.env.REACT_APP_HOME_URL}media/${data.company_logo}`}
                    alt="Company Logo"
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  ''
                )}
                <Text
                  size={14}
                  bold
                  style={{ color: '#581845', marginLeft: '5px' }}
                >
                  {data.company_name}
                </Text>
              </Flex>
              <Text size={13} style={{ margin: '10px 0px' }}>
                {candidate_name}, you have been selected for an{' '}
                {data.event_name} at {data.company_name}. Pick a Time and Date
              </Text>
              <div className={styles.line}></div>
              <Flex marginBottom={10}>
                <Text bold size={14}>
                  {data.event_name}
                </Text>
              </Flex>
              <Flex row center marginBottom={10}>
                <SvgClock width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  {data.duration}
                </Text>
              </Flex>
              <Flex row center marginBottom={10}>
                <SvgGlobe width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  Time Zone is {timezones(data.times_zone)}
                </Text>
              </Flex>
              <Flex row start marginBottom={10}>
                <SvgInfoCircle width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  This is an {getinter(data.event_type)}.Please come prepared
                  with the technical aspects of your work experience along with
                  your CV/Resume
                </Text>
              </Flex>
              <div className={styles.line}></div>
            </Flex>
            <Flex flex={4} className={styles.rightside}>
              <DayPicker
                locale={enUS}
                mode="single"
                styles={{
                  // head_cell: {
                  //   width: '29px',
                  // },
                  // table: {
                  //   maxWidth: 'none',
                  // },
                  // day: {
                  //   margin: '7px',
                  // },
                  // head: {
                  //   width: '29px',
                  // },
                  months: {
                    // width: '130px',
                    color: '#581845',
                  },
                  // nav: {
                  //   margin: '15px',
                  // },
                }}
                onSelect={setDays}
                fromMonth={startOfMonth}
                toMonth={endOfMonth}
                className="custom-daypicker"
                fromDate={startDate}
                toDate={endDate}
                onDayClick={(e) => onDateChange(e)}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
              />
              {date ? <div className={styles.line}></div> : ''}
              {date ? (
                <Text size={14} color="theme" bold>
                  Availability for {date}
                </Text>
              ) : (
                ''
              )}
              <Flex row wrap className={styles.select}>
                {finalIntervals?.length > 0 &&
                  finalIntervals?.map((obj, index) => (
                    <button
                      className={styles.button1}
                      key={index}
                      onClick={() => selectbutton(obj)}
                    >
                      {obj}
                    </button>
                  ))}
              </Flex>
              {selecttime ? (
                <Flex end>
                  <Button
                    style={{ margin: '10px 0px' }}
                    onClick={() => onSubmit(date, selecttime)}
                  >
                    Schedule
                  </Button>
                </Flex>
              ) : (
                ''
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
const Conformpage = (props) => {
  const {
    margin,
    selecttime,
    date,
    time_zone,
    response,
    getinter,
    isProfile,
    timezones,
  } = props;

  useEffect(() => {
    // mount();
  }, []);
  const googleaddevent = async () => {
    const addevent = {
      summary: 'heloo',
      description: 'googleadd event',
      start: {
        datetime: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        datetime: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    const events = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer' +
            'ya29.a0AbVbY6MrtjxCaueL5oYyKaU73Lqro_oJOvBwDGZ-pVeqCxGNGg3uWvQFbDufFZ9gbu7pdHervKGeeZYTmoS3wzMQSrag1yzk5tqZf67D8iYqjTivkKc6t_27jqvGrLvkyAvK9d3hWRGU2U9JxeC72g3f5yOoaCgYKAYkSARISFQFWKvPlo5LDr5gDd7__fd2zTjjFjA0163',
        },
        body: JSON.stringify(addevent),
      },
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {})
      .then((err) => {});
  };
  return (
    <Flex>
      <Flex row center className={styles.banner}>
        <SvgZitaLogo />
        <Text bold color="theme" size={16}>
          Interview Scheduling
        </Text>
      </Flex>
      <Flex className={styles.successTick}>
        {response?.map((list: any) => (
          <Flex className={styles.confrompage} key={list.id}>
            <Flex center className={styles.successTick} marginBottom={10}>
              <SvgCheck2Circle width={30} height={30} fill={'green'} />
              <Text size={16} bold style={{marginTop:"10px"}}>
                Your Interview has been Successfully Scheduled
              </Text>
            </Flex>
            <Flex row center marginTop={15}>
              <img
                src={`${process.env.REACT_APP_HOME_URL}media/${list.company_logo}`}
                alt="Company Logo"
                style={{ width: '24px', height: '24px', borderRadius: '50%' }}
              />
              <Text
                bold
                size={14}
                style={{ color: '#581845', marginLeft: '5px' }}
              >
                {list.company_name}
              </Text>
            </Flex>
            <Text bold size={14} style={{ margin: '10px 0px' }}>
              {list.event_name}
            </Text>
            <Flex row center marginBottom={10}>
              <SvgCalendarEvent width={14} height={14} fill={'#581845'} />
              <Text size={13} style={{ marginLeft: '5px' }}>
                {selecttime},{date}
              </Text>
            </Flex>
            <Flex row center marginBottom={10}>
              <SvgClock width={14} height={14} fill={'#581845'} />
              <Text size={13} style={{ marginLeft: '5px' }}>
                {list.duration}
              </Text>
            </Flex>
            <Flex row center marginBottom={10}>
              <SvgGlobe width={14} height={14} fill={'#581845'} />
              <Text size={13} style={{ marginLeft: '5px' }}>
                Time Zone is {timezones(list.times_zone)}
              </Text>
            </Flex>
            <Flex row marginBottom={10}>
              <SvgInfoCircle width={14} height={14} fill={'#581845'} />
              <Text size={13} style={{ marginLeft: '5px' }}>
                This is an {getinter(list.event_type)}.Please come prepared with
                the technical aspects of your work experience along with
                CV/Resume
              </Text>
            </Flex>

            <div className={styles.line} style={{ margin: '20px 0px' }}></div>
            <Flex row center middle>
              <Button types="secondary" onClick={googleaddevent}>
                Add to your calendar
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const InterviewDashBoard = (props) => {
  const {
    margin,
    slotterdata,
    slotmembers,
    getinter,
    isProfile,
    setloader,
    dashboard,
    timezones,
  } = props;

  const mergedArray = [...dashboard, ...slotterdata];

  useEffect(() => {
    // setloader(true);
  });

  const formatDate = (dateStr) => {
    // const dateStr = '02/08/2023';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
  };

  const addtocalender = () => {
    const eventTitle = 'My Event';
    const startDate = new Date('2023-08-02T09:45:00');
    const endDate = new Date('2023-08-02T10:00:00');

    const teamsCalendarLink = `https://teams.microsoft.com/l/meeting/new?
    subject=${encodeURIComponent(
      eventTitle,
    )}&startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`;
    // GoogleIntergration()
  };

  return (
    <>
      <Flex>
        {dashboard.map((list: any, index) => (
          <div key={index} className={styles.dashboard}>
            <Flex>
              <Flex row>
                <div style={{ marginLeft: '10px' }}>
                  <img
                    src={`${process.env.REACT_APP_HOME_URL}media/${list.company_logo}`}
                    alt="Company Logo"
                    style={{ width: '100px', height: '100px' }}
                  />
                  {/* </div>
                  <div style={{  }}> */}
                  <Text
                    style={{
                      color: '#581845',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      marginLeft: '20px',
                    }}
                  >
                    {list.company_name}{' '}
                  </Text>
                  <br />
                </div>
              </Flex>
              <Flex row>
                <div
                  style={{
                    marginLeft: '20px',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <Text
                    size={18}
                    style={{
                      color: '#581845',
                      fontWeight: 'bold',
                      fontSize: '22px',
                    }}
                  >
                    {list.event_name}
                  </Text>
                </div>
              </Flex>
              <div style={{ marginTop: '20px' }}></div>
              <Flex row>
                <div
                  style={{
                    marginLeft: '20px',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <SvgCalendarEvent width={18} height={18} />
                  <Text style={{ marginLeft: '10px' }}>
                    {/* {data.time} */}
                    {slotterdata.map((li) => li.time)} ,{' '}
                    {slotterdata.map((li) => formatDate(li.date))}
                  </Text>
                </div>
              </Flex>
              <div style={{ marginTop: '20px' }}></div>
              <Flex row>
                <div
                  style={{
                    marginLeft: '20px',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <SvgClock width={16} height={16} fill={'#581845'} />
                  {/* <i class="bi bi-clock"></i> */}
                  <Text style={{ marginLeft: '10px' }}>{list.duration}</Text>
                  <br />
                </div>
              </Flex>
              <div style={{ marginTop: '20px' }}></div>
              <Flex row>
                <div
                  style={{
                    marginLeft: '20px',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <SvgGlobe width={18} height={18} fill={'#581845'} />

                  <Text style={{ marginLeft: '10px' }}>
                    Time Zone is {timezones(list.times_zone)}
                  </Text>
                </div>
                {/* })} */}
              </Flex>
              <div style={{ marginTop: '20px' }}></div>
              <Flex row>
                <div
                  style={{
                    marginLeft: '20px',
                    // textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <SvgInfoCircle width={18} height={18} fill={'#581845'} />
                  <Text style={{ marginLeft: '10px' }}>
                    This is an {getinter(list.event_type)}.Please come prepared
                    with the technical aspects of your work experience along
                    with your CV/Resume
                  </Text>
                  <br />
                </div>
              </Flex>
              <div style={{ marginTop: '20px' }}></div>
              <div className={styles.line5}></div>
              <div style={{ marginTop: '20px' }}></div>

              <div style={{ textAlign: 'left', marginLeft: '20px' }}>
                <SvgPersonFill width={18} height={18} fill={'#581845'} />
                <Text style={{ marginLeft: '10px' }}>
                  Candidate / Applicant
                </Text>
                <div style={{ marginTop: '10px' }}></div>

                <Text style={{ marginLeft: '10px' }}>
                  {/* {list.candidate_id__first_name} */}
                  {slotterdata.map((li) => li.candidate_id__first_name)}
                </Text>
              </div>
              <div style={{ textAlign: 'left', marginLeft: '20px' }}>
                <SvgPeopleFill width={18} height={18} fill={'#581845'} />
                <Text style={{ marginLeft: '10px' }}>Interviewer(s)</Text>
                <div style={{ marginTop: '20px' }}></div>

                <Text style={{ marginLeft: '10px' }}>
                  {slotmembers.map((data) => data.full_name).join(', ')}
                </Text>
              </div>
              <div style={{ marginTop: '20px' }}></div>
              <div className={styles.line5}></div>
              <div style={{ marginTop: '20px' }}></div>

              <Flex row>
                <div
                  style={{
                    marginLeft: '260px',
                    textAlign: 'center',
                    marginTop: '10px',
                  }}
                >
                  <button
                    className={styles.button}
                    onClick={() => addtocalender()}
                  >
                    <Text>Add to your calendar</Text>
                  </button>
                </div>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>
    </>
  );
};

export default slotter1;
