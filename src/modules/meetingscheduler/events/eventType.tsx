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
export const duration =[
    {value: '1',label:"15 minutes"},
    {value: '2',label:"30 minutes"},
    {value: '3',label:"45 minutes"},
    {value: '4',label:"1 hour"},
  ]

export const data = [
  {
      role: 'Engineer',
      mode: 'Microsoft Teams',
      time: '30 mins',
      id: "1"
  },
  {
      role: 'Engineer',
      mode: 'Microsoft Teams',
      time: '30 mins',
      id: "2"
  },
  {
      role: 'Engineer',
      mode: 'Microsoft Teams',
      time: '30 mins',
      id: "3"
  }
];
export const nameList = [
  {
    id:1,
      name: 'Hemarekha V',
      checked: false
  },
  {
    id:2,
      name: 'RajaGopal S',
      checked: false
  },
  {
    id:3,
      name: 'Viji Jankiraman',
      checked: false
  },
  {
    id:4,
      name: 'Naveena M',
      checked: false
  },
  {
    id:5,
      name: 'Hema V',
      checked: false
  },
  {
    id:6,
      name: 'Raja S',
      checked: false
  },
  {
    id:7,
      name: 'Viji',
      checked: false
  },
  {
    id:8,
      name: 'Nav',
      checked: false
  },
]

