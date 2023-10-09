import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
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
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
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
  isAddText: string;
  techSkills?: any;
};

type skillList = { label: string; value: string };
type softSkillList = {value: string; label: string;}
type skillFormikProps = {
  techSkill: skillList[];
  softSkill: softSkillList[];
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
  techSkills
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isBtnLoader, setBtnLoader] = useState(false)
  const [isReload, setReload] = useState(false);

  useEffect(() => {
    dispatch(techSkillMiddleWare());
  }, []);

 
  const { skills_list, skills, soft_skills } = useSelector(
    ({ techSkillReducers }: RootState) => { 
      return {
        skills_list: techSkillReducers.skills_list,
        skills: techSkillReducers.skills,
        soft_skills: techSkillReducers.soft_skills,
      };
    },
  );

  const softSkillArray =techSkills && techSkills?.skills?.soft_skill

  const techSkillUpdate =
  techSkills && techSkills?.skills?.tech_skill?.replace(',,', ',')?.split(',')?.map((techList) => {
      return { value: techList, label: techList };
    });

  const techSkillEmpty =
    techSkillUpdate && techSkillUpdate.filter((x) => x.value !== '');

  const softSkillUpdate =
  softSkillArray?.replace(',,', ',')?.split(',')
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

  const empId = skills?.id ? skills?.id : 0;

  const handleSubmit = (values: skillFormikProps) => {
    setBtnLoader(true);
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
        dispatch(
          candidateMatchMiddleWare({
            can_id: res.payload?.can_id[0]?.id.toString(),
          }),
        ).then((response)=>{
          if(response.payload.success === false){
Toast('Sorry for the inconvinience, The token has been completed.')
          }
        })
        setReload(false);
        cancel();
        setBtnLoader(false);
        Toast('Skills updated successfully');
        dispatch(
          profileEditMiddleWare({
            jd_id: localStorage.getItem('careerJobViewJobId'),
          }),
        );
        dispatch(techSkillMiddleWare());
      } else {
        setBtnLoader(false);
        Toast('Skills not updated, Please try again', 'LONG', 'error');
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: skillsSchema,
  });

  const handleTechChange = useCallback((newValue, data) => {
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

  const handleSoftChange = useCallback((newValue, data) => {
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
    <Modal open={open}>
      {routerPrompt}
      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        {/* <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => { }}
        >
          <SvgCloseSmall />
        </div> */}
        <Flex
          style={{ borderBottom: '0.5px solid #581845', marginBottom: '15px' }}
        >
          <Text
            className={styles.title}
            size={14}
            bold
            style={{ marginBottom: '5px' }}
          >
            {isAddText} Professional Skills
          </Text>
        </Flex>

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
            options={soft_skills}
            isMulti
            isSearchable
            isCreate
            value={formik.values.softSkill}
            onChange={handleSoftChange}
            placeholder="Add soft skills "
            components={{
              MenuList: (props) => <MenuLists {...props}/>,
            }}
          />
        </div>
        <Flex end row marginTop={15}>
          <Flex marginRight={15}><Button  types="close" onClick={cancel}>Cancel</Button></Flex>
          <Flex> {isBtnLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <Button onClick={formik.handleSubmit}>{isAddText}</Button>  
          )}</Flex> 
        </Flex>
      </Flex>
    </Modal>
  );
};

export default UpdateProfessionalSkillsEdit;
