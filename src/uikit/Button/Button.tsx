import classNames from 'classnames/bind';
import Text, { textSize as textSizeType } from '../Text/Text';
import styles from './button.module.css';
import { buttonHelper } from './buttonHelper';

const cx = classNames.bind(styles);

export type buttonTypes =
  | 'primary'
  | 'secondary'
  | 'link'
  | 'tertiary'
  | 'success';

type Props = {
  children: import('react').ReactChild;
  types?: buttonTypes;
  className?: string;
  disabled?: boolean;
  onClick?: (arg: any) => void;
  style?: any;
  onKeyDown?: (arg: any) => void;
  textSize?: textSizeType;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  onMouseOver?: () => void;
  onFocus?: () => void;
  onMouseLeave?: () => void;
  width?: string;
};

const Button = ({
  children,
  types,
  className,
  disabled,
  onClick,
  style,
  onKeyDown,
  textSize,
  id,
  type,
  onMouseOver,
  onFocus,
  onMouseLeave,
  width,
}: Props) => {
  const buttonClassName = cx(
    {
      [`buttonTypes-${types}`]: types,
      [`disabled-${types}`]: disabled,
    },
    className,
    'common',
  );

  const { textColor } = buttonHelper(types, disabled);
  return (
    <button
      onMouseOver={onMouseOver}
      onFocus={onFocus}
      onMouseLeave={onMouseLeave}
      id={id}
      type={type}
      onClick={onClick}
      style={{ ...style, width }}
      disabled={disabled}
      className={buttonClassName}
      onKeyDown={onKeyDown}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text size={textSize} color={textColor} bold>
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
  );
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  types: 'primary',
  type: 'button',
};

Button.defaultProps = defaultProps;

export default Button;