export const loginid = [
  {
    username : "HemaRekha V",
    email : "hemarekha@sense&ai.com",
    password : "123456",
  }
]
 export const selected =[
  {
    id:0,
    name: "CU",
    checked: true
  }

 ] 


 const getTimezones = () => {
      return moment.tz.names().map((time) => {
        const offset = moment.tz(time).format('Z');
        return {
          offset,
          // label: time
          label: `${moment.tz(time).format('Z')} (${time})`,
        };
      });
    };

 export  const timezonesdata = getTimezones();
 export const timezone =[
  {
    "offset": "GMT-12:00",
    "label": "Etc/GMT-12"
  },
  {
    "offset": "GMT-11:00",
    "label": "Etc/GMT-11"
  },
  {
    "offset": "GMT-11:00",
    "label": "Pacific/Midway"
  },
  {
    "offset": "GMT-10:00",
    "label": "America/Adak"
  },
  {
    "offset": "GMT-09:00",
    "label": "America/Anchorage"
  },
  {
    "offset": "GMT-09:00",
    "label": "Pacific/Gambier"
  },
  {
    "offset": "GMT-08:00",
    "label": "America/Dawson_Creek"
  },
  {
    "offset": "GMT-08:00",
    "label": "America/Ensenada"
  },
  {
    "offset": "GMT-08:00",
    "label": "America/Los_Angeles"
  },
  {
    "offset": "GMT-07:00",
    "label": "America/Chihuahua"
  },
  {
    "offset": "GMT-07:00",
    "label": "America/Denver"
  },
  {
    "offset": "GMT-06:00",
    "label": "America/Belize"
  },
  {
    "offset": "GMT-06:00",
    "label": "America/Cancun"
  },
  {
    "offset": "GMT-06:00",
    "label": "America/Chicago"
  },
  {
    "offset": "GMT-06:00",
    "label": "Chile/EasterIsland"
  },
  {
    "offset": "GMT-05:00",
    "label": "America/Bogota"
  },
  {
    "offset": "GMT-05:00",
    "label": "America/Havana"
  },
  {
    "offset": "GMT-05:00",
    "label": "America/New_York"
  },
  {
    "offset": "GMT-04:30",
    "label": "America/Caracas"
  },
  {
    "offset": "GMT-04:00",
    "label": "America/Campo_Grande"
  },
  {
    "offset": "GMT-04:00",
    "label": "America/Glace_Bay"
  },
  {
    "offset": "GMT-04:00",
    "label": "America/Goose_Bay"
  },
  {
    "offset": "GMT-04:00",
    "label": "America/Santiago"
  },
  {
    "offset": "GMT-04:00",
    "label": "America/La_Paz"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Argentina/Buenos_Aires"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Montevideo"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Araguaina"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Godthab"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Miquelon"
  },
  {
    "offset": "GMT-03:00",
    "label": "America/Sao_Paulo"
  },
  {
    "offset": "GMT-03:30",
    "label": "America/St_Johns"
  },
  {
    "offset": "GMT-02:00",
    "label": "America/Noronha"
  },
  {
    "offset": "GMT-01:00",
    "label": "Atlantic/Cape_Verde"
  },
  {
    "offset": "GMT",
    "label": "Europe/Belfast"
  },
  {
    "offset": "GMT",
    "label": "Africa/Abidjan"
  },
  {
    "offset": "GMT",
    "label": "Europe/Dublin"
  },
  {
    "offset": "GMT",
    "label": "Europe/Lisbon"
  },
  {
    "offset": "GMT",
    "label": "Europe/London"
  },
  {
    "offset": "UTC",
    "label": "UTC"
  },
  {
    "offset": "GMT+01:00",
    "label": "Africa/Algiers"
  },
  {
    "offset": "GMT+01:00",
    "label": "Africa/Windhoek"
  },
  {
    "offset": "GMT+01:00",
    "label": "Atlantic/Azores"
  },
  {
    "offset": "GMT+01:00",
    "label": "Atlantic/Stanley"
  },
  {
    "offset": "GMT+01:00",
    "label": "Europe/Amsterdam"
  },
  {
    "offset": "GMT+01:00",
    "label": "Europe/Belgrade"
  },
  {
    "offset": "GMT+01:00",
    "label": "Europe/Brussels"
  },
  {
    "offset": "GMT+02:00",
    "label": "Africa/Cairo"
  },
  {
    "offset": "GMT+02:00",
    "label": "Africa/Blantyre"
  },
  {
    "offset": "GMT+02:00",
    "label": "Asia/Beirut"
  },
  {
    "offset": "GMT+02:00",
    "label": "Asia/Damascus"
  },
  {
    "offset": "GMT+02:00",
    "label": "Asia/Gaza"
  },
  {
    "offset": "GMT+02:00",
    "label": "Asia/Jerusalem"
  },
  {
    "offset": "GMT+03:00",
    "label": "Africa/Addis_Ababa"
  },
  {
    "offset": "GMT+03:00",
    "label": "Asia/Riyadh89"
  },
  {
    "offset": "GMT+03:00",
    "label": "Europe/Minsk"
  },
  {
    "offset": "GMT+03:30",
    "label": "Asia/Tehran"
  },
  {
    "offset": "GMT+04:00",
    "label": "Asia/Dubai"
  },
  {
    "offset": "GMT+04:00",
    "label": "Asia/Yerevan"
  },
  {
    "offset": "GMT+04:00",
    "label": "Europe/Moscow"
  },
  {
    "offset": "GMT+04:30",
    "label": "Asia/Kabul"
  },
  {
    "offset": "GMT+05:00",
    "label": "Asia/Tashkent"
  },
  {
    "offset": "GMT+05:30",
    "label": "Asia/Kolkata"
  },
  {
    "offset": "GMT+05:45",
    "label": "Asia/Katmandu"
  },
  {
    "offset": "GMT+06:00",
    "label": "Asia/Dhaka"
  },
  {
    "offset": "GMT+06:00",
    "label": "Asia/Yekaterinburg"
  },
  {
    "offset": "GMT+06:30",
    "label": "Asia/Rangoon"
  },
  {
    "offset": "GMT+07:00",
    "label": "Asia/Bangkok"
  },
  {
    "offset": "GMT+07:00",
    "label": "Asia/Novosibirsk"
  },
  {
    "offset": "GMT+08:00",
    "label": "Etc/GMT+8"
  },
  {
    "offset": "GMT+08:00",
    "label": "Asia/Hong_Kong"
  },
  {
    "offset": "GMT+08:00",
    "label": "Asia/Krasnoyarsk"
  },
  {
    "offset": "GMT+08:00",
    "label": "Australia/Perth"
  },
  {
    "offset": "GMT+08:45",
    "label": "Australia/Eucla"
  },
  {
    "offset": "GMT+09:00",
    "label": "Asia/Irkutsk"
  },
  {
    "offset": "GMT+09:00",
    "label": "Asia/Seoul"
  },
  {
    "offset": "GMT+09:00",
    "label": "Asia/Tokyo"
  },
  {
    "offset": "GMT+09:30",
    "label": "Australia/Adelaide"
  },
  {
    "offset": "GMT+09:30",
    "label": "Australia/Darwin"
  },
  {
    "offset": "GMT+09:30",
    "label": "Pacific/Marquesas"
  },
  {
    "offset": "GMT+10:00",
    "label": "Etc/GMT+10"
  },
  {
    "offset": "GMT+10:00",
    "label": "Australia/Brisbane"
  },
  {
    "offset": "GMT+10:00",
    "label": "Australia/Hobart"
  },
  {
    "offset": "GMT+10:00",
    "label": "Asia/Yakutsk"
  },
  {
    "offset": "GMT+10:30",
    "label": "Australia/Lord_Howe"
  },
  {
    "offset": "GMT+11:00",
    "label": "Asia/Vladivostok"
  },
  {
    "offset": "GMT+11:30",
    "label": "Pacific/Norfolk"
  },
  {
    "offset": "GMT+12:00",
    "label": "Etc/GMT+12"
  },
  {
    "offset": "GMT+12:00",
    "label": "Asia/Anadyr"
  },
  {
    "offset": "GMT+12:00",
    "label": "Asia/Magadan"
  },
  {
    "offset": "GMT+12:00",
    "label": "Pacific/Auckland"
  },
  {
    "offset": "GMT+12:45",
    "label": "Pacific/Chatham"
  },
  {
    "offset": "GMT+13:00",
    "label": "Pacific/Tongatapu"
  },
  {
    "offset": "GMT+14:00",
    "label": "Pacific/Kiritimati"
  }
]
export const time =[
  // {
  //   "label": "1.00 AM"
  // },
  // {
  //   "label": "2.00 AM"
  // },{
  //   "label": "3.00 AM"
  // },{
  //   "label": "4.00 AM"
  // },{
  //   "label": "5.00 AM"
  // },{
  //   "label": "6.00 AM"
  // },{
  //   "label": "7.00 AM"
  // },{
  //   "label": "8.00 AM"
  // },
  {
    "label": "9.00 AM"
  },{
    "label": "10.00 AM"
  },{
    "label": "11.00 AM"
  },{
    "label": "12.00 PM"
  },{
    "label": "1.00 PM"
  },{
    "label": "2.00 PM"
  },{
    "label": "3.00 PM"
  },{
    "label": "4.00 PM"
  },{
    "label": "5.00 PM"
  },{
    "label": "6.00 PM"
  },
  // {
  //   "label": "7.00 PM"
  // },
  // {
  //   "label": "8.00 PM"
  // },{
  //   "label": "9.00 PM"
  // },{
  //   "label": "10.00 PM"
  // },{
  //   "label": "11.00 PM"
  // },{
  //   "label": "12.00 AM"
  // },
]

