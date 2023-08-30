import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useRef, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill, { Quill } from 'react-quill';
// import { Outlet } from "react-router-dom";
// import { Invoice } from "./Root.utils";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from 'react-html-parser';
// import parse from 'html-react-parser';
// import 'react-quill/dist/quill.snow.css';
import Mention from 'quill-mention';
Quill.register('modules/mention', Mention);
import { useHistory } from 'react-router-dom';
import { Card } from '../../uikit';
import SvgInfo from '../../icons/SvgInfo';

import SvgNotes from '../../icons/SvgNotes';
import SvgNotesyet from '../../icons/Svgnonotesyet';
import SvgRefresh from '../../icons/SvgRefresh';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import { BLACK } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { firstNameChar, isEmpty } from '../../uikit/helper';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Toast from '../../uikit/Toast/Toast';
import CandidateMessageTab from '../candidatemodule/CandidateMessageTab';
import {
  clientSecret,
  googleClientId,
} from '../accountsettingsmodule/integrationmodule/IntegrationScreen';
import {
  calenderTokenGetMiddleWare,
  calenderTokenMiddleWare,
} from '../accountsettingsmodule/integrationmodule/store/middleware/integrationmiddleware';
import RichText from '../common/RichText';
import Loader from '../../uikit/Loader/Loader';
import {
  mentionnotes,
  CANCEL,
  THIS_FIELD_REQUIRED,
  config,
  mediaPath,
  mentionspecialcharacter,
} from '../constValue';
import { outlookTimeZone } from '../dashboardmodule/empdashboard/mock';
import { meetingTitle } from './MeetingTable';
import NotesDropDown from './NotesDropDown';
import styles from './notestab.module.css';
import {
  applicantNotesMiddleWare,
  calenderMiddleWare,
  syncGoogleMiddleWare,
  syncOutlookMiddleWare,
  checkAuthMiddleware,
  eventsApplicantsMiddleware,
  applicantUserListMiddleWare,
  applicantUserListstateMiddleWare,
} from './store/middleware/applicantProfileMiddleware';
import MessageTab from './MessageTab';
var querystring = require('querystring');

const cx = classNames.bind(styles);

