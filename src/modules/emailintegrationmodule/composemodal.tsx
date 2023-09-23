import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import Select from 'react-select';
import { Base64 } from 'js-base64';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import moment from 'moment';
import { getDateString } from '../../uikit/helper';
import { AppDispatch, RootState } from '../../store';
import MessageTemplate from '../../modules/applicantprofilemodule/MessageTemplate';
import {
  getEmail,
  //outlookUserProfile,
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

import SvgVectorexpand from '../../icons/SvgMailExpand';
import SvgVectorMinimise from '../../icons/SvgMailMinimise';
import Upload from '../../icons/SvgAttach';
import Temadd from '../../icons/SvgFileplus';
import SvgVectorClose from '../../icons/SvgMailClose';
import Loader from '../../uikit/Loader/Loader';
//import SelectTag from '../../uikit/SelectTag/SelectTag';
import config from '../../outlookmailConfig';
import RichText from '../common/RichText';
import { SvgTrash } from '../../icons';
import {
  composemail,
  mailreplay,
  mailforward,
  initGoogleAuth,
  gmail_send,
  Gmail_Draft,
  mailreplayall,
  Gmail_Reply_forward,
  Gmail_profile,
  deletemail,
  gmail_permanent_Delete,
  gmail_draft_update,
} from '../../emailService';
import InputText from '../../uikit/InputText/InputText';
import SvgCollapse from '../../icons/Svgcollapse';
import SvgExitFullScreen from '../../icons/SvgFullscreen';
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
  integration: string;
  Mail_action: string;
  updateMailaction: (val: any) => void;
  atfiles: any;
  sidebarroute: any;
  remove_message: (id: any) => void;
  removemsg: () => void;
  newmsg: any;
  can_id?: any;
};

