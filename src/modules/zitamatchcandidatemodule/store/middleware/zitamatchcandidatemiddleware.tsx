import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ZITA_MATCH_CANDIDATE,
  ZITA_MATCH_DATA_CANDIDATE,
} from '../../../../actions/actions';
import { zitaMatchApi, zitaMatchDataApi } from '../../../../routes/apiRoutes';
import { paramsSerializer } from '../../../../utility/helpers';
import { ZitaMatchPayload } from '../../zitaMatchCandidateTypes';

export const zitaMatchDataCandidateMiddleWare = createAsyncThunk(
  ZITA_MATCH_DATA_CANDIDATE,
  async (
    {
      jd_id,
      profile_match,
      candidate,
      work_experience,
      relocate,
      invite,
      profile_view,
      education_level,
      type_of_job,
      preferred_location,
      skill_match,
      fav,
      page,
    }: ZitaMatchPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(zitaMatchDataApi, {
        params: {
          jd_id,
          profile_match,
          fav,
          candidate,
          work_experience,
          relocate,
          invite,
          profile_view,
          education_level,
          type_of_job,
          preferred_location,
          skill_match,
          page,
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

export const zitaMatchCandidateMiddleWare = createAsyncThunk(
  ZITA_MATCH_CANDIDATE,
  async ({ jd_id }: { jd_id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(zitaMatchApi, { params: { jd_id } });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
