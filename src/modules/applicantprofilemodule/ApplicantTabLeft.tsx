import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import { ALL_APPLICANT_MATCH_TITLE } from '../constValue';
import AboutTab from './AboutTab';
import AllMatchTab from './AllMatchTab';
import ExperienceTab from './ExperienceTab';
import MessageTab from './MessageTab';
import NotesTab from './NotesTab';
import QualificationTab from './QualificationTab';
import ResumeCoverTab from './ResumeCoverTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const ApplicantTabLeft = ({ activeState }: typeof defaultProps) => {
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
      <Tab title={'Experience'}>
        <ExperienceTab />
      </Tab>
      <Tab title={'Qualification'}>
        <QualificationTab />
      </Tab>
      <Tab title={'Resume/Cover'}>
        <ResumeCoverTab />
      </Tab>
      <Tab title={'Notes/Meetings'}>
        <NotesTab isMeeting />
      </Tab>
      <Tab title={'Messages'}>
        <MessageTab />
      </Tab>
      <Tab title={'All Matching Jobs'}>
        <AllMatchTab title={ALL_APPLICANT_MATCH_TITLE} />
      </Tab>
    </Tabs>
  );
};
ApplicantTabLeft.defaultProps = defaultProps;

export default ApplicantTabLeft;
