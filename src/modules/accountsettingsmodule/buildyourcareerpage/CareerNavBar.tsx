import { useHistory } from 'react-router-dom';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import { CareerPageSetting, CompanyDetailEntity } from './buildCareerPageTypes';
import styles from './careernavbar.module.css';

type Props = {
  career_page_setting: CareerPageSetting;
  company_detail: CompanyDetailEntity;
};
const CareerNavBar = ({ career_page_setting, company_detail }: Props) => {
  const history = useHistory();
  const menuStyle = {
    fontSize: career_page_setting.header_font_size,
    fontFamily: career_page_setting.page_font,
    cursor: 'pointer',
  };
  return (
    <div
      className={styles.overAll}
      style={{ backgroundColor: career_page_setting.header_color }}
    >
      <img
        className={styles.profile}
        alt="logo"
        src={mediaPath + company_detail.logo}
      />
      <Flex row center>
        {!isEmpty(career_page_setting.menu_1) && (
          <a
            href={career_page_setting.menu_1_url}
            target="_parent"
            rel="noreferrer"
          >
            <Text className={styles.menu1Style} bold style={menuStyle}>
              {career_page_setting.menu_1}
            </Text>
          </a>
        )}
        {!isEmpty(career_page_setting.menu_2) && (
          <a
            href={career_page_setting.menu_2_url}
            target="_blank"
            rel="noreferrer"
          >
            <Text className={styles.menu2Style} bold style={menuStyle}>
              {career_page_setting.menu_2}
            </Text>
          </a>
        )}
        {!isEmpty(career_page_setting.menu_3) && (
          <a
            href={career_page_setting.menu_3_url}
            target="_blank"
            rel="noreferrer"
          >
            <Text className={styles.menu3Style} bold style={menuStyle}>
              {career_page_setting.menu_3}
            </Text>
          </a>
        )}
        <Flex row center>
          <Text bold style={menuStyle} onClick={() => history.push('/login')}>
            Login
          </Text>
          <Text
            bold
            style={{
              fontSize: career_page_setting.header_font_size,
              fontFamily: career_page_setting.page_font,
              margin: '0 2px',
            }}
          >
            /
          </Text>
          <Text
            bold
            style={menuStyle}
            onClick={() =>
              history.push(
                `/candidate_profile_upload/${career_page_setting?.recruiter_id_id}`,
              )
            }
          >
            Sign Up
          </Text>
        </Flex>
      </Flex>
    </div>
  );
};

export default CareerNavBar;