export const dashboard = [
  {
      event_id:1,
      event_name: 'Technical Interview_QA Engineer',
      event_type:"Microsoft Team Interview",
      duration : "30 minutes",
      interviewer: 'Vimal V',  
      days: 'Week Days',  
      // interviewer: '["Hemarekha V","Raja S","Vimal V"]' ,    
      checked: false,  
      startdate :  "12-08-2022",
      enddate : "30-08-2022",
      location : "India",
      dateRange : "12",
      company : "sense7ai",
      timezone :  "GMT+10:30 Australia/Lord_Howe",
      timezonedisplay : "Automatically detect and show the times in my invitees time zone",
      description : "Hi\ We would like to move to the \
                      technical interview round for Software QA Engineer.\
                      Please come prepared with the technical. \aspects of your work experience\
                      Please choose a time slot in the calendar"
      
      
  },
  {
      event_id:2,
      event_name: 'HR Interview_Devops Engineer',
      event_type:"Google Meet Interview",
      duration : "30 minutes",
      interviewer: 'Hemarekha V',
      checked: false,
      startdate :  "12-08-2022",
      enddate : "30-08-2022",
      location : "India",
      dateRange : "12",
      company : "sense7ai",
      timezone :  "GMT+10:30 Australia/Lord_Howe",
      description : "Hi\ We would like to move to the \
                    technical interview round for Software QA Engineer.\
                    Please come prepared with the technical. \aspects of your work experience\
                    Please choose a time slot in the calendar"
    
      
      
  },
  {
      event_id:3,
      event_name: 'Initial Screening',
      event_type:"Microsoft Team Interview",
      duration : "45 minutes",
      interviewer: 'Naveena M',
      checked: false,     
      startdate :  "12-08-2022",
      enddate : "30-08-2022",
      location : "India",
      dateRange : "12",
      company : "sense7ai",
      timezone :  "GMT+10:30 Australia/Lord_Howe",
      description : "Hi\ We would like to move to the \
                    technical interview round for Software QA Engineer.\
                    Please come prepared with the technical. \aspects of your work experience\
                    Please choose a time slot in the calendar"
      
  },
  {
      event_id:4,
      event_name: 'Aptitude Test_Software Engineer',
      event_type:"Microsoft Team Interview",
      duration : "15 minutes",
      name: 'Raja S',      
      checked: false, 
      startdate :  "12-08-2022",
      enddate : "30-08-2022",
      location : "India",
      dateRange : "12",
      company : "sense7ai",
      timezone :  "GMT+10:30 Australia/Lord_Howe",
      description : "Hi\ We would like to move to the \
                    technical interview round for Software QA Engineer.\
                    Please come prepared with the technical. \aspects of your work experience\
                    Please choose a time slot in the calendar"
      
  },{
      event_id:5,
      event_name: 'Group Interview_Backend Engineer',
      event_type:"Microsoft Team Interview",
      duration : "45  minutes",
      interviewer:'Vimal V',        
      checked: false, 
      startdate :  "12-08-2022",
      enddate : "30-08-2022",
      location : "India",
      dateRange : "12",
      company : "sense7ai",
      timezone :  "GMT+10:30 Australia/Lord_Howe",
      description : "Hi\ We would like to move to the \
                    technical interview round for Software QA Engineer.\
                    Please come prepared with the technical. \aspects of your work experience\
                    Please choose a time slot in the calendar"
      
      
        
  }
]

