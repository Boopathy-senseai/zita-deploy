import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CANDIDATE_SEARCHING_DATA,COMPARATIVE_ANALYSIS_DATA } from '../../../../actions/actions';
import {ComparativesearchingdataApi,ComparativeAnalysisApi} from '../../../../routes/apiRoutes';
import { searchingdata,Comparativedata} from '../../comparativeTypes';
 
export const comparativesearchingdatamiddleware = createAsyncThunk(
    CANDIDATE_SEARCHING_DATA,
  async ({ jd_id}: searchingdata, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(ComparativesearchingdataApi, {
        params: {jd_id},
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const comparativeanalysismiddleware = createAsyncThunk(
  CANDIDATE_SEARCHING_DATA,
async ({candidate_ids,job_id,categories}: Comparativedata, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(ComparativeAnalysisApi, {
      params: {candidate_ids,job_id,categories},
    });
    return data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
},
);
