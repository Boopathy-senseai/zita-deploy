import classNames from 'classnames/bind';
import SvgSwitchOff from '../../icons/SvgSwicthOff';
import SvgSwitchOn from '../../icons/SvgSwitchOn';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './inputswitch.module.css';
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
  //   const handleOnClick = useCallback(
  //     (e) => {
  //       if (typeof onClick === 'function' && e) {
  //         const requiredVal = typeof value !== 'undefined' ? value : name;
  //         e.target.value = requiredVal; // eslint-disable-line
  //         onClick(e);
  //       }
  //     },
  //     [onClick],
  //   );

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
          <SvgSwitchOff fill={offFill}/>
        ) : (
          <SvgSwitchOn  className={styles.svgRadio} />
        )}
        <Text className={styles.labelStyle}>{label}</Text>
      </Flex>
    </div>
  );
};

export default InputSwitch;
