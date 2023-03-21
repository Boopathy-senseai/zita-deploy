import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  APPLICANTSSOURCE,
  APPLICANTSSOURCEDATA,
  APPLICANTSSOURCEDOWNLOAD,
  PASSIVECANDIDATEDATA,
  JOBMETRICSDATA,
  JOBMETRICSDOWNLOAD,
  SOURCINGPERFORMANCE,
  SOURCINGPERFORMANCEDATA,
  SOURCINGPERFORMANCEDOWNLOAD,
  JOBMETRICSCHARTDATA,
} from '../../../../actions/actions';
import {
  applicantSourceApi,
  applicantSourceDataApi,
  applicantSourceDownloadApi,
  passiveCandidateDataApi,
  jobMetricsApi,
  jobMetricsDownloadApi,
  sourcingPerformanceApi,
  sourcingPerformanceDataApi,
  sourcingPerformanceDownloadApi,
  jobMetricsChartApi,
} from '../../../../routes/apiRoutes';

export const sourcePerformanceMiddleWare = createAsyncThunk(
  SOURCINGPERFORMANCE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(sourcingPerformanceApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const sourcePerformanceDataMiddleWare = createAsyncThunk(
  SOURCINGPERFORMANCEDATA,
  async ({ jd_id, duration }: { jd_id: string; duration: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(sourcingPerformanceDataApi, {
        params: {
          jd_id,
          duration,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const sourcePerformanceDownloadMiddleWare = createAsyncThunk(
  SOURCINGPERFORMANCEDOWNLOAD,
  async ({ jd_id, duration,download }: { jd_id: string; duration: string;download: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(sourcingPerformanceDownloadApi, {
        params: {
          jd_id,
          duration,download
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jobMetricsMiddleWare = createAsyncThunk(
  JOBMETRICSDATA,
  async ({ job, page }: { job: string; page: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jobMetricsApi, {
        params: {
          job,
          page,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jobMetricsDownloadMiddleWare = createAsyncThunk(
  JOBMETRICSDOWNLOAD,
  async (
    { job, download }: { job: string; download: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(jobMetricsDownloadApi, {
        params: {
          job,
          download,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const jobMetricsChartMiddleWare = createAsyncThunk(
  JOBMETRICSCHARTDATA,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(jobMetricsChartApi, {
        params: {
          jd_id,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const jobMetricsChartDownloadMiddleWare = createAsyncThunk(
  JOBMETRICSCHARTDATA,
  async (
    { jd_id, download }: { jd_id: string; download: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(jobMetricsChartApi, {
        params: {
          jd_id,
          download,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const ApplicantsSourceMiddleWare = createAsyncThunk(
  APPLICANTSSOURCE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantSourceApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantSourceDataMiddleWare = createAsyncThunk(
  APPLICANTSSOURCEDATA,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantSourceDataApi, {
        params: {
          jd_id,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantSourceDownloadMiddleWare = createAsyncThunk(
  APPLICANTSSOURCEDOWNLOAD,
  async (
    { jd_id, download }: { jd_id: string; download: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantSourceDownloadApi, {
        params: {
          jd_id,
          download,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const passiveCandidateDataMiddleWare = createAsyncThunk(
  PASSIVECANDIDATEDATA,
  async ({ duration }: { duration: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(passiveCandidateDataApi, {
        params: {
          duration,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const passiveCandidateDownloadMiddleWare = createAsyncThunk(
  APPLICANTSSOURCEDATA,
  async (
    { duration, download }: { duration: string; download: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(passiveCandidateDataApi, {
        params: {
          duration,
          download,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);