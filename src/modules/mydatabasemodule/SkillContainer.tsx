import SvgNotesOne from '../../icons/SvgNotesOne';
import SvgShowallmatching from '../../icons/SvgShowallmatching';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { GARY_4, LINK } from '../../uikit/Colors/colors';
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
  return (
    <Flex width={'70%'} style={{marginLeft: '-14%',marginTop: '15%'}} className={styles.skillFlex}>
      <Text
        color="gray"
        className={styles.skillTextStyle}
        title={dataList.skills}
        size={12}
      >
        <Text color="gray" bold size={12}>
          Skills:{' '}
        </Text>
        {notSpecified(lowerCase(dataList.skills.replace(/,/g, ', ')))}
      </Text>
      <Flex row center className={styles.labelSvg}>
        <LabelWithSvg
          label="Show All Matching Jobs"
          svg={
            <SvgShowallmatching
              height={14}
              width={14}
              fill={!isEmpty(dataList.applicant) ? GARY_4 : LINK}
            />
          }
          onClick={showMatchClick}
          className="pointer"
          disable={!isEmpty(dataList.applicant)}
        />
        <LabelWithSvg
          label="Notes"
          svg={
            <SvgNotesOne
              height={14}
              width={14}
              fill={!isEmpty(dataList.applicant) ? GARY_4 : LINK}
            />
          }
          className={styles.notes}
          onClick={notesClick}
          disable={!isEmpty(dataList.applicant)}
        />
      </Flex>
    </Flex>
  );
};

export default SkillContainer;
