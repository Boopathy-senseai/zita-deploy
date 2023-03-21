import Button from '../../../uikit/Button/Button';
import { getDateString, isEmpty } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import styles from './subscriptionplan.module.css';

export type tableDataTypes = {
  plan: number | undefined;
  invoice: string | undefined;
  billing: string;
  plan_price: number;
  totalUser: number;
  total_price: number;
  next_billing: string | undefined;
  current_status: boolean | undefined;
  subscription_changed_to: any;
  free_expired: any;
};

export const planTable = () => [
  {
    title: 'Subscription Plan',
    dataIndex: 'plan',
    key: 'plan',
    render: (_a: number, value: tableDataTypes) => {
      return (
        <div>
          {value.plan === 1 && <Text bold>Free Trial</Text>}
          {(value.plan === 2 || value.plan === 3) && <Text bold>BASIC</Text>}
          {(value.plan === 4 || value.plan === 5) && <Text bold>PRO</Text>}
        </div>
      );
    },
  },
  {
    title: 'Invoice Date',
    dataIndex: 'invoice',
    key: 'invoice',
    render: (a: string) => {
      return <Text>{getDateString(a, 'll')}</Text>;
    },
  },
  {
    title: 'Billing Frequency',
    dataIndex: 'billing',
    key: 'billing',
    render: (_a: string, value: tableDataTypes) => {
      return (
        <div>
          {value.plan === 1 && <Text>-</Text>}
          {(value.plan === 2 || value.plan === 4) && <Text>Monthly</Text>}
          {(value.plan === 3 || value.plan === 5) && <Text>Annual</Text>}
        </div>
      );
    },
  },
  {
    title: 'Plan Price',
    dataIndex: 'plan_price',
    key: 'plan_price',
    render: (price: string, value: tableDataTypes) => {
      return <Text>{value.plan !== 1 ? `$ ${price}` : 'Free'}</Text>;
    },
  },
  {
    title: 'Total Users',
    dataIndex: 'totalUser',
    key: 'totalUser',
    render: (total: number) => {
      return <Text>{total}</Text>;
    },
  },
  {
    title: 'Total Price',
    dataIndex: 'total_price',
    key: 'total_price',
    render: (total_price: number, value: tableDataTypes) => {
      return <Text>{value.plan !== 1 ? `$ ${total_price}` : 'Free'}</Text>;
    },
  },
  {
    title: 'Next Billing Date',
    dataIndex: 'next_billing',
    key: 'next_billing',
    render: (next_billing: number) => {
      return <Text>{getDateString(next_billing, 'll')}</Text>;
    },
  },
  {
    title: 'Current Status',
    dataIndex: 'current_status',
    key: 'current_status',
    render: (_a: any, value: tableDataTypes) => {
      return (
        <div>
          {value.current_status === true &&
            isEmpty(value.subscription_changed_to) &&
            value.plan !== 1 && (
              <Button className={styles.active} types="success">
                <Text> Active </Text>
              </Button>
            )}
          {value.plan === 1 && (
            <>
              {value.plan === 1 && value.free_expired === 0 ? (
                <Button disabled>Expired</Button>
              ) : (
                <Button className={styles.active} types="success">
                  <Text> Active </Text>
                </Button>
              )}
            </>
          )}

          {value.current_status === false && value.free_expired !== 0 && (
            <Button className={styles.Inactive}><Text>Inactive</Text></Button>
          )}
          {value.current_status === true &&
            Number(value.subscription_changed_to) === -1 &&
            value.plan !== 1 && (
              <Button className={styles.Inactive}>
                <Text>Cancelled</Text>
              </Button>
            )}
          {value.current_status === true &&
            Number(value.subscription_changed_to) === -2 &&
            value.plan !== 1 && (
              <Button disabled>
                <Text>Expired</Text>
              </Button>
            )}
        </div>
      );
    },
  },
];
