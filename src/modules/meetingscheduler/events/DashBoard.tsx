import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { AppDispatch } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Card from '../../../uikit/Card/Card';
import Modal from '../../../uikit/Modal/Modal';
import Toast from '../../../uikit/Toast/Toast';
import SvgShareIcon from '../../../icons/SvgShareIcon';
import SvgSetting from '../../../icons/SvgSetting';
import { isEmpty } from '../../../uikit/helper';
import CancelAndDeletePopup from '../../common/CancelAndDeletePopup';
import Button from '../../../uikit/Button/Button';
import { eventSchedulerApi } from '../../../routes/apiRoutes';
import SvgCopy from '../../../icons/SvgCopy';
import LinkShare from './LinkShare';
import styles from './dashBoard.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';
import Interviewer from './Interviewer';

const DashBoard = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const {
    isLoading,
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
  // useEffect(() => {
  //   dispatch(getScheduleMiddleWare(undefined));
  // }, []);



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
  }
  function copylink(id: any) {
    const eventid = id;
    const url = `${window.location.origin}/event_preview?uid=null&eventid=${eventid}`;
    Toast('Link Copied');
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
    const eventid = id;
    const url = `/event_preview?uid=null&eventid=${eventid}`;
    window.open(url, '_blank');
  }

  const getInitials = (fullName) => {
    if (fullName !== null && fullName !== undefined && !isEmpty(fullName)){
      const words = fullName.split(' ');
      let initials = '';
      for (let i = 0; i < words.length; i++) {
        initials += words[i][0].toUpperCase();
      }
      return initials;
    }
  };

  // if (isLoading) {
  //   return <Loader />;
  // }
  const filteredData = interview.filter((item) => item.event_id === list.id);
  const MAX_BUTTONS = 7;
  return (
    <>
      <Card className={styles.cardConatiner}>
        <Flex row start between className={styles.rowGroup}>
          <Flex row className={styles.cardHeader}>
            <Flex row center>
              <Text
                title={list.event_name}
                bold
                size={14}
                className={styles.titletext}
              >
                {list.event_name}
              </Text>
              <Flex
                title={"copy"}
                className={styles.copybutton}
                onClick={() => copylink(list.id)}
              >
                <SvgCopy fill="#FCC203" height={15} width={15} />
              </Flex>
            </Flex>
          </Flex>
          <ActionsButton data={list} onEdit={onEdit} />
        </Flex>

        <Text size={13}>
          {modifiedTimeString(list.duration)}, {list.event_type}
        </Text>
        <Flex row className={styles.overflowbtn}>
          {interview
          .filter(data => data.event_id === list.id) // Filter based on event_id
          .slice(0, 7)
          .map((data) => {
            if (data.event_id === list.id)  {
              const initials = getInitials(data.full_name);
              return (
                <Flex className={styles.initials} key={data.id}>
                  <Text size={12} title={data.full_name} className={styles.textinitials}>
                    {initials}
                  </Text>
                </Flex>
              );
              
            }

            return null;
          })}
          {interview.filter(data => data.event_id === list.id).length > 7 && (
    <Flex className={styles.initials}>
      <Text size={12} className={styles.textinitials}>
      {`+${interview.filter(data => data.event_id === list.id).length - MAX_BUTTONS}`}
      </Text>
    </Flex>
  )}
         
        </Flex>

        <div className={styles.line}></div>

        <Flex className={styles.rowGroup}>
          <Flex title={'preview'}>
          <Button
            types="link"
            className={styles.previewbtn}
            onClick={() => PreviewOnClick(list.id)}
            // t={"preview"}
          >
            <SvgShareIcon fill={'#581845'} height={17} width={17} />
          </Button>
          </Flex>
          <Button
            types="secondary"
            className={styles.buttonshare}
            onClick={() => SetShare(true)}
            textSize ={13}
          >
            Share
          </Button>
        </Flex>
      </Card>
      <Modal open={share} onClose={close}>
        <LinkShare
          share={share}
          setShare={SetShare}
          list={list}
          sharelinkdata={response}
          details={details}
          sharedata={sharedata}
          setsharedata={setsharedata}
        />
      </Modal>
    </>
  );
};

const ActionsButton = (props) => {
  const { data, onEdit } = props;
  const dispatch: AppDispatch = useDispatch();
  const [eventid, setEventId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);
  console.log('propsprops', props);

  const onDuplicate = (id: number) => {
    console.log('propsprops', id);
    axios
      .get(`${eventSchedulerApi}?pk=${id}&duplicate=duplicate`)
      .then((res) => {
        console.log('resres', res);
        if (res.data.message) {
          dispatch(getScheduleMiddleWare(undefined));
          Toast('Duplicated successfully', 'LONG');
          setdeleteBtnLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
      const id = eventid;
      console.log('ididididididididididid', id);
      axios.delete(`${eventSchedulerApi}?pk=${id}`).then((res: any) => {
        console.log('resssss', res);
        if (res.data !== null) {
          setDeleteModal(false);
          dispatch(getScheduleMiddleWare(undefined));
          Toast('Event Deleted successfully', 'LONG');
          setdeleteBtnLoader(false);
        }
      });
    }
  };
  return (
    <>
      {console.log('list', data)}
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
            <Dropdown.Item onClick={() => onEdit(data.id, data)}>
              <Flex row center className={styles.pointer}>
                <Text>Edit</Text>
              </Flex>
            </Dropdown.Item>

            <Dropdown.Item onClick={() => onDuplicate(data.id)}>
              <Flex row center className={styles.pointer}>
                <Text>Duplicate</Text>
              </Flex>
            </Dropdown.Item>

            <Dropdown.Item onClick={() => handleShow(data.id)}>
              <Flex row center className={styles.pointer}>
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
              <Flex column>
                <Flex>
              <Text size={14} style={{ marginLeft: '10px' }}>
                Users will be unable to schedule further meetings with deleted
                event types.
                </Text>
                </Flex>
                <Flex marginLeft={10} >             
                <Text size={14}>
                  Meetings previously scheduled will not be affected.
                </Text>             
              </Flex>
              </Flex>
              <Flex >
              <Text size={13} style={{ marginLeft: '10px', marginTop : '2px'}}>
                Are you sure to proceed?
              </Text> 
              </Flex>             
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
