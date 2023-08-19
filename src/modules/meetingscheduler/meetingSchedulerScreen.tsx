import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import Text from '../../uikit/Text/Text';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import {
  outlookCallbackMiddleware,
  googleCallbackMiddleware,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import SvgScheduler from '../../icons/SvgScheduler';
import styles from './meetingSchedulerScreen.module.css';
import ScheduledEventsPage from './scheduledevents/scheduledEvents';
import EventScheduler from './events/EventScheduler';
import CalendarEventsPage from './calendarEvents/calendarEvents';

type ParamsType = {
  itemId: string;
  value: string;
};
type props = {
  value: () => void;
};
const MeetingSchedulerScreen = ({ value }: props) => {
  const dispatch: AppDispatch = useDispatch();
  const { itemId } = useParams<ParamsType>();
  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const tab: any = query.get('tab');

  const tabInitial: any =
    sessionStorage.getItem('superUserTab') === null
      ? '0'
      : sessionStorage.getItem('superUserTab');
  const tabOneInitial: any =
    sessionStorage.getItem('superUserFalseTab') === null
      ? '0'
      : sessionStorage.getItem('superUserFalseTab');
  const tabTwoInitial: any =
    sessionStorage.getItem('superUserTabTwo') === null
      ? '0'
      : sessionStorage.getItem('superUserTabTwo');

  const [tabKey, setKey] = useState(tabInitial);
  const [isTest, setTest] = useState(false);

  useEffect(() => {
    if (!isEmpty(tab)) {
      sessionStorage.setItem('superUserTab', tab);
      sessionStorage.setItem('superUserFalseTab', tab);
      sessionStorage.setItem('superUserTabTwo', tab);
      setKey(tab);
      if (query.has('tab')) {
        query.delete('tab');
        history.replace({
          search: query.toString(),
        });
      }
    }
  }, [tab]);
  

  const { isLoading } = useSelector(({ permissionReducers }: RootState) => {
    return {
      Permission: permissionReducers.Permission,
      isLoading: permissionReducers.isLoading,
    };
  });


  if (isLoading) {
    return <Loader />;
  }

  return (
    !isLoading && (
      <Flex column height={'100%'} style={{display:"flex", paddingBottom: 10}}>
        <Flex row center className={styles.overallhead}>
          <Flex row center>
            <Flex center marginLeft={20}>
              <SvgScheduler />
            </Flex>
            <Flex>
              <Text
                bold
                size={16}
                style={{ marginLeft: 8, color: '#581845' }}
                className={styles.postingcl}
              >
                Meeting Scheduler
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <div className={styles.triangle}></div>
          </Flex>
        </Flex>
        <Flex columnFlex className={styles.overAll}>
          <Flex
            style={{
              height:"100%",
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            <Tabs
              // id={''}
              activeKey={tabKey}
              onSelect={(keys: any) => {
                setTest(!isTest);
                sessionStorage.setItem('superUserTab', keys);
                setKey(keys);
              }}
            >
              <Tab title={'Events Schedular'} eventKey={'0'}>
                {tabKey === '0' && <EventScheduler />}
              </Tab>
              <Tab title={'Slotter Events'} eventKey={'1'}>
                {tabKey === '1' && <ScheduledEventsPage />}
              </Tab>
              <Tab title={'Calendar Events'} eventKey={'2'}>
                {tabKey === '2' && <CalendarEventsPage />}
              </Tab>
            </Tabs>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default MeetingSchedulerScreen;
