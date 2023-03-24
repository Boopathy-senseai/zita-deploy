import { routesPath } from '../../routes/routesPath';
import { AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import {
  ENTER_VACANCIES,
  ENTER_VACANCIES_0,
  THIS_FIELD_REQUIRED,
} from '../constValue';
import { JdOutput } from './createJdTypes';
import { dsFormProps } from './formikTypes';
import {
  createJdPostMiddleWare,
  dsOrNotMiddleWare,
  editJdPostMiddleWare,
  jdProfileMiddleWare,
} from './store/middleware/createjdmiddleware';

const questionnairePath = (jd_id: string) => {
  return window.location.replace(
    window.origin + `/jobs/questionnaire/${jd_id}`,
  );
};

// ds submit form
export const jdSubmit = ({
  values,
  setRole,
  dispatch,
  editJdId,
  dsCheck,
  jd_output,
  setJdOutpuId,
  setJdProfileLoader,
  jd_profile,
  isCancel,
  duplicate,
}: {
  values: dsFormProps;
  setRole: () => void;
  dispatch: AppDispatch;
  dsCheck: string;
  editJdId?: string;
  jd_output: JdOutput;
  setJdOutpuId: (arg: string) => void;
  setJdProfileLoader: (a: boolean) => void;
  jd_profile: boolean;
  isCancel?: boolean;
  duplicate?: string;
}) => {
  if (
    jd_output.richtext_job_description !== values.jobDescription ||
    jd_output.job_role_id !== Number(values.jobRole)
  ) {
    setJdProfileLoader(true);
  }
  const dataBaseSkillFilter = values.skillData.dataBaseTags.filter(
    (x) => x.skill !== '',
  );
  const otherSkillFilter = values.skillData.othersTags.filter(
    (x) => x.skill !== '',
  );
  const platSkillFilter = values.skillData.platformsTags.filter(
    (x) => x.skill !== '',
  );
  const programSkillFilter = values.skillData.programTags.filter(
    (x) => x.skill !== '',
  );
  const toolsSkillFilter = values.skillData.toolsTags.filter(
    (x) => x.skill !== '',
  );

  const dataBaseSkill = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataToolsSkill = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataProgramSkill = programSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataPlatSkill = platSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataOtherSkill = otherSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });

  const dataBaseExp = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataToolsExp = toolsSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataProgramExp = programSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataPlatExp = platSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataOtherExp = otherSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });

  const dataBaseSkillOne = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const dataToolsSkillOne = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataProgramSkillOne = programSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataPlatSkillOne = platSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataOtherSkillOne = otherSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const qualification = values.qualification.map((dataList: any) => {
    return dataList.education;
  });

  const specialization = values.qualification.map((dataList: any) => {
    return dataList.specialization;
  });

  let dataBaseComma = '';
  let toolComma = '';
  let progarmComma = '';
  let platComma = '';

  if (!isEmpty(dataBaseExp.toString())) {
    dataBaseComma = ',';
  } else {
    dataBaseComma = '';
  }
  if (!isEmpty(dataToolsExp.toString())) {
    toolComma = ',';
  } else {
    toolComma = '';
  }
  if (!isEmpty(dataProgramExp.toString())) {
    progarmComma = ',';
  } else {
    progarmComma = '';
  }
  if (!isEmpty(dataPlatExp.toString())) {
    platComma = ',';
  } else {
    platComma = '';
  }

  const experience =
    dataBaseExp.toString() +
    dataBaseComma +
    dataToolsExp.toString() +
    toolComma +
    dataProgramExp.toString() +
    progarmComma +
    dataPlatExp.toString() +
    platComma +
    dataOtherExp.toString();

  const skillsList =
    dataBaseSkill.toString() +
    dataToolsSkill.toString() +
    dataProgramSkill.toString() +
    dataPlatSkill.toString() +
    dataOtherSkill.toString();

  if (isEmpty(editJdId) && !isCancel) {
    dispatch(
      createJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_role: values.jobRole,
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: skillsList.replace(/,/g, ''),
        skills_exp: experience,
        database_skill: dataBaseSkillOne.length === 0 ? '' : dataBaseSkillOne,
        platform_skill: dataPlatSkillOne.length === 0 ? '' : dataPlatSkillOne,
        tool_skill: dataToolsSkillOne.length === 0 ? '' : dataToolsSkillOne,
        misc_skill: dataOtherSkillOne.length === 0 ? '' : dataOtherSkillOne,
        programming_skill:
          dataProgramSkillOne.length === 0 ? '' : dataProgramSkillOne,
        qualification,
        specialization,
        duplicate: isEmpty(duplicate) ? '' : 'duplicate',
      }),
    ).then((res) => {
      dispatch(
        dsOrNotMiddleWare({ jdId: res.payload.jd_id, is_ds_role: dsCheck }),
      ).then(() => {
        if (
          jd_output.richtext_job_description !== values.jobDescription ||
          jd_output.job_role_id !== Number(values.jobRole) ||
          jd_profile === false
        ) {
          if (res.payload.success) {
            setJdOutpuId(res.payload.jd_id);
            dispatch(jdProfileMiddleWare({ jd_id: res.payload.jd_id })).then(
              (profileRes) => {
                if (profileRes.payload.success) setRole();
                setJdProfileLoader(false);
              },
            );
          }
        } else {
          questionnairePath(res.payload.jd_id);
          setJdProfileLoader(false);
        }
      });
    });
  }

  if (!isEmpty(editJdId) && !isCancel) {
    dispatch(
      editJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_role: values.jobRole,
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: skillsList.replace(/,/g, ''),
        skills_exp: experience,
        database_skill: dataBaseSkillOne.length === 0 ? '' : dataBaseSkillOne,
        platform_skill: dataPlatSkillOne.length === 0 ? '' : dataPlatSkillOne,
        tool_skill: dataToolsSkillOne.length === 0 ? '' : dataToolsSkillOne,
        misc_skill: dataOtherSkillOne.length === 0 ? '' : dataOtherSkillOne,
        programming_skill:
          dataProgramSkillOne.length === 0 ? '' : dataProgramSkillOne,
        qualification,
        specialization,
        jdId: editJdId,
      }),
    ).then((editRes) => {
      dispatch(
        dsOrNotMiddleWare({ jdId: editRes.payload.jd_id, is_ds_role: dsCheck }),
      ).then(() => {
        if (
          jd_output.richtext_job_description !== values.jobDescription ||
          jd_output.job_role_id !== Number(values.jobRole) ||
          jd_profile === false
        ) {
          if (editRes.payload.success) {
            setJdOutpuId(editRes.payload.jd_id);
            dispatch(
              jdProfileMiddleWare({ jd_id: editRes.payload.jd_id }),
            ).then((profileRes) => {
              if (profileRes.payload.success) setRole();
              setJdProfileLoader(false);
            });
          }
        } else {
          questionnairePath(editRes.payload.jd_id);
          setJdProfileLoader(false);
        }
      });
    });
  }
};

