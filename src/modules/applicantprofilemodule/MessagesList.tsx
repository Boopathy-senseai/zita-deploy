import Text from '../../uikit/Text/Text';
import { firstNameChar, getDateString,isEmpty } from '../../uikit/helper';
import {  mediaPath } from '../constValue';
import styles from './messageslist.module.css';
// import { Message } from './applicantProfileTypes';

type Props = {
  messages: any[];
  client_id_id: number;
  height: number;
  fixedHeight?: boolean;
};

const MessageList = ({
  messages,
  client_id_id,
  height,
  fixedHeight,
}: Props) => {
  return (
    <div
      style={{ height: fixedHeight ? height : window.innerHeight - height }}
      className={styles.overall}
    >
      {messages
        .map((messageList, index) => {
          return (
            <>
              {messageList.sender === client_id_id ? (
                <div
                  key={messageList.message + index}
                  className={styles.newMessageContainer}
                >
                  <div className={styles.newMessage}>
                    <div className={styles.nameContainer}>
                      <input
                        // disabled
                        className={styles.inputDateStyle}
                        type="text"
                        value={getDateString(
                          messageList.date_created,
                          'DD MMM YYYY LT',
                        )}
                        id={`message_list_date_${index}`}
                        onChange={() => {}}
                      />
                      <Text bold className={styles.userNameText}>
                        {/* {messageList.username} */} HR
                      </Text>
                      <div className={styles.senderStyleProfile}>
                        <Text bold color="white" transform="uppercase">
                          {/* {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )} */}
                          HR
                        </Text>
                      </div>
                    </div>
                    <Text color="black" className={styles.senderTextBox}>
                      {messageList.message}
                    </Text>
                  </div>
                </div>
              ) : (
                <div
                  key={messageList.message + index}
                  className={styles.receivedMessageContainer}
                >
                  <div className={styles.newMessage}>
                    <div className={styles.otherContainer}>
                      <div className={styles.otherStyleProfile}>
                      {(isEmpty(messageList.sender_image) ||
                    messageList.sender_image === 'default.jpg') ? (
                      <Text bold color="white" transform="uppercase">
                          {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )}
                        </Text>
                    ) : (
                      <img
                        alt='profile'
                        height={40}
                        width={40}

                        style={{ borderRadius: '100%' ,objectFit:'cover',height: 40,width:40}}

                        src={mediaPath + messageList.sender_image}
                      />
                    )}
                        {/* <Text bold color="white" transform="uppercase">
                          {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )}
                        </Text> */}
                      </div>
                      <Text bold className={styles.userNameText}>
                        {messageList.username}
                      </Text>
                      <Text size={12} color="gray">
                        {getDateString(
                          messageList.date_created,
                          'DD MMM YYYY LT',
                        )}
                      </Text>
                    </div>
                    <Text color="white" className={styles.otherTextBox}>
                      {messageList.message}
                    </Text>
                  </div>
                </div>
              )}
            </>
          );
        })
        .reverse()}
    </div>
  );
};

export default MessageList;
