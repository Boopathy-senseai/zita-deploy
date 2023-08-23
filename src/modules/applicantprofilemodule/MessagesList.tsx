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
      style={{ height: fixedHeight ? height : window.innerHeight - 280 }}
      className={styles.overall}
    >
      {messages !== undefined &&
        messages
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
                        <Flex className={styles.senderTextBox}>
                          {messageList.message.split('\n').map((message) => (
                            <Text
                              key={''}
                              color="black"
                              style={{
                                padding: ' 8px',
                                flexWrap: 'wrap',
                                overflow: ' hidden',
                                textOverflow: 'clip',
                              }}
                            >
                              {message}
                            </Text>
                          ))}
                        </Flex>
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
                            <Text bold color="white" transform="uppercase" title= { 
                              `${messageList.username} ${messageList.last_name}`
                            }>
                              { 
                                `${messageList?.username?.charAt(0)}${messageList?.last_name?.charAt(0)}`
                              }
                            </Text>
                            // {console.log({firstNameChar(messageList.username)}, {firstNameChar(messageList.last_name)})}
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
                        </div> 
                      </div>
                      <Flex>
                        <Flex className={styles.otherTextBox}>
                          {messageList.message.split('\n').map((message) => (
                            <Text
                              key={''}
                              style={{
                                padding: ' 8px',
                                flexWrap: 'wrap',
                                overflow: ' hidden',
                                textOverflow: 'clip',
                              }}
                            >
                              {message}
                            </Text>
                          ))}
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
