import { createSlice } from '@reduxjs/toolkit';
import {
  bulkDownloadActionCandidateState,
  CandidateViewState,
  StripeState,
  TalentSourcingReducerState,
  TalentSourcingSearchReducerState,
  UnlockCandidatesState,
} from '../../talentSourcingTypes';
import {
  bulkActionSourcingMiddleWare,
  bulkDownloadActionMiddleWare,
  candidateViewMiddleWare,
  stripeMiddleWare,
  talentSourcingMiddleWare,
  talentSourcingSearchMiddleWare,
  unlockCandidateMiddleWare,
} from '../middleware/talentSoucringMiddleware';

const talentSourcingInitialState: TalentSourcingReducerState = {
  isLoading: false,
  error: '',
  show_pop: 0,
  source_limit: 0,
};

const talentSourcingReducer = createSlice({
  name: 'talent_sourcing',
  initialState: talentSourcingInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(talentSourcingMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(talentSourcingMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.location = action.payload.location;
      state.show_pop = action.payload.show_pop;
      state.source_limit = action.payload.source_limit;
      state.permission = action.payload.permission;
    });
    builder.addCase(talentSourcingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const talentSourcingSearchInitialState: TalentSourcingSearchReducerState = {
  isLoading: false,
  error: '',
  source_limit: 0,
  candi_limit: 0,
  data: [],
  plan: [],
};

const talentSourcingSearchReducer = createSlice({
  name: 'talent_sourcing_search',
  initialState: talentSourcingSearchInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(talentSourcingSearchMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(
      talentSourcingSearchMiddleWare.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.candi_limit = action.payload.candi_limit;
        state.data = action.payload.data;
        state.permission = action.payload.permission;
        state.plan = action.payload.plan;
        state.source_limit = action.payload.source_limit;
        state.candi_list = action.payload.candi_list;
      },
    );
    builder.addCase(
      talentSourcingSearchMiddleWare.rejected,
      (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        }
      },
    );
  },
});

const talentUnlockCandidateInitialState: UnlockCandidatesState = {
  isLoading: false,
  error: '',
  success: '',
  source_limit: 0,
  candi_limit: '',
};

const talentUnlockCandidateReducer = createSlice({
  name: 'talent_unlock_candidate',
  initialState: talentUnlockCandidateInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(unlockCandidateMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(unlockCandidateMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.candi_limit = action.payload.candi_limit;
      state.success = action.payload.success;
      state.source_limit = action.payload.source_limit;
      state.unlock_can_list = action.payload.unlock_can_list;
    });
    builder.addCase(unlockCandidateMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const bulkActionReducer = createSlice({
  name: 'bulk_action_unlock',
  initialState: talentUnlockCandidateInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkActionSourcingMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(bulkActionSourcingMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.candi_limit = action.payload.candi_limit;
      state.success = action.payload.success;
      state.source_limit = action.payload.source_limit;
      state.unlock_can_list = action.payload.unlock_can_list;
    });
    builder.addCase(bulkActionSourcingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const talentDownloadCandidateInitialState: bulkDownloadActionCandidateState = {
  isLoading: false,
  error: '',
  file_path: '',
};
const bulkDownloadActionReducer = createSlice({
  name: 'bulk_action_download',
  initialState: talentDownloadCandidateInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bulkDownloadActionMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(bulkDownloadActionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file_path = action.payload.file_path;
    });
    builder.addCase(bulkDownloadActionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const talentCandidateViewInitialState: CandidateViewState = {
  isLoading: false,
  error: '',
  file: '',
  candidate_key: '',
  unlock_status: '',
};

const candidateViewReducer = createSlice({
  name: 'candidate_view',
  initialState: talentCandidateViewInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(candidateViewMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(candidateViewMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.file = action.payload.file;
    });
    builder.addCase(candidateViewMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

const stripeInitialState: StripeState = {
  isLoading: false,
  error: '',
  publicKey: '',
};

const stripeReducer = createSlice({
  name: 'stripe',
  initialState: stripeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(stripeMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(stripeMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.publicKey = action.payload.publicKey;
    });
    builder.addCase(stripeMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const talentSourcingReducers = talentSourcingReducer.reducer;
export const talentSourcingSearchReducers = talentSourcingSearchReducer.reducer;
export const talentUnlockCandidateReducers =
  talentUnlockCandidateReducer.reducer;
export const bulkActionReducers = bulkActionReducer.reducer;
export const bulkDownloadActionReducers = bulkDownloadActionReducer.reducer;
export const candidateViewReducers = candidateViewReducer.reducer;
export const stripeReducers = stripeReducer.reducer;
