import React from "react";
import classNames from 'classnames/bind';
import { Row } from "react-bootstrap";
import { Flex } from "../uikit";
import styles from './totalcount.module.css';



const cx = classNames.bind(styles);

type Props = {
    name: string;
    numbers: any;
    click?:boolean;
  };

const Totalcount =({
    name,
    numbers,
    click,
  }: Props)=>{
return(
    <>
        <Flex  row >
        <Flex className={cx('name')} style={{fontWeight:click?'bold':null,cursor:click?'pointer':null,color:click?'#581845':null}}> {name}:</Flex>
        <Flex className={cx('count')} style={{cursor:click?'pointer':null,color:click?'#581845':null}}>{numbers}</Flex> 
        </Flex>
    </>
 );
}
export default Totalcount;