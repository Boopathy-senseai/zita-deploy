import { createSlice } from '@reduxjs/toolkit';
import { NotificationReducerState } from '../navbarTypes';
import { notificationMiddleWare } from './navbarmiddleware';

const NotificationState: NotificationReducerState = {
  isLoading: false,
  error: '',
  success: false,
  total: 0,
  total_unread:0
};

const notificationReducer = createSlice({
  name: 'navbar',
  initialState: NotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(notificationMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(notificationMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.today = action.payload.today;
      state.yesterday = action.payload.yesterday;
      state.others = action.payload.others;
      state.total_unread = action.payload.total_unread;
    });
    builder.addCase(notificationMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const notificationReducers = notificationReducer.reducer;
