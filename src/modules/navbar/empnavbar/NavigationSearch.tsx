
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { jobSelect, reports,homeRoute} from '../../../appRoutesPath';
import SvgSearch from '../../../icons/SvgSearch';
import { routesPath } from '../../../routes/routesPath';
import { RootState } from '../../../store';
import { WHITE } from '../../../uikit/Colors/colors';
import InputSearch from '../../../uikit/InputSearch/InputSearch';
import { searchOptions } from './mock';
import styles from './navbar.module.css';

type Props = {
  onButtonClick: () => void;};
const NavigationSearch = ({ onButtonClick }) => {

  const history = useHistory();
  const formik = useFormik({
    initialValues: { value: '' },
    onSubmit: () => { },
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
      case 'job postings':
        return history.push(routesPath.MY_JOB_POSTING);
      case 'dashboard':
        return history.push(homeRoute);
      case 'manage users':
        return (
          sessionStorage.setItem('superUserTab', '3'),
          history.push('/account_setting/settings?tab=3')
        );
      case 'user profile':
      case 'password change':
        onButtonClick();
        return (
          
          super_user === true &&
          history.push('/account_setting/settings?tab=6'),
          permission.includes('manage_account_settings') 
          
          &&
          super_user === false &&
          history.push('/account_setting/settings?tab=4'),
          !permission.includes('manage_account_settings') &&
          super_user === false &&
          history.push('/account_setting/settings?tab=1')
        );
      case 'profile update':
        return (
          super_user === true &&
          history.push('/account_setting/settings?tab=0'),
          permission.includes('manage_account_settings') &&
          super_user === false &&
          history.push('/account_setting/settings?tab=4'),
          !permission.includes('manage_account_settings') &&
          super_user === false &&
          history.push('/account_setting/settings?tab=1')
        );
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
      case 'build your careers page':
        return history.push('/account_setting/settings?tab=1');
      case 'company profile':
        return history.push('/account_setting/settings?tab=0');
      case 'manage subscription':
      case 'contact credits':
      case 'billing':
      case 'pricing':
      case 'plans':
        return history.push('/account_setting/settings?tab=2');
      case 'database':
      case 'candidates':
      case 'invite candidates':
        return history.push(routesPath.MYDATABASE);
      case 'post jobs':
      case 'create job':
        return history.push(jobSelect);
      case 'reports':
        return history.push(reports);
      case 'bulk import candidates':
      case 'upload candidates':
        return history.push(routesPath.BULK_IMPORT);
      case 'support':
      case 'help':
        return window.open(
          'https://share.hsforms.com/1WPpWRzsQT6CyEVAQuDP6wg49hg8',
        );
      case 'talent sourcing':
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
      optionsArray.push('Build Your Careers Page', 'Company Profile');
    }
  }, [searchOptions, plan_id, super_user, permission]);
  const toFindDuplicates = (arry: string[]) =>
    arry.filter((item, index) => arry.indexOf(item) === index);
  const duplicateElementa = toFindDuplicates(optionsArray);
  // console.log('duplicateElementa',duplicateElementa);


 
  return (
    
    <div style={{ position: 'relative',width:'195px' }}>
      {console.log("history",history)}
      <div style={{ position: 'absolute', zIndex: 11, top: 3, left: 10 }}>
        <SvgSearch fill={'#581845'} />
      </div>

     <InputSearch
        // // eslint-disable-next-line jsx-a11y/no-autofocus
        // autoFocus
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
