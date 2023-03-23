import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Button from '../../../uikit/Button/Button';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import { AppDispatch, RootState } from '../../../store';
import SvgLocation from '../../../icons/SvgLocation';
import SvgBag from '../../../icons/SvgBag';
import { WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import { mediaPath, zitaPath } from '../../constValue';
import CareerNavBar from './CareerNavBar';
import { careerJobViewMiddleWare } from './store/middleware/buildyourcareerpagemiddleware';
import styles from './jobview.module.css';
import JobViewCard from './JobViewCard';
// import ShareButton from './ShareButton';

type ParamsType = {
  empId: string;
};

const JobView = () => {
  const dispatch: AppDispatch = useDispatch();
  const { empId } = useParams<ParamsType>();

  useEffect(() => {
    dispatch(careerJobViewMiddleWare({ id: empId }));
  }, []);

  const {
    isLoading,
    career_page_setting,
    company_detail,
    jd_form,
    skills,
    education,
    success,
  } = useSelector(({ jobViewReducers }: RootState) => {
    return {
      isLoading: jobViewReducers.isLoading,
      career_page_setting: jobViewReducers.setting,
      company_detail: jobViewReducers.company_detail,
      jd_form: jobViewReducers.jd_form,
      skills: jobViewReducers.skills,
      education: jobViewReducers.education,
      success: jobViewReducers.success,
    };
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Flex>
      {success === false && (
        <Flex columnFlex center middle height={window.innerHeight - 5}>
          <Flex middle center columnFlex className={styles.nonePage}>
            <Text bold style={{ marginBottom: 20 }}>
              This job is no longer available
            </Text>
            <LinkWrapper
              target={'_parent'}
              to={`/${career_page_setting.career_page_url}/careers`}
            >
              <Button>Go to Career Page</Button>
            </LinkWrapper>
          </Flex>
        </Flex>
      )}
      {success === true && (
        <Helmet>
          <meta property="og:title" content={jd_form?.job_title} />
          <meta property="og:description" content={jd_form?.job_description} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={mediaPath + company_detail.logo} />
          <meta property="og:site_name" content="AddThis" />
          <script
            type="text/javascript"
            src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5ddfccce9d4e170e"
          />
        </Helmet>
      )}
      {success === true && (
        <>
          <CareerNavBar
            career_page_setting={career_page_setting}
            company_detail={company_detail}
          />
          <div
            style={{
              height: window.innerHeight - 71,
              overflowY: 'scroll',
              position: 'relative',
            }}
          >
            {/* <div className={styles.shareButton}>
          <ShareButton url={window.location.href} quote={'Zita.ai'} />
        </div> */}
            <Flex className={styles.imgFlex}>
              <img
                alt="Banner"
                src={mediaPath + career_page_setting.banner_img}
                className={styles.bannerStyle}
              />
              <Flex center middle className={styles.innerText}>
                <Text
                  align="center"
                  color="white"
                  bold
                  size={50}
                  style={{ marginBottom: 8 }}
                >
                  {jd_form?.job_title}
                </Text>
                <Flex row center>
                  <Flex row center>
                    <SvgLocation height={20} width={20} />
                    <Text
                      size={20}
                      color="white"
                      style={{ marginLeft: 8, marginRight: 8 }}
                    >
                      {jd_form?.job_location}
                    </Text>
                  </Flex>
                  <Flex row center>
                    <SvgBag fill={WHITE} height={20} width={20} />
                    <Text size={20} color="white" style={{ marginLeft: 8 }}>
                      {jd_form?.job_type__label_name}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex center middle>
              <div
                style={{
                  position: 'relative',
                  top: -70,
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  maxWidth: 1300,
                }}
              >
                <JobViewCard
                  jd_form={jd_form}
                  skills={skills}
                  education={education}
                  company_detail={company_detail}
                />
              </div>
            </Flex>
            <div
              style={{
                backgroundColor: career_page_setting.footer_color,
                cursor: 'pointer',
              }}
              className={styles.footerStyle}
            >
              <Text align="center" size={14} bold onClick={zitaPath}>
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
