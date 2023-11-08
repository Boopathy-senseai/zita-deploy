import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  EVALUATE_QUESTION,
  INTERVIEW_QUESTION,
} from '../../../../actions/actions';
import { interviewQuestion } from '../../../../routes/apiRoutes';
import { convertJsonToForm, stringifyParams } from '../../../../uikit/helper';
import { InterviewerQuestions } from '../../interviewerQuestionType';

export const interviewQuestionMiddleware = createAsyncThunk<
   any,
  {
    jd_id: string;
    can_id: string;
    re_generate?: [];
    interview_id?: string;
    exclude?: string;
    role?: string;
  }
>(INTERVIEW_QUESTION, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${interviewQuestion}?${stringifyParams(payload)}`,
    );
    return data;
    // return json as InterviewerQuestions;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});

export const evaluateQuestionMiddleware = createAsyncThunk<
  any,
  {
    jd_id: string;
    can_id: string;
    scorecard?: string;
    interview_id: string;
    commands?: string;
    recommend?: number;
    role? : string;
  }
>(EVALUATE_QUESTION, async (payload, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await axios.post(
      interviewQuestion,
      convertJsonToForm(payload),
    );
    dispatch(
      interviewQuestionMiddleware({
        can_id: payload.can_id,
        jd_id: payload.jd_id,
      }),
    );
    return data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
