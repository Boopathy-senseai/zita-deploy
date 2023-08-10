

export interface schedulerPageReducerState {
    isLoading: boolean;
    data ?: DataEntity[] ;
    interviewer ?: InterviewEntity[] ;
    shareLink ?: ShareEntity[] ;
    addmembers ?: MemberEntity[] ;
    datetime ?: Datetime;
    suceess : string;
    google : string;
    outlook : string;
    error: string;    
  }
  
  export interface DataEntity{
    id: number,
    emp_id_id: number,
    company_id: number,
    event_name: string,
    event_type:string,
    location:string ,
    daterange:string ,
    days: string,
    startdate: string,
    enddate: string,
    duration: string,
    times_zone: string,
    interviewer: string,
    times_zone_display: string,
    description:string,
    created_at:string,
    is_active: boolean,
    updatedby: string,
    isdeleted: boolean,
    ischecked: boolean,
  }
  export interface InterviewEntity{
    id: number,
    event_id: number,
    name_id: number,
    full_name: string;
    name__user : string;
    google_calendar : string;
    outlook_calendar : string;
  }

  export interface ShareEntity{
    candidate_id: number,
    candidate_id__candidate_id: number,
    candidate_id__email: string,
    type: string,
    full_name: string
  }

  export interface MemberEntity{
    id: number,
    user: number,
    user__first_name: string,
    user__last_name: string,
    full_name: string
  }

  export interface Datetime{
    tuesday: any;
    sunday ?: DayEntity[],
    monday ?: DayEntity[],
    tueday ?: DayEntity[],
    wednesday ?: DayEntity[],
    thursday ?: DayEntity[],
    friday ?: DayEntity[],
    saturday ?: DayEntity[],
  }
  
  export interface DayEntity{
    day: string, 
    starttime: string,
    endtime: string 
  }


  export interface slotterPageReducerState{
    isLoading: boolean;
    success : string ;
    slotterdata ?: SlotterEntity[];
    slotmembers ?: MemberInterface[];
    candidate_name : string;
    error: string;
    message : string;  
  }
  
  export interface SlotterEntity{
    event_id: number,
    event_id__event_name: string,
    date: string,
    time: string,
    candidate_id__first_name: string
  }

  export interface MemberInterface{
    id: number,
    emp_id_id: number,
    name_id: number,
    event_id_id: number,
    is_active: boolean,
    created_at: string,
    full_name: string
  }

  export interface timezonePageReducerState {
    isLoading: boolean;
    error: string;
    availbleslot : [];  
  }