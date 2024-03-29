export interface UserType {
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
}

export interface TeamMemberType {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  calendarEmail: string;
}

export type EventMeetingType =
  | 'Onsite interview'
  | 'Phone interview'
  | 'Google Meet interview'
  | 'Microsoft Teams interview';

export interface SlotRangeType {
  start: Date | null;
  end: Date | null;
  date: Date | null;
}

export enum CALENDAR {
  Google = 'GOOGLE',
  Outlook = 'OUTLOOK',
}

export enum CalendarType {
  MyCalendar = 'MyCalendar',
  TeamCalendar = 'TeamCalendar',
}

export interface InterviewInfo {
  userId: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface UserInfo {
  name: string | null;
  id: number | null;
}

export interface Events {
  user: string;
  title: string;
  start: Date;
  end: Date;
  eventId: string;
  attendees: string;
  organizer: string;
  link: string;
  color: string;
  synced?: string;
  email: string;
}

export interface meetingFormProps {
  applicant: {
    id: number;
    name: string | null;
    email: string | null;
    error: boolean;
  };
  date: {
    value: Date | null;
    error: boolean;
  };
  startTime: {
    value: Date | null;
    errorMessage: string | null;
  };
  endTime: {
    value: Date | null;
    errorMessage: string | null;
  };
  startDateTime: null | Date;
  endDateTime: null | Date;
  location: {
    isHave: boolean;
    value: string | null;
    error: boolean;
  };
  timeZone: {
    value: string;
    error: boolean;
  };
  notes: string | null;
  privateNotes: string | null;
  eventType: {
    value: EventMeetingType | null;
    error: boolean;
  };
  reminder: {
    value: number | null;
    format: string;
  };
  job: {
    label: string | null;
    value: number | null;
    error: boolean;
  };
  interviewer: TeamMemberType[];
}
export interface IEventNotes {
  extra_notes: string | null;
  interview_notes: string | null;
}
export interface ApplicantTypes {
  email: string;
  userId: number;
  firstName: string;
  lastName: string;
}

export interface GoogleEventType {
  attendees: {
    email: string;
    self?: boolean;
    responseStatus?: string;
    full_name?: string;
  }[];
  organizer: { full_name?: string; email: string };
  email: string;
  id: any;
  recurringEventId: any;
  summary: any;
  hangoutLink: any;
  start: { dateTime: any };
  end: { dateTime: any };
}

export interface OutlookEventType {
  created_by: string;
  attendees: any;
  description: {
    attendees: Array<{
      type: string;
      status: {
        response: string;
        time: string;
      };
      emailAddress: {
        name: string;
        address: string;
        full_name: string;
      };
    }>;
    organizer: {
      emailAddress: {
        name: string;
        address: string;
        full_name?: string;
      };
    };
  };
  event_id: string;
  title: any;
  start_time: string | number | Date;
  end_time: string | number | Date;
  organizer: {
    emailAddress: {
      name: string;
      address: string;
    };
  };
}

export interface ZitaEventType {
  applicant: string;
  cand_id: number;
  jd: string;
  s_time: string;
  e_time: string;
  timezone: string;
  interviewers: string;
  event_type: string;
  location: string;
  notes: string;
  private_notes: string;
  email: string;
}

export interface EditEventDetails {
  applicant: {
    id: number;
    name: string;
    email?: string;
  };
  jobRole: {
    label: string;
    value: string;
  };
  startDateTime: Date;
  endDateTime: Date;
  timeZone: string;
  interviewers: TeamMemberType[];
  eventType: EventMeetingType;
  location: string;
  notes: string;
  privateNotes: string;
}

export interface EditEventDetailsOnlyInterviewerEmail {
  applicant: {
    name: string;
    id: number;
  };
  jobRole: {
    label: string;
    value: string;
  };
  startDateTime: Date;
  endDateTime: Date;
  timeZone: string;
  interviewersEmails: string[];
  eventType: EventMeetingType;
  location: string;
  notes: string;
  privateNotes: string;
}

export interface ZitaEventSchedulerType {
  title: string;
  reminder: number;
  app_id?: string;
  eventId?: string;
  extraNotes: string;
  interviewer_notes: string;
  myJd: string;
  privateNotes: string;
  eventType: string;
  applicantId?: number;
  curJd: any;
  edit_jd?: any;
  timeZone: any;
  interviewer: { email: string; calendarEmail: string | null }[] | string;
  startTime: Date;
  endTime: Date;
  notes: string;
  location: string;
  questions:any;
  new_questions:any;
}

export interface EventPopUpDetails {
  title: null | string;
  startDate: null | Date;
  endDate: null | Date;
  link?: string | null;
  organizer: null | { email: string; full_name?: string };
  applicantId?: number | null;
  attendees?: null | string[];
  eventId: null | string;
  recurringEventId: null | string;
  syncedBy: string | null;
  isZitaEvent: boolean;
  canEdit?: boolean;
  email?: null | string[];
}

export interface CalendarEventType {
  userId: number | null;
  title: string | null;
  start: Date | null;
  end: Date | null;
  eventId?: string | null;
  attendees?: string[] | null;
  organizer: { email: string; displayName?: string } | null;
  link?: string | null;
  color?: string | null;
  syncedBy?: string | null;
  recurringEventId: string | null;
}

export interface GlobalZoneType {
  label: string;
  value: string;
}

export interface GetJDResponse {
  id: number;
  jobTitle: string;
}

export interface CalendarOptions {
  personalEvents: boolean;
  zitaEvents: boolean;
}

export interface Colors {
  borderColor: string;
  backgroundColor: string;
}
