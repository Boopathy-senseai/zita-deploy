import classNames from 'classnames/bind';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Button from '../../uikit/Button/Button';
import styles from './deletePopup.module.css';

const cx = classNames.bind(styles);

type Props = {
  openDeletePopup: boolean;
  handleDeletePipelinePopup: () => void;
  handleCloseDeletePopup: () => void;
};

const AlertDeletePopup = ({
  openDeletePopup,
  handleDeletePipelinePopup,
  handleCloseDeletePopup,
}: Props) => {
  return (
    <Modal open={openDeletePopup}>
      <Flex flex={6} column center className={styles.overAll}>
        <Text size={14} color="black2" className={styles.insertStyles}>
          In order to delete this stage, please transfer the assigned applicants
          to other stages.
        </Text>

        <Flex row end className={styles.borderLine}>
          <Button
            // className={styles.cancel}
            types={'primary'}
            onClick={handleCloseDeletePopup}
          >
            OK
          </Button>
          {/* <Button className={styles.update} onClick={handleDeletePipelinePopup}>
            Delete
          </Button> */}
        </Flex>
      </Flex>
    </Modal>
  );
};
export default AlertDeletePopup;
