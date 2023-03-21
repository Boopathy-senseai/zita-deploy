import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import { isEmpty } from '../../../uikit/helper';
import Loader from '../../../uikit/Loader/Loader';
import Table from '../../../uikit/Table/Table';
import CancelSubscriptionModal from './CancelSubscriptionModal';
import FeedBackModal from './FeedBackModal';
import {
  billingPortalMiddleWare,
  cancelSubscriptionMiddleWare,
  manageSubscriptionMiddleWare,
  renewSubscriptionMiddleWare,
} from './store/managesubscriptionmiddleware';
import SubscriptionCancelledModal from './SubscriptionCancelledModal';
import styles from './subscriptionplan.module.css';
import { planTable } from './tableHelper';

type Props = {
  setRenew: () => void;
};
const SubscriptionPlan = ({ setRenew }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isCancelOne, setCancelOne] = useState(false);
  const [isCancelTwo, setCancelTwo] = useState(false);
  const [isCancelSuccess, setCancelSuccess] = useState(false);
  const { subscription, price, free_expired,base_price } = useSelector(
    ({ manageSubscriptionReducers }: RootState) => ({
      subscription: manageSubscriptionReducers.subscription,
      price: manageSubscriptionReducers.price,
      free_expired: manageSubscriptionReducers.free_expired,
      base_price:manageSubscriptionReducers.base_price
    }),
  );

  const data = [
    {
      plan: subscription && subscription.plan_id_id,
      invoice: subscription && subscription.created_at,
      billing: '',
      plan_price: base_price,
      totalUser: subscription && subscription.no_of_users,
      total_price: price,
      next_billing: subscription && subscription.subscription_valid_till,
      current_status: subscription && subscription.is_active,
      subscription_changed_to:
        subscription && subscription.subscription_changed_to,
      free_expired,
    },
  ];

  const columns = useMemo(() => planTable(), [data]);

  const handleInvoice = () => {
    setLoader(true);
    dispatch(billingPortalMiddleWare({})).then((res) => {
      window.location.replace(res.payload.url);
      setLoader(false);
    });
  };

  // cancel button function
  const handleCancel = () => {
    setLoader(true);
    dispatch(cancelSubscriptionMiddleWare()).then(() => {
      setCancelTwo(false);
      setLoader(false);
      setCancelSuccess(true);
      dispatch(manageSubscriptionMiddleWare());
    });
  };

  const getPlanId: any = subscription && subscription?.plan_id_id.toString();
// renew button function
  const hanldeRenew = () => {
    setLoader(true);
    dispatch(
      renewSubscriptionMiddleWare({
        key: getPlanId,
      }),
    ).then(() => {
      setLoader(false);
      dispatch(manageSubscriptionMiddleWare()).then(() => {
        setRenew();
      });
    });
  };

  return (
    <>
      <FeedBackModal
        open={isCancelTwo}
        cancel={handleCancel}
        onClick={handleCancel}
      />
      <SubscriptionCancelledModal
        open={isCancelSuccess}
        cancel={() => setCancelSuccess(false)}
      />
      <CancelSubscriptionModal
        open={isCancelOne}
        cancel={() => setCancelOne(false)}
        onClick={() => {
          setCancelOne(false);
          setCancelTwo(true);
        }}
        subscription={subscription}
      />
      <Card className={styles.overAll}>
        {isLoader && <Loader />}
        <Table columns={columns} dataSource={data} border="outline" />
        {subscription && subscription.plan_id_id !== 1 && (
          <Flex
            className={styles.btnContainer}
            marginLeft={16}
            marginRight={24}
            row
            center
            between
          >
            <Button onClick={handleInvoice}>Invoices & Payment Info</Button>
            {subscription &&
            subscription.is_active === true &&
            isEmpty(subscription.subscription_changed_to) ? (
              <Text  onClick={() => setCancelOne(true)} className={styles.subscriptionLink}>
                Cancel Subscription
              </Text>
            ) : (
              <Text  onClick={hanldeRenew}className={styles.subscriptionLink}>
                Renew Subscription
              </Text>
            )}
          </Flex>
        )}
      </Card>
    </>
  );
};

export default SubscriptionPlan;
