import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CANDIDATE_SEARCHING_DATA,COMPARATIVE_ANALYSIS_DATA } from '../../../../actions/actions';
import {ComparativesearchingdataApi,ComparativeAnalysisApi} from '../../../../routes/apiRoutes';
import { searchingdata} from '../../comparativeTypes';
 
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