export const timezonedisplay = [
  {value : "1",label : "Automatically detect and show the times in my invitees time zone"},
  {value : "2", label : "Lock the timezone (best for in-person events)"}
]

export const timesplit = [
  {0:'10:00 AM - 10:45 AM'},
  {1:'10:45 AM - 11:30 AM'},
  {2:'11:30 AM - 12:15 PM'}
  ]
export const defaultTime = [
  {value :"1", label :"9.00"},
  {value :"2", label :"6.00" }
]

export const interviewslot = [
  {
  event_id:1,
  event_name: 'Technical Interview_QA Engineer',
  event_type:"Microsoft Team Interview",
  duration : "30 minutes",
  interviewer: 'Vimal V',     
  checked: false, 
  startdate :  "12/08/2022",
  enddate : "30/08/2022",
  location : "India",
  dateRange : "12",
  company_name : "sense7ai",
  timezone :  "GMT+10:30 Australia/Lord_Howe",
  description : "Hi\ We would like to move to the \
                technical interview round for Software QA Engineer.\
                Please come prepared with the technical. \aspects of your work experience\
                Please choose a time slot in the calendar"


  }
]

export const sharelinkdata =[
  {
    id : 1,
    name : 'manoj(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 2,
    name : 'pugal(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 3,
    name : 'srithar(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 4,
    name : 'janani(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 5,
    name : 'arun(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 6,
    name : 'siva(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 7,
    name : 'mukilan(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 8,
    name : 'boopathy(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 9,
    name : 'kavinesh(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 10,
    name : 'hema(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 11,
    name : 'raja(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 12,
    name : 'saranya(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 13,
    name : 'padma(candidate)',
    email:'pugazhendhij9202@gmail.com'
  },{
    id : 14,
    name : 'swathika(applicant)',
    email:'pugazhendhij9202@gmail.com'
  },
  {
    id : 15,
    name : 'prasanth(candidate)',
    email:'pugazhendhij9202@gmail.com'
  }
]

