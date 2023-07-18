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
  const [tabKeyOne, setKeyOne] = useState<any>(tabTwoInitial);
  const [tabKeyTwo, setKeyTwo] = useState<any>(tabOneInitial);
  const [isInput, setInput] = useState(false);
  const [isReloadCareer, setReloadCareer] = useState(false);
  const [isTest, setTest] = useState(false);
  const [isReloadCompany, setReloadCompany] = useState(false);
  const [isReloadProfile, setReloadProfile] = useState(false);
  const [changeurl, setchangeurl] = useState(false);

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

  useEffect(() => {
    const unblock = history.block(
      isReloadCompany
        ? 'Do you want to leave this site? Changes you made may not be saved.'
        : true,
    );

    return function cleanup() {
      unblock();
    };
  }, [isReloadCompany]);

  useEffect(() => {
    localStorage.setItem('freeCheck', 'true');
    var url = new URL(window.location.href);
    if (url.searchParams.get('scope')) {
      // Google
      const code = url.searchParams.get('code');
      dispatch(googleCallbackMiddleware({ codeUrl: code })).then((res) => {
        window.close();
      });
    } else if (url.searchParams.get('session_state')) {
      // Outlook
      const access_urls = {
        code: url.searchParams.get('code'),
        state: url.searchParams.get('state'),
        session_state: url.searchParams.get('session_state'),
      };
      dispatch(outlookCallbackMiddleware(access_urls))
        .then((res) => {
          console.log(res);
          window.close();
        })
        .catch((err) => {
          console.log('error', err);
        });
    }
  }, []);

  const {
    super_user,
    isLoading,
    is_plan,
  } = useSelector(
    ({
      permissionReducers,
      companyPageReducers,
      buildCareerPageReducers,
    }: RootState) => {
      return {
        Permission: permissionReducers.Permission,
        super_user: permissionReducers.super_user,
        isLoading: permissionReducers.isLoading,
        company_detail: companyPageReducers.company_detail,
        career_page_exists_build: buildCareerPageReducers.career_page_exists,
        isLoadingCareer: buildCareerPageReducers.isLoading,
        is_plan: permissionReducers.is_plan,
      };
    },
  );

  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();

  if (isLoading) {
    return <Loader />;
  }

  return (
    !isLoading && (
      <>
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
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'hidden',
            }}
          >
            {super_user === true && (
              <Tabs
                // id={''}
                activeKey={tabKey}
                onSelect={(keys: any) => {
                  if (is_plan) {
                    setTest(!isTest);
                    sessionStorage.setItem('superUserTab', keys);
                    if (
                      !isReloadCareer &&
                      !isReloadCompany &&
                      !isReloadProfile
                    ) {
                      setKey(keys);
                    }
                  }
                }}
              >
                <Tab title={'Event Schedular'} eventKey={'1'}>
                  {tabKey === '1' && <EventScheduler/>}
                </Tab>
                <Tab title={'Scheduled Events'} eventKey={'2'}>
                  {tabKey === '2' && <ScheduledEventsPage />}
                </Tab>
              </Tabs>
            )}
          </Flex>
        </Flex>
      </>
    )
  );
};

export default MeetingSchedulerScreen;
