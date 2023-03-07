export interface Integration {
  success: boolean;
  outlook: OutlookEntity;
  google: GoogleEntity;

  
}
export interface OutlookEntity {
  id: number;
  client_id: number;
  code: string;
  state: string;
  session_state: string;
  email: string;
  created_at: string;
}

export interface GoogleEntity {
  id: number;
  client_id: number;
  email: string;
  json_path: string;
  created_at: string;
 
}


export interface integrationReducerState extends Integration {
  isLoading: boolean;
  error: string;
}