export const jdCancelSubmit = ({
  values,
  setRole,
  dispatch,
  dsCheck,
  jd_output,
  setJdOutpuId,
  setJdProfileLoader,
  cancelJdId,
}: {
  values: dsFormProps;
  setRole: () => void;
  dispatch: AppDispatch;
  dsCheck: string;
  jd_output: JdOutput;
  setJdOutpuId: (arg: string) => void;
  setJdProfileLoader: (a: boolean) => void;
  jd_profile?: boolean;
  cancelJdId: string;
}) => {
  if (
    jd_output.richtext_job_description !== values.jobDescription ||
    jd_output.job_role_id !== Number(values.jobRole)
  ) {
    setJdProfileLoader(true);
  }
  const dataBaseSkillFilter = values.skillData.dataBaseTags.filter(
    (x) => x.skill !== '',
  );
  const otherSkillFilter = values.skillData.othersTags.filter(
    (x) => x.skill !== '',
  );
  const platSkillFilter = values.skillData.platformsTags.filter(
    (x) => x.skill !== '',
  );
  const programSkillFilter = values.skillData.programTags.filter(
    (x) => x.skill !== '',
  );
  const toolsSkillFilter = values.skillData.toolsTags.filter(
    (x) => x.skill !== '',
  );

  const dataBaseSkill = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataToolsSkill = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataProgramSkill = programSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataPlatSkill = platSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataOtherSkill = otherSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });

  const dataBaseExp = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataToolsExp = toolsSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataProgramExp = programSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataPlatExp = platSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataOtherExp = otherSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });

  const dataBaseSkillOne = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const dataToolsSkillOne = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataProgramSkillOne = programSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataPlatSkillOne = platSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataOtherSkillOne = otherSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const qualification = values.qualification.map((dataList: any) => {
    return dataList.education;
  });

  const specialization = values.qualification.map((dataList: any) => {
    return dataList.specialization;
  });

  let dataBaseComma = '';
  let toolComma = '';
  let progarmComma = '';
  let platComma = '';

  if (!isEmpty(dataBaseExp.toString())) {
    dataBaseComma = ',';
  } else {
    dataBaseComma = '';
  }
  if (!isEmpty(dataToolsExp.toString())) {
    toolComma = ',';
  } else {
    toolComma = '';
  }
  if (!isEmpty(dataProgramExp.toString())) {
    progarmComma = ',';
  } else {
    progarmComma = '';
  }
  if (!isEmpty(dataPlatExp.toString())) {
    platComma = ',';
  } else {
    platComma = '';
  }

  const experience =
    dataBaseExp.toString() +
    dataBaseComma +
    dataToolsExp.toString() +
    toolComma +
    dataProgramExp.toString() +
    progarmComma +
    dataPlatExp.toString() +
    platComma +
    dataOtherExp.toString();

  const skillsList =
    dataBaseSkill.toString() +
    dataToolsSkill.toString() +
    dataProgramSkill.toString() +
    dataPlatSkill.toString() +
    dataOtherSkill.toString();

  dispatch(
    editJdPostMiddleWare({
      job_title: values.jobTitle.slice(0, 50),
      job_role: values.jobRole,
      job_id: values.jobId,
      richtext_job_description: values.jobDescription,
      job_type: values.jobType,
      min_exp: values.minimumExperience,
      max_exp: values.maximumExperience,
      no_of_vacancies: values.vacancies,
      work_country: values.country,
      work_state: values.state,
      work_city: values.city,
      work_remote: values.remoteWork,
      salary_min: values.minimumSalary,
      salary_max: values.maximumSalary,
      salary_curr_type: values.currency,
      show_sal_to_candidate: values.showSalaryCandidates,
      industry_type: values.industryType,
      skills: skillsList.replace(/,/g, ''),
      skills_exp: experience,
      database_skill: dataBaseSkillOne.length === 0 ? '' : dataBaseSkillOne,
      platform_skill: dataPlatSkillOne.length === 0 ? '' : dataPlatSkillOne,
      tool_skill: dataToolsSkillOne.length === 0 ? '' : dataToolsSkillOne,
      misc_skill: dataOtherSkillOne.length === 0 ? '' : dataOtherSkillOne,
      programming_skill:
        dataProgramSkillOne.length === 0 ? '' : dataProgramSkillOne,
      qualification,
      specialization,
      jdId: cancelJdId,
    }),
  ).then((cancelEditRes) => {
    dispatch(
      dsOrNotMiddleWare({
        jdId: cancelEditRes.payload.jd_id,
        is_ds_role: dsCheck,
      }),
    ).then(() => {
      if (cancelEditRes.payload.success) {
        setJdOutpuId(cancelEditRes.payload.jd_id);
        dispatch(
          jdProfileMiddleWare({ jd_id: cancelEditRes.payload.jd_id }),
        ).then((profileRes) => {
          if (profileRes.payload.success) {
            setRole();
          }
          setJdProfileLoader(false);
        });
      }
    });

    // } else {
    //   // questionnairePath(cancelEditRes.payload.jd_id);
    //   setJdProfileLoader(false);
    // }

    // if (cancelEditRes.payload.success) {
    //   setJdOutpuId(cancelEditRes.payload.jd_id);
    //   dispatch(
    //     jdProfileMiddleWare({ jd_id: cancelEditRes.payload.jd_id }),
    //   ).then((profileRes) => {
    //     if (profileRes.payload.success) setRole();
    //     setJdProfileLoader(false);
    //   });
    // }
  });
};

