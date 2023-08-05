export interface ZitaMatchData {
  data: DataEntity[];
  jd_id: string;
  total_count: number;
  fav_id: boolean;
  user_type: string;
  params: string;
}

export interface DataEntity {
  [key: string]: any;
  id: number;
  can_source_id: number;
  client_id_id: number;
  candidate_id_id?: number | null;
  job_type_id?: number | null;
  first_name: string;
  last_name?: string | null;
  email: string;
  contact?: string | null;
  linkedin_url?: string | null;
  work_exp: string;
  relocate?: boolean | null;
  qualification: string;
  exp_salary?: string | null;
  job_title?: string | null;
  candi_ref_id?: string | null;
  skills: string;
  location: string;
  updated_on: string;
  created_at: string;
  updated_by?: string | null;
  fav?: null;
  applicant?: string | null;
  match: number;
  image?: string | null;
  invite?: string;
  applicant_view?: string | null;
  interested?: boolean;
}

export interface ZitaMatchPayload {
  jd_id?: string;
  profile_match?: string;
  fav?: string;
  candidate?: string;
  location?:string;
  work_experience?: string;
  relocate?: string;
  invite?: string;
  profile_view?: string;
  education_level?: string;
  type_of_job?: string;
  preferred_location?: string;
  skill_match?: string;
  page?: number;
}
export interface ZitaMatchDataCandidateReducerState extends ZitaMatchData {
  isLoading: boolean;
  error: string;
}

export interface ZitaMatch {
  success: boolean;
  skill_list: SkillListEntity[];
  jd_id: string;
  job_details: JobDetails;
  applicants_count:number
}
export interface SkillListEntity {
  label: string;
  value: string;
}
export interface JobDetails {
  city: string;
  country: string;
  job_title: string;
  state: string;
  job_id: string;
  profile: string;
}

export interface ZitaMatchReducerState extends ZitaMatch {
  isLoading: boolean;
  error: string;
}
