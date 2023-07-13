import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import SvgJobPost from '../../icons/SvgJobPost';
import {
  ErrorMessage,
  InputCheckBox,
  InputSearch,
  SelectTag,
} from '../../uikit';
// import SvgAccountCircle from '../../icons/SvgAccountCircle';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
// import Card from '../../uikit/Card/Card';
import Loader from '../../uikit/Loader/Loader';
import Button from '../../uikit/Button/Button';
import { getBlur, getFocus, copyToClipboard } from '../../uikit/helper';
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
import Table from './Table';
import MyJobsPostingFilter, { MyJobFormProps } from './MyJobsPostingFilter';
// import SvgExternal from "../../icons/SvgExternal";

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
    localStorage.setItem('freeCheck', 'true');
    localStorage.setItem('freeCheck', 'true');
    dispatch(myJobPostingInitalMiddleWare());
  }, []);

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
  } = useSelector(
    ({
      myJobPosingReducers,
      myJobPostingDataReducers,
      permissionReducers,
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
            Job Posting
          </Text>
          <div className={styles.triangle}></div>
        </Flex>
      </div>
      {/* {(is_loading || is_loadingone) && <Loader />} */}
      {Jobs_List === 2 && (
        <Flex  >
          <div className={cx('tabsContainer')}>
            <Flex row className={styles.searchbox}>
              <Flex row>
                <Flex row className={styles.totaljobs}>
                  <Text
                    style={{
                      color: '#581845',
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Total Jobs Found :{' '}
                  </Text>
                  <Text
                    style={{
                      color: '#581845',
                      fontSize: 16,
                      fontWeight: 600,
                      paddingLeft: 4.5,
                      paddingTop: 0.5,
                    }}
                  >
                    {len_list}
                  </Text>
                </Flex>
              </Flex>
              <Flex row className={styles.twobutton}>
                {' '}
                {Permission.includes('create_post') && (
                  <LinkWrapper target={'_parent'} to={jobSelect}>
                    <Button className={styles.style1} types="primary">
                      Post Job
                    </Button>
                  </LinkWrapper>
                )}
                <LinkWrapper
                  target={'_blank'}
                  to={`${career_page_url}/careers`}
                >
                  <Button className={styles.style2} types="primary">
                    View Career Page
                  </Button>
                </LinkWrapper>
              </Flex>
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
                <Table />

                {len_list === 0 && (
                  <Flex
                    className="container"
                    flex={1}
                    center
                    middle
                    width={window.innerWidth - 570}
                    // style={styles.nojobpost}
                  >
                    <Text
                      style={{
                        paddingTop: 200,
                        color: 'gray',
                        fontSize: 16,
                      }}
                    >
                      No Job Found
                    </Text>
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
      {Jobs_List === 1 && (
        <Flex middle className={styles.overAll2}>
          <Flex center>
            <Flex center>
              <Text className={styles.postyet1}>No Job Posts - Yet !</Text>
            </Flex>
            <Flex center>
              <Text className={styles.postyet2}>
                Looks like you haven’t posted any jobs
              </Text>
            </Flex>
            <Flex center>
              <Text className={styles.postyet3}>
                No worries, just click on “Post Job” to kick start
              </Text>
            </Flex>
            <Flex center className={styles.postyet4}>
              <LinkWrapper target={'_parent'} to={jobSelect}>
                <Button className={styles.btnStyle} types="primary">
                  Post Job
                </Button>{' '}
              </LinkWrapper>{' '}
            </Flex>{' '}
          </Flex>{' '}
        </Flex>
      )}
    </Flex>
  );
};
export default MyJobPostingScreen;
{
  /* <Flex row className={styles.searchstyle}>
                    <Text className={styles.jobstext}>Jobs</Text>

                    <Flex row className={styles.searchboxoverall}>
                      <InputSearch
                        initialValue={formik.values.jobTitle}
                        options={job_title}
                        setFieldValue={formik.setFieldValue}
                        name="jobTitle"
                        style={styles.boxstyle}
                        // labelBold
                        placeholder="Enter a job title"
                        // label={'Job Title'}
                        onkeyPress={(event) => {
                          if (event.key === "Backspace") {
                       formik.setFieldValue(
                                "jobTitle",
                              ""
                              );
                         }
                         if (event.key === 'Enter') {

                          formik.setFieldValue(
                            "jobTitle",
                        ""
                          );
                         }
                       
                        }}
                      ></InputSearch>

                      {/* <div className={styles.filterbg}>
                      <SvgSearch fill="white" />
                    </div> */
}
{
  /* <Flex className={styles.middleline}></Flex>
                      <InputSearch
                        initialValue={formik.values.location.charAt(0).toUpperCase() +formik.values.location.slice(1)}
                        placeholder="Enter job location"
                        options={location_list}
                        setFieldValue={(formik.setFieldValue)}
                        name="location"
                        style={styles.boxstyle}
                        onkeyPress={(event) => {
                          if (event.key === "Enter") {
                            formik.setFieldValue(
                              "location",
                              event.target.value 
                            );
                          }
                        }}
                      />

                      <Flex className={styles.locationicon}>
                        <SvgLocation fill={"#581845"}></SvgLocation>
                      </Flex>
                      <Flex className={styles.searchicons}>
                        <SvgSearch width={11.89} height={11.72}></SvgSearch>
                      </Flex>
                    </Flex>
                  </Flex> */
}
{
  /* <Text className={styles.nojob}
                      style={{
                        marginLeft: 70,
                        marginTop: 100,
                        fontWeight: 700,
                        fontSize: 16, 
                        marginBottom: 10,
                        color: "#581845",
                      }}
                    >
                      No Job Posts - Yet !
                    </Text>
                    <Text
                      style={{
                        marginLeft: 35,
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#666666",
                      }}
                    >
                      Looks like you haven’t posted any jobs
                    </Text>
                    <Text
                      style={{
                        marginLeft: 12,
                        marginBottom: 50,
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#666666",
                      }}
                    >
                      No worries, just click on “Post Job” to kick start{" "}
                    </Text>
                    {Permission.includes("create_post") && (
                      <LinkWrapper target={"_parent"} to={jobSelect}>
                        <Button types="primary" className={styles.postbutton}>
                          Post Job
                        </Button>
                      </LinkWrapper>
                    )} */
}
{
  /*                     
            /* <Flex row className={styles.titleContainer}> */
  /* <SvgJobPost width={15.71} height={16} /> */
  /* <Text
                bold
                size={16}
                style={{ marginLeft: 8, color: "#581845" }}
                className={styles.postingcl}
              >
                Job Posting
              </Text>
              <div className={styles.triangle}></div>
                  </Flex> */
}
