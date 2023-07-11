import { createSlice } from '@reduxjs/toolkit';
import { string } from 'prop-types';
import {
  AllMatchReducerState,
  ApplicantFavReducerState,
  ApplicantProfileReducerState,
  CalenderReducerState,
  InterviewScorecardReducerState,
  MatchReducerState,
  MessageReducerState,
  MessageTemplateReducerState,
  NotesReducerState,
  ScreenStatusReducerState,
  MentionReducerState,
} from '../../applicantProfileTypes';
import {
  applicantAllMatchMiddleWare,
  applicantFavoriteMiddleWare,
  applicantMatchMiddleWare,
  applicantUserListMiddleWare,
  applicantMessagesMiddleWare,
  applicantNotesMiddleWare,
  applicantProfileInitialMiddleWare,
  applicantScoreMiddleWare,
  applicantStatusMiddleWare,
  calenderMiddleWare,
  messagesTemplatesMiddleWare,
} from '../middleware/applicantProfileMiddleware';



const applicantProfileInitialState: ApplicantProfileReducerState = {
  isLoading: false,
  error: '',
  applicant: false,
  jd_id: '',
  can_id: '',
  chatname: '',
  status_id: [],
  success: false,
  source: '',
  candidate_details: [
    {
      id: 0,
      can_source_id: 0,
      client_id_id: 0,
      candidate_id_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      contact: '',
      linkedin_url: '',
      work_exp: '',
      relocate: false,
      qualification: '',
      job_title: '',
      skills: '',
      location: '',
      updated_on: '',
      created_at: '',
      updated_by: '',
      image: '',
      file: '',
      type_of_job__label_name: '',
      available_to_start__label_name: '',
      industry_type__label_name: '',
      code_repo:'',
    },
  ],
  jd: {
    id: 0,
    job_posted_on: '',
    // job_reposted_on: null,
    user_id_id: 0,
    job_title: '',
    job_id: '',
    visa_sponsor: false,
    company_name: '',
    company_website: '',
    no_of_vacancies: 0,
    company_logo: '',
    job_role_id: 0,
    // org_info: null;
    min_exp: 0,
    max_exp: 0,
    work_remote: false,
    role_res: '',
    job_description: '',
    richtext_job_description: '',
    tech_req: '',
    non_tech_req: '',
    // updated_by: null,
    industry_type_id: 0,
    // add_info: null,
    salary_min: 0,
    salary_max: 0,
    salary_curr_type_id: 0,
    show_sal_to_candidate: false,
    job_type_id: 0,
    jd_status_id: 0,
    created_on: '',
  },
  total_exp: [{ total_exp_month: 0, total_exp_year: 0 }],
  skills: [
    {
      id: 0,
      application_id_id: 0,
      soft_skill: '',
      tech_skill: '',
      updated_at: '',
    },
  ],
  experience: [
    {
      exp_id: 0,
      application_id_id: 0,
      organisations: '',
      // org_domain?: null;
      designation: '',
      work_location: '',
      work_tools: '',
      work_role: '',
      from_exp: '',
      to_exp: '',
      is_present: false,
    },
  ],
  ac_project: [
    {
      project_id: 0,
      application_id_id: 0,
      work_proj_name: '',
      work_proj_client: '',
      work_proj_describe: '',
      work_proj_desig: '',
      work_proj_role: '',
      work_proj_duration: '',
      work_proj_domain: '',
      work_proj_location: '',
      work_proj_skills: '',
      work_proj_type: false,
      work_proj_org_id_id: 0,
      updated_at: '',
    },
  ],
  fresher: [
    {
      id: 0,
      application_id_id: 0,
      intern_org: '',
      intern_project: '',
      intern_client: '',
      intern_proj_describe: '',
      intern_role: '',
      intern_duration: '',
      intern_domain: '',
      intern_location: '',
      intern_tools_prg_lng: '',
      updated_at: '',
    },
  ],
  personalInfo: [
    {
      application_id: 0,
      user_id_id: 0,
      firstname: '',
      lastname: '',
      email: '',
      contact_no: 0,
      country_id: 0,
      state_id: 0,
      city_id: 0,
      zipcode: '',
      Date_of_birth: 0,
      linkedin_url: '',
      career_summary: '',
      gender_id: 0,
      updated_at: '',
      code_repo: '',
      visa_sponsorship: false,
      remote_work: false,
      type_of_job_id: 0,
      available_to_start_id: 0,
      industry_type_id: 0,
      curr_gross: '',
      current_currency: '',
      exp_gross: 0,
      salary_negotiable: false,
      current_country_id: 0,
      current_state_id: 0,
      current_city_id: 0,
      current1_country: '',
      current2_country: '',
      current3_country: '',
      relocate: false,
      current_city__name: '',
      current_country__name: '',
      current_state__name: '',
      type_of_job__label_name: '',
      available_to_start__label_name: '',
      industry_type__label_name: '',
      country__name: '',
    },
  ],
  project: [],
  education: [],
  course: [],
  contrib: [],
  cover_letter: [
    {
      id: 0,
      candidate_id_id: 0,
      jd_id_id: 0,
      cover_letter: '',
      source: '',
      created_on: '',
    },
  ],
  questionnaire: [
    {
      answer: '',
      created_on: '',
      description: '',
      field_type_id: 0,
      id: 0,
      is_required: false,
      jd_id_id: 0,
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      question: '',
    },
  ],
  ApplicantEntity:[
    {candidate_id_id:0,
      client_id_id: 0,
      created_on: '',
      fav:0,
      id:0,
      jd_id_id: 0,
      match: '',
      source: '',
      status_id_id: 0,
      updated_by: '',
      jd_title: '',
      job_id:'',},
  ],
  PersonalInfoEntity: undefined
};

