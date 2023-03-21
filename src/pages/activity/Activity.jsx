import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SvgMail from '../../icons/SvgMail';
import SvgHouse from '../../icons/SvgHouse';
import SvgPhone from '../../icons/SvgPhone';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { PRIMARY } from '../../uikit/Colors/colors';
import ActivityTabData from './ActivityTabData';
import HistoryTabData from './HistoryTabData';
import styles from './activity.module.css';

function Activity() {
  const { itemId } = useParams();
  const [usersData, setUsersData] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    axios
      .get('users/' + itemId + '/')
      .then((res) => {
        setUsersData(res.data.data.user[0]);
        setLoader(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [itemId]);

  const getStatusButton = () => {
    if (usersData.status === 1) {
      return (
        <button
          style={{
            borderRadius: 20,
            pointerEvents: 'none',
            height: 28,
            textTransform: 'capitalize',
          }}
          size={'small'}
          className="status-btn-success mx-2"
        >
          Active
        </button>
      );
    } else if (usersData.status === 0) {
      return (
        <button
          style={{
            borderRadius: 20,
            pointerEvents: 'none',
            height: 28,
            textTransform: 'capitalize',
          }}
          size={'small'}
          className="status-btn-warning mx-2"
        >
          Pending
        </button>
      );
    } else {
      return (
        <button
          style={{
            borderRadius: 20,
            pointerEvents: 'none',
            height: 28,
            textTransform: 'capitalize',
          }}
          size={'small'}
          className="status-btn-inactive mx-2"
        >
          Inactive
        </button>
      );
    }
  };
  return (
    <>
      {!loader && <Loader />}
      <section className={styles.overAll}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <Text size={18} bold className={styles.logText}>
                Activity Log
              </Text>
              <div className="card mb-4" style={{ marginTop: 16 }}>
                <div className="card-body" style={{ padding: 16 }}>
                  <Flex row center between>
                    <Flex row center>
                      <Text
                        size={16}
                        bold
                      >{`${usersData.first_name} ${usersData.last_name}`}</Text>
                      <div className="col-auto">
                        <button
                          style={{
                            borderRadius: 20,
                            pointerEvents: 'none',
                            height: 28,
                            textTransform: 'capitalize',
                          }}
                          size={'small'}
                          className="status-btn-admin"
                        >
                          {usersData.group_name}
                        </button>
                        {getStatusButton()}
                      </div>
                    </Flex>
                    <LinkWrapper to="/account_setting/settings">
                      <Text color="link" bold size={16}>
                        Back to Manage Users
                      </Text>
                    </LinkWrapper>
                  </Flex>
                  <div style={{ marginTop: 8 }}>
                    <div>
                      <Flex row center>
                        <SvgMail width={14} height={14} fill={PRIMARY} />
                        <Text className={styles.svgTextStyle}>
                          {usersData.email}
                        </Text>
                      </Flex>
                    </div>
                    <div style={{ lineHeight: 3 }}>
                      {usersData.contact_number !== '' ? (
                        <Flex row center>
                          <SvgPhone width={14} height={14} fill={PRIMARY} />
                          <Text className={styles.svgTextStyle}>
                            {usersData.contact_number}
                          </Text>
                        </Flex>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      <Flex row center>
                        <SvgHouse width={14} height={14} fill={PRIMARY} />
                        <Text className={styles.svgTextStyle}>
                          {usersData.department_name}
                        </Text>
                      </Flex>
                    </div>
                  </div>
                </div>
              </div>
              <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
                <Tab eventKey="overview" title="Overview">
                  <ActivityTabData userId={itemId} />
                </Tab>
                <Tab eventKey="history" title="History">
                  <HistoryTabData userId={itemId} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Activity;
