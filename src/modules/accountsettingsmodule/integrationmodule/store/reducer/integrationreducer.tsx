import { createSlice } from '@reduxjs/toolkit';
import { intergrationMiddleWare } from '../middleware/integrationmiddleware';
import { integrationReducerState } from '../../integrationTypes';

const integrationState: integrationReducerState = {
  isLoading: false,
  error: '',
  success: false,
  outlook:{
    id: 0,
  client_id: 0,
  code: '',
  state: '',
  session_state: '',
  email: '',
  created_at: '',
 
  },google:{
  id: 0,
  client_id: 0,
  email: '',
  json_path: '',
  created_at: '',
 
}
  
};

const integrationReducer = createSlice({
  name: 'companypage',
  initialState: integrationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(intergrationMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(intergrationMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.outlook = action.payload.outlook;
      state.google = action.payload.google;

    });
    builder.addCase(intergrationMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const integrationReducers = integrationReducer.reducer;
