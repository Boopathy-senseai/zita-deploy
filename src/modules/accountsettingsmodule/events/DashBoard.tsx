import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import { AppDispatch } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import CopyModal from '../../../uikit/CopyModal/CopyModal';
import Card from '../../../uikit/Card/Card';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Modal from '../../../uikit/Modal/Modal';
import Toast from '../../../uikit/Toast/Toast';
import SvgShareIcon from '../../../icons/SvgShareIcon';
// import SvgShare from '../../../../icons/SvgShare';
import SvgSetting from '../../../icons/SvgSetting';
import { isEmpty } from '../../../uikit/helper';
import CancelAndDeletePopup from '../../common/CancelAndDeletePopup';
import Button from '../../../uikit/Button/Button';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import SvgDuplicate from '../../../icons/SvgDuplicate';
import SvgEdit from '../../../icons/SvgEdit';
import SvgTrash from '../../../icons/SvgTrash';
import SvgCopy from '../../../icons/SvgCopy';
import LinkShare from './LinkShare';
import SettingsOpen from './SetttingsOpen';
import styles from './dashBoard.module.css';
import { deleteScheduleMiddleWare, getScheduleMiddleWare } from './store/middleware/eventmiddleware';

const DashBoard = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    list,
    index,
    editdata,
    editid,
    setEditId,
    response,
    details,
    interview,
    setting,
    SetSetting,
    sharedata,
    setsharedata,
    setisLoader,
    setboard,
    opens,
    setopens,
  } = props;
  const [share, SetShare] = useState(false);
  const [dataid, setdataid] = useState(null);
  const [openWindowId, setOpenWindowId] = useState(null);

  

  console.log('propsssssssss', props);

  useEffect(()=>{

  },[dataid,list])

  console.log('response1111+++++++++', response, details);
  // const settingclick = () => {
  //   // setdataid(1);
  //   alert('?');
  //   SetSetting(true);
  //   editdata();
  // };

  


  const modifiedTimeString = (timeString) => {
    let value = '';
    if (timeString === '1 hour') {
      value = timeString.replace('hours', 'hrs');
    } else {
      value = timeString.replace('minutes', 'mins');
    }
    return value;
  };

  function onEdit(event_id, data) {
    console.log('event_id', event_id);
    editdata(event_id, data);
    SetSetting(false);
    // dispatchEvent(getScheduleMiddleWare(0))
  }
  function copylink(id: any){
    const eventid = id;
    const url = `${window.location.origin}/event_preview?uid=null&eventid=${eventid}`;
    Toast("Linked Copied")
    const tempInput = document.createElement('input');
    tempInput.style.position = 'fixed';
    tempInput.style.opacity = '0';
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, url.length);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  }

  function PreviewOnClick(id: number) {
    alert(id);
    const eventid = id
    const url = `/event_preview?uid=null&eventid=${eventid}`;
    console.log(".......",url)
    window.open(url, '_blank')
  }

  console.log('share', share, '\n', 'setting', setting);

  const getInitials = (fullName) => {
    const words = fullName.split(' ');
    let initials = '';
    for (let i = 0; i < words.length; i++) {
      initials += words[i][0];
    }
    return initials;
  };

  

  const filteredData = interview.filter((item) => item.event_id === list.id);
  console.log('filteredData', filteredData);
  console.log('editideditideditid', editid);
  console.log('interviewinterview', interview);
  console.log('settingsetting--------------------',index, dataid);

  console.log('interviewinterview', list.id);

  return (    
    <>
        <Card className={styles.cardConatiner}>
          <Flex>
          <Flex row start between className={styles.rowGroup}>
              <Flex className={styles.cardHeader}>
              <Text className={styles.titletext}>{list.event_name}</Text>
              </Flex>             
              <Button 
                className={styles.copybutton}
                onClick={() => copylink(list.id)}
              >
                <SvgCopy fill="goldenrod" height={17} width={17} />
              </Button>
              <Text className={styles.btnsetting}>
              <ActionsButton
              data ={list}
              onEdit={onEdit}             
              /></Text>
          </Flex>         
          <Flex row start between className={styles.rowGroup1}>
              <Text className={styles.title2}>
                {modifiedTimeString(list.duration)}, {list.event_type}
              </Text>
          </Flex>
            <Flex row>
                {interview.map((data) => {
                  if (data.event_id === list.id) {
                    const initials = getInitials(data.full_name);
                    return (
                      <Flex className={styles.initials} key={data.id}>
                      <Text className={styles.textinitials}                      
                      >
                        {initials}
                      </Text>
                      </Flex>
                    );
                  }
                  return null;
                })}
            </Flex>

            <div className={styles.line}></div>
            <Flex row start between className={styles.rowGroup2}>
                <button
                  className={styles.previewbtn}
                  onClick={() => PreviewOnClick(list.id)}
                >
                  <SvgShareIcon fill={'#581845'} height={17} width={17} />
                </button>
           
             
                <Button
                  className={styles.buttonshare}
                  onClick={() => SetShare(true)}
                >
                  <Text className={styles.sharetxt}>
                    Share
                  </Text>
                </Button>
              <div>

                {share ? (
                  <Flex>
                    <Modal open={share} onClose={close}>
                      <LinkShare
                        share={share}
                        setShare={SetShare}
                        list={list}
                        // title={'Team interview'}
                        // type={'Team interview'}
                        // duration={'30 Minutes'}
                        sharelinkdata={response}
                        details={details}
                        sharedata={sharedata}
                        setsharedata={setsharedata}
                      />
                    </Modal>
                  </Flex>
                ) : (
                  ' '
                )}
              </div>
            </Flex>
          </Flex>
        </Card>
    </>
  );
};

