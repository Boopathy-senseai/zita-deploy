import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  Add_question,
  EVALUATE_QUESTION,
  INTERVIEW_QUESTION,
} from '../../../../actions/actions';
import { interviewQuestion } from '../../../../routes/apiRoutes';
import { stringifyParams } from '../../../../uikit/helper';
// import json from '../../../../assets/others/response.json';
import { InterviewerQuestions } from '../../interviewerQuestionType';

export const interviewQuestionMiddleware = createAsyncThunk<
  InterviewerQuestions,
  {
    jd_id: string;
    can_id: string;
    re_generate?: string;
    interview_id?: string;
    exclude?: string;
  }
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

export const addquestionmiddleware = createAsyncThunk(
  Add_question,
  async ({ formData }: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(interviewQuestion,
        formData 
      )
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
); 

export const evaluateQuestionMiddleware = createAsyncThunk<
  any,
  {
    jd_id: string;
    can_id: string;
    scorecard: string;
    interview_id: string;
    commands: string;
    recommend: string;
  }
>(EVALUATE_QUESTION, async (payload, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      `${interviewQuestion}?${stringifyParams(payload)}`,
    );
    return data;
  } catch (error) {
    const typedError = error as Error;
    return rejectWithValue(typedError);
  }
});
