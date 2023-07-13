import React,{ useEffect, useState } from 'react';
import { getIn, isEmptyArray, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { AppDispatch, RootState } from '../../../store'
import SvgSetting from '../../../icons/SvgSetting';
import Card from '../../../uikit/Card/Card';
import Modal from '../../../uikit/Modal/Modal';
import CopyModal from '../../../uikit/CopyModal/CopyModal';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../../uikit/InputRadio/InputRadio';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import SvgRoundAdd from '../../../icons/SvgRoundAdd';
import SvgCopy from '../../../icons/SvgCopy';
import SvgCloseSmall from '../../../icons/SvgCloseSmall';
import SvgEdit from '../../../icons/SvgEdit';
import SvgDuplicate from '../../../icons/SvgDuplicate';
import SvgTrash from '../../../icons/SvgTrash';
import SvgShareIcon from '../../../icons/SvgShareIcon';
import CancelAndDeletePopup from '../../common/CancelAndDeletePopup';
// import SvgShare from '../../../icons/SvgShare';
import Toast from '../../../uikit/Toast/Toast';
import SvgClock from '../../../icons/SvgClock';
import { isEmpty } from '../../../uikit/helper';
import { THIS_FIELD_REQUIRED } from '../../constValue';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgLink from '../../../icons/SvgLInk';
import styles from './screen.module.css';
import { eventType, days, nameList, timezone, time, duration,dashboard, timezonedisplay } from './eventType';
import { postScheduleMiddleWare, getScheduleMiddleWare, deleteScheduleMiddleWare } from './store/middleware/eventmiddleware';


// import { isNumber } from 'highcharts';
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
    schedule : string;
    timezonedisplay: string;
    description: string;
    isactive : boolean;
    isdeleted : boolean;
    updatedby : string;

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
    schedule : '',
    timezonedisplay: 'Automatically detect and show the times in my invitees time zone',
    description: '',
    isactive : true,
    isdeleted : false,
    updatedby : '',
  };

