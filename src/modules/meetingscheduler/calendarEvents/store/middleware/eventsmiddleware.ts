import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CALENDAR_EVENTS_LIST,
  CALENDAR_EVENTS_DELETE,
} from '../../../../../actions/actions';
import { calendarScheduledEvents } from '../../../../../routes/apiRoutes';
import { IEventData } from '../../../types';
// import jsoonData from '../../../../../assets/others/response.json';
import { stringifyParams } from '../../../../../uikit/helper';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getCalendarEventsMiddleWare = createAsyncThunk<
  IEventData,
  { event: any; date?: string; other_user?: number[] }
>(CALENDAR_EVENTS_LIST, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${calendarScheduledEvents}?${stringifyParams(payload)}`,
    );
    // await delay(3000);
    // console.log(data);
    // return jsoonData as IEventData;
    return data as IEventData;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const deleteCalendarEventMiddleWare = createAsyncThunk<
  IEventData,
  {
    params: { cal_id: any };
    props?: { event: any; date?: string; other_user?: number[] };
  }
>(CALENDAR_EVENTS_DELETE, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.delete(
      `${calendarScheduledEvents}?${stringifyParams(payload.params)}`,
    );
    // await delay(3000);
    if (payload.props)
      dispatch(getCalendarEventsMiddleWare({ ...payload.props }));
    return data as IEventData;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
