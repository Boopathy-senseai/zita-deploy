

export interface schedulerPageReducerState {
    isLoading: boolean;
    data ?: DataEntity[] ;
    interviewer ?: InterviewEntity[] ;
    shareLink ?: ShareEntity[] ;
    addmembers ?: MemberEntity[] ;
    datetime ?: Datetime;
    suceess : string;
    google : boolean;
    outlook : boolean;
    error: string;    
  }
  
  export interface DataEntity{
    id: number,
    emp_id_id: number,
    company_id: number,
    event_name ?: string | any,
    event_type ?: string | any,
    location:string | any,
    daterange:string,
    days: string,
    startdate: string,
    enddate: string,
    duration: string | null,
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
    id: number | any,
    event_id: number,
    name_id: number,
    full_name: string;
    name__user : string;
    google_calendar : string;
    outlook_calendar : string;
  }

  export interface ShareEntity{
    id: number | any,
    candidate_id__application_id: number | any,
    email: string | null,
    type: string | null,
    full_name: string | null;
  }

  export interface MemberEntity{
    id: number | any,
    user: number | any,
    user__first_name: string | any,
    user__last_name: string | any,
    full_name: string | any,
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
    can_id : number;
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