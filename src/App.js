import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import NotFound from './pages/NotFound';
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
import {
  accountSettingRoutes,
  applicantPipeLineScreen,
  applicantProfileView,
  candidateProfileEdit,
  candidateProfileUpload,
  candidateProfileView,
  careerView,
  jdViewScreen,
  jobCreateDs,
  jobCreateDsEdit,
  jobCreateDsUpdate,
  jobCreateNonDs,
  jobCreateNonDsEdit,
  jobCreateNonDsUpdate,
  jobPreview,
  jobPreviewView,
  jobQuestionnaire,
  jobSelect,
  loginAuth,
  newPassword,
  recruiter,
  zitaMatchScreen,
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
import DashBoardScreen from './modules/dashboardmodule/DashBoardScreen';
import JobView from './modules/accountsettingsmodule/buildyourcareerpage/JobView';
import CandidateProfileUpload from './modules/candidateprofile/CandidateProfileUpload';
import CandidateProfileScreen from './modules/candidateprofile/CandidateProfileScreen';

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
        // localStorage.clear();
        // window.location.reload();
        window.location.replace('/login')
      } else if(error.response.status === 404){
        // window.location.replace('/login')
      }
      return error;
    },
  );

  useEffect(() => {
    localStorage.setItem('bulk_loader', 'false');
    localStorage.setItem('isImport', 'false');
  }, []);

  const permissionRoutes = [
    {
      path: '/',
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
    // {
    //   path: candidateProfileUpload,
    //   component: CandidateProfileUpload,
    //   exact: true,
    //   noPermission: true,
    //   isNav: false,
    // },
    {
      path: candidateProfileEdit,
      component: CandidateProfileScreen,
      exact: true,
      noPermission: true,
      isNav: false,
    },
    { path: '/logout', component: Logout, exact: true, noPermission: true },
  ];
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_FOLDER}>
      <Switch>
        <Route path={loginAuth} component={LoginScreen} />
        <Route path={recruiter} component={SignUpScreen} />
        <Route path={newPassword} component={SetPasswordScreen} />
        <Route path={careerView} component={CareerViewScreen} />
        <Route path={jobPreviewView} component={JobView} />
        <Route path={candidateProfileUpload} component={CandidateProfileUpload} />
        <Route path="/set-password/:id" component={SetPassword} />
        <Route path="/profile" component={Profile} />
        {/* <Route path={''} component={NotFound} /> */}
        {permissionRoutes.map(
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
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
