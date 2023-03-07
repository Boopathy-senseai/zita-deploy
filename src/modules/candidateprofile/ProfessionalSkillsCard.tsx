import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
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
};
const ProfessionalSkillsCard = ({ obj }: Props) => {
  const [isSkillsEdit, setSkillsEdit] = useState(false);
  const handleOpenSkillEdit = () => {
    setSkillsEdit(true);
  };
  return (
    <>
      <UpdateProfessionalSkillsEdit
        open={isSkillsEdit}
        cancel={() => setSkillsEdit(false)}
        obj={obj}
      />
      <Card className={styles.overAll}>
        <Flex>
          <div
            className={styles.svgEdit}
            onClick={handleOpenSkillEdit}
            tabIndex={-1}
            role="button"
            onKeyDown={() => {}}
          >
            <SvgBoxEdit fill={PRIMARY} />
          </div>
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
      </Card>
    </>
  );
};

export default ProfessionalSkillsCard;
