import { createSlice } from '@reduxjs/toolkit';
import {
  getAvailbleSlot,
  getScheduleMiddleWare,
  getSlotterMiddleware,
} from '../middleware/eventmiddleware';
import {
  schedulerPageReducerState,
  slotterPageReducerState,
  timezonePageReducerState,
} from '../../ScheduleTypes';

const schedulerState: schedulerPageReducerState = {
  isLoading: false,
  error: '',
  data: [
    {
      id: 0,
      emp_id_id: 0,
      company_id: 0,
      event_name: '',
      event_type: '',
      location: '',
      daterange: '',
      days: '',
      startdate: '',
      enddate: '',
      duration: '',
      times_zone: '',
      interviewer: '',
      times_zone_display: '',
      description: '',
      created_at: '',
      is_active: false,
      updatedby: '',
      isdeleted: false,
      ischecked: false,
    },
  ],
  interviewer: [
    {
      id: 0,
      event_id: 0,
      name_id: 0,
      full_name: '',
    },
  ],
  shareLink: [
    {
      candidate_id: 0,
      candidate_id__candidate_id: 0,
      candidate_id__email: '',
      type: '',
      full_name: '',
    },
  ],
  addmembers: [
    {
      id: 0,
      user: 0,
      user__first_name: '',
      user__last_name: '',
      full_name: '',
    },
  ],
  datetime: {
    sunday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    monday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    tueday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    wednesday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    thursday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    friday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
    saturday: [
      {
        day: '',
        starttime: '',
        endtime: '',
      },
    ],
  },
  suceess: '',
};

const schedlerReducer = createSlice({
  name: 'schedulerState',
  initialState: schedulerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScheduleMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getScheduleMiddleWare.fulfilled, (state, action) => {
      console.log("actionactionaction",action)
      console.log("actionactionactionstate",state)

      // console.log("actionactionaction",action.payload.interviewer)

      state.isLoading = false;
      state.data = action.payload.data;
      state.interviewer = action.payload.interviewer;
      state.shareLink = action.payload.shareLink;
      state.addmembers = action.payload.addmembers;
      state.datetime = action.payload.datetime;
      state.suceess = action.payload.suceess;
    });

    builder.addCase(getScheduleMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const slotterState: slotterPageReducerState = {
  isLoading: false,
  error: '',
  success: '',
  slotterdata: [],
  slotmembers: [],
  candidate_name: '',
  message: '',
};

const slotterReducer = createSlice({
  name: 'slotterReducer',
  initialState: slotterState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSlotterMiddleware.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getSlotterMiddleware.fulfilled, (state, action) => {
      state.isLoading = false;
      state.slotterdata = action.payload.slotterdata;
      state.success = action.payload.success;
      state.slotmembers = action.payload.slotmembers;
      state.candidate_name = action.payload.candidate_name;
      state.message = action.payload.message;
    });

    builder.addCase(getSlotterMiddleware.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const timezoneState: timezonePageReducerState = {
  isLoading: false,
  error: '',
  availbleslot :[],
};
const timezoneReducer = createSlice({
  name: 'slotterReducer',
  initialState: timezoneState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailbleSlot.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getAvailbleSlot.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availbleslot = action.payload.availbleslot;
      // state.success = action.payload.success;
      // state.slotmembers = action.payload.slotmembers;
      // state.candidate_name = action.payload.candidate_name;
      // state.message = action.payload.message;
    });

    builder.addCase(getAvailbleSlot.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const schedulerReducers = schedlerReducer.reducer;
export const slotterReducers = slotterReducer.reducer;
export const timezoneReducers = timezoneReducer.reducer;

