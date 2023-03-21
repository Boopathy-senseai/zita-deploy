export interface EmailNotification {
  success: boolean;
  email_preferences: EmailPreferencesEntity[];
  meta_email: MetaEmailEntity;
}
export interface EmailPreferencesEntity {
  id: number;
  user_id: number;
  stage_id: string;
  is_active: boolean;
  created_at: string;
  updated_by: string;
}
export interface MetaEmailEntity {
  id: number;
  stage_id_id: string;
  is_active: boolean;
  created_at: string;
  inactivated_date?: string;
  updated_by: string;
}


export interface emailNotificationReducerState extends EmailNotification {
  isLoading: boolean;
  error: string;
}
