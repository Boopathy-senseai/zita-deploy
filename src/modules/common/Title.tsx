import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './title.module.css';

const cx = classNames.bind(styles);
type Props = {
  title: string;
  des?: string;
};
const Title = ({ title, des }: Props) => {
  return (
    <Flex column className={cx('titleConatiner')}>
      <Text type={'titleLarge'}>{title}</Text>
      {des && (
        <Text color={'gray'} className={styles.desStyle} size={12}>
          {des}
        </Text>
      )}
    </Flex>
  );
};

export default Title;
