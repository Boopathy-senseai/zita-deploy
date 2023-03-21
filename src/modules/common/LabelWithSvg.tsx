import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './labelwithsvg.module.css';
const cx = classNames.bind(styles);

type Props = {
  svg: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  disable?: boolean;
};

const LabelWithSvg = ({ svg, label, onClick, className, disable }: Props) => {
  return (
    <Flex row center onClick={onClick} className={cx(className,{disable})}>
      {svg}
      <Text
        size={12}
        bold
        color={disable ? 'gray' : 'link'}
        className={styles.textStyle}
      >
        {label}
      </Text>
    </Flex>
  );
};

export default LabelWithSvg;
