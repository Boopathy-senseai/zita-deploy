import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Activity from '../../pages/activity/Activity';
import ManageUsers from '../../pages/home/ManageUsers';
import { RootState, AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import Text from '../../uikit/Text/Text';
import SvgInfo from '../../icons/SvgInfo';
import { WARNING } from '../../uikit/Colors/colors';
import { LEAVE_THIS_SITE } from '../constValue';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import {
  outlookCallbackMiddleware,
  googleCallbackMiddleware,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import CompanyPage from './companypage';
import UserProfile from './userprofilemodule/userProfile';
import styles from './accountsettingsscreen.module.css';
import BuildYourCareerPageScreen from './buildyourcareerpage/BuildYourCareerPageScreen';
import EmailNotification from './emailmodule/EmailNotifications';
import IntegrationScreen from './integrationmodule/IntegrationScreen';
import ManageSubscriptionScreen from './managesubscription/ManageSubscriptionScreen';
import TemplatesPage from './templatesmodule/templatesPage';
// import { dispatch } from 'react-hot-toast/dist/core/store';

const height = window.innerHeight - 212;

type ParamsType = {
  itemId: string;
};

const AccountSettingsScreen = () => {
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
    /**
     *
     * After Granting Calendar Access, page redirects to this URL.
     * Google Calendar redirects "scope,code" params
     * Outlook Calendar redirects with "session_state,code,state" params
     *
     */

    localStorage.setItem('freeCheck', 'true');
    console.log(window.location.href);
    var url = new URL(window.location.href);
    if (url.searchParams.get('scope')) {
      // Google
      const code = url.searchParams.get('code');
      dispatch(googleCallbackMiddleware({ codeUrl: code })).then((res) => {
        console.log(res);
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
    Permission,
    super_user,
    company_detail,
    isLoading,
    career_page_exists_build,
    isLoadingCareer,
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

  const { onDirty, onPristine } = useUnsavedChangesWarning();

  useEffect(() => {
    if (isReloadCareer && window.confirm(LEAVE_THIS_SITE)) {
      setReloadCareer(false);
      setKey(sessionStorage.getItem('superUserTab'));
      setKeyOne(sessionStorage.getItem('superUserFalseTab'));
    } else {
      // sessionStorage.setItem('superUserTab', tabKey);
      // sessionStorage.setItem('superUserFalseTab', tabKeyOne);
    }
  }, [tabKey, isTest, tabKeyOne]);
  // console.log('sessionStorage.getItem',sessionStorage.getItem('superUserTab'));

  useEffect(() => {
    if (isReloadCompany && window.confirm(LEAVE_THIS_SITE)) {
      setReloadCompany(false);
      setKey(sessionStorage.getItem('superUserTab'));
      setKeyOne(sessionStorage.getItem('superUserFalseTab'));
    } else {
      // sessionStorage.setItem('superUserTab', tabKey);
      // sessionStorage.setItem('superUserFalseTab', tabKeyOne);
    }
  }, [tabKey, isTest, tabKeyOne]);

  useEffect(() => {
    if (isReloadProfile && window.confirm(LEAVE_THIS_SITE)) {
      setReloadProfile(false);
      setKey(sessionStorage.getItem('superUserTab'));
      setKeyOne(sessionStorage.getItem('superUserFalseTab'));
    } else {
      // sessionStorage.setItem('superUserTab', tabKey);
      // sessionStorage.setItem('superUserFalseTab', tabKeyOne);
    }
  }, [tabKey, isTest, tabKeyOne]);

  useEffect(() => {
    if (isReloadCareer) {
      onDirty();
    } else if (!isReloadCareer) {
      onPristine();
    }
  }, [isReloadCareer]);
  useEffect(() => {
    if (isReloadProfile) {
      onDirty();
    } else if (!isReloadProfile) {
      onPristine();
    }
  }, [isReloadProfile]);
  useEffect(() => {
    if (isReloadCompany) {
      onDirty();
    } else if (!isReloadCompany) {
      onPristine();
    }
  }, [isReloadCompany]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    !isLoading && (
      <Flex columnFlex className={styles.overAll}>
        <Flex row center>
          <Text size={20} bold className={styles.title}>
            Account Settings
          </Text>

          {tabKey === '0' &&
            company_detail &&
            company_detail.no_of_emp === null && (
              <Flex row center className={styles.warningFlex}>
                <SvgInfo height={16} width={16} fill={WARNING} />
                <Text
                  size={12}
                  bold
                  color="warning"
                  className={styles.warningText}
                >
                  Please complete your company profile and careers page to post
                  jobs.
                </Text>
              </Flex>
            )}

          {tabKey === '1' && career_page_exists_build === false && (
            <Flex row center className={styles.warningFlex}>
              <SvgInfo height={16} width={16} fill={WARNING} />
              <Text
                size={12}
                bold
                color="warning"
                className={styles.warningText}
              >
                Please complete your company profile and careers page to post
                jobs.
              </Text>
            </Flex>
          )}

          {isInput &&
            isLoadingCareer === false &&
            tabKey === '1' &&
            career_page_exists_build === true && (
              <Flex row center className={styles.warningFlex}>
                <SvgInfo height={16} width={16} fill={WARNING} />
                <Text
                  size={12}
                  bold
                  color="warning"
                  className={styles.warningText}
                >
                  Changing your careers page URL will change the URL for all
                  jobs in your careers page. Note to change the jobs URL in your
                  company’s careers page if connected.
                </Text>
              </Flex>
            )}
        </Flex>

        {super_user === true && (
          <Tabs
            id={!is_plan ? 'account__settings' : 'setting'}
            activeKey={tabKey}
            onSelect={(keys: any) => {
              if (is_plan) {
                setTest(!isTest);
                sessionStorage.setItem('superUserTab', keys);
                if (!isReloadCareer && !isReloadCompany && !isReloadProfile) {
                  setKey(keys);
                }
              }
            }}
          >
            <Tab title={'Company Profile'} eventKey={'0'}>
              <div
                style={{
                  height,
                  overflowY: 'scroll',
                }}
              >
                {tabKey === '0' && (
                  <CompanyPage setKey={setKey} setReload={setReloadCompany} />
                )}
              </div>
            </Tab>
            <Tab title={'Build Your Careers Page'} eventKey={'1'}>
              <div
                style={{
                  height: window.innerHeight - 192,
                  overflowY: 'scroll',
                }}
              >
                {tabKey === '1' && (
                  <BuildYourCareerPageScreen
                    isInput={isInput}
                    setInput={setInput}
                    setReload={setReloadCareer}
                  />
                )}
              </div>
            </Tab>
            <Tab title={'Manage Subscription'} eventKey={'2'}>
              <div
                style={{
                  height: window.innerHeight - 192,
                  overflowY: 'scroll',
                  padding: '1px',
                }}
              >
                {tabKey === '2' && <ManageSubscriptionScreen setTab={setKey} />}
              </div>
            </Tab>
            <Tab title={'Manage Users'} eventKey={'3'}>
              <div
                className={
                  itemId === 'settings' ? styles.borderStyle : styles.overFlow
                }
                style={{
                  height:
                    itemId === 'settings' ? height : window.innerHeight - 192,
                }}
              >
                {tabKey === '3' && itemId === 'settings' && (
                  <ManageUsers setKey={setKey} />
                )}
                {tabKey === '3' && itemId !== 'settings' && <Activity />}
              </div>
            </Tab>
            <Tab title={'Integrations'} eventKey={'4'}>
              {tabKey === '4' && <IntegrationScreen />}
            </Tab>
            <Tab title={'Templates'} eventKey={'7'}>
              {tabKey === '7' && <TemplatesPage/>}
            </Tab>
            <Tab title={'Email Notifications'} eventKey={'5'}>
              <div
                style={{
                  height: window.innerHeight - 192,
                  overflowY: 'scroll',
                }}
              >
                <EmailNotification />
              </div>
            </Tab>
            <Tab title={'User Profile'} eventKey={'6'}>
              <div
                style={{
                  height: window.innerHeight - 192,
                  overflowY: 'scroll',
                }}
              >
                {tabKey === '6' && (
                  <UserProfile setReloadProfile={setReloadProfile} />
                )}
              </div>
            </Tab>
          </Tabs>
        )}

        {Permission.includes('manage_account_settings') &&
          super_user === false && (
            <Tabs
              id={!is_plan ? 'account__settings' : 'setting'}
              activeKey={tabKeyOne}
              onSelect={(keys: any) => {
                if (is_plan) {
                  setTest(!isTest);
                  sessionStorage.setItem('superUserTab', keys);
                  if (!isReloadCompany && !isReloadCareer && !isReloadProfile) {
                    setKeyOne(keys);
                  }
                }
              }}
            >
              <Tab title={'Company Profile'} eventKey={'0'}>
                <div style={{ height }}>
                  <CompanyPage setKey={setKey} setReload={setReloadCompany} />
                </div>
              </Tab>

              <Tab title={'Build Your Careers Page'} eventKey={'1'}>
                <div
                  style={{
                    height,
                  }}
                >
                  <BuildYourCareerPageScreen
                    isInput={isInput}
                    setInput={setInput}
                    setReload={setReloadCareer}
                  />
                </div>
              </Tab>

              <Tab title={'Integrations'} eventKey={'3'}>
                {tabKeyOne === '3' && <IntegrationScreen />}
              </Tab>
              <Tab title={'User Profile'} eventKey={'4'}>
                <div
                  style={{
                    height: window.innerHeight - 192,
                    overflowY: 'scroll',
                  }}
                >
                  {tabKeyOne === '4' && (
                    <UserProfile setReloadProfile={setReloadProfile} />
                  )}
                </div>
              </Tab>
            </Tabs>
          )}

        {!Permission.includes('manage_account_settings') &&
          super_user === false && (
            <Tabs
              activeKey={tabKeyTwo}
              onSelect={(keys: any) => {
                setKeyTwo(keys);
                sessionStorage.setItem('superUserTabTwo', keys);
              }}
            >
              <Tab title={'Integrations'} eventKey={'0'}>
                {tabKeyTwo === '0' && <IntegrationScreen />}
              </Tab>

              <Tab title={'User Profile'} eventKey={'1'}>
                <div
                  style={{
                    height: window.innerHeight - 192,
                    overflowY: 'scroll',
                  }}
                >
                  {tabKeyTwo === '1' && (
                    <UserProfile setReloadProfile={setReloadProfile} />
                  )}
                </div>
              </Tab>
            </Tabs>
          )}

        {/* {routerPrompt} */}
      </Flex>
    )
  );
};

export default AccountSettingsScreen;
