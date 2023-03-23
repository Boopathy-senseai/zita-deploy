import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Loader from '../../../uikit/Loader/Loader';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Card from '../../../uikit/Card/Card';
import Toast from '../../../uikit/Toast/Toast';
import { mediaPath, THIS_FIELD_REQUIRED } from '../../constValue';
import BannerSetup from './BannerSetup';
import CareersPageURL from './CareersPageURL';
import FooterSetup from './FooterSetup';
import HeaderSetup from './HeaderSetup';
import PageSetup from './PageSetup';
import styles from './buildyourcareerpageScreen.module.css';
import { formikFormTypes } from './formikTypes';
import {
  buildCareerMiddleWare,
  buildCareerPostMiddleWare,
} from './store/middleware/buildyourcareerpagemiddleware';
import { handleLoginValid } from './careerHelper';

const initial: formikFormTypes = {
  pagaeUrl: '',
  pageFontStyle: 'Helvetica',
  pageFontSize: '14',
  headerFontSize: '14',
  headerColor: { hex: '#581845' },
  menu1: '',
  menu1Url: 'https://',
  menu2: '',
  menu2Url: 'https://',
  menu3: '',
  menu3Url: 'https://',
  bannerHeadingText: '',
  bannerHeadingFontSize: '14',
  bannerTextFontSize: '14',
  bannerText: '',
  btnColor: { hex: '#f26522' },
  footerColor: { hex: '#581845' },
  aboutText: '',
};

