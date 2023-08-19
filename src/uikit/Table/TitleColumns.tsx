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
    {console.log("rowwww",columns,length,value)}
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
            style={{borderRight:'none !important'}}
            key={column.dataIndex}
            className={value===column.dataIndex?cx('titleTextStyle1'):cx('titleTextStyle')}
            middle={center}
            
          >
          {console.log("laast indexxxx",renderTitle,column.dataIndex)}
        
            {renderTitle ? (
              <Text style={{color:'#555555'}}>
              {renderTitle(column.title as string)}
              </Text>
            ) : (
              <Text  bold style={{color:'#666666',fontSize:'13px'}}>
                {column.title as string}
              </Text>
            )}
            <Text style={{color:'#555555'}}>
            {typeof renderFilter === 'function' && renderFilter(columnRestData)}
            </Text>
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