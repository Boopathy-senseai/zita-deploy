/* eslint-disable */
import { Route, Redirect, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import {parse} from 'query-string';
import { useEffect } from 'react';
import NavBar from '../modules/navbar/empnavbar/NavBar';

axios.defaults.headers.common['Authorization'] =
  'Token ' + localStorage.getItem('token');

const ProtectedRoute = ({ notIsNav, component: Component, ...rest }) => {
  const history = useHistory();
  const location = useLocation();
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
              {notIsNav && <NavBar />}
              <Component {...rest} {...props} />
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
