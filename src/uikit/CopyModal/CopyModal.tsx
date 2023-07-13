
 

import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import styles from './copy.module.css';

const cx = classNames.bind(styles);

type Props = {
  open?: boolean;
  children: ReactNode;
  onClose?: () => void;
};
const CopyModal = ({ open, children, onClose }: Props) => {
  return open ? (
    <Flex onClick={onClose} className={cx('container')}>
      <Flex>{children}</Flex>
    </Flex>
  ) : null;
};

export default CopyModal;