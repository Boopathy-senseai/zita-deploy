import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { AppDispatch, RootState } from '../../store';
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
import { Obj } from './../candidateprofile/candidateProfileTypes';
import {
  uploadedProfileViewMiddleWare,
  bulkUploadSkillsUpdateMiddleWare,
  bulkUploadSkillsMiddleWare,
} from './store/middleware/bulkImportMiddleware';

type Props = {
  open: boolean;
  cancel: () => void;
  obj?: Obj;
  isAddText: string;
  canId: any;
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

const UpdateProfessionalSkillsEdit = ({
  open,
  cancel,
  obj,
  isAddText,
  canId,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    dispatch(bulkUploadSkillsMiddleWare({ empId: canId }));
  }, [canId]);

  const { skills_list, skills } = useSelector(
    ({ bulkUploadTechSkillReducers }: RootState) => {
      return {
        skills_list: bulkUploadTechSkillReducers.skills_list,
        skills: bulkUploadTechSkillReducers.skills,
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
    softSkillArray
      .toString()
      .split(',')
      .map((softList) => {
        return softList === undefined || softList === ''
          ? { value: '', label: '' }
          : { value: softList, label: softList };
      });

  const softSkillEmpty =
    softSkillUpdate && softSkillUpdate.filter((x) => x.value !== '');

  const skillsSchema = Yup.object().shape({
    techSkill: Yup.array().min(1, THIS_FIELD_REQUIRED),
  });

  // const empId = skills?.id ? skills?.id : 0;

  const handleSubmitForm = (values: skillFormikProps) => {
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
      bulkUploadSkillsUpdateMiddleWare({
        empId: canId.toString(),
        tech_skill: techList.toString(),
        soft_skill: softList.toString(),
      }),
    ).then((res) => {
      if (res.payload.success) {
        setReload(false);
        cancel();
        setLoader(false);
        dispatch(uploadedProfileViewMiddleWare({ id: canId }));
        Toast('Skills updated successfully');
      } else {
        setLoader(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmitForm,
    validationSchema: skillsSchema,
  });

  const handleTechChange = useCallback((newValue: any, data: any) => {
    if (data.action === 'select-option') {
      setReload(true);
      formik.setFieldValue('techSkill', newValue);
    }
    if (data.action === 'create-option') {
      setReload(true);
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
      setReload(true);
      formik.setFieldValue('techSkill', newValue);
    }
  }, []);

  const handleSoftChange = useCallback((newValue: any, data: any) => {
    if (data.action === 'select-option') {
      setReload(true);

      formik.setFieldValue('softSkill', newValue);
    }
    if (data.action === 'create-option') {
      setReload(true);
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
      setReload(true);
      formik.setFieldValue('softSkill', newValue);
    }
  }, []);

  useEffect(() => {
    formik.setFieldValue('techSkill', techSkillEmpty);
    formik.setFieldValue('softSkill', softSkillEmpty);
  }, [obj, open]);

  const onCloseModal = () => {
    if (
      isReload &&
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      )
    ) {
      cancel();
      formik.resetForm();
      setReload(false);
    }
    if (!isReload) {
      cancel();
      formik.resetForm();
      setReload(false);
    }
  };

  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();

  useEffect(() => {
    if (isReload) {
      onDirty();
    } else if (!isReload) {
      onPristine();
    }
  }, [isReload]);


  return (
    <Flex>
      {routerPrompt}
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text className={styles.title} size={16} bold align="center">
          {isAddText} Professional Skills
        </Text>

        <SelectTag
          label="Technical Skills"
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
            options={[]}
            isMulti
            isSearchable
            isCreate
            value={formik.values.softSkill}
            onChange={handleSoftChange}
            placeholder="Add skills from suggestion list"
            components={{
              MenuList: (props) => <MenuLists {...props} maxHeight={0} />,
            }}
          />
        </div>
        <Flex end className={styles.end}>
          <Button onClick={formik.handleSubmit}>{isAddText}</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UpdateProfessionalSkillsEdit;
