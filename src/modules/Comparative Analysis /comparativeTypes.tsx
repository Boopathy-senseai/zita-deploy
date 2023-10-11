export interface searchingdata {
    jd_id: string; 
  }
  export interface SearchingReducerState {
    isLoading: boolean;
    error: string;
    data:[{
        "candidate_id": Number,
       "stage_name": string,
       "stage_color": string,
       "first_name": string,
       "last_name":string,
       "email":string,
       "profile_image":string
    }];
  }