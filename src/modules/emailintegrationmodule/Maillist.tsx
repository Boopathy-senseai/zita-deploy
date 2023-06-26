import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
  searchmessage: () => void;
  searchinput: any;
  search: string;
  getmessageid: any;
};
const Maillist = ({
  messagelist,
  selectmessage,
  searchmessage,
  searchinput,
  search,
  getmessageid,
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

  return (
    <div>
      <Flex style={{ marginLeft: '2px' }} className={styles.maillist}>
        <InputText
          actionRight={() => <SvgSearch onClick={click} />}
          onChange={(e) => serchmail(e)}
          placeholder="Search by email subject or body"
          className={styles.inputSearch}
          value={search}
        />

        {/* <Flex></Flex> */}

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
                      <Flex>
                        <CheckBox className={styles.checkBox}></CheckBox>
                      </Flex>
                      {val.isRead !== true ? (
                        <Flex className={styles.notification_dot}></Flex>
                      ) : (
                        ''
                      )}

                      <Flex style={{ marginLeft: '15px' }}>
                        <Flex row start between>
                          <Text
                            size={14}
                            className={styles.textHeadingStyle}
                            color="theme"
                          >
                            {val.subject}
                          </Text>
                          <Text size={14}>{val.date}</Text>
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
    </div>
  );
};

export default Maillist;
