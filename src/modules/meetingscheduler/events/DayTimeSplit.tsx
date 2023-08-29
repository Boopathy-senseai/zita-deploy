import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import SvgEventcopy from '../../../icons/SvgEventcopy';
import SvgRoundAdd from '../../../icons/SvgRoundAdd';
import Button from '../../../uikit/Button/Button';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import SvgCross from '../../../icons/SvgCross';
import styles from './daytimesplit.module.css';

type Props = {
  duration: string;
  days: string;
  editModel: any;
  onValid: any;
  changeCount: number;
  showerrMsg: boolean;
  setShowErrMsg: (boolean) => void;
  sunday: any;
  monday: any;
  tuesday: any;
  wednesday: any;
  thursday: any;
  friday: any;
  saturday: any;
  setSunday: ([]) => void;
  setMonday: ([]) => void;
  setTuesday: ([]) => void;
  setWednesday: ([]) => void;
  setThursday: ([]) => void;
  setFriday: ([]) => void;
  setSaturday: ([]) => void;
  sundaycheck: boolean;
  mondaycheck: boolean;
  tuesdaycheck: boolean;
  wednesdaycheck: boolean;
  thursdaycheck: boolean;
  fridaycheck: boolean;
  saturdaycheck: boolean;
  ErrMessage: (string) => void;
  setsundaycheck: (boolean) => void;
  setmondaycheck: (boolean) => void;
  settuesdaycheck: (boolean) => void;
  setwednesdaycheck: (boolean) => void;
  setthursdaycheck: (boolean) => void;
  setfridaycheck: (boolean) => void;
  setsaturdaycheck: (boolean) => void;
};

