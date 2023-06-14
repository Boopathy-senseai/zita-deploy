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

const DeletePopup = ({
  openDeletePopup,
  handleDeletePipelinePopup,
  handleCloseDeletePopup,
}: Props) => {
  return (
    <Modal open={openDeletePopup}>
      <Flex flex={6} column center className={styles.overAll}>
        <Text  color="theme" className={styles.insertStyles}>
          This action will delete the stage from your pipeline.
        </Text>
        <Text color="theme" size={13}className={styles.insertStyles}>
          Are you sure to proceed?
        </Text>

        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={handleCloseDeletePopup}
          >
            Cancel
          </Button>
          <Button className={styles.update} onClick={handleDeletePipelinePopup}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default DeletePopup;
