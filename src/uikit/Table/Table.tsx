import classNames from 'classnames/bind';
import Loader from '../Loader/Loader';
import { isEmpty } from '../helper';
import Text from '../Text/Text';
import Flex from '../Flex/Flex';
import Pangination from '../Pagination/Pangination';
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
  emptyHeight?: number;
  fixedScrollHeight?: boolean;
  rowFocusIndex?: number;
  pageCount?:any;
  pageNumber?:any;
  handleSetPagination?:any;
  isCandiTableLoader?:any;
  isPageTab ?:any;
  } & typeof defaultProps;

const Table = ({
  dataSource,
  columns,
  isLoader,
  empty,
  border,
  scrollHeight,
  emptyHeight,
  fixedScrollHeight,
  rowFocusIndex,
  pageCount,
  pageNumber,
  handleSetPagination,
  isCandiTableLoader,
  isPageTab ,
}: Props) => {
  if (columns.length === 0) {
    return null;
  }

  return (
    <Flex className={cx({ [`overAll-${border}`]: border })}>
      <TableTitle columns={columns} dataSource={dataSource} />
      <Flex center middle className={cx('overFlowLoader')}>
        {dataSource.length === 0 && !isEmpty(empty) && (
          <Flex center middle height={emptyHeight}>
            <Text
              align="center"
              color="gray"
              className={cx({
                emptyTextOne: fixedScrollHeight,
                emptyText: !fixedScrollHeight,
              })}
            >
              {empty}
            </Text>
          </Flex>
        )}
        {isLoader && (
          <div className={styles.loader}>
            <Loader size="medium" withOutOverlay />
          </div>
        )}
      </Flex>
      {fixedScrollHeight ? (
        <div
          className={cx({ rowScroll: scrollHeight })}
        >
          {dataSource.map((item, index) => (
            <Rows
              key={index}
              item={item}
              columns={columns}
              rowIndex={index}
              border={border}
              scrollHeight={scrollHeight}
              rowFocusIndex={rowFocusIndex}
            />
          ))}
        </div>
      ) : (
        <div  
        style={{overflow:'scroll',maxHeight:window.innerHeight-300}}
          className={cx({ rowScroll: scrollHeight })}
        >
          {dataSource.map((item, index) => (
            <Rows
              key={index}
              item={item}
              columns={columns}
              rowIndex={index}
              border={border}
              scrollHeight={scrollHeight}
              rowFocusIndex={rowFocusIndex}
            />
          ))}
          {!isCandiTableLoader && isPageTab > 10 && (
            <Flex middle className={styles.pagination}>
              <Pangination
                maxPages={pageCount - 1}
                currentPage={pageNumber}
                setCurrentPage={handleSetPagination}
              />
            </Flex>
          )}
        </div>
      )}
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
