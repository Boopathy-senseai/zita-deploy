import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BLACK, SECONDARY } from '../../uikit/Colors/colors';
import Tab from '../../uikit/Tabs/Tab';
import Tabs from '../../uikit/Tabs/Tabs';
import AllMatchTab from '../applicantprofilemodule/AllMatchTab';
import NotesTab from '../applicantprofilemodule/NotesTab';
import EmailScreen from '../emailintegrationmodule/integrationScreen';
import { ALL_CANDI_MATCH_TITLE } from '../constValue';
import CandidateAboutTab from './CandidateAboutTab';
import CandiDateResumeTab from './CandiDateResumeTab';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  activeState: 0,
};

const CandiDateTabsLeftOne = ({ activeState }: typeof defaultProps) => {
  const { can_id } = useSelector(
    ({ applicantProfileInitalReducers }: RootState) => {
      return {
        can_id: applicantProfileInitalReducers.can_id
      };
    },
  );
  return (
    <Tabs
      activeColor={'#581845'}
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
      <Tab title={'Mailbox'}>
            <EmailScreen isprofileview={true} can_id={can_id}/>
          </Tab>
    </Tabs>
  );
};

CandiDateTabsLeftOne.defaultProps = defaultProps;

export default CandiDateTabsLeftOne;
