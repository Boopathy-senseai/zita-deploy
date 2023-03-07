import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import LinkWrapper from '../uikit/Link/LinkWrapper';
import { routesPath } from '../routes/routesPath';
import SvgSetting from '../icons/SvgSetting';
import Logo from '../assets/images/new_zita_white.png';
import SvgLogout from '../icons/SvgLogOut';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import { permissionMiddleWare } from '../modules/Login/store/middleware/loginMiddleWare';
import { AppDispatch, RootState } from '../store';
import OutsideAlerter from './OutsideAlerter';
import styles from './navigation.module.css';

const cx = classNames.bind(styles);

const Navigation = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  
  const [isProfile, setProfile] = useState('default.jpg');
  // const history = useHistory();

  useEffect(() => {
    dispatch(permissionMiddleWare());
    axios
      .get('users')
      .then((res) => {
        setProfile(res.data.data.profile_pic);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const { Permission } = useSelector(({ permissionReducers }: RootState) => {
    return {
      Permission: permissionReducers.Permission,
    };
  });

  const handleLogout = () => {
    axios
      .post('auth/logout')
      .then(() => {
        localStorage.clear();
        window.location.replace(window.location.origin + '/login');
        // window.location.reload()
        // return window.location.reload();
      })
      .catch((err) => {
        console.log('navigation', err);
      });
  };

  const dashboard = () => {
    return window.location.replace(
      process.env.REACT_APP_HOME_URL + 'mydashboard/',
    );
  };

  const report = () => {
    return window.location.replace(process.env.REACT_APP_HOME_URL + 'reports/');
  };
  const accountSetting = () => {
    return window.location.replace(
      process.env.REACT_APP_HOME_URL + 'account/settings/company/',
    );
  };
  const manageUser = () => {
    return window.location.replace(
      process.env.REACT_APP_HOME_URL + 'manage-users/',
    );
  };
  return (
    <OutsideAlerter setOpen={setOpen}>
      <Navbar expand="lg" className="zitaNav navbar-dark">
        <Container>
          <Link className="navbar-brand" to="/" style={{ cursor: 'auto' }}>
            <img src={Logo} alt="Logo" />
          </Link>
          <NavLink
            className={`nav-link test ${cx('navLinkHover')}`}
            activeClassName="active"
            exact
            to="/"
            onClick={dashboard}
          >
            My Dashboard
          </NavLink>
          <NavLink
            className={`nav-link test ${cx('navLinkHover')}`}
            activeClassName="active"
            exact
            to={routesPath.MY_JOB_POSTING}
          >
            My Job Postings
          </NavLink>
          {Permission.includes('my_database') && (
            <NavLink
              className={`nav-link test ${cx('navLinkHover')}`}
              activeClassName="active"
              exact
              to={routesPath.MYDATABASE}
            >
              My Database
            </NavLink>
          )}

          {Permission.includes('talent_sourcing') && (
            <NavLink
              className={`nav-link test ${cx('navLinkHover')}`}
              activeClassName="active"
              exact
              to={routesPath.TALENT_SOURCING}
            >
              Talent Sourcing
            </NavLink>
          )}

          {Permission.includes('bulkImport_candidates') && (
            <NavLink
              className={`nav-link test ${cx('navLinkHover')}`}
              activeClassName="active"
              exact
              to={routesPath.BULK_IMPORT}
            >
              Bulk Import Candidates
            </NavLink>
          )}

          <NavLink
            className={`nav-link test ${cx('navLinkHover')}`}
            activeClassName="active"
            exact
            to="/"
            onClick={report}
          >
            Reports
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className={`ml-auto ${cx('rightMenuConatiner')}`}>
            <Flex row center >
            <div title={'Account Settings'}> 
              <LinkWrapper target={'_parent'} to={'/account_setting/settings'}>
                <SvgSetting />
              </LinkWrapper>
              </div>
              <div className={cx('supportText', 'navLinkHover')}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={
                    'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8'
                  }
                >
                  <Text size={14} color="white">
                    Support
                  </Text>
                </a>
              </div>
              <NavLink
                onClick={handleLogout}
                className={`nav-link ${cx('navLinkHover')}`}
                activeClassName="active"
                exact
                to="/logout"
              >
                <SvgLogout />
              </NavLink>
              <div>
                <div
                  className={styles.profile}
                  onClick={() => setOpen(!isOpen)}
                  onKeyDown={() => {}}
                  role={'button'}
                  tabIndex={-1}
                >
                  <img
                    alt="User Profile"
                    className={styles.imageStyle}
                    src={`${process.env.REACT_APP_HOME_URL}media/${isProfile}`}
                  />
                </div>
                <Dropdown.Menu
                  show={isOpen}
                  alignRight
                  className={cx('dropDown')}
                >
                  <Dropdown.Item
                    className={cx('black3', 'dropdown_item')}
                    onClick={accountSetting}
                  >
                    Account Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={manageUser}
                    className={cx('black3', 'dropdown_item')}
                  >
                    Manage Users
                  </Dropdown.Item>
                </Dropdown.Menu>
              </div>
            </Flex>
          </Nav>
        </Container>
      </Navbar>
    </OutsideAlerter>
  );
};

export default Navigation;
