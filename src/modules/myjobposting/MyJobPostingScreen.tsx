import { useFormik } from 'formik'; 
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import SvgJobpost from '../../icons/JobPost';

import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { getBlur, getFocus,copyToClipboard } from '../../uikit/helper';
import Pangination from '../../uikit/Pagination/Pangination';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { jobSelect } from '../../appRoutesPath';
import SvgCopy from '../../icons/SvgCopy';
import SvgExternal from '../../icons/SvgExternal';
import { AppDispatch, RootState } from '../../store';
import { postedOn } from './mock';
import {
  myJobPostingInitalMiddleWare,
  myJobPostingDataMiddleWare,
} from './store/middleware/myjobpostingmiddleware';
import styles from './myjobpostingscreen.module.css';
import MyJobsPostingMetrics from './MyJobsPostingMetrics';
import MyJobsPostingData from './MyJobsPostingData';
import MyJobPostingScreenStatus from './MyJobPostingScreenStatus';
import MyJobsPostingCount from './MyJobsPostingCount';
import MyJobsPostingFilter, { MyJobFormProps } from './MyJobsPostingFilter';
import Table from './Table';
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
    domain,
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
      {(is_loading || is_loadingone) && <Loader />}
      {Jobs_List === 2 && (
        <Flex row className={styles.overAll}>
          <div className={cx('filterOverAll')}>
            <MyJobsPostingFilter
              formik={formik}
              job_ids={job_ids}
              job_title={job_title}
              location_list={location_list}
            />
          </div>

          <div className={cx('tabsContainer')}>
            <Flex row center className={styles.titleContainer} >
           <SvgJobpost/>
              <Text  bold size={16} color="black" style={{ marginRight: 8 }} >
                 Job Postings
              </Text>
              <LinkWrapper target={'_parent'} to={`${career_page_url}`}>
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
            <Flex row between className={styles.width99} >
              <Text color="black">Total Jobs Found: {len_list}</Text>
              {Permission.includes('create_post') && (
                <LinkWrapper target={'_parent'} to={jobSelect}>
                  <Button className={styles.btnStyle} types="primary">
                    Post Job
                  </Button>
                </LinkWrapper>
              )}

              <LinkWrapper target={'_parent'} to={`${career_page_url}`}>
                
                  
                  <Button className={styles.btnStyle} types="primary">
                  
                     View Careers Page
                   </Button>

              </LinkWrapper>
            </Flex>
            
          <Flex>
            <Table/>
                
                         
          </Flex>
        
            <Flex
              center
              columnFlex
              className={styles.overAllCard}
              height={window.innerHeight - 180}
            >
              {final_list &&
                final_list.map((list, listIndex) => {
                  return (
                    <>
                      {listIndex === 0 && (
                        <input
                          className={styles.inputNone}
                          id="myjobpostscreen___input"
                        />
                      )}
                      <Card key={list.id} className={styles.cardOverAll}>
                        <Flex row center>
                        <Flex flex={6}>
                         {list.jd_status__label_name === 'Active' && (
        <Flex row top>
        <LinkWrapper to={`/job_view/${list.id}`}className={styles.link}>
          <Text color="link" bold >
            {list.job_title} 
          </Text>
        </LinkWrapper>
        
        <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8 }}
              title="Copy Job Posting URL"
              onClick={() => copyToClipboard(`${domain}/${career_page_url}/career_job_view/${list.id}/${list.job_title}` ,'Link Copied')}
              onKeyDown={() => {}}
            >
              <SvgCopy width={15} height={15}  fill={'#581845'}/>
            </div>
          </Flex>
      )}
      {list.jd_status__label_name === 'Draft' && (
           <Flex  row top>
           {list.is_ds_role  !== true ?  
        <LinkWrapper to={`/jobs/create_non_ds_edit/${list.id}`} className={styles.link}>
          <Text color="link" bold>
            {list.job_title} 
          </Text>  
        </LinkWrapper>
        :
         <LinkWrapper to={`/jobs/create_ds_edit/${list.id}`} className={styles.link}>
          <Text color="link" bold>
            {list.job_title} 
          </Text>  
        </LinkWrapper>
      }
         <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8 }}
             
            >
              <SvgCopy width={15} height={15}/>
            </div>
         </Flex>
      )}

      {list.jd_status__label_name === 'Inactive' && (
        <Flex  row top>
        <LinkWrapper to={`/job_view/${list.id}`}className={styles.link}>
          <Text color="link" bold>
            {list.job_title} 
          </Text>
        </LinkWrapper>  {' '}
       <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8 }}
             
            >
              <SvgCopy width={15} height={15}/>
            </div>
         </Flex>
      )}
      {list.jd_status__label_name === 'Questionnaire' && (
            <Flex row top>
        <LinkWrapper to={`/jobs/questionnaire/${list.id}`}className={styles.link}>
          <Text color="link" bold>
            {list.job_title} 
          </Text>
        </LinkWrapper>  {' '}
         <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8 }}
             
            >
              <SvgCopy width={15} height={15}/>
            </div>
          </Flex>
      )}
      {list.jd_status__label_name === 'Preview' && (
            <Flex row top>
        <LinkWrapper to={`/jobs/preview/${list.id}`} className={styles.link}>
          <Text color="link" bold>
            {list.job_title} 
          </Text>
        </LinkWrapper>  {' '}
         <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8 }}
             
            >
              <SvgCopy width={15} height={15}/>
            </div>
          </Flex>
      )}

                        <Flex  row>
                        <Flex flex={3}>
                            <MyJobsPostingData
                              list={list}
                              domain={domain}
                              career_page_url={career_page_url}
                            />
                          </Flex>
                          <Flex flex={4}>
                            <MyJobsPostingCount list={list} />
                          </Flex>

                        </Flex>
                          
                          </Flex>
                          <Flex flex={3} className={styles.screenStatusStyle}>
                            <MyJobPostingScreenStatus list={list} />
                          </Flex>
                          <Flex flex={2}>
                            <MyJobsPostingMetrics list={list} />
                          </Flex>
                        </Flex>
                      </Card>
                    </>
                  );
                })}
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

              {len_list > 10 && (
                <Flex middle className={styles.pagination}>
                  <Pangination
                    maxPages={pageCount - 1}
                    currentPage={isPage}
                    setCurrentPage={handleSetPagination}
                  />
                </Flex>
              )}
            </Flex>
          </div>
        </Flex>
      )}
      {Jobs_List === 1 && (
        <Flex row className={styles.overAll1}>
          <Flex center>
            <Flex center>
              <Text className={styles.noJob}>
                You have no posted jobs to display.
              </Text>
            </Flex>
            <Flex center middle>
              <LinkWrapper target={'_parent'} to={jobSelect}>
                <Button className={styles.btnStyle} types="primary">
                  Post Job
                </Button>
              </LinkWrapper>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
export default MyJobPostingScreen;

