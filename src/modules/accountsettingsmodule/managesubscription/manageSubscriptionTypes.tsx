export interface ManageSubscription {
  subscription?: Subscription;
  sub_id: number;
  downgrade: number;
  basic_month: string;
  basic_year: string;
  free_expired: number;
  permission?: string[];
  expire_in: number;
  invites: number;
  total_user: number;
  user_count: number;
  setting?: SettingEntity[];
  pro_year: string;
  pro_month: string;
  price: number;
  CustomerId: number;
  available: number;
  base_price:number
}

export interface Subscription {
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
export interface SettingEntity {
  id: number;
  recruiter_id_id: number;
  page_font: string;
  header_font_size: number;
  header_color: string;
  menu_1: string;
  menu_1_url: string;
  menu_2: string;
  menu_2_url: string;
  menu_3: string;
  menu_3_url: string;
  page_font_size: number;
  banner_img: string;
  banner_header_text: string;
  banner_text: string;
  banner_font_size: number;
  banner_heading_size: number;
  about_us: string;
  button_color: string;
  footer_color: string;
  updated_by: string;
  career_page_url: string;
}

export interface ManageSubscriptionReducerState extends ManageSubscription {
  isLoading: boolean;
  error: string;
}
