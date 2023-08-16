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
          <Flex >
            <Text bold size={14}>
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
          
        <Flex  center  className={styles.warningFlex}>
              
              
              <Text
                style={{color:"#333333",}}
                className={styles.warningText}
              >
                   <Text style={{color:'#2E6ADD',marginRight:'3px',fontSize:'13px'}} bold >Heads Up!{' '}</Text>
                   Your account will be active until your subscription end date and
                   can access all your data{' '}</Text><Text style={{marginLeft: '8px'}}>{'  '} and jobs until your subscription period. Your site access will be revoked
                   after the subscription end date.
              </Text>
            </Flex>
        <Flex row center middle style={{display:'flex',justifyContent:'flex-end'}}>
          <Button onClick={cancel} style={{ marginRight: 8 }} types="close">
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
