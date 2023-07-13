import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { AppDispatch, RootState } from '../../store';
import MessageTemplate from '../../modules/applicantprofilemodule/MessageTemplate';
import {
  getEmail,
  outlookUserProfile,
} from '../emailintegrationmodule/store/middleware/emailIntegrationMiddleWare';
import {
  applicantMessagesMiddleWare,
  messagesTemplatesMiddleWare,
} from '../../modules/applicantprofilemodule/store/middleware/applicantProfileMiddleware';

import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import Modal from '../../uikit/Modal/Modal';
import Flex from '../../uikit/Flex/Flex';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import SvgVectorexpand from '../../icons/SvgMailExpand';
import SvgVectorMinimise from '../../icons/SvgMailMinimise';
import Upload from '../../icons/SvgAttach';
import Temadd from '../../icons/SvgFileplus';
import SvgVectorClose from '../../icons/SvgMailClose';

//import SelectTag from '../../uikit/SelectTag/SelectTag';
import config from '../../outlookmailConfig';
import RichText from '../common/RichText';
import { SvgTrash } from '../../icons';
import { composemail, mailreplay, mailforward } from '../../emailService';
import InputText from '../../uikit/InputText/InputText';
import SvgCollapse from '../../icons/SvgCollapse';
import VerificationModel from './emailverificationmodelwindow';
import Draftmodel from './draftsavemodal';
import Multiselect from './multiselect';
import styles from './compose.module.css';
import maildata from './composemail.json';

type Props = {
  data: boolean;
  mail: string;
  onClose: () => void;
  replaymsg: any;
};

