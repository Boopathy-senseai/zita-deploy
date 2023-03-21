import { createSlice } from '@reduxjs/toolkit';
import {
  ApplicantDataReducerState,
  ApplicantPipeLineReducerState,
  ApplicantUpdateReducerState,
} from '../../applicantPipeLineTypes';
import {
  applicantPipeLineDataMiddleWare,
  applicantPipeLineMiddleWare,
  applicantUpdateStatusMiddleWare,
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
  applicant: [],
  shortlisted: [],
  interviewed: [],
  selected: [],
  rejected: [],
  params: '',
  fav_id: false,
  google: [],
  outlook: [],
  total_applicants: 0,
};

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
        state.applicant = action.payload.applicant;
        state.shortlisted = action.payload.shortlisted;
        state.interviewed = action.payload.interviewed;
        state.selected = action.payload.selected;
        state.rejected = action.payload.rejected;
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
  },
});

export const applicantPipeLineReducers = applicantPipeLineReducer.reducer;
export const applicantPipeLineDataReducers =
  applicantPipeLineDataReducer.reducer;
export const applicantPipeLineUpdateReducers =
  applicantPipeLineUpdateReducer.reducer;
