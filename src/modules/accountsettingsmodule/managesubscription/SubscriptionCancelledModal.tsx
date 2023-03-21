import SvgInfo from '../../../icons/SvgInfo';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import Modal from '../../../uikit/Modal/Modal';
import Button from '../../../uikit/Button/Button';

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
          padding: '30px 30px',
        }}
      >
        <Flex row>
          <div style={{ position: 'relative', top: 6 }}>
            <SvgInfo height={24} width={24} />
          </div>
          <Flex marginLeft={16}>
            <Text bold>Subscription cancelled successfully.</Text>
            <Text>
              Your account will be active until your subscription end date and
              can access all your data and jobs
            </Text>
            <Text>
              until your subscription period. Your site access will be revoked
              after the subscription end date.
            </Text>
          </Flex>
        </Flex>
        <Flex columnFlex center marginTop={20}>
          <Button onClick={cancel}>Ok</Button>
        </Flex>
      </div>
    </Modal>
  );
};

export default SubscriptionCancelledModal;
