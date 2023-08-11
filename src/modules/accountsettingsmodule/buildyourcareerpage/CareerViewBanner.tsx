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
import SvgJobTitles from '../../../icons/SvgJobTitles';
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
    <Flex  height={"100%"} width={"100%"}className={styles.overAll}>
      <Flex className={styles.imgFlex}>
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            alt="Banner"
            src={mediaPath + career_page_setting.banner_img}
            className={styles.bannerStyle}
          />
          <div className={styles.overLay} />
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
      </Flex>
      <Flex height={"100%"} style={{ padding: '10px 10px 10px 30px' }}>
        {jd_form && jd_form.length !== 0 && (
          <Card className={styles.searchCard} >
            <Flex row={!isMobile} center>
              <Flex marginRight={10}>
                <Text bold style={{ whiteSpace: 'nowrap' }}>
                  Im Interested in
                </Text>
              </Flex>
              <div style={{ position: 'relative', width: '50%' }}>
                <div className={styles.svgBagStyle}>
                  <SvgJobTitles
                    height={14}
                    width={14}
                    fill={career_page_setting.button_color}
                  />
                </div>

                <InputText
                  value={formik.values.job_title}
                  onChange={formik.handleChange('job_title')}
                  className={styles.jobTitleInput}
                  placeholder="Job Title"
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                  style={{ width: '100%' }}
                />
              </div>
              <Flex marginLeft={10}>
                <Text bold style={{ whiteSpace: 'nowrap' }}>
                  Located in
                </Text>
              </Flex>
              <div
                className={styles.locationDiv}
                style={{
                  position: 'relative',
                  width: '50%',
                  margin: !isMobile ? '0 10px' : '10px 0',
                }}
              >
                <div className={styles.svgLocation}>
                  <SvgLocation
                    height={14}
                    width={14}
                    fill={career_page_setting.button_color}
                  />
                </div>
                <InputText
                  onChange={formik.handleChange('job_location')}
                  value={formik.values.job_location}
                  className={styles.locationInput}
                  placeholder="Location"
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                  style={{ width: '100%' }}
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
        )}

        <div style={{height:"100%", width:"100%"}}
          className={cx('paddingStyle', 'marginAuto', {
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
                <Text align="center" color="gray">
                  No Current Openings
                </Text>
              )}
            </Flex>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
export default CareerViewBanner;
