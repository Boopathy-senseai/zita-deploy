import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './jdparserloader.module.css';

type Props = {
  open: boolean;
  title:string
};
const JdParserLoader = ({ open ,title}: Props) => {
  return (
    <Modal open={open}>
      <Flex row center className={styles.overAll}>
        <Loader withOutOverlay size="medium" />
        <Text style={{ marginLeft: 8 }}>
          {title}
        </Text>
      </Flex>
    </Modal>
  );
};
export default JdParserLoader;
