import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import {
  GET_EMAIL,
  OUTLOOK_USER_PROFILE,
  OUTLOOK_EMAIL_GET,
} from '../../../../actions/actions';
import {
  maillist,
  outlookProfile,
  getoutlookmaillist,
} from '../../../../routes/apiRoutes';
import config from '../../../../outlookmailConfig';

console.log('00000000000');

let graphClient = undefined;

export const getEmail = createAsyncThunk(GET_EMAIL, async () => {
  try {
    const { data } = await axios.get(maillist, {});
    return data;
  } catch (error) {
    const typedError = error as Error;
    return typedError;
  }
});

export const outlookUserProfile = createAsyncThunk(
  OUTLOOK_USER_PROFILE,
  async () => {
    try {
      const user = await graphClient!
        .api(outlookProfile)
        // Only retrieve the specific fields needed
        // .select('displayName,mail,mailboxSettings,userPrincipalName')
        .get();
      return user;
    } catch (error) {
      const typedError = error as Error;
      return typedError;
    }
  },
);

export const outlookMailFolder = createAsyncThunk(
  OUTLOOK_EMAIL_GET,
  async (_a, { rejectWithValue }) => {
    try {
      const response: any = await graphClient
        ?.api(getoutlookmaillist)
        .top(25)
        .get();
      console.log('-----mailresponce222-----', response);
      return response;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
