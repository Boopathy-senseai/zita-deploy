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
import SvgChat from '../../icons/SvgChat';
import { AppDispatch, RootState } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import MessageTopBar from '../applicantprofilemodule/MessageTopBar';
import MessageTemplate from '../applicantprofilemodule/MessageTemplate';
import MessageList from '../applicantprofilemodule/MessagesList';
import styles from '../applicantprofilemodule/messagetab.module.css';
import { CANCEL, ERROR_MESSAGE } from '../constValue';
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
        getBlur(`message_list_date_${messages.length - 1}`);
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
  const hanldeClose = () => {
    setUseTemplate(false);
  };
  const hanldeOpen = () => {
    setUseTemplate(true);
  };
  return (
    <div
      style={{
        height: window.innerHeight - 230,
      }}
      className={styles.overAll}
    >
      <Text color="theme" bold>
        Message to Candidate:
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
        <Flex flex={1} columnFlex center middle>
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
export default CandidateMessageTab;
