import { memo, useCallback, useEffect } from 'react';
import { ErrorMessage } from 'formik';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import MenuLists from '../common/MenuList';
import styles from './nondsskill.module.css';
import { SkillListEntity, SkillsEntity } from './createJdTypes';
import { dsFormProps } from './formikTypes';

type Props = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  skill_list: SkillListEntity[];
  values: dsFormProps;
  skills: SkillsEntity[];
  jdParseSkill: {
    value: any;
    label: any;
  }[];
  job_description: string;
  onDirty: () => void;
};

const NonDsSkill = ({
  setFieldValue,
  skill_list,
  values,
  skills,
  jdParseSkill,
  job_description,
  onDirty,
}: Props) => {
  // free fill initial skill
  useEffect(() => {
    if (jdParseSkill.length !== 0 && job_description !== '') {
      const jdDuplicate =
        jdParseSkill &&
        jdParseSkill.filter(
          (value, index: any, self: any[]) =>
            index ===
            self.findIndex(
              (t) =>
                t.value?.toLocaleLowerCase() ===
                value.value?.toLocaleLowerCase(),
            ),
        );
      setFieldValue('nonDsSkill', jdDuplicate);
    }
  }, [jdParseSkill, job_description]);

  const skillUpdate =
    skills.length !== 0 &&
    skills.map((skillList) => {
      return { value: skillList.skill, label: skillList.skill };
    });

  const jdParseSkillEmpty =
    skillUpdate && skillUpdate.filter((x) => x.value !== '');

  useEffect(() => {
    setFieldValue('nonDsSkill', jdParseSkillEmpty);
  }, [skills]);
  
  // skill change function
  const handleChange = useCallback((newValue, data) => {
    if (data.action === 'select-option') {
      onDirty();
      setFieldValue('nonDsSkill', newValue);
    }
    if (data.action === 'create-option') {
      onDirty();
      const tagsValue = newValue.slice();
      var tagArr = data.option.value.split(',');
      tagArr.map((list: string) => {
        return (
          !list.includes(',') && tagsValue.push({ value: list, label: list })
        );
      });
      const nonSkillFilter = tagsValue.filter(
        (x: any) => !x.value.includes(','),
      );
      const nonDsDuplicate =
        nonSkillFilter &&
        nonSkillFilter.filter(
          (value: { value: string }, index: any, self: any[]) =>
            index ===
            self.findIndex(
              (t) =>
                t.value?.toLocaleLowerCase() ===
                value.value?.toLocaleLowerCase(),
            ),
        );
      const jdParseSkillEmptyCheck = nonDsDuplicate.filter(
        (x: any) => x.value !== undefined,
      );
      setFieldValue('nonDsSkill', jdParseSkillEmptyCheck);
    }

    if (data.action === 'remove-value') {
      onDirty();
      setFieldValue('nonDsSkill', newValue);
    }
  }, []);

  return (
    <div className={styles.overAll}>
      <LabelWrapper label="Required Skills" required>
        <SelectTag
          inputId="nondsSkill__nonSkill"
          isClearable
          options={skill_list}
          isMulti
          isSearchable
          isCreate
          value={values.nonDsSkill}
          onChange={handleChange}
          components={{
            MenuList: (props) => <MenuLists {...props} />,
          }}
          placeholder="Add skills from suggestion list"
        />
        <div className={styles.errorMessage}>
          <ErrorMessage name={'nonDsSkill'} />
        </div>
      </LabelWrapper>
    </div>
  );
};

export default memo(NonDsSkill);
