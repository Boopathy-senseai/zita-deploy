import { createSlice } from '@reduxjs/toolkit';
import { companyPageInitalMiddleWare, emailtemplatesgetMiddleWare } from '../middleware/accountsettingmiddleware';
import { companyPageReducerState, emailTemplateReducerState } from '../../CompanyPageTypes';

const companyPageState: companyPageReducerState = {
  isLoading: false,
  error: '',
  success: false,
  build_career_page: false,
  permission: [],
  country: [],
  state: [],
  city: [],
  company_detail: {
    id: 0,
    recruiter_id_id: 0,
    company_name: '',
    company_website: '',
    email: '',
    contact: '',
    industry_type_id: 0,
    no_of_emp: 0,
    address: '',
    country_id: 0,
    state_id: 0,
    city_id: 0,
    zipcode: '',
    updated_by: '',
    logo: '',
    created_at: '',
  },
  career_page_exists:true,
};

const companyPageReducer = createSlice({
  name: 'companypage',
  initialState: companyPageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(companyPageInitalMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(companyPageInitalMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.build_career_page = action.payload.build_career_page;
      state.permission = action.payload.permission;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.city = action.payload.city;
      state.company_detail = action.payload.company_detail;
    });
    builder.addCase(companyPageInitalMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const companyPageReducers = companyPageReducer.reducer;

const emailTemplateState: emailTemplateReducerState = {
  isLoading: false,
  error: '',
  data : [{
    created_on: '',
    full_name: '',
    id: 0,
    is_active: false,
    name: '',
    subject: '',
    templates: '',
    user_id: 0,
  }],
  role: '',
}

const emailTempalateReducer = createSlice({
  name: 'emailTemplate',
  initialState: emailTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emailtemplatesgetMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(emailtemplatesgetMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.role= action.payload.role;   
    });
    builder.addCase(emailtemplatesgetMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const emailTemplateReducers = emailTempalateReducer.reducer;
