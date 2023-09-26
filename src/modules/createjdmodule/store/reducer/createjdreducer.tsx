import { createSlice } from '@reduxjs/toolkit';
import {
  CreateJdPostState,
  CreateJdState,
  dsNonDsState,
  JDParserReducerState,
  JdPreviewState,
  JdProfilePostState,
  JDProfileState,
  JDTemplatesrReducerState,
  jobsSelectState,
  LocationState,
  postState,
  QuestionnaireForJdState,
  TemplateState,
  UpdateJdState,
  valiDateJdState,
  IndustryState,
} from '../../createJdTypes';
import {
  createJdMiddleWare,
  createJdPostMiddleWare,
  dsOrNonDsGetdMiddleWare,
  duplicateMiddleWare,
  jdParserMiddleWare,
  jdPreviewMiddleWare,
  jdProfileMiddleWare,
  jdProfilePostMiddleWare,
  jdTemplatesApiMiddleWare,
  locationMiddleWare,
  postJdMiddleWare,
  questionnaireForJdMiddleWare,
  questionnaireTemplateMiddleWare,
  selectDsorNonDsMiddleWare,
  validateJobIDMiddleWare,
  industryType,
} from '../middleware/createjdmiddleware';

const jdParserState: JDParserReducerState = {
  isLoading: false,
  error: '',
  success: false,
  job_title: '',
  job_description: '',
  tool_skills: [],
  database_skills: [],
  platform_skills: [],
  programming_skills: [],
  misc_skills: [],
};

