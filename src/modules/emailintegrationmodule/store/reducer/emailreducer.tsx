import { createSlice } from '@reduxjs/toolkit';
import { UserEmail, OutlookProfile, OutlookMailFolder } from '../../emailTypes';
import {
  getEmail,
  outlookUserProfile,
  outlookMailFolder,
} from '../middleware/emailIntegrationMiddleWare';
const emailState: UserEmail = {
  isLoading: false,
  error: '',
  mails: [],
};

const profileState: OutlookProfile = {
  isLoading: false,
  error: '',
  profile: {},
};

const mailfolderState: OutlookMailFolder = {
  isLoading: false,
  error: '',
  mailFolder: [],
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

const outlookuserprofile = createSlice({
  name: 'profile',
  initialState: profileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmail.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getEmail.fulfilled, (state, action) => {
      console.log('payloadData', action);
      state.isLoading = false;
      state.profile = action;
    });
    builder.addCase(getEmail.rejected, (state, action) => {
      console.log('payloadData2', action);
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const getmailfolder = createSlice({
  name: 'mailfolder',
  initialState: mailfolderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(outlookMailFolder.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(outlookMailFolder.fulfilled, (state, action) => {
      console.log('payloadData', action);
      state.isLoading = false;
      state.mailFolder = action.payload;
    });
    builder.addCase(outlookMailFolder.rejected, (state, action) => {
      console.log('payloadData2', action);
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const useremail = getuseremail.reducer;
export const outlookprofile = outlookuserprofile.reducer;
export const getmailfolders = getmailfolder.reducer;
