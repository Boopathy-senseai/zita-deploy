import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';
import SvgArchive from '../../icons/SvgArchive';
import { SvgTrash } from '../../icons';
import SvgJunk from '../../icons/SvgJunk';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgRight from '../../icons/SvgRight';
import SvgLeft from '../../icons/SvgLeft';
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
};
const Maillist = ({
  messagelist,
  selectmessage,
  searchmessage,
  searchinput,
  search,
  getmessageid,
  sideroute,
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
    if (sideroute === 1) {
      return <Text>Inbox</Text>;
    } else if (sideroute === 2) {
      return <Text>Inbox</Text>;
    } else if (sideroute === 3) {
      return <Text>Inbox</Text>;
    } else if (sideroute === 4) {
      return <Text>Inbox</Text>;
    } else if (sideroute === 5) {
      return <Text>Inbox</Text>;
    } else if (sideroute === 6) {
      return <Text>Inbox</Text>;
    }
  };

  return (
    <Flex >
      {console.log('siderouteaaa', sideroute)}
      <Flex
        style={{ marginLeft: '2px', borderRight: '1px solid #c3c3c3' }}
        className={styles.maillist}
      >
        {/* <InputText
          actionRight={() => <SvgSearch onClick={click} />}
          onChange={(e) => serchmail(e)}
          placeholder="Search by email subject or body"
          className={styles.inputSearch}
          value={search}
        /> */}

        {/* <Flex></Flex> */}
        {/* <Flex row between center className={styles.iconContainer}>
          <Text bold>Inbox </Text>
          <SvgRefresh width={16} height={16} /> */}

        {/* <Flex row>
            <Flex title="Archive" className={styles.icons}>
              <SvgArchive
                width={16}
                height={16}
                fill={'#581845'}
                onClick={() => {}}
              />
            </Flex>
            <Flex title="Delete" className={styles.icons} onClick={() => {}}>
              <SvgTrash width={16} height={16} fill={'#581845'} />
            </Flex>
            <Flex title="Junk" className={styles.icons} onClick={() => {}}>
              <SvgJunk width={16} height={16} stroke={'#581845'} />
            </Flex>
          </Flex> */}
        {/* <Flex row center>
            <Text >1-25 of 500</Text>
            <Flex title="previous" className={styles.icons} style={{ marginLeft: '5px' }}>
              <SvgLeft
                width={12}
                height={12}
                fill={'#581845'}
                // onClick={() => {}}
              />
            </Flex>
            <Flex title="Next" className={styles.icons}>
              <SvgRight
                width={12}
                height={12}
                fill={'#581845'}
                // onClick={() => {}}
              />
            </Flex>
            <Flex title='Refresh' marginLeft={5}>
            <SvgRefresh width={18} height={18} />

            </Flex>

           
          </Flex> */}
        {/* </Flex> */}

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
                            <Text
                              size={14}
                              className={styles.textHeadingStyle}
                              color="black"
                            >
                              {val.sender.emailAddress.name}
                            </Text>
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
                            {val.bodyPreview}
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
