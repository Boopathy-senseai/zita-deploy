import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CANDIDATA_PROFILE_RESUME_UPLOAD,
  CANDIDATE_PROFESSIONAL_DATA,
  CANDIDATE_PROFILE_BASIC_DETAILS,
  CANDIDATE_PROFILE_EMAIL_VALIDATE,
  CANDIDATE_PROFILE_OTP_VALIDATE,
  RESUME_UPLOAD,
} from '../../../../actions/actions';
import {
  basicDetailApi,
  courseAddApi,
  courseUpdateApi,
  downloadProfileApi,
  educationAdd,
  educationUpdateApi,
  emailValidationApi,
  experiencesAddApi,
  experienceUpdateApi,
  otpVerificationApi,
  professionalResume,
  profileEditApi,
  projectAddApi,
  projectUpdateApi,
  resumeReupload,
  skillsUpdateApi,
  techSkillApi,
  updateJobPreferenceApi,
  updatePersonalInfoApi,
  uploadResumeApi,
} from '../../../../routes/apiRoutes';
import {
  CertificatePayload,
  EducationUpdatePayload,
  ProjectPayload,
  WorkExpPayload,
} from '../../candidateProfileTypes';

const querystring = require('qs');

export const resumeUploadMiddleWare = createAsyncThunk(
  RESUME_UPLOAD,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const data = await fetch(uploadResumeApi, {
        method: 'POST',
        body: formData,
      });
      console.log(data)
      return await data.json();
      
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const personalInformationMiddleware = createAsyncThunk(
  CANDIDATE_PROFESSIONAL_DATA,
  async ({emp_id}: {emp_id: string}, { rejectWithValue }) => {
    try {
      const data = await axios.get(`${professionalResume}?emp-id=${emp_id}`);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const resumeReUploadMiddleWare = createAsyncThunk(
  CANDIDATA_PROFILE_RESUME_UPLOAD,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const data = await axios.post(resumeReupload, formData
      // {
      //   method: 'POST',
      //   body: formData,
      // }
      );
      return  data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const imgGetMiddleWare = createAsyncThunk(
  RESUME_UPLOAD,
  async ({ empId }: { empId: any }, { rejectWithValue }) => {
    try {
      const data = await fetch(`${uploadResumeApi}?emp-id=${empId}`);
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const basicDetailMiddleWare = createAsyncThunk(
  CANDIDATE_PROFILE_BASIC_DETAILS,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(basicDetailApi, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const emailValidationMiddleWare = createAsyncThunk(
  CANDIDATE_PROFILE_EMAIL_VALIDATE,
  async (
    { email, empId }: { email: string; empId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(emailValidationApi, {
        params: { email, 'emp-id': empId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const otpVerificationMiddleWare = createAsyncThunk(
  CANDIDATE_PROFILE_OTP_VALIDATE,
  async (
    {
      ...props
    }: { OTP?: string; 'emp-id': string; resend?: string; change?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(otpVerificationApi, {
        params: { ...props },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const profileEditMiddleWare = createAsyncThunk(
  'profile_edit',
  async ({jd_id}:{jd_id:any}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(profileEditApi,{params:{jd_id}});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const updatePersonalInfoMiddleWare = createAsyncThunk(
  'update_personal_info',
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(updatePersonalInfoApi, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const updateJobPreferenceMiddleWare = createAsyncThunk(
  'update_job_preference',
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(updateJobPreferenceApi, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const skillsUpdateApiMiddleWare = createAsyncThunk(
  'skills_update',
  async (
    {
      empId,
      ...params
    }: { empId: number; soft_skill: string; tech_skill: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        skillsUpdateApi(empId),
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const techSkillMiddleWare = createAsyncThunk(
  'skills',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(techSkillApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const educationUpdateApiMiddleWare = createAsyncThunk(
  'education_update',
  async ({ eduId, ...params }: EducationUpdatePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        educationUpdateApi(eduId),
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const educationDeleteMiddleWare = createAsyncThunk(
  'education_delete',
  async ({ eduId }: { eduId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(educationUpdateApi(eduId));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const educationAddMiddleWare = createAsyncThunk(
  'education_add',
  async ({ ...params }: EducationUpdatePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        educationAdd,
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const experienceUpdateMiddleWare = createAsyncThunk(
  'experience_update',
  async ({ id, ...params }: WorkExpPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        experienceUpdateApi(id),
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const experienceDeleteMiddleWare = createAsyncThunk(
  'experience_delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(experienceUpdateApi(id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const experiencesAddMiddleWare = createAsyncThunk(
  'experience_add',
  async ({ ...params }: WorkExpPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        experiencesAddApi,
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const projectUpdateMiddleWare = createAsyncThunk(
  'project_update',
  async ({ id, ...params }: ProjectPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        projectUpdateApi(id),
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const projectAddMiddleWare = createAsyncThunk(
  'project_add',
  async ({ ...params }: ProjectPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        projectAddApi,
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const projectDeleteMiddleWare = createAsyncThunk(
  'project_delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(projectUpdateApi(id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const courseDeleteMiddleWare = createAsyncThunk(
  'course_delete',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(courseUpdateApi(id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const courseUpdateMiddleWare = createAsyncThunk(
  'course_update',
  async ({ id, ...params }: CertificatePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        courseUpdateApi(id),
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const courseAddMiddleWare = createAsyncThunk(
  'course_add',
  async ({ ...params }: CertificatePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        courseAddApi,
        querystring.stringify(
          {
            ...params,
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const downloadProfileMiddleWare = createAsyncThunk(
  'download_profile',
  async ({ can_id }: { can_id?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(downloadProfileApi, {
        params: { can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