export const data1 = [
{
  "suceess": true,
  "data": [
    {
      "id": 40,
      "emp_id_id": 857,
      "company_id": 280,
      "event_name": "Technical Interview",
      "event_type": "Teams interview",
      "location": null,
      "daterange": "10",
      "days": "calender days",
      "startdate": "12-05-2016",
      "enddate": "10-06-2016",
      "duration": "30 minutes",
      "times_zone": "10.50cms",
      "interviewer": "5",
      "times_zone_display": "best in person",
      "description": "bbjkvscvfvbdsfjkv",
      "created_at": "2023-06-16T12:06:24.993970Z",
      "is_active": true,
      "updatedby": "2023-06-16T12:06:24.994575Z",
      "isdeleted": false,
      "ischecked": "True"
    }
  ],
  "interviewer": [
    {
        "id": 1,
        "emp_id_id": 403,
        "fullname" : "Manoj R",
        "name_id": 316,
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:27.940250Z"
      },
    {
      "id": 2,
      "emp_id_id": 857,
      "fullname" : "Pugal R",
      "name_id": 316,
      "event_id_id": 40,
      "is_active": true,
      "created_at": "2023-06-16T12:06:27.940250Z"
    }
  ],
  "datetime": {
    "sunday": [
      {
        "id": 427,
        "index": 0,
        "day": "sunday",
        "starttime": "9.10",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.040095Z"
      },
      {
        "id": 428,
        "index": 1,
        "day": "sunday",
        "starttime": "9.30",
        "endtime": "10.00",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.082752Z"
      },
      {
        "id": 429,
        "index": 2,
        "day": "sunday",
        "starttime": "10.30",
        "endtime": "11.00",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.126834Z"
      },
      {
        "id": 430,
        "index": 3,
        "day": "sunday",
        "starttime": "11.00",
        "endtime": "11.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.171095Z"
      },
      {
        "id": 431,
        "index": 4,
        "day": "sunday",
        "starttime": "12.00",
        "endtime": "12.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.421114Z"
      },
      {
        "id": 432,
        "index": 5,
        "day": "sunday",
        "starttime": "12.00",
        "endtime": "12.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.573925Z"
      }
    ],
    "monday": [
      {
        "id": 433,
        "index": 0,
        "day": "monday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.746846Z"
      }
    ],
    "tuesday": [
      {
        "id": 434,
        "index": 0,
        "day": "tuesday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.793132Z"
      },
      {
        "id": 435,
        "index": 1,
        "day": "tuesday",
        "starttime": "10.00",
        "endtime": "10.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:25.966414Z"
      }
    ],
    "wednesday": [
      {
        "id": 436,
        "index": 0,
        "day": "wednesday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:26.141420Z"
      },
      {
        "id": 437,
        "index": 1,
        "day": "wednesday",
        "starttime": "10.00",
        "endtime": "10.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:26.318522Z"
      }
    ],
    "thursday": [
      {
        "id": 438,
        "index": 0,
        "day": "thursday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:26.609498Z"
      },
      {
        "id": 439,
        "index": 1,
        "day": "thursday",
        "starttime": "10.00",
        "endtime": "10.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:26.784472Z"
      }
    ],
    "friday": [
      {
        "id": 440,
        "index": 0,
        "day": "friday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:26.961191Z"
      },
      {
        "id": 441,
        "index": 1,
        "day": "friday",
        "starttime": "10.00",
        "endtime": "10.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:27.137371Z"
      }
    ],
    "saturday": [
      {
        "id": 442,
        "index": 0,
        "day": "saturday",
        "starttime": "9.00",
        "endtime": "9.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:27.311186Z"
      },
      {
        "id": 443,
        "index": 1,
        "day": "saturday",
        "starttime": "10.00",
        "endtime": "10.30",
        "event_id_id": 40,
        "is_active": true,
        "created_at": "2023-06-16T12:06:27.487889Z"
      }
    ]
  }
}
]