// ds submit draft form
export const jdDraftSubmit = ({
  values,
  dispatch,
  editJdId,
  dsCheck,
  jd_output,
  setJdProfileLoader,
}: {
  values: dsFormProps;
  dispatch: AppDispatch;
  dsCheck: string;
  editJdId?: string;
  jd_output: JdOutput;
  setJdProfileLoader: (a: boolean) => void;
}) => {
  if (
    jd_output.richtext_job_description !== values.jobDescription ||
    jd_output.job_role_id !== Number(values.jobRole)
  ) {
    setJdProfileLoader(true);
  }
  const dataBaseSkillFilter = values.skillData.dataBaseTags.filter(
    (x) => x.skill !== '',
  );
  const otherSkillFilter = values.skillData.othersTags.filter(
    (x) => x.skill !== '',
  );
  const platSkillFilter = values.skillData.platformsTags.filter(
    (x) => x.skill !== '',
  );
  const programSkillFilter = values.skillData.programTags.filter(
    (x) => x.skill !== '',
  );
  const toolsSkillFilter = values.skillData.toolsTags.filter(
    (x) => x.skill !== '',
  );

  const dataBaseSkill = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataToolsSkill = otherSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataProgramSkill = platSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataPlatSkill = programSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });
  const dataOtherSkill = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill + '|';
  });

  const dataBaseExp = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataToolsExp = otherSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataProgramExp = platSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataPlatExp = programSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });
  const dataOtherExp = toolsSkillFilter.map((dataList: any) => {
    return dataList.exp;
  });

  const dataBaseSkillOne = dataBaseSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const dataToolsSkillOne = otherSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataProgramSkillOne = platSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataPlatSkillOne = programSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });
  const dataOtherSkillOne = toolsSkillFilter.map((dataList: any) => {
    return dataList.skill;
  });

  const qualification = values.qualification.map((dataList: any) => {
    return dataList.education;
  });

  const specialization = values.qualification.map((dataList: any) => {
    return dataList.specialization;
  });

  let dataBaseComma = '';
  let toolComma = '';
  let progarmComma = '';
  let platComma = '';

  if (!isEmpty(dataBaseExp.toString())) {
    dataBaseComma = ',';
  } else {
    dataBaseComma = '';
  }
  if (!isEmpty(dataToolsExp.toString())) {
    toolComma = ',';
  } else {
    toolComma = '';
  }
  if (!isEmpty(dataProgramExp.toString())) {
    progarmComma = ',';
  } else {
    progarmComma = '';
  }
  if (!isEmpty(dataPlatExp.toString())) {
    platComma = ',';
  } else {
    platComma = '';
  }

  const experience =
    dataBaseExp.toString() +
    dataBaseComma +
    dataToolsExp.toString() +
    toolComma +
    dataProgramExp.toString() +
    progarmComma +
    dataPlatExp.toString() +
    platComma +
    dataOtherExp.toString();

  const skillsList =
    dataBaseSkill.toString() +
    dataToolsSkill.toString() +
    dataProgramSkill.toString() +
    dataPlatSkill.toString() +
    dataOtherSkill.toString();

  if (isEmpty(editJdId)) {
    dispatch(
      createJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_role: values.jobRole,
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: skillsList.replace(/,/g, ''),
        skills_exp: experience,
        database_skill: dataBaseSkillOne.length === 0 ? '' : dataBaseSkillOne,
        platform_skill: dataPlatSkillOne.length === 0 ? '' : dataPlatSkillOne,
        tool_skill: dataToolsSkillOne.length === 0 ? '' : dataToolsSkillOne,
        misc_skill: dataOtherSkillOne.length === 0 ? '' : dataOtherSkillOne,
        programming_skill:
          dataProgramSkillOne.length === 0 ? '' : dataProgramSkillOne,
        qualification,
        specialization,
      }),
    ).then((res) => {
      dispatch(
        dsOrNotMiddleWare({ jdId: res.payload.jd_id, is_ds_role: dsCheck }),
      ).then(() => {
        window.location.replace(routesPath.MY_JOB_POSTING);
      });
    });
  }

  if (!isEmpty(editJdId)) {
    dispatch(
      editJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_role: values.jobRole,
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: skillsList.replace(/,/g, ''),
        skills_exp: experience,
        database_skill: dataBaseSkillOne.length === 0 ? '' : dataBaseSkillOne,
        platform_skill: dataPlatSkillOne.length === 0 ? '' : dataPlatSkillOne,
        tool_skill: dataToolsSkillOne.length === 0 ? '' : dataToolsSkillOne,
        misc_skill: dataOtherSkillOne.length === 0 ? '' : dataOtherSkillOne,
        programming_skill:
          dataProgramSkillOne.length === 0 ? '' : dataProgramSkillOne,
        qualification,
        specialization,
        jdId: editJdId,
      }),
    ).then((editRes) => {
      dispatch(
        dsOrNotMiddleWare({ jdId: editRes.payload.jd_id, is_ds_role: dsCheck }),
      ).then(() => {
        window.location.replace(routesPath.MY_JOB_POSTING);
      });
    });
  }
};

