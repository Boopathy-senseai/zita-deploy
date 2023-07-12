import { Key } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { AppDispatch } from '../../store';
import { Button, Flex, SelectTag, Text } from '../../uikit';
import { SvgCalendar } from '../../icons';
import RichText from '../common/RichText';
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

  const basic = `<p><span style="color: #212529; font-size: 16px; background-color: #ffffff;">Hello Team,</span><br style="box-sizing: border-box; margin: 0px; padding: 0px; color: #212529; font-size: 16px; background-color: #ffffff;" /><span style="color: #212529; font-size: 16px; background-color: #ffffff;">We would like to confirm your interview. Please find all the relevant details below.</span></p>
  <p>&nbsp;</p>
  <p style="box-sizing: border-box; padding: 0px; font-size: 16px; color: #212529;">Onsite interview&nbsp;on&nbsp;<span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: bolder;">Mon Jul 10 2023</span>&nbsp;from&nbsp;<span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: bolder;">12:30 pm</span>&nbsp;to&nbsp;<span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: bolder;">1:30 pm</span>&nbsp;with&nbsp;<span style="box-sizing: border-box; margin: 0px; padding: 0px; font-weight: bolder;">RahulS</span></p>
  <p>&nbsp;</p>
  <div style="box-sizing: border-box; margin: 5px 0px 0px; padding: 10px 0px 0px; outline: none; border-top: 1px solid #313131; color: #212529;">
  <div style="box-sizing: border-box; margin: 0px; padding: 0px; outline: none;">
  <p class="MeetingSummary_personHeader__wCnuX" style="box-sizing: border-box; padding: 0px; font-weight: bold; font-size: 16px;">Applicant</p>
  <p style="box-sizing: border-box; padding: 0px; font-size: 16px;">${meetingForm.applicant.name
    }</p>
  </div>
  <div style="box-sizing: border-box; margin: 0px; padding: 0px; outline: none;">
  <p class="MeetingSummary_personHeader__wCnuX" style="box-sizing: border-box; padding: 0px; font-weight: bold; font-size: 16px;">Interviewers</p>
  <div>
  ${meetingForm.interviewer.map((user, index) => (
      <p
        key={index}
        style={{ boxSizing: 'border-box', padding: ' 0px', fontSize: '16px' }}
      >{` ${user.firstName} ${user.lastName}, `}</p>
    ))}
  </div>
  </div>
  </div>`;

  const formik = useFormik({
    initialValues: {
      notes: meetingForm && meetingForm.notes ? meetingForm.notes : basic,
    },
    onSubmit: (data) => {
      if (editEventDetails) {
        handleUpdateEvent(data.notes);
      } else {
        handleScheduleEvent(data.notes);
      }
    },
  });

  const getMeetingTitle = () => {
    return `${meetingForm.eventType.value
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

  const handleUpdateEvent = (notes: any) => {
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
          notes: notes || meetingForm.notes,
          location: meetingForm.location.value,
        }),
      )
        .then((res) => {
          toast.success('Event Updated Successfully', {
            duration: 3500,
          });
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

  const handleScheduleEvent = (notes: any) => {
    const {
      startDateTime,
      endDateTime,
      eventType,
      location,
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
        notes: notes || meetingForm.notes,
        privateNotes: null,
      }),
    )
      .then((res) => {
        handleCloseSchedulingForm();
        toast.success('Event Scheduled Successfully', {
          duration: 3500,
        });
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
      <b>{currentUserLabel}</b>
    </p>
  );

  return (
    <>
      <div className={styles.meetingSummary}>
        <Flex row
        center
        style={{
          // padding: '25px 0px 0px',
          // margin: '0px 25px',
          borderBottom: '0.5px solid #581845',
        }}>
          <SvgCalendar width={18} height={18} style={{ marginBottom: '5px' }} />
          <Text size={16}
            bold
            color="theme"
            className={styles.formTitle}
            style={{ marginBottom: '5px' }}
          >Meeting Notification Summary</Text>

        </Flex>

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
              <RichText
                height={300}
                value={formik.values.notes}
                onChange={formik.handleChange('notes')}
                placeholder="Add your comments here..."
              />
              {/* <p>
                Hello Team,
                <br />
                We would like to confirm your interview. Please find all the
                relevant details below.
              </p> */}
              {/* <div className={styles.details}>
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
              </div> */}
            </div>
          </div>
        </div>
        <div className={styles.actionButtonWrapper}>
          <Button onClick={nextEvent} className={styles.cancel} types={'primary'}>Back</Button>
          {editEventDetails ? (
            <Button
              onClick={formik.submitForm} ///{handleUpdateEvent}
              className={styles.continueButton}
            >
              Update Invite
            </Button>
          ) : (
            <Button
              onClick={formik.submitForm} /// {handleScheduleEvent}
              className={styles.continueButton}
            >
              Send Invite
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default MeetingSummary;
