import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dashboardNavApi, logOutApi } from '../../../../routes/apiRoutes';

export const navBarMiddleWare = createAsyncThunk(
  'nav_bar',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardNavApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const logOutMiddleWare = createAsyncThunk(
  'log_out',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(logOutApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
