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
