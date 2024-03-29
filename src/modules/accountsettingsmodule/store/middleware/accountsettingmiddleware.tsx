import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COMPANYPAGE } from '../../../../actions/actions';
import { companyPageApi, createemailtemplateApi, createjdtemplateApi, logoApi } from '../../../../routes/apiRoutes';

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

export const createjdtemplatepostMiddleWare = createAsyncThunk(
  'jd_templates',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        createjdtemplateApi,
        formData,
      );
      console.log("data",data)
      return data.data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const createemailtemplatepostMiddleWare = createAsyncThunk(
  'messages_templates',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        createemailtemplateApi,
        formData,
      );
      return data.data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jddeleteMiddleWare = createAsyncThunk(
  "createjdtemplateApi",
  async ( id : any, { rejectWithValue }) => {
    try {
      console.log("id",id)
      const url = id ? `${createjdtemplateApi}?id=${id}` : createjdtemplateApi;
      const { data } = await axios.delete(url);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const emailtemplatesgetMiddleWare = createAsyncThunk(
  "messages_templates",
  async (_a, { rejectWithValue }) => {
    try {
      
      const { data } = await axios.get(createemailtemplateApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const emailtemplatesdeleteMiddleWare = createAsyncThunk(
  "messages_templates",
  async ( id : any, { rejectWithValue }) => {
    try {
      const url = id ? `${createemailtemplateApi}?id=${id}` : createemailtemplateApi
      const { data } = await axios.delete(url);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);


export const logoMiddleWare = createAsyncThunk(
  'company_logo',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        logoApi,

        formData,
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);