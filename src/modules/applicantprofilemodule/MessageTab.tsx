import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import { messagesDataApi } from '../../routes/apiRoutes';
import Button from '../../uikit/Button/Button';
import { isEmpty } from '../../uikit/helper';
import SvgChat from '../../icons/SvgChat';
import { AppDispatch, RootState } from '../../store';
import { CANCEL, config, ERROR_MESSAGE } from '../constValue';
import { Message } from './applicantProfileTypes';
import MessageTemplate from './MessageTemplate';
import styles from './messagetab.module.css';
import MessageTopBar from './MessageTopBar';
import MessageList from './MessagesList';
import { applicantMessagesMiddleWare } from './store/middleware/applicantProfileMiddleware';

var querystring = require('querystring');
const cx = classNames.bind(styles);

const MessageTab = () => {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isPostLoader, setPostLoader] = useState(false);
  const [useTemplate, setUseTemplate] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { chatname, jd_id, candidate_details, message, messageTemplate } =
    useSelector(
      ({
        applicantProfileInitalReducers,
        applicantMessageReducers,
        messageTemplateReducers,
      }: RootState) => {
        return {
          chatname: applicantProfileInitalReducers.chatname,
          jd_id: applicantProfileInitalReducers.jd_id,
          candidate_details: applicantProfileInitalReducers.candidate_details,
          message: applicantMessageReducers.message,
          messageTemplate: messageTemplateReducers.messageTemplate,
        };
      },
    );

  useEffect(() => {
    dispatch(applicantMessagesMiddleWare({ chatname, jd_id }));
  }, [chatname, jd_id]);

  useEffect(() => {
    setMessage(message);
  }, [message]);

  // submit message function
  const hanldeSubmit = () => {
    setPostLoader(true);
    const data = querystring.stringify({
      chatname,
      jd_id,
      username: 'username',
      message: formik.values.userMessage,
    });

    axios
      .post(messagesDataApi, data, config)
      .then(() => {
        setPostLoader(false);
        dispatch(applicantMessagesMiddleWare({ chatname, jd_id }));
        formik.setFieldValue('userMessage', '');
      })
      .catch(() => {
        setPostLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const formik = useFormik({
    initialValues: {
      userMessage: '',
    },
    onSubmit: hanldeSubmit,
  });

  const handleCancel = () => {
    formik.setFieldValue('userMessage', '');
  };

  const client_id_id = candidate_details[0].client_id_id
    ? candidate_details[0].client_id_id
    : 0;
    // template close function
  const hanldeClose = () => {
    setUseTemplate(false);
  };
  // template open function
  const hanldeOpen = () => {
    setUseTemplate(true);
  };

  // message api call 5 sec once 
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(applicantMessagesMiddleWare({ chatname, jd_id }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: window.innerHeight - 230,
      }}
      className={styles.overAll}
    >
      <Text color="theme" bold>
        Message to Applicant:
      </Text>
      <MessageTopBar formik={formik} />
      <MessageTemplate
        open={useTemplate}
        formik={formik}
        messageTemplate={messageTemplate}
        hanldeClose={hanldeClose}
      />

      <Flex row center end className={styles.btnContainer}>
        <Text
          className={'pointer'}
          bold
          color="theme"
          textStyle="underline"
          onClick={hanldeOpen}
        >
          Use Templates
        </Text>
        <Button
          onClick={handleCancel}
          className={styles.cancelBtn}
          types="secondary"
        >
          {CANCEL}
        </Button>
        <Button
          disabled={isEmpty(formik.values.userMessage)}
          onClick={formik.handleSubmit}
        >
          Send
        </Button>
        {isPostLoader && (
          <div style={{ marginLeft: 8 }}>
            <Loader size="small" withOutOverlay />
          </div>
        )}
      </Flex>
      {messages.length === 0 ? (
        <Flex columnFlex center middle height={200}>
          <SvgChat />
          <Text style={{ paddingTop: 20 }} color="gray">
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
    </div>
  );
};
export default MessageTab;
