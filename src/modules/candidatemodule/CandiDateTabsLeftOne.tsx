import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import AllMatchTab from '../applicantprofilemodule/AllMatchTab';
import NotesTab from '../applicantprofilemodule/NotesTab';
import { ALL_CANDI_MATCH_TITLE } from '../constValue';
import CandidateAboutTab from './CandidateAboutTab';
import CandiDateResumeTab from './CandiDateResumeTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const CandiDateTabsLeftOne = ({ activeState }: typeof defaultProps) => {
  return (
    <Tabs
      activeColor={BLACK}
      borderColor={'#581845'}
      active={activeState}
    >
       {/* {alert('CandiDateTabsLeft1 ')} */}
      <Tab title="About">
        <CandidateAboutTab />
      </Tab>
      {/* <Tab title={'Resume'}>
        <CandiDateResumeTab />
      </Tab> */}
      <Tab title={'Communications'}>
        <NotesTab />
      </Tab>
      <Tab title={'All Matching Jobs'} >
        <AllMatchTab
        width={"50%"}
          title={ALL_CANDI_MATCH_TITLE}
          inviteMessage={'Candidate Invited successfully'}
        />
      </Tab>
    </Tabs>
  );
};

CandiDateTabsLeftOne.defaultProps = defaultProps;

export default CandiDateTabsLeftOne;
