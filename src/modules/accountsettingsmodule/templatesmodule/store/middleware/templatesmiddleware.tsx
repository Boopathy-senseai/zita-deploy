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
} from '../../../../../actions/actions';
import { StageData } from '../../templatesPageTypes';
import StagesJson from '../../../../../assets/others/pipelineStages.json';
import SuggestionsJson from '../../../../../assets/others/pipelineSuggestions.json';
//import { templatesStages } from '../../../../../routes/apiRoutes';
export const jobPipelineStagesMiddleWare = createAsyncThunk<StageData[], void>(
  PIPELINE_STAGES,
  async (_a, { rejectWithValue }) => {
    try {
      // const response = await fetch("").then(res => res.json());
      return StagesJson as StageData[];
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
// export const jobPipelineStagesMiddleWare = createAsyncThunk<StageData[], void>(
//   PIPELINE_STAGES,
//   async (_a, { rejectWithValue, getState }) => {
//     try {
//       const {
//         userProfileReducers: { user },
//       } = getState() as RootState;
//       const response = await axios.get(templatesStages(`${user.id}`));
//       console.log('res', response.data.data);
//       return response.data as StageData[];
//     } catch (error) {
//       const typedError = error as Error;
//       return rejectWithValue(typedError);
//     }
//   },
// );

export const jobPipelineSuggestionsMiddleWare = createAsyncThunk<
  Array<{ id: string; title: string }>,
  void
>(PIPELINE_SUGGESTIONS, async (_a, { rejectWithValue }) => {
  try {
    // const response = await fetch().then(res => res.json());
    return SuggestionsJson as Array<{ id: string; title: string }>;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

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
  string,
  string
>(DELETE_PIPELINE_STAGE, async (payload, { rejectWithValue }) => {
  try {
    return payload as string;
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
