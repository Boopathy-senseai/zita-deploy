import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Toast from '../../uikit/Toast/Toast';
import InviteModal from '../../utility/InviteModal';
import Toaster from '../../utility/Toaster';
import UserTable from '../../utility/UserTable';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
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

  const {  plan_id } = useSelector(
    ({ permissionReducers }) => {
      return {
        plan_id: permissionReducers.plan_id,
      };
    },
  );

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
      <div className="row align-items-center py-4">
        <div className="col">
          <Text>
            You can invite your team members and manage your organization as an
            admin.
          </Text>
        </div>
        <div className="col-auto">
          <div className="row align-items-center">
            <div className="col-auto">
              <Text>Total Users: {totalUsers}</Text>
            </div>
            <div className="col-auto">
              <Text>Available Invites: {availableInvites}</Text>
            </div>
            <div className="col-auto" style={{position:'relative'}}>
              <Button onClick={manage} id="buy_user" disabled={Number(plan_id) === 1}>
                Buy New Users
              </Button>
              <div style={{position:'absolute',whiteSpace:'nowrap',bottom: -28}}>
              {Number(plan_id) === 1 &&<Text><Text color='link' onClick={manage}>Upgrade Plan</Text> to buy more users. </Text>}
              </div>
            </div>
            <div className="col-auto">
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
