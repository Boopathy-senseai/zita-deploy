export interface CandidateDashBoard {
  applied_job?: AppliedJobEntity[];
  invites?: InvitesEntity[];
  message_count: boolean;
  chatname: string;
  company_detail?: CompanyDetail;
  setting?: Setting;
  user_info?: UserInfo;
  profile:string
}
export interface AppliedJobEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by?: string;
  source: string;
  country: string;
  state: string;
  city: string;
  invited?: number;
  job_title: string;
  count: number;
  status:string;
  job_status?:string
}
export interface InvitesEntity {
  id: number;
  client_id_id: number;
  jd_id_id: number;
  candidate_id_id: number;
  is_interested?: boolean;
  updated_by?: null;
  created_at: string;
  responded_date?: string;
  applied?: number;
  country: string;
  state: string;
  city: string;
  job_title: string;
  count: number;
  job_status?:string
}
export interface CompanyDetail {
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
}
export interface Setting {
  id: number;
  recruiter_id_id: number;
  page_font: string;
  header_font_size: number;
  header_color: string;
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
  banner_heading_size: number;
  about_us: string;
  button_color: string;
  footer_color: string;
  updated_by: string;
  career_page_url: string;
}

export interface UserInfo {
  user_info_id: number;
  user_id_id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  applicant_status_id?: null;
  application_status: number;
  password: string;
  active: boolean;
  employer_id: number;
  is_backend_match: boolean;
  application_id_id: number;
  selected_role_id?: null;
  ds_profile_id?: null;
  val_status_2recruiter: boolean;
  rdset_template_id?: null;
  updated_at: string;
  last_login:string
}

export interface CandidateDashBoardReducerState extends CandidateDashBoard {
  isLoading: boolean;
  error: string;
}
