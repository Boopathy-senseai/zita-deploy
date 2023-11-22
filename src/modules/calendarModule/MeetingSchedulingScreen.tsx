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
import { QuestionListModel } from './QuestionlistModel';
import MeetingSchedulingForm from './MeetingSchedulingForm';
import MeetingSummary from './MeetingSummary';
import styles from './styles/createScheduleForm.module.css';
import { getDateFromDateTime, meetingFormInitialState } from './util';
import { Interview_question_middleware } from './store/middleware/calendarmiddleware';
import { LevelValue, MyFormValues1, levellist,Errorshow } from './Questiontype';



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
  const [addquestion, setaddquestion] = useState('')
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
  const [isSubmitLoader, setSubmitLoader] = useState(false);

  const [sample, setsample] = useState([])
  const [allids, setallids] = useState([])
  const [errorstate,seterrorstate]=useState(false)
  const [validateerror,setvalidateerror]=useState(false)
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
  const [newquestion, setnewquestion] = useState([]);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const { firstName, lastName } = splitName(username); 
    const newData = { firstName, lastName, role: '', userId: value1, success: false };
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
    success?: boolean;
  }
  interface questionid {
    id: any;
    checked: any;
  }
  interface MyFormValues {
    interviewers: Interviewer[];
    checkedValues: checkedValues[];
    // LevelType:string;
    brieftext: string;
    checkedValuesError?: string;
    questionid: questionid[];
    questionidError?: string;
  }

  const initialValues: MyFormValues = {
    interviewers: [],
    checkedValues: [],
    // LevelType: '',
    brieftext: '',
    questionid: [],
  };


  const handleCompanyPageValid = (values: MyFormValues): Partial<MyFormValues> => {
    const errors: Partial<MyFormValues> = {};
    const allFieldsBlank = values.brieftext === '' && values.checkedValues.length === 0;

    if (!allFieldsBlank) {
      if (values.brieftext === '') {
        errors.brieftext = '';
      }

      if (values.checkedValues.length === 0) {

        errors.checkedValuesError = '';
      }

    }
    if (formik.values.brieftext.length > 150) {
      errors.brieftext = 'Length should not exceed 150 charector';
    }



    return errors;
  };



  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => handleSubmit(),
    validate: handleCompanyPageValid,
  });
  const handleSubmit = () => {
    if (formik.values.brieftext !== '' || formik.values.checkedValues.length !== 0) {
      setViewMeetingSummary(false)
      setShowPopup(true)
    }
    else {
      setViewMeetingSummary(true)
      setopenmodel(false)

    }

  }
  const nextEvent = () => {
    if (
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
    if (allQuestions.length === 0) {
      seterror(true)
    }
    if (!(allQuestions.length === 0)) {
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


  const update_state = (data) => {
    const updatedArray = sample.map((item, index) =>
      index === parseInt(interviewer) ? { ...item, success: true, question: data } : item
    ); 
    // Set the new array to state
    setsample(updatedArray);
  }
  function extractQuestions(dataArray) {
    const allQuestions = dataArray.map(item => item.question).reduce((acc, current) => {
      return acc.concat(current);
    }, []);

    return allQuestions;
  }
  const allQuestions = extractQuestions(allids);
  const filteredQuestions = allQuestions.filter(item => typeof item === 'number');



  const initialValues1: MyFormValues1 = {
    levellist: [],
    question: [],
    questionid: [],
    addquestion: [],
    Errorshow:[]
  };

  const childhandleCompanyPageValid = (values: MyFormValues1) => {
    let empty=false
    const errors: { levellist?: Partial<levellist>[] } = {};
    const sumValues = (levels: LevelValue[]) => {
      let easySum = 0;
      let mediumSum = 0;
      let hardSum = 0;

      levels.forEach((item) => {
        if (item.iseasycheck) {
          const easyValue = parseInt(item.easy) || 0;
          easySum += easyValue;
          if (easyValue === 0) empty = true;
        }
  
        if (item.ismediumcheck) {
          const mediumValue = parseInt(item.medium) || 0;
          mediumSum += mediumValue;
          if (mediumValue === 0) empty = true;
        }
  
        if (item.ishardcheck) {
          const hardValue = parseInt(item.hard) || 0;
          hardSum += hardValue;
          if (hardValue === 0) empty = true;
        }
      });

      return { easySum, mediumSum, hardSum };
    };

    values.levellist.forEach((data, index) => {
      const sums = sumValues(data.level);
      const total = sums.easySum + sums.mediumSum + sums.hardSum;

      if (total > 15 || total === 0) {
        errors.levellist = errors.levellist || [];
        const existingError: Partial<levellist> = errors.levellist[index] || {};
        if (sample[index]?.success === false) {
          errors.levellist[index] = {
            ...existingError,
            totalError: "Please limit the number of questions to a maximum of 15.",
            id: data.id

          };
        }
      }

      data.level.forEach((level1) => {
        const existingError: Partial<levellist> = errors.levellist?.[index] || {};
  
        if (level1.iseasycheck && (!level1.easy || parseInt(level1.easy) === 0)) {
          errors.levellist = errors.levellist || [];
          errors.levellist[index] = {
            ...existingError,
            showError: "please specify the count of questions required.",
            id: data.id
          };
        }
  
        if (level1.ismediumcheck && (!level1.medium || parseInt(level1.medium) === 0)) {
          errors.levellist = errors.levellist || [];
          errors.levellist[index] = {
            ...existingError,
            showError: "please specify the count of questions required.",
            id: data.id
          };
        }
  
        if (level1.ishardcheck && (!level1.hard || parseInt(level1.hard) === 0)) {
          errors.levellist = errors.levellist || [];
          errors.levellist[index] = {
            ...existingError,
            showError: "please specify the count of questions required.",
            id: data.id
          };
        }
      });
    });

 
    

    if (errors.levellist && errors.levellist.length === 0) {
      delete errors.levellist;
    }

    return errors;
  };
  
  const [questionerror, setquestionerror] = useState(false)
  // const filterObj = (datas) => {
  //   const filteredData = datas.map(item => {
  //     const filteredA = [];
  //     const targetType = "string";
  //     item.question?.Question?.forEach(question => {
  //       question.Value.forEach(values1 => {
  //         values1.Map_question.forEach(mapQuestion => { 
  //           if (typeof mapQuestion.id === targetType) {
  //             filteredA.push(mapQuestion);
  //           }
  //         });
  //       });
  //     });
  //     return filteredA;
  //   }).flat();

  //   return filteredData;
  // }

  // const handleSubmitfunction = () => {
   
  //   if (sample[interviewer]?.success === true) {
  //     const questionErrors = {};
  //     let isValid = true;

  //     const filteredData = filterObj(sample)
  //     formik1.values.question.some((item, index) => {
  //       if (item.question.length === 0) {
  //         questionErrors[`questions[${index}].question`] = 'This question must not be empty.';
  //         isValid = false;
  //       }

  //     });
  //     const arrayLengths = formik1.values?.question?.map(obj => {
  //       if (obj.question.length === 0) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     });
  //     const result = arrayLengths.includes(false) ? false : true;
  //     if (result) {
  //       handlechange()
  //       setaddquestion(filteredData)
  //     } else {
  //       setquestionerror(true)
  //     }
  //   }
  // }


  useEffect(() => {
    if (formik.values.checkedValues.length !== 0) {
      const mappedArray = formik.values.checkedValues.map(item => ({
        id: item.id,
        question: [],
      }));
   
      formik1.setFieldValue('question', mappedArray);
    }
  }, [formik.values.checkedValues]);

  const formik1 = useFormik({
    initialValues: initialValues1,
    onSubmit: () => {},
    validate: childhandleCompanyPageValid,
  });

  useEffect(() => {
    if (formik.values.checkedValues.length !== 0) {
      const mappedArray = formik.values.checkedValues.map(item => ({
        id: item.id,
        level: [],
        role: item.role,
        success: false,
        lastname: item.lastName,
        firstname: item.firstName
      }));
      childhandleCompanyPageValid(formik1.values)
      formik1.setFieldValue('levellist', mappedArray);
    }
    //formikval.setFieldValue('questionid', []);
  }, [formik.values.checkedValues]);

  return (
    <>
    {console.log(formik.values,formik1.values,formik1.errors)}
      <Modal
        onClose={handleCloseSchedulingForm}
        open={openScheduleForm}
        closeModalOnOuterClick={false}
      >

        {viewMeetingSummary === false ? (
          showPopup === false ?
            (<MeetingSchedulingForm
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
            />) : (
              <QuestionListModel
                interviewer={interviewer}
                setinterviewer={setinterviewer}
                formikval={formik}
                isQuestionChecked={isQuestionChecked}
                handlecheck={handlecheck}
                handlechange1={handlechange1}
                handlefunction1={handlefunction1}
                handlechange={handlechange}
                meetingForm={meetingForm}
                setShowPopup={setShowPopup}
                setViewMeetingSummary={setViewMeetingSummary}
                sample={sample}
                update_state={update_state}
                setnewquestion={setnewquestion}
                newquestion1={newquestion}
                setallids={setallids}
                setaddquestion={setaddquestion}
                formik={formik1}
                setquestionerror={setquestionerror}
                questionerror={questionerror}
                errorstate={errorstate}
                seterrorstate={seterrorstate}
                setvalidateerror={setvalidateerror}
                validateerror={validateerror}
               
              />
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
            question={filteredQuestions}
            addquestion={JSON.stringify(addquestion)}
          />
        ) : (
          <>
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
                Pick the interviewer for question generation.
              </Text>

              <Flex row style={{ display: 'flex', flexWrap: 'wrap', margin: '0 0 2px 0' }}>
                {formik.values.interviewers.map((user) => {
                  const isChecked = formik.values.checkedValues.some(
                    (cv) => cv.id === user.userId,
                  );

                  const handleCheckboxChange = () => {
                    const updatedValues = [...formik.values.checkedValues];
                    const index = updatedValues.findIndex((cv) => cv.id === user.userId);

                    if (isChecked) {
                      if (index !== -1) {
                        updatedValues.splice(index, 1);
                      }
                      const updatedSample = sample.filter((item) => item.id !== user.userId);
                      setsample(updatedSample);
                    } else {
                      updatedValues.push({
                        id: user.userId,
                        value: true,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                      });
                      const newSample = {
                        id: user.userId,
                        success: false,
                        question: [],
                      };
                      setsample([...sample, newSample]);
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

              {(formik.errors.brieftext === '' || formik.errors.checkedValuesError === '') ? (
                <Text color='error'>All the above files are required</Text>
              ) : ('')}
              <Flex style={{ borderTop: '0.5px solid #c3c3c3' }} >
                <Flex row between marginTop={10}>
                  <Button types="secondary" onClick={handlefunction} width='85px'>
                    Back
                  </Button>

                  <Flex row>
                    <Button types="close" onClick={handlefunction1} width='85px'>
                      Cancel
                    </Button>
                    {isSubmitLoader ? (
                      <Flex style={{ margin: '3px 0 0 15px' }} width={85} middle>
                        <Loader size="small" withOutOverlay />
                      </Flex>
                    ) : <Button
                      style={{ margin: '0 0 0 10px' }}
                      onClick={formik.handleSubmit}
                      width='85px'

                    >
                      {
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
