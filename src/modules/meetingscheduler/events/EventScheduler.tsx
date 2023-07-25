import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIn, isEmptyArray, useFormik } from 'formik';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import Card from '../../../uikit/Card/Card';
import Button from '../../../uikit/Button/Button';
import SvgAdd from '../../../icons/SvgAdd';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Modal from '../../../uikit/Modal/Modal';
import SvgLink from '../../../icons/SvgLInk';
import Loader from '../../../uikit/Loader/Loader';
import Toast from '../../../uikit/Toast/Toast';
import { AppDispatch, RootState } from '../../../store';
import DashBoard from './DashBoard';
import CreateNewEvent from './CreateNewEvent';
import { dashboard, overall } from './eventType';
import styles from './eventscheduler.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';

const EventScheduler = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const [editid, setEditId] = useState(0);
  const [editlist, setEditList] = useState();

  const [setting, SetSetting] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [sharedata, setsharedata] = useState([]);
  const [schedule, setschedule] = useState([]);
  const [editmembers, seteditmembers] = useState([]);
  const [reset, setreset] = useState(false);




  const [open, setopen] = useState(0);

  const {
    data,
    interviewer,
    shareLink,
    addmembers,
    datetime,
    isLoading,
    success,
    google,
    outlook,
  } = useSelector(({ schedulerReducers }: RootState) => ({
    isLoading: schedulerReducers.isLoading,
    data: schedulerReducers.data,
    interviewer: schedulerReducers.interviewer,
    shareLink: schedulerReducers.shareLink,
    addmembers: schedulerReducers.addmembers,
    datetime: schedulerReducers.datetime,
    success: schedulerReducers.suceess,
    google: schedulerReducers.google,
    outlook: schedulerReducers.outlook,
  }));



  console.log("isLoading",isLoading)
  useEffect(() => {
    dispatch(getScheduleMiddleWare(undefined))
  }, []);

  function editdata(id: number, datalist: any) {
    if (id !== undefined && id !== null) {
      setIsOpen(true);
      setreset(false)
      setEditList(datalist);
      // dispatch(getScheduleMiddleWare(id)).then((res) => {
      //   dispatch(getScheduleMiddleWare(undefined));
      // });
      // axios
      // .get(`${eventSchedulerApi}?pk=${id}`)
      // .then((res) => {
      //   console.log('resresresresresres', res);
      //   if (res.data) {
      //     let scheduledata = res.data.datetime
      //     let interviewdata = res.data.interviewer
      //     setschedule(scheduledata)
      //     seteditmembers(interviewdata)
      //     console.log('scheduleschedule', schedule,interviewdata);
      //     // dispatch(getScheduleMiddleWare(undefined));
      //   }
      // })
      // .catch((err) => {
      //   console.log(err);
      // });
    }
  }
  function HandleButton(ToastMessage){
      if (ToastMessage) {
        Toast('Updated Event Successfully!');
      }
      else{
        Toast('Event Created Successfully!');
      }

  }
  const response = data;
  const CreateEvent = () => {
    setIsOpen(true);
    setreset(true)
    setEditList(null);
  };

  if (isLoading) {
    return <Loader />;
  }
  console.log("scheduleschedulescheduleschedule",schedule,editmembers)
  return (
    <>
      <Flex>
        <Flex row between className={styles.initial}>
          <Flex>
            <Text size={16}>
              Share your availability with candidates and schedule events
            </Text>
          </Flex>

          <Button
            types="primary"
            className={styles.newlink}
            onClick={CreateEvent}
          >
            <Flex row center style={{ cursor: 'pointer' }}>
              <SvgAdd height={10} width={10} fill="#FFFFFF" />
              <Text color="white" size={16} style={{ marginLeft: '10px' }}>
                Create Event
              </Text>
            </Flex>
          </Button>
          {isopen ? (
            <Modal open={isopen} onClose={close}>
              <CreateNewEvent
                isopen={isopen}
                setIsOpen={setIsOpen}
                editModel={editlist}
                datetime={datetime}
                setEditList={setEditList}
                teammembers={addmembers}
                intern={interviewer}
                reset={reset}
                // schedule={schedule}
                google={google}
                outlook={outlook}    
                HandleButton ={HandleButton}           
              />
            </Modal>
          ) : (
            ''
          )}
        </Flex>

        <Flex className={styles.outline} height={'100%'}>
          {response?.length > 0 ? (
            <Flex row wrap marginTop={'10px'}>
              {response &&
                response?.map((list, index) => {
                  return (
                    <Flex key={index}>
                      <DashBoard
                        isLoading ={isLoading}
                        list={list}
                        index={index}
                        editdata={editdata}
                        editid={editid}
                        setEditId={setEditId}
                        response={shareLink}
                        details={list}
                        interview={interviewer}
                        setting={setting}
                        SetSetting={SetSetting}
                        sharedata={sharedata}
                        setsharedata={setsharedata}
                        setisLoader={setisLoader}
                        opens={open}
                      />
                    </Flex>
                  );
                })}
            </Flex>
          ) : (
            <Flex className={styles.noevent} width={'100%'}>
              <SvgLink width={16} height={16} fill={'currentColor'} />
              <Text> No scheduler links created yet</Text>
              <Text>
                Scheduler links allow candidates to pick a date and time that
                works for them.
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default EventScheduler;
