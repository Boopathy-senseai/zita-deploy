import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CANDIDATE_PROFILE_MESSAGE } from '../../../../actions/actions';
import { candiDateMessageApi } from '../../../../routes/apiRoutes';
import { candidateMessagePayload } from '../../candidateTypes';

export const candidateMessageMiddleWare = createAsyncThunk(
  CANDIDATE_PROFILE_MESSAGE,
  async ({ jd_id, can_id }: candidateMessagePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(candiDateMessageApi, {
        params: { jd_id, can_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
