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
  applicantMessagesMiddleWare,
  messagesTemplatesMiddleWare,
} from '../../modules/applicantprofilemodule/store/middleware/applicantProfileMiddleware';

import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import Modal from '../../uikit/Modal/Modal';
import Flex from '../../uikit/Flex/Flex';
import Toast from '../../uikit/Toast/Toast';
import SvgVectorexpand from '../../icons/SvgMailExpand';
import SvgVectorMinimise from '../../icons/SvgMailMinimise';
import Upload from '../../icons/SvgAttach';
import Temadd from '../../icons/SvgFileplus';
import SvgVectorClose from '../../icons/SvgMailClose';
import { InputText, LabelWrapper } from '../../uikit';

//import SelectTag from '../../uikit/SelectTag/SelectTag';
import config from '../../outlookmailConfig';
import RichText from '../common/RichText';
import { SvgTrash } from '../../icons';
import { composemail, mailreplay, mailforward } from '../../emailService';
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
  const [attachfile, setAttachfile] = useState([]);
  const [templatemodel, settemplatemodel] = useState(false);
  const [mcdata, setmcdata] = useState('');

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
  const [verifiymodel, setVerifymodel] = useState(false);

  const { messageTemplate } = useSelector(
    ({ messageTemplateReducers }: RootState) => {
      return {
        messageTemplate: messageTemplateReducers.messageTemplate,
      };
    },
  );

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
    replaymail();
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

  //Email compose function //
  const sendmail = async () => {
    if (tomail.length === 0) {
      setmessage('please provide destination email address');
      setVerifymodel(true);
    } else if (subject.length === 0) {
      setmessage('please provide subject to send');
      setVerifymodel(true);
    } else if (formik.values.userMessage === '') {
      setmessage('please provide bodymessage to send');
      setVerifymodel(true);
    } else {
      // await composemail(authProvider, Emailprops)
      //   .then((res) => {
      //     Toast('message send successfully', 'LONG', 'success');
      //     clearform();
      //   })
      //   .catch((error) => {});
      // await mailreplay(authProvider, replaymsg.id, replay)
      //   .then((res) => {
      //     console.log('res', res);
      //     Toast('message send successfully', 'LONG', 'success');
      //     clearform();
      //   })
      //   .catch((error) => {
      //     console.log('error', error);
      //   });

      await mailforward(authProvider, replaymsg.id, forward)
        .then((res) => {
          // console.log('res', res);
        })
        .catch((error) => {
          // console.log('error', error);
        });
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
    setFile([...file, ...e.target.files]);

    let as = e.target.files;

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

    setAttachfile(allFiles);
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
    setVerifymodel(false);
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
      <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}>
        <Modal open={data}>
          <div
            className={
              style === 1
                ? styles.modelmiddle
                : style === 2
                ? styles.minimised
                : styles.popup
            }
          >
            <Flex row between className={styles.topSection}>
              <Text color="white">New Email</Text>
              <Flex row between className={styles.optionMenu}>
                <Flex
                  style={{
                    marginTop: '15px',
                    marginRight: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgVectorMinimise onClick={Minimise} />
                </Flex>
                <Flex
                  style={{
                    marginTop: '7px',
                    marginRight: '15px',
                    cursor: 'pointer',
                  }}
                >
                  <SvgVectorexpand onClick={handleview} />
                </Flex>
                <Flex style={{ marginTop: '7px', cursor: 'pointer' }}>
                  <SvgVectorClose
                    width={11}
                    height={11}
                    fill="#ffffff"
                    viewBox="0 0 9 9"
                    onClick={handleClose}
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex style={{ padding: '5px 10px 10px 10px' }}>
              <div style={{ overflowY: 'scroll', height: '485px' }}>
                <Flex row center className={styles.inputField}>
                  <Text>From: </Text>
                  <Text className={styles.fromstyle}>{mail}</Text>
                </Flex>
                <Flex row between>
                  {/* <Text>To</Text>
                  <InputText className={styles.inputStyle} /> */}
                  <Text style={{ marginTop: '8px', marginLeft: '15px' }}>
                    To:
                  </Text>
                  <Flex center>
                    <Multiselect
                      options={Email}
                      onChange={(e) => getto(e)}
                      value={tosample}
                    />
                  </Flex>
                  <Flex row marginRight={10}>
                    {!openCc ? (
                      <Flex marginRight={5} onClick={openCC}>
                        Cc
                      </Flex>
                    ) : (
                      ''
                    )}

                    {!openBcc ? <Flex onClick={openBCC}>Bcc</Flex> : ''}
                  </Flex>
                </Flex>
                <hr />
                {openCc ? (
                  <>
                    <Flex row center>
                      <Text style={{ marginTop: '8px', marginLeft: '15px' }}>
                        Cc:{' '}
                      </Text>
                      <Multiselect
                        options={Email}
                        onChange={(e) => getcc(e)}
                        value={ccsample}
                      />
                    </Flex>
                    <hr />
                  </>
                ) : (
                  ''
                )}

                {openBcc ? (
                  <>
                    <Flex row center>
                      <Text style={{ marginTop: '8px', marginLeft: '15px' }}>
                        Bcc
                      </Text>
                      <Multiselect
                        options={Email}
                        onChange={(e) => getbcc(e)}
                        value={bccsample}
                      />
                    </Flex>
                    <hr />
                  </>
                ) : (
                  ''
                )}

                <Flex row center className={styles.inputField}>
                  <Text>Subject</Text>
                  <InputText
                    value={subject}
                    className={styles.inputStyle}
                    onChange={(e) => getsubject(e)}
                  />
                </Flex>

                <div style={{ marginTop: '10px', padding: '5px' }}>
                  <RichText
                    height={300}
                    value={formik.values.userMessage}
                    onChange={(e) => editchage(e)}
                  />
                </div>
                <Flex>
                  {file.length !== 0 ? (
                    <>
                      {file.map((list, index) => (
                        <>
                          <Flex
                            row
                            wrap
                            className={styles.filesname}
                            key={index}
                          >
                            {index + 1}. {list.name}
                            <SvgVectorClose
                              width={11}
                              height={11}
                              style={{
                                marginLeft: '85px',
                                marginTop: '5px',
                                cursor: 'pointer',
                              }}
                              fill="#0a0a09"
                              viewBox="0 0 9 9"
                              onClick={() => romovefile(index)}
                            />
                          </Flex>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </Flex>
              </div>
              <Flex row between center style={{ marginTop: '30px' }}>
                <Flex row>
                  <Button onClick={() => sendmail()}>send</Button>
                  <Flex style={{ marginLeft: '20px', marginTop: '5px' }}>
                    <label style={{ cursor: 'pointer' }}>
                      <Upload />
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
                  <Button
                    types="secondary"
                    className={styles.buttoninsert}
                    onClick={handleModel}
                  >
                    <Flex row center style={{ cursor: 'pointer' }}>
                      <Temadd />
                      <Text style={{ marginLeft: '5px' }} color="theme">
                        Insert
                      </Text>
                    </Flex>
                  </Button>
                </Flex>

                <Flex>
                  <SvgTrash width={16} height={16} />
                </Flex>
              </Flex>
            </Flex>
          </div>
        </Modal>
      </div>
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
