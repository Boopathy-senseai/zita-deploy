import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';
// ...

const CalendarInsert = () => {
    const [calendarEventId, setCalendarEventId] = useState(null);
  // ...


  const event = {
    
    summary: 'Google I/O 2015',
    location: '800 Howard St., San Francisco, CA 94103',
    description: "A chance to hear more about Google's developer products.",
    start: {
      dateTime: '2015-05-28T09:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2015-05-28T17:00:00-07:00',
      timeZone: 'America/Los_Angeles',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 10 },
      ],
    },
};


  useEffect(() => {
    const credentials = {
        access_token: 'ya29.a0AbVbY6MMUQb45BW-cpmdRG9MlYp4towWKaBuPs-KcJgs5Ag9URP0Ij7BAdnM8l0rZ53Uvwf6Psfaw7FYN3M46XmMLjtDjyNx5YpImakO5-0HXdoa6yHYyAZE__73Lf4Kb2_YjSVa00rhnFhA5vMQ5Ii0ek_mA7w-2CkgaCgYKAYQSARISFQFWKvPlrpVZAaxOT24Uk8QKvr73SA0171',
        refresh_token: '1//0gqxEhSiuDCwhCgYIARAAGBASNwF-L9IrpSQSoaVfFm5siXlG0zt6zNJ9b9vC8EE1LQfPRtWr6V0IoJZRMyfHEjMmt03ElROTKE8',
        token_uri: 'https://oauth2.googleapis.com/token',
        client_id: '396086087663-fgeas18n6jmnakspsdefe92ha7strcgt.apps.googleusercontent.com',
        client_secret: 'AavAtVGL_mdvforXYa_LbWyy',
        scopes: ['https://www.googleapis.com/auth/calendar'],
        expiry: '2023-07-25T12:05:46.498598Z',
      };
  

    // Create a new instance of the Google Calendar API client
    const calendar = google.calendar({
      version: 'v3',
      auth: credentials.access_token,
    });

    // Create an event to insert into the calendar

    calendar.events.insert(
        {
          calendarId: 'primary', // Replace 'primary' with the desired calendar ID
        //   resource: event,
        },
        (err: any, res: any) => {
          if (err) {
            console.error('Error inserting event:', err);
          } else {
            setCalendarEventId(res.data.id);
            console.log('Event created:', res.data.htmlLink);
          }
        }
      );

  }, []);

   

  // ...
};

export default CalendarInsert;
