import { createSlice } from '@reduxjs/toolkit';
import {
  getEventsMiddleWare,
  deleteEventMiddleWare,
} from '../middleware/eventsmiddleware';
import { ICalendarEvent, IEvent, IEventInterviewer, IEventTeamMember } from '../../../types';

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
  deleteState: {
    id: null,
    isLoading: false,
    error: '',
  },
};

const scheduledEventsReducer = createSlice({
  name: 'scheduledEvents',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEventsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getEventsMiddleWare.fulfilled, (state, action) => {
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
    });
    builder.addCase(getEventsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(deleteEventMiddleWare.pending, (state, action) => {
      state.deleteState.isLoading = true;
      state.deleteState.error = '';
      state.deleteState.id = action.meta.arg.eventid;
    });
    builder.addCase(deleteEventMiddleWare.fulfilled, (state, action) => {
      state.deleteState.isLoading = false;
      state.deleteState.id = null;
    });
    builder.addCase(deleteEventMiddleWare.rejected, (state, action) => {
      state.deleteState.isLoading = false;
      if (typeof action.payload === 'string') {
        state.deleteState.error = action.payload;
      }
    });
  },
});

export const scheduledEventsReducers = scheduledEventsReducer.reducer;
