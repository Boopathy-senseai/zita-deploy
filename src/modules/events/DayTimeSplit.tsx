import { useEffect, useState } from 'react';
import { isEmptyArray, useFormik } from 'formik';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { isEmpty } from '../../uikit/helper';
import SvgCopy from '../../icons/SvgCopy';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import Button from '../../uikit/Button/Button';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
// import CopyModal from '../../uikit/CopyModal/CopyModal';
import styles from './daytimesplit.module.css';
import { timezone } from './eventType';
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
  } = props;
  const [copy, SetCopy] = useState(false);
  const [copyid, SetCopyId] = useState(0);
  const [time, SetTime] = useState([]);
  console.log('duration>>>>>>', days);
  console.log('................', duration, days);
  console.log('duration', time);

  console.log('propsssssssssssssssss', props);
  const [day1, setDay1] = useState([]);
  const [day2, setDay2] = useState([]);
  const [day3, setDay3] = useState([]);
  const [day4, setDay4] = useState([]);
  const [day5, setDay5] = useState([]);
  const [day6, setDay6] = useState([]);
  const [day7, setDay7] = useState([]);

  console.log('copycopycopy', copy);
  useEffect(() => {
    console.log('duration>>>>>>', duration, days);
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
  ]);
  useEffect(()=>{
  },[sunday,monday,tuesday,wednesday,thursday,friday,saturday])

  useEffect(() => {
    // console.log("timeslottimeslot",timeslot)
  }, [day1, day2, day3, day4, day5, day6, day7]);

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
      const timeSlot = { id: index, label: `${hour}:${minute} ${ampm}` };

      timeSlots.push(timeSlot);
      console.log('......', timeSlots);

      currentTime = new Date(currentTime.getTime() + timeIncrement * 60000);
      index++;
    }
    console.log('???????', timeSlots);
    console.log('lengthlength', timeSlots.length, dayfor);
    console.log('daysdaysdaysdaysdaysdaysdaysdaysdaysdaysdaysdays', dayfor);
    if (days === 'Calendar Days' && timeSlots.length > 1) {
      setDay1(timeSlots);
      setDay2(timeSlots);
      setDay3(timeSlots);
      setDay4(timeSlots);
      setDay5(timeSlots);
      setDay6(timeSlots);
      setDay7(timeSlots);
    } else if (days === 'Week Days' && timeSlots.length > 1) {
      setDay1([]);
      setDay2(timeSlots);
      setDay3(timeSlots);
      setDay4(timeSlots);
      setDay5(timeSlots);
      setDay6(timeSlots);
      setDay7([]);
    }
    SetTime(timeSlots);
    return timeSlots;
  };
  const copyonclick = (id: number) => {
    // alert(id);
    SetCopy(true);
    SetCopyId(id);
    console.log('id', copyid);
  };

  const handleInputChangeForSunday = (e, index, text) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>', e, index, text);
    // alert('eedex');
    console.log('sunday', text);
    console.log('eeeeeeeee', e);
    console.log('eeeeeeeee', index);

    const { id, label } = e;
    const updatedSunday = [...sunday];
    if (text === 'starttime') {
      updatedSunday[index].starttime = label;
      console.log(':::::::::::label', label);
    }
    if (text === 'endtime') {
      if (updatedSunday[index].starttime !== '') {
        updatedSunday[index].endtime = label;

        console.log(
          'updatedSunday[index].starttime',
          updatedSunday[index].starttime,
        );
      }
    }
    // if (text === 'starttime') {
    //   updatedSunday[index].starttime = label;
    //   if (
    //     updatedSunday[index].starttime !== '' &&
    //     updatedSunday[index].endtime !== '' &&
    //     updatedSunday[index].starttime < updatedSunday[index].endtime
    //   ) {
    //     alert("llll")
    //     // Handle the case when the starttime is greater than the endtime
    //     // You can show an error message or perform any desired action here
    //   }
    // } else if (text === 'endtime') {
    //   updatedSunday[index].endtime = label;
    //   if (
    //     updatedSunday[index].starttime !== '' &&
    //     updatedSunday[index].endtime !== '' &&
    //     updatedSunday[index].starttime < updatedSunday[index].endtime
    //   ) {
    //     alert("llll------")

    //     // Handle the case when the endtime is less than the starttime
    //     // You can show an error message or perform any desired action here
    //   }
    // }
    if (
      updatedSunday[index].starttime !== '' &&
      updatedSunday[index].endtime !== ''
    ) {
      setSunday(updatedSunday);
    }
    console.log('.........???>>>>>>>', sunday);

    const values = day1;
    const selectedIndex = values.indexOf(e);
    console.log('valuesvalues', values);
    console.log('valuesvaluesday1', selectedIndex);

    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay1(elementsAfterIndex);
      console.log('dddddddddddddd', elementsAfterIndex);
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
    console.log('ddddddddddddddddddddddddddd', day1);
  };

  const handleAddClickForSunday = () => {
    console.log('dddddddddddddd======', day1);
    if (sunday[0].endtime !== '6:00 PM' && day1.length > 1) {
      setSunday([...sunday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', sunday);
    }
  };
  const RemoveClickForSunday = (index) => {
    // console.log("sunday[index]",sunday[index],time)

    // const check = time.find(
    //   (option) => option.label === sunday[index].starttime,
    // )
    // const updatetime = [...time.splice(0, check.id)];
    
    // console.log("checkcheckcheck",check,updatetime)
    // const removedDate = sunday[index];
    const list = [...sunday];
    list.splice(index, 1);
    setSunday(list);
    // setDay1(updatetime)

    // if (!day1.includes(removedDate)) {
    //   setDay1([...day1, removedDate]); // Add the removed date to day1 array if it doesn't already exist
    // }
  };

  const handleInputChangeForMonday = (e, index, text) => {
    // alert('eedex');
    console.log('<>><<>><<><><', e, index, text);
    const { id, label } = e;
    console.log('monday', e);
    const updatedMonday = [...monday];
    console.log('??????????', updatedMonday);
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
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForMonday = () => {
    if (monday[0].endtime !== '6:00 PM' && day2.length > 1) {
      setMonday([...monday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', monday);
    }
  };
  const RemoveClickForMonday = (index) => {
    const list = [...monday];
    list.splice(index, 1);
    setMonday(list);
  };
  // useEffect(()=>{
  // },[monday])

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
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForTuesday = () => {
    if (tuesday[0].endtime !== '6:00 PM' && day3.length > 1) {
      setTuesday([...tuesday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', tuesday);
    }
  };
  const RemoveClickForTuesday = (index) => {
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
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForWednesday = () => {
    if (wednesday[0].endtime !== '6:00 PM' && day4.length > 1) {
      setWednesday([...wednesday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', wednesday);
    }
  };
  const RemoveClickForWednesday = (index) => {
    const list = [...wednesday];
    list.splice(index, 1);
    setWednesday(list);
  };
  // useEffect(()=>{
  // },[wednesday])

  const handleInputChangeForThursday = (e, index, text) => {
    const { id, label } = e;
    console.log('e123345', e, text);
    const updatedThursday = [...thursday];
    if (text === 'starttime') {
      updatedThursday[index].starttime = label;
      console.log('e123345', updatedThursday);
    } else if (text === 'endtime') {
      updatedThursday[index].endtime = label;
    }
    console.log('thursday', thursday);
    setThursday(updatedThursday);
    const values = day5;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1) {
      const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay5(elementsAfterIndex);
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForThursday = () => {
    if (thursday[0].endtime !== '6:00 PM' && day5.length > 1) {
      setThursday([...thursday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', thursday);
    }
  };
  const RemoveClickForThursday = (index) => {
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
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForFriday = () => {
    if (friday[0].endtime !== '6:00 PM' && day6.length > 1) {
      setFriday([...friday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', friday);
    }
  };
  const RemoveClickForFriday = (index) => {
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
      console.log('Elements after the selected index:', elementsAfterIndex);
    }
  };

  const handleAddClickForSaturday = () => {
    if (saturday[0].endtime !== '6:00 PM' && day7.length > 1) {
      setSaturday([...saturday, { starttime: '', endtime: '' }]);
      console.log('handleAddClickForSunday', saturday);
    }
  };
  const RemoveClickForSaturday = (index) => {
    const list = [...saturday];
    list.splice(index, 1);
    setSaturday(list);
  };
  // useEffect(()=>{
  // },[saturday])

  const dateCheckboxChange = (event, name) => {
    alert(name);
    const { value, checked } = event.target;
    console.log('valuevalue111', value, 'checked', checked);
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

  const updateSundayTime = (newStartTime, newEndTime) => {
    setSunday([{ starttime: newStartTime, endtime: newEndTime }]);
  };

  // const findUserById = (users, userId) => {
  //   console.log("user",users,"\n",userId)
  //   return users.find(user => user.label === sunday[0].starttime);
  // }
  // const value  = findUserById(day1,sunday)
  // console.log("valuevalue",value)

  console.log('mondayyyyy', sunday);
  return (
    <>
      {console.log(':::::::::::::::', time)}
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
        "\n",
        'duration',
         duration
      )}
      {console.log('>?>?>?>?>?>??>?>>??sundaymondaysundaymonday', sunday)}
      {console.log('thursdaythursday', thursday)}
      {console.log('thursdaythursdayfriday', friday)}
      {console.log('>?_+_+_+__+_+_+_+_++_++_+_day', day1)}
      {console.log('>?_+_+_+__+_+_+_+_++_++_+_day', day1)}
      {console.log(
        '///////////////////////////////////////////',
        sunday,
        '\n',
        monday,
        '\n',
        'adyyyyyyyyyyyyyyyyy',
        day1,
        '\n',
        day2,
      )}
      {console.log(
        '///////////////////////////////////////////',
        sunday,
        '\n',
        monday,
        '\n',
        'adyyyyyyyyyyyyyyyyy',
        day1,
        '\n',
        day2,
      )}

      {/* {setrender(Date.now())} */}
      <div>
        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            {/* { sundaycheck === true ? ( */}
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={sundaycheck}
              checked={sundaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'sunday')}
            />

            {/* ) 
            : (
              <InputCheckBox
                // onChange={() => day("1")}
                key={1}
                // disabled={true}
              />
            )} */}
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Sunday</Text>
          </div>

          {sundaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day1}
                    placeholder={'time'}
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
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day1}
                    placeholder={'time'}
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day1.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    onClick={handleAddClickForSunday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    disabled={true}
                    // as="a"
                    // onClick={handleAddClickForSunday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={1}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(1)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                <div>
                  <Flex row>
                    {copyid === 1 ? (
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
                      />
                    ) : (
                      ''
                    )}
                  </Flex>
                </div>
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {sunday.length > 1
            ? sunday.map((x, i) => {
                console.log('xxxxxxxxxxxxxx', x);
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day1}
                              placeholder={'time'}
                              name="starttime"
                              value={
                                time
                                  ? time.find(
                                      (option) => option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForSunday(e, i, 'starttime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day1}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                time
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {sunday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForSunday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
        <div style={{ marginTop: '10px' }}></div>

        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              // checked={true}
              value={mondaycheck}
              checked={mondaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'monday')}
            />
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Monday</Text>
          </div>
          {mondaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day2}
                    placeholder={'time'}
                    name="starttime"
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    value={
                      day2
                        ? day2.find(
                            (option) => option.label === monday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForMonday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day2}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    value={
                      day2
                        ? day2.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day2.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    onClick={handleAddClickForMonday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={2}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  //   onClick={() => SetCopy(true)}
                  onClick={() => copyonclick(2)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 2 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {monday.length > 1 && sunday
            ? monday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day2}
                              placeholder={'time'}
                              name="starttime"
                              value={
                                day2
                                  ? day2.find(
                                      (option) => option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForMonday(e, i, 'starttime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day2}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day2
                                  ? day2.find(
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {monday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForMonday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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

        <div style={{ marginTop: '10px' }}></div>

        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={tuesdaycheck}
              checked={tuesdaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'tuesday')}
            />
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Tuesday</Text>
          </div>
          {tuesdaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day3}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    name="starttime"
                    value={
                      day3
                        ? day3.find(
                            (option) => option.label === tuesday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForTuesday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day3}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    name="endtime"
                    value={
                      day3
                        ? day3.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day3.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    onClick={handleAddClickForTuesday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // onClick={handleAddClickForTuesday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={3}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(3)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 3 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'unavailble'
          )}
        </Flex>

        <div style={{ marginLeft: '120px' }}>
          {tuesday.length > 1
            ? tuesday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day3}
                              placeholder={'time'}
                              name="starttime"
                              value={
                                day3
                                  ? day3.find(
                                      (option) => option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForTuesday(e, i, 'starttime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day3}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day3
                                  ? day3.find(
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {tuesday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForTuesday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
        <div style={{ marginTop: '10px' }}></div>

        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={wednesdaycheck}
              checked={wednesdaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'wednesday')}
            />
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Wednesday</Text>
          </div>
          {wednesdaycheck === true ? (
            <>
              <Flex row>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day4}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    name="starttime"
                    value={
                      day4
                        ? day4.find(
                            (option) => option.label === wednesday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForWednesday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day4}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    name="endtime"
                    value={
                      day4
                        ? day4.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day4.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    onClick={handleAddClickForWednesday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    // onClick={handleAddClickForWednesday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={4}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(4)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 4 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {wednesday.length > 1
            ? wednesday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day4}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day4
                                  ? day4.find(
                                      (option) =>
                                        // {console.log("optionoption",option)}
                                        option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForWednesday(e, i, 'endtime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day4}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day4
                                  ? day4.find(
                                      (option) =>
                                        // {console.log("optionoption",option)}
                                        option.label === x.endtime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForWednesday(e, i, 'endtime')
                              }
                            ></SelectTag>
                          </div>
                        </Flex>
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {wednesday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForWednesday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
        <div style={{ marginTop: '10px' }}></div>

        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={thursdaycheck}
              checked={thursdaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'thursday')}
            />
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Thursday</Text>
          </div>
          {thursdaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day5}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    name="starttime"
                    value={
                      day5
                        ? day5.find(
                            (option) => option.label === thursday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForThursday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day5}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    name="endtime"
                    value={
                      day5
                        ? day5.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day6.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    onClick={handleAddClickForThursday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    // onClick={handleAddClickForThursday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={5}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(5)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 5 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {thursday.length > 1
            ? thursday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day5}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day5
                                  ? day5.find(
                                      (option) => option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForThursday(e, i, 'endtime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day5}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day5
                                  ? day5.find(
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {thursday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForThursday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
        <div style={{ marginTop: '10px' }}></div>

        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={fridaycheck}
              checked={fridaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'friday')}
            />
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Friday</Text>
          </div>
          {fridaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day6}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    name="starttime"
                    value={
                      day6
                        ? day6.find(
                            (option) => option.label === friday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForFriday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day6}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    name="endtime"
                    value={
                      day6
                        ? day6.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day6.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    onClick={handleAddClickForFriday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    // onClick={handleAddClickForFriday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(6)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 6 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {friday.length > 1
            ? friday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day6}
                              placeholder={'time'}
                              name="starttime"
                              value={
                                day6
                                  ? day6.find(
                                      (option) => option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForFriday(e, i, 'starttime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day6}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day6
                                  ? day6.find(
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {friday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForFriday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
        <div style={{ marginTop: '10px' }}></div>
        <Flex row>
          <div
            style={{
              marginRight: '5px',
              marginTop: '2px',
            }}
          >
            {/* {saturdaycheck === true ? ( */}
            <InputCheckBox
              // onChange={() => day("1")}
              key={1}
              value={saturdaycheck}
              checked={saturdaycheck === true ? true : false}
              onChange={(e) => dateCheckboxChange(e, 'saturday')}
            />
            {/* ) : (
              <InputCheckBox
                // onChange={() => day("1")}
                key={1}
                disabled={true}
              />
            )} */}
          </div>
          <div
            style={{
              marginRight: '50px',
            }}
          >
            <Text>Saturday</Text>
          </div>
          {saturdaycheck === true ? (
            <>
              <Flex row className={styles.align}>
                <div
                  style={{
                    marginRight: '30px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day7}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '9:00 AM',
                    }}
                    name="starttime"
                    value={
                      day7
                        ? day7.find(
                            (option) => option.label === saturday[0].starttime,
                          )
                        : ''
                    }
                    onChange={(e) =>
                      handleInputChangeForSaturday(e, 0, 'starttime')
                    }
                  ></SelectTag>
                </div>
                <div
                  style={{
                    marginRight: '30px',
                  }}
                >
                  <Text className={styles.txt}>to</Text>
                </div>

                <div
                  style={{
                    marginRight: '20px',
                    width: '119px',
                    height: '32px',
                  }}
                >
                  <SelectTag
                    options={day7}
                    placeholder={'time'}
                    defaultValue={{
                      value: '0',
                      label: '6:00 PM',
                    }}
                    name="endtime"
                    value={
                      day7
                        ? day7.find(
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
              <div style={{ textAlign: 'left', width: '84%' }}>
                {day7.length > 0 ? (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    onClick={handleAddClickForSaturday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button
                    style={{
                      border: 'none',
                      background: 'none',
                      marginLeft: '0px',
                    }}
                    type="button"
                    // as="a"
                    // onClick={handleAddClickForSaturday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              </div>
              <div style={{ textAlign: 'left', marginRight: '84%' }}>
                <button
                  key={7}
                  style={{
                    border: 'none',
                    background: 'none',
                    marginLeft: '10px',
                  }}
                  onClick={() => copyonclick(7)}
                >
                  <SvgCopy width={18} height={18} fill="goldenrod" />
                </button>
                {copyid === 7 ? (
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
                  />
                ) : (
                  ''
                )}
              </div>
            </>
          ) : (
            'Unavailble'
          )}
        </Flex>
        <div style={{ marginLeft: '120px' }}>
          {saturday.length > 1
            ? saturday.map((x, i) => {
                if (i > 0) {
                  return (
                    <>
                      <Flex row>
                        <Flex row className={styles.align}>
                          <div
                            style={{
                              marginRight: '30px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day7}
                              placeholder={'time'}
                              name="starttime"
                              value={
                                day7
                                  ? day7.find(
                                      (option) =>
                                        // {console.log("optionoption",option)}
                                        option.label === x.starttime,
                                    )
                                  : ''
                              }
                              onChange={(e) =>
                                handleInputChangeForSaturday(e, i, 'starttime')
                              }
                            ></SelectTag>
                          </div>
                          <div
                            style={{
                              marginRight: '30px',
                            }}
                          >
                            <Text className={styles.txt}>to</Text>
                          </div>

                          <div
                            style={{
                              marginRight: '20px',
                              width: '119px',
                              height: '32px',
                            }}
                          >
                            <SelectTag
                              options={day7}
                              placeholder={'time'}
                              name="endtime"
                              value={
                                day7
                                  ? day7.find(
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
                        <div style={{ textAlign: 'left', width: '84%' }}>
                          {saturday.length !== 1 && (
                            <button
                              onClick={() => RemoveClickForSaturday(i)}
                              style={{
                                marginRight: '10px',
                                border: 'none',
                                background: 'none',
                              }}
                            >
                              <SvgCloseSmall />
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
      </div>
    </>
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
    // include,
  } = props;
  // console.log("setDay1setDay1setDay1",setDay1,setDay2,setDay3,setDay4,setDay5,setDay6,setDay7)
  console.log(
    'setDay1setDay1setDay1',
    setDay1,
    '\n',
    'setSundaysetSunday',
    setSunday,
  );
  console.log(
    'propspropspropspropspropspropspropspropspropspropspropsprops',
    props.include,
  );

  //   const [monday1, updateMonday1 ] = useState(monday);
  const [monday123, updateMonday123] = useState([]);

  useEffect(() => {
    // console.log("timeslottimeslot",timeslot)
  }, [sunday, monday, tuesday, wednesday, thursday, friday, saturday]);

  //   const { tuesday, updateTuesday } = props;

  console.log('day', day);
  console.log('key', key, name);
  console.log('timeslottimeslottimeslottimeslottimeslot', timeslot);

  const [time123, setTime123] = useState(copy);
  const [mondayclick, setMondayClick] = useState(false);
  const [apply, setApply] = useState([]);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    console.log('timeslottimeslot', timeslot);
  }, [sunday, monday, tuesday, wednesday, thursday, friday, saturday]);

  console.log('time123', time123);
  const final = [];
  const handleCheckboxChange = (assignedvalue: string) => {
    if (final.includes(assignedvalue)) {
      // alert('splice');
      const indexToRemove = final.indexOf(assignedvalue);
      final.splice(indexToRemove, 1);
    } else {
      // alert('handleCheckboxChanges');
      console.log('assignedvalue', assignedvalue);
      final.push(assignedvalue);
      console.log('final', final);
    }
  };

  function closeButton() {
    setCopy(false);
    SetCopyId(0);
  }

  const applyonclick = (senditem: any, dayof: any, tslot: any) => {
    console.log('senditem', senditem);
    console.log('senditemdayof', dayof);
    console.log('senditemtimeslots', tslot);

    if (final.includes('sunday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      console.log(
        'filteredDatafilteredDatafilteredData',
        filteredData,
        typeof filteredData,
      );
      setSunday(filteredData);
    }
    if (final.includes('monday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      console.log(
        'filteredDatafilteredDatafilteredDatafilteredDatafilteredData',
        filteredData,
      );
      setMonday(filteredData);
    }
    if (final.includes('tuesday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setTuesday(filteredData);
    }
    if (final.includes('wednesday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setWednesday(filteredData);
    }
    if (final.includes('thursday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setThursday(filteredData);
    }
    if (final.includes('friday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setFriday(filteredData);
    }
    if (final.includes('saturday')) {
      const filteredData = dayof.filter(
        (item) => item.starttime !== '' && item.endtime !== '',
      );
      setSaturday(filteredData);
    }
    closeButton();   
    setTimeout(() => {
      console.log('Timeout completed!');
      timeslotset(tslot)
    }, 1000);
  };


  const timeslotset = (dayof) => {
    console.log("dayof!@#$%^&UIO",dayof)
    const updatedTimeSlots = [...dayof];
    updatedTimeSlots.shift();
    console.log('~~~~~~~~~~~~',updatedTimeSlots)

    console.log("dayofdayof",dayof)
    if (final.includes('sunday')) {
      setDay1(dayof)
    }
    if (final.includes('monday')) {
      setDay2(dayof)
    }
    if (final.includes('tuesday')) {
      setDay3(dayof)
    }
    if (final.includes('wednesday')) {
      setDay4(dayof)
    }
    if (final.includes('thursday')) {
      setDay5(dayof)
    }
    if (final.includes('friday')) {
      setDay6(dayof)
    }
    if (final.includes('saturday')) {
      setDay7(dayof)
    }
  }
  return (
    <>
      {console.log('monday+++++++++1', monday123)}
      {console.log('finalfinalfinal', final)}

      <div
        style={{
          width: '150px',
          height: '250px',
          position: 'relative',
        }}
      >
        {/* <CopyModal open={copy} onClose={close}>
          <Flex>
            <div
              style={{
                position: 'relative',
                background: '#ffffff',
                padding: '20px',
                // marginLeft : "1px"
              }}
            >
              <div>
                <Flex row>
                  <Text size={12} bold>
                    Copy Times to...
                  </Text>
                </Flex>
                <Button
                  style={{
                    border: 'none',
                    background: 'none',
                  }}
                  onClick={closeButton}
                >
                  <SvgCloseSmall />
                </Button>
              </div>
            </div>

            <Flex row marginBottom={20} key={1}>
              {name === 'sunday' ? (
                <InputCheckBox
                  checked={name === 'sunday'}
                  disabled={name === 'sunday'}
                  //   onChange={() => handleCheckboxChange('monday')}
                />
              ) : sundaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('sunday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('sunday')}
                  disabled={true}
                />
              )}
              <Text>Sunday</Text>
            </Flex>

            <Flex row marginBottom={10}>
              {name === 'monday' ? (
                <InputCheckBox
                  checked={name === 'monday'}
                  disabled={name === 'monday'}
                />
              ) : mondaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('monday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('monday')}
                  disabled
                />
              )}
              <Text>Monday</Text>
            </Flex>
            <Flex row marginBottom={10}>
              {name === 'tuesday' ? (
                <InputCheckBox
                  checked={name === 'tuesday'}
                  disabled={name === 'tuesday'}
                />
              ) : tuesdaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('tuesday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('tuesday')}
                  disabled={true}
                />
              )}
              <Text>Tuesday</Text>
            </Flex>
            <Flex row marginBottom={10}>
              {name === 'wednesday' ? (
                <InputCheckBox
                  checked={name === 'wednesday'}
                  disabled={name === 'wednesday'}
                />
              ) : wednesdaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('wednesday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('wednesday')}
                  disabled={true}
                />
              )}
              <Text>Wednesday</Text>
            </Flex>
            <Flex row marginBottom={10}>
              {name === 'thursday' ? (
                <InputCheckBox
                  checked={name === 'thursday'}
                  disabled={name === 'thursday'}
                />
              ) : thursdaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('thursday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('thursday')}
                  disabled={true}
                />
              )}
              <Text>Thursday</Text>
            </Flex>
            <Flex row marginBottom={10}>
              {name === 'friday' ? (
                <InputCheckBox
                  checked={name === 'friday'}
                  disabled={name === 'friday'}
                />
              ) : fridaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('friday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('friday')}
                  disabled={true}
                />
              )}
              <Text>Friday</Text>
            </Flex>
            <Flex row>
              {name === 'saturday' ? (
                <InputCheckBox
                  checked={name === 'saturday'}
                  disabled={name === 'saturday'}
                />
              ) : saturdaycheck === true ? (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('saturday')}
                />
              ) : (
                <InputCheckBox
                  onChange={() => handleCheckboxChange('saturday')}
                  disabled={true}
                />
              )}
              <Text>Saturday</Text>
            </Flex>
            <Button onClick={() => applyonclick(final, day, timeslot)}>
              Apply
            </Button>
          </Flex>
        </CopyModal> */}
      </div>
    </>
  );
};

export default DayTimeSplit;
