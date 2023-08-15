import { useEffect, useState } from 'react';
import { DayPicker, DayPickerProps } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment, { duration } from 'moment';
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
import SvgZitaLogo from '../../../icons/SvgZitaLogo';
import {
  googleAddEventMiddleware,
  outlookAddEventMiddleware,
  getGoogleConflictMiddleWare,
  getOutlookConflictMiddleWare,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { isEmpty } from '../../../uikit/helper';
import styles from './slotter.module.css';
import {
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from './store/middleware/eventmiddleware';
import './DayPickerCustomStyles.css';


const slotter1 = (props) => {
  const { userpreview } = props;
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const uid = searchParams.get('uid') ? searchParams.get('uid') : null;
  const eventid = searchParams.get('eventid');
  const [event, setEvent] = useState(parseInt(eventid));
  const [date, setDate] = useState(null);
  const [change, setChange] = useState(false);
  const [select, setSelect] = useState(false);
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
  const [conflicts, setConflicts] = useState(null);

  const [selectDate, setSelectDate] = useState('');
  const [isProfile, setProfile] = useState(null);
  const [confromflag, SetConfromFlag] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  // const [startFrom, setStartFrom] = useState(new Date());
  // const [endFrom, setEndFrom] = useState(new Date());

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

  const { slotterdata, slotmembers, candidate_name, Loading,can_id } = useSelector(
    ({ slotterReducers }: RootState) => ({
      Loading: slotterReducers.isLoading,
      slotterdata: slotterReducers.slotterdata,
      slotmembers: slotterReducers.slotmembers,
      candidate_name: slotterReducers.candidate_name,
      can_id : slotterReducers.can_id
    }),
  );

  const { googleconflicts, outlookconflicts } = useSelector(
    ({ googleConflictReducers,outlookConflictReducers }: RootState) => ({
      googleconflicts: googleConflictReducers.events,
      outlookconflicts: outlookConflictReducers.events
    }),
  );

  console.log(
    'googleconflictsgoogleconflicts',googleconflicts,"\n",outlookconflicts
  )


  const candi_name = candidate_name ? candidate_name : 'candidate';

  console.log("GGGGGGGGGGGGGGGGGG",google,outlook)
  useEffect(() => {
    const event_id = event;
    setloader(true);
    // dispatch(getAvailbleSlot(event));
    axios.get(`${availbleslot}?pk=${event}`, {
      headers: {
        Authorization: undefined // Setting to undefined will remove the "Authorization" header
      },
      transformResponse: [(datalist) => {
        const parsedData = JSON.parse(datalist);
        return parsedData;
      }]
    })
    // axios.get(`${availbleslot}?pk=${event}`).
    .then((res: any) => {
      console.log('resssss', res);
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

  useEffect(()=> {
    if (data.length > 0){
      data.forEach(({ startdate, enddate }, index) => {
        console.log("startdate", startdate, "enddate", enddate);
    
        if (google) {
          // alert("G")
          dispatch(getGoogleConflictMiddleWare({ event_id: event, startdate, enddate }));
        }
        if (outlook) {
          // alert("O")
          dispatch(getOutlookConflictMiddleWare({event_id: event, startdate, enddate }));
        }
      });
    } 
  },[data])

  useEffect(()=> {
    if ("date" in googleconflicts) {
    } else {
      // alert("googleconflicts");
      setConflicts(googleconflicts);
      // Handle the case when 'date' property is not present
      // For example:
      console.log("No 'date' property in googleconflicts");
    }
    // if (Object.keys(googleConflicts).length > 0) {
    //   console.log('googleConflicts has properties');
    // } else {
    //   console.log('googleConflicts is empty');
    if ("date" in outlookconflicts) {
      
    } else {
      // alert("outlookconflicts");
      setConflicts(outlookconflicts);
      // Handle the case when 'date' property is not present
      // For example:
      console.log("No 'date' property in googleconflicts");
    }

  },[googleconflicts,outlookconflicts])

  function formatDate(inputDate) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

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
    console.log('dddddddddddddd', d);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Months in JavaScript are 0-indexed
    const year = d.getFullYear();
    const value = `${day}/${month}/${year}`;
    return value;
  };

  

  const CalendarIntegration = (list, selecteddate, selectedtime) => {
    console.log('listttttttttttttttt111111', list);

    if (list !== null) {
      console.log('44444444444', list.event_name, list.time_zone);
      const formData = new FormData();
      const [timeOffset, locations] = list.times_zone.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses}`;
      console.log('1111111111!!!!!!!!', result, typeof result);
      const attendees = [];
      formData.append('pk', JSON.stringify(event));
      formData.append('title', list.event_name);
      formData.append('date', selecteddate);
      formData.append('can_id',JSON.stringify(can_id));
      formData.append('time', selectedtime);
      formData.append('timezone', result);
      
      console.log("googlegoogle",google,"\n",outlook)

      // if(google || outlook){
        if (google) {
          // alert("Google")
          // attendees.push({ email: google})
          interviewer?.map((datalist, index) => {
            if(datalist.google_calendar !==  null){
              attendees.push({ email: datalist.google_calendar });
            }
          });
          formData.append('attendees', JSON.stringify(attendees));
          dispatch(googleAddEventMiddleware({ formData }));
        }
        if (outlook) {
          // alert("outlook")
          interviewer?.map((datalist) => {
            if(datalist.outlook_calendar !== null){
              attendees.push(datalist.outlook_calendar);
            }
          });
          formData.append('attendees', JSON.stringify(attendees));
          dispatch(outlookAddEventMiddleware({ formData }));
        }
      // }
      console.log('??/////////////', attendees);
      // dispatch(googleAddEventMiddleware({ formData }));
      // ["abineshnk@sense7ai.com","manojr@sense7ai.com"]
    }
  };
  const onSubmit = (selectdate11, selecttime11) => {
    setConfirm(true);
    SetConfromFlag(true);
    var event_id = eventid;
    console.log('selectDate', selectDate);
    var selecteddate = dateconvert(selectDate);
    console.log(
      'dateconvertdateconvertdateconvertdateconvertdateconvert',
      dateconvert(selectDate),
    );
    var selectedtime = selecttime11;
    console.log("%%^%^%^^^",uid,event_id)
    if (uid !== null && event_id !== null && userpreview === undefined  ){
      // alert(uid)
    dispatch(
      getSlotterMiddleware({ uid, event_id, selecteddate, selectedtime }),
    );
    console.log('dadadataaatatatatatata', data);
    CalendarIntegration(data[0], selecteddate, selectedtime);
  }
  };

  const InterviewText = (inter) => {
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
    let timeszonesdisplay = ''
    const display = data.map((li: any) => {
     timeszonesdisplay =  li.times_zone_display}
      );
    console.log("display!@#",data,display,timeszonesdisplay)
    if(timeszonesdisplay !== ''){
      // if (
      //   timeszonesdisplay === 
      //     'Automatically detect and show the times in my invitees time zone'
        
      // ) {
      //   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      //   alert("userTimezone"+userTimezone)
      //   const offset = moment.tz(userTimezone).format('Z');
      //   const userzone1 = `${userTimezone} (${offset})`;
      //   console.log("userzoneuserzoneuserzoneuserzone",userzone1)
      //   return userzone1;
      // 
      if (
        timeszonesdisplay === 'Lock the timezone (best for in-person events)'
      ) {
        const [timeOffset, locations] = str.split(' ');
        const locationWithoutParentheses = locations.slice(1, -1);
        // Create the desired string format: "(Location) Time Offset"
        const result = `${locationWithoutParentheses} (${timeOffset})`;
        // settimezone(locationWithoutParentheses)
        return result;
      }else{
        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = moment.tz(userTimezone).format('Z');
        const userzone1 = `${userTimezone} (${offset})`;
        console.log("userzoneuserzoneuserzoneuserzone",userzone1)
        return userzone1;
      }
    }
  };



  return (
    <Flex>
      <Flex height={'100%'} className={styles.element}>
        {dashboard === true ? (
          <Flex height={'100%'}>
            <InterviewDashBoard
              Loading={Loading}
              isLoading={isLoading}
              slotterdata={slotterdata}
              slotmembers={slotmembers}
              InterviewText={InterviewText}
              dashboard={data}
              isProfile={isProfile}
              timezones={timezones}
              candidate_name ={candi_name}
            />
          </Flex>
        ) : confromflag === false && dashboard === false ? (
          <Flex height={'100%'}>
            <SlotterDate
              isLoading={isLoading}
              event={eventid}
              response={data}
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
              can_id = {can_id}
              InterviewText={InterviewText}
              isProfile={isProfile}
              timezones={timezones}
              availbles={availblity}
              formatDate={formatDate}
              conflicts ={conflicts}
              // startFrom = {startFrom}
              // endFrom ={endFrom}
            />
          </Flex>
        ) : confromflag === true ? (
          <Flex height={'100%'}>
            <Conformpage
              selecttime={selecttime}
              date={date}
              response={data}
              candidate_name={candi_name}
              InterviewText={InterviewText}
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
    setselectedDate1,
    setDate,
    onSubmit,
    date,
    select,
    selecttime,
    setSelectTime,
    setSelect,
    response,
    finalIntervals,
    setfinalIntervals,
    setSelectDate,
    candidate_name,
    can_id,
    InterviewText,
    timezones,
    availbles,
    isLoading,
    conflicts,
    selectDate,
  } = props;
  console.log('datetimedatetimeprops', props);
  console.log('candidate_namecandidate_namecandidate_name', candidate_name);

  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });
  const dispatch: AppDispatch = useDispatch();
  // const [startMonth, setstartMonth] = useState(null);
  // const [endMonth, setendMonth] = useState(null);
  const [availability, setavailbility] = useState([]);
  const [useravailble, setuseravailble] = useState([]);
  const [timezone, settimezone] = useState('');
  const [candidate, setCandidate] = useState(candidate_name);
  const [selectedDays, setselectedDays] = useState([]);
  const [startOfMonth, setstartOfMonth] = useState(new Date());
  const [endOfMonth, setendOfMonth] = useState(new Date());
  const [defaultMonth, setdefaultMonth] = useState('');
  const [startFrom, setStartFrom] = useState(new Date(2023,9-1,4));
  const [endFrom, setEndFrom] = useState(new Date(2023,11,4));
  const [highlightday, setHighlightDay] = useState(new Date());






  useEffect(() => {
    mount();
    const startMonth = convertmonth(selectedRange.from);
    setstartOfMonth(startMonth);
    const endMonth = convertmonth(selectedRange.to);
    console.log('************', startMonth, endMonth);
    setendOfMonth(endMonth);
  }, [response, timezone, availbles,]);

  const DateFormatShow = (dateString)=> {
    console.log("dateStringdateStringdateStringdateStringdateString",dateString)
    if( dateString !== "" && dateString !== undefined){

      var parts = dateString.split("/");
      var dateObject = new Date(parts[2], parts[1] - 1 , parts[0]);
      console.log("KKKKKKKKKKKKKKKK",dateObject)
      return dateObject
    }
    return null
  }

  useEffect(()=> {
    if(response.length > 0 && response !== undefined){
      
      response.map((start)=>{
        if(start.startdate !== null  && start.enddate !== null){
          // alert('&^&')
          console.log("starkkkkkkkkkkkkkt",start)
         

          const smonth = DateFormatShow(start.startdate)
          const startmonth = smonth !== null ?  smonth : "Invalid Date";

          if(startmonth !== "Invalid Date" ){
            // alert(startmonth)
            setStartFrom(startmonth)
          }
          const emonth = DateFormatShow(start.enddate)
          const endmonth = emonth !== null ?  smonth : "Invalid Date";
          if(endmonth !== "Invalid Date"  ){
            // alert(endmonth)

            setEndFrom(endmonth)
          }
          console.log("endmonthendmonthendmonthendmonth",endmonth,start.enddate)
          console.log("FFFFFFFFFFFFFFFFFF",startFrom,endFrom)
        }
      })
    }

  },[response])


  const dateObject = availbles;
  const allDatesArray = Object.keys(dateObject);
  const today = new Date();
  console.log('today.toLocaleString()', today.toDateString());
  const dateObjectsArray = allDatesArray.reduce((datesArray, dateString) => {
    const parts = dateString.split('/');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are 0-indexed
    const day = parseInt(parts[0], 10);
    const dates = new Date(year, month, day);

    // Check if the current date is not today's date
    console.log('datesdates', dates);
    if (dates > today || dates.toDateString() === today.toDateString()) {
      console.log('todaytodaytoday', today, 'dates', dates);
      datesArray.push(dates);
    }
    console.log('datesArraydatesArray', datesArray);
    return datesArray;
  }, []);

  console.log('availblesavailblesavailblesavailbles', availbles);
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

  const convertmonth = (selectMonth: any) => {
    if (selectMonth) {
      const [dayFrom, monthFrom, yearFrom] = selectMonth.split('/').map(Number);
      const dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);
      console.log('>>>>>>>', dateFrom);
      return dateFrom;
    }
  };

  
  const dateconvert = (formattedDate) => {
    console.log("!@!@!#!!##!#!#!",formattedDate)
    const convertedDate = moment(formattedDate).format('DD/MM/YYYY');
    return convertedDate;
  };
  const AvailbleSlots = (datetimes) => {
    const check = dateconvert(datetimes);

    console.log("datetimesdatetimes*********",check)
    const filteredData = Object.fromEntries(
      Object.entries(useravailble).filter(([key, value]) => key === check),
    );

    const day = datetimes.getDay();
    const intervalMinutes = parseInt(response.map((dur) => dur.duration));
    const intervalSeconds =
      intervalMinutes === 1 ? intervalMinutes * 60 : intervalMinutes;
    const dateformat = moment.tz(datetimes, timezone).toDate();
    const currentDay = (datetimes.getDay() + 1) % 7; // Get the current day in UTC
    const selectedDay = currentDay;
    const userTimeZone = 0;
    const adjustedDay = day === currentDay ? day : currentDay;

    const timeslot = generateIntervals(filteredData[check], intervalSeconds,check);
    setfinalIntervals(timeslot);
  };

  // const conversion = (data: any) => {
  //   return data?.map((obj) => {
  //     const { day, ...rest } = obj; // Destructure the "day" property
  //     return rest; // Return the object without the "day" property
  //   });
  // };
  const convertion = (dateStr) => {
    const momentObj = moment(dateStr, 'DD/MM/YYYY');
    const formattedDate = momentObj.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    return formattedDate;
  };
 

  const onDateChange = (datetimes: any) => {
    console.log("datetimesdatetimesdatetimes",datetimes)   
    const currentDate = new Date(datetimes);
    const isInSchedule = dateObjectsArray.some((d) => {
      const scheduleDate = new Date(d);
      scheduleDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
      currentDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === currentDate.getTime();
    });
    console.log('$%^&*(O)P){', dateObjectsArray, isInSchedule);
    if (isInSchedule) {
      // alert("PPP")
      AvailbleSlots(datetimes);
      const options = { weekday: 'long', day: '2-digit', month: 'long' };
      const formattedDate = datetimes.toLocaleDateString('en-US', options);
      setDate(formattedDate);
      setSelectTime('');
      setSelectDate(datetimes);
      setselectedDate1(datetimes);
      // DisabledTime(datetimes)
     
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
    } 
    // else if (obj === selecttime) {
    //   setSelect(false);
    //   setSelectTime('');
    // } 
    else {
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
      // const date = new Date(currentTime);
      let hours = currentTime.getHours();
      let minutes = currentTime.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      minutes = minutes < 10 ? 0 : minutes;
      const timeIn12HourFormat = `${hours}:${minutes} ${ampm}`;
      return timeIn12HourFormat
  }
  
  // Usage example:
  // const date = new Date();
  // const time12HrsFormat = getTimeIn12HrsFormat(date);
  // console.log(time12HrsFormat); // Output: "3:30 PM" (assuming the current time is 3:30 PM)
  

  function isIntervalWithinRange(interval, range) {
    const [startTime, endTime] = range.split(" to ");
    const [intervalStartTime, intervalEndTime] = interval.split(" - ");
    console.log("intervalStartTime",intervalStartTime,"\n","intervalEndTime",intervalEndTime,"\n","startTime",startTime,"\n","endTime",endTime)
  
    // return (
    //   (intervalEndTime > startTime && intervalStartTime < endTime )  
    //   // (intervalStartTime < startTime && intervalEndTime > endTime) || // Scenario 1
    //   // (intervalStartTime >= startTime && intervalStartTime <= endTime) // Scenario 2
    //   // (intervalStartTime < startTime > intervalEndTime)
    //   // (intervalEndTime >= startTime && intervalEndTime <= endTime)
    // );
    // return (
    //   (intervalEndTime > startTime && intervalStartTime < endTime) || // Original condition
    //   (intervalStartTime >= startTime && intervalStartTime < endTime)  // Check if interval starts within range
    //   // (intervalEndTime > startTime && intervalEndTime <= endTime) // Check if interval ends within range
    // );
    console.log(
      "intervalStartTime", intervalStartTime, "\n",
      "intervalEndTime", intervalEndTime, "\n",
      "startTime", startTime, "\n",
      "endTime", endTime
    );
  
    // Check if the interval is entirely within the range
    if (intervalStartTime >= startTime && intervalEndTime <= endTime) {
      return true;
    }
    
    // // Check if the interval starts within the range
    // if (intervalStartTime >= startTime && intervalStartTime < endTime) {
    //   return true;
    // }
    
    // Check if the interval ends within the range
    if (intervalEndTime > startTime && intervalEndTime <= endTime) {
      return true;
    }
  }
  
  function getRemainingIntervalsWithinExcludedRanges(targetIntervals, excludedRanges) {
    const remainingIntervals = [];
  
    for (const targetInterval of targetIntervals) {
      let isExcluded = false;
  
      for (const excludedRange of excludedRanges) {
        if (isIntervalWithinRange(targetInterval, excludedRange)) {
          isExcluded = true; // Target interval is within an excluded range
          break;
        }
      }
  
      if (!isExcluded) {
        remainingIntervals.push(targetInterval); // Add the remaining interval
      }
    }
  
    return remainingIntervals;
  }
  

  function generateIntervals(timeBreaks, intervalMinutes,datetimes) {
    console.log('timeBreakstimeBreaks', timeBreaks, intervalMinutes,datetimes);
    const intervals12 = [];
    const conflicttime = []
    // const intervals24 = [];
    for (const timeBreak of timeBreaks) {
      const { starttime, endtime } = timeBreak;

      console.log("PPPPPP!PP!P!P!P!P!P!P!P!P!",starttime,endtime)
      const [startHour, startMinute] = parseTime(starttime);
      const [endHour, endMinute] = parseTime(endtime);
      let currentHour = startHour;
      let currentMinute = startMinute;
      console.log("startHourstartHour",startHour,"\n","endHourendHour",endHour)
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
        const currentDate = dateconvert(new Date())
        const currenttime = new Date()

        console.log("startInterval12startInterval12",startInterval12,"\n",endInterval12)
        console.log("currentDatecurrentDatecurrentDatecurrentDatecurrentDate",currentDate,datetimes)
        const time = getTimeIn12HrsFormat(currenttime);
        // time = getTimeIn12HrsFormat(time)

       

        console.log("endInterval12endInterval12",endInterval12,time,"\n","currenttime",currenttime)
        if(currentDate.toString() === datetimes){
          if(time < endInterval12 && endInterval12 < '9:00'){

            const interval12 = `${startInterval12} - ${endInterval12}`;
            console.log("interval12interval12",interval12)
          intervals12.push(interval12);
          }
        }else{
          const interval12 = `${startInterval12} - ${endInterval12}`;
          console.log("interval12interval12",interval12)
          intervals12.push(interval12);
        }
        
      

        // const filteredIntervals = intervals12.filter(interval => {
        //   // Replace this condition with your specific logic to filter out intervals
        //   return interval !== "11:30 am - 12:00 pm" && interval !== "06:15 pm - 07:00 pm";
        // });
        
        console.log("filteredIntervalsfilteredIntervalsfilteredIntervals","filteredIntervals")
        
      }
    }
    const excludedRanges = conflicts
    if (datetimes in excludedRanges) {
      // alert("@#$%^&*(")
      const eventsForSelectedDate = conflicts[datetimes];
      console.log("eventsForSelectedDate",eventsForSelectedDate);
      console.log("excludedRanges",excludedRanges,"\n",typeof excludedRanges[0])
      const remainingIntervals = getRemainingIntervalsWithinExcludedRanges(intervals12, eventsForSelectedDate);
      console.log("currentIntervalcurrentIntervalcurrentInterval",remainingIntervals,"\n",excludedRanges)
      console.log("====================",remainingIntervals,"\n",eventsForSelectedDate,"\n")
      return remainingIntervals;
    } else {
      console.log("No events for the selected date.",intervals12);
      return intervals12;
    }
    // const excludedRanges = ["1:00 pm to 2:00 pm","9:30 am to 10:00 am","10:00 am to 10:30 am", "11:00 am to 11:30 am", "12:00 pm to 12:30 pm"];

    // console.log("excludedRanges",excludedRanges,"\n",typeof excludedRanges[0])
    // const remainingIntervals = getRemainingIntervalsWithinExcludedRanges(intervals12, excludedRanges);
    // console.log("currentIntervalcurrentIntervalcurrentInterval",remainingIntervals,"\n",excludedRanges)
    // console.log("====================",remainingIntervals)
    // return remainingIntervals;
  }
  function isHighlightedDay(day) {
    console.log("daydaydaydaydaydayday",day,selectDate)

    if(!isEmpty(selectDate)){
      const targetDate = selectDate; // Replace with your target date
      return day.toDateString() === targetDate.toDateString();
    }

    


  }

  const defaultHighlightedDay = new Date(2023, 9, 15);
  const modifiers = {
    selected: dateObjectsArray,
    // highlighted: (day) => selectedDay && day.toDateString() === selectedDay.toDateString(),
    // highlighted:(day) => date !== null && day?.toDateString() === date?.toDateString(),
    highlighted: isHighlightedDay,
    
  };

  function isIntervalWithinExcludedRange(interval, excludedRange) {
    const [start, end] = excludedRange.split(" - ");
    return interval > start && interval < end;
  }

  const modifiersStyles = {
    // selected: {
    //   backgroundColor: '#FFC203',
    //   color: 'black',
    // },

    // container: {
    //   height: '900px',
    //   width: '900px',
    // },
  
    highlighted: {
      backgroundColor: '#581848',
      color: 'white',
    },
  };

  console.log('dateObjectsArray::::::::', dateObjectsArray);
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

  // if(selectedRange !== null){
  // const startOfMonth = convertmonth(selectedRange.from);
  // const endOfMonth = convertmonth(selectedRange.to);
  // console.log('************', startOfMonth, endOfMonth);
  // }

  // const startOfMonth = new Date(selectedRange.from); // July 2023
  // const endOfMonth = new Date(selectedRange.to); // July 2023

  // useEffect(() => {}, [startOfMonth, endOfMonth]);

  if (isLoading) {
    return <Loader />;
  }

  // const defaultMonth = new Date(2023,11,1);

  console.log('selectedtimeselectedtimeselectedtime', date , "\n",new Date(2023, 9, 15));

  console.log(
    'selectedDaysselectedDaysselectedDaysselectedDays',
    "startFrom",startFrom,"\n",
    "endFrom",endFrom,"\n",    
    defaultMonth,'\n',
    startOfMonth,'\n',
    endOfMonth,'\n'
  );

  console.log("timezonetimezonetimezonetimezonetimezonetimezonetimezone",timezone)
  console.log("selectDate:::",selectDate)
  console.log("modifiers.selectedmodifiers.selected",modifiers)
  console.log("conflictsconflicts@!@!@!@!@!@!@@!",conflicts,)

  return (
    <Flex height={'100%'}>
      <Flex row center className={styles.banner}>
        <SvgZitaLogo />
        <Text bold color="theme" size={16}>
          Interview Scheduling
        </Text>
      </Flex>
      <Flex height={'100%'} className={styles.slotcontainer}>
        {response?.map((data, item) => (
          <Flex key={item} className={styles.slotter}>
            <Flex>
              <Flex row>
                <Flex flex={4} className={styles.leftside}>
                  <Flex row center>
                    {console.log("data.company_logo",data.company_logo)}
                    {data.company_logo !== '' ? (        
                      // data.company_logo.includes("company_logo") ?
                      // ( <img
                      //   src={`${process.env.REACT_APP_HOME_URL}media/${data.company_logo}`}
                      //   alt="Company Logo"
                      //   style={{
                      //     width: '36px',
                      //     height: '36px',
                      //     borderRadius: '50%',
                      //   }}
                      // />


                      // ):(
                        <img
                        src={`${process.env.REACT_APP_HOME_URL}media/${data.company_logo}`}
                        alt="Company Logo"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                        }}
                      />
                       
                      // )       

                     
                      
                    ) : (
                      ''
                    )}
                    {data.company_logo !== '' ? (
                    <Text size={14} bold style={{ marginLeft: '5px' }}>
                      {data.company_name}
                    </Text>
                    ) : (
                      <Text size={14} bold style={{ marginLeft: '0px' }}>
                      {data.company_name}
                    </Text>
                    )}
                  </Flex>
                  <Flex marginBottom={10} marginTop={10}>
                    <Text size={13}>Hi {candidate_name},</Text>
                    <Text size={13}>
                      {`you have been selected for an ${data.event_name} at 
                   ${data.company_name}.`}
                    </Text>
                    <Text size={13} style={{ marginTop: '5px' }}>
                      Pick a time and date.
                    </Text>
                  </Flex>

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
                      Time zone is {timezones(data.times_zone)}
                    </Text>
                  </Flex>
                  <Flex row start marginBottom={10}>
                    <Flex marginTop={3}>
                      <SvgInfo width={14} height={14} fill={'#581845'} />
                    </Flex>

                    <Text size={13} style={{ marginLeft: '5px' }}>
                      This is an {InterviewText(data.event_type)}.Please come
                      prepared with the technical aspects of your work
                      experience along with your CV/Resume
                    </Text>
                  </Flex>
                  {/* <div className={styles.line}></div> */}
                </Flex>
                <Flex flex={4} className={styles.rightside}>
                  <div style={{marginLeft : "90px"}}>
                  <DayPicker
                    // locale={enUS}
                    
                    styles={{
                      months: {
                        color: '#581845',
                        // cursor : 'not-allowed'
                      }                      
                    }}                
                    defaultMonth={dateObjectsArray[0]}
                    // onSelect={setDays}
                    // fromMonth={dateObjectsArray[0]}
                    // toMonth={dateObjectsArray[dateObjectsArray.length-1]}
                    // className="custom-daypicker"
                    // fromDate={dateObjectsArray[0]}
                    // toDate={dateObjectsArray[dateObjectsArray.length-1]}
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
    </Flex>
  );
};
const Conformpage = (props) => {
  const {
    selecttime,
    date,
    response,
    InterviewText,
    timezones,
  } = props;

  return (
    <Flex className={styles.successTick}>
      <SvgZitaLogo width={240} height={125} />
      <Flex>
        {response?.map((list: any) => (
          <Flex className={styles.confrompage} key={list.id}>
            <Flex center className={styles.successTick} marginBottom={10}>
              <SvgCheck2Circle width={30} height={30} fill={'green'} />
              <Text size={16} bold style={{ marginTop: '10px' }}>
                Your Interview has been Successfully Scheduled
              </Text>
            </Flex>
            <Flex row center marginTop={15}>
              {list.company_logo ? (
                <>
                  <img
                    src={`${process.env.REACT_APP_HOME_URL}media/${list.company_logo}`}
                    alt="Company Logo"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                    }}
                  />
                </>
              ) : (
                ''
              )}
               {list.company_logo !== '' ? (
                    <Text size={14} bold style={{ marginLeft: '5px' }}>
                      {list.company_name}
                    </Text>
                    ) : (
                      <Text size={14} bold style={{ marginLeft: '0px' }}>
                      {list.company_name}
                    </Text>
                    )}
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
                Time zone is {timezones(list.times_zone)}
              </Text>
            </Flex>
            <Flex row marginBottom={10}>
              <Flex marginTop={3}>
                <SvgInfo width={14} height={14} fill={'#581845'} />
              </Flex>

              <Text size={13} style={{ marginLeft: '5px' }}>
                This is an {InterviewText(list.event_type)}.Please come prepared with
                the technical aspects of your work experience along with
                CV/Resume
              </Text>
            </Flex>

           
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

const InterviewDashBoard = (props) => {
  const {
    slotterdata,
    slotmembers,
    InterviewText,
    dashboard,
    timezones,
    Loading,
    isLoading,
    candidate_name
  } = props;

  useEffect(() => {});

  const formatDateChange = (dateString) => {
    // const dateStr = '02/08/2023';
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const [day, month, year] = dateString.split("/");
    const date = new Date(year, month - 1, day);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const formattedDate = `${dayOfWeek}, ${months[parseInt(month) - 1]} ${day}, ${year}`;
  
    return formattedDate;
  };

  if (Loading) {
    return <Loader />;
  }
  // if (isLoading) {
  //   return <Loader />;
  // }


  console.log("slotterdataslotterdataslotterdataslotterdata",slotterdata)
  return (
    <Flex className={styles.successTick}>
      <SvgZitaLogo width={240} height={125} />
      <Flex>
        {dashboard.map((list: any, index) => (
          <Flex key={index} className={styles.dashboard}>
            <Flex row center>
              {list.company_logo ? (
                <>
                  <img
                    src={`${process.env.REACT_APP_HOME_URL}media/${list.company_logo}`}
                    alt="Company Logo"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                    }}
                  />
                </>
              ) : (
                ''
              )}
               {list.company_logo !== '' ? (
                    <Text size={14} bold style={{ marginLeft: '5px' }}>
                      {list.company_name}
                    </Text>
                    ) : (
                      <Text size={14} bold style={{ marginLeft: '0px' }}>
                      {list.company_name}
                    </Text>
                    )}
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
                {slotterdata.map((li) => li.time)} ,{' '}
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
            <Flex row center>
              <Flex>
                <SvgInfo width={14} height={14} fill={'#581845'} />{' '}
              </Flex>

              <Text size={13} style={{ marginLeft: '5px' }}>
                This is an {InterviewText(list.event_type)}.Please come prepared with
                the technical aspects of your work experience along with
                CV/Resume
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
                <Text size={13}
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
                <Text size={13}
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
  );
};

export default slotter1;
