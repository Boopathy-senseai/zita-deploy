import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  MY_DATABASE_DATA,
  MY_DATABASE_INITIAL,
} from '../../../../actions/actions';
import {
  myDataBaseDataApi,
  myDataBaseInitalApi,
} from '../../../../routes/apiRoutes';
import { paramsSerializer } from '../../../../utility/helpers';
import { MyDataBasePayload } from '../../myDataBaseTypes';

export const myDataBaseInitalMiddleWare = createAsyncThunk(
  MY_DATABASE_INITIAL,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(myDataBaseInitalApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const myDataBaseDataMiddleWare = createAsyncThunk(
  MY_DATABASE_DATA,
  async (
    {
      jobTitle,
      fav,
      experience,
      educationLevel,
      typeofJob,
      location,
      skill_match,
      relocate,
      candidate,
      userType,
      sort,
      page,
      applicant_only,
    }: MyDataBasePayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(myDataBaseDataApi, {
        params: {
          job_title: jobTitle,
          fav,
          work_experience: experience,
          education_level: educationLevel,
          type_of_job: typeofJob,
          location,
          skill_match,
          relocate,
          candidate,
          user_type: userType,
          sort,
          page,
          applicant_only,
        },
        paramsSerializer,
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
