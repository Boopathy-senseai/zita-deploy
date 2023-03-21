import { createSlice } from '@reduxjs/toolkit';
import {
  BuildYourCareerReducerState,
  CareerPageReducerState,
  JobViewReducerState,
} from '../../buildCareerPageTypes';
import {
  buildCareerMiddleWare,
  careerJobViewMiddleWare,
  careerViewPageMiddleWare,
} from '../middleware/buildyourcareerpagemiddleware';

const buildCareerState: BuildYourCareerReducerState = {
  isLoading: false,
  error: '',
  success: '',
  career_page: {
    id: 0,
    recruiter_id_id: 0,
    page_font: '',
    header_font_size: 0,
    header_color: '',
    menu_1: '',
    menu_1_url: '',
    menu_2: '',
    menu_2_url: '',
    menu_3: '',
    menu_3_url: '',
    page_font_size: 0,
    banner_img: '',
    banner_header_text: '',
    banner_text: '',
    banner_font_size: 0,
    about_us: '',
    button_color: '',
    footer_color: '',
    updated_by: '',
    career_page_url: '',
    banner_heading_size: '',
  },
  career_page_exists: true,
  domain: '',
  company_detail: {
    id: 0,
    recruiter_id_id: 0,
    company_name: '',
    email: '',
    contact: '',
    logo: '',
    created_at: '',
  },
};

const buildCareerPageReducer = createSlice({
  name: 'buildCareer',
  initialState: buildCareerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(buildCareerMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(buildCareerMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.career_page = action.payload.career_page;
      state.career_page_exists = action.payload.career_page_exists;
      state.domain = action.payload.domain;
      state.company_detail = action.payload.company_detail;
    });
    builder.addCase(buildCareerMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const careerPageState: CareerPageReducerState = {
  isLoading: false,
  error: '',
  total: 0,
  jd_active: false,
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
  career_page_setting: {
    id: 0,
    recruiter_id_id: 0,
    page_font: '',
    header_font_size: 0,
    header_color: '',
    menu_1: '',
    menu_1_url: '',
    menu_2: '',
    menu_2_url: '',
    menu_3: '',
    menu_3_url: '',
    page_font_size: 0,
    banner_img: '',
    banner_header_text: '',
    banner_text: '',
    banner_font_size: 0,
    about_us: '',
    button_color: '',
    footer_color: '',
    updated_by: '',
    career_page_url: '',
    banner_heading_size: 0,
  },
  jd_form: [
    {
      id: 0,
      job_posted_on: '',
      job_reposted_on: '',
      user_id_id: 0,
      job_title: '',
      job_id: '',
      visa_sponsor: false,
      company_name: '',
      company_website: '',
      no_of_vacancies: 0,
      company_logo: '',
      job_role_id: 0,
      org_info: '',
      min_exp: 0,
      max_exp: 0,
      is_ds_role: false,
      is_eeo_comp: false,
      work_remote: false,
      role_res: '',
      job_description: '',
      richtext_job_description: '',
      tech_req: '',
      non_tech_req: '',
      updated_by: '',
      industry_type_id: 0,
      add_info: '',
      salary_min: 0,
      salary_max: 0,
      salary_curr_type_id: 0,
      show_sal_to_candidate: false,
      job_type_id: 0,
      jd_status_id: 0,
      created_on: '',
      country: '',
      state: '',
      city: '',
      job_location: '',
    },
  ],
  login_user: false,
  image:''
};

const careerViewPageReducer = createSlice({
  name: 'careerView',
  initialState: careerPageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(careerViewPageMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(careerViewPageMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company_detail = action.payload.company_detail;
      state.career_page_setting = action.payload.career_page_setting;
      state.jd_form = action.payload.jd_form;
      state.total = action.payload.total;
      state.jd_active = action.payload.jd_active;
      state.login_user = action.payload.login_user;
      state.user_detail = action.payload.user_detail;
      state.image = action.payload.image;
    });
    builder.addCase(careerViewPageMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jobViewState: JobViewReducerState = {
  isLoading: false,
  error: '',
  login_user: false,
  emp_id: 0,
  current_site: '',
  success: false,
  applied_status: 0,
  apply_user: 0,
  skills: [{ id: 0, jd_id_id: 0, category_id: 0, skill: '', experience: '' }],
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
  setting: {
    id: 0,
    recruiter_id_id: 0,
    page_font: '',
    header_font_size: 0,
    header_color: '',
    menu_1: '',
    menu_1_url: '',
    menu_2: '',
    menu_2_url: '',
    menu_3: '',
    menu_3_url: '',
    page_font_size: 0,
    banner_img: '',
    banner_header_text: '',
    banner_text: '',
    banner_font_size: 0,
    about_us: '',
    button_color: '',
    footer_color: '',
    updated_by: '',
    career_page_url: '',
    banner_heading_size: 0,
  },
};

const jobViewReducer = createSlice({
  name: 'careerView',
  initialState: jobViewState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(careerJobViewMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(careerJobViewMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company_detail = action.payload.company_detail;
      state.setting = action.payload.setting;
      state.skills = action.payload.skills;
      state.jd_form = action.payload.jd_form;
      state.education = action.payload.education;
      state.success = action.payload.success;
      state.questionnaire = action.payload.questionnaire;
      state.login_user = action.payload.login_user;
      state.applicant_detail = action.payload.applicant_detail;
      state.applied_status = action.payload.applied_status;
      state.additional_detail = action.payload.additional_detail;
    });
    builder.addCase(careerJobViewMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const buildCareerPageReducers = buildCareerPageReducer.reducer;
export const careerViewPageReducers = careerViewPageReducer.reducer;
export const jobViewReducers = jobViewReducer.reducer;
