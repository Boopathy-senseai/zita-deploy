import { routesPath } from './routes/routesPath';

// Auth
export const loginAuth = `/login`;
export const newPassword = `/new_password/:userId/:confirmationToken`;
export const recruiter = `/recruiter/:planId`;
export const home = `https://www.zita.ai/`;

// My Job Posting
export const jobSelect = `${routesPath.JOBS}/select`;
export const jobCreateDs = `${routesPath.JOBS}/create_ds`;
export const jobCreateDsUpdate = `${routesPath.JOBS}/create_ds/:jdId`;
export const jobCreateDsEdit = `${routesPath.JOBS}/create_ds_edit/:editJdId`;
export const jobCreateNonDs = `${routesPath.JOBS}/create_non_ds`;
export const jobCreateNonDsUpdate = `${routesPath.JOBS}/create_non_ds/:jdId`;
export const jobCreateNonDsEdit = `${routesPath.JOBS}/create_non_ds_edit/:editJdId`;
export const jobQuestionnaire = `${routesPath.JOBS}/questionnaire/:jd_id`;
export const jobPreview = `${routesPath.JOBS}/preview/:jdId`;

// profile view
export const applicantProfileView = '/applicant_profile_view/:jdId/:candiId';
export const zitaMatchScreen = '/zita_match_candidate/:jdId';
export const candidateProfileView = '/candidate_profile_view/:jdId/:candiId';
export const applicantPipeLineScreen = '/applicant_pipe_line/:jdId';
export const jdViewScreen = '/job_view/:jdId';

// account setting
export const accountSettingRoutes = `/account_setting/:itemId`;
export const careerView = '/:pageUrl/careers';
export const jobPreviewView = `/:companyName/career_job_view/:empId/:jobTitle`;
export const candidateProfileUpload = `/candidate_profile_upload/:empId`;
export const candidateProfileEdit = `/candidate_profile_edit/:empId`;
