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
import styles from './professionalskillscard.module.css';
import UpdateProfessionalSkillsEdit from './UpdateProfessionalSkillsEdit';

type Props = {
  obj?: Obj;
  isProfileView?: boolean;
  techSkill?: any;
};
const ProfessionalSkillsCard = ({ obj, isProfileView, techSkill }: Props) => {
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
          techSkills={techSkill}
        />
      )} 
      <Card className={styles.overAll}>
        <Flex>
          {!isProfileView && (
            <>
              {/* {checkBox && ( */}
              <div
                className={styles.svgEdit}
                onClick={() => {
                  handleOpenSkillEdit();
                  setAddText( techSkill &&techSkill?.skills?.tech_skill?.length === 0 && 
                    techSkill?.skills?.soft_skill?.length === 0?'Add': 'Update');
                }}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <SvgEdit fill={PRIMARY} width={14} height={14} />
              </div>
              {/* )} */}
            </>
          )}
          <>
            <Text bold className={styles.techText}>
              Technical Skills
            </Text>
            {techSkill &&techSkill?.skills?.tech_skill
              ?.replace(',,', ',')
              .split(',')
              .length === 0||techSkill?.skills?.tech_skill===null ? (
              <Flex row wrap>
                <div>
                  No data available
                </div>
              </Flex>
            ) : (
              <Flex row wrap>
                {techSkill && techSkill?.skills?.tech_skill
                  ?.replace(',,', ',')
                  .split(',')
                  .map((techList, index) => (
                    <div key={techList + index} className={styles.techDiv}>
                      <Status label={lowerCase(techList)} />
                    </div>
                  ))}
              </Flex>
            )}
          </>
          {console.log(techSkill &&techSkill?.skills?.soft_skill
              ?.replace(',,', ',')
              .split(',')
              .length,techSkill.skills
               ,'klr')}
           {techSkill &&techSkill?.skills?.soft_skill?.length !== 0 && ( 
          <>
            <Text bold className={styles.softText}>
              Soft Skills
            </Text>
            {techSkill &&techSkill?.skills?.soft_skill
              ?.replace(',,', ',')
              .split(',')
              .length === 0 ||techSkill?.skills?.soft_skill===null ? (
              <Flex row wrap>
                <div>
                  No data available
                </div>
              </Flex>
            ) : (
            <Flex row wrap>
              {techSkill &&techSkill?.skills?.soft_skill
                ?.replace(',,', ',')
                .split(',')
                .map((techList, index) => (
                  <div key={techList + index} className={styles.techDiv}>
                    <Status label={lowerCase(techList)} />
                  </div>
                ))}
            </Flex>)}
          </>
           )} 
        </Flex>
        {/* {Array.isArray(techSkill?.skills?.tech_skill) && */}
         {/* { techSkill?.skills?.tech_skill?.length === 0 &&
          // Array.isArray(techSkill?.skills?.soft_skill) &&
          techSkill?.skills?.soft_skill?.length === 0 && (
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
          )} */}
      </Card>
    </>
  );
};

export default ProfessionalSkillsCard;
