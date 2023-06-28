import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgRefresh from '../../icons/SvgRefresh';
import { getDateString } from '../../uikit/helper';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
  searchmessage: () => void;
  searchinput: any;
  search: string;
  getmessageid: any;
  sideroute: number;
  mailfolders: any;
};
const Maillist = ({
  messagelist,
  selectmessage,
  searchmessage,
  searchinput,
  search,
  getmessageid,
  sideroute,
  mailfolders,
}: Props) => {
  const [messages, setmesage] = useState<any>();

  const getmessage = (get, id) => {
    setmesage(get);
    selectmessage(get);
    getmessageid(id);
  };

  const serchmail = (e: any) => {
    searchinput(e.target.value);
    //console.log('searchmail', e.target.value);
  };

  const click = () => {
    searchmessage();
  };

  const showfolder = () => {
    if (mailfolders.length !== 0) {
      if (sideroute === 1) {
        return <Text>Inbox({mailfolders[4].unreadItemCount})</Text>;
      } else if (sideroute === 2) {
        return <Text>SentItem({mailfolders[7].unreadItemCount})</Text>;
      } else if (sideroute === 3) {
        return <Text>Draft({mailfolders[3].unreadItemCount})</Text>;
      } else if (sideroute === 4) {
        return <Text>Archive({mailfolders[0].unreadItemCount})</Text>;
      } else if (sideroute === 5) {
        return <Text>DeletedItem({mailfolders[2].unreadItemCount})</Text>;
      } else if (sideroute === 6) {
        return <Text>Junkemail({mailfolders[5].unreadItemCount})</Text>;
      }
    }
  };

  const draftfunction = (val) => {
    if (val.length !== 0) {
      var result = val.reduce(function (nam, arr) {
        // return the sum with previous value
        return nam + ' & ' + arr.emailAddress.name;
      }, '');
      return <>{result.substring(2)}</>;
    } else {
      return <>{'(No Recipients)'}</>;
    }
  };

  const handlemessage = (val) => {
    if (sideroute === 3 || sideroute === 5) {
      if (val.isDraft === true) {
        if (val.toRecipients.length !== 0) {
          var del = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          return <>{'[Draft]' + del.substring(2)}</>;
        }
        return <>{'[Draft]  (No Recipients)'}</>;
      }
      return <>{val.from.emailAddress.name}</>;
    } else {
      if (sideroute === 2) {
        if (val.toRecipients.length !== 0) {
          var res = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          return <>{res.substring(2)}</>;
        } else {
          return <>{'(No Recipients)'}</>;
        }
      }
      return <>{val.from.emailAddress.name}</>;
    }
  };

  return (
    <Flex >
      {console.log('siderouteaaa', sideroute)}
      {console.log('folder', mailfolders)}
      <Flex
        style={{ marginLeft: '2px', borderRight: '1px solid #c3c3c3' }}
        className={styles.maillist}
      >
        <Flex
          row
          between
          style={{
            padding: '4px',
            marginBottom: '10px',
            borderBottom: '1px solid #c3c3c3',
          }}
        >
          {showfolder()}

          <Flex title="Refresh" marginLeft={5}>
            <SvgRefresh width={18} height={18} />
          </Flex>
        </Flex>

        <Flex className={styles.scroll}>
          {messagelist ? (
            <>
              {messagelist.map((val, int) => (
                <>
                  <Card
                    key={int}
                    className={
                      messages === undefined
                        ? styles.cardStyles
                        : messages.id === val.id
                        ? styles.seletmsg
                        : styles.cardStyles
                    }
                    onClick={() => getmessage(val, val.id)}
                  >
                    <Flex row start className={styles.mailCard}>
                      {/* <Flex>
                        <CheckBox className={styles.checkBox}></CheckBox>
                      </Flex> */}
                      {val.isRead !== true ? (
                        <Flex className={styles.notification_dot}></Flex>
                      ) : (
                        ''
                      )}

                      <Flex
                        style={{
                          marginLeft: '15px',
                          width: '100%',
                          display: 'flex',
                        }}
                      >
                        <Flex
                          column
                          start
                          between
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <Flex row between>
                            {/* <Text
                              size={14}
                              className={styles.textHeadingStyle}
                              color="black"
                            >
                              {sideroute !== 3
                                ? val.sender.emailAddress.name
                                : draftfunction(val.toRecipients)}
                            </Text> */}

                            <Text>{handlemessage(val)}</Text>
                            <Text size={14}>
                              {getDateString(val.sentDateTime, 'DD/MM/YYYY')}
                            </Text>
                          </Flex>

                          <Text size={14} className={styles.textHeadingStyle}>
                            {val.subject !== '' ? val.subject : '(no subject)'}
                          </Text>
                        </Flex>
                        <Flex>
                          <Text className={styles.textStyle} size={12}>
                            {val.bodyPreview !== ''
                              ? val.bodyPreview
                              : 'This message has no content'}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </>
              ))}
            </>
          ) : (
            'No Data'
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Maillist;
