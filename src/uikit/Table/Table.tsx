import classNames from 'classnames/bind';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';
import Rows, { ColumnItem } from './Rows';
import TableTitle from './TableTitle';
import styles from './table.module.css';

const cx = classNames.bind(styles);

type DefaultProps = {
  columns: ColumnItem[];
  dataSource: { [key: string]: any }[];
  border: 'outline' | 'overAll' | 'normal';
};

const defaultProps: DefaultProps = {
  columns: [],
  dataSource: [],
  border: 'normal',
};
type Props = {
  isLoader?: boolean;
  empty?: string;
  scrollHeight?: number;
} & typeof defaultProps;

const Table = ({
  dataSource,
  columns,
  isLoader,
  empty,
  border,
  scrollHeight,
}: Props) => {
  if (columns.length === 0) {
    return null;
  }

  return (
    <Flex className={cx({ [`overAll-${border}`]: border })}>
      <TableTitle columns={columns} dataSource={dataSource} />
      <Flex className={cx('overFlowLoader')}>
        {dataSource.length === 0 && (
          <Text align="center" color="gray" className={styles.emptyText}>
            {empty}
          </Text>
        )}
        {isLoader && (
          <div className={styles.loader}>
            <Loader size="medium" withOutOverlay />
          </div>
        )}
      </Flex>

      <div
        style={{
          maxHeight: scrollHeight ? window.innerHeight - scrollHeight : '100%',
        }}
        className={cx({rowScroll:scrollHeight})}
      >
        {dataSource.map((item, index) => (
          <Rows
            key={index}
            item={item}
            columns={columns}
            rowIndex={index}
            border={border}
            scrollHeight={scrollHeight}
          />
        ))}
      </div>
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
