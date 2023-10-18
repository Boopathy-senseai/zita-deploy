import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Formik, useFormik } from 'formik';
import { momentLocalizer } from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import { SvgAddInterviewers, SvgCalendar } from '../../icons';
import SvgAdd from '../../icons/SvgAdd';
import { AppDispatch } from '../../store';
import {
  Button,
  Flex,
  InputSearch,
  InputText,
  Modal,
  SelectTag,
  Text,
} from '../../uikit';
import { getJdMiddleware } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { CrossButton } from '../../uikit/v2';
import { isEmpty } from '../../uikit/helper';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { THIS_FIELD_REQUIRED } from '../constValue';
import AddInterviewerSlider from './AddInterviewerSlider';
import InterviewerIcon from './InterviewerIcon';
import styles from './styles/createScheduleForm.module.css';
import {
  CALENDAR,
  CalendarEventType,
  EditEventDetails,
  EventMeetingType,
  GetJDResponse,
  GlobalZoneType,
  meetingFormProps,
  TeamMemberType,
  UserInfo,
  UserType,
} from './types';
import { formatTime, getNewDateTimes } from './util';

interface Props {
  meetingForm: meetingFormProps;
  applicants: UserType[];
  editEventDetails?: EditEventDetails | null;
  username: string;
  calendarProvider: CALENDAR | null;
  currentUserLabel: string;
  jd_id?: number;
  jd_name?: string;
  cand_id?: number;
  cand_name?: string;
  cand_email?: string;
  setMeetingForm: React.Dispatch<React.SetStateAction<meetingFormProps>>;
  setViewMeetingSummary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserLabel: React.Dispatch<React.SetStateAction<string>>;
  currentUserEvents: CalendarEventType[];
  teamMembers: TeamMemberType[];
  currentUser: UserInfo;
  handleCloseSchedulingForm: () => void;
  updateCurrentApplicantId: (applicantId: number) => void;
  setOpenScheduleForm: any;
  setopenmodel: any;
  openmodel: any;
  formik: any;
}

