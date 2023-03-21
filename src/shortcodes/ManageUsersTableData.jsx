/* eslint-disable */
import { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  TrashFill,
  SlashCircle,
  PencilSquare,
  ThreeDotsVertical,
} from 'react-bootstrap-icons';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import UserEditModal from './UserEditModal';
import UserAddModal from './UserAddModal';
import InActiveModal from './InActiveModal';
import DeleteModal from './DeleteModal';
export class ManageUsersTableData extends Component {
  state = {
    isDeleteOpen: false,
    isInactiveModalOpen: false,
    isAddOpen: false,
    isEditOpen: false,
    usersData: [],
    DeleteUserId: null,
    InactivateUserId: null,
    EditUserId: null,
    handleEditUserData: {},
    AvailableInvites: 0,
    TotalUsers: 0,
  };

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.onInActive = this.onInActive.bind(this);
  }

  openDeleteModal(id) {
    this.setState({
      isDeleteOpen: true,
      DeleteUserId: id,
    });
  }

  onDelete() {
    this.setState({ isDeleteOpen: false });

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete('users/' + this.state.DeleteUserId, config)
      .then((res) => {
        console.log(res);
        toast.success(res.data.msg, {
          duration: 3500,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state.DeleteUserId);
  }

  closeDeleteModal = () => this.setState({ isDeleteOpen: false });

  openInactiveModal(id) {
    this.setState({
      isInactiveModalOpen: true,
      InactivateUserId: id,
    });
  }

  onInActive() {
    this.setState({ isInactiveModalOpen: false });
    console.log(this.state.InactivateUserId);
  }

  closeInactiveModal = () => this.setState({ isInactiveModalOpen: false });

  openAddModal = () => {
    if (this.state.AvailableInvites > 0) {
      this.setState({ isAddOpen: true });
    }
  };

  closeAddModal = () => this.setState({ isAddOpen: false });

  openEditModal(id) {
    this.setState({
      isEditOpen: true,
      EditUserId: id,
      handleEditUserData: {
        fName: 'd',
        lName: 's',
        email: 'e',
        phone: '1',
        department: '1',
        role: 'admin',
        CreatePostJob: true,
        ZitaMatchCandidate: false,
        Applicants: true,
        BulkImportCandidates: true,
        TalentSourcing: true,
        MyDatabase: true,
        ManageAccountSettings: true,
        CreateManeUsers: true,
        Reports: true,
      },
    });
  }

  onEdit() {
    this.setState({ isEditOpen: false });
    console.log(this.state.EditUserId);
  }

  closeEditModal = () => this.setState({ isEditOpen: false });

  onInviteSend = (inviteData) => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .post('users/invite', inviteData, config)
      .then((res) => {
        this.getUserallData();
        let el = document.getElementById('form_loader');
        el.classList.add('d-none');
        let fomrClass = document.getElementById('addModalSubmitForm');
        fomrClass.classList.remove('d-none');
        this.setState({ isAddOpen: false });
        toast.success('User invited successfully', {
          duration: 3500,
        });
        this.setState({
          message: undefined,
        });
      })
      .catch((err) => {
        if (err.response.data.status !== 200) {
          let el = document.getElementById('form_loader');
          el.classList.add('d-none');
          let fomrClass = document.getElementById('addModalSubmitForm');
          fomrClass.classList.remove('d-none');
        }
        this.setState({
          message: err.response.data.username,
          alertclass: 'danger',
        });
      });
  };

  getUserallData() {
    let el = document.getElementById('home_content_loader');
    el.classList.remove('d-none');
    let fomrClass = document.getElementById('home_content');
    fomrClass.classList.add('d-none');

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('users', config)
      .then((res) => {
        this.setState({
          usersData: res.data,
          TotalUsers: res.data.length,
        });
        let el = document.getElementById('home_content_loader');
        el.classList.add('d-none');
        let fomrClass = document.getElementById('home_content');
        fomrClass.classList.remove('d-none');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAvailableInvites() {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('users', config)
      .then((res) => {
        this.setState({
          AvailableInvites: 4,
        });
        if (this.state.AvailableInvites > 0) {
          document.getElementById('AvailableInvites').disabled = false;
          document.getElementById('BuyNewUser').disabled = true;
        } else {
          document.getElementById('AvailableInvites').disabled = true;
          document.getElementById('BuyNewUser').disabled = false;
        }
        console.log(this.state.AvailableInvites);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAvailableInvites();
    this.getUserallData();
  }

  render() {
    const getStatusButton = (ststus) => {
      if (ststus === true) {
        return (
          <button
            size={'small'}
            className="btn btn-primary btn-sm min-btn-width"
          >
            Active
          </button>
        );
      } else if (ststus === false) {
        return (
          <button
            size={'small'}
            className="btn btn-warning btn-sm min-btn-width"
          >
            Pending
          </button>
        );
      } else {
        return (
          <button size={'small'} className="btn btn-light btn-sm min-btn-width">
            Inactive
          </button>
        );
      }
    };
    const ActionsButton = (rowId) => {
      return (
        <>
          <Dropdown className="dropdownButton dropdown_left dropleft">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <ThreeDotsVertical />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.openEditModal(rowId)}>
                <PencilSquare className="mr-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.openInactiveModal(rowId)}>
                <SlashCircle className="mr-2" /> Inavtive
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.openDeleteModal(rowId)}>
                <TrashFill className="mr-2" /> Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    };
    const contents = this.state.usersData.reverse().map((item, i) => {
      // console.log(item.username);
      var cts = item.date_joined;
      const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };
      var InviteOn = new Date(cts).toLocaleDateString('en-IN', DATE_OPTIONS);
      if (item.department === null) {
        var department = '-';
      } else {
        department = item.department.department.name;
      }
      if (item.groups[0] === undefined) {
        var Roles = '-';
      } else {
        var role_item = item.groups[0];
        Roles = role_item.name;
      }
      return (
        <tr key={i}>
          <td>
            <Link className="text-primary" to={'/activity/' + item.id}>
              {item.username}
            </Link>
          </td>
          <td>{item.email}</td>
          <td>{item.contact}</td>
          <td>{department}</td>
          <td>{getStatusButton(item.status)}</td>
          <td>{Roles}</td>
          <td>{InviteOn}</td>
          <td className="text-center">{ActionsButton(item.id)}</td>
        </tr>
      );
    });
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div
          id="home_content_loader"
          className="d-none card p-3 lodar_min_height "
        >
          <Loader />
        </div>
        <div id="home_content">
          <div className="home_content pt-4">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="mb-2">Manage Users</h4>
                <p className="text-muted test-sm">
                  you can invite your team members and manage your organization
                  as an admin.
                </p>
              </div>
              <div className="col-auto">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <p className="mb-0">Total Users: {this.state.TotalUsers}</p>
                  </div>
                  <div className="col-auto">
                    <p className="mb-0">
                      Available Invites: {this.state.AvailableInvites}
                    </p>
                  </div>
                  <div className="col-auto">
                    <button id="BuyNewUser" className="btn btn-primary">
                      Buy Newddd User
                    </button>
                  </div>
                  <div className="col-auto">
                    <button
                      onClick={this.openAddModal}
                      id="AvailableInvites"
                      className="btn btn-primary"
                    >
                      Invite New User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive table_min_height">
                <table className="table table-hover small mb-0">
                  <thead>
                    <tr>
                      <th scope="col">User Name</th>
                      <th scope="col">Email Id</th>
                      <th scope="col">Contact Number</th>
                      <th scope="col">Department</th>
                      <th scope="col">Status</th>
                      <th scope="col">Role</th>
                      <th scope="col">Invited On</th>
                      <th className="text-center" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>{contents}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeleteModal
          show={this.state.isDeleteOpen}
          onHide={this.closeDeleteModal}
          size="md"
          onDelete={this.onDelete}
        />
        <InActiveModal
          show={this.state.isInactiveModalOpen}
          onHide={this.closeInactiveModal}
          size="md"
          onInActive={this.onInActive}
        />
        <UserAddModal
          show={this.state.isAddOpen}
          onHide={this.closeAddModal}
          size="lg"
          onInviteSend={this.onInviteSend}
          message={this.state.message}
          alertclass={this.state.alertclass}
        />
        <UserEditModal
          show={this.state.isEditOpen}
          onHide={this.closeEditModal}
          size="lg"
          EditUserData={this.state.handleEditUserData}
        />
      </>
    );
  }
}

export default ManageUsersTableData;
