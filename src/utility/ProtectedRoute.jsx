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

const ProtectedRoute = ({ notIsNav, component: Component, ...rest }) => {
  const history = useHistory();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const [passwordupdate, setpasswordupdate] = useState(false);
  const [unsavealert,setunsavealert] = useState(false);
  const [statementalert,setstatementalert] = useState(false);
 
  
  const changeurlpopup =()=>{
     setunsavealert(true);
   } 
  const handlefunction = () => {
    setSidebar(!sidebar)
  }
  const updatepassword =()=>{
   setpasswordupdate(!passwordupdate)
  }
  
  useEffect(() => {
    const toggle =
      sessionStorage.getItem('EmpToggle') === null
        ? false
        : sessionStorage.getItem('EmpToggle');
    if (toggle === "1") {
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
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('token') !== null) {
          return ( 
            <div>
              <div className='container-fluid'>
                <div class="row">
                  {notIsNav && <NavBar  update={updatepassword}/>}
                </div>
                <div style={{ marginTop: "85px" }}>
                  <div style={{ display: "flex" }}>

                    <div className={sidebar === false ? (styles.model) : (styles.model1)}  >
                      <Sidebar data={handlefunction} changes={unsavealert}    />
                    </div>
                    <div style={{width:"auto",flex:1 }} >
                      <Component {...rest} {...props}   value={changeurlpopup}    /> 
                      <div><UserProfile  value={passwordupdate} update={updatepassword}/></div> 
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
  );
};

export default ProtectedRoute;
