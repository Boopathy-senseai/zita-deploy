import { createSlice } from '@reduxjs/toolkit';
import {
  DashboardCalenderReducerState,
  DashBoardEmpReducerState,
  DashBoardMessageReducerState,
  JdMetricsReducerState,
} from '../DashBoardTypes';
import {
  dashboardCalenderMiddleWare,
  dashboardJobMetricsMiddleWare,
  dashboardMessageMiddleWare,
  dashBoardMiddleWare,
} from './dashboardmiddleware';

const dashBoardState: DashBoardEmpReducerState = {
  isLoading: false,
  error: '',
  company_name: '',
  total_jobs: 0,
  jobs_last_update: '',
  applicants_last_update: '',
  viewed_last_update: '',
  logo: '',
  user_info: {
    id: 0,
    password: '',
    last_login: '',
    is_superuser: false,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    is_staff: false,
    is_active: false,
    date_joined: '',
  
  },
  contact_count: 0,
  rejected_last_update: '',
  invite_to_apply_last_update: '',
  shortlisted_last_update: '',
  selected_last_update: '',
  applicants: 0,
  shortlisted: 0,
  selected: 0,
  viewed: 0,
  plan: {
    subscription_id: 0,
    client_id_id: 0,
    plan_id_id: 0,
    subscription_start_ts: '',
    subscription_valid_till: '',
    subscription_end_ts: '',
    subscription_changed_date: '',
    no_of_users: 0,
    subscription_remains_days: 0,
    auto_renewal: false,
    is_active: false,
    has_client_changed_subscription: false,
    updated_by: '',
    grace_period_days: 0,
    created_at: '',
  },
  rejected: 0,
  invite_to_apply: 0,
  jd_metrics: [
    {
      id: 0,
      job_id: '',
      job_title: '',
    },
  ],
  career_page_url: '',
};

const dashboardEmpReducer = createSlice({
  name: 'dashboard',
  initialState: dashBoardState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashBoardMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(dashBoardMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company_name = action.payload.company_name;
      state.total_jobs = action.payload.total_jobs;
      state.jobs_last_update = action.payload.jobs_last_update;
      state.applicants_last_update = action.payload.applicants_last_update;
      state.viewed_last_update = action.payload.viewed_last_update;
      state.logo = action.payload.logo;
      state.user_info = action.payload.user_info;
      state.contact_count = action.payload.contact_count;
      state.rejected_last_update = action.payload.rejected_last_update;
      state.invite_to_apply_last_update =
        action.payload.invite_to_apply_last_update;
      state.shortlisted_last_update = action.payload.shortlisted_last_update;
      state.selected_last_update = action.payload.selected_last_update;
      state.applicants = action.payload.applicants;
      state.shortlisted = action.payload.shortlisted;
      
      state.selected = action.payload.selected;
      state.viewed = action.payload.viewed;
      state.plan = action.payload.plan;
      state.rejected = action.payload.rejected;
      state.invite_to_apply = action.payload.invite_to_apply;
      state.jd_metrics = action.payload.jd_metrics;
      state.candidate_count = action.payload.candidate_count;
      state.job_count = action.payload.job_count;
      state.career_page_url = action.payload.career_page_url;
      state.google = action.payload.google;
      state.outlook = action.payload.outlook;

    });
    builder.addCase(dashBoardMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const dashBoardMessageState: DashBoardMessageReducerState = {
  isLoading: false,
  error: '',
  message: [
    {
      id: 0,
      sender_id: 0,
      receiver_id: 0,
      jd_id_id: 0,
      text: '',
      is_read: false,
      date_created: '',
      first_name: '',
      last_name: '',
      jd: 0,
      message: '',
      time: '',
      profile_pic: '',
      can_id: 0,
      can_source: '',
    },
  ],
  message_count: 0,
};

const dashboardEmpMessageReducer = createSlice({
  name: 'dashboard',
  initialState: dashBoardMessageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboardMessageMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(dashboardMessageMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
      state.message_count = action.payload.message_count;
    });
    builder.addCase(dashboardMessageMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const JdMetricsState: JdMetricsReducerState = {
  isLoading: false,
  error: '',
  posted_date: '',
  zita_match: 0,
  posted_channel: 0,
  total_count: {},
};

const dashboardJobMetricsReducer = createSlice({
  name: 'dashboard',
  initialState: JdMetricsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboardJobMetricsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      dashboardJobMetricsMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.role_base = action.payload.role_base;
        state.posted_date = action.payload.posted_date;
        state.dates_length = action.payload.dates_length;
        state.zita_match = action.payload.zita_match;
        state.posted_channel = action.payload.posted_channel;
        state.total_count = action.payload.total_count;
        state.job_details = action.payload.job_details;
        state.perc_dict = action.payload.perc_dict;
        state.pipeline = action.payload.pipeline;
        state.my_database = action.payload.my_database;
        state.job_count = action.payload.job_count;
      },
    );
    builder.addCase(dashboardJobMetricsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const DashboardCalenderState: DashboardCalenderReducerState = {
  isLoading: false,
  error: '',
  events: [
    {
      id: 0,
      is_active: false,
      is_deleted: false,
      created_at: '',
      updated_at: '',
      user_id: 0,
      title: '',
      description: '',
      start_time: '',
      end_time: '',
      created_by: '',
      web_url: '',
      attendees: '',
    },
  ],
};

const dashboardCalenderStateReducer = createSlice({
  name: 'dashboard',
  initialState: DashboardCalenderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboardCalenderMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(dashboardCalenderMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload.events;
    });
    builder.addCase(dashboardCalenderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const dashboardEmpReducers = dashboardEmpReducer.reducer;
export const dashboardEmpMessageReducers = dashboardEmpMessageReducer.reducer;
export const dashboardJobMetricsReducers = dashboardJobMetricsReducer.reducer;
export const dashboardCalenderStateReducers = dashboardCalenderStateReducer.reducer;
