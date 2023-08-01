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
  const { status_id,stages } = useSelector(
    ({ applicantProfileInitalReducers,applicantStausReducers }: RootState) => {
      return {
        status_id: applicantProfileInitalReducers.status_id,
        stages: applicantStausReducers?.stages,
      };
    },
  );

  return (
    <>
      {stages.length === 0 ? (
        // {console.log(status_id,'fnnmngbfdsfgbn')}
        <Tabs
          activeColor={BLACK}
          borderColor={'#581845'}
          active={activeState}
        >
          <Tab title={'About '} >
            <AboutTab />
          </Tab> 
          {/* <Tab title={'Resume/Cover'}>
            <ResumeCoverTab />
          </Tab> */}
          <Tab title={'Communications'}>
            <NotesTab  nomessagetab ={true}/>
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet isMeeting />
          </Tab>
          {/* <Tab title={'Messages'}>
            <MessageTab />
          </Tab>  */}
          {/* <Tab title={'Questionnaire/Messages'}>
            <Questionnaire issingletab={false} />
          </Tab> */}
          <Tab title={'Matching Analysis'}>
            <MatchingAnalysisTab />
          </Tab>
          <Tab title={'Screening Status'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} issingletab  />
          </Tab> 
        </Tabs>
      ) : (
        <Tabs
          activeColor={BLACK}
          borderColor={'#581845'} 
          active={activeState}
        >
          <Tab title={'About'}>
            <AboutTab />
          </Tab> 
          <Tab title={'Communications'}>
            <NotesTab isMeeting  nomessagetab ={true} />
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet  isMeeting />
          </Tab> 
          {/* <Tab title={'Questionnaire/Messages'}>
            <Questionnaire issingletab={false} />
          </Tab> */}
          <Tab title={'Matching Analysis'}>
            <MatchingAnalysisTab />
          </Tab>
          <Tab title={'Screening Status/Scorecard'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} issingletab={false} />
          </Tab> 
        </Tabs>
      )}
    </>
  );
};
ApplicantTabLeft.defaultProps = defaultProps;

export default ApplicantTabLeft;
