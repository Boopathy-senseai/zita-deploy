import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import AllMatchTab from '../applicantprofilemodule/AllMatchTab';
import MatchingAnalysisTab from '../applicantprofilemodule/MatchingAnalysisTab';
import NotesTab from '../applicantprofilemodule/NotesTab';
import ScreeningStatusTab from '../applicantprofilemodule/ScreeningStatusTab';
import { ALL_CANDI_MATCH_TITLE, SCREEN_CANDIDATE_STATUS_TITLE } from '../constValue';
import CandidateAboutTab from './CandidateAboutTab';
import CandidateMessageTab from './CandidateMessageTab';
import CandiDateResumeTab from './CandiDateResumeTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const CandiDateTabsLeft = ({ activeState }: typeof defaultProps) => {
  return (
    <Tabs
      activeColor={'#581845'}
      borderColor={'#581845'}
      active={activeState}
    > 
      <Tab title="About">
        <CandidateAboutTab />
      </Tab>
      {/* <Tab title={'Resume'}>
        <CandiDateResumeTab />
      </Tab> */}
      <Tab title={'Communications'} >
        <NotesTab candidatemessage={true} />
      </Tab>
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
        <MatchingAnalysisTab />
      </Tab>
      <Tab title={'Invitation Status'}>
        <ScreeningStatusTab title={SCREEN_CANDIDATE_STATUS_TITLE} issingletab={true} />
      </Tab>
    </Tabs>
  );
};

CandiDateTabsLeft.defaultProps = defaultProps;

export default CandiDateTabsLeft;
