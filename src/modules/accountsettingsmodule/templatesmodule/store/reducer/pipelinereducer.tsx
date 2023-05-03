import { createSlice } from '@reduxjs/toolkit';
import {
  defaultJobPipelineMiddleWare,
  deleteJobPipelineMiddleWare,
  jobPipelineMiddleWare,
  updatejobPipelineMiddleWare,
} from '../middleware/pipelinesmiddleware';
import { PipelinePageReducerState } from '../../templatesPageTypes';

const pipelinePageState: PipelinePageReducerState = {
  isLoading: false,
  error: '',
  pipeline: [],
};

const pipelinePageReducer = createSlice({
  name: 'pipelinePage',
  initialState: pipelinePageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jobPipelineMiddleWare.pending, (state) => {
      return { ...state, error: '', isLoading: true };
    });
    builder.addCase(jobPipelineMiddleWare.fulfilled, (state, action) => {
      if (state.pipeline.length > 0) {
        return { ...state, isLoading: false };
      }
      return { ...state, isLoading: false, pipeline: action.payload };
    });
    builder.addCase(jobPipelineMiddleWare.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: typeof action.payload === 'string' ? action.payload : '',
      };
    });
    builder.addCase(updatejobPipelineMiddleWare.fulfilled, (state, action) => {
      const index = state.pipeline?.findIndex(
        (data) => data.id === action.payload.id,
      );
      if (index === -1) {
        return { ...state };
      }
      return {
        ...state,
        pipeline: state.pipeline.map((doc) => {
          if (doc.id === action.payload.id) {
            return action.payload;
          }
          return doc;
        }),
      };
    });
    builder.addCase(deleteJobPipelineMiddleWare.fulfilled, (state, action) => {
      const newPipeline = [...state.pipeline];
      const index = state.pipeline?.findIndex(
        (data) => data.id === action.payload,
      );
      if (index !== -1) {
        newPipeline.splice(index, 1);
      }
      return {
        ...state,
        pipeline: newPipeline,
      };
    });
    builder.addCase(defaultJobPipelineMiddleWare.fulfilled, (state, action) => {
      const newPipeline = [...state.pipeline];
      const index = state.pipeline?.findIndex(
        (data) => data.id === action.payload,
      );
      if (index !== -1) {
        return {
          ...state,
          pipeline: newPipeline.map((doc, i) => {
            return {
              ...doc,
              default: i === index ? true : false,
            };
          }),
        };
      }
      return {
        ...state,
      };
    });
  },
});

export const pipelinePageReducers = pipelinePageReducer.reducer;
