import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgRefresh from '../../icons/SvgRefresh';
import { getDateString } from '../../uikit/helper';
import SvgSearchGlass from '../../icons/SvgSearchGlass';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
  getmessageid: any;
  sideroute: number;
  mailfolders: any;
  removemsg: any;
  page: any;
};
const Maillist = ({
  messagelist,
  selectmessage,
  getmessageid,
  sideroute,
  mailfolders,
  removemsg,
  page,
}: Props) => {
  const [messages, setmesage] = useState<any>();

  const getmessage = (get, id) => {
    removemsg();
    setmesage(get);
    selectmessage(get);
    getmessageid(id);
  };

  const showfolder = () => {
    if (mailfolders.length !== 0) {
      if (sideroute === 1) {
        return <Text bold>Inbox ({mailfolders[4].unreadItemCount})</Text>;
      } else if (sideroute === 2) {
        return <Text bold>Sent Items ({mailfolders[7].unreadItemCount})</Text>;
      } else if (sideroute === 3) {
        return <Text bold>Drafts ({mailfolders[3].unreadItemCount})</Text>;
      } else if (sideroute === 4) {
        return <Text bold>Archive ({mailfolders[0].unreadItemCount})</Text>;
      } else if (sideroute === 5) {
        return (
          <Text bold>Deleted Items ({mailfolders[2].unreadItemCount})</Text>
        );
      } else if (sideroute === 6) {
        return <Text bold>Junk Email ({mailfolders[5].unreadItemCount})</Text>;
      } else if (sideroute === 0) {
        return <Text bold> </Text>;
      }
    }
  };

  const referesh = () => {
    page();
  };

  const handlemessage = (val) => {
    if (sideroute === 3 || sideroute === 5 || sideroute === 0) {
      if (val.isDraft === true) {
        if (val.toRecipients.length !== 0) {
          var del = val.toRecipients.reduce(function (nam, arr) {
            return nam + ' & ' + arr.emailAddress.name;
          }, '');
          // return <>{'Draft' + del.substring(2)}</>;
          return (
            <Flex row>
              <Text style={{ color: '#ED4857', marginRight: '5px' }}>
                Draft{' '}
              </Text>
              <Text>{del.substring(2)}</Text>
            </Flex>
          );
        }
        // return <>{'Draft (No Recipients)'}</>;
        return (
          <Flex row>
            <Text style={{ color: '#ED4857', marginRight: '5px' }}>Draft </Text>
            <Text>{`(No Recipients)`}</Text>
          </Flex>
        );
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
    <Flex style={{ margintop: '1px' }} className={styles.maillist}>
      <Flex
        row
        between
        style={{
          borderBottom: '1px solid #c3c3c3',
        }}
      >
        <Flex style={{ padding: '6px' }}>{showfolder()}</Flex>

        <Flex title="Refresh" style={{ padding: '6px' }}>
          <SvgRefresh width={18} height={18} onClick={referesh} />
        </Flex>
      </Flex>

      <Flex className={styles.scroll}>
        {messagelist.length !== 0 ? (
          messagelist.map((val, int) => (
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
                {val.isRead !== true && (
                  <Flex className={styles.notification_dot}></Flex>
                )}

                <Flex
                  style={{
                    marginLeft: val.isRead ? '20px' : '10px',
                    width: 'calc(100% - 20px)',
                    display: 'flex',
                  }}
                >
                  <Flex
                    column
                    start
                    between
                    style={{ display: 'flex', flexDirection: 'column' }}
                  >
                    <Flex
                      row
                      between
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Text className={styles.textHeadingStyle} style={{ maxWidth: "70%"}}>{handlemessage(val)}</Text>
                      <Text size={12}>
                        {getDateString(val.sentDateTime, 'DD/MM/YY')}
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
          ))
        ) : (
          <Flex
            style={{
              alignContent: 'center',
              alignItems: 'center',
              height: '100%',
              // width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <SvgSearchGlass width={65} height={65} />
            <Text style={{ marginTop: '10px' }}>We didn`t find anthing.</Text>
            <Text color="gray">Try a different keyword.</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Maillist;