// ds form validation
export const handleValidateForm = (
  values: dsFormProps,
  jobIdCheck: boolean,
) => {
  const error: Partial<dsFormProps> = {};

  const dataBaseSkillFilter = values.skillData.dataBaseTags.filter(
    (x) => x.skill !== '',
  );
  const otherSkillFilter = values.skillData.othersTags.filter(
    (x) => x.skill !== '',
  );
  const platSkillFilter = values.skillData.platformsTags.filter(
    (x) => x.skill !== '',
  );
  const programSkillFilter = values.skillData.programTags.filter(
    (x) => x.skill !== '',
  );
  const toolsSkillFilter = values.skillData.toolsTags.filter(
    (x) => x.skill !== '',
  );
  const skillValid =
    dataBaseSkillFilter.length === 0 &&
    otherSkillFilter.length === 0 &&
    platSkillFilter.length === 0 &&
    programSkillFilter.length === 0 &&
    toolsSkillFilter.length === 0
      ? false
      : true;
  if (!skillValid) {
    error.skillValid = THIS_FIELD_REQUIRED;
  }
  if (values.jobTitle === '') {
    error.jobTitle = THIS_FIELD_REQUIRED;
  }
  if (!isEmpty(values.jobTitle) && values.jobTitle.length > 50) {
    error.jobTitle = '';
  }
  if (isEmpty(values.jobRole)) {
    error.jobRole = THIS_FIELD_REQUIRED;
  }
  if (!isEmpty(values.jobId) && jobIdCheck === true) {
    error.jobId = '';
  }
  if (isEmpty(values.jobId)) {
    error.jobId = THIS_FIELD_REQUIRED;
  }
  if(isEmpty(values.currency)){
    error.currency= THIS_FIELD_REQUIRED;
  }
  if (!isEmpty(values.jobId) && values.jobId.length > 50) {
    error.jobId = '';
  }
  if (!isEmpty(values.jobDescription) && values.jobDescription.length < 201) {
    error.jobDescription = '';
  }
  // if (!isEmpty(values.jobDescription) && values.jobDescription.length > 20000) {
  //   error.jobDescription = '';
  // }
  if (isEmpty(values.jobDescription)) {
    error.jobDescription = THIS_FIELD_REQUIRED;
  }
  if (values.jobType === '0' || values.jobType === '') {
    error.jobType = THIS_FIELD_REQUIRED;
  }
  if (Number(values.minimumExperience) < 0) {
    error.minimumExperience = '';
  }
  if (values.minimumExperience === '') {
    error.minimumExperience = THIS_FIELD_REQUIRED;
  }
  if (
    !isEmpty(values.maximumExperience) &&
    Number(values.maximumExperience) <= Number(values.minimumExperience)
  ) {
    error.maximumExperience = '';
  }
  if (!isEmpty(values.vacancies) && Number(values.vacancies) >= 16) {
    error.vacancies = ENTER_VACANCIES;
  }
  if (!isEmpty(values.vacancies) && Number(values.vacancies) <= 0) {
    error.vacancies = ENTER_VACANCIES_0;
  }
  if (isEmpty(values.country)) {
    error.country = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.city)) {
    error.city = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.state)) {
    error.state = THIS_FIELD_REQUIRED;
  }
  if (
    Number(values.jobType) === 3 &&
    !isEmpty(values.minimumSalary) &&
    Number(values.minimumSalary) < 10
  ) {
    error.minimumSalary = '';
  }
  if (
    Number(values.jobType) === 3 &&
    !isEmpty(values.maximumSalary) &&
    Number(values.maximumSalary) > 1000
  ) {
    error.maximumSalary = '';
  }
  if (
    Number(values.jobType) !== 3 &&
    !isEmpty(values.minimumSalary) &&
    Number(values.minimumSalary) < 1000
  ) {
    error.minimumSalary = '';
  }
  if (
    Number(values.jobType) !== 3 &&
    !isEmpty(values.maximumSalary) &&
    Number(values.maximumSalary) > 9000000
  ) {
    error.maximumSalary = '';
  }
  if (
    !isEmpty(values.minimumSalary) &&
    !isEmpty(values.maximumSalary) &&
    Number(values.minimumSalary) >= Number(values.maximumSalary)
  ) {
    error.maximumSalary = '';
  }
  if (!isEmpty(values.minimumSalary) && isEmpty(values.maximumSalary)) {
    error.maximumSalary = THIS_FIELD_REQUIRED;
  }
  if (
    !isEmpty(values.minimumSalary) &&
    !isEmpty(values.maximumSalary) &&
    Number(values.minimumSalary) >= Number(values.maximumSalary)
  ) {
    error.minimumSalary = '';
  }
  if (isEmpty(values.minimumSalary) && !isEmpty(values.maximumSalary)) {
    error.minimumSalary = '';
  }
  return error;
};

