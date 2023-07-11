import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import AllMatchTab from '../applicantprofilemodule/AllMatchTab';
import NotesTab from '../applicantprofilemodule/NotesTab';
import { ALL_CANDI_MATCH_TITLE } from '../constValue';
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
      activeColor={BLACK}
      borderColor={SECONDARY}
      tabsWithBorder
      active={activeState}
    >
      <Tab title="About">
        <CandidateAboutTab />
      </Tab>
      {/* <Tab title={'Resume'}>
        <CandiDateResumeTab />
      </Tab> */}
      <Tab title={'Notes'}>
        <NotesTab />
      </Tab>
      <Tab title={'Messages'}>
        <CandidateMessageTab />
      </Tab>
      <Tab title={'All Matching Jobs'}>
        <AllMatchTab
          title={ALL_CANDI_MATCH_TITLE}
          inviteMessage={'Candidate invited successfully'}
        />
      </Tab>
    </Tabs>
  );
};

CandiDateTabsLeft.defaultProps = defaultProps;

export default CandiDateTabsLeft;
