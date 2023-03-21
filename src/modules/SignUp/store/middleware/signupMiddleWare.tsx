import { createAsyncThunk } from '@reduxjs/toolkit';
import { SIGNUP_RECRUITER } from '../../../../actions/actions';
import {
  signupRecruiterApi,
  signupRecruiterGetApi,
} from '../../../../routes/apiRoutes';
import { SignUpPayLoad } from '../../signupTypes';
var querystring = require('querystring');

export const signUpMiddleWare = createAsyncThunk(
  SIGNUP_RECRUITER,
  async (
    {
      first_name,
      last_name,
      company_name,
      contact_no,
      email,
      password1,
      password2,
      terms_and_conditions,
      username,
      planId,
    }: SignUpPayLoad,
    { rejectWithValue },
  ) => {
    try {
      const data = await fetch(signupRecruiterApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          first_name,
          last_name,
          company_name,
          contact_no,
          email,
          password1,
          password2,
          terms_and_conditions,
          username,
          "plan_id":planId
        }),
      });
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const userNameMiddleWare = createAsyncThunk(
  'username',
  async ({ username }: { username: string }, { rejectWithValue }) => {
    try {
      const data = await fetch(signupRecruiterGetApi(username));
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
