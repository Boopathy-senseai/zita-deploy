import SvgBoxEdit from '../../icons/SvgBoxEdit';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { EventEntity } from './applicantProfileTypes';

export const meetingTitle = [
  {
    title: 'Event Name',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
  },
  {
    title: 'Meeting Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (value: string) => (
      <Text size={12}>{getDateString(value, 'll')}</Text>
    ),
  },
  {
    title: 'Time Slot',
    dataIndex: 'start_time',
    key: 'start_time',
    render: (_a: string, value: EventEntity) => (
      <Text size={12}>
        {getDateString(value.start_time, 'hh:mm A')} -{' '}
        {getDateString(value.end_time, 'hh:mm A')}
      </Text>
    ),
    flex:1.3
  },
  {
    title: 'Edit',
    dataIndex: 'web_url',
    key: 'web_url',
    align: 'center',
    render: (value: string) => {
      const handleClick = () => {
        window.open(value);
      };

      return (
        <Flex className="pointer" flex={1} center middle onClick={handleClick}>
          <SvgBoxEdit />
        </Flex>
      );
    },
  },
];
