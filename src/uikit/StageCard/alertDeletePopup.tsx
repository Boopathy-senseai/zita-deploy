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
        <Text bold color="theme" className={styles.insertStyles}>
        The Selected stage has Candidate Data, Move them to other Stage in-order to delete the stage.
        </Text>
        {/* <Text  color="theme" className={styles.insertStyles}>
          Are You sure?
        </Text> */}

        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={handleCloseDeletePopup}
          >
            Ok
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
