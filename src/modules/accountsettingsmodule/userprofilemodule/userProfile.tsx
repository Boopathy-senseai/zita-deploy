import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import { AppDispatch, RootState } from '../../../store';
import Text from '../..//../uikit/Text/Text';
import Flex from '../..//../uikit/Flex/Flex';
import Card from '../..//../uikit/Card/Card';
import InputText from '../..//../uikit/InputText/InputText';
import { isEmpty } from '../../../uikit/helper';
import Modal from '../../../uikit/Modal/Modal';
// import {
//   THIS_FIELD_REQUIRED,
//   mediaPath,
//   checkUpperCase,
//   specialCharacter,
// } from '../../constValue';
import Button from '../..//../uikit/Button/Button';
import Loader from '../../../uikit/Loader/Loader';
import Toast from '../../../uikit/Toast/Toast';
import { ErrorMessages } from '../../Login/SetNewPassword';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgCloseSmall from '../..//../icons/SvgCloseSmall';
import SvgUpload from '../..//../icons/SvgUpload';

import SvgView from '../../../icons/SvgView';
import {
  FILE_2MB,
  imageFileAccept,
  THIS_FIELD_REQUIRED,
  mediaPath,
  checkUpperCase,
  specialCharacter,
} from '../..//../modules/constValue';
import useUnsavedChangesWarning from '../../common/useUnsavedChangesWarning';
import styles from './userprofile.module.css';
import {
  
  passwordChangeMiddleWare,
} from './store/middleware/userprofilemiddleware';

