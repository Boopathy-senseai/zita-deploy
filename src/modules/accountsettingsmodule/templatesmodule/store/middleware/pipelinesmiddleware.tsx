import React from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  DEFAULT_PIPELINE_DATA,
  DELETE_PIPELINE_DATA,
  PIPELINE_DATA,
  UPDATE_PIPELINE_DATA,
} from '../../../../../actions/actions';
import { IJobPipeline, PipelineData } from '../../templatesPageTypes';
import JobPipelinesJson from '../../../../../assets/others/pipelineData.json';
import { templatesStages } from '../../../../../routes/apiRoutes';
import { convertJsonToForm } from '../../../../../uikit/helper';

export const getPipelineDataMiddleWare = createAsyncThunk<IJobPipeline, void>(
  PIPELINE_DATA,
  async (_a, { rejectWithValue }) => {
    try {
      const response = await axios.get(templatesStages);
      console.log(response.data)
      return response.data as IJobPipeline;
      
       //return JobPipelinesJson.data as PipelineData[];
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const updatejobPipelineMiddleWare = createAsyncThunk<
  PipelineData,
  PipelineData
>(UPDATE_PIPELINE_DATA, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const {pipeline_name, wk_id, set_as_default} = payload;
    const response = await axios.post(templatesStages, convertJsonToForm({pipeline_name, workflow_id: wk_id, set_as_default}));
    dispatch(getPipelineDataMiddleWare());
    return response.data;

  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const deleteJobPipelineMiddleWare = createAsyncThunk<number, number>(
  DELETE_PIPELINE_DATA,
  async (payload, { rejectWithValue, dispatch }) => {
    
    try {
      const url =  payload ? `${templatesStages}?workflow_id=${payload}` : templatesStages;
      const {data} =  await axios.delete(url);
      dispatch(getPipelineDataMiddleWare());

      return data as number;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const defaultJobPipelineMiddleWare = createAsyncThunk<number, number>(
  DEFAULT_PIPELINE_DATA,
  async (payload, { rejectWithValue }) => {
    try {
      return payload as number;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
