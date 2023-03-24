import classNames from 'classnames/bind';
import { useCallback } from 'react';
import SvgRadioWithLine from '../../icons/SvgRadioWithLine';
import SvgRadioWithOutOutLine from '../../icons/SvgRadioWithOutOutLine';
import { PRIMARY } from '../Colors/colors';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './inputradio.module.css';
const cx = classNames.bind(styles);

type DefaultPropsTypes = {
  name?: string;
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps: DefaultPropsTypes = {
  name: '',
};

type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  label?: import('react').ReactNode;
  value?: string;
  disabled?: boolean;
} & typeof defaultProps;

const InputRadio = ({
  onClick,
  onBlur,
  name,
  checked,
  label,
  value,
  disabled,
}: Props) => {
  const handleOnClick = useCallback(
    (e) => {
      if (typeof onClick === 'function' && e) {
        const requiredVal = typeof value !== 'undefined' ? value : name;
        e.target.value = requiredVal; // eslint-disable-line
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <div
      role={'button'}
      tabIndex={0}
      onClick={handleOnClick}
      onBlur={onBlur}
      className={cx('overAll')}
      onKeyPress={() => {}}
    >
      <Flex
        row
        center
        className={cx({ pointer: !disabled })}
      >
        {checked ? (
          <div className={cx({ disabledPointer: disabled })}>
            <SvgRadioWithLine fill={PRIMARY} />
          </div>
        ) : (
          <div className={cx({ disabledPointer: disabled })}>
            <SvgRadioWithOutOutLine className={cx({ svgRadio: !disabled })} />
          </div>
        )}
        <Text className={styles.labelStyle}>{label}</Text>
      </Flex>
    </div>
  );
};

export default InputRadio;
