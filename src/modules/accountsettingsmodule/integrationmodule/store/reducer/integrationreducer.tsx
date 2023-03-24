import { createSlice } from '@reduxjs/toolkit';
import { CalenderTokenReducerState } from '../../integrationTypes';
import { calenderTokenGetMiddleWare } from '../middleware/integrationmiddleware';

const integrationState: CalenderTokenReducerState = {
  isLoading: false,
  error: '',
};

const integrationReducer = createSlice({
  name: 'integration',
  initialState: integrationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calenderTokenGetMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(calenderTokenGetMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.outlook = action.payload.outlook;
      state.google = action.payload.google;
    });
    builder.addCase(calenderTokenGetMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const integrationReducers = integrationReducer.reducer;