type Props = {
  isInput: boolean;
  setInput: (a: boolean) => void;
};
const BuildYourCareerPageScreen = ({ isInput, setInput }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isApi, setApi] = useState(true);
  const [isFile, setFile] = useState<any>({});
  const [isCareerImgClick, setCareerImgClick] = useState(true);
  const [isPageSetUpImgClick, setPageSetUpImgClick] = useState(false);
  const [isHeaderSetUpImgClick, setHeaderSetUpImgClick] = useState(false);
  const [isBannerSetUpImgClick, setBannerSetUpImgClick] = useState(false);
  const [isFooterSetUpImgClick, setFooterSetUpImgClick] = useState(false);
  const [isSubmitLoader, setSubmitLoader] = useState(false);

  useEffect(() => {
    if (isApi) {
      dispatch(buildCareerMiddleWare()).then(() => {
        setApi(false);
      });
    }
  }, []);

  const { isLoading, career_page, company_detail } = useSelector(
    ({ buildCareerPageReducers }: RootState) => {
      return {
        isLoading: buildCareerPageReducers.isLoading,
        career_page: buildCareerPageReducers.career_page,
        company_detail: buildCareerPageReducers.company_detail,
      };
    },
  );

  const validationSchema = Yup.object().shape({
    pagaeUrl: Yup.string().required(THIS_FIELD_REQUIRED),
  });

  const handleSubmit = (values: formikFormTypes) => {
    setSubmitLoader(true);
    const formData = new FormData();
    formData.append('career_page_url', values.pagaeUrl);

    formData.append('page_font', values.pageFontStyle);
    formData.append('page_font_size', values.pageFontSize);

    formData.append('header_font_size', values.headerFontSize);
    formData.append('header_color', values.headerColor.hex);
    formData.append('menu_1', values.menu1);
    if (values.menu1Url !== 'https://') {
      formData.append('menu_1_url', values.menu1Url);
    }
    formData.append('menu_2', values.menu2);
    if (values.menu2Url !== 'https://') {
      formData.append('menu_2_url', values.menu2Url);
    }
    formData.append('menu_3', values.menu3);
    if (values.menu3Url !== 'https://') {
      formData.append('menu_3_url', values.menu3Url);
    }

    formData.append('banner_header_text', values.bannerHeadingText);
    formData.append('banner_font_size', values.bannerTextFontSize);
    formData.append('banner_heading_size', values.bannerHeadingFontSize);
    formData.append('banner_text', values.bannerText);
    if (isFile.file !== undefined) {
      formData.append('banner_img', isFile.file);
    }

    formData.append('about_us', values.aboutText);
    formData.append('button_color', values.btnColor.hex);
    formData.append('footer_color', values.footerColor.hex);

    dispatch(
      buildCareerPostMiddleWare({
        formData,
      }),
    ).then((res) => {
      setSubmitLoader(false);
      if (res.payload.success) {
        setInput(false);
        dispatch(buildCareerMiddleWare());
        Toast('Details saved successfully', 'LONG');
      } else {
        Toast('Details not saved', 'LONG', 'error');
      }
    });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (value) => handleSubmit(value),
    validate: handleLoginValid,
    validationSchema,
  });

  const logoUrl =
    career_page && career_page.banner_img ? career_page.banner_img : 'logo.png';

  const imgUrl =
    isFile && isFile.imagePreviewUrl === undefined
      ? `${mediaPath + logoUrl}`
      : isFile.imagePreviewUrl;

  useEffect(() => {
    if (career_page !== null) {
      formik.setFieldValue('pagaeUrl', career_page.career_page_url);
      formik.setFieldValue('pageFontSize', career_page.page_font_size);
      formik.setFieldValue('pageFontStyle', career_page.page_font);
      formik.setFieldValue('headerFontSize', career_page.header_font_size);
      formik.setFieldValue('headerColor.hex', career_page.header_color);
      formik.setFieldValue('menu1', career_page.menu_1);
      if (!isEmpty(career_page.menu_1_url)) {
        formik.setFieldValue('menu1Url', career_page.menu_1_url);
      } else {
        formik.setFieldValue('menu1Url', 'https://');
      }
      formik.setFieldValue('menu2', career_page.menu_2);
      if (!isEmpty(career_page.menu_2_url)) {
        formik.setFieldValue('menu2Url', career_page.menu_2_url);
      } else {
        formik.setFieldValue('menu2Url', 'https://');
      }
      formik.setFieldValue('menu3', career_page.menu_3);
      if (!isEmpty(career_page.menu_3_url)) {
        formik.setFieldValue('menu3Url', career_page.menu_3_url);
      } else {
        formik.setFieldValue('menu3Url', 'https://');
      }
      formik.setFieldValue('bannerHeadingText', career_page.banner_header_text);
      if (!isEmpty(career_page.banner_heading_size)) {
        formik.setFieldValue(
          'bannerHeadingFontSize',
          career_page.banner_heading_size,
        );
      }

      formik.setFieldValue('bannerTextFontSize', career_page.banner_font_size);
      formik.setFieldValue('bannerText', career_page.banner_text);
      formik.setFieldValue('btnColor.hex', career_page.button_color);
      formik.setFieldValue('footerColor.hex', career_page.footer_color);
      formik.setFieldValue('aboutText', career_page.about_us);
    }
  }, [career_page, isLoading]);

  const handleUrlClick = () => {
    setCareerImgClick(true);
    setPageSetUpImgClick(false);
    setHeaderSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };

  const handlePageSetUpClick = () => {
    setPageSetUpImgClick(true);
    setCareerImgClick(false);
    setHeaderSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };

  const handleHeaderSetUp = () => {
    setHeaderSetUpImgClick(true);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };

  const handleBannerSetUp = () => {
    setBannerSetUpImgClick(true);
    setHeaderSetUpImgClick(false);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };

  const handleFooterSetUp = () => {
    setFooterSetUpImgClick(true);
    setBannerSetUpImgClick(false);
    setHeaderSetUpImgClick(false);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
  };

  const previewUrl = career_page && career_page.career_page_url;

  useEffect(() => {
    if (!isEmpty(formik.values.pagaeUrl)) {
      setInput(false);
    }
    if (isEmpty(formik.values.pagaeUrl)) {
      setInput(true);
    }
  }, [career_page]);
  return (
    <Flex row>
      {(isSubmitLoader || isLoading) && <Loader />}
      <Flex columnFlex flex={6} className={styles.leftFlex}>
        <div
          onClick={handleUrlClick}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <CareersPageURL
            formik={formik}
            career_page={career_page}
            isInput={isInput}
            setInput={setInput}
          />
        </div>
        <div
          onClick={handlePageSetUpClick}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <PageSetup formik={formik} />
        </div>
        <div
          onClick={handleHeaderSetUp}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <HeaderSetup formik={formik} company_detail={company_detail} />
        </div>
        <div
          onClick={handleBannerSetUp}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <BannerSetup formik={formik} setFile={setFile} imgUrl={imgUrl} />
        </div>
        <div
          onClick={handleFooterSetUp}
          tabIndex={-1}
          role="button"
          onKeyDown={() => {}}
        >
          <FooterSetup formik={formik} />
        </div>
        <Flex row center className={styles.marginTop16}>
          <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>
            Save
          </Button>
          {isEmpty(previewUrl) ? (
            <Button className={styles.previewBtn} disabled>
              Preview
            </Button>
          ) : (
            <LinkWrapper
              target={'_blank'}
              replace
              to={`/${previewUrl}/careers`}
            >
              <Button className={styles.previewBtn}>Preview</Button>
            </LinkWrapper>
          )}
          <LinkWrapper to="/" target={'_parent'}>
            <Button types="secondary">My Dashboard</Button>
          </LinkWrapper>
        </Flex>
      </Flex>
      <Flex columnFlex flex={6} className={styles.rightFlex}>
        {isCareerImgClick && (
          <Card className={styles.careerPageCard}>
            <img
              style={{ width: '100%' }}
              src={`${process.env.REACT_APP_HOME_URL}static/career_page/Career%20_Page_URL.png`}
              alt="Career Page URL"
            />
          </Card>
        )}
        {isPageSetUpImgClick && (
          <Card className={styles.pageCard}>
            <img
              style={{ width: '100%' }}
              src={`${process.env.REACT_APP_HOME_URL}static/career_page/Page_Setup.png`}
              alt="Page Setup"
            />
          </Card>
        )}
        {isHeaderSetUpImgClick && (
          <Card className={styles.headerCard}>
            <img
              style={{ width: '100%' }}
              src={`${process.env.REACT_APP_HOME_URL}static/career_page/Header_Setup.png`}
              alt="Header Setup"
            />
          </Card>
        )}
        {isBannerSetUpImgClick && (
          <Card className={styles.bannerCard}>
            <img
              style={{ width: '100%' }}
              src={`${process.env.REACT_APP_HOME_URL}static/career_page/Banner_Setup.png`}
              alt="Banner Setup"
            />
          </Card>
        )}
        {isFooterSetUpImgClick && (
          <Card className={styles.footerCard}>
            <img
              style={{ width: '100%' }}
              src={`${process.env.REACT_APP_HOME_URL}static/career_page/Footer_Setup.png`}
              alt="Footer Setup"
            />
          </Card>
        )}
      </Flex>
    </Flex>
  );
};

export default BuildYourCareerPageScreen;
