import { memo } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import { isEmpty } from '../helper';
import Text from '../Text/Text';
import styles from './labelwarpper.module.css';
//import { defaultDecoder } from 'qs';

const cx = classNames.bind(styles);
type Props = {
  required?: boolean;
  children?: import('react').ReactNode;
  label?: string;
  bold?: boolean;
  color?: any;
  size?: any;
};

const LabelWrapper = ({
  required,
  children,
  label,
  bold,
  color = 'primary',
  size,
}: Props) => {
  return !isEmpty(label) ? (
    <Flex className={cx('overAll')}>
      <Flex row className={cx('labelConatiner')}>
        <Text color={color} className={cx('labelText')} bold={bold} size={size}>
          {label}
        </Text>
        {required && <Text color="theme">*</Text>}
      </Flex>
      {children}
    </Flex>
  ) : (
    <>{children}</>
  );
};

export default memo(
  LabelWrapper,
  (prevProps: Props, nextProps: Props) =>
    prevProps.children === nextProps.children,
);
