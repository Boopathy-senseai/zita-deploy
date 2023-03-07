import { createSlice } from '@reduxjs/toolkit';
import { myJobPostingInitalMiddleWare,myJobPostingDataMiddleWare } from '../middleware/myjobpostingmiddleware';
import {  MyJobPosingDataReducerState,} from '../../myJobPostingTypes';


const myJobPosingState: any = {
  isLoading: false,
  error: '',
  location_list: [],
  job_ids: [],
  job_title: [],
};

const myJobPosingReducer = createSlice({
  name: 'myjobposting',
  initialState: myJobPosingState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myJobPostingInitalMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(myJobPostingInitalMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location_list = action.payload.location_list;
      state.job_ids = action.payload.job_ids;
      state.job_title = action.payload.job_title;
    });
    builder.addCase(myJobPostingInitalMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const myJobPosingDataState: MyJobPosingDataReducerState = {
  isLoading: false,
  error: '',
  final_list: [],
  career_page_url: '',
  len_list: 0,
  Jobs_List: 0,
  params: '',
  location: [],
  zita_count: [],
  domain: '',
};

const myJobPostingDataReducer = createSlice({
  name: 'myjobposting',
  initialState: myJobPosingDataState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(myJobPostingDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(myJobPostingDataMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.final_list = action.payload.final_list;
      state.career_page_url = action.payload.career_page_url;
      state.len_list = action.payload.len_list;
      state.Jobs_List = action.payload.Jobs_List;
      state.params = action.payload.params;
      state.location = action.payload.location;
      state.zita_count = action.payload.zita_count;
      state.domain = action.payload.domain;
    });
    builder.addCase(myJobPostingDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const myJobPosingReducers = myJobPosingReducer.reducer;
export const myJobPostingDataReducers = myJobPostingDataReducer.reducer;
