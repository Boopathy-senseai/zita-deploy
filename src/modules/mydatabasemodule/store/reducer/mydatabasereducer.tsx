import { createSlice } from '@reduxjs/toolkit';
import {
  MyDataBaseDataReducerState,
  MyDataBaseReducerState,
} from '../../myDataBaseTypes';
import {
  myDataBaseDataMiddleWare,
  myDataBaseInitalMiddleWare,
} from '../middleware/mydatabasemiddleware';

const myDataBaseInitalState: MyDataBaseReducerState = {
  isLoading: false,
  error: '',
  success: false,
  job_title: [],
  skill_list: [],
  candidate_available: 0,
};

const myDataBaseInitalReducer = createSlice({
  name: 'mydatabase',
  initialState: myDataBaseInitalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myDataBaseInitalMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(myDataBaseInitalMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.candidate_available = action.payload.candidate_available;
      state.job_title = action.payload.job_title;
      state.skill_list = action.payload.skill_list;
      state.success = action.payload.success;
    });
    builder.addCase(myDataBaseInitalMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const myDataBaseDataState: MyDataBaseDataReducerState = {
  isLoading: false,
  error: '',
  data: [],
  jd: '',
  fav_id: false,
  user_type: '',
  params: '',
  search: false,
  total_count: 0,
};

const myDataBaseDataReducer = createSlice({
  name: 'mydatabase',
  initialState: myDataBaseDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myDataBaseDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(myDataBaseDataMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.jd = action.payload.jd;
      state.fav_id = action.payload.fav_id;
      state.user_type = action.payload.user_type;
      state.search = action.payload.search;
      state.total_count = action.payload.total_count;
    });
    builder.addCase(myDataBaseDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const myDataBaseInitalReducers = myDataBaseInitalReducer.reducer;
export const myDataBaseDataReducers = myDataBaseDataReducer.reducer;
