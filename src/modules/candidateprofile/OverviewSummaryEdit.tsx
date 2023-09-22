import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { lowerCase } from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import { SvgEdit } from '../../icons';
import { Obj } from './candidateProfileTypes';
import styles from './OverviewSummaryEdit.module.css';
import UpdateProfessionalSkillsEdit from './UpdateProfessionalSkillsEdit';
import UpdateOverviewSummaryEdit from './OverviewSummaryUpdate';

type Props = {
  obj?: Obj;
  isProfileView?: boolean;
};
const OverViewSummary = ({ obj, isProfileView }: Props) => {
  const [isOverviewResumeEdit, setOverviewResumeEdit] = useState(false);
  const [isAddText, setAddText] = useState('Update');
  const handleOpenOverviewEdit = () => {
    setOverviewResumeEdit(true);
  };

  return (
    <>
      {!isProfileView && (
        <UpdateOverviewSummaryEdit
          open={isOverviewResumeEdit}
          cancel={() => setOverviewResumeEdit(false)}
          obj={obj}
         
        />
      )}

      <Card className={styles.overAll}>
        <Flex>
          {!isProfileView && (
            <>
              <div
                className={styles.svgEdit}
                onClick={() => {
                  handleOpenOverviewEdit();
                  setAddText('Update');
                }}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgEdit fill={PRIMARY} width={14} height={14} />
              </div>
            </>
          )}
        </Flex>
      </Card>
    </>
  );
};

export default OverViewSummary;
