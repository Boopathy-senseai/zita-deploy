export interface SignUpPayLoad {
  first_name: string;
  last_name: string;
  password1: string;
  password2: string;
  email: string;
  username: string;
  company_name: string;
  contact_no: string;
  terms_and_conditions: string;
  planId?:string
}