// non ds form validation
export const handleNonDsValidateForm = (
  values: dsFormProps,
  jobIdCheck: boolean,
) => {
  const error: Partial<dsFormProps> = {};
  if (values.jobTitle === '') {
    error.jobTitle = THIS_FIELD_REQUIRED;
  }
  if (!isEmpty(values.jobTitle) && values.jobTitle.length > 50) {
    error.jobTitle = '';
  }
  if (!isEmpty(values.jobId) && jobIdCheck === true) {
    error.jobId = '';
  }
  if(isEmpty(values.currency)){
    error.currency= THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.jobId)) {
    error.jobId = THIS_FIELD_REQUIRED;
  }
  if (!isEmpty(values.jobId) && values.jobId.length > 50) {
    error.jobId = '';
  }
  if (!isEmpty(values.jobDescription) && values.jobDescription.length < 201) {
    error.jobDescription = '';
  }
  // if (!isEmpty(values.jobDescription) && values.jobDescription.length > 20000) {
  //   error.jobDescription = '';
  // }
  if (isEmpty(values.jobDescription)) {
    error.jobDescription = THIS_FIELD_REQUIRED;
  }
  if (values.jobType === '0' || values.jobType === '') {
    error.jobType = THIS_FIELD_REQUIRED;
  }
  if (Number(values.minimumExperience) < 0) {
    error.minimumExperience = '';
  }
  if (values.minimumExperience === '') {
    error.minimumExperience = THIS_FIELD_REQUIRED;
  }
  if (
    !isEmpty(values.maximumExperience) &&
    Number(values.maximumExperience) <= Number(values.minimumExperience)
  ) {
    error.maximumExperience = '';
  }
  if (Number(values.vacancies) >= 16) {
    error.vacancies = ENTER_VACANCIES;
  }
  if (!isEmpty(values.vacancies) && Number(values.vacancies) <= 0) {
    error.vacancies = ENTER_VACANCIES_0;
  }
  if (isEmpty(values.country)) {
    error.country = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.city)) {
    error.city = THIS_FIELD_REQUIRED;
  }
  if (isEmpty(values.state)) {
    error.state = THIS_FIELD_REQUIRED;
  }
  if (
    Number(values.jobType) === 3 &&
    !isEmpty(values.minimumSalary) &&
    Number(values.minimumSalary) < 10
  ) {
    error.minimumSalary = '';
  }
  if (
    Number(values.jobType) === 3 &&
    !isEmpty(values.maximumSalary) &&
    Number(values.maximumSalary) > 1000
  ) {
    error.maximumSalary = '';
  }
  if (
    Number(values.jobType) !== 3 &&
    !isEmpty(values.minimumSalary) &&
    Number(values.minimumSalary) < 1000
  ) {
    error.minimumSalary = '';
  }
  if (
    Number(values.jobType) !== 3 &&
    !isEmpty(values.maximumSalary) &&
    Number(values.maximumSalary) > 9000000
  ) {
    error.maximumSalary = '';
  }
  if (
    !isEmpty(values.minimumSalary) &&
    !isEmpty(values.maximumSalary) &&
    Number(values.minimumSalary) >= Number(values.maximumSalary)
  ) {
    error.maximumSalary = '';
  }
  if (!isEmpty(values.minimumSalary) && isEmpty(values.maximumSalary)) {
    error.maximumSalary = '';
  }
  if (
    !isEmpty(values.minimumSalary) &&
    !isEmpty(values.maximumSalary) &&
    Number(values.minimumSalary) >= Number(values.maximumSalary)
  ) {
    error.minimumSalary = '';
  }
  if (isEmpty(values.minimumSalary) && !isEmpty(values.maximumSalary)) {
    error.minimumSalary = '';
  }

  if (
    values.nonDsSkill === false ||
    (values.nonDsSkill && values.nonDsSkill?.length <= 0)
  ) {
    error.nonDsSkill = [THIS_FIELD_REQUIRED];
  }
  return error;
};

