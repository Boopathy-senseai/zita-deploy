import React from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  DEFAULT_PIPELINE_DATA,
  DELETE_PIPELINE_DATA,
  PIPELINE_DATA,
  UPDATE_PIPELINE_DATA,
} from '../../../../../actions/actions';
import { PipelineData } from '../../templatesPageTypes';
import JobPipelinesJson from '../../../../../assets/others/pipelineData.json';
import { templatesStages } from '../../../../../routes/apiRoutes';

export const getPipelineDataMiddleWare = createAsyncThunk<PipelineData[], void>(
  PIPELINE_DATA,
  async (_a, { rejectWithValue }) => {
    try {
      const response = await axios.get(templatesStages);
      return response.data.data as PipelineData[];
      // return JobPipelinesJson.data as PipelineData[];
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const updatejobPipelineMiddleWare = createAsyncThunk<
  PipelineData,
  PipelineData
>(UPDATE_PIPELINE_DATA, async (payload, { rejectWithValue }) => {
  try {
    return payload;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const deleteJobPipelineMiddleWare = createAsyncThunk<number, number>(
  DELETE_PIPELINE_DATA,
  async (payload, { rejectWithValue }) => {
    try {
      return payload as number;
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
