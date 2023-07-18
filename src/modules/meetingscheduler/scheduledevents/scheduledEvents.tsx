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
        {/* <Button></Button> */}
      </Flex>
    </Flex>
  );
};
export default ScheduledEventsPage;
