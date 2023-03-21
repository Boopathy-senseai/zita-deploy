export interface OrderSummary {
  plan: Plan;
  un_used: number;
  count: string;
  final: string;
  available_balance: number;
  total_discount_amounts: number;
  local_sub: LocalSub;
  date: string;
  tax_list?: any[];
  stripe_balance: number;
  permission?: string[];
  discount_added?: any;
  update_user: number;
  subtotal: number;
  subscription_cus: SubscriptionCus;
  new_price: number;
}
export interface Plan {
  plan_id: number;
  plan_name: string;
  subscription_value_days: number;
  price: number;
  currency: string;
  stripe_id: string;
  is_active: boolean;
  created_at: string;
  inactived_date?: any;
  updated_by: string;
}
export interface LocalSub {
  subscription_id: number;
  client_id_id: number;
  plan_id_id: number;
  subscription_start_ts: string;
  subscription_valid_till: string;
  subscription_end_ts?: any;
  subscription_changed_date?: any;
  subscription_changed_to?: any;
  no_of_users: number;
  subscription_remains_days: number;
  auto_renewal: boolean;
  is_active: boolean;
  has_client_changed_subscription: boolean;
  updated_by: string;
  grace_period_days: number;
  created_at: string;
}
export interface SubscriptionCus {
  id: number;
  user_id: number;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
}

export interface OrderSummaryReducerState extends OrderSummary {
  isLoading: boolean;
  error: string;
}
