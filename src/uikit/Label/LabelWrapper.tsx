import { memo } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import { isEmpty } from '../helper';
import Text, { textSize } from '../Text/Text';
import styles from './labelwarpper.module.css';

const cx = classNames.bind(styles);
type Props = {
  required?: boolean;
  children?: import('react').ReactNode;
  label?: string;
  bold?: boolean;
  size?: textSize;
};

const LabelWrapper = ({ required, children, label, bold, size }: Props) => {
  return !isEmpty(label) ? (
    <Flex className={cx('overAll')}>
      <Flex row className={cx('labelConatiner')}>
        <Text
          size={size}
          color={'primary'}
          className={cx('labelText')}
          bold={bold}
        >
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
