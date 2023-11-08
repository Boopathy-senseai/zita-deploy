import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Card } from 'react-bootstrap';
import SvgAdd from '../../icons/SvgAdd';
import SvgAngle from '../../icons/SvgAngle';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { HighlightText } from '../../uikit/HighlightText/HighlightText';
import Text from '../../uikit/Text/Text';
import SvgSelected from '../../icons/SvgSelected';
import SvgNotselected from '../../icons/SvgNotselected';
import styles from './jdtemplatelist.module.css';
import { JDTemplates } from './createJdTypes';



const cx = classNames.bind(styles);

type Props = {
  list: JDTemplates;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  hanldeClose: () => void;
  valuelist:any;
  update:(val: any | null,val2:any) => void;
  indextick:any;
  applyfun:(val:any)=>void;
  index:any;
  searchTerm: string;
};

const JdTemplateList = ({
  list,
  setFieldValue,
  hanldeClose,
  searchTerm,
  update,
  applyfun,
  valuelist,
  indextick,
  index
}: Props) => {
  const [isCollapse, setCollapse] = useState(false);
  
  // template copy function
  const handleCopy = () => {
    console.log("zzzz",list)
    const expSplit = list?.experience?.split('-').toString();
    if (expSplit?.length !== 0) {
      setFieldValue('minimumExperience', expSplit?.charAt(0));
    }
    if (expSplit?.length === 3) {
      setFieldValue('maximumExperience', expSplit?.charAt(2));
    }
    setFieldValue('jobTitle', list?.job_title);
    setFieldValue('jobDescription', list?.job_description);
 if(list?.skills!==null){
 var d =[]
   var a = list?.skills.split(",")
   
   a.map((val)=>{
    var c ={"label":val ,"value": val}
   d.push(c)
   
   })
  
   setFieldValue('nonDsSkill',d);
  }
    hanldeClose();
    setCollapse(false);
  };
  const select = (val,val2) => {
   update(val.job_description,val2);
    applyfun(val);
  };

  return (
    <Flex className={styles.listOverAll}>
<Flex className={indextick !==null?(index===indextick?(styles.cardstylehilight):(styles.cardstyle)):(styles.cardstyle)}>
  <Flex className={styles.padding} >
    <Flex className={styles.iconspace}>
      {indextick !==null?(<>
        {index===indextick?(  <SvgSelected onClick={()=>select(list,index)} className={styles.pointer}></SvgSelected>):( <SvgNotselected onClick={()=>select(list,index)} className={styles.pointer}></SvgNotselected>)}
     </>
      ):( <SvgNotselected onClick={()=>select(list,index)} className={styles.pointer}></SvgNotselected>)}
    
    </Flex>
    <Flex onClick={()=>select(list,index)} >
      <Flex row center between >
        <Text bold className={styles.listHeadingStyle}>
          <HighlightText value={list.job_title} higlight={searchTerm} />
        </Text>
      </Flex>
    
      <div
          className={styles.trimStyle}
          dangerouslySetInnerHTML={{ __html: list.job_description }}
        />
        </Flex>
      </Flex>
      </Flex>
    </Flex>
  );
};

export default JdTemplateList;
