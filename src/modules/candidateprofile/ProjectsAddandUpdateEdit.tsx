import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { THIS_FIELD_REQUIRED } from '../constValue';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { Obj, ProjectsEntityOne } from './candidateProfileTypes';
import styles from './projectsaddandupdateedit.module.css';
import {
  profileEditMiddleWare,
  projectAddMiddleWare,
  projectUpdateMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const inputWidth = 320;
const marginLeft = 16;
const marginRight = 16;

type projectFormikForms = {
  projectName: string;
  client: string;
  location: string;
  briefDes: string;
  projectRole: string;
  duration: string;
  domain: string;
  techSkill: string;
  org: string;
  academic: string;
  responsibilities: string;
};

const initial: projectFormikForms = {
  projectName: '',
  client: '',
  location: '',
  briefDes: '',
  projectRole: '',
  duration: '',
  domain: '',
  techSkill: '',
  org: '',
  academic: '0',
  responsibilities: '',
};
// form validation
const projectSchema = Yup.object().shape({
  location: Yup.string().required(THIS_FIELD_REQUIRED),
  techSkill: Yup.string().required(THIS_FIELD_REQUIRED),
  org: Yup.string().required(THIS_FIELD_REQUIRED),
  responsibilities: Yup.string().required(THIS_FIELD_REQUIRED),
});

type Props = {
  obj?: Obj;
  projects: ProjectsEntityOne[];
  cancel: () => void;
  open: boolean;
  isUpdate?: boolean;
  isUpdateId?: string;
};
const ProjectsAddandUpdateEdit = ({
  obj,
  projects,
  cancel,
  open,
  isUpdate,
  isUpdateId,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isReload, setReload] = useState(false);

  const projectOrgOptions = obj?.exp?.map((expList) => {
    return { value: expList.exp_id, label: expList.org };
  });

  const filterOrgOptions: any = projectOrgOptions?.filter(
    (a) => a.label !== '',
  );

  const finalOrgOption =
    filterOrgOptions === undefined
      ? [{ value: 0, label: 'Others' }]
      : [...filterOrgOptions, { value: 0, label: 'Others' }];

  // form submit
  const handleSubmit = (values: projectFormikForms) => {
    if (isUpdate) {
      dispatch(
        projectUpdateMiddleWare({
          work_proj_name: values.projectName,
          work_proj_client: values.client,
          work_proj_describe: values.briefDes,
          work_proj_desig: values.projectRole,
          work_proj_role: values.responsibilities,
          work_proj_duration: values.duration,
          work_proj_domain: values.domain,
          work_proj_location: values.location,
          work_proj_skills: values.techSkill,
          work_proj_org_id: values.org,
          id: isUpdateId,
          work_proj_type: values.academic,
        }),
      ).then((res) => {
        if (res.payload.success) {
          dispatch(
            candidateMatchMiddleWare({
               can_id:res.payload?.can_id[0]?.id.toString(),
            }),
          )
          setReload(false);
          dispatch(
            profileEditMiddleWare({
              jd_id: localStorage.getItem('careerJobViewJobId'),
            }),
          );
          Toast('Project updated successfully');
          cancel();
          formik.resetForm();
        } else {
          Toast('Project not updated, Please try again.', 'LONG', 'error');
        }
      });
    } else {
      dispatch(
        projectAddMiddleWare({
          work_proj_name: values.projectName,
          work_proj_client: values.client,
          work_proj_describe: values.briefDes,
          work_proj_desig: values.projectRole,
          work_proj_role: values.responsibilities,
          work_proj_duration: values.duration,
          work_proj_domain: values.domain,
          work_proj_location: values.location,
          work_proj_skills: values.techSkill,
          work_proj_org_id: values.org,
          work_proj_type: values.academic,
        }),
      ).then((res) => {
        if (res.payload.success) {
          dispatch(
            candidateMatchMiddleWare({
               can_id:res.payload?.can_id[0]?.id.toString(),
            }),
          )
          setReload(false);
          dispatch(
            profileEditMiddleWare({
              jd_id: localStorage.getItem('careerJobViewJobId'),
            }),
          );
          Toast('Project added successfully');
          cancel();
          formik.resetForm();
        } else {
          Toast('Project not added, Please try again.', 'LONG', 'error');
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validationSchema: projectSchema,
  });
  // free fill initial value
  useEffect(() => {
    if (
      isUpdate &&
      isUpdateId !== '0' &&
      Array.isArray(obj?.edu) &&
      obj?.edu.length !== 0
    ) {
      const filterProject: any = projects.filter(
        (value) => value.project_id === Number(isUpdateId),
      );
      if (!isEmpty(filterProject[0].work_proj_name)) {
        formik.setFieldValue('projectName', filterProject[0].work_proj_name);
      }
      if (!isEmpty(filterProject[0].work_proj_location)) {
        formik.setFieldValue('location', filterProject[0].work_proj_location);
      }
      if (!isEmpty(filterProject[0].work_proj_desig)) {
        formik.setFieldValue('projectRole', filterProject[0].work_proj_desig);
      }
      if (!isEmpty(filterProject[0].work_proj_skills)) {
        formik.setFieldValue('techSkill', filterProject[0].work_proj_skills);
      }
      if (!isEmpty(filterProject[0].work_proj_role)) {
        formik.setFieldValue(
          'responsibilities',
          filterProject[0].work_proj_role,
        );
      }
      if (!isEmpty(filterProject[0].work_proj_client)) {
        formik.setFieldValue('client', filterProject[0].work_proj_client);
      }
      if (!isEmpty(filterProject[0].work_proj_describe)) {
        formik.setFieldValue('briefDes', filterProject[0].work_proj_describe);
      }

      if (!isEmpty(filterProject[0].work_proj_duration)) {
        formik.setFieldValue('duration', filterProject[0].work_proj_duration);
      }
      if (!isEmpty(filterProject[0].work_proj_domain)) {
        formik.setFieldValue('domain', filterProject[0].work_proj_domain);
      }

      if (!isEmpty(filterProject[0].work_proj_org_id_id)) {
        formik.setFieldValue(
          'org',
          filterProject[0].work_proj_org_id_id.toString(),
        );
      }
      if (!isEmpty(filterProject[0].work_proj_type)) {
        formik.setFieldValue(
          'academic',
          filterProject[0].work_proj_type ? '1' : '0',
        );
      }
    }
  }, [obj, open]);
  // poppup close function
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

      <Flex columnFlex className={styles.overAll}>
        <div
          className={styles.svgClose}
          onClick={onCloseModal}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <SvgCloseSmall />
        </div>
        <Text align="center" bold size={16} className={styles.title}>
          {isUpdate ? 'Update' : 'Add'} Project
        </Text>
        <Flex row top>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Project Name"
              value={formik.values.projectName}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('projectName', e.target.value);
              }}
            />
          </Flex>
          <Flex
            flex={4}
            width={inputWidth}
            marginLeft={marginLeft}
            marginRight={marginRight}
          >
            <InputText
              label="Client Name"
              value={formik.values.client}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('client', e.target.value);
              }}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Location"
              required
              value={formik.values.location}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('location', e.target.value);
              }}
            />
            <ErrorMessage
              name="location"
              errors={formik.errors}
              touched={formik.touched}
            />
          </Flex>
        </Flex>
        <Flex className={styles.briefStyle}>
          <InputText
            textarea
            label="Brief Description"
            value={formik.values.briefDes}
            className={styles.textAreaInputStyle}
            onChange={(e) => {
              setReload(true);
              formik.setFieldValue('briefDes', e.target.value);
            }}
          />
        </Flex>
        <Flex row top>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Project Role"
              value={formik.values.projectRole}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('projectRole', e.target.value);
              }}
            />
          </Flex>
          <Flex
            flex={4}
            width={inputWidth}
            marginLeft={marginLeft}
            marginRight={marginRight}
          >
            <InputText
              label="Duration"
              value={formik.values.duration}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('duration', e.target.value);
              }}
            />
            <ErrorMessage
              name="duration"
              errors={formik.errors}
              touched={formik.touched}
            />
          </Flex>
          <Flex flex={4} width={inputWidth}>
            <InputText
              label="Business Domain"
              value={formik.values.domain}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('domain', e.target.value);
              }}
            />
          </Flex>
        </Flex>
        <Flex row top className={styles.briefStyle}>
          <Flex flex={4} width={inputWidth}>
            <InputText
              required
              label="Technical Skills"
              value={formik.values.techSkill}
              onChange={(e) => {
                setReload(true);
                formik.setFieldValue('techSkill', e.target.value);
              }}
            />
            <ErrorMessage
              name="techSkill"
              errors={formik.errors}
              touched={formik.touched}
            />
          </Flex>
          <Flex
            flex={4}
            width={inputWidth}
            marginLeft={marginLeft}
            marginRight={marginRight}
          >
            <SelectTag
              label="Project Org/Others"
              required
              options={finalOrgOption}
              onChange={(option) => {
                setReload(true);
                formik.setFieldValue('org', option.value);
              }}
              value={
                finalOrgOption
                  ? finalOrgOption.find(
                      (option) => option.value.toString() === formik.values.org,
                    )
                  : ''
              }
            />
            <ErrorMessage
              name="org"
              errors={formik.errors}
              touched={formik.touched}
            />
          </Flex>
          <Flex flex={4} width={inputWidth} className={styles.academicCheckBox}>
            <InputCheckBox
              onClick={() => setReload(true)}
              label="Academic Projects"
              checked={formik.values.academic === '1'}
              onChange={() =>
                formik.values.academic === '1'
                  ? formik.setFieldValue('academic', '0')
                  : formik.setFieldValue('academic', '1')
              }
            />
          </Flex>
        </Flex>
        <Flex className={styles.roleInput}>
          <InputText
            textarea
            label="Roles & Responsibilities"
            required
            value={formik.values.responsibilities}
            className={styles.textAreaInputStyleOne}
            onChange={(e) => {
              setReload(true);
              formik.setFieldValue('responsibilities', e.target.value);
            }}
          />
          <ErrorMessage
            name="responsibilities"
            errors={formik.errors}
            touched={formik.touched}
          />
        </Flex>
        <Flex end>
          <Button onClick={formik.handleSubmit}>
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ProjectsAddandUpdateEdit;