const MeetingSchedulingForm = ({
  meetingForm,
  applicants,
  editEventDetails,
  username,
  cand_name,
  currentUserLabel,
  jd_name,
  setMeetingForm,
  setViewMeetingSummary,
  setCurrentUserLabel,
  handleCloseSchedulingForm,
  currentUserEvents,
  teamMembers,
  cand_email,
  cand_id,
  jd_id,
  calendarProvider,
  updateCurrentApplicantId,
  currentUser,
  setOpenScheduleForm,
  setopenmodel,
  openmodel,
  formik,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [applicantJDList, setApplicantJDList] = useState([]);
  const [globalZones, setGlobalZones] = useState<GlobalZoneType[]>(null);
  const [openAddInterviewerModal, setOpenAddInterviewerModal] = useState(false);
  const [currentApplicantId, setCurrentApplicantId] = useState<number | null>(
    null,
  );
  const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();
  const [list, setlist] = useState('');
  const [errors, setErrors] = useState([]);

  const [names, setname] = useState<any>([]);

  const updatestate = (val) => {
    const interviewerExists = formik.values.interviewers.some(
      (item) => item.userId === val.userId,
    );
    if (!interviewerExists) {
      const newInterviewer = {
        firstName: val.firstName,
        lastName: val.lastName,
        role: '',
        userId: val.userId,
      };
      formik.setFieldValue('interviewers', [
        ...formik.values.interviewers,
        newInterviewer,
      ]);
      console.log('add');
    } else {
      const updatedInterviewers = formik.values.interviewers.filter(
        (item) => item.userId !== val.userId,
      );
      formik.setFieldValue('interviewers', updatedInterviewers);
      console.log('sub');
    }
  };

  useEffect(() => {
    localStorage.setItem('role', JSON.stringify(formik.values.interviewers));
  }, [formik.values]);

  const eventMeetingTypes: {
    value: EventMeetingType;
    label: EventMeetingType;
  }[] = [
    {
      value: 'Onsite interview',
      label: 'Onsite interview',
    },
    {
      value: 'Phone interview',
      label: 'Phone interview',
    },
  ];

  if (calendarProvider === CALENDAR.Google) {
    eventMeetingTypes.push({
      value: 'Google Meet interview',
      label: 'Google Meet interview',
    });
  } else if (calendarProvider === CALENDAR.Outlook) {
    eventMeetingTypes.push({
      value: 'Microsoft Teams interview',
      label: 'Microsoft Teams interview',
    });
  }

  useEffect(() => {
    updateCurrentApplicantId(currentApplicantId);
  }, [currentApplicantId]);

  useEffect(() => {
    const timezones = moment.tz.names();
    localStorage.setItem('remTime', 'mins');
    [
      'applicant',
      'applicant_id',
      'jd',
      'jd_id',
      'eDate',
      'timezone',
      'event_type',
      'notes',
      'privateNotes',
      'location',
      'interviewers',
      'remMin',
    ].forEach((item) => localStorage.removeItem(item));

    localStorage.setItem(
      'timezone',
      Intl.DateTimeFormat().resolvedOptions().timeZone,
    );
    localStorage.setItem('sDate', new Date().toString());
    localStorage.setItem('remMin', '15');

    if (editEventDetails) {
      setCurrentUserLabel(editEventDetails.applicant.name);
    } else if (cand_name && jd_name && cand_id && jd_id && cand_email) {
      setCurrentApplicantId(cand_id);
      setCurrentUserLabel(cand_name);
      setMeetingForm((form) => ({
        ...form,
        applicant: { ...form.applicant, email: cand_email },
        job: { ...form.job, label: jd_name, value: jd_id },
      }));
    }

    setGlobalZones(
      timezones.map((timezone) => {
        return { label: timezone, value: timezone };
      }),
    );
  }, []);

  const closeAddInterviewerSlider = () => {
    setOpenAddInterviewerModal(!openAddInterviewerModal);
  };

  const handleContinue = () => {
    const newErrors = formik.values.interviewers.map((item, idx) => {
      if (!item.role) {
        return 'Role is required';
      }
      return null;
    });
    setErrors(newErrors);

    if (localStorage.getItem('Applicantname') !== '') {
      localStorage.setItem(
        'Applicantsname',
        localStorage.getItem('Applicantname'),
      );
    }
    localStorage.setItem('Applicantname', '');
    localStorage.setItem('Jdname', '');
    localStorage.setItem('jdid', '');
    setMeetingForm((form) => {
      let jobError = !form.job.label ? true : false;
      let applicantError = !form.applicant.name ? true : false;
      let eventTypeError = !form.eventType.value ? true : false;
      let timeZoneError = !editEventDetails
        ? form.timeZone.value === null
          ? true
          : false
        : false;
      let dateError = form.date.value === null ? true : false;
      let locationError =
        form.eventType.value === 'Onsite interview' &&
        isEmpty(form.location.value)
          ? true
          : false;
      return {
        ...form,
        job: { ...form.job, error: jobError },
        location: { ...form.location, error: locationError },
        applicant: { ...form.applicant, error: applicantError },
        eventType: { ...form.eventType, error: eventTypeError },
        timeZone: { ...form.timeZone, error: timeZoneError },
        date: { ...form.date, error: dateError },
        startTime: {
          ...form.startTime,
          errorMessage: !form.startTime.value ? 'Start time is required' : null,
        },
        endTime: {
          ...form.endTime,
          errorMessage: !form.endTime.value ? 'End time is required' : null,
        },
      };
    });
    if (!newErrors.some((error) => error)) {
      if (editEventDetails) {
        if (
          meetingForm.eventType.value &&
          meetingForm.startTime.value &&
          meetingForm.date.value !== null &&
          meetingForm.endTime.value &&
          new Date(meetingForm.startTime.value) <
            new Date(meetingForm.endTime.value)
        ) {
          setMeetingForm((form) => {
            const { startDateTime, endDateTime } = getNewDateTimes(
              form.date.value,
              form.startTime.value,
              form.endTime.value,
            );
            return {
              ...form,
              startDateTime,
              endDateTime,
            };
          });
          console.log('openform', openmodel);
          setopenmodel(true);
        }
      } else {
        if (meetingForm.eventType.value === 'Onsite interview') {
          if (
            meetingForm.applicant.name &&
            meetingForm.job.label &&
            meetingForm.location.value &&
            meetingForm.eventType.value &&
            meetingForm.timeZone.value &&
            meetingForm.date.value !== null &&
            meetingForm.startTime.value &&
            meetingForm.endTime.value &&
            new Date(meetingForm.startTime.value) <
              new Date(meetingForm.endTime.value)
          ) {
            setMeetingForm((form) => {
              const { startDateTime, endDateTime } = getNewDateTimes(
                form.date.value,
                form.startTime.value,
                form.endTime.value,
              );
              return {
                ...form,
                startDateTime,
                endDateTime,
              };
            });
            console.log('openform1111', openmodel);
            setViewMeetingSummary(true);
            setopenmodel(true);
          }
        } else {
          if (
            meetingForm.applicant.name &&
            meetingForm.job.label &&
            meetingForm.eventType.value &&
            meetingForm.timeZone.value &&
            meetingForm.date.value !== null &&
            meetingForm.startTime.value &&
            meetingForm.endTime.value &&
            new Date(meetingForm.startTime.value) <
              new Date(meetingForm.endTime.value)
          ) {
            setMeetingForm((form) => {
              const { startDateTime, endDateTime } = getNewDateTimes(
                form.date.value,
                form.startTime.value,
                form.endTime.value,
              );
              return {
                ...form,
                startDateTime,
                endDateTime,
              };
            });
            console.log('openform2222', openmodel);
            setopenmodel(true);
            setViewMeetingSummary(true);
          }
        }
      }
    }
  };

  const handleJobRole = (value: number, label: string) => {
    localStorage.setItem('jd', label);
    localStorage.setItem('jd_id', value.toString());
    setMeetingForm((form) => ({
      ...form,
      job: { ...form.job, label, value, error: false },
    }));
  };

  const handleReminderFormat = (val: string) => {
    localStorage.setItem('remTime', val);
    setMeetingForm((form) => ({
      ...form,
      reminder: { ...form.reminder, format: val },
    }));
  };

  const handleReminderValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingForm((form) => ({
      ...form,
      reminder: { ...form.reminder, value: Number(e.target.value) },
    }));
    localStorage.setItem('remMin', e.target.value.toString());
  };

  const reminderOptions = [
    {
      value: 'mins',
      label: 'mins',
    },
    {
      value: 'hours',
      label: 'hours',
    },
  ];

  const handleEventType = (value: EventMeetingType) => {
    localStorage.setItem('event_type', value);
    let haveLocation = value === 'Onsite interview' ? true : false;
    setMeetingForm((form) => ({
      ...form,
      eventType: { ...form.eventType, value, error: false },
      location: { ...form.location, isHave: haveLocation },
    }));
  };
  const handleChangeDate = (value: Date | null) => {
    setMeetingForm((form) => ({
      ...form,
      date: { ...form.date, value, error: null },
    }));
  };

  const handleStartTime = (value: Date | null) => {
    if (
      meetingForm.endTime.value !== null &&
      meetingForm.endTime.value < value
    ) {
      setMeetingForm((form) => ({
        ...form,
        startTime: {
          ...form.startTime,
          value: null,
          errorMessage: 'Start time must be less then end time',
        },
      }));
    } else {
      setMeetingForm((form) => ({
        ...form,
        startTime: { ...form.startTime, value, errorMessage: null },
        endTime: { ...form.endTime, errorMessage: null },
      }));
    }

    if (value) {
      localStorage.setItem('startTime', value.toString());
    }
  };

  const handleEndTime = (value: Date | null) => {
    if (meetingForm.startTime.value === null) {
      setMeetingForm((form) => ({
        ...form,
        endTime: {
          ...form.endTime,
          value: null,
          errorMessage: 'Please choose start time first',
        },
      }));
    } else if (meetingForm.startTime.value > value) {
      setMeetingForm((form) => ({
        ...form,
        endTime: {
          ...form.endTime,
          value,
          errorMessage: 'End time must be greated than start time',
        },
      }));
    } else {
      setMeetingForm((form) => ({
        ...form,
        endTime: { ...form.endTime, value, errorMessage: null },
      }));
    }

    if (value) {
      localStorage.setItem('endTime', value.toString());
    }
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingForm((form) => ({
      ...form,
      location: { ...form.location, value: e.target.value, error: false },
    }));
    localStorage.setItem('location', e.target.value.toString());
  };

  const notesHandler = (e: { target: HTMLTextAreaElement }) => {
    setMeetingForm((form) => ({ ...form, notes: e.target.value }));
    localStorage.setItem('notes', e.target.value.toString());
  };

  const privateNotesHandler = (e: { target: HTMLTextAreaElement }) => {
    setMeetingForm((form) => ({ ...form, privateNotes: e.target.value }));
    localStorage.setItem('privateNotes', e.target.value.toString());
  };

  const addTeamInterviewer = (memberInfo: TeamMemberType) => {
    if (!meetingForm.interviewer.includes(memberInfo)) {
      setMeetingForm((form) => ({
        ...form,
        interviewer: [...form.interviewer, memberInfo],
      }));
    }
  };

  const removeTeamInterviewer = (memberInfo: TeamMemberType) => {
    setMeetingForm((form) => ({
      ...form,
      interviewer: form.interviewer.filter(
        (item) => item.email !== memberInfo.email,
      ),
    }));
  };

  const handleSelectApplicant = (
    applicantId: number,
    label: string,
    email: string,
  ) => {
    setCurrentApplicantId(applicantId);
    setCurrentUserLabel(label);
    setMeetingForm((form) => ({
      ...form,
      applicant: { id: applicantId, name: label, email, error: false },
      job: { ...form.job, value: null, label: null },
    }));
    localStorage.setItem('applicant', label);
    localStorage.setItem('applicant_id', applicantId.toString());

    dispatch(getJdMiddleware({ userId: applicantId }))
      .then((res) => {
        setApplicantJDList(
          res.payload.jd.map((items: GetJDResponse) => {
            return { value: items.id, label: items.jobTitle };
          }),
        );
      })
      .catch((err) => {
        console.error(err, currentApplicantId);
      });
  };

  const handleChangeTimeZone = (timezone: string) => {
    moment.tz.setDefault(timezone);
    momentLocalizer(moment);
    setMeetingForm((form) => ({
      ...form,
      timeZone: { value: timezone, error: false },
    }));
    localStorage.setItem('timezone', timezone);
  };

  const ApplicantView = (
    <div>
      <label className={styles.label}>Applicant*</label>
      {editEventDetails || cand_name ? (
        <div>
          <InputText
            disabled={true}
            value={editEventDetails ? currentUserLabel : cand_name}
          />
        </div>
      ) : meetingForm.applicant.name ? (
        <SelectTag
          value={{
            label: meetingForm.applicant.name,
            value: meetingForm.applicant.id,
          }}
          isSearchable={true}
          labelBold
          onChange={(option) =>
            handleSelectApplicant(option.value, option.label, option.email)
          }
          options={applicants}
        />
      ) : (
        <SelectTag
          placeholder="Select Applicant"
          isSearchable={true}
          labelBold
          options={applicants}
          onChange={(option) =>
            handleSelectApplicant(option.value, option.label, option.email)
          }
        />
      )}
      {meetingForm.applicant.error && (
        <p className={styles.warn}>This field is required.</p>
      )}
    </div>
  );

  const JobTitleView = (
    <div>
      <label className={styles.label}>Job Title * </label>
      <div>
        {editEventDetails || jd_name ? (
          <div>
            <InputText
              disabled={true}
              value={editEventDetails ? meetingForm.job.label : jd_name}
            />
          </div>
        ) : (
          <div>
            {meetingForm.job.value ? (
              <SelectTag
                defaultValue={{
                  label: meetingForm.job.label,
                  value: meetingForm.job.value,
                }}
                isSearchable={true}
                labelBold
                onChange={(option) => handleJobRole(option.value, option.label)}
                options={applicantJDList}
              />
            ) : (
              <SelectTag
                placeholder="Select Job"
                isSearchable={true}
                labelBold
                onChange={(option) => handleJobRole(option.value, option.label)}
                options={applicantJDList}
              />
            )}
          </div>
        )}
        {meetingForm.job.error && (
          <p className={styles.warn}>This field is required.</p>
        )}
      </div>
    </div>
  );

  const DateView = (
    <div className={styles.dateview}>
      <label className={styles.label} style={{ marginBottom: '5px' }}>
        Date *
      </label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={' '}
          value={meetingForm.date.value}
          onChange={handleChangeDate}
          renderInput={(params) => (
            <TextField {...params} style={{ width: 'auto !important' }} />
          )}
        />
      </LocalizationProvider>
      {meetingForm.date.error && (
        <p className={styles.warn}>This field is required.</p>
      )}
    </div>
  );

  const TimingView = (
    <div>
      <label className={styles.label}>Time *</label>
      <Flex>
        <Flex>
          <div className={styles.timeInputWrapper}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={meetingForm.startTime.value}
                  onChange={handleStartTime}
                  renderInput={(params) => <TextField {...params} />}
                  className={styles.timeInput}
                />
              </LocalizationProvider>
              {meetingForm.startTime.errorMessage !==
                'Start time must be less then end time' && (
                <>
                  <p className={styles.warn} style={{ marginTop: '3px' }}>
                    {meetingForm.startTime.errorMessage}
                  </p>
                </>
              )}
            </div>
            <p
              className={styles.to}
              style={{
                fontSize: '13px',
                marginBottom:
                  meetingForm.startTime.errorMessage ||
                  meetingForm.endTime.errorMessage
                    ? '10px'
                    : 0,
              }}
            >
              to
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  value={meetingForm.endTime.value}
                  onChange={handleEndTime}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {meetingForm.endTime.errorMessage !==
                'End time must be greated than start time' && (
                <>
                  <p className={styles.warn} style={{ marginTop: '3px' }}>
                    {meetingForm.endTime.errorMessage}
                  </p>
                </>
              )}
            </div>
          </div>
        </Flex>
        <Flex>
          {meetingForm.startTime.errorMessage ===
            'Start time must be less then end time' && (
            <>
              <p className={styles.warn} style={{ marginTop: '12px' }}>
                {meetingForm.startTime.errorMessage}
              </p>
            </>
          )}
          {meetingForm.endTime.errorMessage ===
            'End time must be greated than start time' && (
            <>
              <p className={styles.warn} style={{ marginTop: '12px' }}>
                {meetingForm.endTime.errorMessage}
              </p>
            </>
          )}
        </Flex>
      </Flex>
    </div>
  );

  const TimeZoneView = () => {
    const value = meetingForm.timeZone.value
      ? meetingForm.timeZone.value
      : Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
      <div>
        <label className={styles.label}>Choose your Timezone</label>
        <SelectTag
          defaultValue={{
            label: value,
            value,
          }}
          isSearchable={true}
          labelBold
          options={globalZones}
          onChange={(option) => handleChangeTimeZone(option.value)}
        />
        {meetingForm.timeZone.error && (
          <p className={styles.warn}>Select a timezone</p>
        )}
      </div>
    );
  };
  const EventTypeView = (
    <div>
      <label className={styles.label}>Event Type *</label>
      {editEventDetails ? (
        <SelectTag
          defaultValue={{
            label: editEventDetails.eventType,
            value: editEventDetails.eventType,
          }}
          value={eventMeetingTypes.find(function (option) {
            return option.value === meetingForm.eventType.value;
          })}
          labelBold
          options={eventMeetingTypes}
          onChange={(option) => handleEventType(option.value)}
        />
      ) : (
        <SelectTag
          labelBold
          value={eventMeetingTypes.find(function (option) {
            return option.value === meetingForm.eventType.value;
          })}
          options={eventMeetingTypes}
          onChange={(option) => handleEventType(option.value)}
        />
      )}
      {meetingForm.eventType.error && (
        <p className={styles.warn}>This field is required.</p>
      )}
    </div>
  );

  const RemindarView = (
    <div className={styles.reminder}>
      <label className={styles.label}>Reminder</label>
      <div>
        <InputText
          keyboardType="number"
          value={meetingForm.reminder.value.toString()}
          onChange={handleReminderValue}
        />
        <div style={{ marginLeft: '10px', width: '100px', flex: 1 }}>
          <SelectTag
            labelBold
            options={reminderOptions}
            defaultValue={{
              label: meetingForm.reminder.format,
              value: meetingForm.reminder.format,
            }}
            onChange={(option) => handleReminderFormat(option.value)}
          />
        </div>
      </div>
    </div>
  );
  const data = [
    'Software Developer',
    'System Administrator',
    'Database Administrator',
    'Network Engineer',
    'IT Support Specialist',
    'Security Analyst',
    'Cloud Architect',
    'DevOps Engineer',
    'Front-end Developer',
    'Back-end Developer',
    'Full-stack Developer',
    'QA Engineer',
    'Mobile App Developer',
    'Web Developer',
    'Data Scientist',
    'Machine Learning Engineer',
    'IT Project Manager',
    'Business Analyst',
    'UI/UX Designer',
    'Application Support Analyst',
    'Technical Writer',
    'IT Manager',
    'CTO',
    'CIO',
    'Help Desk Technician',
    'System Architect',
    'Network Administrator',
    'IT Consultant',
    'SEO Specialist',
    'Data Analyst',
    'ERP Specialist',
    'CRM Developer',
    'Embedded Systems Engineer',
    'Cybersecurity Specialist',
    'Game Developer',
    'Hardware Engineer',
    'IT Auditor',
    'Infrastructure Engineer',
    'IT Coordinator',
    'IT Sales Representative',
    'IT Trainer',
    'Java Developer',
    'JavaScript Developer',
    'PHP Developer',
    'Python Developer',
    'Ruby Developer',
    'Solutions Architect',
    'Technical Support Engineer',
    'Virtualization Engineer',
    'Web Designer',
    'Wireless Communication Engineer',
    'IoT Developer',
    'AI Specialist',
    'Blockchain Developer',
    'Cloud Solutions Developer',
    'Digital Transformation Consultant',
    'E-commerce Specialist',
    'Network Security Specialist',
    'RPA Developer',
    'SaaS Developer',
    'Virtual Reality Developer',
  ];

  const handleChange = (ind, e) => {
    const updatedRole = e.target.value;
    let updatedNames = [...formik.values.interviewers];
    updatedNames[ind].role = updatedRole;

    // setname(updatedNames);
    formik.setFieldValue('interviewers', updatedNames);

    localStorage.setItem('role', JSON.stringify(formik.values.interviewers));
    onDirty();
  };
  const localString = localStorage.getItem('role');
  const local = localString ? JSON.parse(localString) : [];

  const AddInterviewerView = (
    <div className={styles.notes1}>
      <label
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '5px',
          marginTop: '10px',
        }}
      >
        <Text bold size={13}>
          Interviewers
        </Text>

        <Flex
          row
          center
          onClick={closeAddInterviewerSlider}
          style={{ cursor: 'pointer' }}
        >
          <SvgAdd width={10} height={10} fill="#581854" />
          <Text bold style={{ padding: '0 0 0 5px' }} color="link">
            Add Interviewers
          </Text>
        </Flex>
      </label>
      <div
        style={{ borderBottom: '0.5px solid #581845', marginBottom: '10px' }}
      ></div>

      {formik.values.interviewers.length > 0 &&
        formik.values.interviewers.map((user, index) => (
          <div
            key={index}
            className={styles.notes2}
            style={{
              marginBottom:
                index !== formik.values.interviewers.length - 1
                  ? '10px'
                  : '0px',
            }}
          >
            <InputText
              label="Interviewer Name"
              required
              value={`${user.firstName} ${user.lastName}`}
              disabled
            />
            <Flex>
              <InputSearch
                options={data}
                setFieldValue={formik.setFieldValue}
                required
                name={`interviewers[${index}].role`}
                label="Role"
                initialValue={formik.values.interviewers[index]?.role}
                onChange={(e) => handleChange(index, e)}
              />
              {local[index] && local[index].role === '' && errors[index] && (
                <div className={styles.warn}>{errors[index]}</div>
              )}
            </Flex>
          </div>
        ))}

      <>
        {openAddInterviewerModal && (
          <AddInterviewerSlider
            currentUserEvents={currentUserEvents}
            currentUser={currentUser}
            removeTeamInterviewer={removeTeamInterviewer}
            addTeamInterviewer={addTeamInterviewer}
            teamMembers={teamMembers}
            userLabel={currentUserLabel}
            jd={meetingForm.job.label}
            username={username}
            setlist={setlist}
            openAddInterviewerModal={openAddInterviewerModal}
            closeAddInterviewerSlider={closeAddInterviewerSlider}
            selectedInterviewers={meetingForm.interviewer}
            updatestate={updatestate}
          />
        )}
      </>
    </div>
  );

  const LocationView = (
    <>
      {meetingForm.location.isHave ||
      (editEventDetails &&
        editEventDetails?.eventType === 'Onsite interview') ? (
        <div className={styles.location}>
          <label className={styles.label}>Location*</label>
          {editEventDetails &&
          editEventDetails?.eventType === 'Onsite interview' ? (
            <InputText
              value={editEventDetails?.location}
              textarea={true}
              onChange={handleLocation}
              style={{ height: '50px' }}
              className={styles.location}
              placeholder="Add Location"
              required
            />
          ) : (
            <InputText
              value={meetingForm.location.value}
              textarea={true}
              onChange={handleLocation}
              style={{ height: '50px' }}
              className={styles.location}
              placeholder="Add Location"
              required
            />
          )}
          {meetingForm.location.error && (
            <p className={styles.warn}>This field is required.</p>
          )}
        </div>
      ) : null}
    </>
  );

  const NotesView = (
    <div className={styles.notes}>
      <label
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '7px',
        }}
      >
        <p style={{ color: '#581845', fontSize: '13px' }}>Notes</p>
        <p style={{ fontSize: '13px' }}>Visible to candidates</p>
      </label>
      <InputText
        value={meetingForm.notes}
        textarea={true}
        placeholder="Add a note"
        onChange={notesHandler}
        style={{ height: '50px' }}
      />
    </div>
  );

  const PrivateNotesView = (
    <div className={styles.notes}>
      <label
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '7px',
        }}
      >
        <p style={{ color: '#581845', fontSize: '13px' }}>Private Notes</p>
      </label>
      <InputText
        value={meetingForm.privateNotes}
        textarea={true}
        placeholder="Add a note, visible only to the team members"
        onChange={privateNotesHandler}
        style={{ height: '50px' }}
      />
    </div>
  );

  const ActionButtonView = (
    <div
      className={styles.actionButtonWrapper}
      style={{ borderTop: '1px solid #c3c3c3' }}
    >
      <div className={styles.buttonContainer}>
        <button
          onClick={handleCloseSchedulingForm}
          className={styles.cancelButton}
        >
          Cancel
        </button>
      </div>
      <div>
        <Button onClick={handleContinue} className={styles.continueButton}>
          Continue
        </Button>
      </div>
    </div>
  );

  const DurationView = () => {
    const { startTime, endTime } = meetingForm;
    if (
      startTime.value &&
      !startTime.errorMessage &&
      endTime.value &&
      !endTime.errorMessage
    ) {
      const timeDifference = Math.round(
        (meetingForm.endTime.value.getTime() -
          meetingForm.startTime.value.getTime()) /
          60000,
      );

      return (
        <div className={styles.duration}>
          <p
            style={{ marginBottom: '4px', color: '#581845', fontSize: '13px' }}
          >
            Duration
          </p>
          <p>{formatTime(timeDifference)}</p>
        </div>
      );
    }
    return (
      <div className={styles.duration}>
        <p style={{ marginBottom: '4px', color: '#581845', fontSize: '13px' }}>
          Duration
        </p>
        <p style={{ fontSize: '13px' }}>00 : 00</p>
      </div>
    );
  };

  // const FormTitle = (
  //   <Flex row center>
  //     <SvgCalendar width={16} height={16}/>
  //     <Text size={16} bold color="theme"  className={styles.formTitle}>
  //       Schedule Meeting
  //     </Text>
  //   </Flex>
  // );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'unset',
      }}
    >
      {/* <CrossButton
        onClick={handleCloseSchedulingForm}
        size={10}
        style={{ position: 'absolute', top: '12px', right: '15px' }}
        fill={'#333'}
      /> */}
      <Flex
        row
        center
        style={{
          position: 'relative',
          padding: '25px 0px 0px',
          margin: '0px 25px',
          borderBottom: '0.5px solid #581845',
        }}
      >
        <SvgCalendar
          width={18}
          height={18}
          style={{ marginBottom: '5px' }}
          fill={'#333'}
          stroke={'#333'}
        />
        <Text
          size={14}
          bold
          // color="theme"
          className={styles.formTitle}
          style={{ marginBottom: '5px' }}
        >
          Schedule Events
        </Text>
      </Flex>
      <div className={styles.meetingForm}>
        {/* {FormTitle} */}
        {ApplicantView}
        {JobTitleView}
        {DateView}
        {TimingView}
        {<DurationView />}
        {<TimeZoneView />}
        {EventTypeView}
        {RemindarView}
        {AddInterviewerView}
        {LocationView}
        {NotesView}
        {PrivateNotesView}
      </div>
      <Flex style={{ padding: '0px 25px 25px 25px' }}>{ActionButtonView}</Flex>
    </div>
  );
};

export default MeetingSchedulingForm;
