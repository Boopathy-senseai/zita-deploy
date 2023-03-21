export interface Notification {
  success: boolean;
  today?: OthersEntity[];
  yesterday?: OthersEntity[];
  others?: OthersEntity[];
  total: number;
  total_unread: number;
}

export interface OthersEntity {
  id: number;
  level: string;
  recipient_id: number;
  unread: boolean;
  actor_content_type_id: number;
  actor_object_id: string;
  verb: string;
  description?: any;
  target_content_type_id?: any;
  target_object_id?: any;
  action_object_content_type_id?: any;
  action_object_object_id?: any;
  timestamp: string;
  public: boolean;
  deleted: boolean;
  emailed: boolean;
  data?: any;
}

export interface NotificationReducerState extends Notification {
  isLoading: boolean;
  error: string;
}
