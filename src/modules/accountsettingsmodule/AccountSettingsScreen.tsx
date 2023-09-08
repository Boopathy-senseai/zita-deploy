import { useEffect, useRef, useState } from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import toast from 'react-hot-toast';
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
import SvgSettings from '../../icons/SvgSettings';
import { WARNING } from '../../uikit/Colors/colors';
import { LEAVE_THIS_SITE } from '../constValue';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import {
  outlookCallbackMiddleware,
  googleCallbackMiddleware,
  IntergratemailMiddleWare,
} from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';

import {
  getEmail,
  Google_Auth,
  Outlook_Auth,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import Toast from '../../uikit/Toast/Toast';
import CompanyPage from './companypage';
//import UserProfile from './userprofilemodule/userProfile';
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
  value: string;
};
type props = {
  value: () => void;
};

const AccountSettingsScreen = ({ value }: props) => {
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
  const [load, setload] = useState(false);
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
    /**
     *
     * After Granting Calendar Access, page redirects to this URL.
     * Google Calendar redirects "scope,code" params
     * Outlook Calendar redirects with "session_state,code,state" params
     *
     */

    localStorage.setItem('freeCheck', 'true');
    var url = new URL(window.location.href);

    if (url.searchParams.get('scope')) {
      // Google
      const code = url.searchParams.get('code');
      var username = localStorage.getItem('integrate');

      if (username === 'Mail') {
        dispatch(Google_Auth({ codeUrl: code })).then((res) => {
          dispatch(getEmail(undefined));
          history.push('/account_setting/settings');
          window.location.reload();
          // localStorage.setItem('integrationSuccess', 'true');
        });
      } else {
        dispatch(googleCallbackMiddleware({ codeUrl: code })).then((res) => {
          dispatch(IntergratemailMiddleWare());
          history.push('/account_setting/settings');
          localStorage.setItem('integrationSuccess', 'true');
          window.location.reload();
        });
      }
    } else if (url.searchParams.get('session_state')) {
      // Outlook
      var user = localStorage.getItem('integrate');

      const access_urls = {
        code: url.searchParams.get('code'),
        state: url.searchParams.get('state'),
        session_state: url.searchParams.get('session_state'),
      };
      // setload(true);

      if (user === 'Mail') {
        dispatch(Outlook_Auth(access_urls))
          .then((res) => {
            dispatch(getEmail(undefined));
            history.push('/account_setting/settings');
            window.location.reload();
          })
          .catch((err) => {
            // console.log('error', err);
          });
      } else {
        dispatch(outlookCallbackMiddleware(access_urls))
          .then((res) => {
            dispatch(IntergratemailMiddleWare());
            history.push('/account_setting/settings');
            localStorage.setItem('integrationSuccess', 'true');
            window.location.reload();
            //  Toast('Outlook calendar Integrated Successfully', 'MEDIUM');
          })
          .catch((err) => {
            //  console.log('error', err);
          });
      }
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

  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();
  // var oldURL = window.location.href;
  // if(window.location.href !== oldURL){

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
  }, [tabKey, isTest, tabKeyOne, history.push]);

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
      <>
        <Flex row center className={styles.overallhead}>
          <Flex row center>
            {/* <Flex center marginLeft={20}>
              <SvgSettings />
            </Flex> */}
            <Flex>
              <Text
                bold
                size={16}
                style={{ marginLeft: 8, color: '#581845', padding: '10px 0px' }}
                className={styles.postingcl}
              >
                Account Settings
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
                id={!is_plan ? 'account__settings' : 'setting'}
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
                <Tab title={'Profiles'} eventKey={'0'}>
                  <div
                    style={{
                      height: window.innerHeight - 155,
                      overflowY: 'scroll',
                    }}
                  >
                    <Flex center>
                      {tabKey === '0' &&
                        company_detail &&
                        company_detail.no_of_emp === null && (
                          <Flex row center className={styles.warningFlex}>
                            <SvgInfo height={16} width={16} fill={'#2E6ADD'} />
                            <Text
                              style={{ color: '#333333' }}
                              className={styles.warningText}
                            >
                              <Text
                                style={{
                                  color: '#2E6ADD',
                                  marginRight: '3px',
                                  fontSize: '13px',
                                }}
                                bold
                              >
                                Heads Up!{' '}
                              </Text>
                              Please complete your company profile and careers
                              page to post jobs.
                            </Text>
                          </Flex>
                        )}

                      {tabKey === '1' &&
                      company_detail &&
                      company_detail.no_of_emp === null
                        ? tabKey === '1' &&
                          career_page_exists_build === false && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your company profile and careers
                                page to post jobs.
                              </Text>
                            </Flex>
                          )
                        : tabKey === '1' &&
                          career_page_exists_build === false && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your careers page to post jobs.
                              </Text>
                            </Flex>
                          )}

                      {isInput &&
                        isLoadingCareer === false &&
                        tabKey === '1' &&
                        career_page_exists_build === true && (
                          <Flex row center className={styles.warningFlex}>
                            <SvgInfo height={16} width={16} fill={'#2E6ADD'} />
                            <Text
                              style={{ color: '#333333' }}
                              className={styles.warningText}
                            >
                              <Text
                                style={{
                                  color: '#2E6ADD',
                                  marginRight: '3px',
                                  fontSize: '13px',
                                }}
                                bold
                              >
                                Heads Up!{' '}
                              </Text>
                              Changing your careers page URL will change the URL
                              for all jobs in your careers page. Note to change
                              the jobs URL in your company’s careers page if
                              connected.
                            </Text>
                          </Flex>
                        )}
                    </Flex>
                    {tabKey === '0' && (
                      <CompanyPage
                        setKey={setKey}
                        setReload={setReloadCompany}
                        setReloadProfile={setReloadProfile}
                      />
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
                    <Flex center>
                      {tabKey === '1' &&
                      company_detail &&
                      company_detail.no_of_emp === null
                        ? tabKey === '1' &&
                          career_page_exists_build === false && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your company profile and careers
                                page to post jobs.
                              </Text>
                            </Flex>
                          )
                        : tabKey === '1' &&
                          career_page_exists_build === false && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your careers page to post jobs.
                              </Text>
                            </Flex>
                          )}

                      {isInput &&
                        isLoadingCareer === false &&
                        tabKey === '1' &&
                        career_page_exists_build === true && (
                          <Flex row center className={styles.warningFlex}>
                            <SvgInfo height={16} width={16} fill={'#2E6ADD'} />
                            <Text
                              style={{ color: '#333333' }}
                              className={styles.warningText}
                            >
                              <Text
                                style={{
                                  color: '#2E6ADD',
                                  marginRight: '3px',
                                  fontSize: '13px',
                                }}
                                bold
                              >
                                Heads Up!{' '}
                              </Text>
                              Changing your careers page URL will change the URL
                              for all jobs in your careers page. Note to change
                              the jobs URL in your company’s careers page if
                              connected.
                            </Text>
                          </Flex>
                        )}
                    </Flex>
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
                  {tabKey === '2' && (
                    <ManageSubscriptionScreen setTab={setKey} />
                  )}
                </Tab>
                <Tab title={'Manage Users'} eventKey={'3'}>
                  {/* <div
                    className={
                      itemId === 'settings'
                        ? styles.borderStyle
                        : styles.overFlow
                    }
                    style={{
                      height:
                        itemId === 'settings'
                          ? height
                          : window.innerHeight - 192,
                    }}
                  > */}
                  {tabKey === '3' && itemId === 'settings' && (
                    <ManageUsers setKey={setKey} />
                  )}
                  {tabKey === '3' && itemId !== 'settings' && <Activity />}
                  {/* </div> */}
                </Tab>
                <Tab title={'Integrations'} eventKey={'4'}>
                  {tabKey === '4' && <IntegrationScreen />}
                </Tab>
                {/* {Permission.includes('manage_account_settings')?( */}
                <Tab title={'Workflow'} eventKey={'7'}>
                  {tabKey === '7' && <TemplatesPage />}
                </Tab>
                {/* ):("")} */}

                <Tab title={'Email Notifications'} eventKey={'5'}>
                  <EmailNotification />
                </Tab>
                {/* <Tab title={'User Profile'} eventKey={'6'}>
              <div
                style={{
                  height: window.innerHeight - 192,
                  overflowY: 'scroll',
                }}
              >
                {tabKey === '6' && (
                  <UserProfile    />
                )}
              </div>
            </Tab> */}
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
                      if (
                        !isReloadCompany &&
                        !isReloadCareer &&
                        !isReloadProfile
                      ) {
                        setKeyOne(keys);
                      }
                    }
                  }}
                >
                  <Tab title={'Profiles'} eventKey={'0'}>
                    <div
                      style={{
                        height: window.innerHeight - 215,
                        overflowY: 'scroll',
                      }}
                    >
                      <Flex center>
                        {tabKey === '0' &&
                          company_detail &&
                          company_detail.no_of_emp === null && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your company profile and careers
                                page to post jobs.
                              </Text>
                            </Flex>
                          )}

                        {tabKey === '1' &&
                        company_detail &&
                        company_detail.no_of_emp === null
                          ? tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your company profile and
                                  careers page to post jobs.
                                </Text>
                              </Flex>
                            )
                          : tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your careers page to post
                                  jobs.
                                </Text>
                              </Flex>
                            )}

                        {isInput &&
                          isLoadingCareer === false &&
                          tabKey === '1' &&
                          career_page_exists_build === true && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Changing your careers page URL will change the
                                URL for all jobs in your careers page. Note to
                                change the jobs URL in your company’s careers
                                page if connected.
                              </Text>
                            </Flex>
                          )}
                      </Flex>
                      <CompanyPage
                        setKey={setKey}
                        setReload={setReloadCompany}
                        setReloadProfile={setReloadProfile}
                      />
                    </div>
                  </Tab>

                  <Tab title={'Build Your Careers Page'} eventKey={'1'}>
                    <div
                      style={{
                        height: window.innerHeight - 192,
                        overflowY: 'scroll',
                      }}
                    >
                      <Flex center>
                        {tabKey === '1' &&
                        company_detail &&
                        company_detail.no_of_emp === null
                          ? tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your company profile and
                                  careers page to post jobs.
                                </Text>
                              </Flex>
                            )
                          : tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your careers page to post
                                  jobs.
                                </Text>
                              </Flex>
                            )}

                        {isInput &&
                          isLoadingCareer === false &&
                          tabKey === '1' &&
                          career_page_exists_build === true && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Changing your careers page URL will change the
                                URL for all jobs in your careers page. Note to
                                change the jobs URL in your company’s careers
                                page if connected.
                              </Text>
                            </Flex>
                          )}
                      </Flex>

                      <BuildYourCareerPageScreen
                        isInput={isInput}
                        setInput={setInput}
                        setReload={setReloadCareer}
                      />
                    </div>
                  </Tab>

                  <Tab title={'Integrations'} eventKey={'2'}>
                    {tabKeyOne === '2' && <IntegrationScreen />}
                  </Tab>
                  <Tab title={'Workflow'} eventKey={'3'}>
                    {tabKeyOne === '3' && <TemplatesPage />}
                  </Tab>
                  {/* <Tab title={'User Profile'} eventKey={'4'}>
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
              </Tab> */}
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
                  <Tab title={'Profiles'} eventKey={'0'}>
                    <div
                      style={{
                        height: window.innerHeight - 215,
                        overflowY: 'scroll',
                      }}
                    >
                      <Flex center>
                        {tabKey === '0' &&
                          company_detail &&
                          company_detail.no_of_emp === null && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Please complete your company profile and careers
                                page to post jobs.
                              </Text>
                            </Flex>
                          )}

                        {tabKey === '1' &&
                        company_detail &&
                        company_detail.no_of_emp === null
                          ? tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your company profile and
                                  careers page to post jobs.
                                </Text>
                              </Flex>
                            )
                          : tabKey === '1' &&
                            career_page_exists_build === false && (
                              <Flex row center className={styles.warningFlex}>
                                <SvgInfo
                                  height={16}
                                  width={16}
                                  fill={'#2E6ADD'}
                                />
                                <Text
                                  style={{ color: '#333333' }}
                                  className={styles.warningText}
                                >
                                  <Text
                                    style={{
                                      color: '#2E6ADD',
                                      marginRight: '3px',
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    Heads Up!{' '}
                                  </Text>
                                  Please complete your careers page to post
                                  jobs.
                                </Text>
                              </Flex>
                            )}

                        {isInput &&
                          isLoadingCareer === false &&
                          tabKey === '1' &&
                          career_page_exists_build === true && (
                            <Flex row center className={styles.warningFlex}>
                              <SvgInfo
                                height={16}
                                width={16}
                                fill={'#2E6ADD'}
                              />
                              <Text
                                style={{ color: '#333333' }}
                                className={styles.warningText}
                              >
                                <Text
                                  style={{
                                    color: '#2E6ADD',
                                    marginRight: '3px',
                                    fontSize: '13px',
                                  }}
                                  bold
                                >
                                  Heads Up!{' '}
                                </Text>
                                Changing your careers page URL will change the
                                URL for all jobs in your careers page. Note to
                                change the jobs URL in your company’s careers
                                page if connected.
                              </Text>
                            </Flex>
                          )}
                      </Flex>
                      <CompanyPage
                        setKey={setKey}
                        setReload={setReloadCompany}
                        setReloadProfile={setReloadProfile}
                      />
                    </div>
                  </Tab>
                  <Tab title={'Integrations'} eventKey={'1'}>
                    {tabKeyTwo === '1' && <IntegrationScreen />}
                  </Tab>
                  <Tab title={'Workflow'} eventKey="2">
                    {tabKeyTwo === '2' && <TemplatesPage />}
                  </Tab>

                  {/* <Tab title={'User Profile'} eventKey={'1'}>
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
              </Tab> */}
                </Tabs>
              )}
          </Flex>

          {/* {routerPrompt} */}
        </Flex>
      </>
    )
  );
};

export default AccountSettingsScreen;
