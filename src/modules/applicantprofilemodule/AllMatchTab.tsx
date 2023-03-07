import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './allmatchtab.module.css';
import ApplicantMatch from './ApplicantMatch';
import InviteMatch from './InviteMatch';

type Props = {
  title: string;
};
const AllMatchTab = ({ title }: Props) => {
  const { match, applicant, invite ,candidate_details} = useSelector(
    ({
      applicantAllMatchReducers,
      applicantStausReducers,
      applicantProfileInitalReducers,
    }: RootState) => {
      return {
        match: applicantAllMatchReducers.match,
        applicant: applicantAllMatchReducers.applicant,
        invite: applicantStausReducers.invite,
        candidate_details: applicantProfileInitalReducers.candidate_details,
      };
    },
  );

  return (
    <Flex
      columnFlex
      height={window.innerHeight - 230}
      className={styles.overAll}
    >
      {match && match.length === 0 && applicant && applicant.length === 0 ? (
        <Flex flex={1} center middle>
          <Text color="gray">This candidate is not a match for any jobs</Text>
        </Flex>
      ) : (
        <Text color="theme" bold>
          {title}
        </Text>
      )}
      <Flex row wrap className={styles.allMatchText}>
        {match &&
          match.map((list, index) => {
            return (
              <InviteMatch
                list={list}
                match={match}
                invite={invite}
                applicant={applicant}
                key={list.candidate_id_id + index}
                candidate_details={candidate_details}
              />
            );
          })}
        {applicant &&
          applicant.map((list, index) => {
            return (
              <ApplicantMatch
                list={list}
                match={match}
                applicant={applicant}
                key={list.candidate_id_id + index}
              />
            );
          })}
      </Flex>
    </Flex>
  );
};

export default AllMatchTab;
