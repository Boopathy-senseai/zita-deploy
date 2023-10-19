import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { INTERVIEW_QUESTION } from '../../../../actions/actions';
import { interviewQuestion } from '../../../../routes/apiRoutes';
import { stringifyParams } from '../../../../uikit/helper';
// import json from '../../../../assets/others/response.json';
import { InterviewerQuestions } from '../../interviewerQuestionType';

export const interviewQuestionMiddleware = createAsyncThunk<
  InterviewerQuestions,
  { jd_id: string; can_id: string }
>(INTERVIEW_QUESTION, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(
      `${interviewQuestion}?${stringifyParams(payload)}`,
    );
    return data as InterviewerQuestions;
    // return json as InterviewerQuestions;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
