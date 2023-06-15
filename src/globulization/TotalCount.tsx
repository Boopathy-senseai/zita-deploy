import React from "react";
import classNames from 'classnames/bind';
import { Row } from "react-bootstrap";
import { Flex } from "../uikit";
import styles from './totalcount.module.css';



const cx = classNames.bind(styles);

type Props = {
    name: string;
    numbers: number;
  };

const Totalcount =({
    name,
    numbers,
  }: Props)=>{
return(
    <>
        <Flex  row >
        <Flex className={cx('name')}> {name}:</Flex>
        <Flex className={cx('count')}>{numbers}</Flex> 
        </Flex>
    </>
 );
}
export default Totalcount;