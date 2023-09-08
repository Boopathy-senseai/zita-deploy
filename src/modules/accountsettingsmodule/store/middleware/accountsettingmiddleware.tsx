import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMPANYPAGE } from '../../../../actions/actions';
import { companyPageApi } from '../../../../routes/apiRoutes';

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
  'company_page_1',
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