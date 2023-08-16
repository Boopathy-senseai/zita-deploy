import { memo } from 'react';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import { dsFormProps } from './formikTypes';
import styles from './missingskills.module.css';
import SkillsContainer from './SkillsContainer';

type Props = {
  dataBaseleftTags: any;
  setDataBaseLeftTags: any;
  toolsLeftTags: any;
  setToolsLeftTags: any;
  platformsLeftTags: any;
  setPlatformsLeftTags: any;
  othersLeftTags: any;
  setOthersLeftTags: any;
  programLeftTags: any;
  setProgramLeftTags: any;
  dataBaseTags: any;
  setDataBaseTags: any;
  toolsTags: any;
  setToolsTags: any;
  platformsTags: any;
  setPlatformsTags: any;
  programTags: any;
  setProgramTags: any;
  othersTags: any;
  setOtherTags: any;
  skillsData: any;
  values: dsFormProps;
  createJdLoader: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  open: boolean;
  new_role: string;
  old_role: string;
  jd_id: string;
  setMiss: (arg: boolean) => void;
  skillOne: any;
  skillFour: any;
  skillTwo: any;
  skillFive: any;
  skillThree: any;
  updateSkills: any;
  errors: any;
  touched: any;
  onPristine: () => void;
  onDirty: () => void;
};

const otherValue = (value: string) => {
  return value === 'Others' ? 'NON DS' : value;
};
const MissingSkills = ({
  dataBaseleftTags,
  setDataBaseLeftTags,
  toolsLeftTags,
  setToolsLeftTags,
  platformsLeftTags,
  setPlatformsLeftTags,
  othersLeftTags,
  setOthersLeftTags,
  programLeftTags,
  setProgramLeftTags,
  dataBaseTags,
  setDataBaseTags,
  toolsTags,
  setToolsTags,
  platformsTags,
  setPlatformsTags,
  programTags,
  setProgramTags,
  othersTags,
  setOtherTags,
  skillsData,
  values,
  createJdLoader,
  setFieldValue,
  open,
  new_role,
  old_role,
  jd_id,
  setMiss,
  skillOne,
  skillFour,
  skillTwo,
  skillFive,
  skillThree,
  updateSkills,
  errors,
  touched,
  onPristine,
  onDirty,
}: Props) => {
  return (
    <Modal open={open}>
      <Flex className={styles.overAll}>
        <Text
          size={14}
          color="primary"
          bold
          // align="center"
          className={styles.title}
        >
          {`Missing Skills Recommendation for Selected Role - ${
            isEmpty(new_role) ? otherValue(old_role) : otherValue(new_role)
          }`}
        </Text>
        <Text>
          Please drag and drop the recommended missing skills to the required
          technical skills that you may require for this job.
        </Text>
        <div
          className={styles.scroll}
          style={{
            width: window.innerWidth / 1.4,
          }}
        >
          <SkillsContainer
            onPristine={onPristine}
            onDirty={onDirty}
            missPop
            errors={errors}
            touched={touched}
            skillOne={skillOne}
            skillFour={skillFour}
            skillTwo={skillTwo}
            skillFive={skillFive}
            skillThree={skillThree}
            updateSkills={updateSkills}
            setMiss={setMiss}
            jd_id={jd_id}
            isMissSkill
            profileTitleRight="Required Skills (Currently Added)"
            profileTitle={`Missing Skills (for ${
              isEmpty(new_role) ? old_role : new_role
            })`}
            dataBaseleftTags={dataBaseleftTags}
            setDataBaseLeftTags={setDataBaseLeftTags}
            toolsLeftTags={toolsLeftTags}
            setToolsLeftTags={setToolsLeftTags}
            platformsLeftTags={platformsLeftTags}
            setPlatformsLeftTags={setPlatformsLeftTags}
            othersLeftTags={othersLeftTags}
            setOthersLeftTags={setOthersLeftTags}
            programLeftTags={programLeftTags}
            setProgramLeftTags={setProgramLeftTags}
            dataBaseTags={dataBaseTags}
            setDataBaseTags={setDataBaseTags}
            toolsTags={toolsTags}
            setToolsTags={setToolsTags}
            platformsTags={platformsTags}
            setPlatformsTags={setPlatformsTags}
            programTags={programTags}
            setProgramTags={setProgramTags}
            othersTags={othersTags}
            setOtherTags={setOtherTags}
            skillsData={skillsData}
            values={values}
            createJdLoader={createJdLoader}
            setFieldValue={setFieldValue}
          />
        </div>
      </Flex>
    </Modal>
  );
};

export default memo(MissingSkills);
