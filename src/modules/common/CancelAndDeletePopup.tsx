import { ReactNode } from 'react';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import { CANCEL, DELETE } from '../constValue';
import styles from './cancelanddeletepopup.module.css';

type Props = {
  title: ReactNode;
  btnDelete: (a?: any) => void;
  btnCancel: (a?: any) => void;
  open: boolean;
  btnLeft: string;
  btnRight: string;
  loader?: boolean;
};

const CancelAndDeletePopup = ({
  title,
  btnCancel,
  btnDelete,
  open,
  btnLeft,
  btnRight,
  loader,
}: Props) => {
  return (
    <Modal open={open}>
      {loader && <Loader />}
      <Flex className={styles.overAll}>
    
        <Flex row center className={styles.info}>
      
          {typeof title === 'string' ? (
            <Text className={styles.titelTextStyle}>{title}</Text>
          ) : (
            title
          )}
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button
            className={styles.btnCancelStyle}
            types="close"
            onClick={btnCancel}
          >
            {btnLeft}
          </Button>
          <Button className="btnDeleteStyle" onClick={btnDelete}>
            {btnRight}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
CancelAndDeletePopup.defaultProps = {
  btnLeft: CANCEL,
  btnRight: DELETE,
};
export default CancelAndDeletePopup;