export type FormProps = {
  notes: string;
};
const initial: FormProps = {
  notes: '',
};
type Props = {
  isMeeting?: boolean;
  issingletab?: boolean;
  candidatemessage?: boolean;
  nomessagetab?: boolean;
};
const NotesTab = ({
  isMeeting,
  issingletab,
  candidatemessage,
  nomessagetab,
}: Props) => {
  const [editorHtml, setEditorHtml] = useState<string>('');
  const editorRef = useRef<ReactQuill | null>(null);
  const [isCollapse, setCollapse] = useState(false);
  const [isstylechange, setstylechange] = useState(false);
  const [isColor, setColor] = useState<string[]>([]);
  const [buttonName, setButtonName] = useState('Add');
  const [getId, setGetId] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const [active, setActive] = useState(0);
  const [isGoogle, setIsGoogle] = useState(2);
  const [isLoad, setIsLoad] = useState(true);
  const [requir, setrequir] = useState();
  const [ischeck, setcheck] = useState(false);
  const [update, setupdate] = useState(false);
  const [valuestate, setvaluestate] = useState<string[]>([]);
  const [valueun, setvalueun] = useState('');
  const [listmen, setList] = useState([]);
  const [hideelement, sethideelement] = useState(true);
  const [datastring, setDatastring] = useState<string | undefined>(
    localStorage.getItem('Datastring') || undefined,
  );
  const [myevents, setMyevents] = useState<any[]>([]);
  const history = useHistory();
  useEffect(() => {
    dispatch(applicantUserListMiddleWare()).then((res) => {
      setIsLoad(false);
    });
  }, []);

  const checkAuth = () => {
    dispatch(checkAuthMiddleware())
      .then((res) => {
        if (res.payload.status === true) {
          if (res.payload.account === 'google') {
            setIsGoogle(1);
          } else {
            setIsGoogle(0);
          }
          setActive(1);
          setIsLoad(false);
          dispatch(eventsApplicantsMiddleware({ can_id }))
            .then((response) => {
              if (response.payload.status === true) {
                setMyevents(
                  response.payload.data.map((items: any) => {
                    return {
                      title: items.event_type + ' ' + items.applicant,
                      organizer: response.payload.user,
                      date: items.s_time,
                      time:
                        items.s_time.slice(12, 16) +
                        ' - ' +
                        items.e_time.slice(12, 16),
                    };
                  }),
                );
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setActive(0);
          setIsLoad(false);
        }
      })
      .catch(() => {
        console.log('Error');
      });
  };
  useEffect(() => {
    checkAuth();
    const colorCode = [
      '#d08014',
      '#d04343',
      '#db1f77',
      '#c0399f',
      '#6367de',
      '#286eb4',
      '#0f828f',
      '#7ca10c',
      '#925ace',
      '#647987',
    ];

    setColor(colorCode);
  }, []);

  const {
    candidate_details,
    notes,
    can_id,
    jd_id,
    // calenderEvent,
    // google,
    outlook,
    message,
    name,
    calenderLoader,
  } = useSelector(
    ({
      applicantNotesReducers,
      applicantProfileInitalReducers,
      calenderReducers,
      applicantUserlistReducer,
      applicantMessageReducers,
    }: RootState) => {
      return {
        candidate_details: applicantProfileInitalReducers.candidate_details,
        notes: applicantNotesReducers.notes,
        name: applicantUserlistReducer.data,
        can_id: applicantProfileInitalReducers.can_id,
        jd_id: applicantProfileInitalReducers?.jd_id,
        message: applicantMessageReducers?.message,
        // calenderEvent: calenderReducers.event,
        // google: calenderReducers.google,
        outlook: calenderReducers.outlook,
        calenderLoader: calenderReducers.isLoading,
      };
    },
  );

  // notes submit function

  const handleSubmit = (values: FormProps) => {
    const string = valueun;
    const final = [];
    const list2 = [{ user: -1, value: 'Everyone' }];
    if (name !== undefined) {
      const valu = [...list2, ...name];
      setList(valu);
      for (let i = 0; i < valu.length; i++) {
        const element = valu[i].value;
        if (string.includes(element)) {
          final.push(valu[i].user);
        }
      }
    } else {
      for (let i = 0; i < listmen.length; i++) {
        const element = listmen[i].value;
        if (string.includes(element)) {
          final.push(listmen[i].user);
        }
      }
    }

    const formData = new FormData();
    if (final.length !== 0) {
      formData.append('otheruserid', final.toString());
    } else {
      const testing = '-2';
      formData.append('otheruserid', testing);
      formData.append('notes', '');
    }
    
    const data = querystring.stringify({
      pk: can_id,
      notes: values.notes, 
    });
    const notesbody = parser.parseFromString(values.notes, 'text/html');
    const textNode = notesbody.querySelectorAll('body')[0].textContent;
    formData.append('body', textNode);
    formData.append('candidate_id', can_id);
    formData.append('jd_id',jd_id?jd_id:'0');
    if (buttonName === 'Add') {
      if (final.length !== 0) {
        const doc = parser.parseFromString(values.notes, 'text/html');
        const textNodes = doc.querySelectorAll('body')[0].textContent; 
        const applicantnames = candidate_details.map((e) => e.first_name);
        const test = ' has added a note to ' + applicantnames + '’s profile.';
        formData.append('notes', test);
        formData.append('body', textNodes);
        formData.append('jd_id',jd_id);
      }
      setupdate(false);
      setIsLoad(true);
      axios
        .post(`candidate_notes?pk=${can_id}`, data)
        .then(() => {
          setCollapse(false);
          setstylechange(false);
          sethideelement(true);
          dispatch(applicantUserListstateMiddleWare({ formData }));
          dispatch(applicantNotesMiddleWare({ can_id }));
          Toast('Notes added successfully', 'LONG', 'success');
        })
        .then(() => {
          setIsLoad(false);
          setname1('');
          formik.values.notes = '';
          formik.resetForm();
        });
    }
    const notesbodys = parser.parseFromString(values.notes, 'text/html');
    const textNod = notesbodys.querySelectorAll('body')[0].textContent;
    const dataOne = querystring.stringify({
      pk: getId,
      notes: values.notes,
      body:textNod,
      update: 'update',
    });

    if (buttonName === 'Update') {
      if (final.length !== 0) {
        const doc = parser.parseFromString(values.notes, 'text/html');
        const textNodes = doc.querySelectorAll('body')[0].textContent;
        const applicantnames = candidate_details.map((e) => e.first_name);
        const test = ' has updated a note to ' + applicantnames + '’s profile.';
        formData.append('notes', test);
        formData.append('body', textNodes);
        formData.append('jd_id',jd_id);
      }
      setupdate(true);
      setIsLoad(true);
      axios
        .post(`candidate_notes?pk=${can_id}`, dataOne, config)
        .then(() => {
          setCollapse(false);
          sethideelement(true);
          setstylechange(false);
          dispatch(applicantUserListstateMiddleWare({ formData }));
          dispatch(applicantNotesMiddleWare({ can_id }));
          if (buttonName === 'Update') {
            Toast('Notes updated successfully', 'LONG', 'success');
          }
          dispatch(applicantUserListMiddleWare());
        })
        .then(() => {
          setIsLoad(false);
          setButtonName('Add');
          setname1('');
          formik.values.notes = '';
          formik.resetForm();
        });
    }
  };

  const parser = new DOMParser();

  type notess = {
    notes: string;
  };
  const handlerequire = (values: notess) => {
    const errors: Partial<notess> = {};
    const doc = parser.parseFromString(formik.values.notes, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    if (texttrim === '') {
      setcheck(true);
      errors.notes = 'Enter valid notes.';
    } else if (
      !mentionnotes.test(textNodes) &&
      mentionspecialcharacter.test(textNodes)
    ) {
      setcheck(true);
      errors.notes = 'Notes length should not exceed 2000 characters.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    validate: handlerequire,
    enableReinitialize: true,
  });

  useEffect(() => {
    if (formik.values.notes) {
      setvalueun(formik.values.notes);
    }
  }, [formik.values.notes]);
  useEffect(() => {
    formik.setFieldValue('notes', name1);
  }, []);
  // add notes function
  const hanldeInputOpen = () => {
    setButtonName('Add');
    sethideelement(false);
    setstylechange(true);
    setcheck(false);
    setCollapse(true);
    formik.setFieldValue('notes', name1);
    dispatch(applicantUserListMiddleWare());
  };
  // close notes function
  const hanldeInputClose = () => {
    setCollapse(false);
    setstylechange(false);
    sethideelement(true);
    setcheck(false);
    setname1('');
    formik.setFieldValue('notes', '');
    formik.resetForm();
  };

  // notes delete function
  const handleDelete = (id: number) => {
    setIsLoad(true);
    axios
      .delete('candidate_notes', { params: { pk: id } })
      .then(() => {
        Toast('Notes deleted successfully');
        dispatch(applicantNotesMiddleWare({ can_id }));
      })
      .then(() => {
        setIsLoad(false);
      });
  };

  // notes submit function
  const handleOpenEdit = (value: string, id: any) => {
    setButtonName('Update');
    setcheck(false);
    setGetId(id);
    formik.setFieldValue('notes', value);
    setCollapse(true);
    sethideelement(false);
  };
  // const checkPlatForm =
  //   google && google.length === 0 && outlook && outlook.length === 0
  //     ? true
  //     : false;
  const getOut: any = localStorage.getItem('timeZone');

  // refresh calendar function
  const hanldeRefresh = () => {
    dispatch(calenderTokenGetMiddleWare()).then((res) => {
      if (!isEmpty(res.payload.google)) {
        axios
          .request({
            method: 'post',
            url: 'https://oauth2.googleapis.com/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            params: {
              client_id: googleClientId,
              client_secret: clientSecret,
              refresh_token: res.payload.google[0].accessToken,
              grant_type: 'refresh_token',
            },
          })
          .then((refresh) => {
            dispatch(
              calenderTokenMiddleWare({
                calendar: 'google',
                info: {
                  accessToken: refresh.data.access_token,
                  email: res.payload.google[0].email,
                  timeZone: getOut,
                },
              }),
            );
          })
          .then(() => {
            dispatch(syncGoogleMiddleWare()).then(() => {
              dispatch(calenderMiddleWare({ can_id }));
            });
          });
      }

      if (!isEmpty(res.payload.outlook)) {
        dispatch(syncOutlookMiddleWare()).then(() => {
          dispatch(calenderMiddleWare({ can_id }));
        });
      }
    });
  };

  if (editorRef.current) {
    const list2 = [{ user: -1, value: 'Everyone' }];
    if (name !== undefined) {
      const valu = [...list2, ...name];
      const fgt = valu.map((e) => e.value);
      const quill = editorRef.current.getEditor();
      const mention = new Mention(quill, {
        mentionDenotationChars: ['@'],
        allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
        source: (searchTerm: string, renderList: (values: any[]) => void) => {
          const filteredMentions = valu.filter((m) =>
            m.value.toLowerCase().includes(searchTerm.toLowerCase()),
          );
          renderList(filteredMentions);
          // dispatch(applicantUserListMiddleWare());
        },
      });
    }
  }
  const LOCAL_STORAGE_KEY = can_id;
  const [name1, setname1] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || '',
  );
  useEffect(() => {
    const doc = parser.parseFromString(formik.values.notes, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    if (textNodes.length !== 0 || name1 === '') {
      setname1(formik.values.notes);
    }
  }, [formik.values.notes, name1]);

  useEffect(() => {
    const doc = parser.parseFromString(formik.values.notes, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    if (textNodes.length === 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(''));
    }
  }, [formik.values.notes]);
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(name1));
  }, [name1]);
  const handleSetting = () => {
    sessionStorage.setItem('superUserTab', '4');
    sessionStorage.setItem('superUserFalseTab', '3');
    history.push('/account_setting/settings');
  };
  const words = notes[0]?.updated_by?.split(' ');
  const meetingMemo = useMemo(() => meetingTitle(), [myevents]);
  const checkCalendarOutlook = Array.isArray(outlook) && outlook.length !== 0;
  return (
    <Flex
      row
      flex={12}
      className={styles.overAll}
      height={window.innerHeight - 120}
    >
      <Flex
        flex={6}
        columnFlex
        style={{ padding: '5px', overflow: 'scroll' }}
        height={window.innerHeight - 89.5}
      >
        <Text
          bold
          style={{ fontSize: '14px', marginTop: '13.5px', paddingLeft: 16 }}
        >
          Notes for Team Members
        </Text>
        <Flex className={styles.overall1}>
          <Flex className={styles.textArea}>
            <ReactQuill
              ref={editorRef}
              value={formik.values.notes}
              className={styles.reactquillchange}
              onChange={formik.handleChange('notes')}
              placeholder="Type @ to mention and notify your team members"
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="notes"
            />
          </Flex>
          <Flex marginTop={2.5} row end>
            <Button onClick={hanldeInputClose} types={'close'} width="100px">
              {CANCEL}
            </Button>
            <Button
              width="100px"
              // disabled={isEmpty(formik.values.notes)}
              onClick={formik.handleSubmit}
              className={styles.saveBtn}
            >
              {buttonName}
            </Button>
          </Flex>
          {notes && notes.length !== 0 && (
            <Flex className={styles.middleline}></Flex>
          )}
        </Flex>
        {notes && notes.length === 0 && (
          <Flex columnFlex flex={1} middle center>
            <SvgNotesyet fill="gray" />
            <Text className={styles.nojoppostye} color="gray">
              Notes not created yet
            </Text>
          </Flex>
        )}

        <Flex
          // height={window.innerHeight - 338}
          style={{
            //   overflow: 'scroll',
            padding: ' 0px 16px 0px 16px',
            //   display: 'flex',
          }}
        >
          {notes &&
            notes
              .map((list, indexList) => {
                return (
                  <>
                    {list.notes !== '' && (
                      <Flex
                        key={list.notes + indexList}
                        columnFlex
                        className={styles.notesOverAll}
                      >
                        <Card className={styles.cardinnotes}>
                          <Flex row className={styles.notestext}>
                            <Flex row center>
                              {isEmpty(list.emp_image) ||
                              list.emp_image === 'default.jpg' ? (
                                <div
                                  className={cx('profile')}
                                  style={{
                                    backgroundColor:
                                      isColor[indexList % isColor.length],
                                  }}
                                >
                                  <Text
                                    color="white"
                                    transform="uppercase"
                                    className={styles.firstlastchar}
                                  >
                                    {!isEmpty(list.updated_by) &&
                                      `${words[0][0]}${
                                        words[words.length - 1][0]
                                      }`}
                                  </Text>
                                </div>
                              ) : (
                                <img
                                  alt="profile"
                                  style={{
                                    borderRadius: '100%',
                                    objectFit: 'cover',
                                    marginRight: 8,
                                    height: 40,
                                    width: 40,
                                  }}
                                  src={mediaPath + list.emp_image}
                                />
                              )}
                              <Text bold>{list.updated_by}</Text>
                            </Flex>
                            <Flex middle center row>
                              <NotesDropDown
                                notesList={list}
                                handleDelete={handleDelete}
                                handleOpenEdit={handleOpenEdit}
                              />
                            </Flex>
                          </Flex>
                          <Flex
                            className={styles.noteListStyle}
                            style={{
                              flexWrap: 'wrap',
                              overflow: ' hidden',
                              textOverflow: 'clip',
                              fontSize: 13,
                            }}
                          >
                            <td
                              className={styles.notesTextStyle}
                              dangerouslySetInnerHTML={{
                                __html: list.notes,
                              }}
                            />
                          </Flex>
                        </Card>
                      </Flex>
                    )}
                  </>
                );
              })
              .reverse()}
        </Flex>
        {isLoad && <Loader />}
      </Flex>

      {nomessagetab || candidatemessage ? (
        <Flex
          height={window.innerHeight - 115}
          style={{
            border: '0.3px solid #C3C3C3',
            width: '0.3px',
            margin: '15px 5px 10px 5px',
            paddingTop: '10px',
            paddingBottom: '10px',
          }}
        ></Flex>
      ) : (
        ''
      )}
      {nomessagetab && (
        <Flex flex={6.4}>
          <MessageTab />
        </Flex>
      )}
      {candidatemessage && (
        <Flex flex={6.4}>
          <CandidateMessageTab />
        </Flex>
      )}
    </Flex>
  );
};

export default NotesTab;
