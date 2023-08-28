import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import SvgEventcopy from '../../../icons/SvgEventcopy';
import LinkShare from './LinkShare';
import styles from './dashBoard.module.css';
import { getScheduleMiddleWare } from './store/middleware/eventmiddleware';
import { DataEntity, InterviewEntity, ShareEntity } from './ScheduleTypes';

type DashBoardProps = {
  list: DataEntity;
  response: ShareEntity[];
  interview: InterviewEntity[];
  editdata: (id: number, data: DataEntity) => void;
};

const DashBoard = ({ list, response, interview, editdata }: DashBoardProps) => {
  const [share, SetShare] = useState(false);

  const modifiedTimeString = (timeString: string) => {
    let value = '';
    if (timeString === '1 hour') {
      value = timeString.replace('hours', 'hrs');
    } else {
      value = timeString.replace('minutes', 'mins');
    }
    return value;
  };

  function onEdit(event_id: number, data: DataEntity) {
    editdata(event_id, data);
  }
  function copylink(id: number) {
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
  const getInitials = (fullName: string) => {
    if (fullName !== null && fullName !== undefined && !isEmpty(fullName)) {
      const words = fullName.split(' ');
      if (Array.isArray(words) && words.length >= 2) {
        const firstInitial = words[0][0].toUpperCase();
        const lastInitial = words[words.length - 1][0].toUpperCase();
        return `${firstInitial}${lastInitial}`;
      }
    }
  };
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
                title={'Copy Link'}
                className={styles.copybutton}
                onClick={() => copylink(list.id)}
              >
                <SvgEventcopy fill="#581845" height={15} width={15} />
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
            .filter((data) => data.event_id === list.id)
            .slice(0, 7)
            .map((data) => {
              if (data.event_id === list.id) {
                const initials = getInitials(data.full_name);
                return (
                  <Flex className={styles.initials} key={data.id}>
                    <Text
                      size={12}
                      title={data.full_name}
                      className={styles.textinitials}
                    >
                      {initials}
                    </Text>
                  </Flex>
                );
              }

              return null;
            })}
          {interview.filter((data) => data.event_id === list.id).length > 7 && (
            <Flex className={styles.initials}>
              <Text size={12} className={styles.textinitials}>
                {`+${
                  interview.filter((data) => data.event_id === list.id).length -
                  MAX_BUTTONS
                }`}
              </Text>
            </Flex>
          )}
        </Flex>
        <div className={styles.line}></div>
        <Flex className={styles.rowGroup}>
          <Flex title={'preview'} marginBottom={6}>
            <Button
              types="link"
              className={styles.previewbtn}
              onClick={() => PreviewOnClick(list.id)}
            >
              <SvgShareIcon fill={'#581845'} height={17} width={17} />
            </Button>
          </Flex>
          <Button
            types="secondary"
            className={styles.buttonshare}
            onClick={() => SetShare(true)}
            textSize={13}
          >
            Share
          </Button>
        </Flex>
      </Card>
      <Modal open={share} onClose={close}>
        <LinkShare        
          setShare={SetShare}
          sharelinkdata={response}
          details={list}
        />
      </Modal>
    </>
  );
};

type Props = {
  data?: DataEntity;
  onEdit: (id: number, data: DataEntity) => void;
};

const ActionsButton = ({ data, onEdit }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [eventid, setEventId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);

  const onDuplicate = (id: number) => {
    axios
      .get(`${eventSchedulerApi}?pk=${id}&duplicate=duplicate`)
      .then((res) => {
        if (res.data.message) {
          dispatch(getScheduleMiddleWare(undefined));
          Toast('Event duplicated successfully', 'LONG');
          setdeleteBtnLoader(false);
        }
      });
  };
  const handleShow = (id: number) => {
    if (id !== null) {
      setEventId(id);
      setDeleteModal(true);
    }
  };
  const onCancel = () => {
    setDeleteModal(false);
  };

  const onDelete = () => {
    if (eventid !== null) {
      setDeleteModal(false);
      setdeleteBtnLoader(true);
      const id = eventid;
      axios.delete(`${eventSchedulerApi}?pk=${id}`).then((res: any) => {
        if (res.data !== null) {
          setDeleteModal(false);
          dispatch(getScheduleMiddleWare(undefined));
          Toast('Event deleted successfully', 'LONG');
          setdeleteBtnLoader(false);
        }
      });
    }
  };
  return (
    <>
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
            <SvgSetting fill={'#581845'} height={17} width={17} />
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
                    Users will be unable to schedule further meetings with
                    deleted event types.
                  </Text>
                </Flex>
                <Flex marginLeft={10}>
                  <Text size={14}>
                    Meetings previously scheduled will not be affected.
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Text
                  size={14}
                  style={{ marginLeft: '10px', marginTop: '2px' }}
                >
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