const Newmessage = ({ data, onClose, mail, replaymsg }: Props) => {
  const msal = useMsal();
  const dispatch: AppDispatch = useDispatch();

  const [style, setstyle] = useState(0);
  const [openCc, setopenCc] = useState(false);
  const [openBcc, setopenBcc] = useState(false);
  const [file, setFile] = useState([]);
  const [faildfile, setfaildfile] = useState([]);
  const [attachfile, setAttachfile] = useState([]);
  const [templatemodel, settemplatemodel] = useState(false);
  const [loader, setloader] = useState(false);

  const [Email, setEMail] = useState([
    { value: 'sridharc@sense7ai.com', label: 'sridharc@sense7ai.com' },
    { value: 'manojr@sense7ai.com', label: 'manojr@sense7ai.com' },
    { value: 'pugazhendhij@sense7ai.com', label: 'pugazhendhij@sense7ai.comm' },
    {
      value: 'sridharchinnathambi96@gmail.com',
      label: 'sridharchinnathambi96@gmail.com',
    },
  ]);
  const [tomail, setTomail] = useState([]);
  //multi select to mail //
  const [tosample, setTosample] = useState<any>([]);

  const [ccmail, setCcmail] = useState([]);
  //multi select cc mail //
  const [ccsample, setCcsample] = useState<any>([]);

  const [bccmail, setBccmail] = useState([]);
  //multi select bcc mail //
  const [bccsample, setBccsample] = useState<any>([]);

  const [text, setText] = useState('');

  const [message, setmessage] = useState('');
  const [verifiymodel, setVerifymodel] = useState<{
    open: boolean;
    actions?: React.ReactNode;
  }>({ open: false });

  const { messageTemplate } = useSelector(
    ({ messageTemplateReducers }: RootState) => {
      return {
        messageTemplate: messageTemplateReducers.messageTemplate,
      };
    },
  );

  const emailcollection = useSelector(({ useremail }: RootState) => {
    return {
      emailcollection: useremail.mails,
    };
  });

  console.log('email ccollection', emailcollection.emailcollection);

  const [subject, setSubject] = useState('');

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    },
  );

  const [draft, setDraft] = useState(false);

  const [messagebody, setMessagebody] = useState('');

  const replaymail = () => {
    if (replaymsg !== '') {
      var to = [];
      var converto = [];
      var a = {
        value: replaymsg.from.emailAddress.address,
        label: replaymsg.from.emailAddress.address,
      };

      const mailconvert = {
        emailAddress: {
          address: replaymsg.from.emailAddress.address,
        },
      };

      to.push(a);
      converto.push(mailconvert);
      setTosample(to);
      setTomail(converto);
      setSubject(replaymsg.subject);
    }
  };

  useEffect(() => {
    dispatch(messagesTemplatesMiddleWare());
    //replaymail();
    dispatch(getEmail()).then((res) => {});
  }, [replaymsg]);

  //modal close function //
  const handleClose = () => {
    if (
      tomail.length !== 0 ||
      ccmail.length !== 0 ||
      bccmail.length !== 0 ||
      subject.length !== 0 ||
      attachfile.length !== 0 ||
      formik.values.userMessage !== ''
    ) {
      closeverify();
    } else {
      onClose();
      setstyle(0);
      setopenCc(false);
      setopenBcc(false);
    }
  };

  const handleview = () => {
    setstyle(1);
  };
  const handleViewPopup = () => {
    setstyle(0);
  };

  const Minimise = () => {
    setstyle(2);
  };

  const openCC = () => {
    setopenCc(true);
  };

  const openBCC = () => {
    setopenBcc(true);
  };

  //Email Props//
  const Emailprops = {
    message: {
      subject: subject,
      body: {
        contentType: 'HTML',
        content: messagebody,
      },
      toRecipients: tomail,

      ccRecipients: ccmail,
      bccRecipients: bccmail,
      attachments: attachfile,
    },
    saveToSentItems: true,
  };

  //Replay props//
  const replay = {
    message: {
      subject: subject,
      toRecipients: tomail,
      ccRecipients: ccmail,
      bccRecipients: bccmail,
      attachments: attachfile,
    },
    comment: messagebody,
    saveToSentItems: true,
  };

  //forward props//
  const forward = {
    comment: messagebody,
    subject: subject,
    toRecipients: tomail,
    ccRecipients: ccmail,
    bccRecipients: bccmail,
    attachments: attachfile,
    saveToSentItems: true,
  };
  const composeemail = async () => {
    setloader(true);
    await composemail(authProvider, Emailprops)
      .then((res) => {
        setloader(false);
        Toast('Message send successfully', 'LONG', 'success');
        clearform();
        onClose();
        setstyle(0);
      })
      .catch((error) => {});
  };
  const dailougeActions = (
    <Flex row end marginTop={20} className={styles.borderLine}>
      <Button
        types={'secondary'}
        onClick={() => setVerifymodel({ open: false, actions: undefined })}
        style={{ marginRight: '10px' }}
      >
        Don`t send
      </Button>
      <Button
        types={'primary'}
        onClick={() => {
          composeemail();
          setVerifymodel({ open: false, actions: undefined });
        }}
      >
        Send
      </Button>
    </Flex>
  );

  //Email compose function //
  const sendmail = async () => {
    if (tomail.length === 0) {
      setmessage('Email must have at least one recipient.');
      setVerifymodel({ open: true });
    } else if (subject.length === 0) {
      setmessage(
        'Email subject is missing. Do you want to send without a subject?',
      );
      setVerifymodel({ open: true, actions: dailougeActions });
    } else if (formik.values.userMessage === '') {
      setmessage(
        'Email content is missing. Please add the content before sending.',
      );
      setVerifymodel({ open: true });
    } else {
      composeemail();

      // await mailreplay(authProvider, replaymsg.id, replay)
      //   .then((res) => {
      //     console.log('res', res);
      //     Toast('message send successfully', 'LONG', 'success');
      //     clearform();
      //   })
      //   .catch((error) => {
      //     console.log('error', error);
      //   });

      // await mailforward(authProvider, replaymsg.id, forward)
      //   .then((res) => {
      //     // console.log('res', res);
      //   })
      //   .catch((error) => {
      //     // console.log('error', error);
      //   });
    }
  };

  const clearform = () => {
    setAttachfile([]);
    setTomail([]);
    setCcmail([]);
    setBccmail([]);
    setSubject('');
    setCcsample([]);
    setBccsample([]);
    setTosample([]);
    setFile([]);
    formik.resetForm();
    // onClose();
    setstyle(0);
    setopenCc(false);
    setopenBcc(false);
  };

  const selectfile = (e: any) => {
    const filterFileGreter = [...e.target.files].filter(
      (item) => item.size > 10000000,
    );
    const filterFileles = [...e.target.files].filter(
      (item) => item.size < 10000000,
    );

    let as = filterFileles;

    var allFiles = [...attachfile];

    for (var i = 0; i < as.length; i++) {
      let filecollection = as[i];
      let reader = new FileReader();
      reader.readAsDataURL(filecollection);

      reader.onload = () => {
        let fileInfo = {
          '@odata.type': '#microsoft.graph.fileAttachment',
          name: filecollection.name,
          contentBytes: String(reader.result).split(',')[1],
        };
        allFiles.push(fileInfo);
      };
    }

    setFile(file.concat(filterFileles));

    if (filterFileGreter.length !== 0) {
      setfaildfile(faildfile.concat(filterFileGreter));
    }
    setAttachfile(allFiles);

    console.log('cv', allFiles);
    // setAttachfile(attachfile.concat(allFiles));
  };

  const handleModel = () => {
    settemplatemodel(!templatemodel);
  };

  const formik = useFormik({
    initialValues: {
      userMessage: '',
    },
    onSubmit: () => {},
  });

  const getto = (val) => {
    setTosample(val);
    let lastElement = val.slice(-1);

    let check = tosample.filter((x) => !val.includes(x));

    if (check.length !== 0) {
      const removemail = tomail.filter(
        (item) => item.emailAddress.address !== check[0].value,
      );
      setTomail(removemail);
    } else {
      const mailconvert = {
        emailAddress: {
          address: lastElement[0].value,
        },
      };

      setTomail([...tomail, mailconvert]);
    }
  };

  const getcc = (val) => {
    setCcsample(val);
    let lastElement = val.slice(-1);

    let check = ccsample.filter((x) => !val.includes(x));

    if (check.length !== 0) {
      const removemail = ccmail.filter(
        (item) => item.emailAddress.address !== check[0].value,
      );
      setCcmail(removemail);
    } else {
      const mailconvert = {
        emailAddress: {
          address: lastElement[0].value,
        },
      };
      setCcmail([...ccmail, mailconvert]);
    }
  };

  const getbcc = (val) => {
    setBccsample(val);
    let lastElement = val.slice(-1);

    let check = bccsample.filter((x) => !val.includes(x));

    if (check.length !== 0) {
      const removemail = bccmail.filter(
        (item) => item.emailAddress.address !== check[0].value,
      );
      setBccmail(removemail);
    } else {
      const mailconvert = {
        emailAddress: {
          address: lastElement[0].value,
        },
      };
      setBccmail([...bccmail, mailconvert]);
    }
  };

  const getsubject = (e) => {
    setSubject(e.target.value);
  };

  const close = () => {
    setVerifymodel({ open: false });
  };

  const romovefile = (valint) => {
    const newdata = file.filter((val, index) => index !== valint);
    const attach = attachfile.filter((vals, ind) => ind !== valint);
    setFile(newdata);
    setAttachfile(attach);
  };

  const closeverify = () => {
    setDraft(!draft);
  };

  const editchage = (e) => {
    formik.setFieldValue('userMessage', e);
    setMessagebody(e);
  };

  return (
    <div>
      {console.log('a1', file)}
      {console.log('a2', faildfile)}
      {console.log('a3', attachfile)}
      {console.log('formik', formik.values.userMessage)}
      {/* <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}> */}
      <Modal open={data}>
        {loader === true ? <Loader /> : ''}
        <div
          className={
            style === 1
              ? styles.modelmiddle
              : style === 2
              ? styles.minimised
              : styles.popup
          }
          style={{ overflow: 'hidden' }}
        >
          <Flex
            column
            flex={1}
            style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <Flex row center between className={styles.topSection}>
              <Text color="white">New Email</Text>
              <Flex row center between className={styles.optionMenu}>
                <Flex
                  title="Minimize"
                  style={{
                    marginTop: '10px',
                    marginRight: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgVectorMinimise onClick={Minimise} />
                </Flex>
                <Flex
                  title={style === 1 ? 'Exit full screen' : 'Full screen'}
                  style={{
                    // marginTop: '2px',
                    marginRight: '15px',
                    cursor: 'pointer',
                  }}
                >
                  {style === 1 ? (
                    <SvgCollapse fill="#ffffff" onClick={handleViewPopup} />
                  ) : (
                    <SvgVectorexpand onClick={handleview} />
                  )}
                </Flex>
                <Flex
                  title="Close"
                  style={{ marginTop: '1px', cursor: 'pointer' }}
                >
                  <SvgVectorClose
                    width={11}
                    height={11}
                    stroke="#ffffff"
                    viewBox="0 0 9 9"
                    onClick={handleClose}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex
              flex={1}
              column
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '5px 5px 10px 10px',
                overflowY: 'auto',
              }}
            >
              <Flex
                flex={1}
                column
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Flex row center className={styles.inputField}>
                  <Text>From </Text>
                  <Text size={12} className={styles.fromstyle}>
                    {mail}
                  </Text>
                </Flex>
                <Flex row center between className={styles.inputField}>
                  <Flex row center style={{ width: '100%' }}>
                    <Text>To </Text>
                    <Flex marginLeft={14} style={{ width: '100%' }}>
                      <Multiselect
                        options={emailcollection.emailcollection}
                        onChange={(e) => getto(e)}
                        value={tosample}
                      />
                    </Flex>
                  </Flex>

                  <Flex row>
                    {!openCc ? (
                      <Flex
                        marginRight={15}
                        onClick={openCC}
                        style={{ cursor: 'pointer' }}
                      >
                        Cc
                      </Flex>
                    ) : (
                      ''
                    )}

                    {!openBcc ? (
                      <Flex onClick={openBCC} style={{ cursor: 'pointer' }}>
                        Bcc
                      </Flex>
                    ) : (
                      ''
                    )}
                  </Flex>
                </Flex>

                {openCc ? (
                  <>
                    <Flex
                      row
                      center
                      className={styles.inputField}
                      style={{ width: '100%' }}
                    >
                      <Text size={14}>Cc</Text>
                      <Flex marginLeft={12} style={{ width: '100%' }}>
                        <Multiselect
                          options={emailcollection.emailcollection}
                          onChange={(e) => getcc(e)}
                          value={ccsample}
                        />
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  ''
                )}

                {openBcc ? (
                  <>
                    <Flex
                      row
                      center
                      className={styles.inputField}
                      style={{ width: '100%' }}
                    >
                      <Text size={14}>Bcc</Text>{' '}
                      <Flex marginLeft={6} style={{ width: '100%' }}>
                        <Multiselect
                          options={emailcollection.emailcollection}
                          onChange={(e) => getbcc(e)}
                          value={bccsample}
                        />
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  ''
                )}

                <Flex row center className={styles.inputField}>
                  {/* <Text style={{ marginTop: '1px' }}>Subject</Text> */}
                  <InputText
                    inputConatinerClass={styles.width100}
                    value={subject}
                    className={styles.inputStyle}
                    onChange={(e) => getsubject(e)}
                    placeholder="Add a subject"
                    style={{ padding: '4px 12px 3px 3px' }}
                  />
                </Flex>
                <Flex
                  flex={1}
                  column
                  marginBottom={45}
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 400,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      marginTop: '10px',
                      // marginBottom: '10px',
                      marginRight: '5px',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <RichText
                      containerStyle={{ flex: 1 }}
                      height={'100%'}
                      value={formik.values.userMessage}
                      onChange={(e) => editchage(e)}
                    />
                  </div>
                  <Flex
                    row
                    wrap
                    style={{ margin: '10px 5px' }}
                    className={styles.filesContainer}
                  >
                    {file.length !== 0 &&
                      file.map((list, index) => (
                        <Flex
                          flex={1}
                          row
                          center
                          marginRight={index % 2 === 1 ? 0 : '10px'}
                          className={styles.filesname}
                          key={index}
                        >
                          <Flex style={{ padding: '5px' }}>
                            <Text
                              size={12}
                              className={styles.attachfile}
                              title={`${index + 1}.${list.name}`}
                            >
                              {index + 1}.{list.name}
                            </Text>
                            <Text
                              size={10}
                              title={`${Math.round(list.size / 1024)} KB`}
                              style={{ color: '#666666' }}
                            >
                              {Math.round(list.size / 1024)} KB
                            </Text>
                          </Flex>
                          <Flex
                            style={{
                              height: '100%',
                              display: 'flex',
                              padding: '0',
                            }}
                            className={styles.iconsContainer}
                          >
                            <Flex
                              style={{
                                cursor: 'pointer',
                                padding: '5px 10px 5px 0px',
                                height: '100%',
                              }}
                              onClick={() => romovefile(index)}
                            >
                              <SvgVectorClose
                                width={11}
                                height={11}
                                className={styles.svgicon}
                                stroke="#333333"
                              />
                            </Flex>
                          </Flex>

                          {/* <SvgVectorClose
                              width={11}
                              height={11}
                              style={{
                                cursor: 'pointer',
                                marginLeft: '20px',
                              }}
                              stroke="#333333"
                              viewBox="0 0 9 9"
                              onClick={() => romovefile(index)}
                            /> */}
                        </Flex>
                      ))}
                  </Flex>
                  {faildfile.length !== 0 ? (
                    <>
                      <Flex> faild count : {faildfile.length}</Flex>

                      <Flex
                        row
                        wrap
                        style={{ margin: '10px 5px' }}
                        className={styles.filesContainer}
                      >
                        {faildfile.map((list, index) => (
                          <Flex
                            flex={1}
                            row
                            center
                            marginRight={index % 2 === 1 ? 0 : '10px'}
                            className={styles.filesname}
                            key={index}
                          >
                            <Flex style={{ padding: '5px' }}>
                              <Text
                                size={12}
                                className={styles.attachfile}
                                title={`${index + 1}.${list.name}`}
                              >
                                {index + 1}.{list.name}
                              </Text>
                              <Text
                                size={10}
                                title={`${Math.round(list.size / 1024)} KB`}
                                style={{ color: '#666666' }}
                              >
                                {Math.round(list.size / 1024)} KB
                              </Text>
                            </Flex>
                            <Flex
                              style={{
                                height: '100%',
                                display: 'flex',
                                padding: '0',
                              }}
                              className={styles.iconsContainer}
                            ></Flex>

                            {/* <SvgVectorClose
                              width={11}
                              height={11}
                              style={{
                                cursor: 'pointer',
                                marginLeft: '20px',
                              }}
                              stroke="#333333"
                              viewBox="0 0 9 9"
                              onClick={() => romovefile(index)}
                            /> */}
                          </Flex>
                        ))}
                      </Flex>
                    </>
                  ) : (
                    ''
                  )}
                </Flex>
              </Flex>
              <Flex row between center className={styles.action}>
                <Flex row center>
                  <Button
                    onClick={() => sendmail()}
                    style={{ marginRight: '10px' }}
                  >
                    Send
                  </Button>
                  <Flex
                    style={{ cursor: 'pointer', marginRight: '10px' }}
                    // onClick={handleModel}
                  >
                    <Flex
                      center
                      style={{ cursor: 'pointer' }}
                      title="Attach Files"
                    >
                      <label style={{ cursor: 'pointer', marginTop: '5px' }}>
                        <Upload width="19px" height="19px" fill="#581845" />
                        <input
                          type="file"
                          style={{ display: 'none' }}
                          multiple
                          //onChange={selectfile}
                          onChange={(files) => selectfile(files)}
                          accept=".doc,.docx,.pdf,.txt,.svg,.png,.jpeg,.jpg"
                        />
                      </label>
                    </Flex>
                  </Flex>
                  <Flex
                    style={{ cursor: 'pointer' }}
                    onClick={handleModel}
                    title="Insert Templates"
                  >
                    <Temadd width="16px" height="16px" />
                  </Flex>

                  {/* </Button> */}
                  {/* <Flex style={{ margin: '0px 10px 0px 10px' }}>
                    <Flex style={{ cursor: 'pointer' }}>
                      <Upload />
                      
                    </label>
                  </Flex> */}
                </Flex>

                <Flex marginRight={2}>
                  <SvgTrash
                    width={14}
                    height={14}
                    fill="#581845"
                    onClick={clearform}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </Modal>
      {/* </div> */}
      <MessageTemplate
        open={templatemodel}
        formik={formik}
        messageTemplate={messageTemplate}
        hanldeClose={handleModel}
      />
      <VerificationModel data={verifiymodel} message={message} close={close} />
      <Draftmodel
        verifiymodel={draft}
        closeverify={closeverify}
        composemodel={onClose}
        clearstate={clearform}
        Emailprops={Emailprops}
      />
    </div>
  );
};

export default Newmessage;
