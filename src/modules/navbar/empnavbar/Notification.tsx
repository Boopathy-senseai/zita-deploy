import axios from 'axios';
import classNames from 'classnames/bind';
import moment from 'moment';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBell from '../../../icons/SvgBell';
import { notificationApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import ProfileView from '../../applicantpipelinemodule/ProfileView';
import { OthersEntity } from './navbarTypes';
import styles from './notification.module.css';
import {
  notificationDeleteMiddleWare,
  notificationPostMiddleWare,
} from './store/navbarmiddleware';
const cx = classNames.bind(styles);

const Notification = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isData, setData] = useState<any>();
  const myRef = createRef<any>();
  const [isJd, setJd] = useState('0');
  const [isCandi, setCandi] = useState();
  const [isProfile, setProfile] = useState(false);
  const [isMessageTab, setMessageTab] = useState(5);
  useEffect(() => {
    axios.get(notificationApi).then((res) => {
      setData(res.data);
    });
  }, []);
  // notification api call
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(notificationApi).then((res) => {
        setData(res.data);
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

  // notification delete function
  const handleDelete = () => {
    dispatch(notificationDeleteMiddleWare()).then(() => {
      axios.get(notificationApi).then((res) => {
        setData(res.data);
        Toast('Notifications cleared successfully');
      });
    });
    setOpen(false);
  };

  // notification read function
  const handleReadNotification = (id: number) => {
    dispatch(notificationPostMiddleWare({ id })).then(() => {
      axios.get(notificationApi).then((res) => {
        setData(res.data);
      });
    });
    setOpen(false);
  };

  return (
    <div ref={myRef} style={{ position: 'relative' }}>
      <ProfileView
        open={isProfile}
        cancel={() => {
          setProfile(false);
        }}
        jobId={isJd}
        candidateId={isCandi}
        inviteIconNone
        activeState={isMessageTab}
      />
      <div
        title="Notifications"
        onClick={() => setOpen(!isOpen)}
        tabIndex={-1}
        onKeyDown={() => {}}
        role="button"
        style={{ position: 'relative' }}
      >
        {isData && isData.total_unread !== 0 && (
          <div className={styles.countStyle}>
            <Text color="white" style={{ fontSize: 8 }}>
              {isData && isData.total_unread}
            </Text>
          </div>
        )}
        <SvgBell height={24} width={24} />
      </div>
      {isOpen && (
        <Card
          className={
            isData && isData.total !== 0 ? styles.overAll : styles.overAllOne
          }
        >
          {isData && isData.total !== 0 ? (
            <>
              <Flex row center between className={styles.headerStyle}>
                <Text color="theme" bold>
                  Notifications
                </Text>
                <Button types="link" onClick={handleDelete}>
                  Clear All
                </Button>
              </Flex>
              <Flex columnFlex className={styles.scrollStyle}>
                {isData && isData.today && isData.today.length !== 0 && (
                  <Flex columnFlex className={cx('borderBottom')}>
                    {isData &&
                      isData.today.map((list: OthersEntity, index: number) => {
                        let getPath = '';
                        if (list.description.toLowerCase() === 'bulkimport') {
                          getPath = `/bulk_import`;
                        }
                        return (
                          <Flex key={index + list.id}>
                            {index === 0 && (
                              <Text
                                style={{ padding: '8px 16px' }}
                                size={12}
                                bold
                              >
                                Today
                              </Text>
                            )}
                            {list.description.toLowerCase() === 'bulkimport' ? (
                              <LinkWrapper
                                to={getPath}
                                onClick={() => {
                                  handleReadNotification(list.id);
                                }}
                              >
                                <Flex
                                  row
                                  center
                                  between
                                  className={styles.hoverStyle}
                                >
                                  <Flex row className={styles.listStyle}>
                                    <Text size={12} style={{ maxWidth: '75%' }}>
                                      {list.verb}
                                    </Text>
                                    <Text
                                      style={{ marginLeft: 16 }}
                                      size={12}
                                      color="gray"
                                    >
                                      {moment(list.timestamp).fromNow()}
                                    </Text>
                                  </Flex>
                                  {list.unread && (
                                    <div className={styles.readStyle} />
                                  )}
                                </Flex>
                              </LinkWrapper>
                            ) : (
                              <Flex
                                onClick={() => {
                                  setJd(list.action_object_object_id);
                                  setCandi(list.target_object_id);
                                  setProfile(true);
                                  if (
                                    list.description.toLowerCase() ===
                                    'messages'
                                  ) {
                                    setMessageTab(5);
                                  } else {
                                    setMessageTab(0);
                                  }
                                  handleReadNotification(list.id);
                                }}
                              >
                                <Flex
                                  row
                                  center
                                  between
                                  className={styles.hoverStyle}
                                >
                                  <Flex row className={styles.listStyle}>
                                    <Text size={12} style={{ maxWidth: '75%' }}>
                                      {list.verb}
                                    </Text>
                                    <Text
                                      style={{ marginLeft: 16 }}
                                      size={12}
                                      color="gray"
                                    >
                                      {moment(list.timestamp).fromNow()}
                                    </Text>
                                  </Flex>
                                  {list.unread && (
                                    <div className={styles.readStyle} />
                                  )}
                                </Flex>
                              </Flex>
                            )}
                          </Flex>
                        );
                      })}
                  </Flex>
                )}
                {isData && isData.yesterday && isData.yesterday.length !== 0 && (
                  <Flex columnFlex className={cx('borderBottom')}>
                    {isData &&
                      isData.yesterday.map(
                        (list: OthersEntity, index: number) => {
                          let getPath = '';
                          if (list.description.toLowerCase() === 'bulkimport') {
                            getPath = `/bulk_import`;
                          }
                          return (
                            <Flex key={index + list.id}>
                              {index === 0 && (
                                <Text
                                  style={{ padding: '8px 16px' }}
                                  size={12}
                                  bold
                                >
                                  Yesterday
                                </Text>
                              )}
                              {list.description.toLowerCase() === 'bulkimport' ? (
                                <LinkWrapper
                                  to={getPath}
                                  onClick={() => {
                                    handleReadNotification(list.id);
                                  }}
                                >
                                  <Flex
                                    row
                                    center
                                    between
                                    className={styles.hoverStyle}
                                  >
                                    <Flex row className={styles.listStyle}>
                                      <Text
                                        size={12}
                                        style={{ maxWidth: '75%' }}
                                      >
                                        {list.verb}
                                      </Text>
                                      <Text
                                        style={{ marginLeft: 16 }}
                                        size={12}
                                        color="gray"
                                      >
                                        {moment(list.timestamp).fromNow()}
                                      </Text>
                                    </Flex>
                                    {list.unread && (
                                      <div className={styles.readStyle} />
                                    )}
                                  </Flex>
                                </LinkWrapper>
                              ) : (
                                <Flex
                                onClick={() => {
                                  setJd(list.action_object_object_id);
                                  setCandi(list.target_object_id);
                                  setProfile(true);
                                  if (
                                    list.description.toLowerCase() ===
                                    'messages'
                                  ) {
                                    setMessageTab(5);
                                  } else {
                                    setMessageTab(0);
                                  }
                                  handleReadNotification(list.id);
                                }}
                                >
                                  <Flex
                                    row
                                    center
                                    between
                                    className={styles.hoverStyle}
                                  >
                                    <Flex row className={styles.listStyle}>
                                      <Text
                                        size={12}
                                        style={{ maxWidth: '75%' }}
                                      >
                                        {list.verb}
                                      </Text>
                                      <Text
                                        style={{ marginLeft: 16 }}
                                        size={12}
                                        color="gray"
                                      >
                                        {moment(list.timestamp).fromNow()}
                                      </Text>
                                    </Flex>
                                    {list.unread && (
                                      <div className={styles.readStyle} />
                                    )}
                                  </Flex>
                                </Flex>
                              )}
                            </Flex>
                          );
                        },
                      )}
                  </Flex>
                )}

                {isData && isData.others && isData.others.length !== 0 && (
                  <Flex columnFlex>
                    {isData &&
                      isData.others.map((list: OthersEntity, index: number) => {
                        let getPath;
                        if (list.description.toLowerCase() === 'bulkimport') {
                          getPath = `/bulk_import`;
                        }
                        return (
                          <Flex key={index + list.id}>
                            {index === 0 && (
                              <Text
                                style={{ padding: '8px 16px' }}
                                size={12}
                                bold
                              >
                                Older
                              </Text>
                            )}
                            {list.description.toLowerCase() === 'bulkimport' ? (
                              <LinkWrapper
                                to={getPath}
                                onClick={() => {
                                  handleReadNotification(list.id);
                                }}
                              >
                                <Flex
                                  row
                                  center
                                  between
                                  className={styles.hoverStyle}
                                >
                                  <Flex row className={styles.listStyle}>
                                    <Text size={12} style={{ maxWidth: '75%' }}>
                                      {list.verb}
                                    </Text>
                                    <Text
                                      style={{ marginLeft: 16 }}
                                      size={12}
                                      color="gray"
                                    >
                                      {moment(list.timestamp).fromNow()}
                                    </Text>
                                  </Flex>
                                  {list.unread && (
                                    <div className={styles.readStyle} />
                                  )}
                                </Flex>
                              </LinkWrapper>
                            ) : (
                              <Flex
                                onClick={() => {
                                  setJd(list.action_object_object_id);
                                  setCandi(list.target_object_id);
                                  setProfile(true);
                                  if (
                                    list.description.toLowerCase() ===
                                    'messages'
                                  ) {
                                    setMessageTab(5);
                                  } else {
                                    setMessageTab(0);
                                  }
                                  handleReadNotification(list.id);
                                }}
                              >
                                <Flex
                                  row
                                  center
                                  between
                                  className={styles.hoverStyle}
                                >
                                  <Flex row className={styles.listStyle}>
                                    <Text size={12} style={{ maxWidth: '75%' }}>
                                      {list.verb}
                                    </Text>
                                    <Text
                                      style={{ marginLeft: 16 }}
                                      size={12}
                                      color="gray"
                                    >
                                      {moment(list.timestamp).fromNow()}
                                    </Text>
                                  </Flex>
                                  {list.unread && (
                                    <div className={styles.readStyle} />
                                  )}
                                </Flex>
                              </Flex>
                            )}
                          </Flex>
                        );
                      })}
                  </Flex>
                )}
              </Flex>
            </>
          ) : (
            <Text style={{ padding: '4px 16px' }}>
              You don’t have any notifications
            </Text>
          )}
        </Card>
      )}
    </div>
  );
};

export default Notification;
