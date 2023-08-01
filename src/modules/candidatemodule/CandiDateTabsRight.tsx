import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import MatchingAnalysisTab from '../applicantprofilemodule/MatchingAnalysisTab';
import ScreeningStatusTab from '../applicantprofilemodule/ScreeningStatusTab';
import { SCREEN_CANDIDATE_STATUS_TITLE } from '../constValue';

const CandiDateTabsRight = () => {
  return (
    <Tabs activeColor={BLACK} borderColor={'#581845'} >
      <Tab title={'Matching Analysis'}>
        <MatchingAnalysisTab />
      </Tab>
      <Tab title={'Invitation Status'}>
        <ScreeningStatusTab title={SCREEN_CANDIDATE_STATUS_TITLE} issingletab={false} />
      </Tab>
    </Tabs>
  );
};

export default CandiDateTabsRight;
