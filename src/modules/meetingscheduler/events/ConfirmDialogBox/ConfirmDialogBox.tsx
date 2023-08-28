import Button from '../../../../uikit/Button/Button';
import Flex from '../../../../uikit/Flex/Flex';
import styles from './confirmationdialog.module.css';

type Props = {
  message: string;
  onConfirm: (boolean) => void;
  onCancel: (boolean) => void;
};

const ConfirmationDialog = ({
  message,
  onConfirm,
  onCancel 
}: Props) => {
  return (
    <>
      <Flex className={styles.container}>
        <Flex row className={styles.message}>
          {message}
        </Flex>
        {message === 'Select Atleast One Availble Day' ||
        message ===
          'Atleast One inteerview must be integrated to the Google Calendar' ? (
          <Flex row end>
            <Button className={styles.button} onClick={onConfirm}>
              Ok
            </Button>
          </Flex>
        ) : (
          <Flex row end>
            <Button
              types={'primary'}
              className={styles.cancel}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button className={styles.button} onClick={onConfirm}>
              Confirm
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ConfirmationDialog;
