import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import { ALL_APPLICANT_MATCH_TITLE } from '../constValue';
import { SCREEN_APPLICANT_STATUS_TITLE } from '../constValue';
import ApplicantTabRight from '../applicantprofilemodule/ApplicantTabRight';

import AboutTab from './AboutTab';
import AllMatchTab from './AllMatchTab';
// import ExperienceTab from './ExperienceTab';
import MessageTab from './MessageTab';
import NotesTab from './NotesTab';
import Notesmeet from './Notesmeeting';
// import QualificationTab from './QualificationTab';
import ResumeCoverTab from './ResumeCoverTab';
import InterviewScorecardTab from './InterviewScorecardTab';
import MatchingAnalysisTab from './MatchingAnalysisTab';
import Questionnaire from './Questionnaire';
import ScreeningStatusTab from './ScreeningStatusTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const ApplicantTabLeft = ({ activeState }: typeof defaultProps) => {
  const { status_id } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        status_id: applicantProfileInitalReducers.status_id,
      };
    },
  );

  return (
    <>
      {status_id.length === 0 ? (
        // {console.log(status_id,'fnnmngbfdsfgbn')}
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
          <Tab title={'Resume/Cover'}>
            <ResumeCoverTab />
          </Tab>
          <Tab title={'Notes'}>
            <NotesTab />
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet isMeeting />
          </Tab>
          <Tab title={'Messages'}>
            <MessageTab />
          </Tab>
          <Tab title={'All Matching Jobs'}>
            <AllMatchTab
              title={ALL_APPLICANT_MATCH_TITLE}
              inviteMessage={'Applicant Invited successfully'}
            />
          </Tab>

          {/* {status_id.length === 0 &&
      <Tab title={'Questionnaire'}> 
        <Questionnaire />
      </Tab>} */}
          <Tab title={'Matching Analysis'}>
            <MatchingAnalysisTab />
          </Tab>
          <Tab title={'Screening Status'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} />
          </Tab>
          {/* {status_id.length === 0  &&
      <Tab title={'Scorecard'}>
        <InterviewScorecardTab />
      </Tab> } */}
        </Tabs>
      ) : (
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
          {/* <Tab title={'Resume/Cover'}>
            <ResumeCoverTab />
          </Tab> */}
          <Tab title={'Notes'}>
            <NotesTab isMeeting  />
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet  isMeeting />
          </Tab>
          <Tab title={'Messages'}>
            <MessageTab />
          </Tab>
          <Tab title={'All Matching Jobs'}>
            <AllMatchTab
              title={ALL_APPLICANT_MATCH_TITLE}
              inviteMessage={'Applicant Invited successfully'}
            />
          </Tab>

          <Tab title={'Questionnaire'}>
            <Questionnaire />
          </Tab>
          <Tab title={'Matching Analysis'}>
            <MatchingAnalysisTab />
          </Tab>
          <Tab title={'Screening Status'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} />
          </Tab>

          <Tab title={'Scorecard'}>
            <InterviewScorecardTab />
          </Tab>
        </Tabs>
      )}
    </>
  );
};
ApplicantTabLeft.defaultProps = defaultProps;

export default ApplicantTabLeft;
