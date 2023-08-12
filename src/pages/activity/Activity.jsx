import axios from 'axios';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import SvgMail from '../../icons/SvgMail';
import SvgHouse from '../../icons/SvgHouse';
import SvgPhone from '../../icons/SvgPhone';
import SvgHeart from '../../icons/SvgHeart';
import SvgOverview from '../../icons/SvgOverview';
import SvgHistory from '../../icons/SvgHistory';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { PRIMARY, WHITE } from '../../uikit/Colors/colors';
import ActivityTabData from './ActivityTabData';
import HistoryTabData from './HistoryTabData';
import styles from './activity.module.css';


function Activity() {
  const { itemId } = useParams();
  const [usersData, setUsersData] = useState({});
  const [loader, setLoader] = useState(false);
  const [overview, setoverview] = useState(true);
  

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
            fontWeight:'bold'
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

  const viewover = () => {
    setoverview(true)
  }

  const history = () => {
    setoverview(false)
  }

  
  return (
    <>
      {!loader && <Loader />}
      <section className={styles.overAll}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <div className={styles.cardHeadback}>
                <Text size={14} bold className={styles.logText}>
                  Activity Log
                </Text>
                <LinkWrapper to="/account_setting/settings">
                  <Text color="link" bold size={13} className={styles.secondaryBtn}>
                    Back to Manage Users
                  </Text>
                </LinkWrapper>
              </div>
              <div className={styles.activitylogs}>
                <div className="card mb-4" style={{ marginTop: 16, height: "225px" }}>
                  <div className="card-body" style={{ padding: 16 }}>
                    {/* -----------Profile status -----------*/}
                    <Flex row center between>
                      <Flex row center>
                        {/* newly added div for profile*/}
                        <div className={styles.activityProfile}>
                          <div className={styles.profileStatus}>
                            <Text
                              size={14}
                              bold
                            >{`${usersData.first_name} ${usersData.last_name}`}</Text>
                            <button
                              style={{
                                borderRadius: 15,
                                pointerEvents: 'none',
                                height: 28,
                                textTransform: 'capitalize',
                              }}
                              size={'small'}
                              className="status-btn-admin"
                            >
                              {usersData.group_name}
                            </button>
                          </div>
                          <div className="col-auto" style={{ padding: 0, paddingTop: "10px", paddingBottom: "15px" }}>
                            {/* <button
                            style={{
                              borderRadius: 15,
                              pointerEvents: 'none',
                              height: 28,
                              textTransform: 'capitalize',
                            }}
                            size={'small'}
                            className="status-btn-admin"
                          >
                            {usersData.group_name}
                          </button>  */}
                            <Text>Status:{getStatusButton()}</Text>
                          </div>
                        </div>
                        {/* newly added div for profile end*/}
                      </Flex>
                    </Flex>
                    {/* -----------Profile status end -----------*/}
                    <div style={{ marginTop: 12 }}>
                      {/* -----------Activity Email -----------*/}
                      {/* <div> */}
                      <Flex row center>
                        <div className={styles.activityDetails}>
                          <SvgMail width={14} height={14} fill={PRIMARY} />
                          <div className={styles.detailsEmail}>
                            {/* <Text className={styles.svgTextStyle} color="theme">Email</Text> */}
                            <Text className={styles.svgTextStyle}>
                              {/* style={{ fontWeight: "bold" }} */}
                              {usersData.email}
                            </Text>
                          </div>
                        </div>
                      </Flex>
                      {/* </div> */}
                    </div>
                    {/* -----------Activity Email end -----------*/}

                    {/* -----------Activity Contact num -----------*/}
                    <div style={{ marginTop: 12 }}>
                      {usersData.contact_number !== '' ? (
                        // <div>
                        <Flex row center>
                          <div className={styles.activityDetails}>
                            <SvgPhone width={14} height={14} fill={PRIMARY} />
                            <div className={styles.detailsEmail}>
                              {/* <Text className={styles.svgTextStyle} color="theme" >Contact Number</Text> */}
                              <Text className={styles.svgTextStyle}>
                                {usersData.contact_number}
                              </Text>
                            </div>
                          </div>
                        </Flex>
                        // </div>
                      ) : (
                        ''
                      )}
                    </div>
                    {/* -----------Activity Contact num end -----------*/}

                    {/* -----------Activity Departmen -----------*/}
                    <div style={{ marginTop: 12 }}>
                      <div>
                        <Flex row center>
                          <div className={styles.activityDetails}>
                            <SvgHouse width={14} height={14} fill={PRIMARY} />
                            <div className={styles.detailsEmail}>
                              {/* <Text className={styles.svgTextStyle} color="theme" >Department</Text> */}
                              <Text className={styles.svgTextStyle}>
                                {usersData.department_name}
                              </Text>
                            </div>
                          </div>
                        </Flex>
                      </div>
                    </div>
                    {/* -----------Activity Departmen  end-----------*/}
                  </div>
                </div>
                {/* -----------Overview history tab-----------*/}
                <div className={styles.overviewHistory}>
                  <Flex className={styles.textIcon}>
                    <Flex className={styles.overviewContent}>
                      <button className={styles.overviewBox} onClick={viewover}
                        style={{ backgroundColor: overview === true ? PRIMARY : "#EDE6EB" }}
                      >
                        {/* PRIMARY : WHITE */}
                        <SvgOverview width={14} height={14} fill={overview === true ? WHITE:PRIMARY} /> 
                        <Text style={{
                          marginLeft: '10px',
                          fontWeight: '600',
                          color: overview === true ? WHITE : PRIMARY,
                        }}>Overview</Text>
                        {/* <Text style={{color:"#fff", marginLeft:"10px"}}>Overview</Text>   */}
                      </button></Flex>


                    <Flex className={styles.historyContent}>
                      <button className={styles.overviewBox} onClick={history} 
                      style={{ backgroundColor: overview === false ? PRIMARY : "#EDE6EB" }}
                      >
                        <SvgHistory width={14} height={14} fill={overview === false ? WHITE:PRIMARY} />
                        <Text style={{
                          marginLeft: '10px',
                          fontWeight: '600',
                          color: overview === false ? WHITE : PRIMARY,
                        }}>History</Text>
                      </button></Flex>
                  </Flex>
                  {overview === true ? (<ActivityTabData userId={itemId} />) : (<HistoryTabData userId={itemId} />)}
                </div>
                {/* -----------Overview history tab end-----------*/}
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}

export default Activity;
