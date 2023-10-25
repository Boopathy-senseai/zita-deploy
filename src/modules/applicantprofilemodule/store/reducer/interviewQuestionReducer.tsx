import { createSlice } from '@reduxjs/toolkit';
import { interviewQuestionMiddleware } from '../middleware/interviewquestionMiddleware';
import {
  CumulativeData,
  InterviewExtractData,
  InterviewerQuestionReducer,
  NoOfInterview,
  Question,
} from '../../interviewerQuestionType';

const interviewerQuestionInitialState: InterviewerQuestionReducer = {
  isLoading: false,
  error: '',
  data: [],
  no_of_interview: [],
  scorecard: [],
  success: false,
  result: undefined,
  cumulative: [],
  interviews: {},
};

const interviewerQuestionReducer = createSlice({
  name: 'interviewerQuestion',
  initialState: interviewerQuestionInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(interviewQuestionMiddleware.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(interviewQuestionMiddleware.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.no_of_interview = action.payload.no_of_interview;
      state.scorecard = action.payload.scorecard;
      state.success = action.payload.success;
      state.result = action.payload.result;
      state.cumulative = action.payload.cumulative;
      state.interviews = action.payload.no_of_interview.reduce((o, v) => {
        if (!o[v.id]) {
          o[v.id] = {
            questions: [] as Question[],
            cumulative: [] as CumulativeData[],
            data: undefined,
          };
        }
        return {
          ...o,
          [v.id]: {
            ...o[v.id],
            questions: [
              ...o[v.id].questions,
              ...action.payload.data.filter((d) => d.interview_id === v.id),
            ],
            cumulative: [
              ...action.payload.cumulative.filter(
                (doc) =>
                  doc.interview_id === v.id  &&
                  doc.total_score !== 0 &&
                  doc.total_score !== null,
              ),
            ],
            data: v,
          },
        };
      }, {} as { [key: number]: InterviewExtractData });
    });

    builder.addCase(interviewQuestionMiddleware.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const interviewerQuestionReducers = interviewerQuestionReducer.reducer;
