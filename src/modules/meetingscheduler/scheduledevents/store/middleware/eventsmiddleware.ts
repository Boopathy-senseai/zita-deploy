import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { EVENTS_LIST, EVENTS_DELETE } from '../../../../../actions/actions';
import { calendarScheduledEvents } from '../../../../../routes/apiRoutes';
import { IEventData } from '../../../types';
// import jsoonData from '../../../../../assets/others/response.json';
import { stringifyParams } from '../../../../../uikit/helper';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getEventsMiddleWare = createAsyncThunk<IEventData, { event: any, date?: string, other_user?: number[],  }>(
  EVENTS_LIST,
  async (payload, { rejectWithValue }) => {
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
  },
);

export const deleteEventMiddleWare = createAsyncThunk<
  IEventData,
  { id: any; event?: any }
>(EVENTS_DELETE, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.delete(
      `${calendarScheduledEvents}?id=${payload.id}`,
    );
    // await delay(3000);
    if (payload.event) dispatch(getEventsMiddleWare({ event: payload.event }));
    return data as IEventData;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
