import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { saveAs } from 'file-saver';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
// import Status from '../../uikit/Status/Status';
import Card from '../../uikit/Card/Card';
import Chart from '../../uikit/Chart/Chart';
import Toast from '../../uikit/Toast/Toast';
import { Button } from '../../uikit';
import Collapse from '../../uikit/Collapse/Collapse';
import { PRIMARY } from '../../uikit/Colors/colors';
import SvgNodata from '../../icons/SvgNoDataIcon';
import SvgNoDataIcon from '../../icons/SvgNoDataIcon';
import SvgAngle from '../../icons/SvgAngle';
import { LINK } from '../../uikit/Colors/colors';
import { Table } from '../../uikit';
import QuestionTable from '../createjdmodule/QuestionTable';
import { resultTitle } from '../createjdmodule/questionnaireTable';

import Svgwhatjobs from '../../icons/Svgwhatjobs';
import SvgRight from '../../icons/SvgRight';
import Loader from '../../uikit/Loader/Loader';

// import Modal from '../../uikit/Modal/Modal';
// import Button from '../../uikit/Button/Button';
import { AppDispatch, RootState } from '../../store';
import { YES } from '../constValue';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import EEOCompliance from '../createjdmodule/EEOCompliance';
import JdLog from './JdLog';
// import JdDetails from './JdDetails';
// import RolesandResponsibilities from './RolesandResponsibilities';
import JdTitle from './JdTitle';
import PreviewTitle from './../createjdmodule/PreviewTitle';
import styles from './jdviewscreen.module.css';
import {
  jdViewMiddleWare,
  jdDownloadMiddleWare,
  jdInactiveMiddleWare,
} from './store/middleware/jdviewmiddleware';


type ParamsType = {
  jdId: string;
};

