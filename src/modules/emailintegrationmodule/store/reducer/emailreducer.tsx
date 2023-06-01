import { createSlice } from '@reduxjs/toolkit';
import { UserEmail } from '../../emailTypes';
import { getEmail } from '../middleware/emailIntegrationMiddleWare';
const emailState: UserEmail = {
  isLoading: false,
  error: '',
  mails: [],
};

const getuseremail = createSlice({
  name: 'mail',
  initialState: emailState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmail.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      console.log('payloadData', action);
      state.isLoading = false;
      state.mails = action.payload.data;
    });
    builder.addCase(getEmail.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const useremail = getuseremail.reducer;
