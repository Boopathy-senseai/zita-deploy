import { createSlice } from '@reduxjs/toolkit';
import type {
  BulkImportReducerState,
  UploadedCandidateReducerState,
} from '../../bulkImportTypes';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
  // uploadedCompleteMiddleWare,
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
    });
    builder.addCase(bulkImportMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const uploadedCandidateInitialState: UploadedCandidateReducerState = {
  isLoading: false,
  error: '',
  success: false,
  params: '',
  search: 0,
  emp_pool: [],
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

export const bulkImportReducers = bulkImportReducer.reducer;
export const bulkUploadedCandidatesReducers =
  bulkUploadedCandidatesReducer.reducer;
