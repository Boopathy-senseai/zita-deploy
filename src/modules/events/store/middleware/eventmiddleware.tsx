import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { Client } from '@microsoft/microsoft-graph-client';
// import { google } from 'googleapis';
import { availbleslot, eventSchedulerApi, slotterApi } from '../../../../routes/apiRoutes';
import { EVENT_SCHEDULER_FORM_DETAILS,SLOTTER_FORM_DETAILS } from '../../../../actions/actions';


export const getScheduleMiddleWare = createAsyncThunk(
  EVENT_SCHEDULER_FORM_DETAILS,
  async (id : number | undefined, { rejectWithValue }) => {
    console.log("ididididid",id)
  try {
    const url = id ? `${eventSchedulerApi}?pk=${id}` : eventSchedulerApi;
    const {data}= await axios.get(url);
    console.log("responseresponse",data)
    return data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
  
export const postScheduleMiddleWare = createAsyncThunk(
  EVENT_SCHEDULER_FORM_DETAILS,
    async ({ formData }: any, { rejectWithValue }) => {
      try {
        const data = await axios.post(
          eventSchedulerApi,
          formData,
        );
        console.log("postScheduleMiddleWare",data)
        console.log("formData....",formData)
        return data;
      } catch (error) {
        const typedError = error as Error;
        return rejectWithValue(typedError);
      }
    },
  );
  
export const deleteScheduleMiddleWare = createAsyncThunk(  
  EVENT_SCHEDULER_FORM_DETAILS,
    async (id : number | undefined ,{rejectWithValue }) => {
      console.log("id000000000",id)
      try {
        const url = id ? `${eventSchedulerApi}?pk=${id}` : '';
        const {data} = await axios.delete(url);
        console.log("!@#$%^&*()_",data)
        return data;
      } catch (error) {
        const typedError = error as Error;
        return rejectWithValue(typedError);
      }
    },
  );

  export const getSlotterMiddleware = createAsyncThunk(
    SLOTTER_FORM_DETAILS,
    async ({ uid, event_id, selecteddate, selectedtime }: {
      uid: string | undefined,
      event_id ?: any,
      selecteddate?: string | undefined,
      selectedtime?: string | undefined
    }, { rejectWithValue }) => {
      console.log("uiduiduiduid",uid,event_id,selecteddate,selectedtime)
    try {
      const url = uid && event_id !== undefined && selectedtime !== undefined ? 
      `${slotterApi}/${uid}?event_id=${event_id}&date=${selecteddate}&time=${selectedtime}`: 
       `${slotterApi}/${uid}?event_id=${event_id}`;
      const {data} = await axios.get(url);
      console.log("getSlotterMiddleware",data)
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  });
  export const getAvailbleSlot = createAsyncThunk(
    EVENT_SCHEDULER_FORM_DETAILS,
    async (id : number | undefined, { rejectWithValue }) => {
      console.log("ididididid",id)
    try {
      const url = id ? `${availbleslot}?pk=${id}` : '';
      const {data}= await axios.get(url);
      console.log("responseresponse",data)
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  });
  

