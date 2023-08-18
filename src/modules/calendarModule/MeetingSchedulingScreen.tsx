import 'moment-timezone';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Modal, CrossButton } from '../../uikit/v2';
import { AppDispatch } from '../../store';
import {
  CALENDAR,
  meetingFormProps,
  TeamMemberType,
  SlotRangeType,
  EditEventDetails,
  EventMeetingType,
  CalendarEventType,
  UserType,
  ApplicantTypes,
  UserInfo,
} from './types';

import './styles/addInterviewers.css';
import MeetingSchedulingForm from './MeetingSchedulingForm';
import MeetingSummary from './MeetingSummary';
import { getDateFromDateTime, meetingFormInitialState } from './util';

moment.tz.setDefault(Intl.DateTimeFormat().resolvedOptions().timeZone);

interface Props {
  username: string;
  cand_id?: number;
  APPLY?:Boolean;
  cand_name?: string;
  cand_email?: string;
  jd_id?: number;
  jd_name?: string;
  eventId?: string | null;
  recurringEventId?: string | null;
  openScheduleForm: boolean;
  teamMembers: TeamMemberType[];
  editEventDetails?: EditEventDetails | null;
  calendarProvider: CALENDAR | null;
  currentUserEvents: CalendarEventType[];
  slotRange?: SlotRangeType;
  applicants?: UserType[];
  currentUser?: UserInfo;
  setIsTopLineLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  handleEventScheduleForm: () => void;
}

