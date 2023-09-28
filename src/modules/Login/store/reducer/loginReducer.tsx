import { createSlice } from '@reduxjs/toolkit';
import {
  LoginState,
  PermissionState,
  setPasswordState,
} from '../../loginTypes';
import {
  emailActiveMiddleWare,
  loginMiddleWare,
  passwordSetRequestMiddleWare,
  permissionMiddleWare,
} from '../middleware/loginMiddleWare';

const loginState: LoginState = {
  isLoading: false,
  error: '',
  token: '',
};

const loginReducer = createSlice({
  name: 'login',
  initialState: loginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(loginMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(loginMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const setPasswordInitial: setPasswordState = {
  isLoading: false,
  error: '',
  user_not_found: false,
  token_not_found: '',
  success: true,
};

const emailActiveReducer = createSlice({
  name: 'email_active',
  initialState: setPasswordInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(emailActiveMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(emailActiveMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.user_not_found = action.payload.user_not_found;
      state.token_not_found = action.payload.token_not_found;
    });
    builder.addCase(emailActiveMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const setPasswordReducer = createSlice({
  name: 'set_password',
  initialState: loginState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(passwordSetRequestMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(passwordSetRequestMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
    });
    builder.addCase(passwordSetRequestMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const permissionState: PermissionState = {
  isLoading: false,
  error: '',
  success: false,
  Permission: [
    'applicants',
    'bulkImport_candidates',
    'create_manage_users',
    'create_post',
    'my_database',
    'reports',
    'talent_sourcing',
    'zita_match_candidate',
  ],
  super_user: false,
  is_plan: true,
  plan_id: 0,
  roles: "",
};

const permissionReducer = createSlice({
  name: 'permission',
  initialState: permissionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(permissionMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(permissionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Permission = action.payload.Permission;
      state.super_user = action.payload.super_user;
      state.is_plan = action.payload.is_plan;
      state.plan_id = action.payload.plan_id;
      state.roles = action.payload.roles;
    });
    builder.addCase(permissionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const permissionReducers = permissionReducer.reducer;
export const loginReducers = loginReducer.reducer;
export const emailActiveReducers = emailActiveReducer.reducer;
export const setPasswordReducers = setPasswordReducer.reducer;
