import classNames from 'classnames/bind';
import SvgSwitchOffextra from '../../icons/SvgSwitchOffextra';
import SvgSwitchOnextra from '../../icons/SvgSwitchOnextra';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './Externalswitch.module.css';
const cx = classNames.bind(styles);

type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  label?: import('react').ReactNode;
  disabled?: boolean;
  offFill?:string
};

const InputSwitch = ({ onClick, onBlur, checked, label, disabled,offFill }: Props) => { 

  return (
    <div
      role={'button'}
      tabIndex={0}
      onClick={onClick}
      onBlur={onBlur}
      className={cx('overAll', { disabled })}
      onKeyPress={() => {}}
    >
      <Flex row center className={styles.pointer}>
        {!checked ? (
          <SvgSwitchOffextra fill={offFill}/>
        ) : (
          <SvgSwitchOnextra  className={styles.svgRadio} />
         )} 
        <Text className={styles.labelStyle}>{label}</Text>
      </Flex>
    </div>
  );
};

export default InputSwitch;
