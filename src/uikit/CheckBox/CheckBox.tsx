import { memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import SvgCheckBox from '../../icons/SvgCheckBox';
import SvgCheckBoxOutline from '../../icons/SvgCheckBoxOutline';
import Flex from '../Flex/Flex';
import { isEmpty } from '../helper';
import Text, { textColors, textSize } from '../Text/Text';
import styles from './checkbox.module.css';

const cx = classNames.bind(styles);
type DefaultPropsTypes = {
  name?: string;
  size?: number;
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps: DefaultPropsTypes = {
  name: '',
};

export type CheckBoxEventType = {
  target: {
    value: any[];
  };
};

type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  color?: string;
  borderColor?: string;
  labelRight?: string;
  labelLeft?: string;
  value?: any[];
  labelColor?: textColors;
  labelSize?: textSize;
  disabled?: boolean;
  size?: number;
  className?: string;
} & typeof defaultProps;

const CheckBox = ({
  color,
  borderColor,
  onClick,
  checked,
  onBlur,
  labelLeft,
  labelRight,
  labelColor,
  labelSize,
  name,
  value,
  disabled,
  size,
  className,
}: Props) => {
  const handleOnClick = useCallback(
    (e:any) => {
      const isValuePresent = Array.isArray(value);
      if (typeof onClick === 'function') {
        if (!value) {
          e.target.value = [name];
        } else if (isValuePresent) {
          if (value.includes(name)) {
            const filteredValue = value.filter((v) => v !== name);
            e.target.value = filteredValue;
          } else {
            e.target.value = [...value, name];
          }
        }
        onClick(e);
      }
    },
    [onClick],
  );

  return (
    <Flex
      disabled={disabled}
      row
      center
      onClick={handleOnClick}
      onBlur={onBlur}
      className={cx('container', className)}
    >
      {!isEmpty(labelLeft) && (
        <Text
          color={labelColor}
          size={labelSize}
          className={styles.labelLeftStyle}
        >
          {labelLeft}
        </Text>
      )}
      {checked ? (
        <SvgCheckBox fill={color} height={size} width={size} />
      ) : (
        <SvgCheckBoxOutline fill={borderColor} height={size} width={size} />
      )}
      {!isEmpty(labelRight) && (
        <Text
          bold
          color={labelColor}
          size={labelSize}
          className={styles.labelRightStyle}
        >
          {labelRight}
        </Text>
      )}
    </Flex>
  );
};

CheckBox.defaultProps = defaultProps;

export default memo(CheckBox);
