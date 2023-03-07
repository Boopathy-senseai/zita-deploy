import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './unlockloadermodal.module.css';

type Props = {
  open: boolean;
  title: string;
};
const UnlockLoaderModal = ({ open, title }: Props) => {
  return (
    <Modal open={open}>
      <Flex row center className={styles.overAll}>
        <Loader size={'medium'} withOutOverlay />
        <Text className={styles.textStyle}>{title}</Text>
      </Flex>
    </Modal>
  );
};

export default UnlockLoaderModal;
