import { google } from 'googleapis';


const GoogleIntergration = () => {
// Set up the authenticated client
const authClient = new google.auth.OAuth2(
  "396086087663-fgeas18n6jmnakspsdefe92ha7strcgt.apps.googleusercontent.com",
  "AavAtVGL_mdvforXYa_LbWyy",
  "redirectUri"
);
authClient.setCredentials({
  access_token: "ya29.a0AbVbY6NUxgPXbdDM-m0uLn0U9dqYTSgtdhIkDAJd6Xd767vYDlFCl138oO1Tu18IPHtQifI9ttAG3ZUE_xa2BBIQN6eWmeXQ45B5P5A3M6kO59sAJ-bEXL3R-6nJvW-CySl5xqdIFBHFtDEAPZ5sQ1UW8W9fzqk3oFs8aCgYKAb4SARASFQFWKvPlw7P5h_b8ou9n_sCPp1WG7w0171",
  refresh_token: "1//0gNGDsO7SPnASCgYIARAAGBASNwF-L9IrCoIumaFdZcq8hoehDCM4xBiJ3l9yICzD0AE59VhyTYLzYmdr_t4xpScqaY4MbxLMr3A",
});

// Create an event
const calendar = google.calendar({ version: 'v3', auth: authClient });
const event = {
  summary: 'Event Title',
  start: {
    dateTime: '2023-07-06T10:00:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2023-07-06T12:00:00',
    timeZone: 'America/Los_Angeles',
  },
  description: 'Event Description',
};

// Insert the event into Google Calendar
calendar.events.insert(
  {
    calendarId: 'primary', // Use 'primary' for the user's primary calendar
    // resource: event,
  },
  (err, res) => {
    if (err) {
      console.error('Error creating event:', err);
    } else {
      console.log('Event created:', res.data);
    }
  }
);
}


module.exports = GoogleIntergration;