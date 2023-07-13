import { createSlice } from '@reduxjs/toolkit';
import {
  ApplicantsSourceMiddleWare,
  applicantSourceDataMiddleWare,
  passiveCandidateDataMiddleWare,
  jobMetricsChartMiddleWare,
  jobMetricsMiddleWare,
  sourcePerformanceMiddleWare,
  sourcePerformanceDataMiddleWare,
} from '../middleware/reportsmiddleware';
import {
  applicantsSourceReducerState,
  applicantsSourceDataReducerState,
} from '../../ApplicantsSourceTypes';

import { passiveCandidateReducerState } from '../../PassiveCandidateTypes';

import {
  jobMetricsReducerState,
  jobMetricsChartState,
} from '../../JobMetricsTypes';
import {
  sourcingPerformanceState,
  sourcingPerformanceDataState,
} from '../../SourcingPerformanceTypes';

const sourcingPerformance: sourcingPerformanceState = {
  isLoading: false,
  error: '',

  jd_list: [
    {
      id: 0,
      job_title: '',
      job_id: '',
    },
  ],
};

const sourcingPerformanceData: sourcingPerformanceDataState = {
  isLoading: false,
  error: '',
  perc_dict: [],
  total_count: { count__sum: 0 },
  applicants: 0,
  table: [],
  duration: '',
  posted_date: '',
};

const sourcingPerformanceDataReducer = createSlice({
  name: 'sourcingPerformanceData',
  initialState: sourcingPerformanceData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sourcePerformanceDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      sourcePerformanceDataMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.object1 = action.payload.object1;
        state.perc_dict = action.payload.perc_dict;
        state.total_count = action.payload.total_count;
        state.applicants = action.payload.applicants;
        state.table = action.payload.table;
        state.duration = action.payload.duration;
        state.posted_date = action.payload.posted_date;
      },
    );
    builder.addCase(
      sourcePerformanceDataMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const sourcingPerformanceReducer = createSlice({
  name: 'sourcingPerformance',
  initialState: sourcingPerformance,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sourcePerformanceMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(sourcePerformanceMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_list = action.payload.jd_list;
    });
    builder.addCase(sourcePerformanceMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jobMetricsChart: jobMetricsChartState = {
  isLoading: false,
  error: '',
  job_list: {
    id: 0,
    jd_status__value: '',
    no_of_vacancies: 0,
    job_title: '',
    job_id: '',
    job_posted_on: '',
    Zita_Match: 0,
    Invited_to_Apply: 0,
    Not_Interested: 0,
    Applicants: 0,
    Shortlisted: 0,
    Qualified: 0,
    Disqualified: 0,
    country_name: '',
    state_name: '',
    city_name: '',
    posted_channels: 0,
    interested: 0,
  },
  job_list_dict: {
    Zita_Match: 0,
    Invited_to_Apply: 0,
    Not_Interested: 0,
    Applicants: 0,
    Shortlisted: 0,
    Qualified: 0,
    Disqualified: 0,
  },
};
const jobMetrics: jobMetricsReducerState = {
  isLoading: false,
  error: '',

  job_list: [
    {
      id: 0,
      job_title: '',
      job_id: '',
      no_of_vacancies: 0,
      applicants: 0,
      offered: 0,
      rejected: 0,
      shortlisted: 0,
      zita_match: 0,
      invite_to_apply: 0,
      not_interested: 0,
      interested: 0,
    },
  ],
  params: '',
  len_list: 1,
};
const jobMetricsChartReducer = createSlice({
  name: 'jobMetricsChart',
  initialState: jobMetricsChart,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jobMetricsChartMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jobMetricsChartMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;

      state.job_list = action.payload.job_list;
      state.job_list_dict = action.payload.job_list_dict;
    });
    builder.addCase(jobMetricsChartMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
const jobMetricsDataReducer = createSlice({
  name: 'jobMetrics',
  initialState: jobMetrics,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jobMetricsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jobMetricsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;

      state.job_list = action.payload.job_list;
      state.len_list = action.payload.len_list;
      state.params = action.payload.params;
    });
    builder.addCase(jobMetricsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
const applicantsSource: applicantsSourceReducerState = {
  isLoading: false,
  error: '',

  jd_list: [
    {
      id: 0,
      job_title: '',
      job_id: '',
    },
  ],
};

const applicantsSourceData: applicantsSourceDataReducerState = {
  isLoading: false,
  error: '',

  total_count: { count__sum: 0 },
  table: [
    {
      id: 0,
      jd_id_id: 0,
      count: 0,
      source: '',
      created_at: '',
      total: 0,
      applicant: 0,
      shortlisted: 0,
      hired: 0,
      rejected: 0,
    },
  ],
  short: 0,
  pie_chart: [],
  shortlisted: [
    { 'Career Page': 0 },
    { Whatsapp: 0 },
    { Facebook: 0 },
    { Gmail: 0 },
    { Twitter: 0 },
    { 'Resume Library': 0 },
  ],
};

const applicantsSourceReducer = createSlice({
  name: 'applicantsSource',
  initialState: applicantsSource,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ApplicantsSourceMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(ApplicantsSourceMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_list = action.payload.jd_list;
    });
    builder.addCase(ApplicantsSourceMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantsSourceDataReducer = createSlice({
  name: 'applicantsSourceData',
  initialState: applicantsSourceData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantSourceDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      applicantSourceDataMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;

        state.total_count = action.payload.total_count;
        state.table = action.payload.table;
        state.short = action.payload.short;
        state.pie_chart = action.payload.pie_chart;
        state.shortlisted = action.payload.shortlisted;
      },
    );
    builder.addCase(applicantSourceDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const passiveCandidateData: passiveCandidateReducerState = {
  isLoading: false,
  error: '',

  add_on_dict: [],
};

const passiveCandidateDataReducer = createSlice({
  name: 'passiveCandidateData',
  initialState: passiveCandidateData,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passiveCandidateDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      passiveCandidateDataMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.add_on_dict = action.payload.add_on_dict;
      },
    );
    builder.addCase(
      passiveCandidateDataMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});
export const applicantsSourceReducers = applicantsSourceReducer.reducer;
export const passiveCandidateDataReducers = passiveCandidateDataReducer.reducer;
export const applicantsSourceDataReducers = applicantsSourceDataReducer.reducer;
export const jobMetricsDataReducers = jobMetricsDataReducer.reducer;
export const jobMetricsChartReducers = jobMetricsChartReducer.reducer;
export const sourcingPerformanceReducers = sourcingPerformanceReducer.reducer;
export const sourcingPerformanceDataReducers = sourcingPerformanceDataReducer.reducer;