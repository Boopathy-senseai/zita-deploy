import { createSlice } from '@reduxjs/toolkit';
import { OrderSummaryReducerState } from '../orderSummaryTypes';
import { orderSummaryMiddleWare } from './ordersummarymiddleware';

const buildCareerState: OrderSummaryReducerState = {
  isLoading: false,
  error: '',
  plan: {
    plan_id: 0,
    plan_name: '',
    subscription_value_days: 0,
    price: 0,
    currency: '',
    stripe_id: '',
    is_active: false,
    created_at: '',
    updated_by: '',
  },
  un_used: 0,
  count: '',
  final: '',
  available_balance: 0,
  total_discount_amounts: 0,
  local_sub: {
    subscription_id: 0,
    client_id_id: 0,
    plan_id_id: 0,
    subscription_start_ts: '',
    subscription_valid_till: '',
    no_of_users: 0,
    subscription_remains_days: 0,
    auto_renewal: false,
    is_active: false,
    has_client_changed_subscription: false,
    updated_by: '',
    grace_period_days: 0,
    created_at: '',
  },
  date: '',
  stripe_balance: 0,
  // discount_added: false,
  update_user: 0,
  subtotal: 0,
  subscription_cus: {
    id: 0,
    user_id: 0,
    stripeCustomerId: '',
    stripeSubscriptionId: '',
  },
  new_price: 0,
};

const orderSummaryReducer = createSlice({
  name: 'subscription',
  initialState: buildCareerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderSummaryMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(orderSummaryMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plan = action.payload.plan;
      state.local_sub = action.payload.local_sub;
      state.subscription_cus = action.payload.subscription_cus;
      state.stripe_balance = action.payload.stripe_balance;
      state.total_discount_amounts = action.payload.total_discount_amounts;
      state.available_balance = action.payload.available_balance;
      state.new_price = action.payload.new_price;
      state.subtotal = action.payload.subtotal;
      state.discount_added = action.payload.discount_added;
      state.un_used = action.payload.un_used;
      state.count = action.payload.count;
      state.final = action.payload.final;
    });
    builder.addCase(orderSummaryMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const orderSummaryReducers = orderSummaryReducer.reducer;
