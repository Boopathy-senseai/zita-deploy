import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  APPLICANT_PIPE_LINE,
  APPLICANT_PIPE_LINE_DATA,
  APPLICANT_UPDATE_STATUS,
  DELETE_KANBAN_DATA,
  GET_KANBAN_DATA,
  UPDATE_KANBAN_DATA,
} from '../../../../actions/actions';
import {
  applicantFilterApi,
  applicantPipeLineApi,
  applicantStatusUpdateApi,
  kanbanPipelineView,
} from '../../../../routes/apiRoutes';
import { paramsSerializer } from '../../../../utility/helpers';
import {
  ApplicantFilter,
  ApplicantPipeLinePayload,
  ApplicantUpdateStatusPayload,
  IUpdateKanbanStage,
} from '../../applicantPipeLineTypes';
import { IKanbanStages, StageData } from '../../../../hooks/useStages/types';
import { convertJsonToForm, stringifyParams } from '../../../../uikit/helper';

export const applicantPipeLineMiddleWare = createAsyncThunk(
  APPLICANT_PIPE_LINE,
  async ({ jd_id }: ApplicantPipeLinePayload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(applicantPipeLineApi(jd_id));
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantPipeLineDataMiddleWare = createAsyncThunk(
  APPLICANT_PIPE_LINE_DATA,
  async (
    {
      jd_id,
      profile_match,
      candidate,
      work_experience,
      profile_view,
      education_level,
      skill_match,
      fav,
      sortApplicant,
      sortSortList,
      sortInterview,
      sortSelected,
      sortRejected,
    }: ApplicantFilter,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantFilterApi(jd_id), {
        params: {
          profile_match,
          fav,
          candidate,
          work_experience,
          profile_view,
          education_level,
          skill_match,
          sort_applicant: sortApplicant,
          sort_shortlisted: sortSortList,
          sort_interviewed: sortInterview,
          sort_selected: sortSelected,
          sort_rejected: sortRejected,
        },
        paramsSerializer,
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const applicantUpdateStatusMiddleWare = createAsyncThunk(
  APPLICANT_UPDATE_STATUS,
  async (
    { jd_id, applicant_id, status }: ApplicantUpdateStatusPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(applicantStatusUpdateApi(jd_id), {
        params: {
          update_id: applicant_id,
          status,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const getKanbanStagesMiddleWare = createAsyncThunk<
{showpopup?: boolean, data?:IKanbanStages[], stages?:IKanbanStages[]},
  { workflow_id: number; jd_id: number, default_all?: boolean, } | void
>(GET_KANBAN_DATA, async (payload, { rejectWithValue }) => {
  try {
    const url = payload ? `${kanbanPipelineView}?${stringifyParams(payload)}` : kanbanPipelineView;
    const response = await axios.get(url);
    return response.data as {showpopup?: boolean, data?:IKanbanStages[], stages?:IKanbanStages[]};
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const updateKanbanStagesMiddleware = createAsyncThunk<
  { message: string },
  IUpdateKanbanStage
>(UPDATE_KANBAN_DATA, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post(
      kanbanPipelineView,
      convertJsonToForm(payload),
    );
    dispatch(
      getKanbanStagesMiddleWare({
        workflow_id: payload.workflow_id,
        jd_id: payload.jd_id,
      }),
    );
    return response.data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
export const deleteKanbanStagesMiddleware = createAsyncThunk<
  { message: string },
  { workflow_id: number; jd_id: number; stages: StageData[] }
>(DELETE_KANBAN_DATA, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const url = `${kanbanPipelineView}?workflow_id=${
      payload.workflow_id
    }&stages=${JSON.stringify(payload.stages)}`;
    const response = await axios.delete(url);
    dispatch(
      getKanbanStagesMiddleWare({
        workflow_id: payload.workflow_id,
        jd_id: payload.jd_id,
      }),
    );
    return response.data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
