import SvgClose from '../../icons/SvgClose';
import SvgNewTab from '../../icons/SvgNewTab';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import Drawer from '../../uikit/Drawer/Drawer';
import Flex from '../../uikit/Flex/Flex';
import PdfView from '../../uikit/PdfView';
import Text from '../../uikit/Text/Text';
import styles from './candiviewmodal.module.css';

type Props = {
  open: boolean;
  filePath: string;
  cancel: () => void;
};

const CandiViewModal = ({ open, filePath, cancel }: Props) => {
  const file = 'https://' + filePath;

  const handleOpen = () => {
    window.open(file);
  };
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
          <Flex row center className={'pointer'}>
            <Text
              color="link"
              onClick={handleOpen}
              className={styles.openStyle}
            >
              Open profile in a new window
            </Text>
            <div
              onClick={handleOpen}
              tabIndex={-1}
              role={'button'}
              onKeyPress={() => {}}
            >
              <SvgNewTab fill={LINK} width={20} height={20} />
            </div>
          </Flex>
        </Flex>

        <div
          style={{
            height: window.innerHeight - 40,
            overflow: 'scroll',
          }}
        >
          <PdfView file={file} />
        </div>
      </div>
    </Drawer>
  );
};

export default CandiViewModal;
