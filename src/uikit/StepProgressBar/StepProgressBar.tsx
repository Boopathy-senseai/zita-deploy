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
  className: "stepOneBar"
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
}: Props) => 
{
  let clipPathStyle = "polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 5% 50%, 0% 0%)"
  if (stepIndex === "1") {
    clipPathStyle = "polygon(95% 0%, 100% 50%, 95% 100%, 0% 100%, 0% 50%, 0% 0%)"
  }
  return (
    <Flex className={styles.overAll} columnFlex>
      <Flex row center className={titleclassName}>
        <div
          className={cx('round', {
            roundeSelect: roundFill,
            roundeNonSelect: !roundFill,
          })}
          style={{ clipPath: clipPathStyle }}
        >
          <Text  size={13} color={roundFill ? 'white' : 'black'}>
            {stepIndex}.{title}
          </Text>
        </div>
        {/* <div
          className={cx('bar', {
            roundeSelect: barFilled,
            roundeNonSelect: !barFilled,
          })}
        /> */}
      </Flex>
      
    </Flex>
  );
};
StepProgressBar.defaultProps = defaultProps;

export default StepProgressBar;
