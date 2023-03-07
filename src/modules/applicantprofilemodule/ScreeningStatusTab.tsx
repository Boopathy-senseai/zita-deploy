import { useSelector } from 'react-redux';
import SvgRoundTick from '../../icons/SvgRoundTick';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import styles from './screeningstatustab.module.css';

type Props = {
  title: string;
};
const ScreeningStatusTab = ({ title }: Props) => {
  const { applied, interviewed, invite, shortlisted, selected, rejected } =
    useSelector(({ applicantStausReducers }: RootState) => {
      return {
        interviewed: applicantStausReducers.interviewed,
        applied: applicantStausReducers.applied,
        invite: applicantStausReducers.invite,
        rejected: applicantStausReducers.rejected,
        selected: applicantStausReducers.selected,
        shortlisted: applicantStausReducers.shortlisted,
      };
    });

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      {rejected &&
      rejected.length === 0 &&
      shortlisted &&
      shortlisted.length === 0 &&
      selected &&
      selected.length === 0 &&
      interviewed &&
      interviewed.length === 0 &&
      applied &&
      applied.length === 0 &&
      invite &&
      invite.length === 0 ? (
        <Flex flex={1} center middle>
          <Text color="gray">Not Invited Yet</Text>
        </Flex>
      ) : (
        <Text bold color="theme" className={styles.screenText}>
          {title}
        </Text>
      )}

      {rejected && rejected.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            <div className={styles.vrLine} />
          </Flex>
          <Text className={styles.statusStyle}>
            Rejected on{' '}
            {getDateString(rejected && rejected[0].created_on, 'll')}
          </Text>
        </Flex>
      )}

      {selected && selected.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            <div className={styles.vrLine} />
          </Flex>
          <Text className={styles.statusStyle}>
            Offered on {getDateString(selected && selected[0].created_on, 'll')}
          </Text>
        </Flex>
      )}

      {interviewed && interviewed.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            <div className={styles.vrLine} />
          </Flex>
          <Text className={styles.statusStyle}>
            Interviewed on{' '}
            {getDateString(interviewed && interviewed[0].created_on, 'll')}
          </Text>
        </Flex>
      )}

      {shortlisted && shortlisted.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            <div className={styles.vrLine} />
          </Flex>
          <Text className={styles.statusStyle}>
            Shortlisted on{' '}
            {getDateString(shortlisted && shortlisted[0].created_on, 'll')}
          </Text>
        </Flex>
      )}

      {applied && applied.length !== 0 && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            {invite && invite.length !== 0 && <div className={styles.vrLine} />}
          </Flex>
          <Text className={styles.statusStyle}>
            Applied on {getDateString(applied && applied[0].created_on, 'll')}
          </Text>
        </Flex>
      )}

      {invite && invite.length !== 0 && invite[0].is_interested === false && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            {invite && invite.length !== 0 && <div className={styles.vrLine} />}
          </Flex>
          <Text className={styles.statusStyle}>
            {`Candidate responded as "Not Interested"`} on{' '}
            {getDateString(invite && invite[0].responded_date, 'll')}
          </Text>
        </Flex>
      )}
      {invite && invite.length !== 0 && invite[0].is_interested === true && (
        <Flex row center className={styles.statusListStyle}>
          <Flex className={styles.svgFlex}>
            <SvgRoundTick height={30} width={30} />
            {invite && invite.length !== 0 && <div className={styles.vrLine} />}
          </Flex>
          <Text className={styles.statusStyle}>
            {`Candidate responded as "Interested"`} on{' '}
            {getDateString(invite && invite[0].responded_date, 'll')}
          </Text>
        </Flex>
      )}

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

export default ScreeningStatusTab;
