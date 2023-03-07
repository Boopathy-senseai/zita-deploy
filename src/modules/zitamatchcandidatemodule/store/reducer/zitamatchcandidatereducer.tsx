import { createSlice } from '@reduxjs/toolkit';
import {
  ZitaMatchDataCandidateReducerState,
  ZitaMatchReducerState,
} from '../../zitaMatchCandidateTypes';
import {
  zitaMatchCandidateMiddleWare,
  zitaMatchDataCandidateMiddleWare,
} from '../middleware/zitamatchcandidatemiddleware';

const zitaMatchDataCandidateState: ZitaMatchDataCandidateReducerState = {
  isLoading: false,
  error: '',
  data: [],
  jd_id: '',
  total_count: 0,
  fav_id: false,
  user_type: '',
  params: '',
};

const zitaMatchDataCandidateReducer = createSlice({
  name: 'zitamatch',
  initialState: zitaMatchDataCandidateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(zitaMatchDataCandidateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      zitaMatchDataCandidateMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.jd_id = action.payload.jd_id;
        state.data = action.payload.data;
        state.total_count = action.payload.total_count;
        state.fav_id = action.payload.fav_id;
        state.user_type = action.payload.user_type;
        state.params = action.payload.params;
      },
    );
    builder.addCase(
      zitaMatchDataCandidateMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const zitaMatchCandidateState: ZitaMatchReducerState = {
  isLoading: false,
  error: '',
  success: false,
  skill_list: [],
  jd_id: '',
  job_details: {
    city: '',
    country: '',
    profile: '',
    job_title: '',
    state: '',
    job_id: '',
  },
  applicants_count: 0,
};

const zitaMatchCandidateReducer = createSlice({
  name: 'zitamatch',
  initialState: zitaMatchCandidateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(zitaMatchCandidateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(zitaMatchCandidateMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_id = action.payload.jd_id;
      state.skill_list = action.payload.skill_list;
      state.job_details = action.payload.job_details;
      state.applicants_count = action.payload.applicants_count;
    });
    builder.addCase(zitaMatchCandidateMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const zitaMatchDataCandidateReducers =
  zitaMatchDataCandidateReducer.reducer;
export const zitaMatchCandidateReducers = zitaMatchCandidateReducer.reducer;