const applicantProfileInitalReducer = createSlice({
  name: 'applicant',
  initialState: applicantProfileInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantProfileInitialMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      applicantProfileInitialMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.candidate_details = action.payload.candidate_details;
        state.jd = action.payload.jd;
        state.total_exp = action.payload.total_exp;
        state.skills = action.payload.skills;
        state.experience = action.payload.experience;
        state.ac_project = action.payload.ac_project;
        state.fresher = action.payload.fresher;
        state.personalInfo = action.payload.personalInfo;
        state.project = action.payload.project;
        state.education = action.payload.education;
        state.course = action.payload.course;
        state.contrib = action.payload.contrib;
        state.can_id = action.payload.can_id;
        state.jd_id = action.payload.jd_id;
        state.questionnaire = action.payload.questionnaire;
        state.chatname = action.payload.chatname;
        state.status_id = action.payload.status_id;
        state.cover_letter = action.payload.cover_letter;
        state.source = action.payload.source;
      },
    );
    builder.addCase(
      applicantProfileInitialMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const applicantMatchState: MatchReducerState = {
  isLoading: false,
  error: '',
  success: false,
  data: { groups: [] },
  match: [
    {
      id: 0,
      candidate_id_id: 0,
      jd_id_id: 0,
      profile_match: 0,
      created_at: '',
    },
  ],
};

const applicantMatchReducer = createSlice({
  name: 'applicant',
  initialState: applicantMatchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantMatchMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantMatchMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.match = action.payload.match;
      state.data = action.payload.data;
    });
    builder.addCase(applicantMatchMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantNotesState: NotesReducerState = {
  isLoading: false,
  error: '',
  notes: [
    {
      id: 0,
      client_id_id: 0,
      jd_id_id: null,
      candidate_id_id: 0,
      notes: '',
      updated_by: null,
      created_at: '',
      emp_image:'',
      user:0,
    },
  ],
};

const applicantNotesReducer = createSlice({
  name: 'applicant',
  initialState: applicantNotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantNotesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantNotesMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload;
    });
    builder.addCase(applicantNotesMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantUserListstate:  MentionReducerState = {
  isLoading: false,
  error: '',
  data:[
    {
    user:0,
    value:'',
  }
  ],
};
const applicantUserListReducer = createSlice({
  name: 'applicant',
  initialState: applicantUserListstate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase( applicantUserListMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase( applicantUserListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase( applicantUserListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantAllMatchState: AllMatchReducerState = {
  isLoading: false,
  error: '',
  match: [
    {
      id: 0,
      candidate_id_id: 0,
      jd_id_id: 0,
      profile_match: 0,
      created_at: '',
      applicant: 0,
      fav: 0,
    },
  ],
  applicant: [
    {
      candidate_id_id: 0,
      client_id_id: 0,
      created_on: '',
      fav: 0,
      id: 0,
      jd_id_id: 0,
      match: '',
      source: '',
      status_id_id: 0,
      updated_by: '',
    },
  ],
};

const applicantAllMatchReducer = createSlice({
  name: 'applicant',
  initialState: applicantAllMatchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantAllMatchMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantAllMatchMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.match = action.payload.match;
      state.applicant = action.payload.applicant;
    });
    builder.addCase(applicantAllMatchMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantMessageState: MessageReducerState = {
  isLoading: false,
  error: '',
  message: [
    {
      sender: 0,
      date_created: '',
      username: '',
      message: '',
      receiver_image: '',
      sender_image: '',
      last_name:''
    },
  ],
};

const applicantMessageReducer = createSlice({
  name: 'applicant',
  initialState: applicantMessageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantMessagesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantMessagesMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(applicantMessagesMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const messageTemplateState: MessageTemplateReducerState = {
  isLoading: false,
  error: '',
  messageTemplate: [
    {
      created_on: '',
      id: 0,
      name: '',
      templates: '',
    },
  ],
};

const messageTemplateReducer = createSlice({
  name: 'applicant',
  initialState: messageTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(messagesTemplatesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(messagesTemplatesMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messageTemplate = action.payload;
    });
    builder.addCase(messagesTemplatesMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const calenderState: CalenderReducerState = {
  isLoading: false,
  error: '',
  event: [],
  google: [],
  outlook: [],
};

const calenderReducer = createSlice({
  name: 'applicant',
  initialState: calenderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calenderMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(calenderMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.event = action.payload.event;
      state.google = action.payload.google;
      state.outlook = action.payload.outlook;
    });
    builder.addCase(calenderMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantStatusState: ScreenStatusReducerState = {
  isLoading: false,
  error: '',
  applied: [],
  stages: [],
  interviewed: [],
  invite: [],
  selected: [],
  shortlisted: [],
  rejected: [],
};

const applicantStausReducer = createSlice({
  name: 'applicant',
  initialState: applicantStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantStatusMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantStatusMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stages = (action.payload || []);
      // state.applied = action.payload.applied;
      // state.interviewed = action.payload.interviewed;
      // state.invite = action.payload.invite;
      // state.selected = action.payload.selected;
      // state.shortlisted = action.payload.shortlisted;
      // state.rejected = action.payload.rejected;
    });
    builder.addCase(applicantStatusMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const applicantFavState: ApplicantFavReducerState = {
  isLoading: false,
  error: '',
  success: false,
};
const applicantFavReducer = createSlice({
  name: 'applicant',
  initialState: applicantFavState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantFavoriteMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantFavoriteMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    });
    builder.addCase(applicantFavoriteMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const interviewScorecardState: InterviewScorecardReducerState = {
  isLoading: false,
  error: '',
  interview: [
    {
      id: 0,
      candidate_id_id: 0,
      jd_id_id: 0,
      rating: 0,
      comments: '',
      created_at: '',
    },
  ],
};

const applicantScoreReducer = createSlice({
  name: 'applicant',
  initialState: interviewScorecardState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicantScoreMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(applicantScoreMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.interview = action.payload.interview;
    });
    builder.addCase(applicantScoreMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const applicantProfileInitalReducers =
  applicantProfileInitalReducer.reducer;
export const applicantMatchReducers = applicantMatchReducer.reducer;
export const applicantNotesReducers = applicantNotesReducer.reducer;
export const applicantUserlistReducer =applicantUserListReducer.reducer;
export const applicantAllMatchReducers = applicantAllMatchReducer.reducer;
export const applicantMessageReducers = applicantMessageReducer.reducer;
export const applicantScoreReducers = applicantScoreReducer.reducer;
export const messageTemplateReducers = messageTemplateReducer.reducer;
export const calenderReducers = calenderReducer.reducer;
export const applicantStausReducers = applicantStausReducer.reducer;
export const applicantFavReducers = applicantFavReducer.reducer;
