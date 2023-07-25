import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgRefresh from '../../icons/SvgRefresh';
import { getDateString } from '../../uikit/helper';
import SvgSearchGlass from '../../icons/SvgSearchGlass';
import SvgRight from '../../icons/SvgRight';
import SvgLeft from '../../icons/SvgLeft';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
  getmessageid: any;
  sideroute: number;
  mailfolders: any;
  removemsg: any;
  page: any;
  sidebarroute: any;
  previousfun: () => void;
  nextfun: () => void;
  range: any;
  previous: any;
  previous1: any;
  total: any;
  msglistcount: any;
  searchicon: any;
  message: any;
};
const Maillist = ({
  messagelist,
  selectmessage,
  getmessageid,
  sideroute,
  mailfolders,
  removemsg,
  page,
  sidebarroute,
  previousfun,
  nextfun,
  range,
  previous,
  previous1,
  total,
  msglistcount,
  searchicon,
  message,
}: Props) => {
  const [messages, setmesage] = useState<any>('');

  const getmessage = (get, id) => {
    if (message.id !== id) {
      removemsg();
      setmesage(get);
      selectmessage(get);
      getmessageid(id);
    }
  };

  const showfolder = () => {
    if (mailfolders.length !== 0) {
      if (sideroute === 1) {
        return (
          <Text bold>
            {mailfolders[4].unreadItemCount !== 0
              ? `Inbox (${mailfolders[4].unreadItemCount})`
              : 'Inbox'}
          </Text>
        );
      } else if (sideroute === 2) {
        return (
          <Text bold>
            {mailfolders[7].unreadItemCount !== 0
              ? `Sent Items (${mailfolders[7].unreadItemCount})`
              : 'Sent Items'}
          </Text>
        );
      } else if (sideroute === 3) {
        return (
          <Text bold>
            {mailfolders[3].unreadItemCount !== 0
              ? `Drafts (${mailfolders[3].unreadItemCount})`
              : 'Drafts'}
          </Text>
        );
      } else if (sideroute === 4) {
        return (
          <Text bold>
            {mailfolders[0].unreadItemCount !== 0
              ? `Archive (${mailfolders[0].unreadItemCount})`
              : 'Archive'}
          </Text>
        );
      } else if (sideroute === 5) {
        return (
          <Text bold>
            {mailfolders[2].unreadItemCount !== 0
              ? ` Deleted Items (${mailfolders[2].unreadItemCount})`
              : ' Deleted Items'}
          </Text>
        );
      } else if (sideroute === 6) {
        return (
          <Text bold>
            {mailfolders[5].unreadItemCount !== 0
              ? ` Junk Email (${mailfolders[5].unreadItemCount})`
              : ' Junk Email'}
          </Text>
        );
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

      if (val.from !== undefined) {
        return <>{val.from.emailAddress.name}</>;
      } else {
        return <>{'(No Recipients)'}</>;
      }
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

        <Flex row center>
          {sidebarroute !== 0 && (
            <>
              {msglistcount !== 0 && (
                <Flex row center>
                  <Text color="theme">{`${previous1}-${previous} of ${total}`}</Text>
                  <Flex
                    title="previous"
                    className={
                      previous1 !== 1 ? styles.icons : styles.iconsDisabled
                    }
                    style={{ marginLeft: '5px' }}
                  >
                    <SvgLeft
                      width={12}
                      height={12}
                      fill={previous1 !== 1 ? '#581845' : '#58184550'}
                      onClick={previous1 !== 1 ? previousfun : undefined}
                    />
                  </Flex>
                  <Flex
                    title="Next"
                    className={
                      previous !== total ? styles.icons : styles.iconsDisabled
                    }
                  >
                    <SvgRight
                      width={12}
                      height={12}
                      fill={previous !== total ? '#581845' : '#58184550'}
                      onClick={previous !== total ? nextfun : undefined}
                    />
                  </Flex>
                </Flex>
              )}
            </>
          )}
          <Flex title="Refresh" style={{ padding: '6px' }}>
            <SvgRefresh width={18} height={18} onClick={referesh} />
          </Flex>
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
                      <Text
                        className={styles.textHeadingStyle}
                        style={{ maxWidth: '70%' }}
                      >
                        {handlemessage(val)}
                      </Text>
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
          <>
            {sideroute === 0 ? (
              <>
                {searchicon === true ? (
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
                    <Text style={{ marginTop: '10px' }}>
                      We didn`t find anthing.
                    </Text>
                    <Text color="gray">Try a different keyword.</Text>
                  </Flex>
                ) : (
                  ' '
                )}
              </>
            ) : (
              ''
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Maillist;
