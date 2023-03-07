import { createSlice } from '@reduxjs/toolkit';
import {
  CandidateProfileEditReducerState,
  TechSkillReducerState,
} from '../../candidateProfileTypes';
import {
  profileEditMiddleWare,
  techSkillMiddleWare,
} from '../middleware/candidateprofilemiddleware';

const locationState: CandidateProfileEditReducerState = {
  isLoading: false,
  error: '',
};

const candidateProfileEditReducer = createSlice({
  name: 'candidate',
  initialState: locationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileEditMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(profileEditMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.obj = action.payload.obj;
      state.additional_detail = action.payload.additional_detail;
      state.personal = action.payload.personal;
      state.industry_type = action.payload.industry_type;
      state.user_info = action.payload.user_info;
      state.personal_obj = action.payload.email;
      state.personal_obj = action.payload.personal_obj;
    });
    builder.addCase(profileEditMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const techSkillState: TechSkillReducerState = {
  isLoading: false,
  error: '',
  skills_list: [
    {
      label: '',
      value: '',
    },
  ],
};

const techSkillReducer = createSlice({
  name: 'candidate',
  initialState: techSkillState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(techSkillMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(techSkillMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.skills_list = action.payload.skills_list;
      state.skills = action.payload.skills;
    });
    builder.addCase(techSkillMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const candidateProfileEditReducers = candidateProfileEditReducer.reducer;
export const techSkillReducers = techSkillReducer.reducer;
