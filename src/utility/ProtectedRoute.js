/* eslint-disable */
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigation from '../component/Navigation';

axios.defaults.headers.common['Authorization'] =
  'Token ' + localStorage.getItem('token');

const ProtectedRoute = ({ notIsNav, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('token') !== null) {
          return (
            <div>
              {notIsNav && <Navigation />}
              <Component {...rest} {...props} />
            </div>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