const JdViewScreen = () => {
  const { jdId } = useParams<ParamsType>();
  const [isOpen, setOpen] = useState(false);
  const [isCollapse, setCollapse] = useState(true);
  const [isCollapsedes, setCollapsedes] = useState(true);
  const [isloading, setloading] = useState(false);
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(jdViewMiddleWare({ jdId }));
  }, []);

  const {
    statusList,
    jdDetails,
    skills,
    location,
    qualification,
    profile,
    dates_len,
    loader,
    job_view_line,
    applicants_line,
    career_page_url,
    is_plan,
    external,
    ext_jobs,
    jdview,
    company_detail,
    questionnaire,

  } = useSelector(({ jdViewReducers, permissionReducers }: RootState) => {
    return {
      statusList: jdViewReducers.int_list,
      jdDetails: jdViewReducers.jd,
      company_detail: jdViewReducers.company_detail,
      questionnaire: jdViewReducers.questionnaire,
      skills: jdViewReducers.skills,
      qualification: jdViewReducers.qualification,
      location: jdViewReducers.location,
      profile: jdViewReducers.profile,
      dates_len: jdViewReducers.dates,
      loader: jdViewReducers.isLoading,
      career_page_url: jdViewReducers.career_page_url,
      job_view_line: jdViewReducers.job_view_line,
      applicants_line: jdViewReducers.applicants_line,
      is_plan: permissionReducers.is_plan,
      external: jdViewReducers.has_external_posting,
      ext_jobs: jdViewReducers.ext_jobs,

      jdview: jdViewReducers,
    };
  });
  console.log(questionnaire, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
  const [session, setsession] = useState("");
  // setsession(company_detail.company_name);
  const handleDownload = () => {
    setloading(true);
    dispatch(jdDownloadMiddleWare({ jd_id: jdId })).then((data) => {

      saveAs(`${data.payload.file_path}`, `${jdDetails.job_id}`,);

      Toast('JD downloaded successfully', 'LONG', 'success');

      setloading(false);
    });
  };
  const hanldeInactive = () => {
    setOpen(true);
  };
  const hanldeInactiveclose = () => {
    setOpen(false);
  };
  const hanldeInactiveDone = () => {
    setloading(true);

    dispatch(jdInactiveMiddleWare({ jd_id: jdId })).then((res) => {

      if (res.payload.success) {
        setOpen(false);
        Toast('Job inactivated successfully.', 'LONG', 'success');
        dispatch(jdViewMiddleWare({ jdId }));
        history.push('/job_list');
      }
    });
  };
  const jobViewWeekArray: any =
    job_view_line &&
    job_view_line.map((list, index) => {
      const result = index === 0 ? list.label : `Week ${index}`;
      return result;
    });

  const applicantWeekArray: any =
    applicants_line &&
    applicants_line.map((list, index) => {
      const result = index === 0 ? list.label : `Week ${index}`;
      return result;
    });

  const jobViewyValue =
    job_view_line &&
    job_view_line.map((list) => {
      const result = list.y;
      return result;
    });

  const applicantyValue =
    applicants_line &&
    applicants_line.map((list) => {
      const result = list.y;
      return result;
    });
  const options = {
    title: {
      text: 'Trend Line of Job Views and Applicants',

      style: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: "10px",
        borderBottom: "1px solid black",
        display: "none",

      },
    },
    xAxis: {
      title: {
        text: 'Active Job Posting Period (Weekly)',
      },
      // min: 20,
      categories:
        jobViewWeekArray?.length > applicantWeekArray?.length
          ? jobViewWeekArray
          : applicantWeekArray,
    },
    yAxis: {
      title: {
        text: 'Total Counts',
      },
      min: -1,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    series: [
      {
        name: 'Job Views',
        data: jobViewyValue,
        color: '#4F81BC',
      },
      {
        name: 'Applicants',
        data: applicantyValue,
        color: '#C0504E',
      },
    ],
  };
  const session1 = (sessionStorage.getItem("EmpToggle"))
  const session2 = session1 === '1';
  const columns = useMemo(() => resultTitle(), [questionnaire]);
  console.log("")
  //const [isCollapse, setCollapse] = useState(false);

  return (
    <Flex>
      <Flex row className={styles.ribbon} between>


        <Flex row className={styles.mainpadding} >
          <Flex>
            <Text size={16} bold color="theme" >
              Job Posting
            </Text></Flex>
          <Flex marginTop={6} marginLeft={7} marginRight={2}>
            <SvgRight fill={'#581845'} ></SvgRight></Flex>
          <Flex marginTop={1} marginLeft={3}>
            <Text size={16} bold color="theme" >
              {jdDetails.job_title}</Text>
          </Flex>

        </Flex>
        <Flex >

          <div className={styles.triangle}></div>
        </Flex>

      </Flex>

      <Flex
        columnFlex
        className={styles.cardOverAlls}
        height={615}
      >
        <Flex>
          {(loader || isloading) && <Loader />}
          <JdTitle
            handleDownload={handleDownload}
            jdDetails={jdDetails}
            career_page_url={career_page_url}
            hanldeInactive={hanldeInactive}
            whatjob={ext_jobs}
          />

          <Flex >
            <Flex row between onClick={() => setCollapse(!isCollapse)}>
              {/* <Text
              bold
              color="theme"
              className={styles.font20}
              
            >
              Job Metrics
            </Text> */}
              <Flex className={styles.postion}>
                {/* <SvgAngle width={15} height={15} up={isCollapse} /> */}
              </Flex>
            </Flex>
          </Flex>
          {/* {isCollapse && ( */}
          <Flex row center className={styles.padding2}>
            <Flex flex={9}>
              <Card className={styles.chartStyle}>
                {dates_len === 0 ? (
                  <>
                    <Text align="center"
                      bold
                      size={14}
                      style={{ color: "#333333" }}
                      className={styles.jdStatus}
                    >Trend Line of Job Views and Applicants</Text>
                    <Flex className={styles.center} style={{display:"flex", alignItems:"center", filter: "opacity(0.6)" }}>
                      <SvgNoDataIcon width={15} />
                      <Text bold className={styles.font10px} style={{ color: "#888888" }}>
                        No Data Available
                      </Text>
                    </Flex>
                  </>
                ) : (
                  <>
                    <Text align="center"
                      bold
                      size={14}
                      style={{ color: "#333333" }}
                      className={styles.jdStatus}
                    >Trend Line of Job Views and Applicants</Text>
                    <Chart options={options} />
                  </>
                )}
              </Card>
            </Flex>
            <Flex flex={3}>
              <JdLog statusList={statusList} jdDetails={jdDetails} />
            </Flex>
          </Flex>
          {/* )} */}
        </Flex>

        {/* {isCollapsedes && ( */}
        <Flex className={styles.padding}>

          <Flex row between className={styles.jobMetricsStyle} onClick={() => setCollapsedes(!isCollapsedes)}>

            <Flex >
              <Text
                bold
                style={{ color: "#333333" }}
                size={14}
              >
                Job Details & Description
              </Text>
            </Flex>
            <Flex >
              <Button onClick={handleDownload} types='primary'>Download JD</Button>
            </Flex>

          </Flex>
          <Flex className={styles.padding2}>
            <PreviewTitle
              jd_view
              jdDetails={jdDetails}
              profile={profile}
              location={location}
              qualification={qualification}
              skills={skills}
            />
          </Flex>
          {console.log("skill", jdview)}

          <Card className={styles.cardOverAll}>
            <Flex columnFlex>
              <Text bold size={14} style={{ color: "#333333" }}>
                Applicant Questionnaire
              </Text>
              <div className={styles.tableDiv}>
                {
                  questionnaire.length === 0 ? (
                    <Text color="gray">No questions added for this job</Text>
                  ) : (
                    <Table
                      empty={'No questions added for this job'}
                      dataSource={questionnaire}
                      columns={columns}
                      border="overAll"
                    />
                  )}
              </div>

            </Flex>
          </Card>

          <CancelAndDeletePopup
            title={
              <Flex className={styles.popTitle}>
                <Text>
                  This will remove the job posting from both the external job board & careers page.
                </Text>
                <Text >Are you sure you want to Inactivate this job?</Text>
              </Flex>
            }
            btnDelete={hanldeInactiveDone}
            btnCancel={hanldeInactiveclose}
            btnRight={YES}
            open={isOpen}
            loader={isloading}
          />
        </Flex>

      </Flex>
    </Flex>
  );
};

export default JdViewScreen;