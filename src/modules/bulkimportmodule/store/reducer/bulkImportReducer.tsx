import { createSlice } from '@reduxjs/toolkit';
import type {
  BulkImportReducerState,
  
} from '../../bulkImportTypes';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  bulkUploadSkillsMiddleWare,
  uploadedProfileViewMiddleWare,
  bulkImportQusGetMiddleWare,
  // uploadedInCompleteMiddleWare,
  // uploadedSearchMiddleWare,
  // uploadedTotalMiddleWare,
} from '../middleware/bulkImportMiddleware';

const bulkImportInitialState: BulkImportReducerState = {
  isLoading: false,
  error: '',
  parsed: false,
  is_parsed: false,
  features_balance: 0,
};

const bulkImportReducer = createSlice({
  name: 'bulk_import',
  initialState: bulkImportInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkImportMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(bulkImportMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.txt_file = action.payload.txt_file;
      state.features_balance = action.payload.features_balance;
      state.jd_id = action.payload.jd_id;
    });
    builder.addCase(bulkImportMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const uploadedCandidateInitialState: any = {
  isLoading: false,
  error: '',
  success: false,
  params: '',
  search: 0,
  emp_pool: [],
  questionnaire: [],
  total_count: 0,
  completed: 0,
  incompleted: 0,
};

const bulkUploadedCandidatesReducer = createSlice({
  name: 'uploaded_candidate',
  initialState: uploadedCandidateInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkuploadedCandidatesMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      bulkuploadedCandidatesMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.emp_pool = action.payload.emp_pool;
        state.total_count = action.payload.total_count;
        state.questionnaire = action.payload.questionnaire;
        state.completed = action.payload.completed;
        state.incompleted = action.payload.incompleted;
      },
    );
    builder.addCase(
      bulkuploadedCandidatesMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});


const bulkImportQusGet: any = {
  isLoading: false,
  answers: false,
  error: '',
  questionnaire: [
   
  ],
};

const bulkImportQusGetReducer = createSlice({
  name: 'skillupdate',
  initialState: bulkImportQusGet,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkImportQusGetMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(bulkImportQusGetMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.questionnaire = action.payload.questionnaire;
      state.answers = action.payload.answers;
        });
    builder.addCase(bulkImportQusGetMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const techSkillStateUpdate: any = {
  isLoading: false,
  error: '',
  skills_list: [
    {
      label: '',
      value: '',
    },
  ],
};

const bulkUploadTechSkillReducer = createSlice({
  name: 'skillupdate',
  initialState: techSkillStateUpdate,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkUploadSkillsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(bulkUploadSkillsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload)
      if ( action.payload !== undefined) {
        state.skills_list = action.payload.skills_list;
        state.skills = action.payload.skills;
      }
      // else {
      //   state.skills_list = []
      //   state.skills = {}
      // }
    });
    builder.addCase(bulkUploadSkillsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        console.log("error")
        state.error = action.payload;
      }
    });
  },
});

const uploadedProfileView: any = {
  isLoading: false,
  error: '',
 resume_file_path:'',
personal:[],
additional_detail:[],
experiences:[],
skills:[],
education:[],
obj:[],
emp_data:{},
};

const uploadedProfileViewReducer = createSlice({
  name: 'uploadedProfileView',
  initialState: uploadedProfileView,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadedProfileViewMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(uploadedProfileViewMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resume_file_path = action.payload.resume_file_path;
      state.personal = action.payload.personal;
      state.personal_obj = action.payload.personal_obj;
      state.additional_detail = action.payload.additional_detail;
      state.experiences = action.payload.experiences;
      state.skills = action.payload.skills;
      state.education = action.payload.education;
      state.emp_data = action.payload.emp_data;
      state.obj = action.payload.obj;
    });
    builder.addCase(uploadedProfileViewMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
export const bulkImportReducers = bulkImportReducer.reducer;
export const bulkUploadTechSkillReducers = bulkUploadTechSkillReducer.reducer;
export const uploadedProfileViewReducers = uploadedProfileViewReducer.reducer;
export const bulkImportQusGetReducers = bulkImportQusGetReducer.reducer;
export const bulkUploadedCandidatesReducers =
  bulkUploadedCandidatesReducer.reducer;
