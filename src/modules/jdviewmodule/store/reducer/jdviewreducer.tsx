import { createSlice } from '@reduxjs/toolkit';
import { jdViewReducerState, JdDownloadReducerState,JdInactiveReducerState } from '../../jdViewTypes';
import {
  jdViewMiddleWare,
  jdDownloadMiddleWare,jdInactiveMiddleWare
} from '../middleware/jdviewmiddleware';

const jdViewState: jdViewReducerState = {
  isLoading: false,
  error: '',
  has_external_posting: false,
  career_page_url: '',
  recommended_role: '',
  dates: 0,
  int_list: {
    posted_at: '',
    reposted_on: '',
    jd_status: '',
    active_for: 0,
    zita_match: 0,
    applicants: 0,
    views: 0,
    interviewed: 0,
    screened: 0,
    offered: 0,
    shortlisted: 0,
    onboard: 0,
    invite: 0,
    rejected: 0,
  },
  jd: {
    industry_type__label_name: '',
    is_ds_role: false,
    jd_status__label_name: '',
    job_id: '',
    job_posted_on: '',
    job_role__label_name: '',
    job_title: '',
    job_type__label_name: '',
    no_of_vacancies: 0,
    id: 0,
    richtext_job_description: '',
    salary_curr_type__label_name: '',
    salary_max: 0,
    salary_min: 0,
    show_sal_to_candidate: false,
    work_remote: false,
    min_exp: 0,
    max_exp: 0,
    is_eeo_comp: false,
  },
  location: {
    country__name: '',
    state__name: '',
    city__name: '',
  },
  applicants_line: [],
  job_view_line: [],
  ext_jobs:[],
  questionnaire:[]
};

const jdViewReducer = createSlice({
  name: 'jdview',
  initialState: jdViewState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdViewMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdViewMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.available_jobs = action.payload.available_jobs;
      state.career_page_url = action.payload.career_page_url;
      state.company_detail = action.payload.company_detail;
      state.ext_jobs = action.payload.ext_jobs;
      state.has_external_posting = action.payload.has_external_posting;
      state.int_list = action.payload.int_list;
      state.jd = action.payload.jd;
      state.location = action.payload.location;
      state.dates = action.payload.dates;
      state.profile = action.payload.profile;
      state.questionnaire = action.payload.questionnaire;
      state.qualification = action.payload.qualification;
      state.recommended_role = action.payload.recommended_role;
      state.applicants_line = action.payload.applicants_line;
      state.job_view_line = action.payload.job_view_line;
      state.skills = action.payload.skills;
    });
    builder.addCase(jdViewMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdDownloadState: JdDownloadReducerState = {
  isLoading: false,
  error: '',
  file_path: '',
};

const jdDownloadReducer = createSlice({
  name: 'jdview',
  initialState: jdDownloadState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdDownloadMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdDownloadMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file_path = action.payload.file_path;
    });
    builder.addCase(jdDownloadMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});


const JdInactiveState: JdInactiveReducerState = {
  isLoading: false,
  error: '',
  success: false
};

const jdinactiveReducer = createSlice({
  name: 'jdview',
  initialState: JdInactiveState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdInactiveMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdInactiveMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
    });
    builder.addCase(jdInactiveMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
export const jdViewReducers = jdViewReducer.reducer;
export const jdinactiveReducers = jdinactiveReducer.reducer;
export const jdDownloadReducers = jdDownloadReducer.reducer;
