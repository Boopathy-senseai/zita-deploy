import { Modal } from '../../../uikit/v2';
import Text from '../../../uikit/Text';
import { ICalendarEvent, IEvent } from '../types';
import styles from './deleteEvent.module.css';

interface Props {
  open: boolean;
  event: IEvent | ICalendarEvent;
  type: "event" | "calendar";
  onClose: () => void;
  onConfirm: (doc:{id?: any, cal_id?: any}) => void;
}

const EventDeletePopUpModal = ({ onConfirm, event, type, onClose, open }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.deleteWarningPopUp}>
        <div className={styles.warningMessage}>
          {/* <SvgInfo /> */}
          <Text size={14}>
            Meeting will be canceled and notified to the attendees.
            <br />
            Are you sure to proceed further?
          </Text>
        </div>

        <div className={styles.actionButtonWrapper}>
          <button style={{ marginRight: 10 }} onClick={onClose}>
            No, Thanks
          </button>
          <button 
            onClick={() => {
                if(type === "event") onConfirm({id:event.id});
                if(type === "calendar") onConfirm({cal_id:event.id});
            }} 
            className={styles.deleteButton}
          >
            Cancel Meeting
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDeletePopUpModal;
