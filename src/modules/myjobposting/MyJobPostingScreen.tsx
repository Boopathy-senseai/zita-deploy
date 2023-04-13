import { useFormik } from 'formik'; 
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import SvgJobPost from '../../icons/SvgJobPost';
import { ErrorMessage, InputCheckBox, InputSearch, Table } from '../../uikit';
// import SvgAccountCircle from '../../icons/SvgAccountCircle';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
// import Card from '../../uikit/Card/Card';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { getBlur, getFocus,copyToClipboard } from '../../uikit/helper';
import Pangination from '../../uikit/Pagination/Pangination';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { jobSelect } from '../../appRoutesPath';
// import SvgCopy from '../../icons/SvgCopy';

// import { WHITE } from '../../uikit/Colors/colors';

import SvgLocation from '../../icons/SvgLocation';
// import SvgExternal from '../../icons/SvgExternal';
import { AppDispatch, RootState } from '../../store';
import SvgSearch from '../../icons/SvgSearch';
import { jobTypeData, postedOn } from './mock';
import {
  myJobPostingInitalMiddleWare,
  myJobPostingDataMiddleWare,
} from './store/middleware/myjobpostingmiddleware';
import styles from './myjobpostingscreen.module.css';
// import MyJobsPostingMetrics from './MyJobsPostingMetrics';
// import MyJobsPostingData from './MyJobsPostingData';
// import MyJobPostingScreenStatus from './MyJobPostingScreenStatus';
// import MyJobsPostingCount from './MyJobsPostingCount';
import MyJobsPostingFilter, { MyJobFormProps } from './MyJobsPostingFilter';
import SvgExternal from '../../icons/SvgExternal';

const cx = classNames.bind(styles);

const initial: MyJobFormProps = {
  jobTitle: '',
  jobId: '',
  postedOn: postedOn[0],
  jobType: '',
  location: '',
};

const MyJobPostingScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isPage, setPage] = useState(0);
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    dispatch(myJobPostingInitalMiddleWare());
  }, []);

  const {
    location_list,
    job_ids,
    job_title,
    final_list,
    Jobs_List,
    is_loadingone,
    len_list,
    is_loading,
    career_page_url,
    Permission,
    is_plan
  } = useSelector(
    ({
      myJobPosingReducers,
      myJobPostingDataReducers,
      permissionReducers,
    }: RootState) => ({
      Jobs_List: myJobPostingDataReducers.Jobs_List,
      location_list: myJobPosingReducers.location_list,
      job_ids: myJobPosingReducers.job_ids,
      job_title: myJobPosingReducers.job_title,
      final_list: myJobPostingDataReducers.final_list,
      len_list: myJobPostingDataReducers.len_list,
      is_loading: myJobPostingDataReducers.isLoading,
      is_loadingone: myJobPosingReducers.isLoading,
      career_page_url: myJobPostingDataReducers.career_page_url,
      domain: myJobPostingDataReducers.domain,
      Permission: permissionReducers.Permission,
      is_plan: permissionReducers.is_plan,
    }),
  );

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
  });

  const usersPerPage = 10;
  const pageCount = Math.ceil(len_list / usersPerPage);

  const handleSetPagination = (a: number) => {
    setPage(a);
    if (final_list.length !== 0) {
      getFocus('myjobpostscreen___input');
      getBlur('myjobpostscreen___input');
    }
  };

  useEffect(() => {
    dispatch(
      myJobPostingDataMiddleWare({
        jobTitle: formik.values.jobTitle,
        jobId: formik.values.jobId,
        postedOn: formik.values.postedOn.value,
        jobType: formik.values.jobType,
        location: formik.values.location,
        page: isPage + 1,
      }),
    );
  }, [isPage, formik.values]);

  

  return (
    <Flex>
      {/* {(is_loading || is_loadingone) && <Loader />} */}
      {Jobs_List === 2 && (
        <Flex row className={styles.overAll}>
          

          <div className={cx('tabsContainer')}>
            <Flex row center className={styles.titleContainer} >
          <SvgJobPost width={22} height={22}  />
              <Text  bold size={16} color="black" style={{ marginLeft: 8 }} className={styles.postingcl} >
                 Job Postings
              </Text>
              <LinkWrapper target={'_blank'} to={`${career_page_url}/careers`}>
                <Button className={styles.btnStyle} types="secondary">
                  <Flex row>
                    <Text className={styles.career} color={'theme'} bold>
                      Careers Page
                    </Text>

                    <SvgExternal width={17} height={17} fill={'#581845'} />
                  </Flex>
                </Button>
              </LinkWrapper> 
            </Flex>
            
              

          <Flex row className={styles.searchstyle}>
              <Text className={styles.jobstext} >
                Jobs 
              </Text>
              
              <Flex row className={''}>
             <InputSearch
          initialValue={formik.values.jobTitle}
          options={job_title}
          setFieldValue={formik.setFieldValue}
          name="jobTitle"
          style={styles.boxstyle}
          labelBold
          placeholder="enter a job tittle or name"
          // label={'Job Title'}
          onkeyPress={(event) => {
            if (event.key === 'Enter') {
              formik.setFieldValue('jobTitle', event.target.value);
            }
          }}
        />
      
     
 
      <Flex style={{ position: 'relative' }} >
      
      <div className={styles.filterbg} >
        <SvgSearch fill='white' />
       
        </div>
      
      <InputSearch
        initialValue={formik.values.location}
          placeholder="select Location" 
          options={location_list}
          setFieldValue={formik.setFieldValue}
          name="location"
          style={styles.boxstyle}
          labelBold
          // label={'Location'}
          onkeyPress={(event) => {
            if (event.key === 'Enter') {
              formik.setFieldValue('location', event.target.value);
            }
          }}
         />
        
          </Flex > 
   
              <Text className={styles.totaljobs}>Total Jobs Found: {len_list}</Text>
              </Flex>
             
              {Permission.includes('create_post') && (
                <LinkWrapper target={'_parent'} to={jobSelect}>
                  <Button className={styles.style1} types="primary">
                    Post Job
                  </Button>
                </LinkWrapper>
              )}


              <LinkWrapper target={'_blank'} to={`${career_page_url}/careers`}>
                
                  
                  <Button className={styles.style2} types="primary">
                  
                     View Careers 
                   </Button>

              </LinkWrapper>
              
            </Flex>


            <Flex>
              
            <div className={cx('filterOverAll')}>
            
            {/* <Text className={styles.quickfil2}>
              
              Quick Filters: */}
              
              
                  {/* <Flex row>
                
                    
                  <Text className={styles.quickfil}> </Text>
                  
                    
                    <SvgIntomark  className={styles.stylesvg}/>
              
             </Flex> */}
             {/* </Text> */}
             
            <MyJobsPostingFilter
              formik={formik}
              job_ids={job_ids}
              job_title={job_title}
              location_list={location_list}
            />
          </div>
          
          


          <Flex>
            <Table/>
           
        {len_list === 0 && (
                <Flex
                  height={'100%'}
                  flex={1}
                  center
                  middle
                  width={window.innerWidth - 570}
                >
                  <Text color="gray">No Jobs Found</Text>
                </Flex>
                
              )}
 </Flex>
 </Flex>
              {len_list > 10 && (
                <Flex middle className={styles.pagination}>
                  <Pangination
                    maxPages={pageCount - 1}
                    currentPage={isPage}
                    setCurrentPage={handleSetPagination}
                  />
                </Flex>
              )}
            
          </div>
        </Flex>
      )}
    </Flex>
    
  );
};
export default MyJobPostingScreen;
