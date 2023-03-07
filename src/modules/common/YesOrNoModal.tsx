import { ReactNode } from 'react';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './yesornomodal.module.css';

type Props = {
  open: boolean;
  title: ReactNode;
  btnLeftTitle: string;
  btnRightTitle: string;
  btnLeftOnclick: () => void;
  btnRightOnclick: (a?: any) => void;
};

const YesOrNoModal = ({
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
        <Flex row className={styles.title}>
          <SvgInfo />
          {typeof title === 'string' || typeof title === 'number' ? (
            <Text className={styles.titelText}>{title}</Text>
          ) : (
            title
          )}
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

export default YesOrNoModal;
