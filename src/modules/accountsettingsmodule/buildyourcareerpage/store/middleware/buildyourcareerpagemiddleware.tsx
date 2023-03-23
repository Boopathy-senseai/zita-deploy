import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ACCOUNT_SETTING_BUILD_CAREER,
  ACCOUNT_SETTING_BUILD_CAREER_POST,
  ACCOUNT_SETTING_CAREER_VIEW,
} from '../../../../../actions/actions';
import {
  buildCareerPageApi,
  careerJobViewApi,
  careerViewPageApi,
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
    }: {
      pageUrl: string;
      page?: number;
      job_title?: string;
      job_location?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(careerViewPageApi(pageUrl), {
        params: {
          page,
          job_location,
          job_title,
        },
        transformRequest: (_a, headers) => {
          delete headers.common.Authorization;
        }
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
    }: {
      id: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await fetch(careerJobViewApi(id));
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
