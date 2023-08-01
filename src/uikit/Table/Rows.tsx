import { ReactNode, memo } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import RowColumns from './RowColumns'; // eslint-disable-line
import styles from './rows.module.css';

const cx = classNames.bind(styles);
export interface ColumnItem {
  title: string | ReactNode;
  dataIndex: string;
  data?:[]
  key?: string;
  renderFilter?: Function;
  flex?: number;
  width?:any;
  render?: (
    a: any,
    rowData: any,
    rowIndex: number,
    columnIndex: number,
  ) => ReactNode;
  renderTitle?: (a: string) => ReactNode;
}

type RowsProps = {
  item: { [key: string]: string | number | ReactNode };
  columns: ColumnItem[];
  rowIndex: number;
  border: string;
  scrollHeight?: number;
  rowFocusIndex?: number;
};

const Rows = ({
  item,
  columns,
  rowIndex,
  border,
  scrollHeight,
  rowFocusIndex,
}: RowsProps) => {
  return (
    <Flex
      row
      center
      className={cx('row',{
        [`rowBorder-${border}`]: border,
        rowFocus: rowIndex === rowFocusIndex,
      })}
    >
      <RowColumns
        columns={columns}
        item={item}
        rowIndex={rowIndex}
        scrollHeight={scrollHeight}
      />
    </Flex>
  );
};

export default memo(Rows);
