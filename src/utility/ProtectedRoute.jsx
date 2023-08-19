/* eslint-disable */
import React, { useState } from 'react';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { parse } from 'query-string';
import { useEffect } from 'react';
import NavBar from '../modules/navbar/empnavbar/NavBar';
import styles from './usertable.module.css';
import UserProfile from '../modules/accountsettingsmodule/userprofilemodule/userProfile';
import Sidebar from '../modules/navbar/empnavbar/sidebar';
import { display } from '@mui/system';
import { Flex } from '../uikit';

axios.defaults.headers.common['Authorization'] =
  'Token ' + localStorage.getItem('token');

const ProtectedRoute = ({
  isside,
  notIsNav,
  component: Component,
  ...rest
}) => {
  const history = useHistory();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const [passwordupdate, setpasswordupdate] = useState(false);
  const [unsavealert, setunsavealert] = useState(false);
  const [statementalert, setstatementalert] = useState(false);

  const changeurlpopup = () => {
    setunsavealert(true);
  };
  const handlefunction = () => {
    setSidebar(!sidebar);
  };
  const updatepassword = () => {
    setpasswordupdate(!passwordupdate);
  };

  useEffect(() => {
    const toggle =
      sessionStorage.getItem('EmpToggle') === null
        ? false
        : sessionStorage.getItem('EmpToggle');
    if (toggle === '1') {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  }, []);

  useEffect(() => {
    const query = parse(location.search);

    if (query && query.redirect) {
      history.push(`${query.redirect}`);
    }
  }, [location.pathname]);
  const url = window.location.href;
  const applicantpipelineUrl = url.includes('applicant_pipe_line');
  // console.log(applicantpipelineUrl);
  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          if (localStorage.getItem('token') !== null) {
            return (
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <div
                  className={isside ? 'container-fluid' : ''}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <div class="row">
                    {notIsNav && <NavBar update={updatepassword} />}
                  </div>
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      flex: 1,
                      overflow: 'hidden',
                      paddingTop: isside ? 62 : '',
                      // paddingBottom: 14,
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      {isside && (
                        <div
                          className={
                            sidebar === false ? styles.model : styles.model1
                          }
                        >
                          <Sidebar
                            data={handlefunction}
                            changes={unsavealert}
                          />
                        </div>
                      )}
                      <div
                        style={{
                          position: 'relative',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          height: '-webkit-fill-available',
                          paddingLeft: '20px',
                          overflow : applicantpipelineUrl ? "auto" : "hidden",
                        }}
                      >
                        <Component
                          {...rest}
                          {...props}
                          value={changeurlpopup}
                        />
                        <div>
                          <UserProfile
                            value={passwordupdate}
                            update={updatepassword}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: `/login/?next=${props.location.pathname}`,
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }}
      />
      {console.log('1212', sidebar)}
    </>
  );
};

export default ProtectedRoute;
