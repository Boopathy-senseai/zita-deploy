export interface Notification {
  success: boolean;
  today?: OthersEntity[];
  yesterday?: OthersEntity[];
  others?: OthersEntity[];
  total: number;
  total_unread: number;
}

export interface OthersEntity {
  id: number;
  level: string;
  recipient_id: number;
  unread: boolean;
  actor_content_type_id: number;
  actor_object_id: string;
  verb: string;
  description?: any;
  target_content_type_id?: any;
  target_object_id?: any;
  action_object_content_type_id?: any;
  action_object_object_id?: any;
  timestamp: string;
  public: boolean;
  deleted: boolean;
  emailed: boolean;
  data?: any;
}

export interface NotificationReducerState extends Notification {
  isLoading: boolean;
  error: string;
}

export interface SubsriptionReducerState {
  isLoading: boolean;
  error: string;
  success: boolean;
  current_plan: number;
  current_jd_count: number;
  current_resume_count: number;
  total_plan:Subscription[];
  add_on_plans:addon[]; 
}

export interface Subscription {
  plan_id?: number;
  plan_name?: any;
  subscription_value_days?: number;
  price?: number;
  currency?: any;
  stripe_id?: any;
  is_active?: true,
  created_at?: any;
  inactived_date?: any;
  updated_by?: any;
  jd_count?: any;
  resume_count?: any;
}

export interface addon{
  addon_id__id?: number,
  addon_id__name?: string,
  addon_id__currency?: string,
  price?: number,
  value?: number,
  carry_forward?: boolean,
  plan_id?: number
}