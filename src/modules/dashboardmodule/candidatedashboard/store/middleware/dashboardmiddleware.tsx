import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { dashboardApi } from '../../../../../routes/apiRoutes';

export const dashBoardMiddleWare = createAsyncThunk(
  'dashboard',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(dashboardApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
