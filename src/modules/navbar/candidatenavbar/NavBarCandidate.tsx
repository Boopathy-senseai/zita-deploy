import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { candidateChangePassWord } from '../../../appRoutesPath';
import SvgLogout from '../../../icons/SvgLogOut';
import SvgSetting from '../../../icons/SvgSetting';
import SvgUser from '../../../icons/SvgUser';
import { AppDispatch, RootState } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import {
  logOutMiddleWare,
  navBarMiddleWare,
} from '../store/middleware/navbarmiddleware';
import styles from './navbarcandidate.module.css';

const cx = classNames.bind(styles);

const NavBarCandidate = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLogOutLoader, setLogOutLoader] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(navBarMiddleWare());
  }, []);
  const { company_detail, setting, profile } = useSelector(
    ({ navBarReducers, dashboardReducers }: RootState) => {
      return {
        company_detail: navBarReducers.company_detail,
        setting: dashboardReducers.setting,
        profile: dashboardReducers.profile,
      };
    },
  );

  // logout function
  const handleLogout = () => {
    setLogOutLoader(true);
    dispatch(logOutMiddleWare()).then(() => {
      setLogOutLoader(false);
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace(window.location.origin + '/login_candidate');
    });
  };

  return (
    <div className={styles.overAll}>
      {isLogOutLoader && <Loader />}
      <Flex row center between>
        <Flex row center>
          {!isEmpty(company_detail?.logo) && (
            <img
            style={{objectFit: 'contain'}}
              alt="logo"
              src={mediaPath + company_detail?.logo}
              className={styles.profile}
            />
          )}

          <LinkWrapper>
            <Text
              color="white"
              className={cx('linkTitle', { navFocusColor: pathname === '/' })}
            >
              My Dashboard
            </Text>
          </LinkWrapper>
          <LinkWrapper to={`/${setting?.career_page_url}/careers`}>
            <Text color="white" className={cx('linkTitle')}>
              Careers Page
            </Text>
          </LinkWrapper>
          <LinkWrapper
            to={`/candidate_profile_edit/${localStorage.getItem(
              'loginUserId',
            )}`}
          >
            <Text color="white" className={cx('linkTitle')}>
              Edit Profile
            </Text>
          </LinkWrapper>
          {/* <LinkWrapper
            to={`/apply_candidate_profile_view/${localStorage.getItem(
              'loginUserId',
            )}`}
          >
            <Text color="white" className={cx('profileStyle')}>
              View Profile
            </Text>
          </LinkWrapper> */}
        </Flex>
        <Flex row center>
          <LinkWrapper to={candidateChangePassWord}>
            <div
              className={cx('svgMargin', {
                navFocusColor: pathname === '/change_password',
              })}
            >
              <SvgSetting height={20} width={20} />
            </div>
          </LinkWrapper>

          <LinkWrapper onClick={handleLogout}>
            <div title="Logout" className={cx('svgMargin')}>
              <SvgLogout height={20} width={20} />
            </div>
          </LinkWrapper>
          <div className={cx('svgUserStyle')}>
            {isEmpty(profile) || profile === 'default.jpg' ? (
              <SvgUser height={20} width={20} />
            ) : (
              <img
              style={{objectFit: 'cover'}}
                src={mediaPath + profile}
                alt="profile"
                className={styles.candiProfile}
              />
            )}
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default NavBarCandidate;
