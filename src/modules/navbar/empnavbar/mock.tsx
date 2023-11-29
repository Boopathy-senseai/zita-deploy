import { jobSelect, reports,homeRoute } from '../../../appRoutesPath';
import { routesPath } from '../../../routes/routesPath';

export const searchData = [
  { value: routesPath.MY_JOB_POSTING, label: 'My Job Postings' },
  { value: '/account_setting/settings', label: 'Manage Users' },
  { value: '/account_setting/settings', label: 'User Profile' },
  { value: '/account_setting/settings', label: 'Profile Update' },
  { value: '/account_setting/settings', label: 'Password Change' },
  { value: '/account_setting/settings', label: 'Calendar Integrations' },
  { value: '/account_setting/settings', label: 'Build Your Careers Page' },
  { value: '/account_setting/settings', label: 'Company Profile' },
  { value: '/account_setting/settings', label: 'Manage Subscription' },
  { value: '/account_setting/settings', label: 'Billing' },
  { value: '/account_setting/settings', label: 'Contact Credits' },
  { value: '/account_setting/settings', label: 'Pricing' },
  { value: '/account_setting/settings', label: 'Plans' },
  { value: routesPath.MYDATABASE, label: 'My Database' },
  { value: routesPath.MYDATABASE, label: 'Candidates' },
  { value: routesPath.MYDATABASE, label: 'Invite Candidates' },
  { value: routesPath.MYDATABASE, label: 'Support' },
  { value: routesPath.MYDATABASE, label: 'Help' },
  { value: jobSelect, label: 'Post Jobs' },
  { value: reports, label: 'Reports' },
  { value: homeRoute, label: 'Dashboard' },
  { value: routesPath.BULK_IMPORT, label: 'Bulk Import' },
  { value: routesPath.MYDATABASE, label: 'Import Candidate' },
];

export const searchOptions = [
  'Dashboard',
  'Job Postings',
  'User Profile',
  'Profile Update',
  'Password Change',
  'Calendar Integrations',
  // 'Build Your Careers Page',
  // 'Company Profile',
  'Support',
  'Help',
  'Meeting Scheduler'
];


export const freeData = [
  { value: "<div><strong>1 Active Job</strong> Per Account.</div>", },
  { value: "<div><strong>AI Resume Parsing</strong> Up to <strong>10</strong> per month.</div>" },
  { value: "<div><strong>AI Matching and Descriptive Analysis</strong> Up to <strong>10</strong> per month.</div>" },
  { value: "<div><strong>All Other features</strong> available in Premium.</div>" },
  { value: "<div><strong>Sourcing contact</strong> unlock credit <strong>2</strong> for the free trail.</div>" },
];
 
export const standard = [
  { value: "<div><strong>Job Postings</strong> Up to <strong>20</strong> per month</div>" ,include:['jop posting']},
  { value: "<div><strong>AI Resume Parsing</strong> Up to <strong>200</strong> per month</div>",include:['jop posting'] },
  { value: "<div><strong>Advanced AI Matching</strong> and Filtering</div>" },
  { value: "<div>Import Applicants & Passive Candidates</div>" },
  { value: "<div><strong>7M+</strong> resume Database</div>" },
  { value: "<div><strong>Interview and Assessment Tools</strong></div>" },
  { value: "<div>Access to Advanced reporting tools</div>" },
  { value: "<div>Additional <strong>Add-Ons</strong></div>" },
];
 
export const premium = [
  { value: "<div><strong>Job Postings</strong> Up to <strong>60</strong> per month</div>" },
  { value: "<div><strong>AI Resume Parsing</strong> Up to <strong>600</strong> per month</div>" },
  { value: "<div><strong>Advanced AI Matching</strong> and Filtering</div>" },
  { value: "<div>Import Applicants & Passive Candidates</div>" },
  { value: "<div><strong>7M+</strong> resume Database</div>" },
  { value: "<div><strong>Interview and Assessment Tools</strong></div>" },
  { value: "<div>Access to<strong> Advanced reporting tools</strong></div>" },
  { value: "<div>Additional <strong>Add-Ons</strong></div>" },
];
 
export const enterprise = [
  { value: "<div><strong>Job Postings</strong> Up to <strong>120</strong> per month</div>" },
  { value: "<div><strong>AI Resume Parsing</strong> Up to <strong>1200</strong> per month</div>" },
  { value: "<div><strong>Advanced AI Matching</strong> and Filtering</div>" },
  { value: "<div>Import Applicants & Passive Candidates</div>" },
  { value: "<div><strong>7M+</strong> resume Database</div>" },
  { value: "<div><strong>Interview and Assessment Tools</strong></div>" },
  { value: "<div>Access to <strong>Advanced reporting tools</strong></div>" },
  { value: "<div>Additional <strong>Add-Ons</strong></div>" },
  { value: "<div>Application <strong>Customization</strong></div>" },
];