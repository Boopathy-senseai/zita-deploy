import SvgClose from '../../icons/SvgClose';
import { GARY_3 } from '../../uikit/Colors/colors';
import Drawer from '../../uikit/Drawer/Drawer';
import Flex from '../../uikit/Flex/Flex';
import styles from './profileviewmodal.module.css';

type Props = {
  open: boolean;
  filePath: string;
  cancel: () => void;
};

const ProfileViewModal = ({ open, filePath, cancel }: Props) => {
  const file = `http://${filePath}`;

  return (
    <Drawer open={open}>
      <div className={styles.overAll}>
        <Flex row center between flex={1} className={styles.border}>
          <div
            className={'pointer'}
            onClick={cancel}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgClose fill={GARY_3} />
          </div>
        </Flex>
        <div
          style={{
            height: window.innerHeight - 0,
            overflow: 'scroll',
          }}
        >
          <iframe
            title="Resume"
            src={`https://docs.google.com/viewer?url=${file}&embedded=true`}
            width="100%"
            height="1000"
          ></iframe>
        </div>
      </div>
    </Drawer>
  );
};

export default ProfileViewModal;
