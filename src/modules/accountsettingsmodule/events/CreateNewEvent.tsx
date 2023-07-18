import { useEffect, useState } from 'react';
import { isEmptyArray, useField, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import DatePicker from 'react-datepicker';
import DateRangePicker, { Props } from 'react-bootstrap-daterangepicker';
// import { DateRangePicker } from 'react-date-range';
import Modal from '../../../uikit/Modal/Modal';
import Toast from '../../../uikit/Toast/Toast';
import { isEmpty } from '../../../uikit/helper';
import { THIS_FIELD_REQUIRED } from '../../constValue';
import SvgCloseSmall from '../../../icons/SvgCloseSmall';
import Flex from '../../../uikit/Flex/Flex';
import { AppDispatch, RootState } from '../../../store';
import Text from '../../../uikit/Text/Text';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import InputRadio from '../../../uikit/InputRadio/InputRadio';
import { userProfileMiddleWare } from '../userprofilemodule/store/middleware/userprofilemiddleware';
import Button from '../../../uikit/Button/Button';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import SvgCopy from '../../../icons/SvgCopy';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import SvgCalendar from '../../../icons/SvgCalendar';
import SvgRoundAdd from '../../../icons/SvgRoundAdd';
import {
  eventType,
  days,
  timezone,
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
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

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
  availbletimebook: string;
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
  availbletimebook : '',
  isactive: true,
  isdeleted: false,
  updatedby: '',
};

const CreateNewEvent = (props) => {
  const {
    modalclose,
    isopen,
    setIsOpen,
    editModel,
    setEditList,
    teammembers,
    datetime,
    setisLoader,
    intern,
  } = props;
  console.log('propsprops_-------', props);
  console.log('propsprops////////////////', props.teammembers);

  // console.log('>>>>', interviewclose);
  const dispatch: AppDispatch = useDispatch();
  const [interviewer, setInterviewer] = useState(false);
  const [interviewerData, setinterviewerData] = useState([]);
  const [edit_id, setedit_id] = useState(0);
  const [include, setinclude] = useState(false);
  const [dateRangeRadio, setdateRangeRadio] = useState(false);
  const [daterange, setDaterange] = useState(0);
  const [saveButton, setsaveButton] = useState(false);
  const [fullname, setfullname] = useState('');
  const [durationField, setDurationField] = useState('');
  const [dayField, setDaysField] = useState('Calendar Days');
  const [organiser, setorganiser] = useState(teammembers ? teammembers : []);
  const [zone, setzone] = useState('');

  console.log('<><><><><><><><><><><><><><><><><><><>', organiser);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  // const [schedata,setschedata] = useState(datetime ? datetime :[])
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
  const [schedule, setSchedule] = useState(
    datetime !== undefined ? datetime : null,
  );
  const [render, setrender] = useState(Date.now());
  const [timezones, setTimezones] = useState([]);
  const [sundaycheck, setsundaycheck] = useState(false);
  const [mondaycheck, setmondaycheck] = useState(true);
  const [tuesdaycheck, settuesdaycheck] = useState(true);
  const [wednesdaycheck, setwednesdaycheck] = useState(true);
  const [thursdaycheck, setthursdaycheck] = useState(true);
  const [fridaycheck, setfridaycheck] = useState(true);
  const [saturdaycheck, setsaturdaycheck] = useState(false);
  const [schedata, setschedata] = useState(datetime !== null ? datetime : null);

  const { user, profile, isLoading } = useSelector(
    ({ userProfileReducers }: RootState) => ({
      isLoading: userProfileReducers.isLoading,
      user: userProfileReducers.user,
      profile: userProfileReducers.profile,
    }),
  );

  console.log('user', user);
  let profilename = user.first_name + ' ' + user.last_name;
  console.log('..........', profilename);
  console.log('PPPPPPPPPPP', organiser);
  console.log('++++++++++++()()()()()()()()()()()()()(0', datetime);

  useEffect(() => {
    // dispatch(userProfileMiddleWare());
    console.log('``````````', datetime, typeof datetime);
    if (!isEmpty(editModel) && datetime !== undefined) {
      openModelEdit(editModel, datetime);
      setedit_id(editModel.id);
      console.log('SSSSSSSSSSSSS', datetime);
    }else{
      // formik.values = initial
      // formik.setValues(initial)
    
    }


    console.log('datetimedatetime===============&&&', datetime);
    // formik.values.timezone = userzone;
    console.log('datetimedatetime', datetime);
  }, [duration, datetime]);

  useEffect(() => {
    // if (duration) {
    //   if (sundaycheck === true && duration && sunday.length > 0) {
    //     alert("slice")
    //     const newData = [[]];
    //     setSunday([{starttime: '', endtime: ''}]);
    //   }
    //   if (saturday.length > 1) {
    //     // alert("slicesatyurday")
    //     const newData = [{ starttime: '9:00AM', endtime: '6:00PM' }];
    //     setSaturday(newData);
    //   }
    // } else if (include === true) {
    //   // setsundaycheck(true)
    //   // setsaturdaycheck(true)
    // }
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
  }, [
    include,
    mondaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    sundaycheck,
    saturdaycheck,
    duration,
  ]);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log('userTimezone', userTimezone);
  const offset = moment.tz(userTimezone).format('Z');
  console.log('offset', offset);
  const userzone = `${moment.tz(userTimezone).format('Z')} (${userTimezone})`;
  console.log('label', userzone);

  const vaio = timezonesdata.find((fil) => fil.label === userzone);
  console.log('vaiovaiovaiovaio', vaio);
  console.log('timezonedata', timezonesdata);


  const conversion = (data: any) => {
    // alert('////////////////');
    console.log('data..........', data);
    return data.map((obj) => {
      const { day, ...rest } = obj; // Destructure the "day" property
      console.log('restrestrest', rest);
      return rest; // Return the object without the "day" property
    });
  };

  const openModelEdit = (datalist: any, dt: any) => {
    console.log('scheduleschedulescheduleschedulescheduleschedule', schedule);
    console.log('schedataschedataschedataschedata', schedata);
    console.log('dtdtdtdtdtdtdtdtdtdtdtdtdt', dt);
    setsaveButton(true);
    console.log('???????________', intern);
    if (intern && intern.length > 0) {
      const fullNamesArray = intern?.map((i) => i.full_name);
      const userid = intern?.map((i) => i.name__user);
      console.log('fullNamesArrayfullNamesArrayfullNamesArray', fullNamesArray);
      setinterviewerData(fullNamesArray);
      setCheckedItems(userid);
    } else {
      setinterviewerData([]);
      // setCheckedItems([]);
    }
    const datas = datalist;
    console.log('datasdatasdatas', datas);
    formik.values.event_name = datas.event_name;
    formik.values.event_type = datas.event_type;
    console.log('@@@@@@@', datas.event_type);
    formik.values.location = datas.location;
    formik.values.days = datas.days;
    selectedRange.endDate = datas.enddate;
    selectedRange.startDate = datas.startdate;
    formik.values.startdate = datas.startdate;
    formik.values.enddate = datas.enddate;
    console.log('datas.startdate',datas.startdate,datas.enddate)
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
      console.log('sunday++++++++++++++++++++++++', dt);
      if (dt && dt.sunday && dt.sunday.length > 0) {
        const editsunday = conversion(dt.sunday);
        console.log('editsunday', editsunday);
        setSunday(editsunday);
        setsundaycheck(true);
      } else {
        setsundaycheck(false);
      }
      if (dt && dt.monday && dt.monday.length > 0) {
        const editmonday = conversion(dt.monday);
        console.log('editmonday', editmonday);
        setMonday(editmonday);
        setmondaycheck(true);
      } else {
        setmondaycheck(false);
      }
      if (dt && dt.tuesday && dt.tuesday.length > 0) {
        const edittuesday = conversion(dt.tuesday);
        console.log('edittuesday', edittuesday);
        setTuesday(edittuesday);
        settuesdaycheck(true);
      } else {
        settuesdaycheck(false);
      }
      if (dt && dt.wednesday && dt.wednesday.length > 0) {
        const editwednesday = conversion(dt.wednesday);
        console.log('editwednesday', editwednesday);
        setWednesday(editwednesday);
        setwednesdaycheck(true);
      } else {
        setwednesdaycheck(false);
      }
      if (dt && dt.thursday && dt.thursday.length > 0) {
        const editthursday = conversion(dt.thursday);
        console.log('editthursday', editthursday);
        setThursday(editthursday);
        setthursdaycheck(true);
      } else {
        setthursdaycheck(false);
      }
      if (dt && dt.friday && dt.friday.length > 0) {
        const editfriday = conversion(dt.friday);
        console.log('editfriday', editfriday);
        setFriday(editfriday);
        setfridaycheck(true);
      } else {
        setfridaycheck(false);
      }
      if (dt && dt.saturday && dt.saturday.length > 0) {
        alert('******');
        const editsaturday = conversion(dt.saturday);
        console.log('editsaturday', editsaturday);
        setSaturday(editsaturday);
        setsaturdaycheck(true);
      } else {
        setsaturdaycheck(false);
      }
      console.log('sunday********************************', dt.sunday);
      // setSunday(datetime.sunday)
      // setMonday(datetime.monday)
      // setTuesday(datetime.tuesday)
      // setWednesday(datetime.wednesday)
      // setThursday(datetime.thursday)
      // setFriday(datetime.friday)
      // setSaturday(datetime.saturday)
    }

    console.log('datatatatatatata', datas.enddate, typeof datas.enddate);
    console.log('new Date(datas.enddate)', new Date(datas.enddate));
    console.log('selectedRangeselectedRange', selectedRange);
    console.log('datayayayayayaya', sunday);

    console.log('formikformik', formik.values);

    // setEditList();
  };

  const handleEventValid = (values: CreateEvent) => {
    console.log("[[[[[[[[[[[[[[",sundaycheck,mondaycheck,tuesdaycheck,wednesdaycheck,thursdaycheck,fridaycheck,saturdaycheck)
    console.log('<><><><><><><><><>', values);
    const errors: Partial<CreateEvent> = {};
    if (isEmpty(values.event_name.trim())) {
      formik.values.event_name = '';
      errors.event_name = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.event_type.trim())) {
      errors.event_type = THIS_FIELD_REQUIRED;
    }
    // if (isEmpty(values.dateRange)) {
    //   errors.dateRange = THIS_FIELD_REQUIRED;
    // }
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
    // if (isEmpty(values.enddate)) {
    //   errors.enddate = 'Enddate Required';
    // }
    if (isEmpty(values.duration)) {
      errors.duration = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.timezone)) {
      formik.values.timezone = userzone;
    }
    if (isEmpty(values.timezonedisplay)) {
      errors.timezonedisplay = THIS_FIELD_REQUIRED;
    }
    // if (isEmpty(values.interviewer)) {
    //   errors.interviewer = THIS_FIELD_REQUIRED;
    // }
    //   if (isEmpty(values.schedule)) {
    //     errors.schedule = THIS_FIELD_REQUIRED;
    //   }
    if (isEmpty(values.description.trim())) {
      formik.values.description = '';
      errors.description = THIS_FIELD_REQUIRED;
    }
    if(sundaycheck === false || mondaycheck === false || tuesdaycheck === false || wednesdaycheck === false || thursdaycheck === false || fridaycheck === false || saturdaycheck === false ){
      formik.values.availbletimebook ='';
      errors.availbletimebook = "Please Select The Alteast One AvailbleDay"
    }
    console.log('errorserrorserrorserrors', errors);
    return errors;
  };

  const handleDateChange = (date) => {
    alert(date);
    // console.log('||||+++++ ', date,dat1);
    // if (date !== undefined && date !== null) {
    //   const [startDateStr, endDateStr] = date.split(' - ');
    //   console.log('startDateStr, endDateStr', startDateStr, endDateStr);
    //   setSelectedRange({
    //     startDate: moment(startDateStr, 'MM/DD/YYYY'),
    //     endDate: moment(endDateStr, 'MM/DD/YYYY'),
    //   });
    // } else {
    //   setSelectedRange({
    //     startDate: null,
    //     endDate: null,
    //   });
    // }

    if (!selectedRange.startDate || selectedRange.endDate) {
      // If no start date is selected, or both start and end dates are already selected, set the start date
      setSelectedRange({
        startDate: date,
        endDate: null,
      });

      alert('./');
      formik.setFieldValue('startdate', formatDate(date));
      console.log('formik.setFieldvalue', formik);
    } else if (date <= selectedRange.startDate) {
      alert('e');
      // If a start date is already selected, and the new date is less than or equal to the start date, update the start date
      setSelectedRange({
        startDate: date,
        endDate: selectedRange.endDate,
      });

      formik.setFieldValue('enndate', formatDate(date));
    } else {
      setSelectedRange({
        startDate: selectedRange.startDate,
        endDate: date,
      });
      console.log(
        'datedatedatedatedatedatedatedatedatedatedatedate',
        formatDate(date),
      );
      formik.setFieldValue('enddate', formatDate(date));  
      console.log('...............', formik.values.enddate);
    }
  };

  const ondatepickercancel = () => {
    setSelectedRange({
      startDate: null,
      endDate:null,
  })
  };

  const handleInputChange = (e) => {
    alert('1');
    const inputText = e.target.value;
    const [startDateString, endDateString] = inputText.split(' - ');
    const startDate = moment(startDateString, 'MM/DD/YYYY');
    const endDate = moment(endDateString, 'MM/DD/YYYY');

    if (startDate.isValid() && endDate.isValid()) {
      // Both start and end dates are valid, update the selected date range
      setSelectedRange({
        startDate: startDate.startOf('day'),
        endDate: endDate.endOf('day'),
      });
    } else {
      // Invalid input, clear the selected date range
      setSelectedRange({
        startDate: null,
        endDate: null,
      });
    }
  };
  const formatDate = (date) => {
    return date ? date.toLocaleDateString() : '';
  };

  console.log('selectedRangeselectedRange', selectedRange);
  const getInitials = (name: any) => {
    // name = JSON.parse(name);
    if (name !== undefined) {
      var parts = name.split(' ');
      var initials = '';
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
          initials += parts[i][0];
        }
      }
      return initials;
    }
  };

  const handleSubmitForm = (values: CreateEvent) => {
    console.log('inclucdeee', include);
    alert(edit_id);
    console.log('valuesss', values);
    const userid = [];
    userid.push(user.id);
    console.log('interviewerData', userid);
    console.log('checkedItems', checkedItems);
    console.log('<><><><><><><><>,', checkedItems);
    const mergedArray =
      checkedItems.length === 0 ? userid : [...userid, ...checkedItems];
    console.log('membersmembersmembers', mergedArray);
    alert('createlink');
    console.log(
      'event_nameevent_name',
      values.event_name.trim(),
      values.event_name.trim().length,
    );
    const formData = new FormData();
    if (edit_id > 0) {
      alert('<><><>');
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
    // if (
    //   include === false &&
    //   (mondaycheck ||
    //     tuesdaycheck ||
    //     wednesdaycheck ||
    //     thursdaycheck ||
    //     fridaycheck)
    // ) {
    //   // if(sundaycheck === false && include === false){
    //   //   formData.append('sunday', JSON.stringify(sunday)); }
    //   if (mondaycheck === true) {
    //     formData.append('monday', JSON.stringify(monday));
    //   }
    //   if (tuesdaycheck === true) {
    //     formData.append('tuesday', JSON.stringify(tuesday));
    //   }
    //   if (wednesdaycheck === true) {
    //     formData.append('wednesday', JSON.stringify(wednesday));
    //   }
    //   if (thursdaycheck === true) {
    //     formData.append('thursday', JSON.stringify(thursday));
    //   }
    //   if (fridaycheck === true) {
    //     formData.append('friday', JSON.stringify(friday));
    //   }
    //   // if (saturdaycheck === false && include === false){
    //   //   formData.append('saturday', JSON.stringify(saturday));  }
    // }
    // if (include === true && sundaycheck === true && saturdaycheck === true) {
    alert('sundaychecksundaychecksundaycheck');
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
    const schedulearr =  calculateSchedule();
    console.log("schedulearrschedulearr",schedulearr)
    formData.append('slot',JSON.stringify(schedulearr))
    dispatch(postScheduleMiddleWare({ formData })).then((res: any) => {
      console.log('resresresres,><><><>,', res.payload.data.message);
      setisLoader(true);
      if (res.payload.data.message === 'Created Event Successfully') {
        Toast('Event Created Successfully!');
        dispatch(getScheduleMiddleWare(undefined));
        axios.get(`${eventSchedulerApi}`)
        setisLoader(false);
      }
      if (res.payload.data.message === 'Updated Event Successfully') {
        Toast('Updated Event Successfully!');
        dispatch(getScheduleMiddleWare(undefined));
        setisLoader(false);
      }
    });
    setIsOpen(false);
    console.log('formdata', formData);
    console.log(
      '[[[',
      formik.values.event_name,
      formik.values.event_name.length,
      );
      console.log('[[[[[[[[[[[[[', formik.values);   
  };

  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    onSubmit: (values) => handleSubmitForm(values),
    validate: handleEventValid,
    
  }); 

  console.log('***************', formik.isValid);
  console.log('***************editModel', editModel);
  console.log('dateRangeRadio', daterange, typeof daterange, typeof daterange);
  console.log('formik.values', formik.values);
  console.log('formik..........', formik);
  console.log('dayField', dayField);

  const onDurationClick = (option: any) => {
    if (option === '1 hour') {
      let value = '60 Minutes';
      setDurationField(value);
    } else {
      setDurationField(option);
    }
  };
  const convertion = (dateStr)=> {
    const momentObj = moment(dateStr, 'DD/MM/YYYY');
    const formattedDate = momentObj.format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    console.log("?????????????",formattedDate);
    return formattedDate
  } 


  const calculateSchedule = () => {
    alert("calculateSchedulecalculateSchedule")
    console.log("@@@@@@@@@@sunday",sunday,"\n","monday",monday,"\n","tuesday",tuesday,
    "\n","wednesday",wednesday,"\n","thursday",thursday,"\n","friday",friday,"\n","saturdday",saturday)
    const excludedWeekdays = [];
    if (sundaycheck === true) {
      excludedWeekdays.push(0);
    }
    if (
      mondaycheck === true
    ) {
      excludedWeekdays.push(1);
    }
    if (
      tuesdaycheck === true
    ) {
      excludedWeekdays.push(2);
    }
    if (
      wednesdaycheck === true
    ) {
      excludedWeekdays.push(3);
    }
    if (
      thursdaycheck === true
    ) {
      excludedWeekdays.push(4);
    }
    if (
      fridaycheck === true
    ) {
      excludedWeekdays.push(5);
    }
    if (
      saturdaycheck === true
    ) {
      excludedWeekdays.push(6);
    }
    
    if ( formik.values.timezone !== null && formik.values.timezone !== undefined) {
      alert("!@##")
      const tzone = timezoneset(formik.values.timezonedisplay);
      console.log("tzonetzonetzonetzonetzonetzonetzonetzone",tzone)
      const schedule1 = [];
      const startdate = convertion(formik.values.startdate)
      const enddate = convertion(formik.values.enddate)
      console.log("selectedRangeselectedRangeselectedRangeselectedRange",selectedRange,formik.values)
      let currentDate = moment.tz(startdate, tzone).startOf('day');
      const lastDate = moment.tz(enddate, tzone).startOf('day');
      console.log("currentDatecurrentDate",currentDate.toDate(),lastDate,excludedWeekdays)

      let count = 0;
      // let currentArray = dateformat(currentDate);
      // console.log("currentArraycurrentArray",currentArray)
  
      while (currentDate.isSameOrBefore(lastDate)) {
        const weekday = currentDate.weekday()
        console.log("schedulearrschedulearr...........",weekday,excludedWeekdays)
        if (excludedWeekdays.includes(weekday)) {          
          const slots = [];  
          // const slots = datetime[moment.weekdays(weekday).toLowerCase()]  
          console.log("currentDatecurrentDate.toDate()",currentDate.toDate())
          const day = currentDate.toDate().getDay()        
          if (day === 0){
          slots.push(...sunday)  
          }
          if (day === 1){
            slots.push(...monday)  
          }
          if (day === 2){
            slots.push(...tuesday)  
          }
          if (day  === 3){
            slots.push(...wednesday)  
          }
          if (day===4){
              slots.push(...thursday)  
          }
          if (day===5){
            slots.push(...friday)  
          }
            if (day===6){
              slots.push(...saturday)  
          }
         console.log("schedulearrschedulearrslots",slots)
         schedule1.push(
            {
              'date':dateformat(currentDate.toDate()),
              'slot' : slots
            }            
            );
          count++;
        }
        currentDate = currentDate.add(1, 'day');
      }
      console.log("schedule1schedule1",schedule1)
      return schedule1;

    }
  };

  const timezoneset = (str) => {
    // console.log('>?>?>?>?>?>?', str);
    // const display = data.map((li : any )=>li.times_zone_display)
    if (
      str  === 'Automatically detect and show the times in my invitees time zone'
    ) {
      // const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // console.log('userTimezone', userTimezone);
      // const offset = moment.tz(userTimezone).format('Z');
      // console.log('offset', offset);
      // const userzone = `${userTimezone} (${offset})`;
      // console.log('label', userzone);
      console.log("userTimezoneuserTimezone",userTimezone)
      setzone(userTimezone);
      return userzone;
    } else if ( str === 'Lock the timezone (best for in-person events)') {
      // // console.log()

      // const [timeOffset, locations] = "+13:00 (Pacific/Apia)";
      // // Extract the location without parentheses
      // const locationWithoutParentheses = locations.slice(1, -1);
      // // Create the desired string format: "(Location) Time Offset"
      // const result = `${locationWithoutParentheses} (${timeOffset})`;
      // console.log("result",result);
      // settimezone(locationWithoutParentheses)
      // return result
      const strValue = formik.values.timezone;
      const [timeOffset, locations] = strValue.split(' ');
      const locationWithoutParentheses = locations.slice(1, -1);
      const result = `${locationWithoutParentheses}`;
      console.log('result', result);
      setzone(locationWithoutParentheses);
      return result

    }
  };
  const dateformat = (originalDate) => {
    // const originalDate = "Wed Jul 12 2023 05:30:00 GMT+0530 (India Standard Time)";
  const convertedDate = moment(originalDate).format('DD/MM/YYYY');
  
  console.log("convertedDate",convertedDate);
  return convertedDate
  }
  function onclose(){
    // formik.values = initial   
    // formik.setValues(initial) 
    setIsOpen(false)

  }
  
  const onApplyChange = (sdate,picker) => {
    alert(picker)
    const startdate = picker.startDate;
    const enddate = picker.endDate;
    console.log("pickerpicker",startdate,enddate)
    console.log("pickerpicker",picker.endDate._d)
    if (startdate !== null && enddate !== null) {
      // Both start and end dates are valid, update the selected date range
      setSelectedRange({
        startDate: startdate.format('DD/MM/YYYY'),
        endDate: enddate.format('DD/MM/YYYY'),
      });
      formik.setFieldValue('startdate', startdate.format('DD/MM/YYYY'))
      formik.setFieldValue('enddate',enddate.format('DD/MM/YYYY'))
      
    } else {
      // Invalid input, clear the selected date range
      setSelectedRange({
        startDate: null,
        endDate: null,
      });
        }
  }

  const currentMonthStart = new Date();
  const initialSettings: Props['initialSettings'] = {
    minDate: currentMonthStart,
  };

  return (
    <>
      {console.log('includeincludeinclude', include, typeof include)}
      {console.log(
        'datetimedatetime===============',
        datetime,
        typeof datetime,
      )}
      {console.log(
        'sundaysundaysundaysunday===============',
        sunday,
        '\n',
        monday,
      )}
      {console.log('////////////////////////////////', sunday, '\n', monday)}
      {console.log('schedataschedataschedata', schedata, datetime)}
      {console.log('****************', selectedRange)}
      {console.log("()()()()()(~~~~~",formik.values)}
      {console.log("zone123",zone)}


      <Flex>
        <div className={styles.createnewlink}>
          {}
          <Flex row>
            <Text className={styles.text1} size={16}>
              Create Event
            </Text>
          </Flex>

          <div style={{ width: '80%' }}>
            <br />
            <Flex row className={styles.row}>
              <Flex marginRight={'45px'}>
                <div
                  className={styles.inputtextbox}
                  // style={{ width: '302px' }}
                >
                  <Text bold size={14} className={styles.text1}>
                    Event Name* <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <InputText
                    value={formik.values.event_name}
                    placeholder="Enter event name"
                    onChange={(e) => {
                      // console.log("trimmedValue-eeeeeeee",e.target.value,e.target.value.length)
                      // const trimmedValue = e.target.value.trim();
                      // console.log("trimmedValue",trimmedValue,trimmedValue.length)
                      formik.setFieldValue('event_name', e.target.value);
                      // setButton(false);
                    }}
                  />
                  <ErrorMessage
                    name={'event_name'}
                    errors={formik.errors}
                    touched={formik.touched}
                  /> 
                </div>
              </Flex>
              <Flex>
                <div className={styles.inputtextbox}>
                  <Text bold size={14} className={styles.text1}>
                    Event Type*
                    <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <SelectTag
                    id="Event_Type"
                    options={eventType}
                    // label="Event Type"
                    // required
                    value={
                      eventType
                        ? eventType.find(
                            (option) =>
                              option.label === formik.values.event_type,
                          )
                        : ''
                    }
                    placeholder="Select event type"
                    onChange={(option) => {
                      formik.setFieldValue('event_type', option.label);
                      // setButton(false);
                    }}
                  ></SelectTag>

                  <ErrorMessage
                    name={'event_type'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </Flex>
            </Flex>

            {formik.values.event_type === 'On-site Interview' ? (
              <Flex row className={styles.row}>
                <div className={styles.location}>
                  <Text bold size={14} className={styles.text1}>
                    Location
                    <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <InputText
                    // label="Location"
                    placeholder="Add location"
                    value={formik.values.location}
                    onChange={(e: any) => {
                      formik.setFieldValue('location', e.target.value);
                      // setButton(false);
                    }}
                  />
                  <ErrorMessage
                    name={'location'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </Flex>
            ) : (
              ' '
            )}

            <Flex row className={styles.row}>
              <Flex row>
                <div className={styles.inputtextbox}>
                  <Text bold size={14} className={styles.text1}>
                    Duration*
                    <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <SelectTag
                    options={duration}
                    // label="Duration"
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
                  <ErrorMessage
                    name={'duration'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </Flex>
              <div style={{ marginLeft: '45px' }}></div>
              <Flex>
                <div className={styles.inputtextbox}>
                  <Text bold size={14} className={styles.text1}>
                    Choose your Time Zone
                    <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <SelectTag
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
                      //  timezonesdata.find(
                      //   (option) =>
                      //     option.label === userzone,
                      // )
                    }
                    onChange={(option) => {
                      formik.setFieldValue('timezone', option.label);
                      // setButton(false);
                    }}
                  ></SelectTag>
                  <ErrorMessage
                    name={'timezone'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </Flex>
            </Flex>
            <Flex row className={styles.row}>
              <Flex row>
                <div className={styles.inputtextbox}>
                  <Text bold size={14} className={styles.text1}>
                    Within a date range
                    <br />
                  </Text>
                  <div style={{ marginTop: '10px' }}></div>
                  <Flex row>
                    <div>
                      {/* <DatePicker
                      onChange={handleDateChange}
                      // onChange={()=>{
                      //     handleDateChange
                      // formik.setFieldValue("startDate",selectedRange.startDate)
                      // formik.setFieldValue("enddate",selectedRange.endDate)
                      // }}
                      // value={formatDate(selectedRange.endDate)}
                      // value={
                      //   selectedRange.startDate !== null
                      //     ? `${formatDate(
                      //         selectedRange.startDate,
                      //       )} - ${formatDate(selectedRange.endDate)}`
                      //     : ''
                      // }
                      // value={
                      //   formik.values.startdate
                      //     ? `${formatDate(formik.values.startdate)} - ${formatDate(formik.values.enddate )}`
                      //     : ""
                      // }
                      // highlightDates={
                      //   [
                      //   {
                      //     startDate: selectedRange.startDate, // Start date of the selected range
                      //     endDate: selectedRange.endDate, // End date of the selected range
                      //   },
                      // ]}

                      selectsStart
                      startDate={selectedRange.startDate}
                      endDate={selectedRange.endDate}
                      placeholderText="Choose your date range"
                      minDate={minSelectableDate}
                      maxDate={maxSelectableDate}
                      className="my-datepicker"
                      customInput={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            style={{ width: '250px' }}
                            className="my-datepicker-custom-input"
                            placeholder="Choose your date range"
                            value={
                              selectedRange.startDate !== null
                                ? `${formatDate(
                                    selectedRange.startDate,
                                  )} - ${formatDate(selectedRange.endDate)}`
                                : ''
                            }
                          />

                          <div
                            style={{
                              position: 'absolute',
                              top: '50%',
                              right: '10px',
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <SvgCalendar
                              fill="#581845"
                              height={16}
                              width={16}
                            />
                          </div>
                        </div>
                      }
                    /> */}
                        <DateRangePicker   
                         initialSettings={initialSettings}     
                                                      
                         onApply={(event,picker)=>onApplyChange(event,picker)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="dates"
                            // className="form-control"
                            style={{
                              fontSize: '16px',
                              width: '250px',
                              paddingRight: '40px',
                              height: '32px',
                            }}
                            value={
                              selectedRange.startDate && selectedRange.endDate
                                ? `${selectedRange.startDate} - ${selectedRange.endDate}`
                                : ''
                            }
                            // disabled={true}
                          
                          />

                          <SvgCalendar fill="#581845" height={16} width={16} />
                        </div>
  

                      </DateRangePicker>
                      
                 
                      <Flex>
                        <ErrorMessage
                          name={'startdate'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
                      </Flex>
                    </div>
                  </Flex>
                </div>
              </Flex>
            </Flex>
            <div style={{ marginTop: '20px' }}></div>
            <div className={styles.line}></div>
            <div style={{ marginTop: '10px' }}></div>
          </div>
          <Text size={14} bold className={styles.text1}>
            Interviewers
          </Text>
          <Text style={{ marginLeft: '10px' }}>
            (choose your date for interviews)
          </Text>
          <div style={{ marginTop: '10px' }}></div>
          <Flex row>
            <div
              style={{
                height: '20px',
                width: profilename.length > 10 ? '100px' : '80px',
                border: 'solid 1px #b3b3b3',
                padding: ' 8 8 8 8px',
              }}
            >
              <Text
                style={{
                  border: '10px',
                  borderBlock: '10px',
                  marginLeft: '10px',
                }}
              >
                {profilename}
              </Text>
            </div>
            {interviewerData.map((name: any) => (
              <Flex row key={1}>
                <Flex row center>
                  <div
                    style={{
                      height: '20px',
                      width: name.length > 7 ? '100px' : '80px',
                      border: 'solid 1px #b3b3b3',
                      padding: ' 8 8 8 8px',
                    }}
                  >
                    <Text
                      style={{
                        border: '10px',
                        borderBlock: '10px',
                        marginLeft: '10px',
                      }}
                    >
                      {name}
                    </Text>
                  </div>
                </Flex>
              </Flex>
            ))}
            <div>
              <Flex>
                {organiser?.length > 0 ? (
                  <button
                    onClick={() => setInterviewer(true)}
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '400px',
                    }}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    <Text>Add Interviewer</Text>
                  </button>
                ) : (
                  ''
                )}
              </Flex>
              <Flex>
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
                    />
                  </Modal>
                ) : (
                  ''
                )}
              </Flex>
            </div>
          </Flex>
          <div className={styles.line1}></div>
          <div style={{ marginTop: '20px' }}></div>
          <div className={styles.daytimesplit}>
            <Flex row>
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
                // setinclude={setinclude}
              />
            </Flex>
          </div>
          <ErrorMessage
                    name={'availbletimebook'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />

          <div
            style={{
              width: '100%',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Text bold size={14} className={styles.text1}>
              Time Zone Display
              <br />
            </Text>

            <Flex column>
              {timezonedisplay.map((jobList) => {
                return (
                  <Flex row key={jobList.value}>
                    <InputRadio
                      // label={`Option 1 | Option 2 | Option 3`}
                      label={jobList.label}
                      checked={jobList.label === formik.values.timezonedisplay}
                      onClick={() =>
                        formik.setFieldValue('timezonedisplay', jobList.label)
                      }
                      // style={{ display: 'flex', flexDirection: 'column' }}
                    />
                  </Flex>
                );
              })}
            </Flex>
          </div>

          <div className={styles.line}></div>
          <div style={{ marginTop: '10px' }}></div>

          <div className={styles.inputtextbox}>
            <Text bold size={14} className={styles.text1}>
              Description/Instructions
            </Text>
            <div style={{ marginTop: '10px' }}></div>
            <Flex>
              <InputText
                placeholder="Enter the details that your invitee should know about the event."
                value={formik.values.description}
                onChange={(e) => {
                  formik.setFieldValue('description', e.target.value);
                }}
                style={{
                  border: '1px solid  #b3b3b3',
                  borderRadius: '4px',
                  height: '79px',
                  marginBottom: '5px',
                  width: '637px',
                  // marginTop: '10px',
                  // marginLeft: '10px',
                  paddingTop: '10px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                }}
              />
              {/* <textarea
                placeholder="Enter the details that your invitee should know about the event."
                value={formik.values.description}
                onChange={(e) => {
                  formik.setFieldValue('description', e.target.value);
                }}
                style={{
                  border: '1px solid  #b3b3b3',
                  borderRadius: '4px',
                  height: '79px',
                  marginBottom: '5px',
                  width: '637px',
                  paddingTop :  '10px',
                  textAlign: 'left',                
                }}/> */}

              {/* </textarea> */}
              <ErrorMessage
                name={'description'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Flex>
          </div>
          <div className={styles.line}></div>
          <div style={{ marginTop: '20px' }}></div>

          <div>
            <Flex row className={styles.button1}>
              <div>
                {saveButton === false ? (
                  <Flex>
                    <Button
                      onClick={formik.handleSubmit}
                      // disabled={!formik.isValid}
                    >
                      Create Link
                    </Button>
                  </Flex>
                ) : (
                  <Flex>
                    <Button
                      onClick={formik.handleSubmit}
                      // disabled={!formik.isValid}
                    >
                      Save
                    </Button>
                  </Flex>
                )}
                {/* )} */}
              </div>
              <div
                style={{
                  marginLeft: '40px',
                }}
              >
                <Button onClick={onclose} types={'secondary'}>
                  Cancel
                </Button>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>
    </>
  );
};

const CustomInput = ({ value, onClick}) => {
  return(
    <>
      <input
        className="my-input"
        type="text"
        onClick={onClick}
        // value={`${startDate} - ${endDate}`}
      />
    </>
  )  
    
}
export default CreateNewEvent;
