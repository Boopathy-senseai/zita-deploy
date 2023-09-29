import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './stepprogressbar.module.css';
const cx = classNames.bind(styles);

const defaultProps = {
  filled: false,
  title: 'Create Your Job',
  stepIndex: '1',
  roundFill: false,
};

type Props = {
  barFilled?: boolean;
  titleclassName?: string;
} & typeof defaultProps;
const StepProgressBar = ({
  barFilled,
  title,
  stepIndex,
  titleclassName,
  roundFill,
}: Props) => {
  return (
    <Flex className={styles.overAll} columnFlex>
      <Flex row center>
        <div
          className={cx('round', {
            roundeSelect: roundFill,
            roundeNonSelect: !roundFill,
          })}
        >
          <Text  size={13} color={roundFill ? 'white' : 'black'}>
            {stepIndex}.{title}
          </Text>
        </div>
        <div
          className={cx('bar', {
            roundeSelect: barFilled,
            roundeNonSelect: !barFilled,
          })}
        />
      </Flex>
      
    </Flex>
  );
};
StepProgressBar.defaultProps = defaultProps;

export default StepProgressBar;
