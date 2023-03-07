import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { INTEGRATION,GOOGLE_SYNC,OUTLOOK_SYNC,CALBACK_URL,CALBACK_GOOGLE_URL } from '../../../../../actions/actions';
import { intergrationApi,googleSyncApi,outlookSyncApi,calbackurlApi,calbackurlGoogleApi } from '../../../../../routes/apiRoutes';

// import { CompanyPageload } from './../../CompanyPageTypes';

export const intergrationMiddleWare = createAsyncThunk(
  INTEGRATION,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(intergrationApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const googleSyncMiddleWare = createAsyncThunk(
  GOOGLE_SYNC,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(googleSyncApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const googleCallMiddleWare = createAsyncThunk(
  CALBACK_GOOGLE_URL,
  async ({ state,code,scope,}:any, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(calbackurlGoogleApi,{
        params: {
         state,
          code,
          scope,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const calbackurlMiddleWare = createAsyncThunk(
  CALBACK_URL,
  async ({ code }:any, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(calbackurlApi,{
        params: {
         code
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const outlookSyncMiddleWare = createAsyncThunk(
  OUTLOOK_SYNC,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(outlookSyncApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const intergrationPostMiddleWare = createAsyncThunk(
  INTEGRATION,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        intergrationApi,

        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
