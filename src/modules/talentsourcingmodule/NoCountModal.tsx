import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './nocountmodal.module.css';

type Props = {
  open: boolean;
  title: string;
  btnLeftTitle: string;
  btnRightTitle: string;
  btnLeftOnclick: () => void;
  btnRightOnclick: () => void;
};

const NoCountModal = ({
  open,
  btnLeftTitle,
  title,
  btnRightTitle,
  btnLeftOnclick,
  btnRightOnclick,
}: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex end onClick={btnLeftOnclick}>
          <SvgCloseSmall />
        </Flex>
        <Flex row center className={styles.title}>
          <SvgInfo width={29} height={50} />
          <Text className={styles.titelText}>{title}</Text>
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button
            types="secondary"
            className={styles.leftBtn}
            onClick={btnLeftOnclick}
          >
            {btnLeftTitle}
          </Button>
          <Button className={styles.rightBtn} onClick={btnRightOnclick}>
            {btnRightTitle}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default NoCountModal;
