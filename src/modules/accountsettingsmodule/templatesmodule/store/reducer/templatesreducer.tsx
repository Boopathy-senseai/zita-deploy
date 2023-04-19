import { createSlice } from '@reduxjs/toolkit';
import {
  jobPipelineStagesMiddleWare,
  addJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
  deleteJobPipelineStageMiddleWare,
  jobPipelineSuggestionsMiddleWare,
  reorderJobPipelineStageMiddleWare,
} from '../middleware/templatesmiddleware';
import { TemplatesPageReducerState } from '../../templatesPageTypes';

const templatesPageState: TemplatesPageReducerState = {
  isLoading: false,
  error: '',
  stages: [],
  suggestions: [],
};

const templatePageReducer = createSlice({
  name: 'templatePage',
  initialState: templatesPageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(jobPipelineStagesMiddleWare.pending, (state) => {
      return { ...state, error: '', isLoading: true };
    });
    builder.addCase(jobPipelineStagesMiddleWare.fulfilled, (state, action) => {
      if (state.stages.length > 0) {
        return { ...state, isLoading: false };
      }
      return { ...state, isLoading: false, stages: action.payload };
    });
    builder.addCase(jobPipelineStagesMiddleWare.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: typeof action.payload === 'string' ? action.payload : '',
      };
    });

    builder.addCase(jobPipelineSuggestionsMiddleWare.pending, (state) => {
      return { ...state, error: '', isLoading: true };
    });
    builder.addCase(
      jobPipelineSuggestionsMiddleWare.fulfilled,
      (state, action) => {
        if (state.suggestions.length > 0) {
          return { ...state, isLoading: false };
        }
        return { ...state, isLoading: false, suggestions: action.payload };
      },
    );
    builder.addCase(
      jobPipelineSuggestionsMiddleWare.rejected,
      (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: typeof action.payload === 'string' ? action.payload : '',
        };
      },
    );

    builder.addCase(
      addJobPipelineStageMiddleWare.fulfilled,
      (state, action) => {
        const index = state.stages?.findIndex(
          (data) => data.id === action.payload.id,
        );
        if (index !== -1) {
          return { ...state };
        }
        const newStages = [...state.stages, action.payload];
        return {
          ...state,
          stages: newStages,
        };
      },
    );

    builder.addCase(
        updateJobPipelineStageMiddleWare.fulfilled,
        (state, action) => {
          const index = state.stages?.findIndex(
            (data) => data.id === action.payload.id,
          );
          if (index === -1) {
            return { ...state };
          }
          return {
            ...state,
            stages: state.stages.map((doc,) => {
                if (doc.id === action.payload.id) {
                    return action.payload;
                }
                return doc
            })
        };
        },
      );

    builder.addCase(
      deleteJobPipelineStageMiddleWare.fulfilled,
      (state, action) => {
        const newStages = [...state.stages];
        const index = newStages?.findIndex(
          (data) => data.id === action.payload,
        );
        if (index !== -1) {
          const res = newStages.splice(index, 1);
          return {
            ...state,
            stages: newStages,
          };
        }
        return {
          ...state,
        };
      },
    );

    builder.addCase(
        reorderJobPipelineStageMiddleWare.fulfilled,
        (state, action) => {
          return {
            ...state,
            stages: action.payload,
          };
        },
      );
  },
});

export const templatePageReducers = templatePageReducer.reducer;