const ActionsButton = (props) => {
  const {data , onEdit} = props;
  const dispatch: AppDispatch = useDispatch();
  const [eventid, setEventId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);
  console.log("propsprops",props)

  
  const onDuplicate = (id : number) => {
    alert(id)
  console.log("propsprops",id)
    axios.get(`${eventSchedulerApi}?pk=${id}&duplicate=duplicate`)
     .then((res) => {  
      console.log("resres",res) 
      if(res.data.message){
        dispatch(getScheduleMiddleWare(undefined));
      Toast('Duplicated successfully', 'LONG');
      setdeleteBtnLoader(false);
      }    
    })
    .catch((err) => {
      console.log(err);
    });   
  }
  const handleShow = (id: number) => {
    console.log('!!!!!!!!!!!!', id);
    if (id !== null) {
      setEventId(id);
      setDeleteModal(true);
    }
  };
  const onCancel = () => {
    setDeleteModal(false);
    console.log('deleteModal', deleteModal);
    // console.log("setting",setting)
  };

  const onDelete = () => {
    if (eventid !== null) {
      console.log('eeventId', eventid);
      setDeleteModal(false);
      setdeleteBtnLoader(true);
      const id = eventid
      console.log("ididididididididididid",id)
      axios.delete(`${eventSchedulerApi}?pk=${id}`)
      .then((res:any)=>{
        console.log("resssss",res)
          if(res.data !== null){
            setDeleteModal(false);
            dispatch(getScheduleMiddleWare(undefined));
            Toast('Event Deleted successfully', 'LONG');
            setdeleteBtnLoader(false);
          }
      })
        }
      };  
  return (    <>
  {console.log("list",data)}
      <Flex className={styles.btnsetting}>
      <Dropdown className="dropdownButton dropleft">
          <Dropdown.Toggle
            style={{
              borderColor: 'unset',
              backgroundColor: 'unset',
              boxShadow: 'none',
            }}
            id="dropdown-basic"
          >
           <SvgSetting fill={'#black'} height={17} width={17} />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: '5rem' }}>
              <Dropdown.Item 
              onClick={() => onEdit(data.id, data)}
              >
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Edit</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item 
               onClick={()=>onDuplicate(data.id)}
              >
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Duplicate</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item 
              onClick={() => handleShow(data.id)}
              >
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Delete</Text>
                </Flex>
              </Dropdown.Item>
          </Dropdown.Menu>
      </Dropdown>
      </Flex>


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
  );
};

export default DashBoard;
