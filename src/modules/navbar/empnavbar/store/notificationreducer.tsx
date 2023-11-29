import { createSlice } from '@reduxjs/toolkit';
import { NotificationReducerState, SubsriptionReducerState } from '../navbarTypes';
import { SubsriptionMiddleWare, notificationMiddleWare } from './navbarmiddleware';

const NotificationState: NotificationReducerState = {
  isLoading: false,
  error: '',
  success: false,
  total: 0,
  total_unread: 0
};

const notificationReducer = createSlice({
  name: 'navbar',
  initialState: NotificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(notificationMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(notificationMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.total = action.payload.total;
      state.today = action.payload.today;
      state.yesterday = action.payload.yesterday;
      state.others = action.payload.others;
      state.total_unread = action.payload.total_unread;
    });
    builder.addCase(notificationMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});
const SubscriptionState: SubsriptionReducerState = {
  isLoading: false,
  error: '',
  success: false,
  current_plan: 0,
  current_jd_count: 0,
  current_resume_count: 0,
  total_plan: [{
    plan_id: 0,
    plan_name: '',
    subscription_value_days: 0,
    price: 0,
    currency: '',
    stripe_id: 0,
    is_active: true,
    created_at: '',
    inactived_date: '',
    updated_by: '',
    jd_count: 0,
    resume_count: 0,
  }],
  add_on_plans:[]
};

const SubscriptionReducer = createSlice({
  name: 'navbar',
  initialState: SubscriptionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SubsriptionMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(SubsriptionMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.success;
      state.current_plan = action.payload.current_plan;
      state.current_jd_count = action.payload.current_jd_count;
      state.current_resume_count = action.payload.current_resume_count;
      state.total_plan = action.payload.total_plan;
      state.add_on_plans = action.payload.add_on_plans; 
     });
    builder.addCase(SubsriptionMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === 'string') {
        state.error = action.payload;
      }
    });
  },
});

export const notificationReducers = notificationReducer.reducer;
export const SubscriptionReducers = SubscriptionReducer.reducer;