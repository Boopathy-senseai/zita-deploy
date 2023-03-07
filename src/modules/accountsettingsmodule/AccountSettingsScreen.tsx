import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Activity from '../../pages/activity/Activity';
import ManageUsers from '../../pages/home/ManageUsers';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import Text from '../../uikit/Text/Text';
import SvgInfo from '../../icons/SvgInfo';
import { WARNING } from '../../uikit/Colors/colors';
import CompanyPage from './companypage';
import UserProfile from './userprofilemodule/userProfile';
import styles from './accountsettingsscreen.module.css';
import BuildYourCareerPageScreen from './buildyourcareerpage/BuildYourCareerPageScreen';
import EmailNotification from './emailmodule/EmailNotifications';
import { companyPageInitalMiddleWare } from './store/middleware/accountsettingmiddleware';
import { buildCareerMiddleWare } from './buildyourcareerpage/store/middleware/buildyourcareerpagemiddleware';

const height = window.innerHeight - 212;

type ParamsType = {
  itemId: string;
};

const AccountSettingsScreen = () => {
  const dispatch: AppDispatch = useDispatch();

  const { itemId } = useParams<ParamsType>();
  const [tabKey, setKey] = useState('0');
  const [tabKeyOne, setKeyOne] = useState('0');
  const [tabKeyTwo, setKeyTwo] = useState('0');
  const [isInput, setInput] = useState(false);

  useEffect(() => {
    if (super_user === true) {
      if (tabKey === '0') {
        dispatch(companyPageInitalMiddleWare());
      }
      if (tabKey === '1') {
        dispatch(buildCareerMiddleWare());
      }
    }
  }, [tabKey]);

  const {
    Permission,
    super_user,
    isLoading,
    career_page_exists,
    career_page_exists_build,
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
        career_page_exists: companyPageReducers.career_page_exists,
        career_page_exists_build: buildCareerPageReducers.career_page_exists,
      };
    },
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Flex columnFlex className={styles.overAll}>
      <Flex row center>
        <Text size={20} bold className={styles.title}>
          Account Settings
        </Text>
        {(tabKey === '1' || tabKey === '0') &&
          (career_page_exists === false ||
            career_page_exists_build === false) && (
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
        {isInput && (
          <Flex row center className={styles.warningFlex}>
            <SvgInfo height={16} width={16} fill={WARNING} />
            <Text size={12} bold color="warning" className={styles.warningText}>
              Changing your careers page URL will change the URL for all jobs in
              your careers page. Note to change the jobs URL in your company’s
              careers page if connected.
            </Text>
          </Flex>
        )}
      </Flex>

      {super_user === true && (
        <Tabs
          activeKey={tabKey}
          onSelect={(keys: SetStateAction<string>) => setKey(keys)}
        >
          <Tab title={'Company Profile'} eventKey={'0'}>
            <div
              style={{
                height,
                overflowY: 'scroll',
              }}
            >
              {tabKey === '0' && <CompanyPage setKey={setKey} />}
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
                />
              )}
            </div>
          </Tab>
          <Tab title={'Manage Subscription'} eventKey={'2'}>
            <Text>Manage Subscription</Text>
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
              {tabKey === '3' && itemId === 'settings' && <ManageUsers />}
              {tabKey === '3' && itemId !== 'settings' && <Activity />}
            </div>
          </Tab>
          <Tab title={'Integrations'} eventKey={'4'}>
            {/*<Integration />*/}
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
              <UserProfile />
            </div>
          </Tab>
        </Tabs>
      )}
      {!Permission.includes('manage_account_settings') && super_user === false && (
        <Tabs
          activeKey={tabKeyTwo}
          onSelect={(keys: SetStateAction<string>) => setKeyTwo(keys)}
        >
          <Tab title={'Integrations'} eventKey={'0'}>
            {/*<Integration />*/}
          </Tab>

          <Tab title={'User Profile'} eventKey={'1'}>
            <div
              style={{
                height: window.innerHeight - 192,
                overflowY: 'scroll',
              }}
            >
              <UserProfile />
            </div>
          </Tab>
        </Tabs>
      )}

      {Permission.includes('manage_account_settings') && super_user === false && (
        <Tabs
          activeKey={tabKeyOne}
          onSelect={(keys: SetStateAction<string>) => setKeyOne(keys)}
        >
          <Tab title={'Company Profile'} eventKey={'0'}>
            <div style={{ height }}>
              <CompanyPage setKey={setKey} />
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
              />
            </div>
          </Tab>
          <Tab title={'Integrations'} eventKey={'3'}>
            {/*<Integration />*/}
          </Tab>
          <Tab title={'User Profile'} eventKey={'4'}>
            <div
              style={{
                height: window.innerHeight - 192,
                overflowY: 'scroll',
              }}
            >
              <UserProfile />
            </div>
          </Tab>
        </Tabs>
      )}
    </Flex>
  );
};

export default AccountSettingsScreen;
