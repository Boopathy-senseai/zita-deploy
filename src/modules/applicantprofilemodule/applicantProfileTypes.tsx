export interface ApplicantProfile {
  applicant: boolean;
  success: boolean;
  candidate_details: CandidateDetailsEntity[];
  jd_id: string;
  can_id: string;
  course?: CourseEntity[];
  contrib?: ContribEntity[];
  chatname: string;
  skills: SkillsEntity[];
  education?: EducationEntity[];
  project: ProjectEntity[];
  questionnaire: QuestionnaireEntity[];
  ac_project: AcProjectEntity[];
  fresher: FresherEntity[];
  cover_letter: CoverLetterEntity[];
  total_exp: TotalExpEntity[];
  experience: ExperienceEntity[];
  status_id: any[];
  jd: JdEntity;
  personalInfo: PersonalInfoEntity[];
  source: string;
}
export interface mention{
  recruiter_id:number;
  recruiter_id__username:string;
  company_name:string;
}
export interface QuestionnaireEntity {
  answer: string;
  created_on: string;
  description: string;
  field_type_id: number;
  id: number;
  is_required: boolean;
  jd_id_id: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  question: string;
}

export interface PersonalInfoEntity {
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
  desired_shift_id?: null;
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
  type_of_job__label_name: string;
  available_to_start__label_name: string;
  industry_type__label_name: string;
  country__name: string;
  city__name?: string;
  state__name?: string;
}
export interface ProjectEntity {
  project_id: number;
  application_id_id: number;
  work_proj_name: string;
  work_proj_client: string;
  work_proj_describe: string;
  work_proj_desig: string;
  work_proj_role: string;
  work_proj_duration: string;
  work_proj_domain: string;
  work_proj_location: string;
  work_proj_skills: string;
  work_proj_type: boolean;
  work_proj_org_id_id: number;
  updated_at: string;
}
export interface FresherEntity {
  id: number;
  application_id_id: number;
  intern_org: string;
  intern_project: string;
  intern_client: string;
  intern_proj_describe: string;
  intern_role: string;
  intern_duration: string;
  intern_domain: string;
  intern_location: string;
  intern_tools_prg_lng: string;
  updated_at: string;
}
export interface AcProjectEntity {
  project_id: number;
  application_id_id: number;
  work_proj_name: string;
  work_proj_client: string;
  work_proj_describe: string;
  work_proj_desig: string;
  work_proj_role: string;
  work_proj_duration: string;
  work_proj_domain: string;
  work_proj_location: string;
  work_proj_skills: string;
  work_proj_type: boolean;
  work_proj_org_id_id: number;
  updated_at: string;
}
export interface ContribEntity {
  contributions_id: number;
  application_id_id: number;
  contrib_text: string;
  contrib_type_id: number;
  updated_at: string;
  contrib_type__label_name?: string;
}
export interface CourseEntity {
  id: number;
  application_id_id: number;
  certificate_name: string;
  certificate_year: string;
  certificate_by: string;
  updated_at: string;
}
export interface CandidateDetailsEntity {
  
  
  id: number;
  can_source_id: number;
  client_id_id: number;
  candidate_id_id: number;
  job_type_id?: null;
  first_name: string;
  last_name: string;
  email: string;
  contact: string;
  linkedin_url: string;
  work_exp: string;
  relocate: boolean;
  qualification: string;
  exp_salary?: string;
  job_title: string;
  candi_ref_id?: null;
  interested?: boolean;
  skills: string;
  location: string;
  updated_on: string;
  created_at: string;
  updated_by: string;
  code_repo:string;
  image: string;
  file: string;
  type_of_job__label_name: string;
  available_to_start__label_name: string;
  industry_type__label_name: string;
  created_on:string,
}

export interface SkillsEntity {
  id: number;
  application_id_id: number;
  soft_skill: string;
  tech_skill: string;
  updated_at: string;
}
export interface EducationEntity {
  edu_id: number;
  application_id_id: number;
  qual_title: string;
  qual_spec: string;
  institute_name: string;
  institute_location: string;
  year_completed: string;
  percentage: string;
  updated_at: string;
}
export interface CoverLetterEntity {
  id: number;
  candidate_id_id: number;
  jd_id_id: number;
  cover_letter: string;
  source: string;
  created_on: string;
}
export interface TotalExpEntity {
  id?: number;
  application_id_id?: number;
  total_exp_year: number;
  total_exp_month: number;
  updated_at?: string;
}
export interface ExperienceEntity {
  exp_id: number;
  application_id_id: number;
  organisations: string;
  org_domain?: null;
  designation: string;
  work_location: string;
  work_tools: string;
  work_role: string;
  from_exp: string;
  to_exp: string;
  is_present: boolean;
}
export interface JdEntity {
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
  work_remote: boolean;
  role_res: string;
  job_description: string;
  richtext_job_description: string;
  tech_req: string;
  non_tech_req: string;
  updated_by?: null;
  industry_type_id: number;
  add_info?: null;
  salary_min: number;
  salary_max: number;
  salary_curr_type_id: number;
  show_sal_to_candidate: boolean;
  job_type_id: number;
  jd_status_id: number;
  created_on: string;
}

export interface ApplicantProfileReducerState extends ApplicantProfile {
  ApplicantEntity: any;
  PersonalInfoEntity: any;
  isLoading: boolean;
  error: string;
}

