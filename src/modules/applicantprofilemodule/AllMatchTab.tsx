import { useSelector } from 'react-redux';
import { RootState } from '../../store';
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
  const profileMatchCount = match.filter(item => item.profile_match === 0).length;
  return (
    <Flex   className={styles.overAll}>
      <Text bold size={14}>
        All Matching jobs
      </Text>
      {match && match.length === 0 && applicant && applicant.length === 0 && (
        <Flex center middle height={window.innerHeight - 125} style={{display:"flex", justifyContent:"center", alignItems:"center", color:"#666666"}}>
          This candidate is not a match for any jobs
        </Flex>
      )}
       {match.length === profileMatchCount &&
       <Flex center middle  height={window.innerHeight - 125} style={{color:'#979797',fontSize:13}} >
         This candidate is not a match for any jobs
        </Flex>} 
      {/* {match && match.length ===  && (
        <Flex center middle  height={window.innerHeight - 125} >
          This candidate is not a match for any jobs
        </Flex>
      )} */}
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
                match_percentage={list.profile_match}
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
