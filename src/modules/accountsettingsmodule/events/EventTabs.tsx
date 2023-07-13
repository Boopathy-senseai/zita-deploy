import { SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import Loader from '../../../uikit/Loader/Loader';
import Flex from '../../../uikit/Flex/Flex';
import Tab from '../../../uikit/Tab/Tab';
import Tabs from '../../../uikit/Tab/Tabs';
import Text from '../../../uikit/Text/Text';
import styles from '../../accountsettingsmodule/accountsettingsscreen.module.css'
import Slotter1 from './Slotter1';
import EventScheduler from './EventScheduler';

const height = window.innerHeight - 212;

const EventTabs = () => {
  const dispatch: AppDispatch = useDispatch();
  const [tabKey, setKey] = useState('0'); 

  return (
    <Flex columnFlex className={styles.overAll}>
        <br/>
      <Flex row center> 
        <Text size={16} >
        Manage the event schedular and scheduled events in your organization
        </Text>
      </Flex>
      <br/>
        <Tabs
          activeKey={tabKey}
          onSelect={(keys: SetStateAction<string>) => setKey(keys)}
        >
          <Tab title={'Events Schedular'} eventKey={'0'}>
            <div
              style={{
                height,
                // overflowY: 'scroll',
              }}
            >
              {/* {tabKey === '0' && <SlotterScreen />} */}
              {tabKey === '0' && <EventScheduler />}

            </div>
          </Tab>
          {/* <Tab title={'Scheduled Events'} eventKey={'1'}>
            <div
              style={{
                height: window.innerHeight - 192,
                // overflowY: 'scroll',
              }}
            >
              {tabKey === '1' && (
                <Slotter1
                />
              )}
            </div>
          </Tab> */}
       
        </Tabs>
    </Flex>
  );
};

export default EventTabs;
