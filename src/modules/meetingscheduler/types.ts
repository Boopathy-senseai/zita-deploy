export interface IEvent {
  event_id: number;
  date: string;
  time: string;
  event_id__duration: string;
  event_id__event_name: string;
  event_id__event_type: string;
  candidate_id: number;
  event_id__interviewer: string;
  startevent: string;
  candidate_name: string;
}

export interface IEventInterviewer {
  id: number,
  event_id: number,
  name_id: number,
  full_name: string,
  profile: string
}

export interface IEventData {
  past_event: IEvent[];
  upcoming_event: IEvent[];
  interviewer: IEventInterviewer[];
}


export interface IEventTableItem extends IEvent{
  interviewers: IEventInterviewer[];
}

export enum EVENT_TYPE  {
  MY_EVENTS = "MY_EVENTS",
  TEAM_EVENTS = "TEAM_EVENTS",
}

export enum EVENT_FILTER_OPTION {
  PAST_AND_UPCOMING = "PAST_AND_UPCOMING",
  DATE = "DATE",
}