export const overall = [
  {
    "suceess": false,
    "data": [
      {
        "id": 28,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:05:48.916737Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:05:48.916872Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 29,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:06:29.881145Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:06:29.881816Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 30,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:07:39.085376Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:07:39.085936Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 31,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:08:05.853492Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:08:05.853636Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 32,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:29:45.584243Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:29:45.585373Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 33,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:30:11.795395Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:30:11.795471Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 34,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:31:26.479516Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:31:26.480013Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 35,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T04:41:35.528452Z",
        "is_active": true,
        "updatedby": "2023-06-13T04:41:35.529472Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 36,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "5",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T10:50:37.553186Z",
        "is_active": true,
        "updatedby": "2023-06-13T10:50:37.553306Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 37,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "[hema,raja, naveena]",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-13T10:52:47.446287Z",
        "is_active": true,
        "updatedby": "2023-06-13T10:52:47.446365Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 38,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "5",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-16T11:50:15.407379Z",
        "is_active": true,
        "updatedby": "2023-06-16T11:50:15.407555Z",
        "isdeleted": false,
        "ischecked": "True"
      },
      {
        "id": 39,
        "emp_id_id": 857,
        "company_id": 280,
        "event_name": "Technical Interview",
        "event_type": "Teams interview",
        "location": null,
        "daterange": "10",
        "days": "calender days",
        "startdate": "12-05-2016",
        "enddate": "10-06-2016",
        "duration": "30 minutes",
        "times_zone": "10.50cms",
        "interviewer": "5",
        "times_zone_display": "best in person",
        "description": "bbjkvscvfvbdsfjkv",
        "created_at": "2023-06-16T11:51:56.640757Z",
        "is_active": true,
        "updatedby": "2023-06-16T11:51:56.641314Z",
        "isdeleted": false,
        "ischecked": "True"
      }
    ],
    "candidate": [
      {
        "candidate_id__candidate_id__firstname": "Bala",
        "candidate_id__candidate_id": 451,
        "candidate_id__email": "balamurali01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shreeja",
        "candidate_id__candidate_id": 452,
        "candidate_id__email": "26k-y7r-wcl@mail.dice.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shreeja",
        "candidate_id__candidate_id": 452,
        "candidate_id__email": "shreeja01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Satya",
        "candidate_id__candidate_id": 292,
        "candidate_id__email": "satyaroopa@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Marino",
        "candidate_id__candidate_id": 453,
        "candidate_id__email": "marina01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shreya",
        "candidate_id__candidate_id": 482,
        "candidate_id__email": "shreya01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shreeja",
        "candidate_id__candidate_id": 452,
        "candidate_id__email": "shreeja01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Anil",
        "candidate_id__candidate_id": 455,
        "candidate_id__email": "anil01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Ankit",
        "candidate_id__candidate_id": 456,
        "candidate_id__email": "ankita01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Ankur",
        "candidate_id__candidate_id": 457,
        "candidate_id__email": "ankur01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Rejina",
        "candidate_id__candidate_id": 458,
        "candidate_id__email": "ansh.khare2395@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "rahul01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Jhanvi",
        "candidate_id__candidate_id": 461,
        "candidate_id__email": "jhanvi01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Jhanvi",
        "candidate_id__candidate_id": 461,
        "candidate_id__email": "jhanvi01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "santha01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "@hotmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Raja",
        "candidate_id__candidate_id": 464,
        "candidate_id__email": "rajagopal.357@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Naga",
        "candidate_id__candidate_id": 466,
        "candidate_id__email": "naga01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shariq",
        "candidate_id__candidate_id": 467,
        "candidate_id__email": "shiraq01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Amar",
        "candidate_id__candidate_id": 479,
        "candidate_id__email": "amarsingh01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Anitha",
        "candidate_id__candidate_id": 481,
        "candidate_id__email": "anithasambath01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Narmadha",
        "candidate_id__candidate_id": 483,
        "candidate_id__email": "narmadha01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shivani",
        "candidate_id__candidate_id": 480,
        "candidate_id__email": "shivanidas@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Sneha",
        "candidate_id__candidate_id": 484,
        "candidate_id__email": "sneha01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Narmadha",
        "candidate_id__candidate_id": 483,
        "candidate_id__email": "narmadha01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "pmercy01@yahoo.com\r"
      },
      {
        "candidate_id__candidate_id__firstname": "ar",
        "candidate_id__candidate_id": 463,
        "candidate_id__email": "durgaprasadup39@yahoo.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": 462,
        "candidate_id__email": "harsh012@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "Prasanna.april@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "ankursingla91@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "deva01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "Brettbritharris@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": 462,
        "candidate_id__email": "harsh012@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Bala",
        "candidate_id__candidate_id": 451,
        "candidate_id__email": "balamurali01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "pmercy01@yahoo.com\r"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "Brionnamjuliana@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "Krishnachaitanyag920@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "Prasanna.april@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "radhika01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Anitha",
        "candidate_id__candidate_id": 481,
        "candidate_id__email": "anithasambath01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shariq",
        "candidate_id__candidate_id": 467,
        "candidate_id__email": "shiraq01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "santha01@yopmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": null,
        "candidate_id__candidate_id": null,
        "candidate_id__email": "akanksha.mitz07@gmail.com"
      },
      {
        "candidate_id__candidate_id__firstname": "Shreya",
        "candidate_id__candidate_id": 482,
        "candidate_id__email": "shreya01@yopmail.com"
      }
    ],
    "teammembers": [
      {
        "id": 316,
        "company_id": 206,
        "user_id": 898,
        "department_id": 22,
        "invited_at": "2022-03-11T09:21:10.741261Z",
        "created_at": "2022-03-11T09:21:10.741332Z",
        "updated_at": "2022-03-11T09:21:10.741392Z"
      }
    ]
  }
  
]

