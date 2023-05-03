import React from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  DEFAULT_PIPELINE_DATA,
  DELETE_PIPELINE_DATA,
  PIPELINE_DATA,
  UPDATE_PIPELINE_DATA,
} from '../../../../../actions/actions';
import { PipelineData } from '../../templatesPageTypes';
import JobPipelinesJson from '../../../../../assets/others/jobPipelines.json';

export const jobPipelineMiddleWare = createAsyncThunk<PipelineData[], void>(
  PIPELINE_DATA,
  async (_a, { rejectWithValue }) => {
    try {
      // const response = await fetch("").then(res => res.json());
      return JobPipelinesJson as PipelineData[];
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

export const deleteJobPipelineMiddleWare = createAsyncThunk<string, string>(
  DELETE_PIPELINE_DATA,
  async (payload, { rejectWithValue }) => {
    try {
      return payload as string;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const defaultJobPipelineMiddleWare = createAsyncThunk<string, string>(
  DEFAULT_PIPELINE_DATA,
  async (payload, { rejectWithValue }) => {
    try {
      return payload as string;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
