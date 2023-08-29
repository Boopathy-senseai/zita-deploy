import { useEffect, useState } from 'react';
import { isEmptyArray, useField, useFormik } from 'formik';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import DateRangePicker, { Props } from 'react-bootstrap-daterangepicker';
import Modal from '../../../uikit/Modal/Modal';
import Flex from '../../../uikit/Flex/Flex';
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
import { LabelWrapper, Loader } from '../../../uikit';
import {
  googleCallApiMiddleware,
  outlookCallApiMiddleware,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import SvgCross from '../../../icons/SvgCross';
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
import 'bootstrap-daterangepicker/daterangepicker.css';
import ConfirmationDialog from './ConfirmDialogBox/ConfirmDialogBox';
import { DataEntity } from './ScheduleTypes';
import IntegrationPopup from './ConfirmDialogBox/IntegrationPopup';

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
  timezonedisplay: timezonedisplay[0].label,
  description: '',
  isactive: true,
  isdeleted: false,
  updatedby: '',
};

type CreateNewEventProps = {
  editModel: DataEntity;
  teammembers: any;
  datetime?: any;
  reset: boolean;
  google: boolean;
  outlook: boolean;
  setIsOpen: (boolean) => void;
  HandleButton: (string) => void;
};

const CreateNewEvent = ({
  editModel,
  teammembers,
  datetime,
  reset,
  google,
  outlook,
  setIsOpen,
  HandleButton,
}: CreateNewEventProps) => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const [interviewer, setInterviewer] = useState(false);
  const [interviewerData, setinterviewerData] = useState([]);
  const [edit_id, setedit_id] = useState(0);
  const [loading, setloading] = useState(false);
  const [saveButton, setsaveButton] = useState(false);

  const [durationField, setDurationField] = useState('');
  const [dayField, setDaysField] = useState('Calendar Days');
  const [organiser, setorganiser] = useState(teammembers ? teammembers : []);
  const [zone, setzone] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [durationOpen, setDurationOpen] = useState(false);
  const [onValid, setonValid] = useState(null);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [onSelectShow, setonSelectShow] = useState({
    startDate: null,
    endDate: null,
  });
  const [loader, setloader] = useState(false);
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
  const [sundaycheck, setsundaycheck] = useState(false);
  const [mondaycheck, setmondaycheck] = useState(true);
  const [tuesdaycheck, settuesdaycheck] = useState(true);
  const [wednesdaycheck, setwednesdaycheck] = useState(true);
  const [thursdaycheck, setthursdaycheck] = useState(true);
  const [fridaycheck, setfridaycheck] = useState(true);
  const [saturdaycheck, setsaturdaycheck] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messageDialog, setMessageDialog] = useState('');
  const [errMsg, seterrMsg] = useState(false);
  const [userzone, setuserzone] = useState('');
  const [changeCount, setChangeCount] = useState(0);
  const [integration, setintegration] = useState(false);
  const [integrationPage, setintegrationPage] = useState(false);
  const [showerrMsg, setShowErrMsg] = useState(false);

  const { user } = useSelector(({ userProfileReducers }: RootState) => ({
    isLoading: userProfileReducers.isLoading,
    user: userProfileReducers.user,
    profile: userProfileReducers.profile,
  }));
  let profilename = user.first_name + ' ' + user.last_name;
  useEffect(() => {
    if (!isEmpty(editModel)) {
      setedit_id(editModel.id);
      setloader(true);
      axios.get(`${eventSchedulerApi}?pk=${editModel.id}`).then((res) => {
        setloading(true);
        if (res.data) {
          let scheduledata = res.data.datetime;
          let interviewdata = res.data.interviewer;
          openModelEdit(editModel, scheduledata, interviewdata);
          setonValid(scheduledata);
        }
        setloading(false);
      });
    } else {
      resetformik();
      formik.resetForm();
    }
    Timeszones();
  }, [duration, datetime, userzone]);

  useEffect(() => {
    if (google === false && outlook === false) {
      setintegration(true);
    }
  }, []);

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
  }, []);
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
    formik.values.timezonedisplay = timezonedisplay[0].label;
    formik.values.description = '';
    formik.values.isactive = true;
    formik.values.isdeleted = false;
  }

  useEffect(() => {
    if (reset) {
      resetformik();
    }
  }, [reset]);

  const conversion = (data: any) => {
    return data.map((obj) => {
      const { day, ...rest } = obj;
      return rest;
    });
  };

  const openModelEdit = (datalist: any, dt: any, intern) => {
    setsaveButton(true);
    if (intern && intern.length > 0) {
      const fullNamesArray = intern?.map((i) => i.full_name);
      const checked = intern?.map((i) => i.name__user.toString());
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
    if (datas.startdate && datas.enddate) {
      setonSelectShow({
        startDate: convertmonth(datas.startdate),
        endDate: convertmonth(datas.enddate),
      });
    }
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
    if (
      datas.times_zone_display ===
      "Automatically detect and show the times in my invitee's time zone"
    ) {
      formik.values.timezonedisplay = timezonedisplay[0].label;
    } else {
      formik.values.timezonedisplay = timezonedisplay[1].label;
    }
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
    setloader(false);
  };

  const handleEventValid = (values: CreateEvent) => {
    const errors: Partial<CreateEvent> = {};
    if (isEmpty(values.event_name.trim())) {
      formik.values.event_name = '';
      errors.event_name = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.event_type.trim())) {
      errors.event_type = THIS_FIELD_REQUIRED;
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

    const days = [
      { day: 'Sunday', array: sunday },
      { day: 'Monday', array: monday },
      { day: 'Tuesday', array: tuesday },
      { day: 'Wednesday', array: wednesday },
      { day: 'Thursday', array: thursday },
      { day: 'Friday', array: friday },
      { day: 'Saturday', array: saturday },
    ];

    const hasEmptyValues = days.some(({ array }) =>
      array.some(
        (item) => item.starttime.trim() === '' || item.endtime.trim() === '',
      ),
    );
    if (hasEmptyValues) {
      setShowErrMsg(true);
    } else {
      setShowErrMsg(false);
    }
    return errors;
  };

  const GoogleCalendar = (label) => {
    if (interviewerData.length === 0) {
      if (google === false && label === 'Google Hangouts/Meet') {
        const message =
          'At least one interviewer must have connected Google Calendar inside Zita. Otherwise, this event type will not be created.';
        setMessageDialog(message);
        setIsDialogOpen(true);
      } else {
        formik.setFieldValue('event_type', label);
      }
    } else {
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

        if (
          filteredGoogleCalendars.length === 0 &&
          label === 'Google Hangouts/Meet'
        ) {
          const message =
            'At least one interviewer must be integrated to the Google Calendar.Otherwise, the video conference will not be created';
          setMessageDialog(message);
          setIsDialogOpen(true);
        } else {
          formik.setFieldValue('event_type', label);
        }
      }
    }
  };
  function handleConfirm() {
    if (
      messageDialog ===
      'Zita Administrator needs to integrate the outlook calendar first'
    ) {
      setIsOpen(false);
      dispatch(outlookCallApiMiddleware()).then((res) => {
        if (res.payload.success === true) {
          window.open(res.payload.authorization_url);
          dispatch(getScheduleMiddleWare(undefined));
        }
      });
    }
    if (
      messageDialog ===
      'Integrate your calendar with zita application to create events'
    ) {
      setIsDialogOpen(false);
      setIsOpen(false);
    }
    if (
      messageDialog ===
      'Google Calendar not be Integrated, Select this option after the Integration'
    ) {
      setIsOpen(false);
      dispatch(googleCallApiMiddleware()).then((res) => {
        window.open(res.payload.url);
        dispatch(getScheduleMiddleWare(undefined));
      });
    }
    if (
      messageDialog ===
      'At least one interviewer must have connected Google Calendar inside Zita. Otherwise, this event type will not be created.'
    ) {
      setIsDialogOpen(false);
    }
    if (messageDialog === 'Select Atleast One Availble Day') {
      setIsDialogOpen(false);
    }
  }

  function handleCancel() {
    if (
      messageDialog ===
      'Zita Administrator needs to integrate the outlook calendar first'
    ) {
      formik.values.event_type = '';
      formik.setFieldValue('event_type', '');
      setIsDialogOpen(false);
    }
    if (
      messageDialog ===
      'Integrate your calendar with zita application to create events'
    ) {
      setIsDialogOpen(false);
    }
    if (
      messageDialog ===
      'Google Calendar not be Integrated, Select this option after the Integration'
    ) {
      setIsDialogOpen(false);
      formik.values.event_type = '';
    }
    if (
      messageDialog ===
      'At least one interviewer must have connected Google Calendar inside Zita. Otherwise, this event type will not be created.'
    ) {
      formik.values.event_type = '';
      setIsDialogOpen(false);
    }
  }

  const eventonChange = (label) => {
    if (label === 'Microsoft Teams') {
      if (label === 'Microsoft Teams' && outlook === true) {
        formik.setFieldValue('event_type', label);
      } else {
        const message =
          'Zita Administrator needs to integrate the outlook calendar first';
        setMessageDialog(message);
        setIsDialogOpen(true);
      }
    }
    if (label === 'On-site Interview' || label === 'Phone Interview') {
      if (google === false && outlook === false) {
        const messsage =
          'Integrate your calendar with zita application to create events';
        setMessageDialog(messsage);
        setIsDialogOpen(true);
      } else {
        formik.setFieldValue('event_type', label);
      }
    }
    if (label === 'Google Hangouts/Meet') {
      GoogleCalendar(label);
    }
  };

  const DateBasedReschedule = () => {
    if (sundaycheck === true) {
      setsundaycheck(false);
    } else {
      setsundaycheck(true);
    }

    if (mondaycheck === true) {
      setmondaycheck(false);
    } else {
      setmondaycheck(true);
    }

    if (tuesdaycheck === true) {
      settuesdaycheck(false);
    } else {
      settuesdaycheck(true);
    }

    if (wednesdaycheck === true) {
      setwednesdaycheck(false);
    } else {
      setwednesdaycheck(true);
    }

    if (thursdaycheck === true) {
      setthursdaycheck(false);
    } else {
      setthursdaycheck(true);
    }

    if (fridaycheck === true) {
      setfridaycheck(false);
    } else {
      setfridaycheck(true);
    }

    if (saturdaycheck === true) {
      setsaturdaycheck(false);
    } else {
      setsaturdaycheck(true);
    }

    if (sundaycheck === true) {
      setsundaycheck(false);
    } else {
      setsundaycheck(true);
    }
  };

  useEffect(() => {
    const days = [
      { day: 'Sunday', array: sunday },
      { day: 'Monday', array: monday },
      { day: 'Tuesday', array: tuesday },
      { day: 'Wednesday', array: wednesday },
      { day: 'Thursday', array: thursday },
      { day: 'Friday', array: friday },
      { day: 'Saturday', array: saturday },
    ];

    const hasEmptyValues = days.some(({ array }) =>
      array.some(
        (item) => item.starttime.trim() === '' || item.endtime.trim() === '',
      ),
    );
    if (hasEmptyValues) {
      setShowErrMsg(true);
    } else {
      setShowErrMsg(false);
    }
  }, [showerrMsg]);

  const handleSubmitForm = (values: CreateEvent) => {
    // setShowErrMsg(true)

    if (showerrMsg === false) {
      const schedulearr = calculateSchedule();
      if (
        sundaycheck === false &&
        mondaycheck === false &&
        tuesdaycheck === false &&
        wednesdaycheck === false &&
        thursdaycheck === false &&
        fridaycheck === false &&
        saturdaycheck === false
      ) {
        const message = 'Select Atleast One Availble Day';
        setMessageDialog(message);
        setIsDialogOpen(true);
      } else if (isEmptyArray(schedulearr)) {
        const reschedule = DateBasedReschedule();
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
          const filteredTimeSlots = sunday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('sunday', JSON.stringify(filteredTimeSlots));
        }
        if (mondaycheck === true) {
          const filteredTimeSlots = monday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('monday', JSON.stringify(filteredTimeSlots));
        }
        if (tuesdaycheck === true) {
          const filteredTimeSlots = tuesday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('tuesday', JSON.stringify(filteredTimeSlots));
        }
        if (wednesdaycheck === true) {
          const filteredTimeSlots = wednesday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('wednesday', JSON.stringify(filteredTimeSlots));
        }
        if (thursdaycheck === true) {
          const filteredTimeSlots = thursday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('thursday', JSON.stringify(filteredTimeSlots));
        }
        if (fridaycheck === true) {
          const filteredTimeSlots = friday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('friday', JSON.stringify(filteredTimeSlots));
        }
        if (saturdaycheck === true) {
          const filteredTimeSlots = saturday.filter(
            (slot) => slot.starttime !== '' && slot.endtime !== '',
          );
          formData.append('saturday', JSON.stringify(filteredTimeSlots));
        }

        formData.append('slot', JSON.stringify(schedulearr));
        if (formik.dirty === false) {
          resetformik();
          formik.initialValues = null;
          formik.values = null;
          setIsOpen(false);
        }
        if (formik.dirty === true) {
          resetformik();
          formik.initialValues = null;
          formik.values = null;
          formik.setFieldValue('event_name', '');
          formik.setFieldValue('event_type', '');
          formik.setFieldValue('duration', '');
          formik.setFieldValue('description', '');
          setIsOpen(false);
          setShowErrMsg(false);
        }
        dispatch(postScheduleMiddleWare({ formData })).then((res) => {
          const ToastMessage = formData.has('pk');
          dispatch(getScheduleMiddleWare(undefined));
          HandleButton(ToastMessage);
        });
      }
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
    if (editModel !== null) {
      if (editModel.duration === option) {
        setChangeCount(1);
      }
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
      while (currentDate.isSameOrBefore(lastDate)) {
        const weekday = currentDate.weekday();
        if (excludedWeekdays.includes(weekday)) {
          const slots = [];
          const day = currentDate.toDate().getDay();
          if (day === 0) {
            const filteredTimeSlots = sunday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 1) {
            const filteredTimeSlots = monday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 2) {
            const filteredTimeSlots = tuesday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 3) {
            const filteredTimeSlots = wednesday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 4) {
            const filteredTimeSlots = thursday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 5) {
            const filteredTimeSlots = friday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          if (day === 6) {
            const filteredTimeSlots = saturday.filter(
              (slot) => slot.starttime !== '' && slot.endtime !== '',
            );
            slots.push(...filteredTimeSlots);
          }
          schedule1.push({
            date: dateformat(currentDate.toDate()),
            slot: slots,
          });
          count++;
        }
        currentDate = currentDate.add(1, 'day');
      }
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
    setShowErrMsg(false);
    if (formik.dirty === true) {
      const validate = window.confirm(
        'You have unsaved changes that will be lost, Are you sure to Proceed ?',
      );
      if (validate) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
    }
  }
  function oneditClose() {
    setShowErrMsg(false);
    if (onValid !== null && formik.dirty === true) {
      const validate = window.confirm(
        'You have unsaved changes that will be lost, Are you sure to Proceed ?',
      );
      if (validate) {
        setIsOpen(false);
        resetformik();
        formik.initialValues = null;
        formik.values = null;
      } else {
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
      resetformik();
      formik.initialValues = null;
      formik.values = null;
    }
  }

  const onApplyChange = (sdate, picker) => {
    const startdate = picker.startDate;
    const enddate = picker.endDate;
    if (startdate !== null && enddate !== null) {
      setSelectedRange({
        startDate: startdate.format('DD/MM/YYYY'),
        endDate: enddate.format('DD/MM/YYYY'),
      });
      formik.setFieldValue('startdate', startdate.format('DD/MM/YYYY'));
      formik.setFieldValue('enddate', enddate.format('DD/MM/YYYY'));
    } else {
      setSelectedRange({
        startDate: null,
        endDate: null,
      });
    }
  };

  const currentMonthStart = new Date();
  const initialSettings: Props['initialSettings'] = {
    minDate: currentMonthStart,
  };

  // useEffect(() => {}, [formik.values.event_type]);

  function ErrMessage(timeslot) {
    if (timeslot.length === 0) {
      seterrMsg(true);
      const error = 'Please select the duration';
      formik.setFieldError('duration', error);
      formik.touched.duration = true;
    } else {
      formik.touched.duration = false;
    }
  }
  const convertmonth = (selectMonth: any) => {
    if (selectMonth) {
      const [dayFrom, monthFrom, yearFrom] = selectMonth.split('/').map(Number);
      const dateFrom = new Date(yearFrom, monthFrom - 1, dayFrom);
      return dateFrom;
    } else {
      return null;
    }
  };

  const handleDateRangePickerShow = (event, picker) => {
    setDatePickerOpen(true);
    if (onSelectShow.startDate !== null && onSelectShow.endDate !== null) {
      picker.startDate = moment(onSelectShow.startDate);
      picker.endDate = moment(onSelectShow.endDate);
    }
  };

  function dateRangeClose() {
    setDatePickerOpen(false);
    setDurationOpen(false);
  }

  function onIntegration() {
    setintegrationPage(true);
  }

  function PopupCancel() {
    setIsOpen(false);
  }

  function removeInterviewer(id){
    interviewerData.splice(id, 1);   
    checkedItems.splice(id, 1)
    setCheckedItems([...checkedItems])
    console.log("checkedItemscheckedItems",checkedItems)  


    setinterviewerData([...interviewerData]);
  }

  const MAX_BUTTONS = 3;
  const MAX_BUTTON_TEXT_WIDTH = 85;


  console.log("interviewerDatainterviewerData",interviewerData)

  return (
    <Flex>
      {loader && <Loader />}
      <Flex className={styles.createnewlink}>
        <Flex style={{ padding: '0px 25px' }}>
          <Flex className={styles.title}>
            <Text  bold size={14} style={{ marginBottom: '5px' }}>
              Create Event
            </Text>
          </Flex>
        </Flex>

        <Flex
          style={{
            maxHeight: '480px',
            overflowY: datePickerOpen ? 'hidden' : 'auto',
            padding: '0px 25px',
            minWidth: '638px',
          }}
        >
          <Flex row className={styles.row}>
            <Flex flex={1} marginRight={25}>
              <InputText
                label="Event Name"
                size={13}
                required
                value={formik.values.event_name}
                placeholder="Enter event name"
                style={{ marginTop: '5px', paddingLeft: '8px' }}
                onChange={(e) => {
                  formik.setFieldValue('event_name', e.target.value);
                }}
              />
              <ErrorMessage
                name={'event_name'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Flex>
            <Flex flex={1}>
              <LabelWrapper label="Event Type" required size={14}>
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
                    placeholder="Select the event type"
                    onChange={(option) => {
                      eventonChange(option.label);
                    }}
                  ></SelectTag>

                  <ErrorMessage
                    name={'event_type'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </Flex>
              </LabelWrapper>
            </Flex>
          </Flex>

          {formik.values.event_type === 'On-site Interview' ? (
            <Flex row className={styles.row}>
              <Flex flex={1}>
                <InputText
                  label="Location"
                  size={13}
                  required
                  placeholder="Add location"
                  value={formik.values.location}
                  style={{ marginTop: '5px', paddingLeft: '8px' }}
                  onChange={(e: any) => {
                    formik.setFieldValue('location', e.target.value);
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
              <LabelWrapper label="Duration" required size={14}>
                <div style={{ marginTop: 5 }} onFocus={() => dateRangeClose()}>
                  <SelectTag
                    options={duration}
                    required
                    placeholder={'Select the duration'}
                    value={
                      formik.values.duration !== ''
                        ? duration.find(
                            (option) => option.label === formik.values.duration,
                          )
                        : ''
                    }
                    onChange={(option) => {
                      formik.setFieldValue('duration', option.label);
                      onDurationClick(option.label);
                    }}
                  ></SelectTag>
                  <ErrorMessage
                    name={'duration'}
                    errors={formik.errors}
                    touched={formik.touched}
                  />
                </div>
              </LabelWrapper>
            </Flex>
            <Flex flex={1}>
              <LabelWrapper label="Choose Your Time Zone" required size={14}>
                <div style={{ marginTop: 5 }}>
                  <SelectTag
                    required
                    options={timezonesdata}
                    placeholder={'Select your Time zone'}
                    defaultValue={{
                      value: '1',
                      label: userzone,
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
              <LabelWrapper label="Within a date range" size={14} required>
                <div className={styles.dateInput}>
                  <DateRangePicker
                    initialSettings={initialSettings}
                    onApply={(event, picker) => onApplyChange(event, picker)}
                    onShow={handleDateRangePickerShow}
                    onHide={() => setDatePickerOpen(false)}
                  >
                    <input
                      type="dates"
                      className={`${styles.datePicker} ${styles.customInput}`}
                      value={
                        selectedRange.startDate && selectedRange.endDate
                          ? `${selectedRange.startDate} - ${selectedRange.endDate}`
                          : ''
                      }
                      placeholder="Choose your date range"
                    />
                  </DateRangePicker>
                  <Flex marginRight={5} style={{ cursor: 'default' }}>
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
            <Text size={13} color="theme" className={styles.text1}>
              Interviewers
            </Text>
            <Text size={12} color="theme" style={{ marginLeft: '5px' }}>
              (choose your date for interviews)
            </Text>
          </Flex>

          <Flex row between center>
            <Flex row className={styles.overflowbtn}>
              <Button
                types="secondary"
                style={{
                  border: '1px solid #ccc',
                  borderBottom: 'none',
                  borderRadius: '2px 2px 0px 0px',
                  padding: '5px',
                  cursor: 'default',
                }}
              >
                <Text color="theme" title={profilename}>
                  {' '}
                  {profilename}
                </Text>
              </Button>

              {interviewerData.slice(0, MAX_BUTTONS).map((name, index) => (
                <Flex key={index} row>
                  <Button
                    key={index}
                    style={{
                      border: '1px solid #ccc',
                      borderBottom: 'none',
                      borderRadius: '2px 2px 0px 0px',
                      padding: '5px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: MAX_BUTTON_TEXT_WIDTH + 'px',
                      cursor: 'default',
                    }}
                    types="secondary"
                  >
                    <Text
                      title={name}
                      color="theme"
                      className={styles.interviewertxt}
                    >
                      {' '}
                      {name}
                    </Text>
                  </Button>
                  <Flex style={{position:"relative"}} marginLeft={-20} onClick={() =>removeInterviewer(index)} >
                    <SvgCross width={10} height={10} fill={'#581845'} />
                  </Flex>
                </Flex>
              ))}
              {interviewerData.length > MAX_BUTTONS && (
                <Button
                  style={{
                    border: '1px solid #ccc',
                    borderBottom: 'none',
                    borderRadius: '2px 2px 0px 0px',
                    padding: '5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: MAX_BUTTON_TEXT_WIDTH + 'px',
                  }}
                  types="secondary"
                >
                  <Text color="theme" className={styles.interviewertxt}>{`+${
                    interviewerData.length - MAX_BUTTONS
                  }`}</Text>
                </Button>
              )}
            </Flex>

            {organiser?.length > 0 ? (
              <Flex
                row
                center
                onClick={() => setInterviewer(true)}
                className={styles.pointer}
              >
                <SvgRoundAdd width={14} height={14} fill={'#581845'} />
                <Text
                  size={14}
                  bold
                  color="theme"
                  style={{ marginLeft: '5px', cursor: 'pointer' }}
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

          <div className={styles.daytimesplit}>
          <Flex row>
            <Flex row style={{ border: '1px solid #c3c3c3', padding: '10px 70px 10px 10px' }}>
              <DayTimeSplit
                duration={durationField}
                days={dayField}
                sunday={sunday}
                monday={monday}
                tuesday={tuesday}
                wednesday={wednesday}
                thursday={thursday}
                friday={friday}
                saturday={saturday}
                setSunday={setSunday}
                setMonday={setMonday}
                setTuesday={setTuesday}
                setWednesday={setWednesday}
                setThursday={setThursday}
                setFriday={setFriday}
                setSaturday={setSaturday}
                sundaycheck={sundaycheck}
                mondaycheck={mondaycheck}
                tuesdaycheck={tuesdaycheck}
                wednesdaycheck={wednesdaycheck}
                thursdaycheck={thursdaycheck}
                fridaycheck={fridaycheck}
                saturdaycheck={saturdaycheck}
                setsundaycheck={setsundaycheck}
                setmondaycheck={setmondaycheck}
                settuesdaycheck={settuesdaycheck}
                setwednesdaycheck={setwednesdaycheck}
                setthursdaycheck={setthursdaycheck}
                setfridaycheck={setfridaycheck}
                setsaturdaycheck={setsaturdaycheck}
                ErrMessage={ErrMessage}
                editModel={editModel}
                onValid={onValid}
                changeCount={changeCount}
                showerrMsg={showerrMsg}
                setShowErrMsg={setShowErrMsg}
              />
            </Flex>
            </Flex>
          </div>
          <ErrorMessage
            name={'availbletimebook'}
            errors={formik.errors}
            touched={formik.touched}
          />
          <div style={{ marginTop: 10 }}>
            <LabelWrapper label="Time Zone Display" size={14}>
              <div style={{ marginTop: 5 }}>
                <Flex column>
                  {timezonedisplay.map((jobList) => {
                    return (
                      <Flex row key={jobList.value} marginTop={3}>
                        <InputRadio
                          label={jobList.label}
                          checked={
                            jobList.label === formik.values.timezonedisplay
                              ? true
                              : false
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
              size={13}
              placeholder="Enter the details that your invitee should know about the event."
              value={formik.values.description}
              onChange={(e) => {
                formik.setFieldValue('description', e.target.value);
              }}
              label="Description/Instructions"
              textarea
              required
              style={{
                width: '100%',
                height: '100%',
                marginTop: '5px',
                paddingLeft: '8px',
                marginBottom: '10px',
              }}
            />
            <div style={{ marginTop: '5px' }}>
              <ErrorMessage
                name={'description'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </div>
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
                  textSize={13}
                >
                  Cancel
                </Button>
                <Button onClick={formik.handleSubmit} textSize={13}>
                  Create Link
                </Button>
              </Flex>
            ) : (
              <Flex row end>
                <Button
                  onClick={oneditClose}
                  className={styles.cancel}
                  types={'primary'}
                  textSize={13}
                >
                  Cancel
                </Button>
                <Button onClick={formik.handleSubmit} textSize={13}>
                  Save
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
        {isDialogOpen && (
          <Modal open={isDialogOpen}>
            <ConfirmationDialog
              message={messageDialog}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </Modal>
        )}
        {google === false && outlook === false && (
          <Modal open={integration}>
            <IntegrationPopup
              message={messageDialog}
              onConfirm={onIntegration}
              onCancel={PopupCancel}
            />
          </Modal>
        )}
      </Flex>
    </Flex>
  );
};

export default CreateNewEvent;
