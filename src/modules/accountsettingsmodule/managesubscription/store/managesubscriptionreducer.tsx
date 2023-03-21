import { createSlice } from '@reduxjs/toolkit';
import { ManageSubscriptionReducerState } from '../manageSubscriptionTypes';
import { manageSubscriptionMiddleWare } from './managesubscriptionmiddleware';

const buildCareerState: ManageSubscriptionReducerState = {
  isLoading: false,
  error: '',
  sub_id: 0,
  downgrade: 0,
  basic_month: '',
  basic_year: '',
  free_expired: 0,
  expire_in: 0,
  invites: 0,
  total_user: 0,
  user_count: 0,
  pro_year: '',
  pro_month: '',
  price: 0,
  CustomerId: 0,
  available: 0,
  base_price:0
};

const manageSubscriptionReducer = createSlice({
  name: 'subscription',
  initialState: buildCareerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(manageSubscriptionMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(manageSubscriptionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sub_id = action.payload.sub_id;
      state.CustomerId = action.payload.CustomerId;
      state.available = action.payload.available;
      state.basic_month = action.payload.basic_month;
      state.basic_year = action.payload.basic_year;
      state.downgrade = action.payload.downgrade;
      state.error = action.payload.error;
      state.expire_in = action.payload.expire_in;
      state.free_expired = action.payload.free_expired;
      state.invites = action.payload.invites;
      state.price = action.payload.price;
      state.pro_month = action.payload.pro_month;
      state.pro_year = action.payload.pro_year;
      state.subscription = action.payload.subscription;
      state.total_user = action.payload.total_user;
      state.user_count = action.payload.user_count;
      state.base_price = action.payload.base_price;
    });
    builder.addCase(manageSubscriptionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const manageSubscriptionReducers = manageSubscriptionReducer.reducer;
