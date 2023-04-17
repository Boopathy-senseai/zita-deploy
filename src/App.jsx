import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logout from './pages/LogOut';
import Profile from './pages/profile';
import SetPassword from './pages/SetPassword';
import ProtectedRoute from './utility/ProtectedRoute';
import TalentSourcingScreen from './modules/talentsourcingmodule/TalentSourcingScreen';
import { routesPath } from './routes/routesPath';
import BulkImportScreen from './modules/bulkimportmodule/BulkImportScreen';
import ApplicantProfileScreen from './modules/applicantprofilemodule/ApplicantProfileScreen';
import CandidateScreen from './modules/candidatemodule/CandidateScreen';
import ApplicantPipeLineScreen from './modules/applicantpipelinemodule/ApplicantPipeLineScreen';
import ZitaMatchCandidate from './modules/zitamatchcandidatemodule/ZitaMatchCandidate';
import JdViewScreen from './modules/jdviewmodule/JdViewScreen';
import MyDataBaseScreen from './modules/mydatabasemodule/MyDataBaseScreen';
import CreateJdScreen from './modules/createjdmodule/CreateJdScreen';
import CreateJdWithDs from './modules/createjdmodule/CreateJdWithDs';
import CalendarScreen from './modules/calendarModule/CalendarScreen';


import {
  accountSettingRoutes,
  applicantPipeLineScreen,
  applicantProfileView,
  candidateApplyProfileView,
  candidateChangePassWord,
  candidateProfileEdit,
  candidateProfileUpload,
  candidateProfileView,
  careerView,
  homeRoute,
  jdViewScreen,
  jobCreateDs,
  jobCreateDsEdit,
  jobCreateDsUpdate,
  jobCreateNonDs,
  jobCreateNonDsEdit,
  jobCreateNonDsUpdate,
  sourcingPerformance,
  jobPreview,
  jobPreviewView,
  jobQuestionnaire,
  jobSelect,
  loginAuth,
  reports,
  newPassword,
  orderSummaryRoute,
  recruiter,
  applicantSource,
  passivecandidate,
  jobMetrics,
  zitaMatchScreen,
  calendarRoute,
} from './appRoutesPath';
import CreateJdWithNonDs from './modules/createjdmodule/CreateJdWithNonDs';
import MyJobPostingScreen from './modules/myjobposting/MyJobPostingScreen';
import ApplicantQuestionnaire from './modules/createjdmodule/ApplicantQuestionnaire';
import JdPreviewScreen from './modules/createjdmodule/JdPreviewScreen';
import LoginScreen from './modules/Login/LoginScreen';
import SetPasswordScreen from './modules/Login/SetPasswordScreen';
import SignUpScreen from './modules/SignUp/SignUpScreen';
import AccountSettingsScreen from './modules/accountsettingsmodule/AccountSettingsScreen';
import CareerViewScreen from './modules/accountsettingsmodule/buildyourcareerpage/CareerViewScreen';
import JobView from './modules/accountsettingsmodule/buildyourcareerpage/JobView';
import CandidateProfileUpload from './modules/candidateprofile/CandidateProfileUpload';
import CandidateProfileScreen from './modules/candidateprofile/CandidateProfileScreen';
import CandidateDashBoardScreen from './modules/dashboardmodule/candidatedashboard/CandidateDashBoardScreen';
import ProtectedRouteCandidate from './utility/ProtectedRouteCandidate';
import CandidateProfileViewScreen from './modules/candidateprofile/CandidateProfileViewScreen';
import PasswordChangeScreen from './modules/dashboardmodule/candidatedashboard/passwordchange/PasswordChangeScreen';
import OrderSummaryScreen from './modules/ordersummarymodule/OrderSummaryScreen';
import Reports from './modules/reportsmodule/reports';
import ApplicantSource from './modules/reportsmodule/ApplicantSource';
import PassiveCandidateSourcing from './modules/reportsmodule/PassiveCandidateSourcing';
import JobMetrics from './modules/reportsmodule/JobMetrics';
import SourcingPerformance from './modules/reportsmodule/SourcingPerformance';
import CheckSignUpActivate from './modules/SignUp/CheckSignUpActivate';
import DashBoardScreen from './modules/dashboardmodule/empdashboard/DashBoardScreen';




axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

