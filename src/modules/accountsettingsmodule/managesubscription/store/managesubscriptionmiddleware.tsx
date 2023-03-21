import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  billingPortalApi,
  cancelSubscriptionApi,
  manageSubscriptionApi,
  renewSubscriptionApi,
} from '../../../../routes/apiRoutes';
import Toast from '../../../../uikit/Toast/Toast';
import { paramsSerializer } from '../../../../utility/helpers';
import { ERROR_MESSAGE } from '../../../constValue';

export const manageSubscriptionMiddleWare = createAsyncThunk(
  'manage_subscription',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(manageSubscriptionApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
export const createCheckoutSubscriptionMiddleWare = createAsyncThunk(
  'create_subscription_session',
  async (
    {
      plan,
      plan_name,
      count,
    }: { plan: string; plan_name: string; count: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = (await axios.get('create_subscription_session', {
        params: { plan, plan_name, count },
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

export const billingPortalMiddleWare = createAsyncThunk(
  'billingPortal',
  async (
    { order_summary }: { order_summary?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(billingPortalApi, {
        params: {order_summary},
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const cancelSubscriptionMiddleWare = createAsyncThunk(
  'cancelSubscription',
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(cancelSubscriptionApi);
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const renewSubscriptionMiddleWare = createAsyncThunk(
  'renewSubscription',
  async ({ key }: { key: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(renewSubscriptionApi, {
        params: {
          key,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
