import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import { SCREEN_APPLICANT_STATUS_TITLE } from '../constValue';
import InterviewScorecardTab from './InterviewScorecardTab';
import MatchingAnalysisTab from './MatchingAnalysisTab';
import Questionnaire from './Questionnaire';
import ScreeningStatusTab from './ScreeningStatusTab';

const ApplicantTabRight = () => {
  return (
    <Tabs activeColor={BLACK} borderColor={SECONDARY} tabsWithBorder>
      <Tab title={'Questionnaire'}>
        <Questionnaire issingletab={false} />
      </Tab>
      <Tab title={'Matching Analysis'}>
        <MatchingAnalysisTab />
      </Tab>
      <Tab title={'Screening Status'}>
        <ScreeningStatusTab title={SCREEN_APPLICANT_STATUS_TITLE} issingletab={false} />
      </Tab>
      <Tab title={'Scorecard'}>
        <InterviewScorecardTab />
      </Tab>
    </Tabs>
  );
};
export default ApplicantTabRight;
