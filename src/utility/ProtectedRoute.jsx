/* eslint-disable */
import React, { useState } from 'react';
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { parse } from 'query-string';
import { useEffect } from 'react';
import NavBar from '../modules/navbar/empnavbar/NavBar';
import styles from './usertable.module.css';

import Sidebar from '../modules/navbar/empnavbar/sidebar';
import { display } from '@mui/system';
import { Flex } from '../uikit';

axios.defaults.headers.common['Authorization'] =
  'Token ' + localStorage.getItem('token');

const ProtectedRoute = ({ notIsNav, component: Component, ...rest }) => {
  const history = useHistory();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);

  const handlefunction = () => {
    setSidebar(!sidebar)
  }

  useEffect(() => {
    const toggle =
      sessionStorage.getItem('EmpToggle') === null
        ? false
        : sessionStorage.getItem('EmpToggle');
        if (toggle ==="1" ){
          setSidebar(true);
        }else{
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
            // <Flex column>
            //   <Flex>{notIsNav && <NavBar />}</Flex>
            //   <Flex row>
            //     <Flex className={sidebar === false ? (styles.model) : (styles.model1)} flex={1}><Sidebar data={handlefunction} /></Flex>
            //     <Flex flex={12}><Component {...rest} {...props} /></Flex>
            //   </Flex>
            // </Flex>
            <div>
              <div className='container-fluid'>
                <div class="row">
                  {notIsNav && <NavBar />}
                </div>
                <div style={{ marginTop: "85px" }}>
                  <div style={{ display: "flex",flexDirection:"row"}}>

                    <div className={sidebar === false ? (styles.model) : (styles.model1)}>
                      <Sidebar data={handlefunction} />
                    </div>
                    <div style={{ width: "auto" ,flex:'1'}}>
                      <Component {...rest} {...props} />
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
