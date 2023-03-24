import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

var qs = require('qs');
export const msEventMiddleWare = createAsyncThunk(
  'ms_event',
  async ({ accessToken }: { accessToken: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://graph.microsoft.com/v1.0/me/calendar/events',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const msEventMiddleWareMe = createAsyncThunk(
  'ms_event_me',
  async ({ accessToken }: { accessToken: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        'https://graph.microsoft.com/v1.0/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params:{
            '$select': 'displayName,mail,mailboxSettings,userPrincipalName'
          }
        },
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const googleEventMiddleWare = createAsyncThunk(
  'google_event',
  async (
    { accessToken, key }: { accessToken: string; key: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await fetch(
        `https://content.googleapis.com/calendar/v3/calendars/primary/events?key=${key}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return await data.json();
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const calenderTokenMiddleWare = createAsyncThunk(
  'calendar_token_store',
  async (
    { calendar, info }: { calendar: string; info: any },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        'calendar_token_store/',
        qs.stringify(
          {
            calendar,
            info: JSON.stringify([info]),
          },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const calenderTokenDeleteMiddleWare = createAsyncThunk(
  'calendar_token_store_update',
  async ({ calendar }: { calendar: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete('calendar_token_store/', {
        params: { calendar },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const calenderTokenGetMiddleWare = createAsyncThunk(
  'calendar_token_store_get',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('calendar_token_store/', {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const deleteGoogleMiddleware = createAsyncThunk(
  'delete_google_account',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete('delete_google_account/', {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const deleteOutlookMiddleware = createAsyncThunk(
  'delete_outlook_account',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete('delete_outlook_account/', {});
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
