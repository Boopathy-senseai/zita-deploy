import SvgInfo from '../../../icons/SvgInfo';
import Text from '../../../uikit/Text/Text';
import Modal from '../../../uikit/Modal/Modal';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import { BLACK } from '../../../uikit/Colors/colors';
import { getDateString } from '../../../uikit/helper';
import styles from './cancelsubscriptionmodal.module.css';
import { Subscription } from './manageSubscriptionTypes';

type Props = {
  cancel: () => void;
  onClick: () => void;
  open: boolean;
  subscription?: Subscription;
};

const CancelSubscriptionModal = ({
  cancel,
  onClick,
  open,
  subscription,
}: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex row center className={styles.infoFlex}>
          <SvgInfo fill={BLACK} />
          <Flex marginLeft={16}>
            <Text bold>
              We are sorry to see you go, Your{' '}
              {(subscription && subscription.plan_id_id === 3) ||
              (subscription && subscription.plan_id_id === 5)
                ? 'Annual'
                : 'Monthly'}{' '}
              subscription period ends on{' '}
              {getDateString(subscription?.subscription_valid_till, 'll')}
            </Text>
            <Text>
              If you still want to cancel your subscription click on{' '}
              <b>“Cancel Subscription”</b> button.
            </Text>
          </Flex>
        </Flex>
        <Flex center columnFlex>
          <Flex className={styles.warningFlex}>
            <Text size={12} color="warning">
              Your account will be active until your subscription end date and
              can access all your data and jobs{' '}
            </Text>
            <Text size={12} color="warning">
              until your subscription period. Your site access will be revoked
              after the subscription end date.
            </Text>
          </Flex>
        </Flex>
        <Flex row center middle marginBottom={30}>
          <Button onClick={cancel} style={{ marginRight: 8 }} types="secondary">
            No Thanks
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={onClick}>
            Cancel Subscription
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CancelSubscriptionModal;
