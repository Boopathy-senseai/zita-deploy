/* eslint max-len: ["error", { "code": 200 }] */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Cursor, PatchCheckFill } from 'react-bootstrap-icons';
import CancelAndDeletePopup from '../modules/common/CancelAndDeletePopup';
import Toast from '../uikit/Toast/Toast';
import SvgBoxEdit from '../icons/SvgBoxEdit';
import SvgBlock from '../icons/SvgBlock';
import SvgDotMenu from '../icons/SvgDotMenu';
import SvgTrash from '../icons/SvgTrash';
import { GARY_2 } from '../uikit/Colors/colors';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import { getDateString } from '../uikit/helper';
import EditUserModal from './EditUserModal';
import styles from './usertable.module.css';

function UserTable(porps) {
  const usersData = porps.usersData; // eslint-disable-line
  const [deleteModal, setDeleteModal] = useState(false);
  const [inactivate, setInactivate] = useState(false);
  const [activate, setActivate] = useState(false);
  const [resend, setResend] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState('');
  const [messageClass, setMessageClass] = useState('');
  const [message, setMessage] = useState(undefined);
  const [inviteBtnLoader, setinviteBtnLoader] = useState(false);
  const [deleteBtnLoader, setdeleteBtnLoader] = useState(false);
  const [inactivateBtnLoader, setinactivateBtnLoader] = useState(false);
  const [activateBtnLoader, setactivateBtnLoader] = useState(false);
  const [resendBtnLoader, setResendBtnLoader] = useState(false);
  const [clearData, setClearData] = useState(false);
  const [isReload, setReload] = useState(false);
  // const [isUserId,setUserId]=useState('')
  ///////// Delete User ////////////
  const handleShow = (id) => {
    setClearData(false);
    setDeleteModal(true);
    setUserId(id);
  };

  const onDelete = () => {
    if (userId !== null) {
      setdeleteBtnLoader(true);
      axios
        .delete('users/' + userId + '/')
        .then(() => {
          setDeleteModal(false);
          Toast('User deleted successfully', 'LONG');
          setdeleteBtnLoader(false);
          porps.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ///////// Inactivate User ////////////
  const handleInactivate = (id) => {
    setInactivate(true);
    setUserId(id);
  };
  const onInactivate = () => {
    if (userId !== null) {
      setinactivateBtnLoader(true);
      let status = {
        status: 2,
      };
      axios
        .put('user-update-status/' + userId + '/', status)
        .then(() => {
          setInactivate(false);
          Toast('User inactivated successfully', 'LONG');
          setinactivateBtnLoader(false);
          porps.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ///////// Activate User ////////////
  const handleActivate = (id) => {
    setActivate(true);
    setUserId(id);
  };
  const onActivate = () => {
    if (userId !== null) {
      setactivateBtnLoader(true);
      let status = {
        status: 1,
      };
      axios
        .put('user-update-status/' + userId + '/', status)
        .then(() => {
          setActivate(false);
          Toast('User activated successfully', 'LONG');
          setactivateBtnLoader(false);
          porps.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ///////// Resend User ////////////
  const handleResend = (id) => {
    setResend(true);
    setUserId(id);
  };
  const onResend = () => {
    if (userId !== null) {
      setResendBtnLoader(true);
      let id = {
        id: userId,
      };
      axios
        .post('users/resend-mail', id)
        .then(() => {
          setResend(false);
          Toast('Invitation resent successfully', 'LONG');
          setResendBtnLoader(false);
          porps.refresh();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  ///////// Edit User ////////////
  const handleEditModal = (id) => {
    setUserId(id);
    if (id !== null) {
      axios
        .get('users/' + id)
        .then((res) => {
          setUserData(res.data.data);
          setEditModal(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const OnEdit = (data) => {
    if (userId !== null) {
      setinviteBtnLoader(true);
      axios
        .put('users/' + userId + '/', data)
        .then(() => {
          setinviteBtnLoader(false);
          setMessage(undefined);
          setEditModal(false);
          setReload(false);
          porps.refresh();
          Toast('User details updated successfully', 'LONG');
        })
        .catch((err) => {
          if (err.response.data.status !== 200) {
            if (err.response) {
              setinviteBtnLoader(false);
              if (err.response.data.msg) {
                setMessage(err.response.data.msg);
                setTimeout(() => {
                  setMessage(undefined);
                }, 3000);
              } else {
                setMessage('Please enter valid Information');
                setTimeout(() => {
                  setMessage(undefined);
                }, 3000);
              }
              setMessageClass('danger');
            }
          }
        });
    }
  };

  ///////// Display User ////////////
  const getStatusButton = (status) => {
    if (status === 1) {
      return (
        <button
          style={{ pointerEvents: 'none', textTransform: 'capitalize' }}
          size={'small'}
          className="status-btn-success"
        >
          Active
        </button>
      );
    } else if (status === 0) {
      return (
        <button
          style={{ pointerEvents: 'none', textTransform: 'capitalize' }}
          size={'small'}
          className="status-btn-warning"
        >
          Pending
        </button>
      );
    } else {
      return (
        <button
          style={{ pointerEvents: 'none', textTransform: 'capitalize' }}
          size={'small'}
          className="status-btn-inactive"
        >
          Inactive
        </button>
      );
    }
  };
  const ActionsButtonBystatus = (statusID, rowId) => {
    if (statusID === 1) {
      return (
        <>
          <Dropdown.Item onClick={() => handleEditModal(rowId)}>
            <Flex row center className={styles.dropDownListStyle}>
              <SvgBoxEdit fill={GARY_2} height={16} width={16} />
              <Text style={{ marginLeft: 16 }}>Edit</Text>
            </Flex>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInactivate(rowId)}>
            <Flex row center className={styles.dropDownListStyle}>
              <SvgBlock fill={GARY_2} height={16} width={16} />
              <Text style={{ marginLeft: 16 }}>Inactivate</Text>
            </Flex>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShow(rowId)}>
            <Flex row center className={styles.dropDownListStyle}>
              <SvgTrash fill={GARY_2} height={16} width={18} />
              <Text style={{ marginLeft: 16 }}>Delete</Text>
            </Flex>
          </Dropdown.Item>
        </>
      );
    } else if (statusID === 0) {
      return (
        <>
          <Dropdown.Item onClick={() => handleResend(rowId)}>
            <Cursor className="mr-2" /> Resend Invite
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShow(rowId)}>
            <Flex row center className={styles.dropDownListStyle}>
              <SvgTrash fill={GARY_2} height={16} width={18} />
              <Text style={{ marginLeft: 16 }}>Delete</Text>
            </Flex>
          </Dropdown.Item>
        </>
      );
    } else {
      return (
        <>
          <Dropdown.Item onClick={() => handleActivate(rowId)}>
            <PatchCheckFill className="mr-2" /> Activate
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleShow(rowId)}>
            <Flex row center className={styles.dropDownListStyle}>
              <SvgTrash fill={GARY_2} height={16} width={18} />
              <Text style={{ marginLeft: 16 }}>Delete</Text>
            </Flex>
          </Dropdown.Item>
        </>
      );
    }
  };
  const ActionsButton = (statusID, rowId) => {
    return (
      <>
        <Dropdown className="dropdownButton dropleft">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <SvgDotMenu height={17} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {ActionsButtonBystatus(statusID, rowId)}
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const hideModal = () => {
    setEditModal(false);
    setClearData(true);
  };

  const modalCloseCheck = (data) => {
    if (Object.keys(data).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
     {usersData.length !== undefined ? (
        <div className="table-responsisssve table_min_height">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <Text color="theme" bold>
                    User Name
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Email
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Contact Number
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Department
                  </Text>
                </th>
                <th scope="col" style={{ textAlign: 'center' }}>
                  <Text color="theme" bold align="center">
                    Status
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Role
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Invited On
                  </Text>
                </th>
                <th className="text-center" scope="col">
                  <Text color="theme" bold>
                    Actions
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((item, i) => {
                const InviteOn = getDateString(item.invited_at, 'MMM D, YYYY');
                if (i === 0) {
                  return (
                    <tr key={i} className="admin-bc">
                      <td>
                        <Link to={'/account_setting/' + item.id}>
                          <Text color="info">
                            {item.first_name} {item.last_name}
                          </Text>
                        </Link>
                      </td>
                      <td>
                        <Text>{item.email}</Text>
                      </td>
                      <td>
                        <Text>
                          {item.contact_number !== ''
                            ? item.contact_number
                            : '-'}
                        </Text>
                      </td>
                      <td>
                        <Text>Admin</Text>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          style={{
                            pointerEvents: 'none',
                            textTransform: 'capitalize',
                          }}
                          size={'small'}
                          className="status-btn-success"
                        >
                          Active
                        </button>
                      </td>
                      <td>
                        <Text>Super Admin</Text>
                        
                      
                      </td>
                      <td>{InviteOn}</td>
                      <td className="text-center"></td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i}>
                      <td>
                        <Link to={'/account_setting/' + item.id}>
                          <Text color="info">
                            {item.first_name} {item.last_name}
                          </Text>
                        </Link>
                      </td>
                      <td>
                        <Text>{item.email}</Text>
                      </td>
                      <td>
                        <Text>
                          {item.contact_number !== ''
                            ? item.contact_number
                            : '-'}
                        </Text>
                      </td>
                      <td>
                        <Text>{item.department_name}</Text>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {getStatusButton(item.status)}
                      </td>
                      <td>
                        <Text>{item.group_name}</Text>
                      </td>
                      <td>
                        <Text>{InviteOn}</Text>
                      </td>
                      <td className="text-center">
                        <Text>{ActionsButton(item.status, item.id)}</Text>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row align-items-center table_min_height">
              <div className="col-12 text-center">
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <CancelAndDeletePopup
        btnCancel={() => setDeleteModal(false)}
        title={
          <Flex className={styles.popUpFlex}>
            <Text>
              This will remove the user permanently from your account. User will
              not get access.
            </Text>
            <Text>Do you still want to delete the user?</Text>
          </Flex>
        }
        btnDelete={onDelete}
        btnLeft="Cancel"
        btnRight="Delete"
        open={deleteModal}
        loader={deleteBtnLoader}
      />

      <CancelAndDeletePopup
        btnCancel={() => setInactivate(false)}
        title={
          <Flex className={styles.popUpFlex}>
            <Text>
              Access will be revoked for the user temporarily. You can activate
              the user at any time.
            </Text>
            <Text>Do you still want to inactivate the user?</Text>
          </Flex>
        }
        btnDelete={onInactivate}
        btnLeft="Cancel"
        btnRight="Inactivate"
        open={inactivate}
        loader={inactivateBtnLoader}
      />

      <CancelAndDeletePopup
        btnCancel={() => setActivate(false)}
        title={'Do you want to activate the user?'}
        btnDelete={onActivate}
        btnLeft="Cancel"
        btnRight="Active"
        open={activate}
        loader={activateBtnLoader}
      />

      <CancelAndDeletePopup
        btnCancel={() => setResend(false)}
        title={
          'Invitation will be sent again as an email. Are you sure to proceed?'
        }
        btnDelete={onResend}
        btnLeft="Cancel"
        btnRight="Invite"
        open={resend}
        loader={resendBtnLoader}
      />
      <EditUserModal
        show={editModal}
        userData={userData}
        OnEdit={OnEdit}
        clearData={clearData}
        onHide={hideModal}
        message={message}
        messageClass={messageClass}
        inviteBtnLoader={inviteBtnLoader}
        modalCloseCheck={modalCloseCheck}
        size="lg"
        isReload={isReload}
        setReload={setReload}
        isUserId={userId}
      />
    </>
  );
}

export default UserTable;
