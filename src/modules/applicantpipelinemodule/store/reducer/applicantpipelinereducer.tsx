import { createSlice } from '@reduxjs/toolkit';
import {
  ApplicantDataReducerState,
  ApplicantPipeLineReducerState,
  ApplicantUpdateReducerState,
  KanbanStageReducerState,
} from '../../applicantPipeLineTypes';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
  applicantUpdateStatusMiddleWare,
  deleteKanbanStagesMiddleware,
  getKanbanStagesMiddleWare,
  kanbanUpdateMiddleWare,
  updateKanbanStagesMiddleware,
} from '../middleware/applicantpipelinemiddleware';

const applicantPipeLineState: ApplicantPipeLineReducerState = {
  isLoading: false,
  error: '',
  success: false,
  skill_list: [],
  jd_id: '',
  permission: [''],
  job_details: {
    city: '',
    country: '',
    job_role__label_name: '',
    job_title: '',
    state: '',
    job_id: '',
  },
  zita_match_count: 0,
};

const applicantPipeLineReducer = createSlice({
  name: 'applicantpipe',
  initialState: applicantPipeLineState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantPipeLineMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantPipeLineMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_id = action.payload.jd_id;
      state.skill_list = action.payload.skill_list;
      state.job_details = action.payload.job_details;
      state.success = action.payload.success;
      state.zita_match_count = action.payload.zita_match_count;
    });
    builder.addCase(applicantPipeLineMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantPipeLineDataState: ApplicantDataReducerState = {
  isLoading: false,
  error: '',
  jd_id: 0,
  workflow_id: null,
  applicants : {
    applicant: [],
    shortlisted: [],
    interviewed: [],
    selected: [],
    rejected: [],
  },
  params: '',
  fav_id: false,
  google: [],
  outlook: [],
  total_applicants: 0,
};

const getApplicants = (payload: any) => {
  const obj = Object.keys(payload)
  .filter(key => Array.isArray(payload[key]))
  .reduce((o, key) => ({...o, [key]: payload[key]}), {});
  return obj;
}

const applicantPipeLineDataReducer = createSlice({
  name: 'applicantpipe',
  initialState: applicantPipeLineDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantPipeLineDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      applicantPipeLineDataMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.jd_id = action.payload.jd_id;
        state.workflow_id = action.payload?.workflow_id || null;
        state.applicants = {
          ...getApplicants(action.payload),
        };
        // state.applicant = action.payload.applicant;
        // state.shortlisted = action.payload.shortlisted;
        // state.interviewed = action.payload.interviewed;
        // state.selected = action.payload.selected;
        // state.rejected = action.payload.rejected;
        state.fav_id = action.payload.fav_id;
        state.google = action.payload.google;
        state.outlook = action.payload.outlook;
        state.total_applicants = action.payload.total_applicants;
      },
    );
    builder.addCase(
      applicantPipeLineDataMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const applicantPipeLineUpdateState: ApplicantUpdateReducerState = {
  isLoading: false,
  error: '',
};

const applicantPipeLineUpdateReducer = createSlice({
  name: 'applicantpipe',
  initialState: applicantPipeLineUpdateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantUpdateStatusMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantUpdateStatusMiddleWare.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      applicantUpdateStatusMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );

    builder.addCase(kanbanUpdateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(kanbanUpdateMiddleWare.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      kanbanUpdateMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const kanbanStagesState: KanbanStageReducerState = {
  isLoading: false,
  error: '',
  selectPipeline: false,
  stages: [],
  update: {
    isLoading: false,
    error: '',
    message: '',
  },
  delete: {
    isLoading: false,
    error: '',
    message: '',
  },
};
const kanbanStagesReducer = createSlice({
  name: 'kanbanStages',
  initialState: kanbanStagesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getKanbanStagesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getKanbanStagesMiddleWare.fulfilled, (state, action) => {
      if(action.payload){
        state.isLoading = false;
      state.stages = action.payload.stages || action.payload.data || [];
      state.selectPipeline = action.payload.select_pipeline || false;
      }
    });
    builder.addCase(getKanbanStagesMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
    // update add case
    builder.addCase(updateKanbanStagesMiddleware.pending, (state) => {
      state.update.isLoading = true;
      state.update.error = '';
    });
    builder.addCase(updateKanbanStagesMiddleware.fulfilled, (state, action) => {
      state.update.isLoading = false;
      state.update.message = action.payload.message;
    });
    builder.addCase(updateKanbanStagesMiddleware.rejected, (state, action) => {
      state.update.isLoading = false;
      if (typeof action.payload === 'string') {
        state.update.error = action.payload;
      }
    });
    // delete add case
    builder.addCase(deleteKanbanStagesMiddleware.pending, (state) => {
      state.delete.isLoading = true;
      state.delete.error = '';
    });
    builder.addCase(deleteKanbanStagesMiddleware.fulfilled, (state, action) => {
      state.delete.isLoading = false;
      state.delete.message = action.payload.message;
    });
    builder.addCase(deleteKanbanStagesMiddleware.rejected, (state, action) => {
      state.delete.isLoading = false;
      if (typeof action.payload === 'string') {
        state.delete.error = action.payload;
      }
    });
  },
});

export const applicantPipeLineReducers = applicantPipeLineReducer.reducer;
export const applicantPipeLineDataReducers =
  applicantPipeLineDataReducer.reducer;
export const applicantPipeLineUpdateReducers =
  applicantPipeLineUpdateReducer.reducer;
export const kanbanStagesReducers = kanbanStagesReducer.reducer;
