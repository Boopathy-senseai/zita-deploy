export const sourcingApi = `zita_talent_sourcing_api`;
export const sessionIdApi = `zita_talent_sourcing_api`;
export const paymentSourcingApi = `zita_talent_sourcing_api`;
export const sourcingSearch = `zita_talent_sourcing_search_api`;
export const unlockCandidatesApi = `unlock_candidates_api`;
export const parsedSourcingApi = `parsed_text_sourcing_api`;
export const bulkActionSourcingApi = `bulk_action_sourcing_api`;
export const bulkDownloadActionApi = `bulk_action_sourcing_api`;
export const candidateViewApi = `candidate_view_api`;
export const stripeApi = '/config/';
export const createCheckoutApi = `create-checkout-session`;
export const bulkImportApi = 'bulk-import/';
export const uploadedCandidatesApi = 'uploaded_candidates/';
export const uploadedCandiDelete = (id: number) => {
  const url = `delete_candidate/${id}`;
  return url;
};
export const bulkUploadParsingApi = `bulk_upload_parsing/`;
export const bulkUploadProfileView = (id: number) => {
  const url = `candidate-profile-view/${id}`;
  return url;
};

// Applicant Profile View API
export const applicantProfileView = `applicants_profile_api`;
export const applicantMatchapi = `matching_analysis`;
export const applicantNotesApi = `candidate_notes`;
export const calenderEventApi = `calender_event`;
export const showAllMatch = `show_all_match`;
export const applicantMessagesApi = `messages`;
export const messagesDataApi = 'messages_data';
export const InterviewScorecardApi = 'interview_scorecard';
export const messagesTemplates = 'messages_templates';
export const applicantsStatusApi = `applicants_status`;
export const inviteToApplyApi = `invite_to_apply`;
export const favouriteApi = `favourite`;
export const candiDateMessageApi = `message_non_applicants`;

// applicant pipe line module
export const applicantPipeLineApi = (jd_id: string) => {
  const url = `applicants_pipline/${jd_id}`;
  return url;
};
export const applicantPipeLineDataApi = (jd_id: string) => {
  const url = `applicant_data/${jd_id}`;
  return url;
};
export const applicantFilterApi = (jd_id: string) => {
  const url = `applicant_data/${jd_id}`;
  return url;
};
export const applicantStatusUpdateApi = (jd_id: string) => {
  const url = `update_status/${jd_id}`;
  return url;
};
export const zitaMatchDataApi = `zita_match_data`;
export const zitaMatchApi = `zita_match`;
export const zitaMatchDownloadApi = `bulk_download`;
export const myDataBaseInitalApi = 'my_database';
export const myDataBaseDataApi = `my_database_data`;
export const jdViewApi = (jdId: string) => {
  const url = `jd_view/${jdId}`;
  return url;
};
export const inactiveJd = (jdId: string) => {
  const url = `inactive_jd/${jdId}`;
  return url;
};
export const downloadJd = `download_jd`;
export const syncGoogleApi = 'google_sync_api/';
export const syncOutlookApi = 'outlook_sync_api/';

// Create Jd
export const jdParserApi = `jd_parser`;
export const jdTemplatesApi = `jd_templates`;
export const createJdApi = 'create_jd';
export const locationApi = `load_location`;
export const jdProfileApi = (jdId: string) => {
  const url = `jd_profile/${jdId}`;
  return url;
};

export const missSkillsApi = (jdId?: string) => {
  const url = `missing_skills/${jdId}`;
  return url;
};

export const questionnaireForJdApi = (jdId: string) => {
  const url = `questionnaire_for_jd/${jdId}`;
  return url;
};
export const duplicateApi = (jdId: string) => {
  const url = `duplicate/${jdId}`;
  return url;
};
export const questionnaireSaveApi = (jdId: string) => {
  const url = `questionnaire_save/${jdId}`;
  return url;
};

export const jdPreviewApi = (jdId: string) => {
  const url = `jd_preview/${jdId}`;
  return url;
};

export const edit_jdApi = (jdId?: string) => {
  const url = `edit_jd/${jdId}`;
  return url;
};
export const postJdApi = (jdId?: string) => {
  const url = `post_jd/${jdId}`;
  return url;
};
export const dsOrNotApi = (jdId?: string) => {
  const url = `dst_or_not/${jdId}`;
  return url;
};
export const validateJobIdApi = `validate_job_id`;
export const myjobpostapi = `my_job_posting`;
export const myjobpostdataapi = `my_job_posting_data`;
export const questionnaireTemplateApi = `questionnaire_templates`;
export const selectDsorNonDsApi = `select_ds_or_non_ds`;

// Login Api
export const authApi = `${process.env.REACT_APP_API_ENDPOINT}login_api/`;
export const userApi = `users`;
export const passwordResetRequest = `${process.env.REACT_APP_API_ENDPOINT}password_reset_request/`;
export const emailValidRequest = (email: string) => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}password_reset_request/?email=${email}`;
  return url;
};
export const signupRecruiterApi = `${process.env.REACT_APP_API_ENDPOINT}signup_recruiter/`;
export const signupRecruiterGetApi = (username: string) => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}signup_recruiter/?username=${username}`;
  return url;
};
export const emailActiveApi = (userId: string, confirmationToken: string) => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}email_activate/?userid=${userId}&confirmation_token=${confirmationToken}`;
  return url;
};
export const passwordSetRequest = `${process.env.REACT_APP_API_ENDPOINT}password_set_request/`;

// permission APi
export const permissionApi = 'permission';

export const companyPageApi = `company_details`;
export const userProfileApi = `user_profile`;
export const intergrationApi = `intergration`;
export const googleSyncApi = `google_cal_api`;
export const calbackurlGoogleApi = `google_sync_api`;
export const outlookSyncApi = `outlook_cal_api`;
export const calbackurlApi = `calback_url`;
export const passwordChangeApi = `password_change`;
export const buildCareerPageApi = 'build_career_page';
export const emailPreferenceApi = 'email_preference';
export const careerViewPageApi = (pageUrl: string) => {
  const url = `career_page/${pageUrl}`;
  return url;
};
export const careerJobViewApi = (id: string) => {
  const url = `${process.env.REACT_APP_API_ENDPOINT}career_job_view/${id}`;
  return url;
};
export const uploadResumeApi = `${process.env.REACT_APP_API_ENDPOINT}upload_resume/`;
export const basicDetailApi = 'basic_detail/';
export const emailValidationApi = `email_validation`;
export const otpVerificationApi = `otp_verification`;
export const profileEditApi = 'profile_edit';
export const updatePersonalInfoApi = 'update_personal_info/';
export const updateJobPreferenceApi = 'update_job_preference/';
export const skillsUpdateApi = (empId: number) => {
  const url = `skills_update/${empId}/`;
  return url;
};
export const techSkillApi = `skills/`;
export const educationUpdateApi = (id: string) => {
  const url = `education_update/${id}/`;
  return url;
};
