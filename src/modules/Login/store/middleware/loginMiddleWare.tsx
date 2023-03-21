import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_AUTH_login,
  API_USER,
  PASSWORD_RESET,
  PASSWORD_RESET_VALID,
  PASSWORD_SET,
  PERMISSION,
} from '../../../../actions/actions';
import {
  authApi,
  emailActiveApi,
  emailValidRequest,
  passwordResetRequest,
  passwordSetRequest,
  permissionApi,
  userApi,
} from '../../../../routes/apiRoutes';
import { LoginPayload, PasswordSetPayload } from '../../loginTypes';
var querystring = require('querystring');

const headers = new Headers();

headers.append('Content-Type', 'application/json');
export const loginMiddleWare = createAsyncThunk(
  API_AUTH_login,
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const data = await fetch(authApi, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          username,
          password,
        }),
      });
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const passwordResetRequestMiddleWare = createAsyncThunk(
  PASSWORD_RESET,
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const data = await fetch(passwordResetRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          email,
        }),
      });
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const emailMiddleWare = createAsyncThunk(
  PASSWORD_RESET_VALID,
  async ({ email,domain }: { email: string,domain?: string }, { rejectWithValue }) => {
    try {
      const data = await fetch(emailValidRequest(email,domain));
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const userMiddleWare = createAsyncThunk(
  API_USER,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(userApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const emailActiveMiddleWare = createAsyncThunk(
  'email_active',
  async (
    {
      userid,
      confirmation_token,
    }: { userid: string; confirmation_token: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await fetch(emailActiveApi(userid, confirmation_token));
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const passwordSetRequestMiddleWare = createAsyncThunk(
  PASSWORD_SET,
  async (
    { password1, password2, userid }: PasswordSetPayload,
    { rejectWithValue },
  ) => {
    try {
      const data = await fetch(passwordSetRequest, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          new_password1: password1,
          new_password2: password2,
          userid,
        }),
      });
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const permissionMiddleWare = createAsyncThunk(
  PERMISSION,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(permissionApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
