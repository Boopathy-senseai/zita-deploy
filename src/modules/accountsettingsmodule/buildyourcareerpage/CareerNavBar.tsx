import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import SvgMenuOne from '../../../icons/SvgMenuOne';
import SvgUser from '../../../icons/SvgUser';
import { BLACK } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Drawer from '../../../uikit/Drawer/Drawer';
import SvgCloseSmall from '../../../icons/SvgCloseSmall';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import { Button } from '../../../uikit';
import { CareerPageSetting, CompanyDetailEntity } from './buildCareerPageTypes';
import styles from './careernavbar.module.css';

type Props = {
  career_page_setting: CareerPageSetting;
  company_detail: CompanyDetailEntity;
  loginUser?: boolean;
  image: string;
  fName: string;
  lName: string;
};
const CareerNavBar = ({
  career_page_setting,
  company_detail,
  loginUser,
  image,
  lName,
  fName,
}: Props) => {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const menuStyle = {
    fontSize: career_page_setting.header_font_size,
    fontFamily: career_page_setting.page_font,
    color: career_page_setting.font_color,
    cursor: 'pointer',
    // backgroundColor: career_page_setting.button_color,
  };
  const isMobile = useMediaQuery({ query: '(max-width: 850px)' });

  useEffect(() => {
    localStorage.setItem('jobViewLogo', mediaPath + company_detail.logo);
  }, []);

  return (
    <div
      className={styles.overAll}
      style={{ backgroundColor: career_page_setting.header_color }}
    >
      <Flex row center>
        {!isEmpty(company_detail.logo) ? (
          <img
            className={styles.profile}
            alt="logo"
            src={mediaPath + company_detail.logo}
          />
        ) : (
          <div />
        )}
        <Flex row marginLeft={50}>
          {!isEmpty(career_page_setting.menu_1) && (
            <a
              href={career_page_setting.menu_1_url}
              target="_blank"
              rel="noreferrer"
            >
              <Text bold className={styles.menu1Style} style={menuStyle}>
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
              <Text bold className={styles.menu2Style} style={menuStyle}>
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
              <Text bold className={styles.menu3Style} style={menuStyle}>
                {career_page_setting.menu_3}
              </Text>
            </a>
          )}
        </Flex>
      </Flex>

      <Drawer open={isOpen}>
        <div className={styles.menuStyle}>
          <div
            tabIndex={-1}
            role="button"
            onKeyPress={() => {}}
            onClick={() => setOpen(false)}
            className={styles.svgClose}
          >
            <SvgCloseSmall fill="#888888" />
          </div>
          <Flex columnFlex>
            {!isEmpty(career_page_setting.menu_1) && (
              <a
                href={career_page_setting.menu_1_url}
                target="_blank"
                rel="noreferrer"
                className={styles.menuStyleText}
                onClick={() => setOpen(false)}
              >
                <Text style={menuStyle}>{career_page_setting.menu_1}</Text>
              </a>
            )}
            {!isEmpty(career_page_setting.menu_2) && (
              <a
                href={career_page_setting.menu_2_url}
                target="_blank"
                rel="noreferrer"
                className={styles.menuStyleText}
                onClick={() => setOpen(false)}
              >
                <Text style={menuStyle}>{career_page_setting.menu_2}</Text>
              </a>
            )}
            {!isEmpty(career_page_setting.menu_3) && (
              <a
                href={career_page_setting.menu_3_url}
                target="_blank"
                rel="noreferrer"
                className={styles.menuStyleText}
                onClick={() => setOpen(false)}
              >
                <Text style={menuStyle}>{career_page_setting.menu_3}</Text>
              </a>
            )}
            {loginUser && (
              <Flex>
                <Text
                  className={styles.menuStyleText}
                  style={menuStyle}
                  onClick={() =>
                    history.push(
                      `/candidate_profile_upload/${career_page_setting?.recruiter_id_id}`,
                    )
                  }
                >
                  Candidate Login
                </Text>
                {/* <Text       
                  style={{
                    fontSize: career_page_setting.header_font_size,
                    fontFamily: career_page_setting.page_font,
                    margin: '0 2px',
                  }}
                >
                  /
                </Text> */}
                <Text
                  style={menuStyle}
                  onClick={() =>
                    history.push(
                      `/candidate_profile_upload/${career_page_setting?.recruiter_id_id}`,
                    )
                  }
                >
                  Candidate Sign Up
                </Text>
              </Flex>
            )}
          </Flex>
        </div>
      </Drawer>
      {isMobile ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {!loginUser && (
            <LinkWrapper to="/">
              <Flex row center marginRight={8}>
                <div style={{ marginRight: 16, cursor: 'pointer' }}>
                  {isEmpty(image) || image === 'default.jpg' ? (
                    <SvgUser height={30} width={30} />
                  ) : (
                    <img
                      style={{ objectFit: 'cover' }}
                      src={mediaPath + image}
                      alt="profile"
                      className={styles.candiProfile}
                    />
                  )}
                </div>
                <Text style={menuStyle}>
                  {fName} {lName}
                </Text>
              </Flex>
            </LinkWrapper>
          )}
          <div
            tabIndex={-1}
            role="button"
            onKeyPress={() => {}}
            onClick={() => setOpen(true)}
          >
            <SvgMenuOne fill={BLACK} />
          </div>
        </div>
      ) : (
        <Flex row center>
          {/* {!isEmpty(career_page_setting.menu_1) && (
            <a
              href={career_page_setting.menu_1_url}
              target="_blank"
              rel="noreferrer"
            >
              <Text className={styles.menu1Style} style={menuStyle}>
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
              <Text className={styles.menu2Style} style={menuStyle}>
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
              <Text className={styles.menu3Style} style={menuStyle}>
                {career_page_setting.menu_3}
              </Text>
            </a>
          )} */}
          {loginUser ? (
            <Flex row center>
              <Flex
                className={styles.login}
                // types="secondary"
                style={menuStyle}
                onClick={() =>
                  history.push(
                    `/candidate_profile_upload/${career_page_setting?.recruiter_id_id}`,
                  )
                }
              >
                <Button
                  className={styles.loginbtn}
                  types="secondary"
                  style={{
                    fontFamily: "'Roboto', sans-serif",
                    // color: career_page_setting.font_color ,
                    height: '100%',
                    border:"2px solid",
                    borderColor: career_page_setting.font_color,
                    background:"none"
                  }}
                >
                  <Text bold style={{color: career_page_setting.font_color ,}}>
                  Login / Sign Up
                  </Text>
                  
                </Button>
              </Flex>

              {/* <Button
                style={menuStyle}
                onClick={() =>
                  history.push(
                    `/candidate_profile_upload/${career_page_setting?.recruiter_id_id}`,
                  )
                }
              >
                Sign Up
              </Button> */}
              <Flex
                style={{
                  borderLeft: '1px solid',
                  borderColor: career_page_setting.font_color,
                }}
              >
                <Text
                  style={{
                    // fontSize: career_page_setting.header_font_size,
                    // fontFamily: career_page_setting.page_font,
                    color: career_page_setting.font_color,
                    margin: '10px',
                    height: '100%',
                  }}
                >
                  For Candidate
                </Text>
              </Flex>
            </Flex>
          ) : (
            <LinkWrapper to="/">
              <Flex row center>
                <div style={{ marginRight: 16, cursor: 'pointer' }}>
                  {isEmpty(image) || image === 'default.jpg' ? (
                    <SvgUser height={30} width={30} />
                  ) : (
                    <img
                      style={{ objectFit: 'cover' }}
                      src={mediaPath + image}
                      alt="profile"
                      className={styles.candiProfile}
                    />
                  )}
                </div>
                <Text style={menuStyle}>
                  {fName} {lName}
                </Text>
              </Flex>
            </LinkWrapper>
          )}
        </Flex>
      )}
    </div>
  );
};

export default CareerNavBar;
