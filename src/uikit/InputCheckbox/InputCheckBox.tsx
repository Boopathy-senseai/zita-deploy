import classNames from 'classnames/bind';
import { ChangeEventHandler } from 'react';
import { isEmpty } from '../helper';
import Text, { textColors } from '../Text/Text';
import styles from './inputcheckbox.module.css';

const cx = classNames.bind(styles);

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked?: boolean;
  name?: string;
  id?: string;
  value?: string;
  disabled?: boolean;
  label?: string;
  onClick?: any;
  color?: textColors;
  lableBold?: boolean;
  props?: any;
  className?:string
};
const InputCheckBox = ({
  onChange,
  checked,
  name,
  id,
  value,
  disabled,
  label,
  onClick,
  color,
  lableBold,
  props,
  className
}: Props) => {
  return (
    <label className={cx('checkboxStyle', { disabledStyled: disabled })}>
      <input
        disabled={disabled}
        type="checkbox"
        name={name}
        id={id}
        onChange={onChange}
        checked={checked}
        value={value}
        onClick={onClick}
        {...props}
        className={className}
      />
      {isEmpty(label) && (
        <span className={cx('checkBoxTick', 'withOutLabel')} />
      )}
      {!isEmpty(label) && (
        <Text
          color={color}
          bold={lableBold}
          className={cx('checkBoxTick', 'withLabel')}
        >
          {label}
        </Text>
      )}
    </label>
  );
};

export default InputCheckBox;
