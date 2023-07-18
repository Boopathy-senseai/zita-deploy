import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIn, isEmptyArray, useFormik } from 'formik';
import { eventSchedulerApi } from '../../routes/apiRoutes';
import Card from '../../uikit/Card/Card';
import Button from '../../uikit/Button/Button';
import SvgAdd from '../../icons/SvgAdd';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Modal from '../../uikit/Modal/Modal';
// import SvgLink from '../../icons/SvgLInk';
import Loader from '../../uikit/Loader/Loader';
import { AppDispatch, RootState } from '../../store';
import DashBoard from './DashBoard';
import CreateNewEvent from './CreateNewEvent';
import { dashboard, overall } from './eventType';
import styles from './eventscheduler.module.css';
import OverAll from'./TeamMail/Overall.json';
import IfData from './TeamMail/IfData.json'
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';


const EventScheduler = (props) => {
  const {event} = props;
  console.log(">?>?>?>?>?",props)
  const dispatch: AppDispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const [editid,setEditId] = useState(0);
  const [editlist,setEditList] = useState();

  const [setting ,SetSetting] = useState(false);
  const [isLoader,setisLoader] = useState(false);
  const [sharedata,setsharedata] = useState([]);
  const [schedule,setschedule] = useState([]);

  const[open,setopen]=useState(0)

  const setboard=(val)=>{
    setopen(val)
  }

  console.log("editideditideditideditideditid",editid)

  const { data,interviewer,shareLink,addmembers,datetime,isLoading,success } = useSelector(
    ({ schedulerReducers }: RootState) => ({
      isLoading:schedulerReducers.isLoading,
      data: schedulerReducers.data,
      interviewer : schedulerReducers.interviewer,
      shareLink : schedulerReducers.shareLink,
      addmembers : schedulerReducers.addmembers,
      datetime :  schedulerReducers.datetime,
      success : schedulerReducers.suceess,
    }),
  );

  console.log("datadata",data)
  console.log("interviewerinterviewer((((((",interviewer)
  console.log("sharelink",shareLink)
  console.log("datetimedatetimedatetime",datetime,success)
  console.log("addmembers>>>>>>>>",addmembers)

  useEffect(() => {
      console.log('EventScheduler!!!');
      alert("*")
        setisLoader(true);
        dispatch(getScheduleMiddleWare(undefined))
        .then((res: any) => {
        setisLoader(false)
       });
  },[]);

  function editdata(id : number ,datalist : any){
    console.log("<><><><><><>><><><><><><><",id,datalist)
    if (id !== undefined && id !== null){
    setIsOpen(true);
    setEditList(datalist)
    dispatch(getScheduleMiddleWare(id)).then((res)=>{
      dispatch(getScheduleMiddleWare(undefined))
    })}
  
  if (datetime !== undefined){
    alert("6767676")
    // setschedule(datetime)
  }
  }
  const response = data;
  // const response = OverAll.data;
  console.log("response",response,typeof(response))
  console.log("responsescheduleschedule",schedule,typeof(schedule))


  console.log("openopenopenopenopenopenopenopenopen",open)



  const CreateEvent = () => {
    setIsOpen(true)
    setEditList(null)    
  }
  

  // if(isLoading){
  //   return <Loader />
  // }

  return (
    <Flex className={styles.element}>
       <Flex row className={styles.initial}>
          <Text className={styles.headertxt}>
            Share your availability with candidates and schedule events
          </Text>
          <Button
            types="primary"
            className={styles.newlink}
            onClick={CreateEvent}
          >
            <Text style={{color :"white"}}>+ Create Event</Text>
          </Button>
          {isopen ? (
            <Modal open={isopen} onClose={close}>
              <CreateNewEvent
              isopen ={isopen}
              setIsOpen ={setIsOpen}
              editModel ={editlist}
              // datetime ={IfData.datetime}
              datetime = {datetime}
              setEditList ={setEditList}
              teammembers = {addmembers}  
              // intern = {IfData.interviewer}
              intern = {interviewer}
              // teammembers = {addmembers}              
              setisLoader = {setisLoader}  
              schedule ={schedule}
               />
            </Modal>
            
          ) : (
            ''
          )}
        </Flex>
        
      <div className={styles.outline}>
        <Flex row>
      {response?.length > 0 ? 
        <Text className={styles.eventtxt}>Event</Text>
        : ""}
        </Flex>
        {/* <div style={{marginTop :"10px"}}></div> */}
        <Flex>
        {response?.length > 0 ? (
          <Flex className={styles.gird}>
            {response &&
              response?.map((list, index) => {
                console.log("listlist",list)
                return (                 
                  <Flex key={index}>
                  <DashBoard
                    list={list}
                    index ={index}
                    editdata ={editdata}
                    editid ={editid}
                    setEditId={setEditId}
                    // response = {OverAll.shareLink}
                    response ={shareLink}
                    details = {list}
                    interview = {interviewer} 
                    // interview = {OverAll.interviewer}
                    setting ={setting}
                    SetSetting ={SetSetting}
                    sharedata ={sharedata}
                    setsharedata ={setsharedata}
                    setisLoader ={setisLoader}  
                    setboard={setboard}
                    opens={open}
                  />
                  </Flex>
                );
              })}
          </Flex>
        ) : (
          <Flex className={styles.noevent}>
            <Flex>
              <div style={{marginLeft :"990px"}}>
              {/* <SvgLink width={16} height={16} fill={'currentColor'} />     */}
              </div>         
              <Text style={{marginLeft :"900px"}}> No schedular links created yet</Text>       
              <Text style={{marginLeft :"800px"}}>Scheduler links allow candidates to pick a date and time that works for them.
              </Text>
            </Flex>
          </Flex>
        )}
        <Flex>
        </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default EventScheduler;
