import SvgBag from '../../../icons/SvgBag';
import SvgCalendar from '../../../icons/SvgCalendar';
import SvgLocation from '../../../icons/SvgLocation';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import styles from './bannercardlist.module.css';
import { JdFormEntity, CareerPageSetting } from './buildCareerPageTypes';

type Props = {
  jd_form: JdFormEntity[];
  career_page_setting: CareerPageSetting;
  total: number;
};

const BannerCardList = ({ jd_form, career_page_setting, total }: Props) => {
  const fontFamily = career_page_setting.page_font;
  const titleFontSize = career_page_setting.page_font_size + 2;
  const fontSize = career_page_setting.page_font_size;
  return (
    <Flex columnFlex className={styles.overAll}>
      {
        <Text
          size={20}
          bold
          className={styles.totalTextStyle}
          style={{ fontFamily, fontSize: titleFontSize }}
        >
          Total Jobs Found: {total}
        </Text>
      }
      <Flex
        row
        wrap
        // marginLeft={'10%'} marginRight={'10%'}
      >
        {jd_form &&
          jd_form.map((list, index) => (
            <div
              key={list.jd_status_id}
              style={{
                marginRight: index % 2 === 0 ? 10 : 0,
                marginLeft: index % 2 === 0 ? 0 : 10,
                marginBottom: 20,
                position: 'relative',
                width: '49%',
              }}
            >
              <Card className={styles.cardPadding}>
                <Flex row>
                  <Flex columnFlex flex={8}>
                    <LinkWrapper
                      target={'_parent'}
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
                      <SvgBag height={16} width={16} fill={PRIMARY} />
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
                  </Flex>
                  <Flex
                    columnFlex
                    between
                    className={styles.btnContainer}
                    flex={4}
                  >
                    <LinkWrapper
                      target={'_parent'}
                      to={`/${career_page_setting.career_page_url}/career_job_view/${list.id}/${list.job_title}`}
                    >
                      <Button
                        types="secondary"
                        style={{
                          borderColor: career_page_setting.button_color,
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
                </Flex>
                <Flex row>
                  <Flex flex={8}>
                    <Flex row center>
                      <SvgLocation height={16} width={16} fill={PRIMARY} />
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
                  </Flex>
                  <Flex flex={4}>
                    <Flex row center>
                      <SvgCalendar height={16} width={16} fill={PRIMARY} />
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
                </Flex>
              </Card>
            </div>
          ))}
      </Flex>
    </Flex>
  );
};

export default BannerCardList;
