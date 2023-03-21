import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import styles from './drawer.module.css';

const cx = classNames.bind(styles);

type Props = {
  open?: boolean;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
};
const Drawer = ({ open, children, onClose, className }: Props) => {
  return open ? (
    <Flex onClick={onClose} className={cx('container', { className })}>
      <Flex>{children}</Flex>
    </Flex>
  ) : null;
};

export default Drawer;
