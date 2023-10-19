import 'moment-timezone';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import { Modal, CrossButton } from '../../uikit/v2';
import { AppDispatch } from '../../store';
import { level } from '../myjobposting/mock';
import {
  Flex,
  Text,
  Button,
  CheckBox,
  InputCheckBox,
  InputRadio,
  InputText,
} from '../../uikit';
import Tab from '../../uikit/Tab/Tab';
import Tabs from '../../uikit/Tab/Tabs';
import { userProfileMiddleWare } from '../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import SvgCross from '../../icons/SvgCross';
import SvgClose from '../../icons/SvgClose';
import { THIS_FIELD_REQUIRED } from '../constValue';
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
  APPLY?: Boolean;
  cand_name?: string;
  cand_email?: string;
  jd_id?: number;
  jd_name?: string;
  EventId?: any;
  eventId?: any;
  recurringEventId?: string | null;
  openScheduleForm: boolean;
  setOpenScheduleForm: any;
  teamMembers: TeamMemberType[];
  editEventDetails?: EditEventDetails | null;
  calendarProvider: CALENDAR | null;
  currentUserEvents: CalendarEventType[];
  slotRange?: SlotRangeType;
  applicants?: UserType[];
  currentUser?: UserInfo;
  params?: URLSearchParams;
  setIsTopLineLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  handleEventScheduleForm: () => void;
  openmodel: any;
  setopenmodel: any;
  setMeetingForm: any;
  meetingForm: any;
  value: any;
}

