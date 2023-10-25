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
  ErrorMessage,
  Loader,
  Toast,
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
import { Interview_question_middleware } from './store/middleware/calendarmiddleware';


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
  const [isSubmitLoader,setSubmitLoader]=useState(false);

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
  const [selectedIds, setSelectedIds] = useState([]); 
  const [error, seterror] = useState(false);

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
    id: any;
    value: any;
    firstName?: string;
    lastName?: string;
    role?: string;
  }
  interface questionid {
    id: any;
    checked:any;
  }
  interface MyFormValues {
    interviewers: Interviewer[];
    checkedValues:checkedValues[];
    LevelType:string;
    brieftext:string;
    checkedValuesError?: string; 
    questionid:questionid[];
    questionidError?: string;
  }

  const initialValues: MyFormValues = {
    interviewers: [],
    checkedValues: [],
    LevelType: '',
    brieftext: '',
    questionid:[],
  };
 

  const handleCompanyPageValid = (values: MyFormValues): Partial<MyFormValues> => {
    const errors: Partial<MyFormValues> = {};
    const allFieldsBlank = values.LevelType === '' && values.brieftext === '' && values.checkedValues.length === 0;

    if (!allFieldsBlank) {
        if (values.brieftext === '') {
            errors.brieftext = '';
        }
        if (values.LevelType === '') {
          errors.LevelType = '';
      }
      if (values.checkedValues.length === 0) {
        
        errors.checkedValuesError = '';
    }
       
    }
    if(formik.values.brieftext.length>150){
      errors.brieftext = 'Length should not exceed 150 charector';
    }

  

    return errors;
};

 const [questions,setquestions]=useState([])

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => handleSubmit(),
    validate: handleCompanyPageValid,
  });
  const handleSubmit=()=>{
    if(formik.values.LevelType!==''||formik.values.brieftext!==''||formik.values.checkedValues.length!==0)
    {
      formik.setFieldValue('questionid',[])
      setSubmitLoader(true)
      const formData = new FormData();
      const transformedData= formik.values.checkedValues.map(item => ({
        id: item.id,
        role: item.role
      }));
      formData.append('role',JSON.stringify(transformedData));
      formData.append('level',formik.values.LevelType);
      formData.append('summary',formik.values.brieftext);
      formData.append('can_id',meetingForm.applicant.id);
      formData.append('jd_id',meetingForm.job.value);
      dispatch(
        Interview_question_middleware({
          formData,
        })).then((response)=>{
          console.log("resssssssss++++000",response.payload)
          if(response.payload.success===true){
          setSubmitLoader(false)
         const groupdata= response.payload.data.reduce((groups, item) => {
          const attendeeId = item.attendees;
          if (!groups[attendeeId]) {
            groups[attendeeId] = [];
          }
          groups[attendeeId].push(item);
          return groups;
        }, {});
          setquestions([groupdata])
          setViewMeetingSummary(false)
          setShowPopup(true)
          console.log("ennai konjam matri",groupdata)
          }else{
            setSubmitLoader(false)
            Toast('Sorry, there was a problem connecting to the API. Please try again later.', 'LONG','error');
          }
          console.log("questions",questions)
        })
    }
    else{
      setViewMeetingSummary(true)
      setopenmodel(false)

    }

  }
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
    if(id_questions.length===0){
     seterror(true)
    }
    if(!(id_questions.length===0))
    {
      seterror(false)
      setViewMeetingSummary(true);
       setopenmodel(false);
    }
    
  };
  const handlechange1 = () => {
    setViewMeetingSummary(true);
    setopenmodel(true);
  };
  
  const isQuestionChecked = (id: any) => {
    return formik.values.questionid.some(item => item.id === id && item.checked);
  }
  
  const handlecheck = (id: any, checked: boolean) => {
    const updatedQuestions = [...formik.values.questionid];
    const index = updatedQuestions.findIndex(item => item.id === id);
  
    if (index !== -1) {
      updatedQuestions[index].checked = checked;
    } else {
      updatedQuestions.push({ id, checked });
    }
  
    formik.setFieldValue('questionid', updatedQuestions);
  }
  const id_questions: any[] = formik.values.questionid
  .filter(question => question.checked)
  .map(question => question.id);

  return (
    <>
    {console.log('form::::+++form',formik.values,id_questions)}
    {/* {isSubmitLoader && <Loader />} */}
    <Modal
      onClose={handleCloseSchedulingForm}
      open={openScheduleForm}
      closeModalOnOuterClick={false}
    >
      
      {viewMeetingSummary === false ? (
        showPopup===false?
        (  <MeetingSchedulingForm
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
        />):(
          <Flex style={{backgroundColor:'#FFF',width:'700px',height:'auto',padding:'25px'}}>
             <Flex style={{ borderBottom: '0.5px solid #581845',paddingBottom:'10px' }}>
                  <Text size={14} bold>AI generated Interview Questions</Text>
                </Flex>
            
            <Flex style={{margin:'0 0 10px 0'}}>
              <Tabs activeKey={interviewer} 
                 onSelect={(keys: any) => {
                  setinterviewer(keys);
                  sessionStorage.setItem('interviewer', keys);
                }}
              > 
                {formik.values.checkedValues.map((user, index) => (
                  <Tab key={index} eventKey={JSON.stringify(index)} title={`${user.firstName} ${user.lastName}`}>
                    <Flex>
                      <Text size={12} bold style={{padding:'5px 0'}}>
                       {`${user.role} - Interview Questions`}
                       </Text>
                       {questions?.map((val, index1) => {
                        const keysToCheck = Object.keys(val);
                        console.log("value133423575673", keysToCheck.includes(user.id), val, keysToCheck);
                        if (keysToCheck.includes(user.id.toString())) {
                          const questionsList = val[user.id.toString()]; // Get the array of questions
                          return (
                            <Flex key={index1}>
                              <Flex>
                                {console.log("consoleeeeee----->",questionsList.length)}
                                {questionsList?(questionsList.map((question, index2) => (
                                  <Flex key={index2} row style={{margin:'0 0 5px 0'}}>
                                    <Flex  style={{margin:'6px 10px 0px 3px'}}>
                                    <InputCheckBox 
                                      checked={isQuestionChecked(question.id)} 
                                      onChange={e => handlecheck(question.id, e.target.checked)}
                                    />
                                    </Flex>
                                  <Flex key={index2} style={{borderBottom:((questionsList.length-1)===index2)?'':'0.3px solid #c3c3c3',padding:'3px',width: "100%",}}>{question.question}</Flex> 
                                  
                                  </Flex>
                                ))):(
                                  <Flex>
                                    <Text>
                                      due to some error there is no data please regenerate
                                    </Text>
                                  </Flex>
                                )}
                               {error&&id_questions.length===0&&(
                                <Text color='error' style={{margin:'0 0 7px 0'}}>please select atleast one question for the interview</Text>
                               )}
                              </Flex>
                            
                            </Flex>
                          );
                        }
                        return null;
                      })}

                     </Flex>
                  </Tab>
                ))}
              </Tabs>
            </Flex>

              <Flex row  between style={{ borderTop: '0.5px solid #c3c3c3',padding:'10px 0 0 0' }}>
                <Flex>
                <Button types="secondary" onClick={handlechange1}>
                  Back
                </Button>
                </Flex>
                <Flex row>
                  <Button types="close" onClick={handlefunction1}>
                    Cancel
                  </Button>
                <Button style={{ margin: '0 0 0 10px' }} onClick={handlechange}>
                  Continue
                </Button>

                </Flex>
                
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
            formik={formik}
            question={id_questions.toString()}
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
              <Text color="theme" style={{ marginBottom: '5px' }}>
                Pick the interviewer for question generation.
              </Text>

              <Flex row style={{ display: 'flex', flexWrap: 'wrap',margin:'0 0 2px 0' }}>
                {formik.values.interviewers.map((user) => {
                  const isChecked = formik.values.checkedValues.some(
                    (cv) => cv.id === user.userId,
                  );

                  const handleCheckboxChange = () => {
                    const updatedValues = [...formik.values.checkedValues];

                    if (isChecked) {
                      const userIndex = updatedValues.findIndex(
                        (cv) => cv.id === user.userId,
                      );
                      updatedValues.splice(userIndex, 1);
                    } else {
                      updatedValues.push({
                        id: user.userId,
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

               <ErrorMessage
                          name={'brieftext'}
                          errors={formik.errors}
                          touched={formik.touched}
                        />
            </Flex>

        {(formik.errors.LevelType===''||formik.errors.brieftext===''||formik.errors.checkedValuesError==='')?(
          <Text color='error' style={{margin:'0 0 7px 0'}}>All the above files are required</Text>
        ):('')}
              <Flex style={{ borderTop: '0.5px solid #c3c3c3' }} >
                <Flex row between marginTop={10}>
                  <Button types="secondary" onClick={handlefunction}>
                    Back
                  </Button>

                  <Flex row>
                    <Button types="close" onClick={handlefunction1}>
                      Cancel
                    </Button>
                    {isSubmitLoader?(
                        <Flex style={{margin:'3px 0 0 15px'}}>
                          <Loader size="small" withOutOverlay />
                        </Flex>
                      )     :<Button
                      style={{ margin: '0 0 0 10px' }}
                      onClick={formik.handleSubmit}
                    >
                      {formik.values.LevelType !== '' ||
                      formik.values.brieftext !== '' ||
                      formik.values.checkedValues.length !== 0
                        ? 'Generate'
                        : 'Skip'}
                    </Button>}
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
