import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import AllMatchTab from '../applicantprofilemodule/AllMatchTab';
import InvitationStatusTab from '../applicantprofilemodule/InvitationStatusTab';
import MatchingAnalysisTab from '../applicantprofilemodule/MatchingAnalysisTab';
import NotesTab from '../applicantprofilemodule/NotesTab';
import { ALL_CANDI_MATCH_TITLE, SCREEN_CANDIDATE_STATUS_TITLE } from '../constValue';
import EmailScreen from '../emailintegrationmodule/integrationScreen';
import ScreeningStatusTab from '../applicantprofilemodule/ScreeningStatusTab';
import CandidateAboutTab from './CandidateAboutTab';
import CandidateMessageTab from './CandidateMessageTab';
import CandiDateResumeTab from './CandiDateResumeTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};
type Props = {
  updatr_overall?: (val: any) => void;
};

const CandiDateTabsLeft: React.FC<typeof defaultProps & Props> = ({
  activeState = defaultProps.activeState, // Use the default value from defaultProps
  updatr_overall,
}) => {
  const { can_id } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        can_id: applicantProfileInitalReducers.can_id
      };
    },
  );
  return (
    <Tabs
      activeColor={'#581845'}
      borderColor={'#581845'}
      active={activeState}
    >
      <Tab title="About">
        <CandidateAboutTab />
      </Tab>
      <Tab title={'Communications'} >
        <NotesTab candidatemessage={true} />
      </Tab>
      {/* <Tab title={'Resume'}>
        <CandiDateResumeTab />
      </Tab> */}
      {/* <Tab title={'Messages'}>
        <CandidateMessageTab />
      </Tab> */}
      {/* <Tab title={'All Matching Jobs'}>
        <AllMatchTab
          title={ALL_CANDI_MATCH_TITLE}
          inviteMessage={'Candidate invited successfully'}
        />
      </Tab> */}
      <Tab title={'Matching Analysis'}>
        <MatchingAnalysisTab updatr_overall={updatr_overall} />
      </Tab>
      <Tab title={'Mailbox'}>
        <EmailScreen isprofileview={true} can_id={can_id} />
      </Tab>
      <Tab title={'Invitation Status/All Matching Jobs'}>
        <ScreeningStatusTab title={'Invitation Status'} issingletab />
      </Tab>
    </Tabs>
  );
};

CandiDateTabsLeft.defaultProps = defaultProps;

export default CandiDateTabsLeft;
