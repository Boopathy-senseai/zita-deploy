import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import {
  getTemplateDataMiddleWare,
  // addJobPipelineStageMiddleWare,
  // updateJobPipelineStageMiddleWare,
  // deleteJobPipelineStageMiddleWare,
  // reorderJobPipelineStageMiddleWare,
  updateTemplateDataMiddleWare,
  createTemplateDataMiddleWare,
} from '../middleware/templatesmiddleware';
import { TemplatesPageReducerState } from '../../templatesPageTypes';

const templatesPageState: TemplatesPageReducerState = {
  isLoading: false,
  isUpdateLoading: false,
  error: '',
  message: '',
  data: [],
  stages: [],
  suggestion: [],
};

const templatePageReducer = createSlice({
  name: 'templatePage',
  initialState: templatesPageState,
  reducers: {
    clearState(state) {
      state.message = '';
      state.isLoading = false;
      state.error = '';
      state.data = [];
      state.stages = [];
      state.suggestion = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTemplateDataMiddleWare.pending, (state) => {
      state.isLoading = (state.data.length !== 0 || state.stages.length !==0)  ? false : true;
      state.error = '';
    });
    builder.addCase(getTemplateDataMiddleWare.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.message = action.payload.message;
        state.data = action.payload.data || [];
        state.stages = action.payload.stages || [];
        state.suggestion = action.payload.suggestion || [];
      }
    });
    builder.addCase(getTemplateDataMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(updateTemplateDataMiddleWare.pending, (state) => {
      state.isUpdateLoading = true;
      state.error = '';
    });
    builder.addCase(updateTemplateDataMiddleWare.fulfilled, (state, action) => {
      return { ...state, ...action.payload, isUpdateLoading: false };
    });
    builder.addCase(updateTemplateDataMiddleWare.rejected, (state, action) => {
      state.isUpdateLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    builder.addCase(createTemplateDataMiddleWare.pending, (state) => {
      state.isUpdateLoading = true;
      state.error = '';
    });
    builder.addCase(createTemplateDataMiddleWare.fulfilled, (state, action) => {
      return { ...state, ...action.payload, isUpdateLoading: false };
    });
    builder.addCase(createTemplateDataMiddleWare.rejected, (state, action) => {
      state.isUpdateLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });

    // builder.addCase(
    //   addJobPipelineStageMiddleWare.fulfilled,
    //   (state, action) => {
    //     const index = state.stages?.findIndex(
    //       (data) => data.id === action.payload.id,
    //     );
    //     if (index !== -1) {
    //       return { ...state };
    //     }
    //     const newStages = [...state.stages, action.payload];
    //     return {
    //       ...state,
    //       stages: newStages,
    //     };
    //   },
    // );

    // builder.addCase(
    //   updateJobPipelineStageMiddleWare.fulfilled,
    //   (state, action) => {
    //     const index = state.stages?.findIndex(
    //       (data) => data.id === action.payload.id,
    //     );
    //     if (index === -1) {
    //       return { ...state };
    //     }
    //     return {
    //       ...state,
    //       stages: state.stages.map((doc) => {
    //         if (doc.id === action.payload.id) {
    //           return action.payload;
    //         }
    //         return doc;
    //       }),
    //     };
    //   },
    // );

    // builder.addCase(
    //   deleteJobPipelineStageMiddleWare.fulfilled,
    //   (state, action) => {
    //     const newStages = [...state.stages];
    //     const index = newStages?.findIndex(
    //       (data) => data.id === action.payload,
    //     );
    //     if (index !== -1) {
    //       newStages.splice(index, 1);
    //       state.stages =newStages;
    //       //const res = newStages.splice(index, 1);
    //       // return {
    //       //   ...state,
    //       //   stages: newStages,
    //       // };
    //     }
    //     // return {
    //     //   ...state,
    //     // };
    //   },
    // );

    // builder.addCase(
    //   reorderJobPipelineStageMiddleWare.fulfilled,
    //   (state, action) => {
    //     return {
    //       ...state,
    //       stages: action.payload,
    //     };
    //   },
    // );
  },
});

export const templatePageReducers = templatePageReducer.reducer;
export const templatePageReducerActions = templatePageReducer.actions;
