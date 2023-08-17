import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SvgRoundTick from '../../icons/SvgRoundTick';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './allmatchtab.module.css';
import ApplicantMatch from './ApplicantMatch';
import InviteMatch from './InviteMatch';

type Props = {
  title: string;
  inviteMessage: string; 
  width?:string;
};
const AllMatchTab = ({width, title, inviteMessage }: Props) => {
  const { match, applicant, candidate_details, can_id } = useSelector(
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
        can_id: applicantProfileInitalReducers.can_id,
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
      ):''}
     {match && match.length !== 0 || applicant && applicant.length !== 0 ?
      <Flex
        row
        wrap
        width={width}
        className={styles.allMatchText}
        height={window.innerHeight - 155}
        style={{ overflow: 'scroll',display:'flex',alignContent:'flex-start'}}
      >
        {match &&
          match.map((list, index) => {
            return (
              <InviteMatch
                inviteMessage={inviteMessage}
                list={list}
                match={match}
                candidateId={can_id}
                applicant={applicant}
                key={list.candidate_id_id + index}
                candidate_details={candidate_details}
              />
            );
          }).reverse()}
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
          }).reverse()}
      </Flex>:''}
    </Flex>
  );
};

export default AllMatchTab;
