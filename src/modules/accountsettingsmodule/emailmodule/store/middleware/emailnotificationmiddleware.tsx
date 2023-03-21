import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EMAILNOTIFI } from '../../../../../actions/actions';
import { emailPreferenceApi } from '../../../../../routes/apiRoutes';

// import { CompanyPageload } from './../../CompanyPageTypes';

export const emailPreferenceMiddleWare = createAsyncThunk(
  EMAILNOTIFI,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(emailPreferenceApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);


export const emailPreferencePostMiddleWare = createAsyncThunk(
  EMAILNOTIFI,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        emailPreferenceApi,

        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);