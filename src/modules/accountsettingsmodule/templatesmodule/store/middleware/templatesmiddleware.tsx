import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ADD_PIPELINE_STAGE,
  DELETE_PIPELINE_STAGE,
  UPDATE_PIPELINE_STAGE,
  PIPELINE_STAGES,
  PIPELINE_STAGES_REORDER,
  PIPELINE_SUGGESTIONS,
  UPDATE_COLOUR_PALLATE,
  GET_TEMPLATE_DATA,
} from '../../../../../actions/actions';
import {
  IJobPipeline,
  IUpdateTemplate,
  StageData,
} from '../../templatesPageTypes';
import StagesJson from '../../../../../assets/others/pipelineStages.json';
import SuggestionsJson from '../../../../../assets/others/pipelineSuggestions.json';
import JobPipelinesJson from '../../../../../assets/others/pipelineData.json';
import { templatesStages } from '../../../../../routes/apiRoutes';
export const getTemplateDataMiddleWare = createAsyncThunk<
  IJobPipeline,
  number | void
>(GET_TEMPLATE_DATA, async (id, { rejectWithValue }) => {
  try {
    const url = id ? `${templatesStages}?wk_id=${id}` : templatesStages;
    const response = await axios.get(url);
    return response.data as IJobPipeline;
    // return JobPipelinesJson as IJobPipeline;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

//add the cases(3) in the reducers
export const updateTemplateDataMiddleWare = createAsyncThunk<
  { message: string },
  IUpdateTemplate
>(ADD_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(templatesStages, payload);
    return response.data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

// to be removed
export const addJobPipelineStageMiddleWare = createAsyncThunk<
  StageData,
  StageData
>(ADD_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
  try {
    return payload;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
export const updateJobPipelineStageMiddleWare = createAsyncThunk<
  StageData,
  StageData
>(UPDATE_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
  try {
    return payload;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
export const updateColourMiddleWare = createAsyncThunk<String, String>(
  UPDATE_COLOUR_PALLATE,
  async (payload, { rejectWithValue }) => {
    try {
      return payload;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const deleteJobPipelineStageMiddleWare = createAsyncThunk<
  number,
  number
>(DELETE_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
  try {
    return payload as number;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const reorderJobPipelineStageMiddleWare = createAsyncThunk<
  StageData[],
  StageData[]
>(PIPELINE_STAGES_REORDER, async (payload, { rejectWithValue }) => {
  try {
    return payload as StageData[];
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
