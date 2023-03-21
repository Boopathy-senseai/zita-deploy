import { createSlice } from '@reduxjs/toolkit';
import { navBarMiddleWare } from '../middleware/navbarmiddleware';
import { NavBarReducerState } from '../navBarTypes';

const navBarState: NavBarReducerState = {
  isLoading: false,
  error: '',
};

const navBarReducer = createSlice({
  name: 'navbar',
  initialState: navBarState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(navBarMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(navBarMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company_detail = action.payload.company_detail;
      state.user_info = action.payload.user_info;
    });
    builder.addCase(navBarMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const navBarReducers = navBarReducer.reducer;
