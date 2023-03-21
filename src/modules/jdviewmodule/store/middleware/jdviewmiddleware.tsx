import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { JD_VIEW, JD_VIEW_DOWNLOAD,JD_VIEW_INACTIVE } from '../../../../actions/actions';
import { jdViewApi, downloadJd,inactiveJd } from '../../../../routes/apiRoutes';

export const jdViewMiddleWare = createAsyncThunk(
  JD_VIEW,
  async ({ jdId }: { jdId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jdViewApi(jdId));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jdDownloadMiddleWare = createAsyncThunk(
  JD_VIEW_DOWNLOAD,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(downloadJd, { params: { jd_id } });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);


export const jdInactiveMiddleWare = createAsyncThunk(
  JD_VIEW_INACTIVE,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(inactiveJd(jd_id), );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);