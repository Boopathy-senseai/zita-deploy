import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { lowerCase } from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import { Obj } from './candidateProfileTypes';
import styles from './professionalskillscard.module.css';
import UpdateProfessionalSkillsEdit from './UpdateProfessionalSkillsEdit';

type Props = {
  obj?: Obj;
  isProfileView?: boolean;
};
const ProfessionalSkillsCard = ({ obj, isProfileView }: Props) => {
  const [isSkillsEdit, setSkillsEdit] = useState(false);
  const [isAddText, setAddText] = useState('Update');
  const handleOpenSkillEdit = () => {
    setSkillsEdit(true);
  };

  const checkBox =
    (obj && Array.isArray(obj?.skills) && obj?.skills?.length !== 0) ||
    (obj && Array.isArray(obj?.soft_skills) && obj?.soft_skills.length !== 0);
    
  return (
    <>
      {!isProfileView && (
        <UpdateProfessionalSkillsEdit
          open={isSkillsEdit}
          cancel={() => setSkillsEdit(false)}
          obj={obj}
          isAddText={isAddText}
        />
      )}

      <Card className={styles.overAll}>
        <Flex>
          {!isProfileView && (
            <>
              {checkBox && (
                <div
                  className={styles.svgEdit}
                  onClick={() => {
                    handleOpenSkillEdit();
                    setAddText('Update');
                  }}
                  tabIndex={-1}
                  role="button"
                  onKeyDown={() => {}}
                >
                  <SvgBoxEdit fill={PRIMARY} />
                </div>
              )}
            </>
          )}
          {obj && obj?.skills?.length !== 0 && (
            <>
              <Text bold className={styles.techText}>
                Technical Skills
              </Text>
              <Flex row wrap>
                {obj &&
                  obj?.skills?.map((techList, index) => (
                    <div key={techList + index} className={styles.techDiv}>
                      <Status label={lowerCase(techList)} />
                    </div>
                  ))}
              </Flex>
            </>
          )}

          {Array.isArray(obj?.soft_skills) && (
            <>
              <Text bold className={styles.softText}>
                Soft Skills
              </Text>
              <Flex row wrap>
                {obj?.soft_skills?.map((techList, index) => (
                  <div key={techList + index} className={styles.techDiv}>
                    <Status label={lowerCase(techList)} />
                  </div>
                ))}
              </Flex>
            </>
          )}
        </Flex>
        {obj &&
          Array.isArray(obj?.skills) &&
          obj?.skills?.length === 0 &&
          obj &&
          Array.isArray(obj?.soft_skills) &&
          obj?.soft_skills.length === 0 && (
            <Flex center middle className={styles.noValues}>
              <div
                className={styles.svgAdd}
                onClick={() => {
                  handleOpenSkillEdit();
                  setAddText('Add');
                }}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgRoundAdd fill={PRIMARY} />
              </div>
              <Text size={16} bold>
                Add Technical Skills
              </Text>
            </Flex>
          )}
      </Card>
    </>
  );
};

export default ProfessionalSkillsCard;
