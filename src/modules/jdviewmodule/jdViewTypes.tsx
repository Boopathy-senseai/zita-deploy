export interface JdView {
  jd: Jd;
  has_external_posting: boolean;
  available_jobs?: any;
  location: LocationEntity;
  skills?: SkillsEntity[];
  ext_jobs?: any[];
  career_page_url: string;
  qualification?: QualificationEntity[];
  recommended_role: string;
  profile?: Profile;
  dates: number;
  applicants_line?: ApplicantsLine[];
  job_view_line?: JobViewLine[];
  int_list: IntList;
  company_detail?: CompanyDetail;
}
export interface Jd {
  industry_type__label_name: string;
  id: number;
  is_ds_role: boolean;
  jd_status__label_name: string;
  job_id: string;
  job_posted_on: string;
  job_role__label_name: string;
  job_title: string;
  job_type__label_name: string;
  no_of_vacancies: number;
  richtext_job_description: string;
  salary_curr_type__label_name: string;
  salary_max: number;
  salary_min: number;
  show_sal_to_candidate: boolean;
  work_remote: boolean;
  min_exp: number;
  max_exp: number;
  is_eeo_comp: boolean;
}
export interface LocationEntity {
  country__name: string;
  state__name: string;
  city__name: string;
}
export interface SkillsEntity {
  id: number;
  jd_id_id: number;
  category_id: number;
  skill: string;
  experience: string;
}
export interface QualificationEntity {
  id: number;
  jd_id_id: number;
  qualification: string;
  specialization: string;
}
export interface ApplicantsLine {
  y: number;
  label: string;
}
export interface JobViewLine {
  y: number;
  label: string;
}
export interface Profile {
  id: number;
  jd_id_id: number;
  user_id_id: number;
  business_intelligence: string;
  data_analysis: string;
  data_engineering: string;
  devops: string;
  machine_learning: string;
  others: string;
  recommended_role_id: number;
  dst_or_not: string;
  role_acceptence: boolean;
  updated_at: string;
}
export interface RoleBaseEntityEntity {
  label: string | number | string | number;
  y: number;
}
export interface IntList {
  posted_at: string;
  reposted_on: string;
  jd_status: string;
  active_for: number;
  zita_match: number;
  applicants: number;
  views: number;
  interviewed: number;
  screened: number;
  offered: number;
  shortlisted: number;
  onboard: number;
  invite: number;
  rejected: number;
}
export interface CompanyDetail {
  id: number;
  recruiter_id_id: number;
  company_name: string;
  company_website?: null;
  email: string;
  contact: string;
  industry_type_id?: null;
  no_of_emp?: null;
  address?: null;
  country_id?: null;
  state_id?: null;
  city_id?: null;
  zipcode?: null;
  updated_by?: null;
  logo: string;
  created_at: string;
}

export interface jdViewReducerState extends JdView {
  isLoading: boolean;
  error: string;
}

export interface Download {
  file_path: string;
}

export interface Inactive {
  success: boolean;
}
export interface JdInactiveReducerState extends Inactive {
  isLoading: boolean;
  error: string;
}

export interface JdDownloadReducerState extends Download {
  isLoading: boolean;
  error: string;
}
