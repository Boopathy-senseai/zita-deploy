import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CANDIDATE_SEARCHING_DATA,COMPARATIVE_ANALYSIS_DATA, COMPARATIVE_CSV_ANALYSIS } from '../../../../actions/actions';
import {ComparativesearchingdataApi,ComparativeAnalysisApi, ComparativecsvdownloadApi} from '../../../../routes/apiRoutes';
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
export const comparativecsvdownloadmiddleware = createAsyncThunk(
  COMPARATIVE_CSV_ANALYSIS,
async ({response_json}: {response_json:any}, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(ComparativecsvdownloadApi, {
      params: {response_json},
    });
    return data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
},
);
