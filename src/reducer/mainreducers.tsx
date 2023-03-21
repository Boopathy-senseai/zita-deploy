import {
  applicantPipeLineDataReducers,
  applicantPipeLineReducers,
  applicantPipeLineUpdateReducers,
} from '../modules/applicantpipelinemodule/store/reducer/applicantpipelinereducer';
import {
  applicantAllMatchReducers,
  applicantFavReducers,
  applicantMatchReducers,
  applicantMessageReducers,
  applicantNotesReducers,
  applicantProfileInitalReducers,
  applicantScoreReducers,
  applicantStausReducers,
  calenderReducers,
  messageTemplateReducers,
} from '../modules/applicantprofilemodule/store/reducer/applicantProfileReducer';
import {
  bulkImportReducers,uploadedProfileViewReducers,bulkImportQusGetReducers,
  bulkUploadedCandidatesReducers,bulkUploadTechSkillReducers,
} from '../modules/bulkimportmodule/store/reducer/bulkImportReducer';
import { candidateMessageReducers } from '../modules/candidatemodule/store/reducer/candidateReducer';
import {
  createJdPostReducers,
  createJdReducers,
  cretejdTemplateReducers,
  dsOrNonDsGetReducers,
  duplicateReducers,
  jdParserReducers,
  jdPreviewReducers,
  jdProfilePostReducers,
  jdProfileReducers,
  jdTemplatesReducers,
  locationReducers,
  postReducers,
  questionnaireForJdReducers,
  selectDsorNonDsReducers,
  validateJobIDReducers,
} from '../modules/createjdmodule/store/reducer/createjdreducer';
import {
  jdViewReducers,
  jdDownloadReducers,
} from '../modules/jdviewmodule/store/reducer/jdviewreducer';
import {
  myDataBaseDataReducers,
  myDataBaseInitalReducers,
} from '../modules/mydatabasemodule/store/reducer/mydatabasereducer';

import {

  applicantsSourceReducers,
  applicantsSourceDataReducers,
  passiveCandidateDataReducers,
  jobMetricsDataReducers,
  jobMetricsChartReducers,
  sourcingPerformanceReducers,
sourcingPerformanceDataReducers


} from '../modules/reportsmodule/store/reducer/reportsreducer';
import {
  myJobPosingReducers,
  myJobPostingDataReducers,
} from '../modules/myjobposting/store/reducer/myjobpostingreducer';
import {
  bulkActionReducers,
  bulkDownloadActionReducers,
  candidateViewReducers,
  stripeReducers,
  talentSourcingReducers,
  talentSourcingSearchReducers,
  talentUnlockCandidateReducers,
} from '../modules/talentsourcingmodule/store/reducers/talentSourcingReducer';
import {
  zitaMatchCandidateReducers,
  zitaMatchDataCandidateReducers,
} from '../modules/zitamatchcandidatemodule/store/reducer/zitamatchcandidatereducer';
import {
  loginReducers,
  emailActiveReducers,
  setPasswordReducers,
  permissionReducers,
} from '../modules/Login/store/reducer/loginReducer';
import {
  buildCareerPageReducers,
  careerViewPageReducers,
  jobViewReducers,
} from '../modules/accountsettingsmodule/buildyourcareerpage/store/reducer/buildcareerpagereducer';
import { userProfileReducers } from '../modules/accountsettingsmodule/userprofilemodule/store/reducer/userprofilereducer';
import { emailNotificationReducers } from '../modules/accountsettingsmodule/emailmodule/store/reducer/emailnotificationreducer';
import { companyPageReducers } from '../modules/accountsettingsmodule/store/reducer/accountsettingreducer';
import {
  candidateProfileEditReducers,
  techSkillReducers,
} from '../modules/candidateprofile/store/reducer/candidatereducer';
import { navBarReducers } from '../modules/navbar/store/reducer/navbarreducer';
import { orderSummaryReducers } from '../modules/ordersummarymodule/store/ordersummaryreducer';
import {
  dashboardCalenderStateReducers,
  dashboardEmpMessageReducers,
  dashboardEmpReducers,
  dashboardJobMetricsReducers,
} from '../modules/dashboardmodule/empdashboard/store/dashboardreducer';
import { manageSubscriptionReducers } from '../modules/accountsettingsmodule/managesubscription/store/managesubscriptionreducer';
import { integrationReducers } from '../modules/accountsettingsmodule/integrationmodule/store/reducer/integrationreducer';
import { dashboardReducers } from '../modules/dashboardmodule/candidatedashboard/store/reducer/candidatedashboardreducer';
import { notificationReducers } from '../modules/navbar/empnavbar/store/notificationreducer';

export const reducers = {
  talentSourcingReducers,
  talentSourcingSearchReducers,
  talentUnlockCandidateReducers,
  bulkActionReducers,
  bulkDownloadActionReducers,
  candidateViewReducers,
  bulkUploadTechSkillReducers,
  stripeReducers,
  jobMetricsDataReducers,
  jobMetricsChartReducers,
  emailNotificationReducers,
  bulkImportReducers,
  bulkUploadedCandidatesReducers,
  applicantProfileInitalReducers,
  applicantMatchReducers,
  applicantNotesReducers,
  applicantAllMatchReducers,
  applicantMessageReducers,
  applicantsSourceDataReducers,
  applicantScoreReducers,
  messageTemplateReducers,
  calenderReducers,
  applicantStausReducers,
  candidateMessageReducers,
  applicantPipeLineReducers,
  applicantPipeLineDataReducers,
  applicantFavReducers,
  zitaMatchDataCandidateReducers,
  zitaMatchCandidateReducers,
  bulkImportQusGetReducers,
  applicantPipeLineUpdateReducers,
  myDataBaseInitalReducers,
  myDataBaseDataReducers,
  jdViewReducers,
  jdDownloadReducers,
  jdParserReducers,
  applicantsSourceReducers,
  userProfileReducers,
  jdTemplatesReducers,
  createJdReducers,
  locationReducers,
  jdProfileReducers,
  createJdPostReducers,
  jdProfilePostReducers,
  questionnaireForJdReducers,
  uploadedProfileViewReducers,
  myJobPosingReducers,
  myJobPostingDataReducers,
  cretejdTemplateReducers,
  duplicateReducers,
  jdPreviewReducers,
  validateJobIDReducers,
  dsOrNonDsGetReducers,
  postReducers,
  loginReducers,
  emailActiveReducers,
  setPasswordReducers,
  companyPageReducers,
  selectDsorNonDsReducers,
  permissionReducers,
  buildCareerPageReducers,
  careerViewPageReducers,
  jobViewReducers,
  candidateProfileEditReducers,
  techSkillReducers,
  dashboardReducers,
  navBarReducers,
  integrationReducers,
  manageSubscriptionReducers,
  passiveCandidateDataReducers,
  orderSummaryReducers,
  dashboardEmpReducers,
  dashboardEmpMessageReducers,
  dashboardJobMetricsReducers,
  dashboardCalenderStateReducers,
  notificationReducers,
  sourcingPerformanceReducers,
  sourcingPerformanceDataReducers,
};