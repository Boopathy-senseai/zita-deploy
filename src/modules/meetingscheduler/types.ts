export interface IEvent {
  id: number;
  event_id: number;
  date: string;
  time: string;
  event_id__duration: string;
  event_id__event_name: string;
  event_id__event_type: string;
  candidate_id: number;
  event_id__interviewer: string;
  startevent: string;
  candidate_name?: string;
  join_url: string;
}

export interface ICalendarEvent {
  id: number;
  applicant: string;
  s_time: string;
  jd: string;
  e_time: string;
  notes: string;
  location: string;
  event_type: string;
  timezone: string;
  private_notes: string;
  interviewers: any;
  eventId: string;
  jd_id: string;
  cand_id: string;
  org_id: string;
  join_url: string;
  extra_notes: string | null;
}

export interface IEventInterviewer {
  id: number;
  event_id: number;
  name_id: number;
  full_name: string;
  profile: string;
}

export interface ICalendarEventInterviewer {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  event_id: string;
}

export interface IEventTeamMember {
  id: number;
  user: number;
  user__first_name: string;
  user__last_name: string;
  full_name: string;
  name_id: number;
}

export interface IEventOrganiser {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
}

export interface IEventData {
  past_event: IEvent[];
  upcoming_event: IEvent[];
  event: IEvent[];
  interviewer: IEventInterviewer[];
  teammembers: IEventTeamMember[];
  calevents_events: ICalendarEvent[];
  calevents_upcoming_event: ICalendarEvent[];
  calevents_past_event: ICalendarEvent[];
  org_name: IEventOrganiser[];
  calevents_interviewer: ICalendarEventInterviewer[]; /// Array<{ [key: string]: string }>;
}

export interface IEventTableItem extends IEvent {
  interviewers: IEventInterviewer[];
  organisers: IEventOrganiser[];
}

export interface ICalendarEventTableItem extends ICalendarEvent {
  interviewers: ICalendarEventInterviewer[];
  organisers: IEventOrganiser[];
}

export enum EVENT_TYPE {
  MY_EVENTS = 'MY_EVENTS',
  TEAM_EVENTS = 'TEAM_EVENTS',
}

export enum EVENT_FILTER_OPTION {
  PAST_AND_UPCOMING = 'PAST_AND_UPCOMING',
  DATE = 'DATE',
}
