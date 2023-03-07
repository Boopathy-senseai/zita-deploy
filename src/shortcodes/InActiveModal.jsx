import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
class InActiveModal extends Component {
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
                  access will be revoked temporarily. You can activate the user
                  at any time. Do you still want to inactivate the user?
                </p>
                <button
                  className="btn btn-primary btn-sm min-btn-width"
                  onClick={this.props.onHide}
                >
                  No
                </button>
                <button
                  className="btn btn-primary btn-sm min-btn-width mx-2"
                  onClick={this.props.onInActive}
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

export default InActiveModal;
