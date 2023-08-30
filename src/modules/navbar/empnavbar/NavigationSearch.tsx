import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { jobSelect, reports, homeRoute } from '../../../appRoutesPath';
import SvgSearch from '../../../icons/SvgSearch';
import { routesPath } from '../../../routes/routesPath';
import { RootState } from '../../../store';
import { WHITE } from '../../../uikit/Colors/colors';
import InputSearch from '../../../uikit/InputSearch/InputSearch';
import InputSearchnav from '../../../uikit/InputSearch/inputsearchnav';
import { searchOptions } from './mock';
import styles from './navbar.module.css';

type Props = {
  onButtonClick: () => void;
  onbuttonchange: () => void;
};
const NavigationSearch = ({ onButtonClick, onbuttonchange }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: { value: '' },
    onSubmit: () => {},
  });
  const { permission, super_user, plan_id } = useSelector(
    ({ permissionReducers }: RootState) => {
      return {
        permission: permissionReducers.Permission,
        super_user: permissionReducers.super_user,
        plan_id: permissionReducers.plan_id,
      };
    },
  );

  // search redirection condition
  const searchNavigate = (value: string) => {
    switch (value.toLocaleLowerCase()) {
      case ' my job postings':
        return history.push(routesPath.MY_JOB_POSTING);
      case 'job postings':
        return history.push(routesPath.MY_JOB_POSTING);

      case 'zita match':
        return history.push(routesPath.MY_JOB_POSTING);
      case 'applicants pipeline':
        return history.push(routesPath.MY_JOB_POSTING);
      case 'dashboard':
        return history.push(homeRoute);
      case 'manage users':
        return (
          sessionStorage.setItem('superUserTab', '3'),
          history.push('/account_setting/settings?tab=3')
        );
      case 'user profile':
        return (
          super_user === true &&
            history.push('/account_setting/settings?tab=0'),
          permission.includes('manage_account_settings')
        );
      case 'password change':
        onButtonClick();
        break;
      // return (
      //   super_user === true &&
      //   history.push('/account_setting/settings?tab=6'),
      //   permission.includes('manage_account_settings')

      //   &&
      //   super_user === false &&
      //   history.push('/account_setting/settings?tab=4'),
      //   !permission.includes('manage_account_settings') &&
      //   super_user === false &&
      //   history.push('/account_setting/settings?tab=1')
      // );

      case 'profile update':
        history.push('/account_setting/settings?tab=0');
        break;
      // return (
      //   super_user === true &&
      //   history.push('/account_setting/settings?tab=0'),
      //   permission.includes('manage_account_settings') &&
      //   super_user === false &&
      //   history.push('/account_setting/settings?tab=4'),
      //   !permission.includes('manage_account_settings') &&
      //   super_user === false &&
      //   history.push('/account_setting/settings?tab=1')
      // );

      case 'calendar':
        return history.push('/calendar');

      case 'calendar integrations':
        return (
          super_user === true &&
            history.push('/account_setting/settings?tab=4'),
          permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=3'),
          !permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=0')
        );
      case 'integrations':
        return history.push('/account_setting/settings?tab=4');
      case 'email':
        return history.push('/mail')
      case 'meeting scheduler':
        return history.push('/meeting_scheduler')
      case 'inbox':
        return history.push('/mail')
      case 'email integration':
        return (
          super_user === true &&
            history.push('/account_setting/settings?tab=4'),
          permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=3'),
          !permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=0')
        );
      case 'mail integration':
        return (
          super_user === true &&
            history.push('/account_setting/settings?tab=4'),
          permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=3'),
          !permission.includes('manage_account_settings') &&
            super_user === false &&
            history.push('/account_setting/settings?tab=0')
        );

      case 'build your careers page':
        return history.push('/account_setting/settings?tab=1');
      case 'careers page':
        return history.push('/account_setting/settings?tab=1');
      case 'company profile':
        return history.push('/account_setting/settings?tab=0');
      case 'manage subscription':
        return history.push('/account_setting/settings?tab=2');

      case 'contact credits':
        return history.push('/account_setting/settings?tab=2');
      case 'billing':
        return history.push('/account_setting/settings?tab=2');
      case 'pricing':
        return history.push('/account_setting/settings?tab=2');
      case 'plans':
        return history.push('/account_setting/settings?tab=2');
      case 'database':
        return history.push(routesPath.MYDATABASE);
      case 'candidates':
        return history.push(routesPath.MYDATABASE);
      case 'invite candidates':
        return history.push(routesPath.MYDATABASE);
      case 'match candidate':
        return history.push(routesPath.MYDATABASE);
      case 'post jobs':
        return history.push(jobSelect);
      case 'create job':
        return history.push(jobSelect);  
      case 'my job postings':
        return history.push('/job_list');
      case 'zita match candidates':
         return history.push('/job_list');
      case 'reports':
        return history.push(reports);

      case 'bulk import candidates':
        return history.push(routesPath.BULK_IMPORT);
      case 'upload candidates':
        return history.push(routesPath.BULK_IMPORT);
      case 'applicants importing':
        return history.push(routesPath.BULK_IMPORT);
      case 'upload applicants':
        return history.push(routesPath.BULK_IMPORT);
      case 'bulk import':
        return history.push(routesPath.BULK_IMPORT);
      case 'bulk upload':
        return history.push(routesPath.BULK_IMPORT);
      case 'resume upload':
        return history.push(routesPath.BULK_IMPORT);
      case 'resume importing':
        return history.push(routesPath.BULK_IMPORT);

      case 'support':
      case 'help':
        return window.open(
          'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8',
        );
      case 'talent sourcing':
        return history.push(routesPath.TALENT_SOURCING);

      case 'source candidates':
        return history.push(routesPath.TALENT_SOURCING);

      case 'sourcing':
        return history.push(routesPath.TALENT_SOURCING);
    }
  };

  useEffect(() => {
    if (formik.values.value !== '') searchNavigate(formik.values.value);
  }, [formik.values.value]);

  const optionsArray: any = searchOptions;

  // search list condition
  useEffect(() => {
    if (plan_id !== 1) {
      optionsArray.push('Reports');
    }
    if (super_user === true) {
      optionsArray.push(
        'Manage Subscription',
        'Billing',
        'Contact Credits',
        'Pricing',
        'Plans',
        'Manage Users',
      );
    }
    optionsArray.push(
      'My Job Postings',
      'Careers Page',
      'integrations',
      'Zita Match Candidates',
      'Applicants Pipeline',
      'Calendar',

      'Email',
      'Inbox',
      'Email Integration',
      'Mail Integration',

      'Match Candidate',

      'Source Candidates',
      'Sourcing',
     
      'Candidates Importing',

      'Applicants Importing',
      'Upload Applicants',
      'Bulk Import',
      'Bulk Upload',
      'Resume Upload',
      'Resume Importing',
    );

    if (permission.includes('my_database')) {
      optionsArray.push('Database', 'Candidates', 'Invite Candidates');
    }
    if (permission.includes('talent_sourcing')) {
      optionsArray.push('Talent Sourcing');
    }
    if (permission.includes('bulkImport_candidates')) {
      optionsArray.push('Bulk Import Candidates', 'Upload Candidates');
    }
    if (permission.includes('create_post')) {
      optionsArray.push('Create Job', 'Post Jobs');
    }
    if (
      permission.includes('manage_account_settings') &&
      super_user === false
    ) {
      optionsArray.push('', 'Company Profile');
    }
  }, [searchOptions, plan_id, super_user, permission]);
  const toFindDuplicates = (arry: string[]) =>
    arry.filter((item, index) => arry.indexOf(item) === index);
  const duplicateElementa = toFindDuplicates(optionsArray);

  return (
    <div style={{ position: 'relative', width: '195px' }}>
      <div style={{ position: 'absolute', zIndex: 11, top: 3, left: 10 }}>
        <SvgSearch fill={'#581845'} />
      </div>

      <InputSearchnav
        style={styles.searchStyle}
        placeholder="Enter your search here..."
        options={duplicateElementa}
        setFieldValue={formik.setFieldValue}
        name="value"
        onkeyPress={(event) => {
          if (event.key === 'Enter') {
            searchNavigate(event.target.value);
            formik.setFieldValue('value', event.target.value);
          }
        }}
      />
    </div>
  );
};

export default NavigationSearch;
