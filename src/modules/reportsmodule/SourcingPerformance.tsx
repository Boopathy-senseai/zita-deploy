import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import { AppDispatch, RootState } from '../../store';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import SvgNoDataIcon from '../../icons/SvgNoDataIcon';
import Card from '../../uikit/Card/Card';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Button from '../../uikit/Button/Button';
import Chart from '../../uikit/Chart/Chart';
import Loader from '../../uikit/Loader/Loader';
import Table from '../../uikit/Table/Table';
import Toast from '../../uikit/Toast/Toast';
import InputRadio from '../../uikit/InputRadio/InputRadio';

import { sourcingPerformance } from './tableHelper';
import {
	sourcePerformanceMiddleWare,
	sourcePerformanceDataMiddleWare,
	sourcePerformanceDownloadMiddleWare,
} from './store/middleware/reportsmiddleware';
import { DurationType } from './mock';
import styles from './reports.module.css';

// const height = window.innerHeight - 150;
const SourcingPerformanceReport = () => {
	const dispatch: AppDispatch = useDispatch();

	type PassiveCandidate = {
		job: string;
		duration: string;
	};

	const initial: PassiveCandidate = {
		job: '',
		duration: 'Weekly',
	};

	useEffect(() => {
		dispatch(sourcePerformanceMiddleWare());
	}, []);

	const {
		jd_list,
		isLoading,
		isLoadingData,
		table,
		objectDict,
		perc_dict,
		applicants,
		total_count,
	} = useSelector(
		({
			sourcingPerformanceReducers,
			sourcingPerformanceDataReducers,
		}: RootState) => ({
			isLoading: sourcingPerformanceReducers.isLoading,
			jd_list: sourcingPerformanceReducers.jd_list,
			isLoadingData: sourcingPerformanceDataReducers.isLoading,
			table: sourcingPerformanceDataReducers.table,
			objectDict: sourcingPerformanceDataReducers.object1,
			perc_dict: sourcingPerformanceDataReducers.perc_dict,
			applicants: sourcingPerformanceDataReducers.applicants,
			total_count: sourcingPerformanceDataReducers.total_count,
		}),
	);

	const formik = useFormik({
		initialValues: initial,
		onSubmit: () => {},
	});

	useEffect(() => {
		if (formik.values.job !== '') {
			// setJobs(formik.values.job);
			dispatch(
				sourcePerformanceDataMiddleWare({
					jd_id: formik.values.job,
					duration: formik.values.duration,
				}),
			);
		}
	}, [formik.values]);

	const jobViewArray: any =
		jd_list &&
		jd_list.map((list) => {
			const result =
				list.id === 0
					? `${list.job_title}`
					: `${list.job_title} - ${list.job_id}`;
			const id = list.id === 0 ? `${list.job_title}` : `${list.id} `;
			return { value: id, label: result };
		});

	useEffect(() => {
			if (jobViewArray && jobViewArray.length !== 0  ) {
				console.log('jobViewArray[0].value',jobViewArray[0].value)
			formik.setFieldValue('job', jobViewArray[0].value)
			}
		}, [jd_list]);

	const jobViewWeekArray: any =
		objectDict &&
		objectDict[0].map((list: any) => {
			const result = list.label;
			return result;
		});

	const percDictArray: any =
		perc_dict &&
		perc_dict.map((list: any) => {
			const result = list.label;
			return result;
		});

	const applicantWeekArray: any =
		objectDict &&
		objectDict[1].map((list: any) => {
			const result = list.label;
			return result;
		});
	const applicantValue =
		objectDict &&
		objectDict[1].map((list: any) => {
			const result = list.y;
			return result;
		});

	const jobViewValue =
		objectDict &&
		objectDict[0].map((list: any) => {
			const result = list.y;
			return result;
		});
	const percDictValue =
		perc_dict &&
		perc_dict.map((list: any) => {
			const result = list.y;
			return result;
		});
	const options = {
		title: {
			text: null,
			style: {
				color: '#581845',
				fontWeight: 'bold',
			},
		},
		xAxis: {
			title: {
				text: '(Active) Job Posting Time',
			},
			categories:
				jobViewWeekArray?.length > applicantWeekArray?.length
					? jobViewWeekArray
					: applicantWeekArray,
		},
		yAxis: {
			title: {
				text: 'Counts',
			},
			min: 0,
		},
		legend: {
			align: 'center',
			verticalAlign: 'top',
		},
		series: [
			{
				name: 'Job Views',
				data: jobViewValue,
				color: '#4F81BC',
			},
			{
				name: 'Applicants',
				data: applicantValue,
				color: '#C0504E',
			},
		],
	};

	const optionsLine = {
		title: {
			text: null,
			style: {
				color: '#581845',
				fontWeight: 'bold',
			},
		},
		xAxis: {
			title: {
				text: '(Active) Job Posting Time',
			},
			categories: percDictArray,
		},
		yAxis: {
			title: {
				text: '% Conversion from Job Views to Applicants',
			},
			min: 0,
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
		legend: {
			align: 'center',
			enabled: false,
			verticalAlign: 'top',
		},
		series: [
			{
				name: 'Job Views',
				data: percDictValue,
				color: '#4F81BC',
			},
		],
	};

	// console.log(jobViewArray)

	const hanldeSubmitform = () => {
		dispatch(
			sourcePerformanceDownloadMiddleWare({
				jd_id: formik.values.job,
				duration: formik.values.duration,
				download: '',
			}),
		).then((res) => {
			if (res.payload) {
				saveAs(`${res.payload.file_path}`, `${res.payload.file_name}`);

				// dispatch(
				// 	sourcePerformanceDataMiddleWare({
				// 		jd_id: formik.values.job,
				// 		duration: formik.values.duration,
				// 	}),
				// );
				Toast('Report downloaded successfully', 'LONG', 'success');
			}
		});
	};
	const columns = useMemo(() => sourcingPerformance(), [table]);
	return (
		<Flex className={styles.overAll} height={window.innerHeight - 70}>
			{(isLoading || isLoadingData) && <Loader />}
			<Flex>
				<Flex>
				<Flex row className={styles.ribbon} between>
					<Flex marginTop={9} marginLeft={8} >
					<Text size={16} bold color="theme" >
					Sourcing Performance Report For Organic Applicants
					</Text>

					</Flex>
					<Flex >

					<div className={styles.triangle}></div>
					</Flex>

				</Flex>
					
					<Text style={{marginTop:'10px',marginLeft:'5px'}}>
						Gives insights on JD traffic in a specified duration of time. It
						will display the view count of JD on the company’s careers page and
						applicants with time-stamped.
					</Text>
				</Flex>

				<Flex row className={styles.marginTop}>
					<Flex flex={6}>  
  						<Flex row  style={{marginTop: '10px', display:"flex", alignItems:"center"}}>
							<Text  className={styles.selected}>
								Select Job
							</Text>
							<div className={styles.skillContainer}>
								<SelectTag
									labelBold
									value={
										jobViewArray
											? jobViewArray.find(
													(option: any) => Number(option.value) === Number(formik.values.job),
											  )
											: ''
									}
									options={jobViewArray}
									placeholder="Select"
									onChange={(option) => {
										formik.setFieldValue('job', option.value);
									}}
								/>
							</div>
							<Button
								disabled={table && table.length === 0}
								onClick={hanldeSubmitform}
							>
								Download Report
							</Button>
						</Flex>
						<div className={styles.radioAlign}>
							<Flex row wrap center>
								{DurationType.map((duration) => {
									return (
										<Flex
											row
											key={duration.value}
											className={styles.matchRadioStyle}
										>
											<InputRadio
												label={duration.value}
												checked={duration.label === formik.values.duration}
												onClick={() =>
													formik.setFieldValue('duration', duration.label)
												}
											/>
										</Flex>
									);
								})}
							</Flex>
						</div>
					</Flex>
					<Flex flex={6}>
						<Card className={styles.cardOverAllApplicant}>
							<Flex row>
								<Flex flex={4} className={styles.border}>
									<Text bold align={'center'}>
										Total Job Views
									</Text>
									{total_count && total_count.count__sum === null ? (
										<Text bold align={'center'} className={styles.countStyle}>
											0
										</Text>
									) : (
										<Text bold align={'center'} className={styles.countStyle}>
											{total_count && total_count.count__sum}
										</Text>
									)}
								</Flex>
								<Flex flex={4} className={styles.border}>
									<Text bold align={'center'}>
										Total Applicants
									</Text>
									{applicants && applicants === null ? (
										<Text bold align={'center'} className={styles.countStyle}>
											{applicants && applicants && applicants}
										</Text>
									) : (
										<Text bold align={'center'} className={styles.countStyle}>
											{applicants && applicants}
										</Text>
									)}
								</Flex>
								<Flex flex={4}>
									<Text bold align={'center'}>
										Percentage of Conversion
									</Text>
									{(total_count && total_count.count__sum === null) ||
									(total_count && total_count.count__sum === 0) ? (
										<Text bold align={'center'} className={styles.countStyle}>
											0%
										</Text>
									) : (
										<Text bold align={'center'} className={styles.countStyle}>
											{Math.round(
												(applicants && applicants / total_count.count__sum) *
													100,
											)}
											%
										</Text>
									)}
								</Flex>
							</Flex>
						</Card>
					</Flex>
				</Flex>
				{table && table.length > 0 ? (
					<Flex style={{paddingLeft:'5px'}}>
						<Flex row>
							<Flex flex={6}>
								<Card className={styles.cardOverAllChart}>
									<Text bold>Job Views & Applicants</Text>
									<Chart options={options} />
								</Card>
							</Flex>
							<Flex flex={6}>
								<Card className={styles.cardOverAllChart}>
									<Text bold>
										Percentage Conversion from Job Views to Applicants
									</Text>{' '}
									<Text style={{marginBottom:5}}>
										Insights: Conversion rate of Job views into Applicants
									</Text>
									<Chart options={optionsLine} />
								</Card>
							</Flex>
						</Flex>
						<Flex>
							<Flex>
								<Text bold style={{margin:'20px 0px 0px 10px'}}>Report Data</Text>
								<Text  style={{margin:'5px 0px 5px 10px'}}>A comprehensive data table showcasing count about the job views and applicant conversion rate.</Text>
								<Flex >
								
								<Table
									columns={columns}
									dataSource={table}
									empty="No Data Available"
									scrollHeight={270}
									
									border="normal"
									fixedScrollHeight
								/>
								</Flex >
							</Flex>
						</Flex>
					</Flex>
				) : (
					<Flex className={styles.noData} style={{display:"flex",marginTop:"150px"}}>
						<SvgNoDataIcon style={{marginBottom:"10px", filter:"opacity(0.6)"}} width={15}/>
						<Text bold color='gray'>No Data Available</Text>
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default SourcingPerformanceReport;