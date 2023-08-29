export interface MyDataBase {
  success: boolean;
  job_title: JobTitleEntity[];
  permission?: string[];
  skill_list: SkillListEntity[];
  candidate_available: number;
}
export interface JobTitleEntity {
  job_title: string;
  id: number;
}
export interface SkillListEntity {
  label: string;
  value: string;
}

export interface MyDataBaseReducerState extends MyDataBase {
  isLoading: boolean;
  error: string;
}

export interface MyDataBaseData {
  data: DataEntity[];
  jd: string | boolean;
  fav_id: boolean;
  user_type: string;
  params: string;
  search: boolean;
  total_count: number;
}

export interface DataEntity {
  id: number;
  can_source_id: number;
  client_id_id: number;
  candidate_id_id?: number;
  job_type_id?: number;
  first_name: string;
  last_name?: string;
  email: string;
  contact: string;
  linkedin_url?: string;
  work_exp: string;
  relocate?: boolean;
  qualification: string;
  exp_salary?: string;
  job_title?: null;
  candi_ref_id?: null;
  skills: string;
  location: string;
  updated_on: string;
  created_at: string;
  updated_by?: string;
  applicant_view?: string;
  image: string;
  match: string;
  interested: boolean;
  not_interested:boolean;
  applicant: string;
  invite: string;
  jd_id_id:number;
  fav: number;
}

export interface MyDataBaseDataReducerState extends MyDataBaseData {
  isLoading: boolean;
  error: string;
}

export interface MyDataBasePayload {
  jobTitle?: string;
  fav?: string;
  experience?: string;
  educationLevel?: string;
  typeofJob?: string;
  location?: string;
  skill_match?: any;
  relocate?: string;
  candidate?: string;
  userType?: string;
  sort?: string;
  page?: number;
  applicant_only?: string;
}
