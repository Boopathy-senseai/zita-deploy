import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Text from '../..//../uikit/Text/Text';
import Flex from '../..//../uikit/Flex/Flex';
import Card from '../..//../uikit/Card/Card';
import InputSwitch from '../..//../uikit/Switch/InputSwitch';
import SvgInfo from '../..//../icons/SvgInfo';
import Loader from '../../../uikit/Loader/Loader';
import styles from './email.module.css';
import {
	emailPreferenceMiddleWare,
	emailPreferencePostMiddleWare,
} from './store/middleware/emailnotificationmiddleware';

const EmailNotifications = () => {
	const dispatch: AppDispatch = useDispatch();
	const [isload, setload] = useState(false);
	const [isstage0, setstage0] = useState(true);
	const [isstage1, setstage1] = useState(true);
	const [isstage2, setstage2] = useState(true);
	const [isstage3, setstage3] = useState(true);
	const [isstage4, setstage4] = useState(true);
	const [isstage5, setstage5] = useState(true);
	const [isstage6, setstage6] = useState(true);
	const [isstage7, setstage7] = useState(true);
	const [isstage8, setstage8] = useState(true);

	useEffect(() => {
		dispatch(emailPreferenceMiddleWare());
	}, []);

	const { isLoading, email_preferences } = useSelector(
		({ emailNotificationReducers }: RootState) => ({
			isLoading: emailNotificationReducers.isLoading,
			email_preferences: emailNotificationReducers.email_preferences,
		}),
	);

	const hanldeSubmitform = (stageid: string, isActive: string) => {
		setload(true);
		const formData = new FormData();
		if (stageid === '1') {
			if (isstage0) {
				setstage0(false);
			} else {
				setstage0(true);
			}
		} else if (stageid === '2') {
			if (isstage1) {
				setstage1(false);
			} else {
				setstage1(true);
			}
		} else if (stageid === '3') {
			if (isstage2) {
				setstage2(false);
			} else {
				setstage2(true);
			}
		} else if (stageid === '4') {
			if (isstage3) {
				setstage3(false);
			} else {
				setstage3(true);
			}
		} else if (stageid === '5') {
			if (isstage4) {
				setstage4(false);
			} else {
				setstage4(true);
			}
		} else if (stageid === '6') {
			if (isstage5) {
				setstage5(false);
			} else {
				setstage5(true);
			}
		} else if (stageid === '7') {
			if (isstage6) {
				setstage6(false);
			} else {
				setstage6(true);
			}
		} else if (stageid === '8') {
			if (isstage7) {
				setstage7(false);
			} else {
				setstage7(true);
			}
		} else if (stageid === '9') {
			if (isstage8) {
				setstage8(false);
			} else {
				setstage8(true);
			}
		}

		formData.append('stage_id', stageid);
		formData.append('is_active', isActive);
		dispatch(
			emailPreferencePostMiddleWare({
				formData,
			}),
		).then((res: any) => {
			if (res.payload.data.success) {
				dispatch(emailPreferenceMiddleWare());
			}
		});
		setload(false);
	};

	useEffect(() => {
		for (let i in email_preferences) {
			if (email_preferences[i].stage_id.toString() === '1') {
				if (!email_preferences[i].is_active) {
					setstage0(false);
				} else {
					setstage0(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '2') {
				if (!email_preferences[i].is_active) {
					setstage1(false);
				} else {
					setstage1(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '3') {
				if (!email_preferences[i].is_active) {
					setstage2(false);
				} else {
					setstage2(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '4') {
				if (!email_preferences[i].is_active) {
					setstage3(false);
				} else {
					setstage3(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '5') {
				if (!email_preferences[i].is_active) {
					setstage4(false);
				} else {
					setstage4(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '6') {
				if (!email_preferences[i].is_active) {
					setstage5(false);
				} else {
					setstage5(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '7') {
				if (!email_preferences[i].is_active) {
					setstage6(false);
				} else {
					setstage6(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '8') {
				if (!email_preferences[i].is_active) {
					setstage7(false);
				} else {
					setstage7(true);
				}
			} else if (email_preferences[i].stage_id.toString() === '9') {
				if (!email_preferences[i].is_active) {
					setstage8(false);
				} else {
					setstage8(true);
				}
			}
		}
	}, [email_preferences]);

	console.log('email_preferences',email_preferences)
	return (
		<Card className={styles.cardOverAll}>
			{isload || (isLoading && <Loader />)}
			<Flex>
				<Text bold size={16}>
					Set your preferences for email notifications
				</Text>
				<Text>
					Control how you hear from us for your activities inside Zita.
				</Text>
			</Flex>

			<Flex row className={styles.marginTop}>
				<Flex flex={3}> </Flex>
				<Flex flex={6}>
					<Text bold size={16}>
						Email Description
					</Text>
				</Flex>
				<Flex flex={4}>
					<Text bold size={16}>
						Email Status
					</Text>
				</Flex>
			</Flex>
			<Flex row>
				<Flex flex={3}>
					<Text bold className={styles.content}>
						Create & Manage Account
					</Text>
				</Flex>
				<Flex flex={6}>
					<Text className={styles.content}>
						We’ll send you emails during account creation, Reset passwords, etc.
					</Text>
					<Flex row>
						<div style={{ marginTop: -1 }}>
							<SvgInfo height={18} width={18} />
						</div>
						<Text style={{ marginLeft: 10 }}>
							{' '}
							These emails are mandatory, cannot be disabled.
						</Text>
					</Flex>
				</Flex>
				<Flex flex={4}>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label="On"
							disabled
							checked={isstage0}
							onClick={() =>
								isstage0 === true
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[0].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[0].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
				</Flex>
			</Flex>
			<Flex row>
				<Flex flex={10}>
					<div className={styles.Line6}></div>
				</Flex>
				<Flex flex={2}> </Flex>
			</Flex>
			<Flex row>
				<Flex flex={3}>
					<Text bold className={styles.content}>
						Subscription Purchase & Reminders
					</Text>
				</Flex>
				<Flex flex={6}>
					<Text className={styles.content}>
						We’ll send an email when a trial or plan is purchased or upgraded.
					</Text>
					<Text className={styles.content}>
						We’ll remind you regarding the free trial and subscription expiry.
					</Text>
					<Text className={styles.content}>
						We’ll send an email when you cancel the subscription.
					</Text>
				</Flex>
				<Flex flex={4}>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage1 ? 'On' : 'Off'}
							checked={isstage1}
							onClick={() =>
								isstage1
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[1].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[1].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage2 ? 'On' : 'Off'}
							checked={isstage2}
							onClick={() =>
								isstage2
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[2].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[2].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage3 ? 'On' : 'Off'}
							checked={isstage3}
							onClick={() =>
								isstage3
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[3].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[3].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
				</Flex>
			</Flex>
			<Flex row>
				<Flex flex={10}>
					<div className={styles.Line6}></div>
				</Flex>
				<Flex flex={2}>{''}</Flex>
			</Flex>
			<Flex row>
				<Flex flex={3}>
					<Text bold className={styles.content}>
						Purchase Receipts
					</Text>
				</Flex>
				<Flex flex={6}>
					<Text className={styles.content}>
						We’ll send you receipts during the Add-on purchase.
					</Text>
					<Flex row>
						<div style={{ marginTop: -1 }}>
							<SvgInfo height={18} width={18} />
						</div>
						<Text style={{ marginLeft: 10 }}>
							{' '}
							This email is mandatory, cannot be disabled.
						</Text>
					</Flex>
				</Flex>
				<Flex flex={4}>
					<div className={styles.content} style={{ marginLeft: 22 }}>
							<InputSwitch
							label='On'
							checked={true}
							disabled
						/>
					</div>
				</Flex>
			</Flex>
			<Flex row>
				<Flex flex={10}>
			
					<div className={styles.Line6}></div>
				</Flex>
				<Flex flex={2}>{''}</Flex>
			</Flex>
			<Flex row>
				<Flex flex={3}>
					<Text bold className={styles.content}>
						Jobs
					</Text>
				</Flex>
				<Flex flex={6}>
					<Text className={styles.content}>
						We’ll send an email when you or your teammates post a job.
					</Text>
					<Text className={styles.content}>
						We’ll send an email when you or your teammates inactivate a job.
					</Text>
				</Flex>
				<Flex flex={4}>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						
						<InputSwitch
							label={isstage4 ? 'On' : 'Off'}
							checked={isstage4}
							// disabled
							onClick={() =>
								isstage4
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[4].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[4].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage5 ? 'On' : 'Off'}
							checked={isstage5}
							onClick={() =>
								isstage5
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[5].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[5].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
				</Flex>
			</Flex>
			<Flex row>
				<Flex flex={10}>
					<div className={styles.Line6}></div>
				</Flex>
				<Flex flex={2}>{''}</Flex>
			</Flex>
			<Flex row>
				<Flex flex={3}>
					<Text bold className={styles.content}>
						Candidates Sourcing
					</Text>
				</Flex>
				<Flex flex={6}>
					<Text className={styles.content}>
						We’ll send a status email on the bulk candidate importing process.
					</Text>
					<Text className={styles.content}>
						We’ll send an email to the candidate when you invite them to apply
						for a job.
					</Text>
					<Flex row>
						<div style={{ marginTop: -1 }}>
							<SvgInfo height={18} width={18} />
						</div>
						<Text style={{ marginLeft: 10 }}>
							{' '}
							These emails are mandatory, cannot be disabled.
						</Text>
					</Flex>
				</Flex>
				<Flex flex={4}>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage6 ? 'On' : 'Off'}
							checked={isstage6}
							onClick={() =>
								isstage6
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[6].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[6].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
					<div className={styles.content} style={{ marginLeft: 22 }}>
						<InputSwitch
							label={isstage7 ? 'On' : 'Off'}
							checked={isstage7}
							disabled
							onClick={() =>
								isstage7
									? email_preferences &&
									  hanldeSubmitform(
											email_preferences[7].stage_id.toString(),
											'0',
									  )
									: email_preferences &&
									  hanldeSubmitform(
											email_preferences[7].stage_id.toString(),
											'1',
									  )
							}
						/>
					</div>
				</Flex>
			</Flex>
		</Card>
	);
};

export default EmailNotifications;
