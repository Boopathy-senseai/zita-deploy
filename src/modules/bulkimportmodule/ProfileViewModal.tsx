import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { FieldArray, FormikProvider, useFormik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import * as Yup from 'yup';
// import getSymbolFromCurrency from 'currency-symbol-map';
import { AppDispatch, RootState } from '../../store';
import SvgClose from '../../icons/SvgClose';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
// import SvgRoundAdd from '../../icons/SvgRoundAdd';
import Button from '../../uikit/Button/Button';
import { GARY_3, PRIMARY } from '../../uikit/Colors/colors';
import Loader from '../../uikit/Loader/Loader';
import { isEmpty, notSpecified, getFocus, getBlur } from '../../uikit/helper';
import Drawer from '../../uikit/Drawer/Drawer';
// import { LINK } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import Text from '../../uikit/Text/Text';
import { Modal } from '../../uikit';
import { SvgEdit } from '../../icons';
import PersonalInformationEdit from './PersonalInfoTableData';
// import { THIS_FIELD_REQUIRED } from './../constValue';
// import AddandUpdateWorkExperienceEdit from './ExpAdd';
import ApplicantQustionsSubmit, {
  applicationFormikForms,
} from './../accountsettingsmodule/buildyourcareerpage/ApplicantQustionsSubmit';

// import UpdateProfessionalSkillsEdit from './techSkills';
// import AddandUpdateQualificationEdit from './QualAdd';
import {
  uploadedProfileViewMiddleWare,
  bulkImportQusMiddleWare,
  bulkUploadSkillsMiddleWare,
  bulkImportQusGetMiddleWare,
} from './store/middleware/bulkImportMiddleware';
// import { applocationFormPostMiddleWare } from './../accountsettingsmodule/buildyourcareerpage/store/middleware/buildyourcareerpagemiddleware';
import styles from './profileviewmodal.module.css';

const inital: applicationFormikForms = {
  qualification: '',
  aboutUs: '',
  gender: '',
  hispanic: '',
  veteran: '',
  disability: '',
  map: '',
  coverLetter: '',
  identify_race: '',
};

type Props = {
  open: boolean;
  filePath: string;
  // personal?: any;
  // experience?: any;
  // addDetails?: any;
  canId?: any;
  jdId?: any;
  hanldeProfileView?: any;
  // skills?: any;
  // obj?: any;
  // education?: any;
  refreshOnUpdate: (a?: any) => void;
};

const ProfileViewModal = ({
  open,
  canId,
  filePath,
  jdId,
  hanldeProfileView,
  refreshOnUpdate,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    // setDisplay(true)
    dispatch(bulkUploadSkillsMiddleWare({ empId: canId }));
    dispatch(uploadedProfileViewMiddleWare({ id: Number(canId) }));
    if (jdId !== undefined) {
      dispatch(bulkImportQusGetMiddleWare({ jd_id: jdId, candi_id: canId }));
    }
  }, []);
  const {
    // personal,
    questionnaire,
    is_loading,
    questionnaireAns,
    emp_data,
    answers,
    skills_list,
  } = useSelector(
    ({
      uploadedProfileViewReducers,
      bulkUploadedCandidatesReducers,
      bulkUploadTechSkillReducers,
      bulkImportQusGetReducers,
    }: RootState) => {
      return {
        questionnaireAns: bulkImportQusGetReducers.questionnaire,
        answers: bulkImportQusGetReducers.answers,
        skills_list: bulkUploadTechSkillReducers.skills_list,
        questionnaire: bulkUploadedCandidatesReducers.questionnaire,
        // personal: uploadedProfileViewReducers.personal,
        is_loading: uploadedProfileViewReducers.isLoading,

        emp_data: uploadedProfileViewReducers.emp_data,
      };
    },
  );
  // console.log(skills_list)
  const file = `${window.location.protocol}//${filePath}`;
  const docs = [{ uri: file }];
  const [isPermanently, setPermanently] = useState(false);
  const [isFocus, setFocus] = useState(true);
  const [isAnswer, setAnswer] = useState(false);
  const [isProfileView, setProfileView] = useState(false);
  // const [showButton, setShowButton ] = useState(false);
  // const showButtonHandler = () => {
  //   setShowButton((prevState) => !prevState);
  // }
  const workYear = !isEmpty(emp_data?.work_exp)
    ? emp_data?.work_exp !== '0 - 1'
      ? `${emp_data.work_exp} Years`
      : `${emp_data.work_exp} Year`
    : '';
  const data = [
    { title: 'Name:', value: notSpecified(emp_data?.first_name), right: 130 },
    { title: 'Email:', value: notSpecified(emp_data?.email), right: 130 },
    {
      title: 'Contact Number:',
      value: emp_data?.contact,
      right: 68,
    },
    {
      title: 'Location:',
      value: notSpecified(emp_data?.location),
      right: 114,
    },
    // { title: 'Address:', value: notSpecified(address), right: 172 },

    {
      title: 'Experience:',
      value: notSpecified(workYear),
      right: 98,
    },
    {
      title: 'Qualification:',
      value: notSpecified(emp_data?.qualification),
      right: 92,
    },
    {
      title: 'Skills:',
      value: notSpecified(emp_data?.skills?.replace(/,/g, ', ')),
      right: 133.5,
    },
  ];
  // formik validation

  const Schema = Yup.object().shape({
    // map: Yup.array().of(
    //   Yup.object().shape({
    //     required: Yup.string()
    map: Yup.array()
      .min(1, 'atleast 1 field should be updated')
      .required('required'),
    // .matches(/[0\ ]/, THIS_FIELD_REQUIRED),
    // // .required(THIS_FIELD_REQUIRED),
    //   }),
    // ),
  });

  // formik submit
  const handleSubmit = (values: applicationFormikForms) => {
    const raceFilter =
      values.map && values.map.filter((a: any) => a.result === a.result);
    const raceOutput =
      raceFilter &&
      raceFilter.map((list: any) => {
        return `${list.id}:${list.result.replace(',', '')}`;
      });
    const formData = new FormData();

    formData.append('questionnaire', raceOutput);
    formData.append('jd_id', jdId);
    formData.append('candi_id', canId);
    dispatch(
      bulkImportQusMiddleWare({
        formData,
      }),
    ).then(() => {
      dispatch(bulkImportQusGetMiddleWare({ jd_id: jdId, candi_id: canId }));
      setAnswer(true);
    });
  };
  // console.log(skills)
  const formik = useFormik({
    initialValues: inital,
    onSubmit: handleSubmit,
    validationSchema: Schema,
  });
  // const dataJob = [
  //   {
  //     title: 'Job Type:',
  //     value: notSpecified(personal?.type_of_job__label_name),
  //     right: 166,
  //   },
  //   {
  //     title: 'Availability:',
  //     value: notSpecified(personal?.available_to_start__label_name),
  //     right: 153,
  //   },

  //   {
  //     title: 'Willing to Relocate:',
  //     value: personal?.relocate ? 'Yes' : 'No',
  //     right: 103,
  //   },

  //   {
  //     title: 'Current Gross Salary:',
  //     value: isEmpty(personal?.curr_gross)
  //       ? notSpecified(personal?.curr_gross)
  //       : `${getSymbolFromCurrency(currentCurrency)} ${personal?.curr_gross}`,
  //     right: 88,
  //   },
  //   {
  //     title: 'Expected Gross Salary:',
  //     value: isEmpty(personal?.exp_gross)
  //       ? notSpecified(personal?.exp_gross)
  //       : `${getSymbolFromCurrency(currentCurrency)} ${personal?.exp_gross}`,
  //     right: 76,
  //   },
  // ];
  const handleOpenPersonalEdit = () => {
    setProfileView(true);
    setDisplay(false);
  };

  const handleQues = () => {
    setPermanently(false);
    setFocus(true);
    formik.handleSubmit();
    errorFocus();
  };
  // console.log(cancel)
  // const handleTrunk = (id: string) => {
  //   setTrunk(id);
  // };
  // const handleCloseTrunk = () => {
  //   setTrunk('');
  // };

  // const handleOpenAnswerEdit = () => {
  //   setAnswer(false);
  // };
  // const handleWorkUdateOpen = (expId: string) => {
  //   setworkExpEdit(true);
  //   setUpdateId(expId);
  // };
  // const handleOpenSkillEdit = () => {
  //   setSkillsEdit(true);
  // };

  // const handleQualificationEdit = (updateId: string) => {
  //   setQualificationEdit(true);
  //   setUpdateId(updateId);
  // };
  // error message focus function
  const errorFocus = () => {
    if (formik.errors.map && formik.errors.map.length !== 0) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      const getindex: any =
        Array.isArray(formik.errors.map) &&
        formik.errors.map.map((list: any, index) => {
          if (list && list.required && !isEmpty(list.required)) return index;
        });
      const findIndex =
        getindex && getindex.filter((a: any) => typeof a === 'number');
      if (Array.isArray(findIndex) && findIndex.length !== 0) {
        getFocus(`applicant_qustions_submit___error_${findIndex[0]}`);
      }
    }
  };
  const [display, setDisplay] = useState(true);
  // error message focus function
  useEffect(() => {
    setAnswer(answers);
  }, [answers]);

  useEffect(() => {
    if (isFocus) {
      if (formik.errors.map && formik.errors.map.length !== 0) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        const getindex: any =
          Array.isArray(formik.errors.map) &&
          formik.errors.map.map((list: any, index) => {
            if (list && list.required && !isEmpty(list.required)) return index;
          });
        const findIndex =
          getindex && getindex.filter((a: any) => typeof a === 'number');
        if (Array.isArray(findIndex) && findIndex.length !== 0) {
          getFocus(`applicant_qustions_submit___error_${findIndex[0]}`);
        }
      }
    }
  }, [formik.errors, isFocus]);
  useEffect(() => {
    getFocus('myjobpostscreen___input');
    getBlur('myjobpostscreen___input');
  }, [is_loading]);

  useEffect(() => {
    setDisplay(true);
  }, [display]);
  return (
    <Drawer open={open}>
      {is_loading && <Loader />}
      <div className={styles.overAll}>
        <Flex row center between flex={1} className={styles.border}>
          <div
            className={'pointer'}
            onClick={refreshOnUpdate}
            tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <SvgClose fill={'#888888'} width={14} height={14}/>
          </div>
          <Flex onClick={() => hanldeProfileView(Number(canId))}></Flex>
        </Flex>
        <Flex row>
          <Flex flex={6}>
            <div
              style={{
                height: window.innerHeight - 0,
                overflow: 'scroll',
              }}
            >
              {display && (
                <DocViewer
                  style={{ height: '100%', width: '100%' }}
                  pluginRenderers={DocViewerRenderers}
                  documents={docs}
                  config={{
                    header: {
                      disableHeader: false,
                      disableFileName: false,
                      retainURLParams: false,
                    },
                  }}
                />
              )}
            </div>
          </Flex>
          <Flex flex={6}>
            <CancelAndDeletePopup
              open={isPermanently}
              title="Once you submit, you cannot edit and undo this action. Are you sure to proceed?"
              btnCancel={() => setPermanently(false)}
              btnDelete={() => handleQues()}
              btnRight={'Submit'}
            />
            <div
              style={{
                height: window.innerHeight - 60,
                overflow: 'scroll',
              }}
            >
              <Flex columnFlex row>
                <div
                  style={{
                    width: '100%',
                    marginRight: 10,
                    marginLeft: 10,
                    marginBottom: 30,
                  }}
                >
                  <Flex className={styles.titleStyle} middle>
                    {/* <Text size={16} bold>
                      Personal Information
                    </Text> */}
                    <Text size={16} bold>
                      {emp_data.first_name}
                    </Text>
                    <input
                      className={styles.inputNone}
                      id="myjobpostscreen___input"
                    />
                  </Flex>
                  <Card className={styles.cardOverAll}>
                    <Modal open={isProfileView}>
                      <Flex
                        style={{
                          backgroundColor: '#ffffff',
                          padding: '25px',
                          // height: '496px',
                          width: '650px',
                          borderRadius:"4px"
                        }}
                      >
                        <PersonalInformationEdit
                          cancel={() => setProfileView(false)}
                          skills_list={skills_list}
                          emp_data={emp_data}
                          canId={canId}
                          displayHandler={() => setDisplay(false)}
                        />
                      </Flex>
                    </Modal>

                    <>
                      <div
                        className={styles.svgEdit}
                        style={{ width: 'fit-content', top: -8 }}
                        onClick={handleOpenPersonalEdit}
                        tabIndex={-1}
                        role="button"
                        onKeyDown={() => {}}
                      >
                        <SvgEdit width={16} height={16} fill={PRIMARY} />
                      </div>
                      <div style={{ marginTop: -24 }}>
                        {data.map((list) => (
                          <Flex
                            key={list.title}
                            row
                            top
                            className={styles.insideFlex}
                          >
                            <Text
                              style={{
                                paddingRight: list.right,
                                whiteSpace: 'nowrap',
                                color: '#581845',
                              }}
                            >
                              {list.title}
                            </Text>
                            {list.title === 'Contact Number:' ? (
                              <>
                                {!isEmpty(list.value) ? (
                                  <div className={styles.phoneHide}>
                                    <PhoneInput
                                      inputClass={styles.phoneInput}
                                      dropdownClass={styles.dropDownStyle}
                                      value={list.value?.toString()}
                                    />
                                  </div>
                                ) : (
                                  <Text>{notSpecified(list.value)}</Text>
                                )}
                              </>
                            ) : (
                              <Text>{list.value}</Text>
                            )}
                          </Flex>
                        ))}
                      </div>
                    </>
                  </Card>
                  {/* <Flex className={styles.titleStyle}>
                    <Text size={16} bold>
                      Data used for Matching
                    </Text>
                  </Flex>*/}
                  {/*<Card className={styles.cardOverAll}>
                    {isworkExpEdit && (
                      <AddandUpdateWorkExperienceEdit
                        cancel={() => setworkExpEdit(false)}
                        obj={obj}
                        isUpdateId={isUpdateId}
                        isUpdate
                        canId={canId}
                        experiences={experience}
                      />
                    )}

                    {isworkExpAdd && (
                      <AddandUpdateWorkExperienceEdit
                        cancel={() => setworkExpAdd(false)}
                        canId={canId}
                      />
                    )}
                    {!isworkExpEdit && !isworkExpAdd && (
                      <>
                        <Flex className={styles.titleStyle}>
                          <Flex
                            row
                            center
                            between
                            className={styles.titleStyleAdd}
                          >
                            <Text size={16} bold>
                              Work Experience
                            </Text>
                            <div
                              onClick={() => setworkExpAdd(true)}
                              tabIndex={-1}
                              role="button"
                              style={{ marginLeft: 10 }}
                              onKeyDown={() => {}}
                            >
                              <SvgRoundAdd fill={PRIMARY} />
                            </div>
                          </Flex>
                        </Flex>
                        {experience.map((list: any, index: number) => (
                          <Flex
                            key={list.designation}
                            top
                            className={styles.insideFlex}
                          >
                            {(list.work_role !== '' ||
                              list.designation !== '') && (
                              <>
                                <Flex row between>
                                  <Flex>
                                    <Text bold>{list.designation}</Text>
                                  </Flex>
                                  <Flex>
                                    <div
                                      onClick={() =>
                                        handleWorkUdateOpen(
                                          list.exp_id.toString(),
                                        )
                                      }
                                      tabIndex={-1}
                                      role="button"
                                      onKeyDown={() => {}}
                                    >
                                      <SvgBoxEdit fill={PRIMARY} />
                                    </div>
                                  </Flex>
                                </Flex>
                                {list.work_role !== '' && (
                                  <>
                                    {index.toString() !== isTrunk ? (
                                      <>
                                        <Text className={styles.wordTrunk}>
                                          {list.work_role}
                                        </Text>
                                        <Text
                                          align={'right'}
                                          color="link"
                                          onClick={() =>
                                            handleTrunk(index.toString())
                                          }
                                        >
                                          View More...
                                        </Text>
                                      </>
                                    ) : (
                                      <>
                                        <Text>{list.work_role}</Text>
                                        <Text
                                          align={'right'}
                                          color="link"
                                          onClick={() => handleCloseTrunk()}
                                        >
                                          View less...
                                        </Text>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </Flex>
                        ))}
                      </>
                    )}

                    {isSkillsEdit && (
                      <UpdateProfessionalSkillsEdit
                        open={isSkillsEdit}
                        cancel={() => setSkillsEdit(false)}
                        obj={obj}
                        canId={canId}
                        isAddText={'Update'}
                      />
                    )}

                    {!isSkillsEdit && (
                      <Flex top className={styles.insideFlex}>
{skills === null && (
                          <Flex
                            row
                            center
                            between
                            className={styles.titleStyleAdd}
                          >
                            <Text size={16} bold>
                           Technical Skills
                            </Text>
                            <div
                                onClick={handleOpenSkillEdit}
                              tabIndex={-1}
                              role="button"
                              style={{ marginLeft: 10 }}
                              onKeyDown={() => {}}
                            >
                              <SvgRoundAdd fill={PRIMARY} />
                            </div>
                          </Flex>

                          )}
                        {skills !== null && (
                        <Flex row between>
                          <Flex>
                            <Text size={16} bold>Technical Skills</Text>
                          </Flex>
                          <Flex>
                           
                        
                            <div
                              onClick={handleOpenSkillEdit}
                              tabIndex={-1}
                              role="button"
                              onKeyDown={() => {}}
                            >
                              <SvgBoxEdit fill={PRIMARY} />
                            </div>
                           
                          </Flex>
                        </Flex>
                         )}
                        {skills && (
                          <Text style={{ wordBreak: 'break-word' }}>
                            {skills.tech_skill}
                          </Text>
                        )}
                      </Flex>
                    )}

                    {isQualificationEdit && (
                      <AddandUpdateQualificationEdit
                        open={isQualificationEdit}
                        cancel={() => setQualificationEdit(false)}
                        isUpdate
                        canId={canId}
                        isUpdateId={isUpdateId}
                        obj={obj}
                      />
                    )}

                    {isQualificationAdd && (
                      <AddandUpdateQualificationEdit
                        open={isQualificationAdd}
                        canId={canId}
                        cancel={() => setQualificationAdd(false)}
                        isUpdateId={'0'}
                      />
                    )}
                    {!isQualificationEdit && !isQualificationAdd && (
                      <Flex top className={styles.insideFlex}>
                        <Flex
                          row
                          center
                          between
                          className={styles.titleStyleAdd}
                        >
                          <Text size={16} bold>
                            Qualification
                          </Text>
                          <div
                            onClick={() => setQualificationAdd(true)}
                            tabIndex={-1}
                            role="button"
                            style={{ marginLeft: 10 }}
                            onKeyDown={() => {}}
                          >
                            <SvgRoundAdd fill={PRIMARY} />
                          </div>
                        </Flex>

                        {education &&
                          education.map((edu: any) => (
                            <Flex
                              key={edu.qual_title}
                              top
                              className={styles.insideFlex}
                            >
                              <Flex row between>
                                <Flex>
                                  <Text bold>
                                    {edu.qual_title}-{edu.qual_spec}
                                  </Text>
                                </Flex>
                                <Flex>
                                  <div
                                    onClick={() =>
                                      handleQualificationEdit(
                                        edu.edu_id.toString(),
                                      )
                                    }
                                    tabIndex={-1}
                                    role="button"
                                    onKeyDown={() => {}}
                                  >
                                    <SvgBoxEdit fill={PRIMARY} />
                                  </div>
                                </Flex>
                              </Flex>
                            </Flex>
                          ))}
                      </Flex>
                    )}

                    
                  </Card>*/}
                  {jdId !== undefined && (
                    <Flex className={styles.titleStyle}>
                      <Text size={14} bold>
                        Questionnaire
                      </Text>
                    </Flex>
                  )}
                  {jdId !== undefined && (
                    <Card className={styles.cardOverAll}>
                      {isAnswer === false && questionnaire.length > 0 ? (
                        <>
                          <FormikProvider value={formik}>
                            <FieldArray
                              name="map"
                              render={(arrayHelpers) =>
                                questionnaire &&
                                questionnaire.map(
                                  (qustionsList: any, index: number) => {
                                    return (
                                      <ApplicantQustionsSubmit
                                        key={index}
                                        value={qustionsList}
                                        formik={formik}
                                        isRequired={true}
                                        arrayHelpers={arrayHelpers}
                                        index={index}
                                        // showButtonHandler={showButtonHandler}
                                      />
                                    );
                                  },
                                )
                              }
                            />
                          </FormikProvider>
                          <Flex end>
                            <Button
                              // disabled={showButton}
                              onClick={() => {
                                setPermanently(true);
                              }}
                            >
                              Submit
                            </Button>
                          </Flex>
                        </>
                      ) : (
                        <Flex columnFlex>
                          {questionnaireAns && questionnaireAns.length === 0 ? (
                            <Flex flex={1} center middle>
                              <Text color="gray">
                                No questions available for this job
                              </Text>
                            </Flex>
                          ) : (
                            // <Flex row between>
                            //   <Flex>
                                <Text bold size={13} color="black2" style={{marginBottom:"5px"}}>
                                  Applicant Response for Questionnaire
                                </Text>
                            //   </Flex>
                            // </Flex>
                          )}
                          {questionnaireAns &&
                            questionnaireAns.map((list: any, index: number) => {
                              return (
                                <Flex columnFlex key={list.question + index}>
                                  <Flex row center>
                                  <Text
                                    // textStyle="underline"
                                    // bold
                                    color='theme'
                                    className={styles.qustionStyle}
                                    style={{marginRight:"3px"}}
                                  >
                                     {index + 1}:
                                  </Text>
                                  <Text size={13} color='theme'>{list.question}</Text>
                                    </Flex>
                                  

                                  <Flex className={styles.resStyle} row center>
                                    {/* <Text bold>Response:</Text> */}

                                    {list.answer === '0' && (
                                      <Text style={{ marginLeft: 2 }}>No</Text>
                                    )}
                                    {list.answer === '1' && (
                                      <Text style={{ marginLeft: 2 }}>Yes</Text>
                                    )}
                                    {list.answer !== '0' &&
                                      list.answer !== '1' && (
                                        <Text size={13} style={{ marginLeft: 15, marginBottom: 10}} >
                                          {isEmpty(list.answer)
                                            ? <Text style={{ color: '#666666' }}>Not Answered</Text>
                                            : list.answer}
                                        </Text>
                                      )}
                                  </Flex>
                                </Flex>
                              );
                            })}
                        </Flex>
                      )}
                    </Card>
                  )}
                </div>
              </Flex>
            </div>
          </Flex>
        </Flex>
      </div>
    </Drawer>
  );
};
// const DisplayResume = () => {
//   return (
//     <DocViewer
//       style={{ height: '100%', width: '100%' }}
//       pluginRenderers={DocViewerRenderers}
//       documents={docs}
//       config={{
//         header: {
//           disableHeader: false,
//           disableFileName: false,
//           retainURLParams: false,
//         },
//       }}
//     />
//   )
// }
export default ProfileViewModal;
