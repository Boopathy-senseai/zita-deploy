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
  isscroll?:boolean;
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
  isscroll,
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
  const url = window.location.href;
  const test = url.includes('reports')||url.includes('jobs')||url.includes('job_view');
  const test1 = url.includes('jobs');
  return (
    <Flex className={cx({ [`overAll-${border}`]: border })}>
      <TableTitle columns={columns} dataSource={dataSource} />
      <Flex center middle className={cx('overFlowLoader')}>
        {dataSource.length === 0 && !isEmpty(empty) && (
          <Flex center middle height={emptyHeight}>
            <Text
              align="center"
              color="gray"
              className={isscroll===true && dataSource.length === 0 ?(styles.candidateempty):( cx({
                emptyTextOne: fixedScrollHeight,
                emptyText: !fixedScrollHeight,
              }))}
            
              style={{padding:test1?'70px 0':(''),minHeight:test1?('0px'):('')}}
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
        <>{dataSource.length !== 0 &&
        <Flex  
        style={{overflow:test?(''):'scroll',display:'flex',height:test?(''):window.innerHeight-300}}
         
         // className={cx({ rowScroll: scrollHeight })}
       className={isscroll===true?(styles.rowScroll):("")}
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
        </Flex>}</>
      )}
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
