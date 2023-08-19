import { createSlice } from '@reduxjs/toolkit';
import {
  getCalendarEventsMiddleWare,
  deleteCalendarEventMiddleWare,
} from '../middleware/eventsmiddleware';
import {
  ICalendarEvent,
  ICalendarEventInterviewer,
  IEvent,
  IEventInterviewer,
  IEventOrganiser,
  IEventTeamMember,
} from '../../../types';

interface State {
  isLoading: boolean;
  error: any;
  event: IEvent[];
  pastEvent: IEvent[];
  upcomingEvent: IEvent[];
  interviewers: IEventInterviewer[];
  teammembers: IEventTeamMember[];
  calevents_events: ICalendarEvent[];
  calevents_upcoming_event: ICalendarEvent[];
  calevents_past_event: ICalendarEvent[];
  org_name: IEventOrganiser[];
  calevents_interviewer: ICalendarEventInterviewer[];  /// { [key: string]: string };
  deleteState: {
    id: any;
    isLoading: boolean;
    error: any;
  };
}

const initialState: State = {
  isLoading: false,
  error: '',
  event: [],
  pastEvent: [],
  upcomingEvent: [],
  interviewers: [],
  teammembers: [],
  calevents_events: [],
  calevents_upcoming_event: [],
  calevents_past_event: [],
  org_name: [],
  calevents_interviewer: [],
  deleteState: {
    id: null,
    isLoading: false,
    error: '',
  },
};

const calendarEventsReducer = createSlice({
  name: 'scheduledEvents',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCalendarEventsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getCalendarEventsMiddleWare.fulfilled, (state, action) => {

      state.isLoading = false;
      state.pastEvent = action.payload.past_event || [];
      state.upcomingEvent = action.payload.upcoming_event || [];
      state.interviewers = action.payload.interviewer || [];
      state.event = action.payload.event || [];
      state.teammembers = action.payload.teammembers || [];
      state.calevents_events = action.payload.calevents_events || [];
      state.calevents_past_event = action.payload.calevents_past_event || [];
      state.calevents_upcoming_event =
        action.payload.calevents_upcoming_event || [];
      state.org_name = action.payload.org_name || [];
      state.calevents_interviewer = action.payload.calevents_interviewer || [];
      // state.calevents_interviewer = (action.payload.calevents_interviewer && action.payload.calevents_interviewer.length !== 0) ? action.payload.calevents_interviewer.reduce((r, v) =>({...r, ...v}), {}) : {};
    });
    builder.addCase(getCalendarEventsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(deleteCalendarEventMiddleWare.pending, (state, action) => {
      state.deleteState.isLoading = true;
      state.deleteState.error = '';
      state.deleteState.id = action.meta.arg.params.cal_id;
    });
    builder.addCase(deleteCalendarEventMiddleWare.fulfilled, (state, action) => {
      state.deleteState.isLoading = false;
      state.deleteState.id = null;
    });
    builder.addCase(deleteCalendarEventMiddleWare.rejected, (state, action) => {
      state.deleteState.isLoading = false;
      if (typeof action.payload === 'string') {
        state.deleteState.error = action.payload;
      }
    });
  },
});

export const calendarEventsReducers = calendarEventsReducer.reducer;