const App = () => {
  const { Permission } = useSelector(({ permissionReducers }) => {
    return {
      Permission: permissionReducers.Permission,
    };
  });
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        window.location.replace(`${window.location.origin + '/login'}`);
        localStorage.clear();
        sessionStorage.clear();
      }
      return error;
    },
  );


  // useEffect(() => {
  //   const query = parse(location.search);
  //   if (query && query.redirect) {
  //     history.push(`${query.redirect}`);
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('bulk_loader', 'false');
    localStorage.setItem('isImport', 'false');
  }, []);

  // Main Route
  const permissionRoutes = [
    {
      path: homeRoute,
      component: DashBoardScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: applicantProfileView,
      component: ApplicantProfileScreen,
      exact: true,
      noPermission: true,
      isNav: false,
    },
    {
      path: routesPath.MY_JOB_POSTING,
      component: MyJobPostingScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: candidateProfileView,
      component: CandidateScreen,
      exact: true,
      noPermission: true,
      isNav: false,
    },
    {
      path: accountSettingRoutes,
      component: AccountSettingsScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: applicantPipeLineScreen,
      component: ApplicantPipeLineScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: zitaMatchScreen,
      component: ZitaMatchCandidate,
      exact: true,
      noPermission: true,
      isNav: true,
    },

    {
      path: jdViewScreen,
      component: JdViewScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: routesPath.MY_JOB_POSTING,
      component: MyJobPostingScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: routesPath.TALENT_SOURCING,
      component: TalentSourcingScreen,
      exact: true,
      noPermission: Permission.includes('talent_sourcing'),
      isNav: true,
    },
    {
      path: routesPath.BULK_IMPORT,
      component: BulkImportScreen,
      exact: true,
      noPermission: Permission.includes('bulkImport_candidates'),
      isNav: true,
    },
    {
      path: reports,
      component: Reports,
      exact: true,
      noPermission: Permission.includes('reports'),
      isNav: true,
    },
    {
      path: sourcingPerformance,
      component: SourcingPerformance,
      exact: true,
      noPermission: Permission.includes('reports'),
      isNav: true,
    },
    {
      path: applicantSource,
      component: ApplicantSource,
      exact: true,
      noPermission: Permission.includes('reports'),
      isNav: true,
    },
    {
      path: jobMetrics,
      component: JobMetrics,
      exact: true,
      noPermission: Permission.includes('reports'),
      isNav: true,
    },
    {
      path: passivecandidate,
      component: PassiveCandidateSourcing,
      exact: true,
      noPermission: Permission.includes('reports'),
      isNav: true,
    },
    {
      path: routesPath.MYDATABASE,
      component: MyDataBaseScreen,
      exact: true,
      noPermission: Permission.includes('my_database'),
      isNav: true,
    },
    {
      path: jobSelect,
      component: CreateJdScreen,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateDs,
      component: CreateJdWithDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateDsUpdate,
      component: CreateJdWithDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateDsEdit,
      component: CreateJdWithDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateNonDs,
      component: CreateJdWithNonDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateNonDsUpdate,
      component: CreateJdWithNonDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobCreateNonDsEdit,
      component: CreateJdWithNonDs,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobQuestionnaire,
      component: ApplicantQuestionnaire,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: jobPreview,
      component: JdPreviewScreen,
      exact: true,
      noPermission: Permission.includes('create_post'),
      isNav: true,
    },
    {
      path: orderSummaryRoute,
      component: OrderSummaryScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
    {
      path: calendarRoute,
      component: CalendarScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },

    { path: '/logout', component: Logout, exact: true, noPermission: true },
  ];


  // Candidate Route

  const candidateRoutes = [
    {
      path: homeRoute,
      isNav: true,
      exact: true,
      component: CandidateDashBoardScreen,
    },
    {
      path: candidateProfileEdit,
      component: CandidateProfileScreen,
      exact: true,
      noPermission: true,
      isNav: false,
    },
    {
      path: candidateApplyProfileView,
      component: CandidateProfileViewScreen,
      exact: true,
      noPermission: true,
      isNav: false,
    },
    {
      path: candidateChangePassWord,
      component: PasswordChangeScreen,
      exact: true,
      noPermission: true,
      isNav: true,
    },
  ];

  return (
    <BrowserRouter basename={'/'}>
      <Switch>
        <Route path={loginAuth} component={LoginScreen} />
        <Route path={recruiter} component={SignUpScreen} />
        <Route path={newPassword} component={SetPasswordScreen} />
        <Route path={careerView} component={CareerViewScreen} />
        <Route path={jobPreviewView} component={JobView} />
        <Route
          path={candidateProfileUpload}
          component={CandidateProfileUpload}
        />
        <Route path="/set-password/:id" component={SetPassword} />
        <Route path="/profile" component={Profile} />
        <Route path={'/check_activate'} component={CheckSignUpActivate} />
        {/* <Route path={''} component={NotFound} /> */}
        {/* <Route path="/calendar" component={Calendar} /> */}

 {localStorage.getItem('loginUserCheck') === 'true' ||
          localStorage.getItem('loginUserCheck') === null
          ? permissionRoutes.map(
            (route) =>
              route.noPermission && (
                <ProtectedRoute
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                  notIsNav={route.isNav}
                />
              ),
          )
          : candidateRoutes.map((route) => (
            <ProtectedRouteCandidate
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
              notIsNav={route.isNav}
            />
          ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
