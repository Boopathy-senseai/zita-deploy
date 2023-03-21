import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { AppDispatch, RootState } from '../../../store';
import Text from '../..//../uikit/Text/Text';
import Flex from '../..//../uikit/Flex/Flex';
import Card from '../..//../uikit/Card/Card';
import InputText from '../..//../uikit/InputText/InputText';
import { isEmpty } from '../../../uikit/helper';
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
// import useUnsavedChangesWarning from '../../common/useUnsavedChangesWarning';
import styles from './userprofile.module.css';
import {
  userProfileMiddleWare,
  userProfilePostMiddleWare,
  passwordChangeMiddleWare,
} from './store/middleware/userprofilemiddleware';

type Props={
  setReloadProfile:(a:boolean)=>void
}
const UserProfile = ({setReloadProfile}:Props) => {

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

  const [isMb, setMb] = useState(false);
  useEffect(() => {
    dispatch(userProfileMiddleWare());
  }, []);

  const { user, profile, isLoading } = useSelector(
    ({ userProfileReducers }: RootState) => ({
      isLoading: userProfileReducers.isLoading,
      user: userProfileReducers.user,
      profile: userProfileReducers.profile,
    }),
  );

  type UserProfile = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    profilepicture: string;
  };

  const initial: UserProfile = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    profilepicture: '',
  };
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

  const handleChangeImag = (e: any) => {
    e.preventDefault();

    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (imageFileAccept.indexOf(fileExt) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          imageFileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFileurl({
          file: e.target.files[0],
          value: e.target.value,
          imagePreviewUrl: reader.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
      setMb(false);
      setButton(false);
      setReloadProfile(true)
      // onDirty();
    }
  };

  const logoUrl = profile && profile !== 'default.jpg' ? profile : '';
  useEffect(() => {
    setlogo(logoUrl);
  }, [logoUrl]);
  const imgUrl =
    fileurl.imagePreviewUrl === undefined
      ? `${mediaPath + islogo}`
      : fileurl.imagePreviewUrl;

  const handleUserProfileValid = (values: UserProfile) => {
    const errors: Partial<UserProfile> = {};

    if (isEmpty(values.firstname)) {
      errors.firstname = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.lastname)) {
      errors.lastname = THIS_FIELD_REQUIRED;
    }
    return errors;
  };
  const handlePasswordValid = (values: Password) => {
    const errors: Partial<Password> = {};

    if (isEmpty(values.oldpassword)) {
      errors.oldpassword = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.newpassword1)) {
      errors.newpassword1 = '';
    }
    if (isEmpty(values.newpassword2)) {
      errors.newpassword2 = THIS_FIELD_REQUIRED;
    }
    if (values.newpassword1 !== values.newpassword2) {
      errors.newpassword2 = `The two password fields didn't match.`;
    }
    return errors;
  };

  const errorMsg = `The two password fields didn't match.`;
  const hanldeSubmitform = (values: UserProfile) => {
    setload(true);
    const formData = new FormData();
    if (fileurl.file !== undefined) {
      formData.append('image', fileurl.file);
    } else if (islogo.length === 0) {
      formData.append('image_null', islogo);
    }
    formData.append('first_name', values.firstname);
    formData.append('last_name', values.lastname);
    formData.append('username', values.username);
    formData.append('email', values.email);

    dispatch(
      userProfilePostMiddleWare({
        formData,
      }),
    ).then((res: any) => {
      if (res.payload.data.success) {
        dispatch(userProfileMiddleWare());
        Toast('Details saved successfully', 'LONG', 'success');
      }
      setload(false);
      setButton(true);
      // onPristine();
      setReloadProfile(false)
    });
  };

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
    ).then((res: any) => {
      // onPristine();
      setReloadProfile(false)
      if (res.payload.data.success) {
        Toast('Password changed successfully', 'LONG', 'success');
        setError(false);
        formikPassword.setFieldValue('newpassword1', '');
        formikPassword.setFieldValue('newpassword2', '');
        formikPassword.setFieldValue('oldpassword', '');
      } else {
        setError(true);
      }
    });
    // onPristine();
    setload(false);
    setReloadProfile(false)
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeSubmitform(values),
    validate: handleUserProfileValid,
  });

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

  useEffect(() => {
    if (user) {
      formik.setFieldValue('firstname', user.first_name);
      formik.setFieldValue('lastname', user.last_name);
      formik.setFieldValue('username', user.username);
      formik.setFieldValue('email', user.email);
    }
  }, [user]);

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

  // const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();
  return (
    <Flex>
      {(isLoading || isload) && <Loader />}
      <Text bold size={16} className={styles.heading}>
        Update Profile
      </Text>
      <Card className={styles.cardOverAll}>
        <Flex row>
          <Flex columnFlex flex={4} className={styles.maxWidth}>
            <Flex columnFlex>
              {imgUrl.length === 0 || imgUrl === `${mediaPath}` ? (
                <label
                  htmlFor="bannersetip_user__img"
                  className={styles.btnStyle}
                >
                  <Flex className={styles.imgContainer}>
                    <Flex height={125} width={145} className={styles.imgStyle}>
                      <Flex
                        columnFlex
                        center
                        middle
                        className={styles.changeStyle1}
                      >
                        <SvgUpload />
                        <Text color="black" className={styles.text}>
                          Upload Your Profile Picture
                        </Text>
                      </Flex>
                    </Flex>
                    {isShow && (
                      <Flex
                        columnFlex
                        center
                        middle
                        className={styles.changeStyle}
                      >
                        <div
                          className={styles.svgCloseStyle}
                          tabIndex={-1}
                          role="button"
                          onKeyDown={() => {}}
                          title={'Remove'}
                          onClick={() => {
                            setFileurl({ value: null });

                            setShow(false);
                            console.log('fileurl11111111', fileurl);
                          }}
                        >
                          <SvgCloseSmall />
                        </div>
                        <SvgUpload />
                        <Text color="black" className={styles.text}>
                          Upload Your Profile Picture
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </label>
              ) : (
                <Flex>
                  <label
                    htmlFor="bannersetip_user__img"
                    className={styles.btnStyle}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                  >
                    <Flex className={styles.imgContainer}>
                      <img
                      style={{objectFit: 'cover'}}
                        height={125}
                        width={145}
                        src={imgUrl}
                        alt="Banner Img"
                        className={styles.imgStyle}
                        key={Math.random().toString()}
                      />
                      {isShow && (
                        <Flex
                          columnFlex
                          center
                          middle
                          className={styles.changeStyle}
                        >
                          <SvgUpload />
                          <Text color="black" className={styles.text}>
                            Change Your Profile Picture
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </label>
                  {isShow && (
                    <div
                      className={styles.svgCloseStyle}
                      tabIndex={-1}
                      onMouseEnter={() => setShow(true)}
                      onMouseLeave={() => setShow(false)}
                      role="button"
                      title={'Remove'}
                      onKeyDown={() => {}}
                      onClick={reset}
                    >
                      <SvgCloseSmall />
                    </div>
                  )}
                </Flex>
              )}
              {isMb && (
                <Text size={12} color="error">
                  {FILE_2MB}
                </Text>
              )}
              <input
                id="bannersetip_user__img"
                type="file"
                ref={ref}
                onChange={handleChangeImag}
                accept="image/*"
                className={styles.fileStyle}
              />
            </Flex>
            <Flex columnFlex className={!isShow ? styles.textsection :''}>
              <Text className={styles.gray_color}>
                Recommended profile picture dimension:
              </Text>
              <Text className={styles.gray_color}>
                Square: 120px * 120px, Rectangle: 500px * 230px
              </Text>
              <Text className={styles.gray_color}>
                File size must be less than 2MB
              </Text>
            </Flex>
          </Flex>
          <Flex flex={8} className={styles.maxWidth2}>
            <Flex row className={styles.companyrow}>
              <Flex flex={6}>
                <InputText
                  inputConatinerClass={styles.with80}
                  label="First Name"
                  required
                  value={formik.values.firstname}
                  onChange={(e) => {
                    formik.setFieldValue('firstname', e.target.value);
                    setButton(false);
                    // onDirty();
                    setReloadProfile(true)
                  }}
                />
              </Flex>
              <Flex flex={6}>
                <InputText
                  inputConatinerClass={styles.with80}
                  label="Last Name"
                  required
                  value={formik.values.lastname}
                  onChange={(e) => {
                    formik.setFieldValue('lastname', e.target.value);
                    setButton(false);
                    // onDirty();
                    setReloadProfile(true)
                  }}
                />
              </Flex>
            </Flex>
            <Flex row className={styles.companyrow}>
              <Flex flex={6}>
                <InputText
                  inputConatinerClass={styles.with80}
                  label="User Name"
                  required
                  disabled
                  value={formik.values.username}
                  onChange={formik.handleChange('username')}
                />
              </Flex>
              <Flex flex={6}>
                <InputText
                  inputConatinerClass={styles.with80}
                  label="Email"
                  required
                  disabled
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                />
              </Flex>
            </Flex>
            <Flex className={styles.companyrow}>
              {isButton ? (
                <Button onClick={formik.handleSubmit} disabled>
                  Save
                </Button>
              ) : (
                <Button
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid}
                >
                  Save
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card>
      <Text bold size={16} className={styles.heading}>
        Password Change
      </Text>
      <Card className={styles.cardOverAll2}>
        <Flex row>
          <Flex flex={10} className={styles.maxWidth3}>
            <Flex row className={styles.companyrow2}>
              <Flex flex={4}>
                <InputText
                  label="Current Password"
                  required
                  inputConatinerClass={styles.with80}
                  value={formikPassword.values.oldpassword}
                  onChange={(e) => {
                    formikPassword.setFieldValue('oldpassword', e.target.value);
                    // onDirty();
                    setReloadProfile(true)
                  }}
                  keyboardType={!isShowOldPass ? 'password' : 'text'}
                  actionRight={() => (
                    <Button
                      types="link"
                      onClick={() => setShowOldPass(!isShowOldPass)}
                    >
                      <SvgView nonView={isShowOldPass} height={20} width={20} />
                    </Button>
                  )}
                />
                {isError && (
                  <Text size={12} color="error">
                    Your current password is incorrect
                  </Text>
                )}
              </Flex>
              <Flex flex={4}>
                <InputText
                  label="New Password"
                  required
                  inputConatinerClass={styles.with80}
                  value={formikPassword.values.newpassword1}
                  onChange={(e) => {
                    formikPassword.setFieldValue(
                      'newpassword1',
                      e.target.value,
                    );
                    // onDirty();
                    setReloadProfile(true)
                  }}
                  keyboardType={!isShowNewPass ? 'password' : 'text'}
                  actionRight={() => (
                    <Button
                      types="link"
                      onClick={() => setShowNewPass(!isShowNewPass)}
                    >
                      <SvgView nonView={isShowNewPass} height={20} width={20} />
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
                      message="Your password must contain at least one uppercase."
                      error={
                        !checkUpperCase.test(formikPassword.values.newpassword1)
                      }
                    />
                    <ErrorMessages
                      message="Your password must be between 8-12 characters."
                      error={
                        formikPassword.values.newpassword1.length < 8 ||
                        formikPassword.values.newpassword1.length > 12
                      }
                    />
                    <ErrorMessages
                      message="Your password must contain at least one special character."
                      error={
                        !specialCharacter.test(
                          formikPassword.values.newpassword1,
                        )
                      }
                    />
                  </Flex>
                )}
              </Flex>
              <Flex flex={4}>
                <InputText
                  label="Confirm New Password"
                  required
                  inputConatinerClass={styles.with80}
                  value={formikPassword.values.newpassword2}
                  onChange={(e) => {
                    formikPassword.setFieldValue(
                      'newpassword2',
                      e.target.value,
                    );
                    // onDirty();
                    setReloadProfile(true)
                  }}
                  keyboardType={!isShowNewPass1 ? 'password' : 'text'}
                  actionRight={() => (
                    <Button
                      types="link"
                      onClick={() => setShowNewPass1(!isShowNewPass1)}
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
              </Flex>
            </Flex>
            <Flex row className={styles.companyrow2}>
              {isPassButton ? (
                <Button onClick={formikPassword.handleSubmit} disabled>
                  Save
                </Button>
              ) : (
                <Button
                  onClick={formikPassword.handleSubmit}
                  disabled={!formikPassword.isValid}
                >
                  Save
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Card>
      {/* {routerPrompt} */}
    </Flex>
  );
};

export default UserProfile;
