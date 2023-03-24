import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
// import { EventEntity } from './applicantProfileTypes';

export const meetingTitle = () => [
  {
    title: 'Event Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Created By',
    dataIndex: 'organizer',
    key: 'organizer',
  },
  {
    title: 'Meeting Date',
    dataIndex: 'date',
    key: 'date',
    render: (value: string) => (
      <Text size={12}>{getDateString(value, 'll')}</Text>
    ),
  },
  {
    title: 'Time Slot',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Edit',
    dataIndex: 'web_url',
    key: 'web_url',
    align: 'center',
    render: () => {
      const handleClick = () => {
        // window.open(value);
      };
      return (
        <Flex flex={1} center middle onClick={handleClick}>
          <div style={{ cursor: 'pointer' }}>
            <SvgBoxEdit />
          </div>
        </Flex>
      );
    },
  },
];
