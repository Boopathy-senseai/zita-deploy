import { useFormik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import { AppDispatch } from '../../store';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import MenuLists from '../common/MenuList';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { isEmpty, mailformat } from '../../uikit/helper';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import {
  // onlyNumber,
  letters,
  THIS_FIELD_REQUIRED,
  // zipCodeRegx,
} from '../constValue';
// import { jobTypeData } from '../createjdmodule/mock';
// import { CountryEntity } from '../createjdmodule/createJdTypes';
// import { locationMiddleWare } from '../createjdmodule/store/middleware/createjdmiddleware';
import {
  bulkImportUpdatePersonalMiddleWare,
  uploadedProfileViewMiddleWare,
} from './store/middleware/bulkImportMiddleware';

import { experienceOption, qualificationOption } from './bulkImportScreenMock';
import styles from './PersonalInfo.module.css';

const inputWidth = 100;
const marginLeft = 2;
const marginRight = 2;
type Props = {
  skills_list?: any;
  canId?: any;
  emp_data?: any;
  cancel: () => void;
  displayHandler: () => void;
};

type personalUpdateForms = {
  firstname: string;
  lastname: string;
  email: string;
  contact_no: string;
  location: string;
  exp: string;
  qual: string;
  skills: [];
  // techSkill: []
};

const PersonalInformationEdit = ({
  canId,
  cancel,
  skills_list,
  emp_data,
  displayHandler,
}: // isGetCountry,
Props) => {
  const dispatch: AppDispatch = useDispatch();

  const [isLoader, setLoader] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isReload, setReload] = useState(false);

  const initial: personalUpdateForms = {
    firstname: '',
    lastname: '',
    email: '',
    contact_no: '',
    location: '',
    exp: '',
    qual: '',
    skills: [],
  };

  // form validation
  const personalSchema = Yup.object().shape({
    firstname: Yup.string().min(2, 'Too Short!').required(THIS_FIELD_REQUIRED),
    email: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const handleValid = (values: any) => {
    const errors: Partial<any> = {};

    if (!isEmpty(values.email) && !mailformat.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    // if (!isEmpty(values.email) && isEmailValid) {
    //     errors.email = `This email is already in use.`;
    //   }
    return errors;
  };

  // form submit
  const handleSubmit = (values: personalUpdateForms) => {
    // setLoader(true);
    const formData = new FormData();
    formData.append('first_name', values.firstname);
    formData.append('email', values.email);
    formData.append('contact', values.contact_no);

    formData.append('location', values.location);
    formData.append('work_exp', values.exp);
    formData.append('qualification', values.qual);
    formData.append('candi_id', canId);
    const techListSkillEmpty =
      values.skills && values.skills.filter((x: any) => x.value !== '');

    const techList = techListSkillEmpty.map((tech: any) => {
      return tech.value;
    });
    formData.append('skills', techList.toString());
    console.log(formData.get('skills'));
    dispatch(bulkImportUpdatePersonalMiddleWare({ formData })).then(
      (res: any) => {
        if (res.payload.success) {
          dispatch(uploadedProfileViewMiddleWare({ id: canId }));
          Toast('Personal Info updated successfully');
          setReload(false);
          setEmailValid(false);
          setLoader(false);
          cancel();
        } else {
          // Toast('Personal Info not updated, Please try again', 'LONG', 'error');
          setLoader(false);
          setEmailValid(true);
        }
        displayHandler();
      },
    );
  };
  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();
  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validate: (value) => handleValid(value),
    validationSchema: personalSchema,
  });
  const answer_array = emp_data && emp_data.skills.split(',');
  const techSkillUpdate = answer_array.map((techList: any) => {
    return { value: techList, label: techList };
  });

  const techSkillEmpty =
    techSkillUpdate && techSkillUpdate.filter((x: any) => x.value !== '');

  // free fill initial value
  useEffect(() => {
    if (emp_data) {
      if (!isEmpty(emp_data.first_name)) {
        formik.setFieldValue('firstname', emp_data.first_name);
      }

      if (!isEmpty(emp_data.email)) {
        formik.setFieldValue('email', emp_data.email);
      }
      if (!isEmpty(emp_data.location)) {
        formik.setFieldValue('location', emp_data.location);
      }
      if (!isEmpty(emp_data.work_exp)) {
        formik.setFieldValue('exp', emp_data.work_exp);
      }
      if (!isEmpty(emp_data.qualification)) {
        formik.setFieldValue('qual', emp_data.qualification);
      }
      if (!isEmpty(emp_data.contact)) {
        formik.setFieldValue('contact_no', emp_data.contact);
      }

      if (!isEmpty(emp_data.skills)) {
        formik.setFieldValue('skills', techSkillEmpty);
      }
    }
  }, [emp_data]);

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
    displayHandler();
  };
  useEffect(() => {
    if (isReload) {
      onDirty();
    } else if (!isReload) {
      onPristine();
    }
  }, [isReload]);
  useEffect(() => {
    displayHandler();
  }, []);
  const handleTechChange = useCallback((newValue: any, data: any) => {
    if (data.action === 'select-option') {
      setReload(true);
      formik.setFieldValue('skills', newValue);
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
      formik.setFieldValue('skills', jdParseSkillEmptyCheck);
    }

    if (data.action === 'remove-value') {
      setReload(true);
      formik.setFieldValue('skills', newValue);
    }
  }, []);
  // console.log(skills_list)
  return (
    <Flex>
      {routerPrompt}

      {isLoader && <Loader />}
      <Flex className={styles.overAll}>
        
        <Text
          align="center"
          size={16}
          bold
          className={styles.title}
          style={{ marginBottom: 23 }}
        >
          Update Personal Information
        </Text>
        <Flex columnFlex className={styles.scrollStyle}>
          <Flex row center top>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                label="Name"
                required
                value={formik.values.firstname}
                onChange={(e) => {
                  console.log("valueee",e.target.value)
                  
                    formik.setFieldValue(`firstname`, e.target.value);
                    setReload(true);
                  
                }}
              />
              <ErrorMessage
                name="firstname"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                required
                label="Email"
                value={formik.values.email}
                onChange={(e) => {
                  setReload(true);
                  formik.setFieldValue('email', e.target.value);
                }}
              />
              {isEmailValid && (
                <Text size={12} color="error">
                  {`This email is already in use.`}
                </Text>
              )}
              <ErrorMessage
                name={'email'}
                errors={formik.errors}
                touched={formik.touched}
              />
            </Flex>
          </Flex>
          <Flex row center className={styles.genderFlex}>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
              <LabelWrapper label="Contact Number">
                <PhoneInput
                  inputClass={styles.phoneInput}
                  dropdownClass={styles.dropDownStyle}
                  country={'us'}
                  value={formik.values.contact_no}
                  onChange={(phone) => {
                    setReload(true);
                    formik.setFieldValue('contact_no', phone);
                  }}
                />
              </LabelWrapper>
              <ErrorMessage
                name="contact_no"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
              <SelectTag
                isSearchable
                options={experienceOption}
                label="Experience"
                value={
                  experienceOption
                    ? experienceOption.find(
                        (option) => option.value === formik.values.exp,
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('exp', option.value);

                  setReload(true);
                }}
              />
              {isEmpty(formik.values.qual) && (
                <ErrorMessage
                  name="exp"
                  touched={formik.touched}
                  errors={formik.errors}
                />
              )}
            </Flex>
          </Flex>
          <Flex row center top className={styles.locationFlex}>
            <Flex flex={4} marginLeft={marginLeft} marginRight={marginRight}>
              <SelectTag
                isSearchable
                options={qualificationOption}
                label="Qualification"
                value={
                  qualificationOption
                    ? qualificationOption.find(
                        (option) => option.value === formik.values.qual,
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('qual', option.value);

                  setReload(true);
                }}
              />

              <ErrorMessage
                name="qual"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex
              flex={4}
              width={inputWidth}
              marginLeft={marginLeft}
              marginRight={marginRight}
            >
              <InputText
                label="Location"
                value={formik.values.location}
                onChange={(e) => {
                  setReload(true);
                  formik.setFieldValue('location', e.target.value);
                }}
              />
            </Flex>
          </Flex>

          <Flex row center top className={styles.locationFlex}>
            <Flex flex={4} width={inputWidth}>
              {/*<InputText
                label="Skills"
                value={formik.values.skills}
                textarea
                onChange={(e) => {
                  setReload(true);
                  formik.setFieldValue('skills', e.target.value);
                }}
              />

              <ErrorMessage
                name="skills"
                touched={formik.touched}
                errors={formik.errors}
              />*/}

              <SelectTag
                label="Technical Skills"
                // required
                isClearable
                options={skills_list}
                isMulti
                isSearchable
                isCreate
                value={formik.values.skills}
                onChange={handleTechChange}
                components={{
                  MenuList: (props) => <MenuLists {...props} />,
                }}
                placeholder="Add skills from suggestion list"
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex end className={styles.updateButton} row>
          <Button  onClick={onCloseModal} types='close'>Cancel</Button>
          <Button onClick={formik.handleSubmit} style={{marginLeft:'20px'}}>Update</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PersonalInformationEdit;
