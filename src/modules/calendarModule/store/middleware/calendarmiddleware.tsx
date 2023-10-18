import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IEventNotes, ZitaEventSchedulerType } from '../../types';
import { stringifyParams } from '../../../../uikit/helper';
import { Role_value } from '../../../../appRoutesPath';
import { Interview_role } from '../../../../routes/apiRoutes';
var querystring = require('qs');

export const getUpdateEventByIdMiddleWare = createAsyncThunk<
  IEventNotes,
  { event_id: string }
>('schedule_event_by_id', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `update_event/?${stringifyParams(payload)}`,
    );
    return data as IEventNotes;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const scheduleEventMiddleware = createAsyncThunk(
  'schedule_event',
  async (
    {
      title,
      reminder,
      extraNotes,
      myJd,
      privateNotes,
      eventType,
      applicantId,
      curJd,
      timeZone,
      interviewer,
      startTime,
      endTime,
      notes,
      location,
      interviewer_notes,
    }: ZitaEventSchedulerType,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post('schedule_event/', {
        title,
        reminder,
        extraNotes,
        myJd,
        privateNotes,
        eventType,
        applicantId,
        curJd,
        timeZone,
        interviewer,
        startTime,
        endTime,
        notes,
        location,
        interviewer_notes,
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const updateEventMiddleware = createAsyncThunk(
  'update_event',
  async (
    {
      title,
      reminder,
      app_id,
      extraNotes,
      myJd,
      eventId,
      privateNotes,
      eventType,
      edit_jd,
      curJd,
      timeZone,
      interviewer,
      startTime,
      endTime,
      notes,
      location,
      interviewer_notes,
    }: ZitaEventSchedulerType,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        'update_event/',
        // querystring.stringify(
        {
          title,
          reminder,
          app_id,
          extraNotes,
          myJd,
          eventId,
          privateNotes,
          eventType,
          edit_jd,
          curJd,
          timeZone,
          interviewer,
          startTime,
          endTime,
          notes,
          location,
          interviewer_notes,
        },
        // { arrayFormat: '' },
        // ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const deleteGoogleEventMiddleware = createAsyncThunk(
  'delete_google_event',
  async ({ eventId }: { eventId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'delete_google_event/',
        querystring.stringify(
          {
            eventId,
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

export const deleteOutlookEventMiddleware = createAsyncThunk(
  'delete_outlook_event',
  async ({ eventId }: { eventId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'delete_outlook_event/',
        querystring.stringify(
          {
            eventId,
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

export const googleEditEventMiddleware = createAsyncThunk(
  'google_edit_event',
  async ({ eventId }: { eventId: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('google_edit_event', {
        params: { eventId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const outlookEditEventMiddleware = createAsyncThunk(
  'outlook_edit_event',
  async ({ eventid }: { eventid: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('outlook_edit_event', {
        params: { eventId: eventid },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const curUserMiddleware = createAsyncThunk(
  'get_cur_user',
  async ({ curUser }: { curUser: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_cur_user', {
        params: { userId: curUser },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getUsersByCompanyIdMiddleware = createAsyncThunk(
  'get_users_by_companyid',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_users_by_companyid');
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const verifyEventMiddleware = createAsyncThunk(
  'verify_event',
  async (
    {
      calendarProvider,
      eventId,
    }: { calendarProvider: string; eventId: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get('verify_event', {
        params: { calendarProvider, eventId },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getUrlMiddleware = createAsyncThunk(
  'get_url',
  async ({ event_id }: { event_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('get_url', {
        params: { eventid: event_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const rolevaluemiddleware = createAsyncThunk(
  Role_value,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(Interview_role);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