type Props = {
  
  value:boolean;
  update: () => void;
};
const UserProfilepic = ({ value,update }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef<any>([]);
  const [fileurl, setFileurl] = useState<any>([]);
  const [islogo, setlogo] = useState<any>([]);
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowNewPass1, setShowNewPass1] = useState(false);
  const [isShowOldPass, setShowOldPass] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isError, setError] = useState(false);
  const [isload, setload] = useState(false);
  const [isPassButton, setPassButton] = useState(true);
  const [isButton, setButton] = useState(true);
  const [modelopen, setmodelopen] = useState(false);
  const [formempty,setformempty] =  useState<any>([]);
  const [isMb, setMb] = useState(false);

  type Password = {
    oldpassword: string;
    newpassword1: string;
    newpassword2: string;
  };

  const initialPassword: Password = {
    oldpassword: '',
    newpassword1: '',
    newpassword2: '',
  };

  
  const handlePasswordValid = (values: Password) => {
    const errors: Partial<Password> = {};
   
    if (isEmpty(values.oldpassword)) {
      errors.oldpassword = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.newpassword1)) {
      errors.newpassword1 = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.newpassword2)) {
      errors.newpassword2 = THIS_FIELD_REQUIRED;
    }
    if (values.newpassword1 !== values.newpassword2) {
      errors.newpassword2 = ``;
    }
    return errors;
  };

  const errorMsg = `The two password fields didn't match.`;
  
  //   });
  // };

  const hanldePasswordSubmitform = (values: Password) => {
    setload(true);
    const formData = new FormData();
    formData.append('old_password', values.oldpassword);
    formData.append('new_password1', values.newpassword1);
    formData.append('new_password2', values.newpassword2);

    dispatch(
      passwordChangeMiddleWare({
        formData,
      }),
    ).then((res: any) =>  { 
      if (res.payload.data.success) {
        Toast('Password changed successfully', 'LONG', 'success');
        setError(false);
        setload(true);
      

        formikPassword.resetForm();
      }
      else{
        setError(true);
      }
    });
    
    // onPristine();
    setload(false);
     
  };

  // const formik = useFormik({
  //   initialValues: initial,
  //   onSubmit: (values) => hanldeSubmitform(values),
  //   validate: handleUserProfileValid,
  // });

  const formikPassword = useFormik({
    initialValues: initialPassword,
    onSubmit: (values) => hanldePasswordSubmitform(values),
    validate: handlePasswordValid,
  });
  const checkOne =
    !isEmpty(formikPassword.values.newpassword1) &&
    !checkUpperCase.test(formikPassword.values.newpassword1);

  const checkTwo =
    !isEmpty(formikPassword.values.newpassword1) &&
    (formikPassword.values.newpassword1.length < 8 ||
      formikPassword.values.newpassword1.length > 12);

  const isCheckThre =
    !isEmpty(formikPassword.values.newpassword1) &&
    !specialCharacter.test(formikPassword.values.newpassword1);

  const isValid =
    checkOne === false && checkTwo === false && isCheckThre === false
      ? false
      : true;

  // useEffect(() => {
  //   if (user) {
  //     formik.setFieldValue('firstname', user.first_name);
  //     formik.setFieldValue('lastname', user.last_name);
  //     formik.setFieldValue('username', user.username);
  //     formik.setFieldValue('email', user.email);
  //   }
  // }, [user]);

  useEffect(() => {
    if (
      formikPassword.values.newpassword1.length > 0 ||
      formikPassword.values.newpassword2.length > 0 ||
      formikPassword.values.oldpassword.length > 0
    )
      setPassButton(false);
  }, [formikPassword.values]);

  const reset = () => {
    ref.current.value = '';
    setlogo('');
    setButton(false);
    setFileurl({});
    setShow(false);
  };

  const redirectHome = (values: Password) => {
    // history.push('/account_setting/settings');
   /// setmodelopen(false)
   console.log("sd",update())
   formikPassword.resetForm();
  //  formikPassword.setFieldValue('oldpassword', '');
  //  formikPassword.setFieldValue('newpassword1', '');
  //  formikPassword.setFieldValue('newpassword2', '');
  //  const errors: Partial<Password> = {};
  //       if (isEmpty(values.oldpassword)) {
  //         errors.oldpassword = '';
  //       }
  //       if (isEmpty(values.newpassword1)) {
  //         errors.newpassword1 ='';
  //       }
  //       if (isEmpty(values.newpassword2)) {
  //         errors.newpassword2 ='';
  // };
}




    

  // const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();
  return (
    <Flex>
      
      
      <Modal open={value} >
        <Flex className={styles.model} style={{ width: '600px' }}>
          <Flex className={styles.passwordhead}>Password Change</Flex>
          <Flex row>
            <Flex flex={12} className={styles.maxWidth3}>
              <Flex row className={styles.companyrow2}>
                <Flex flex={6} >
                  <InputText
                    label="Current Password"
                    required
                    inputConatinerClass={styles.with80}
                    value={formikPassword.values.oldpassword}
                    className={styles.inputheight}
                    onChange={(e) => {
                      formikPassword.setFieldValue(
                        'oldpassword',
                        e.target.value,
                      );
                     
                    }}
                    keyboardType={!isShowOldPass ? 'password' : 'text'}
                    actionRight={() => (
                      <Button
                        types="link"
                        onClick={() => setShowOldPass(!isShowOldPass)}
                        className={styles.passwordicon}
                      >
                        <SvgView
                          nonView={isShowOldPass}
                          height={20}
                          width={20}
                        />
                      </Button>
                    )}
                  />
                   <ErrorMessage
                    name={'oldpassword'}
                    errors={formikPassword.errors}
                    touched={formikPassword.touched}
                  />
                  {isError && formikPassword.values.oldpassword.length !== 0 &&  (
                    <Text size={12} color="error">
                      Your current password is incorrect
                    </Text>
                  )}
                </Flex>
                <Flex flex={6}></Flex>
              </Flex>
              <Flex row flex={12}>
                <Flex flex={6}>
                  <InputText
                    label="New Password"
                    required
                    inputConatinerClass={styles.with80}
                    value={formikPassword.values.newpassword1}
                    className={styles.inputheight}
                    onChange={(e) => {
                      formikPassword.setFieldValue(
                        'newpassword1',
                        e.target.value,
                      );
                      // onDirty();
                      // setReloadProfile(true);
                    }}
                    keyboardType={!isShowNewPass ? 'password' : 'text'}
                    actionRight={() => (
                      <Button
                        types="link"
                        onClick={() => setShowNewPass(!isShowNewPass)}
                        className={styles.passwordicon}
                        
                      >
                        <SvgView
                          nonView={isShowNewPass}
                          height={20}
                          width={20}
                        />
                      </Button>
                    )}
                  />
                  <ErrorMessage
                    name={'newpassword1'}
                    errors={formikPassword.errors}
                    touched={formikPassword.touched}
                  />
                  {!isEmpty(formikPassword.values.newpassword1) && isValid && (
                    <Flex columnFlex>
                      <ErrorMessages
                        message="password must contain at least one uppercase."
                        error={
                          !checkUpperCase.test(
                            formikPassword.values.newpassword1,
                          )
                        }
                      />
                      <ErrorMessages
                        message="password must be between 8-12 characters."
                        error={
                          formikPassword.values.newpassword1.length < 8 ||
                          formikPassword.values.newpassword1.length > 12
                        }
                      />
                      <ErrorMessages
                        message="password must contain at least one special character."
                        error={
                          !specialCharacter.test(
                            formikPassword.values.newpassword1,
                          )
                        }
                      />
                    </Flex>
                  )}
                </Flex>
                <Flex flex={6}>
                  <InputText
                    label="Confirm New Password"
                    required
                    inputConatinerClass={styles.with80}
                    value={formikPassword.values.newpassword2}
                    className={styles.inputheight}
                    onChange={(e) => {
                      formikPassword.setFieldValue(
                        'newpassword2',
                        e.target.value,
                      );
                      // onDirty();
                      // setReloadProfile(true);
                    }}
                    keyboardType={!isShowNewPass1 ? 'password' : 'text'}
                    actionRight={() => (
                      <Button
                        types="link"
                        onClick={() => setShowNewPass1(!isShowNewPass1)}
                        className={styles.passwordicon}
                      >
                        <SvgView
                          nonView={isShowNewPass1}
                          height={20}
                          width={20}
                        />
                      </Button>
                    )}
                  />
                  {!isEmpty(formikPassword.values.newpassword2) &&
                    formikPassword.values.newpassword1 !==
                      formikPassword.values.newpassword2 && (
                      <Text size={12} color="error">
                        {errorMsg}
                      </Text>
                    )}
                     <ErrorMessage
                    name={'newpassword2'}
                    errors={formikPassword.errors}
                    touched={formikPassword.touched}
                  />
                </Flex>
              </Flex>
              {/* <Flex className={styles.borderline}></Flex> */}
              <Flex row center className={styles.overallbtn}>
              <Flex className={styles.cancelbutton}>
                  {' '}
                  <Button
                    onClick={redirectHome}
                    types="close"
                    className={styles.btnstyleclosesave1}
                  >
                    Cancel
                  </Button>
                  {/* types="primary"
                    className={styles.btnstyleclosesave} */}
                </Flex>
                <Flex row  >
                <Button
                  onClick={formikPassword.handleSubmit}
                  // disabled={!formikPassword.isValid}
                  className={styles.btnstyleclosesave}
                >
                  Change
                </Button>
                </Flex>
                
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default UserProfilepic;
