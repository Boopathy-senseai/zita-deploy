import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Drawer from '../../uikit/Drawer/Drawer';
import SvgClose from '../../icons/SvgClose';
import SvgNewTab from '../../icons/SvgNewTab';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import ZitaMatchCandidateProfileView from './ZitaMatchCandidateProfileView';
import styles from './candidatedrawer.module.css';

type Props = {
  open: boolean;
  cancel: () => void;
  jobId: string | boolean;
  candidateId: any;
  activeState: number;
};

const ZitaMatchCandidateDrawer = ({
  cancel,
  open,
  jobId,
  candidateId,
  activeState,
}: Props) => {
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
            <SvgClose fill={GARY_3} height={16} width={16} />
          </div>
          <LinkWrapper
            replace
            target={'_blank'}
            to={`/candidate_profile_view/${jobId}/${candidateId}`}
          >
            <Flex row center className={'pointer'}>
              <Text color="link" className={styles.openStyle}>
                Open profile in a new window
              </Text>
              <SvgNewTab fill={LINK} width={20} height={20} />
            </Flex>
          </LinkWrapper>
        </Flex>
        <div
          style={{
            // height: window.innerHeight - 42,
            // overflowY: "scroll",
            paddingBottom: 16,
          }}
        >
          <ZitaMatchCandidateProfileView
            jobId={jobId}
            candidateId={candidateId}
            activeState={activeState}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ZitaMatchCandidateDrawer;
