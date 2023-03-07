import { createSlice } from '@reduxjs/toolkit';
import { MessageReducerState } from '../../candidateTypes';
import { candidateMessageMiddleWare } from '../middleware/candidateMiddleWare';

const candidateMessageState: MessageReducerState = {
  isLoading: false,
  error: '',
  message: [
    {
      sender: 0,
      date_created: '',
      username: '',
      message: '',
      last_name:''
    },
  ],
};

const candidateMessageReducer = createSlice({
  name: 'candidate',
  initialState: candidateMessageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(candidateMessageMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(candidateMessageMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    });
    builder.addCase(candidateMessageMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const candidateMessageReducers = candidateMessageReducer.reducer;
