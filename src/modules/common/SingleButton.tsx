import { ReactNode } from 'react';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import SvgTick from '../../icons/SvgTick';
import Button from '../../uikit/Button/Button';
import { SUCCESS } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './singlebutton.module.css';

type Props = {
  open: boolean;
  title: ReactNode;
  btnTitle: string;
  btnOnclick: () => void;
  svgTick?: boolean;
};

const SingleButton = ({
  open,
  btnTitle,
  title,
  btnOnclick,
  svgTick,
}: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        
        <Flex row center className={styles.title}>
          
          {typeof title === 'string' ? (
            <Text className={styles.titleText}>{title}</Text>
          ) : (
            title
          )}
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button onClick={btnOnclick}>{btnTitle}</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default SingleButton;
