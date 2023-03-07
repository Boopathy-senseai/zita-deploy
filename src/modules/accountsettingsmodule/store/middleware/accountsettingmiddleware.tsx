import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMPANYPAGE } from '../../../../actions/actions';
import { companyPageApi } from '../../../../routes/apiRoutes';

// import { CompanyPageload } from './../../CompanyPageTypes';

export const companyPageInitalMiddleWare = createAsyncThunk(
  COMPANYPAGE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(companyPageApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const companyPagePostMiddleWare = createAsyncThunk(
  COMPANYPAGE,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        companyPageApi,

        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);