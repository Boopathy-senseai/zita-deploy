import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { XLg as CloseIcon } from 'react-bootstrap-icons';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Loader from '../components/Loader';

class UserAddModal extends Component {
  //Set Default State
  state = {
    displayRoles: [],
    displayPermissions: [],
    searchDepartment: [],
    fname: '',
    lname: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    value: '',
    suggestions: [],
  };

  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.searchDepartment.filter(
          (lang) =>
            lang.name.toLowerCase().slice(0, inputLength) === inputValue,
        );
  };

  getSuggestionValue = (suggestion) => suggestion.name;

  renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  onChange = (_e, { newValue }) => {
    this.setState({
      value: newValue,
      department: newValue,
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  //Form Input Changes
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if ([e.target.name][0] === 'role') {
      this.handleRoleSelect(e.target.value);
    }
  };

  //Get All roles
  getDefaultRoles = () => {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('roles', config)
      .then((res) => {
        this.setState({
          displayRoles: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get all Department
  GetAllDepartment() {
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    let options = [];
    axios
      .get('departments', config)
      .then((res) => {
        res.data.map((d) =>
          options.push({
            id: d.id,
            name: d.name,
          }),
        );
        this.setState({
          searchDepartment: options,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Call Before Component Load
  componentDidMount() {
    this.getDefaultRoles();
    this.GetAllDepartment();
  }

  //Call When Select A Role
  handleRoleSelect = (value) => {
    let el = document.getElementById('RoleCheckbox');
    el.classList.add('d-none');
    let cardClass = document.getElementById('RoleCheckboxCard');
    cardClass.classList.add('d-none');
    let elLoader = document.getElementById('RoleCheckboxLoader');
    elLoader.classList.remove('d-none');
    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('permissions/role_id/' + value, config)
      .then((res) => {
        this.IsRolePermissionsById(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    el.classList.remove('d-none');
  };

  //Default Checked Role Permissions
  IsRolePermissionsById = (checkedPermission) => {
    function CallCheckedPermissionFun() {
      checkedPermission.forEach(function (value) {
        document.getElementById(value.codename).disabled = true;
        document.getElementById(value.codename).checked = true;
      });
    }

    let config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    };
    axios
      .get('permissions', config)
      .then((res) => {
        this.setState({
          displayPermissions: res.data,
        });
        this.state.displayPermissions.forEach(function (value) {
          document.getElementById(value.codename).disabled = false;
          document.getElementById(value.codename).checked = false;
        });
        CallCheckedPermissionFun();
        let elLoader = document.getElementById('RoleCheckboxLoader');
        elLoader.classList.add('d-none');
        let cardClass = document.getElementById('RoleCheckboxCard');
        cardClass.classList.remove('d-none');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Invite User
  onTrigger = (e) => {
    let el = document.getElementById('form_loader');
    el.classList.remove('d-none');
    let fomrClass = document.getElementById('addModalSubmitForm');
    fomrClass.classList.add('d-none');
    e.preventDefault();
    var checkedValue = [];
    var inputElements = document.getElementsByClassName('custom-control-input');
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        checkedValue.push(inputElements[i].value);
      }
    }
    const data = {
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      contact: this.state.phone,
      department: this.state.department,
      role: this.state.role,
      permissions: checkedValue,
    };
    this.props.onInviteSend(data);
    this.setState({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      value: '',
    });
  };

  OnHideModal = () => {
    this.props.onHide();
    this.setState({
      fname: '',
      lname: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      value: '',
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Department',
      value,
      onChange: this.onChange,
    };

    let displayMessage = '';

    if (this.props.message !== undefined) {
      const cls = 'alert mb-5 py-2 mt-0 alert-' + this.props.alertclass;
      displayMessage = <div className={cls}>{this.props.message}</div>;
    }

    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.OnHideModal}
          size={this.props.size}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div id="form_loader" className="d-none card p-3 lodar_min_height">
              <Loader />
            </div>
            <form id="addModalSubmitForm" onSubmit={this.onTrigger}>
              <div className="row mb-4">
                <div className="col">
                  <h4 className="mb-0">Invite New User</h4>
                </div>
                <div className="col-auto">
                  <CloseIcon className="pointer" onClick={this.OnHideModal} />
                </div>
              </div>
              <div className="row">
                <div className="col-12">{displayMessage}</div>
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <input
                      type="text"
                      required
                      value={this.state.fName}
                      name="fname"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>First Name *</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <input
                      type="text"
                      required
                      value={this.state.lName}
                      name="lname"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Last Name *</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <input
                      type="email"
                      required
                      value={this.state.email}
                      name="email"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Email Id *</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <input
                      min="10"
                      type="number"
                      required
                      value={this.state.phone}
                      name="phone"
                      onChange={this.handleInputChange}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Contact Number</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={this.getSuggestionValue}
                      renderSuggestion={this.renderSuggestion}
                      inputProps={inputProps}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="select">
                    <select
                      className="select-text"
                      required
                      defaultValue={this.state.role}
                      name="role"
                      onChange={this.handleInputChange}
                    >
                      <option value="" disabled></option>
                      {this.state.displayRoles.map((valueList) => (
                        <option key={valueList.id} value={valueList.id}>
                          {valueList.name}
                        </option>
                      ))}
                    </select>
                    <span className="select-highlight"></span>
                    <span className="select-bar"></span>
                    <label className="select-label">Role</label>
                  </div>
                </div>
                <div id="RoleCheckbox" className="col-12 mt-4 d-none">
                  <div
                    id="RoleCheckboxLoader"
                    className="lodar_height_auto card p-3"
                  >
                    <Loader />
                  </div>
                  <div id="RoleCheckboxCard" className="card d-none">
                    <div className="card-body">
                      <h6 className="mb-1">User Privileges</h6>
                      <small className="text-muted">
                        you cannot remove tha default access of the user, but
                        you can grant more features
                      </small>
                      <div className="row mt-4">
                        {this.state.displayPermissions.map((displayValue) => (
                          <div key={displayValue.id} className="col-md-6">
                            <div className="custom-control custom-checkbox">
                              <input
                                onChange={this.handleInputChange}
                                name={displayValue.codename}
                                type="checkbox"
                                className="custom-control-input"
                                id={displayValue.codename}
                                value={displayValue.id}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={displayValue.codename}
                              >
                                {displayValue.name}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm min-btn-width"
                  >
                    Send Invite
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default UserAddModal;
