import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import { AppDispatch, RootState } from '../../store';
import Totalcount from '../../globulization/TotalCount';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Button from '../../uikit/Button/Button';
import Chart from '../../uikit/Chart/Chart';
import { pieYValue } from '../common/commonHelper';
import Loader from '../../uikit/Loader/Loader';
import Table from '../../uikit/Table/Table';
import Toast from '../../uikit/Toast/Toast';
import Pangination from '../../uikit/Pagination/Pangination';

import { getBlur, getFocus,getDateString } from '../../uikit/helper';
// import { colorCode } from '../constValue';
import { jobMetrics } from './tableHelper';
import {

	jobMetricsMiddleWare,
	jobMetricsChartMiddleWare,
	jobMetricsDownloadMiddleWare,
jobMetricsChartDownloadMiddleWare
} from './store/middleware/reportsmiddleware';
import { JobMetrics } from './mock';
import styles from './reports.module.css';

// const height = window.innerHeight - 150;
const JobMetricsReports = () => {
	const dispatch: AppDispatch = useDispatch();
	const [isJobs, setJobs] = useState<any>([]);
	const [isJdId, setJdId] = useState<any>([]);
	const [isPage, setPage] = useState(0);
	const [isJd, setJd] = useState(false);
	 const [isRowIndex, setRowIndex] = useState<number>();

	type PassiveCandidate = {
		job: string;
	};

	const initial: PassiveCandidate = {
		job: 'All',
	};

	useEffect(() => {
		setJobs('All');
		dispatch(jobMetricsMiddleWare({job:'All',page:1}));
	}, []);

	const { job_list, isLoading,jobList,job_list_dict,len_list } = useSelector(
		({ jobMetricsDataReducers, jobMetricsChartReducers }: RootState) => ({
			jobList: jobMetricsChartReducers.job_list,
			job_list_dict: jobMetricsChartReducers.job_list_dict,
			len_list: jobMetricsDataReducers.len_list,
			// jd_list: applicantsSourceReducers.jd_list,
			job_list: jobMetricsDataReducers.job_list,
			isLoading: jobMetricsDataReducers.isLoading,
		}),
	);

	const formik = useFormik({
		initialValues: initial,
		onSubmit: () => {},
	});

	useEffect(() => {
		if (formik.values.job !== '') {
			setJobs(formik.values.job);
			setJd(false);
			dispatch(
				jobMetricsMiddleWare({
					job: formik.values.job,
					page:isPage+1
				}),
			);
		}
	}, [formik.values,isPage]);


	  const usersPerPage = 10;
  const pageCount = Math.ceil(len_list / usersPerPage);

 const handleSetPagination = (a: number) => {
    setPage(a);
    if (job_list&& job_list.length !== 0) {
      getFocus('jobMetrics___input');
      getBlur('jobMetrics___input');
    }
  };


	const hanldeJobform = (jobID: string) => {
		setJd(true);
		setJdId(jobID);
		dispatch(
			jobMetricsChartMiddleWare({
				jd_id: jobID,
			}),
		);
	};

// 	useEffect(() => {

// formik.setFieldValue('job', 'All');
// 	} ,[isPage])


const hanldeJobListform = () => {
		dispatch(
			jobMetricsDownloadMiddleWare({
				job: isJobs,
				download: '',
			}),
		).then((res) => {
			if (res.payload) {
				saveAs(`${res.payload.file_path}`, `${res.payload.file_name}`);

				
				Toast('Report downloaded successfully', 'LONG', 'success');
			}
		});
	};


	const hanldeJobIdform = () => {
		dispatch(
			jobMetricsChartDownloadMiddleWare({
				jd_id: isJdId,
				download: '',
			}),
		).then((res) => {
			if (res.payload) {
				saveAs(`http://${res.payload.file_path}`, `${res.payload.file_name}`);

				dispatch(
					jobMetricsChartMiddleWare({
						jd_id: isJdId,
					}),
				);
				Toast('Report downloaded successfully', 'LONG', 'success');
			}
		});
	};
    	 const Options = {
    title: {
      text: null,
    },
    plotOptions: {
      series: {
        pointPadding: 0.3,
            groupPadding: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y}',
        },
      },
    },
    xAxis: {
     categories: ['Zita Match', 'Invited to Apply', 'Not Interested', 'Applicants', 'Shortlisted', 'Offered', 'Rejected',]
    },
    yAxis: {
      title: {
        text: 'Counts',
      },
    },
    series: [
      {
        type: 'column',
        colorByPoint: true,
        data: [
        job_list_dict && pieYValue(job_list_dict.Zita_Match),
        job_list_dict && pieYValue(job_list_dict.Invited_to_Apply),
        job_list_dict && pieYValue(job_list_dict.Not_Interested),
        job_list_dict && pieYValue(job_list_dict.Applicants),
        job_list_dict && pieYValue(job_list_dict.Shortlisted),
        job_list_dict && pieYValue(job_list_dict.Qualified),
        job_list_dict && pieYValue(job_list_dict.Disqualified),
        ],
        showInLegend: false,
      },
    ],
  };

	// console.log(jobList, '======', job_list);
	const columns = useMemo(() => jobMetrics(hanldeJobform,setRowIndex), [job_list]);
	return (
		<Flex className={styles.overAll} height={window.innerHeight - 70}>
			{isLoading && <Loader />}
			<Flex>
				<Flex>
				<Flex row className={styles.ribbon} between>
				<Flex marginTop={9} marginLeft={8} >
				<Text size={18} bold color="theme" >
				Job Metrics
				</Text>

				</Flex>
				<Flex >

				<div className={styles.triangle}></div>
				</Flex>
				</Flex>
					<Text style={{margin:'10px 0px 10px 5px'}}>
						Analyse your jobs together/individually. The reports go a long way
						in providing useful data such as the number of views and candidates
						in the pipeline for each job, the number of offered & rejected
						candidates.
					</Text>
				</Flex>
				<Text bold size={14} style={{marginLeft:'5px'}}>
					Overall Job Metrics
				</Text>
				<Flex row className={styles.marginTop1} style={{marginLeft:'5px'}}>
					<Text  className={styles.selected}>
						Filter By
					</Text>
					<div className={styles.skillContainer}>
						<SelectTag
						defaultValue={JobMetrics[0]}
							labelBold
							options={JobMetrics}
							placeholder="Select"
							onChange={(option) => {
								formik.setFieldValue('job', option.value);
							}}
						/>
					</div>
					<Button  onClick={hanldeJobListform} disabled={len_list===0}>Download Report</Button>
				</Flex>
				{job_list && job_list.length > 0 && (
					<Flex >
					
					<Flex style={{marginLeft:'5px'}}>
					<Totalcount 
					name="Total Jobs Found "
					numbers={len_list}
				    />
					</Flex>
										<input
                          className={styles.inputNone}
                          id="jobMetrics___input"
                        />			
							<Table
								columns={columns}
								dataSource={job_list}
								empty="No Data Available"
								// scrollHeight={270}
								border="normal"
								fixedScrollHeight
								rowFocusIndex={isRowIndex}
							/>
					
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

				)}
				{len_list === 0 && (
				<Text className={styles.reportsJobMetrics}>
					No Data Available
				</Text>
				)}
			</Flex>

			{isJd && (
				<Flex style={{marginLeft:'5px'}}>
				<Card className={styles.cardOverAllApplicant} >
					<Flex>
					<Flex row between style={{marginTop:'16px'}}>
						<Flex style={{marginLeft:'3px'}}>
						<Text bold size={14} >Detailed Metrics</Text>
						<Text style={{marginTop:'0px',marginBottom:'10px'}} >
						A comprehensive data table showcasing count about the candidates & applicants for selected job.
						</Text>
						</Flex>


						<Button onClick={hanldeJobIdform}> Download Report</Button>
					</Flex>
					
						<Flex row>
							<Flex flex={4} className={styles.chartStyle}>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Job Title</Text>
									</Flex>
									<Flex flex={6}>
										<Text>{jobList&& jobList.job_title}</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Job ID</Text>
									</Flex>
									<Flex flex={6}>
										<Text>{jobList&& jobList.job_id}</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Location</Text>
									</Flex>
									<Flex flex={6}>
										<Text>
											{jobList&& jobList.city_name}, {jobList&& jobList.state_name},{' '}
											{jobList&& jobList.country_name}
										</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Posted On</Text>
									</Flex>
									<Flex flex={6}>
										<Text>{jobList&& getDateString(jobList.job_posted_on, 'll')}</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Status</Text>
									</Flex>
									<Flex flex={6}>
										<Text>{jobList&& jobList.jd_status__value}</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>No of Vacancies</Text>
									</Flex>
									<Flex flex={6}>
										<Text>{jobList&& jobList.no_of_vacancies}</Text>
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Zita Match</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Zita_Match === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Zita_Match}</Text>
										)}
									</Flex>
								</Flex>

								<Flex row>
									<Flex flex={6}>
										<Text bold>Invited to Apply</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Invited_to_Apply === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Invited_to_Apply}</Text>
										)}
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Not Interested</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Not_Interested === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Not_Interested}</Text>
										)}
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Applicants</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Applicants === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Applicants}</Text>
										)}
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Shortlisted</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Shortlisted === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Shortlisted}</Text>
										)}
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Offered</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Qualified === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Qualified}</Text>
										)}
									</Flex>
								</Flex>
								<Flex row>
									<Flex flex={6}>
										<Text bold>Rejected</Text>
									</Flex>
									<Flex flex={6}>
										{jobList&& jobList.Disqualified === null ? (
											<Text>0</Text>
										) : (
											<Text>{jobList&& jobList.Disqualified}</Text>
										)}
									</Flex>
								</Flex>
							</Flex>
							<Flex flex={8}>
							{(jobList&& jobList.Applicants !== null) || (jobList&& jobList.Zita_Match !== null) ||(jobList&& jobList.Invited_to_Apply !== null) ? (
								<Chart options={Options}/>
								):(
								<Flex className={styles.noData}>
											<Text bold>No Data Available</Text>
										</Flex>
								)}
							</Flex>
						</Flex>
					</Flex>
				</Card>
			</Flex>

			)}
			{!isJd && len_list !== 0 && (
<Card className={styles.cardOverAllApplicant}>
			<Flex>
			{len_list !== 0 && (
	<Text className={styles.reportsJobMetrics}>
		Click on the job from the table to view the report
	</Text>
			)}
				{len_list === 0 && (
	<Text className={styles.reportsJobMetrics}>
		No Data Available
	</Text>
			)}
</Flex>
</Card>
	)}
		</Flex>
	);
};

export default JobMetricsReports;