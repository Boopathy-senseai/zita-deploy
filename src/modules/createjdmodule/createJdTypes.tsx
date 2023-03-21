export interface JDParser {
  success: boolean;
  qual_name?: [];
  tool_skills: SkillsEntityOne[];
  database_skills: SkillsEntityOne[];
  platform_skills: SkillsEntityOne[];
  misc_skills: SkillsEntityOne[];
  job_title: string;
  programming_skills: SkillsEntityOne[];
  job_description: string;
}
export interface SkillsEntityOne {
  skill: string;
  id: any;
  exp: any;
}

export interface JDParserReducerState extends JDParser {
  isLoading: boolean;
  error: string;
}

export interface JDTemplates {
  id: number;
  job_description: string;
  job_title: string;
  qualification: string;
  experience: string;
  created_on: string;
}

export interface JDTemplatesrReducerState {
  isLoading: boolean;
  error: string;
  jd_templates: JDTemplates[];
  job_title: string[];
}

export interface CreateJd {
  data: Data;
  success: boolean;
  skill_list: SkillListEntity[];
}
export interface SkillListEntity {
  label: string;
  value: string;
}
export interface Data {
  1: SkillData;
  2: SkillData;
  3: SkillData;
  4: SkillData;
  5: SkillData;
  6: SkillData;
}
export interface SkillData {
  platform: string[];
  misc: string[];
  database: string[];
  programming: string[];
  tool: string[];
}

export interface CreateJdState extends CreateJd {
  isLoading: boolean;
  error: string;
}

export interface CreateJdPost {
  jd_id: number;
  success: boolean;
}

export interface CreateJdPostState extends CreateJdPost {
  isLoading: boolean;
  error: string;
}

export interface JdProfilePost {
  old_role: string;
  success: boolean;
  new_role: string;
}

export interface JdProfilePostState extends JdProfilePost {
  isLoading: boolean;
  error: string;
}
export interface CityEntity {
  id: number;
  state_id: number;
  name: string;
}

export interface Location {
  country: CountryEntity[];
  states: StatesEntity[];
  city: CityEntity[];
}

export interface StatesEntity {
  id: number;
  country_id: number;
  name: string;
}

export interface CountryEntity {
  id: number;
  name: string;
}

export interface LocationState extends Location {
  isLoading: boolean;
  error: string;
}

export interface JDProfile {
  success: boolean;
  profile_value: ProfileValue;
  selected_role: string;
}
export interface ProfileValue {
  business_intelligence: string;
  data_analysis: string;
  data_engineering: string;
  devops: string;
  machine_learning: string;
  others: string;
  recommended_role_id__label_name: string;
}

export interface JDProfileState extends JDProfile {
  isLoading: boolean;
  error: string;
}

export interface QuestionnaireForJd {
  questionnaire_for_jd: QuestionnaireForJdEntity[];
  company_name: string;
  country: string;
  is_eeo_comp:boolean
}
export interface QuestionnaireForJdEntity {
  id: number;
  jd_id_id: number;
  field_type_id: number;
  question: string;
  description?: string;
  is_required: boolean;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  created_on: string;
}
export interface QuestionnaireForJdState extends QuestionnaireForJd {
  isLoading: boolean;
  error: string;
}

export interface Template {
  template: TemplateEntity[];
}
export interface TemplateEntity {
  id: number;
  field_type_id: number;
  question: string;
  is_required: boolean;
  description?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

export interface TemplateState extends Template {
  isLoading: boolean;
  error: string;
}

export interface UpdateJd {
  success?: boolean;
  jd_output: JdOutput;
  skills: SkillsEntity[];
  location: LocationUpdate;
  qualification: QualificationEntity[];
  skillOne?: any;
  skillTwo?: skillList[];
  skillThree?: skillList[];
  skillFour?: skillList[];
  skillFive?: skillList[];
  jd_profile:boolean
}

export interface skillList {
  skill: string;
  id: any;
  exp: any;
}
export interface LocationUpdate {
  id?: number;
  jd_id_id?: number;
  country_id: number;
  state_id: number;
  city_id: number;
  lat?: string;
  lng?: string;
  location?: string;
}
export interface QualificationEntity {
  id: number;
  jd_id_id: number;
  qualification: string;
  specialization: string;
}

export interface JdOutput {
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
  min_exp: any;
  max_exp?: string;
  work_remote: boolean;
  role_res: string;
  job_description: string;
  richtext_job_description: string;
  tech_req: string;
  non_tech_req: string;
  updated_by?: string;
  industry_type_id: number;
  add_info?: string;
  salary_min: number;
  salary_max: number;
  salary_curr_type_id: number;
  show_sal_to_candidate: boolean;
  job_type_id: number;
  jd_status_id: number;
  created_on: string;
}

export interface UpdateJdState extends UpdateJd {
  isLoading: boolean;
  error: string;
}

export interface CreateJdPostPayload {
  work_remote: string;
  job_title: string;
  job_role?: string;
  job_id: string;
  industry_type: string;
  min_exp: string;
  max_exp: string;
  no_of_vacancies: string;
  richtext_job_description: string;
  salary_curr_type: string;
  show_sal_to_candidate: string;
  salary_min: string;
  salary_max: string;
  job_type: string;
  work_country: string;
  work_state: string;
  work_city: string;
  skills: any;
  skills_exp?: string;
  database_skill?: string[] | string;
  platform_skill?: string[] | string;
  tool_skill?: string[] | string;
  misc_skill?: string[] | string;
  programming_skill?: string[] | string;
  qualification: string[];
  specialization: string[];
  jdId?: string;
  duplicate?:string
}

export interface missJdPostPayload {
  skills: string;
  skills_exp: string;
  database_skill: string[];
  platform_skill: string[];
  tool_skill: string[];
  misc_skill: string[];
  programming_skill: string[];
  jd_id?: string;
}

export interface questionnaireSavePayload {
  jd_id: string;
  fieldType?: string;
  question?: string;
  description?: string;
  option?: string[];
  required?: string;
  temp?: string[];
}

export interface JdPreview {
  jd: Jd;
  has_external_posting: boolean;
  available_jobs?: null;
  location: LocationEntity;
  skills: SkillsEntity[];
  career_page_url: string;
  qualification: QualificationEntity[];
  recommended_role: string;
  profile: Profile;
  company_detail: CompanyDetail;
}
export interface Jd {
  industry_type__label_name: string;
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
  salary_curr_type__value: string;
}
export interface LocationEntity {
  country__name: string;
  state__name: string;
  city__name: string;
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
export interface CompanyDetail {
  id?: number;
  recruiter_id_id?: number;
  company_name: string;
  company_website?: string;
  email?: string;
  contact?: string;
  industry_type_id?: string;
  no_of_emp?: string;
  address?: string;
  country_id?: string;
  state_id?: string;
  city_id?: string;
  zipcode?: string;
  updated_by?: string;
  logo?: string;
  created_at?: string;
}
export interface SkillsEntity {
  id: number;
  jd_id_id: number;
  category_id: number;
  skill: string;
  experience: string;
}
export interface JdPreviewState extends JdPreview {
  isLoading: boolean;
  error: string;
}

export interface valiDateJdState {
  isLoading: boolean;
  error: string;
  is_taken: boolean;
}

export interface dsNonDsState {
  isLoading: boolean;
  error: string;
  ds_role: boolean;
}
export interface postState {
  isLoading: boolean;
  error: string;
  success: boolean;
  url:string
}

export interface jobsSelectState {
  isLoading: boolean;
  error: string;
  feature: number;
}
