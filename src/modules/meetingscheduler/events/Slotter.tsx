import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AppDispatch, RootState } from '../../../store';
import 'react-day-picker/dist/style.css';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Button from '../../../uikit/Button/Button';
import SvgPersonFill from '../../../icons/SvgPersonFill';
import SvgPeopleFill from '../../../icons/SvgPeopleFill';
import { availbleslot } from '../../../routes/apiRoutes';
import SvgCalendarEvent from '../../../icons/SvgCalendarEvent';
import SvgCheck2Circle from '../../../icons/SvgCheck2Circle';
import SvgClock from '../../../icons/SvgClock';
import SvgGlobe from '../../../icons/SvgGlobe';
import SvgInfo from '../../../icons/SvgInfo';
import Loader from '../../../uikit/Loader/Loader';
import {
  googleAddEventMiddleware,
  outlookAddEventMiddleware,
  getGoogleConflictMiddleWare,
  getOutlookConflictMiddleWare,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { isEmpty } from '../../../uikit/helper';
import SvgInactive from '../../../icons/SvgInactive';
import styles from './slotter.module.css';
import {
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from './store/middleware/eventmiddleware';
import './DayPickerCustomStyles.css';
import { MemberInterface, SlotterEntity } from './ScheduleTypes';

const Slotter = (props) => {
  const { userpreview } = props;
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid') ? searchParams.get('uid') : null;
  const eventid = searchParams.get('eventid');
  const [event, setEvent] = useState(parseInt(eventid));
  const [date, setDate] = useState(null);
  const [select, setSelect] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [selecttime, setSelectTime] = useState('');
  const [selecteddate1, setselectedDate1] = useState('');
  const [dashboard, setDashboard] = useState(false);
  const [finalIntervals, setfinalIntervals] = useState([]);
  const [conflicts, setConflicts] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [confromflag, SetConfromFlag] = useState(false);
  const [loader, setloader] = useState(false);
  const [availblity, setavailblity] = useState([]);

  const { data, datetime, isLoading, interviewer, google, outlook } =
    useSelector(({ schedulerReducers }: RootState) => ({
      isLoading: schedulerReducers.isLoading,
      data: schedulerReducers.data,
      datetime: schedulerReducers.datetime,
      interviewer: schedulerReducers.interviewer,
      google: schedulerReducers.google,
      outlook: schedulerReducers.outlook,
    }));

  const { slotterdata, slotmembers, candidate_name, Loading, can_id } =
    useSelector(({ slotterReducers }: RootState) => ({
      Loading: slotterReducers.isLoading,
      slotterdata: slotterReducers.slotterdata,
      slotmembers: slotterReducers.slotmembers,
      candidate_name: slotterReducers.candidate_name,
      can_id: slotterReducers.can_id,
    }));

  const { googleconflicts, outlookconflicts } = useSelector(
    ({ googleConflictReducers, outlookConflictReducers }: RootState) => ({
      googleconflicts: googleConflictReducers.events,
      outlookconflicts: outlookConflictReducers.events,
    }),
  );

  const candi_name = candidate_name ? candidate_name : 'candidate';
  
  useEffect(() => {
    const event_id = event;
    setloader(true);
    axios
      .get(`${availbleslot}?pk=${event}`, {
        headers: {
          Authorization: undefined,
        },
        transformResponse: [
          (datalist) => {
            const parsedData = JSON.parse(datalist);
            return parsedData;
          },
        ],
      })
      .then((res: any) => {
        if (res.data !== null) {
          const value = res.data.availbleslot;
          setavailblity(value);
        }
      });

    if (userpreview === undefined && uid !== null) {
      dispatch(getSlotterMiddleware({ uid, event_id }));
    }
    dispatch(getScheduleMiddleWare(event));
  }, []);

  useEffect(() => {
    if (slotterdata !== undefined && slotmembers !== undefined) {
      if (slotmembers.length > 0 && slotterdata.length > 0) {
        setDashboard(true);
      }
    }
  }, [slotmembers, slotterdata]);

  useEffect(() => {
    if (data.length > 0) {
      data.forEach(({ startdate, enddate }, index) => {
        if (google) {
          dispatch(
            getGoogleConflictMiddleWare({
              event_id: event,
              startdate,
              enddate,
            }),
          );
        }
        if (outlook) {
          dispatch(
            getOutlookConflictMiddleWare({
              event_id: event,
              startdate,
              enddate,
            }),
          );
        }
      });
    }
  }, [data]);

  useEffect(() => {
    if (googleconflicts !== null) {
      setConflicts(googleconflicts);
    }
    if (outlookconflicts !== null) {   
      setConflicts(outlookconflicts);
    }

  }, [googleconflicts, outlookconflicts]);

  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const year = dateObj.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth =
      monthIndex + 1 < 10 ? `0${monthIndex + 1}` : `${monthIndex + 1}`;
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  }

  const dateconvert = (d) => {
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); 
    const year = d.getFullYear();
    const value = `${day}/${month}/${year}`;
    return value;
  };

  const CalendarIntegration = (list, selecteddate, selectedtime) => {

    if (list !== null) {
      const formData = new FormData();
      const [timeOffset, locations] = list.times_zone.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses}`;
      const attendees = [];
      formData.append('pk', JSON.stringify(event));
      formData.append('title', list.event_name);
      formData.append('date', selecteddate);
      formData.append('can_id', JSON.stringify(can_id));
      formData.append('time', selectedtime);
      formData.append('timezone', result);
      if (google) {
        interviewer?.map((datalist, index) => {
          if (datalist.google_calendar !== null) {
            attendees.push({ email: datalist.google_calendar });
          }
        });
        formData.append('attendees', JSON.stringify(attendees));
        dispatch(googleAddEventMiddleware({ formData }));
      }
      if (outlook) {
        interviewer?.map((datalist) => {
          if (datalist.outlook_calendar !== null) {
            attendees.push(datalist.outlook_calendar);
          }
        });
        formData.append('attendees', JSON.stringify(attendees));
        dispatch(outlookAddEventMiddleware({ formData }));
      }
    }
  };
  const onSubmit = (selectdate11, selecttime11) => {
    setConfirm(true);
    SetConfromFlag(true);
    var event_id = eventid;
    var selecteddate = dateconvert(selectDate);
    var selectedtime = selecttime11;
    if (uid !== null && event_id !== null && userpreview === undefined) {
      dispatch(
        getSlotterMiddleware({ uid, event_id, selecteddate, selectedtime }),
      );
      CalendarIntegration(data[0], selecteddate, selectedtime);
    }
  };


  const timezones = (str) => {
    let timeszonesdisplay = '';
    const display = data.map((li: any) => {
      timeszonesdisplay = li.times_zone_display;
    });
    if (timeszonesdisplay !== '') {
      if (
        timeszonesdisplay === 'Lock the timezone (best for in-person events)'
      ) {
        const [timeOffset, locations] = str.split(' ');
        const locationWithoutParentheses = locations.slice(1, -1);
        const result = `${locationWithoutParentheses} (${timeOffset})`;
        return result;
      } else {
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = moment.tz(userTimezone).format('Z');
        const userzone1 = `${userTimezone} (${offset})`;
        return userzone1;
      }
    }
  };

  const FooterNavogation = () => {
    window.open('https://www.zita.ai/', '_blank');
  };

  return (
    <Flex>
      <Flex height={'100%'} className={styles.element}>
        {dashboard === true ? (
          <Flex height={'100%'}>
            <InterviewDashBoard
              Loading = {Loading}
              isLoading = {isLoading}
              slotterdata={slotterdata}
              slotmembers={slotmembers}
              dashboard={data}
              timezones={timezones}
              candidate_name={candi_name}
              FooterNavogation={FooterNavogation}
            />
          </Flex>
        ) : confromflag === false && dashboard === false ? (
          <Flex height={'100%'}>
            <SlotterDate
              date={date}
              select={select}
              selecttime={selecttime}
              isLoading={isLoading}
              response={data}
              finalIntervals={finalIntervals}
              candidate_name={candi_name}
              setfinalIntervals={setfinalIntervals}
              setSelect={setSelect}
              onSubmit ={onSubmit}
              setselectedDate={setselectedDate1}
              setDate={setDate}
              setSelectTime ={setSelectTime}
              selectDate={selectDate}
              setSelectDate ={setSelectDate}
              timezones={timezones}
              availbles={availblity}
              conflicts={conflicts}
              FooterNavogation={FooterNavogation}
            />
          </Flex>
        ) : confromflag === true ? (
          <Flex height={'100%'}>
            <Conformpage
              selecttime={selecttime}
              date={date}
              response={data}
              candidate_name={candi_name}
              timezones={timezones}
              FooterNavogation={FooterNavogation}
            />
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
};


type SlotterProps = {
  date : any;
  select : boolean;
  selecttime  : string
  response : any;
  finalIntervals : any;
  candidate_name : string;
  availbles : any;
  isLoading : boolean;
  conflicts : [];
  selectDate : any;
  onSubmit : (date : string , time : string) => void;
  setSelect : (boolean) => void;
  setDate : (any) => void;
  setSelectTime : (any) => void;
  setselectedDate : (any) => void;
  setfinalIntervals : ([]) => void;
  setSelectDate : (any) => void;
  timezones : any;
  FooterNavogation : () => void;
}

const SlotterDate = ({
  date,
  select,
  selecttime,
  response,
  finalIntervals,
  candidate_name,
  availbles,
  isLoading,
  conflicts,
  selectDate,
  timezones,
  onSubmit,
  setSelectTime,
  setSelect,
  setDate,
  setselectedDate,
  setfinalIntervals,
  setSelectDate,
  FooterNavogation,
}:SlotterProps) => { 
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });
  const [useravailble, setuseravailble] = useState([]);
  const [timezone, settimezone] = useState('');
  const [highlightday, setHighlightDay] = useState(null);

  useEffect(() => {
    mount();
  }, [response, timezone, availbles]);

  const dateObject = availbles;
  const allDatesArray = Object.keys(dateObject);
  const today = new Date();
  const dateObjectsArray = allDatesArray.reduce((datesArray, dateString) => {
    const parts = dateString.split('/');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const day = parseInt(parts[0], 10);
    const dates = new Date(year, month, day);
    if (dates > today || dates.toDateString() === today.toDateString()) {
      datesArray.push(dates);
    }
    return datesArray;
  }, []);
  const mount = () => {
    if (availbles !== undefined) {
      setuseravailble(availbles);
    }
    {
      response?.map((list) => {
        timezoneset(list.times_zone_display, list.times_zone);
        setSelectedRange({
          from: list.startdate,
          to: list.enddate,
        });
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

  const dateconvert = (formattedDate) => {
    const convertedDate = moment(formattedDate).format('DD/MM/YYYY');
    return convertedDate;
  };

  const AvailbleSlots = (datetimes) => {
    const check = dateconvert(datetimes);

    setHighlightDay(datetimes);
    const filteredData = Object.fromEntries(
      Object.entries(useravailble).filter(
        ([key, value]) => key.toString() === check,
      ),
    );


    const startTime = new Date();
    startTime.setHours(9, 0, 0, 0); 
    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0); 


    const intervals123 = response.map((dur) => {
      const durationParts = dur.duration.split(' ');
      let hours = 0;
      let minutes = 0;
      if (durationParts.length === 2) {
        if (durationParts[1] === 'minutes') {
          minutes = parseInt(durationParts[0], 10);
        }
        if (durationParts[1] === 'hour' || durationParts[1] === 'hours') {

          hours = parseInt(durationParts[0], 10);

        }
      } else if (durationParts.length === 4) {
        if (durationParts[1] === 'hour' || durationParts[1] === 'hours') {
          hours = parseInt(durationParts[0], 10);
        }

        if (durationParts[3] === 'minutes') {
          minutes = parseInt(durationParts[2], 10);
        }
      }
      return { hours, minutes };
    });




    const updatedDates = filteredData[check].map((date1) => {
      let { starttime, endtime } = date1;
      if (
        starttime.includes('12:') &&
        (starttime.includes('12:15') ||
          starttime.includes('12:45') ||
          starttime.includes('12:30'))
      ) {
        starttime = starttime.replace('12:', '00:');
      }
      if (
        endtime.includes('12:') &&
        (endtime.includes('12:15') ||
          endtime.includes('12:45') ||
          endtime.includes('12:30'))
      ) {
        endtime = endtime.replace('12:', '00:');
      }

      return { starttime, endtime };
    });
    const timeslot = generateIntervals(updatedDates, intervals123[0], check);
    setfinalIntervals(timeslot);
  };

  const onDateChange = (datetimes: any) => {
    const currentDate = new Date(datetimes);
    const isInSchedule = dateObjectsArray.some((d) => {
      const scheduleDate = new Date(d);
      scheduleDate.setHours(0, 0, 0, 0);  
      currentDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === currentDate.getTime();
    });
    if (isInSchedule) {
      AvailbleSlots(datetimes);
      const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };
      const formattedDate = datetimes.toLocaleDateString('en-US', options);
      setDate(formattedDate);
      setSelectTime('');
      setSelectDate(datetimes);
      setselectedDate(datetimes);
    } else {
      setDate(null);
      setfinalIntervals([]);
      setSelectTime('');
    }
  };

  const selectbutton = (obj) => {
    const { index, value } = obj;
    if (select === false) {
      setSelect(true);
      setSelectTime(obj);
    } else {
      setSelectTime(obj);
    }
  };

  function parseTime(time) {
    const [timePart, amPm] = time.split(' ');
    let [hour, minute] = timePart.split(':').map(Number);

    if (amPm === 'PM' && hour < 12) {
      hour += 12;
    }
    return [hour, minute];
  }

  function getTimeIn12HrsFormat(currentTime) {
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? 0 : minutes;
    const timeIn12HourFormat = `${hours}:${minutes} ${ampm}`;
    return timeIn12HourFormat;
  }

  function isIntervalWithinRange(interval, range) {
    const [startTime, endTime] = range.split(' to ');
    const [intervalStartTime, intervalEndTime] = interval.split(' - ');
    if (intervalStartTime >= startTime && intervalEndTime <= endTime) {
      return true;
    }
    if (intervalEndTime > startTime && intervalEndTime <= endTime) {
      return true;
    }
  }

  function getRemainingIntervalsWithinExcludedRanges(
    targetIntervals,
    excludedRanges,
  ) {
    const remainingIntervals = [];
    for (const targetInterval of targetIntervals) {
      let isExcluded = false;
      for (const excludedRange of excludedRanges) {
       {console.log("isIntervalWithinRange",isIntervalWithinRange(targetInterval, excludedRange))}
        if (isIntervalWithinRange(targetInterval, excludedRange)) {
          isExcluded = true; 
          // break;
        }
      }
      if (!isExcluded) {
        remainingIntervals.push(targetInterval); 
      }
    }
    return remainingIntervals;
  }
  function generateIntervals(timeBreaks, intervalMinutes, datetimes) {
    const intervals12 = [];
    for (const timeBreak of timeBreaks) {
      let { starttime, endtime } = timeBreak;
      if (starttime.includes('12:')) {
        starttime = starttime.replace('12:', '00:');
      }
      if (endtime.includes('12:')) {
        endtime = endtime.replace('12:', '00:');
      }
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
          currentHour === 0
            ? 12
            : currentHour === 12
            ? 12
            : currentHour > 12
            ? currentHour - 12
            : currentHour;
        const formattedStartMinute = currentMinute.toString().padStart(2, '0');
        const stAmPm = currentHour >= 12 ? 'pm' : 'am';
        const startInterval12 = `${formattedStartHour12}:${formattedStartMinute} ${stAmPm}`;

        currentHour += intervalMinutes.hours;
        currentMinute += intervalMinutes.minutes;

        if (currentMinute >= 60) {
          currentHour++;
          currentMinute -= 60;
        }
        if (
          currentHour > parseInt(endHour, 10) ||
          (currentHour === parseInt(endHour, 10) &&
            currentMinute > parseInt(endMinute, 10))
        ) {
          break; 
        }

        const formattedEndHour12 =
          currentHour === 0
            ? 12
            : currentHour === 12
            ? 12
            : currentHour > 12
            ? currentHour - 12
            : currentHour;
        const formattedEndMinute = currentMinute.toString().padStart(2, '0');
        const endAmPm = currentHour >= 12 ? 'pm' : 'am';
        const endInterval12 = `${formattedEndHour12}:${formattedEndMinute} ${endAmPm}`;

        const currentDate = dateconvert(new Date());
        const currenttime = new Date();
        const time = getTimeIn12HrsFormat(currenttime);

        if (
          startInterval12 !== '12:15 am' &&
          (currentDate.toString() !== datetimes ||
            (time < endInterval12 && endInterval12 < '9:00'))
        ) {
          intervals12.push(`${startInterval12} - ${endInterval12}`);
        }
      }
    }

    if (conflicts !== null) {
      const excludedRanges = conflicts[datetimes];
      if (excludedRanges) {
        const eventsForSelectedDate = conflicts[datetimes];
        const remainingIntervals = getRemainingIntervalsWithinExcludedRanges(
          intervals12,
          eventsForSelectedDate,
        );
        return remainingIntervals;
      } else {
        return intervals12;
      }
    } else {
      return intervals12;
    }
  }

  function isHighlightedDay(day) {
    if (!isEmpty(selectDate)) {
      const targetDate = selectDate;
      return day.toDateString() === targetDate.toDateString();
    }
  }
  const modifiers = {
    selected: dateObjectsArray,
    highlighted: isHighlightedDay,
    lastSelected: (day) =>
      highlightday && day.toDateString() === highlightday.toDateString(),
  };

  const modifiersStyles = {
    selected: {
      backgroundColor: '#d7c7d2',
      color: 'black',
    },
    highlighted: {
      backgroundColor: '#581848',
      color: 'white',
    },
    lastSelected: {
      backgroundColor: '#581848',
      color: 'white',
    },
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex height={'100%'} style={{ overflow: 'auto' }}>
      {response?.length > 0 ? (
        <>
          <Flex row center className={styles.banner}>
            {response[0].company_logo !== '' && (
              <img
                src={`${process.env.REACT_APP_HOME_URL}media/${response[0]?.company_logo}`}
                alt="Company Logo"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  marginLeft: '43px',
                }}
              />
            )}
        {response[0].company_logo !== '' &&
            <Text bold color="theme" size={16} style={{ marginLeft: '10px' }}>
              Interview Scheduling
            </Text>}
            {response[0].company_logo === '' &&
            <Text bold color="theme" size={16} style={{ marginLeft: '48px' }}>
              Interview Scheduling
            </Text>}
          </Flex>
          <Flex height={'100%'} className={styles.slotcontainer}>
            {response?.map((data, item) => (
              <Flex key={item} className={styles.slotter}>
                <Flex>
                  <Flex row>
                    <Flex flex={4} className={styles.leftside}>
                      <Flex row center>
                        <Text size={16} bold>
                          {data.company_name}
                        </Text>
                      </Flex>
                      <Flex marginBottom={10} marginTop={14}>
                        <Text size={14}>Hi {candidate_name},</Text>
                        <br/>
                        <Text size={14}>
                          {`You have been selected for the ${data.event_name} at 
                   ${data.company_name}.`}
                        </Text>
                        <Text size={14} style={{ marginTop: '5px' }}>
                          Please pick a date and time.
                        </Text>
                      </Flex>

                      <div className={styles.line}></div>
                      <Flex marginBottom={10}>
                        <Text bold size={14}>
                          {data.event_name}
                        </Text>
                      </Flex>
                      <Flex row center marginBottom={10}>
                        <SvgClock width={16} height={16} fill={'#581845'} />
                        <Text size={14} style={{ marginLeft: '5px' }}>
                          {data.duration}
                        </Text>
                      </Flex>
                      <Flex row center marginBottom={10}>
                        <SvgGlobe width={16} height={16} fill={'#581845'} />
                        <Text size={14} style={{ marginLeft: '5px' }}>
                          Time zone is {timezones(data.times_zone)}
                        </Text>
                      </Flex>
                      <Flex row start marginBottom={10}>
                        <Flex marginTop={3}>
                          <SvgInfo width={16} height={16} fill={'#581845'} />
                        </Flex>

                        <Text
                          size={14}
                          style={{ marginLeft: '5px', marginTop: '2px' }}
                        >
                          {data.description}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex flex={4} className={styles.rightside}>
                      <div style={{ marginLeft: '90px' }}>
                        <DayPicker
                          styles={{
                            months: {
                              color: '#581845',
                            },
                          }}
                          defaultMonth={dateObjectsArray[0]}
                          onDayClick={(e) => onDateChange(e)}
                          modifiers={modifiers}
                          modifiersStyles={modifiersStyles}
                        />
                      </div>
                    </Flex>
                  </Flex>

                  <Flex>
                    {date ? (
                      <div
                        className={styles.line}
                        style={{ margin: '10px 0px' }}
                      ></div>
                    ) : (
                      ''
                    )}
                  </Flex>
                  <Flex>
                    {date ? (
                      <Text size={13} bold>
                        Availability for {date}
                      </Text>
                    ) : (
                      ''
                    )}
                    <Flex row wrap className={styles.select} marginTop={10}>
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
                      <Flex end className={styles.content} marginTop={20}>
                        <Button
                          style={{ marginTop: '20px' }}
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
              </Flex>
            ))}
          </Flex>
          <Flex
            center
            bottom
            middle
            marginBottom={10}
            marginTop={10}
            onClick={FooterNavogation}
          >
            <Text bold style={{ cursor: 'pointer' }} size={14} color="theme">
              Powered by Zita.ai
            </Text>
          </Flex>
        </>
      ) : (
        <>
          <Flex row className={styles.unavailble}>
            <Flex>
              <SvgInactive width={21} height={21} />
            </Flex>
            <Flex marginTop={2}>
              <Text style={{ color: '#581848', marginLeft: '5px' }}>
                This slotter is no longer available to schedule
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};


type ConfromProps = {
  selecttime : string;
  date : string;
  response : any;
  timezones : any;
  candidate_name : string;
  FooterNavogation : () => void;
}
const Conformpage = ({
  selecttime,
  date,
  response,
  timezones,
  candidate_name,
  FooterNavogation,
  }:ConfromProps) => {

return (
    <>
      <Flex className={styles.successTick}>
        {response[0].company_logo !== '' ? (
          <>
            <img
              src={`${process.env.REACT_APP_HOME_URL}media/${response[0]?.company_logo}`}
              alt="Company Logo"
              style={{
                width: '75px',
                height: '75px',
                borderRadius: '50%',
                marginLeft: '7px',
                marginBottom: '15px',
                marginTop: '40px',
              }}
            />
          </>
        ) : (
          <Flex marginTop={30}></Flex>
        )}
        <Flex marginTop={30}>
          {response?.map((list: any) => (
            <Flex className={styles.confrompage} key={list.id}>
              <Flex center className={styles.successTick} marginBottom={10}>
                <SvgCheck2Circle width={30} height={30} fill={'green'} />
                <Text size={16} bold style={{ marginTop: '10px' }}>
                  Your interview has been scheduled successfully
                </Text>
              </Flex>
              <Flex row center marginTop={15}>
                <Text size={14} bold>
                  {list.company_name}
                </Text>
              </Flex>
              <Text
                bold
                size={14}
                style={{ margin: '10px 0px', textTransform: 'capitalize' }}
              >
                {list.event_name}
              </Text>
              <Flex row center marginBottom={10}>
                <SvgCalendarEvent width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  {selecttime}, {date}
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
                  Time zone is {timezones(list.times_zone)}
                </Text>
              </Flex>
              <Flex row marginBottom={10}>
                <Flex marginTop={3}>
                  <SvgInfo width={14} height={14} fill={'#581845'} />
                </Flex>

                <Text
                  size={13}
                  style={{
                    marginLeft: '5px',
                    textAlign: 'justify',
                    marginTop: '1px',
                  }}
                >
                  {list.description}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        center
        bottom
        middle
        marginBottom={10}
        marginTop={10}
        onClick={FooterNavogation}
      >
        <Text
          bold
          style={{ cursor: 'pointer', display: 'flex' }}
          size={14}
          color="theme"
        >
          Powered by Zita.ai
        </Text>
      </Flex>
    </>
  );
};


type InterviewProps = {
  slotterdata : SlotterEntity[];
  slotmembers : MemberInterface[];
  dashboard : any,
  timezones : any;
  Loading : boolean;
  isLoading : boolean;
  candidate_name : string;
  FooterNavogation : () => void;

}

const InterviewDashBoard = ({
  slotterdata,
  slotmembers,
  dashboard,
  Loading,
  isLoading,
  candidate_name,
  timezones,
  FooterNavogation,

}:InterviewProps) => {

  const formatDateChange = (dateString) => {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const [day, month, year] = dateString.split('/');
    const date = new Date(year, month - 1, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${
      months[parseInt(month) - 1]
    } ${day}, ${year}`;

    return formattedDate;
  };

  if (Loading) {
    return <Loader />;
  }
  return (
    <>
      <Flex className={styles.successTick}>
        {dashboard[0].company_logo !== '' && (
          <img
            src={`${process.env.REACT_APP_HOME_URL}media/${dashboard[0]?.company_logo}`}
            alt="Company Logo"
            style={{
              width: '75px',
              height: '75px',
              borderRadius: '50%',
              marginLeft: '7px',
              marginBottom: '15px',
              marginTop: '40px',
            }}
          />
        )}
        <Flex marginTop={30}>
          {dashboard.map((list: any, index) => (
            <Flex key={index} className={styles.dashboard}>
              <Flex row center>
                <Text size={14} bold>
                  {list.company_name}
                </Text>
              </Flex>
              <Text
                bold
                size={13}
                style={{ margin: '10px 0px', textTransform: 'capitalize' }}
              >
                {list.event_name}
              </Text>
              <Flex row center marginBottom={10}>
                <SvgCalendarEvent width={14} height={14} fill={'#581845'} />
                <Text size={13} style={{ marginLeft: '5px' }}>
                  {slotterdata.map((li) => li.time)},{' '}
                  {slotterdata.map((li) => formatDateChange(li.date))}
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
                <Text style={{ marginLeft: '5px' }} size={13}>
                  Time zone is {timezones(list.times_zone)}
                </Text>
              </Flex>

              <Flex row marginBottom={10}>
                <Flex marginTop={3}>
                  <SvgInfo width={14} height={14} fill={'#581845'} />
                </Flex>

                <Text
                  size={13}
                  style={{
                    marginLeft: '5px',
                    textAlign: 'justify',
                    marginTop: '1px',
                  }}
                >
                  {list.description}
                </Text>
              </Flex>
              <div className={styles.line} style={{ margin: '20px 0px' }}></div>

              <Flex row marginBottom={10}>
                <Flex marginTop={3}>
                  <SvgPersonFill width={14} height={14} fill={'#581845'} />
                </Flex>

                <Flex>
                  <Text bold size={14} style={{ marginLeft: '5px' }}>
                    Candidate / Applicant
                  </Text>
                  <Text
                    size={13}
                    style={{ marginLeft: '5px', textTransform: 'capitalize' }}
                  >
                    {candidate_name}
                  </Text>
                </Flex>
              </Flex>

              <Flex row>
                <Flex marginTop={3}>
                  <SvgPeopleFill width={14} height={14} fill={'#581845'} />
                </Flex>

                <Flex>
                  <Text bold style={{ marginLeft: '5px' }}>
                    Interviewer(s)
                  </Text>
                  <Text
                    size={13}
                    style={{ marginLeft: '5px', textTransform: 'capitalize' }}
                  >
                    {slotmembers.map((data) => data.full_name).join(', ')}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Flex
        center
        bottom
        middle
        marginBottom={10}
        marginTop={10}
        onClick={FooterNavogation}
      >
        <Text
          bold
          style={{ cursor: 'pointer' }}
          size={14}
          color="theme"
        >
          Powered by Zita.ai
        </Text>
      </Flex>
    </>
  );
};
export default Slotter;
