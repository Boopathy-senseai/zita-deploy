import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import SvgDuplicate from '../../../icons/SvgDuplicate';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTrash from '../../../icons/SvgTrash';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex'; 
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import CancelAndDeletePopup from '../../common/CancelAndDeletePopup';
import CreateNewEvent from './CreateNewEvent';
import styles from './screen.module.css';
import { deleteScheduleMiddleWare, getScheduleMiddleWare } from './store/middleware/eventmiddleware';

const SettingsOpen = (props) => {
    const dispatch: AppDispatch = useDispatch();
    const {
      setting,
      data,
      SetSetting,
      onEdit,
      editid,
      setEditId,
      dataid,
      setdataid,
      setisLoader,
      open,
      setopen,
      setboard

    } = props;

    console.log("/////////////////",props)
  
    const [eventid, setEventId] = useState(0);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editdata, setEditData] = useState(false);
    const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);
  
    const onCancel = () => {
      setboard(0);
      setDeleteModal(false);
      SetSetting(false);
      console.log('deleteModal', deleteModal);
      // console.log("setting",setting)
    };
  
    useEffect(() => {
      // Update setting to 0 in the next render
      console.log("setopensetopensetopen",open)
    
    }, [props]);
  

    console.log("datadata",data)
    const onDelete = () => {
      if (eventid !== null) {
        setboard(0);
        alert('??????');
        alert('12poo');
        console.log('eeventId', eventid);
        setDeleteModal(false);
        SetSetting(false)
        // setopen('')
        setdeleteBtnLoader(true);
        const id = eventid
        console.log("ididididididididididid",id)
        dispatch(deleteScheduleMiddleWare(eventid))
        .then((res:any)=>{
            setDeleteModal(false);
            dispatch(getScheduleMiddleWare(undefined));
            Toast('Event Deleted successfully', 'LONG');
            setdeleteBtnLoader(false);
            // setisLoader(false)
        })
          }
        };  
    const handleShow = (id: number) => {
      console.log('!!!!!!!!!!!!', id);
      if (id !== null) {
        setEventId(id);
        setDeleteModal(true);
      }
    };


  
    function onClose() {
      alert('.');
      onCancel();
      SetSetting(!setting);
      console.log('dataid', dataid);
    }
  
    const onDuplicate = (id : number) => {
      setboard(0);
      axios.get(`${eventSchedulerApi}?pk=${id}&duplicate=duplicate`)
       .then((res) => {  
        console.log("resres",res) 
        if(res.data.message){
          dispatch(getScheduleMiddleWare(undefined));
        SetSetting(false)
        Toast('Duplicated successfully', 'LONG');
        setdeleteBtnLoader(false);
        // setopen('')
        }    
      })
      .catch((err) => {
        console.log(err);
      });   
    }
  
    console.log("setting",setting)
    const onEdit1 = (event_id: number, editlist: any) => {
      setboard(0);
      alert(event_id);
      onEdit(event_id, editlist);
      setEditId(event_id);
      setEditData(true);
  
      console.log('editIDeditIDeditID', editid);
    };
    return (
      <>
        {console.log('settingsetting122', setting)}

          <>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '10px 10px',
            overflowY: 'scroll',
            border: '10px',
          }}
        >
          <Flex>
            <Flex row>
              <SvgEdit width={15} height={15} />
              <Button
                style={{
                  border: 'none',
                  background: 'none',
                }}
                onClick={() => onEdit1(data.id, data)}
              >
                <Text>Edit</Text>
              </Button>
            </Flex>
            <Flex row>
              <SvgDuplicate width={15} height={15} />
              <Button
                style={{
                  border: 'none',
                  background: 'none',
                }}
                onClick={()=>onDuplicate(data.id)}
              >
                <Text>Duplicate</Text>
              </Button>
            </Flex>
            <Flex row>
              <SvgTrash width={15} height={15} />
              <Button
                style={{
                  border: 'none',
                  background: 'none',
                }}
                onClick={() => handleShow(data.id)}
              >
                <Text>Delete</Text>
              </Button>
            </Flex>
          </Flex>
        </div>
        {deleteModal === true && eventid !== null ? (
          <CancelAndDeletePopup
            btnCancel={() => onCancel()}
            title={
              <Flex className={styles.popUpFlex}>
                <Text style={{ marginLeft: '10px' }}>
                  Users will be unable to schedule further meeting with deleted
                  event types.
                  {/* <br/> */}
                  <Text style={{ marginLeft: '10px' }}>
                    Meetings previously scheduled will not affected.
                  </Text>
                </Text>
                <Text style={{ marginLeft: '10px' }}>
                  Are you sure to proceed?
                </Text>
              </Flex>
            }
            btnDelete={onDelete}
            btnLeft="Cancel"
            btnRight="Delete"
            open={deleteModal}
            loader={deleteBtnLoader}
          />
        ) : (
          ''
        )}
        </>


        </>
    );
  };

export default SettingsOpen;
