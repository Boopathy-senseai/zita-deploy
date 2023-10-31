import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import CandiDateResumeTab from '../candidatemodule/CandiDateResumeTab';
import {
  ALL_APPLICANT_MATCH_TITLE,
  SCREEN_APPLICANT_STATUS_TITLE,
} from '../constValue';
import EmailScreen from '../emailintegrationmodule/integrationScreen';
import AboutTab from './Abouttabs';
import AllMatchTab from './AllMatchTab';
// import ExperienceTab from './ExperienceTab';
import NotesTab from './NotesTab';
import Notesmeet from './Notesmeeting';
import InterviewScorecardTab from './InterviewScorecardTab';
import MatchingAnalysisTab from './MatchingAnalysisTab';
import Questionnaire from './Questionnaire';
import ScreeningStatusTab from './ScreeningStatusTab';
// import QualificationTab from './QualificationTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};
type Props = {
  updatr_overall?: (val: any) => void;
};

const ApplicantTabLeftOne: React.FC<typeof defaultProps & Props> = ({
  activeState = defaultProps.activeState, // Use the default value from defaultProps
  updatr_overall,
}) => {
  const { status_id, stages, can_id, jd_id } = useSelector(
    ({ applicantProfileInitalReducers, applicantStausReducers }: RootState) => {
      return {
        status_id: applicantProfileInitalReducers.status_id,
        stages: applicantStausReducers?.stages,
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers.jd_id,
      };
    },
  );
  return (
    <>
      {' '}
      {stages.length === 0 ? (
        <Tabs
          activeColor={'#581845'}
          borderColor={'#581845'}
          active={activeState}
        >
          <Tab title={'About'}>
            <AboutTab />
          </Tab>
          <Tab title={'Communications'}>
            <NotesTab nomessagetab={false} />
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet isMeeting />
          </Tab>
          <Tab title={'All Matching Jobs'}>
            {/* <MatchingAnalysisTab /> */}
            <AllMatchTab title={''} inviteMessage={''} width={'50%'} />
          </Tab>
          <Tab title={'Mailbox'}>
            <EmailScreen isprofileview={true} can_id={can_id} />
          </Tab>
          {/* <Tab title={'Screening Status'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} issingletab/>
          </Tab>  */}
        </Tabs>
      ) : (
        <Tabs
          activeColor={'#581845'}
          borderColor={'#581845'}
          active={activeState}
        >
          <Tab title={'About'}>
            <AboutTab />
          </Tab>
          {/* <Tab title={'Resume'}>
            <CandiDateResumeTab />
          </Tab> */}
          <Tab title={'Communications'}>
            <NotesTab nomessagetab={false} />
          </Tab>
          <Tab title={'Meetings'}>
            <Notesmeet isMeeting />
          </Tab>
          {/* <Tab title={'Questionnaire'}>
            <Questionnaire  issingletab />
          </Tab> */}
          <Tab title={'Matching Analysis'}>
            <MatchingAnalysisTab updatr_overall={updatr_overall} />
          </Tab>
          <Tab title={'Mailbox'}>
            <EmailScreen isprofileview={true} can_id={can_id} />
          </Tab>
          <Tab title={'Screening Status/Scorecard'}>
            <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} issingletab={false} />
          </Tab>
        </Tabs>
      )}
    </>
  );
};
ApplicantTabLeftOne.defaultProps = defaultProps;

export default ApplicantTabLeftOne;
