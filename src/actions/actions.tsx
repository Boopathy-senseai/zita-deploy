// Api auth
export const API_AUTH_login = 'auth/auth_login';
export const PASSWORD_RESET = 'auth/password_reset_request';
export const PASSWORD_RESET_VALID = 'auth/password_reset_request_valid';
export const SIGNUP_RECRUITER = 'auth/signup_recruiter';
export const PASSWORD_SET = 'auth/password_set_request';
export const API_USER = 'user/user';
export const PERMISSION = 'user/permission';

export const LIST = ' example/list';
export const TALENT_SOUCRCING = 'talent/talent_sourcing';
export const TALENT_SOUCRCING_SEARCH = 'talent/talent_sourcing_search';
export const TALENT_UNLOCK_CANDIDATE = 'talent/talent_unlock_candidate';
export const TALENT_BULK_ACTION_UNLOCK = 'talent/talent_bulk_action_unlock';
export const TALENT_BULK_ACTION_DOWNLOAD = 'talent/talent_bulk_action_download';
export const TALEN_PARSED_TEXT_UNLOCK = 'talent/talent_parsed_text_unlock';
export const TALEN_CANDIDATE_VIEW = 'talent/talent_candidate_view';
export const STRIPE_ACTION = 'talent/stripe_action';
export const CHECKOUT_ACTION = 'talent/checkout_action';

// bulkimport action

export const BULK_IMPORT_INITIAL = 'bulk/bulk_import';
export const BULK_UPLOADED_CANDIDATES = 'bulk/bulk_uploaded_candidates';
export const BULK_UPLOADED_SEARCH = 'bulk/bulk_uploaded_search';
export const BULK_UPLOADED_TOTAL = 'bulk/bulk_uploaded_total';
export const BULK_UPLOADED_COMPLETED = 'bulk/bulk_uploaded_completed';
export const BULK_UPLOADED_IN_COMPLETED = 'bulk/bulk_uploaded_in_completed';
export const BULK_UPLOADED_PAGINATION = 'bulk/bulk_uploaded_pagination';
export const BULK_UPLOADED_DELETE = 'bulk/bulk_uploaded_delete';
export const BULK_UPLOADED_PARSING = 'bulk/bulk_uploaded_parsing';
export const BULK_UPLOADED_PROFILE_VIEW = 'bulk/bulk_uploaded_profile_view';
export const BULK_UPLOADED_SKILLS = 'bulk/skills_bulk';
export const BULK_UPLOADED_UPDATE_SKILLS = 'bulk/skills_update_bulk';
export const BULK_UPLOADED_EDU = 'bulk/education_bulk';
export const BULK_UPLOADED_EXP = 'bulk/experiences_bulk';
export const BULK_UPLOADED_EXP_UPDATE = 'bulk/experience_update_bulk/';
export const BULK_UPLOADED_UPDATE_PERSONAL = 'bulk/update_personal_info_bulk';
export const BULK_UPLOADED_MATCH = 'bulk/matching_api';
export const BULK_UPLOADED_QUS = 'bulk/questionnaire_bulk';

// applicant profile view action
export const APPLICANT_PROFILE_INITIAL = 'applicant/applicant_profile_initial';
export const APPLICANT_PROFILE_MATCH = 'applicant/applicant_profile_match';
export const APPLICANT_PROFILE_NOTES = 'applicant/applicant_profile_notes';
export const APPLICANT_PROFILE_ALLMATCH =
  'applicant/applicant_profile_all_match';
export const APPLICANT_PROFILE_MESSAGE = 'applicant/applicant_message';
export const APPLICANT_PROFILE_INTERVIEW_SCORECARD =
  'applicant/applicant_interview_scorecard';
export const APPLICANT_PROFILE_MESSAGE_TEM = 'applicant/applicant_message_tem';
export const APPLICANT_PROFILE_CALENDER = 'applicant/applicant_calender';
export const APPLICANT_PROFILE_STATUS = 'applicant/applicant_status';
export const APPLICANT_PROFILE_FAVORITE = 'applicant/applicant_favourite';
export const SYNC_GOOGLE = 'applicant/sync_google';
export const SYNC_OUTLOOK = 'applicant/sync_outlook';

// Candidate Profile Action
export const CANDIDATE_PROFILE_MESSAGE = 'candidate/candidate_profile_message';

// Applicant Pipe Line
export const APPLICANT_PIPE_LINE = 'applicantpipe/applicant_pipe_line';
export const APPLICANT_PIPE_LINE_DATA =
  'applicantpipe/applicant_pipe_line_data';
export const APPLICANT_PIPE_LINE_FILTER =
  'applicantpipe/applicant_pipe_line_filter';
