import { Button, Flex, InputSwitch, Text } from '../../../uikit';

const ScheduledEventsPage = () => {
  return (
    <Flex center between>
      <Flex row center>
        <Text>Upcoming Events</Text>
        {/* <InputSwitch
            checked={personalEvents}
            onClick={() =>
              handleTeamCalendarOptions({
                ...teamCalendarOptions,
                personalEvents: !teamCalendarOptions.personalEvents,
              })
            }
          /> */}
        <Text>Past Events</Text>
      </Flex>
      <Flex>
        
      </Flex>
    </Flex>
  );
};
export default ScheduledEventsPage;