const DayTimeSplit = ({
  duration,
  days,
  editModel,
  onValid,
  changeCount,
  showerrMsg,
  setShowErrMsg,
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sundaycheck,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
  mondaycheck,
  tuesdaycheck,
  wednesdaycheck,
  thursdaycheck,
  fridaycheck,
  saturdaycheck,
  setsundaycheck,
  setmondaycheck,
  settuesdaycheck,
  setwednesdaycheck,
  setthursdaycheck,
  setfridaycheck,
  setsaturdaycheck,
  ErrMessage,
}: Props) => {
  const [copy, SetCopy] = useState(false);
  const [copyid, SetCopyId] = useState(0);
  const [time, SetTime] = useState([]);
  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [day4, setDay4] = useState([]);
  const [day5, setDay5] = useState([]);
  const [day6, setDay6] = useState([]);
  const [day7, setDay7] = useState([]);
  const [DayStart, setDayStart] = useState([]);
  const [copybtn, setcopybtn] = useState(false);
  const [openIndex, setopenIndex] = useState(0);
  const [dayoption, setdayoption] = useState(false);

  useEffect(() => {
    TimeSlots(days);
    if (editModel !== null) {
      setdayoption(true);
    }
  }, [duration, onValid, dayoption]);
  useEffect(() => {
    const resetday = [...time];
    resetday.shift();
    if (sundaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSunday(newData);
      setDay1(resetday);
    }
    if (mondaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setMonday(newData);
      setDay2(resetday);
    }
    if (tuesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setTuesday(newData);
      setDay3(resetday);
    }
    if (wednesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setWednesday(newData);
      setDay4(resetday);
    }
    if (thursdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setThursday(newData);
      setDay5(resetday);
    }
    if (fridaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setFriday(newData);
      setDay6(resetday);
    }
    if (saturdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSaturday(newData);
      setDay7(resetday);
    }
  }, [
    sundaycheck,
    mondaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    saturdaycheck,
  ]);

  const filterAndSetDay = (day, text, times) => {
    if (day !== undefined) {
      const filteredData =
        day?.length > 0 ? day[day?.length - 1].endtime : day[0].endtime;

      const check = times.find((option) => option.label === filteredData);

      if (check !== undefined) {
        const index1 = times.findIndex((obj) => obj.id === check.id);
        if (index1 !== -1) {
          const remainingObjects = times.slice(index1);
          if (text === 'sunday') {
            setSunday(day);
            setDay1(remainingObjects);
          }
          if (text === 'monday') {
            setMonday(day);
            setDay2(remainingObjects);
          }
          if (text === 'tuesday') {
            setTuesday(day);
            setDay3(remainingObjects);
          }
          if (text === 'wednesday') {
            setWednesday(day);
            setDay4(remainingObjects);
          }
          if (text === 'thursday') {
            setThursday(day);
            setDay5(remainingObjects);
          }
          if (text === 'friday') {
            setFriday(day);
            setDay6(remainingObjects);
          }
          if (text === 'saturday') {
            setSaturday(day);
            setDay7(remainingObjects);
          }
        }
      }
    }
  };

  const TimeSlots = (dayfor) => {
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0);
    const endTime = new Date();
    endTime.setHours(23, 45, 0);
    const defaulMin = '15 Minutes';
    const timeIncrement = parseInt(defaulMin);

    let currentTime = startTime;
    let index = 0;
    while (currentTime <= endTime) {
      const hour = currentTime.getHours() % 12 || 12;
      const minute = currentTime.getMinutes().toString().padStart(2, '0');
      const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';
      const timeSlot = {
        id: index,
        value: index,
        label: `${hour}:${minute} ${ampm}`,
      };
      timeSlots.push(timeSlot);
      currentTime = new Date(currentTime.getTime() + timeIncrement * 60000);
      index++;
    }
    SetTime(timeSlots);
    if (sundaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSunday(newData);
    }
    if (mondaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setMonday(newData);
    }
    if (tuesdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setTuesday(newData);
    }
    if (wednesdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setWednesday(newData);
    }
    if (thursdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setThursday(newData);
    }
    if (fridaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setFriday(newData);
    }
    if (saturdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSaturday(newData);
    }

    if (
      days === 'Calendar Days' &&
      timeSlots.length > 1 &&
      dayoption === false
    ) {
      const newdata = [...timeSlots];
      newdata.shift();
      setDay2(newdata);
      setDay1(newdata);
      setDay3(newdata);
      setDay4(newdata);
      setDay5(newdata);
      setDay6(newdata);
      setDay7(newdata);
      setDayStart(newdata);
    } else if (editModel !== null && onValid !== null && dayoption === true) {
      const resetDay = [...timeSlots];
      resetDay.shift();
      if (
        editModel.duration === duration &&
        onValid !== null &&
        dayoption &&
        changeCount === 0
      ) {
        if (resetDay.length > 0) {
          filterAndSetDay(onValid?.sunday, 'sunday', resetDay);
          filterAndSetDay(onValid?.monday, 'monday', resetDay);
          filterAndSetDay(onValid?.tuesday, 'tuesday', resetDay);
          filterAndSetDay(onValid?.wednesday, 'wednesday', resetDay);
          filterAndSetDay(onValid?.thursday, 'thursday', resetDay);
          filterAndSetDay(onValid?.friday, 'friday', resetDay);
          filterAndSetDay(onValid?.saturday, 'saturday', resetDay);
        }
      }
      if (dayoption && editModel.duration !== duration) {
        const newdata = [...timeSlots];
        newdata.shift();
        setDay1(newdata);
        setDay2(newdata);
        setDay3(newdata);
        setDay4(newdata);
        setDay5(newdata);
        setDay6(newdata);
        setDay7(newdata);
      }
    }
    return timeSlots;
  };

  const handleInputChangeForSunday = (e, index, text) => {
    const { id, label } = e;
    const updatedSunday = [...sunday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedSunday[index].endtime !== '') {
          if (sunday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay1(elementsAfterIndex);
          }
          updatedSunday[index].endtime = '';
          const filteredElements = updatedSunday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setSunday(filteredElements);
        }
        if (updatedSunday[index - 1]?.endtime !== '') {
          updatedSunday[index].starttime = label;
        }
        if (updatedSunday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedSunday[index].starttime !== '') {
        updatedSunday[index].endtime = label;
      }
    }

    if (
      updatedSunday[index].starttime !== '' &&
      updatedSunday[index].endtime !== ''
    ) {
      setSunday(updatedSunday);
    }
    for (let i = 0; i < sunday.length; i++) {
      const currentStartTime = sunday[index];
      const nextStartTime = sunday[index + 1]?.starttime;
      const prevEndTime = sunday[index - 1]?.endtime;

      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedSunday.slice(0, index + 1);

        setSunday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedSunday.slice(0, index + 1);

        setSunday(elementsAfterIndex);
      }
    }

    const values = day1;
    const selectedIndex = values.indexOf(e);

    if (
      selectedIndex !== -1 &&
      updatedSunday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay1(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay1(elementsAfterIndex);
      }
    } else if (updatedSunday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay1(elementsAfterIndex);
    }
  };

  const handleAddClickForSunday = () => {
    if (day1.length > 1) {
      setSunday([...sunday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForSunday = (index) => {
    const object = sunday[index];
    const check = time.find(
      (option) => option.label === sunday[index - 1].endtime,
    );
    const lastObject = sunday[sunday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay1(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = sunday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay1(remainingObjects);
      }
    }
    const list = [...sunday];
    list.splice(index, 1);
    setSunday(list);
  };

  const handleInputChangeForMonday = (e, index, text) => {
    const { id, label } = e;
    const updatedMonday = [...monday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedMonday[index].endtime !== '') {
          if (monday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay2(elementsAfterIndex);
          }
          updatedMonday[index].endtime = '';
          const filteredElements = updatedMonday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setMonday(filteredElements);
        }
        if (updatedMonday[index - 1]?.endtime !== '') {
          updatedMonday[index].starttime = label;
        }

        if (updatedMonday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedMonday[index].starttime !== '') {
        updatedMonday[index].endtime = label;
      }
    }
    if (
      updatedMonday[index].starttime !== '' &&
      updatedMonday[index].endtime !== ''
    ) {
      setMonday(updatedMonday);
    }
    for (let i = 0; i < monday.length; i++) {
      const currentStartTime = monday[index];
      const nextStartTime = monday[index + 1]?.starttime;
      const prevEndTime = monday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedMonday.slice(0, index + 1);
        setMonday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedMonday.slice(0, index + 1);
        setMonday(elementsAfterIndex);
      }
    }
    const values = day2;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedMonday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay2(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay2(elementsAfterIndex);
      }
    } else if (updatedMonday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay2(elementsAfterIndex);
    }
  };

  const handleAddClickForMonday = () => {
    if (day2.length > 1) {
      setMonday([...monday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForMonday = (index) => {
    const object = monday[index];
    const check = time.find(
      (option) => option.label === monday[index - 1].endtime,
    );
    const lastObject = monday[monday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay2(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = monday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay2(remainingObjects);
      }
    }
    const list = [...monday];
    list.splice(index, 1);
    setMonday(list);
  };

  const handleInputChangeForTuesday = (e, index, text) => {
    const { id, label } = e;
    const updatedTuesday = [...tuesday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedTuesday[index].endtime !== '') {
          if (tuesday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay3(elementsAfterIndex);
          }
          updatedTuesday[index].endtime = '';
          const filteredElements = updatedTuesday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setTuesday(filteredElements);
        }
        if (updatedTuesday[index - 1]?.endtime !== '') {
          updatedTuesday[index].starttime = label;
        }

        if (updatedTuesday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedTuesday[index].starttime !== '') {
        updatedTuesday[index].endtime = label;
      }
    }
    if (
      updatedTuesday[index].starttime !== '' &&
      updatedTuesday[index].endtime !== ''
    ) {
      setTuesday(updatedTuesday);
    }
    for (let i = 0; i < tuesday.length; i++) {
      const currentStartTime = tuesday[index];
      const nextStartTime = tuesday[index + 1]?.starttime;
      const prevEndTime = tuesday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedTuesday.slice(0, index + 1);
        setTuesday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedTuesday.slice(0, index + 1);
        setTuesday(elementsAfterIndex);
      }
    }
    const values = day3;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedTuesday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay3(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay3(elementsAfterIndex);
      }
    } else if (updatedTuesday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay3(elementsAfterIndex);
    }
  };

  const handleAddClickForTuesday = () => {
    if (day3.length > 1) {
      setTuesday([...tuesday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForTuesday = (index) => {
    const object = tuesday[index];
    const check = time.find(
      (option) => option.label === tuesday[index - 1].endtime,
    );
    const lastObject = tuesday[tuesday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay3(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = tuesday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay3(remainingObjects);
      }
    }
    const list = [...tuesday];
    list.splice(index, 1);
    setTuesday(list);
  };

  const handleInputChangeForWednesday = (e, index, text) => {
    const { id, label } = e;
    const updatedWednesday = [...wednesday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedWednesday[index].endtime !== '') {
          if (wednesday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay4(elementsAfterIndex);
          }
          updatedWednesday[index].endtime = '';
          const filteredElements = updatedWednesday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setWednesday(filteredElements);
        }
        if (updatedWednesday[index - 1]?.endtime !== '') {
          updatedWednesday[index].starttime = label;
        }

        if (updatedWednesday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedWednesday[index].starttime !== '') {
        updatedWednesday[index].endtime = label;
      }
    }
    if (
      updatedWednesday[index].starttime !== '' &&
      updatedWednesday[index].endtime !== ''
    ) {
      setWednesday(updatedWednesday);
    }
    for (let i = 0; i < wednesday.length; i++) {
      const currentStartTime = wednesday[index];
      const nextStartTime = wednesday[index + 1]?.starttime;
      const prevEndTime = wednesday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedWednesday.slice(0, index + 1);
        setWednesday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedWednesday.slice(0, index + 1);
        setWednesday(elementsAfterIndex);
      }
    }
    const values = day4;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedWednesday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay4(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay4(elementsAfterIndex);
      }
    } else if (updatedWednesday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay4(elementsAfterIndex);
    }
  };

  const handleAddClickForWednesday = () => {
    if (day4.length > 1) {
      setWednesday([...wednesday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForWednesday = (index) => {
    const object = wednesday[index];
    const check = time.find(
      (option) => option.label === wednesday[index - 1].endtime,
    );

    const lastObject = wednesday[wednesday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay4(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = wednesday.filter(
        (item) => item.endtime !== '',
      );
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay4(remainingObjects);
      }
    }
    const list = [...wednesday];
    list.splice(index, 1);
    setWednesday(list);
  };

  const handleInputChangeForThursday = (e, index, text) => {
    const { id, label } = e;
    const updatedThursday = [...thursday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedThursday[index].endtime !== '') {
          if (thursday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay5(elementsAfterIndex);
          }
          updatedThursday[index].endtime = '';
          const filteredElements = updatedThursday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setThursday(filteredElements);
        }
        if (updatedThursday[index - 1]?.endtime !== '') {
          updatedThursday[index].starttime = label;
        }

        if (updatedThursday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedThursday[index].starttime !== '') {
        updatedThursday[index].endtime = label;
      }
    }
    if (
      updatedThursday[index].starttime !== '' &&
      updatedThursday[index].endtime !== ''
    ) {
      setThursday(updatedThursday);
    }
    for (let i = 0; i < thursday.length; i++) {
      const currentStartTime = thursday[index];
      const nextStartTime = thursday[index + 1]?.starttime;
      const prevEndTime = thursday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedThursday.slice(0, index + 1);
        setThursday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedThursday.slice(0, index + 1);
        setThursday(elementsAfterIndex);
      }
    }
    const values = day5;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedThursday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay5(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay5(elementsAfterIndex);
      }
    } else if (updatedThursday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay5(elementsAfterIndex);
    }
  };

  const handleAddClickForThursday = () => {
    if (day5.length > 1) {
      setThursday([...thursday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForThursday = (index) => {
    const object = thursday[index];
    const check = time.find(
      (option) => option.label === thursday[index - 1].endtime,
    );
    const lastObject = thursday[thursday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay5(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = thursday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay5(remainingObjects);
      }
    }
    const list = [...thursday];
    list.splice(index, 1);
    setThursday(list);
  };

  const handleInputChangeForFriday = (e, index, text) => {
    const { id, label } = e;
    const updatedFriday = [...friday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedFriday[index].endtime !== '') {
          if (friday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay6(elementsAfterIndex);
          }
          updatedFriday[index].endtime = '';
          const filteredElements = updatedFriday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setFriday(filteredElements);
        }
        if (updatedFriday[index - 1]?.endtime !== '') {
          updatedFriday[index].starttime = label;
        }

        if (updatedFriday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedFriday[index].starttime !== '') {
        updatedFriday[index].endtime = label;
      }
    }

    if (
      updatedFriday[index].starttime !== '' &&
      updatedFriday[index].endtime !== ''
    ) {
      setFriday(updatedFriday);
    }
    for (let i = 0; i < friday.length; i++) {
      const currentStartTime = friday[index];
      const nextStartTime = friday[index + 1]?.starttime;
      const prevEndTime = friday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedFriday.slice(0, index + 1);
        setFriday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedFriday.slice(0, index + 1);
        setFriday(elementsAfterIndex);
      }
    }
    const values = day6;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedFriday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay6(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay6(elementsAfterIndex);
      }
    } else if (updatedFriday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay6(elementsAfterIndex);
    }
  };

  const handleAddClickForFriday = () => {
    if (day6.length > 1) {
      setFriday([...friday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForFriday = (index) => {
    const object = friday[index];
    const check = time.find(
      (option) => option.label === friday[index - 1].endtime,
    );
    const lastObject = friday[friday.length - 1];
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay6(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = friday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay6(remainingObjects);
      }
    }
    const list = [...friday];
    list.splice(index, 1);
    setFriday(list);
  };

  const handleInputChangeForSaturday = (e, index, text) => {
    const { id, label } = e;
    const updatedSaturday = [...saturday];
    if (text === 'starttime') {
      if (label !== '11:45 PM') {
        if (updatedSaturday[index].endtime !== '') {
          if (saturday[0].endtime !== '') {
            const values = DayStart;
            const selectedIndex = values.indexOf(e);
            const elementsAfterIndex = values.slice(selectedIndex + 1);
            setDay7(elementsAfterIndex);
          }
          updatedSaturday[index].endtime = '';
          const filteredElements = updatedSaturday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });
          setSaturday(filteredElements);
        }
        if (updatedSaturday[index - 1]?.endtime !== '') {
          updatedSaturday[index].starttime = label;
        }
        if (updatedSaturday[0].endtime === '') {
        }
      }
    } else if (text === 'endtime') {
      if (updatedSaturday[index].starttime !== '') {
        updatedSaturday[index].endtime = label;
      }
    }
    if (
      updatedSaturday[index].starttime !== '' &&
      updatedSaturday[index].endtime !== ''
    ) {
      setSaturday(updatedSaturday);
    }
    for (let i = 0; i < saturday.length; i++) {
      const currentStartTime = saturday[index];
      const nextStartTime = saturday[index + 1]?.starttime;
      const prevEndTime = saturday[index - 1]?.endtime;
      if (nextStartTime < currentStartTime.endtime && nextStartTime !== '') {
        const elementsAfterIndex = updatedSaturday.slice(0, index + 1);
        setSaturday(elementsAfterIndex);
      } else if (nextStartTime > label) {
        const elementsAfterIndex = updatedSaturday.slice(0, index + 1);
        setSaturday(elementsAfterIndex);
      }
    }
    const values = day7;
    const selectedIndex = values.indexOf(e);
    if (
      selectedIndex !== -1 &&
      updatedSaturday[index].starttime !== '' &&
      label !== '6:00 PM'
    ) {
      if (text === 'starttime') {
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay7(elementsAfterIndex);
      } else {
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay7(elementsAfterIndex);
      }
    } else if (updatedSaturday[index].endtime === '6:00 PM') {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay7(elementsAfterIndex);
    }
  };

  const handleAddClickForSaturday = () => {
    if (day7.length > 1) {
      setSaturday([...saturday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForSaturday = (index) => {
    const object = saturday[index];

    const check = time.find(
      (option) => option.label === saturday[index - 1].endtime,
    );
    const lastObject = saturday[saturday.length - 1];

    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay7(remainingObjects);
      }
    } else if (lastObject.starttime === '' && lastObject.endtime === '') {
      const objectsWithEndTime = saturday.filter((item) => item.endtime !== '');
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find(
        (option) => option.label === lastObjectWithEndTime.endtime,
      );
      const specificObject =
        lastvalue.label !== object.endtime ? lastvalue : check;
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay7(remainingObjects);
      }
    }
    const list = [...saturday];
    list.splice(index, 1);
    setSaturday(list);
  };

  const dateCheckboxChange = (event, name) => {
    const { value, checked } = event.target;
    if (name === 'sunday') {
      setsundaycheck(checked);
      setDay1(DayStart);
    }
    if (name === 'monday') {
      setmondaycheck(checked);
    }
    if (name === 'tuesday') {
      settuesdaycheck(checked);
    }
    if (name === 'wednesday') {
      setwednesdaycheck(checked);
    }
    if (name === 'thursday') {
      setthursdaycheck(checked);
    }
    if (name === 'friday') {
      setfridaycheck(checked);
    }
    if (name === 'saturday') {
      setsaturdaycheck(checked);
      setDay7(DayStart);
    }
  };
  const dateheader = (name, value, onChange) => {
    return (
      <Flex row center style={{ width: '130px', marginTop: '5px' }}>
        <InputCheckBox
          key={1}
          value={value}
          checked={value === true ? true : false}
          onChange={onChange}
        />
        <Flex marginLeft={5}>
          <Text>{name}</Text>
        </Flex>
      </Flex>
    );
  };

  function copybtnClose() {
    setcopybtn(false);
    setopenIndex(0);
  }

  {
    console.log(
      'sunday11234',
      sunday,
      '\n',
      'monday',
      monday,
      '\n',
      'tuesday',
      tuesday,
      '\n',
      'wednesday',
      wednesday,
      '\n',
      'thursday',
      thursday,
      '\n',
      'friday',
      friday,
      '\n',
      'saturday',
      saturday,
      '\n',
      'day1',
      day1,
      '\n',
      'day2',
      day2,
      '\n',
      'day3',
      day3,
      '\n',
      'day4',
      day4,
      '\n',
      'day5',
      day6,
      '\n',
      'day6',
      day6,
      '\n',
      'day7',
      day7,
      '\n',
      'sundaycheck',
      sundaycheck,
      '\n',
      'mondaycheck',
      mondaycheck,
      '\n',
      'tuesdaycheck',
      tuesdaycheck,
      '\n',
      'wednesdaycheck',
      wednesdaycheck,
      '\n',
      'thursdaycheck',
      thursdaycheck,
      '\n',
      'fridaycheck',
      fridaycheck,
      '\n',
      'saturdaycheck',
      saturdaycheck,
      '\n',
      'duration',
      duration,
    );
  }
  const errormessage = 'This field is required';
  return (
    <Flex>
      <Flex row center>
        <Flex row marginBottom={10} marginTop={5}>
          {dateheader('Sunday', sundaycheck, (e) =>
            dateCheckboxChange(e, 'sunday'),
          )}
          <Flex>
            <Flex
              row
              center
              style={{ marginBottom: sunday.length > 1 ? '10px' : '0px' }}
            >
              {sundaycheck === true ? (
                sunday.map((x, i) => {
                  if (i === 0) {
                    const hasEmptyTime = x.endtime === '';

                    return (
                      <>
                      <Flex>
                        <Flex row center flex={1} key={i}>
                          <Flex row center className={styles.align}>
                            <div
                              onFocus={() => ErrMessage(DayStart)}
                              className={styles.selectTag}
                            >
                              <SelectTag
                                options={DayStart}
                                placeholder={'Time'}
                                name="starttime"
                                defaultValue={{
                                  value: '0',
                                  label: '9:00 AM',
                                }}
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForSunday(e, 0, 'starttime')
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text size={14} className={styles.txt}>
                                To
                              </Text>
                            </div>

                            <div
                              className={styles.selectTag}
                              onFocus={() => ErrMessage(DayStart)}
                            >
                              <SelectTag
                                options={day1}
                                placeholder={'Time'}
                                name="endtime"
                                defaultValue={{
                                  value: '0',
                                  label: '6:00 PM',
                                }}
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForSunday(e, 0, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          {day1.length > 0 ? (
                             <Flex title={"New intervals"}>
                            <button
                              className={styles.add}
                              type="button"
                              onClick={handleAddClickForSunday}
                            >
                              <SvgRoundAdd
                                width={18}
                                height={18}
                                fill={'#581845'}
                              />
                            </button>
                            </Flex>
                          ) : (
                           
                            <button
                              className={styles.noadd}
                              type="button"
                              disabled={true}
                            >
                              <SvgRoundAdd
                                width={18}
                                height={18}
                                fill={'#581845'}
                              />
                            </button>
                          
                          )}
                          <CopyClipBoard
                            index={1}
                            name="sunday"
                            day={sunday}
                            setCopy={SetCopy}
                            SetCopyId={SetCopyId}
                            setSunday={setSunday}
                            setMonday={setMonday}
                            setTuesday={setTuesday}
                            setWednesday={setWednesday}
                            setThursday={setThursday}
                            setFriday={setFriday}
                            setSaturday={setSaturday}
                            timeslot={day1}
                            setDay1={setDay1}
                            setDay2={setDay2}
                            setDay3={setDay3}
                            setDay4={setDay4}
                            setDay5={setDay5}
                            setDay6={setDay6}
                            setDay7={setDay7}
                            sundaycheck={sundaycheck}
                            mondaycheck={mondaycheck}
                            tuesdaycheck={tuesdaycheck}
                            wednesdaycheck={wednesdaycheck}
                            thursdaycheck={thursdaycheck}
                            fridaycheck={fridaycheck}
                            saturdaycheck={saturdaycheck}
                            copybtn={true}
                            copybtnClose={copybtnClose}
                          />
                        </Flex>
                        <Flex row center marginLeft={170}>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                        </Flex>
                      
                      </>
                      
                    );

                  }
                  
                })
              ) : (
                <Flex flex={1} marginTop={6}>
                  <Text>Unavailable</Text>
                </Flex>
              )}
            </Flex>
            <div>
              {sunday.length > 1
                ? sunday.map((x, i) => {
                    if (i > 0) {
                      const hasEmptyTime =
                        x.starttime === '' && x.endtime === '';
                      return (
                        <>
                          <Flex row center style={{ marginBottom: '10px' }}>
                            <Flex row className={styles.align}>
                              <div className={styles.selectTag}>
                                <SelectTag
                                  options={day1}
                                  placeholder={'Time'}
                                  name="starttime"
                                  value={
                                    x.starttime !== ''
                                      ? time.find(
                                          (option) =>
                                            option.label === x.starttime,
                                        )
                                      : ''
                                  }
                                  onChange={(e) =>
                                    handleInputChangeForSunday(
                                      e,
                                      i,
                                      'starttime',
                                    )
                                  }
                                ></SelectTag>
                              </div>
                              <div className={styles.to}>
                                <Text className={styles.txt}> To</Text>
                              </div>

                              <div className={styles.selectTag}>
                                <SelectTag
                                  options={day1}
                                  placeholder={'Time'}
                                  name="endtime"
                                  value={
                                    x.endtime !== ''
                                      ? time.find(
                                          (option) =>
                                            option.label === x.endtime,
                                        )
                                      : ''
                                  }
                                  onChange={(e) =>
                                    handleInputChangeForSunday(e, i, 'endtime')
                                  }
                                ></SelectTag>
                              </div>
                            </Flex>
                            <div>
                              {sunday.length !== 1 && (
                                <button
                                  type="button"
                                  onClick={() => RemoveClickForSunday(i)}
                                  className={styles.add}
                                >
                                  <SvgCross
                                    width={12}
                                    height={12}
                                    fill={'#581845'}
                                  />
                                </button>
                              )}
                            </div>
                          </Flex>
                          <Flex row>
                            {hasEmptyTime && showerrMsg && (
                              <div className={styles.errorMsg}>
                                {errormessage}
                              </div>
                            )}
                          </Flex>
                        </>
                      );
                    }
                  })
                : ''}
            </div>
          </Flex>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Monday', mondaycheck, (e) =>
          dateCheckboxChange(e, 'monday'),
        )}
        <Flex>
          <Flex
            row
            center
            style={{ marginBottom: monday.length > 1 ? '10px' : '0px' }}
          >
            {mondaycheck === true ? (
              monday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>
                    

                    <Flex>
                    <Flex row center flex={1} key={i}>
                      <Flex row className={styles.align}>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            name="starttime"
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForMonday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}>To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day2)}
                        >
                          <SelectTag
                            options={day2}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            name="endtime"
                            onChange={(e) =>
                              handleInputChangeForMonday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day2.length > 0 ? (
                            <Flex title={"New intervals"}>

                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForMonday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            type="button"
                            disabled={true}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>

                      <CopyClipBoard
                        index={2}
                        name="monday"
                        day={monday}
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day2}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                     <Flex row center marginLeft={170}>
                     {hasEmptyTime && showerrMsg && (
                       <div className={styles.errorMsg}>
                         {errormessage}
                       </div>
                     )}
                   </Flex>
                   </Flex>
                   </>
                  );
                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {monday.length > 1 && monday
              ? monday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row center style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day2}
                                placeholder={'Time'}
                                name="starttime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForMonday(e, i, 'starttime')
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}>To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day2}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForMonday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <div>
                            {monday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForMonday(i)}
                                className={styles.add}
                                type="button"
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Tuesday', tuesdaycheck, (e) =>
          dateCheckboxChange(e, 'tuesday'),
        )}
        <Flex>
          <Flex row center>
            {tuesdaycheck === true ? (
              tuesday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>
                    <Flex>
                    <Flex
                      row
                      center
                      flex={1}
                      key={i}
                      style={{
                        marginBottom: tuesday.length > 1 ? '10px' : '0px',
                      }}
                    >
                      <Flex row className={styles.align}>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            name="starttime"
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForTuesday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}> To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day3)}
                        >
                          <SelectTag
                            options={day3}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            name="endtime"
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForTuesday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day3.length > 0 ? (
                            <Flex title={"New intervals"}>
                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForTuesday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            type="button"
                            disabled={true}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>
                      <CopyClipBoard
                        index={3}
                        name="tuesday"
                        day={tuesday}
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day3}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                    <Flex row center marginLeft={170}>
                    {hasEmptyTime && showerrMsg && (
                      <div className={styles.errorMsg}>
                        {errormessage}
                      </div>
                    )}
                  </Flex>
                  </Flex>
                  </>
                  );
                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {tuesday.length > 1
              ? tuesday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day3}
                                placeholder={'Time'}
                                name="starttime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForTuesday(e, i, 'starttime')
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}> To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day3}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForTuesday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <div>
                            {tuesday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForTuesday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Wednesday', wednesdaycheck, (e) =>
          dateCheckboxChange(e, 'wednesday'),
        )}
        <Flex>
          <Flex row center>
            {wednesdaycheck === true ? (
              wednesday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>      
                    <Flex>    
                    <Flex
                      row
                      center
                      flex={1}
                      key={i}
                      style={{
                        marginBottom: wednesday.length > 1 ? '10px' : '0px',
                      }}
                    >
                      <Flex row>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            name="starttime"
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForWednesday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}> To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day4)}
                        >
                          <SelectTag
                            options={day4}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            name="endtime"
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForWednesday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day4.length > 0 ? (
                            <Flex title={"New intervals"}>

                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForWednesday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            disabled={true}
                            type="button"
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>
                      <CopyClipBoard
                        index={4}
                        name="wednesday"
                        day={wednesday}
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day4}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                     <Flex row center marginLeft={170}>
                     {hasEmptyTime && showerrMsg && (
                       <div className={styles.errorMsg}>
                         {errormessage}
                       </div>
                     )}
                   </Flex>
                   </Flex>          
                   </>
                  );

                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {wednesday.length > 1
              ? wednesday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day4}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForWednesday(
                                    e,
                                    i,
                                    'starttime',
                                  )
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}> To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day4}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForWednesday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <div>
                            {wednesday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForWednesday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Thursday', thursdaycheck, (e) =>
          dateCheckboxChange(e, 'thursday'),
        )}
        <Flex>
          <Flex row center>
            {thursdaycheck === true ? (
              thursday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>
                    <Flex>          
                    <Flex
                      row
                      center
                      flex={1}
                      key={i}
                      style={{
                        marginBottom: thursday.length > 1 ? '10px' : '0px',
                      }}
                    >
                      <Flex row className={styles.align}>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            name="starttime"
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForThursday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}> To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day5)}
                        >
                          <SelectTag
                            options={day5}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            name="endtime"
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForThursday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day5.length > 0 ? (
                            <Flex title={"New intervals"}>

                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForThursday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            type="button"
                            disabled={true}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>
                      <CopyClipBoard
                        index={5}
                        name="thursday"
                        day={thursday}
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day5}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                     <Flex row center marginLeft={170}>
                     {hasEmptyTime && showerrMsg && (
                       <div className={styles.errorMsg}>
                         {errormessage}
                       </div>
                     )}
                   </Flex>
                   </Flex>          
                   </>
                  );
                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {thursday.length > 1
              ? thursday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day5}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForThursday(
                                    e,
                                    i,
                                    'starttime',
                                  )
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}> To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day5}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForThursday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <div>
                            {thursday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForThursday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Friday', fridaycheck, (e) =>
          dateCheckboxChange(e, 'friday'),
        )}
        <Flex>
          <Flex row center>
            {fridaycheck === true ? (
              friday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>     
                    <Flex>                        
                    <Flex
                      row
                      center
                      flex={1}
                      key={i}
                      style={{
                        marginBottom: friday.length > 1 ? '10px' : '0px',
                      }}
                    >
                      <Flex row className={styles.align}>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            name="starttime"
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : '9:00 AM'
                            }
                            onChange={(e) =>
                              handleInputChangeForFriday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}> To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day6)}
                        >
                          <SelectTag
                            options={day6}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            name="endtime"
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForFriday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day6.length > 0 ? (
                            <Flex title={"New intervals"}>

                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForFriday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            type="button"
                            disabled={true}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>
                      <CopyClipBoard
                        index={6}
                        name="friday"
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        day={friday}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day6}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                     <Flex row center marginLeft={170}>
                     {hasEmptyTime && showerrMsg && (
                       <div className={styles.errorMsg}>
                         {errormessage}
                       </div>
                     )}
                   </Flex>
                   </Flex>          
                   </>
                  );
                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {friday.length > 1
              ? friday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day6}
                                placeholder={'Time'}
                                name="starttime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForFriday(e, i, 'starttime')
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}> To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day6}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForFriday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <div>
                            {friday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForFriday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
                          
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                        
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>

      <Flex row marginBottom={10}>
        {dateheader('Saturday', saturdaycheck, (e) =>
          dateCheckboxChange(e, 'saturday'),
        )}
        <Flex>
          <Flex row center>
            {saturdaycheck === true ? (
              saturday.map((x, i) => {
                if (i === 0) {
                  const hasEmptyTime = x.endtime === '';
                  return (
                    <>
                    <Flex>          
                   
                    <Flex
                      row
                      center
                      flex={1}
                      key={i}
                      style={{
                        marginBottom: saturday.length > 1 ? '10px' : '0px',
                      }}
                    >
                      <Flex row className={styles.align}>
                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(DayStart)}
                        >
                          <SelectTag
                            options={DayStart}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '9:00 AM',
                            }}
                            name="starttime"
                            value={
                              x.starttime !== ''
                                ? time.find(
                                    (option) => option.label === x.starttime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForSaturday(e, 0, 'starttime')
                            }
                          ></SelectTag>
                        </div>
                        <div className={styles.to}>
                          <Text className={styles.txt}> To</Text>
                        </div>

                        <div
                          className={styles.selectTag}
                          onFocus={() => ErrMessage(day7)}
                        >
                          <SelectTag
                            options={day7}
                            placeholder={'Time'}
                            defaultValue={{
                              value: '0',
                              label: '6:00 PM',
                            }}
                            name="endtime"
                            value={
                              x.endtime !== ''
                                ? time.find(
                                    (option) => option.label === x.endtime,
                                  )
                                : ''
                            }
                            onChange={(e) =>
                              handleInputChangeForSaturday(e, 0, 'endtime')
                            }
                          ></SelectTag>
                        </div>
                      </Flex>
                      <div>
                        {day7.length > 0 ? (
                            <Flex title={"New intervals"}>

                          <button
                            className={styles.add}
                            type="button"
                            onClick={handleAddClickForSaturday}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                          </Flex>
                        ) : (
                          <button
                            className={styles.noadd}
                            type="button"
                            disabled={true}
                          >
                            <SvgRoundAdd
                              width={18}
                              height={18}
                              fill={'#581845'}
                            />
                          </button>
                        )}
                      </div>
                      <CopyClipBoard
                        index={7}
                        name="saturday"
                        setCopy={SetCopy}
                        SetCopyId={SetCopyId}
                        day={saturday}
                        setSunday={setSunday}
                        setMonday={setMonday}
                        setTuesday={setTuesday}
                        setWednesday={setWednesday}
                        setThursday={setThursday}
                        setFriday={setFriday}
                        setSaturday={setSaturday}
                        timeslot={day7}
                        setDay1={setDay1}
                        setDay2={setDay2}
                        setDay3={setDay3}
                        setDay4={setDay4}
                        setDay5={setDay5}
                        setDay6={setDay6}
                        setDay7={setDay7}
                        sundaycheck={sundaycheck}
                        mondaycheck={mondaycheck}
                        tuesdaycheck={tuesdaycheck}
                        wednesdaycheck={wednesdaycheck}
                        thursdaycheck={thursdaycheck}
                        fridaycheck={fridaycheck}
                        saturdaycheck={saturdaycheck}
                        copybtn={true}
                        copybtnClose={copybtnClose}
                      />
                    </Flex>
                     <Flex row center marginLeft={170}>
                     {hasEmptyTime && showerrMsg && (
                       <div className={styles.errorMsg}>
                         {errormessage}
                       </div>
                     )}
                   </Flex>
                   </Flex>          
                   </>
                  );
                }
              })
            ) : (
              <Flex flex={1} marginTop={6}>
                <Text>Unavailable</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {saturday.length > 1
              ? saturday.map((x, i) => {
                  if (i > 0) {
                    const hasEmptyTime = x.starttime === '' && x.endtime === '';
                    return (
                      <>
                        <Flex row style={{ marginBottom: '10px' }}>
                          <Flex row className={styles.align}>
                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day7}
                                placeholder={'Time'}
                                name="starttime"
                                value={
                                  x.starttime !== ''
                                    ? time.find(
                                        (option) =>
                                          option.label === x.starttime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForSaturday(
                                    e,
                                    i,
                                    'starttime',
                                  )
                                }
                              ></SelectTag>
                            </div>
                            <div className={styles.to}>
                              <Text className={styles.txt}> To</Text>
                            </div>

                            <div className={styles.selectTag}>
                              <SelectTag
                                options={day7}
                                placeholder={'Time'}
                                name="endtime"
                                value={
                                  x.endtime !== ''
                                    ? time.find(
                                        (option) => option.label === x.endtime,
                                      )
                                    : ''
                                }
                                onChange={(e) =>
                                  handleInputChangeForSaturday(e, i, 'endtime')
                                }
                              ></SelectTag>
                            </div>
                          </Flex>
                          <Flex center>
                            {saturday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForSaturday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={12}
                                  height={12}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </Flex>
                        </Flex>
                        <Flex row>
                          {hasEmptyTime && showerrMsg && (
                            <div className={styles.errorMsg}>
                              {errormessage}
                            </div>
                          )}
                        </Flex>
                      </>
                    );
                  }
                })
              : ''}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

type CopyProps = {
  day: string;
  index: number;
  sundaycheck: boolean;
  mondaycheck: boolean;
  tuesdaycheck: boolean;
  wednesdaycheck: boolean;
  thursdaycheck: boolean;
  fridaycheck: boolean;
  saturdaycheck: boolean;
  copybtn: boolean;
  copybtnClose: () => void;
  name: string;
  timeslot: any;
  setSunday: ([]) => void;
  setMonday: ([]) => void;
  setTuesday: ([]) => void;
  setWednesday: ([]) => void;
  setThursday: ([]) => void;
  setFriday: ([]) => void;
  setSaturday: ([]) => void;
  setDay1: ([]) => void;
  setDay2: ([]) => void;
  setDay3: ([]) => void;
  setDay4: ([]) => void;
  setDay5: ([]) => void;
  setDay6: ([]) => void;
  setDay7: ([]) => void;
  setCopy: (boolean) => void;
  SetCopyId: (number) => void;
};
const CopyClipBoard = ({
  day,
  index,
  name,
  timeslot,
  setSunday,
  setMonday,
  setTuesday,
  setWednesday,
  setThursday,
  setFriday,
  setSaturday,
  setDay1,
  setDay2,
  setDay3,
  setDay4,
  setDay5,
  setDay6,
  setDay7,
  sundaycheck,
  mondaycheck,
  tuesdaycheck,
  wednesdaycheck,
  thursdaycheck,
  fridaycheck,
  saturdaycheck,
  copybtn,
  copybtnClose,
  setCopy,
  SetCopyId,
}: CopyProps) => {
  const [dataexist, setdataexist] = useState([]);

  const [check1, setcheck1] = useState(false);
  const [check2, setcheck2] = useState(false);
  const [check3, setcheck3] = useState(false);
  const [check4, setcheck4] = useState(false);
  const [check5, setcheck5] = useState(false);
  const [check6, setcheck6] = useState(false);
  const [check7, setcheck7] = useState(false);
  const [onApply, setonApply] = useState(index);
  const handleCheckboxChange = (assignedvalue) => {
    if (assignedvalue === 'sunday') {
      setcheck1(!check1);
    }
    if (assignedvalue === 'monday') {
      setcheck2(!check2);
    }
    if (assignedvalue === 'tuesday') {
      setcheck3(!check3);
    }
    if (assignedvalue === 'wednesday') {
      setcheck4(!check4);
    }
    if (assignedvalue === 'thursday') {
      setcheck5(!check5);
    }
    if (assignedvalue === 'friday') {
      setcheck6(!check6);
    }
    if (assignedvalue === 'saturday') {
      setcheck7(!check7);
    }
  };

  function closeButton() {
    setCopy(false);
    SetCopyId(0);
  }

  function ModalReset() {
    setcheck1(false);
    setcheck2(false);
    setcheck3(false);
    setcheck4(false);
    setcheck5(false);
    setcheck6(false);
    setcheck7(false);
  }
  useEffect(() => {}, [copybtn]);

  const applyonclick = (dayoffilter: any, tslot: any, txt: string) => {
    copybtnClose();
    closeButton();
    const filteredArray = dayoffilter.filter(
      (item) => item.starttime !== '' && item.endtime !== '',
    );

    if (check1) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setSunday(newArrayOfObjects);
    }
    if (check2) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setMonday(newArrayOfObjects);
    }
    if (check3) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setTuesday(newArrayOfObjects);
    }
    if (check4) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setWednesday(newArrayOfObjects);
    }
    if (check5) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setThursday(newArrayOfObjects);
    }
    if (check6) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setFriday(newArrayOfObjects);
    }
    if (check7) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setSaturday(newArrayOfObjects);
    }
    ModalReset();
    setTimeout(() => {
      timeslotset(tslot);
    }, 1000);
  };

  function onCopyClick() {
    setonApply(index);
  }

  const timeslotset = (dayof) => {
    const updatedTimeSlots = [...dayof];
    updatedTimeSlots.shift();
    if (check1) {
      setDay1(dayof);
    }
    if (check2) {
      setDay2(dayof);
    }
    if (check3) {
      setDay3(dayof);
    }
    if (check4) {
      setDay4(dayof);
    }
    if (check5) {
      setDay5(dayof);
    }
    if (check6) {
      setDay6(dayof);
    }
    if (check7) {
      setDay7(dayof);
    }
  };

  return (
    <>
      <Flex title={'Copy timings'}>
        <Dropdown onClick={() => onCopyClick()}>
          <Dropdown.Toggle
            style={{
              borderColor: 'unset',
              backgroundColor: 'unset',
              boxShadow: 'none',
              border: 'none',
              marginTop: '3px',
            }}
          >
            <SvgEventcopy width={18} height={18} fill={'#581845'} />
          </Dropdown.Toggle>
          {copybtn ? (
            <>
              <Dropdown.Menu
                style={{
                  minWidth: '5rem',
                  position: 'absolute',
                  transform: 'none',
                  zIndex: 1,
                }}
              >
                <Flex row center className={styles.copyalign}>
                  {name === 'sunday' ? (
                    <InputCheckBox
                      checked={name === 'sunday'}
                      disabled={name === 'sunday'}
                    />
                  ) : sundaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('sunday')}
                      checked={check1 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('sunday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Sunday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'monday' ? (
                    <InputCheckBox
                      checked={name === 'monday'}
                      disabled={name === 'monday'}
                    />
                  ) : mondaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('monday')}
                      checked={check2 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('monday')}
                      disabled
                    />
                  )}
                  <Text className={styles.space}>Monday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'tuesday' ? (
                    <InputCheckBox
                      checked={name === 'tuesday'}
                      disabled={name === 'tuesday'}
                    />
                  ) : tuesdaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('tuesday')}
                      checked={check3 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('tuesday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Tuesday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'wednesday' ? (
                    <InputCheckBox
                      checked={name === 'wednesday'}
                      disabled={name === 'wednesday'}
                    />
                  ) : wednesdaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('wednesday')}
                      checked={check4 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('wednesday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Wednesday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'thursday' ? (
                    <InputCheckBox
                      checked={name === 'thursday'}
                      disabled={name === 'thursday'}
                    />
                  ) : thursdaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('thursday')}
                      checked={check5 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('thursday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Thursday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'friday' ? (
                    <InputCheckBox
                      checked={name === 'friday'}
                      disabled={name === 'friday'}
                    />
                  ) : fridaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('friday')}
                      checked={check6 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('friday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Friday</Text>
                </Flex>
                <Flex row center className={styles.copyalign}>
                  {name === 'saturday' ? (
                    <InputCheckBox
                      checked={name === 'saturday'}
                      disabled={name === 'saturday'}
                    />
                  ) : saturdaycheck === true ? (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('saturday')}
                      checked={check7 ? true : false}
                    />
                  ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('saturday')}
                      disabled={true}
                    />
                  )}
                  <Text className={styles.space}>Saturday</Text>
                </Flex>
                <Flex className={styles.applybtn}>
                  <Dropdown.Item className={styles.applybackground}>
                    <Button
                      types="primary"
                      onClick={() => applyonclick(day, timeslot, name)}
                    >
                      Apply
                    </Button>
                  </Dropdown.Item>
                </Flex>
              </Dropdown.Menu>
            </>
          ) : (
            ''
          )}
        </Dropdown>
      </Flex>
    </>
  );
};

export default DayTimeSplit;
