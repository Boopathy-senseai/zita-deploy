import { Key } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AppDispatch } from '../../store';
import { SelectTag } from '../../uikit';
import {
  scheduleEventMiddleware,
  updateEventMiddleware,
} from './store/middleware/calendarmiddleware';
import styles from './styles/MeetingSummary.module.css';
import { EditEventDetails, meetingFormProps, UserType } from './types';
import { formatTo12HrClock } from './util';

interface Props {
  meetingForm: meetingFormProps;
  applicants: any[];
  currentUserLabel: string;
  editEventDetails?: EditEventDetails | null;
  username: string;
  eventId?: string | null;
  extraNotes: string;
  currentApplicantId: number;
  setIsTopLineLoading: React.Dispatch<React.SetStateAction<boolean>>;
  nextEvent: () => void;
  handleCloseSchedulingForm: () => void;
}

const MeetingSummary = ({
  handleCloseSchedulingForm,
  applicants,
  meetingForm,
  currentUserLabel,
  editEventDetails,
  username,
  nextEvent,
  eventId,
  extraNotes,
  currentApplicantId,
  setIsTopLineLoading,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const getMeetingTitle = () => {
    return `${
      meetingForm.eventType.value
    } on ${meetingForm.startDateTime.toDateString()} from ${formatTo12HrClock(
      meetingForm.startDateTime,
    )} to ${formatTo12HrClock(
      meetingForm.endDateTime,
    )} with ${currentUserLabel}`;
  };

  const getReminder = () => {
    if (meetingForm.reminder.format === 'hours') {
      return meetingForm.reminder.value * 60;
    }
    return meetingForm.reminder.value;
  };

  const handleUpdateEvent = () => {
    if (editEventDetails) {
      let edit_jd = editEventDetails.jobRole.value;
      let app_id = editEventDetails.applicant.id;

      setIsTopLineLoading(true);
      dispatch(
        updateEventMiddleware({
          title: getMeetingTitle(),
          reminder: getReminder(),
          app_id: String(app_id),
          extraNotes,
          myJd: meetingForm.job.label,
          eventId,
          privateNotes: null,
          eventType: meetingForm.eventType.value,
          edit_jd,
          curJd: meetingForm.job.value,
          timeZone: meetingForm.timeZone.value,
          interviewer: meetingForm.interviewer.map((member) => ({
            email: member.email,
            calendarEmail: member.calendarEmail,
          })),
          startTime: meetingForm.startDateTime,
          endTime: meetingForm.endDateTime,
          notes: meetingForm.notes,
          location: meetingForm.location.value,
        }),
      )
        .then((res) => {
          toast.success('Event Updated Successfully', {
            duration: 3500,
          });
          localStorage.setItem('Applicantsname','')
          handleCloseSchedulingForm();
        })
        .catch((err) => {
          toast.error('Failed to Update Event', {
            duration: 3500,
          });
          console.error(err);
        })
        .finally(() => {
          setIsTopLineLoading(false);
        });
    }
  };

  const handleScheduleEvent = () => {
    const {
      startDateTime,
      endDateTime,
      eventType,
      location,
      notes,
      job,
      timeZone,
      interviewer,
    } = meetingForm;

    setIsTopLineLoading(true);
    dispatch(
      scheduleEventMiddleware({
        title: getMeetingTitle(),
        applicantId: currentApplicantId,
        myJd: job.label,
        reminder: getReminder(),
        extraNotes,
        eventType: eventType.value,
        curJd: job.value,
        timeZone: timeZone.value,
        interviewer: interviewer.map((member) => ({
          email: member.email,
          calendarEmail: member.calendarEmail,
        })),
        startTime: startDateTime,
        endTime: endDateTime,
        location: location.value,
        notes,
        privateNotes: null,
      }),
    )
      .then((res) => {
        handleCloseSchedulingForm();
        toast.success('Event Scheduled Successfully', {
          duration: 3500, 
        });
        localStorage.setItem('Applicantsname','')
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to Schedule Event', {
          duration: 3500,
        });
      })
      .finally(() => {
        setIsTopLineLoading(false);
      });
  };

  const email =
    applicants.filter(
      (applicant) => applicant.value === Number(meetingForm.applicant.id),
    )[0]?.email || null;

  const MeetingTitleView = (
    <p>
      {meetingForm.eventType.value} on{' '}
      <b>{meetingForm.startDateTime.toDateString()}</b> from{' '}
      <b>{formatTo12HrClock(meetingForm.startDateTime)}</b> to{' '}
      <b>{formatTo12HrClock(meetingForm.endDateTime)}</b> with{' '}
      <b>{localStorage.getItem('Applicantsname') !==''?localStorage.getItem('Applicantsname'):currentUserLabel}</b>
    </p>
  );

  return (
    <>
      <div className={styles.meetingSummary}>
        <h4 className={styles.formTitle}>Meeting Notification Summary</h4>
        <div className={styles.summary}>
          <p className={styles.header}>Summary</p>
          <div className={styles.content}>{MeetingTitleView}</div>
        </div>
        <div className={styles.notification}>
          <p className={styles.header}>Email Notification</p>
          <div className={styles.emailContainer}>
            <div className={styles.emails}>
              <p>To &nbsp;</p>
              <div>
                {email && <div className={styles.email}>{email}</div>}
                {meetingForm.interviewer.map((interview, index: Key) => (
                  <div key={index} className={styles.email}>
                    {interview.calendarEmail
                      ? interview.calendarEmail
                      : interview.email}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.subject}>
              {MeetingTitleView}
              <br />
              <p>
                Hello Team,
                <br />
                We would like to confirm your interview. Please find all the
                relevant details below.
              </p>
              <div className={styles.details}>
                {MeetingTitleView}
                <div>
                  <div>
                    <p className={styles.personHeader}>Applicant</p>
                    <p>{meetingForm.applicant.name}</p>
                  </div>
                  <div>
                    <p className={styles.personHeader}>Interviewers</p>
                    <div className={styles.interviewers}>
                      {meetingForm.interviewer.map((user, index) => (
                        <p
                          key={index}
                        >{` ${user.firstName} ${user.lastName}, `}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actionButtonWrapper}>
          <button onClick={nextEvent}>Back</button>
          {editEventDetails ? (
            <button
              onClick={handleUpdateEvent}
              className={styles.continueButton}
            >
              Update Invite
            </button>
          ) : (
            <button
              onClick={handleScheduleEvent}
              className={styles.continueButton}
            >
              Send Invite
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MeetingSummary;