const SlotterScreen = () => {
    const dispatch: AppDispatch = useDispatch();
    const [userAdded, setUserAdded] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalonwIsOpen, setoneIsOpen] = useState(false);
    const [copymodal, setCopyModal] = useState(false)
    const [copymodal1, setCopyModal1] = useState(false)
    const [copymodal2, setCopyModal2] = useState(false)
    const [copymodal3, setCopyModal3] = useState(false)
    const [copymodal4, setCopyModal4] = useState(false)
    const [copymodal5, setCopyModal5] = useState(false)
    const [copymodal6, setCopyModal6] = useState(false)
    const [copyModal11, setcopyModal11] = useState(false)
    const [newdata, setNewdata] = useState<any[]>([])
    const [interviewerData, setinterviewerData] = useState<any[]>([])

    const [timesplit, setTimeSplit] = useState(false);
    console.log("timesplitttt",timesplit)
    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [counter3, setCounter3] = useState(0);
    const [counter4, setCounter4] = useState(0);
    const [counter5, setCounter5] = useState(0);
    const [counter6, setCounter6] = useState(0);
    const [counter7, setCounter7] = useState(0);
    const [ischeck, setCheck] = useState(false);
    const [radio, setradio] = useState(false);
    const [radiozone, setradiozone] = useState(false);
    const [eventName, seteventName] = useState("");
    const [types, settype] = useState("");
    const [location, setLocation] = useState("");
    const [dateRadio, setdateRadio] = useState(false);
    const [descriptions, setdescription] = useState("");
    const [dateRangeRadio, setdateRangeRadio] = useState(false);
    const [issunday, setIsSunday] = useState(false);
    const [durations, setduration] = useState(0);
    const [durationrange, setdurationrange] = useState(0)
    const [timeZone, settimeZone] = useState("");
    const [zoneDisplaya, setzoneDisplaya] = useState(false);
    const [zoneDisplayb, setzoneDisplayb] = useState(false);
    const [daterange, setdateRange] = useState(" ");
    const [shareLinkModal, setShareLinkModal] = useState(false);
    const [eventId, setEventId] = useState("");
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false)
    const [tuesday, setTuesday] = useState(false)
    const [wednesday, setWednesday] = useState(false)
    const [thursday, setThursday] = useState(false)
    const [friday, setFriday] = useState(false)
    const [saturday, setSaturday] = useState(false)
    const [duplicate11,setDuplicate] = useState([])
    const [editdata,setEditData] = useState(null)
    const [deleteModal,setDeleteModal] = useState(false);
    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: null,
      });
    const [show, setShow] = useState(false);
    const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);
    const [active,setActive] = useState(false);
    const [isButton, setButton] = useState(true);

    
    


    // const [locationshow,setlocationshow] = useState(false)
    const arr: number[] = []
    let temp: any[] = []
    console.log("!!!!!!!!!!!!!!",issunday)

    // useEffect (()=> {
    //     if(initial.event_type === "On-site Interview"){
    //         setlocationshow(true)

    //     }else{
    //         setlocationshow(false)
    //     }
    // }, [initial.event_type]);

    useEffect(() => {
        // mount();
        alert("mountt")
        // dispatch(getScheduleMiddleWare());
        // setNewdata(response);
        // dispatch(getinterviewer);
     
    },[]);

    const { isLoading, response } = useSelector(
		({ schedulerReducers }: RootState) => ({
			isLoading: schedulerReducers.isLoading,
			response: schedulerReducers.data,
		}),
	);
    // //let numb = response["0"]; 

    const load_data =dashboard
    // const load_data = response        x  
    console.log("response-------",load_data)
    const handleEventValid = (values: CreateEvent) => {
        const errors: Partial<CreateEvent> = {};
    
        if (isEmpty(values.event_name)) {
          errors.event_name = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.event_type)) {
          errors.event_type = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.dateRange)) {        
          errors.dateRange = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.days)) {
            errors.days = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.startdate)) {
            errors.startdate = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.enddate)) {
            errors.enddate = THIS_FIELD_REQUIRED;
        }
        if (isEmpty(values.duration)) {
            errors.duration = THIS_FIELD_REQUIRED;
          }
        if (isEmpty(values.timezone)) {
            errors.timezone = THIS_FIELD_REQUIRED;
          }
        if (isEmpty(values.timezonedisplay)) {
            errors.timezonedisplay = THIS_FIELD_REQUIRED;
          }
          if (isEmpty(values.interviewer)) {
            errors.interviewer = THIS_FIELD_REQUIRED;
          }
        //   if (isEmpty(values.schedule)) {
        //     errors.schedule = THIS_FIELD_REQUIRED;
        //   }
          if (isEmpty(values.location)) {
            errors.location = THIS_FIELD_REQUIRED;
          }
          if (isEmpty(values.description)) {
            errors.description = THIS_FIELD_REQUIRED;
          }
        return errors;
      };
      
 
    
    const handleSubmitForm =(values : CreateEvent) => {
        console.log("valuesss",values)
            alert("createlink")
        let startdate = convert(values.startdate);
        console.log("startdate",startdate)
        let enddate = convert(values.enddate)
        console.log("enddate",enddate)

        const formData = new FormData();       
            formData.append('event_name', values.event_name);
            console.log("formdatataa",formData)
            formData.append('event_type',values.event_type);
            formData.append('location',values.location);
            formData.append('dateRange', values.dateRange);
            formData.append('days',values.days);
            formData.append('startdate', startdate);
            formData.append('enddate',enddate);
            formData.append('duration', values.duration);
            formData.append('timezone', values.timezone);
            formData.append('interviewer', values.interviewer);
            formData.append('schedule',values.schedule);
            formData.append('timezonedisplay', values.timezonedisplay);
            formData.append('description', values.description);
            // formData.append('date_range', daterange);
            // formData.append('duration_range', JSON.stringify(durationrange));
            // formData.append('interviewers', "HV")
            // formData.append('id',JSON.stringify(eventId))
        dispatch(
            postScheduleMiddleWare({
                formData,   
            }),
            ).then((res : any) => {
                console.log("-------res",res)
                if (!isEmptyArray(res.payload.data.data)) {
                    Toast("Event Created Successfully!")
                    // dispatch(getScheduleMiddleWare());
                }
            });
            setIsOpen(false);
            
    console.log("formdata",formData)
    };
    const onSelect = (date) => {
        console.log("onSelectt",date)
    };
    const onDateChange =(date) =>{
        console.log("onDateChange",date)
    }
    const open = () => {
        console.log("open")
        setCounter1(counter1+1)
        setShow(!show)
        console.log()
    }
    console.log("selectedRang/////e",selectedRange)
    // console.log("onDateChange",date)
    const handleDateChange = (date) => {
        console.log("||||+++++ ",date)
        if (!selectedRange.startDate || selectedRange.endDate) {
          // If no start date is selected, or both start and end dates are already selected, set the start date
          setSelectedRange({
            startDate: date,
            endDate: null,
          });
        } else if (date <= selectedRange.startDate) {
          // If a start date is already selected, and the new date is less than or equal to the start date, update the start date
          setSelectedRange({
            startDate: date,
            endDate: selectedRange.endDate,
          });
        } else {
          // If a start date is already selected, and the new date is greater than the start date, set the end date
          setSelectedRange({
            startDate: selectedRange.startDate,
            endDate: date,
          });
        }
      };
    // formik.setFieldValue[startDate]
    function convert(str) {     
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          data = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, data].join("-");
    }
    
    function day(key: any) {
        console.log(sunday)
        if (key === "1") {
            setSunday(!sunday)
            if (sunday === true) {
                arr.push(key)
                console.log(sunday)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                    console.log(sunday)
                }
            }
        }
        if (key === "2") {
            setMonday(!monday)
            if (monday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        } if (key === "3") {
            setTuesday(!tuesday)
            if (tuesday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        } if (key === "4") {
            setWednesday(!wednesday)
            if (wednesday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        } if (key === "5") {
            setThursday(!thursday)
            if (thursday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        } if (key === "6") {
            setFriday(!friday)
            if (friday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        }
        if (key === "7") {
            setSaturday(!saturday)
            if (saturday === true) {
                arr.push(key)
            }
            else {
                const index = arr.indexOf(key, 0);
                if (index > -1) {
                    arr.splice(index, 1);
                }
            }
        } console.log(arr)
    }

    const interviewModalCancel = () => {
        setoneIsOpen(false);
    }
    function openModal() {
        console.log("123@")
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const formik = useFormik({
        initialValues: initial,
        onSubmit : (values) => handleSubmitForm(values),
        validate : handleEventValid,
    });

    console.log("formik+++++",formik.values)
    console.log("formikkkkkk",formik)

    // const handleEventValid  = (values : CreateEvent) => {
    //    alert("UUUu") 
    //    const m = 1
    //    return m
    // }
    const copyModal = () => {
        setCopyModal(true)
    }
    function closeCopyModal() {
        setCopyModal(false);
    }
    const handleClicks = (x: any, y: any) => {
        // window.opener()
        alert("handleCLicks")
        console.log("yyyyyyy",y,"xxxxxx",x)
        x(y + 1);
        setCounter2(1);
    }

    const OnButtonClick = () => {
        console.log("onbuttonCLik")
        alert("handleCLicks")
        setTimeSplit(true);
        // setCounter1(1);
        // setCounter2(true);
    };
    console.log("counter11111",counter1)
    const onCheckbox = () =>{
        console.log("]]]]",ischeck)

        // console.log("nameeee",nameee)
        // temp.push(nameee)
        // console.log("temppppp",temp)
    }
    const Check = (x: string) => {        
        // setCheck(!ischeck);
        // if (ischeck === true) {
        //     temp.push(x[0])
        // } else { return null }
        // console.log('items', temp)
    }
    console.log("]]]]====",active)
    const openModalEdit = () => {     
        setButton(false)
        console.log("formik.values))))))",formik.values)
        const datas = editdata;
        formik.values.event_name = datas.event_name
        formik.values.event_type = datas.event_type
        // formik.setFieldValue('event_type',datas.event_type)
        console.log('@@@@@@@',datas.event_type)
        formik.values.location = datas.location
        formik.values.dateRange = datas.dateRange
        formik.values.days = datas.days
        formik.values.startdate = datas.startdate
        formik.values.enddate = datas.enddate
        formik.values.duration = datas.duration
        formik.values.timezone = datas.timezone
        formik.values.description = datas.description
        formik.values.timezonedisplay = datas.timezonedisplay
        formik.values.interviewer = datas.interviewer
        formik.values.schedule = datas.schedule
        console.log("openModalEdit",datas)
        console.log("formik.values",formik.values)
        setIsOpen(true)
        // seteventName(datas.event_name)
        // settype(datas.type)
        // setLocation(datas.location)
        // setdateRadio(datas.date_radio)
        // setdescription(datas.description)
        // setdateRangeRadio(datas.date_range_radio)
        // setcalendarDays(datas.calendar_days)
        // setduration(datas.duration)
        // setdurationrange(datas.duration_range)
        // settimeZone(datas.time_zone)
        // setzoneDisplaya(datas.zone_displaya)
        // setzoneDisplayb(datas.zone_displayb)
        // setdateRange(datas.duration_range)
        // setStartDate(datas.date_range)
        // setEndDate(datas.date_range)

    }
// const Link = () => {
//         let newLink = "http://localhost:3000/slotter"+ eventId;
//         console.log(newLink)
//     }

const onsettingClick =(datas) => {
        console.log("datassss",datas)
        setcopyModal11(true);
        setEditData(datas);
        // setTimeout(console.log("@@@@",editdata),200)
}
const handleedit=()=> {        
    setcopyModal11(false);  
    console.log(".//////]]]]]]]/",editdata)


}

const onDuplicate = () => {    
    delete(editdata.event_id)
    if (!('event_id' in editdata)){
    console.log("onDuuuu",editdata)    
    formik.values = editdata;    
    console.log("Duplicateeeee",formik.values)
    handleSubmitForm(formik.values);
    }   
}

const handleShow = () => {
        if(editdata !== null){
            const id = editdata.event_id
            setEventId(id)
            setcopyModal11(true);
            setDeleteModal(true);
            
        }
        console.log(".///////",editdata.event_id)
        // setUserId(id);
};
const onCancel = ()=> {
    setcopyModal11(false);
    setDeleteModal(false);
};
const onDelete = () => {
    console.log("editdaaaaaaa",typeof(editdata))
        // if (editdata !== null) {
        //     alert("12poo")
        //   setdeleteBtnLoader(true);
        //   axios
        //     .delete('schedule_dashboard/' +"pk"+ eventId  + '/')
        //     .then((deleteresponse) => {
        //         console.log("resssss",deleteresponse)
        //       setDeleteModal(false);
        //       setcopyModal11(false);
        //       Toast('User deleted successfully', 'LONG');
        //       setdeleteBtnLoader(false);
        //     //   load_data.refresh();
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        // }
};

        
const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }
const timeadded = () => {
        alert("timed")
    }

const AddTime = (data) => {
    console.log("dtaaaaaaaa",data)
        alert("Addtime")   
            return (
            // <Flex row key={c} marginTop={5}>
            <div>
                <div style={{
                    marginRight: "30px",
                    width: "119px",
                    height: "32px"
                }}>
                    <SelectTag
                        options={time}
                        placeholder={"time"}
                    ></SelectTag>
                </div>
                <div style={{
                    marginRight: "30px"
                }}>
                    <Text className={styles.txt}>to</Text>
                </div>
                <div style={{
                    marginRight: "20px",
                    width: "119px",
                    height: "32px"
                }}>
                    <SelectTag
                        options={time}
                        placeholder={"time"}
                    ></SelectTag>
                </div>
                <div>
                    {/* <button onClick={() => setCounter1(counter1 - 1)}
                        style={{
                            border: "none",
                            background: "none"
                        }}>
                        <SvgCloseSmall />
                    </button> */}
                </div>
                </div>
            )    
            }


const splittime = () => {
    console.log("----")
    alert("helloo")    
    return(   
           <Flex row
            marginTop={5}>
                    <div style={{
                        marginRight: "30px",
                        width: "119px",
                        height: "32px"
                    }}>
                        <SelectTag
                            options={time}
                            placeholder={"time"}
                        ></SelectTag>
                    </div>
                    <div style={{
                        marginRight: "30px"
                    }}>
                        <Text className={styles.txt}>to</Text>
                    </div>
                    <div style={{
                        marginRight: "20px",
                        width: "119px",
                        height: "32px"
                    }}>
                        <SelectTag
                            options={time}
                            placeholder={"time"}
                        ></SelectTag>
                    </div>
                    <div>
                        <button 
                        // onClick={() => setCounter1(counter1 - 1)}
                            style={{
                                border: "none",
                                background: "none"
                            }}>
                            <SvgCloseSmall />
                        </button>
                    </div>
                </Flex>
        )
    };



    // var name = 'HemaRekha V'
    // const interview_data = (data : any)=> {
    //     const myArr = JSON.parse(data);
    //     console.log("dataaaa",myArr)
    //     var initials = ''
    //     for( const i in myArr){
    //        initials = getInitials(myArr[i]);            
    //     }
       
    //     console.log("dataaaa",typeof(myArr))
    //     return initials
        
    // }
        const getInitials=(name : any)=>{
        // name = JSON.parse(name);
        if (name !== undefined){
        var parts = name.split(' ')
        var initials = ''
        for (var i = 0; i < parts.length; i++) {
            if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0]
            }
        } 
        return initials
     }
    //     return (
    // <Text>{initials}</Text> 
    //     ) 
        }


    return (
        <>
        {console.log("setNewData=====",newdata)}  
         {console.log("counter22",counter1)}
      <Card className={styles.cardOverAll}>
        <div className={styles.overAll} >
           
            <Flex row>
                <Flex column> <Text size={16} bold>
                    Event Scheduler
                </Text>
                    <Text textColor-gray size={14}>
                        Share your availability with candidates and schedule events
                    </Text></Flex>
                <div style={{ 
                    // marginTop : "10px",
                    // marginRight : "10px",
                    marginLeft: "1120px"
                     }}> <Button 
                     onClick={openModal}
                    //  style={{ 
                    //     position: "relative" ,
                    // }}
                     >
                    New Event Scheduler
                </Button></div>          
            </Flex>
            <Flex className={styles.newEvent}>
                <div style={{
                    position: "absolute", overflowY: 'scroll', boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                }}>
                    <Modal
                        open={modalIsOpen}
                        onClose={close}
                    >
                        <div
                            style={{
                                backgroundColor: "#fff",
                                padding: "10px 30px",
                                overflow: 'scroll',
                                zIndex: 2,
                                width : "740px",
                                
                            }}
                            ref={element => {
                                if (element) element.style.setProperty('overflowY', 'scroll', 'important');
                            }}
                        >
                            <Flex row>
                                <Text 
                                style={{
                                    fontSize: '16px',
                                    color: '#581845',
                                    fontWeight: 'bold',   
                                    paddingTop: '1px' ,
                                    // position :'fixed'                               
                                }}
                                >
                                Create New Event Link
                                </Text><span>
                                <button 
                                onClick={() => setIsOpen(false)}
                                    style={{
                                        border: "none",
                                        background: "none",
                                        marginLeft: "520px",
                                        
                                    }}>
                                    <SvgCloseSmall />
                                </button></span>
                            </Flex>
                            
                            <div style={{
                                width: "80%",
                            }}>
                                <br/>
                                <Flex row marginBottom={10}>
                                    <Flex marginRight={"45px"}>
                                        {/* <Text className={styles.txt}>Event Name</Text> */}
                                        <div style={{ width: "302px" }}>
                                            <InputText 
                                            label = "Event Name"
                                            required 
                                            value={formik.values.event_name}
                                            placeholder="Enter event name"
                                            onChange={(e) => {
                                                    formik.setFieldValue('event_name',e.target.value);
                                                    // setButton(false);
                                                }} />
                                                 <ErrorMessage
                                                    name={'event_name'}
                                                    errors={formik.errors}
                                                    touched={formik.touched}
                                                />
                                        </div>
                                    </Flex>
                                    <Flex>
                                        <div style={{ width: "302px" }}>
                                            <SelectTag
                                                id="Event_Type"
                                                options={eventType}
                                                label="Event Type"
                                                required
                                                value={
                                                    eventType
                                                    ? eventType.find(
                                                        (option) =>
                                                          Number(option.label) ===
                                                          Number(formik.values.event_type),
                                                      )
                                                    : eventType.find(
                                                        (option) =>
                                                    Number(option.label) ===
                                                    Number(formik.values.event_type),
                                                    )
                                                    }                                                    
                                                placeholder="Select event type"
                                                onChange={(option) => {
                                                    formik.setFieldValue('event_type',option.label);
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
                            
                        
                              {formik.values.event_type === 'On-site Interview' ?
                                (<Flex row marginBottom={10}>
                                    <div style={{ width: "620px"}}>
                                        <InputText
                                            label="Location"
                                            placeholder="Add location"
                                            value={formik.values.location}
                                            onChange={(e: any) => {
                                                formik.setFieldValue('location',e.target.value);
                                                // setButton(false);
                                            }}
                                        />
                                         <ErrorMessage
                                            name={'location'}
                                            errors={formik.errors}
                                            touched={formik.touched}
                                            />
                                    </div>
                                </Flex>) : " " }
                             
                             
                               
                                     
                                <br/>
                                <Flex row marginBottom={10}>    
                                    <Flex>
                                        <Text className={styles.txt}>Date Range</Text>
                                        <Flex row>
                                            <InputRadio onClick={() => {
                                                setdateRadio(!dateRadio)
                                                setradio(!radio)
                                            }} checked={radio} 
                                            />
                                            <div style={{ width: "81px", marginRight: "10px" }}>
                                                <InputText   
                                                    keyboardType='number'                                                
                                                    value={formik.values.dateRange}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('dateRange',e.target.value)
                                                    }} />
                                                      <ErrorMessage
                                                        name={'dateRange'}
                                                        errors={formik.errors}
                                                        touched={formik.touched}
                                                        />
                                            </div>  
                                            <div style={{ width: "180px" }}>
                                                <SelectTag
                                                    options={days}
                                                    placeholder="Calendar Days"
                                                    value={
                                                        days
                                                        ? days.find(
                                                            (option) =>
                                                              Number(option.value) ===
                                                              Number(formik.values.days),
                                                          )
                                                        : ''
                                                        }
                                                    onChange={(option) => {
                                                        formik.setFieldValue('days',option.label)
                                                    }}
                                                ></SelectTag>
                                                  <ErrorMessage
                                                        name={'days'}
                                                        errors={formik.errors}
                                                        touched={formik.touched}
                                                        />
                                            </div>
                                        </Flex>
                                    </Flex>
                                    <Flex marginLeft={"45px"}>
                                        <Text>Within a date range</Text>
                                        <Flex row>
                                            <InputRadio onClick={() => {
                                                setdateRangeRadio(!dateRangeRadio)
                                                setradio(!radio)
                                            }} checked={!radio}
                                             />                                           
                                      
                                            <div 
                                            // style={{
                                            //     border: "1px solid var(--color-gary-5, #cccccc)",
                                            //     outline: "none",
                                            //     fontSize: "14px",
                                            //     backgroundColor: "var(--color-white, #ffffff)",
                                            //     width: "268px",
                                            //     height: "36px",
                                            //     boxSizing: "border-box",
                                            //     fontFamily: "'Roboto', sans-serif",
                                            //     padding: "4px 12px 3px 12px",
                                            //     borderRadius: "4px",
                                            // }}
                                            >
                                                <Flex row marginLeft={"45px"} >
                                                  
                                                    <div
                                                    style={{
                                                        // width: "302px",
                                                        marginLeft : "10px",
                                                    }}
                                                        // showOneCalendar
                                                        // format='dd/MM/yyyy'
                                                        // placeholder ="Choose your Date Range"                                                       
                                                        // onSelect={(date)=> {
                                                        //     formik.setFieldValue('startdate',date)
                                                        // }}
                                                        // onOk = {(date)=>{
                                                        //     formik.setFieldValue('enddate',date)
                                                        // }}
                                                        // onOk = {(date)=>{
                                                        //     formik.setFieldValue('startdate',date[0])
                                                        //     formik.setFieldValue('enddate',date[1])
                                                        // }}
                                                      
                                                        // defaultCalendarValue={duration
                                                        //     ? duration.find(
                                                        //         (option) =>
                                                        //           Number(option.value) ===
                                                        //           Number(formik.values.duration),
                                                        //       )
                                                        //     : ''
                                                        //     }
                                                        
                                                        //  placeholder = "Select Date Range"
                                                        //  onChange={(date: Date) => setStartDate(date)}
                                                        //  placeholderText={"Choose your date range"}
                                                        //  dateFormat="dd/MM/yyyy"
                                                        //  className={styles.datepicker}
                                                        //  value = {formik.values.startdate}
                                                        //  selectsStart = {true}
                                                        //  startDate={startDate}
                                                        //  endDate ={endDate}   
                                                        //  inline   ={true}                                                              
                                                   /> 
                                        
                                                   <DatePicker
                                                   
                                                            // selected={selectedRange.startDate}
                                                            // selectsRange={selectedRange}
                                                            onChange={handleDateChange}
                                                            // onChange={()=>{
                                                            //     handleDateChange
                                                                // formik.setFieldValue("startDate",selectedRange.startDate)
                                                                // formik.setFieldValue("enddate",selectedRange.endDate)
                                                            // }}
                                                            selectsStart
                                                            startDate={selectedRange.startDate}
                                                            endDate={selectedRange.endDate}
                                                            placeholderText="Select start date and end date"
                                                            
                                                            // inline
                                                            // onChange = {(date)=>{
                                                            // onDateChange(date)
                                                            // formik.setFieldValue('startdate',selectedRange.startDate)
                                                            // formik.setFieldValue('enddate',selectedRange.endDate)
                                                            //  }}
                                                            // styles={{ 
                                                            //     idth: '300px',
                                                            //     height: '40px',
                                                            //     fontSize: '16px' }} 
                                                            className="my-datepicker"                                                      
                                                            />
                                                           
                                                        <ErrorMessage
                                                            name={'startDate'}
                                                            errors={formik.errors}
                                                            touched={formik.touched}
                                                            />
                                            
                                                </Flex>
                                            </div>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            
                                <Flex row marginBottom={10}>
                                   
                                    {/* <div style={{ width: "81px", marginRight: "10px" }}>
                                    <Text className={styles.txt}>Duration</Text> */}
                                        {/* <InputText
                                            label="Duration"
                                            value={durationrange}
                                            onChange={(option: any) => {
                                                setdurationrange(option.target.value)
                                            }} /> */}
                                    {/* </div> */}
                                    {/* <div style={{ width: "180px", marginRight: "32px", marginTop: "23px" }}>
                                        <SelectTag
                                            options={durationlist}
                                            value={durations}
                                            onChange={setduration}
                                        ></SelectTag>
                                    </div> */}
                                    <Flex row>
                                     <div style={{ width: "302px" }}>
                                            <SelectTag
                                                options={duration}
                                                label="Duration"                                                
                                                placeholder={"Select the Duration"}
                                                value={duration
                                                    ? duration.find(
                                                        (option) =>
                                                          Number(option.value) ===
                                                          Number(formik.values.duration),
                                                      )
                                                    : ''
                                                    }
                                                onChange={(option) => {
                                                    formik.setFieldValue('duration',option.label);
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
                                <Flex >
                                    <div style={{ 
                                        width: "302px",
                                        marginLeft :"45px"
                                        //  marginRight: "190px", marginTop: "23px"
                                          }}>
                                        <SelectTag
                                            options={timezone}
                                            label="Choose your Time zone"
                                            placeholder={"Select your Time zone"}
                                            value={timezone
                                                ? timezone.find(
                                                    (option) =>
                                                      Number(option) ===
                                                      Number(formik.values.timezone),
                                                  )
                                                : ''
                                                }
                                            onChange={(option) => {
                                                formik.setFieldValue('timezone',option.offset);
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
                         
                           </div>
                            <Text style={{
                                paddingTop: '1px'
                            }}>Interviewers (choose your date for interview)</Text>
                            <Flex row>
                       {interviewerData.map((name: any) => 
                       <Flex row key={1}>
                                    <div
                                        style={{
                                            height: "40px",
                                            width: "120px",
                                            border: "solid 1px #b3b3b3",
                                            padding: " 8 8 8 8px",
                                        }}>
                                        <Flex row>
                                            <div style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#fcc203",
                                                height: "26px",
                                                width: "26px",
                                                textAlign: "center",
                                                margin: "5px"
                                            }}>
                                                <Text style={{
                                                    fontSize: "11px",
                                                    margin: "7px",
                                                    alignContent: "center"
                                                }}>{name.interviewers}</Text>
                                            </div>
                                            <Text style={{
                                                fontSize: "11px",
                                                marginTop: "12px"
                                            }}> Name</Text>
                                        </Flex>
                                    </div>
                                </Flex>
                                )}
                                <Modal
                                    // open={modalonwIsOpen}
                                    onClose={close}>
                                    <div style={{
                                        backgroundColor: "#fff",
                                        padding: "10px 30px",
                                        overflowY: 'scroll',
                                        width: "602px"
                                    }}
                                    >
                                        <Flex row>
                                            <Text style={{
                                                fontSize: '18px',
                                                color: '#581845',
                                                fontWeight: 'bold',
                                            }}>
                                                Interviewers
                                            </Text>
                                            <button onClick={() => setoneIsOpen(false)} style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "420px",                                                                                        
                                            }}>
                                                <SvgCloseSmall/></button>
                                        </Flex>
                                       
                                        <div style={{ marginBottom: "24px", }}>
                                            <Text >
                                                Select the team members for this interview
                                            </Text>
                                        </div>
                                        <Text >
                                            Team Members
                                        </Text>
                                        <InputText
                                            style={{
                                                width: "563px",
                                                marginBottom: "27px",
                                                marginTop: "5px"
                                            }}
                                            placeholder='Select team members'
                                        />
                                        {nameList.map(name => <Flex row key={2}>
                                            <div style={{
                                                marginBottom: "9px",
                                                marginRight: "5px"
                                            }}>
                                                <InputCheckBox 
                                                // onChange={() => {
                                                //     Check(name.name)
                                                //     setActive(true)
                                                //      // setCheck(!ischeck);
                                                //     {console.log("InputCheckBox(")}
                                                //     // setCheck(!ischeck);
                                                //     // if (ischeck === false) {  
                                                //     //     name.checked =true                                                      
                                                //     //     temp.push(name)
                                                //     //     console.log('interviewer``', temp)
                                                //     // } else { 
                                                //     //     console.log('interviewer[[[', temp)
                                                //     //     return null 
                                                //     // }
                                                // }}
                                                // checked={false}
                                                onClick={()=>{
                                                    onCheckbox()                                                    
                                                    Check(name.name)                                                    
                                                    {console.log("ischeckkkkkk",ischeck)}
                                                    if (ischeck === false) {  
                                                        name.checked = true                                                      
                                                        temp.push(name)                                                           
                                                        setActive(false)  
                                                        console.log('interviewer``', temp)                                                        
                                                    } else { 
                                                        console.log('interviewer[[[', temp)
                                                        return null 
                                                    }
                                                }}
                                                />
                                            </div>
                                            <Text size={14} >{name.name}</Text>
                                        </Flex>
                                        )}
                                    </div> 
                                </Modal>
                                <div>
                                    
                                    <Flex row>                                 
                                    <Text style={{                                        
                                        border: "10px",  
                                        background : "white",
                                        borderBlock  : "10px"                                    
                                        // innerWidth : "10px",
                                        // innerHeight :"10px",                                                                              
                                        // background: "none",
                                    }}>Hema Rekha</Text>                         
                                    <button onClick={() => setoneIsOpen(true)} style={{
                                        border: "none",
                                        background: "none",
                                        marginLeft: "20px",
                                        // marginTop: "0px"
                                    }}> 
                                        <SvgRoundAdd width={18}
                                            height={18}
                                            fill={"#581845"} />
                                    </button>
                                    </Flex>                                    
                                </div>
                            </Flex>
                            <Flex>
                            <div style={{
                                width: "100%",
                                border: '1px solid  #b3b3b3',
                                padding: '18px 47px 12px 27px',
                                borderRadius: '4px',

                            }}>
                                <Flex row>
                                {formik.values.days === "Calendar Days" ? 
                                    (
                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"
                                    }}>
                                        <InputCheckBox 
                                        onChange={() => day("1")} 
                                        key={1} 
                                        />
                                    </div>
                                    ) : <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"
                                    }}>
                                        <InputCheckBox 
                                        onChange={() => day("1")} 
                                        key={1} 
                                        disabled={true}
                                        />
                                    </div> }
                                    <div style={{
                                        marginRight: "41px",
                                    }}>
                                        <Text className={styles.txt}>Sunday</Text>
                                    </div>
                                {formik.values.days === "Calendar Days" ? 
                                    (<Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"
                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value : "0",
                                                        label : "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                           {/* {copymodal1 ? 
                                            <Component/> : ""} */}
                                        </Flex>                                       
                                        {/* {Array.from(Array(counter1)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>
                                                </div>
                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter1(counter1 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none"
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })} */}
                                    </Flex> )  : "unavailble" }
                                  
                                    {formik.values.days === "Calendar Days" ? 
                                    (<Flex row>
                                        <div>
                                            <button 
                                             onClick={() => setCopyModal1(true)}
                                            // onClick={()=>
                                            // <AddTime data= {"1"}/>}                                            
                                               style={{
                                               border: "none",
                                                background: "none",
                                                position: "relative",
                                                marginLeft : "10px"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />                                            
                                            </button>
                                            {/* {copymodal1 ?  <Component/> : ""} */}
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={()=>setCopyModal1(true)}>
                                                   
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal
                                             open={copymodal}
                                             onClose={close}>
                                                <div style={{ 
                                                    position: "relative",
                                                    background: "#ffffff",
                                                    padding: "20px",
                                                    width : "190px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text><br/>
                                                    </Flex>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />{" "}
                                                        <Text>Wednesday</Text><br/>
                                                    </Flex>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex>
                                                    <Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <br/>
                                                    <Button onClick={closeCopyModal}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                        {/* {counter2 > 0 ? ( <AddTime />) : " " } */}
                                    </Flex>)  : "" }
                                </Flex> 
                                <Flex row>

                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"

                                    }}>
                                        <InputCheckBox onClick={() => day("2")} />
                                    </div>
                                    <div style={{
                                        marginRight: "39px"
                                    }}>
                                        <Text className={styles.txt}>Monday</Text>
                                    </div>
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>
                                            </div>
                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {/* {Array.from(Array(counter2)).map((c) => {
                                            return  */}
                                        
                                          {/* { ? */}
                                            <Flex row  marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>
                                                </div>
                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button 
                                                    // onClick={() => setCounter2(counter2 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none",
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                            {/* : " " } */}
                                            
                                    </Flex>
                                    <Flex row>
                                        <div>
                                            <button 
                                            // onClick={() => handleClicks(setCounter2, counter2)} 
                                            // onClick={() => setCounter2(1)} 
                                            onClick={()=> setIsSunday(true)}
                                            style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "0px"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            
                                            
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal1(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal1}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal1(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox checked disabled/>
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal1(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>
                                </Flex>
                                <Flex row>

                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"

                                    }}>
                                        <InputCheckBox onClick={() => day("3")} />
                                    </div>
                                    <div style={{
                                        marginRight: "35px"
                                    }}>
                                        <Text className={styles.txt}>Tuesday</Text>
                                    </div>
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {Array.from(Array(counter3)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"

                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                        key={c}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>

                                                </div>

                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}                                                      
                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter3(counter3 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none"
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })}
                                    </Flex>
                                    <Flex row>
                                        <div>
                                            <button onClick={() => handleClicks(setCounter3, counter3)} style={{
                                                border: "none",
                                                background: "none",
                                                position: "absolute"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal2(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal2}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal2(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal2(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>
                                </Flex>
                                <Flex row>
                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"

                                    }}>
                                        <InputCheckBox onClick={() => day("4")} />
                                    </div>
                                    <div style={{
                                        marginRight: "15px"
                                    }}>
                                        <Text className={styles.txt}>Wednesday</Text>
                                    </div>
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {Array.from(Array(counter4)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"

                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                        key={c}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>

                                                </div>

                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}

                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter4(counter4 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none"
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })}
                                    </Flex>
                                    <Flex row>
                                        <div>
                                            <button onClick={() => handleClicks(setCounter4, counter4)} style={{
                                                border: "none",
                                                background: "none",
                                                position: "absolute"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal3(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal3}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal3(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal3(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>
                                </Flex>

                                <Flex row>

                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"

                                    }}>
                                        <InputCheckBox onClick={() => day("5")} />
                                    </div>
                                    <div style={{
                                        marginRight: "29px"
                                    }}>
                                        <Text className={styles.txt}>Thursday</Text>
                                    </div>
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {Array.from(Array(counter5)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"

                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                        key={c}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>

                                                </div>

                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}

                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter5(counter5 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none"
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })}
                                    </Flex>
                                    <Flex row>
                                        <div>
                                            <button onClick={() => handleClicks(setCounter5, counter5)} style={{
                                                border: "none",
                                                background: "none",
                                                position: "absolute"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal4(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal4}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal4(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal4(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>
                                </Flex>
                                <Flex row>

                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"

                                    }}>
                                        <InputCheckBox onClick={() => day("6")} />
                                    </div>
                                    <div style={{
                                        marginRight: "49px"
                                    }}>
                                        <Text className={styles.txt}>Friday</Text>
                                    </div>
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {Array.from(Array(counter6)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"

                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                        key={c}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>

                                                </div>

                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}

                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter6(counter6 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none"
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })}
                                    </Flex>
                                    <Flex row>
                                        <div>
                                            <button onClick={() => handleClicks(setCounter6, counter6)} style={{
                                                border: "none",
                                                background: "none",
                                                position: "absolute"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal5(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal5}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                    <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal5(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal5(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>
                                </Flex>

                                <Flex row>
                                {formik.values.days ==="Calendar Days" ?                                 
                                    (<div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"
                                    }}>
                                        <InputCheckBox onClick={() => day("7")} />
                                    </div>
                                    ) : (
                                    <div style={{
                                        marginRight: "5px",
                                        marginTop: "2px"
                                    }}>
                                        <InputCheckBox 
                                        disabled = {true}
                                        />
                                    </div>) }

                                    <div style={{
                                        marginRight: "31px"
                                    }}>
                                        <Text className={styles.txt}>Saturday</Text>
                                    </div>
                                    {formik.values.days ==="Calendar Days" ?
                                    (
                                    <Flex>
                                        <Flex row>
                                            <div style={{
                                                marginRight: "30px",
                                                width: "119px",
                                                height: "32px"

                                            }}
                                            >
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "9.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                            <div style={{
                                                marginRight: "30px"
                                            }}>
                                                <Text className={styles.txt}>to</Text>

                                            </div>

                                            <div style={{
                                                marginRight: "20px",
                                                width: "119px",
                                                height: "32px"
                                            }}>
                                                <SelectTag
                                                    options={time}
                                                    placeholder={"time"}
                                                    defaultValue={{
                                                        value: "0",
                                                        label: "6.00",
                                                    }}
                                                ></SelectTag>
                                            </div>
                                        </Flex>
                                        {Array.from(Array(counter7)).map((c) => {
                                            return <Flex row key={c} marginTop={5}>
                                                <div style={{
                                                    marginRight: "30px",
                                                    width: "119px",
                                                    height: "32px"

                                                }}
                                                >
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}
                                                        key={c}
                                                    ></SelectTag>
                                                </div>
                                                <div style={{
                                                    marginRight: "30px"
                                                }}>
                                                    <Text className={styles.txt}>to</Text>

                                                </div>

                                                <div style={{
                                                    marginRight: "20px",
                                                    width: "119px",
                                                    height: "32px"
                                                }}>
                                                    <SelectTag
                                                        options={time}
                                                        placeholder={"time"}

                                                    ></SelectTag>
                                                </div>
                                                <div>
                                                    <button onClick={() => setCounter7(counter7 - 1)}
                                                        style={{
                                                            border: "none",
                                                            background: "none",
                                                        }}>
                                                        <SvgCloseSmall />
                                                    </button>
                                                </div>
                                            </Flex>
                                        })}
                                    </Flex>  ) : "Unavailble" }
                                    {formik.values.days ==="Calendar Days" ?
                                    (<Flex row>
                                        <div style={{ position: "relative" }}>
                                            <button onClick={() => handleClicks(setCounter7, counter7)} style={{
                                                border: "none",
                                                background: "none",
                                                position: "relative"
                                            }}>
                                                <SvgRoundAdd width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            <button style={{
                                                border: "none",
                                                background: "none",
                                                marginLeft: "30px"
                                            }}
                                                onClick={() => setCopyModal6(true)}>
                                                <SvgCopy width={18}
                                                    height={18}
                                                    fill={"#581845"} />
                                            </button>
                                            <CopyModal open={copymodal6}
                                                onClose={close}>
                                                <div style={{ position: "relative", background: "#ffffff", padding: "20px" }}>
                                                    <div>
                                                        <Text style={{ fontWeight: "bold" }}>Copy Times to....</Text>
                                                        <Button style={{
                                                            border: "none",
                                                            background: "none",
                                                        }} onClick={() => setCopyModal6(false)}>
                                                            <SvgCloseSmall />
                                                        </Button>
                                                    </div>
                                                    <Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Sunday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Monday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Tuesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Wednesday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Thursday</Text>
                                                    </Flex><Flex row marginBottom={10}>
                                                        <InputCheckBox />
                                                        <Text>Friday</Text>
                                                    </Flex><Flex row >
                                                        <InputCheckBox />
                                                        <Text>Saturday</Text>
                                                    </Flex>
                                                    <Button onClick={() => setCopyModal6(false)}>Apply</Button>
                                                </div>
                                            </CopyModal>
                                        </div>
                                    </Flex>):" "}
                                  
                                </Flex>
                            </div></Flex>
                       
                            <div style={{
                                width: '100%',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}>
                            <Text>Time Zone Display
                                <br/>
                            </Text>
                           
                               <Flex column>
                                {timezonedisplay.map((jobList) => {
                                    return (
                                    <Flex row key={jobList.value}>
                                        <InputRadio                                     
                                        // label={`Option 1 | Option 2 | Option 3`}
                                        label= {jobList.label}
                                        checked={jobList.label === formik.values.timezonedisplay}
                                        onClick={() => formik.setFieldValue('timezonedisplay', jobList.label)}
                                        // style={{ display: 'flex', flexDirection: 'column' }}
                                       />                               
                                    </Flex>
                                    );
                                })}
                                </Flex>
                                </div>
                                   
                            {/* <div style={{
                                width: '100%',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}>
                                */}
                           
                               
                                {/* <Flex row>
                                  <InputRadio
                                        label="Lock the timezone (best for in-person events"
                                        checked={false}
                                        // onClick={() => {
                                        //     setzoneDisplayb(!zoneDisplayb)
                                        //     setradiozone(!radiozone)
                                        // }}
                                        onClick = {() =>{
                                            formik.setFieldValue('timezonedisplay','Lock the timezone (best for in-person events')
                                        }}
                                    />
                                        <ErrorMessage
                                            name={'timezonedisplay'}
                                            errors={formik.errors}
                                            touched={formik.touched}
                                            />
                                </Flex>  */}
                            {/* </div> */}
                        
                        
                            <div> 
                                <Text>Descriptions / instructions</Text>
                                <Flex>
                                    <InputText
                                        value={formik.values.description}
                                        onChange={(e) => {
                                            formik.setFieldValue('description',e.target.value)
                                        }}
                                        placeholder="Enter the details that your invitee should know about the event."
                                        style={{
                                            border: '1px solid  #b3b3b3',
                                            borderRadius: '4px',
                                            height: '79px',
                                            marginBottom: '5px',
                                            width: '637px',
                                        }}
                                    />
                                     <ErrorMessage
                                            name={'description'}
                                            errors={formik.errors}
                                            touched={formik.touched}
                                            />
                                </Flex>
                                </div>
                                <div>
                                 <Flex row>  
                                    <div style={{   
                                        marginRight: "40px"
                                    }}>
                                    <Button 
                                    onClick={closeModal} 
                                    types={'secondary'} 
                                    >Cancel</Button>
                                    </div>                                   
                                    <div>
                                    {isButton ? (
                                   <Button 
                                   onClick={formik.handleSubmit}
                                   disabled= {!formik.isValid}
                                   >Create Link</Button>
                                    ): (
                                        <Button 
                                        onClick={formik.handleSubmit}
                                        // disabled= {!formik.isValid}
                                        > Save </Button>
                                     )} 
                                    </div>

                                </Flex>
                            </div>
                        </div>
                    </Modal>
                </div>
            </Flex>
            {(() => {
                if (load_data !== null && load_data.length > 0) {
                {console.log("newdata  if",load_data)}

                    return (
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto auto ",
                            gap: "10px"
                        }}>
                            {load_data.map((datas:any, index:number) => (
                                <div key={index}>
                                    <Card height={'142px'}  marginLeft={'24px'}  >
                                        <Flex row>
                                            <div style={{
                                                paddingLeft: "16px",
                                                paddingTop: "14px",
                                                paddingBottom: "10px",
                                                fontWeight: "bold",
                                                fontSize: "14px",
                                                textAlign: "left",
                                            }}>
                                                <Text>
                                                    {datas.event_name}
                                                </Text>
                                            </div>
                                            <div style={{ position: "static", marginTop: "10px", marginLeft: "265px", }}>
                                                <button style={{ border: "none", background: "white", zIndex: -4 }}
                                                    // onClick={() => setShareLinkModal(true)}
                                                    >
                                                    {/* <SvgShareIcon fill={"#581845"} height={17} width={17} /> */}
                                                </button>
                                            </div>
                                            <div style={{ position: "static", marginTop: "10px", marginLeft: "15px", }}>
                                                <button style={{ 
                                                    border: "none", 
                                                    background: "white", 
                                                    zIndex: -4}}
                                                    onClick={() => onsettingClick(datas)}>
                                                          {/* onClick={() => setCopyModal11(true)}> */}
                                                    <SvgSetting fill={"#581845"} height={17} width={17} />
                                                </button>                                                                                
                                                <Modal
                                                        open={copyModal11}
                                                        onClose={close}
                                                        >                                                    
                                                    <div style={{   
                                                        backgroundColor: "#fff",
                                                        padding: "10px 10px",
                                                        overflowY: 'scroll',
                                                        // width: "602px"
                                                        // backgroundColor: "#fff",
                                                        // padding: "10px 30px",
                                                        // overflowY: 'scroll',
                                                        // width: "629px"
                                                            }}>
                                                            <Flex>
                                                                <Flex row>
                                                                    <SvgEdit width={15} height={15} />
                                                                    <Button style={{
                                                                        border: "none",
                                                                        background: "none",
                                                                    }}
                                                                    onClick={() => {                                                                    
                                                                        setcopyModal11(false)
                                                                        openModalEdit()
                                                                        handleedit()
                                                                    }}
                                                                    >
                                                                        <Text>Edit</Text>
                                                                    </Button>
                                                                </Flex>
                                                                <Flex row>
                                                                    <SvgDuplicate width={15} height={15} />
                                                                    <Button style={{
                                                                        border: "none",
                                                                        background: "none",
                                                                    }} onClick={() => onDuplicate()}>
                                                                        <Text>Duplicate</Text>
                                                                    </Button>
                                                                </Flex>
                                                                <Flex row>
                                                                    <SvgTrash width={15} height={15} />
                                                                    <Button style={{
                                                                        border: "none",
                                                                        background: "none",
                                                                    }} onClick={() => handleShow()}>
                                                                        <Text>Delete</Text>
                                                                    </Button>
                                                                </Flex>
                                                            </Flex>
                                                        </div>
                                                    </Modal>
                                                </div>
                                               
                                        
                                            <Modal
                                                open={shareLinkModal}
                                                onClose={close}>
                                                <div style={{
                                                    backgroundColor: "#fff",
                                                    padding: "10px 30px",
                                                    // overflowY: 'scroll',
                                                    width: "700px",
                                                    height : "390px"
                                                }}
                                                >
                                                    <Flex row>
                                                    <div style={{ marginBottom: "10px",  }}>
                                                      <Text style={{
                                                                fontSize: '18px',
                                                                fontWeight: 'bold',
                                                                marginLeft :"10px"
                                                            }}>
                                                                {datas.event_name}
                                                            </Text>
                                                        </div>
                                                        <div style={{ marginLeft: "160px" }}>
                                                            <Text>{datas.event_type}</Text>                                                           
                                                            <Flex row>
                                                                <SvgClock width={16} height={16}   fill={'#581845'}/>
                                                                &emsp;&emsp;<Text>{datas.duration}</Text>
                                                            </Flex>
                                                        </div>
                                                    </Flex>
                                                    <div style={{ marginBottom: "24px", }}>
                                                        <Text size={14}>
                                                            Select to whom you want to share the link
                                                        </Text>
                                                    </div>
                                                    <Text >
                                                        Candidate/Applicants
                                                    </Text>
                                                    <InputText
                                                        style={{
                                                            width: "563px",
                                                            marginBottom: "27px",
                                                            marginTop: "5px"
                                                        }}
                                                        placeholder='Select team members'
                                                    />
                                                    {nameList.map(name => <Flex row key={2}>
                                                        <div style={{
                                                            marginBottom: "9px",
                                                            marginRight: "5px"
                                                        }}>
                                                            <InputCheckBox onChange={() => Check(name.name)}
                                                            />
                                                        </div>
                                                        <Text size={14} >{name.name}</Text>
                                                    </Flex>
                                                    )}
                                                    <Flex row>
                                                        <Button types="secondary" style={{ marginRight: "20px" }} onClick={() => setShareLinkModal(false)} >
                                                            Cancel</Button>
                                                        <Button types="primary" onClick={() => setShareLinkModal(false)} > Share Link</Button>
                                                    </Flex>
                                                </div>
                                            </Modal>
                                            {/* <div style={{ position: "static", marginLeft: "10px", marginTop: "10px" }}>
                                                <button style={{
                                                    border: "none",
                                                    background: "none",
                                                    marginRight:"10px"
                                                }}
                                                    onClick={() => setcopyModal11(true)}>
                                                    <SvgSetting fill={"#581845"} height={16.5} width={16.5} />
                                                </button>
                                                <Flex>
                                                <div style={{ 
                                                    position: "absolute",
                                                    width: "100px",
                                                    height: "100px" }}> */}
                                                {/* <Modal
                                                 open={copyModal11}
                                                 onClose={close}
                                                 >
                                                <div style={{ 
                                                    position: "absolute",
                                                    width : "40px",
                                                    height : "10px",
                                                      }}>
                                                        <Flex>
                                                            <Flex row>
                                                                <SvgEdit width={15} height={15} />
                                                                <Button style={{
                                                                    border: "none",
                                                                    background: "none",
                                                                }}
                                                                //  onClick={() => {
                                                                //     setcopyModal11(false)
                                                                //     openModalEdit(datas)
                                                                // }}
                                                                >
                                                                    <Text>Edit</Text>
                                                                </Button>
                                                            </Flex>
                                                            <Flex row>
                                                                <SvgDuplicate width={15} height={15} />
                                                                <Button style={{
                                                                    border: "none",
                                                                    background: "none",
                                                                }} onClick={() => setcopyModal11(false)}>
                                                                    <Text>Duplicate</Text>
                                                                </Button>
                                                            </Flex>
                                                            <Flex row>
                                                                <SvgTrash width={15} height={15} />
                                                                <Button style={{
                                                                    border: "none",
                                                                    background: "none",
                                                                }} onClick={() => setcopyModal11(false)}>
                                                                    <Text>Delete</Text>
                                                                </Button>
                                                            </Flex>
                                                        </Flex>
                                                    </div>
                                                </Modal> */}
                                                {/* </div>
                                                </Flex>
                                            </div> */}
                                        </Flex>
                                        <div style={{
                                            paddingLeft: "16px",
                                            paddingBottom: "10px",
                                            fontSize: "18px",
                                            textAlign: "left",
                                        }}>
                                            <Text>
                                                {datas.event_type}
                                            </Text>
                                        </div>
                                        <div style={{
                                            paddingLeft: "16px",
                                            paddingBottom: "10px",
                                            fontSize: "14px",
                                            textAlign: "left",

                                        }}>
                                            <Text style={{ color: "#1a1a1a", }}>
                                                {datas.duration}
                                            </Text>
                                        </div>
                                        <Flex row>
                                            <div style={{
                                                paddingLeft: "16px",
                                                paddingBottom: "10px",
                                                textAlign: "left",
                                                paddingTop: "2px",
                                                // border: "none",
                                                // background: "white", 
                                                // zIndex: -4
                                            }}>
                                                {/* <SvgShare
                                                    height={16}
                                                    width={16}
                                                    fill={"#1890ff"}
                                                /> */}
                                                <Button style={{ marginLeft: "5px", marginRight:"150px" }}
                                                 types="link" 
                                                //  onClick={() => {                                                                    
                                                    // setcopyModal11(false)
                                                    // openModalEdit(datas)
                                                    // editview(e,datas)
                                                // }}
                                                 onClick={setShareLinkModal}
                                                 >Share Link</Button>
                                            </div> 
                                            {!isEmpty(datas.interviewer) ? 
                                            (<div style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#fcc203",
                                                height: "26px",
                                                width: "26px",
                                                marginLeft:"210px",  
                                                textAlign : "center",                                                
                                             }}>
                                                <Text size={14} align="center">{getInitials(datas.interviewer)}</Text>
                                            </div>) : "" }
                                            {/* {interviewerData.map((name: any) => <Flex row key={1}>
                                            <div style={{
                                                borderRadius: "15px",
                                                backgroundColor: "#fcc203",
                                                height: "26px",
                                                width: "26px",
                                                marginRight:"5px"   
                                            }}>
                                                <Text style={{
                                                    fontSize: "14px"
                                                }}>{datas.interviewer}</Text>
                                            </div>
                                </Flex>
                                )} */}
                                        </Flex>
                                    </Card>  
                                </div>
                            ))}
                        </div>
                        )
                }else{
                    
                    return(
                        <Flex>                       
                        <Flex className={styles.txt1}>                             
                            <Flex top> 
                             <SvgLink width={16} height={16} fill ={"currentColor"}  /> 
                               </Flex>
                            <Text className={styles.txt3}>
                                No schedular links created yet
                            </Text>
                        </Flex>
                        <Flex className={styles.txt2}>
                            <Text className={styles.txt3}>
                                Scheduler links allow candidates to pick a date and time that works for them.
                            </Text>
                        </Flex>
                    </Flex>
                    )

                }
            })()}
            <div style={{
                // paddingLeft: "16px",
                // paddingBottom: "10px",
                fontSize: "14px",
                height : "350px",
                // textAlign: "center",
                marginTop: "16px",
                marginLeft : '120px',
                marginBottom : "70px"
            }}> 
           
       {
                (() => {
                //  if (userAdded === false && newdata === null) {                    
                    // if (newdata.length > 0) {    
                    //     return (
                    //         <div style={{
                    //             border: "none",
                    //             background: "none",
                    //         }}>
                    //         <Flex
                    //         row
                    //         wrap
                            
                    //             // marginLeft={'1px'}
                    //             // marginRight={'1px%'}
                    //       >
                    //         {newdata &&
                    //           newdata.map((data, index) => (
                    //             <div
                    //               key={data.event_id}
                    //               style={{
                    //                 marginRight: index % 2 === 0 ? 10 : 0,
                    //                 marginLeft: index % 2 === 0 ? 0 : 10,
                    //                 marginBottom: 30,
                    //                 // marginTop: 30,
                    //                 position: 'relative',
                    //                 width: '30%',
                    //                 height :'30%',
                                   
                    //               }}
                    //             >
                    //               <Card className={styles.cardPadding}>
                    //                 <Flex row>
                    //                   <Flex columnFlex flex={8}>    
                    //                   <div style={{ position: "static", }}>                                   
                    //                       <Text
                    //                       style={{
                    //                         fontSize: '16px',
                    //                         color: '#581845',
                    //                         fontWeight: 'bold',   
                    //                         paddingTop: '1px' ,
                    //                         textOverflow: "ellipsis"
                    //                         }}
                    //                           >
                    //                        &emsp;&emsp; {data.event_name}
                    //                        </Text>  
                    //                             <button style={{
                    //                                 border: "none",                                                   
                    //                                 marginRight:"10px",
                    //                                 marginLeft : "40px",                                                  
                                                    
                    //                             }}
                    //                                 // onClick={() => setcopyModal11(true)}
                    //                                 >
                    //                                 <SvgShareIcon fill={"#581845"} height={16.5} width={16.5} />
                    //                             </button>                                     
                                           
                    //                             <button style={{
                    //                                 border: "none",                                                   
                    //                                 marginRight:"10px",
                    //                                 marginLeft : "1px"
                    //                             }}
                    //                                 onClick={() => setcopyModal11(true)}>
                    //                                 <SvgSetting fill={"#581845"} height={16.5} width={16.5} />
                    //                             </button>
                    //                             <div >
                    //                             <CopyModal

                    //                             open={copyModal11}
                    //                                 onClose={close}>
                    //                                 <div style={{ 
                    //                                     position: "relative",
                    //                                     background: "#ffffff",                                                        
                    //                                     width : "40px",
                    //                                     height : "80px",
                    //                                     // marginLeft : "20px",
                    //                                     // marginRight : "10px",
                    //                                     padding : "0px"
                    //                                     }}>
                    //                                     <Flex>                                                            
                    //                                         <Flex row>
                    //                                             <SvgEdit width={18} height={18} fill={'#979797'} />
                    //                                             <Button style={{
                    //                                                 border: "none",
                    //                                                 background: "none",                                                                    
                    //                                             }} onClick={() => {
                    //                                                 setcopyModal11(false)
                    //                                                 // openModalEdit(datas)
                    //                                             }}>
                    //                                                 <Text>Edit</Text>
                    //                                             </Button>
                    //                                         </Flex>
                    //                                         <Flex row>
                    //                                             <SvgDuplicate width={18} height={18} />
                    //                                             <Button style={{
                    //                                                 border: "none",
                    //                                                 background: "none",
                    //                                             }} 
                    //                                             // onClick={() => setcopyModal11(false)}
                    //                                             onClick={() =>duplicatedata(data)}
                    //                                             >
                    //                                                 <Text>Duplicate</Text>
                    //                                             </Button>
                    //                                         </Flex>
                    //                                         <Flex row>
                    //                                             <SvgTrash width={18} height={18} />
                    //                                             <Button style={{
                    //                                                 border: "none",
                    //                                                 background: "none",
                    //                                             }} onClick={() => setcopyModal11(false)}>
                    //                                                 <Text>Delete</Text>
                    //                                             </Button>
                    //                                         </Flex>
                    //                                     </Flex>
                    //                                 </div>
                    //                             </CopyModal>
                    //                             </div>
                    //                         </div>
                                               
                    //                       <Text>                                            
                    //                       &emsp;&emsp; {data.event_type}
                    //                        </Text>
                    //                        <br/>
                    //                       <Text>
                    //                       &emsp;&emsp; {data.duration}
                    //                      </Text>
                    //                      <br/>  
                    //                      <Text>
                    //                     {/* {getInitials(data.interviewer)} */}
                    //                     {data.interviewer}
                    //                     </Text>
                    //                   </Flex>                                      
                    //                 </Flex>                                   
                    //               </Card>
                    //             </div>
                    //           ))}
                    //       </Flex> 
                    //        </div>               
                    //     )
                      
                    // }else{
                        // return(
                        //     <Flex>                       
                        //     <Flex className={styles.txt1}>                             
                        //         <Flex top> 
                        //          <SvgChainLink width={30} height={30} /> 
                        //            </Flex>
                        //         <Text className={styles.txt3}>
                        //             No schedular links created yet
                        //         </Text>
                        //     </Flex>
                        //     <Flex className={styles.txt2}>
                        //         <Text className={styles.txt3}>
                        //             Scheduler links allow candidates to pick a date and time that works for them.
                        //         </Text>
                        //     </Flex>
                        // </Flex>
                        // )
                    // }
                    return null;
                })()
            }
            </div>
           
        </div >
     </Card>

     <CancelAndDeletePopup
        btnCancel={() =>onCancel()}
        title={
          <Flex className={styles.popUpFlex}>
            <Text>
              Users will be unable to schedule further meeting with deleted event types.
              <br/>
              Meetings previously scheduled will not affected.
            </Text>
            <Text>Are you sure to proceed?</Text>
          </Flex>
        }
        btnDelete={onDelete}
        btnLeft="Cancel"
        btnRight="Delete"
        open={deleteModal}
        // loader={deleteBtnLoader}
      />

      
      </>   
    );
}


export default SlotterScreen;