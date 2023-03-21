import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { USERPROFILE,PASSWORD } from '../../../../../actions/actions';
import { userProfileApi,passwordChangeApi } from '../../../../../routes/apiRoutes';

// import { CompanyPageload } from './../../CompanyPageTypes';

export const userProfileMiddleWare = createAsyncThunk(
  USERPROFILE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(userProfileApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const userProfilePostMiddleWare = createAsyncThunk(
  USERPROFILE,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        userProfileApi,

        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const passwordChangeMiddleWare = createAsyncThunk(
  PASSWORD,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        passwordChangeApi,
        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);