import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from 'react-html-parser';
// import parse from 'html-react-parser';
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from 'react-html-parser';
import parse from 'html-react-parser';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import Loader from '../../uikit/Loader/Loader';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import { messagesDataApi } from '../../routes/apiRoutes';
import Button from '../../uikit/Button/Button';
import { isEmpty } from '../../uikit/helper';
import Svgchatmessage from '../../icons/SvgChatmessage';
import { AppDispatch, RootState } from '../../store';
import {
  CANCEL,
  config,
  ERROR_MESSAGE,
  mentionnotes,
  mentionspecialcharacter,
} from '../constValue';
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
  const [inputboxchanging, setinputboxchanging] = useState(false);
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
        formik.resetForm();
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
      !mentionnotes.test(textNodes) &&
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
    setinputboxchanging(false);
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
        height: window.innerHeight -100,
      }}
      className={styles.overAll}
    >
      <Flex row center start style={{ padding: '16px 16px 0px 16px',}} >
        <Flex  style={{
              fontSize: '14px',
              marginBottom: 5,  
            }}>
          {' '}
          <Text
            bold
           
          >
            Message to Applicant
          </Text>
        </Flex>
        
      </Flex>

      <Flex style={{ padding: '12.5px 16px 0px 16px' }}>
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
        marginTop={11}
        className={styles.btnContainer}
        style={{ padding: '0px 16px 0px ' }}
      >
        {/* <Flex center onClick={hanldeOpen}>
          <Text className={'pointer'}  bold color='theme' style={{
              fontSize: '14px',
              
            }}>
            Use Templates
          </Text>
        </Flex> */}
        <Flex row>
          <Button
            onClick={handleCancel}
            className={styles.cancelBtn}
            types="close"
          >
            {CANCEL}
          </Button>
          {isPostLoader ? (
            <Flex middle center style={{ width: '70px' }}>
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
      </Flex>
      {messages === undefined || messages?.length === 0 ? (
        <Flex columnFlex center middle  flex={1}>
          <Svgchatmessage fill='gray' />
          <Text color="gray">No conversations to show</Text>
        </Flex>
      ) : (
        <Flex
          flex={1}
          className={cx({ messageContainer: messages?.length !== 0 })}
        >
          <MessageList
            client_id_id={client_id_id}
            messages={messages}
            height={120}
          />
        </Flex>
      )}
    </div>
  );
};
export default MessageTab;