const jdParserReducer = createSlice({
  name: 'createjd',
  initialState: jdParserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdParserMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdParserMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.job_title = action.payload.job_title;
      state.job_description = action.payload.job_description;
      state.tool_skills = action.payload.tool_skills;
      state.database_skills = action.payload.database_skills;
      state.platform_skills = action.payload.platform_skills;
      state.programming_skills = action.payload.programming_skills;
      state.misc_skills = action.payload.misc_skills;
    });
    builder.addCase(jdParserMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdTemplatesState: JDTemplatesrReducerState = {
  isLoading: false,
  error: '',
  jd_templates: [],
  job_title: [''],
};

const jdTemplatesReducer = createSlice({
  name: 'createjd',
  initialState: jdTemplatesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdTemplatesApiMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdTemplatesApiMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_templates = action.payload.jd_templates;
      state.job_title = action.payload.job_title;
    });
    builder.addCase(jdTemplatesApiMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const createJdState: CreateJdState = {
  isLoading: false,
  error: '',
  data: {
    1: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
    2: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
    3: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
    4: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
    5: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
    6: {
      platform: [''],
      misc: [''],
      database: [''],
      programming: [''],
      tool: [''],
    },
  },
  success: false,
  skill_list: [],
};

const createJdReducer = createSlice({
  name: 'createjd',
  initialState: createJdState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createJdMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createJdMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.success = action.payload.success;
      state.skill_list = action.payload.skill_list;
    });
    builder.addCase(createJdMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const locationState: LocationState = {
  isLoading: false,
  error: '',
  country: [],
  states: [],
  city: [],
};

const locationReducer = createSlice({
  name: 'createjd',
  initialState: locationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(locationMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(locationMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.country = action.payload.country;
      state.states = action.payload.states;
      state.city = action.payload.city;
    });
    builder.addCase(locationMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdProfileState: JDProfileState = {
  isLoading: false,
  error: '',
  profile_value: {
    business_intelligence: '',
    data_analysis: '',
    data_engineering: '',
    devops: '',
    machine_learning: '',
    others: '',
    recommended_role_id__label_name: '',
  },
  success: false,
  selected_role: '',
};

const jdProfileReducer = createSlice({
  name: 'createjd',
  initialState: jdProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdProfileMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdProfileMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile_value = action.payload.profile_value;
      state.success = action.payload.success;
      state.selected_role = action.payload.selected_role;
    });
    builder.addCase(jdProfileMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const createJdPostState: CreateJdPostState = {
  isLoading: false,
  error: '',
  jd_id: 0,
  success: false,
};

const createJdPostReducer = createSlice({
  name: 'createjd',
  initialState: createJdPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createJdPostMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(createJdPostMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_id = action.payload.jd_id;
      state.success = action.payload.success;
    });
    builder.addCase(createJdPostMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdProfileJdPostState: JdProfilePostState = {
  isLoading: false,
  error: '',
  success: false,
  new_role: '',
  old_role: '',
};

const jdProfilePostReducer = createSlice({
  name: 'createjd',
  initialState: jdProfileJdPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdProfilePostMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdProfilePostMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.new_role = action.payload.new_role;
      state.success = action.payload.success;
      state.old_role = action.payload.old_role;
    });
    builder.addCase(jdProfilePostMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const questionnaireForJdState: QuestionnaireForJdState = {
  isLoading: false,
  error: '',
  questionnaire_for_jd: [],
  company_name: '',
  country: '',
  is_eeo_comp: false,
};

const questionnaireForJdReducer = createSlice({
  name: 'createjd',
  initialState: questionnaireForJdState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(questionnaireForJdMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(questionnaireForJdMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questionnaire_for_jd = action.payload.questionnaire_for_jd;
      state.company_name = action.payload.company_name;
      state.country = action.payload.country;
      state.is_eeo_comp = action.payload.is_eeo_comp;
    });
    builder.addCase(questionnaireForJdMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdTemplateState: TemplateState = {
  isLoading: false,
  error: '',
  template: [],
};

const jdTemplateReducer = createSlice({
  name: 'createjd',
  initialState: jdTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(questionnaireTemplateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      questionnaireTemplateMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.template = action.payload.template;
      },
    );
    builder.addCase(
      questionnaireTemplateMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const duplicateState: UpdateJdState = {
  isLoading: false,
  error: '',
  jd_profile: true,
  jd_output: {
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
    min_exp: '',
    max_exp: '',
    work_remote: false,
    role_res: '',
    job_description: '',
    richtext_job_description: '',
    tech_req: '',
    non_tech_req: '',
    updated_by: '',
    industry_type_id: 1,
    add_info: '',
    salary_min: 0,
    salary_max: 0,
    salary_curr_type_id: 0,
    show_sal_to_candidate: false,
    job_type_id: 0,
    jd_status_id: 0,
    created_on: '',
    work_space_type: '',
    industry_type_name: ''
  },
  skills: [],
  location: {
    country_id: 0,
    state_id: 0,
    city_id: 0,
  },
  qualification: [],
  skillTwo: [],
  skillOne: [],
  skillFive: [],
  skillThree: [],
  skillFour: [],
};

const duplicateReducer = createSlice({
  name: 'createjd',
  initialState: duplicateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(duplicateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(duplicateMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd_output = action.payload.jd_output;
      state.skills = action.payload.skills;
      state.qualification = action.payload.qualification;
      state.location = action.payload.location;
      state.jd_profile = action.payload.jd_profile;
    });
    builder.addCase(duplicateMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const jdPreviewState: JdPreviewState = {
  isLoading: false,
  error: '',
  ext_jobs: '',
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
    richtext_job_description: '',
    salary_curr_type__label_name: '',
    salary_max: 0,
    salary_min: 0,
    show_sal_to_candidate: false,
    work_remote: false,
    min_exp: 0,
    max_exp: 0,
    is_eeo_comp: false,
    salary_curr_type__value: ''
  },
  has_external_posting: false,
  career_page_url: '',
  recommended_role: '',
  profile: {
    id: 0,
    jd_id_id: 0,
    user_id_id: 0,
    business_intelligence: '',
    data_analysis: '',
    data_engineering: '',
    devops: '',
    machine_learning: '',
    others: '',
    recommended_role_id: 0,
    dst_or_not: '',
    role_acceptence: false,
    updated_at: '',
  },
  location: {
    country__name: '',
    state__name: '',
    city__name: '',
  },
  qualification: [
    {
      id: 0,
      jd_id_id: 0,
      qualification: '',
      specialization: '',
    },
  ],
  skills: [],
  company_detail: { company_name: '' },
  link: ''
};

const jdPreviewReducer = createSlice({
  name: 'createjd',
  initialState: jdPreviewState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jdPreviewMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(jdPreviewMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jd = action.payload.jd;
      state.qualification = action.payload.qualification;
      state.recommended_role = action.payload.recommended_role;
      state.profile = action.payload.profile;
      state.location = action.payload.location;
      state.skills = action.payload.skills;
      state.company_detail = action.payload.company_detail;
      state.career_page_url = action.payload.career_page_url;
      state.link = action.payload.link;
    });
    builder.addCase(jdPreviewMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const validateJobIDState: valiDateJdState = {
  isLoading: false,
  error: '',
  is_taken: false,
};

const validateJobIDReducer = createSlice({
  name: 'createjd',
  initialState: validateJobIDState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(validateJobIDMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(validateJobIDMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.is_taken = action.payload.is_taken;
    });
    builder.addCase(validateJobIDMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const dsOrNonDsState: dsNonDsState = {
  isLoading: false,
  error: '',
  ds_role: false,
};

const dsOrNonDsGetReducer = createSlice({
  name: 'createjd',
  initialState: dsOrNonDsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dsOrNonDsGetdMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(dsOrNonDsGetdMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ds_role = action.payload.ds_role;
    });
    builder.addCase(dsOrNonDsGetdMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const postInitial: postState = {
  isLoading: false,
  error: '',
  success: false,
  url: '',
};

const postReducer = createSlice({
  name: 'createjd',
  initialState: postInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postJdMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(postJdMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.url = action.payload.url;
    });
    builder.addCase(postJdMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const selectDsorNonDsInitial: jobsSelectState = {
  isLoading: false,
  error: '',
  feature: 1,
};

const selectDsorNonDsReducer = createSlice({
  name: 'createjd',
  initialState: selectDsorNonDsInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(selectDsorNonDsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(selectDsorNonDsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.feature = action.payload.feature;
    });
    builder.addCase(selectDsorNonDsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const industryState: IndustryState= {
  isLoading: false,
  error: '',
  data: [{
    id: 0,
    label_name:'',
    value: '',
  }]
};
const industryStates = createSlice({
  name: 'createjd',
  initialState: industryState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(industryType.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(industryType.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(industryType.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const jdParserReducers = jdParserReducer.reducer;
export const jdTemplatesReducers = jdTemplatesReducer.reducer;
export const createJdReducers = createJdReducer.reducer;
export const locationReducers = locationReducer.reducer;
export const jdProfileReducers = jdProfileReducer.reducer;
export const createJdPostReducers = createJdPostReducer.reducer;
export const jdProfilePostReducers = jdProfilePostReducer.reducer;
export const questionnaireForJdReducers = questionnaireForJdReducer.reducer;
export const cretejdTemplateReducers = jdTemplateReducer.reducer;
export const duplicateReducers = duplicateReducer.reducer;
export const jdPreviewReducers = jdPreviewReducer.reducer;
export const validateJobIDReducers = validateJobIDReducer.reducer;
export const dsOrNonDsGetReducers = dsOrNonDsGetReducer.reducer;
export const postReducers = postReducer.reducer;
export const selectDsorNonDsReducers = selectDsorNonDsReducer.reducer;
export const getindustery = industryStates.reducer;