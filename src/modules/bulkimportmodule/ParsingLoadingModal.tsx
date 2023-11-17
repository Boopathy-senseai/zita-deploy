import { ReactNode } from 'react';
import SvgInfo from '../../icons/SvgInfo';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './parsingloadingmodal.module.css';

type Props = {
  close: (a: any) => void;
  open: boolean;
  des: ReactNode;
  title: string;
  loader?: boolean;
  info?: boolean;
  css?:boolean;
};

const ParsingLoadingModal = ({
  close,
  open,
  title,
  des,
  loader,
  info,
  css,
}: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex column>
          <Flex row center>
            {/* {loader && <Loader withOutOverlay size={'small'} />} */}
           
            <Text className={css?null:styles.flexConatiner} type="titleMedium">
              {title}
            </Text>
          </Flex>
          <Flex className={styles.des}>{des}</Flex>
        </Flex>
        <Flex row center middle>
        {/* {loader ?(  
        <Flex className={styles.updateBtnLoader}>
          <Loader withOutOverlay size={'small'} />
        </Flex>):(
          <Button onClick={close} className={styles.btn}>
            OK
          </Button>)} */}
          <Button onClick={close} className={styles.btn}>
            OK
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ParsingLoadingModal;
