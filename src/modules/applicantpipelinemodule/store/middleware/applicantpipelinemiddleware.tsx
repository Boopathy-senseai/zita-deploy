import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  APPLICANT_PIPE_LINE,
  APPLICANT_PIPE_LINE_DATA,
  APPLICANT_UPDATE_STATUS,
} from '../../../../actions/actions';
import {
  applicantFilterApi,
  applicantPipeLineApi,
  applicantStatusUpdateApi,
} from '../../../../routes/apiRoutes';
import { paramsSerializer } from '../../../../utility/helpers';
import {
  ApplicantFilter,
  ApplicantPipeLinePayload,
  ApplicantUpdateStatusPayload,
} from '../../applicantPipeLineTypes';

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
