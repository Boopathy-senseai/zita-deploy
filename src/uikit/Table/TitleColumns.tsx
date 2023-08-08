import classNames from 'classnames/bind';
import { ReactNode } from 'react';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';
import styles from './titlecolumns.module.css';

const cx = classNames.bind(styles);
export interface Item {
  title: string | ReactNode;
  dataIndex: string;
  key?: string;
  renderFilter?: Function;
  flex?: number;
  render?: (
    a: any,
    rowData: any,
    rowIndex: number,
    columnIndex: number,
  ) => ReactNode;
  renderTitle?: (a: string) => ReactNode;
  align?: 'center';
}

type DefaultTitleProps = {
  columns: Item[];
};

const defaultTitleProps: DefaultTitleProps = {
  columns: [],
};

const TitleColumns = ({ columns }: typeof defaultTitleProps) => {
  const length=(columns.length)-1;
  const value=columns[length].dataIndex;
  return (
    <>
      {columns.map((column) => {
        const { renderFilter, renderTitle, ...columnRestData } = column;
        const flex = columnRestData.flex ? columnRestData.flex : 1;
        const center = columnRestData.align === 'center' ? true : false;
        return (
          <Flex
            row
            center
            start
            flex={flex}
            key={column.dataIndex}
            className={value===column.dataIndex?cx('titleTextStyle1'):cx('titleTextStyle')}
            middle={center}
          >
            {renderTitle ? (
              renderTitle(column.title as string)
            ) : (
              <Text  bold style={{color:'#666666',fontSize:'13px'}}>
                {column.title as string}
              </Text>
            )}
            {typeof renderFilter === 'function' && renderFilter(columnRestData)}
          </Flex>
        );
      })}
    </>
  );
};

// export default memo(
//   TitleColumns,
//   (prevProps: Props, nextProps: Props) =>
//     prevProps.columns === nextProps.columns
// );

export default TitleColumns;
