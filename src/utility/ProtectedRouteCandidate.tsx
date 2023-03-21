import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import NavBarCandidate from '../modules/navbar/candidatenavbar/NavBarCandidate';

axios.defaults.headers.common['Authorization'] =
  'Token ' + localStorage.getItem('token');

const ProtectedRouteCandidate = ({
  notIsNav,
  component: Component,
  ...rest
}: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('token') !== null) {
          return (
            <div>
              {notIsNav && <NavBarCandidate />}
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

export default ProtectedRouteCandidate;
