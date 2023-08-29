export interface BuildYourCareer {
  success: any;
  career_page: CareerPageEntityEntity;
  career_page_exists: boolean;
  domain: string;
  permission?: string[];
  company_detail: CompanyDetail;
}
export interface CareerPageEntityEntity {
  id: number;
  recruiter_id_id: number;
  page_font: string;
  header_font_size: number;
  header_color: string;
  font_color: string;
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
  about_us: string;
  button_color: string;
  footer_color: string;
  updated_by: string;
  career_page_url: string;
  banner_heading_size: string;
}

export interface CompanyDetail {
  id: number;
  recruiter_id_id: number;
  company_name: string;
  company_website?: string;
  email: string;
  contact: string;
  industry_type_id?: string;
  no_of_emp?: string;
  address?: string;
  country_id?: string;
  state_id?: string;
  city_id?: string;
  zipcode?: string;
  updated_by?: string;
  logo: string;
  created_at: string;
}
export interface BuildYourCareerReducerState extends BuildYourCareer {
  isLoading: boolean;
  error: string;
}

export interface CareerPage {
  jd_form: JdFormEntity[];
  params?: string;
  total: number;
  career_page_setting: CareerPageSetting;
  company_detail: CompanyDetailEntity;
  jd_active: boolean;
  login_user:boolean;
  user_detail?:any;
  image:string
}

export interface JdFormEntity {
  id: number;
  job_posted_on: string;
  job_reposted_on?: string;
  user_id_id: number;
  job_title: string;
  job_id: string;
  visa_sponsor: boolean;
  company_name: string;
  company_website: string;
  no_of_vacancies: number;
  company_logo: string;
  job_role_id: number;
  org_info?: string;
  min_exp: number;
  max_exp?: number;
  is_ds_role: boolean;
  is_eeo_comp?: boolean;
  work_remote: boolean;
  role_res: string;
  job_description: string;
  richtext_job_description: string;
  tech_req: string;
  non_tech_req: string;
  updated_by?: string;
  industry_type_id: number;
  add_info?: string;
  salary_min?: number;
  salary_max?: number;
  salary_curr_type_id: number;
  show_sal_to_candidate: boolean;
  job_type_id: number;
  jd_status_id: number;
  created_on: string;
  country: string;
  state: string;
  city: string;
  job_location: string;
  job_type__label_name?: string;
}

export interface CareerPageReducerState extends CareerPage {
  isLoading: boolean;
  error: string;
}

export interface JobView {
  jd_form?: JdForm;
  education?: EducationEntity[];
  skills: SkillsEntity[];
  login_user: boolean;
  applicant_details?: any;
  questionnaire?: any[];
  additional_details?: any;
  company_detail: CompanyDetailEntity;
  setting: CareerPageSetting;
  emp_id: number;
  current_site: string;
  applied_status: number;
  apply_user: number;
  success: boolean;
  applicant_detail?:any;
  additional_detail?:any
}
export interface JdForm {
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
  max_exp: number;
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
  job_location: string;
  job_type__label_name: string;
  job_role__label_name:string;
  industry_type__label_name:string;
  salary_curr_type__value:string
}
export interface EducationEntity {
  id: number;
  jd_id_id: number;
  qualification: string;
  specialization: string;
}
export interface SkillsEntity {
  id: number;
  jd_id_id: number;
  category_id: number;
  skill: string;
  experience: string;
}
export interface CompanyDetailEntity {
  id: number;
  recruiter_id_id: number;
  company_name: string;
  company_website: string;
  email: string;
  contact: string;
  industry_type_id: number;
  no_of_emp: number;
  address: string;
  country_id: number;
  state_id: number;
  city_id: number;
  zipcode: string;
  updated_by: string;
  logo: string;
  created_at: string;
  city__name?: string;
  country__name?: string;
  state__name?: string;
}
export interface CareerPageSetting {
  id: number;
  recruiter_id_id: number;
  page_font: string;
  header_font_size: number;
  header_color: string;
  font_color: string;
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
  about_us: string;
  button_color: string;
  footer_color: string;
  updated_by: string;
  career_page_url: string;
  banner_heading_size: number;
}

export interface JobViewReducerState extends JobView {
  isLoading: boolean;
  error: string;
}

export interface JobPostPayload {
  Qualification: any;
  source: string;
  cover_letter: string;
  gender: string;
  hispanic_latino: string;
  veteran_status: string;
  disability_status: string;
  questionnaire: any;
  id:string;
}
