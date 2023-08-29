import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import { style } from '@mui/system';
import { AppDispatch, RootState } from '../../store';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import SvgTick from '../../icons/SvgTick';
import SvgNoDataIcon from '../../icons/SvgNoDataIcon';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Button from '../../uikit/Button/Button';
import Chart from '../../uikit/Chart/Chart';
import { pieYValue } from '../common/commonHelper';
import Loader from '../../uikit/Loader/Loader';
import Table from '../../uikit/Table/Table';
import Toast from '../../uikit/Toast/Toast';
import { colorCode } from '../constValue';
import { tableFun } from './tableHelper';
import {
  ApplicantsSourceMiddleWare,
  applicantSourceDataMiddleWare,
  applicantSourceDownloadMiddleWare,
} from './store/middleware/reportsmiddleware';
import styles from './reports.module.css';

const ApplicantReports = () => {
  const dispatch: AppDispatch = useDispatch();

  const [isJd, setJd] = useState<any>([]);
  const [isChart, setChart] = useState(false);
  type ApplicantReport = {
    job_id: string;
  };

  const initial: ApplicantReport = {
    job_id: 'All',
  };

  useEffect(() => {
    dispatch(ApplicantsSourceMiddleWare());
  }, []);

  const { jd_list, isLoading, piechart, shortlisted, table } = useSelector(
    ({
      applicantsSourceReducers,
      applicantsSourceDataReducers,
    }: RootState) => ({
      isLoading: applicantsSourceReducers.isLoading,
      jd_list: applicantsSourceReducers.jd_list,
      piechart: applicantsSourceDataReducers.pie_chart,
      shortlisted: applicantsSourceDataReducers.shortlisted,
      table: applicantsSourceDataReducers.table,
    }),
  );

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (formik.values.job_id !== '') {
      setJd(formik.values.job_id);
      setChart(true);
      dispatch(
        applicantSourceDataMiddleWare({
          jd_id: formik.values.job_id,
        }),
      );
    }
  }, [formik.values]);

  const hanldeSubmitform = () => {
    dispatch(
      applicantSourceDownloadMiddleWare({
        jd_id: isJd,
        download: '',
      }),
    ).then((res) => {
      if (res.payload) {
        saveAs(`${res.payload.file_path}`, `${res.payload.file_name}`);

        Toast('Report downloaded successfully', 'LONG', 'success');
      }
    });
  };

  // var piechartList = [];

  const piechartArray: any =
    piechart &&
    piechart.map((chart: any) => {
      const result: any = Object.keys(chart);
      return { name: result[0], y: pieYValue(Object.values(chart)[0]) };
    });

  const shortlistedName: any =
    shortlisted &&
    shortlisted.map((chart: any) => {
      const result: any = Object.keys(chart);
      return result[0];
    });

  const shortlistedValue: any =
    shortlisted &&
    shortlisted.map((chart: any) => {
      return pieYValue(Object.values(chart)[0]);
    });
  const jobViewArray: any =
    jd_list &&
    jd_list.map((list) => {
      const result =
        list.id === 0
          ? `${list.job_title} Jobs`
          : `${list.job_title} - ${list.job_id}`;
      const id = list.id === 0 ? `${list.job_title}` : `${list.id} `;
      return { value: id, label: result };
    });

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
      style: {
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.y}%',
        },
        colors: colorCode,
        showInLegend: true,
      },
    },
    series: [
      {
        name: 'Roles',
        data: piechartArray,
      },
    ],
  };

  const chartOptions = {
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        pointPadding: 0.3,
        groupPadding: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}%',
        },
      },
    },
    xAxis: {
      categories: shortlistedName,
      title: {
        text: 'Channels',
      },
    },
    yAxis: {
      title: {
        text: 'Shortlisted %',
      },
    },
    series: [
      {
        type: 'column',
        colorByPoint: true,
        data: shortlistedValue,
        showInLegend: false,
      },
    ],
  };
  // console.log(isChart, shortlisted);
  const columns = useMemo(() => tableFun(), [table]);
  return (
    <>
      <Flex row className={styles.ribbon} between>
        <Flex marginTop={9} marginLeft={8}>
          <Text size={16} bold color="theme">
            Applicants Sourcing Reports
          </Text>
        </Flex>
        <Flex>
          <div className={styles.triangle}></div>
        </Flex>
      </Flex>
      <Flex className={styles.overAll}>
        {isLoading && <Loader />}

        <Flex></Flex>
        {/* <Flex className={styles.reportscroll}> */}
        <Text style={{ margin: '10px 0px', paddingLeft: '5px' }}>
          Get insights about applicants from sourcing platforms or job boards.
          Each section/graph/chart will explain how they performed in applicant
          sourcing from either one or multiple jobs together.
        </Text>
        <Flex row className={styles.marginTop} center>
          <Text className={styles.selected}>Select Job</Text>
          <div className={styles.skillContainer}>
            <SelectTag
              labelBold
              value={
                jobViewArray
                  ? jobViewArray.find(
                      (option: any) => option.value === formik.values.job_id,
                    )
                  : ''
              }
              options={jobViewArray}
              placeholder="Select"
              onChange={(option) => {
                formik.setFieldValue('job_id', option.value);
              }}
            />
          </div>
          <Button onClick={hanldeSubmitform} disabled={table.length === 0}>
            Download Report
          </Button>
        </Flex>
        {piechart && piechart.length > 0 && isChart ? (
          <Flex style={{ paddingLeft: '5px' }}>
            <Flex row>
              <Flex flex={6}>
                <Card className={styles.cardOverAllChart}>
                  <Text bold size={14}>
                    Applicants by Source
                  </Text>
                  <Chart options={options} />
                </Card>
              </Flex>
              <Flex flex={6}>
                <Card className={styles.cardOverAllChart}>
                  <Text bold size={14}>
                    Shortlisted Rate
                  </Text>{' '}
                  <Text style={{ marginBottom: 10 }}>
                    Insights: Shortlisted rate from total applicants by source
                  </Text>{' '}
                  {shortlisted &&
                  shortlisted !== null &&
                  shortlisted.length !== 0 ? (
                    <Chart options={chartOptions} />
                  ) : (
                    <Flex center middle className={styles.noData}>
                      <Flex
                        style={{ justifyContent: 'center', marginBotto: '2px' }}
                      >
                        <SvgNoDataIcon width={16} height={16} fill={'#888'} />
                      </Flex>
                      <Text color="placeholder">No data available</Text>
                    </Flex>
                  )}
                </Card>
              </Flex>
            </Flex>
          </Flex>
        ) : (
          <Flex
            center
            middle
            className={styles.noData}
            style={{ marginTop: '10%', marginBottom: '10%' }}
          >
            {' '}
            <Flex style={{ justifyContent: 'center', marginBotto: '2px' }}>
              <SvgNoDataIcon width={16} height={16} fill={'#888'} />
            </Flex>
            <Text color="placeholder">No data available</Text>
          </Flex>
        )}
        {table && table.length > 0 && (
          <Flex style={{ paddingTop: '15px' }}>
            <Flex>
              <Text bold style={{ margin: '10px 0px 5px 10px' }} size={14}>
                Report Data
              </Text>
              <Text style={{ margin: '0px 0px 5px 10px' }}>
                A comprehensive data table showcasing applicants count from
                sourcing platforms or job boards.
              </Text>
              <Table
                columns={columns}
                dataSource={table}
                empty="No data available"
                scrollHeight={270}
                border="normal"
                fixedScrollHeight
              />
            </Flex>
          </Flex>
        )}
        {/* </Flex> */}
      </Flex>
    </>
  );
};

export default ApplicantReports;
