import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { onlyNumber } from '../constValue';
import {
  otpVerificationMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';
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
  const [loader, setLoader] = useState(false);
  const [isValidOtp, setValidOtp] = useState(false);

  useEffect(() => {
    setMinutes(1);
    setSeconds(60);
    setValidOtp(false);
  }, [open]);

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
// form submit
  const handleSubmit = (values: { otp: string }) => {
    setLoader(true);
    dispatch(
      otpVerificationMiddleWare({ OTP: values.otp, 'emp-id': empId }),
    ).then((res) => {
      if (res.payload.success) {
        close();
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
        setLoader(false);
        setValidOtp(false);
      } else if (res.payload.success === 0) {
        setValidOtp(true);
        // Toast('Invalid otp please enter a valid otp', 'LONG', 'error');
        setLoader(false);
      }
    });
  };

  const formik = useFormik({
    initialValues: { otp: '' },
    onSubmit: handleSubmit,
  });

  const checkTimer = minutes === 0 && seconds === 0;
  const resendOtp = checkTimer ? 'link' : 'gray';
// resend otp function
  const handleResend = () => {
    if (checkTimer) {
      formik.resetForm();
      setLoader(true);
      dispatch(
        otpVerificationMiddleWare({ resend: 'resend', 'emp-id': empId }),
      ).then((res) => {
        if (res.payload.success === 2) {
          Toast('OTP sent successfully');
          setMinutes(1);
          setSeconds(60);
        }
        setLoader(false);
      });
    }
  };

  const emailId =
    getMail && getMail?.charAt(0) + '******@' + getMail.split('@').pop();
  return (
    <Modal open={open}>
      {loader && <Loader />}
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
        <div>
          <InputText
            align="center"
            maxLength={8}
            value={formik.values.otp}
            className={styles.inputStyle}
            onChange={(e) => {
              if (e.target.value === '' || onlyNumber.test(e.target.value)) {
                formik.setFieldValue(`otp`, e.target.value);
              }
            }}
          />
          {isValidOtp && (
            <Text color="error" size={12}>
              Invalid otp please enter a valid otp
            </Text>
          )}
        </div>
        <Button
          onClick={formik.handleSubmit}
          disabled={formik.values.otp.length === 8 ? false : true}
          style={{ marginTop: 16 }}
        >
          Verify
        </Button>
        <Text className={styles.timeStyle}>
          0{minutes} : {9 >= Number(seconds) ? `0${seconds}` : seconds}
        </Text>
        <Text className={styles.otpResend}>
          {`Didn't receive OTP?`}{' '}
          <Text color={resendOtp} onClick={handleResend}>
            Resend OTP
          </Text>{' '}
          or
        </Text>
        <Text>
          Send OTP to new email ID{' '}
          <Text
            color="link"
            onClick={() => {
              cancel();
              formik.resetForm();
            }}
          >
            Change email ID
          </Text>
        </Text>
      </Flex>
    </Modal>
  );
};

export default VerifyEmail;
