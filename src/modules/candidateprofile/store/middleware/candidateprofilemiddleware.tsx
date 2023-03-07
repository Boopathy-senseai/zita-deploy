import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CANDIDATE_PROFILE_BASIC_DETAILS,
  CANDIDATE_PROFILE_EMAIL_VALIDATE,
  CANDIDATE_PROFILE_OTP_VALIDATE,
  RESUME_UPLOAD,
} from '../../../../actions/actions';
import {
  basicDetailApi,
  educationUpdateApi,
  emailValidationApi,
  otpVerificationApi,
  profileEditApi,
  skillsUpdateApi,
  techSkillApi,
  updateJobPreferenceApi,
  updatePersonalInfoApi,
  uploadResumeApi,
} from '../../../../routes/apiRoutes';
import { EducationUpdatePayload } from '../../candidateProfileTypes';

const querystring = require('qs');

export const resumeUploadMiddleWare = createAsyncThunk(
  RESUME_UPLOAD,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const data = await fetch(uploadResumeApi, {
        method: 'POST',
        body: formData,
      });
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
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(profileEditApi);
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
