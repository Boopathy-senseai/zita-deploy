import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './singlebutton.module.css';

type Props = {
  open: boolean;
  title: string;
  btnTitle: string;
  btnOnclick: () => void;
};

const SingleButton = ({ open, btnTitle, title, btnOnclick }: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex end onClick={btnOnclick}>
          <SvgCloseSmall />
        </Flex>
        <Flex row center className={styles.title}>
          <SvgInfo />
          <Text className={styles.titleText}>{title}</Text>
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button onClick={btnOnclick}>{btnTitle}</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default SingleButton;