const MeetingSchedulingScreen = ({
  openScheduleForm,
  handleEventScheduleForm,
  teamMembers,
  APPLY,
  editEventDetails,
  eventId,
  recurringEventId,
  calendarProvider,
  cand_name,
  jd_name,
  cand_id,
  jd_id,
  cand_email,
  currentUserEvents,
  username,
  slotRange,
  setIsTopLineLoading,
  applicants,
  currentUser,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [currentApplicantId, setCurrentApplicantId] = useState<number | null>(
    null,
  );

  // const [applicants, setApplicants] = useState<UserType[]>([]);
  const [meetingForm, setMeetingForm] = useState<meetingFormProps>(
    meetingFormInitialState,
  );
  const [viewMeetingSummary, setViewMeetingSummary] = useState(false);
  const [currentUserLabel, setCurrentUserLabel] = useState<string>(null);
  // const [extraNotes, _] = useState(
  //   'Hello Team,' +
  //     '\r\n' +
  //     'We would like to confirm your interview. Please find all the relevant details below.',
  // );

  const updateCurrentApplicantId = (applicantId: number) => {
    if(localStorage.getItem('jdid') !== '')
    {setCurrentApplicantId(Number(localStorage.getItem('jdid')))}
    else{
    setCurrentApplicantId(applicantId);}
  };

  useEffect(() => {
    if (editEventDetails) {
      setMeetingForm((form) => {
        return {
          ...form,
          applicant: {
            ...form.applicant,
            id: editEventDetails.applicant.id,
            name: editEventDetails.applicant.name,
          },
          job: { ...form.job, label: editEventDetails.jobRole.label },
          date: {
            ...form.date,
            value: getDateFromDateTime(editEventDetails.startDateTime),
          },
          startTime: {
            ...form.startTime,
            value: new Date(editEventDetails.startDateTime),
          },
          startDateTime: editEventDetails.startDateTime,
          endDateTime: editEventDetails.endDateTime,
          endTime: {
            ...form.endTime,
            value: new Date(editEventDetails.endDateTime),
          },
          timeZone: {
            ...form.timeZone,
            value: editEventDetails.timeZone,
          },
          eventType: {
            ...form.eventType,
            value: editEventDetails.eventType,
          },
          interviewer: editEventDetails.interviewers,
          notes: editEventDetails.notes,
          location: {
            ...form.location,
            name: editEventDetails.location,
          },
          privateNotes: editEventDetails.privateNotes,
        };
      });
    }
  }, [editEventDetails]);
  useEffect(() => { 
    if (APPLY) {
      setMeetingForm((form) => {
        return {
          ...form,
          applicant: {
            ...form.applicant,
            id:Number(localStorage.getItem('jdid')),
            name:localStorage.getItem('Applicantname'),
          },
          job: { ...form.job, label:localStorage.getItem('Jdname') }, 
    }
    })}}, [APPLY]);
 
  useEffect(() => {
    // dispatch(getApplicantsMiddleware())
    //   .then((res: any) => {
    //     setApplicants(
    //       res.payload.applicants.map((user: ApplicantTypes) => {
    //         return {
    //           email: user.email,
    //           value: user.userId,
    //           label: [user.firstName, user.lastName].filter(Boolean).join(' '),
    //         };
    //       }),
    //     );
    //   })
    //   .catch((err: any) => {
    //     console.error(err);
    //   });

    return () => setMeetingForm(meetingFormInitialState);
  }, []);

  useEffect(() => {
    if (slotRange.date) {
      setMeetingForm((form) => ({
        ...form,
        date: { ...form.date, value: slotRange.date },
        startTime: { ...form.startTime, value: slotRange.start },
        endTime: { ...form.endTime, value: slotRange.end },
      }));

      return () => setMeetingForm(meetingFormInitialState);
    }
  }, [slotRange]);

  const nextEvent = () => {
    setViewMeetingSummary((prevState) => !prevState);
  };

  const handleCloseSchedulingForm = () => {
    [
      'applicant',
      'applicant_id',
      'jd',
      'jd_id',
      'eDate',
      'timezone',
      'event_type',
      'notes',
      'private_notes',
      'location',
      'interviewers',
    ].forEach((item) => localStorage.removeItem(item));
    localStorage.setItem('Applicantname','')
    localStorage.setItem('Jdname','')
    localStorage.setItem('jdid','')
    setViewMeetingSummary(false);
    setMeetingForm(meetingFormInitialState);
    handleEventScheduleForm();
  };

  return (
    <Modal
      onClose={handleCloseSchedulingForm}
      open={openScheduleForm}
      closeModalOnOuterClick={false}
    >
      {/* <div> */}
      {/* <CrossButton
            onClick={handleCloseSchedulingForm}
            size={'14px'}
            style={{ position: 'absolute', top: '12px', right: '12px' }}
          /> */}
      {viewMeetingSummary === false ? (
        <MeetingSchedulingForm
          updateCurrentApplicantId={updateCurrentApplicantId}
          applicants={applicants}
          currentUser={currentUser}
          currentUserEvents={currentUserEvents}
          currentUserLabel={currentUserLabel}
          setCurrentUserLabel={setCurrentUserLabel}
          calendarProvider={calendarProvider}
          handleCloseSchedulingForm={handleCloseSchedulingForm}
          meetingForm={meetingForm}
          setMeetingForm={setMeetingForm}
          setViewMeetingSummary={setViewMeetingSummary}
          teamMembers={teamMembers}
          username={username}
          cand_name={cand_name}
          jd_name={jd_name}
          editEventDetails={editEventDetails}
          cand_email={cand_email}
          cand_id={cand_id}
          jd_id={jd_id}
        />
      ) : (
        <MeetingSummary
          currentUserLabel={currentUserLabel}
          applicants={applicants}
          meetingForm={meetingForm}
          username={username}
          nextEvent={nextEvent}
          editEventDetails={editEventDetails}
          handleCloseSchedulingForm={handleCloseSchedulingForm}
          currentApplicantId={currentApplicantId}
          // extraNotes={extraNotes}
          eventId={eventId}
          recurringEventId={recurringEventId}
          setIsTopLineLoading={setIsTopLineLoading}
        />
      )}
      {/* </div> */}
    </Modal>
  );
};

export default MeetingSchedulingScreen;
