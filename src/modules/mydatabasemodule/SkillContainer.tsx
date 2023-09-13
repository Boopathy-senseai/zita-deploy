import { useEffect, useState } from 'react';
import { minWidth } from '@mui/system';
import classNames from 'classnames/bind';
import SvgNotesOne from '../../icons/SvgNotesOne';
import SvgShowallmatching from '../../icons/SvgShowallmatching';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { GARY_4, LINK, PRIMARY } from '../../uikit/Colors/colors';
import { notSpecified, lowerCase, isEmpty } from '../../uikit/helper';
import LabelWithSvg from '../common/LabelWithSvg';
import { DataEntity } from './myDataBaseTypes';
import styles from './skillcontainer.module.css';
const cx = classNames.bind(styles);

type Props = {
  dataList: DataEntity;
  notesClick: () => void;
  showMatchClick: () => void;
};

const SkillContainer = ({ dataList, notesClick, showMatchClick }: Props) => {
const sidebar=sessionStorage.getItem("EmpToggle");
const size=sidebar==="1"

return (
    <Flex className={styles.skillFlex}>
      <Text
        color="black_1"
        className={styles.skillTextStyle}
        title={
          isEmpty (dataList.skills) 
          ? `Skills: ${notSpecified(lowerCase(dataList.skills.replace(/,/g, ', ')))}`
          : `Skills: ${(lowerCase(dataList.skills.replace(/,/g, ', ')))}`
        }
        size={11}
      >
        <Text color="black_1" bold size={11} style={{ maxWidth: '90%'}}>
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
          onClick={isEmpty(dataList.applicant) ? showMatchClick : null}
          className={styles.showallmatching}
          style={{ cursor: isEmpty(dataList.applicant) ? 'pointer' : 'default' }}
          >
          <Text
            color={isEmpty(dataList.applicant) ? 'link' : 'gray'}
            size={11}
            >
              Show All Matching Jobs
              </Text> 
          </Flex>
      </Flex>
    </Flex>
  );
};
export default SkillContainer;
