import { createSlice } from '@reduxjs/toolkit';
import {
  defaultJobPipelineMiddleWare,
  deleteJobPipelineMiddleWare,
  getPipelineDataMiddleWare,
  updatejobPipelineMiddleWare,
} from '../middleware/pipelinesmiddleware';
import { PipelinePageReducerState } from '../../templatesPageTypes';

const pipelinePageState: PipelinePageReducerState = {
  isLoading: false,
  error: '',
  pipeline: [],
  suggestion: [],
};

const pipelinePageReducer = createSlice({
  name: 'pipelinePage',
  initialState: pipelinePageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPipelineDataMiddleWare.pending, (state) => {
      state.isLoading = state.pipeline.length !== 0 ? false : true;
      state.error = '';
    });
    builder.addCase(getPipelineDataMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pipeline = action.payload.data;
      state.suggestion = action.payload.suggestion;
    });
    builder.addCase(getPipelineDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
    builder.addCase(updatejobPipelineMiddleWare.fulfilled, (state, action) => {
      const index = state.pipeline?.findIndex(
        (data) => data.wk_id === action.payload.wk_id,
      );
      if (index === -1) {
        return { ...state };
      }
      return {
        ...state,
        pipeline: state.pipeline.map((doc) => {
          if (doc.wk_id === action.payload.wk_id) {
            return action.payload;
          }
          return doc;
        }),
      };
    });
    builder.addCase(deleteJobPipelineMiddleWare.fulfilled, (state, action) => {
      const newPipeline = [...state.pipeline];
      const index = state.pipeline?.findIndex(
        (data) => data.wk_id === action.payload,
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
        (data) => data.wk_id === action.payload,
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
