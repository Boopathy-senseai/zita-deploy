import { createSlice } from '@reduxjs/toolkit';
import { emailPreferenceMiddleWare } from '../middleware/emailnotificationmiddleware';
import { emailNotificationReducerState } from '../../EmailNotificationTypes';

const emailNotificationState: emailNotificationReducerState = {
  isLoading: false,
  error: '',
  success: false,
  email_preferences:[{
    id: 0,
user_id: 0,
stage_id: '',
is_active: false,
created_at: '',
updated_by: '',
  }],
  meta_email: {
    id:0,
stage_id_id:'',
is_active:false,
created_at:'',
inactivated_date:'',
updated_by:'',
  }
  
};

const emailNotificationReducer = createSlice({
  name: 'companypage',
  initialState: emailNotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emailPreferenceMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(emailPreferenceMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.email_preferences = action.payload.email_preferences;
      state.meta_email = action.payload.meta_email;

    });
    builder.addCase(emailPreferenceMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const emailNotificationReducers = emailNotificationReducer.reducer;