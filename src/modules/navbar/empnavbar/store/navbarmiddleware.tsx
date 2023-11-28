import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notificationApi, subscriptionApi } from '../../../../routes/apiRoutes';
var qs = require('qs');
export const notificationMiddleWare = createAsyncThunk(
  'notification',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(notificationApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const notificationDeleteMiddleWare = createAsyncThunk(
  'notification_delete',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(notificationApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const notificationPostMiddleWare = createAsyncThunk(
  'notification_delete',
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        notificationApi,
        qs.stringify({ id }, { arrayFormat: 'comma' }),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const SubsriptionMiddleWare = createAsyncThunk(
  'subscriptionApi',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(subscriptionApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
