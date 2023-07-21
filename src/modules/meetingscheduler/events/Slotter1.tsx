import { useEffect, useState } from 'react';
import { DayPicker, DayPickerProps } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
// import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';
import axios from 'axios';
import moment, { duration } from 'moment';
import { enUS } from 'date-fns/locale';
// import { load } from 'googleapis';
// import { DateRangePicker } from 'daterangepicker';
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
import styles from './slotter.module.css';
// import { load } from 'googleapis';

import {
  getAvailbleSlot,
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from './store/middleware/eventmiddleware';
// import slotterjson from './TeamMail/slotterjson.json';
// import interviewdashboaerd from './TeamMail/interviewdasboard.json';
import { timezonedisplay } from './eventType';
import './DayPickerCustomStyles.css';
import { loadGapi } from './google/gapiLoader';



const slotter1 = (props) => {
  const { userpreview, setuserPreview } = props;
  console.log("props1111111",props)
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  // const uid = searchParams.get('uid');
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
  console.log('timee', time);
  const [endDate, setEndDate] = useState(new Date());
  const [loader, setloader] = useState(false);
  // const [availble,setavailble] = useState([]); 

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

  const { availbleslot } = useSelector(
    ({ timezoneReducers }: RootState) => ({
      isLoading: timezoneReducers.isLoading,
      availbleslot: timezoneReducers.availbleslot,
     
    }),
  );



  // const candi_name = 'John Smith';
  const candi_name = candidate_name ? candidate_name : 'candidate';
  // if (candidate_name !== undefined){
  //   console.log("candi_name",candi_name)
  // }

  // const imageUrl = data && data.map((obj)=> obj.company_logo)

  // const imageUrl = data.length > 0 ? data.company_logo : '';

  // console.log('confromflagconfromflagssssss', availbleslot);
  // console.log('slotterdata', slotterdata,slotmembers,"\n",slotmembers.length,slotterdata.length);

  // console.log('slotterjsonslotterjson', slotterjson);
  console.log('uiduiduid', uid, typeof uid);
  console.log('eventideventid', eventid, typeof eventid);
  console.log('datadatadatadata', data, typeof data);
  console.log('!!!!!!!!!!!!!!!!!!!!!!', selecttime, date);

  // useEffect(() => {
  //   const event_id = event;
  
  // }, []);

  useEffect(() => {
    const event_id = event;
    console.log('M<MMMMM', uid, userpreview);
    setloader(true);
    // profilepic(); 
    dispatch(getAvailbleSlot(event))
    dispatch(getScheduleMiddleWare(event));
    
    // setProfile(res.data.data.company_logo);
    if (userpreview === undefined) {
      alert('/');
      dispatch(getSlotterMiddleware({ uid, event_id })).then((res) => {
        if (slotterdata && slotterdata.length > 0) {
          console.log('slotterdataslotterdata', slotterdata);
          alert('9090');
          setloader(true);
          setDashboard(true);
        }
      });
    }
    // setuserPreview(false)
    setloader(false);
    // if (candidate_name !== undefined){
    //   const candi = candidate_name
    //   console.log("candi_namecandi_namecandi_namecandi_name",candi)
    //   setcandi_name(candi_name)
    // }
  }, []);



  const onSubmit = (selectdate11, selecttime11) => {
    console.log('lists', selectdate11, '\n', 'data', selecttime11);
    alert('onSubmit');
    setConfirm(true);
    SetConfromFlag(true);
    var event_id = eventid;
    var selecteddate = selectDate;
    var selectedtime = selecttime11;
    // const date123 = new Date(selectdate11);
    // const formattedDate = date123.toLocaleDateString("en-GB");
    // var selecteddate =formattedDate
    // console.log(formattedDate); // Output: 01/07/2023
    console.log('selectDateselectDate', selecteddate);
    // dispatch(
    //   getSlotterMiddleware({ uid, event_id, selecteddate, selectedtime }),
    // );
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
      console.log('userTimezone', userTimezone);
      const offset = moment.tz(userTimezone).format('Z');
      console.log('offset', offset);
      const userzone = `${userTimezone} (${offset})`;
      console.log('label', userzone);
      // settimezone(userTimezone)
      return userzone;
    } else if (
      display.includes('Lock the timezone (best for in-person events)')
    ) {
      const [timeOffset, locations] = str.split(' ');
      // Extract the location without parentheses
      const locationWithoutParentheses = locations.slice(1, -1);
      // Create the desired string format: "(Location) Time Offset"
      const result = `${locationWithoutParentheses} (${timeOffset})`;
      console.log(result);
      // settimezone(locationWithoutParentheses)
      return result;
    }

    // return result;
  };

  // const TimezoneDisplay = () => {
  //   const [currentTime, setCurrentTime] = useState(new Date());
  //   const updateCurrentTime = () => {
  //     setCurrentTime(new Date());
  //   };
  //   const formatTimeInInviteeTimeZone = () => {
  //     const inviteeTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //     const formattedTime = currentTime.toLocaleString(undefined, {
  //       timeZone: inviteeTimeZone,
  //     });
  //     return formattedTime;
  //   };
  //   const formatTimeInFixedTimeZone = () => {
  //     const formattedTime = currentTime.toLocaleString(undefined, {
  //       // timeZone: fixedTimeZone,
  //     });
  //     return formattedTime;
  //   };
  //   return (
  //     <div>
  //       <button onClick={updateCurrentTime}>Update Time</button>
  //       <p>Current Time: {formatTimeInInviteeTimeZone()}</p>
  //     </div>
  //   );
  // };

  // const timeslot1 = (list) => {
  //   alert('timesslot');
  //   console.log('element', list);
  //   setTime(timeslot);
  // };
  // const moment = require('moment');

  const startTime = '9:00 AM';
  const endTime = '12:00 PM';
  const timezone = 'Pacific/Apia';
  
  // Format start time and end time in the desired timezone
  const formattedStartTime = moment(startTime, 'h:mm A').tz(timezone).format('h:mm A');
  const formattedEndTime = moment(endTime, 'h:mm A').tz(timezone).format('h:mm A');
  
  console.log("formattedStartTime",formattedStartTime,formattedEndTime); // Output: 9:00 AM
  console.log(formattedEndTime); // 

  const userTimezone = 'Asia/Kolkata' + 5.3; // Replace with the user's timezone
  const targetTimezone = ' Pacific/Apia' + 13.0; // Replace with the target timezone

  const userDatetime = moment().tz(userTimezone);
  const targetDatetime = moment().tz(targetTimezone);

  console.log('userTime', userDatetime, '\n', 'targetTime', targetDatetime);

  // Calculate the time difference in hours
  // const timeDifference = targetDatetime.diff(userDatetime, 'hours');

  // console.log('Time Difference:', timeDifference);

  const userTimezoneOffset = 5.5; // UTC offset for Asia/Kolkata is +5:30
  const targetTimezoneOffset = 13.0; // UTC offset for Pacific/Apia is +13:00

  const timeDifference = targetTimezoneOffset - userTimezoneOffset;

  console.log('Time Difference:', timeDifference);

  return (
    <>
      {console.log('<><><><><<>><>><', success)}
      {console.log('<><><><><<>><>><userpreview', userpreview)}

      {console.log('datetimedatetimedatetimedatetimedatetime', datetime)}

      <Flex className={styles.element}>
        {loader && <Loader />}

        {dashboard === true ? (
          <Flex>
            {slotterdata && slotmembers ? (
              <InterviewDashBoard
                slotterdata={slotterdata}
                slotmembers={slotmembers}
                // slotterdata={interviewdashboaerd.slotterdata}
                // slotmembers={interviewdashboaerd.slotmembers}
                getinter={getinter}
                dashboard={data}
                isProfile={isProfile}
                // dashboard = {slotterjson.data}
                timezones={timezones}
              />
            ) : (
              ' '
            )}
          </Flex>
        ) : confromflag === false && dashboard === false ? (
          <Flex>
            <SlotterDate
            event = {eventid}
              response={data}
              // response={slotterjson.data}
              margin={margin}
              change={change}
              days={days}
              setSelect={setSelect}
              // onDateChange={onDateChange}
              selecttime={selecttime}
              setSelectTime={setSelectTime}
              onSubmit={onSubmit}
              setDays={setDays}
              date={date}
              select={select}
              // modifiers={modifiers}
              divwidth={divwidth}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setMargin={setMargin}
              setselectedDate1={setselectedDate1}
              setWidth={setWidth}
              setChange={setChange}
              setDate={setDate}
              datetime={datetime}
              // datetime={slotterjson.datetime}
              finalIntervals={finalIntervals}
              setfinalIntervals={setfinalIntervals}
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              candidate_name={candi_name}
              getinter={getinter}
              isProfile={isProfile}
              timezones={timezones}
              availbleslot ={availbleslot}
              // timezone ={timezone}
              // settimezone ={settimezone}
            />
          </Flex>
        ) : confromflag === true ? (
          <Flex>
            <Conformpage
              margin={margin}
              selecttime={selecttime}
              date={date}
              // time_zone={interviewslot}
              response={data}
              // response={slotterjson.data}
              candidate_name={candi_name}
              getinter={getinter}
              isProfile={isProfile}
              timezones={timezones}
            />
          </Flex>
        ) : null}
      </Flex>
    </>
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
    availbleslot
  } = props;
  console.log('datetimedatetimeprops', props);
  console.log('candidate_namecandidate_namecandidate_name', candidate_name);

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
  // const [availbleday,setavailbleday] = useState(availble?.length > 0 ? availble : undefined)
  console.log(
    'selectedRange.fromselectedRange.from',
    selectedRange.from,
    selectedRange.to,
  );
  console.log('startMonthstartMonthstartMonth', startMonth);
  console.log('startMonthstartMonthstartMonth________', endMonth);

  console.log("useravailble",useravailble)


  useEffect(() => {
    // dispatch(getAvailbleSlot(event))
    mount();
  }, [response, timezone]);

  const mount = () => {
   
    // alert("mount")
    console.log("<>~!!@@@!!!!!!availbleslot",availbleslot)
    if (availbleslot !== undefined){
      setuseravailble(availbleslot)
    }

    console.log('SELECTEDDARE', response);
    {
      response?.map((list) => {
        // const startdate = list.startdate
        // const enddate = list.enddate
        // setstartMonth(startdate);
        // setendMonth(enddate);
        timezoneset(list.times_zone_display, list.times_zone);
        console.log('strtaaadatee', list.startdate, '\n', 'strtaaadatee', list.enddate);
        setSelectedRange({
          from: list.startdate,
          to: list.enddate,
        });
      
        // setavailbility(schedule)
        console.log("selectedRangeselectedRangeselectedRange",selectedRange)
        
          const schedule = schdulearray(list.startdate, list.enddate,list.times_zone);
          console.log('schedule>>>>>>>>>', schedule);
        
        // setEndDate(enddate);
      });
    }
  };

  const timezoneset = (str, tzone) => {
    // console.log('>?>?>?>?>?>?', str, tzone);
    // const display = data.map((li : any )=>li.times_zone_display)
    if (
      str === 'Automatically detect and show the times in my invitees time zone'
    ) {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log('userTimezone', userTimezone);
      const offset = moment.tz(userTimezone).format('Z');
      console.log('offset', offset);
      const userzone = `${userTimezone} (${offset})`;
      console.log('label', userzone);
      settimezone(userTimezone);
      return userzone;
    } else if (str === 'Lock the timezone (best for in-person events)') {
      // // console.log()

      // const [timeOffset, locations] = "+13:00 (Pacific/Apia)";
      // // Extract the location without parentheses
      // const locationWithoutParentheses = locations.slice(1, -1);
      // // Create the desired string format: "(Location) Time Offset"
      // const result = `${locationWithoutParentheses} (${timeOffset})`;
      // console.log("result",result);
      // settimezone(locationWithoutParentheses)
      // return result
      const strValue = tzone;
      const [timeOffset, locations] = strValue.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses} (${timeOffset})`;
      console.log('result', result);
      settimezone(locationWithoutParentheses);
    }
  };

  const schdulearray = (start, end,time) => {
    console.log("schdulearrayschdulearrayschdulearrayschdulearrayschdulearray",start,end,time)
    const excludedWeekdays = [];
    console.log('dddAAAAAAAAAA', useravailble, '\n', useravailble);
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
    console.log('excludedWeekdays:', excludedWeekdays);
    console.log('timezonetimezone', timezone);
  
      const schedule = calculateSchedule(
        start,
        excludedWeekdays,
        end,
        time,
      );
      console.log('scheduleschedule', schedule);
      setavailbility(schedule);    
  };
  const dateconvert = (formattedDate) =>{
    // const date12 = new Date(dateString);
    // const formattedDate = date12.toLocaleString("en-US", {
    //   weekday: "short",
    //   month: "short",
    //   day: "numeric",
    //   year: "numeric",
    //   hour: "numeric",
    //   minute: "numeric",
    //   second: "numeric",
    // });
    // console.log("formattedDateformattedDate",formattedDate)
    // return formattedDate
    // const formattedDate = "Sun Aug 06 2023 11:00:00 GMT+0530";
    // const date1 = new Date(formattedDate);
    // const originalDateString = date1.toISOString();
    // console.log(originalDateString);
    // console.log("originalDateStringoriginalDateString",originalDateString)
    // return originalDateString
    const convertedDate = moment(formattedDate).format('DD/MM/YYYY');
  
    console.log(convertedDate);
    return convertedDate
  }
  const AvailbleSlots = (datetimes) => {
    const check = dateconvert(datetimes)
    console.log("check",check)
    console.log("datetimes",datetimes,typeof datetimes)
    console.log("datetimes!!!!!@@@@#####",useravailble)
    const filteredData = Object.fromEntries(
      Object.entries(useravailble).filter(([key, value]) => key === check )
    );
    console.log('filteredData',filteredData[check]);
    // const filteredDates = Object.entries(useravailble).filter(([d, slots]) => {
    //   // Filter dates based on the provided 'datetimes' value
    //   return slots;
    // });
    // console.log("filteredDates",filteredDates)
    // const firstEntry = entries[0];

    // const firstDate = firstEntry[0];
    // const firstValues = firstEntry[1];
    // console.log("datetimesdatetimes",datetimes)
    // const day = datetimes.getDay();
    // const intervalMinutes = parseInt(response.map((dur) => dur.duration));
    // console.log('daydayday', day);
    // console.log("?????????",datetime,timezone)
    // const dateformat = moment.tz(datetimes,timezone).toDate();
    // console.log("dateformatdateformat",dateformat)
    // const currentDate = new Date(datetimes); // Get the current date
    // const currentDay = currentDate.getDay(); // Get the current day in UTC
    // console.log("Adjusted day++++", currentDay);
    // const selectedDay = currentDay; // Replace with the selected day value, where 0 is Sunday, 1 is Monday, and so on
    // const userTimeZone = 0; // Replace with the time zone of your location, where 0 is Sunday, 1 is Monday, and so on

    // const adjustedDay = (selectedDay + 7 - userTimeZone)% 7;
    // console.log("adjustedDayadjustedDay",currentDay,"\n",adjustedDay)
    // const number = adjustedDay;
    // const roundedNumber = Math.round(number);
    // console.log("adjustedDayadjustedDaynumber:", roundedNumber);

    const day = datetimes.getDay();
    const intervalMinutes = parseInt(response.map((dur) => dur.duration));
    console.log('daydayday', (datetimes.getDay() + 1) % 7);
    console.log('?????????', datetime, timezone);
    const dateformat = moment.tz(datetimes, timezone).toDate();
    console.log('dateformatdateformat', dateformat);
    const currentDay = (datetimes.getDay() + 1) % 7; // Get the current day in UTC
    console.log('Adjusted day++++========', currentDay);
    const selectedDay = currentDay;
    const userTimeZone = 0;
    const adjustedDay = day === currentDay ? day : currentDay;
    console.log('Adjusted day++++Adjusted day++++', adjustedDay);
    console.log("")
    // switch (day) {
    //   case 0:
    //     console.log('Sunday');
    //     const sunday = conversion(datetime.sunday);
    //     const sundayslot = generateIntervals(datetime.sunday, intervalMinutes);
    //     setfinalIntervals(sundayslot);
    //     break;
    //   case 1:
    //     console.log('Monday');
    //     const monday = conversion(datetime.monday);
    //     const mondayslot = generateIntervals(datetime.monday, intervalMinutes);
    //     // mondayslot.push(mondayslot);
    //     console.log('finalIntervalsfinalIntervals', mondayslot);
    //     // }
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       mondayslot,
    //     );
    //     setfinalIntervals(mondayslot);
    //     break;
    //   case 2:
    //     console.log('Tuesday');
    //     const tuesday = conversion(datetime.tuesday);
    //     const tuesdayslot = generateIntervals(
    //       datetime.tuesday,
    //       intervalMinutes,
    //     );
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       tuesdayslot,
    //     );
    //     setfinalIntervals(tuesdayslot);
    //     break;
    //   case 3:
    //     console.log('Wednesday');
    //     const wednesday = conversion(datetime.wednesday);
    //     // const wednesdayslot = [];
    //     // for (const time of wednesday) {
    //     //   const { starttime, endtime } = time;
    //     //   console.log('timetimetimetime', starttime, endtime);
    //     const wednesdayslot = generateIntervals(
    //       datetime.wednesday,
    //       intervalMinutes,
    //     );
    //     // wednesdayslot.push(...intervals);
    //     // console.log('finalIntervalsfinalIntervals', intervals);
    //     // }
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       wednesdayslot,
    //     );
    //     setfinalIntervals(wednesdayslot);
    //     break;
    //   case 4:
    //     console.log('Thursday');
    //     const thursday = conversion(datetime.thursday);
    //     // const thursdayslot = [];
    //     // for (const time of thursday) {
    //     //   const { starttime, endtime } = time;
    //     //   console.log('timetimetimetime', starttime, endtime);
    //     const thursdayslot = generateIntervals(
    //       datetime.thursday,
    //       intervalMinutes,
    //     );
    //     // thursdayslot.push(...intervals);
    //     // console.log('finalIntervalsfinalIntervals', intervals);
    //     // }
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       thursdayslot,
    //     );
    //     setfinalIntervals(thursdayslot);
    //     break;
    //   case 5:
    //     console.log('Friday');
    //     const friday = conversion(datetime.friday);
    //     // const fridayslot = [];
    //     // for (const time of friday) {
    //     //   const { starttime, endtime } = time;
    //     //   console.log('timetimetimetime', starttime, endtime);
    //     const fridayslot = generateIntervals(datetime.friday, intervalMinutes);
    //     // fridayslot.push(...intervals);
    //     // console.log('finalIntervalsfinalIntervals', intervals);
    //     // }
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       fridayslot,
    //     );
    //     setfinalIntervals(fridayslot);
    //     break;
    //   case 6:
    //     console.log('Saturday');
    //     const saturday = conversion(datetime.saturday);
    //     const saturdayslot = generateIntervals(
    //       datetime.saturday,
    //       intervalMinutes,
    //     );
    //     console.log(
    //       'finalIntervalsfinalIntervalsgeneratedIntervals',
    //       saturdayslot,
    //     );
    //     setfinalIntervals(saturdayslot);
    //     break;
    //   default:
    //     console.log('Invalid day');
    //   // return result
    // }

    // const saturday = conversion(datetime.saturday);
        const saturdayslot = generateIntervals(
          filteredData[check],
          intervalMinutes,
        ); 
        setfinalIntervals(saturdayslot)

    console.log('finalIntervalsfinalIntervalsfinalIntervals', finalIntervals);
  };

  const conversion = (data: any) => {
    alert('////////////////');
    console.log('data..........', data);
    return data?.map((obj) => {
      const { day, ...rest } = obj; // Destructure the "day" property
      console.log('restrestrest', rest);
      return rest; // Return the object without the "day" property
    });
  };
  const convertion = (dateStr)=> {
    const momentObj = moment(dateStr, 'DD/MM/YYYY');
    const formattedDate = momentObj.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    console.log("?????????????",formattedDate);
    return formattedDate
  } 

  const calculateSchedule = (starDate, excludedWeekdays, enDate, tz) => {
    console.log('lastDatelastDate1111', starDate, enDate, '\n', tz);
    // alert(tz)
    if (tz !== null && tz !== undefined) {
      const tzone = tz;
      // moment.tz.setDefault(tzone);
      console.log('stardate.......', starDate, excludedWeekdays, enDate, tz);
      // const schedule = [];
      // let currentDate = moment(starDate).startOf('day');
      // const lastDate = moment(enDate).startOf('day');
      const schedule = [];
      const startdate = convertion(starDate)
      const enddate = convertion(enDate)
      let currentDate = moment.tz(startdate, tzone).startOf('day');
      const lastDate = moment.tz(enddate, tzone).startOf('day');

      console.log('lastDatelastDate', currentDate, lastDate);

      while (currentDate.isSameOrBefore(lastDate)) {
        const weekday = currentDate.weekday();
        if (!excludedWeekdays.includes(weekday)) {
          schedule.push(currentDate.toDate());
        }
        currentDate = currentDate.add(1, 'day');
      }
      console.log('^^^^^^^^^^^', schedule);
      return schedule;
    }
  };

  // const calculateSchedule = (starDate, excludedWeekdays, enDate, tz) => {
  //   if (tz !== null && tz !== undefined) {
  //     const tzone = tz;
  //     const schedule = [];

  //     let currentDate = moment.tz(starDate, tzone).startOf('day');
  //     const lastDate = moment.tz(enDate, tzone).startOf('day');

  //     while (currentDate.isSameOrBefore(lastDate)) {
  //       const weekday = currentDate.weekday();
  //       if (!excludedWeekdays.includes(weekday)) {
  //         const dayTimeslots = getTimeSlotsForDay(currentDate, tzone); // Get time slots for the current day
  //         const daySchedule = {
  //           daa: currentDate.toDate(),
  //           timeslots: dayTimeslots,
  //         };
  //         schedule.push(daySchedule);
  //       }
  //       currentDate = currentDate.add(1, 'day');
  //     }

  //     console.log('Schedule:', schedule);
  //     return schedule;
  //   }
  // };

  const getTimeSlotsForDay = (dat, timezuone) => {
    // Here, you can implement your logic to fetch or generate the time slots for a specific day in the given timezone.
    // Return an array of time slots for the day.
    // Example: return an array of predefined time slots
    return [
      { startTime: '9:00 AM', endTime: '10:00 AM' },
      { startTime: '11:30 AM', endTime: '1:00 PM' },
      { startTime: '2:30 PM', endTime: '4:00 PM' },
      // Add more time slots as needed
    ];
  };

  const onDateChange = (datetimes: any) => {
    // const sd = new Date(selectedRange.from);
    // const ed = new Date(selectedRange.to);
    // const currentDate = new Date(datetimes);
    // console.log("currentDatecurrentDate",currentDate)
    // const isInSchedule = availability.some((d) => d.getTime() === currentDate.getTime());
    // console.log("isInScheduleisInSchedule",isInSchedule)
    // const isInSchedule111 = availability.includes(currentDate);
    // console.log("currentDatecurrentDateisInSchedule",availability,"\n",isInSchedule,"\n",isInSchedule111)
    const currentDate = new Date(datetimes);
    console.log('currentDatecurrentDate', datetimes);

    const isInSchedule = availability.some((d) => {
      const scheduleDate = new Date(d);
      scheduleDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison
      currentDate.setHours(0, 0, 0, 0);
      return scheduleDate.getTime() === currentDate.getTime();
    });
    console.log('currentDatecurrentDateisInScheduleisInSchedule', isInSchedule);

    console.log('isInSchedule', isInSchedule);
    if (isInSchedule) {
      AvailbleSlots(datetimes);
      console.log('!!!!newdate', datetimes);
      const options = { weekday: 'long', day: '2-digit', month: 'long' };
      const formattedDate = datetimes.toLocaleDateString('en-US', options);
      console.log('++++++++++', formattedDate);
      setDate(formattedDate);
      setSelectTime('');
      setSelectDate(formattedDate);
      // setChange(true);
      setselectedDate1(datetimes);
      console.log('change123', change);
      // console.log('00000', newDate);
      console.log(change);
      // setWidth('725px');
      // setMargin('60px');
    } else {
      setDate(null);
      setfinalIntervals([]);
      setSelectTime('');
    }
  };

  const selectbutton = (obj) => {
    const { index, value } = obj;
    console.log('eeeeeeeeee', obj);
    setSelect(true);
    setSelectTime(obj);
  };

  // const generateIntervals = (start, end, intervalMinutes) => {
  //   // console.log("sdsdsdsdsdsdsdsdsd", intervalMinutes,typeof intervalMinutes);
  //   console.log('sdsdsdsdsdsdsdsdsd', start, '\n', end, '\n', intervalMinutes);

  //   const intervals = [];
  //   const [startHour, startMinute] = start.split(':');
  //   const [endHour, endMinute] = end.split(':');

  //   console.log('endHourstrat', startHour, startMinute);
  //   console.log('endHour', endHour, endMinute);

  //   let currentHour = parseInt(startHour, 10);
  //   let currentMinute = parseInt(startMinute, 10);
  //   console.log('check1', currentHour < parseInt(endHour, 10));
  //   console.log('check2', currentHour === parseInt(endHour, 10));
  //   console.log('check3', currentMinute <= parseInt(endMinute, 10));

  //   while (
  //     currentHour < parseInt(endHour, 10) ||
  //     (currentHour === parseInt(endHour, 10)
  //     &&
  //       currentMinute <= parseInt(endMinute, 10))
  //   ) {
  //     const formattedStartHour =
  //       currentHour > 12 ? currentHour - 12 : currentHour;
  //     const formattedStartMinute = currentMinute.toString().padStart(2, '0');
  //     const startAmPm = currentHour >= 6 && currentHour !== 12 ? 'am' : 'pm';
  //     const startInterval = `${formattedStartHour}:${formattedStartMinute} ${startAmPm}`;
  //     console.log('startInterval', startInterval);

  //     currentMinute += intervalMinutes;
  //     console.log('currentMinutecurrentMinute', currentMinute);
  //     // console.log("currentMinutecurrentMinute", currentMinute);
  //     if (currentMinute >= 60) {
  //       c urrentHour++;
  //       currentMinute -= 60;
  //     }
  //     // const formattedEndHour = currentHour.toString().padStart(2, "0");
  //     const formattedEndHour =
  //       currentHour > 12 ? currentHour - 12 : currentHour;
  //     const formattedEndMinute = currentMinute.toString().padStart(2, '0');
  //     const endAmPm = currentHour >= 6 && currentHour !== 12 ? 'am' : 'pm';
  //     const endInterval = `${formattedEndHour}:${formattedEndMinute} ${endAmPm}`;

  //     // const interval = `${formattedStartHour}.${formattedStartMinute} - ${formattedEndHour}.${formattedEndMinute}`;
  //     const interval = `${startInterval} - ${endInterval}`;

  //     intervals.push(interval);
  //   }
  //   console.log('intervalsintervalsintervalsintervals', intervals);
  //   return intervals;
  // };

  function parseTime(time) {
    console.log("time)))))))))))))))",time)
    const [timePart, amPm] = time.split(' ');
    let [hour, minute] = timePart.split(':').map(Number);

    if (amPm === 'PM' && hour < 12) {
      hour += 12;
    }
    console.log('hourhour', hour, minute);
    return [hour, minute];
  }

  function generateIntervals(timeBreaks, intervalMinutes) {
    console.log('timeBreakstimeBreaks', timeBreaks);
    const intervals12 = [];
    // const intervals24 = [];
    for (const timeBreak of timeBreaks) {
      console.log('timeBreak', timeBreak);
      const { starttime, endtime } = timeBreak;

      const [startHour, startMinute] = parseTime(starttime);
      const [endHour, endMinute] = parseTime(endtime);

      console.log('startHour', startHour, 'endHour', endHour);

      let currentHour = startHour;
      let currentMinute = startMinute;
      console.log(
        'currentHour < parseInt(endHour, 10)',
        currentHour < parseInt(endHour, 10),
      );
      console.log(
        'currentHour === parseInt(endHour, 10)',
        currentHour === parseInt(endHour, 10),
      );
      console.log(
        'currentMinute <= parseInt(endMinute, 10))',
        currentMinute <= parseInt(endMinute, 10),
      );

      while (
        currentHour < parseInt(endHour, 10) ||
        (currentHour === parseInt(endHour, 10) &&
          currentMinute <= parseInt(endMinute, 10) &&
          !(currentHour === 12 && currentMinute === 0 && startHour === 12))
      ) {
        const formattedStartHour12 =
          currentHour > 12 ? currentHour - 12 : currentHour;
        console.log('formattedStartHour12', formattedStartHour12);
        // const formattedStartHour24 = currentHour.toString().padStart(2, "0");
        const formattedStartMinute = currentMinute.toString().padStart(2, '0');
        const stAmPm = currentHour < 12 && currentHour > 6 ? 'am' : 'pm';
        const startInterval12 = `${formattedStartHour12}:${formattedStartMinute} ${stAmPm}`;
        // const startInterval24 = `${formattedStartHour24}:${formattedStartMinute} ${stAmPm}`;

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
        //const formattedEndHour24 = currentHour.toString().padStart(2, "0");
        const formattedEndMinute = currentMinute.toString().padStart(2, '0');
        const endAmPm = currentHour < 12 && currentHour > 6 ? 'am' : 'pm';
        const endInterval12 = `${formattedEndHour12}:${formattedEndMinute} ${endAmPm}`;
        // const endInterval24 = `${formattedEndHour24}:${formattedEndMinute} ${endAmPm}`;

        const interval12 = `${startInterval12} - ${endInterval12}`;
        // const interval24 = `${startInterval24} - ${endInterval24}`;

        intervals12.push(interval12);
        // intervals24.push(interval24);
      }
    }
    return intervals12;
  }

  const modifiers = {
    selected: availability,
    // range: {
    //   from: selectedRange.from, // Set the start date to the current date
    //   to: selectedRange.to, // Set the end date to a specific date (e.g., August 7, 2023)
    // },
    // availble : availability
    // unclickable : isDateUnclickable
  };
  const modifiersStyles = {
    selected: {
      backgroundColor: '#FFC203',
      color: 'black',
      // size : '1px'
    },
    // range: {
    //   backgroundColor: 'yellow',
    //   color: 'black',
    // },
    container: {
      height: '900px',
      width: '900px',
      // innerHeight : '200px',
      // innerWidth :'300px'
    },
  };

  const WEEKDAYS_LONG = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
];
const WEEKDAYS_SHORT = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
const currentDate = new Date();
const startOfMonth = new Date(selectedRange.from);
const endOfMonth = new Date(selectedRange.to);
console.log("************",startOfMonth,endOfMonth)




  return (
    <>
      {console.log(
        'process.env.PUBLIC_UR',
        `${process.env.REACT_APP_HOME_URL}media/company_logo/${isProfile}`,
      )}
      {console.log('process.env.PUBLIC_UR', isProfile)}
      {console.log("availbledayavailbleday",timezone)}

      {console.log(
        'startMonth//////',
        startOfMonth,
        '\n',
        'endMOnth',
        endOfMonth,
        '\n',
        'selectedRange',
        selectedRange,
        '\n',
        'availability',
        availability,
        finalIntervals,
      )}

      <Flex>
        {response?.map((data, item) => (
          <div key={item} className={styles.slotter}>
            <Flex row className={styles.leftside}>
              <div>
                <Flex row>
                  <div style={{ marginBottom: '5px' }}>
                    {data.company_logo !== '' ? (
                      <img
                        src={`${process.env.REACT_APP_HOME_URL}media/${data.company_logo}`}
                        alt="Company Logo"
                        style={{ width: '100px', height: '100px' }}
                      />
                    ) : (
                      ''
                    )}
                  {/* </div>
                  <div style={{ marginBottom: '5px' }}> */}
                    <Text
                      size={24}
                      bold
                      style={{color: '#581845' , marginLeft: '15px'}}
                    >
                      {data.company_name}{' '}
                    </Text>
                    <br />
                  </div>
                </Flex>

                <div style={{ marginTop: '10px' }}></div>

                <Flex row>
                  <Text size={18}>
                    {candidate_name}, you have been selected for an{' '}
                    {data.event_name} at {data.company_name}. Pick a Time and
                    Date
                  </Text>
                  {/* )} */}
                </Flex>
                <div style={{ marginTop: '20px' }}></div>
                <div className={styles.line}></div>
                <div style={{ marginTop: '10px' }}></div>
                <div style={{ marginBottom: '10px' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: '24px' }}>
                    {/* {data.event_type}- */}
                    {data.event_name}
                  </Text>
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div style={{ marginBottom: '10px' }}>
                  <SvgClock width={16} height={16} fill={'#581845'} />
                  <Text size={16} style={{ marginLeft: '10px' }}>
                    {data.duration}
                  </Text>
                  <br />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <SvgGlobe width={18} height={18} fill={'#581845'} />
                  <Text size={16} style={{ marginLeft: '10px' }}>
                    Time Zone is {timezones(data.times_zone)}
                  </Text>
                  <br />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <SvgInfoCircle width={18} height={18} fill={'#581845'} />
                  <Text size={16} style={{ marginLeft: '10px' }}>
                    This is an {getinter(data.event_type)}.Please come prepared
                    with the technical aspects of your work experience along
                    with your CV/Resume
                  </Text>
                  <br />
                </div>
                <div style={{ marginTop: '20px' }}></div>
                <div className={styles.line1}></div>
              </div>
            </Flex>
            <div className={styles.straightline}></div>
            <Flex >
              {/* <div> */}
                 <div>
                  <Flex row className={styles.rightside}>
                    <div>
                      <DayPicker
                        // navbarElement={renderNavbar}
                        locale={enUS}
                        // dayPickerProps={dayPickerProps}
                        mode="single"
                        styles={{                          
                          head_cell: {                            
                            width: "29px",
                            // height :"100px"                        
                          },
                          table: {
                            maxWidth: "none",
                          },
                          day: {
                            margin: "7px",
                          },
                          head : {
                            width: "29px",                           
                          },
                          months:{
                            width : "130px",   
                            color : "#581845",                         
                          },
                          nav:{
                            margin : "15px"
                          },
                                                  
                          
                          // weeknumber : {
                          //   marginTop :"10px"
                          // }
                          
                          
                          // nav_button_next:{
                          //   height : '100px'
                          // }
                        }}
                        onSelect={setDays}
                        fromMonth={startOfMonth}
                        // defaultMonth ={initialMonth}
                        toMonth={endOfMonth}
                        className="custom-daypicker"
                        // weekdays={WEEKDAYS_SHORT}
                        // numberOfMonths={1} 
                        // pagedNavigation
                        // onDayMouseEnter={handleDayMouseEnter}
                        // onDayClick={handleDayClick}
                        // footer={footer123}
                        fromDate={startDate}
                        toDate={endDate}
                        // selectedDays
                        // onDayClick ={(list)=>{
                        //     timeslot1(list)
                        // }}
                        // dayPickerProps={{
                        //   locale: 'en-US',
                        //   formatDay: (day) => {
                        //     return day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                        //   },
                        // } as DayPickerProps}
                        onDayClick={(e) => onDateChange(e)}
                        modifiers={modifiers}
                        // disabled={false}
                        modifiersStyles={modifiersStyles}
                        // onNextClick = {onnext}
                        // onPrevClick?: MonthChangeEventHandler;
                        // locale={localeWithTimeZone}
                      />
                    </div>
                  </Flex>
                  </div>
                  <div>
                  <div style={{ marginTop: '20px' }}></div>
                  <Flex>
                    {date ? <div className={styles.line3}></div> : ''}   
                <div style={{ marginTop: '20px' }}></div>

                      {date ? (
                          <div style={{ marginLeft: '50px',}}>
                            <Text size={18} style ={{color : "#581845" }} bold>Availability for {date}</Text>
                          </div>
                        ) : (
                          ''
                        )}
                  <Flex className={styles.select}>
                    <Flex>
                      <div style={{ marginLeft: '30px' }}>
                        {finalIntervals?.length > 0 &&
                          finalIntervals?.map((obj, index) => (
                            <button className={styles.button1}
                              key={index}
                              onClick={() => selectbutton(obj)}
                            >
                              {obj}
                            </button>
                          ))}
                      </div>

                      {/* </Flex>
                    <Flex> */}
                      {selecttime ? (
                        <>
                          <div style={{ marginLeft: '400px' }}>
                            <Button className={styles.selectslot}
                              onClick={() => onSubmit(date, selecttime)}
                            >
                              Confirm
                            </Button>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </Flex>
                  {/* </div> */}
                  </Flex>
                  </Flex>
                </div>
              {/* </div> */}
            </Flex>
          </div>
        ))}
      </Flex>
    </>
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
  console.log('response12333333333', response);
  console.log('time_zone', time_zone);



  // const googleaddevent = async () =>{
  //   alert("googleaddevent")
  //   // const addevent ={
  //   //   'summary' : 'heloo',
  //   //   'description': 'googleadd event',
  //   //   'start' :{
  //   //     'datetime': Date.now(),
  //   //     'timezone' : Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   //   },
  //   //   'end' :{
  //   //     'datetime': Date.now(),
  //   //     'timezone' : Intl.DateTimeFormat().resolvedOptions().timeZone,
  //   //   }

  //   // }

  //   // const events = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events",{
  //   //   method : "POST",
  //   //   headers :{
  //   //     'Authorization' : 'Bearer' + "ya29.a0AbVbY6MrtjxCaueL5oYyKaU73Lqro_oJOvBwDGZ-pVeqCxGNGg3uWvQFbDufFZ9gbu7pdHervKGeeZYTmoS3wzMQSrag1yzk5tqZf67D8iYqjTivkKc6t_27jqvGrLvkyAvK9d3hWRGU2U9JxeC72g3f5yOoaCgYKAYkSARISFQFWKvPlo5LDr5gDd7__fd2zTjjFjA0163"
  //   //     // 'ContentType' : "application/x-www-form-urlencoded",
  //   //   },
  //   //   body : JSON.stringify(addevent)
  //   // }).then((data) =>{
  //   //   return data.json();
  //   // }).then((data)=>{
  //   //   console.log(data)
  //   //   alert("Event Created Successfully")
  //   // }).then((err)=>{
  //   //   console.log("err",err)
  //   //   // alert("Event err Successfully")
  //   // })
  //   const { Client } = require('@microsoft/microsoft-graph-client');
  //   const { ClientSecretCredential } = require('@azure/identity');
  //   const clientId = '63177925-c246-4962-8277-eab973bbf0fb';
  //   const clientSecret = 'Td07Q~u64ynLz1w61m1NNRMcPtk70pwXd5I3a';
  //   const tenantId = 'YOUR_TENANT_ID';

  //   // Create a client credential authentication provider
  //   const authProvider = new ClientSecretCredential(tenantId, clientId, clientSecret);


  //   const options = {
  //     authProvider,
  //   };
    
  //   const client = Client.init(options);
    
  //   const event = {
  //     subject: 'Prep for customer meeting',
  //     body: {
  //       contentType: 'HTML',
  //       content: 'Does this time work for you?'
  //     },
  //     start: {
  //         dateTime: '2019-11-20T13:00:00',
  //         timeZone: 'Pacific Standard Time'
  //     },
  //     end: {
  //         dateTime: '2019-11-20T14:00:00',
  //         timeZone: 'Pacific Standard Time'
  //     },
  //     location: {
  //         displayName: 'Cordova conference room'
  //     },
  //     attendees: [
  //       {
  //         emailAddress: {
  //           address: 'AdeleV@contoso.OnMicrosoft.com',
  //           name: 'Adele Vance'
  //         },
  //         type: 'required'
  //       }
  //     ],
  //     allowNewTimeProposals: true,
  //     isOnlineMeeting: true,
  //     onlineMeetingProvider: 'teamsForBusiness'
  //   };
    
  //   await client.api('/me/events')
  //     .post(event);

  // }

  useEffect(() => {
    loadGapi(() => {
      // Initialize the Google API client
      window.gapi.load('client:auth2', () => {
        window.gapi.auth2.init({
          client_id: '396086087663-fgeas18n6jmnakspsdefe92ha7strcgt',
          scope: 'https://www.googleapis.com/auth/calendar',
        });
      });
    });
  }, []);

const googleaddevent = () => {
  alert("?")

const events = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2023-07-20T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'end': {
    'dateTime': '2023-07-20T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles'
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'}
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10}
    ]
  }
};
console.log("requestrequest")

// const request = window.gapi.client.calendar.events.insert({
//   'calendarId': 'primary',
//   'resource': event122
// });
const request = window.gapi.client.calendar.events.list({
  calendarId: 'primary',
  resource: events,
});
console.log("requestrequest",request)

request.execute((re) => {
  console.log('Event created: ', re);
});

  }


  return (
    <>

      {response?.map((list: any) => (
        <div
          className={styles.confrompage}
          key={list.id} 
        >

          <Flex row>
            <div
              style={{
                // zoom: '100px',
                marginLeft: '330px',
                marginTop: '10px',
                // width : "100px",
                // height : "100px"
              }}
            >
              <SvgCheck2Circle width={30} height={30} fill={'green'}/>
            </div>
          </Flex>
          <Flex row>
              <Text size={26} bold style={{  marginLeft: '70px', color: '#581845' }}>
                Your Interview has been Successfully Scheduled
              </Text>
          </Flex>
          <div style={{ marginTop: '70px' }}></div>
          <Flex row>
            <div>
              <img
                // src={process.env.PUBLIC_URL + list.company_logo}
                src={`${process.env.REACT_APP_HOME_URL}media/${list.company_logo}`}
                alt="Company Logo"
                style={{ width: '100px', height: '100px' }}
              />
              <Text 
                style={{
                  // color: '#581845',
                  fontWeight: 'bold',
                  fontSize: '20px',
                  marginLeft : "30px"
                }}
                size={20}
              >
                {list.company_name}{' '}
              </Text>
              <br />
            </div>
          </Flex>
          <div style={{ marginTop: '30px' }}></div>
          <Flex row>
              <Text bold size={20} style={{ marginLeft: '10px', color: '#581845' }}>
                {list.event_name}
              </Text>
            
          </Flex>
          <Flex row>
            <div
              style={{
                marginLeft: '10px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <SvgCalendarEvent width={18} height={18} />
              <Text size={16} style={{ marginLeft: '10px' }}>
                {selecttime},{date}
              </Text>
            </div>
          </Flex>
          <div style={{marginTop : "10px"}}></div>
          <Flex row>
            <div
              style={{
                marginLeft: '10px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <SvgClock width={16} height={16} fill={'#581845'} />
              {/* <i class="bi bi-clock"></i> */}
              <Text size={16} style={{ marginLeft: '10px' }}>{list.duration}</Text>
              <br />
            </div>
          </Flex>
          <div style={{marginTop : "10px"}}></div>

          <Flex row>
            <div
              style={{
                marginLeft: '10px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <SvgGlobe width={18} height={18} fill={'#581845'} />

              <Text size={16} style={{ marginLeft: '10px' }}>
                Time Zone is {timezones(list.times_zone)}
              </Text>
            </div>
            {/* })} */}
          </Flex>
          <div style={{marginTop : "10px"}}></div>
          <Flex row>
            <div
              style={{
                // marginLeft: '10px',
                // textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <SvgInfoCircle width={18} height={18} fill={'#581845'} />
              <Text  size={16} style={{ marginLeft: '10px' }}>
                This is an {getinter(list.event_type)}.Please come prepared with  the technical aspects of your work experience along with CV/Resume
              </Text>
              
            </div>
          </Flex>
          <div style={{marginTop : "10px"}}></div>
          <div style={{ marginTop: '50px' }}></div>
          <div className={styles.line4}></div>
          <div style={{ marginTop: '30px' }}></div>
          <Flex row>
            <div
              style={{
                marginLeft: '295px',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              <button className={styles.button} onClick={googleaddevent}>
                <Text>Add to your calendar</Text>
              </button>
            </div>
          </Flex>
        </div>
      ))}
    </>
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

  console.log('responseresponse.......', dashboard);
  console.log('responseresponseslotterdata', slotterdata,slotmembers);

  const mergedArray = [...dashboard, ...slotterdata];
  console.log('Merged Array:', mergedArray);

  useEffect(() => {
    // setloader(true);
    // alert('interviewdashboard');
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

    // const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    console.log(formattedDate); // Output: Sunday, Aug 2, 2023
    return formattedDate;
  };

  const addtocalender = () => {
    alert('addtocalender');
    const eventTitle = 'My Event';
    const startDate = new Date('2023-08-02T09:45:00');
    const endDate = new Date('2023-08-02T10:00:00');

    const teamsCalendarLink = `https://teams.microsoft.com/l/meeting/new?
    subject=${encodeURIComponent(
      eventTitle,
    )}&startTime=${startDate.toISOString()}&endTime=${endDate.toISOString()}`;
    // GoogleIntergration()

    console.log(teamsCalendarLink);
  };

  return (
    <>
      <Flex>
        {dashboard.map((list: any, index) => (
          <div
            key={index}
            className ={styles.dashboard} >
            <Flex>
                <Flex row>
                  <div style={{ marginLeft: '10px'}}>
                    <img
                      // src={process.env.PUBLIC_URL + list.company_logo}
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
                        marginLeft: '20px'
                      }}
                    >
                      {list.company_name}{' '}
                    </Text>
                    <br />
                  </div>
                </Flex>
                {/* })} */}
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
                      marginLeft : "20px",
                      // textAlign: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <SvgInfoCircle width={18} height={18} fill={'#581845'} />
                    <Text style={{ marginLeft: '10px' }}>
                      This is an {getinter(list.event_type)}.Please come
                      prepared with the technical aspects of your work
                      experience along with your CV/Resume
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
