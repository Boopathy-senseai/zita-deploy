import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SvgUpload from '../../icons/SvgUpload';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import { WHITE } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { fileAccept, FILE_2MB } from '../constValue';
import JdParserLoader from '../createjdmodule/JdParserLoader';
import { loginMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import styles from './candidateprofileupload.module.css';
import { resumeUploadMiddleWare } from './store/middleware/candidateprofilemiddleware';

type ParamsType = {
  empId: string;
};

const CandidateProfileUpload = () => {
  const { empId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  const history = useHistory();
  const [isLoader, setLoader] = useState(false);

  const handleOnChange = (e: any) => {
    setLoader(true);
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (fileAccept.indexOf(fileExt) < 0) {
      setLoader(false);
      alert(
        'Invalid file selected, valid files are of ' +
          fileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setLoader(false);
      Toast(FILE_2MB, 'LONG', 'error');
    } else {
      const formData = new FormData();
      formData.append('resume_file', e.target.files[0]);
      formData.append('emp-id', empId);
      dispatch(resumeUploadMiddleWare({ formData })).then((res) => {
        if (res.payload.success) {
          dispatch(
            loginMiddleWare({
              username: res.payload.user_details.username,
              password: res.payload.user_details.password,
            }),
          ).then((loginRes) => {
            if (loginRes.payload.token !== undefined) {
              localStorage.setItem('token', loginRes.payload.token);
              setTimeout(() => {
                setLoader(false);
                axios.defaults.headers.common['Authorization'] =
                  'Token ' + localStorage.getItem('token');
                history.push(`/candidate_profile_edit/${empId}`);
              }, 100);
            }
          });
        }
      });
    }
  };

  return (
    <Flex
      columnFlex
      center
      className={styles.overAll}
      height={window.innerHeight}
    >
      <JdParserLoader
        open={isLoader}
        title="Please wait… Your JD is getting parsed for pre-population"
      />
      <div style={{ width: 1200 }}>
        <Flex row center between className={styles.navBarContainer}>
          <img
            src=""
            alt="logo"
            height={75}
            width={75}
            className={styles.imageStyle}
          />
          <Button>Login</Button>
        </Flex>
        <Flex center middle>
          <Flex center columnFlex className={styles.cardOverAll}>
            <Text size={28} bold align="center">
              Upload Your Resume/CV
            </Text>
            <Text size={20} align="center" className={styles.uploadText}>
              Your profile offers detailed information required for our
              algorithm
            </Text>
            <input
              type="file"
              accept=".doc,.docx,.pdf,.txt"
              onChange={handleOnChange}
              className={styles.displayNone}
              id="candidate_profile__file_upload"
            />
            <label
              htmlFor="candidate_profile__file_upload"
              style={{ margin: 0, cursor: 'pointer' }}
              className={styles.btnStyle}
            >
              <Flex row center between>
                <div style={{ cursor: 'pointer' }}>
                  <SvgUpload fill={WHITE} height={18} width={18} />
                </div>
                <Text
                  bold
                  style={{ marginLeft: 4, cursor: 'pointer' }}
                  color="white"
                >
                  Upload
                </Text>
              </Flex>
            </label>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default CandidateProfileUpload;
