import {
  EditEventDetails,
  EditEventDetailsOnlyInterviewerEmail,
  EventMeetingType,
  meetingFormProps,
  ZitaEventType,
} from './types';

/**
 *
 * @param date 13:00:00
 * @returns 1:00 PM
 *
 * @param date: 18:30:00
 * @returns 6:30 PM
 */
export const formatTo12HrClock = (date: Date): string => {
  if (date) {
    if (typeof date !== typeof Date) {
      date = new Date(date);
    }
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }
};

export const formatEventTitle = (
  event: { title: string },
  showTime = true,
): string => {
  if (event.title.includes('Zita event')) {
    let time = new RegExp(
      /[0-9]+:[0-9]+ (am|pm) to [0-9]+:[0-9]+ (am|pm)/,
    ).exec(event.title);
    let interview = new RegExp(/[a-zA-Z ]+ interview/).exec(event.title);
    let withWhom = new RegExp(/with [a-zA-Z]+/).exec(event.title);

    if (time && interview && withWhom) {
      if (showTime) {
        return `${interview[0]} ${withWhom[0]} on ${time[0]}`;
      }
      return `${interview[0]} ${withWhom[0]}`;
    }
  }
  return event.title;
};

/**
 *
 * @param minutes 30
 * @returns 30 mins
 *
 * @param 200
 * @returns 3 hour 20 mins
 *
 * @param 60
 * @returns 1 hour
 */
export const formatTime = (minutes: number): string => {
  let hours = Math.floor(minutes / 60);
  let mins = minutes % 60;
  let hourStringFormat = hours === 1 ? 'hour' : 'hours';
  if (hours && mins) {
    return `${hours} ${hourStringFormat} ${mins} minutes`;
  }
  if (mins && !hours) {
    return `${mins} minutes`;
  }
  return `${hours} ${hourStringFormat}`;
};

export const getNewDateTimes = (
  date: Date,
  startTime: Date,
  endTime: Date,
): { startDateTime: Date; endDateTime: Date } => {
  const startDateTime = new Date(date);
  const endDateTime = new Date(date);
  startDateTime.setHours(startTime.getHours());
  startDateTime.setMinutes(startTime.getMinutes());
  endDateTime.setHours(endTime.getHours());
  endDateTime.setMinutes(endTime.getMinutes());

  return { startDateTime, endDateTime };
};

export const getDateFromDateTime = (startDate: Date): Date => {
  const date = new Date(startDate);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
};

export const getEventHasMeeting = (title: string) => {
  let eventType = new RegExp(/[a-zA-Z]+ [a-zA-Z]+ /).exec(title);
  if (eventType) {
    if (eventType[0].includes('Google Meet')) {
      return true;
    } else if (eventType[0].includes('Microsoft Teams')) {
      return true;
    }
  }
  return false;
};

export const getEditEventsDetails = (
  event: ZitaEventType,
): EditEventDetailsOnlyInterviewerEmail => {
  return {
    applicant: {
      name: event.applicant,
      id: event.cand_id,
    },
    jobRole: {
      label: JSON.parse(event.jd).label,
      value: JSON.parse(event.jd).value,
    },
    startDateTime: new Date(event.s_time),
    endDateTime: new Date(event.e_time),
    timeZone: event.timezone,
    interviewersEmails: event.interviewers.split(','),
    eventType: getEventMeetingType(event.event_type),
    location: event.location,
    notes: event.notes,
    privateNotes: event.private_notes,
  };
};

export const getEventMeetingType = (eventType: string): EventMeetingType => {
  if (eventType.includes('Onsite')) {
    return 'Onsite interview';
  } else if (eventType.includes('Phone')) {
    return 'Phone interview';
  } else if (eventType.includes('Microsoft')) {
    return 'Microsoft Teams interview';
  } else {
    return 'Google Meet interview';
  }
};

export const meetingFormInitialState: meetingFormProps = {
  applicant: {
    id: null,
    name: '',
    email: '',
    error: false,
  },
  date: {
    value: null,
    error: false,
  },
  startTime: {
    value: null,
    errorMessage: null,
  },
  endTime: {
    value: null,
    errorMessage: null,
  },
  startDateTime: null,
  endDateTime: null,
  notes: '',
  privateNotes: '',
  location: {
    isHave: false,
    value: '',
  },
  timeZone: {
    value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    error: false,
  },
  eventType: {
    value: null,
    error: false,
  },
  reminder: {
    value: 15,
    format: 'mins',
  },
  job: {
    label: '',
    value: 0,
    error: false,
  },
  interviewer: [],
};

export const SlotRangeInitialState = {
  start: null,
  end: null,
  date: null,
};
