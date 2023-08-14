import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import SvgUpload from '../../icons/SvgUpload';
import { AppDispatch } from '../../store';
import Button from '../../uikit/Button/Button';
import { WHITE } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { fileAccept, FILE_2MB, mediaPath } from '../constValue';
import JdParserLoader from '../createjdmodule/JdParserLoader';
import { loginMiddleWare } from '../Login/store/middleware/loginMiddleWare';
import { logOutMiddleWare } from '../navbar/store/middleware/navbarmiddleware';
import styles from './candidateprofileupload.module.css';
import {
  imgGetMiddleWare,
  resumeUploadMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

type ParamsType = {
  empId: string;
};

const CandidateProfileUpload = () => {
  const { empId } = useParams<ParamsType>();
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isMb, setMb] = useState(false);
  const [isImageLoader, setImagLoader] = useState(true);
  const [isImage, setImage] = useState('');

  useEffect(() => {
    dispatch(imgGetMiddleWare({ empId })).then((res) => {
      localStorage.setItem('jobViewLogo', mediaPath + res.payload.company.logo);
      setImagLoader(false);
      setImage(res.payload.company.logo);
    });
  }, []);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const email: any = query.get('email');

  // image upload function
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
      setMb(true);
    } else {
      setMb(false);
      const formData = new FormData();
      formData.append('resume_file', e.target.files[0]);
      formData.append('emp-id', empId);
      if (!isEmpty(email)) {
        formData.append('email', email);
      }
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
              localStorage.setItem('loginUserCheck', loginRes.payload.is_staff);
              localStorage.setItem(
                'loginUserId',
                loginRes.payload.is_staff ? '0' : loginRes.payload.username,
              );

              setTimeout(() => {
                setLoader(false);
                axios.defaults.headers.common['Authorization'] =
                  'Token ' + localStorage.getItem('token');
                window.location.replace(
                  window.location.origin + `/candidate_profile_edit/${empId}`,
                );
              }, 100);
            }
          });
        }
      });
    }
  };

  const logo: any =
    localStorage.getItem('jobViewLogo') !== null
      ? localStorage.getItem('jobViewLogo')
      : '';

  if (isImageLoader) {
    return <Loader />;
  }

  return (
    <Flex
      columnFlex
      center
      className={styles.overAll}
      height={window.innerHeight}
    >
      <JdParserLoader
        open={isLoader}
        title="Please wait... Your resume is getting parsed for prepopulation"
      />
      <div style={{ width: 1200 }}>
        <Flex row center between className={styles.navBarContainer}>
          <div style={{ display: 'flex' }}>
            {!isEmpty(isImage) && (
              <img
                style={{ objectFit: 'cover' }}
                src={logo}
                alt="logo"
                // height={75}
                // width={75}
                className={styles.imageStyle}
              />
            )}
          </div>

          <LinkWrapper
            to="/login"
            onClick={() => {
              dispatch(logOutMiddleWare()).then(() => {
                localStorage.removeItem('token');
              });
            }}
          >
            <Button>Login</Button>
          </LinkWrapper>
        </Flex>
        <Flex>
          <Flex columnFlex className={styles.cardOverAll}>
            <Text
              color="theme"
              bold
              size={16}
              align="center"
              style={{ marginBottom: '10px' }}
            >
              Lets start to apply for the role.
            </Text>
            <Text size={16} bold >
              Upload Your Resume or CV
            </Text>
            <ul style={{marginLeft:"25px"}}>
              <li className={styles.uploadText}>
                Once you upload resume / cv all the details will be extracted by
                our algorithm.
              </li>
              <li className={styles.uploadText}>
                The extracted details will be auto populated in the up coming
                respective forms.
              </li>
            </ul>
            <Flex  center middle className={styles.uploadContainer}>
              <Flex row>
              <Text color='gray' style={{marginRight:"5px"}}>Click and upload your resume</Text>
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
                  {/* <div style={{ cursor: 'pointer' }}>
                    <SvgUpload fill={"#581845"} height={18} width={18} />
                  </div> */}
                  <Text
                    bold

                    style={{ marginLeft: 2, cursor: 'pointer' }}
                    color="theme"
                  >
                    Upload Resume
                  </Text>
                </Flex>
              </label>

              </Flex>
              
              <Text color='gray' size={12} style={{marginTop:"5px"}}>
              {`(Upload only.txt,.doc,.docx,.pdf formats upto 2MB)`}
            </Text>
              {isMb && (
                <Text color="error" size={12} style={{ marginTop: 4 }}>
                  {FILE_2MB}
                </Text>
              )}
            </Flex>
            
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default CandidateProfileUpload;