export interface Match {
  success: boolean;
  matched_data: Data;
  overall_percentage:number;
  location_percent:number;
  skills_percent:number;
  qualification_percent:number;
  match: MatchEntity[];
  not_matched_data: Datas,
  source:overall;
}
export interface overall {
   jd_skills:[]
  qualification:[]
  jd_location:[]
}
export interface Data {
  matched_skills:[]
  matched_qualification:[]
  matched_location:[]
}
export interface Datas { 
  not_matched_skills:[]
  not_matched_qualification:[]
  not_matched_location:[]
}
export interface MatchEntity {
  id: number;
  candidate_id_id: number;
  jd_id_id: number;
  profile_match: number;
  created_at: string;
  
  // overall_percentage:number;
}

export interface MatchReducerState extends Match {
  isLoading: boolean;
  error: string;
}

export interface ApplicantProfilePayload {
  jd_id?: number | string;
  can_id?: number | string;
}
export interface candidatematchtypes {
  can_id?: number | string;
}
export interface Notes {
  id: number;
  client_id_id: number;
  jd_id_id?: null;
  candidate_id_id: number;
  notes: string;
  updated_by?:string;
  date_created?: string;
  created_at: string;
  emp_image:string;
  user: number;
}

export interface NotesReducerState {
  [x: string]: any;
  isLoading: boolean;
  error: string;
  notes: Notes[];
}

export interface MentionReducerState {
  isLoading: boolean;
  error: string;
  data:[
    {
     user:number,
     value:string,
     
   }
  ];
}
export interface AllMatch {
  match: MatchEntityOne[];
  applicant?: ApplicantEntity[];
}
export interface ApplicantEntity {
  candidate_id_id: number;
  client_id_id: number;
  created_on: string;
  fav: number;
  id: number;
  jd_id_id: number;
  match: string;
  source: string;
  status_id_id: number;
  updated_by: string;
  jd_title?: string;
  job_id?: string;
}
export interface MatchEntityOne {
  id: number;
  candidate_id_id: number;
  jd_id_id: number;
  profile_match: number;
  created_at: string;
  applicant?: number;
  fav?: number;
  jd_title?: string;
  job_id?: string;
  invited?: any;
  interested?: boolean;
}

export interface AllMatchReducerState extends AllMatch {
  isLoading: boolean;
  error: string;
}

export interface Message {
  sender: number;
  date_created: string;
  username: string;
  message: string;
  sender_image: string;
  receiver_image: string;
  last_name: string;
}

export interface MessageReducerState {
  isLoading: boolean;
  error: string;
  message: Message[];
}

export interface InterviewScorecard {
  interview: InterviewEntity[];
}
export interface InterviewEntity {
  id: number;
  candidate_id_id: number;
  jd_id_id: number;
  rating: number;
  first_name:  string,
  last_name: string,
  img_name:string,
  comments: string;
  created_at: string;
}

export interface InterviewScorecardReducerState extends InterviewScorecard {
  isLoading: boolean;
  error: string;
}
export interface Intergratemailstate {
  isLoading: boolean;
  error: string;
  mail:string;
  email:IntergrateEntity[];
}
export interface IntergrateEntity {
   email:string;
}
export interface MessageTemplates {
  created_on: string;
  id: number;
  name: string;
  templates: string;
}

export interface MessageTemplateReducerState {
  isLoading: boolean;
  error: string;
  messageTemplate: MessageTemplates[];
}

export interface Calender {
  google?: GoogleEntity[];
  
  event?: EventEntity[];
  outlook?: GoogleEntity[];
}
export interface GoogleEntity {
  id: number;
  client_id_id: number;
  email: string;
  json_path: string;
  created_at: string;
  timeZone: any;
}
export interface EventEntity {
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

export interface CalenderReducerState extends Calender {
  isLoading: boolean;
  error: string;
}

export interface ScreenStatus {
  applied?: AppliedEntity[];
  stages: IApplicantStatus[];
  shortlisted?: ShortlistedEntityOrInterviewedEntityOrSelectedEntity[];
  interviewed?: ShortlistedEntityOrInterviewedEntityOrSelectedEntity[];
  selected?: ShortlistedEntityOrInterviewedEntityOrSelectedEntity[];
  rejected?: ShortlistedEntityOrInterviewedEntityOrSelectedEntity[];
 invite ?:InviteEntity[];
}
export interface InviteEntity {
  candidate_id_id: number;
  client_id_id: number;
  created_at: string;
  id: number;
  is_interested: boolean;
  jd_id_id: number;
  responded_date: string;
  updated_by: string;
  invited?: any;
}
export interface AppliedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by?: null;
}
export interface ShortlistedEntityOrInterviewedEntityOrSelectedEntity {
  id: number;
  jd_id_id: number;
  candidate_id_id: number;
  client_id_id: number;
  status_id_id: number;
  created_on: string;
  updated_by: string;
  invited: any;
  timeZone: any;
}

export interface ScreenStatusReducerState extends ScreenStatus {
  stages: any;
  invite:any;
  isLoading: boolean;
  error: string;
}

export interface ApplicantFavReducerState {
  isLoading: boolean;
  error: string;
  success: boolean;
}

/// Applicant types
export interface IApplicantStatus {
  id: number;
  jd_id: number;
  stage_id: number;
  stage_id__stage_name: string;
  candidate_id: number;
  client_id: number;
  created_on: string;
  updated_by: string;
}
