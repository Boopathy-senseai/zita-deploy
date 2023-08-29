import { Key, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { AppDispatch } from '../../store';
import {
  InputText,
  Button,
  Flex,
  SelectTag,
  Text,
  Toast,
  Loader,
} from '../../uikit';
import { SvgCalendar, SvgCalendar1, SvgEdit } from '../../icons';
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
  IEventNotes,
  meetingFormProps,
  UserType,
} from './types';
import { formatTo12HrClock } from './util';
import EmailTemplate from './EmailTemplate';
// import { Toast } from 'react-bootstrap';

interface Props {
  meetingForm: meetingFormProps;
  applicants: any[];
  currentUserLabel: string;
  editEventDetails?: EditEventDetails | null;
  username: string;
  EventId?: any;
  eventId?: any;
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
  EventId,
  eventId,
  recurringEventId,
  // extraNotes,
  currentApplicantId,
  setIsTopLineLoading,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isloading, setIsloading] = useState(false);
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
      dispatch(
        getUpdateEventByIdMiddleWare({ event_id: recurringEventId }),
      ).then((res) => {
        if (res.payload) {
          // const array = res.payload as Array<{
          //   [key: string]: string | null;
          // }>;
          // console.log(array['interviewer_notes'])
          const obj = res.payload as IEventNotes;
          // const applicant = array[0] ? array[0]['extra_notes'] : undefined;
          // const interviewer = array[1] ? array[1]['interviewer_notes'] : undefined;
          const applicant = obj.extra_notes || undefined;
          const interviewer = obj.interview_notes || undefined;
          setGreetings((prev) => ({
            applicant: applicant || prev.applicant,
            interviewer: interviewer || prev.interviewer,
          }));
        }
      });
    }
  }, []);

  const getMeetingTitle = () => {
    return `${
      meetingForm.eventType.value
    } on ${meetingForm.startDateTime.toDateString()} from ${formatTo12HrClock(
      meetingForm.startDateTime,
    )} to ${formatTo12HrClock(meetingForm.endDateTime)} with 
    ${
      localStorage.getItem('Applicantsname') !== '' &&
      localStorage.getItem('Applicantsname') !== null
        ? localStorage.getItem('Applicantsname')
        : currentUserLabel
    }`;
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
      setIsloading(true);
      // setIsTopLineLoading(true);
      dispatch(
        updateEventMiddleware({
          title: getMeetingTitle(),
          reminder: getReminder(),
          app_id: String(app_id),
          extraNotes: greetings.applicant,
          interviewer_notes: greetings.interviewer,
          myJd: meetingForm.job.label,
          eventId: eventId !== '' ? eventId : recurringEventId,
          privateNotes: meetingForm.privateNotes,
          eventType: meetingForm.eventType.value,
          edit_jd,
          curJd: meetingForm.job.value,
          timeZone: meetingForm.timeZone.value,
          interviewer: meetingForm.interviewer.map((member) => ({
            email: member.email,
            calendarEmail: member.calendarEmail,
          })),
          // interviewer: meetingForm.interviewer.map(doc => doc.userId),
          startTime: meetingForm.startDateTime,
          endTime: meetingForm.endDateTime,
          notes: meetingForm.notes,
          location: meetingForm.location.value,
        }),
      )
        .then((res) => {
          // toast.success('Event Updated Successfully', {
          //   duration: 3500,
          // });
          localStorage.setItem('Applicantsname', '');
          handleCloseSchedulingForm();
          Toast(`Event Updated Successfully`, 'LONG', 'success');
        })
        .catch((err) => {
          // toast.error('Failed to Update Event', {
          //   duration: 3500,
          // });
          Toast('Failed to Update Event');
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
     setIsloading(true);
    // setIsTopLineLoading(true);
    dispatch(
      scheduleEventMiddleware({
        title: getMeetingTitle(),
        applicantId: currentApplicantId
          ? currentApplicantId
          : Number(localStorage.getItem('can_id')),
        myJd: job.label,
        // (localStorage.getItem('jd_id')),
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
        // interviewer: interviewer.map(doc => doc.userId),
        startTime: startDateTime,
        endTime: endDateTime,
        location: location.value,
        notes: notes,
        privateNotes: meetingForm.privateNotes,
      }),
    )
      .then((res) => {
        handleCloseSchedulingForm();
        // toast.success('Event Scheduled Successfully', {
        //   duration: 3500,
        // });
        localStorage.setItem('Applicantsname', '');
        Toast(`Event Scheduled Successfully`, 'LONG', 'success');
      })
      .catch((err) => {
        console.error(err);
        // toast.error('Failed to Schedule Event', {
        //   duration: 3500,
        // });
        Toast(`Failed to Schedule Event`, 'LONG', 'success');
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
      {/* <b>{currentUserLabel}</b> */}
      <b>
        {localStorage.getItem('Applicantsname') !== '' &&
        localStorage.getItem('Applicantsname') !== null
          ? localStorage.getItem('Applicantsname')
          : currentUserLabel}
      </b>
    </p>
  );

  return (
    <>
      {/* {isloading && <Loader/>} */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
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
              borderBottom: '0.5px solid #581845',
            }}
          >
            <Flex marginBottom={5}>
              <SvgCalendar1 size={14} fill="#333" />
            </Flex>

            <Text
              size={14}
              bold
              // color="theme"
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
              <p
                className={styles.header}
                style={{ marginTop: '5px', fontWeight: 'bold' }}
              >
                Summary
              </p>
              <div className={styles.content}>{MeetingTitleView}</div>
            </div>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#333333"
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
                email={
                  applicantEmail
                    ? applicantEmail
                    : localStorage.getItem('emailnote')
                }
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
                    interview.email
                      ? interview.email
                      : interview.calendarEmail,
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
              isloading ? (
                <Flex middle center style={{ width: '70px' }} marginTop={20}>
                  <Loader size="small" withOutOverlay />
                </Flex>
              ) : (
                <Button
                  onClick={handleUpdateEvent}
                  className={styles.continueButton}
                >
                  Update Invite
                </Button>
              )
            ) : isloading ? (
              <Flex middle center style={{ width: '70px' }} marginTop={20}>
                <Loader size="small" withOutOverlay />
              </Flex>
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
    </>
  );
};

export default MeetingSummary;
