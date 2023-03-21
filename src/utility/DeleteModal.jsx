/* eslint-disable */
import { Modal } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';
import LoadingButton from './LoadingButton';
const DeleteModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size={props.size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="px-4">
            <div className="row py-4 justify-content-center">
              <div className="col-auto pr-0 text-center">
                <InfoCircleFill className="deleteIcon" />
              </div>
              <div className="col-auto text-center max-width">
                <p className="text-muted text-sm">{props.content}</p>
                <button
                  className="btn btn-primary btn-sm min-btn-width"
                  onClick={props.onHide}
                >
                  No
                </button>
                <span onClick={props.onDelete}>
                  <LoadingButton
                    type="button"
                    className="btn btn-primary btn-sm min-btn-width mx-2"
                    isLoading={props.btnLoader}
                    text="Yes"
                  />
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteModal;
