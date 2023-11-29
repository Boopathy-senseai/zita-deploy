export interface Login {
  user?: User;
  token: string;
  success?: boolean;
}
export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginState extends Login {
  isLoading: boolean;
  error: string;
}

export interface setPasswordState {
  isLoading: boolean;
  error: string;
  success: boolean;
  user_not_found: boolean;
  token_not_found: string;
}

export interface LoginPayload {
  username: string;
  password: string;
  isStaff?:boolean;
}

export interface PasswordSetPayload {
  userid: string;
  password1: string;
  password2: string;
}

export interface Permission {
  success: boolean;
  Permission: string[];
  super_user: boolean;
  is_plan: boolean;
  plan_id: number;
  roles: string;
  current_jd_count:number;
  current_resume_count:number;
  data:[]
}

export interface PermissionState extends Permission {
  isLoading: boolean;
  error: string;
}
