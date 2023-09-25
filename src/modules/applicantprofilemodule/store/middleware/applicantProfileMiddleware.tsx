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
  APPLICANT_PROFILE_LIST,
  APPLICANT_PROFILE_STATUS,
  SYNC_GOOGLE,
  SYNC_OUTLOOK,
  JOB_MATCHING_API,
} from '../../../../actions/actions';
import {
  applicantMatchapi,
  applicantMessagesApi, 
  applicantNotesApi,
  applicantProfileView,
  applicantsStatusApi,
  calenderEventApi,
  favouriteApi,
  applicantUserlistApi,
  InterviewScorecardApi,
  messagesTemplates,
  showAllMatch,
  syncGoogleApi,
  syncOutlookApi,
  getGoogleEventsAPI,
  googleAddEvent,
  //  Zitamatching,
  checkAuth,
  addOauth,
  intergrationmailApi,
  outlookSyncApi,
  outlookAdd,
  calbackurlApi,
  candidatematch,
  onlycandidateid,
  onlyjobid,
  Bothcandidateidjobid,
  googleconflicts,
  outlookconflicts,
  calendarconfiguration,
} from '../../../../routes/apiRoutes';
import {
  ApplicantProfilePayload,
  IApplicantStatus,
  InviteEntity,
  candidatematchtypes
} from '../../applicantProfileTypes';
import { stringifyParams } from '../../../../uikit/helper';
import { IntegrateEntity } from '../../../applicantpipelinemodule/applicantPipeLineTypes';

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
      const { data } = await axios.get(Bothcandidateidjobid, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const CandidatejobidMatchMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_MATCH,
  async ({ jd_id, can_id, matching }: ApplicantProfilePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(Bothcandidateidjobid, {
        params: { jd_id, can_id, matching },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const candidateMatchMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_MATCH,
  async ({can_id}:{can_id:string}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(onlycandidateid, {
        params: {can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const jdMatchMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_MATCH,
  async ({ jd_id}:{jd_id:string} , { rejectWithValue }) => {
    try {
      const { data } = await axios.get(onlyjobid, {
        params: {jd_id},
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantcandidateMatchMiddleWare = createAsyncThunk(
  JOB_MATCHING_API,
  async ({ can_id }:candidatematchtypes, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(candidatematch, {
        params: {can_id },
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
export const applicantUserListMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_LIST,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get( applicantUserlistApi)
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const IntergratemailMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_LIST,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(intergrationmailApi)
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const applicantUserListstateMiddleWare = createAsyncThunk(
  APPLICANT_PROFILE_LIST,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(applicantUserlistApi,
        formData 
      )
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
export const applicantScoreMiddleWares = createAsyncThunk(
  APPLICANT_PROFILE_INTERVIEW_SCORECARD,
  async (
    { jd_id, can_id,rating,comments}: { jd_id: string; can_id: string ,rating:number,comments:any},
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(InterviewScorecardApi, {
        params: { jd_id, can_id,rating,comments},
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

export const applicantStatusMiddleWare = createAsyncThunk<
{ data: IApplicantStatus[]; invite: InviteEntity[] },
  { jd_id: string; can_id: string }
>(
  APPLICANT_PROFILE_STATUS,
  async (
    { jd_id, can_id }: { jd_id: string; can_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantsStatusApi, {
        params: { jd_id, candi_id: can_id },
      });
      const applicantStatusData: IApplicantStatus[] = data.data as IApplicantStatus[];

      // Assuming the API response has an "invite" field for the invite value
      const invite: InviteEntity[] = data.invite as InviteEntity[];
      const list = {
        applicantStatusData,invite
      }

      return { data: applicantStatusData, invite };
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const applicantInviteMiddleWare = createAsyncThunk<
InviteEntity[],
  { jd_id: string; can_id: string }
>(
  APPLICANT_PROFILE_STATUS,
  async (
    { jd_id, can_id }: { jd_id: string; can_id: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantsStatusApi, {
        params: { jd_id, candi_id: can_id },
      });
      return data.invite as InviteEntity[];
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

export const syncGoogleMiddleWare = createAsyncThunk(
  SYNC_GOOGLE,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(syncGoogleApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const syncOutlookMiddleWare = createAsyncThunk(
  SYNC_OUTLOOK,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(syncOutlookApi);

      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getGoogleEventsMiddleware = createAsyncThunk(
  'google_auth',
  async ({ tz }: { tz: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getGoogleEventsAPI, { params: { tz } });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const googleAddEventMiddleware = createAsyncThunk(
  'google_add_event',
  async ({ formData} : any, { rejectWithValue }) => {
    try {
      const config = { transformRequest: (_a, headers) => { delete headers.common.Authorization; } } 
      const { data } = await axios.post(googleAddEvent,formData,{
        headers :{
          Authorization: undefined, 
        }
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const checkAuthMiddleware = createAsyncThunk<any,void>(
  'check_auth',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(checkAuth);
      return data as IntegrateEntity;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const addOauthMiddleware = createAsyncThunk(
  'add_oauth',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(addOauth);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const outlookAddEventMiddleware = createAsyncThunk(
  'outlook_auth',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(outlookAdd,formData,{
        headers :{
          Authorization: undefined, 
        }
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const outlookCallApiMiddleware = createAsyncThunk(
  'outlook_auth',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(outlookSyncApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
); 
export const googleCallApiMiddleware = createAsyncThunk(
  'google_auth',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('google_auth_url');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const outlookCallbackMiddleware = createAsyncThunk(
  'outlook_auth',
  async (
    {
      code,
      state,
      session_state,
    }: {
      code: string | null;
      state: string | null;
      session_state: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(calbackurlApi, {
        params: { code, state, session_state },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const googleCallbackMiddleware = createAsyncThunk(
  'google_auth',
  async ({ codeUrl }: { codeUrl: string | null }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('google_callback_url', {
        params: { accessToken: codeUrl },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const eventsApplicantsMiddleware = createAsyncThunk(
  'user_events',
  async ({ can_id }: { can_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('user_events', {
        params: { candidateId: can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const getAccessTokenMiddleware = createAsyncThunk(
  'access_token',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_access_token');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const getUsersByCompanyMiddleware = createAsyncThunk(
  'get_users',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_users_by_company');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const friendsEventsMiddleware = createAsyncThunk(
  'get_users',
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_friends_events', {
        params: { userId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const getApplicantsMiddleware = createAsyncThunk(
  'get_applicants',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_applicants');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const getJdMiddleware = createAsyncThunk(
  'get_jd',
  async ({ userId }: { userId: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_jd', {
        params: { userId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const editGoogleEventMiddleware = createAsyncThunk(
  'edit_google_event',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('edit_google_event/');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const editOutlookEventMiddleware = createAsyncThunk(
  'edit_outlook_event',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('edit_outlook_event/');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getEventsMiddleware = createAsyncThunk(
  'get_events',
  async ({ candId, jdId }: { candId: any; jdId: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_event', {
        params: { cand_id: candId, jd_id: jdId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);


export const getGoogleConflictMiddleWare = createAsyncThunk(
  'get_googleconflict',
  async ({ event_id,startdate, enddate }: { 
    event_id ?:any,
    startdate? : any; 
    enddate?: any
   }, { rejectWithValue }) => {
    try {
      const url = `${googleconflicts}/?pk=${event_id}&startdate=${startdate}&enddate=${enddate}`
      const config = { transformRequest: (_a, headers) => { delete headers.common.Authorization; } } 
      const { data } = await axios.get(url,config);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getOutlookConflictMiddleWare = createAsyncThunk(
  'get_outlookconflict',
  async ({ event_id,startdate, enddate }: { 
    event_id?:any,
    startdate?: any; 
    enddate?: any }, { rejectWithValue }) => {
    try {
      const url = `${outlookconflicts}/?pk=${event_id}&startdate=${startdate}&enddate=${enddate}`
      const config = { transformRequest: (_a, headers) => { delete headers.common.Authorization; } } 
      const { data } = await axios.get(url,config);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getCalendarConfigurationMiddleWare = createAsyncThunk(
  'calendar_configurations',
  async (configuration : string | undefined, { rejectWithValue }) => {
    try {
      const url = configuration ? `${calendarconfiguration}?configuration=${configuration}` : calendarconfiguration;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const postCalendarConfigurationMiddleWare = createAsyncThunk(
  'calendar_configurations',
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      // const url = `${calendarconfiguration}/?pk=${event_id}&startdate=${startdate}&enddate=${enddate}`
      const { data } = await axios.post(
        calendarconfiguration,
        formData
        );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);