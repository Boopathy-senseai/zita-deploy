import { useState } from 'react';
import SvgBag from '../../../icons/SvgBag';
import SvgCalendar from '../../../icons/SvgCalendar';
import SvgLocation from '../../../icons/SvgLocation';
import { GARY_4, WHITE } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text/Text';
import { getDateString } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Card from '../../../uikit/Card/Card';
import Button from '../../../uikit/Button/Button';
import styles from './bannercardlist.module.css';

const BannerCardView = ({
  list,
  index,
  isTablet,
  career_page_setting,
  fontFamily,
  titleFontSize,
  fontSize,
}: any) => {
  const [isHover, setHover] = useState(false);

  // color code condition
  function hexToRGB(hex: any, alpha: any) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    } else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  }

  return (
    <div
      key={list.jd_status_id + index.toString()}
      style={{
        marginRight: 20,
        marginBottom: 20,
        position: 'relative',
        width: !isTablet ? '30%' : '100%',
      }}
    >
      <Card className={styles.cardPadding}>
        <Flex row>
          <Flex columnFlex flex={8}>
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
                  color: career_page_setting.button_color 
                }}
              >
                {list.job_title}
              </Text>
            </LinkWrapper>
            <Flex row center className={styles.lineHeight}>
              <SvgBag
                height={14}
                width={14}
                fill={career_page_setting.button_color}
              />
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
          <Flex columnFlex between className={styles.btnContainer}>
            <LinkWrapper
              onClick={() =>
                localStorage.setItem('careerJobTitle', list.job_title)
              }
              to={`/${career_page_setting.career_page_url}/career_job_view/${list.id}/${list.job_title}`}
            >
              <Button
                types="secondary"
                style={{
                  borderColor: career_page_setting.button_color,
                  // backgroundColor: isHover
                  //   ? hexToRGB(career_page_setting.button_color, 0.2)
                  //   : career_page_setting.button_color,
                  backgroundColor: career_page_setting.button_color,
                  // width: 106,
                  

                }}
                onMouseOver={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Text bold style={{ color: career_page_setting.button_color !== WHITE ?  WHITE : career_page_setting.button_color }}>
                  Apply
                </Text>
              </Button>
            </LinkWrapper>
          </Flex>
        </Flex>
        <Flex row>
          <Flex flex={8}>
            <Flex row top>
              <SvgLocation
                height={16}
                width={16}
                fill={career_page_setting.button_color}
              />
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
          <Flex>
            <Flex row center>
              <SvgCalendar
                height={14}
                width={14}
                fill={career_page_setting.button_color}
              />
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
  );
};

export default BannerCardView;
