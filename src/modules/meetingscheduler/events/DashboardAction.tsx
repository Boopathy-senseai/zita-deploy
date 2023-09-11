
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
                    <Text size={13} style={{ marginLeft: '10px' }}>
                      Users will be unable to schedule further meetings with
                      deleted event types.
                    </Text>
                  </Flex>
                  <Flex marginLeft={10}>
                    <Text size={13}>
                      Meetings previously scheduled will not be affected.
                    </Text>
                  </Flex>
                </Flex>
                <Flex>
                  <Text
                    size={13}
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

export default ActionsButton