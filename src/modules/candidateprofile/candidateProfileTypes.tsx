import { AnySchema } from 'yup';

export interface CandidateProfileEdit {
  obj?: Obj;
  additional_detail?: AdditionalDetailEntity;
  personal?: Personal;
  industry_type?: string;
  jd_id?: any;
  user_info?: UserInfo;
  email?: number;
  till_date?: number;
  personal_obj?: Personal;
}
export interface AdditionalDetailEntity {
  application_id_id: number;
  id: number;
  total_exp_month: number;
  total_exp_year: number;
  updated_at: string;
}
export interface Obj {
  profile_url: string;
  full_name: string;
  email: string;
  phone_no: number;
  linkedin_url: string;
  repo: string;
  summary: string;
  projects?: AnySchema[];
  exp?: ExpEntity[];
  edu?: EduEntity[];
  skills?: string[];
  skill_id: SkillId;
  soft_skills: any[];
  certi?: AnySchema[];
  ac_projects?: AnySchema[];
  proj_list?: ProjListEntity[];
  contribs?: AnySchema[];
  internships?: InternshipsEntity[];
}
export interface ExpEntity {
  exp_id: number;
  org: string;
  des: string;
  loc: string;
  from_exp: string;
  domain: string;
  to_exp: string;
  roles?: string[];
  exp_tools: string;
  is_present: number;
  projects?: ProjectsEntity[];
}
export interface ProjectsEntity {
  org: string;
  project_name: string;
  client: string;
  desc: string;
  responsibilities?: string[];
  role: string;
  dur: string;
  domain: string;
  loc: string;
  skills?: string[];
}
export interface EduEntity {
  edu_id: number;
  title_spec: string;
  inst_name: string;
  inst_loc: string;
  qual_title: string;
  percentage: string;
  year: string;
}
export interface SkillId {
  id: number;
}
export interface ProjListEntity {
  org: string;
  pro_id: number;
  project_name: string;
  client: string;
  desc: string;
  responsibilities?: string[];
  role: string;
  dur: string;
  domain: string;
  loc: string;
  skills?: string[];
}
export interface InternshipsEntity {
  fre_id: number;
  org: string;
  project_name: string;
  client: string;
  desc?: string[];
  role: string;
  dur: string;
  domain: string;
  loc: string;
  tools: string;
}
export interface Personal {
  application_id: number;
  user_id_id: number;
  firstname: string;
  lastname: string;
  email: string;
  contact_no: number;
  country_id: number;
  state_id: number;
  city_id: number;
  zipcode: string;
  Date_of_birth: number;
  linkedin_url: string;
  career_summary: string;
  gender_id: number;
  updated_at: string;
  code_repo: string;
  visa_sponsorship: boolean;
  remote_work: boolean;
  type_of_job_id: number;
  available_to_start_id: number;
  industry_type_id: number;
  desired_shift_id?: AnySchema;
  curr_gross: string;
  current_currency: string;
  exp_gross: number;
  salary_negotiable: boolean;
  current_country_id: number;
  current_state_id: number;
  current_city_id: number;
  current1_country: string;
  current2_country: string;
  current3_country: string;
  relocate: boolean;
  current_city__name: string;
  current_country__name: string;
  current_state__name: string;
  gender__label_name: string;
  type_of_job__label_name: string;
  available_to_start__label_name: string;
  industry_type__label_name: string;
  city__name: string;
  state__name: string;
  country__name: string;
}
export interface UserInfo {
  user_info_id: number;
  user_id_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  applicant_status_id?: AnySchema;
  application_status: number;
  password: string;
  active: boolean;
  employer_id: number;
  is_backend_match: boolean;
  application_id_id: number;
  selected_role_id?: AnySchema;
  ds_profile_id?: AnySchema;
  val_status_2recruiter: boolean;
  rdset_template_id?: AnySchema;
  updated_at: string;
}

export interface CandidateProfileEditReducerState extends CandidateProfileEdit {
  isLoading: boolean;
  error: string;
}

export interface UpdateJobPreferencePayload {
  curr_gross: string;
  current_currency: string;
  exp_gross: string;
  type_of_job: string;
  available_to_start: string;
  industry_type: string;
  current_country: string;
  current_state: string;
  current_city: string;
  relocate: string;
}

export interface TechSkill {
  skills?: Skills;
  skills_list: SkillsListEntity[];
}
export interface Skills {
  id: number;
  application_id_id: number;
  soft_skill: string;
  tech_skill: string;
  updated_at: string;
}
export interface SkillsListEntity {
  label: string;
  value: string;
}

export interface TechSkillReducerState extends TechSkill {
  isLoading: boolean;
  error: string;
}

export interface EducationUpdatePayload {
  qual_title: string;
  qual_spec: string;
  institute_name: string;
  institute_location: string;
  year_completed: string;
  percentage: string;
  eduId:string
}
