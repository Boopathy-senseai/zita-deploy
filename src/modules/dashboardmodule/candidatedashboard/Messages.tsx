import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SvgChat from '../../../icons/SvgChat';
import { messagesDataApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LabelWrapper from '../../../uikit/Label/LabelWrapper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import { Message } from '../../applicantprofilemodule/applicantProfileTypes';
import MessageList from '../../applicantprofilemodule/MessagesList';
import MessageTopBar from '../../applicantprofilemodule/MessageTopBar';
import { applicantMessagesMiddleWare } from '../../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { config, ERROR_MESSAGE } from '../../constValue';
import styles from './messages.module.css';

const cx = classNames.bind(styles);
var querystring = require('querystring');

type Props = {
  showEmptyMessgae?: boolean;
  chatname: string;
  jd_id: string;
  message: Message[];
  recruiter_id_id: number;
  isJobTitle: string;
};

const Messages = ({
  showEmptyMessgae,
  chatname,
  jd_id,
  message,
  recruiter_id_id,
  isJobTitle,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [messages, setMessage] = useState<Message[]>([]);
  const [isPostLoader, setPostLoader] = useState(false);

  useEffect(() => {
    if (!isEmpty(jd_id)) setMessage(message);
  }, [message]);

  // messgae submit 
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
  const jobTitleCheck = isEmpty(isJobTitle)
    ? 'Messages'
    : ` Messages for ${isJobTitle}`;

  return (
    <LabelWrapper size={16} bold label={jobTitleCheck}>
      <Card className={styles.overAll}>
        {showEmptyMessgae ? (
          <Flex columnFlex center middle height={412}>
            <SvgChat width={16} height={16} fill='#888888'/>
            <Text size={13} style={{ paddingTop: 20, color: "#888888" }}  align="center">
              No messages received
            </Text>
          </Flex>
        ) : (
          <>
            {messages.length === 0 ? (
              <>
                {isEmpty(jd_id) ? (
                  <Flex columnFlex center middle height={412}>
                    <Text color="gray" align="center">
                      Click on the message icon to view the respective job
                      conversation
                    </Text>
                  </Flex>
                ) : (
                  <Flex columnFlex center middle height={412}>
                    <SvgChat />
                    <Text
                      style={{ paddingTop: 20 }}
                      color="gray"
                      align="center"
                    >
                      No conversation started yet for this job
                    </Text>
                  </Flex>
                )}
              </>
            ) : (
              <>
                <MessageTopBar formik={formik} />
                <Flex row center end marginTop={20} marginBottom={20}>
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
                <Flex
                  flex={1}
                  className={cx({ messageContainer: messages.length !== 0 })}
                >
                  <MessageList
                    client_id_id={recruiter_id_id}
                    messages={messages}
                    height={475}
                    fixedHeight
                  />
                </Flex>
              </>
            )}
          </>
        )}
      </Card>
    </LabelWrapper>
  );
};

export default Messages;
