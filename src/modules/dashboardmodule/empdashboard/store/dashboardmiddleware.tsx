import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  dashboardCalenderApi,
  dashboardEmpApi,
  dashboardJobMetricsApi,
  dashboardMessageApi,
} from '../../../../routes/apiRoutes';

export const dashBoardMiddleWare = createAsyncThunk(
  'dashboard',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardEmpApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const dashboardJobMetricsMiddleWare = createAsyncThunk(
  'dashboardJobMetrics',
  async ({ jd_id }: { jd_id: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardJobMetricsApi, {
        params: { jd_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const dashboardMessageMiddleWare = createAsyncThunk(
  'dashboardMessage',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardMessageApi);
      console.log(data);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const dashboardCalenderMiddleWare = createAsyncThunk(
  'dashboard_calender',
  async ({ date }: { date?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardCalenderApi, {
        params: { date },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
