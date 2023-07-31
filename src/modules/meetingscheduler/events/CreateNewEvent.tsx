import { useEffect, useState } from 'react';
import { isEmptyArray, useField, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import DateRangePicker, { Props } from 'react-bootstrap-daterangepicker';
import Modal from '../../../uikit/Modal/Modal';
import Flex from '../../../uikit/Flex/Flex';
import Toast from '../../../uikit/Toast/Toast';
import { isEmpty } from '../../../uikit/helper';
import { THIS_FIELD_REQUIRED } from '../../constValue';
import { AppDispatch, RootState } from '../../../store';
import Text from '../../../uikit/Text/Text';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import InputRadio from '../../../uikit/InputRadio/InputRadio';
import Button from '../../../uikit/Button/Button';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import SvgCalendar from '../../../icons/SvgCalendar';
import SvgRoundAdd from '../../../icons/SvgRoundAdd';
import {
  eventType,
  duration,
  timezonedisplay,
  timezonesdata,
} from './eventType';
import {
  getScheduleMiddleWare,
  postScheduleMiddleWare,
} from './store/middleware/eventmiddleware';
import styles from './createnewevent.module.css';
import Interviewer from './Interviewer';
import DayTimeSplit from './DayTimeSplit';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
// eslint-disable-next-line import/order
import { LabelWrapper, Loader } from '../../../uikit';

type CreateEvent = {
  event_name: string;
  event_type: string;
  location: string;
  dateRange: string;
  days: string;
  startdate: string;
  enddate: string;
  duration: string;
  timezone: string;
  interviewer: string;
  schedule: string;
  sunday: [];
  timezonedisplay: string;
  description: string;
  // availbletimebook: string;
  isactive: boolean;
  isdeleted: boolean;
  updatedby: string;
};

const initial: CreateEvent = {
  event_name: '',
  event_type: '',
  location: '',
  dateRange: '0',
  days: 'Calendar Days',
  startdate: '',
  enddate: '',
  duration: '',
  timezone: '',
  interviewer: '',
  schedule: '',
  sunday: [],
  timezonedisplay:
    'Automatically detect and show the times in my invitees time zone',
  description: '',
  // availbletimebook : '',
  isactive: true,
  isdeleted: false,
  updatedby: '',
};

const CreateNewEvent = (props) => {
  const {
    setIsOpen,
    editModel,
    teammembers,
    datetime,
    reset,
    // intern,
    google,
    outlook,
    HandleButton,
    HandleResetForm,
  } = props;
  console.log('props+++++++', props);

  console.log('resetresetresetresetresetreset', reset);

  const dispatch: AppDispatch = useDispatch();
  const [interviewer, setInterviewer] = useState(false);
  const [interviewerData, setinterviewerData] = useState([]);
  const [edit_id, setedit_id] = useState(0);
  const [include, setinclude] = useState(false);
  const [loading, setloading] = useState(false);
  const [saveButton, setsaveButton] = useState(false);
  const [fullname, setfullname] = useState('');
  const [cancelpopup, setcancelpopup] = useState(false);
  const [durationField, setDurationField] = useState('');
  const [dayField, setDaysField] = useState('Calendar Days');
  const [organiser, setorganiser] = useState(teammembers ? teammembers : []);
  const [zone, setzone] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [isButton, setButton] = useState(true);
  const [sunday, setSunday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [monday, setMonday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [tuesday, setTuesday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [wednesday, setWednesday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [thursday, setThursday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [friday, setFriday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [saturday, setSaturday] = useState([
    { starttime: '9:00 AM', endtime: '6:00 PM' },
  ]);
  const [checkedItems, setCheckedItems] = useState([]);
  // const [schedule, setSchedule] = useState(
  //   datetime !== undefined ? datetime : null,
  // );
  const [render, setrender] = useState(Date.now());
  const [timezones, setTimezones] = useState([]);
  const [sundaycheck, setsundaycheck] = useState(false);
  const [mondaycheck, setmondaycheck] = useState(true);
  const [tuesdaycheck, settuesdaycheck] = useState(true);
  const [wednesdaycheck, setwednesdaycheck] = useState(true);
  const [thursdaycheck, setthursdaycheck] = useState(true);
  const [fridaycheck, setfridaycheck] = useState(true);
  const [saturdaycheck, setsaturdaycheck] = useState(false);

  const [errMsg, seterrMsg] = useState(false);
  const [userzone, setuserzone] = useState('');

  // const [schedata, setschedata] = useState(datetime !== null ? datetime : null);

  const { user, profile, isLoading } = useSelector(
    ({ userProfileReducers }: RootState) => ({
      isLoading: userProfileReducers.isLoading,
      user: userProfileReducers.user,
      profile: userProfileReducers.profile,
    }),
  );
  let profilename = user.first_name + ' ' + user.last_name;
  console.log('profilenameprofilenameprofilename', profilename);
  useEffect(() => {
    if (!isEmpty(editModel)) {
      setedit_id(editModel.id);
      axios.get(`${eventSchedulerApi}?pk=${editModel.id}`).then((res) => {
        console.log('resres', res);
        setloading(true);
        if (res.data) {
          let scheduledata = res.data.datetime;
          let interviewdata = res.data.interviewer;
          openModelEdit(editModel, scheduledata, interviewdata);
        }
        setloading(false);
      });
    } else {
      formik.resetForm();
    }
    Timeszones();
  }, [duration, datetime, userzone]);

  useEffect(() => {
    if (sundaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSunday(newData);
    }
    if (mondaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setMonday(newData);
    }
    if (tuesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setTuesday(newData);
    }
    if (wednesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setWednesday(newData);
    }
    if (thursdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setThursday(newData);
    }
    if (fridaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setFriday(newData);
    }
    if (saturdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSaturday(newData);
    }
  }, [
    mondaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    sundaycheck,
    saturdaycheck,
  ]);
  useEffect(() => {
    if (userzone !== null && userzone !== undefined) {
      formik.values.timezone = userzone;
    }
  }, [userzone]);

  function Timeszones() {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzone = `${moment
      .tz(userTimezone)
      .format('Z')} (${userTimezone})`.trim();
    setuserzone(tzone);
  }

  function resetformik() {
    formik.values.event_name = '';
    formik.values.event_type = '';
    formik.values.location = '';
    formik.values.dateRange = '0';
    formik.values.days = 'Calendar Days';
    formik.values.startdate = '';
    formik.values.enddate = '';
    formik.values.duration = '';
    formik.values.timezone = '';
    formik.values.interviewer = '';
    formik.values.schedule = '';
    formik.values.sunday = [];
    formik.values.timezonedisplay =
      'Automatically detect and show the times in my invitees time zone';
    formik.values.description = '';
    // availbletimebook = '',
    formik.values.isactive = true;
    formik.values.isdeleted = false;
  }

  useEffect(() => {
    if (reset) {
      resetformik();
      console.log(
        'resetresetresetresetresetresetformikformikformik',
        formik.values,
      );
    }
  }, [reset]);

  const conversion = (data: any) => {
    return data.map((obj) => {
      const { day, ...rest } = obj; // Destructure the "day" property
      return rest; // Return the object without the "day" property
    });
  };

  const openModelEdit = (datalist: any, dt: any, intern) => {
    console.log('@@@@@@@@@@+++++______+++++', datalist, dt, intern);
    setsaveButton(true);
    if (intern && intern.length > 0) {
      const fullNamesArray = intern?.map((i) => i.full_name);
      const checked = intern?.map((i) => i.name__user.toString());
      console.log('::::::()()()()()()()', checked);
      setinterviewerData(fullNamesArray);
      setCheckedItems(checked);
    } else {
      setinterviewerData([]);
    }
    const datas = datalist;
    formik.values.event_name = datas.event_name;
    formik.values.event_type = datas.event_type;
    formik.values.location = datas.location;
    formik.values.days = datas.days;
    selectedRange.endDate = datas.enddate;
    selectedRange.startDate = datas.startdate;
    formik.values.startdate = datas.startdate;
    formik.values.enddate = datas.enddate;
    if (datas.duration === '1 hour') {
      formik.values.duration = '1 hour';
      const durationminutes = '60 Minutes';
      setDurationField(durationminutes);
    } else {
      formik.values.duration = datas.duration;
      setDurationField(datas.duration);
    }
    formik.values.timezone = datas.times_zone;
    formik.values.description = datas.description;
    formik.values.timezonedisplay = datas.times_zone_display;
    if (dt !== undefined && dt !== null) {
      if (dt && dt.sunday && dt.sunday.length > 0) {
        const editsunday = conversion(dt.sunday);
        setSunday(editsunday);
        setsundaycheck(true);
      } else {
        setsundaycheck(false);
      }
      if (dt && dt.monday && dt.monday.length > 0) {
        const editmonday = conversion(dt.monday);
        setMonday(editmonday);
        setmondaycheck(true);
      } else {
        setmondaycheck(false);
      }
      if (dt && dt.tuesday && dt.tuesday.length > 0) {
        const edittuesday = conversion(dt.tuesday);
        setTuesday(edittuesday);
        settuesdaycheck(true);
      } else {
        settuesdaycheck(false);
      }
      if (dt && dt.wednesday && dt.wednesday.length > 0) {
        const editwednesday = conversion(dt.wednesday);
        setWednesday(editwednesday);
        setwednesdaycheck(true);
      } else {
        setwednesdaycheck(false);
      }
      if (dt && dt.thursday && dt.thursday.length > 0) {
        const editthursday = conversion(dt.thursday);
        setThursday(editthursday);
        setthursdaycheck(true);
      } else {
        setthursdaycheck(false);
      }
      if (dt && dt.friday && dt.friday.length > 0) {
        const editfriday = conversion(dt.friday);
        setFriday(editfriday);
        setfridaycheck(true);
      } else {
        setfridaycheck(false);
      }
      if (dt && dt.saturday && dt.saturday.length > 0) {
        const editsaturday = conversion(dt.saturday);
        setSaturday(editsaturday);
        setsaturdaycheck(true);
      } else {
        setsaturdaycheck(false);
      }
    }
  };

  const handleEventValid = (values: CreateEvent) => {
    const errors: Partial<CreateEvent> = {};
    if (isEmpty(values.event_name.trim())) {
      formik.values.event_name = '';
      errors.event_name = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.event_type.trim())) {
      errors.event_type = THIS_FIELD_REQUIRED;
      // if(formik.values.event_type === ''){
      //   formik.setFieldValue('event_type','')
      // }
    }
    if (
      values.event_type === 'On-site Interview' &&
      isEmpty(values.location.trim())
    ) {
      formik.values.location = '';
      errors.location = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.days)) {
      errors.days = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.startdate)) {
      errors.startdate = 'Invalid Date';
    }
    if (isEmpty(values.duration)) {
      errors.duration = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.timezone)) {
      formik.values.timezone = userzone;
    }
    if (isEmpty(values.timezonedisplay)) {
      errors.timezonedisplay = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.description.trim())) {
      formik.values.description = '';
      errors.description = THIS_FIELD_REQUIRED;
    }
    // if(sundaycheck === false || mondaycheck === false || tuesdaycheck === false || wednesdaycheck === false || thursdaycheck === false || fridaycheck === false || saturdaycheck === false ){
    //   formik.values.availbletimebook ='';
    //   errors.availbletimebook = "Please Select The Alteast One AvailbleDay"
    // }
    console.log('errorserrorserrorserrors', errors);
    return errors;
  };

  const eventonChange = (label) => {
    console.log('');
    if (label === 'Microsoft Teams') {
      if (label === 'Microsoft Teams' && outlook === true) {
        formik.setFieldValue('event_type', label);
      } else {
        alert(
          'Zita Administrator needs to integrate the outlook calendar first',
        );
        formik.values.event_type = '';
      }
    }
    // if (label === 'Google Hangouts/Meet') {
    //   if (label === 'Google Hangouts/Meet' && google === true) {
    //     formik.setFieldValue('event_type', label);
    //   } else {
    //     alert(
    //       'At least one interviewer must have Google Calendar connected. Otherwise, the video conference will not be created',
    //     );
    //     formik.values.event_type ="";
    //   }
    // }
    if (
      label === 'On-site Interview' ||
      label === 'Phone Interview' ||
      label === 'Google Hangouts/Meet'
    ) {
      formik.setFieldValue('event_type', label);
    }
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  const Dayincludes = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const dateObject = new Date(year, month - 1, day);
    const dayOfWeekNumber = dateObject.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekName = dayNames[dayOfWeekNumber];
    return dayOfWeekNumber
  }

  const handleSubmitForm = (values: CreateEvent) => {
    const schedulearr = calculateSchedule();
    console.log('schedulearrschedulearrschedulearrschedulearr', schedulearr);
    if (isEmptyArray(schedulearr)) {
      alert('Date Range does not include a Availble Day');
      
      
    } else if (
      sundaycheck ||
      mondaycheck ||
      tuesdaycheck ||
      wednesdaycheck ||
      thursdaycheck ||
      fridaycheck ||
      saturdaycheck
    ) {
      const userid = [];
      userid.push(user.id.toString());
      const mergedArray =
        checkedItems.length === 0 ? userid : [...userid, ...checkedItems];
      const formData = new FormData();
      if (edit_id > 0) {
        formData.append('pk', JSON.stringify(edit_id));
      }
      formData.append('event_name', values.event_name.trim());
      formData.append('event_type', values.event_type);
      formData.append('location', values.location.trim());
      formData.append('days', values.days);
      formData.append('startdate', values.startdate);
      formData.append('enddate', values.enddate);
      formData.append('duration', values.duration);
      formData.append('timezone', values.timezone);
      formData.append('interviewer', JSON.stringify(mergedArray));
      formData.append('times_zone_display', values.timezonedisplay);
      formData.append('description', values.description.trim());
      if (sundaycheck === true) {
        formData.append('sunday', JSON.stringify(sunday));
      }
      if (mondaycheck === true) {
        formData.append('monday', JSON.stringify(monday));
      }
      if (tuesdaycheck === true) {
        formData.append('tuesday', JSON.stringify(tuesday));
      }
      if (wednesdaycheck === true) {
        formData.append('wednesday', JSON.stringify(wednesday));
      }
      if (thursdaycheck === true) {
        formData.append('thursday', JSON.stringify(thursday));
      }
      if (fridaycheck === true) {
        formData.append('friday', JSON.stringify(friday));
      }
      if (saturdaycheck === true) {
        formData.append('saturday', JSON.stringify(saturday));
      }
      // const schedulearr = calculateSchedule();
      formData.append('slot', JSON.stringify(schedulearr));
      dispatch(postScheduleMiddleWare({ formData })).then((res) => {
        const ToastMessage = formData.has('pk');
        dispatch(getScheduleMiddleWare(undefined));
        HandleButton(ToastMessage);
      });
      // .then((res: any) => {
      // alert("!@#$5")
      // console.log('?//////////res',res,ToastMessage)
      // setisLoader(true);
      // if (ToastMessage) {
      //   alert("+")
      //   // setIsOpen(false);
      //   Toast('Updated Event Successfully!');
      //   // dispatch(getScheduleMiddleWare(undefined));
      //   setisLoader(false);
      // }
      // else{
      //   alert("-")
      //   // setIsOpen(false);
      //   Toast('Event Created Successfully!');
      //   // dispatch(getScheduleMiddleWare(undefined));
      //   setisLoader(false);
      // }
      // });
      setIsOpen(false);
    } else {
      alert('Select Atleast One Availble Day');
    }
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => handleSubmitForm(values),
    validate: handleEventValid,
    enableReinitialize: true,
  });
  const onDurationClick = (option: any) => {
    if (option === '1 hour') {
      let value = '60 Minutes';
      setDurationField(value);
    } else {
      setDurationField(option);
    }
  };
  const convertion = (dateStr) => {
    const momentObj = moment(dateStr, 'DD/MM/YYYY');
    const formattedDate = momentObj.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    return formattedDate;
  };

  const calculateSchedule = () => {
    const excludedWeekdays = [];
    if (sundaycheck === true) {
      excludedWeekdays.push(0);
    }
    if (mondaycheck === true) {
      excludedWeekdays.push(1);
    }
    if (tuesdaycheck === true) {
      excludedWeekdays.push(2);
    }
    if (wednesdaycheck === true) {
      excludedWeekdays.push(3);
    }
    if (thursdaycheck === true) {
      excludedWeekdays.push(4);
    }
    if (fridaycheck === true) {
      excludedWeekdays.push(5);
    }
    if (saturdaycheck === true) {
      excludedWeekdays.push(6);
    }

    if (
      formik.values.timezone !== null &&
      formik.values.timezone !== undefined
    ) {
      const tzone = timezoneset(formik.values.timezonedisplay);
      const schedule1 = [];
      const startdate = convertion(formik.values.startdate);
      const enddate = convertion(formik.values.enddate);
      let currentDate = moment.tz(startdate, tzone).startOf('day');
      const lastDate = moment.tz(enddate, tzone).startOf('day');

      let count = 0;
      // let currentArray = dateformat(currentDate);
      // console.log("currentArraycurrentArray",currentArray)

      while (currentDate.isSameOrBefore(lastDate)) {
        const weekday = currentDate.weekday();
        if (excludedWeekdays.includes(weekday)) {
          const slots = [];
          // const slots = datetime[moment.weekdays(weekday).toLowerCase()]
          const day = currentDate.toDate().getDay();
          if (day === 0) {
            slots.push(...sunday);
          }
          if (day === 1) {
            slots.push(...monday);
          }
          if (day === 2) {
            slots.push(...tuesday);
          }
          if (day === 3) {
            slots.push(...wednesday);
          }
          if (day === 4) {
            slots.push(...thursday);
          }
          if (day === 5) {
            slots.push(...friday);
          }
          if (day === 6) {
            slots.push(...saturday);
          }
          schedule1.push({
            date: dateformat(currentDate.toDate()),
            slot: slots,
          });
          count++;
        }
        currentDate = currentDate.add(1, 'day');
      }

      console.log('schedule1schedule1schedule1schedule1', schedule1);
      return schedule1;
    }
  };

  const timezoneset = (str) => {
    if (
      str === 'Automatically detect and show the times in my invitees time zone'
    ) {
      setzone(userzone);
      return userzone;
    } else if (str === 'Lock the timezone (best for in-person events)') {
      const strValue = formik.values.timezone;
      const [timeOffset, locations] = strValue.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses}`;
      setzone(locationWithoutParentheses);
      return result;
    }
  };
  const dateformat = (originalDate) => {
    const convertedDate = moment(originalDate).format('DD/MM/YYYY');
    return convertedDate;
  };

  function onclose() {
    // formik.values = initial
    // formik.setValues(initial)
    HandleResetForm(formik.values);

    setIsOpen(false);
    // formik.resetForm();

    if (formik.dirty === true) {
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      );
    }
    // useUnsavedChangesWarning();
  }

  const onApplyChange = (sdate, picker) => {
    const startdate = picker.startDate;
    const enddate = picker.endDate;
    if (startdate !== null && enddate !== null) {
      // Both start and end dates are valid, update the selected date range
      setSelectedRange({
        startDate: startdate.format('DD/MM/YYYY'),
        endDate: enddate.format('DD/MM/YYYY'),
      });
      formik.setFieldValue('startdate', startdate.format('DD/MM/YYYY'));
      formik.setFieldValue('enddate', enddate.format('DD/MM/YYYY'));
    } else {
      // Invalid input, clear the selected date range
      setSelectedRange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const currentMonthStart = new Date();
  const initialSettings: Props['initialSettings'] = {
    minDate: currentMonthStart,

    // startdate : selectedRange !== null ? selectedRange : currentMonthStart,
    // enddate : selectedRange !== null ? selectedRange : currentMonthStart,
    // minDate: selectedRange.startDate,
    // endDate: selectedRange.endDate,
  };
  // const initialSettings = {
  //   startDate: selectedRange.startDate !== null ? new Date("2023-09-09") : new Date(), // Set startDate to selectedRange.startDate if not null, else set it to today's date
  //   endDate: selectedRange.endDate !== null ? new Date("2023-09-19") : new Date(),
  // };
  console.log('initialSettings', initialSettings);

  useEffect(() => {
    if (interviewerData.length > 0) {
      const objectsToRemove = teammembers.filter((item) =>
        interviewerData.includes(item.full_name),
      );

      const filteredGoogleCalendars = objectsToRemove.reduce((acc, obj) => {
        if (obj.google_calendar !== null) {
          acc.push(obj.google_calendar);
        }
        if (google === true) {
          acc.push(true);
        }
        return acc;
      }, []);
      console.log(
        'filteredGoogleCalendarsfilteredGoogleCalendars',
        filteredGoogleCalendars,
      );
      if (
        filteredGoogleCalendars.length === 0 &&
        formik.values.event_type === 'Google Hangouts/Meet'
      ) {
        window.confirm(
          'Atleast One interviewer must be integrated to the Google Calendar,Please Select the Another Event_type',
        );
        formik.values.event_type = '';
      }

      // console.log("objectsToRemove",objectsToRemove);
      // objectsToRemove.map((item)=> {
      //   const newArray = []
      //   const newdata = []

      //   if(item.google_calendar === null && google === false){
      //    return(
      //     window.confirm(
      //       'Do you want to leave this site? Changes you made may not be saved.',
      //     )
      //    )
      // newArray.push(item.full_name)
      // newdata.push(item.user.toString())
      // console.log("5555555555555",newArray,newdata)
      // setinterviewerData(newArray)
      // setCheckedItems(newdata)
      //   }else{
      //     console.log("newArraynewArraynewArraynewArraynewArray")
      //   }
      //   console.log("newArraynewArraynewArraynewArraynewArray",newArray,newdata)
      // })
    }else if (google === false && formik.values.event_type === 'Google Hangouts/Meet'){
      window.confirm(
        'Google Calendar is not Integrated Select this option will after the Integration',
      );
      formik.values.event_type = '';
      
    }
  }, [formik.values.event_type]);

  function ErrMessage(timeslot) {
    console.log('&&&&&&&&&&&', timeslot);
    if (timeslot.length === 0) {
      seterrMsg(true);
      const error = 'Please selected the schedule';
      formik.setFieldError('duration', error);
    }
  }

  console.log('i333333333333333333333333333', interviewerData, checkedItems);

  console.log(
    '1234567867543213456789',
    formik.values.timezone.length,
    '\n',
    userzone.length,
  );

  if (loading) {
    <Loader />;
  }

  console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL', errMsg);
  return (
    <Flex>
      <Flex className={styles.createnewlink}>
        <Flex style={{ padding: '0px 25px' }}>
          <Flex className={styles.title}>
            <Text color="theme" bold size={16} style={{ marginBottom: '5px' }}>
              Create Event
            </Text>
          </Flex>
        </Flex>

        <Flex
          style={{
            maxHeight: '480px',
            overflowY: datePickerOpen ? 'hidden' : 'auto',
            padding: '0px 25px',
            minWidth: '620px',
          }}
        >
          <Flex row className={styles.row}>
            <Flex flex={1} marginRight={25}>
              <InputText
                label="Event Name"
                required
                value={formik.values.event_name}
                placeholder="Enter event name"
                style={{ marginTop: '5px' }}
                onChange={(e) => {
                  formik.setFieldValue('event_name', e.target.value);
                  // setButton(false);
                }}
              />
              <ErrorMessage
                name={'event_name'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Flex>
            <Flex flex={1}>
              <LabelWrapper label="Event Type" required>
                <Flex marginTop={5}>
                  <SelectTag
                    id="Event_Type"
                    options={eventType}
                    required
                    value={
                      formik.values.event_type !== ''
                        ? eventType.find(
                            (option) =>
                              option.label === formik.values.event_type,
                          )
                        : null
                    }
                    placeholder="Select event type"
                    onChange={(option) => {
                      eventonChange(option.label);
                      // setButton(false);
                    }}
                  ></SelectTag>

                  <ErrorMessage
                    name={'event_type'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </Flex>
              </LabelWrapper>

              {/* </div> */}
            </Flex>
          </Flex>

          {formik.values.event_type === 'On-site Interview' ? (
            <Flex row className={styles.row}>
              <Flex flex={1}>
                <InputText
                  label="Location"
                  placeholder="Add location"
                  value={formik.values.location}
                  style={{ marginTop: '5px' }}
                  onChange={(e: any) => {
                    formik.setFieldValue('location', e.target.value);
                    // setButton(false);
                  }}
                  className={styles.inputheight}
                />
                <ErrorMessage
                  name={'location'}
                  errors={formik.errors}
                  touched={formik.touched}
                />
              </Flex>
            </Flex>
          ) : (
            ' '
          )}

          <Flex row className={styles.row}>
            <Flex flex={1} marginRight={25}>
              <LabelWrapper label="Duration" required>
                <div style={{ marginTop: 5 }}>
                  <SelectTag
                    options={duration}
                    required
                    placeholder={'Select the Duration'}
                    value={
                      duration
                        ? duration.find(
                            (option) => option.label === formik.values.duration,
                          )
                        : ''
                    }
                    onChange={(option) => {
                      formik.setFieldValue('duration', option.label);
                      onDurationClick(option.label);
                      // setButton(false);
                    }}
                  ></SelectTag>
                  {errMsg ? (
                    <>
                      {console.log('______________', errMsg)}

                      <ErrorMessage
                        name="duration"
                        errors="please select the duration"
                        touched={formik.touched}
                      />
                    </>
                  ) : (
                    <ErrorMessage
                      name={'duration'}
                      errors={formik.errors}
                      touched={formik.touched}
                    />
                  )}
                </div>
              </LabelWrapper>
            </Flex>
            <Flex flex={1}>
              <LabelWrapper label="Choose your Time Zone" required>
                <div style={{ marginTop: 5 }}>
                  <SelectTag
                    required
                    options={timezonesdata}
                    // label="Choose your Time zone"
                    placeholder={'Select your Time zone'}
                    defaultValue={{
                      value: '1', // Replace with the actual value of the user's timezone
                      label: userzone, // Replace with the actual label of the user's timezone
                    }}
                    value={
                      timezonesdata
                        ? timezonesdata.find(
                            (option) => option.label === formik.values.timezone,
                          )
                        : ''
                    }
                    onChange={(option) => {
                      formik.setFieldValue('timezone', option.label);
                    }}
                  ></SelectTag>

                  <ErrorMessage
                    name={'timezone'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </LabelWrapper>
            </Flex>
          </Flex>
          <Flex row className={styles.row} marginRight={25}>
            <Flex flex={1}>
              <LabelWrapper label="Within a date range">
                <div className={styles.dateInput}>
                  <DateRangePicker
                    initialSettings={initialSettings}
                    onApply={(event, picker) => onApplyChange(event, picker)}
                    onShow={() => {
                      setDatePickerOpen(true);
                      setSelectedRange({
                        startDate: selectedRange.startDate,
                        endDate: selectedRange.endDate,
                      });
                    }}
                    onHide={() => setDatePickerOpen(false)}
                  >
                    <input
                      type="dates"
                      className={styles.datePicker}
                      value={
                        selectedRange.startDate && selectedRange.endDate
                          ? `${selectedRange.startDate} - ${selectedRange.endDate}`
                          : ''
                      }

                      // onFocus={() => {
                      //   setDatePicker(true);
                      // }}
                      // onBlur={() => {
                      //   setDatePicker(false);
                      // }}
                    />
                  </DateRangePicker>
                  <Flex marginRight={5} style={{ cursor: 'pointer' }}>
                    <SvgCalendar width={16} height={16} />
                  </Flex>
                </div>
              </LabelWrapper>

              <ErrorMessage
                name={'startdate'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Flex>
          </Flex>
          <div className={styles.line}></div>
          <Flex row center marginBottom={10}>
            <Text size={14} color="theme" className={styles.text1}>
              Interviewers
            </Text>
            <Text size={12} color="theme" style={{ marginLeft: '5px' }}>
              (choose your date for interviews)
            </Text>
          </Flex>

          <Flex row between center>
            <Flex row>
              <Button
                types="secondary"
                style={{
                  border: '1px solid #ccc',
                  borderBottom: 'none',
                  borderRadius: '2px 2px 0px 0px',
                  padding: '5px',
                }}
              >
                <Text color="theme"> {profilename}</Text>
              </Button>
              {interviewerData.map((name: any, index) => (
                <Button
                  key={index}
                  style={{
                    border: '1px solid #ccc',
                    borderBottom: 'none',
                    borderRadius: '2px 2px 0px 0px',
                    padding: '5px',
                  }}
                  types="secondary"
                >
                  <Text color="theme"> {name}</Text>
                </Button>
              ))}
            </Flex>

            {organiser?.length > 0 ? (
              <Flex row center onClick={() => setInterviewer(true)}>
                <SvgRoundAdd width={14} height={14} fill={'#581845'} />
                <Text
                  size={14}
                  bold
                  color="theme"
                  style={{ marginLeft: '5px' }}
                >
                  Add Interviewer
                </Text>
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          {interviewer ? (
            <Modal open={interviewer} onClose={close}>
              <Interviewer
                interviewer={interviewer}
                setInterviewer={setInterviewer}
                interviewerData={interviewerData}
                setinterviewerData={setinterviewerData}
                teammembers={organiser}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                formik={formik.values}
                google={google}
              />
            </Modal>
          ) : (
            ''
          )}
          {/* <div className={styles.line1}></div> */}
          <div className={styles.daytimesplit}>
            <Flex row style={{ border: '1px solid #c3c3c3', padding: '10px' }}>
              <DayTimeSplit
                key={render}
                duration={durationField}
                days={dayField}
                sunday={sunday}
                setSunday={setSunday}
                monday={monday}
                setMonday={setMonday}
                tuesday={tuesday}
                setTuesday={setTuesday}
                wednesday={wednesday}
                setWednesday={setWednesday}
                thursday={thursday}
                setThursday={setThursday}
                friday={friday}
                setFriday={setFriday}
                saturday={saturday}
                setSaturday={setSaturday}
                setrender={setrender}
                include={include}
                sundaycheck={sundaycheck}
                setsundaycheck={setsundaycheck}
                mondaycheck={mondaycheck}
                setmondaycheck={setmondaycheck}
                tuesdaycheck={tuesdaycheck}
                settuesdaycheck={settuesdaycheck}
                wednesdaycheck={wednesdaycheck}
                setwednesdaycheck={setwednesdaycheck}
                thursdaycheck={thursdaycheck}
                setthursdaycheck={setthursdaycheck}
                fridaycheck={fridaycheck}
                setfridaycheck={setfridaycheck}
                saturdaycheck={saturdaycheck}
                setsaturdaycheck={setsaturdaycheck}
                ErrMessage={ErrMessage}
              />
            </Flex>
          </div>
          <ErrorMessage
            name={'availbletimebook'}
            errors={formik.errors}
            touched={formik.touched}
          />
          <div style={{ marginTop: 10 }}>
            <LabelWrapper label="Time Zone Display">
              <div style={{ marginTop: 5 }}>
                <Flex column>
                  {timezonedisplay.map((jobList) => {
                    return (
                      <Flex row key={jobList.value}>
                        <InputRadio
                          label={jobList.label}
                          checked={
                            jobList.label === formik.values.timezonedisplay
                          }
                          onClick={() =>
                            formik.setFieldValue(
                              'timezonedisplay',
                              jobList.label,
                            )
                          }
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </div>
            </LabelWrapper>
          </div>

          <div className={styles.line}></div>
          <Flex flex={1}>
            <InputText
              placeholder="Enter the details that your invitee should know about the event."
              value={formik.values.description}
              onChange={(e) => {
                formik.setFieldValue('description', e.target.value);
              }}
              label="Description/Instructions"
              textarea
              style={{
                border: '1px solid  #b3b3b3',
                borderRadius: '4px',
                // marginBottom: '10px',
                width: '100%',
                marginTop: '5px',
              }}
            />
            <ErrorMessage
              name={'description'}
              errors={formik.errors}
              touched={formik.touched}
            />
          </Flex>
        </Flex>
        <Flex style={{ padding: '0px 25px' }}>
          <div className={styles.line}></div>
        </Flex>
        <Flex style={{ padding: '0px 25px' }}>
          <Flex row end marginTop={20}>
            {saveButton === false ? (
              <Flex row end>
                <Button
                  onClick={onclose}
                  className={styles.cancel}
                  types={'primary'}
                >
                  Cancel
                </Button>
                <Button onClick={formik.handleSubmit}>Create Link</Button>
              </Flex>
            ) : (
              <Flex row end>
                <Button
                  onClick={onclose}
                  className={styles.cancel}
                  types={'primary'}
                >
                  Cancel
                </Button>
                <Button onClick={formik.handleSubmit}>Save</Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateNewEvent;
