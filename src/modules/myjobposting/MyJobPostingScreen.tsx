import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Totalcount from '../../globulization/TotalCount';
import SvgJobPost from '../../icons/SvgJobPost';
import SvgNoData from '../../icons/SvgNoData';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { getBlur, getFocus, copyToClipboard, isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import { jobCreateNonDs } from '../../appRoutesPath'
import { AppDispatch, RootState } from '../../store';
import SvgSubcriptioncrown from '../../icons/Subscriptioncrown';
import SvgInfo from '../../icons/SvgInfo';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { SubsriptionMiddleWare } from '../navbar/empnavbar/store/navbarmiddleware';
import SubscriptionModal from '../subscriptionmodule/subscriptionmoduleScreen';
import { postedOn } from './mock';
import {
  myJobPostingInitalMiddleWare,
  myJobPostingDataMiddleWare,
} from './store/middleware/myjobpostingmiddleware';
import styles from './myjobpostingscreen.module.css';
import Table from './Table';
import MyJobsPostingFilter, { MyJobFormProps } from './MyJobsPostingFilter';
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
  const [isLoad, setIsLoad] = useState(true);
  const history = useHistory();
  const [change, setchange] = useState(false);
  const { onDirty, onPristine, routerPrompt } = useUnsavedChangesWarning();
  const [isReload, setReload] = useState(false);
  const [isopensubcription, setopensubcription] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    localStorage.setItem('freeCheck', 'true');
    dispatch(myJobPostingInitalMiddleWare()).then((res) => {
      setIsLoad(false);
    });
  }, []);
  useEffect(() => {
    dispatch(SubsriptionMiddleWare())
  }, [])

  const {
    location_list,
    job_ids,
    all_job,
    job_title,
    final_list,
    Jobs_List,
    is_loadingone,
    len_list,
    is_loading,
    career_page_url,
    Permission,
    is_plan,
    current_plan,
    current_jd_count,
  } = useSelector(
    ({
      myJobPosingReducers,
      myJobPostingDataReducers,
      permissionReducers,
      SubscriptionReducers
    }: RootState) => ({
      // Jobs_List:0,
      Jobs_List: myJobPostingDataReducers.Jobs_List,
      location_list: myJobPosingReducers.location_list,
      job_ids: myJobPosingReducers.job_ids,
      all_job: myJobPosingReducers,
      job_title: myJobPosingReducers.job_title,
      final_list: myJobPostingDataReducers.final_list,
      len_list: myJobPostingDataReducers.len_list,
      is_loading: myJobPostingDataReducers.isLoading,
      is_loadingone: myJobPosingReducers.isLoading,
      career_page_url: myJobPostingDataReducers.career_page_url,
      domain: myJobPostingDataReducers.domain,
      Permission: permissionReducers.Permission,
      is_plan: permissionReducers.is_plan,
      current_plan: SubscriptionReducers.current_plan,
      current_jd_count: SubscriptionReducers.current_jd_count,
    }),
  );

  console.log(current_plan, current_jd_count, 'hi_maple')
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => { },
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
    setIsLoad(true);
    dispatch(
      myJobPostingDataMiddleWare({
        jobTitle: formik.values.jobTitle,
        jobId: formik.values.jobId,
        postedOn: formik.values.postedOn.value,
        jobType: formik.values.jobType,
        location: formik.values.location,
        page: isPage + 1,
      }),
    ).then((res: any) => {
      setIsLoad(false);
    });
  }, [isPage]);
  useEffect(() => {
    if (change === false)
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

  }, [isPage, change, formik.values]);

  useEffect(() => {
    if (isReload) {
      setReload(false);
    } else if (!isReload) {
      onPristine();
    }
  }, [isReload]);





  return (
    <Flex className={styles.overFlowContainer}>
      <div>
        <Flex row className={styles.titleContainer}>
          {/* <SvgJobPost width={15.71} height={16} /> */}
          <Text
            bold
            size={16}
            style={{ marginLeft: 8, color: '#581845' }}
            className={styles.postingcl}
          >
            Job Postings
          </Text>
          <div className={styles.triangle}></div>
        </Flex>
      </div>
      {current_jd_count === 0 &&
        <Flex row center className={styles.warningFlex}>
          <SvgInfo height={16} width={16} fill={'#2E6ADD'} />
          <Text
            style={{ color: '#333333' }}
            className={styles.warningText}
          >
            <Text
              style={{
                color: '#2E6ADD',
                marginRight: '3px',
                fontSize: '13px',
              }}
              bold
            >
              Heads Up!{' '}
            </Text>
            <Text>To post a job, you have the option to either </Text>
            <Text bold color='theme' onClick={() => setopensubcription(true)} style={{ cursor: 'pointer' }}>Upgrade</Text>
            <Text> your subscription or explore our </Text>
            <Text color='theme' bold onClick={() => setopensubcription(true)} style={{ cursor: 'pointer' }}>Add-on </Text>
            <Text>features.</Text>
          </Text>
        </Flex>}
      {Jobs_List === 2 && (
        <Flex>
          <div className={cx('tabsContainer')}>
            <Flex row between className={styles.searchbox}>
              <Flex row>
                <Flex><Totalcount name="Total Jobs Found " numbers={len_list} /></Flex>
                <Flex marginLeft={25}><Totalcount name="Available Job Posting" numbers={current_jd_count} /></Flex>
              </Flex>
              <Flex row className={styles.twobutton} marginRight={10}>
                {' '}
                {Permission.includes('create_post') && (
                  <>
                    {current_jd_count !== 0 ?
                      <LinkWrapper to={jobCreateNonDs}>
                        <Button className={styles.style1} types="primary">
                          <Text color='white'>Post Jobs</Text>
                        </Button>

                      </LinkWrapper> :
                      <Button style={{ cursor: 'pointer' }} className={styles.style1} types="primary" onClick={() => setopensubcription(true)}>
                        <Flex row>
                          <Flex style={{ cursor: 'pointer' }}>
                            <Text color='white'>Post Jobs</Text>
                          </Flex >
                          <Flex marginLeft={5} marginTop={1} style={{ cursor: 'pointer' }}><SvgSubcriptioncrown height={14} width={14} fill='' /></Flex>
                        </Flex>
                      </Button>}
                  </>
                )}
                <LinkWrapper
                  target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                  to={
                    isEmpty(career_page_url)
                      ? `/account_setting/settings?tab=1`
                      : `/${career_page_url}/careers`
                  }
                >
                  <Button className={styles.style2} types="primary">
                    View Careers Page
                  </Button>
                </LinkWrapper>
              </Flex>
            </Flex>
            <Flex>
              <div className={cx('filterOverAll')}>
                <MyJobsPostingFilter
                  formik={formik}
                  job_ids={job_ids}
                  job_title={job_title}
                  location_list={location_list}
                  setchange={setchange}
                />
              </div>

              <Flex>
                <Table
                  currentPage={isPage}
                  setCurrentPage={handleSetPagination}
                />

              </Flex>
            </Flex>
          </div>
        </Flex>
      )}
      {console.log(len_list, 'len_listlen_list')}
      {len_list === 0 && Jobs_List !== 1 && (
        <Flex center style={{ height: "100%" }}>
          <Flex
            className="container"
            flex={1}
            center
            middle
            width={window.innerWidth - 570}
          >
            <Flex center middle><SvgNoData width={16} height={16} fill={'#888888'} /></Flex>
            <Text
              style={{
                color: 'gray',
                fontSize: 13,
              }}
            >
              No job found
            </Text>
          </Flex>
        </Flex>
      )}
      {Jobs_List === 1 && (
        <Flex middle className={styles.overAll2}>
          <Flex center>
            <Flex center>
              <Text className={styles.postyet1} size={13}>No Job Posts - Yet !</Text>
            </Flex>
            <Flex center>
              <Text className={styles.postyet2} size={13}>
                Looks like you haven’t posted any jobs
              </Text>
            </Flex>
            <Flex center>
              <Text className={styles.postyet3} size={13}>
                No worries, just click on “Post Jobs” to kick start
              </Text>
            </Flex>
            <Flex center className={styles.postyet4}>
              <LinkWrapper to={jobCreateNonDs}>
                <Button className={styles.btnStyle} types="primary">
                  Post Jobs
                </Button>{' '}
              </LinkWrapper>{' '}
            </Flex>{' '}
          </Flex>{' '}
        </Flex>
      )}
      {isopensubcription &&
        <SubscriptionModal currentplan={current_plan} nextplan={current_plan + 1} openmodel={isopensubcription} setopensubcription={setopensubcription} />}
      {isLoad && <Loader />}
    </Flex>
  );
};
export default MyJobPostingScreen;
