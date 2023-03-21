import { createSlice } from '@reduxjs/toolkit';
import { userProfileMiddleWare } from '../middleware/userprofilemiddleware';
import { userProfileReducerState } from '../../UserProfileTypes';

const userProfileState: userProfileReducerState = {
  isLoading: false,
  error: '',
  success: false,
  profile:'', 
  user:{
    id: 0,
  password: '',
  last_login: '',
  is_superuser: false,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  is_staff: false,
  is_active: false,
  date_joined: '',
  },
  
};

const userProfileReducer = createSlice({
  name: 'companypage',
  initialState: userProfileState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userProfileMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(userProfileMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.user = action.payload.user;
      state.profile = action.payload.profile;

    });
    builder.addCase(userProfileMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const userProfileReducers = userProfileReducer.reducer;
