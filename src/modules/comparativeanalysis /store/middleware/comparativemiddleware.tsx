import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CANDIDATE_SEARCHING_DATA,
  COMPARATIVE_ANALYSIS_DATA,
  COMPARATIVE_CSV_ANALYSIS,
} from '../../../../actions/actions';
import {
  ComparativesearchingdataApi,
  ComparativeAnalysisApi,
  ComparativecsvdownloadApi,
} from '../../../../routes/apiRoutes';
import { searchingdata, Comparativedata } from '../../comparativeTypes';
import { handleDownload } from '../../../applicantpipelinemodule/dndBoardHelper';
import Toast from '../../../../uikit/Toast/Toast';
export const comparativesearchingdatamiddleware = createAsyncThunk(
  CANDIDATE_SEARCHING_DATA,
  async ({ jd_id }: searchingdata, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(ComparativesearchingdataApi, {
        params: { jd_id },
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
  async (
    { candidate_ids, job_id, categories }: Comparativedata,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(ComparativeAnalysisApi, {
        params: { candidate_ids, job_id, categories },
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
  async (
    { response_json, jd_id }: { response_json: any; jd_id: any },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(ComparativecsvdownloadApi, {
        params: { response_json, jd_id },
      });
      if (
         data.success === true 
      ) {
        handleDownload(data?.FilePath);
        Toast('CSV downloaded successfully', 'LONG', 'success');
      } 
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
