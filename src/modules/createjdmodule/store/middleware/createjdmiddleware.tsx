import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  createJdApi,
  dsOrNotApi,
  duplicateApi,
  edit_jdApi,
  jdParserApi,
  jdPreviewApi,
  jdProfileApi,
  jdTemplatesApi,
  locationApi,
  missSkillsApi,
  postJdApi,
  questionnaireForJdApi,
  questionnaireSaveApi,
  questionnaireTemplateApi,
  whatjobsApi,
  selectDsorNonDsApi,
  validateJobIdApi,
} from '../../../../routes/apiRoutes';
import {
  JD_CREATE,
  JD_PARSER,
  JD_TEMPLATES,
  JD_LOCATION,
  JD_PROFILE,
  JD_QUESTIONNAIRE,
  JD_TEMPLATE,
  JD_DUPLICATE,
  JD_WHATJOBS,
} from '../../../../actions/actions';
import {
  CreateJdPostPayload,
  missJdPostPayload,
  questionnaireSavePayload,
} from '../../createJdTypes';
var querystring = require('qs');

export const jdParserMiddleWare = createAsyncThunk(
  JD_PARSER,
  async ({ upload }: { upload: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(jdParserApi, upload);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jdTemplatesApiMiddleWare = createAsyncThunk(
  JD_TEMPLATES,
  async ({ ds_role }: { ds_role: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jdTemplatesApi, { params: { ds_role } });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const createJdMiddleWare = createAsyncThunk(
  JD_CREATE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(createJdApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jdProfileMiddleWare = createAsyncThunk(
  JD_PROFILE,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jdProfileApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jdProfilePostMiddleWare = createAsyncThunk(
  JD_PROFILE + '_post',
  async (
    {
      jd_id,
      post_recom_role,
      do_not_change,
    }: { jd_id: string; post_recom_role?: string; do_not_change?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        jdProfileApi(jd_id),
        querystring.stringify(
          {
            post_recom_role,
            do_not_change,
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

export const createJdPostMiddleWare = createAsyncThunk(
  JD_CREATE + '_post',
  async ({ ...props }: CreateJdPostPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        createJdApi,
        querystring.stringify(
          {
            ...props,
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

export const missSkillPostMiddleWare = createAsyncThunk(
  'miss_skill_post',
  async (
    {
      database_skill,
      platform_skill,
      programming_skill,
      misc_skill,
      tool_skill,
      skills,
      skills_exp,
      jd_id,
    }: missJdPostPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        missSkillsApi(jd_id),
        querystring.stringify(
          {
            database_skill,
            platform_skill,
            programming_skill,
            misc_skill,
            tool_skill,
            skills,
            skills_exp,
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

export const missSkillGetMiddleWare = createAsyncThunk(
  'missing_skills_get',
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(missSkillsApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const locationMiddleWare = createAsyncThunk(
  JD_LOCATION,
  async (
    { country, state,location }: { country?: number; state?: number;location?: number; },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(locationApi, {
        params: {
          country,
          state,location
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const locationStateMiddleWare = createAsyncThunk(
  JD_LOCATION,
  async ({ country }: { country: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(locationApi, {
        params: {
          country,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const locationCityMiddleWare = createAsyncThunk(
  JD_LOCATION,
  async ({ state }: { state?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(locationApi, {
        params: {
          state,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const questionnaireForJdMiddleWare = createAsyncThunk(
  JD_QUESTIONNAIRE,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(questionnaireForJdApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const questionnaireTemplateMiddleWare = createAsyncThunk(
  JD_TEMPLATE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(questionnaireTemplateApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const duplicateMiddleWare = createAsyncThunk(
  JD_DUPLICATE,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(duplicateApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const questionnaireSaveMiddleWare = createAsyncThunk(
  'questionnaire_save',
  async (
    {
      jd_id,
      fieldType,
      question,
      option,
      description,
      required,
      temp,
    }: questionnaireSavePayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        questionnaireSaveApi(jd_id),
        querystring.stringify(
          {
            'field-type': fieldType,
            option,
            question,
            description,
            required,
            temp,
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

export const questionnaireSaveGetMiddleWare = createAsyncThunk(
  'questionnaire_save_get',
  async (
    { jd_id, is_eeo_comp }: { jd_id: string; is_eeo_comp?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(questionnaireSaveApi(jd_id), {
        params: { is_eeo_comp },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jdPreviewMiddleWare = createAsyncThunk(
  'jd_preview',
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jdPreviewApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const editJdPostMiddleWare = createAsyncThunk(
  'edit_jd_post',
  async ({ jdId, ...props }: CreateJdPostPayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        edit_jdApi(jdId),
        querystring.stringify(
          {
            ...props,
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

export const postJdMiddleWare = createAsyncThunk(
  'post_jd',
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(postJdApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const validateJobIDMiddleWare = createAsyncThunk(
  'validate_job_id',
  async (
    { job_id, jd_id }: { job_id: string; jd_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(validateJobIdApi, {
        params: { job_id, jd_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const dsOrNotMiddleWare = createAsyncThunk(
  'ds_or_not',
  async (
    { jdId, is_ds_role }: { jdId: string; is_ds_role: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        dsOrNotApi(jdId),
        querystring.stringify(
          {
            is_ds_role,
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
export const whatjobsMiddleWare = createAsyncThunk('what_jobs_posting/',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        whatjobsApi,
        formData 
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
// export const applicantUserListstateMiddleWare = createAsyncThunk(
//   APPLICANT_PROFILE_LIST,
//   async ({ formData }: any, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(applicantUserlistApi,
//         formData 
//       )
//       return data;
//     } catch (error) {
//       const typedError = error as Error;
//       return rejectWithValue(typedError);
//     }
//   },
// );

export const dsOrNonDsGetdMiddleWare = createAsyncThunk(
  'ds_or_non_ds',
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dsOrNotApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const selectDsorNonDsMiddleWare = createAsyncThunk(
  'select_ds_or_non_ds',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(selectDsorNonDsApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
