import classNames from 'classnames/bind';
import { FormikProps } from 'formik';
import { useMediaQuery } from 'react-responsive';
import SvgBag from '../../../icons/SvgBag';
import SvgLocation from '../../../icons/SvgLocation';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { GARY_4 } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { enterKeyPress } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import BannerCardList from './BannerCardList';
import { CareerPageSetting, JdFormEntity } from './buildCareerPageTypes';
import styles from './careerviewbanner.module.css';

const cx = classNames.bind(styles);


type Props = {
  career_page_setting: CareerPageSetting;
  jd_form: JdFormEntity[];
  total: number;
  formik: FormikProps<any>;
  jd_active: boolean;
};

const CareerViewBanner = ({
  career_page_setting,
  jd_form,
  total,
  formik,
  jd_active,
}: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });
  const fontFamily = career_page_setting.page_font;
  return (
    <Flex className={styles.overAll}>
      <Flex className={styles.imgFlex}>
        <div style={{position:'relative',width:'100%'}}>
        <img
          alt="Banner"
          src={mediaPath + career_page_setting.banner_img}
          className={styles.bannerStyle}
        />
         <div className={styles.overLay}/>
         </div>
        <Flex center middle className={styles.innerText}>
          <Text
            align="center"
            color="white"
            bold
            style={{
              fontSize: career_page_setting.banner_heading_size,
              fontFamily,
            }}
          >
            {career_page_setting.banner_header_text}
          </Text>
          <Text
            align="center"
            color="white"
            style={{
              fontSize: career_page_setting.banner_font_size,
              fontFamily,
            }}
            className={styles.bannerTextStyle}
          >
            {career_page_setting.banner_text}
          </Text>
        </Flex>
        <Card className={styles.searchCard}>
          <Flex row={!isMobile} top>
            <div style={{ position: 'relative',width:'100%', }}>
              <div className={styles.svgBagStyle}>
                <SvgBag height={16} width={16} fill={GARY_4} />
              </div>

              <InputText
                value={formik.values.job_title}
                onChange={formik.handleChange('job_title')}
                className={styles.jobTitleInput}
                placeholder="Job Title"
                onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
              />
            </div>
            <div className={styles.locationDiv} style={{ position: 'relative',width:'100%',margin:!isMobile ? '0 16px': '16px 0' }}>
              <div className={styles.svgLocation}>
                <SvgLocation height={16} width={16} fill={GARY_4} />
              </div>
              <InputText
                onChange={formik.handleChange('job_location')}
                value={formik.values.job_location}
                className={styles.locationInput}
                placeholder="Location"
                onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
              />
            </div>

            <Button
              disabled={
                formik.values.job_title === '' &&
                formik.values.job_location === ''
              }
              style={{
                backgroundColor: career_page_setting.button_color,
                borderColor: career_page_setting.button_color,
              }}
              onClick={formik.handleSubmit}
            >
              Search
            </Button>
          </Flex>
        </Card>
      </Flex>
      <div
        className={cx('paddingStyle','marginAuto', {
          disPlayStyle: jd_form && jd_form.length === 0,
        })}
      >
        {jd_form && jd_form.length !== 0 ? (
          <BannerCardList
            key={Date.now()}
            total={total}
            jd_form={jd_form}
            career_page_setting={career_page_setting}
          />
        ) : (
          <Flex flex={1} center middle height={200}>
            {jd_active === true && (
              <Text align="center" color="gray">
                No jobs found
              </Text>
            )}
            {jd_active !== true && (
              <Text align="center" bold>
                No Current Openings
              </Text>
            )}
          </Flex>
        )}
      </div>
    </Flex>
  );
};
export default CareerViewBanner;
