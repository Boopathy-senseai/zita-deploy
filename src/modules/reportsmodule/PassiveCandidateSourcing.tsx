import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { saveAs } from 'file-saver';
import { AppDispatch, RootState } from '../../store';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import Card from '../../uikit/Card/Card';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Button from '../../uikit/Button/Button';
import Chart from '../../uikit/Chart/Chart';
// import { pieYValue } from '../common/commonHelper';
// import { PRIMARY } from '../../uikit/Colors/colors';
import Table from '../../uikit/Table/Table';
import Toast from '../../uikit/Toast/Toast';
// import { colorCode } from '../constValue';
import Loader from '../../uikit/Loader/Loader';
import { passiveCandidate } from './tableHelper';
import {
	// ApplicantsSourceMiddleWare,
	passiveCandidateDataMiddleWare,
	passiveCandidateDownloadMiddleWare,
	// applicantSourceDownloadMiddleWare,
} from './store/middleware/reportsmiddleware';
import { Duration } from './mock';
import styles from './reports.module.css';

// const height = window.innerHeight - 150;
const PassiveCandidateReports = () => {
	const dispatch: AppDispatch = useDispatch();
	// const [isPie, setPie] = useState<any>([]);
	const [isJd, setJd] = useState<any>([]);
	const [isChart, setChart] = useState(false);

	type PassiveCandidate = {
		duration: string;
	};

	const initial: PassiveCandidate = {
		duration: 'Last 7 Days',
	};

	// useEffect(() => {
	// 	dispatch(ApplicantsSourceMiddleWare());
	// }, []);

	const { isLoading, add_on_dict } = useSelector(
		({ passiveCandidateDataReducers }: RootState) => ({
			isLoading: passiveCandidateDataReducers.isLoading,
			// jd_list: applicantsSourceReducers.jd_list,
			add_on_dict: passiveCandidateDataReducers.add_on_dict,
		}),
	);

	const formik = useFormik({
		initialValues: initial,
		onSubmit: () => {},
	});

	useEffect(() => {
		if (formik.values.duration !== '') {
			setJd(formik.values.duration);
			setChart(true);
			dispatch(
				passiveCandidateDataMiddleWare({
					duration: formik.values.duration,
				}) 
			).then((res)=>{
console.log(res,'192.168.3.253:8001192.168.3.253:8001192.168.3.253:8001192.168.3.253:8001192.168.3.253:8001')
			})
		}
	}, [formik.values]);

	const hanldeSubmitform = () => {
		dispatch(
			passiveCandidateDownloadMiddleWare({
				duration: isJd,
				download: '',
			}),
		).then((res) => {
			if (res.payload) {

				saveAs(`${res.payload.file_path}`, `${res.payload.file_name}`);

				dispatch(
					passiveCandidateDataMiddleWare({
						duration: isJd,
					}),
				);
				Toast('Report downloaded successfully', 'LONG', 'success');
			}
		});
	};

	console.log(add_on_dict);
	const addOnCountValue: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = chart['count'];
			return result;
		});
	const addOnApplicantValue: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = chart['applicant'] === null ? 0 : chart['applicant'];
			return result;
		});
	const addOnInvitedValue: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = chart['invited'] === null ? 0 : chart['invited'];
			return result;
		});
	const addOnUnlockedValue: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = chart['unlock'] === null ? 0 : chart['unlock'];
			return result;
		});
	const addOndName: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = chart['date'];
			return result;
		});
	const addOnAmountValue: any =
		add_on_dict &&
		add_on_dict.map((chart: any) => {
			const result: any = Number(chart['purchased_count']) * 2;
			return result;
		});
	const chartOptions = {
		chart: {
			type: 'column',
		},
		title: {
			text: '',
		},

		xAxis: {
			categories: addOndName,

			title: {
				text: 'Duration',
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Count',
			},
		},

		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0,
				dataLabels: {
					enabled: true,
				},
			},
		},
		series: [
			{
				name: 'Contact Credits',
				data: addOnCountValue,
			},
			{
				name: 'Applicant',
				data: addOnApplicantValue,
			},
			{
				name: 'Invited',
				data: addOnInvitedValue,
			},
			{
				name: 'Unlocked',
				data: addOnUnlockedValue,
			},
		],
	};
	const Options = {
		chart: {
			type: 'column',
		},
		title: {
			text: '',
		},

		xAxis: {
			categories: addOndName,

			title: {
				text: 'Sourced Date',
			},
		},
		yAxis: {
			title: {
				text: 'Amount',
			},
			stackLabels: {
				style: {
					color: 'black',
				},

				enabled: true,
				format: '<br>${total}<br>',
			},
		},
		plotOptions: {
			column: {
				stacking: 'normal',
				pointPadding: 0.3,
				groupPadding: 0,
				dataLabels: {
					enabled: false,
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
				data: addOnAmountValue,
			},
		],
	};

	const columns = useMemo(() => passiveCandidate(), [add_on_dict]);
	return (
		<Flex className={styles.overAll} height={window.innerHeight - 70}>
			{isLoading && <Loader />}
			<Flex>
				<Flex>
				<Flex row className={styles.ribbon} between>
				<Flex marginTop={9} marginLeft={8} >
				<Text size={16} bold color="theme" >
				Passive Candidate Sourcing Report
				</Text>

				</Flex>
				<Flex >

				<div className={styles.triangle}></div>
				</Flex>

			</Flex>
					
					<Text style={{ marginBottom: 5,marginTop:'10px',marginLeft:'5px' }}>
						Gives insights on the count about the unlocked contacts, invited
						candidates, applicants via invited list to analyze the passive
						candidate sourcing.
					</Text>
				</Flex>
				<Flex row className={styles.marginTop}>
					<Text  className={styles.selected}>
						Duration
					</Text>
					<div className={styles.skillContainer}>
						<SelectTag
							labelBold
							defaultValue={Duration[0]}
							options={Duration}
							placeholder="Select"
							onChange={(option) => {
								formik.setFieldValue('duration', option.value);
							}}
						/>
					</div>
					<Button
						onClick={hanldeSubmitform}
						disabled={add_on_dict && add_on_dict.length === 0}
					>
						Download Report
					</Button>
				</Flex>
				{add_on_dict && add_on_dict.length > 0 && isChart ? (
					<Flex style={{paddingLeft:'5px'}}>
						<Flex row>
							<Flex flex={6}>
								<Card className={styles.cardOverAllChart}>
									<Text bold size={14}>Passive Candidate Conversion</Text>
									<Text style={{ marginBottom: 20 }}>
										Insights: Count of unlocked candidates conversion as
										Applicants
									</Text>
									<Chart options={chartOptions} />
								</Card>
							</Flex>
							<Flex flex={6}>
								<Card className={styles.cardOverAllChart}>
									<Text bold size={14}>Amount Spent on Contact Credits</Text>{' '}
									<Text style={{ marginBottom: 20 }}>
										Insights: Total amount spent on purchasing contact credits
									</Text>
									<Chart options={Options} />
								</Card>
							</Flex>
						</Flex>
					</Flex>
				) : (
					<Flex className={styles.noData}>
						<Text bold>No Data Available</Text>
					</Flex>
				)}
				{add_on_dict && add_on_dict.length > 0 && isChart && (
					<Flex style={{marginLeft:'5px'}}>
						
							<Text bold style={{ margin: '20px 0px 5px 10px'}} size={14}>
								Report Data
							</Text>
							<Text  style={{ margin: '0px 0px 10px 10px'}}>
							A comprehensive data table showcasing count about the analyze of the passive candidate sourcing.
							</Text>
							
							<Table
								columns={columns}
								dataSource={add_on_dict}
								empty="No Data Available"
								scrollHeight={270}
								border="normal"
								fixedScrollHeight
							/>
					
					</Flex>
				)}
			</Flex>
		</Flex>
	);
};

export default PassiveCandidateReports;