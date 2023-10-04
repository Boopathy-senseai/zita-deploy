import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  BULK_IMPORT_INITIAL,
  BULK_UPLOADED_CANDIDATES,
  BULK_UPLOADED_DELETE,
  BULK_UPLOADED_PARSING,
  BULK_UPLOADED_PROFILE_VIEW,
  BULK_UPLOADED_EDU,
  BULK_UPLOADED_EXP,
  BULK_UPLOADED_EXP_UPDATE,
  BULK_UPLOADED_MATCH,
  BULK_UPLOADED_QUS,
  BULK_UPLOADED_UPDATE_SKILLS,
  BULK_UPLOADED_UPDATE_PERSONAL,
} from '../../../../actions/actions';
import {
  bulkImportApi,
  bulkUploadParsingApi,
  bulkUploadProfileView,
  bulkImportUpdatePersonalApi,
  uploadedCandidatesApi,
  uploadedCandiDelete,
  bulkUploadMatch,
  bulkUploadQus,
  bulkUploadExpAdd,
  bulkUploadSkills,
  bulkUploadEducationEdit,
  bulkUploadExpUpdate,
} from '../../../../routes/apiRoutes';
import { ParserPayload, UploadedTotalPayload } from '../../bulkImportTypes';
const querystring = require('qs');
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

export const bulkImportMatchMiddleWare = createAsyncThunk(
  BULK_UPLOADED_MATCH,
  async ({ isJdId }: { isJdId: any }, { rejectWithValue }) => {
    try {
      const url = `${bulkUploadMatch}?pk=${isJdId}`
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const bulkImportQusMiddleWare = createAsyncThunk(
  BULK_UPLOADED_QUS,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(bulkUploadQus, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const bulkImportUpdatePersonalMiddleWare = createAsyncThunk(
  BULK_UPLOADED_UPDATE_PERSONAL,
  async ({ formData }: { formData: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(bulkImportUpdatePersonalApi, formData);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const bulkImportQusGetMiddleWare = createAsyncThunk(
  'BULK_UPLOADED_CANDIDATES_Ques',
  async ({ jd_id,candi_id }: { jd_id: any,candi_id: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(bulkUploadQus, {
        params: {
          jd_id,candi_id
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const bulkuploadedCandidatesMiddleWare = createAsyncThunk(
  BULK_UPLOADED_CANDIDATES,
  async (
    {
      search,
      page,
      total,
      completed,
      incompleted,
      jd_id,
    }: UploadedTotalPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(uploadedCandidatesApi, {
        params: {
          search,
          page,
          jd_id,
          total,
          completed,
          incompleted,
        },
      });
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
  async ({
    parser
  }: ParserPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(bulkUploadParsingApi,{
        params: { parser } 
      });
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

export const bulkUploadSkillsUpdateMiddleWare = createAsyncThunk(
  BULK_UPLOADED_UPDATE_SKILLS,
  async (
    {
      empId,
      ...params
    }: { empId: number; soft_skill: string; tech_skill: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        bulkUploadSkills(empId),
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

export const bulkUploadEducationEditMiddleWare = createAsyncThunk(
  BULK_UPLOADED_EDU,
  async (
    {
      ...params
    }: {
      candi_id: string;
      qual_title: string;
      qual_spec: string;
      year_completed: string;
      percentage: string;
      institute_name: string;
      institute_location: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        bulkUploadEducationEdit,
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
export const bulkUploadExpUpdateMiddleWare = createAsyncThunk(
  BULK_UPLOADED_EXP_UPDATE,
  async (
    {
      empId,
      ...params
    }: {
      empId: number;
      from_exp: string;
      to_exp: string;
      organisations: string;
      designation: string;
      work_location: string;
      work_tools: string;
      work_role: string;
      till_date: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        bulkUploadExpUpdate(empId),
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

export const bulkUploadExpAddMiddleWare = createAsyncThunk(
  BULK_UPLOADED_EXP,
  async (
    {
      ...params
    }: {
      candi_id: string;
      from_exp: string;
      to_exp: string;
      organisations: string;
      designation: string;
      work_location: string;
      work_tools: string;
      work_role: string;
      till_date: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        bulkUploadExpAdd,
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

export const bulkUploadSkillsMiddleWare = createAsyncThunk(
  'skills_get',
  async ({ empId }: { empId: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(bulkUploadSkills(empId));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);