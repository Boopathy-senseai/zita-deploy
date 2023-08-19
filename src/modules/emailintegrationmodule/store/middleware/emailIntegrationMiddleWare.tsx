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
  INTEGRATE_MAIL,
  OUTLOOk_MAIL_REMOVE,
  OUTLOOk_MAIL_INTEGRATE,
  GOOGLE_MAIL_INTEGRATE,
  GOOGLE_MAIL_REMOVE,
} from '../../../../actions/actions';
import {
  maillist,
  outlookProfile_remove,
  getoutlookmaillist,
  IntegrateMail,
  outlookmailIntegrate,
  google_mail_integrate,
  google_mail_remove,
} from '../../../../routes/apiRoutes';
import config from '../../../../outlookmailConfig';

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

export const outlook_integrate_remove = createAsyncThunk(
  OUTLOOk_MAIL_REMOVE,
  async () => {
    try {
      const { data } = await axios.delete(outlookProfile_remove, {});
      return data;
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

export const integrate_mail = createAsyncThunk(INTEGRATE_MAIL, async () => {
  try {
    const { data } = await axios.get(IntegrateMail, {});
    return data;
  } catch (error) {
    const typedError = error as Error;
    return typedError;
  }
});

export const outlook_integrate = createAsyncThunk(
  OUTLOOk_MAIL_INTEGRATE,
  async () => {
    try {
      const { data } = await axios.get(outlookmailIntegrate, {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return typedError;
    }
  },
);

export const outlook_remove = createAsyncThunk(
  OUTLOOk_MAIL_REMOVE,
  async () => {
    try {
      const { data } = await axios.delete(outlookProfile_remove, {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return typedError;
    }
  },
);

export const gmail_integrate = createAsyncThunk(
  GOOGLE_MAIL_INTEGRATE,
  async () => {
    try {
      const { data } = await axios.get(google_mail_integrate, {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return typedError;
    }
  },
);

export const google_remove = createAsyncThunk(GOOGLE_MAIL_REMOVE, async () => {
  try {
    const { data } = await axios.delete(google_mail_remove, {});
    return data;
  } catch (error) {
    const typedError = error as Error;
    return typedError;
  }
});
