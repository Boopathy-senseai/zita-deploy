import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import SvgInfo from '../../icons/SvgInfo';
import Toast from '../../uikit/Toast/Toast';
import InviteModal from '../../utility/InviteModal';
import Toaster from '../../utility/Toaster';
import UserTable from '../../utility/UserTable';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import { Flex } from '../../uikit';
import styles from './manageuser.module.css';

const ManageUsers = ({ setKey }) => {
  const [inviteUserModal, setinviteUserModal] = useState(false);
  const [messageClass, setMessageClass] = useState('');
  const [message, setMessage] = useState(undefined);
  const [inviteBtnLoader, setinviteBtnLoader] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersData, setUsersData] = useState({});
  const [availableInvites, setAvailableInvites] = useState(0);
  const [clearData, setClearData] = useState(true);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const history = useHistory();

  const { plan_id } = useSelector(({ permissionReducers }) => {
    return {
      plan_id: permissionReducers.plan_id,
    };
  });

  // const [addmodalCloseCheck, setaddmodalCloseCheck] = useState(0);

  ////////// User Table Data ////////////
  const getUserallData = () => {
    axios
      .get('users')
      .then((res) => {
        setUsersData(res.data.data.users);
        setTotalUsers(res.data.data.users.length);
        if (res.data.data.plan === 1) {
          document.getElementById('buy_user').disabled = true;
        } else {
          document.getElementById('buy_user').disabled = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////// Invite Modal Show Hide ////////////
  const handleShow = () => {
    setClearData(true);
    setinviteUserModal(true);
  };

  const refreshTable = () => {
    getUserallData();
    handalInviteCount();
  };

  ////////// Send Invite Api ////////////
  const onInviteSend = (data) => {
    setinviteBtnLoader(true);
    setClearData(false);
    axios
      .post('users', data)
      .then(() => {
        setinviteBtnLoader(false);
        setMessage(undefined);
        getUserallData();
        setinviteUserModal(false);
        Toast('User invited successfully.', 'LONG');
        handalInviteCount();
        setTimeout(() => {
          setShowToast(null);
        }, 3000);
      })
      .catch((err) => {
        setMessage(undefined);
        if (err.response.status !== 200) {
          if (err.response) {
            setinviteBtnLoader(false);
            if (err.response.data.msg) {
              setMessage(err.response.data.msg);
            } else {
              setMessage('Server error ' + err.response.status);
            }
            setMessageClass('danger');
          }
        }
      });
  };

  ////////// Call On Page Load ////////////
  useEffect(() => {
    getUserallData();
  }, []);

  ////////// Check Available Invites ////////////
  const handalInviteCount = () => {
    axios
      .get('users/company-invites')
      .then((res) => {
        setAvailableInvites(res.data.data.invites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handalInviteCount();
    if (availableInvites > 0) {
      document.getElementById('AvailableInvites').disabled = false;
      // document.getElementById("BuyNewUser").disabled = true;
    } else {
      document.getElementById('AvailableInvites').disabled = true;
      // document.getElementById("BuyNewUser").disabled = false;
    }
  }, [availableInvites]);

  const modalCloseCheck = () => {
    // setaddmodalCloseCheck(Object.keys(data).length);
    // console.log("s");
    // console.log(addmodalCloseCheck);
  };

  const hideModal = () => {
    setinviteUserModal(false);
    setClearData(true);
  };

  const manage = () => {
    history.replace({
      search: query.toString() + '?planFocus=focus',
    });
    sessionStorage.setItem('superUserTab', '2');
    setKey('2');
  };
  return (
    <>
      {showToast !== null ? <Toaster content={showToast} type="success" /> : ''}
      <div
        className="row align-items-center"
        style={{
          margin: '10px 8px 10px 16px',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Text>
            You can invite your team members and manage your organization as an
            admin.
          </Text>
        </div>
        <div className="col-auto ">
          <div className="row align-items-center">
            <div style={{ paddingRight: 0, marginLeft: '10px' }}>
              <Text>Total Users: {totalUsers}</Text>
            </div>
            <div style={{ paddingRight: 0, marginLeft: '10px' }}>
              <Text>Available Invites: {availableInvites}</Text>
            </div>
            <div style={{ paddingRight: 0, marginLeft: '10px' }}>
              <Button
                onClick={manage}
                id="buy_user"
                disabled={Number(plan_id) === 1}
              >
                Buy New Users
              </Button>
            </div>
            <div style={{ paddingRight: 0, marginLeft: '10px' }}>
              <Button
                onClick={handleShow}
                id="AvailableInvites"
                disabled={availableInvites <= 0}
              >
                Invite New Users
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        // style={{
        //   position: 'absolute',
        //   whiteSpace: 'nowrap',
        //   // bottom: -28,
        //   // paddingRight: 0,
        //   // marginLeft: '10px',
        // }}
      >
        {Number(plan_id) === 1 && (
          <>
            <Flex middle row center className={styles.warningFlex1} style={{marginLeft:"16px"}}>
              <SvgInfo fill={'#2E6ADD'} height={16} width={16} />
              <Text size={13} className={styles.warningText1}>
                <Text size={13} color="link" bold onClick={manage} className={styles.warningText1}>
                  Upgrade Plan
                </Text>{' '}
                to buy more users.{' '}
              </Text>
            </Flex>
          </>
        )}
      </div>
      <div className={styles.tableStyle}>
        <UserTable refresh={refreshTable} usersData={usersData} />
      </div>
      <InviteModal
        show={inviteUserModal}
        onInviteSend={onInviteSend}
        onHide={hideModal}
        message={message}
        messageClass={messageClass}
        inviteBtnLoader={inviteBtnLoader}
        clearData={clearData}
        modalCloseCheck={modalCloseCheck}
        size="lg"
      />
    </>
  );
};

export default ManageUsers;
