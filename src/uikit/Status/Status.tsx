import { memo } from 'react';
import classNames from 'classnames/bind';
import Text, { textSize, textTransform } from '../Text/Text';
import styles from './status.module.css';

const cx = classNames.bind(styles);

// Status Types
export type statusColor = 'black' | 'gray' | 'success' | 'error' | 'yellow' ;

type Props = {
  color?: statusColor;
  label: string;
  className?: string;
  size?: textSize;
  transform?: textTransform;
};

const Status = (props: Props) => {
  const { color, label, className, size, transform } = props;
  const statusClassName = cx(
    {
      [`border-${color}`]: color,
    },
    className,
  );
  return (
    <Text
      transform={transform}
      className={statusClassName}
      align="center"
      size={size}
      color={color}
    >
      {label}
    </Text>
  );
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  color:'black',
};

Status.defaultProps = defaultProps;

export default memo(Status);
