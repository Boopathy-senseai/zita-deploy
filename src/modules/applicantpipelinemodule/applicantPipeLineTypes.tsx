export interface ApplicantPipeLine {
  success: boolean;
  skill_list: SkillListEntity[];
  jd_id: string;
  job_details: JobDetailsEntity;
  permission?: string[];
  zita_match_count:number
}

export interface SkillListEntity {
  label: string;
  value: string;
}
export interface JobDetailsEntity {
  city: string;
  country: string;
  job_role__label_name: string;
  job_title: string;
  state: string;
  job_id: string;
}

export interface ApplicantPipeLineReducerState extends ApplicantPipeLine {
  isLoading: boolean;
  error: string;
}

export interface ApplicantPipeLinePayload {
  jd_id: string;
}
export interface ApplicantUpdateStatusPayload {
  jd_id: string;
  applicant_id: number;
  status: string;
}

export interface ApplicantData {
  jd_id: number;
  applicant: ApplicantEntity[];
  shortlisted: ShortlistedEntityOrRejectedEntity[];
  interviewed: InterviewedEntityOrSelectedEntity[];
  selected: InterviewedEntityOrSelectedEntity[];
  rejected: ShortlistedEntityOrRejectedEntity[];
  params: string;
  fav_id: boolean;
  google?: GoogleEntity[];
  outlook?: GoogleEntity[];
  total_applicants: number;
}
export interface GoogleEntity {
  id: number;
  client_id_id: number;
  email: string;
  json_path: string;
  created_at: string;
}
export interface ApplicantEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by?: null;
  source: string;
  fav?: null;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed: string;
  work_exp: number;
  match?: number | null;
  image: string;
  file: string;
}
export interface ShortlistedEntityOrRejectedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by: string;
  source: string;
  fav?: null;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed?: null;
  work_exp: number;
  match: number;
  image: string;
  file: string;
}
export interface InterviewedEntityOrSelectedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by: string;
  source: string;
  fav?: null;
  name: string;
  email: string;
  qualification: string;
  skills: string;
  event?: null;
  location: string;
  viewed: string;
  work_exp: number;
  match: number;
  image: string;
  file: string;
}

export interface ApplicantDataReducerState extends ApplicantData {
  isLoading: boolean;
  error: string;
}

export interface ApplicantFilter {
  jd_id: string;
  profile_match?: string;
  candidate?: string;
  work_experience?: string;
  profile_view?: string;
  education_level?: any;
  skill_match?: any;
  fav?: string;
  sortApplicant?: string;
  sortSortList?: string;
  sortInterview?: string;
  sortSelected?: string;
  sortRejected?: string;
}

export interface ApplicantUpdateReducerState {
  isLoading: boolean;
  error: string;
}
