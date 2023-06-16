import React, { useState, useEffect } from 'react';
import { Flex, Card, CheckBox, Text, InputText } from '../../uikit';
import SvgSearch from '../../icons/SvgSearch';
import styles from './maillist.module.css';

type Props = {
  messagelist: any;
  selectmessage: any;
};
const Maillist = ({ messagelist, selectmessage }: Props) => {
  const [messages, setmesage] = useState<any>();

  const getmessage = (get) => {
    setmesage(get);
    selectmessage(get);
  };
  return (
    <div>
      <Flex style={{ marginLeft: '2px' }} className={styles.maillist}>
        <InputText
          actionRight={() => <SvgSearch />}
          placeholder="Search by email subject or body"
          className={styles.inputSearch}
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
                    onClick={() => getmessage(val)}
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
