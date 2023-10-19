import { createSlice } from '@reduxjs/toolkit';
import { interviewQuestionMiddleware } from '../middleware/interviewquestionMiddleware';
import { InterviewerQuestionReducer } from '../../interviewerQuestionType';

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
      state.interviews = action.payload.data.reduce((o, v) => {
        if (!o[v.interview_id]) {
          o[v.interview_id] = [];
        }
        return {
          ...o,
          [v.interview_id]: [...o[v.interview_id], v],
        };
      }, {});
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