export const fieldTypeHelper = (fieldValue: number) => {
  switch (fieldValue) {
    case 1:
      return 'Single Line';
    case 2:
      return 'Paragraph';
    case 3:
      return 'Radio';
    case 4:
      return 'Checkbox';
    case 5:
      return 'Multiple Checkbox';
    case 6:
      return 'Multiple Radio';
    case 7:
      return 'Dropdown';
    default:
      return false;
  }
};

// non ds form submit
export const jdNonDsSubmit = ({
  values,
  dispatch,
  editJdId,
}: {
  values: dsFormProps;
  dispatch: AppDispatch;
  editJdId?: string;
}) => {
  const qualification = values.qualification.map((dataList: any) => {
    return dataList.education;
  });

  const specialization = values.qualification.map((dataList: any) => {
    return dataList.specialization;
  });
  const noDsSkillList = values.nonDsSkill?.map((list: any) => {
    return list.value;
  });

  if (isEmpty(editJdId)) {
    dispatch(
      createJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        qualification,
        specialization,
        skills: noDsSkillList?.toString(),
        job_role: '6',
      }),
    ).then((res) => {
      if (res.payload.success) {
        dispatch(
          dsOrNotMiddleWare({ jdId: res.payload.jd_id, is_ds_role: '0' }),
        ).then((dsRes) => {
          if (dsRes.payload.success) {
            questionnairePath(res.payload.jd_id);
          }
        });
      }
    });
  }

  if (!isEmpty(editJdId)) {
    dispatch(
      editJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: noDsSkillList?.toString(),
        qualification,
        specialization,
        jdId: editJdId,
        job_role: '6',
      }),
    ).then((editRes) => {
      if (editRes.payload.success) {
        dispatch(
          dsOrNotMiddleWare({ jdId: editRes.payload.jd_id, is_ds_role: '0' }),
        ).then((dsRes) => {
          if (dsRes.payload.success) {
            questionnairePath(editRes.payload.jd_id);
          }
        });
      }
    });
  }
};

