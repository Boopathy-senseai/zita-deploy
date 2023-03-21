import { createSlice } from '@reduxjs/toolkit';
import { CandidateDashBoardReducerState } from '../../candidateDashBoardTypes';
import { dashBoardMiddleWare } from '../middleware/dashboardmiddleware';

const dashBoardState: CandidateDashBoardReducerState = {
  isLoading: false,
  error: '',
  message_count: false,
  chatname: '',
  profile: '',
};

const dashboardReducer = createSlice({
  name: 'companypage',
  initialState: dashBoardState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashBoardMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(dashBoardMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company_detail = action.payload.company_detail;
      state.applied_job = action.payload.applied_job;
      state.chatname = action.payload.chatname;
      state.invites = action.payload.invites;
      state.setting = action.payload.setting;
      state.user_info = action.payload.user_info;
      state.profile = action.payload.profile;
    });
    builder.addCase(dashBoardMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const dashboardReducers = dashboardReducer.reducer;
