import { useState } from 'react';
import { Button, Flex, InputSwitch, Text } from '../../../uikit';
import CalendarTypeMenu from '../../calendarModule/CalendarTypeMenu';
import Table from './eventsTable';
import styles from './scheduledEvents.module.css';
const ScheduledEventsPage = () => {
  const [showDropDownMenu, setShowDropDownMenu] = useState<boolean>(false);
  const handleDropDown = () => {
    setShowDropDownMenu((state) => !state);
  };
  return (
    <>
      <Flex center between row className={styles.Container}>
        <Flex row center>
          <Text
            size={14}
            className={styles.textStyles}
            style={{ marginRight: '10px' }}
          >
            Upcoming Events
          </Text>
          <InputSwitch checked={true} onClick={() => {}} />
          <Text
            size={14}
            className={styles.textStyles}
            style={{ marginLeft: '10px' }}
          >
            Past Events
          </Text>
        </Flex>
        <Flex>
          <Flex row center></Flex>
          <Button className={styles.scheduleButton} onClick={() => {}}>
            Schedule Events
          </Button>
        </Flex>
      </Flex>
      <Flex style={{ padding: '10px' }}>
        <Table />
      </Flex>
    </>
  );
};
export default ScheduledEventsPage;
