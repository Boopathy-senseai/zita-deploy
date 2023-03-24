import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ACCOUNT_SETTING_BUILD_CAREER,
  ACCOUNT_SETTING_BUILD_CAREER_POST,
  ACCOUNT_SETTING_CAREER_VIEW,
} from '../../../../../actions/actions';
import {
  buildCareerPageApi,
  candiInviteStatusApi,
  careerJobViewApi,
  careerViewPageApi,
  jobViewCountApi,
  urlValidApi,
} from '../../../../../routes/apiRoutes';

export const buildCareerMiddleWare = createAsyncThunk(
  ACCOUNT_SETTING_BUILD_CAREER,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(buildCareerPageApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const buildCareerPostMiddleWare = createAsyncThunk(
  ACCOUNT_SETTING_BUILD_CAREER_POST,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(buildCareerPageApi, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const careerViewPageMiddleWare = createAsyncThunk(
  ACCOUNT_SETTING_CAREER_VIEW,
  async (
    {
      pageUrl,
      page,
      job_location,
      job_title,
      user_id,
    }: {
      pageUrl: string;
      page?: number;
      job_title?: string;
      job_location?: string;
      user_id: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(careerViewPageApi(pageUrl), {
        params: {
          page,
          job_location,
          job_title,
          user_id,
        },
        transformRequest: (_a, headers) => {
          delete headers.common.Authorization;
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const careerJobViewMiddleWare = createAsyncThunk(
  'career_job_view',
  async (
    {
      id,
      userID,
    }: {
      id: string;
      userID: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(careerJobViewApi(id), {
        params: { user_id: userID },
        transformRequest: (_a, headers) => {
          delete headers.common.Authorization;
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applocationFormPostMiddleWare = createAsyncThunk(
  'application_form_post',
  async (
    { id, formData, user_id }: { id: string; formData: any; user_id: any },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(careerJobViewApi(id), formData, {
        params: { user_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const candiInviteStatusMiddleware = createAsyncThunk(
  'candi_invite_status',
  async (
    {
      candi_id,
      interested,
      jdId,
    }: { candi_id: string; interested: string; jdId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(candiInviteStatusApi(jdId), {
        params: { can_id: candi_id, interested },
        transformRequest: (_a, headers) => {
          delete headers.common.Authorization;
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const urlVerificationMiddleWare = createAsyncThunk(
  'url_verification',
  async ({ url }: { url: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(urlValidApi, { params: { url } });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jobViewCountMiddleWare = createAsyncThunk(
  'jobViewCount',
  async (
    {
      source,
      jdId,
    }: {
      source: string;
      jdId: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(jobViewCountApi(jdId), {
        params: { source },
        transformRequest: (_a, headers) => {
          delete headers.common.Authorization;
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
