import classNames from 'classnames/bind';
import { useMediaQuery } from 'react-responsive';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import { zitaPath } from '../../constValue';
import { CareerPageSetting, CompanyDetailEntity } from './buildCareerPageTypes';
import styles from './careerviewfooter.module.css';
const cx = classNames.bind(styles);

type Props = {
  career_page_setting: CareerPageSetting;
  company_detail: CompanyDetailEntity;
};

const CareerViewFooter = ({ career_page_setting, company_detail }: Props) => {
  const fontFamily = career_page_setting.page_font;
  const fontSize = career_page_setting.page_font_size;
  const isTablet = useMediaQuery({ query: '(max-width: 550px)' });

  return (
    <Flex columnFlex>
      <div className={styles.divStyle}>
        <Flex className={styles.aboutFlex}>
          <Flex
            marginTop={isTablet ? 20 : 0}
            marginBottom={isTablet ? 20 : 0}
            row={!isTablet}
            between
            className={cx({
              aboutInnerFlex: !isEmpty(career_page_setting.about_us),
            })}
          >
            {!isEmpty(career_page_setting.about_us) && (
              <div style={{ display: 'flex' }}>
                <Flex  className={styles.aboutText}>
                  <Text bold style={{ fontFamily, fontSize, marginBottom: 8 }}>
                    About Us
                  </Text>
                  <Text style={{ fontFamily, fontSize, lineBreak: 'anywhere' }}>
                    {career_page_setting.about_us}
                  </Text>
                </Flex>
              </div>
            )}

            <Flex
              marginTop={isTablet ? 20 : 0}
              columnFlex
              className={styles.contactFlex}
              
            >
              <Text bold style={{ fontFamily, fontSize, marginBottom: 6 }}>
                Contact Us
              </Text>
              <Text bold style={{ fontFamily, fontSize }}>
                {company_detail.company_name}
              </Text>
              {!isEmpty(company_detail.address) && (
                <Text style={{ fontFamily, fontSize }}>
                  {company_detail.address},
                </Text>
              )}
              {!isEmpty(company_detail.city__name) && (
                <Text style={{ fontFamily, fontSize }}>
                  {company_detail.city__name}, {company_detail.state__name} -{' '}
                  {company_detail.zipcode}
                </Text>
              )}
              <Text style={{ fontFamily, fontSize }}>
                {company_detail.country__name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <div
        style={{
          backgroundColor: career_page_setting.footer_color,
          cursor: 'pointer',
        }}
        className={styles.footerStyle}
      >
        <Text
          align="center"
          bold
          color='theme'
          size={14}
          // style={{ fontFamily }}
          onClick={zitaPath}
        >
          Powered by Zita.ai
        </Text>
      </div>
    </Flex>
  );
};

export default CareerViewFooter;
