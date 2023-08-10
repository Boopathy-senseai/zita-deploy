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
    ErrMessage,
    editModel,
    seteditModel,
    onValid,
    setonValid,
    changeCount,
    setChangeCount
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
  const [openIndex, setopenIndex] = useState(0);
  const [dayoption,setdayoption] = useState(false)


  console.log("FFFDDHHDDHDHDGDGDGBHBHJVCHSVCDHVHVCDH",props.duration,"\n",props.editModel,"\n",props.onValid)
  console.log("onValid:::::::",props.onValid)
  


  useEffect(() => {
    // changeDuartion()
    TimeSlots(days);
    const ScheduleData = { sunday };
    if(editModel !== null){
      setdayoption(true);
    }
    if (!isEmpty(duration)) {
     

      // setrender(Date.now())
      if (duration === '1 hour') {
        // duration = '60 minutes';
      }
    }
    

  }, [duration,onValid,dayoption]);
  useEffect(() => {
    // if (duration){
    //   if(sundaycheck === true){
    //     alert("<.")
    //     setSunday([])
    //   }
    // }
    const resetday = [...time];
    resetday.shift();  
    if (sundaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSunday(newData);
      setDay1(resetday)
    }
    if (mondaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setMonday(newData);
      setDay2(resetday)
    }
    if (tuesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setTuesday(newData);
      setDay3(resetday)
    }
    if (wednesdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setWednesday(newData);
      setDay4(resetday)
    }
    if (thursdaycheck === false ) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setThursday(newData);
      setDay5(resetday)
    }
    if (fridaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setFriday(newData);
      setDay6(resetday)
    }
    if (saturdaycheck === false) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSaturday(newData);
      setDay7(resetday)
    }

  }, [
    mondaycheck,
    sundaycheck,
    tuesdaycheck,
    wednesdaycheck,
    thursdaycheck,
    fridaycheck,
    saturdaycheck,
    // final,
  ]);
  useEffect(() => {
   
  }, [
    // sunday,
    // monday,
    // tuesday,
    // wednesday,
    // thursday,
    // friday,
    // saturday,
    // onValid
  ]);

  useEffect(() => {}, [
    // day1, day2, day3, day4, day5, day6, day7
  ]);

  const filterAndSetDay = (day, text,times) => {
    if(day !== undefined){
      console.log("GGGGGGGGGGGGGGG",day,times,"\n")
      const filteredData = day?.length > 0 ? day[day?.length-1].endtime : day[0].endtime
      
      const check = times.find(
          (option) => option.label === filteredData,
        );
        
        if(check !== undefined){
        console.log("filteredDatafilteredData!!!!",filteredData,"\n",text,"\n",times,"\n",check) 
        const index1 = times.findIndex((obj) => obj.id === check.id);
        console.log("remainingObjectsremainingObjectsremainingObjects",filteredData,check,index1)
          if (index1 !== -1) {
            const remainingObjects = times.slice(index1 + 1);
            console.log("remainingObjectsremainingObjectsremainingObjects",remainingObjects)
            if (text === "sunday"){
              setSunday(day)
              setDay1(remainingObjects)
            }
            if (text === "monday"){
              setMonday(day)
              setDay2(remainingObjects)
            }
            if (text === "tuesday"){
              setTuesday(day)
              setDay3(remainingObjects)
            }
            if (text === "wednesday"){
              setWednesday(day)
              setDay4(remainingObjects)
            }
            if (text === "thursday"){
              setThursday(day)
              setDay5(remainingObjects)
            }
            if (text === "friday"){
              setFriday(day)
              setDay6(remainingObjects)
            }
            if (text === "saturday"){
              setSaturday(day)
              setDay7(remainingObjects)
            }
            // return remainingObjects;
          }    
  
      }
    }
    

  // }
      // return null

    
    // // setDay(filteredData);
  };

  const TimeSlots = (dayfor) => {
    // changeDuartion()
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
     if (sundaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSunday(newData);
      // setDay1([])
    }
    if (mondaycheck === true ) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setMonday(newData);
      // setDay2([])
    }
    if (tuesdaycheck === true ) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setTuesday(newData);
      // setDay3([])
    }
    if (wednesdaycheck === true )  {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setWednesday(newData);
      // setDay4([])
    }
    if (thursdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setThursday(newData);
      // setDay5([])
    }
    if (fridaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setFriday(newData);
      // setDay6([])
    }
    if (saturdaycheck === true) {
      const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
      setSaturday(newData);
      // setDay7([]) 
    }
    

    // if (editModel !== null){  
    //   alert("editmodel::" + editModel.id)
    //   const resetDay = [...time];
    //   resetDay.shift();
    //   console.log('newdatanewdatanewdatanewdata', resetDay);
    //   filterAndSetDay(props.sunday,setDay1,resetDay);
    //   // console.log("sundaysunday!!!!!!!",sunday)
    //   // alert("@@@:"+editModel.id)      
    //   // filterAndSetDay(sunday,setDay1,resetDay);
    //   // // setDay2(newdata);
    //   // // setDay3(newdata);
    //   // // setDay4(newdata);
    //   // // setDay5(newdata);
    //   // // setDay6(newdata);
    //   // // setDay7(newdata);
    // }
    if (days === 'Calendar Days' && timeSlots.length > 1 && dayoption === false || changeCount === 1 )  {
      // alert("if:")
      const newdata = [...timeSlots];
      newdata.shift();  
      console.log('dayrrrrrrr', sunday);     
        setDay1(newdata);
        setDay2(newdata);
        setDay3(newdata);
        setDay4(newdata);
        setDay5(newdata);
        setDay6(newdata);
        setDay7(newdata);
      
    }

    else if (editModel !== null && onValid !== null && dayoption === true)
   {  
      // alert("KK")
      const resetDay = [...timeSlots];
      resetDay.shift();
      console.log('newdatanewdatanewdatanewdata', resetDay);
      console.log('editModel.duration === duration', editModel.duration === duration);

      if(editModel.duration === duration && onValid !== null && dayoption && changeCount === 0 ) {
        if (resetDay.length > 0){
          filterAndSetDay(onValid?.sunday,"sunday",resetDay)
          filterAndSetDay(onValid?.monday,"monday",resetDay);
          filterAndSetDay(onValid?.tuesday,"tuesday",resetDay);
          filterAndSetDay(onValid?.wednesday,"wednesday",resetDay);
          filterAndSetDay(onValid?.thursday,"thursday",resetDay);
          filterAndSetDay(onValid?.friday,"friday",resetDay);
          filterAndSetDay(onValid?.saturday,"saturday",resetDay);
          // setdayoption(false)
          // setonValid('')
         
        }
      }
      if(dayoption &&  editModel.duration !== duration){
        const newdata = [...timeSlots];
      newdata.shift();  
      console.log('dayrrrrrrr', sunday);     
        setDay1(newdata);
        setDay2(newdata);
        setDay3(newdata);
        setDay4(newdata);
        setDay5(newdata);
        setDay6(newdata);
        setDay7(newdata);
      
      }
    }

  // if (editModel !== null && onValid !== null){  
  //   alert("KK")
  //   const resetDay = [...timeSlots];
  //   resetDay.shift();
  //   console.log('newdatanewdatanewdatanewdata', resetDay);
  //   if (resetDay.length > 0){
  //     const newdata = filterAndSetDay(onValid?.sunday,setDay1,resetDay);
  //     console.log("newdatanewdatanewdatanewdatanewdata!!@",newdata)
  //     setDay1(newdata)
  //     // if(newdata !== null){
  //     //   const day = [...newdata]
  //     //   // setSunday(day)
  //     // }

  //   }
    // console.log("sundaysunday!!!!!!!",sunday)
    // alert("@@@:"+editModel.id)      
    // filterAndSetDay(sunday,setDay1,resetDay);
    // // setDay2(newdata);
    // // setDay3(newdata);
    // // setDay4(newdata);
    // // setDay5(newdata);
    // // setDay6(newdata);
    // // setDay7(newdata);
  // }

    // else if (days === 'Week Days' && timeSlots.length > 1) {
    //   setDay1([]);
    //   setDay2(timeSlots);
    //   setDay3(timeSlots);
    //   setDay4(timeSlots);
    //   setDay5(timeSlots);
    //   setDay6(timeSlots);
    //   setDay7([]);
    // }
    
    // if (sundaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setSunday(newData);
    // }
    // if (mondaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setMonday(newData);
    // }
    // if (tuesdaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setTuesday(newData);
    // }
    // if (wednesdaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setWednesday(newData);
    // }
    // if (thursdaycheck === true ) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setThursday(newData);
    // }
    // if (fridaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setFriday(newData);
    // }
    // if (saturdaycheck === true) {
    //   const newData = [{ starttime: '9:00 AM', endtime: '6:00 PM' }];
    //   setSaturday(newData);
    // }
    


    return timeSlots;
  };
  const copyonclick = (id: number) => {
    // alert(id);
    SetCopy(true);
    SetCopyId(id);
  };

  const changeDuartion = () => {
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
    if (thursdaycheck === true ) {
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
  }
  
  
 
  




  const handleInputChangeForSunday = (e, index, text) => {
    console.log("HHHHHHHHHHHHHH",sunday[index],index)


    const { id, label } = e;
    const updatedSunday = [...sunday];
   
    if (text === 'starttime') {
      if(label !== "6:00 PM"){ 
        
        if(updatedSunday[index].endtime !== ''){
         
          updatedSunday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedSunday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setSunday(filteredElements);
        // updatedSunday[index].starttime= label;

        // }else{
        
        // updatedSunday[index].starttime= label;

        }
        if(updatedSunday[index-1]?.endtime !== ''){
          updatedSunday[index].starttime= label;
        }

        if(updatedSunday[0].endtime === ''){
          updatedSunday[0].endtime = "6:00 PM"
        }
      }
    }
    else if (text === 'endtime') {

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
    for (let i = 0; i < sunday.length ; i++) {
      const currentStartTime = sunday[index];
      const nextStartTime = sunday[index + 1]?.starttime;
      const prevEndTime = sunday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday,"\N","label",label)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
        
          const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setSunday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedSunday.slice(0,index +1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setSunday(elementsAfterIndex);      
        }
      
    }
    
    const values = day1;
    const selectedIndex = values.indexOf(e);
    console.log("valuesvaluesvaluesvaluesvalues",values,"\n",selectedIndex)

    if (selectedIndex !== -1 && updatedSunday[index].starttime !== '' && label !== "6:00 PM") {
      
      console.log("elementsAfterIndexelementsAfterIndex")
      if (text=== 'starttime'){
        alert("1")
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay1(elementsAfterIndex);
      }else{
        alert("2")
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay1(elementsAfterIndex);
      }
      // setDay1(elementsAfterIndex);
    }else if (updatedSunday[index].endtime === "6:00 PM"){
      
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
      const index1 = time.findIndex((obj) => obj.id === specificObject.id);
      console.log(
        'lastObjectlastObjectlastObjectlastObject',
        specificObject,
        lastObject,
        "\n","index",index
      );
      if (index !== -1) {
        const remainingObjects = time.slice(index1);
        setDay1(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = sunday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
      if(label !== "6:00 PM"){   
        if(updatedMonday[index].endtime !== ''){
          updatedMonday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedMonday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setMonday(filteredElements);
        }         
        if(updatedMonday[index-1]?.endtime !== ''){
          updatedMonday[index].starttime = label;
        }

        if(updatedMonday[0].endtime === ''){
          updatedMonday[0].endtime = "6:00 PM"
        }
      }
    } else if (text === 'endtime') {
      if (updatedMonday[index].starttime !== '') {
        // if (updatedMonday[index + 1 ].starttime < label){
        //   alert("pppppppp9")
        // }else{
        //   alert("123 : "+ label)
         
        //   // const elementsAfterIndex = updatedMonday.slice(0,index + 1);  
        //   // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
        //   // setMonday(elementsAfterIndex);
        // }
        updatedMonday[index].endtime = label;
      }
    }
    if (
      updatedMonday[index].starttime !== '' &&
      updatedMonday[index].endtime !== ''
    ) {
   
      setMonday(updatedMonday)
    }
    for (let i = 0; i < monday.length ; i++) {
      const currentStartTime = monday[index];
      const nextStartTime = monday[index + 1]?.starttime;
      const prevEndTime = monday[index - 1]?.endtime ;
        console.log("currentStartTime123123",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",monday,"\n","label",label
        )
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
         
          const elementsAfterIndex = updatedMonday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setMonday(elementsAfterIndex);      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedMonday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setMonday(elementsAfterIndex);      
        }
      
      
    }
    const values = day2;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedMonday[index].starttime !== '' && label !== "6:00 PM") {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay2(elementsAfterIndex);
      }else{
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay2(elementsAfterIndex);
      }
    }else if (updatedMonday[index].endtime === "6:00 PM"){
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
        const remainingObjects = time.slice(index1);
        setDay2(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = monday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
      if(label !== "6:00 PM"){       
        if(updatedTuesday[index].endtime !== ''){
          updatedTuesday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedTuesday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setTuesday(filteredElements);
        }         
        if(updatedTuesday[index-1]?.endtime !== ''){
          updatedTuesday[index].starttime = label;
        }

        if(updatedTuesday[0].endtime === ''){
          updatedTuesday[0].endtime = "6:00 PM"
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
    for (let i = 0; i < tuesday.length ; i++) {
      const currentStartTime = tuesday[index];
      const nextStartTime = tuesday[index + 1]?.starttime;
      const prevEndTime = tuesday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
          const elementsAfterIndex = updatedTuesday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setTuesday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedTuesday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setTuesday(elementsAfterIndex);      
        }
      
    }
    const values = day3;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedTuesday[index].starttime !== '' && label !== "6:00 PM") {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
      setDay3(elementsAfterIndex);
      }else{

        const elementsAfterIndex = values.slice(selectedIndex);
        setDay3(elementsAfterIndex);
      }
    }else if (updatedTuesday[index].endtime === "6:00 PM"){
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
        const remainingObjects = time.slice(index1);
        setDay3(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = tuesday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
  // useEffect(()=>{
  // },[tuesday])

  const handleInputChangeForWednesday = (e, index, text) => {
    const { id, label } = e;
    const updatedWednesday = [...wednesday];
    if (text === 'starttime') {
      if(label !== "6:00 PM"){        
        if(updatedWednesday[index].endtime !== ''){
          updatedWednesday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedWednesday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setWednesday(filteredElements);
        } 
        if(updatedWednesday[index-1]?.endtime !== ''){
          updatedWednesday[index].starttime = label;
        }
              
        if(updatedWednesday[0].endtime === ''){
          updatedWednesday[0].endtime = "6:00 PM"
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
    for (let i = 0; i < wednesday.length ; i++) {
      const currentStartTime = wednesday[index];
      const nextStartTime = wednesday[index + 1]?.starttime;
      const prevEndTime = wednesday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
          const elementsAfterIndex = updatedWednesday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setWednesday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedWednesday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setWednesday(elementsAfterIndex);      
        }
      
    }
    const values = day4;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedWednesday[index].starttime !== '' && label !== "6:00 PM" ) {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay4(elementsAfterIndex);
      }else{

        const elementsAfterIndex = values.slice(selectedIndex);
        setDay4(elementsAfterIndex);
      }
    }else if (updatedWednesday[index].endtime === "6:00 PM"){
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
        const remainingObjects = time.slice(index1);
        setDay4(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = wednesday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
      if(label !== "6:00 PM"){    
        if(updatedThursday[index].endtime !== ''){
          updatedThursday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedThursday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setThursday(filteredElements);
        }     
        if(updatedThursday[index-1]?.endtime !== ''){
          updatedThursday[index].starttime = label;
        }
             
        if(updatedThursday[0].endtime === ''){
          updatedThursday[0].endtime = "6:00 PM"
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
    for (let i = 0; i < thursday.length ; i++) {
      const currentStartTime = thursday[index];
      const nextStartTime = thursday[index + 1]?.starttime;
      const prevEndTime = thursday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
          const elementsAfterIndex = updatedThursday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setThursday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedThursday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setThursday(elementsAfterIndex);      
        }
      
    }
    const values = day5;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedThursday[index].starttime !== ''  && label !== "6:00 PM") {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay5(elementsAfterIndex);
      }else{

        const elementsAfterIndex = values.slice(selectedIndex);
        setDay5(elementsAfterIndex);
      }
    }else if (updatedThursday[index].endtime === "6:00 PM"){
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
        const remainingObjects = time.slice(index1);
        setDay5(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = thursday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
      if(label !== "6:00 PM"){      
        if(updatedFriday[index].endtime !== ''){
          updatedFriday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedFriday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setFriday(filteredElements);
        }   
        if(updatedFriday[index-1]?.endtime !== ''){
          updatedFriday[index].starttime = label;
        }
                
        
        if(updatedFriday[0].endtime === ''){
          updatedFriday[0].endtime = "6:00 PM"
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
    for (let i = 0; i < friday.length ; i++) {
      const currentStartTime = friday[index];
      const nextStartTime = friday[index + 1]?.starttime;
      const prevEndTime = friday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
          const elementsAfterIndex = updatedFriday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setFriday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedFriday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setFriday(elementsAfterIndex);      
        }
      
    }
    const values = day6;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedFriday[index].starttime !== '' && label !== "6:00 PM")  {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay6(elementsAfterIndex);
      }else{
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay6(elementsAfterIndex);
      }
    }else if (updatedFriday[index].endtime === "6:00 PM"){
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
        const remainingObjects = time.slice(index1);
        setDay6(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = friday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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
    console.log("GGGGGGGEEEETTTTETETETTE",e,index,text,updatedSaturday)
    if (text === 'starttime') {
      if(label !== "6:00 PM"){   
        if(updatedSaturday[index].endtime !== ''){
          updatedSaturday[index].endtime = '';
          // const elementsAfterIndex = updatedSunday.slice(0,index + 1);  
          // console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)  
          const filteredElements = updatedSaturday.filter((element, idx) => {
            return idx <= index || element.starttime === '';
          });      
          console.log("filteredElementsfilteredElementsfilteredElementsfilteredElements",filteredElements)
          setSaturday(filteredElements);
        }                       
        if(updatedSaturday[index-1]?.endtime !== ''){
          updatedSaturday[index].starttime = label;
        }
        if(updatedSaturday[0].endtime === ''){
          updatedSaturday[0].endtime = "6:00 PM"
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
    for (let i = 0; i < saturday.length ; i++) {
      const currentStartTime = saturday[index];
      const nextStartTime = saturday[index + 1]?.starttime;
      const prevEndTime = saturday[index - 1]?.endtime ;
        console.log("currentStartTime",currentStartTime,"\n","nextStartTime",nextStartTime,"\n","prevEndTime",prevEndTime,"\n",sunday)
        if (nextStartTime < currentStartTime.endtime && nextStartTime !== '' ) {
          const elementsAfterIndex = updatedSaturday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setSaturday(elementsAfterIndex);
      
        }else if (nextStartTime > label){
          const elementsAfterIndex = updatedSaturday.slice(0,index + 1);  
          console.log(".....>>>>>>>>>>>>>>>>",elementsAfterIndex)        
          setSaturday(elementsAfterIndex);      
        }
      
    }
    const values = day7;
    const selectedIndex = values.indexOf(e);
    if (selectedIndex !== -1 && updatedSaturday[index].starttime !== '' && label !== "6:00 PM") {
      if (text=== 'starttime'){
        const elementsAfterIndex = values.slice(selectedIndex + 1);
        setDay7(elementsAfterIndex);
      }else{
        const elementsAfterIndex = values.slice(selectedIndex);
        setDay7(elementsAfterIndex);
      }
     
    }else if (updatedSaturday[index].endtime === "6:00 PM"){
      // alert("OK")
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
        const remainingObjects = time.slice(index1);
        setDay7(remainingObjects);
      }
    }else if(  lastObject.starttime === '' &&
    lastObject.endtime === '') {
      const objectsWithEndTime = saturday.filter(item => item.endtime !== '')
      console.log("objectsWithEndTime",objectsWithEndTime)
      const lastObjectWithEndTime = objectsWithEndTime.pop();
      const lastvalue = time.find( 
        (option) => option.label === lastObjectWithEndTime.endtime
      );     
      console.log("^^7777777^^^lastvaluelastvalue",lastvalue,check,object.endtime)
      const specificObject = lastvalue.label !== object.endtime ? lastvalue : check;
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

  function copybtnClose() {
    setcopybtn(false);
    // if(final.length > 0 ){
    //   setfinal([]);
    // }else{
    //   setfinal([])
    // }
    setfinal([])
    setopenIndex(0)
  }

  console.log('+++++++++++++++++', copybtn, final);
  console.log('openIndexopenIndexopenIndex',dayoption, "\n",time,"\n",onValid);


  return (
    <Flex>
      {console.log(
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
      )}

      {console.log('copyOpencopyOpencopyOpencopyOpen', copyOpen)}
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
            {sundaycheck === true  ? 
            sunday.map((x,i) => {
              if(i === 0){
              return(
              <Flex row center flex={1} key={i}>
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
                        x.starttime !== ''
                          ? time.find(
                              (option) => option.label === x.starttime,
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
                  <button
                    className={styles.add}
                    type="button"
                    onClick={handleAddClickForSunday}
                  >
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                ) : (
                  <button className={styles.noadd} type="button" disabled={true}>
                    <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                  </button>
                )}
              
                  {/* <Flex onClick={() => setcopybtn(true)}> */}
                  <CopyClipBoard
                    index={1}
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
                    // onApplyButtonClick ={onApplyButtonClick}
                  />
                  {/* </Flex> */}
                {/* )}
                </div> */}
              </Flex>
            )}
          }) : (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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

      <Flex row marginBottom={10} >
        {dateheader('Monday', mondaycheck, (e) =>
          dateCheckboxChange(e, 'monday'),
        )}
        <Flex>
          <Flex
            row
            center
            style={{ marginBottom: monday.length > 1 ? '10px' : '0px' }}
          >
            {mondaycheck === true ? 
            monday.map((x,i) => {
              if(i === 0){
              return(
              <Flex row center flex={1} >
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
                        x.starttime !== ""
                          ? time.find(
                              (option) => option.label === x.starttime,
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
                        x.endtime !== ""
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
                    <button
                      className={styles.add}
                      type="button"
                      onClick={handleAddClickForMonday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button className={styles.noadd} type="button" disabled={true}>
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
                      // onApplyButtonClick ={onApplyButtonClick}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
            )}
          }) : (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
            {tuesdaycheck === true ?
              tuesday.map((x,i) => {
                if(i === 0){
                return (
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
                        x.starttime !== ""
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
                    <button
                      className={styles.add}
                      type="button"
                      onClick={handleAddClickForTuesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.noadd}
                      type="button"
                      disabled={true}
                      // onClick={handleAddClickForTuesday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
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
              
              </Flex>
              )}
            }): (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
            {wednesdaycheck === true ?  wednesday.map((x,i) => {
              if(i === 0){
              return(
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
                        x.starttime !== ''
                          ? time.find(
                              (option) =>
                                option.label === x.starttime,
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
                      className={styles.noadd}
                      disabled={true}
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
                      // onApplyButtonClick ={onApplyButtonClick}
                    />
                {/* ) : (
                    ''
                  )}
                </div> */}
              </Flex>
             )}
            }): (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
                                  handleInputChangeForWednesday(e, i, 'starttime')
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
            {thursdaycheck === true ? thursday.map((x,i) => {
              if(i === 0){
              return (
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
                        x.starttime !== ''
                          ? time.find(
                              (option) =>
                                option.label === x.starttime,
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
                    <button
                      className={styles.add}
                      type="button"
                      // as="a"
                      onClick={handleAddClickForThursday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button className={styles.noadd} type="button"  disabled={true}>
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>              
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
              </Flex>
             )}
            }) : (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
                                  handleInputChangeForThursday(e, i, 'starttime')
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
            {fridaycheck === true ?  friday.map((x,i) => {
              if(i === 0){
              return(
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
                        x.starttime !== ''
                          ? time.find(
                              (option) => option.label ===  x.starttime,
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
                      className={styles.noadd}
                      type="button"
                      disabled={true}
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
                      // onApplyButtonClick ={onApplyButtonClick}
                    />
                {/* )}
                </div> */}
              </Flex>
             )}
            }) : (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
            {saturdaycheck === true ? 
              saturday.map((x,i) => {
                if(i === 0){
                return(
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
                        x.starttime !== ''
                          ? time.find(
                              (option) =>
                                option.label === x.starttime,
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
                    <button
                      className={styles.add}
                      type="button"
                    
                      onClick={handleAddClickForSaturday}
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  ) : (
                    <button
                      className={styles.noadd}
                      type="button"
                       disabled={true}
                     
                    >
                      <SvgRoundAdd width={18} height={18} fill={'#581845'} />
                    </button>
                  )}
                </div>
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
               
              </Flex>
            )}
          }): (
              <Flex flex={1}>
                <Text>Unavailable</Text>
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
    index,
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
    // onApplyButtonClick
  } = props;

  console.log('^^^^^^^^^^^^^^^^^^^^^^^', props.day);
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
  const [onApply,setonApply] = useState(index);



  useEffect(
    () => {},
    [
      // sunday,
      // monday,
      // tuesday,
      // wednesday,
      // thursday,
      // friday,
      // saturday,
    ],
  );


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
  function DayResetForm(arr,txt){
    const filteredArray = arr.filter((item) => item.starttime !== '');
    console.log("filteredArrayfilteredArray",filteredArray,txt)
    if(txt === 'sunday'){
      setSunday(filteredArray)
    }
    if(txt === 'monday'){
      setMonday(filteredArray)
    }
    if(txt === 'tuesday'){
      setTuesday(filteredArray)
    }
    if(txt === 'wednesday'){
      setWednesday(filteredArray)
    }
    if(txt === 'thursday'){
      setThursday(filteredArray)
    }
    if(txt === 'friday'){
      setFriday(filteredArray)
    }
    if(txt === 'saturday'){
      setSaturday(filteredArray)
    }
  }

  const RemoveEmptytime = (filteredArray,txt)=> {
    

    if(txt === 'sunday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setSunday(newArrayOfObjects)
    }
    if(txt === 'monday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setMonday(newArrayOfObjects)
    }
    if(txt === 'tuesday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setTuesday(newArrayOfObjects)
    }
    if(txt === 'wednesday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setWednesday(newArrayOfObjects)
    }
    if(txt === 'thursday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setThursday(newArrayOfObjects)
    }
    if(txt === 'friday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setFriday(newArrayOfObjects)
    }
    if(txt === 'saturday'){
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("RemoveEmptytime>>><<<<<<<<<",newArrayOfObjects)
      setSaturday(newArrayOfObjects)
    }
  }
  useEffect(()=>{},[copybtn])

  const applyonclick = (senditem: any, dayoffilter: any, tslot: any,txt : string) => {
    setcopybtn(false)
    copybtnClose();
    closeButton();  

    
    // alert("text:"+txt)
     const filteredArray = dayoffilter.filter((item) => item.starttime !== '' && item.endtime !== '');
    
    if (check1) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setSunday(newArrayOfObjects)
    }
    if (check2) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      console.log("daydaydaydaydaydaydayday***(((((((",newArrayOfObjects)
      setMonday(newArrayOfObjects)
    }
    if (check3) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setTuesday(newArrayOfObjects)
    }
    if (check4) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setWednesday(newArrayOfObjects)
    }
    if (check5) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setThursday(newArrayOfObjects)
    }
    if (check6) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setFriday(newArrayOfObjects)
    }
    if (check7) {
      const newArrayOfObjects = filteredArray.map((item) => ({
        starttime: item.starttime,
        endtime: item.endtime,
      }));
      setSaturday(newArrayOfObjects)
    }
 
    // DayResetForm(dayoffilter,txt)
    // RemoveEmptytime(filteredArray,txt)
    ModalReset()
    setTimeout(() => {
      timeslotset(tslot);
    }, 1000);
    // setChecked([])
   

  };

  function onCopyClick() {
    setcopybtn(true)
    setonApply(index)
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
    {console.log("onApplyonApplyonApplyonApply",index)}
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
        "\n",
        "Appply",onApply
        
      )}

      <Flex >
        <Dropdown onClick={()=> onCopyClick()}>
          <Dropdown.Toggle
            //  className={styles.add}
            style={{
              borderColor: 'unset',
              backgroundColor: 'unset',
              boxShadow: 'none',
              border: 'none',
              // padding : "10px 10px"
              // marginLeft:"-7px"
              

            }}
            
            // id="dropdown-basic"
          >
            <SvgCopy width={18} height={18} fill={'#581845'} />

          </Dropdown.Toggle>
          {copybtn ? (
           <>
         

            <Dropdown.Menu style={{ minWidth: '5rem',position : "absolute",transform : 'none',zIndex:1 }}>
              {/* <Dropdown.Item
            onClick={handleDropdownItemClick}
            > */}

              <Flex
                row
                center
                // marginLeft={'15px'}
                // marginTop={'5px'}
                className={styles.copyalign}
                // className={styles.dropDownListStyle}
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
                className={styles.copyalign}
                // className={styles.dropDownListStyle}
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
                className={styles.copyalign}
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
                className={styles.copyalign}
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
                className={styles.copyalign}
                // className={styles.dropDownListStyle}
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
                className={styles.copyalign}
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
                className={styles.copyalign}
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
              <Flex className={styles.applybtn} >
              <Dropdown.Item  
              className={styles.applybackground}
              >
              
                <Button
                  // className={styles.apply}
                  onClick={() => 
                    applyonclick(final, day, timeslot,name)
                    
                    }
                >
                  Apply
                </Button>
              </Dropdown.Item>
              </Flex>

             
              {/* </>
            )} */}
            </Dropdown.Menu>
            </>
          ) :('')}
        </Dropdown>
      </Flex>
    </>
  );
};

export default DayTimeSplit;
