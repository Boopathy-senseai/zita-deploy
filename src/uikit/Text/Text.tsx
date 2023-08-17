import { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames/bind';
import styles from './text.module.css';

const cx = classNames.bind(styles);
export type textSize =
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 18
  | 20
  | 22
  | 24
  | 26
  | 28
  | 30
  | 32
  | 34
  | 36
  | 38
  | 40
  | 42
  | 44
  | 46
  | 48
  | 50;

export type textColors =
  | 'black'
  | 'white'
  | 'error'
  | 'success'
  | 'theme'
  | 'link'
  | 'gray'
  | 'primary'
  | 'info'
  | 'black_1'
  | 'blue'
  | 'warning'
  | 'yellow'
  | 'black2'
  | 'disabled';

export type textTransform =
  | 'capitalize'
  | 'lowercase'
  | 'uppercase'
  | 'initial';
export type textStyle = 'underline' | 'italic' | 'ellipsis';
export type Props = {
  children: ReactNode;
  size?: textSize;
  color?: textColors;
  className?: String;
  align?: 'center' | 'right' | 'left' | 'justify';
  bold?: boolean;
  style?: CSSProperties;
  transform?: textTransform;
  textStyle?: textStyle;
  title?: string;
  type?: 'titleLarge' | 'titleMedium' | 'titleSmall';
  // onClick?: () => void;
  onClick?: any;
  id?: string;
  tag: any;
  underLine?: boolean;
};

const Text = ({
  children,
  size,
  className,
  bold,
  align,
  color,
  style,
  transform,
  textStyle,
  title,
  type,
  onClick,
  id,
  tag: Element,
  underLine,
}: Props) => {
  const textClassName = cx(
    {
      [`text-${size}`]: size,
      bold,
      [`textAlign-${align}`]: align,
      [`textColor-${color}`]: color,
      [`transform-${transform}`]: transform,
      [`textStyles-${textStyle}`]: textStyle,
      [`type-${type}`]: type,
      underLine,
    },
    className,
  );
  return (
    <Element
      id={id}
      onClick={onClick}
      style={style}
      className={textClassName}
      title={title}
    >
      {children}
    </Element>
  );
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  size: 13,
  color: 'primary',
  tag: 'span',
};

Text.defaultProps = defaultProps;
export default Text;