const Newmessage = ({
  data,
  onClose,
  mail,
  replaymsg,
  integration,
  Mail_action,
  updateMailaction,
  atfiles,
  can_id,
  sidebarroute,
  remove_message,
  removemsg,
  newmsg,
}: Props) => {
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
  const fileInputRef = useRef(null);

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
      console.log('asas', messageTemplateReducers);
      return {
        messageTemplate: messageTemplateReducers.messageTemplate,
      };
    },
  );

  const emailcollection = useSelector(({ useremail }: RootState) => {
    return {
      emailcollection: useremail.mails,
      email: useremail.email,
      integration: useremail.account,
      token: useremail.token,
    };
  });

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

  const removeref = () => {
    fileInputRef.current.value = null;
  };

  const replaymail = () => {
    if (integration === 'outlook') {
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
        var sub = `Re: ${replaymsg.subject}`;
        // formik.setFieldValue('userMessage', replaymsg.body.content);
        converto.push(mailconvert);
        setTosample(to);
        setTomail(converto);
        setSubject(sub);
      }
    }
    if (integration === 'google') {
      const subjects = replaymsg.header.find(
        (header) => header.name === 'Subject',
      ).value;
      if (sidebarroute === 2) {
        replyto();
      }

      if (sidebarroute === 1) {
        replyfrom();
      }

      if (sidebarroute === 4 || sidebarroute === 5) {
        const datas = replaymsg.labelIds.includes('INBOX');
        if (datas === true) {
          replyfrom();
        } else {
          replyto();
        }
      }
      var Gsub = `Re: ${subjects}`;
      // formik.setFieldValue('userMessage', replaymsg.body);
      setSubject(Gsub);
    }
  };

  const replyfrom = () => {
    let repmail = [];
    const fromEmail = replaymsg.header.find(
      (header) => header.name === 'From',
    ).value;
    repmail.push(fromEmail);

    var togmail = {
      value: fromEmail,
      label: fromEmail,
    };

    setTosample(togmail);
    setTomail(repmail);
  };

  const replyto = () => {
    const ToEmails = replaymsg.header
      .filter((header) => header.name === 'To')
      .map((header) => header.value);

    if (ToEmails.length !== 0) {
      const ToArray = ToEmails[0].split(', ');
      const ToObjectsArray = ToArray.map((email, index) => {
        return { value: email, label: email };
      });
      setTosample(ToObjectsArray);
      setTomail(ToArray);
    }
  };

  const forward = () => {
    if (replaymsg !== '') {
      if (integration === 'outlook') {
        var sub = `Fw: ${replaymsg.subject}`;
        setSubject(sub);

        let files = [];

        atfiles.map((val, int) => {
          let fileInfo = {
            type: val.contentType,
            name: val.name,
            contentBytes: val.contentBytes,
            size: val.size,
          };
          files.push(fileInfo);
          setFile(files);
          setAttachfile(files);
        });
        // formik.setFieldValue('userMessage', replaymsg.body.content);
      }

      if (integration === 'google') {
        const subjects = replaymsg.header.find(
          (header) => header.name === 'Subject',
        ).value;

        let collect = [];

        atfiles.map((val, int) => {
          let fileInfo = {
            type: val.contentType,
            name: val.name,
            contentBytes: val.contentBytes,
            size: val.size,
          };

          collect.push(fileInfo);
        });

        var Gsub = `Fw: ${subjects}`;
        setFile(collect);
        setAttachfile(atfiles);
        setSubject(Gsub);
        // formik.setFieldValue('userMessage', replaymsg.body);
      }
    }
  };

  const replyall = () => {
    if (replaymsg !== '') {
      var to = [];
      var cc = [];
      var bcc = [];

      if (integration === 'outlook') {
        var converto = [];
        var a = {
          value: replaymsg.from.emailAddress.address,
          label: replaymsg.from.emailAddress.address,
        };

        if (a.value !== emailcollection.email) {
          to.push(a);
        }
        const mailconvert = {
          emailAddress: {
            address: replaymsg.from.emailAddress.address,
          },
        };
        converto.push(...replaymsg.toRecipients);
        converto.push(mailconvert);

        if (replaymsg.toRecipients.length !== 0) {
          replaymsg.toRecipients.map((val, int) => {
            console.log('1emailcollection.email', emailcollection.email);
            console.log('2val.address', val['emailAddress'].address);
            if (emailcollection.email !== val['emailAddress'].address) {
              to.push({
                value: val['emailAddress'].address,
                label: val['emailAddress'].address,
              });
            }
          });
        }
        if (replaymsg.ccRecipients.length !== 0) {
          setopenCc(true);
          replaymsg.ccRecipients.map((val, int) => {
            console.log('emailcollection.email', emailcollection.email);
            console.log('val.address', val['emailAddress'].address);
            if (emailcollection.email !== val['emailAddress'].address) {
              cc.push({
                value: val['emailAddress'].address,
                label: val['emailAddress'].address,
              });
            }
          });
        }
        if (replaymsg.bccRecipients.length !== 0) {
          setopenBcc(true);
          replaymsg.bccRecipients.map((val, int) => {
            if (emailcollection.email !== val['emailAddress'].address) {
              bcc.push({
                value: val['emailAddress'].address,
                label: val['emailAddress'].address,
              });
            }
          });
        }

        var sub = `Re: ${replaymsg.subject}`;
        // formik.setFieldValue('userMessage', replaymsg.body.content);

        setTosample(to);
        setCcsample(cc);
        setBccsample(bcc);
        setTomail(converto);
        setCcmail(replaymsg.ccRecipients);
        setBccmail(replaymsg.bccRecipients);
        setSubject(sub);
        // formik.setFieldValue('userMessage', replaymsg.body.content);
      }

      if (integration === 'google') {
        const subjects = replaymsg.header.find(
          (header) => header.name === 'Subject',
        ).value;
        var Gsub = `Re: ${subjects}`;
        setSubject(Gsub);
        //formik.setFieldValue('userMessage', replaymsg.body);
        const ToEmails = replaymsg.header
          .filter((header) => header.name === 'To')
          .map((header) => header.value);

        const CcEmails = replaymsg.header
          .filter((header) => header.name === 'Cc')
          .map((header) => header.value);

        const BccEmails = replaymsg.header
          .filter((header) => header.name === 'Bcc')
          .map((header) => header.value);
        if (ToEmails.length !== 0) {
          const ToArray = ToEmails[0].split(', ');
          const ToObjectsArray = ToArray.map((email, index) => {
            return { value: email, label: email };
          });
          setTosample(ToObjectsArray);
          setTomail(ToArray);
        }
        if (CcEmails.length !== 0) {
          const CcArray = CcEmails[0].split(', ');
          const CcObjectsArray = CcArray.map((email, index) => {
            return { value: email, label: email };
          });
          setCcmail(CcArray);
          setCcsample(CcObjectsArray);
        }

        if (BccEmails.length !== 0) {
          const BccArray = BccEmails[0].split(', ');
          const BccObjectsArray = BccArray.map((email, index) => {
            return { value: email, label: email };
          });
          setBccmail(BccArray);
          setBccsample(BccObjectsArray);
        }
      }
    }
  };

  useEffect(() => {
    dispatch(messagesTemplatesMiddleWare());

    dispatch(getEmail(can_id ? can_id : undefined)).then((res) => {});
  }, []);

  useEffect(() => {
    if (Mail_action === 'reply') {
      replaymail();
    } else if (Mail_action === 'forward') {
      forward();
    } else if (Mail_action === 'replyall') {
      replyall();
    } else if (Mail_action === 'draft') {
      Draft_Compose();
    }
  }, [Mail_action, replaymsg]);

  // Draft Re-Compose//
  const Draft_Compose = () => {
    var to = [];
    var cc = [];
    var bcc = [];
    if (integration === 'outlook') {
      if (replaymsg.toRecipients.length !== 0) {
        replaymsg.toRecipients.map((val, int) => {
          to.push({
            value: val['emailAddress'].address,
            label: val['emailAddress'].address,
          });
        });
      }
      if (replaymsg.ccRecipients.length !== 0) {
        replaymsg.ccRecipients.map((val, int) => {
          cc.push({
            value: val['emailAddress'].address,
            label: val['emailAddress'].address,
          });
        });
      }
      if (replaymsg.bccRecipients.length !== 0) {
        replaymsg.bccRecipients.map((val, int) => {
          bcc.push({
            value: val['emailAddress'].address,
            label: val['emailAddress'].address,
          });
        });
      }

      let files = [];

      atfiles.map((val, int) => {
        let fileInfo = {
          type: val.contentType,
          name: val.name,
          contentBytes: val.contentBytes,
          size: val.size,
        };
        files.push(fileInfo);
      });

      formik.setFieldValue('userMessage', replaymsg.body.content);
      setTosample(to);
      setCcsample(cc);
      setBccsample(bcc);
      setTomail(replaymsg.toRecipients);
      setCcmail(replaymsg.ccRecipients);
      setBccmail(replaymsg.bccRecipients);
      setSubject(replaymsg.subject);
      setFile(files);
      setAttachfile(atfiles);
    }

    if (integration === 'google') {
      const ToEmails = replaymsg.header
        .filter((header) => header.name === 'To')
        .map((header) => header.value);

      const CcEmails = replaymsg.header
        .filter((header) => header.name === 'Cc')
        .map((header) => header.value);

      const BccEmails = replaymsg.header
        .filter((header) => header.name === 'Bcc')
        .map((header) => header.value);
      if (ToEmails.length !== 0) {
        const ToArray = ToEmails[0].split(', ');
        const ToObjectsArray = ToArray.map((email, index) => {
          return { value: email, label: email };
        });
        setTosample(ToObjectsArray);
        setTomail(ToArray);
      }
      if (CcEmails.length !== 0) {
        const CcArray = CcEmails[0].split(', ');
        const CcObjectsArray = CcArray.map((email, index) => {
          return { value: email, label: email };
        });
        setCcmail(CcArray);
        setCcsample(CcObjectsArray);
      }

      if (BccEmails.length !== 0) {
        const BccArray = BccEmails[0].split(', ');
        const BccObjectsArray = BccArray.map((email, index) => {
          return { value: email, label: email };
        });
        setBccmail(BccArray);
        setBccsample(BccObjectsArray);
      }
      const subjects = replaymsg.header.find(
        (header) => header.name === 'Subject',
      ).value;

      let collect = [];

      atfiles.map((val, int) => {
        let fileInfo = {
          type: val.contentType,
          name: val.name,
          contentBytes: val.contentBytes,
          size: val.size,
        };

        collect.push(fileInfo);
      });

      setFile(collect);
      setAttachfile(atfiles);
      setSubject(subjects);
      formik.setFieldValue('userMessage', replaymsg.body);
    }
  };

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

  const handleMinimise = () => {
    if (style === 2) {
      setstyle(0);
    } else {
      setstyle(2);
    }
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

    //saveToSentItems: true,
  };

  //Reply props//
  const outlook_replay_props = {
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
  const outlook_forward_props = {
    comment: messagebody,
    subject: subject,
    toRecipients: tomail,
    ccRecipients: ccmail,
    bccRecipients: bccmail,
    attachments: attachfile,
    saveToSentItems: true,
  };

  //replyall props//

  const replyAll_props = {
    comment: messagebody,
    subject: subject,
    toRecipients: tomail,
    ccRecipients: ccmail,
    bccRecipients: bccmail,
    attachments: attachfile,
    saveToSentItems: true,
  };

  const replyData = {
    comment: 'Thank you for your message! We appreciate your feedback.',
    subject: 'subject',
  };

  const composeemail = async () => {
    setloader(true);
    if (integration === 'google') {
      if (Mail_action === 'compose' || Mail_action === 'draft') {
        gmail_compose();
      } else if (Mail_action === 'reply') {
        gmai_action();
      } else if (Mail_action === 'forward') {
        gmai_action();
      } else if (Mail_action === 'replyall') {
        gmai_action();
      }
    } else if (integration === 'outlook') {
      if (Mail_action === 'compose' || Mail_action === 'draft') {
        await composemail(authProvider, Emailprops)
          .then((res) => {
            setloader(false);
            Toast('Email sent successfully', 'LONG', 'success');
            delete_draft();
            clearform();
            onClose();
            setstyle(0);
          })
          .catch((error) => {
            // console.log('compose =====', error);
          });
      } else if (Mail_action === 'reply') {
        outlookreplay();
      } else if (Mail_action === 'forward') {
        outlookforward();
      } else if (Mail_action === 'replyall') {
        outlookreplayall();
      }
    }
  };

  const delete_draft = async () => {
    if (Mail_action === 'draft') {
      if (integration === 'outlook') {
        await deletemail(authProvider, replaymsg.id)
          .then((res) => {
            removemsg();
            remove_message(replaymsg.id);
          })
          .catch((error) => {
            // console.log('connection failed inboxxxxxxx', error);
          });
      } else if (integration === 'google') {
        await gmail_permanent_Delete(replaymsg.id)
          .then((res) => {
            removemsg();
            remove_message(replaymsg.id);
          })
          .catch((error) => {
            // console.log('error', error);
          });
      }
    }
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
      setmessage('Email must have at least one recepient');
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
    }
  };

  const outlookreplay = async () => {
    await mailreplay(authProvider, replaymsg.id, outlook_replay_props)
      .then((res) => {
        Toast('Message send successfully', 'LONG', 'success');
        clearform();
      })
      .catch((error) => {});
  };

  const outlookforward = async () => {
    await mailforward(authProvider, replaymsg.id, outlook_forward_props)
      .then((res) => {
        Toast('Message send successfully', 'LONG', 'success');
        clearform();
      })
      .catch((error) => {});
  };

  const outlookreplayall = async () => {
    await mailreplayall(authProvider, replaymsg.id, replyAll_props)
      .then((res) => {
        Toast('Message send successfully', 'LONG', 'success');
        clearform();
      })
      .catch((error) => {});
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
    setfaildfile([]);
    formik.resetForm();
    onClose();
    setstyle(0);
    setopenCc(false);
    setopenBcc(false);
    updateMailaction('compose');
    setloader(false);
  };

  const selectfile = (e: any) => {
    const filterFileGreter = [...fileInputRef.current.files].filter(
      (item) => item.size > 10000000,
    );
    const filterFileles = [...fileInputRef.current.files].filter(
      (item) => item.size < 10000000,
    );

    let as = filterFileles;

    var allFiles = [...attachfile];
    if (integration === 'google') {
      for (var i = 0; i < as.length; i++) {
        let filecollection = as[i];
        let reader = new FileReader();
        reader.readAsDataURL(filecollection);

        reader.onload = () => {
          let fileInfo = {
            type: filecollection.type,
            name: filecollection.name,
            contentBytes: String(reader.result).split(',')[1],
          };
          allFiles.push(fileInfo);
        };
      }
    } else if (integration === 'outlook') {
      for (var j = 0; j < as.length; j++) {
        let filecollection = as[j];
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
    }

    setFile(file.concat(filterFileles));

    if (filterFileGreter.length !== 0) {
      setfaildfile(faildfile.concat(filterFileGreter));
    }
    setAttachfile(allFiles);
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
    if (integration === 'google') {
      setTosample(val);
      let lastElement = val.slice(-1);
      let check = tosample.filter((x) => !val.includes(x));

      if (check.length !== 0) {
        const removemail = tomail.filter((item) => item !== check[0].value);

        setTomail(removemail);
      } else {
        setTomail([...tomail, lastElement[0].value]);
      }
    } else {
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
    }
  };

  const getcc = (val) => {
    if (integration === 'google') {
      setCcsample(val);
      let lastElement = val.slice(-1);
      let check = ccsample.filter((x) => !val.includes(x));

      if (check.length !== 0) {
        const removemail = ccmail.filter((item) => item !== check[0].value);

        setCcmail(removemail);
      } else {
        setCcmail([...ccmail, lastElement[0].value]);
      }
    } else {
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
    }
  };

  const getbcc = (val) => {
    if (integration === 'google') {
      setBccsample(val);
      let lastElement = val.slice(-1);
      let check = bccsample.filter((x) => !val.includes(x));

      if (check.length !== 0) {
        const removemail = bccmail.filter((item) => item !== check[0].value);

        setBccmail(removemail);
      } else {
        setBccmail([...bccmail, lastElement[0].value]);
      }
    } else {
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

  ////// gmail /////

  const gmail_compose = () => {
    const toEmails = tomail.join(', ');
    const toCC = ccmail.join(', ');
    const toBCC = bccmail.join(', ');
    const emailss = [
      'Content-Type: multipart/mixed; boundary="boundary"\n',
      'MIME-Version: 1.0\n',
      `To: ${toEmails}\n`,
      `Cc: ${toCC}\n`,
      `Bcc: ${toBCC}\n`,
      `Subject: ${subject}\n\n`,
      `--boundary\n`,
      'Content-Type: text/html; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      `\n${messagebody}\n\n`,
    ];

    attachfile.forEach(async (attachment) => {
      emailss.push(
        `--boundary\n`,
        `Content-Type: ${attachment.type}\n`,
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: base64\n',
        `Content-Disposition: attachment; filename="${attachment.name}"\n\n`,
        `${attachment.contentBytes}\n\n`,
      );
    });

    emailss.push(`--boundary--`);

    const email = emailss.join('');

    const base64EncodedEmail1 = btoa(email);

    setloader(true);
    initGoogleAuth(emailcollection.token)
      .then(() => {
        gmail_send(base64EncodedEmail1)
          .then((res) => {
            setloader(false);
            Toast('Message send successfully', 'SHORT', 'success');
            delete_draft();
            clearform();
            onClose();
            setstyle(0);
          })
          .catch((error) => {
            Toast('Message not send ', 'SHORT', 'error');
            setloader(false);
          });
      })
      .catch((error) => {
        Toast('Message not send ', 'SHORT', 'error');
        setloader(false);
      });
  };
  //gmail draft//
  const draft_props = () => {
    const toEmails = tomail.join(', ');
    const toCC = ccmail.join(', ');
    const toBCC = bccmail.join(', ');
    const emailss = [
      'Content-Type: multipart/mixed; boundary="boundary"\n',
      'MIME-Version: 1.0\n',
      `To: ${toEmails}\n`,
      `Cc: ${toCC}\n`,
      `Bcc: ${toBCC}\n`,
      `Subject: ${subject}\n\n`,
      `--boundary\n`,
      'Content-Type: text/html; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      `\n${messagebody}\n\n`,
    ];

    attachfile.forEach(async (attachment) => {
      emailss.push(
        `--boundary\n`,
        `Content-Type: ${attachment.type}\n`,
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: base64\n',
        `Content-Disposition: attachment; filename="${attachment.name}"\n\n`,
        `${attachment.contentBytes}\n\n`,
      );
    });

    emailss.push(`--boundary--`);

    const email = emailss.join('');

    const rawMessage = btoa(email);
    const drafts = {
      message: {
        raw: rawMessage,
      },
    };
    return drafts;
  };

  const GmailDraft = async () => {
    if (Mail_action === 'draft') {
      setloader(true);
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_Draft(draft_props())
            .then(async (res) => {
              setloader(false);

              await gmail_permanent_Delete(replaymsg.id)
                .then((ress) => {})
                .catch((error) => {
                  // console.log('error', error);
                });

              Toast('Draft save successfully', 'SHORT', 'success');
              clearform();
              closeverify();
              onClose();
              setstyle(0);
            })
            .catch((error) => {
              Toast('Draft not save ', 'SHORT', 'error');
              setloader(false);
              closeverify();
              onClose();
            });
        })
        .catch((error) => {
          Toast('Draft not save', 'SHORT', 'error');
          setloader(false);
          closeverify();
          onClose();
        });
    } else {
      setloader(true);
      initGoogleAuth(emailcollection.token)
        .then(() => {
          Gmail_Draft(draft_props())
            .then((res) => {
              setloader(false);
              Toast('Draft save successfully', 'SHORT', 'success');
              clearform();
              closeverify();
              onClose();
              setstyle(0);
            })
            .catch((error) => {
              Toast('Draft not save ', 'SHORT', 'error');
              setloader(false);
              closeverify();
              onClose();
            });
        })
        .catch((error) => {
          Toast('Draft not save', 'SHORT', 'error');
          setloader(false);
          closeverify();
          onClose();
        });
    }
  };

  const gmailreply_forward = () => {
    const toEmails = tomail.join(', ');
    const toCC = ccmail.join(', ');
    const toBCC = bccmail.join(', ');
    const fromEmail = replaymsg.header.find(
      (header) => header.name === 'From',
    ).value;
    const subjects = replaymsg.header.find(
      (header) => header.name === 'Subject',
    ).value;

    const time = moment(replaymsg.internalDate).format('llll');

    var replyHtml = '';

    if (Mail_action === 'reply' || Mail_action === 'replyall') {
      replyHtml = `
        
          <div class="gmail_quote">
           <p>${messagebody}</p>
            <p>On ${replaymsg.internalDate}, ${fromEmail} wrote:</p>
            <blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex;border-left:1px solid rgb(204,204,204);padding-left:1ex">${replaymsg.body}</blockquote>
           
          </div>
       
`;
    } else if (Mail_action === 'forward') {
      replyHtml = `<div class="gmail_quote">
            <p>${messagebody}</p>
            <p>---------- Forwarded message ----------</p>
            <p>From: ${fromEmail} </p>
            <p>Date: ${replaymsg.internalDate} </p>
            <p>Subject: ${subjects} </p>
            <p> ${replaymsg.body}</p>
         </div>`;
    }
    const emailss = [
      'Content-Type: multipart/mixed; boundary="boundary"\n',
      'MIME-Version: 1.0\n',
      `To: ${toEmails}\n`,
      `Cc: ${toCC}\n`,
      `Bcc: ${toBCC}\n`,
      `References: ${replaymsg.threadId}\n`,
      `In-Reply-To: ${replaymsg.id}\n`,
      `Subject: ${subject}\n\n`,
      `--boundary\n`,
      'Content-Type: text/html; charset="UTF-8"\n',
      'MIME-Version: 1.0\n',
      '\n' + replyHtml + '\n\n', // Include the HTML content here
      `--boundary\n`,
    ];
    attachfile.forEach(async (attachment) => {
      emailss.push(
        `--boundary\n`,
        `Content-Type: ${attachment.type}\n`,
        'MIME-Version: 1.0\n',
        'Content-Transfer-Encoding: base64\n',
        `Content-Disposition: attachment; filename="${attachment.name}"\n\n`,
        `${attachment.contentBytes}\n\n`,
      );
    });

    emailss.push(`--boundary--`);

    const email = emailss.join('');
    const rawMessage = btoa(email);
    return rawMessage;
  };

  const gmai_action = async () => {
    initGoogleAuth(emailcollection.token)
      .then(async () => {
        await Gmail_Reply_forward(gmailreply_forward())
          .then((res) => {
            Toast('Message send successfully', 'LONG', 'success');
            clearform();
          })
          .catch((error) => {
            Toast('Message not send ', 'SHORT', 'error');
            setloader(false);
          });
      })
      .catch((err) => {
        Toast('Message not send ', 'SHORT', 'error');
        setloader(false);
      });
  };

  return (
    <div>
      {/* <div style={{ position: 'absolute', bottom: '0px', right: '0px' }}> */}

      <Modal open={data}>
        {loader === true && <Loader />}
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
              <Text color="white">New Email </Text>
              <Flex row center between className={styles.optionMenu}>
                <Flex
                  title={style === 2 ? 'Maximize' : 'Minimize'}
                  style={{
                    marginRight: '15px',
                    cursor: 'pointer',
                    marginBottom: style === 2 ? 10 : 0,
                    marginTop: style === 0 ? 10 : 0,
                  }}
                >
                  <Flex
                    style={{
                      justifyConent: style === 1 ? 'flex-start' : 'center',
                      cursor: 'pointer',
                    }}
                    onClick={handleMinimise}
                  >
                    <SvgVectorMinimise />
                  </Flex>
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
                    <SvgExitFullScreen
                      width={11}
                      height={11}
                      fill="#ffffff"
                      onClick={handleViewPopup}
                    />
                  ) : (
                    <SvgVectorexpand
                      width={11}
                      height={11}
                      fill="#ffffff"
                      onClick={handleview}
                    />
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
                    onClick={clearform}
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
                padding: '0px 5px 10px 10px',
                overflowY: 'auto',
              }}
            >
              <Flex
                flex={1}
                column
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Flex
                  row
                  center
                  className={styles.inputField}
                  style={{ padding: '7px 10px 7px 0px' }}
                >
                  <Text>From </Text>
                  <Text size={12} className={styles.fromstyle}>
                    {emailcollection.email}
                  </Text>
                </Flex>
                <Flex
                  row
                  center
                  between
                  className={styles.inputField}
                  style={{ padding: '0px' }}
                >
                  <Flex
                    row
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Text style={{ marginTop: 6 }}>To</Text>
                    <Flex marginLeft={14} style={{ width: '100%' }}>
                      <Multiselect
                        options={emailcollection.emailcollection}
                        onChange={(e) => getto(e)}
                        value={tosample}
                        placeholder={
                          'Search for a candidate, applicant, or team member'
                        }
                      />
                    </Flex>
                  </Flex>

                  <Flex row bottom marginBottom={6}>
                    {!openCc && (
                      <Flex
                        marginRight={15}
                        onClick={openCC}
                        style={{ cursor: 'pointer' }}
                      >
                        Cc
                      </Flex>
                    )}

                    {!openBcc && (
                      <Flex onClick={openBCC} style={{ cursor: 'pointer' }}>
                        Bcc
                      </Flex>
                    )}
                  </Flex>
                </Flex>

                {openCc ? (
                  <>
                    <Flex
                      row
                      center
                      className={styles.inputField}
                      style={{ width: '100%', alignItems: 'flex-start' }}
                    >
                      <Text size={14} style={{ marginTop: 6 }}>
                        Cc
                      </Text>
                      <Flex
                        marginLeft={12}
                        style={{ width: '100%', padding: '0px' }}
                      >
                        <Multiselect
                          options={emailcollection.emailcollection}
                          onChange={(e) => getcc(e)}
                          value={ccsample}
                          placeholder={'Add Cc recipients'}
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
                      style={{ width: '100%', alignItems: 'flex-start' }}
                    >
                      <Text size={14} style={{ marginTop: 6 }}>
                        Bcc
                      </Text>{' '}
                      <Flex
                        marginLeft={6}
                        style={{ width: '100%', padding: '0px' }}
                      >
                        <Multiselect
                          options={emailcollection.emailcollection}
                          onChange={(e) => getbcc(e)}
                          value={bccsample}
                          placeholder={'Add Bcc recipients'}
                        />
                      </Flex>
                    </Flex>
                  </>
                ) : (
                  ''
                )}

                <Flex
                  row
                  center
                  className={styles.inputField}
                  style={{ padding: '3px 10px 3px 0px' }}
                >
                  {/* <Text style={{ marginTop: '1px' }}>Subject</Text> */}
                  <InputText
                    inputConatinerClass={styles.width100}
                    value={subject}
                    className={styles.inputStyle}
                    onChange={(e) => getsubject(e)}
                    placeholder="Add your email subject"
                    style={{ padding: '4px 12px 3px 3px' }}
                  />
                </Flex>
                <Flex
                  // flex={1}
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
                      minHeight: '365px',
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
                                padding: '10px 10px 5px 0px',
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
                <Flex row between center className={styles.bottomline}>
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
                            ref={fileInputRef}
                            type="file"
                            style={{ display: 'none' }}
                            multiple
                            //onChange={selectfile}
                            onChange={(files) => selectfile(files)}
                            onClick={removeref}
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
                      onClick={handleClose}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {console.log('sdsd', replaymsg)}
          </Flex>
        </div>
      </Modal>
      {/* </div> */}
      <MessageTemplate
        open={templatemodel}
        formik={formik}
        messageTemplate={messageTemplate}
        hanldeClose={handleModel}
        user={'mail'}
      />
      <VerificationModel data={verifiymodel} message={message} close={close} />
      <Draftmodel
        verifiymodel={draft}
        closeverify={closeverify}
        composemodel={onClose}
        clearstate={clearform}
        Emailprops={integration === 'google' ? GmailDraft : Emailprops}
        auth={integration}
        Mail_action={Mail_action}
        mail_id={replaymsg !== '' ? replaymsg.id : ''}
        replymail_draft={gmailreply_forward}
        emailcollection={emailcollection.token}
      />
    </div>
  );
};

export default Newmessage;
function encodeFileToBase64(file: any) {
  throw new Error('Function not implemented.');
}