// non ds draft submit
export const jdNonDsDraftSubmit = ({
  values,
  dispatch,
  editJdId,
}: {
  values: dsFormProps;
  dispatch: AppDispatch;
  editJdId?: string;
}) => {
  const qualification = values.qualification.map((dataList: any) => {
    return dataList.education;
  });

  const specialization = values.qualification.map((dataList: any) => {
    return dataList.specialization;
  });
  const noDsSkillList = values.nonDsSkill?.map((list: any) => {
    return list.value;
  });

  if (isEmpty(editJdId)) {
    dispatch(
      createJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        qualification,
        specialization,
        skills: noDsSkillList?.toString(),
        job_role: '6',
      }),
    ).then((res) => {
      if (res.payload.success) {
        dispatch(
          dsOrNotMiddleWare({ jdId: res.payload.jd_id, is_ds_role: '0' }),
        ).then(() => {
          window.location.replace(routesPath.MY_JOB_POSTING);
        });
      }
    });
  }

  if (!isEmpty(editJdId)) {
    dispatch(
      editJdPostMiddleWare({
        job_title: values.jobTitle.slice(0, 50),
        job_id: values.jobId,
        richtext_job_description: values.jobDescription,
        job_type: values.jobType,
        min_exp: values.minimumExperience,
        max_exp: values.maximumExperience,
        no_of_vacancies: values.vacancies,
        work_country: values.country,
        work_state: values.state,
        work_city: values.city,
        work_remote: values.remoteWork,
        salary_min: values.minimumSalary,
        salary_max: values.maximumSalary,
        salary_curr_type: values.currency,
        show_sal_to_candidate: values.showSalaryCandidates,
        industry_type: values.industryType,
        skills: noDsSkillList?.toString(),
        qualification,
        specialization,
        jdId: editJdId,
        job_role: '6',
      }),
    ).then((editRes) => {
      if (editRes.payload.success) {
        dispatch(
          dsOrNotMiddleWare({ jdId: editRes.payload.jd_id, is_ds_role: '0' }),
        ).then(() => {
          window.location.replace(routesPath.MY_JOB_POSTING);
        });
      }
    });
  }
};
