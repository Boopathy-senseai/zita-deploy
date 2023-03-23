import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import Modal from '../../uikit/Modal/Modal';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import Flex from '../../uikit/Flex/Flex';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Button from '../../uikit/Button/Button';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import MenuLists from '../common/MenuList';
import { THIS_FIELD_REQUIRED } from '../constValue';
import styles from './updateprofessionalskillsedit.module.css';
import { Obj } from './candidateProfileTypes';
import {
  profileEditMiddleWare,
  skillsUpdateApiMiddleWare,
  techSkillMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

type Props = {
  open: boolean;
  cancel: () => void;
  obj?: Obj;
};

type skillList = { label: string; value: string };
type skillFormikProps = {
  techSkill: skillList[];
  softSkill: skillList[];
};

const initial: skillFormikProps = {
  techSkill: [],
  softSkill: [],
};

const UpdateProfessionalSkillsEdit = ({ open, cancel, obj }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    dispatch(techSkillMiddleWare());
  }, []);

  const { skills_list, skills } = useSelector(
    ({ techSkillReducers }: RootState) => {
      return {
        skills_list: techSkillReducers.skills_list,
        skills: techSkillReducers.skills,
      };
    },
  );
  const softSkillArray = [skills?.soft_skill];

  const techSkillUpdate =
    obj &&
    obj?.skills &&
    obj?.skills.map((techList) => {
      return { value: techList, label: techList };
    });

  const techSkillEmpty =
    techSkillUpdate && techSkillUpdate.filter((x) => x.value !== '');

  const softSkillUpdate =
    Array.isArray(softSkillArray) &&
    softSkillArray.map((softList) => {
      return softList === undefined
        ? { value: '', label: '' }
        : { value: softList, label: softList };
    });

  const softSkillEmpty =
    softSkillUpdate && softSkillUpdate.filter((x) => x.value !== '');

  useEffect(() => {
    formik.setFieldValue('techSkill', techSkillEmpty);
    formik.setFieldValue('softSkill', softSkillEmpty);
  }, [obj, open]);

  const skillsSchema = Yup.object().shape({
    techSkill: Yup.array().min(1, THIS_FIELD_REQUIRED),
  });

  const empId = skills?.id ? skills?.id : 0;

  const handleSubmit = (values: skillFormikProps) => {
    setLoader(true);
    const techListSkillEmpty =
      values.techSkill && values.techSkill.filter((x) => x.value !== '');

    const techList = techListSkillEmpty.map((tech) => {
      return tech.value;
    });

    const softListSkillEmpty =
      values.softSkill && values.softSkill.filter((x) => x.value !== '');

    const softList = softListSkillEmpty.map((soft) => {
      return soft.value;
    });

    dispatch(
      skillsUpdateApiMiddleWare({
        empId,
        tech_skill: techList.toString(),
        soft_skill: softList.toString(),
      }),
    ).then((res) => {
      if (res.payload.success) {
        cancel();
        setLoader(false);
        Toast('Skills updated successfully');
        dispatch(profileEditMiddleWare());
      } else {
        setLoader(false);
        Toast('Skills not updated, Please try again', 'LONG', 'error');
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: skillsSchema,
  });

  const handleTechChange = useCallback((newValue:any, data:any) => {
    if (data.action === 'select-option') {
      formik.setFieldValue('techSkill', newValue);
    }
    if (data.action === 'create-option') {
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
      formik.setFieldValue('techSkill', jdParseSkillEmptyCheck);
    }

    if (data.action === 'remove-value') {
      formik.setFieldValue('techSkill', newValue);
    }
  }, []);

  const handleSoftChange = useCallback((newValue:any, data:any) => {
    if (data.action === 'select-option') {
      formik.setFieldValue('softSkill', newValue);
    }
    if (data.action === 'create-option') {
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
      formik.setFieldValue('softSkill', jdParseSkillEmptyCheck);
    }

    if (data.action === 'remove-value') {
      formik.setFieldValue('softSkill', newValue);
    }
  }, []);

  return (
    <Modal open={open}>
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={() => {
            cancel();
            formik.resetForm();
          }}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text className={styles.title} size={20} bold align="center">
          Update Professional Skills
        </Text>

        <SelectTag
          label="Required Skills"
          required
          isClearable
          options={skills_list}
          isMulti
          isSearchable
          isCreate
          value={formik.values.techSkill}
          onChange={handleTechChange}
          components={{
            MenuList: (props) => <MenuLists {...props} />,
          }}
          placeholder="Add skills from suggestion list"
        />
        <ErrorMessage
          name="techSkill"
          touched={formik.touched}
          errors={formik.errors}
        />
        <div className={styles.softSkillFlex}>
          <SelectTag
            label="Soft Skills"
            isClearable
            options={skills_list}
            isMulti
            isSearchable
            isCreate
            value={formik.values.softSkill}
            onChange={handleSoftChange}
            components={{
              MenuList: (props) => <MenuLists {...props} />,
            }}
            placeholder="Add skills from suggestion list"
            // menuIsOpen={false}
            // noOptionsMessage={({ }) => 'You have no posted jobs to display.'}
          />
        </div>
        <Flex end>
          <Button onClick={formik.handleSubmit}>Update</Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UpdateProfessionalSkillsEdit;
