import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgInfo from '../../icons/SvgInfo';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import styles from './candidatesuccessmodal.module.css';

type Props = {
  open: boolean;
  btnOnclick: () => void;
  credits: number;
};

const CandidateSuccessModal = ({ open, btnOnclick, credits }: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Flex row center className={styles.title}>
        
          <Flex row center>
            <Text className={styles.titleText}>
              Candidate unlocked successfully! Please click
            </Text>
            <LinkWrapper
              target={'_blank'}
              to={routesPath.MYDATABASE+'?tab=2'}
              onClick={() => sessionStorage.setItem('getMydataBaseTabKey', '2')}
            >
              <Button className={styles.dataBaseBtn} types="link">
                My Database
              </Button>
            </LinkWrapper>

            <Text>{`to view unlocked candidate details. Your available credits ${credits}.`}</Text>
          </Flex>
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button onClick={btnOnclick}>{'OK'}</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CandidateSuccessModal;
