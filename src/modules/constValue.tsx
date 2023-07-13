/* eslint-disable max-len */
export const ERROR_MESSAGE = 'Request failed. Please try again later.';

export const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export const CANCEL = 'Cancel';
export const DELETE = 'Delete';
export const YES = 'Yes';
export const SAVE = 'Save';
export const BACK = 'Back';
export const MAX_DISPLAYED_OPTIONS = 500;
export const dndBoardId = 'abcedef';

export const manageUser = () => {
  sessionStorage.setItem('superUserTab', '2');
  return window.location.replace(
    window.location.origin + '/account_setting/settings',
  );
};

export const ALL_APPLICANT_MATCH_TITLE = 'All Matching Jobs for the Applicant:';
export const ALL_CANDI_MATCH_TITLE = 'All  Matching Jobs for the Candidate:';
export const SCREEN_APPLICANT_STATUS_TITLE =
  'Screening Status of the Applicant';
export const SCREEN_CANDIDATE_STATUS_TITLE =
  'Invitation Status of the Candidate';
export const ADD_FAV = 'Add to Favourites';
export const REMOVE_FAV = 'Remove from Favourites';

export const colorCode = [
  '#bb8fce',
  '#abebc6',
  'rgba(250, 176, 61, 0.8)',
  'rgba(89, 201, 94, 0.8)',
  'rgba(61, 119, 64, 0.55)',
  'rgba(53, 76, 121, 0.6)',
  'rgba(229, 120, 85, 0.8)',
  'rgba(234, 106, 160, 0.8)',
  'rgba(24, 173, 240, 0.6)',
  'rgba(255, 194, 3, 0.6)',
];

export const centerView = window.innerWidth > 1400;

export const THIS_FIELD_REQUIRED = 'This field is required';
export const ENTER_GREATER_10 = 'Enter value greater than or equal to 10.';
export const ENTER_LESS_1000 = 'Enter value less than or equal to 1000.';
export const ENTER_GREATER_1000 = 'Enter value greater than or equal to 1000.';
export const ENTER_LESS_9000000 = 'Enter value less than or equal to 9000000.';
export const ENTER_GREATER_0 = 'Enter value greater than or equal to 0.';
export const ENTER_VACANCIES = 'Please enter a value less than or equal to 15';
export const ENTER_VACANCIES_0 = 'Enter a value greater than 0 to less than 15';
export const ENTER_JD_ID = 'This job id already exist';
export const MIN_MAX_EXP = 'Enter value greater than Minimun Experience.';
export const JOB_TITLE_LIMIT = 'Text length should not exceed 50 characters.';
export const GREATER_THAN_MIN = 'Value should be greater than min salary';
export const LESS_THAN_MAX = 'Value should be less than max salary';
export const PLEASE_ENTER_VALID_MAIL = 'Please enter a valid email address.';
export const MAX_TEXT_LENGTH_20 =
  'Text length should not exceed 20 characters.';

export const PASSWORD_MATCH = `The two password fields didn't match.`;
export const ENTER_VALID_URL = 'Please enter a valid URL';
export const JOB_TITLE_LIMIT_20 =
  'Text length should not exceed 20 characters.';
export const FILE_2MB = 'Please choose a file size less than 2MB';

export const checkUpperCase = /^(?=.*[A-Z])/;
export const specialCharacter = /^(?=.*[@$!%*?&])/;
export const domainValidation =
  /^([\w-.]+@(?!gmail\.com)(?!yahoo\.com)(?!hotmail\.com)(?!outlook\.com)(?!protonmail\.com)(?!live\.com)(?!mail\.com)(?!email\.com)(?!inbox\.com)([\w-]+.)+[\w-]{1,4})?$/;
export const nameRegex = /^[a-zA-Z0-9]{4,16}$/;
export const namespace=/^\s+/;
export const fileAccept = ['.doc', '.docx', '.pdf', '.txt'];
export const imageFileAccept = [
  '.jpg',
  '.jpeg',
  '.png',
  '.JPG',
  '.JPGE',
  '.PNG',
];
export const isValidURL = (string: string) => {
  var res = string.match(
    /(http[s]?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
};
// /^(http[s]?:\/\/(www\.)?|ftp:\/\/(www\.)?|www\.){1}([0-9A-Za-z-\.@:%_\+~#=]+)+((\.[a-zA-Z]{2,3})+)(\/(.)*)?(\?(.)*)?/g
export const usernameNumberCase = /^\d/;
export const letters = /^[A-Za-z]+$/;
export const onlyNumber = /^[0-9\b]+$/;
export const mentionnotes = /^[:;,\-@0-9a-zA-Zâéè'.\s]{1,2000}$/;
export const mentionspecialcharacter=/^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/;
export const zipCodeRegx = /^[A-Za-z0-9\-]+$/;
export const space = /^\S*$/;
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const isValidLinkedinUrl = (url: string) => {
  return /((https:\/\/)((www|\w\w)\.)?linkedin\.com\/)((([\w]{2,3})?)|([^\/]+\/(([\w|\d-&#?=])+\/?){1,}))$/gm.test(
    url,
  );
};

export const numberAndSpaceCheck = /^[0-9\-\ ]+$/;

export const manageLocation = () => {
  sessionStorage.setItem('superUserTab', '2');
  return window.location.replace(
    window.location.origin + '/account_setting/settings',
  );
};

export const mediaPath = `${process.env.REACT_APP_HOME_URL}media/`;

export const zitaPath = () => {
  return window.location.replace('https://www.zita.ai/');
};

export const LEAVE_THIS_SITE = `Do you want to leave this site? Changes you made may not be saved.'`;
