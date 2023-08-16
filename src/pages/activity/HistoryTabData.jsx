import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import Flex from '../../uikit/Flex/Flex';
import { getDateString } from '../../uikit/helper';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import styles from './historytabdata.module.css';

const resultTitle = () => [
  {
    title: 'Date',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (a) => <Text size={12}>{getDateString(a, 'MMM D, YYYY')}</Text>,
    flex: 2.5,
  },
  {
    title: 'Action Taken',
    dataIndex: 'action_description',
    key: 'action_description',
    flex: 2.5,
  },
  {
    title: 'On',
    dataIndex: 'action_detail',
    key: 'action_detail',
    flex: 5,
  },
];

const HistoryTabData = (props) => {
  const [activities, setactivities] = useState([]);

  useEffect(() => {
    axios
      .get('user-activity-list/' + props.userId + '/')
      .then((res) => {
        setactivities(res.data.data.activities.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userId]);

  const columns = useMemo(() => resultTitle(), [activities]);

  return (
    <Flex columnFlex className={styles.overAll}>
      <Text className={styles.title}>
        List of actions taken by the user
      </Text>
      {activities && (
        <Table
          empty={'No history found'}
          dataSource={activities}
          columns={columns}
          border="outline"
          scrollHeight={300}
        />
      )}
    </Flex>
  );
};

export default HistoryTabData;
