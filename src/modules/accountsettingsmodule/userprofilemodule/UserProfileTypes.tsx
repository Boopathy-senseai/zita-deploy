export interface UserProfile {
  success: boolean;
  user: UserEntity;
  profile: string;
  
}
export interface UserEntity {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}


export interface userProfileReducerState extends UserProfile {
  isLoading: boolean;
  error: string;
}
