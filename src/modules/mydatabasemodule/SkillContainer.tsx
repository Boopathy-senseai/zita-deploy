import { useEffect, useState } from 'react';
import SvgNotesOne from '../../icons/SvgNotesOne';
import SvgShowallmatching from '../../icons/SvgShowallmatching';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { GARY_4, LINK, PRIMARY } from '../../uikit/Colors/colors';
import { notSpecified, lowerCase, isEmpty } from '../../uikit/helper';
import LabelWithSvg from '../common/LabelWithSvg';
import { DataEntity } from './myDataBaseTypes';
import styles from './skillcontainer.module.css';

type Props = {
  dataList: DataEntity;
  notesClick: () => void;
  showMatchClick: () => void;
};

const SkillContainer = ({ dataList, notesClick, showMatchClick }: Props) => {
const sidebar=sessionStorage.getItem("EmpToggle");
const size=sidebar==="1"

return (
    <Flex style={{top: !size?  "16%" : "-35%"}} className={styles.skillFlex}>
      <Text
        color="black_1"
        className={styles.skillTextStyle}
        style={{marginTop: !size?  "-2%" : "10%"}} 
        title={`Skills: ${dataList.skills}`}
        size={11}
      >
        <Text color="black_1" bold size={11}>
          Skills:{' '}
        </Text>
        {notSpecified(lowerCase(dataList.skills.replace(/,/g, ', ')))}
      </Text>
      <Flex row center className={styles.labelSvg} style={{top: !size?  "5%" : "-1%"}}>
      <LabelWithSvg
          label="Notes"
          svg={
            <SvgNotesOne
              height={14}
              width={14}
              fill={!isEmpty(dataList.applicant) ? GARY_4 : PRIMARY}
            />
          }
          className={styles.notes}
          onClick={notesClick}
          disable={!isEmpty(dataList.applicant)}
        /> 
        <Flex style={{width:'12px'}}>

        </Flex>       
        <Flex
          onClick={showMatchClick}
          className={styles.showallmatching}
          >
          Show All Matching Jobs
          </Flex>
      </Flex>
    </Flex>
  );
};
export default SkillContainer;
