import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { firstNameChar, getDateString, isEmpty } from '../../uikit/helper';
import { mediaPath } from '../constValue';
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
      style={{ height: fixedHeight ? height : window.innerHeight - 280}}
      className={styles.overall}
    >
      {  messages!== undefined && messages
        .map((messageList, index) => {
          return (
            <>
              {messageList.sender === client_id_id ? (
                <div
                  key={messageList.message + index}
                  className={styles.newMessageContainer}
                >
                  <Flex row end className={styles.newMessage} flex={12}>
                    <Flex marginRight={10}>
                      <Text color="black" className={styles.senderTextBox}>
                        {messageList.message}
                      </Text>
                      <Flex end className={styles.nameContainer}>
                        <input 
                          className={styles.inputDateStyle}
                          type="text"
                          value={getDateString(
                            messageList.date_created,
                            'DD MMM YYYY LT',
                          )}
                          id={`message_list_date_${index}`}
                          onChange={() => {}}
                        />
                      </Flex>
                    </Flex>
                    <Flex bottom marginBottom={20}>
                      <div className={styles.senderStyleProfile}>
                        <Text bold color="white" transform="uppercase">
                          HR
                        </Text>
                      </div>
                    </Flex>
                  </Flex>
                </div>
              ) : (
                <div
                  key={messageList.message + index}
                  className={styles.receivedMessageContainer}
                >
                  <div className={styles.newMessage}>
                    <div className={styles.otherContainer}>
                      <div className={styles.otherStyleProfile}>
                        {isEmpty(messageList.sender_image) ||
                        messageList.sender_image === 'default.jpg' ? (
                          <Text bold color="white" transform="uppercase">
                            {firstNameChar(
                              `${messageList.username} ${messageList.last_name}`,
                            )}
                          </Text>
                        ) : (
                          <img
                            alt="profile"
                            height={40}
                            width={40}
                            style={{
                              borderRadius: '100%',
                              objectFit: 'cover',
                              height: 40,
                              width: 40,
                            }}
                            src={mediaPath + messageList.sender_image}
                          />
                        )}
                        {/* <Text bold color="white" transform="uppercase">
                          {firstNameChar(
                            `${messageList.username} ${messageList.last_name}`,
                          )}
                        </Text> */}
                      </div>
                      {/* <Text bold className={styles.userNameText}>
                        {messageList.username}
                      </Text> */}
                    </div>
                    <Flex>
                      <Flex>
                      <Text   className={styles.otherTextBox}>
                        {messageList.message}
                      </Text>{' '}
                      </Flex>
                      <Flex>
                        {' '}
                        <Text size={12} color="gray">
                          {getDateString(
                            messageList.date_created,
                            'DD MMM YYYY LT',
                          )}
                        </Text>
                      </Flex>
                    </Flex>
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
