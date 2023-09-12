import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import PhoneInput from 'react-phone-input-2';
import Toast from '../../uikit/Toast/Toast';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgDashboardw from '../../icons/SvgDashboardw';
import SvgDashboard from '../../icons/SvgDashboard';
import SvgDownload from '../../icons/SvgDownload';
import SvgMail from '../../icons/SvgMail';
import SvgPhone from '../../icons/SvgPhone';
import { AppDispatch } from '../../store';
import { GARY_4, SECONDARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { mediaPath } from '../constValue';
import Avatar from '../../uikit/Avatar/Avatar';
import UploadProfile from '../dashboardmodule/candidatedashboard/UploadProfile';
import styles from './candidatenavbar.module.css';
import { Obj, ProjectsEntityOne, UserInfo } from './candidateProfileTypes';
import { downloadProfileMiddleWare } from './store/middleware/candidateprofilemiddleware';

type Props = {
  obj?: Obj;
  isProfileView?: boolean;
  user_info?: UserInfo;
  personal_obj?:any;
  projects: ProjectsEntityOne[];
};

const CandidateNavBar = ({
  obj,
  isProfileView,
  personal_obj,
  user_info,
  projects,
}: Props) => {
  const [isLoader, setLoader] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const hadleDownload = () => {
    setLoader(true);
    dispatch(
      downloadProfileMiddleWare({
        can_id:personal_obj?.application_id?.toString(),
      }),
    ).then((res) => {
      if (res.payload.file_path) {
        saveAs(
          `${window.location.protocol}//${res.payload.file_path}`,
          obj?.full_name,
        );
        Toast('Profile downloaded successfully', 'LONG', 'success');
      }
      setLoader(false);
    });
  };
  const [isMb, setMb] = useState(false);
  const checkBox =
    (obj && Array.isArray(obj?.skills) && obj?.skills?.length !== 0) ||
    (obj && Array.isArray(obj?.soft_skills) && obj?.soft_skills.length !== 0);

  const handleFocus = (id: string) => {
    var elmnt: any = document.getElementById(id);
    elmnt.scrollIntoView();
  };
  return (
    <Flex className={styles.overAll}>
      {isLoader && <Loader />}
      <Flex row>
        {/* <img
          style={{objectFit: 'cover'}}
          className={styles.profile}
          src={mediaPath + obj?.profile_url}
          alt="Profile"
        /> */}
        { obj?.profile_url &&
                  obj?.profile_url !== 'default.jpg' ?(
                    <UploadProfile profile={obj?.profile_url} setMb={setMb}  circle/>
                  ):(


        <Avatar
                className={styles.profile}
                style={{ fontSize:'40px', textTransform:'uppercase' }}
                initials={`${obj?.full_name[0][0]}${
                  obj?.full_name?.split(' ')[
                    obj?.full_name?.split(' ')?.length - 1
                  ] !== ''
                    ? obj?.full_name?.split(' ')?.pop()?.[0]
                    : ''
                }`}
                avatar={
                  obj?.profile_url &&
                  obj?.profile_url !== 'default.jpg' &&
                  `${process.env.REACT_APP_HOME_URL}media/${obj?.profile_url}`
                }
              />)}
        <Flex columnFlex flex={1} between>
          <Flex row center>
            <Text
              style={{ marginRight: 16 }}
              transform="capitalize"
              bold
              size={20}
              color="white"
            >
              {obj?.full_name}
            </Text>
            {isProfileView && (
              <LinkWrapper
                to={`/candidate_profile_edit/${localStorage.getItem(
                  'loginUserId',
                )}`}
              >
                <div title="Edit Profile">
                  <SvgBoxEdit fill={SECONDARY} height={20} width={20} />
                </div>
              </LinkWrapper>
            )}
            {isProfileView && (
              <div
                onClick={hadleDownload}
                role="button"
                tabIndex={-1}
                onKeyDown={() => {}}
                title="Download Profile"
                style={{ margin: '0 8px' }}
              >
                <SvgDownload fill={SECONDARY} height={20} width={20} />
              </div>
            )}

            <LinkWrapper to="/">
              <div title="Back to Dashboard">
                <SvgDashboardw height={20} width={20}/>
              </div>
            </LinkWrapper>
          </Flex>

          <Flex row between center className={styles.phoneFlex}>
            <Flex row center>
              <Flex row center>
                <div style={{ marginRight: 4 }}>
                  <SvgPhone height={16} width={16} />
                </div>

                {!isEmpty(obj?.phone_no) &&
                obj?.phone_no.toString() !== 'Not Specified' ? (
                  <div className={styles.phoneHide}>
                    <PhoneInput
                      inputClass={styles.phoneInput}
                      dropdownClass={styles.dropDownStyle}
                      value={obj?.phone_no?.toString()}
                      // placeholder='Not Specified'
                    />
                  </div>
                ) : (
                  <Text style={{ marginRight: 16 }} color="white" bold>
                    {notSpecified(obj?.phone_no)}
                  </Text>
                )}
              </Flex>
              <Flex row center>
                <SvgMail height={16} width={16} />
                <Text color="white" bold style={{ marginLeft: 8 }}>
                  {obj?.email}
                </Text>
              </Flex>
            </Flex>
            <Flex row center>
              <Text
                onClick={() => handleFocus('candidate_profile_screen___about')}
                color="white"
                bold
                style={{ marginRight: 30, cursor: 'pointer' }}
              >
                About
              </Text>
              {checkBox && isProfileView && (
                <Text
                  onClick={() =>
                    handleFocus('candidate_profile_screen___skill')
                  }
                  color="white"
                  bold
                  style={{ marginRight: 30, cursor: 'pointer' }}
                >
                  Skills
                </Text>
              )}
              {!isProfileView && (
                <Text
                  onClick={() =>
                    handleFocus('candidate_profile_screen___skill')
                  }
                  color="white"
                  bold
                  style={{ marginRight: 30, cursor: 'pointer' }}
                >
                  Skills
                </Text>
              )}
              {isProfileView &&
                Array.isArray(obj?.edu) &&
                obj?.edu.length !== 0 && (
                  <Text
                    onClick={() =>
                      handleFocus('candidate_profile_screen___qualification')
                    }
                    color="white"
                    bold
                    style={{ marginRight: 30, cursor: 'pointer' }}
                  >
                    Qualification
                  </Text>
                )}

              {!isProfileView && (
                <Text
                  onClick={() =>
                    handleFocus('candidate_profile_screen___qualification')
                  }
                  color="white"
                  bold
                  style={{ marginRight: 30, cursor: 'pointer' }}
                >
                  Qualification
                </Text>
              )}

              {isProfileView &&
                Array.isArray(obj?.exp) &&
                obj?.exp.length !== 0 && (
                  <Text
                    onClick={() =>
                      handleFocus('candidate_profile_screen___work_exp')
                    }
                    color="white"
                    bold
                    style={{ marginRight: 30, cursor: 'pointer' }}
                  >
                    Work Experience
                  </Text>
                )}
              {!isProfileView && (
                <Text
                  onClick={() =>
                    handleFocus('candidate_profile_screen___work_exp')
                  }
                  color="white"
                  bold
                  style={{ marginRight: 30, cursor: 'pointer' }}
                >
                  Work Experience
                </Text>
              )}
              {Array.isArray(projects) &&
                projects.length !== 0 &&
                isProfileView && (
                  <Text
                    onClick={() =>
                      handleFocus('candidate_profile_screen___projects')
                    }
                    color="white"
                    bold
                    style={{ cursor: 'pointer' }}
                  >
                    Projects
                  </Text>
                )}
              {!isProfileView && (
                <Text
                  onClick={() =>
                    handleFocus('candidate_profile_screen___projects')
                  }
                  color="white"
                  bold
                  style={{ cursor: 'pointer' }}
                >
                  Projects
                </Text>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CandidateNavBar;
