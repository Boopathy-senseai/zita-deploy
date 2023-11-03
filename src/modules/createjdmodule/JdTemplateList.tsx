import { useState } from 'react';
import classNames from 'classnames/bind';
import { Card } from 'react-bootstrap';
import SvgAdd from '../../icons/SvgAdd';
import SvgAngle from '../../icons/SvgAngle';
import { GARY_4 } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { HighlightText } from '../../uikit/HighlightText/HighlightText';
import Text from '../../uikit/Text/Text';
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
  update:(val:any)=> void;
  applyfun:(val:any)=>void;
  searchTerm: string;
};

const JdTemplateList = ({
  list,
  setFieldValue,
  hanldeClose,
  searchTerm,
  update,
  applyfun,
}: Props) => {
  const [isCollapse, setCollapse] = useState(false);

  // template copy function
  const handleCopy = () => {
    console.log("zzzz",list)
    const expSplit = list?.experience.split('-').toString();
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

  const select=(val)=>{
   // console.log(val)
   update(val.job_description)
   applyfun(val)
  }

  return (
    <Flex className={styles.listOverAll}>
<Card onClick={()=>select(list)}>
  <Flex className={styles.padding}>
      <Flex row center between >
        <Text bold className={styles.listHeadingStyle}>
          <HighlightText value={list.job_title} higlight={searchTerm} />
        </Text>
        <Flex row center>
          <div
            style={{ marginRight: 16 }}
            onClick={() => setCollapse(!isCollapse)
            }
            className="pointer"
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgAngle width={12} height={12} fill='#581845' up={isCollapse} />
          </div>
          <div
            className="pointer"
            onClick={handleCopy}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgAdd width={12} height={12} fill='#581845' />
          </div>
        </Flex>
      </Flex>
      {!isCollapse ? (
        <div
          className={cx('trimStyle')}
          dangerouslySetInnerHTML={{ __html: list.job_description }}
        />
      ) : (''
        // <div className={cx('normalStyle')} dangerouslySetInnerHTML={{ __html: list.job_description }} />
      )}
      </Flex>
      </Card>
    </Flex>
  );
};

export default JdTemplateList;
