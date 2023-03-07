import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
class DeleteModal extends Component {
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
            <div className="row py-4">
              <div className="col-2 text-center">
                <InfoCircleFill className="deleteIcon" />
              </div>
              <div className="col-10">
                <p className="text-muted text-sm">
                  Deleting will remove the user Permantly form your account.
                  user will not get access. This action cannot be revoked. Do
                  you still want to delete thaa user?
                </p>
                <button
                  className="btn btn-primary btn-sm min-btn-width"
                  onClick={this.props.onHide}
                >
                  No
                </button>
                <button
                  className="btn btn-primary btn-sm min-btn-width mx-2"
                  onClick={this.props.onDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default DeleteModal;
