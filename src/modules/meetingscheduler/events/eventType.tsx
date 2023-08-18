import moment from 'moment-timezone';

export const eventType = [
    { value: '1', label: 'On-site Interview' },
    { value: '2', label: 'Phone Interview' },
    { value: '3', label: 'Microsoft Teams' },
    { value: '4', label: 'Google Hangouts/Meet' },

  ];
export const days = [
    { value: '1', label: 'Calendar Days' },
    { value: '2', label: 'Week Days' },
  ];


// const durationFieldType = () => {
const durationField = []
const totalMinutesIn12Hours = 12 * 60; // 12 hours * 60 minutes/hour
const intervalMinutes = 15; // 15 minutes interval
const intervals = Math.floor(totalMinutesIn12Hours / intervalMinutes);

for (let i = 1; i <= intervals; i++) {
  const hours = Math.floor((intervalMinutes * i) / 60);
  const minutes = (intervalMinutes * i) % 60;
  durationField.push({
    value: String(i + 4), // Start with value '4' to avoid conflicts
    label: `${hours > 0 ? hours + ' hour' + (hours > 1 ? 's' : '') : ''}${
      hours > 0 && minutes > 0 ? ' ' : ''}${minutes > 0 ? minutes + ' minutes' : ''}`
  });
}
console.log("durationFielddurationField",durationField)
// }



// export const duration =[
//     {value: '1',label:"15 minutes"},
//     {value: '2',label:"30 minutes"},
//     {value: '3',label:"45 minutes"},
//     {value: '4',label:"1 hour"},
//   ]

export const duration = durationField


 const getTimezones = () => {
      return moment.tz.names().map((time,index) => {
        const offset = moment.tz(time).format('Z');
        const value = index
        return {
          offset,
          value: value,
          label: `${moment.tz(time).format('Z')} (${time})`,
        };
      });
    };

 export  const timezonesdata = getTimezones();




export const timezonedisplay = [
  {value : "1",label : "Automatically detect and show the times in my invitee's time zone"},
  {value : "2", label : "Lock the timezone (best for in-person events)"}
]


