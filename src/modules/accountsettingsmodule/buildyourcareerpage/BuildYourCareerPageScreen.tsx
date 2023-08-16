import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Loader from '../../../uikit/Loader/Loader';
import Button from '../../../uikit/Button/Button';
import Flex from '../../../uikit/Flex/Flex';
import { getFocus, isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Card from '../../../uikit/Card/Card';
import Toast from '../../../uikit/Toast/Toast';
import {
  isValidURL,
  mediaPath,
  nameRegex,
  THIS_FIELD_REQUIRED,
} from '../../constValue';
import ExpandTile from '../../../uikit/ExpandTile';
import BannerSetup, { BannerSetupTitle } from './BannerSetup';
import CareersPageURL, { CareerTitle } from './CareersPageURL';
import FooterSetup, { FooterSetupTitle } from './FooterSetup';
import HeaderSetup, { HeaderSetupTitle } from './HeaderSetup';
import PageSetup, { PageSetupTitle } from './PageSetup';
import styles from './buildyourcareerpageScreen.module.css';
import { formikFormTypes } from './formikTypes';
import {
  buildCareerMiddleWare,
  buildCareerPostMiddleWare,
  urlVerificationMiddleWare,
} from './store/middleware/buildyourcareerpagemiddleware';

type Props = {
  isInput: boolean;
  setInput: (a: boolean) => void;
  setReload: (a: boolean) => void;
};

const initial: formikFormTypes = {
  pagaeUrl: '',
  pageFontStyle: 'Helvetica',
  pageFontSize: '14',
  headerFontSize: '14',
  headerColor: { hex: '#fffff' },
  menu1: '',
  menu1Url: 'https://',
  menu2: '',
  menu2Url: 'https://',
  menu3: '',
  menu3Url: 'https://',
  bannerHeadingText: '',
  bannerHeadingFontSize: '20',
  bannerTextFontSize: '14',
  bannerText: '',
  btnColor: { hex: '#581845' },
  footerColor: { hex: '#fffff' },
  aboutText: '',
};

// formik validation
const validationSchema = Yup.object().shape({
  pagaeUrl: Yup.string().required(THIS_FIELD_REQUIRED),
});

const BuildYourCareerPageScreen = ({ isInput, setInput, setReload }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isFile, setFile] = useState<any>({});
  const [isCareerImgClick, setCareerImgClick] = useState(true);
  const [isPageSetUpImgClick, setPageSetUpImgClick] = useState(false);
  const [isHeaderSetUpImgClick, setHeaderSetUpImgClick] = useState(false);
  const [isBannerSetUpImgClick, setBannerSetUpImgClick] = useState(false);
  const [isFooterSetUpImgClick, setFooterSetUpImgClick] = useState(false);
  const [isSubmitLoader, setSubmitLoader] = useState(false);
  const [isBtnDisable, setBtnDisable] = useState(true);
  const [isUrlError, setUrlError] = useState(false);
  const [tileState, setTileState] = useState<{
    careersPage: boolean;
    pageSetup: boolean;
    headerSetup: boolean;
    bannerSetup: boolean;
    buttonAndFooterSetup: boolean;
  }>({
    careersPage: true,
    pageSetup: false,
    headerSetup: false,
    bannerSetup: false,
    buttonAndFooterSetup: false,
  });

  // initial api call
  useEffect(() => {
    dispatch(buildCareerMiddleWare()).then((res) => {
      if (
        res.payload.career_page &&
        !isEmpty(res.payload.career_page.career_page_url)
      ) {
        setInput(false);
      } else {
        setInput(true);
      }
    });
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

  // formik submit
  const handleSubmit = (values: formikFormTypes) => {
    setReload(false);
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
        setBtnDisable(true);
        dispatch(buildCareerMiddleWare());
        Toast('Details saved successfully', 'LONG');
      } else {
        Toast('Details not saved', 'LONG', 'error');
      }
    });
  };

  // formik validation
  const handleValid = (values: formikFormTypes) => {
    const errors: Partial<formikFormTypes> = {};
    if (!isEmpty(values.pagaeUrl) && !nameRegex.test(values.pagaeUrl)) {
      errors.pagaeUrl = '';
    }
    if (!isEmpty(values.pagaeUrl) && isUrlError) {
      errors.pagaeUrl = '';
    }
    // header setup
    if (
      !isEmpty(values.headerColor.hex) &&
      values.headerColor.hex.length > 20
    ) {
      errors.headerColor = { hex: '' };
    }
    if (isEmpty(values.headerColor.hex)) {
      errors.headerColor = { hex: THIS_FIELD_REQUIRED };
    }
    if (!isEmpty(values.menu1) && values.menu1.length > 50) {
      errors.menu1 = '';
    }
    if (
      isEmpty(values.menu1) &&
      !isEmpty(values.menu1Url) &&
      values.menu1Url !== 'https://'
    ) {
      errors.menu1 = '';
    }
    if (!isEmpty(values.menu2) && values.menu2.length > 50) {
      errors.menu2 = '';
    }
    if (
      isEmpty(values.menu2) &&
      !isEmpty(values.menu2Url) &&
      values.menu2Url !== 'https://'
    ) {
      errors.menu2 = '';
    }
    if (!isEmpty(values.menu3) && values.menu3.length > 50) {
      errors.menu3 = '';
    }
    if (
      isEmpty(values.menu3) &&
      !isEmpty(values.menu3Url) &&
      values.menu3Url !== 'https://'
    ) {
      errors.menu3 = '';
    }
    if (
      !isEmpty(values.menu1) &&
      isValidURL(values.menu1Url) === false &&
      values.menu1Url !== 'https://'
    ) {
      errors.menu1Url = '';
    }
    if (!isEmpty(values.menu1) && values.menu1Url === 'https://') {
      errors.menu1Url = '';
    }

    if (
      !isEmpty(values.menu2) &&
      isValidURL(values.menu2Url) === false &&
      values.menu2Url !== 'https://'
    ) {
      errors.menu2Url = '';
    }
    if (!isEmpty(values.menu2) && values.menu2Url === 'https://') {
      errors.menu2Url = '';
    }

    if (
      !isEmpty(values.menu3) &&
      isValidURL(values.menu3Url) === false &&
      values.menu3Url !== 'https://'
    ) {
      errors.menu3Url = '';
    }
    if (!isEmpty(values.menu3) && values.menu3Url === 'https://') {
      errors.menu3Url = '';
    }
    // BannerSetup
    if (
      !isEmpty(values.bannerHeadingText) &&
      values.bannerHeadingText.length > 50
    ) {
      errors.bannerHeadingText = '';
    }
    if (!isEmpty(values.bannerText) && values.bannerText.length <= 150) {
      errors.bannerText = '';
    }
    if (!isEmpty(values.bannerText) && values.bannerText.length > 500) {
      errors.bannerText = '';
    }

    // FooterSetup

    if (!isEmpty(values.btnColor.hex) && values.btnColor.hex.length > 20) {
      errors.btnColor = { hex: '' };
    }
    if (isEmpty(values.btnColor.hex)) {
      errors.btnColor = { hex: THIS_FIELD_REQUIRED };
    }
    if (
      !isEmpty(values.footerColor.hex) &&
      values.footerColor.hex.length > 20
    ) {
      errors.footerColor = { hex: '' };
    }
    if (isEmpty(values.footerColor.hex)) {
      errors.footerColor = { hex: THIS_FIELD_REQUIRED };
    }
    if (!isEmpty(values.aboutText) && values.aboutText.length <= 150) {
      errors.aboutText = '';
    }
    if (!isEmpty(values.aboutText) && values.aboutText.length > 500) {
      errors.aboutText = '';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (value) => handleSubmit(value),
    validate: handleValid,
    validationSchema,
  });

  const logoUrl =
    career_page && career_page.banner_img
      ? career_page.banner_img
      : 'slider1.jpg';

  const imgUrl =
    isFile && isFile.imagePreviewUrl === undefined
      ? `${mediaPath + logoUrl}`
      : isFile.imagePreviewUrl;

  // formik free fill initial value set
  useEffect(() => {
    if (career_page) {
      formik.setFieldValue('pagaeUrl', career_page.career_page_url);
    }

    if (career_page && !isEmpty(career_page.page_font_size)) {
      formik.setFieldValue(
        'pageFontSize',
        career_page.page_font_size.toString(),
      );
    } else {
      formik.setFieldValue('pageFontSize', '14');
    }

    if (career_page && !isEmpty(career_page.page_font)) {
      formik.setFieldValue('pageFontStyle', career_page.page_font);
    } else {
      formik.setFieldValue('pageFontStyle', 'Helvetica');
    }

    if (career_page && !isEmpty(career_page.header_font_size)) {
      formik.setFieldValue(
        'headerFontSize',
        career_page.header_font_size.toString(),
      );
    } else {
      formik.setFieldValue('headerFontSize', '14');
    }

    if (career_page && !isEmpty(career_page.header_color)) {
      formik.setFieldValue('headerColor.hex', career_page.header_color);
    } else {
      formik.setFieldValue('headerColor.hex', '#ffffff');
    }

    if (career_page) {
      formik.setFieldValue('menu1', career_page.menu_1);
      formik.setFieldValue('menu2', career_page.menu_2);
      formik.setFieldValue('menu3', career_page.menu_3);
      formik.setFieldValue('aboutText', career_page.about_us);
      formik.setFieldValue('bannerText', career_page.banner_text);
    }

    if (career_page && !isEmpty(career_page.menu_1_url)) {
      formik.setFieldValue('menu1Url', career_page.menu_1_url);
    } else {
      formik.setFieldValue('menu1Url', 'https://');
    }

    if (career_page && !isEmpty(career_page.menu_2_url)) {
      formik.setFieldValue('menu2Url', career_page.menu_2_url);
    } else {
      formik.setFieldValue('menu2Url', 'https://');
    }

    if (career_page && !isEmpty(career_page.menu_3_url)) {
      formik.setFieldValue('menu3Url', career_page.menu_3_url);
    } else {
      formik.setFieldValue('menu3Url', 'https://');
    }

    if (career_page && !isEmpty(career_page.banner_header_text)) {
      formik.setFieldValue('bannerHeadingText', career_page.banner_header_text);
    } else {
      formik.setFieldValue('bannerHeadingText', '');
    }

    if (career_page && !isEmpty(career_page.banner_heading_size)) {
      formik.setFieldValue(
        'bannerHeadingFontSize',
        career_page.banner_heading_size.toString(),
      );
    } else {
      formik.setFieldValue('bannerHeadingFontSize', '20');
    }

    if (career_page && !isEmpty(career_page.banner_font_size)) {
      formik.setFieldValue(
        'bannerTextFontSize',
        career_page.banner_font_size.toString(),
      );
    } else {
      formik.setFieldValue('bannerTextFontSize', '14');
    }

    if (career_page && !isEmpty(career_page.button_color)) {
      formik.setFieldValue('btnColor.hex', career_page.button_color);
    } else {
      formik.setFieldValue('btnColor.hex', '#581845');
    }

    if (career_page && !isEmpty(career_page.footer_color)) {
      formik.setFieldValue('footerColor.hex', career_page.footer_color);
    } else {
      formik.setFieldValue('footerColor.hex', '#ffffff');
    }
  }, [career_page, isLoading]);

  // set url imgage
  const handleUrlClick = () => {
    setCareerImgClick(true);
    setPageSetUpImgClick(false);
    setHeaderSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };
  // set page setup imgage
  const handlePageSetUpClick = () => {
    setPageSetUpImgClick(true);
    setCareerImgClick(false);
    setHeaderSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };
  // set header setup imgage
  const handleHeaderSetUp = () => {
    setHeaderSetUpImgClick(true);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
    setBannerSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };
  // set banner setup imgage
  const handleBannerSetUp = () => {
    setBannerSetUpImgClick(true);
    setHeaderSetUpImgClick(false);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
    setFooterSetUpImgClick(false);
  };
  // set footer setup imgage
  const handleFooterSetUp = () => {
    setFooterSetUpImgClick(true);
    setBannerSetUpImgClick(false);
    setHeaderSetUpImgClick(false);
    setCareerImgClick(false);
    setPageSetUpImgClick(false);
  };

  const previewUrl = career_page && career_page.career_page_url;

  // url api call for validation
  useEffect(() => {
    if (!isEmpty(formik.values.pagaeUrl) && isInput) {
      dispatch(urlVerificationMiddleWare({ url: formik.values.pagaeUrl })).then(
        (res) => {
          if (
            res.payload.success === 1 &&
            career_page &&
            career_page.career_page_url !== formik.values.pagaeUrl
          ) {
            setUrlError(true);
          } else {
            setUrlError(false);
          }
        },
      );
    }
  }, [formik.values.pagaeUrl]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Flex
        row
        style={{
          height: 'calc(100% - 55px)',
          display: 'flex',
          flexDirection: 'row',
          overflow: 'hidden',
          paddingBottom: '10px',
        }}
      >
        {isSubmitLoader && <Loader />}
        <Flex columnFlex width={"40%"} className={styles.leftFlex}>
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
        <Flex columnFlex width={"60%"}  className={styles.rightFlex}>
          <div style={{ width: '100%', padding: '0 10px' }}>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={<CareerTitle />}
              show={tileState?.careersPage}
              styles={{
                border: 'none',
                marginTop: '16px',
                boxShadow: '0 1px 4px 0 rgb(0 0 0 / 47%)',
              }}
              contentStyles={{ padding: '10px' }}
              onClick={() =>
                setTileState({
                  ...tileState,
                  careersPage: !tileState.careersPage,
                })
              }
            >
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
                  setReload={() => {
                    setReload(true);
                    setBtnDisable(false);
                  }}
                  isUrlError={isUrlError}
                />
              </div>
            </ExpandTile>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={<PageSetupTitle />}
              show={tileState?.pageSetup}
              styles={{
                border: 'none',
                marginTop: '16px',
                boxShadow: '0 1px 4px 0 rgb(0 0 0 / 47%)',
              }}
              contentStyles={{ padding: '10px' }}
              onClick={() =>
                setTileState({
                  ...tileState,
                  pageSetup: !tileState.pageSetup,
                })
              }
            >
              <div
                onClick={handlePageSetUpClick}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <PageSetup
                  formik={formik}
                  setReload={() => {
                    setReload(true);
                    setBtnDisable(false);
                  }}
                />
              </div>
            </ExpandTile>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={<HeaderSetupTitle />}
              show={tileState?.headerSetup}
              styles={{
                border: 'none',
                marginTop: '16px',
                boxShadow: '0 1px 4px 0 rgb(0 0 0 / 47%)',
              }}
              contentStyles={{ padding: '10px' }}
              onClick={() =>
                setTileState({
                  ...tileState,
                  headerSetup: !tileState.headerSetup,
                })
              }
            >
              <div
                onClick={handleHeaderSetUp}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <HeaderSetup
                  formik={formik}
                  company_detail={company_detail}
                  setReload={() => {
                    setReload(true);
                    setBtnDisable(false);
                  }}
                />
              </div>
            </ExpandTile>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={<BannerSetupTitle />}
              show={tileState?.bannerSetup}
              styles={{
                border: 'none',
                marginTop: '16px',
                boxShadow: '0 1px 4px 0 rgb(0 0 0 / 47%)',
              }}
              contentStyles={{ padding: '10px' }}
              onClick={() =>
                setTileState({
                  ...tileState,
                  bannerSetup: !tileState.bannerSetup,
                })
              }
            >
              <div
                onClick={handleBannerSetUp}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <BannerSetup
                  setBtnDisable={setBtnDisable}
                  formik={formik}
                  setFile={setFile}
                  imgUrl={imgUrl}
                  setReload={() => {
                    setReload(true);
                    setBtnDisable(false);
                  }}
                />
              </div>
            </ExpandTile>
            <ExpandTile
              backgroundColor="#58184530"
              activeColor="#000000"
              title={<FooterSetupTitle />}
              show={tileState?.buttonAndFooterSetup}
              styles={{
                border: 'none',
                marginTop: '16px',
                boxShadow: '0 1px 4px 0 rgb(0 0 0 / 47%)',
              }}
              contentStyles={{ padding: '10px' }}
              onClick={() =>
                setTileState({
                  ...tileState,
                  buttonAndFooterSetup: !tileState.buttonAndFooterSetup,
                })
              }
            >
              <div
                onClick={handleFooterSetUp}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
              >
                <FooterSetup
                  formik={formik}
                  setReload={() => {
                    setReload(true);
                    setBtnDisable(false);
                  }}
                />
              </div>
            </ExpandTile>
          </div>
        </Flex>
      </Flex>

      <Flex row between className={styles.actions}>
        <Flex>
          <LinkWrapper to="/">
            <Button types="primary">Dashboard</Button>
          </LinkWrapper>
        </Flex>
        <Flex row>
          {isEmpty(previewUrl) ? (
            <Button types="secondary" className={styles.previewBtn} disabled>
              Preview
            </Button>
          ) : (
            <LinkWrapper
              target={'_blank'}
              replace
              to={`/${previewUrl}/careers`}
            >
              <Button types="secondary" className={styles.previewBtn}>
                Preview
              </Button>
            </LinkWrapper>
          )}
          <Button
            onClick={() => {
              if (
                !isEmpty(formik.errors.pagaeUrl) ||
                isEmpty(formik.errors.pagaeUrl)
              ) {
                getFocus('CareersPageURL___urlInput');
              }
              formik.handleSubmit();
            }}
            disabled={isBtnDisable}
          >
            Save
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default BuildYourCareerPageScreen;
