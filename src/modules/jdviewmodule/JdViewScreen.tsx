import { useEffect, useState } from 'react';
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
import { PRIMARY } from '../../uikit/Colors/colors';
import SvgAngle from '../../icons/SvgAngle';

import Svgwhatjobs from '../../icons/Svgwhatjobs';
import Loader from '../../uikit/Loader/Loader';
// import Collapse from '../../uikit/Collapse/Collapse';
// import Modal from '../../uikit/Modal/Modal';
// import Button from '../../uikit/Button/Button';
import { AppDispatch, RootState } from '../../store';
import { YES } from '../constValue';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
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
  } = useSelector(({ jdViewReducers, permissionReducers }: RootState) => {
    return {
      statusList: jdViewReducers.int_list,
      jdDetails: jdViewReducers.jd,
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
      external:jdViewReducers.has_external_posting,
      ext_jobs:jdViewReducers.ext_jobs,
      jdview:jdViewReducers,
    };
  });
  console.log(ext_jobs,'hhh')
  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });
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
        marginBottom:"10px",
        borderBottom:"1px solid black",
        display:"none",

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
  return (
    <Flex
      columnFlex
      className={styles.cardOverAll}
      height={window.innerHeight - 100}
    >
      {(loader || isloading) && <Loader />}
      <JdTitle
        handleDownload={handleDownload}
        jdDetails={jdDetails}
        career_page_url={career_page_url}
        hanldeInactive={hanldeInactive}
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
        <Flex flex={6}>
          <Card className={styles.chartStyle}>
            {dates_len === 0 ? (
              <>
                <Text align="center"
                  bold
                  size={16}
                  color="theme"
                  className={styles.jdStatus}
                >Trend Line of Job Views and Applicants</Text>
                <Flex className={styles.center}>
                  <Text bold className={styles.font10px} style={{ color: "#888888", fontWeight: "100" }}>
                    No Data Available
                  </Text>
                </Flex>
              </>
            ) : (
              <>
              <Text align="center"
                  bold
                  size={16}
                  color="theme"
                  className={styles.jdStatus}
                >Trend Line of Job Views and Applicants</Text>
              <Chart options={options}  />
              </>
            )}
          </Card>
        </Flex>
        <Flex flex={6}>
          <JdLog statusList={statusList} jdDetails={jdDetails} />
        </Flex>
      </Flex>
      {/* )} */}

      <Flex row between className={styles.jobMetricsStyle} onClick={() => setCollapsedes(!isCollapsedes)}>

        <Flex >
          <Text
            bold
            color="theme"
            size={16}
          >
            Job Details & Description
          </Text>
        </Flex>
        <Flex >
          <Button onClick={handleDownload} types='primary'>Download Jd</Button>
        </Flex>

      </Flex>
      <Flex className={styles.postion} >
        {/* <SvgAngle width={15} height={15} up={isCollapsedes} /> */}
      </Flex>

      {/* {isCollapsedes && ( */}
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
      {/* )} */}
      {ext_jobs.length!==0 &&
       
        <Flex>
          {ext_jobs[0].jobposting_url!==null &&
          <Flex>
        <Text 
                  bold
                  size={16}
                  color="theme"
                  className={styles.boards}
                >Job Posted Boards(Includes Company Career Page)</Text>
                <Flex marginTop={10} marginBottom={10}>
                <a href={ext_jobs[0].jobposting_url} >
                <Svgwhatjobs></Svgwhatjobs></a></Flex></Flex>
              
          }
        </Flex>
      }

      <CancelAndDeletePopup
        title={
          <Flex className={styles.popTitle}>
            <Text>
              This will remove the job posting from the careers page.
            </Text>
            <Text>Are you sure you want to Inactivate this job?</Text>
          </Flex>
        }
        btnDelete={hanldeInactiveDone}
        btnCancel={hanldeInactiveclose}
        btnRight={YES}
        open={isOpen}
        loader={isloading}
      />

      {/*<Modal open={isOpen}>
        <Flex  className={styles.modalOverAll}>
   
        <Flex >
          <Text>This will remove the job posting from the career page.
          </Text>
          <Text>Are you sure you want to Inactivate this job?
          </Text>
          </Flex>
               <Flex row middle  >
               <Button types="secondary" className={styles.margin10}>Cancel</Button>
               <Button onClick={hanldeInactiveDone} >Yes</Button>
          </Flex>
          </Flex>
       
      </Modal>*/}

    </Flex>
  );
};

export default JdViewScreen;