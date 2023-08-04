import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import Button from '../../uikit/Button/Button';
import { getBlur, getFocus, isEmpty } from '../../uikit/helper';
import { ErrorMessage } from '../../uikit';
import Svgchatmessage from '../../icons/SvgChatmessage';
import SvgChat from '../../icons/SvgChat';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import MessageTopBar from '../applicantprofilemodule/MessageTopBar';
import MessageTemplate from '../applicantprofilemodule/MessageTemplate';
// import NotesTab from '../applicantprofilemodule/NotesTab';
import MessageList from '../applicantprofilemodule/MessagesList';
import styles from '../applicantprofilemodule/messagetab.module.css';
import {
  CANCEL,
  ERROR_MESSAGE,
  mentionnotes,
  mentionspecialcharacter,
} from '../constValue';
import { Message } from './candidateTypes';
import { candidateMessageMiddleWare } from './store/middleware/candidateMiddleWare';

var querystring = require('querystring');
const cx = classNames.bind(styles);

const CandidateMessageTab = () => {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isPostLoader, setPostLoader] = useState(false);
  const [useTemplate, setUseTemplate] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { can_id, jd_id, candidate_details, message, messageTemplate } =
    useSelector(
      ({
        applicantProfileInitalReducers,
        messageTemplateReducers,
        candidateMessageReducers,
      }: RootState) => {
        return {
          jd_id: applicantProfileInitalReducers.jd_id,
          candidate_details: applicantProfileInitalReducers.candidate_details,
          message: candidateMessageReducers.message,
          messageTemplate: messageTemplateReducers.messageTemplate,
          can_id: applicantProfileInitalReducers.can_id,
        };
      },
    );
  useEffect(() => {
    dispatch(candidateMessageMiddleWare({ can_id, jd_id }));
  }, [can_id, jd_id]);

  // loop 5 sec once candidateMessageMiddleWare api and message api
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(candidateMessageMiddleWare({ can_id, jd_id }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessage(message);
  }, [message]);

  // message submit function
  const hanldeSubmit = () => {
    setPostLoader(true);
    const data = querystring.stringify({
      jd_id,
      can_id,
      message: formik.values.userMessage,
    });

    axios
      .post(`message_non_applicants?jd_id=${jd_id}&can_id=${can_id}`, data)
      .then(() => {
        getFocus(`message_list_date_${messages.length - 1}`);
        setPostLoader(false);
        dispatch(candidateMessageMiddleWare({ can_id, jd_id }));
        formik.setFieldValue('userMessage', '');
        formik.resetForm();
        getBlur(`message_list_date_${messages.length - 1}`);
      })
      .catch(() => {
        setPostLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
  type notes = {
    userMessage: string;
  };
  const parser = new DOMParser();
  const handlemessage = (values: notes) => {
    const errors: Partial<notes> = {};
    const doc = parser.parseFromString(formik.values.userMessage, 'text/html');
    const textNodes = doc.querySelectorAll('body')[0].textContent;
    const texttrim = textNodes.trim();
    if (texttrim === '') {
      errors.userMessage = '';
    }
    if (isEmpty(textNodes)) {
      errors.userMessage = 'Enter valid Messages.';
    } else if (
      !mentionnotes.test(texttrim) &&
      mentionspecialcharacter.test(textNodes)
    ) {
      errors.userMessage = 'Message length should not exceed 2000 characters.';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      userMessage: '',
    },
    onSubmit: hanldeSubmit,
    validate: handlemessage,
  });

  const handleCancel = () => {
    formik.setFieldValue('userMessage', '');
    formik.resetForm();
  };

  const client_id_id = candidate_details[0].client_id_id
    ? candidate_details[0].client_id_id
    : 0;
  const hanldeClose = () => {
    setUseTemplate(false);
  };
  const hanldeOpen = () => {
    setUseTemplate(true);
  };
  return (
    <Flex
      style={{
        height: window.innerHeight - 120,
      }}
      className={styles.overAll}
      flex={6.4}
    >
      <Flex row center between style={{ padding: '16px 16px 0px 16px' }}>
        <Flex
          style={{
            fontSize: '14px',
            marginBottom: 5,
          }}
        >
          {' '}
          <Text bold>Message to Candidate:</Text>
        </Flex>
        <Flex onClick={hanldeOpen}>
          <Text
            className={'pointer'}
            bold
            color="theme"
            style={{
              fontSize: '14px',
              marginBottom: 5,
            }}
          >
            Use Templates
          </Text>
        </Flex>
      </Flex>

      <Flex style={{ padding: '8px 16px 0px 16px' }}>
        <MessageTopBar formik={formik} />
        <ErrorMessage
          touched={formik.touched}
          errors={formik.errors}
          name="userMessage"
        />
        <MessageTemplate
          open={useTemplate}
          formik={formik}
          messageTemplate={messageTemplate}
          hanldeClose={hanldeClose}
        />
      </Flex>
      <Flex
        row
        center
        end
        className={styles.btnContainer}
        style={{ padding: '0px 16px 0px ' }}
      >
        <Flex row>
          <Button
            onClick={handleCancel}
            className={styles.cancelBtn}
            types="close"
          >
            {CANCEL}
          </Button>
          {isPostLoader ? (
            <Flex center middle style={{ width: '70px' }}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <Button
              width={'70px'}
              // disabled={isEmpty(formik.values.userMessage)}
              onClick={formik.handleSubmit}
              types="primary"
            >
              Send
            </Button>
          )}
        </Flex>
        {/* {isPostLoader && (
            <div style={{ marginLeft: 8 }}>
              <Loader size="small" withOutOverlay />
            </div>
          )} */}
      </Flex>

      {messages.length === 0 ? (
        <Flex flex={1} columnFlex center middle>
          <Svgchatmessage />
          <Text style={{ paddingTop: 10 }} color="gray">
            No conversations to show
          </Text>
        </Flex>
      ) : (
        <Flex
          flex={1}
          className={cx({ messageContainer: messages.length !== 0 })}
        >
          <MessageList
            client_id_id={client_id_id}
            messages={messages}
            height={428}
          />
        </Flex>
      )}
    </Flex>
  );
};
export default CandidateMessageTab;
