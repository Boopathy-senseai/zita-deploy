import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import CandiDateResumeTab from '../candidatemodule/CandiDateResumeTab';
import { ALL_APPLICANT_MATCH_TITLE } from '../constValue';
import AboutTab from './AboutTab';
import AllMatchTab from './AllMatchTab';
// import ExperienceTab from './ExperienceTab';
import NotesTab from './NotesTab';
// import QualificationTab from './QualificationTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const ApplicantTabLeftOne = ({ activeState }: typeof defaultProps) => {
  return (
    <Tabs
      activeColor={BLACK}
      borderColor={SECONDARY}
      tabsWithBorder
      active={activeState}
    >
      <Tab title={'About'}>
        <AboutTab />
      </Tab>
     {/* <Tab title={'Experience'}>
        <ExperienceTab />
      </Tab>
      <Tab title={'Qualification'}>
        <QualificationTab />
      </Tab>*/}
      <Tab title={'Resume'}>
        <CandiDateResumeTab />
      </Tab>
      <Tab title={'Notes/Meetings'}>
        <NotesTab isMeeting />
      </Tab>
      <Tab title={'All Matching Job'}>
        <AllMatchTab
          title={ALL_APPLICANT_MATCH_TITLE}
          inviteMessage={'Applicant Invited successfully'}
        />
      </Tab>
    </Tabs>
  );
};
ApplicantTabLeftOne.defaultProps = defaultProps;

export default ApplicantTabLeftOne;
