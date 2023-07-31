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

export interface IEventData {
  past_event: IEvent[];
  upcoming_event: IEvent[];
}

export enum EVENT_TYPE  {
  MY_EVENTS = "MY_EVENTS",
  TEAM_EVENTS = "TEAM_EVENTS",
}