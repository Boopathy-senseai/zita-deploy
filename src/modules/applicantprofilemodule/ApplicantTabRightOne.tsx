import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import MatchingAnalysisTab from './MatchingAnalysisTab';
import ScreeningStatusTab from './ScreeningStatusTab';

const ApplicantTabRightOne = () => {
  return (
    <Tabs activeColor={BLACK} borderColor={SECONDARY} tabsWithBorder>
      <Tab title={'Matching Analysis'}>
        <MatchingAnalysisTab />
      </Tab>
      <Tab title={'Invitation Status'}>
        <ScreeningStatusTab title={'Invitation Status of the Candidate'} />
      </Tab>
    </Tabs>
  );
};
export default ApplicantTabRightOne;
