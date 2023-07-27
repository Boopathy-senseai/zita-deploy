import { useMediaQuery } from 'react-responsive';
import SvgBag from '../../../icons/SvgBag';
import SvgCalendar from '../../../icons/SvgCalendar';
import SvgLocation from '../../../icons/SvgLocation';
import Totalcount from '../../../globulization/TotalCount';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { GARY_4 } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import styles from './bannercardlist.module.css';
import BannerCardView from './BannerCardView';
import { JdFormEntity, CareerPageSetting } from './buildCareerPageTypes';

type Props = {
  jd_form: JdFormEntity[];
  career_page_setting: CareerPageSetting;
  total: number;
};

const BannerCardList = ({ jd_form, career_page_setting, total }: Props) => {
  const isTablet = useMediaQuery({ query: '(max-width: 1050px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
  const fontFamily = career_page_setting.page_font;
  const titleFontSize = career_page_setting.page_font_size + 2;
  const fontSize = career_page_setting.page_font_size;
  return (
    <Flex columnFlex className={styles.overAll}>
    <Totalcount 
    name="Total Jobs Found "
    numbers={total}
  />
       
     
      {isMobile && (
        <Flex>
          {jd_form &&
            jd_form.map((list) => (
              <div
                style={{
                  marginBottom: 20,
                  position: 'relative',
                  width: '100%',
                }}
                key={Date.now()}
              >
                <Card className={styles.cardPadding}>
                  <Flex center columnFlex middle>
                    <LinkWrapper
                      onClick={() =>
                        localStorage.setItem('careerJobTitle', list.job_title)
                      }
                      to={`/${career_page_setting.career_page_url}/career_job_view/${list.id}/${list.job_title}`}
                    >
                      <Text
                        bold
                        style={{
                          fontFamily,
                          fontSize: titleFontSize,
                        }}
                      >
                        {list.job_title}
                      </Text>
                    </LinkWrapper>
                    <Flex row center className={styles.lineHeight}>
                      <SvgBag height={16} width={16} fill={GARY_4} />
                      <Text
                        className={styles.labelStyle}
                        style={{
                          fontFamily,
                          fontSize,
                        }}
                      >
                        {list.job_type__label_name}
                      </Text>
                    </Flex>
                    <Flex row center>
                      <SvgLocation height={16} width={16} fill={GARY_4} />
                      <Text
                        className={styles.labelStyle}
                        style={{
                          fontFamily,
                          fontSize,
                        }}
                      >
                        {list.job_location}
                      </Text>
                    </Flex>
                    <Flex center middle>
                    <LinkWrapper
                      // target={'_parent'}
                      onClick={() =>
                        localStorage.setItem('careerJobTitle', list.job_title)
                      }
                      to={`/${career_page_setting.career_page_url}/career_job_view/${list.id}/${list.job_title}`}
                    >
                      <Button
                        types="secondary"
                        style={{
                          borderColor: career_page_setting.button_color,
                          margin: '16px 0'
                        }}
                      >
                        <Text
                          style={{ color: career_page_setting.button_color }}
                        >
                          Apply
                        </Text>
                      </Button>
                    </LinkWrapper>
                    </Flex>
                    <Flex row center>
                      <SvgCalendar height={16} width={16} fill={GARY_4} />
                      <Text
                        className={styles.labelStyle}
                        style={{
                          fontFamily,
                          fontSize,
                        }}
                      >
                        {getDateString(list.job_posted_on, 'll')}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </div>
            ))}
        </Flex>
      )}
      {!isMobile && (
        <Flex row wrap>
          {jd_form &&
            jd_form.map((list, index) => (
            <BannerCardView 
            key={Date.now()+index.toString()}
            list={list}
            index={index}
            isTablet={isTablet}
            career_page_setting={career_page_setting}
            fontFamily={fontFamily}
            titleFontSize={titleFontSize}
            fontSize={fontSize}
            />
            ))}
          {jd_form.length === 1 && (
            <div
              style={{
                marginLeft: 10,
                marginBottom: 20,
                position: 'relative',
                width: '49%',
              }}
            >
              <></>
            </div>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default BannerCardList;
