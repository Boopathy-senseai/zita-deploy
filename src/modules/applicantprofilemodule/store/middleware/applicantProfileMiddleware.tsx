import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  APPLICANT_PROFILE_ALLMATCH,
  APPLICANT_PROFILE_CALENDER,
  APPLICANT_PROFILE_FAVORITE,
  APPLICANT_PROFILE_INITIAL,
  APPLICANT_PROFILE_INTERVIEW_SCORECARD,
  APPLICANT_PROFILE_MATCH,
  APPLICANT_PROFILE_MESSAGE,
  APPLICANT_PROFILE_NOTES,
  APPLICANT_PROFILE_STATUS,
  SYNC_GOOGLE,
  SYNC_OUTLOOK,
} from '../../../../actions/actions';
import {
  applicantMatchapi,
  applicantMessagesApi,
  applicantNotesApi,
  applicantProfileView,
  applicantsStatusApi,
  calenderEventApi,
  favouriteApi,
  InterviewScorecardApi,
  messagesTemplates,
  showAllMatch,
  syncGoogleApi,
  syncOutlookApi,
} from '../../../../routes/apiRoutes';
import { ApplicantProfilePayload } from '../../applicantProfileTypes';

export const applicantProfileInitialMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_INITIAL,
  async ({ jd_id, can_id }: ApplicantProfilePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantProfileView, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantMatchMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_MATCH,
  async ({ jd_id, can_id }: ApplicantProfilePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantMatchapi, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantNotesMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_NOTES,
  async ({ can_id }: { can_id: number | string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantNotesApi, {
        params: { pk: can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantAllMatchMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_ALLMATCH,
  async ({ can_id }: { can_id: number | string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(showAllMatch, {
        params: { pk: can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantMessagesMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_MESSAGE,
  async (
    { chatname, jd_id }: { chatname: string; jd_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = (await axios.get(applicantMessagesApi, {
        params: { chatname, jd_id },
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError.message);
    }
  },
);

export const applicantScoreMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_INTERVIEW_SCORECARD,
  async (
    { jd_id, can_id }: { jd_id: string; can_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(InterviewScorecardApi, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const messagesTemplatesMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_CALENDER,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(messagesTemplates);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const calenderMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_INTERVIEW_SCORECARD,
  async ({ can_id }: { can_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(calenderEventApi, {
        params: { can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantStatusMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_STATUS,
  async (
    { jd_id, can_id }: { jd_id: string; can_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantsStatusApi, {
        params: { jd_id, candi_id: can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantFavoriteMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_FAVORITE,
  async (
    { jd_id, can_id }: { jd_id: number | string; can_id: number | string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(favouriteApi, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const suycGoogleMiddleWare = createAsyncThunk(
  SYNC_GOOGLE,
  async ({ profile }: { profile: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(syncGoogleApi, {
        params: {
          profile,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const suycOutlookMiddleWare = createAsyncThunk(
  SYNC_OUTLOOK,
  async ({ profile }: { profile: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(syncOutlookApi, {
        params: {
          profile,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
