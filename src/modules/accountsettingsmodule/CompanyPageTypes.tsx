export interface CompanyPage {
  success: boolean;
  build_career_page: boolean;
  permission?: [] ;
  country?: CountryEntity[] ;
  state?: StateEntity[] ;
  city?: CityEntity[] ;
  company_detail: CompanyDetailEntity ;
  career_page_exists:boolean
}
export interface CountryEntity {
  id: number;
  name: string;
}
export interface StateEntity {
  id: number;
  country_id: number;
  name: string;
}
export interface CityEntity {
  id: number;
  state_id: number;
  name: string;
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
}
export interface companyPageReducerState extends CompanyPage {
  isLoading: boolean;
  error: string;
}

export interface CompanyPageload {
  company_name: string;
  company_website: string;
  email: string;
  contact: string;
  industry_type_id: string;
  no_of_emp: string;
  address: string;
  country_id: string;
  state_id: string;
  city_id: string;
  zipcode: string;
  logo: string;
  logos:string;
}

