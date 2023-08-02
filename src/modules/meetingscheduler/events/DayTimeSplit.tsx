import { useEffect, useState } from 'react';
import { isEmptyArray, useFormik } from 'formik';
import { Dropdown } from 'react-bootstrap';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import { isEmpty } from '../../../uikit/helper';
import SvgCopy from '../../../icons/SvgCopy';
import SvgRoundAdd from '../../../icons/SvgRoundAdd';
import Button from '../../../uikit/Button/Button';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
// import SvgCloseSmall from '../../../icons/SvgCloseSmall';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import SvgCross from '../../../icons/SvgCross';
import styles from './daytimesplit.module.css';
const DayTimeSplit = (props) => {
  const {
    duration,
    days,
    sunday,
    setSunday,
    monday,
    setMonday,
    tuesday,
    setTuesday,
    wednesday,
    setWednesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
    setrender,
    include,
    sundaycheck,
    setsundaycheck,
    mondaycheck,
    setmondaycheck,
    tuesdaycheck,
    settuesdaycheck,
    wednesdaycheck,
    setwednesdaycheck,
    thursdaycheck,
    setthursdaycheck,
    fridaycheck,
    setfridaycheck,
    saturdaycheck,
    setsaturdaycheck,
    // setinclude,
    ErrMessage,
  } = props;
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
  const [final, setfinal] = useState([]);
  const [copybtn, setcopybtn] = useState(false);
  const [copyOpen, setcopyOpen] = useState(false);
  const [checkedArray, setCheckedArray] = useState([]);


  useEffect(() => {
    TimeSlots(days);
    const ScheduleData = { sunday };
    if (!isEmpty(duration)) {
      // setrender(Date.now())
      if (duration === '1 hour') {
        // duration = '60 minutes';
      }
    }
  }, [duration]);
  useEffect(() => {
    // if (duration){
    //   if(sundaycheck === true){
    //     alert("<.")
    //     setSunday([])
    //   }
    // }
  }, [
    mondaycheck,
    sundaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    saturdaycheck,
    final,
  ]);
  useEffect(() => {}, [
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
  ]);

  useEffect(() => {}, [day1, day2, day3, day4, day5, day6, day7]);

  const TimeSlots = (dayfor) => {
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(9, 0, 0); // Set start time to 9:00 AM
    const endTime = new Date();
    endTime.setHours(18, 0, 0); // Set end time to 6:00 PM
    const timeIncrement = parseInt(duration); // in minutes

    let currentTime = startTime;
    let index = 0;
    while (currentTime <= endTime) {
      const hour = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
      const minute = currentTime.getMinutes().toString().padStart(2, '0'); // Ensure 2-digit format
      const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM'; // Determine AM/PM based on the hour
      // if (index > 0) {
      // }
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

    if (days === 'Calendar Days' && timeSlots.length > 1) {
      const newdata = [...timeSlots];
      newdata.shift();
      console.log('newdatanewdatanewdatanewdata', newdata);
      setDay1(newdata);
      setDay2(newdata);
      setDay3(newdata);
      setDay4(newdata);
      setDay5(newdata);
      setDay6(newdata);
      setDay7(newdata);
    }
    // else if (days === 'Week Days' && timeSlots.length > 1) {
    //   setDay1([]);
    //   setDay2(timeSlots);
    //   setDay3(timeSlots);
    //   setDay4(timeSlots);
    //   setDay5(timeSlots);
    //   setDay6(timeSlots);
    //   setDay7([]);
    // }
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

    return timeSlots;
  };
  const copyonclick = (id: number) => {
    // alert(id);
    SetCopy(true);
    SetCopyId(id);
  };

  const handleInputChangeForSunday = (e, index, text) => {
    const { id, label } = e;
    const updatedSunday = [...sunday];
    if (text === 'starttime') {
      updatedSunday[index].starttime = label;
    }
    if (text === 'endtime') {
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

    const values = day1;
    const selectedIndex = values.indexOf(e);

    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay1(elementsAfterIndex);
    }
  };

  const handleAddClickForSunday = () => {
    if (sunday[0].endtime !== '6:00 PM' && day1.length > 1) {
      setSunday([...sunday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForSunday = (index) => {
    const object = sunday[index];
    console.log(
      'sunday[index]sunday[index]....',
      sunday[index - 1],
      index,
      sunday,
      object,
    );
    const check = time.find(
      (option) => option.label === sunday[index - 1].endtime,
    );
    const lastObject = sunday[sunday.length - 1];

    console.log(
      'lastObjectlastObject',
      lastObject,
      check,
      sunday[index - 1],
      object,
    );
    if (
      lastObject === object &&
      object.starttime !== '' &&
      object.endtime !== ''
    ) {
      const specificObject = check;
      console.log(
        'lastObjectlastObjectlastObjectlastObject',
        specificObject,
        lastObject,
      );
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      if (index !== -1) {
        const remainingObjects = time.slice(index1 + 1);
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
      updatedMonday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedMonday[index].endtime = label;
    }
    setMonday(updatedMonday);
    const values = day2;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay2(elementsAfterIndex);
    }
  };

  const handleAddClickForMonday = () => {
    if (monday[0].endtime !== '6:00 PM' && day2.length > 1) {
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
        const remainingObjects = time.slice(index1 + 1);
        setDay2(remainingObjects);
      }
    }
    const list = [...monday];
    list.splice(index, 1);
    setMonday(list);
  };

  const handleInputChangeForTuesday = (e, index, text) => {
    // alert('eedex');
    const { id, label } = e;
    const updatedTuesday = [...tuesday];
    if (text === 'starttime') {
      updatedTuesday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedTuesday[index].endtime = label;
    }
    setTuesday(updatedTuesday);
    const values = day3;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay3(elementsAfterIndex);
    }
  };

  const handleAddClickForTuesday = () => {
    if (tuesday[0].endtime !== '6:00 PM' && day3.length > 1) {
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
        const remainingObjects = time.slice(index1 + 1);
        setDay3(remainingObjects);
      }
    }
    const list = [...tuesday];
    list.splice(index, 1);
    setTuesday(list);
  };
  // useEffect(()=>{
  // },[tuesday])

  const handleInputChangeForWednesday = (e, index, text) => {
    const { id, label } = e;
    const updatedWednesday = [...wednesday];
    if (text === 'starttime') {
      updatedWednesday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedWednesday[index].endtime = label;
    }
    setWednesday(updatedWednesday);
    const values = day4;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay4(elementsAfterIndex);
    }
  };

  const handleAddClickForWednesday = () => {
    if (wednesday[0].endtime !== '6:00 PM' && day4.length > 1) {
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
        const remainingObjects = time.slice(index1 + 1);
        setDay4(remainingObjects);
      }
    }
    const list = [...wednesday];
    list.splice(index, 1);
    setWednesday(list);
  };
  // useEffect(()=>{
  // },[wednesday])

  const handleInputChangeForThursday = (e, index, text) => {
    const { id, label } = e;
    const updatedThursday = [...thursday];
    if (text === 'starttime') {
      updatedThursday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedThursday[index].endtime = label;
    }
    setThursday(updatedThursday);
    const values = day5;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay5(elementsAfterIndex);
    }
  };

  const handleAddClickForThursday = () => {
    if (thursday[0].endtime !== '6:00 PM' && day5.length > 1) {
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
        const remainingObjects = time.slice(index1 + 1);
        setDay5(remainingObjects);
      }
    }
    const list = [...thursday];
    list.splice(index, 1);
    setThursday(list);
  };
  // useEffect(()=>{
  // },[thursday])

  const handleInputChangeForFriday = (e, index, text) => {
    const { id, label } = e;
    const updatedFriday = [...friday];
    if (text === 'starttime') {
      updatedFriday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedFriday[index].endtime = label;
    }
    setFriday(updatedFriday);
    const values = day6;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay6(elementsAfterIndex);
    }
  };

  const handleAddClickForFriday = () => {
    if (friday[0].endtime !== '6:00 PM' && day6.length > 1) {
      setFriday([...friday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForFriday = (index) => {
    console.log('friday[index]', friday[index], time, day1);
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
        const remainingObjects = time.slice(index1 + 1);
        setDay6(remainingObjects);
      }
    }
    const list = [...friday];
    list.splice(index, 1);
    setFriday(list);
  };
  // useEffect(()=>{
  // },[friday])

  const handleInputChangeForSaturday = (e, index, text) => {
    const { id, label } = e;
    const updatedSaturday = [...saturday];
    if (text === 'starttime') {
      updatedSaturday[index].starttime = label;
    } else if (text === 'endtime') {
      updatedSaturday[index].endtime = label;
    }
    setSaturday(updatedSaturday);
    const values = day7;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay7(elementsAfterIndex);
    }
  };

  const handleAddClickForSaturday = () => {
    if (saturday[0].endtime !== '6:00 PM' && day7.length > 1) {
      setSaturday([...saturday, { starttime: '', endtime: '' }]);
    }
  };
  const RemoveClickForSaturday = (index) => {
    console.log('saturday[index]', saturday[index], time, day1);
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
        const remainingObjects = time.slice(index1 + 1);
        setDay7(remainingObjects);
      }
    }
    const list = [...saturday];
    list.splice(index, 1);
    setSaturday(list);
  };
  // useEffect(()=>{
  // },[saturday])

  const dateCheckboxChange = (event, name) => {
    alert(name);
    const { value, checked } = event.target;
    if (name === 'sunday') {
      setsundaycheck(checked);
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
    }
  };
  const dateheader = (name, value, onChange) => {
    return (
      <Flex row center style={{ width: '130px' }}>
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

  console.log('11111111111111111', time);

  const handleWrapperMouseEnter = () => {
    // Handle mouse enter event on the wrapper
    console.log('Mouse entered wrapper!');
    alert('handleWrapperMouseEnter');
  };
  function copybtnClose() {
    alert('N');
    setcopybtn(false);
    // if(final.length > 0 ){
    //   setfinal([]);
    // }else{
    //   setfinal([])
    // }
    setfinal([])
  }

  useEffect(() => {}, [ copybtn]);

  console.log('+++++++++++++++++', copybtn, final);

  return (
    <Flex>
      {console.log(
        'sunday',
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
      )}

      {console.log('copyOpencopyOpencopyOpencopyOpen', copyOpen)}
      <Flex row marginBottom={10}>
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
              <Flex row center flex={1}>
                <Flex row center className={styles.align}>
                  <div
                    onFocus={() => ErrMessage(day1)}
                    className={styles.selectTag}
                  >
                    <SelectTag
                      options={day1}
                      placeholder={'Time'}
                      name="starttime"
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      value={
                        time
                          ? time.find(
                              (option) => option.label === sunday[0].starttime,
                            )
                          : ''
                      }
                      onChange={(e) =>
                        handleInputChangeForSunday(e, 0, 'starttime')
                      }
                      // getOptionValue={() => day1.length === 0 ? ErrMessage(day1) : ''}
                    ></SelectTag>
                  </div>
                  <div className={styles.to}>
                    <Text size={14} className={styles.txt}>
                      To
                    </Text>
                  </div>

                  <div className={styles.selectTag}
                  onFocus={() => ErrMessage(day1)}>
                    <SelectTag
                      options={day1}
                      placeholder={'Time'}
                      name="endtime"
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      value={
                        time
                          ? time.find(
                              (option) => option.label === sunday[0].endtime,
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
                  <button
                    className={styles.add}
                    type="button"
                    onClick={handleAddClickForSunday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button className={styles.add} type="button" disabled={true}>
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              
                  {/* <Flex onClick={() => setcopybtn(true)}> */}
                  <CopyClipBoard
                    key={1}
                    name="sunday"
                    copy={copy}
                    day={sunday}
                    setCopy={SetCopy}
                    SetCopyId={SetCopyId}
                    days={days}
                    //   setSunday ={setSunday}
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
                    copybtn={copybtn}
                    setcopybtn={setcopybtn}
                    copybtnClose={copybtnClose}
                    final ={final}
                    setfinal ={setfinal}
                  />
                  {/* </Flex> */}
                {/* )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {sunday.length > 1
              ? sunday.map((x, i) => {
                  if (i > 0) {
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
                                  handleInputChangeForSunday(e, i, 'starttime')
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
                                        (option) => option.label === x.endtime,
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex row center flex={1}>
                <Flex row className={styles.align}>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day2)} >
                    <SelectTag
                      options={day2}
                      placeholder={'Time'}
                      name="starttime"
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      value={
                        time
                          ? time.find(
                              (option) => option.label === monday[0].starttime,
                            )
                          : ''
                      }
                      onChange={(e) =>
                        handleInputChangeForMonday(e, 0, 'starttime')
                      }
                      // getOptionValue={() => day2.length === 0 ? ErrMessage(day2) : ''}
                    ></SelectTag>
                  </div>
                  <div className={styles.to}>
                    <Text className={styles.txt}>To</Text>
                  </div>

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day2)} >
                    <SelectTag
                      options={day2}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      value={
                        time
                          ? time.find(
                              (option) => option.label === monday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      onClick={handleAddClickForMonday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button className={styles.add} type="button">
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button
                    key={2}
                    className={styles.add}
                    //   onClick={() => SetCopy(true)}
                    onClick={() => copyonclick(2)}
                  >
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 2 ? ( */}
                <CopyClipBoard
                      key={2}
                      copy={copy}
                      name="monday"
                      day={monday}
                      days={days}
                      setCopy={SetCopy}
                      SetCopyId={SetCopyId}
                      setSunday={setSunday}
                      //    setMonday ={setMonday}
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
                      copybtn ={copybtn}
                      setcopybtn ={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {monday.length > 1 && monday
              ? monday.map((x, i) => {
                  if (i > 0) {
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex
                row
                center
                flex={1}
                style={{ marginBottom: tuesday.length > 1 ? '10px' : '0px' }}
              >
                <Flex row className={styles.align}>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day3)}>
                    <SelectTag
                      options={day3}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      name="starttime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === tuesday[0].starttime,
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

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day3)}>
                    <SelectTag
                      options={day3}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      name="endtime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === tuesday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      onClick={handleAddClickForTuesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.add}
                      type="button"
                      // onClick={handleAddClickForTuesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button
                    key={3}
                    className={styles.add}
                    onClick={() => copyonclick(3)}
                  >
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 3 ? ( */}
                <CopyClipBoard
                      key={3}
                      copy={copy}
                      name="tuesday"
                      day={tuesday}
                      setCopy={SetCopy}
                      days={days}
                      SetCopyId={SetCopyId}
                      //   setTuesday ={setTuesday}
                      setSunday={setSunday}
                      setMonday={setMonday}
                      //  setTuesday ={setTuesday}
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
                      copybtn ={copybtn}
                      setcopybtn ={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {tuesday.length > 1
              ? tuesday.map((x, i) => {
                  if (i > 0) {
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex
                row
                center
                flex={1}
                style={{ marginBottom: wednesday.length > 1 ? '10px' : '0px' }}
              >
                <Flex row>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day4)}>
                    <SelectTag
                      options={day4}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      name="starttime"
                      value={
                        time
                          ? time.find(
                              (option) =>
                                option.label === wednesday[0].starttime,
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

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day4)}>
                    <SelectTag
                      options={day4}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      name="endtime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === wednesday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      onClick={handleAddClickForWednesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      // onClick={handleAddClickForWednesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button
                    key={4}
                    className={styles.add}
                    onClick={() => copyonclick(4)}
                  >
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 4 ? ( */}
                <CopyClipBoard
                      key={4}
                      copy={copy}
                      name="wednesday"
                      days={days}
                      day={wednesday}
                      setCopy={SetCopy}
                      SetCopyId={SetCopyId}
                      setSunday={setSunday}
                      setMonday={setMonday}
                      setTuesday={setTuesday}
                      //    setWednesday ={setWednesday}
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
                      copybtn ={copybtn}
                      setcopybtn ={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {wednesday.length > 1
              ? wednesday.map((x, i) => {
                  if (i > 0) {
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
                                  handleInputChangeForWednesday(e, i, 'endtime')
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex
                row
                center
                flex={1}
                style={{ marginBottom: thursday.length > 1 ? '10px' : '0px' }}
              >
                <Flex row className={styles.align}>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day5)}>
                    <SelectTag
                      options={day5}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      name="starttime"
                      value={
                        time
                          ? time.find(
                              (option) =>
                                option.label === thursday[0].starttime,
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

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day5)}>
                    <SelectTag
                      options={day5}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      name="endtime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === thursday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      onClick={handleAddClickForThursday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button className={styles.add} type="button">
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button
                    key={5}
                    className={styles.add}
                    onClick={() => copyonclick(5)}
                  >
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 5 ? ( */}
                <CopyClipBoard
                      key={5}
                      copy={copy}
                      days={days}
                      name="thursday"
                      day={thursday}
                      setCopy={SetCopy}
                      SetCopyId={SetCopyId}
                      setSunday={setSunday}
                      setMonday={setMonday}
                      setTuesday={setTuesday}
                      setWednesday={setWednesday}
                      //    setThursday ={setThursday}
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
                      copybtn ={copybtn}
                      setcopybtn ={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {thursday.length > 1
              ? thursday.map((x, i) => {
                  if (i > 0) {
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
                                  handleInputChangeForThursday(e, i, 'endtime')
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex
                row
                center
                flex={1}
                style={{ marginBottom: friday.length > 1 ? '10px' : '0px' }}
              >
                <Flex row className={styles.align}>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day6)}>
                    <SelectTag
                      options={day6}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      name="starttime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === friday[0].starttime,
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

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day6)}>
                    <SelectTag
                      options={day6}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      name="endtime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === friday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      onClick={handleAddClickForFriday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      // onClick={handleAddClickForFriday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button className={styles.add} onClick={() => copyonclick(6)}>
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 6 && ( */}
                <CopyClipBoard
                      key={6}
                      copy={copy}
                      name="friday"
                      setCopy={SetCopy}
                      days={days}
                      SetCopyId={SetCopyId}
                      day={friday}
                      setSunday={setSunday}
                      setMonday={setMonday}
                      setTuesday={setTuesday}
                      setWednesday={setWednesday}
                      setThursday={setThursday}
                      //   setFriday = {setFriday}
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
                      copybtn={copybtn}
                      setcopybtn={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {friday.length > 1
              ? friday.map((x, i) => {
                  if (i > 0) {
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
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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
              <Flex
                row
                center
                flex={1}
                style={{ marginBottom: saturday.length > 1 ? '10px' : '0px' }}
              >
                <Flex row className={styles.align}>
                  <div className={styles.selectTag} onFocus={() => ErrMessage(day7)}>
                    <SelectTag
                      options={day7}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '9:00 AM',
                      }}
                      name="starttime"
                      value={
                        time
                          ? time.find(
                              (option) =>
                                option.label === saturday[0].starttime,
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

                  <div className={styles.selectTag} onFocus={() => ErrMessage(day7)}>
                    <SelectTag
                      options={day7}
                      placeholder={'Time'}
                      defaultValue={{
                        value: '0',
                        label: '6:00 PM',
                      }}
                      name="endtime"
                      value={
                        time
                          ? time.find(
                              (option) => option.label === saturday[0].endtime,
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
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      onClick={handleAddClickForSaturday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      // onClick={handleAddClickForSaturday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
                {/* <div>
                  <button
                    key={7}
                    className={styles.add}
                    onClick={() => copyonclick(7)}
                  >
                    <SvgCopy width={18} height={18} fill="#FFC203" />
                  </button>
                  {copyid === 7 ? ( */}
                <CopyClipBoard
                      key={7}
                      copy={copy}
                      name="saturday"
                      setCopy={SetCopy}
                      SetCopyId={SetCopyId}
                      day={saturday}
                      days={days}
                      setSunday={setSunday}
                      setMonday={setMonday}
                      setTuesday={setTuesday}
                      setWednesday={setWednesday}
                      setThursday={setThursday}
                      setFriday={setFriday}
                      //  setSaturday = {setSaturday}
                      timeslot={day7}
                      setDay1={setDay1}
                      setDay2={setDay2}
                      setDay3={setDay3}
                      setDay4={setDay4}
                      setDay5={setDay5}
                      setDay6={setDay6}
                      setDay7={setDay7}
                      setrender={setrender}
                      // include ={include}
                      sundaycheck={sundaycheck}
                      mondaycheck={mondaycheck}
                      tuesdaycheck={tuesdaycheck}
                      wednesdaycheck={wednesdaycheck}
                      thursdaycheck={thursdaycheck}
                      fridaycheck={fridaycheck}
                      saturdaycheck={saturdaycheck}
                      copybtn ={copybtn}
                      setcopybtn ={setcopybtn}
                      copybtnClose ={copybtnClose}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            ) : (
              <Flex flex={1}>
                <Text>Unavailble</Text>
              </Flex>
            )}
          </Flex>
          <div>
            {saturday.length > 1
              ? saturday.map((x, i) => {
                  if (i > 0) {
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
                          <div>
                            {saturday.length !== 1 && (
                              <button
                                onClick={() => RemoveClickForSaturday(i)}
                                className={styles.add}
                              >
                                <SvgCross
                                  width={16}
                                  height={16}
                                  fill={'#581845'}
                                />
                              </button>
                            )}
                          </div>
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

const CopyClipBoard = (props) => {
  const {
    day,
    key,
    copy,
    name,
    sunday,
    setSunday,
    monday,
    setMonday,
    tuesday,
    setTuesday,
    wednesday,
    setWednesday,
    thursday,
    setThursday,
    friday,
    setFriday,
    saturday,
    setSaturday,
    setCopy,
    SetCopyId,
    days,
    timeslot,
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
    final,
    setfinal,
    copybtn,
    setcopybtn,
    copybtnClose,
    checked,
    setChecked,
  } = props;

  console.log('^^^^^^^^^^^^^^^^^^^^^^^', props);
  const [monday123, updateMonday123] = useState([]);

  useEffect(() => {}, []);

  const [time123, setTime123] = useState(copy);
  const [mondayclick, setMondayClick] = useState(false);
  const [apply, setApply] = useState([]);
  const [check, setCheck] = useState([]);
  // const [final, setfinal] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [checked,setChecked] = useState([])
  const [dataexist, setdataexist] = useState([]);

  const [check1,setcheck1] = useState(false);
  const [check2,setcheck2] = useState(false);
  const [check3,setcheck3] = useState(false);
  const [check4,setcheck4] = useState(false);
  const [check5,setcheck5] = useState(false);
  const [check6,setcheck6] = useState(false);
  const [check7,setcheck7] = useState(false);


  useEffect(
    () => {},
    [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ],
  );

  const toggleDropdown = () => {
    alert(showDropdown);
    setShowDropdown(!showDropdown);
  };


  // const emptyArray = []
  const handleCheckboxChange = (assignedvalue) => {
    // const { value, checkflag } = event.target;
    // console.log(">>>>>>><<<<<<<",checkflag)
    // alert(checkflag);
    // if (dataexist.includes(assignedvalue)) {
    //   alert('splice');
    //   const indexToRemove = dataexist.indexOf(assignedvalue);
    //   console.log("?????????????",dataexist,indexToRemove)

    //   dataexist.splice(indexToRemove, 1);
    //   console.log("?????????????",dataexist,indexToRemove)
    //   setfinal(dataexist);
    //   setdataexist(dataexist)
    //   // setChecked(checked)
    // } else {      
    //   alert(assignedvalue);
    //   dataexist.push(assignedvalue);
    //   console.log('//////////////////', dataexist);
    //   setdataexist(dataexist)
    //   setfinal(dataexist);

    //   // setChecked(checked)
    // }
    if(assignedvalue === 'sunday'){
      setcheck1(!check1)
    }
    if(assignedvalue === 'monday'){
      setcheck2(!check2)
    }
    if(assignedvalue === 'tuesday'){
      setcheck3(!check3)
    }
    if(assignedvalue === 'wednesday'){
      setcheck4(!check4)
    }
    if(assignedvalue === 'thursday'){
      setcheck5(!check5)
    }
    if(assignedvalue === 'friday'){
      setcheck6(!check6)
    }
    if(assignedvalue === 'saturday'){
      setcheck7(!check7)
    }
   

    console.log('11111111111111111111', final);
    // setfinal(final)
  };

  

  function closeButton() {
    setCopy(false);
    SetCopyId(0);
  }

  function ModalReset(){
    setcheck1(false)
    setcheck2(false)
    setcheck3(false)
    setcheck4(false)
    setcheck5(false)
    setcheck6(false)
    setcheck7(false)
  }

  const applyonclick = (senditem: any, dayof: any, tslot: any) => {
    setcopybtn(false)
  
    copybtnClose();
    closeButton();  
    if (check1) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setSunday(filteredData);
    }
    if (check2) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setMonday(filteredData);
    }
    if (check3) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setTuesday(filteredData);
    }
    if (check4) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setWednesday(filteredData);
    }
    if (check5) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setThursday(filteredData);
    }
    if (check6) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setFriday(filteredData);
    }
    if (check7) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setSaturday(filteredData);
    }
    ModalReset()
    setTimeout(() => {
      timeslotset(tslot);
    }, 1000);
    // setChecked([])
  };

  function onCopyClick() {
    setcopybtn(true)
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

  console.log('finalallllllllllll', final);
  console.log('finalallllllllllllcopybtn', copybtn,final);
  {
    console.log('checkeddddddddd---------------', checked);
  }
  console.log('dataexistdataexistdataexist/....................', dataexist);

  {
    console.log('checkeddddddddd>>>>>>>>>>', final);
  }
  console.log('copybtncopybtncopybtncopybtn',copybtn);
  return (
    <>
      {console.log(
        'checkeddddddddd',
        final,
        "\n",
        "datasexist",dataexist,
        '\n',
        'sunday',
        check1,
        '\n',
        'monday',
        check2,
        '\n',
        'tuesday',
        check3,
        '\n',
        'wednesday',
        check4,
        '\n',
        'thursday',
        check5,
        '\n',
        'friday',
        check6,
        '\n',
        'saturday',
        check7,
      )}

      <Flex className={styles.btnsetting} onClick={()=>onCopyClick()}>
        <Dropdown className="dropdownButton dropleft">
          <Dropdown.Toggle
            //  className={styles.add}
            style={{
              borderColor: 'unset',
              backgroundColor: 'unset',
              boxShadow: 'none',
              border: 'none',
              // marginLeft:"-7px"
            }}
            // id="dropdown-basic"
          >
            <SvgCopy width={18} height={18} fill={'#581845'} />
          </Dropdown.Toggle>
          {copybtn && 

            <Dropdown.Menu style={{ minWidth: '5rem' }}>
              {/* <Dropdown.Item
            onClick={handleDropdownItemClick}
            > */}

              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'sunday' ? (
                  <InputCheckBox
                    checked={name === 'sunday'}
                    disabled={name === 'sunday'}
                    //   onChange={() => handleCheckboxChange('monday')}
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
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'monday' ? (
                  <InputCheckBox
                    checked={name === 'monday'}
                    disabled={name === 'monday'}
                  />
                ) : mondaycheck === true ? (
              
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('monday')}
                    // checked={final.includes('monday') ? true : false }
                    checked ={check2 ? true : false}
                  />
                 
                
                  // dataexist.includes('monday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('monday')}
                  //     checked={dataexist.includes('monday') ? true : false}
                  //     // checked={true}
                  //   />
                  // ) : (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('monday')}
                  //     checked={dataexist.includes('monday') ? true : false }
                  //   />
                  // )
                ) : (
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('monday')}
                    disabled
                  />
                )}
                <Text className={styles.space}>Monday</Text>
              </Flex>
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            // onClick={() => handleShow(data.id)}
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'tuesday' ? (
                  <InputCheckBox
                    checked={name === 'tuesday'}
                    disabled={name === 'tuesday'}
                  />
                ) : tuesdaycheck === true ? (
                  // final.includes('tuesday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('tuesday')}
                  //     checked={final.includes('tuesday') ? true : false}
                  //     // checked={true}
                  //   />
                  // ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('tuesday')}
                      // checked={final.includes('tuesday') ? true : false }
                      checked ={check3 ? true : false}

                    />
                  // )
                ) : (
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('tuesday')}
                    disabled={true}
                  />
                )}
                <Text className={styles.space}>Tuesday</Text>
              </Flex>
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            // onClick={() => handleShow(data.id)}
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'wednesday' ? (
                  <InputCheckBox
                    checked={name === 'wednesday'}
                    disabled={name === 'wednesday'}
                  />
                ) : wednesdaycheck === true ? (
                  // <InputCheckBox
                  //   onChange={() => handleCheckboxChange('wednesday')}
                  //   // checked={checked.includes('wednesday') ? true : false}
                  // />
                  // final.includes('wednesday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('wednesday')}
                  //     checked={final.includes('wednesday') ? true : false}
                  //   />
                  // ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('wednesday')}
                      // checked={final.includes('tuesday') ? true : false }
                    checked ={check4 ? true : false}

                    />
                  // )
                ) : (
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('wednesday')}
                    disabled={true}
                  />
                )}
                <Text className={styles.space}>Wednesday</Text>
              </Flex>
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            // onClick={() => handleShow(data.id)}
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'thursday' ? (
                  <InputCheckBox
                    checked={name === 'thursday'}
                    disabled={name === 'thursday'}
                  />
                ) : thursdaycheck === true ? (
                  // <InputCheckBox
                  //   onChange={() => handleCheckboxChange('thursday')}
                  //   checked={final.includes('thursday') ? true : false}
                  // />
                  // final.includes('thursday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('thursday')}
                  //     checked={final.includes('thursday') ? true : false}
                  //     // checked={true}
                  //   />
                  // ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('thursday')}
                      // checked={final.includes('tuesday') ? true : false }
                      checked ={check5 ? true : false}
                    />
                  // )
                ) : (
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('thursday')}
                    disabled={true}
                  />
                )}
                <Text className={styles.space}>Thursday</Text>
              </Flex>
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            // onClick={() => handleShow(data.id)}
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'friday' ? (
                  <InputCheckBox
                    checked={name === 'friday'}
                    disabled={name === 'friday'}
                  />
                ) : fridaycheck === true ? (
                  // <InputCheckBox
                  //   // checked={final.includes('friday')}
                  //   onChange={() => handleCheckboxChange('friday')}
                  //   checked={final.includes('friday') ? true : false}
                  // />
                  // final.includes('friday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('friday')}
                  //     checked={final.includes('friday') ? true : false}
                  //     // checked={true}
                  //   />
                  // ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('friday')}
                      // checked={final.includes('tuesday') ? true : false }
                    checked ={check6 ? true : false}

                    />
                  // )
                  
                ) : (
                  <InputCheckBox
                    onChange={() => handleCheckboxChange('friday')}
                    disabled={true}
                  />
                )}
                <Text className={styles.space}>Friday</Text>
              </Flex>
              {/* </Dropdown.Item> */}

              {/* <Dropdown.Item
            // onClick={() => handleShow(data.id)}
            > */}
              <Flex
                row
                center
                marginLeft={'25px'}
                marginTop={'5px'}
                className={styles.dropDownListStyle}
              >
                {name === 'saturday' ? (
                  <InputCheckBox
                    checked={name === 'saturday'}
                    disabled={name === 'saturday'}
                  />
                ) : saturdaycheck === true ? (
                  // final.includes(name) ? (
                  // <InputCheckBox
                  //   // checked={true}
                  //   onChange={() => handleCheckboxChange('saturday')}
                  //   checked={final.includes('saturday') ? true : false}
                  //   // disabled={true}
                  // />
                  // final.includes('saturday') ? (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('saturday')}
                  //     checked={final.includes('saturday') ? true : false}
                  //     // checked={true}
                  //   />
                  // ) : (
                    <InputCheckBox
                      onChange={() => handleCheckboxChange('saturday')}
                      // checked={final.includes('tuesday') ? true : false }
                    checked ={check7? true : false}

                    />
                  // )
                ) : (
                  // ) : (
                  //   <InputCheckBox
                  //     onChange={() => handleCheckboxChange('saturday')}
                  //     // disabled={true}
                  //   />
                  // )

                  <InputCheckBox
                    onChange={() => handleCheckboxChange('saturday')}
                    disabled={true}
                  />
                )}
                <Text className={styles.space}>Saturday</Text>
              </Flex>
              {/* </Dropdown.Item> */}
              <Dropdown.Item className={styles.apply} >
                <Button
                  // className={styles.apply}
                  onClick={() => 
                    applyonclick(final, day, timeslot)
                    }
                >
                  Apply
                </Button>
              </Dropdown.Item>
              {/* </>
            )} */}
            </Dropdown.Menu>
}
        </Dropdown>
      </Flex>
    </>
  );
};

export default DayTimeSplit;
