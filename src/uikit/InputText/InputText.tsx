import classNames from 'classnames/bind';
import { CSSProperties, useState, forwardRef } from 'react';
import Flex from '../Flex/Flex';
import LabelWrapper from '../Label/LabelWrapper';
import Text, { textColors } from '../Text/Text';
import { isEmpty } from '../helper';
import styles from './inputtext.module.css';

const cx = classNames.bind(styles);

type keyBoardProps =
  | 'button'
  | 'text'
  | 'tel'
  | 'search'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month';
type Props = {
  placeholder?: string;
  className?: string;
  color?: textColors;
  disabled?: boolean;
  onChange?: (a: any) => void;
  onPaste?: (a: any) => void;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
  onKeyPress?: (a: any) => void;
  keyboardType?: keyBoardProps;
  align?: 'center' | 'right' | 'left';
  error?: boolean;
  required?: boolean;
  label?: string;
  errorMessage?: string;
  bold?: boolean;
  onFocus?: (arg: any) => any;
  onBlur?: (arg: any) => any;
  inputConatinerClass?: string;
  value?: string;
  id?: string;
  size?: 11 | 12 | 13 | 14 | 16;
  lineInput?: boolean;
  actionRight?: Function;
  actionLeft?: Function;
  style?: CSSProperties;
  textarea?: boolean;
  labelSize?: any;
  labelColor?: string;
  labelBold?: boolean;
  noBorder?: boolean;
  autoComplete?: string;
  name?: string;
  onPasteCapture?: any;
};
const InputText = (
  {
    placeholder,
    className,
    color,
    disabled,
    onChange,
    autoFocus,
    maxLength,
    minLength,
    onKeyPress,
    keyboardType,
    align,
    error,
    required,
    label,
    errorMessage,
    bold,
    inputConatinerClass,
    value,
    onBlur,
    onFocus,
    id,
    size,
    labelColor,
    lineInput,
    actionRight,
    actionLeft,
    labelSize,
    style,
    textarea,
    labelBold,
    noBorder,
    autoComplete,
    name,
    onPaste,
    onPasteCapture,
  }: Props,
  ref: any,
) => {
  const [isErrorFocus, setErrorFocus] = useState(false);
  const inputClassName = cx(
    {
      [`color-${color}`]: color,
      [`align-${align}`]: align,
      [`error`]: error && isEmpty(value),
      [`bold`]: bold,
      [`size-${size}`]: size,
      lineInput,
      noBorder,
    },
    className,
    'inputCommonStyle',
  );
  const handleFocus = (e: any) => {
    setErrorFocus(true);
    if (typeof onFocus === 'function') {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setErrorFocus(false);
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  return (
    <Flex className={inputConatinerClass}>
      <LabelWrapper
        required={required}
        label={label}
        bold={labelBold}
        //color={labelColor}
        size={labelSize}
      >
        <Flex className={styles.inputFlexConatiner}>
          {textarea ? (
            <textarea
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder}
              className={inputClassName}
              autoFocus={autoFocus} // eslint-disable-line
              maxLength={maxLength}
              minLength={minLength}
              onKeyPress={onKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              id={id}
              style={style}
              ref={ref}
              autoComplete={autoComplete}
              name={name}
              onPaste={onPaste}
            />
          ) : (
            <input
              onPaste={onPaste}
              onChange={onChange}
              disabled={disabled}
              type={keyboardType}
              placeholder={placeholder}
              className={inputClassName}
              autoFocus={autoFocus} // eslint-disable-line
              maxLength={maxLength}
              minLength={minLength}
              onKeyPress={onKeyPress}
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={value}
              id={id}
              style={style}
              ref={ref}
              autoComplete={autoComplete}
              name={name}
              onPasteCapture={onPasteCapture}
            />
          )}
          {typeof actionRight === 'function' && (
            <div className={styles.actionRightStyle}>{actionRight()}</div>
          )}
          {typeof actionLeft === 'function' && (
            <div className={styles.actionLeftStyle}>{actionLeft()}</div>
          )}
          {!isEmpty(errorMessage) && error && (
            <Text
              size={12}
              color={'error'}
              className={cx('errorMessageStyle', { errorFocus: isErrorFocus })}
            >
              {errorMessage}
            </Text>
          )}
        </Flex>
      </LabelWrapper>
    </Flex>
  );
};

export default forwardRef(InputText);