export const APPLICANT_UPDATE_STATUS = 'applicantpipe/applicant_update_status';

// Zita Match Candidate
export const ZITA_MATCH_CANDIDATE = 'zita/zita_match_candidate';
export const ZITA_MATCH_DATA_CANDIDATE = 'zita/zita_match_data_candidate';

// My DataBase
export const MY_DATABASE_INITIAL = 'mydatabase/mydatabase_inital';
export const MY_DATABASE_DATA = 'mydatabase/mydatabase_data';

// Jd View
export const JD_VIEW = 'jdview/jd_view';
export const JD_VIEW_DOWNLOAD = 'jdview/jd_view_download';
export const JD_VIEW_INACTIVE = 'jdview/inactive_jd';

// Create Jd
export const JD_PARSER = 'createjd/jd_parser';
export const JD_TEMPLATES = 'createjd/jd_templates';
export const JD_CREATE = 'createjd/create_jd';
export const JD_LOCATION = 'createjd/location';
export const JD_PROFILE = 'createjd/jd_profile';
export const JD_QUESTIONNAIRE = 'createjd/jd_questionnaire_for_jd';
export const JD_TEMPLATE = 'createjd/jd_template';
export const JD_DUPLICATE = 'createjd/jd_duplicate';

// my_job_posting

export const MYJOBPOSTING = 'myjobposting/my_job_posting';
export const MYJOBPOSTINGDATA = 'myjobposting/my_job_posting_data';

export const APPLICANTSSOURCE = 'reports/applicant_source_api';
export const APPLICANTSSOURCEDATA = 'reports/applicant_source_data';
export const APPLICANTSSOURCEDOWNLOAD = 'reports/applicant_source_download';
export const PASSIVECANDIDATEDATA = 'reports/passive_candidate_data';
export const JOBMETRICSDATA = 'reports/job_metrics_api';
export const JOBMETRICSDOWNLOAD = 'reports/job_metrics_download';
export const SOURCINGPERFORMANCE = 'reports/sourcing_performance';
export const JOBMETRICSCHARTDATA = 'reports/job_metrics_chart';
export const SOURCINGPERFORMANCEDATA = 'reports/sourcing_performance_data';
export const SOURCINGPERFORMANCEDOWNLOAD = 'reports/sourcing_performance_download';


// account settings page
export const COMPANYPAGE = 'companypage/companypage';
export const USERPROFILE = 'userprofile/user_profile';
export const INTEGRATION = 'intergration/intergration';
export const GOOGLE_SYNC= 'google_sync_api/google_sync_api';
export const  OUTLOOK_SYNC= 'outlook_sync_api/outlook_sync_api';
export const  EMAILNOTIFI = 'email_preference/email_preference';
export const  CALBACK_URL= 'calback_url/calback_url';
export const  CALBACK_GOOGLE_URL= 'google_sync_api/google_sync_api';
export const PASSWORD = 'passwordchange/password_change';
export const ACCOUNT_SETTING_BUILD_CAREER = 'account/account_build_career';
export const ACCOUNT_SETTING_BUILD_CAREER_POST =
  'account/account_build_career_post';
export const ACCOUNT_SETTING_CAREER_VIEW = 'account/account_career_view';
export const RESUME_UPLOAD = 'candidate/candidate_resume_upload';
export const CANDIDATE_PROFILE_BASIC_DETAILS =
  'candidate/candidate_profile_basic_details';
export const CANDIDATE_PROFILE_EMAIL_VALIDATE =
  'candidate/candidate_profile_email_validate';
export const CANDIDATE_PROFILE_OTP_VALIDATE =
  'candidate/candidate_profile_otp_validate';


// [Account Settings] --> Templates
export const PIPELINE_DATA = 'account/pipeline_data';
export const UPDATE_PIPELINE_DATA = 'account/pipeline_data_update';
export const DELETE_PIPELINE_DATA = 'account/pipeline_data_delete';
export const DEFAULT_PIPELINE_DATA = 'account/pipeline_data_default';
export const PIPELINE_STAGES = 'account/pipeline_stages';
export const ADD_PIPELINE_STAGE = 'account/pipeline_stage_add';
export const DELETE_PIPELINE_STAGE = 'account/pipeline_stage_delete';
export const UPDATE_PIPELINE_STAGE = 'account/pipeline_stage_update'
export const UPDATE_COLOUR_PALLATE = 'account/colour_pallate_update'
export const PIPELINE_SUGGESTIONS = 'account/pipeline_suggestions';
export const PIPELINE_STAGES_REORDER = 'account/pipeline_stages_reorder';
