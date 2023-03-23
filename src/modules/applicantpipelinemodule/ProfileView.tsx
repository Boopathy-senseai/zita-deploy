import SvgClose from '../../icons/SvgClose';
import SvgNewTab from '../../icons/SvgNewTab';
import { GARY_3, LINK } from '../../uikit/Colors/colors';
import Drawer from '../../uikit/Drawer/Drawer';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import ApplicantProfileModal from './ApplicantProfileModal';
import styles from './profileview.module.css';

type Props = {
  open: boolean;
  cancel: () => void;
  jobId: string;
  candidateId: string;
  inviteIconNone?: boolean;
  activeState?: number;
};

const ProfileView = ({
  cancel,
  open,
  jobId,
  candidateId,
  inviteIconNone,
  activeState,
}: Props) => {
  return (
    <Drawer open={open}>
      <div className={styles.overAll}>
        <Flex row center between flex={1} className={styles.border}>
          <div
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
            className={'pointer'}
            onClick={cancel}
          >
            <SvgClose fill={GARY_3} height={16} width={16} />
          </div>
          <LinkWrapper
            target={'_blank'}
            to={`/applicant_profile_view/${jobId}/${candidateId}`}
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
            paddingBottom: 16,
          }}
        >
          <ApplicantProfileModal
            jobId={jobId}
            candidateId={candidateId}
            inviteIconNone={inviteIconNone}
            activeState={activeState}
          />
        </div>
      </div>
    </Drawer>
  );
};
export default ProfileView;
