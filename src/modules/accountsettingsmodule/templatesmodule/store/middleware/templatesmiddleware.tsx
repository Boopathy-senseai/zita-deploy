import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  GET_TEMPLATE_DATA,
  UPDATE_TEMPLATE_DATA,
  CREATE_TEMPLATE_DATA,
} from '../../../../../actions/actions';
import {
  ICreateTemplate,
  IJobPipeline,
  IUpdateTemplate,
} from '../../templatesPageTypes';
import { templatesStages } from '../../../../../routes/apiRoutes';
import { convertJsonToForm } from '../../../../../uikit/helper';
import { Toast } from '../../../../../uikit';
import { getPipelineDataMiddleWare } from './pipelinesmiddleware';

export const getTemplateDataMiddleWare = createAsyncThunk<
  IJobPipeline,
  number | void
>(GET_TEMPLATE_DATA, async (id, { rejectWithValue }) => {
  try {
    const url = id ? `${templatesStages}?wk_id=${id}` : templatesStages;
    const response = await axios.get(url);
    return response.data as IJobPipeline;
    //  sreturn JobPipelinesJson as IJobPipeline;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const updateTemplateDataMiddleWare = createAsyncThunk<
  { message: string },
  IUpdateTemplate
>(UPDATE_TEMPLATE_DATA, async (payload, { rejectWithValue, dispatch }) => {
  try {
    // const response = await axios.post(templatesStages)
    const response = await axios.post(
      templatesStages,
      convertJsonToForm(payload),
    );
    if (response.data && response.data.message) Toast('Changes saved successfully', 'LONG');
    dispatch(getTemplateDataMiddleWare(payload.workflow_id));
    dispatch(getPipelineDataMiddleWare());
    return response.data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const createTemplateDataMiddleWare = createAsyncThunk<
  { message: string },
  ICreateTemplate
>(CREATE_TEMPLATE_DATA, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(
      templatesStages,
      convertJsonToForm(payload),
    );
    if (response.data && response.data.message) Toast('Pipeline created successfully', 'LONG');
    //const response = await axios.post(templatesStages);
    dispatch(getPipelineDataMiddleWare());
    return response.data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

// // to be removed
// export const addJobPipelineStageMiddleWare = createAsyncThunk<
//   StageData,
//   StageData
// >(ADD_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
//   try {
//     return payload;
//   } catch (error) {
//     const typedError = error as Error;
//     return rejectWithValue(typedError);
//   }
// });
// export const updateJobPipelineStageMiddleWare = createAsyncThunk<
//   StageData,
//   StageData
// >(UPDATE_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
//   try {
//     return payload;
//   } catch (error) {
//     const typedError = error as Error;
//     return rejectWithValue(typedError);
//   }
// });
// export const updateColourMiddleWare = createAsyncThunk<String, String>(
//   UPDATE_COLOUR_PALLATE,
//   async (payload, { rejectWithValue }) => {
//     try {
//       return payload;
//     } catch (error) {
//       const typedError = error as Error;
//       return rejectWithValue(typedError);
//     }
//   },
// );

// export const deleteJobPipelineStageMiddleWare = createAsyncThunk<
//   number,
//   number
// >(DELETE_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
//   try {
//     return payload as number;
//   } catch (error) {
//     const typedError = error as Error;
//     return rejectWithValue(typedError);
//   }
// });

// export const reorderJobPipelineStageMiddleWare = createAsyncThunk<
//   StageData[],
//   StageData[]
// >(PIPELINE_STAGES_REORDER, async (payload, { rejectWithValue }) => {
//   try {
//     return payload as StageData[];
//   } catch (error) {
//     const typedError = error as Error;
//     return rejectWithValue(typedError);
//   }
// });
