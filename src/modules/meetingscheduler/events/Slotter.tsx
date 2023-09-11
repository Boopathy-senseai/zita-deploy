import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { AppDispatch, RootState } from '../../../store';
import 'react-day-picker/dist/style.css';
import Flex from '../../../uikit/Flex/Flex';
import { availbleslot } from '../../../routes/apiRoutes';
import {
  googleAddEventMiddleware,
  outlookAddEventMiddleware,
  getGoogleConflictMiddleWare,
  getOutlookConflictMiddleWare,
} from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import styles from './slotter.module.css';
import {
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from './store/middleware/eventmiddleware';
import './DayPickerCustomStyles.css';
import InterviewDashBoard from './InterviewDashBoard';
import Conformpage from './ConformPage';
import SlotterDate from './SlotterDatepick';

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

export default Slotter;
