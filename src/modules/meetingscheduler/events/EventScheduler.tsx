import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import styles from './eventscheduler.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';


const EventScheduler = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isopen, setIsOpen] = useState(false);
  const [editlist, setEditList] = useState();
  const [isLoader, setisLoader] = useState(false);
  const [schedule, setschedule] = useState([]);
  const [editmembers, seteditmembers] = useState([]);
  const [reset, setreset] = useState(false);
  
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

  useEffect(() => {
    dispatch(getScheduleMiddleWare(undefined))
  }, []);

  function editdata(id: number, datalist: any) {
    if (id !== undefined && id !== null) {
      setIsOpen(true);
      setreset(false)
      setEditList(datalist);
    }
  }

  function HandleResetForm(formik){
  }


  function HandleButton(ToastMessage){
      if (ToastMessage) {
        Toast('Event updated successfully');
      }
      else{
        Toast('Event Created Successfully!');
      }

  }
  const CreateEvent = () => {
    setIsOpen(true);
    setreset(true)
    setEditList(null);
  };


  if (isLoading) {
    return <Loader />;
  }
  return (
    <Flex
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',      
        padding: "10px",
      }}
     
    >
      <Flex row between className={styles.initial} style={{width: "100%", marginBottom: 10}}>
        <Flex>
          <Text size={13}>
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
              <Text color="white" size={13}  bold style={{ marginLeft: '10px' }}>
                Create Event
              </Text>
            </Flex>
          </Button>
          {isopen ? (
            <Modal open={isopen} onClose={close}>
              <CreateNewEvent
                setIsOpen={setIsOpen}
                editModel={editlist}
                datetime={datetime}
                teammembers={addmembers}
                google={google}
                outlook={outlook}  
                reset = {reset}
                HandleButton ={HandleButton}  

              />
            </Modal>
          ) : (
            ''
          )}
        </Flex>

        <Flex className={styles.outline}  height={window.innerHeight-185} style={{overflow:'scroll'}}>
          {data?.length > 0 ? (
            <Flex row wrap marginTop={'10px'}>
              {data &&
                data?.map((list, index) => {
                  return (
                    <Flex key={index}>
                      <DashBoard                       
                        list={list}
                        editdata={editdata}                       
                        response={shareLink}                      
                        interview={interviewer}                        
                      />
                    </Flex>
                  );
                })}
            </Flex>
          ) : (
            <Flex className={styles.noevent} marginTop={200} width={'100%'}>
              <Flex middle>
              <SvgLink width={16} height={16} fill={'#979797'} />
              </Flex>
              <Text size={13} align={'center'} color='gray'> No scheduler links created yet.</Text>
              <Text size={13} align={'center'} color='gray'>
                Scheduler links allow candidates to pick a date and time that
                works for them.
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
  );
};

export default EventScheduler;
