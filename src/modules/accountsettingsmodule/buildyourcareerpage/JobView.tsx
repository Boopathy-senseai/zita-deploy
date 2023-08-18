/* eslint max-len: ["error", { "code": 2000 }] */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
// import DocumentMeta from 'react-document-meta';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useParams } from 'react-router-dom';
import Button from '../../../uikit/Button/Button';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import { AppDispatch, RootState } from '../../../store';
import SvgLocation from '../../../icons/SvgLocation';
import SvgBag from '../../../icons/SvgBag';
import { WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import SvgJobapplication from '../../../icons/SvgJobapplication';
import { mediaPath, zitaPath } from '../../constValue';
import CareerNavBar from './CareerNavBar';
import {
  candiInviteStatusMiddleware,
  careerJobViewMiddleWare,
  jobViewCountMiddleWare,
} from './store/middleware/buildyourcareerpagemiddleware';
import styles from './jobview.module.css';
import JobViewCard from './JobViewCard';
import ApplicationForm from './ApplicationForm';
import ShareButton from './ShareButton';

type ParamsType = {
  jobId: string;
  jobTitle:string
};

const JobView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { jobId,jobTitle } = useParams<ParamsType>();
  const [isSuccess, setSuccess] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isPageLoader,setPageLoader]=useState(true)
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const cookies = new Cookies();
  const getJobViewLocal: any = localStorage.getItem('jobViewCount');
  const isTablet = useMediaQuery({ query: '(max-width: 770px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

// job view count api call
  useEffect(() => {
    if (isEmpty(getJobViewLocal) && localStorage.getItem('token') === null) {
      if (window.location.hash.includes('.whatsapp')) {
        dispatch(jobViewCountMiddleWare({ source: 'Whatsapp', jdId: jobId }));
        cookies.set('jobViewCount', 'Whatsapp');
        localStorage.setItem('jobViewCount','Whatsapp');
      } else if (window.location.pathname.includes('.gmailView')) {
        dispatch(jobViewCountMiddleWare({ source: 'Gmail', jdId: jobId }));
        cookies.set('jobViewCount', 'Gmail');
        localStorage.setItem('jobViewCount','Gmail');
      } else if (window.location.hash.includes('.facebook')) {
        dispatch(jobViewCountMiddleWare({ source: 'Facebook', jdId: jobId }));
        cookies.set('jobViewCount', 'Facebook');
        localStorage.setItem('jobViewCount','Facebook');
      } else if (window.location.hash.includes('.linkedin')) {
        dispatch(jobViewCountMiddleWare({ source: 'Linkedin', jdId: jobId }));
        cookies.set('jobViewCount', 'Linkedin');
        localStorage.setItem('jobViewCount','Linkedin');
      } else if (window.location.hash.includes('.twitter')) {
        dispatch(jobViewCountMiddleWare({ source: 'Twitter', jdId: jobId }));
        cookies.set('jobViewCount', 'Twitter');
        localStorage.setItem('jobViewCount','Twitter');
      } else if(!window.location.hash.includes('.whatsapp') && !window.location.pathname.includes('.gmailView') && !window.location.hash.includes('.facebook') && !window.location.hash.includes('.linkedin')&& !window.location.hash.includes('.twitter')) {
        dispatch(
          jobViewCountMiddleWare({ source: 'Career Page', jdId: jobId }),
        );
        localStorage.setItem('jobViewCount','Career Page');
        cookies.set('jobViewCount', 'Career Page');
      }
    }
  }, []);

  const query = useQuery();
  const jobStatus: any = query.get('interested');
  const candiId: any = query.get('can_id');
  const applicationFocus: any = query.get('applicationFocus');
console.log(candiId,'gggggggggggggggggggcndiiiiiii')
  const getLoginUserId =
    localStorage.getItem('loginUserId') !== null
      ? localStorage.getItem('loginUserId')
      : '0';

  useEffect(() => {
    localStorage.setItem('careerJobTitle', jobTitle)
    dispatch(
      careerJobViewMiddleWare({
        id: jobId,
        userID: getLoginUserId,
      }),
    ).then(() => {
      setPageLoader(false)
      if (!isEmpty(applicationFocus)) {
        var elmnt:any = document.getElementById('jobview___applicant_focus');
        elmnt?.scrollIntoView();
      }
    });
  }, []);

  const {
    isLoading,
    career_page_setting,
    company_detail,
    jd_form,
    skills,
    education,
    success,
    questionnaire,
    login_user,
    applicant_detail,
    applied_status,
    additional_detail,
  } = useSelector(({ jobViewReducers }: RootState) => {
    return {
      isLoading: jobViewReducers.isLoading,
      career_page_setting: jobViewReducers.setting,
      company_detail: jobViewReducers.company_detail,
      jd_form: jobViewReducers.jd_form,
      skills: jobViewReducers.skills,
      education: jobViewReducers.education,
      success: jobViewReducers.success,
      questionnaire: jobViewReducers.questionnaire,
      login_user: jobViewReducers.login_user,
      applicant_detail: jobViewReducers.applicant_detail,
      applied_status: jobViewReducers.applied_status,
      additional_detail: jobViewReducers.additional_detail,
    };
  });

  // job status api call
  useEffect(() => {
    if (applied_status !== 1) {
      if (!isEmpty(jobStatus) && !isEmpty(candiId)) {
        dispatch(
          candiInviteStatusMiddleware({
            candi_id: candiId,
            interested: jobStatus,
            jdId: jobId,
          }),
        );
      }
    }
  }, [applied_status]);

 // meta data update
  const title: any = jd_form && jd_form?.job_title;
  document.title = title;



// const meta = {
//       title: 'Some Meta Title',
//       description: 'I am a description, and I can create multiple tags',
//       canonical: 'http://example.com/path/to/page',
//       meta: {
//         charset: 'utf-8',
//         name: {
//           keywords: 'react,meta,document,html,tags',
//           'og:title': 'react,meta,document,html,tags'
//         }
//       }
//     };



  // const ogTitle: any = document.querySelector('meta[property="og:title"]');

  // const ogDescription: any = document.querySelector(
  //   'meta[property="og:description"]',
  // );
  // const ogImage: any = document.querySelector('meta[property="og:image"]');
  // const ogUrl: any = document.querySelector('meta[property="og:url"]');

  // const ogTwitterTitle: any = document.querySelector(
  //   'meta[name="twitter:title"]',
  // );
  // const ogTwitterDescription: any = document.querySelector(
  //   'meta[name="twitter:description"]',
  // );
  // const ogTwitterImage: any = document.querySelector(
  //   'meta[name="twitter:image"]',
  // );

  // if (typeof ogTitle !== null && typeof ogTitle !== 'undefined' && jd_form) {
  //   ogTitle.setAttribute('content', title);
  // }
  // if (
  //   typeof ogImage !== null &&
  //   typeof ogImage !== 'undefined' &&
  //   company_detail
  // ) {
  //   ogImage.setAttribute('content', mediaPath + company_detail.logo);
  // }
  // if (
  //   typeof ogDescription !== null &&
  //   typeof ogDescription !== 'undefined' &&
  //   jd_form
  // ) {
  //   ogDescription.setAttribute('content', jd_form.job_role__label_name);
  // }
  // if (typeof ogUrl !== null && typeof ogUrl !== 'undefined' && jd_form) {
  //   ogUrl.setAttribute('content', window.location.href);
  // }
  // if (
  //   typeof ogTwitterTitle !== null &&
  //   typeof ogTwitterTitle !== 'undefined' &&
  //   jd_form
  // ) {
  //   ogTwitterTitle.setAttribute('content', title);
  // }

  // if (
  //   typeof ogTwitterDescription !== null &&
  //   typeof ogTwitterDescription !== 'undefined' &&
  //   jd_form
  // ) {
  //   ogTwitterDescription.setAttribute('content', jd_form.job_role__label_name);
  // }

  // if (
  //   typeof ogTwitterImage !== null &&
  //   typeof ogTwitterImage !== 'undefined' &&
  //   jd_form
  // ) {
  //   ogTwitterImage.setAttribute('content', mediaPath + company_detail.logo);
  // }

  if (isLoading || isPageLoader) {
    return <Loader />;
  }

  return (
    <Flex>
      {/*<DocumentMeta {...meta}>
      </DocumentMeta>*/}
      {isLoader && <Loader />}
      {success === false && (
        <Flex columnFlex center middle height={window.innerHeight - 5}>
          <Flex middle center columnFlex className={styles.nonePage}>
            <Text bold style={{ marginBottom: 20 }}>
              This job is no longer available to view.
            </Text>
            <LinkWrapper to={`/${career_page_setting.career_page_url}/careers`}>
              <Button>Go to Career Page</Button>
            </LinkWrapper>
          </Flex>
        </Flex>
      )}

      {success === true && (
        <>
          <CareerNavBar
            career_page_setting={career_page_setting}
            company_detail={company_detail}
            loginUser={login_user ? false : true}
            fName={applicant_detail && applicant_detail.firstname}
            lName={applicant_detail && applicant_detail.lastname}
            image={applicant_detail && applicant_detail.image}
          />
          <div
            style={{
              height: window.innerHeight - 71,
              overflowY: 'scroll',
              position: 'relative',
            }}
          >
            {isSuccess !== true && (
              <div className={styles.shareButton}>
                <ShareButton
                  jd_form={jd_form}
                  url={`${window.location.href}`}
                />
              </div>
            )}
            {!isSuccess ? (
              <>
                <Flex className={styles.imgFlex}>
                  <div className={styles.overLay}/>
                  <img
                    alt="Banner"
                    src={mediaPath + career_page_setting.banner_img}
                    className={styles.bannerStyle}
                  />
                  <Flex columnFlex center middle className={styles.innerText}>
                    <Text
                      align="center"
                      color="white"
                      bold
                      size={isTablet ? 24 : 20}
                      style={{ marginBottom: 8 }}
                    >
                      {jd_form?.job_title}
                    </Text>
                    <Flex className={styles.centerStyle} row={!isMobile} center ={!isMobile}>
                      <Flex row center ={!isMobile}>
                        <SvgLocation height={20} width={20} fill={WHITE}/>
                        <Text
                          size={isTablet ? 14 : 16}
                          color="white"
                          style={{ marginLeft: 5, marginRight: 10 }}
                        >
                          {jd_form?.job_location}
                        </Text>
                      </Flex>
                      <Flex marginTop={isMobile ? 4:0} row center ={!isMobile}>
                        <SvgBag fill={WHITE} height={20} width={20} />
                        <Text
                          size={isTablet ? 14 : 16}
                          color="white"
                          style={{ marginLeft: 5, textTransform:"capitalize" }}
                        >
                          {jd_form?.job_type__label_name}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex center middle>
                  <div className={styles.jobViewRes}>
                    <JobViewCard
                      key={jobId}
                      jd_form={jd_form}
                      skills={skills}
                      education={education}
                      company_detail={company_detail}
                      login_user={login_user}
                      jobId={jobId}
                      applied_status={applied_status}
                      career_page_setting={career_page_setting}
                    />
                    {login_user === true && applied_status === 0 && (
                      <div id="jobview___applicant_focus">
                        <ApplicationForm
                          jobId={jobId}
                          questionnaire={questionnaire}
                          applicant_detail={applicant_detail}
                          setSuccess={setSuccess}
                          additional_detail={additional_detail}
                          jd_form={jd_form}
                          cand_id={candiId}
                          setLoader={setLoader}
                        />
                      </div>
                    )}
                  </div>
                </Flex>
              </>
            ) : (
              <Flex columnFlex center middle height={window.innerHeight - 150}>
                <Flex middle center columnFlex className={styles.successFlex}>
                  <SvgJobapplication />
                  <Text bold style={{ paddingTop: 12, paddingBottom: 12 }}>
                    Thank You! You have successfully applied for{' '}
                    {localStorage.getItem('careerJobTitle')}
                  </Text>
                  <LinkWrapper to="/">
                    <Button>Go to Applied Jobs</Button>
                  </LinkWrapper>
                </Flex>
              </Flex>
            )}
            <div
              style={{
                backgroundColor: career_page_setting.footer_color,
                cursor: 'pointer',
                borderTop:"1px solid #c3c3c3"
              }}
              className={styles.footerStyle}
            >
              <Text bold color='theme' align="center" size={14} onClick={zitaPath}>
                Powered by Zita.ai
              </Text>
            </div>
          </div>
        </>
      )}
    </Flex>
  );
};

export default JobView;
