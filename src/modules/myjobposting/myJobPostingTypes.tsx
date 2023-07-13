export interface MyJobPosing {
  location_list?: string[];
  job_title?: string[];
  job_ids?: string[];
}

export interface MyJobPosingData {
  final_list: FinalListEntity[];
  career_page_url: string;
  len_list: number;
  Jobs_List: number | string;
  params: string;
  domain: string;
  location?: LocationEntity[];
  zita_count?: number[];
}
export interface FinalListEntity {
  id: number;
  job_posted_on: string;
  job_reposted_on?: null;
  user_id_id: number;
  job_title: string;
  job_id: string;
  visa_sponsor: boolean;
  company_name: string;
  company_website: string;
  no_of_vacancies: number;
  company_logo: string;
  job_role_id: number;
  org_info?: null;
  min_exp: number;
  max_exp: number;
  is_ds_role: boolean;
  is_eeo_comp?: null;
  work_remote: boolean;
  role_res: string;
  job_description: string;
  richtext_job_description: string;
  tech_req: string;
  non_tech_req: string;
  updated_by: string;
  industry_type_id: number;
  add_info?: null;
  salary_min: number;
  salary_max: number;
  salary_curr_type_id: number;
  show_sal_to_candidate: boolean;
  job_type_id: number;
  jd_status__label_name: string;
  created_on: string;
  applicants?: string;
  hired?: string;
  rejected?: string;
  shortlisted?: string;
  location_jd: string;
  views?: string;
  invite_to_apply?: string;
  interested?: string;
  plan?: string;
  plan_id?: string;
  available_days?: number;
  location: string;
  profile_match: string;
  job_posted_on_date: string;
  zita_match?: number;
  jd_status_id?: number;
}
export interface LocationEntity {
  id: number;
  jd_id_id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  lat?: null;
  lng?: null;
  location?: null;
  countries: string;
  states: string;
  cities: string;
  loc: string;
}

export interface myJobPosingState extends MyJobPosing {
  isLoading: boolean;
  error: string;
}

export interface MyJobPosingDataReducerState extends MyJobPosingData {
  isLoading: boolean;
  error: string;
}

export interface MyJobPostingPayload {
  jobId?: string;
  postedOn?: string;
  jobType?: string;
  location?: string;
  page?: number;
  jobTitle?: string;
}
