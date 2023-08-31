import { Modal } from '../../../uikit/v2';
import Text from '../../../uikit/Text';
import { ICalendarEvent, IEvent } from '../types';
import { Button, Flex } from '../../../uikit';
import styles from './deleteEvent.module.css';

interface Props {
  open: boolean;
  event: IEvent | ICalendarEvent;
  type: 'event' | 'calendar';
  onClose: () => void;
  onConfirm: (id: any) => void;
}

const EventDeletePopUpModal = ({
  onConfirm,
  event,
  type,
  onClose,
  open,
}: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.deleteWarningPopUp}>
        {/* <div className={styles.warningMessage}> */}
        {/* <SvgInfo /> */}
        <Flex flex={6} center>
          <Text color="black2" size={13} className={styles.insertStyles}>
            Meeting will be canceled and notified to the attendees.
          </Text>
          <Text color="black2" size={13} className={styles.insertStyles}>
            Are you sure to proceed further?
          </Text>
        </Flex>
        {/* </div> */}

        <div className={styles.actionButtonWrapper}  style={{ marginTop: '20px' }}>
          <Button style={{ marginRight: 8 }} className={styles.cancel} onClick={onClose}>
            No, Thanks
          </Button>
          <Button
            onClick={() => onConfirm(event.id)}
            className={styles.deleteButton}
          >
            Cancel Meeting
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDeletePopUpModal;
