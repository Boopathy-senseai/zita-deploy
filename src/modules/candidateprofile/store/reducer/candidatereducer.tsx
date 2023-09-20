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
  projects: [
    {
      project_id: 0,
      application_id_id: 0,
      work_proj_name: '',
      work_proj_client: '',
      work_proj_desig: '',
      work_proj_role: '',
      work_proj_duration: '',
      work_proj_location: '',
      work_proj_skills: '',
      work_proj_type: false,
      updated_at: '',
    },
  ],
  Qualification:[{
    qualification:''
  }]
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
      state.Qualification = action.payload.Qualification;
      state.industry_type = action.payload.industry_type;
      state.user_info = action.payload.user_info;
      state.personal_obj = action.payload.email;
      state.personal_obj = action.payload.personal_obj;
      state.projects = action.payload.projects;
      state.experiences = action.payload.experiences;
      state.career_page_setting = action.payload.career_page_setting;
      state.applied_status=action.payload.applied_status
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
  soft_skills: [
    {
      value: '',
      label: '',
    }
  ]
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
      state.soft_skills = action.payload.soft_skills;
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
