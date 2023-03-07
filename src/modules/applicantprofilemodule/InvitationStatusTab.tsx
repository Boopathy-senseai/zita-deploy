import { useSelector } from 'react-redux';
import SvgRoundTick from '../../icons/SvgRoundTick';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './screeningstatustab.module.css';

const InvitationStatusTab = () => {
  const { invite } = useSelector(({ applicantStausReducers }: RootState) => {
    return {
      invite: applicantStausReducers.invite,
    };
  });

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      <Text bold color="theme" className={styles.screenText}>
        Screening Status of the Applicant
      </Text>

      {invite && invite.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
          </Flex>
          <Text className={styles.statusStyle}>
            Invited on{' '}
            {getDateString(
              invite &&
                invite.length &&
                new Date(invite[invite.length - 1].created_at),
              'll',
            )}
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default InvitationStatusTab;
