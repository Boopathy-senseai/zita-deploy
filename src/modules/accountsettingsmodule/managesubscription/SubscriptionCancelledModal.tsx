import SvgInfo from '../../../icons/SvgInfo';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Modal from '../../../uikit/Modal/Modal';
import Button from '../../../uikit/Button/Button';
import styles from '../managesubscription/managesubscriptionscreen.module.css'
type Props = {
  open: boolean;
  cancel: () => void;
};
const SubscriptionCancelledModal = ({ cancel, open }: Props) => {
  return (
    <Modal open={open}>
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 4,
          padding: '25px 25px',
        }}
      >
       
          <Flex row center  >
             <Flex>
              <Text
                style={{color:"#333333"}}
               
              >
                   Your account will be active until your subscription end date and
                   can access all your data and jobs untils  </Text><Text > your subscription period. Your site access will be revoked
                   after the subscription end date.
              </Text></Flex>
            </Flex>
       
        <Flex columnFlex center marginTop={20}>
          <Button onClick={cancel}>Ok</Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default SubscriptionCancelledModal;
