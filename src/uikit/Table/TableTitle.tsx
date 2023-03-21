import { memo, ReactNode } from 'react';
import classNames from 'classnames/bind';
import Flex from '../Flex/Flex';
import TitleColumns from './TitleColumns';
import styles from './tabletitle.module.css';

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
  dataSource: { [key: string]: any }[];
};

const defaultTitleProps: DefaultTitleProps = {
  columns: [],
  dataSource: [],
};

const Title = ({ columns }: typeof defaultTitleProps) => (
  <Flex center row middle className={cx('titleBorder')}>
    <TitleColumns columns={columns} />
  </Flex>
);

Title.defaultProps = defaultTitleProps;

export default memo(Title);
