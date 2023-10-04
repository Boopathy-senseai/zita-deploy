export interface DashBoardEmp {
  company_name: string;
  total_jobs: number;
  jobs_last_update: string;
  applicants_last_update: string;
  viewed_last_update: string;
  outlook?: any;
  google?: any;
  logo: string;
  job_count?: any;
  user_info: UserInfo;
  contact_count: number;
  candidate_count?: any;
  rejected_last_update: string;
  invite_to_apply_last_update: string;
  shortlisted_last_update: string;
  selected_last_update: string;
  applicants: number;
  shortlisted: number;
  selected: number;
  viewed: number;
  plan: Plan;
  rejected: number;
  invite_to_apply: number;
  jd_metrics: JdMetricsEntity[];
  career_page_url: string;
  Resume_parsing_count:number;
}
export interface UserInfo {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}
export interface Plan {
  subscription_id: number;
  client_id_id: number;
  plan_id_id: number;
  subscription_start_ts: string;
  subscription_valid_till: string;
  subscription_end_ts: string;
  subscription_changed_date: string;
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
export interface JdMetricsEntity {
  id: number;
  job_id: string;
  job_title: string;
}

export interface DashBoardEmpReducerState extends DashBoardEmp {
  isLoading: boolean;
  error: string;
}

export interface DashBoardMessage {
  message: MessageEntity[];
  message_count: number;
}
export interface MessageEntity {
  id: number;
  sender_id: number;
  receiver_id: number;
  jd_id_id?: number;
  text: string;
  is_read?: boolean;
  date_created: string;
  first_name: string;
  last_name: string;
  jd?: number;
  message?: string;
  time?: string;
  profile_pic: string;
  can_id: number;
  can_source: string;
}

export interface DashBoardMessageReducerState extends DashBoardMessage {
  isLoading: boolean;
  error: string;
}

export interface JdMetrics {
  role_base?: EntityOrRoleBaseEntityEntity[][];
  posted_date: string;
  dates_length?: any[];
  zita_match: number;
  posted_channel: number;
  total_count: TotalCount;
  job_details?: JobDetails;
  perc_dict?: any[];
  pipeline?: PipelineEntity[];
  my_database?: MyDatabaseEntity[];
  job_count?: any[];
}
export interface EntityOrRoleBaseEntityEntity {
  label: string;
  y: number;
}
export interface TotalCount {
  count__sum?: any;
}
export interface JobDetails {
  id: number;
  job_posted_on: string;
  job_reposted_on?: any;
  user_id_id: number;
  job_title: string;
  job_id: string;
  visa_sponsor: boolean;
  company_name: string;
  company_website: string;
  no_of_vacancies: number;
  company_logo: string;
  job_role_id: number;
  org_info?: any;
  min_exp: number;
  max_exp?: any;
  is_ds_role: boolean;
  is_eeo_comp?: any;
  work_remote: boolean;
  role_res: string;
  job_description: string;
  richtext_job_description: string;
  tech_req: string;
  non_tech_req: string;
  updated_by: string;
  industry_type_id: number;
  add_info?: any;
  salary_min: number;
  salary_max: number;
  salary_curr_type_id: number;
  show_sal_to_candidate: boolean;
  job_type_id: number;
  jd_status_id: number;
  created_on: string;
  country: string;
  state: string;
  city: string;
}
export interface PipelineEntity {
  Views?: any;
  Applicants?: number;
  Shortlisted?: number;
  Qualified?: number;
  Disqualified?: number;
}
export interface MyDatabaseEntity {
  'Zita Match'?: number;
  'Invited to Apply'?: number;
  'Applicant Conversion'?: number;
}

export interface JdMetricsReducerState extends JdMetrics {
  isLoading: boolean;
  error: string;
}

export interface DashboardCalender {
  events: EventsEntity[];
}
export interface EventsEntity {
  id: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  user_id: number;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  created_by: string;
  web_url: string;
  attendees: string;
}

export interface DashboardCalenderReducerState extends DashboardCalender {
  isLoading: boolean;
  error: string;
}
