import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  BULK_IMPORT_INITIAL,
  BULK_UPLOADED_CANDIDATES,
  BULK_UPLOADED_DELETE,
  BULK_UPLOADED_PARSING,
  BULK_UPLOADED_PROFILE_VIEW,
} from '../../../../actions/actions';
import {
  bulkImportApi,
  bulkUploadParsingApi,
  bulkUploadProfileView,
  uploadedCandidatesApi,
  uploadedCandiDelete,
} from '../../../../routes/apiRoutes';
import {
  UploadedTotalPayload,
} from '../../bulkImportTypes';

export const bulkImportMiddleWare = createAsyncThunk(
  BULK_IMPORT_INITIAL,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(bulkImportApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const bulkuploadedCandidatesMiddleWare = createAsyncThunk(
  BULK_UPLOADED_CANDIDATES,
  async ({search,page,total,completed,incompleted}:UploadedTotalPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(uploadedCandidatesApi,{params:{
        search,
        page,
        total,
        completed,
        incompleted
      }});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const uploadedDeleteMiddleWare = createAsyncThunk(
  BULK_UPLOADED_DELETE,
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(uploadedCandiDelete(id))) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  },
);

export const bulkuploadedParsingMiddleWare = createAsyncThunk(
  BULK_UPLOADED_PARSING,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(bulkUploadParsingApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const uploadedProfileViewMiddleWare = createAsyncThunk(
  BULK_UPLOADED_PROFILE_VIEW,
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(bulkUploadProfileView(id))) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  },
);
