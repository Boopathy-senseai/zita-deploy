export interface TalentSourcing {
  show_pop: number;
  source_limit: number;
  permission?: string[];
  location?: string[];
}

export interface TalentSourcingReducerState extends TalentSourcing {
  isLoading: boolean;
  error: string;
}

export interface TalentSourcingSearchPayload {
  location: string;
  keywords: string;
  radius: string;
  lastActive: string;
}

export interface TalentSourcingSearch {
  data: DataEntity[];
  source_limit: number;
  candi_limit: number;
  plan?: PlanEntity[];
  permission?: string[];
  candi_list?: string[];
}
export interface DataEntity {
  [key: string]: any;
  first_name: string;
  updated_on: string;
  created_on: string;
  relocate: string;
  min_salary: string | number;
  max_salary: string | number;
  skills?: string[];
  desired_job_title: string;
  latest_job_title: string;
  previous_job_titles?: string[];
  hometown: string;
  candidate_hash: string;
  unlock_url?: null;
  resume_summary?: string;
  education_level: string;
  work_experience: string;
  zip_code?: string;
  id: number;
  driving_license: string;
  unlock_status: string;
  candidate_status: string;
  source_id: number;
}
export interface PlanEntity {
  subscription_id: number;
  client_id_id: number;
  plan_id_id: number;
  subscription_start_ts: string;
  subscription_valid_till: string;
  subscription_end_ts?: null;
  subscription_changed_date: string;
  subscription_changed_to: number;
  no_of_users: number;
  subscription_remains_days: number;
  auto_renewal: boolean;
  is_active: boolean;
  has_client_changed_subscription: boolean;
  updated_by: string;
  grace_period_days: number;
  created_at: string;
}

export interface TalentSourcingSearchReducerState extends TalentSourcingSearch {
  isLoading: boolean;
  error: string;
}

export interface UnlockCandidates {
  success: boolean | string;
  unlock_can_list?: string[] | null;
  source_limit: number;
  candi_limit: string;
}

export interface UnlockCandidatesState extends UnlockCandidates {
  isLoading: boolean;
  error: string;
}
export interface UnlockCandidatesPayload {
  key: string;
}

export interface bulkActionCandidate {
  success: boolean | string;
  unlock_can_list?: string[] | null;
  source_limit: number;
  candi_limit: string;
}

export interface bulkActionCandidateState extends bulkActionCandidate {
  isLoading: boolean;
  error: string;
}
export interface bulkActionCandidatePayload {
  candi_list: string[];
  unlock: string;
}

export interface bulkDownloadActionCandidate {
  file_path: string;
}

export interface bulkDownloadActionCandidateState
  extends bulkDownloadActionCandidate {
  isLoading: boolean;
  error: string;
}
export interface bulkDownloadActionCandidatePayload {
  candi_list: string[];
  download: string;
}

export interface parsedTextUnlockPayload {
  unlock_can_list: string[];
}

export interface candidateViewPayload {
  key: string;
}

export interface CandidateView {
  file: string;
  permission?: string[];
  candidate_key: string;
  unlock_status: string;
}

export interface CandidateViewState extends CandidateView {
  isLoading: boolean;
  error: string;
}

export interface Stripe {
  publicKey: string;
}

export interface StripeState extends Stripe {
  isLoading: boolean;
  error: string;
}

export interface CheckoutPayload {
  can_count: string;
  amount: string;
  manage_sub?:string
}

export interface SessionIdPayload {
  session_id: string;
}