const MeetingSchedulingScreen = ({
  openScheduleForm,
  handleEventScheduleForm,
  teamMembers,
  APPLY,
  editEventDetails,
  EventId,
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
  params,
  setOpenScheduleForm,
  openmodel,
  setopenmodel,
  setMeetingForm,
  meetingForm,
  value,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const { search } = useLocation();

  const dispatch: AppDispatch = useDispatch();
  const [currentApplicantId, setCurrentApplicantId] = useState<number | null>(
    null,
  );
  const tabInitial: any =
    sessionStorage.getItem('interviewer') === null
      ? '0'
      : sessionStorage.getItem('interviewer');

  const [interviewer, setinterviewer] = useState<any>(tabInitial);
  // const [applicants, setApplicants] = useState<UserType[]>([]);

  const [viewMeetingSummary, setViewMeetingSummary] = useState(false);
  const [currentUserLabel, setCurrentUserLabel] = useState<string>(null);
  // const [extraNotes, _] = useState(
  //   'Hello Team,' +
  //     '\r\n' +
  //     'We would like to confirm your interview. Please find all the relevant details below.',
  // );
  const queryParams = new URLSearchParams(search);

  const updateCurrentApplicantId = (applicantId: number) => {
    setCurrentApplicantId(applicantId);
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
            id: Number(localStorage.getItem('jdid')),
            name: localStorage.getItem('Applicantname'),
          },
          job: { ...form.job, label: localStorage.getItem('Jdname') },
        };
      });
    } else if (queryParams.get('id')) {
      setMeetingForm((form) => {
        return {
          ...form,
          applicant: {
            ...form.applicant,
            id: JSON.parse(queryParams.get('id')),
            name: queryParams.get('name'),
          },
          job: {
            ...form.job,
            label: queryParams.get('jobTitle'),
            value: JSON.parse(queryParams.get('jobId')),
          },
        };
      });
    }
  }, [APPLY, cand_id]);
  // useEffect(()=>{
  //   // dispatch(userProfileMiddleWare());

  // },[])
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
  function splitName(username1) {
    const parts = username1.trim().split(/\s+/);
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    return {
      firstName,
      lastName,
    };
  }
  const [value1, setvalue1] = useState(value);

  useEffect(() => {
    const { firstName, lastName } = splitName(username);
    console.log('value1111', value1);
    const newData = { firstName, lastName, role: '', userId: value1 };
    const updatedInterviewers = [...formik.values.interviewers, newData];
    formik.setFieldValue('interviewers', updatedInterviewers);
    sessionStorage.setItem('interviewer', '0');
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
    localStorage.setItem('Applicantsname', '');
    localStorage.setItem('Jdname', '');
    localStorage.setItem('jdid', '');
    setViewMeetingSummary(false);
    setMeetingForm(meetingFormInitialState);
    handleEventScheduleForm();
  };
  const handlefunction = () => {
    setopenmodel(false);
    setViewMeetingSummary(false);
    setShowPopup(false);
    setOpenScheduleForm(true);
  };
  const handlefunction1 = () => {
    setopenmodel(false);
    setOpenScheduleForm(false);
  };

  interface Interviewer {
    userId: any;
    firstName?: string;
    lastName?: string;
    role?: string;
  }
  interface checkedValues {
    userId: any;
    value: any;
    firstName?: string;
    lastName?: string;
    role?: string;
  }
  interface MyFormValues {
    interviewers: Interviewer[];
    checkedValues: checkedValues[];
    LevelType: string;
    brieftext: string;
  }

  const initialValues: MyFormValues = {
    interviewers: [],
    checkedValues: [],
    LevelType: '',
    brieftext: '',
  };
  const handleCompanyPageValid = (values: MyFormValues) => {
    const errors: Partial<MyFormValues> = {};
    if (
      formik.values.LevelType !== '' &&
      formik.values.brieftext !== '' &&
      formik.values.checkedValues.length !== 0
    ) {
    } else if (
      formik.values.LevelType !== '' ||
      formik.values.brieftext !== '' ||
      formik.values.checkedValues.length !== 0
    ) {
      errors.brieftext = THIS_FIELD_REQUIRED;

      if (formik.values.LevelType !== '') {
        errors.LevelType = THIS_FIELD_REQUIRED;
      }
      // if(formik.values.checkedValues.length!==0){
      //   errors.checkedValues =THIS_FIELD_REQUIRED;
      // }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {},
    validate: handleCompanyPageValid,
  });
  const handlevalid = () => {
    if (
      formik.values.LevelType !== '' ||
      formik.values.brieftext !== '' ||
      formik.values.checkedValues.length !== 0
    ) {
      setViewMeetingSummary(false);
      setShowPopup(true);
    } else {
      setViewMeetingSummary(true);
      setopenmodel(false);
    }
  };
  const nextEvent = () => {
    if (
      formik.values.LevelType !== '' ||
      formik.values.brieftext !== '' ||
      formik.values.checkedValues.length !== 0
    ) {
      setViewMeetingSummary(false);
      setShowPopup(true);
    } else {
      setViewMeetingSummary(true);
      setopenmodel(true);
    }
  };
  const handlechange = () => {
    setViewMeetingSummary(true);
    setopenmodel(false);
  };
  const handlechange1 = () => {
    setViewMeetingSummary(true);
    setopenmodel(true);
  };

  return (
    <>
      {console.log('form::::+++form', formik.values)}
      <Modal
        onClose={handleCloseSchedulingForm}
        open={openScheduleForm}
        closeModalOnOuterClick={false}
      >
        {viewMeetingSummary === false ? (
          showPopup === false ? (
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
              setOpenScheduleForm={setOpenScheduleForm}
              setopenmodel={setopenmodel}
              openmodel={openmodel}
              formik={formik}
            />
          ) : (
            <Flex
              style={{
                backgroundColor: '#FFF',
                width: '700px',
                height: 'auto',
                padding: '25px',
              }}
            >
              <Flex
                onClick={handlefunction1}
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <SvgClose height={9} width={8} fill={'#581845'} />
              </Flex>
              <Text size={14} bold>
                AI generated Interview Questions
              </Text>
              <Flex>
                <Tabs
                  activeKey={interviewer}
                  onSelect={(keys: any) => {
                    setinterviewer(keys);
                    sessionStorage.setItem('interviewer', keys);
                  }}
                >
                  {formik.values.checkedValues.map((user, index) => (
                    <Tab
                      key={index}
                      eventKey={JSON.stringify(index)}
                      title={`${user.firstName} ${user.lastName}`}
                    >
                      <Flex>
                        <Text size={12} bold style={{ padding: '5px 0' }}>
                          {`${user.role} - Interview Questions`}
                        </Text>
                      </Flex>
                    </Tab>
                  ))}
                </Tabs>
              </Flex>

              <Flex row style={{ display: 'flex', justifyContent: 'end' }}>
                <Button types="close" onClick={handlechange1}>
                  Back
                </Button>
                <Button style={{ margin: '0 0 0 10px' }} onClick={handlechange}>
                  Continue
                </Button>
              </Flex>
            </Flex>
          )
        ) : openmodel === false ? (
          <MeetingSummary
            currentUserLabel={currentUserLabel}
            applicants={applicants}
            meetingForm={meetingForm}
            username={username}
            nextEvent={nextEvent}
            teamMembers={teamMembers}
            editEventDetails={editEventDetails}
            handleCloseSchedulingForm={handleCloseSchedulingForm}
            currentApplicantId={currentApplicantId}
            // extraNotes={extraNotes}
            EventId={EventId}
            eventId={eventId}
            recurringEventId={recurringEventId}
            setIsTopLineLoading={setIsTopLineLoading}
            setOpenScheduleForm={setOpenScheduleForm}
            setopenmodel={setopenmodel}
          />
        ) : (
          <>
            {/* <Flex>
              <CrossButton
                onClick={handlefunction1}
                size={10}
                style={{ position: 'absolute', top: '12px', right: '15px' }}
                fill={'#333'}
              />
            </Flex> */}
            <Flex
              style={{
                backgroundColor: '#FFF',
                width: '500px',
                height: 'auto',
                padding: '25px',
              }}
            >
              <Flex
                style={{ borderBottom: '0.5px solid #581845' }}
                marginBottom={10}
              >
                <Text size={14} bold style={{ marginBottom: '5px' }}>
                  Generate Question by AI
                </Text>
              </Flex>

              <Text color="theme" style={{ marginBottom: '4px' }}>
                Choose the level of the interview.
              </Text>
              <Flex row>
                {level.map((jobList) => {
                  return (
                    <Flex
                      key={jobList.value}
                      style={{ margin: '0  20px  10px 0 ' }}
                    >
                      <InputRadio
                        // className={styles.checkbox}
                        label={jobList.value}
                        checked={jobList.label === formik.values.LevelType}
                        onClick={() =>
                          formik.setFieldValue('LevelType', jobList.label)
                        }
                      />
                    </Flex>
                  );
                })}
              </Flex>
              <Text color="theme" style={{ marginBottom: '4px' }}>
                Pick the interviewer for question generation.
              </Text>

              <Flex row style={{ display: 'flex', flexWrap: 'wrap' }}>
                {formik.values.interviewers.map((user) => {
                  const isChecked = formik.values.checkedValues.some(
                    (cv) => cv.userId === user.userId,
                  );

                  const handleCheckboxChange = () => {
                    const updatedValues = [...formik.values.checkedValues];

                    if (isChecked) {
                      const userIndex = updatedValues.findIndex(
                        (cv) => cv.userId === user.userId,
                      );
                      updatedValues.splice(userIndex, 1);
                    } else {
                      updatedValues.push({
                        userId: user.userId,
                        value: true,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                      });
                    }

                    formik.setFieldValue('checkedValues', updatedValues);
                  };

                  return (
                    <Flex
                      row
                      key={user.userId}
                      style={{ margin: '0 0 10px 0', width: '50%' }}
                    >
                      <InputCheckBox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <Text
                        style={{ margin: '0 0px 0 6px' }}
                      >{`${user.firstName} ${user.lastName}`}</Text>
                    </Flex>
                  );
                })}
              </Flex>

              <Flex style={{ margin: '0 0 10px 0' }}>
                <label
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <p style={{ color: '#581845', fontSize: '13px' }}>
                    A brief summary of the interview.
                  </p>
                </label>
                <InputText
                  // label={'A brief summary of the interview.'}
                  value={formik.values.brieftext}
                  placeholder="Add a brief summary of the interview."
                  style={{ marginBottom: '5px' }}
                  onChange={(e) => {
                    formik.setFieldValue('brieftext', e.target.value);
                  }}
                />
              </Flex>
              <Flex style={{ borderTop: '0.5px solid #c3c3c3' }} >
                <Flex row between marginTop={10}>
                  <Button types="secondary" onClick={handlefunction}>
                    Back
                  </Button>

                  <Flex row>
                    <Button types="close" onClick={handlefunction1}>
                      Cancel
                    </Button>
                    <Button
                      style={{ margin: '0 0 0 10px' }}
                      onClick={handlevalid}
                    >
                      {formik.values.LevelType !== '' ||
                      formik.values.brieftext !== '' ||
                      formik.values.checkedValues.length !== 0
                        ? 'Generate'
                        : 'Skip'}
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </>
        )}
        {/* </div> */}
      </Modal>
    </>
  );
};

export default MeetingSchedulingScreen;
