import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import styles from './flex.module.css';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  row?: boolean;
  column?: boolean;
  className?: string;
  between?: boolean;
  around?: boolean;
  reverse?: boolean;
  columnReverse?: boolean;
  start?: boolean;
  end?: boolean;
  top?: boolean;
  center?: boolean;
  middle?: boolean;
  bottom?: boolean;
  wrap?: boolean;
  noWrap?: boolean;
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  disabled?: boolean;
  flex?: number;
  title?: string;
  width?: number | string;
  id?: string;
  height?: number | string;
  columnFlex?: boolean;
  ref?: any;
  backgroundColor?: string;
  maxHeight?: string | number;
  minWidth?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
};

const Flex = ({
  children,
  column,
  className,
  center,
  row,
  between,
  around,
  top,
  bottom,
  columnReverse,
  reverse,
  start,
  end,
  wrap,
  noWrap,
  middle,
  onClick,
  onBlur,
  disabled,
  flex,
  title,
  width,
  id,
  height,
  columnFlex,
  ref,
  backgroundColor,
  maxHeight,
  minWidth,
  marginLeft,
  marginRight,
}: Props) => {
  const flexClassName = cx(
    'commonStyle',
    {
      row,
      center,
      column,
      between,
      around,
      top,
      bottom,
      columnReverse,
      reverse,
      start,
      end,
      wrap,
      noWrap,
      middle,
      disabled,
      columnFlex,
    },
    className,
  );
  return (
    <div
      tabIndex={-1}
      role={'button'}
      onKeyPress={() => {}}
      ref={ref}
      id={id}
      title={title}
      onBlur={onBlur}
      onClick={onClick}
      style={{
        flex,
        width,
        height,
        backgroundColor,
        maxHeight,
        minWidth,
        marginLeft,
        marginRight,
      }}
      className={flexClassName}
    >
      {children}
    </div>
  );
};

const defaultProps = {
  column: true,
};

Flex.defaultProps = defaultProps;
export default Flex;
