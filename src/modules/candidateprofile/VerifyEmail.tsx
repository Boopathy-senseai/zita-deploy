import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { otpVerificationMiddleWare } from './store/middleware/candidateprofilemiddleware';
import styles from './verifyemail.module.css';

type Props = {
  open: boolean;
  cancel: () => void;
  close: () => void;
};
type ParamsType = {
  empId: string;
};

const VerifyEmail = ({ open, cancel, close }: Props) => {
  const { empId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    if (open) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const getMail = localStorage.getItem('companyMailId');

  const handleSubmit = (values: { otp: string }) => {
    dispatch(
      otpVerificationMiddleWare({ OTP: values.otp, 'emp-id': empId }),
    ).then((res) => {
      if (res.payload.success) {
        close();
      }
    });
  };

  const formik = useFormik({
    initialValues: { otp: '' },
    onSubmit: handleSubmit,
  });

  const checkTimer = minutes === 0 && seconds === 0;
  const resendOtp = checkTimer ? 'link' : 'gray';

  const handleResend = () => {
    if (checkTimer) {
      dispatch(
        otpVerificationMiddleWare({ resend: 'resend', 'emp-id': empId }),
      ).then((res) => {
        if (res.payload.success === 2) {
          Toast('resend otp');
          setMinutes(1);
          setSeconds(60);
        }
      });
    }
  };

  const emailId = getMail && getMail?.charAt(0)+'******@'+ getMail.split('@').pop();
  return (
    <Modal open={open}>
      <Flex columnFlex middle center className={styles.overAll}>
        <Text size={20} bold>
          Verify Email
        </Text>
        <Text className={styles.gmailText}>
          An OTP has been sent to the email id {emailId}
        </Text>
        <Text>
          Please enter your OTP to create your profile and apply for the job
        </Text>
        <InputText
          align="center"
          maxLength={8}
          value={formik.values.otp}
          className={styles.inputStyle}
          onChange={formik.handleChange('otp')}
        />
        <Button onClick={formik.handleSubmit}>Verify</Button>
        <Text className={styles.timeStyle}>
          {minutes}:{seconds}
        </Text>
        <Text className={styles.otpResend}>
          Disn’t receive OTP?{' '}
          <Text color={resendOtp} onClick={handleResend}>
            Resend OTP
          </Text>{' '}
          or
        </Text>
        <Text>
          Send OTP to new email{' '}
          <Text color="link" onClick={cancel}>
            ID Change email ID
          </Text>
        </Text>
      </Flex>
    </Modal>
  );
};

export default VerifyEmail;
