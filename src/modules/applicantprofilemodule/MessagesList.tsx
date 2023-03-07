import Text from '../../uikit/Text/Text';
import { firstNameChar, getDateString } from '../../uikit/helper';
import styles from './messageslist.module.css';
import { Message } from './applicantProfileTypes';

type Props = {
  messages: Message[];
  client_id_id: number;
};

const MessageList = ({ messages, client_id_id }: Props) => {
  return (
    <div
      style={{ height: window.innerHeight - 428 }}
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
                        {messageList.username}
                      </Text>
                      <div className={styles.senderStyleProfile}>
                        <Text bold color="white" transform="uppercase">
                          {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )}
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
                        <Text bold color="white" transform="uppercase">
                          {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )}
                        </Text>
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
