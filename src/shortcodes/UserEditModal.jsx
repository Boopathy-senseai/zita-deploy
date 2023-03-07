import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { XLg as CloseIcon } from 'react-bootstrap-icons';
class UserEditModal extends Component {
  state = {};

  handleRoleSelect = (e) => {
    this.setState({
      role: e.target.value,
    });
    if (e.target.value === 'admin') {
      this.setState({
        CreatePostJob: true,
        ZitaMatchCandidate: true,
        Applicants: true,
        BulkImportCandidates: true,
        TalentSourcing: true,
        MyDatabase: true,
        ManageAccountSettings: true,
        CreateManeUsers: true,
        Reports: true,
      });
      document.getElementById('CreatePostJob').disabled = true;
      document.getElementById('ZitaMatchCandidate').disabled = true;
      document.getElementById('Applicants').disabled = true;
      document.getElementById('BulkImportCandidates').disabled = true;
      document.getElementById('TalentSourcing').disabled = true;
      document.getElementById('MyDatabase').disabled = true;
      document.getElementById('ManageAccountSettings').disabled = true;
      document.getElementById('CreateManeUsers').disabled = true;
      document.getElementById('Reports').disabled = true;
    } else if (e.target.value === 'hr') {
      this.setState({
        CreatePostJob: true,
        ZitaMatchCandidate: true,
        Applicants: true,
        BulkImportCandidates: true,
        TalentSourcing: true,
        MyDatabase: true,
        ManageAccountSettings: false,
        CreateManeUsers: false,
        Reports: true,
      });
      document.getElementById('CreatePostJob').disabled = true;
      document.getElementById('ZitaMatchCandidate').disabled = true;
      document.getElementById('Applicants').disabled = true;
      document.getElementById('BulkImportCandidates').disabled = true;
      document.getElementById('TalentSourcing').disabled = true;
      document.getElementById('MyDatabase').disabled = true;
      document.getElementById('ManageAccountSettings').disabled = false;
      document.getElementById('CreateManeUsers').disabled = false;
      document.getElementById('Reports').disabled = true;
    } else if (e.target.value === 'hiring') {
      this.setState({
        CreatePostJob: false,
        ZitaMatchCandidate: true,
        Applicants: true,
        BulkImportCandidates: false,
        TalentSourcing: false,
        MyDatabase: false,
        ManageAccountSettings: false,
        CreateManeUsers: false,
        Reports: true,
      });
      document.getElementById('CreatePostJob').disabled = false;
      document.getElementById('ZitaMatchCandidate').disabled = true;
      document.getElementById('Applicants').disabled = true;
      document.getElementById('BulkImportCandidates').disabled = false;
      document.getElementById('TalentSourcing').disabled = false;
      document.getElementById('MyDatabase').disabled = false;
      document.getElementById('ManageAccountSettings').disabled = false;
      document.getElementById('CreateManeUsers').disabled = false;
      document.getElementById('Reports').disabled = true;
    }
    let el = document.getElementById('RoleCheckbox');
    el.classList.remove('d-none');
  };

  handleCheckboxChange = (e) => {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  };

  handleChange() {
    console.log('handle change called');
  }

  handleClick() {
    this.setState({ value: 'another random text' });
    var event = new Event('input', { bubbles: true });
    this.myinput.dispatchEvent(event);
  }

  onTrigger = (e) => {
    e.preventDefault();
    const data = {
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      phone: this.phone,
      department: this.department,
      role: this.state.role,
      roleData: {
        // {id: 1, value: true},
        // {id: 1, value: true},
        // {id: 1, value: true},
        // {id: 1, value: true},
        CreatePostJob: this.state.CreatePostJob,
        ZitaMatchCandidate: this.state.ZitaMatchCandidate,
        Applicants: this.state.Applicants,
        BulkImportCandidates: this.state.BulkImportCandidates,
        TalentSourcing: this.state.TalentSourcing,
        MyDatabase: this.state.MyDatabase,
        ManageAccountSettings: this.state.ManageAccountSettings,
        CreateManeUsers: this.state.CreateManeUsers,
        Reports: this.state.Reports,
      },
    };
    this.props.onInviteSend(data);
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size={this.props.size}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <form onSubmit={this.onTrigger}>
              <div className="row mb-4">
                <div className="col">
                  <h4 className="mb-0">Invite New User</h4>
                </div>
                <div className="col-auto">
                  <CloseIcon className="pointer" onClick={this.props.onHide} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-4 pb-2">
                    <input
                      type="text"
                      required
                      value={this.state.value}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
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
                      value={this.state.value}
                      onChange={(e) => {
                        this.handleChange(e);
                      }}
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
                      onChange={(e) => (this.email = e.target.value)}
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
                      onChange={(e) => (this.phone = e.target.value)}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Contact Number</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="select">
                    <select
                      defaultValue=""
                      className="select-text"
                      required
                      onChange={(e) => (this.department = e.target.value)}
                    >
                      <option value="" disabled></option>
                      <option value="1">Developement</option>
                      <option value="2">Option 2</option>
                      <option value="3">Option 3</option>
                    </select>
                    <span className="select-highlight"></span>
                    <span className="select-bar"></span>
                    <label className="select-label">Department</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="select">
                    <select
                      defaultValue=""
                      onChange={this.handleRoleSelect}
                      className="select-text"
                      required
                    >
                      <option value="" disabled></option>
                      <option value="admin">Admin</option>
                      <option value="hr">Hr</option>
                      <option value="hiring">Hiring</option>
                    </select>
                    <span className="select-highlight"></span>
                    <span className="select-bar"></span>
                    <label className="select-label">Role</label>
                  </div>
                </div>
                <div id="RoleCheckbox" className="col-12 d-none mt-4">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="mb-1">User Privileges</h6>
                      <small className="text-muted">
                        you cannot remove tha default access of the user, but
                        you can grant more features
                      </small>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.CreatePostJob}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="CreatePostJob"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="CreatePostJob"
                            >
                              Create & Post Job
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.ZitaMatchCandidate}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="ZitaMatchCandidate"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="ZitaMatchCandidate"
                            >
                              Zita Match Candidates
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.Applicants}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="Applicants"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="Applicants"
                            >
                              Applicants
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.BulkImportCandidates}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="BulkImportCandidates"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="BulkImportCandidates"
                            >
                              Bulk Import Candidates
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.TalentSourcing}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="TalentSourcing"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="TalentSourcing"
                            >
                              Talent Sourcing
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.MyDatabase}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="MyDatabase"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="MyDatabase"
                            >
                              My Database
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.ManageAccountSettings}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="ManageAccountSettings"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="ManageAccountSettings"
                            >
                              Manage Account Settings
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.CreateManeUsers}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="CreateManeUsers"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="CreateManeUsers"
                            >
                              Create & Mane Users
                            </label>
                          </div>
                          <div className="custom-control custom-checkbox">
                            <input
                              checked={this.state.Reports}
                              onChange={this.handleCheckboxChange}
                              type="checkbox"
                              className="custom-control-input"
                              id="Reports"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="Reports"
                            >
                              Reports
                            </label>
                          </div>
                        </div>
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

export default UserEditModal;
