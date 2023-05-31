import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';

const CheckSignUpActivate = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const tocken: any = query.get('tocken');
  const is_staff: any = query.get('is_staff');
  const username: any = query.get('username');
  const plan_id: any = query.get('plan_id');

  // check url params based signup redirection
  useEffect(() => {
    if (
      !isEmpty(tocken) &&
      !isEmpty(is_staff) &&
      !isEmpty(username) &&
      !isEmpty(plan_id)
    ) {
      localStorage.setItem('loginUserCheck', is_staff);
      localStorage.setItem('token', tocken);
      localStorage.setItem('loginUserId', is_staff === 'true' ? '0' : username);
      if (Number(plan_id) === 2) {
        sessionStorage.setItem('superUserTab', '2');
        window.location.replace(
          window.location.origin + '/account_setting/settings',
        );
      } else {
        sessionStorage.setItem('superUserTab', '0');
        sessionStorage.setItem('superUserFalseTab', '0');
        window.location.replace(
          window.location.origin + '/account_setting/settings',
        );
      }
    }
  });
  return <Loader />;
};

export default CheckSignUpActivate;
