import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  TALENT_BULK_ACTION_UNLOCK,
  TALENT_BULK_ACTION_DOWNLOAD,
  TALENT_SOUCRCING,
  TALENT_SOUCRCING_SEARCH,
  TALENT_UNLOCK_CANDIDATE,
  TALEN_PARSED_TEXT_UNLOCK,
  TALEN_CANDIDATE_VIEW,
  STRIPE_ACTION,
  CHECKOUT_ACTION,
} from '../../../../actions/actions';
import {
  bulkActionSourcingApi,
  bulkDownloadActionApi,
  candidateViewApi,
  createCheckoutApi,
  parsedSourcingApi,
  paymentSourcingApi,
  sessionIdApi,
  sourcingApi,
  sourcingSearch,
  stripeApi,
  unlockCandidatesApi,
} from '../../../../routes/apiRoutes';
import Toast from '../../../../uikit/Toast/Toast';
import { paramsSerializer } from '../../../../utility/helpers';
import { ERROR_MESSAGE } from '../../../constValue';
import {
  bulkActionCandidatePayload,
  bulkDownloadActionCandidatePayload,
  candidateViewPayload,
  CheckoutPayload,
  parsedTextUnlockPayload,
  SessionIdPayload,
  TalentSourcingSearchPayload,
  UnlockCandidatesPayload,
} from '../../talentSourcingTypes';

export const talentSourcingMiddleWare = createAsyncThunk(
  TALENT_SOUCRCING,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(sourcingApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError);
    }
  },
);

export const talentSourcingsessionIdMiddleWare = createAsyncThunk(
  TALENT_UNLOCK_CANDIDATE,
  async ({ session_id }: SessionIdPayload, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(sessionIdApi, {
        params: {
          session_id,
        },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const talentSourcingSearchMiddleWare = createAsyncThunk(
  TALENT_SOUCRCING_SEARCH,
  async (
    { location, keywords, radius, lastActive }: TalentSourcingSearchPayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = (await axios.get(sourcingSearch, {
        params: {
          last_active: lastActive,
          location,
          keywords,
          radius,
        },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const unlockCandidateMiddleWare = createAsyncThunk(
  TALENT_UNLOCK_CANDIDATE,
  async ({ key }: UnlockCandidatesPayload, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(unlockCandidatesApi, {
        params: { key },
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const bulkActionSourcingMiddleWare = createAsyncThunk(
  TALENT_BULK_ACTION_UNLOCK,
  async (
    { candi_list, unlock }: bulkActionCandidatePayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = (await axios.get(bulkActionSourcingApi, {
        params: { candi_list, unlock },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const bulkDownloadActionMiddleWare = createAsyncThunk(
  TALENT_BULK_ACTION_DOWNLOAD,
  async (
    { candi_list, download }: bulkDownloadActionCandidatePayload,
    { rejectWithValue },
  ) => {
    try {
      const { data } = (await axios.get(bulkDownloadActionApi, {
        params: {
          candi_list,
          download,
        },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const parsedTextMiddleWare = createAsyncThunk(
  TALEN_PARSED_TEXT_UNLOCK,
  async ({ unlock_can_list }: parsedTextUnlockPayload, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(parsedSourcingApi, {
        params: { unlock_can_list },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const candidateViewMiddleWare = createAsyncThunk(
  TALEN_CANDIDATE_VIEW,
  async ({ key }: candidateViewPayload, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(candidateViewApi, {
        params: { key },
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const stripeMiddleWare = createAsyncThunk(
  STRIPE_ACTION,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(stripeApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError);
    }
  },
);

export const createCheckoutMiddleWare = createAsyncThunk(
  CHECKOUT_ACTION,
  async ({ can_count, amount }: CheckoutPayload, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(createCheckoutApi, {
        params: { candicates: can_count, amount },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);

export const paymentCanceledMiddleWare = createAsyncThunk(
  TALENT_UNLOCK_CANDIDATE,
  async ({ cancelled }: { cancelled: string }, { rejectWithValue }) => {
    try {
      const { data } = (await axios.get(paymentSourcingApi, {
        params: { cancelled },
        paramsSerializer,
      })) as any;
      return data;
    } catch (error) {
      const typedError = error as Error;
      Toast(ERROR_MESSAGE, 'LONG', 'error');
      return rejectWithValue(typedError.message);
    }
  },
);
