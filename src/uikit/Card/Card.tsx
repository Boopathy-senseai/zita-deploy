import { ReactNode } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import styles from './card.module.css';

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  height?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  id?: string;
  onClick?: (arg: any) => void;
};
const Card = ({
  children,
  className,
  disabled,
  height,
  marginLeft,
  marginRight,
  id,
  onClick,
}: Props) => {
  const cardClassName = cx('commonStyle', className, disabled);
  return (
    <Flex
      id={id}
      columnFlex
      height={height}
      className={cardClassName}
      disabled={disabled}
      marginLeft={marginLeft}
      marginRight={marginRight}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};

export default Card;
