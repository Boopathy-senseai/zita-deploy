import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  getTemplateDataMiddleWare,
  addJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
  deleteJobPipelineStageMiddleWare,
  reorderJobPipelineStageMiddleWare,
  updateTemplateDataMiddleWare,
} from '../middleware/templatesmiddleware';
import { TemplatesPageReducerState } from '../../templatesPageTypes';

const templatesPageState: TemplatesPageReducerState = {
  isLoading: false,
  error: '',
  messaage: '',
  data: [],
  stages: [],
  suggestion: [],
};

const templatePageReducer = createSlice({
  name: 'templatePage',
  initialState: templatesPageState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTemplateDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(getTemplateDataMiddleWare.fulfilled, (state, action) => {
      // state.isLoading = false;
      // state = { ...state, ...action.payload, temp:action.payload };
      return { ...state, ...action.payload, isLoading: false };
      // state.isLoading = false;
      // state.messaage = action.payload.messaage;
      // state.data = action.payload.data;
      // state.stages = action.payload.stages;
      // state.suggestion = action.payload.suggestion;
      // console.log('check_reduce', state);
    });
    builder.addCase(getTemplateDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(updateTemplateDataMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(updateTemplateDataMiddleWare.fulfilled, (state, action) => {
      return { ...state, ...action.payload, isLoading: false };
    });
    builder.addCase(updateTemplateDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

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
          stages: state.stages.map((doc) => {
            if (doc.id === action.payload.id) {
              return action.payload;
            }
            return doc;
          }),
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
