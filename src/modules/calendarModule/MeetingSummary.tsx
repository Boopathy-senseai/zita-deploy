import { Key, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { AppDispatch } from '../../store';
import { InputText, Button, Flex, SelectTag, Text } from '../../uikit';
import { SvgCalendar, SvgEdit } from '../../icons';
import RichText from '../common/RichText';
import ExpandTile from '../../uikit/ExpandTile';
import {
  scheduleEventMiddleware,
  updateEventMiddleware,
} from './store/middleware/calendarmiddleware';
import styles from './styles/MeetingSummary.module.css';
import { EditEventDetails, meetingFormProps, UserType } from './types';
import { formatTo12HrClock } from './util';
import EmailTemplate from './EmailTemplate';

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
  const [tileState, setTileState] = useState<{
    applicant: boolean;
    interviewer: boolean;
  }>({
    applicant: true,
    interviewer: false,
  });
  const [applicantGreeting, setApplicantGreeting] = useState(`Hello ${
    meetingForm?.applicant?.name || ''
  }, 
  We'd like to confirm your interview. Please find all the relevant details below.`);
  const [interviewGreeting, setInterviewGreeting] = useState(`Hello Team,
  We'd like to confirm your interview. Please find all the relevant details below.`);

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
          privateNotes: meetingForm.privateNotes,
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
      job,
      timeZone,
      interviewer,
      notes,
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
        notes: notes,
        privateNotes: meetingForm.privateNotes,
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

  const applicantEmail =
    applicants.filter(
      (applicant) => applicant.value === Number(meetingForm.applicant.id),
    )[0]?.email || null;

  const interviewerEmail =
    meetingForm?.interviewer.map((doc) => doc.email) || null;

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
        <Flex
          row
          center
          style={{
            // padding: '25px 0px 0px',
            // margin: '0px 25px',
            borderBottom: '0.5px solid #581845',
            marginBottom: 10,
          }}
        >
          <SvgCalendar width={18} height={18} style={{ marginBottom: '5px' }} />
          <Text
            size={16}
            bold
            color="theme"
            className={styles.formTitle}
            style={{ marginBottom: '5px' }}
          >
            Meeting Notification Summary
          </Text>
        </Flex>
        <Flex column style={{ paddingBottom: 10, borderBottom: "1px solid #cccccc"}}>
          <div className={styles.summary}>
            <p className={styles.header}>Summary</p>
            <div className={styles.content}>{MeetingTitleView}</div>
          </div>
          <ExpandTile
            backgroundColor="#58184530"
            activeColor="#000000"
            title={'Email Notification to Applicant'}
            show={tileState?.applicant}
            onClick={() =>
              setTileState({ ...tileState, applicant: !tileState.applicant })
            }
          >
            <EmailTemplate
              {...meetingForm}
              currentUserLabel={currentUserLabel}
              greetingText={applicantGreeting}
              email={applicantEmail}
              interviewerData={meetingForm?.interviewer}
              onSave={(value) => {
                /// save this text to some field
                setApplicantGreeting(value);
              }}
              editGreeting={true}
            />
          </ExpandTile>

          {meetingForm.interviewer.length !== 0 && (
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={'Email Notification to Interviewer'}
              show={tileState?.interviewer}
              onClick={() =>
                setTileState({
                  ...tileState,
                  interviewer: !tileState.interviewer,
                })
              }
            >
              <EmailTemplate
                {...meetingForm}
                currentUserLabel={currentUserLabel}
                greetingText={interviewGreeting}
                email={meetingForm.interviewer.map((interview, index: Key) =>
                  interview.calendarEmail
                    ? interview.calendarEmail
                    : interview.email,
                )}
                notes={meetingForm.privateNotes}
                applicantInfo={meetingForm.applicant}
                onSave={(value) => {
                  /// save this text to some field
                  setInterviewGreeting(value);
                }}
              />
            </ExpandTile>
          )}
        </Flex>
        <div className={styles.actionButtonWrapper}>
          <Button
            onClick={nextEvent}
            className={styles.cancel}
            types={'primary'}
          >
            Back
          </Button>
          {editEventDetails ? (
            <Button
              onClick={handleUpdateEvent}
              className={styles.continueButton}
            >
              Update Invite
            </Button>
          ) : (
            <Button
              onClick={handleScheduleEvent}
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
