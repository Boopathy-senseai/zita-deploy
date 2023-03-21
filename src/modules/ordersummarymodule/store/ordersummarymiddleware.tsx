import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendProcessApi, creditsPurchaseApi, orderSummaryApi } from '../../../routes/apiRoutes';
const qs = require('qs');

export const orderSummaryMiddleWare = createAsyncThunk(
  'orderSummary',
  async (
    {
      key,
      count,
      discounts,
    }: { key: string; count: string; discounts?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.get(orderSummaryApi, {
        params: {
          key,
          c: count,
          discounts,
        },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const orderSummaryPostMiddleWare = createAsyncThunk(
  'orderSummaryPost',
  async (
    {
      update,
      discounts,
      key,
      count,
    }: { update?: string; discounts?: string; key?: string; count?: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(
        orderSummaryApi,
        qs.stringify(
          { update, discounts, key, c: count },
          { arrayFormat: 'comma' },
        ),
      );
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const backendProcessMiddleWare = createAsyncThunk(
  'backendProcess',
  async ({ session_id }: { session_id?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(backendProcessApi, {
        params: { session_id },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);

export const creditsPurchaseMiddleWare = createAsyncThunk(
  'creditsPurchaseApi',
  async ({ session }: { session?: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(creditsPurchaseApi, {
        params: { session },
      });
      return data;
    } catch (error) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  },
);
