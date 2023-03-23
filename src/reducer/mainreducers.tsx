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
  bulkImportReducers,
  bulkUploadedCandidatesReducers,
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
import {
  userProfileReducers,

} from '../modules/accountsettingsmodule/userprofilemodule/store/reducer/userprofilereducer';
import {
  integrationReducers,
} from '../modules/accountsettingsmodule/integrationmodule/store/reducer/integrationreducer';
import {
  emailNotificationReducers,
} from '../modules/accountsettingsmodule/emailmodule/store/reducer/emailnotificationreducer';
import { companyPageReducers } from '../modules/accountsettingsmodule/store/reducer/accountsettingreducer';
import { candidateProfileEditReducers, techSkillReducers } from '../modules/candidateprofile/store/reducer/candidatereducer';
import { exampleReducers } from './exampleReducer';

export const reducers = {
  exampleReducers,
  talentSourcingReducers,
  integrationReducers,
  talentSourcingSearchReducers,
  talentUnlockCandidateReducers,
  bulkActionReducers,
  bulkDownloadActionReducers,
  candidateViewReducers,
  stripeReducers,
  emailNotificationReducers,
  bulkImportReducers,
  bulkUploadedCandidatesReducers,
  applicantProfileInitalReducers,
  applicantMatchReducers,
  applicantNotesReducers,
  applicantAllMatchReducers,
  applicantMessageReducers,
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
  applicantPipeLineUpdateReducers,
  myDataBaseInitalReducers,
  myDataBaseDataReducers,
  jdViewReducers,
  jdDownloadReducers,
  jdParserReducers,
  userProfileReducers,
  jdTemplatesReducers,
  createJdReducers,
  locationReducers,
  jdProfileReducers,
  createJdPostReducers,
  jdProfilePostReducers,
  questionnaireForJdReducers,
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
  techSkillReducers
};
