import axios from 'axios';
import classNames from 'classnames/bind';
import moment from 'moment';
import { createRef, useEffect, useState,useRef } from 'react';

import { useDispatch } from 'react-redux';
import SvgBell from '../../../icons/SvgBell';
import SvgClose from '../../../icons/SvgClose';
import { notificationApi } from '../../../routes/apiRoutes';
import { AppDispatch } from '../../../store';
import Modal from '../../../uikit/Modal/Modal';
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
  const [modelopen, setmodelopen] = useState(false);
  const [check,setcheck ] = useState(false);
  const [isMessageTab, setMessageTab] = useState(5);
  const dropDownRef = useRef(null);
  useEffect(() => {
    axios.get(notificationApi).then((res) => {

      console.log("ressssssssssssssssKKKKKKKKKK",res)
      setData(res.data);
    });
  }, []);
  // notification api call

    const closeDropDown = (e: any) => {

    console.log("closeDropDown")

     console.log({target: e.target, modelopen, dropDownRef})

    if (

      dropDownRef.current &&

      modelopen &&

      !dropDownRef.current.contains(e.target)

    ) {

      // console.log("SHOW FASLE")

      setmodelopen(false);

    }

  };

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
        setmodelopen(false);
        Toast('Notifications cleared successfully');
      });
    });
    setcheck(true)
    setmodelopen(false)
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
const myfunction=()=>{ 
 
  {
  setOpen(true);}
 
}

  const handleclose = () => {
    setOpen(false);
  };

  // if(isOpen===false){
  //   setmodelopen(false);
  // }
  

  return (
    
    <Flex >
      {console.log("open",isOpen)}
      <div ref={myRef} style={{ position: 'relative' }} >
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
          onClick={() => setOpen(!isOpen)}
          tabIndex={-1}
          onKeyDown={() => {}}
          role="button"
          title="Notifications"
          className={styles.hoverback}
          style={{ position: 'relative', padding: ' 5px' }}
        >
          {isData && isData.total_unread !== 0 && (
            <div className={styles.countStyle}>
              <Text color="white" style={{ fontSize: 10, marginTop: '2px' }}>
                {isData && isData.total_unread}
              </Text>
            </div>
          )}
          <SvgBell fill={'#581845'} height={20} width={20} />
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
                  <Text color="theme" style={{ fontSize: '14px' }} bold>
                    Notifications
                  </Text>
                  <Flex onClick={handleclose} style={{ cursor: 'pointer' }}>
                    <SvgClose width={10} height={10} />
                  </Flex>
                </Flex>
                <hr className={styles.line} />
                <Flex columnFlex className={styles.scrollStyle}>
                  {isData && isData.today && isData.today?.length !== 0 && (
                    <Flex columnFlex className={cx('borderBottom')}>
                      {isData &&
                        isData.today?.map(
                          (list: OthersEntity, index: number) => {
                            let getPath = '';
                           
                            if (
                              list.description.toLowerCase() === 'bulkimport'
                            ) {
                              getPath = `/bulk_import`;
                            }
                            return (
                              <>
                                <Flex key={index + list.id}>
                                  {index === 0 && (
                                    <Text
                                      style={{
                                        padding: '8px 16px 0px 16px',
                                        fontWeight: 600,
                                        fontSize: '13px',
                                      }}
                                      bold
                                    >
                                      TODAY
                                    </Text>
                                  )}
                                  {list.description.toLowerCase() ===
                                  'bulkimport' ? (
                                    <>
                                      {' '}
                                      {index === 0 ? (
                                        ''
                                      ) : (
                                        <hr className={styles.hr_line} />
                                      )}
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
                                          <Flex
                                            row
                                            className={styles.listStyle}
                                          >
                                            <Text
                                              style={{
                                                maxWidth: '72%',
                                                fontSize: '13px',
                                              }}
                                            >
                                              {list.verb}
                                            </Text>
                                            <Text
                                              style={{
                                                marginLeft: 3,
                                                fontSize: '13px',
                                              }}
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
                                    </>
                                  ) : list.description.toLowerCase() ===
                                    'candidatenotes' ? (
                                    <>
                                      {index === 0 ? (
                                        ''
                                      ) : (
                                        <hr className={styles.hr_line} />
                                      )}
                                      <Flex
                                        onClick={() => {
                                          setCandi(list.target_object_id);
                                          setProfile(true);
                                          setMessageTab(2);
                                          handleReadNotification(list.id);
                                        }}
                                      >
                                        <Flex
                                          row
                                          center
                                          between
                                          className={styles.hoverStyle}
                                        >
                                          <Flex
                                            row
                                            className={styles.listStyle}
                                          >
                                            <Text
                                              style={{
                                                maxWidth: '72%',
                                                fontSize: '13px',
                                              }}
                                            >
                                              {list.verb}
                                            </Text>
                                            <Text
                                              style={{
                                                marginLeft: 3,
                                                fontSize: '13px',
                                              }}
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
                                    </>
                                  ) : (
                                    <>
                                      {index === 0 ? (
                                        ''
                                      ) : (
                                        <hr className={styles.hr_line} />
                                      )}

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
                                          <Flex
                                            row
                                            className={styles.listStyle}
                                          >
                                            <Text
                                              style={{
                                                maxWidth: '72%',
                                                fontSize: '13px',
                                              }}
                                            >
                                              {list.verb}
                                            </Text>
                                            <Text
                                              style={{
                                                marginLeft: 3,
                                                fontSize: '13px',
                                              }}
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
                                    </>
                                  )}
                                </Flex>
                              </>
                            );
                          },
                        )}
                    </Flex>
                  )}
                  {isData && isData.yesterday && isData.yesterday?.length !== 0 && (
                    <Flex columnFlex className={cx('borderBottom')}>
                      {isData &&
                        isData.yesterday?.map(
                          (list: OthersEntity, index: number) => {
                            let getPath = '';
                            if (
                              list.description.toLowerCase() === 'bulkimport'
                            ) {
                              getPath = `/bulk_import`;
                            }
                            return (
                              <Flex key={index + list.id}>
                                {index === 0 && (
                                  <Text
                                    style={{
                                      padding: '16px 16px 0px 16px',
                                      fontWeight: 600,
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    YESTERDAY
                                  </Text>
                                )}
                                {list.description.toLowerCase() ===
                                'bulkimport' ? (
                                  <>
                                    {' '}
                                    {index === 1 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
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
                                            style={{
                                              maxWidth: '295px',
                                              fontSize: '13px',
                                            }}
                                          >
                                            {list.verb}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                    </LinkWrapper>{' '}
                                  </>
                                ) : list.description.toLowerCase() ===
                                  'candidatenotes' ? (
                                  <>
                                    {index === 0 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
                                    < LinkWrapper
                                      onClick={() => {
                                        setCandi(list.target_object_id);
                                        setProfile(true);
                                        setMessageTab(2);
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
                                            style={{
                                              maxWidth: '72%',
                                              fontSize: '13px',
                                            }}
                                          >
                                            {list.verb}
                                          </Text>
                                          <Text
                                            style={{
                                              marginLeft: 3,
                                              fontSize: '13px',
                                            }}
                                            color="gray"
                                          >
                                            {moment(list.timestamp).fromNow()}
                                          </Text>
                                        </Flex>
                                      </Flex>
                                    </LinkWrapper>{' '}
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    {index === 0 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
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
                                            style={{
                                              maxWidth: '72%',
                                              fontSize: '13px',
                                            }}
                                          >
                                            {list.verb}
                                          </Text>
                                          <Text
                                            style={{
                                              marginLeft:3,
                                              fontSize: '13px',
                                            }}
                                            color="gray"
                                          >
                                            {moment(list.timestamp).fromNow()}
                                          </Text>
                                        </Flex>
                                        {list.unread && (
                                          <div className={styles.readStyle} />
                                        )}
                                      </Flex>
                                    </Flex>{' '}
                                  </>
                                )}
                              </Flex>
                            );
                          },
                        )}
                    </Flex>
                  )}
                  {console.log(isData.others.length, 'lengthvbb gegfvbgearfd')}
                  {isData && isData.others && isData.others.length !== 0 && (
                    <Flex columnFlex>
                      {isData &&
                        isData.others.map(
                          (list: OthersEntity, index: number) => {
                            console.log("listlistlistlistlistlistlistlist",list)
                            let getPath;
                            if (
                              list.description.toLowerCase() === 'bulkimport'
                            ) {
                              getPath = `/bulk_import`;
                            }
                            return (
                              <Flex key={index + list.id}>
                                {index === 0 && (
                                  <Text
                                    style={{
                                      padding: '16px 16px 0px 16px',
                                      fontWeight: 600,
                                      fontSize: '13px',
                                    }}
                                    bold
                                  >
                                    OLDER
                                  </Text>
                                )}
                                {list.description.toLowerCase() ===
                                'bulkimport' ? (
                                  <>
                                    {' '}
                                    {index === 0 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
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
                                            style={{
                                              maxWidth: '72%',
                                              fontSize: '13px',
                                            }}
                                          >
                                            {list.verb}
                                          </Text>
                                          <Text
                                            style={{
                                              marginLeft: 3,
                                              fontSize: '13px',
                                            }}
                                            color="gray"
                                          >
                                            {moment(list.timestamp).fromNow()}
                                          </Text>
                                        </Flex>
                                        {list.unread && (
                                          <div className={styles.readStyle} />
                                        )}
                                      </Flex>
                                    </LinkWrapper>{' '}
                                  </>
                                ) : list.description.toLowerCase() ===
                                  'candidatenotes' ? (
                                  <>
                                    {index === 0 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
                                    <Flex
                                      onClick={() => {
                                        setCandi(list.target_object_id);
                                        setProfile(true);
                                        setMessageTab(2);
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
                                            style={{
                                              maxWidth: '72%',
                                              fontSize: '13px',
                                            }}
                                          >
                                            {list.verb}
                                          </Text>
                                          <Text
                                            style={{
                                              marginLeft: 3,
                                              fontSize: '13px',
                                            }}
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
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    {index === 0 ? (
                                      ''
                                    ) : (
                                      <hr className={styles.hr_line} />
                                    )}
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
                                      <Flex row className={styles.hoverStyle}>
                                        <Flex
                                          row
                                          between
                                          className={styles.listStyle}
                                        >
                                          <Flex>
                                            <Text
                                              style={{
                                                maxWidth: '72%',
                                                fontSize: '13px',
                                              }}
                                            >
                                              {list.verb}
                                            </Text>
                                          </Flex>
                                          <Flex>
                                            <Text
                                              style={{
                                                marginLeft: 3,
                                                fontSize: '13px',
                                                display: 'flex',
                                              }}
                                              color="gray"
                                            >
                                              {moment(list.timestamp).fromNow()}
                                            </Text>
                                          </Flex>
                                        </Flex>
                                        {list.unread && (
                                          <div className={styles.readStyle} />
                                        )}
                                      </Flex>
                                    </Flex>
                                  </>
                                )}
                              </Flex>
                            );
                          },
                        )}
                    </Flex>
                  )}
                </Flex>
                <hr className={styles.hr_lineforbutton} />
                <div>
                  <Button
                    className={styles.model_open}
                    onClick={() => setmodelopen(true)}
                  >
                    Clear All
                  </Button>
                </div>
              </>
            ) : (
              <Flex>
                <Flex row center between className={styles.headerStyle}>
                  <Text color="theme" style={{ fontSize: '14px' }} bold>
                    Notifications
                  </Text>
                  <Flex onClick={handleclose} style={{ cursor: 'pointer' }}>
                    <SvgClose width={10} height={10} />
                  </Flex>
                </Flex>
                <hr className={styles.line} />

                <Flex style={{ textAlign: 'center' }}>
                  <Flex
                    style={{
                      position: 'absolute',
                      top: '47%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <SvgBell fill={'#666666'} height={24} width={24} />
                  </Flex>

                  <Text
                    style={{
                      position: 'absolute',
                      top: '47%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      marginTop: '15px',
                      color: '#666666',
                    }}
                  >
                    <br />
                    You don’t have any notification
                  </Text>
                </Flex>
              </Flex>
            )}
          </Card>
        )}
      </div>

<Flex ref={dropDownRef}  onClick={myfunction}>
      <Modal open={modelopen}  data-bs-backdrop='static'  >
        <Flex className={styles.model}  >
          <Flex className={styles.confirm_title}>
            This action will clear all the notifications.
          </Flex>
          <Flex className={styles.confirm_txt}>Are you sure to proceed?</Flex>
          <Flex row end style={{ marginTop: '20px' }}>
            <Flex>
              <Button
                style={{ backgroundColor: '#888888', borderColor: '#888888' }}
                onClick={() => setmodelopen(false)}
              >
                Cancel
              </Button>
            </Flex>
            <Flex>
              <Button
                className={styles.Btn_clear}
                onClick={handleDelete}
                style={{ marginLeft: '10px' }}
              >
                Clear
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      </Flex>
    </Flex>
  );
};

export default Notification;
