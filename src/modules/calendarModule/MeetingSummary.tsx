import { Key, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { AppDispatch } from '../../store';
import { InputText, Button, Flex, SelectTag, Text } from '../../uikit';
import { SvgCalendar, SvgEdit } from '../../icons';
import RichText from '../common/RichText';
import ExpandTile from '../../uikit/ExpandTile';
import { CrossButton } from '../../uikit/v2';
import {
  getUpdateEventByIdMiddleWare,
  scheduleEventMiddleware,
  updateEventMiddleware,
} from './store/middleware/calendarmiddleware';
import styles from './styles/MeetingSummary.module.css';
import {
  EditEventDetails,
  meetingFormProps,
  UserType,
} from './types';
import { formatTo12HrClock } from './util';
import EmailTemplate from './EmailTemplate';

interface Props {
  meetingForm: meetingFormProps;
  applicants: any[];
  currentUserLabel: string;
  editEventDetails?: EditEventDetails | null;
  username: string;
  eventId?: string | null;
  recurringEventId?: string | null;
  // extraNotes: string;
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
  recurringEventId,
  // extraNotes,
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
  const [greetings, setGreetings] = useState<{
    applicant: string;
    interviewer: string;
  }>({
    applicant: `Hello ${meetingForm?.applicant?.name || ''}, 
    We'd like to confirm your interview. Please find all the relevant details below.`,
    interviewer: `Hello Team,
    We'd like to confirm your interview. Please find all the relevant details below.`,
  });

  useEffect(() => {
    if (recurringEventId) {
      dispatch(getUpdateEventByIdMiddleWare({ event_id: recurringEventId })).then(
        (res) => {
          if (res.payload) {
            const array = res.payload as Array<{
              [key: string]: string | null;
            }>;
            const applicant = array[0] ? array[0]['extra_notes'] : undefined;
            const interviewer = array[1] ? array[1]['interviewer_notes'] : undefined;

            setGreetings(prev => ({ applicant: applicant || prev.applicant, interviewer: interviewer || prev.interviewer }));
          }
        },
      );
    }
  }, []);

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
          extraNotes: greetings.applicant,
          interviewer_notes: greetings.interviewer,
          myJd: meetingForm.job.label,
          eventId: recurringEventId,
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
        extraNotes: greetings.applicant,
        interviewer_notes: greetings.interviewer,
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
      <b>{localStorage.getItem('Applicantsname') !==''?localStorage.getItem('Applicantsname'):currentUserLabel}</b>
    </p>
  );

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
    >
      <CrossButton
        onClick={handleCloseSchedulingForm}
        size={10}
        style={{ position: 'absolute', top: '12px', right: '15px' }}
        fill={'#333'}
      />
      <div style={{ padding: '25px' }}>
        <Flex
          row
          center
          style={{
            position: 'relative',
            // padding: '25px 0px 0px',
            // margin: '0px 25px',
            borderBottom: '0.5px solid #581845',
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
        <Flex
          className={styles.meetingSummary}
          column
          style={{
            paddingBottom: 10,
            // borderBottom: '1px solid #cccccc',
            overflow: 'auto',
            // maxHeight: '90vh',
          }}
        >
          <div className={styles.summary}>
            <p className={styles.header} style={{ marginTop: '5px' }}>
              Summary
            </p>
            <div className={styles.content}>{MeetingTitleView}</div>
          </div>
          <ExpandTile
            backgroundColor="#58184530"
            activeColor="#000000"
            title={'Email notification to Applicant'}
            show={tileState?.applicant}
            onClick={() =>
              setTileState({ ...tileState, applicant: !tileState.applicant })
            }
          >
            <EmailTemplate
              {...meetingForm}
              currentUserLabel={currentUserLabel}
              greetingText={greetings.applicant}
              email={applicantEmail}
              interviewerData={meetingForm?.interviewer}
              onSave={(value) => {
                /// save this text to some field
                setGreetings((prev) => ({ ...prev, applicant: value }));
              }}
              editGreeting={true}
            />
          </ExpandTile>

          {meetingForm.interviewer.length !== 0 && (
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={'Email notification to interviewer'}
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
                greetingText={greetings.interviewer}
                email={meetingForm.interviewer.map((interview, index: Key) =>
                  interview.calendarEmail
                    ? interview.calendarEmail
                    : interview.email,
                )}
                notes={meetingForm.privateNotes}
                applicantInfo={meetingForm.applicant}
                onSave={(value) => {
                  /// save this text to some field
                  setGreetings((prev) => ({ ...prev, interviewer: value }));
                }}
                editGreeting={true}
              />
            </ExpandTile>
          )}
        </Flex>
        <div
          className={styles.actionButtonWrapper}
          style={{ borderTop: '1px solid #c3c3c3' }}
        >
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
    </div>
  );
};

export default MeetingSummary;
