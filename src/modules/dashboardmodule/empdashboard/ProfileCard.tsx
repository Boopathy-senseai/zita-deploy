import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { useState, useEffect } from 'react';
import { jobSelect } from '../../../appRoutesPath';
import SvgCompany from '../../../icons/SvgCompany';
import SvgNewTab from '../../../icons/SvgNewTab';
import SvgMail from '../../../icons/SvgMail';
import SvgLocation from '../../../icons/SvgLocation';
import { AppDispatch, RootState } from '../../../store';
import {
  companyPageInitalMiddleWare,
  companyPagePostMiddleWare,
} from '../../accountsettingsmodule/store/middleware/accountsettingmiddleware';
import SvgSubscription from '../../../icons/SvgSubscription';

import { userProfilePostMiddleWare } from '../../accountsettingsmodule/userprofilemodule/store/middleware/userprofilemiddleware';
import Toast from '../../../uikit/Toast/Toast';
import SvgDot from '../../../icons/SvgDot';
import {
  locationCityMiddleWare,
  locationStateMiddleWare,
  locationMiddleWare,
} from '../../createjdmodule/store/middleware/createjdmiddleware';
import SvgCreditsavailable from '../../../icons/SvgCreditsavailable';
import SvgCredits from '../../../icons/SvgCredits';
import SvgLocationicon from '../../../icons/SvgLocationicon';
import Loader from '../../../uikit/Loader/Loader';
import SvgUpload from '../../../icons/SvgUpload';
import SvgMobilet from '../../../icons/SvgMobilet';
import SvgMobile from '../../../icons/SvgMobile';
import SvgGlobe from '../../../icons/SvgGlobe';

// import { RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { BLACK, PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString, isEmpty, unlimitedHelper } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import { FILE_2MB, imageFileAccept, mediaPath } from '../../constValue';
import SvgCloseSmall from '../../../icons/SvgCloseSmall';

import styles from './profilecard.module.css';
import { CountryEntity, StateEntity, CityEntity } from './Companytype';
import { dashBoardMiddleWare } from './store/dashboardmiddleware';


const ProfileCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const {
    company_name,
    logo,
    user_info,
    plan,
    contact_count,
    job_count,
    candidate_count,
    career_page_url,
    permission,
    address,
    mobile_no,
    status,
    zipcode,
    weburl,
    data3,
    data2,
    datafin,
    company,
    cityid,
    stateid,
    countryid,
    countryidfin,
    noofemp,
    industryid,
  } = useSelector(
    ({
      dashboardEmpReducers,
      permissionReducers,
      companyPageReducers,
      locationReducers,
    }: RootState) => {
      return {
        company: companyPageReducers,
        countryidfin: locationReducers.country,
        industryid: companyPageReducers.company_detail.industry_type_id,
        noofemp: companyPageReducers.company_detail.no_of_emp,
        weburl: companyPageReducers.company_detail.company_website,
        datafin: companyPageReducers,
        address: companyPageReducers.company_detail.address,
        zipcode: companyPageReducers.company_detail.zipcode,
        data3: permissionReducers,
        data2: dashboardEmpReducers,
        mobile_no: companyPageReducers.company_detail.contact,
        company_name: dashboardEmpReducers.company_name,
        logo: dashboardEmpReducers.logo,
        user_info: dashboardEmpReducers.user_info,
        plan: dashboardEmpReducers.plan,
        job_count: dashboardEmpReducers.job_count,
        candidate_count: dashboardEmpReducers.candidate_count,
        contact_count: dashboardEmpReducers.contact_count,
        career_page_url: dashboardEmpReducers.career_page_url,
        status: dashboardEmpReducers.plan.is_active,
        permission: permissionReducers.Permission,
        super_user: permissionReducers.super_user,
        stateid: companyPageReducers.company_detail.state_id,
        cityid: companyPageReducers.company_detail.city_id,
        countryid: companyPageReducers.company_detail.country_id,
      };
    },
  );

  const logoPath = isEmpty(logo) ? 'logo.png' : logo;

  const clearTab = () => {
    sessionStorage.removeItem('superUserTab');
    sessionStorage.removeItem('superUserFalseTab');
  };

  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [getState, setState] = useState<StateEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);

  //   useEffect(() => {
  //     if (company!==null) {
  //       setState(company.state);
  //       setCity(company.city);
  //       setCountry(company.country);
  // }
  //   }, [company]);
  useEffect(() => {
    //  dispatch(companyPageInitalMiddleWare());
    dispatch(locationMiddleWare({}));
  }, []);

  useEffect(() => {
    if (countryidfin && countryidfin.length !== 0) {
      setCountry(countryidfin);
    }
  }, [countryidfin]);
  useEffect(() => {
    if (!isEmpty(countryid)) {
      dispatch(
        locationStateMiddleWare({
          country: countryid.toString(),
        }),
      ).then((res) => {
        if (res.payload.states && res.payload.states.length !== 0) {
          setState(res.payload.states);
        }
      });
    }
  }, [countryid]);
  useEffect(() => {
    if (!isEmpty(stateid)) {
      dispatch(locationCityMiddleWare({ state: stateid.toString() })).then(
        (res) => {
          if (res.payload.city && res.payload.city.length !== 0) {
            setCity(res.payload.city);
          }
        },
      );
    }
  }, [stateid]);

  const [state, setstate] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
  useEffect(() => {
    if (
      getCity.length !== 0 &&
      isGetCountry.length !== 0 &&
      getState.length !== 0
    ) {
      cityhand();
      statehand();
      countryhand();
    }
  }, [getCity, getState, isGetCountry]);

  function cityhand() {
    if (getCity.length !== 0) {
      {
        if (cityid !== null) {
          {
            setcity(getCity.find((option) => option.id === cityid).name);
          }
        }
      }
    }
  }
  function countryhand() {
    if (isGetCountry.length !== 0) {
      if (countryid !== null) {
        setcountry(isGetCountry.find((option) => option.id === countryid).name);
      }
    } else {
      console.log('else check');
    }
  }

  function statehand() {
    if (getState.length !== 0) {
      if (stateid !== null) {
        setstate(getState.find((option) => option.id === stateid).name);
      }
    }
  }
  const [isShow, setShow] = useState(false);
  const [isLoader, setLoader] = useState(false);
  // }
  // useEffect(() => {
  //   addressHandler();
  // }, [company]);

  // function addressHandler() {
  //   console.log("valuecheak",company);
  //   if (stateid !== null && cityid !== 0 && countryid !== 0 && company !== null) {
  //     const selectedState = company.state.filter((obj) => obj.id === stateid);
  //     console.log("valuecheak",selectedState);
  //     const selectedCity = company?.city?.find((obj) => obj.id === cityid);
  //     console.log("valuecheak",selectedCity);
  //     const selectedCountry = company?.country?.[0];

  //     setcity(selectedCity?.name || "");
  //     setcountry(selectedCountry?.name || "");
  //   }
  // }

  {
    //   const filtered = getCity.filter(obj => {
    //   return obj.id === cityid;
    // });
    // console.log("filter",filtered)
    //console.log("cityname",getCity.find((option) => (option.id) === (cityid)).name)}{
    //console.log("statename",getState.find((option) => (option.id) === (stateid)).name)}
  }
  const [isMb, setMb] = useState(false);
  const handleChangeImag = (e: any) => {
    e.preventDefault();
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

    if (imageFileAccept.indexOf(fileExt) < 0) {
      if (!isEmpty(fileExt)) {
        alert(
          'Invalid file selected, valid files are of ' +
          imageFileAccept.toString() +
          ' types.',
        );
      }
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      setLoader(true);
      const formData = new FormData();
      //alert("insilde else")
      if (e.target.files[0] !== undefined) {
        //alert("append")
        formData.append('logo', e.target.files[0]);
        formData.append('company_name', company_name);
        formData.append('company_website', weburl);
        formData.append('contact', mobile_no);
        //console.log("industryid", industryid);
        formData.append('industry_type', Tostring(industryid)); 
        formData.append('no_of_emp', Tostring(noofemp));
        formData.append('address', address);
        formData.append('country', Tostring(countryid));
        formData.append('state', Tostring(stateid));
        formData.append('city', Tostring(cityid));
        formData.append('zipcode', zipcode);
        formData.append('email', user_info.email);
      } else {
        formData.append('image_null', '');
      }
      //alert("00000")
      dispatch(
        companyPagePostMiddleWare({
          formData,
        }),
      ).then((res: any) => {
        dispatch(dashBoardMiddleWare());
        if (res.payload.data.success) {
          setLoader(false);
          Toast('Company logo saved successfully', 'LONG', 'success');
          setShow(false);
          // dispatch(companyPageInitalMiddleWare());
        }
      });
      setMb(false);
    }
  };
  
  function Tostring(res: any){
    if (res !== null && res !== undefined) {
      return res.toString() 
    }else {
      return ""
    }
  }
  const handleRemoveProfile = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append('logo', '');
    formData.append('company_name', company_name);
    formData.append('company_website', weburl);
    formData.append('contact', mobile_no);
    formData.append('industry_type', industryid.toString());
    formData.append('no_of_emp', noofemp.toString());
    formData.append('address', address);
    formData.append('country', countryid.toString());
    formData.append('state', stateid.toString());
    formData.append('city', cityid.toString());
    formData.append('zipcode', zipcode);
    formData.append('email', user_info.email);
    dispatch(
      companyPagePostMiddleWare({
        formData,
      }),
    ).then((res: any) => {
      if (res.payload.data.success) {
        dispatch(dashBoardMiddleWare()).then(() => {
          setLoader(false);
          Toast('Logo removed successfully', 'LONG', 'success');
        });
        setShow(false);
      }
    });
  };

  return (
    <Flex marginLeft={3}>
      <Card className={styles.profileCardMain}>
        <Flex middle marginTop={15}>
          <Flex className={styles.overAll}>
            {/* {console.log("sssssssssss",logoPath)} */}
            <label
              htmlFor="upload_profile___bannersetip__img"
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
              style={{ margin: 0 }}
            >
              <input
                id="upload_profile___bannersetip__img"
                type="file"
                onChange={handleChangeImag}
                accept="image/*"
                className={styles.fileStyle}
              />
              <Flex className={styles.imgContainer}>
                {isEmpty(logoPath) || logoPath === 'logo.png' ? (
                  <>
                    {isLoader ? (
                      <Flex center middle>
                        <Loader withOutOverlay size="medium" />
                      </Flex>
                    ) : (
                      <Flex columnFlex center middle>
                        <SvgUpload />
                        <Text
                          color="black"
                          align="center"
                          style={{ paddingLeft: 4, paddingRight: 4 }}
                        >
                          Upload Your Company Logo
                        </Text>
                      </Flex>
                    )}
                  </>
                ) : (
                  <>
                    {isLoader ? (
                      <Flex center middle>
                        <Loader withOutOverlay size="medium" />
                      </Flex>
                    ) : (
                      <img
                        style={{ objectFit: 'cover' }}
                        className={styles.imgStyle}
                        src={mediaPath + logoPath}
                        alt="profile"
                      //key={Math.random().toString()}
                      />
                    )}
                  </>
                )}

                {isShow && (
                  <Flex columnFlex center middle className={styles.changeStyle}>
                    <SvgUpload />
                    <Text
                      color="theme"
                      bold
                      align="center"
                      style={{ paddingLeft: 4, paddingRight: 4 }}
                    >
                      {isEmpty(logoPath) || logoPath === 'logo.png'
                        ? 'Upload Your Company Logo'
                        : 'Change Logo'}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </label>
            {isShow &&
              !isEmpty(logoPath) &&
              logoPath !== 'default.jpg' &&
              logoPath !== 'logo.png' && (
                <div
                  title="Remove Profile Picture"
                  className={styles.svgClose}
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                  onClick={handleRemoveProfile}
                  tabIndex={-1}
                  role="button"
                  onKeyDown={() => { }}
                >
                  <SvgCloseSmall />
                </div>
              )}

            {isMb && (
              <Text size={12} color="error">
                {FILE_2MB}
              </Text>
            )}
          </Flex>
        </Flex>
        <Flex marginTop={12}>
          <Text bold align="center" size={14} className={styles.companyColor}>
            {company_name}
          </Text>

          <Text style={{ marginBottom: 7, fontSize: '13px' }} align="center">
            {user_info.email}
          </Text>
          <Text align="center" bold style={{ fontSize: '13px' }}>
            Last Login on: {getDateString(user_info?.last_login, 'll hh:mm A')}
          </Text>
        </Flex>

        <Flex
          marginLeft={20}
          marginRight={20}
          className={styles.line}
          marginBottom={20}
          marginTop={20}
        ></Flex>
        <Flex marginLeft={20}>
          <Flex>
            {weburl === null || weburl === 'https://' ? (
              <Flex row center>
                <Flex marginBottom={2}>
                  <SvgGlobe height={16} width={16} fill={'#581845'} />
                </Flex>
                <Flex marginLeft={7}>
                  <LinkWrapper
                    onClick={() => {
                      sessionStorage.setItem('superUserTabTwo', '0');
                      sessionStorage.setItem('superUserFalseTab', '0');
                      sessionStorage.setItem('superUserTab', '0');
                    }}
                    to={'/account_setting/settings/'}
                  >
                    <Text
                      style={{
                        color: '#581845',
                        fontSize: '13px',
                        // marginLeft: ' 10px',
                      }}
                      bold
                    >
                      Add Website URL
                    </Text>
                  </LinkWrapper>
                </Flex>
              </Flex>
            ) : (
              <Flex row center>
                <Flex>
                  <SvgGlobe height={16} width={16} fill={'#581845'} />
                </Flex>
                <Flex marginLeft={8}>
                  {' '}
                  <a target={'_blank'} rel="noreferrer" href={weburl}>
                    <Text
                      style={{
                        // marginBottom: '4px',
                        color: '#581845',
                        fontWeight: 600,
                        fontSize: '13px',
                      }}
                      tag={undefined}
                    >
                      {weburl}
                    </Text>
                  </a>
                </Flex>
              </Flex>
            )}
          </Flex>

          <Flex style={{ cursor: 'default' }} marginTop={7}>
            {mobile_no !== '' ? (
              <Flex row center>
                <Flex>
                  <SvgMobilet height={16} width={16} fill={'#581845'} />
                </Flex>
                <Flex marginLeft={5}>
                  <Text style={{ fontSize: '13px !important' }}>
                    <PhoneInput
                      value={mobile_no}
                      inputStyle={{
                        border: 'none',
                        padding: 'inherit',
                        height: '30px',
                        cursor: 'default',
                        fontSize: '13px',
                      }}
                      showDropdown={false}
                      defaultErrorMessage="false"
                      disableDropdown={true}
                      disableSearchIcon={true}
                      country={null}
                      disabled={true}
                      buttonStyle={{ display: 'none' }}
                      dropdownStyle={{ display: 'none' }}
                    />
                  </Text>
                </Flex>
              </Flex>
            ) : (
              ''
            )}
          </Flex>
          <Flex marginTop={3}>
            {address !== null ? (
              <Flex row marginTop={3}>
                <Flex marginRight={1}>
                  <SvgLocationicon height={16} width={16} fill={'#581845'} />
                </Flex>
                <Flex
                  marginLeft={5}
                  className={styles.address}
                  title={`${address}, ${city}, ${state}, ${country}, ${zipcode}`}
                >
                  {address}, {city}, {state}, {country}, {zipcode}
                </Flex>
              </Flex>
            ) : (
              <Flex row center marginTop={3}>
                <Flex>
                  <SvgLocationicon height={16} width={16} fill={'#581845'} />
                </Flex>
                <Flex marginLeft={5}>
                  <LinkWrapper
                    onClick={() => {
                      sessionStorage.setItem('superUserTabTwo', '0');
                      sessionStorage.setItem('superUserFalseTab', '0');
                      sessionStorage.setItem('superUserTab', '0');
                    }}
                    to={'/account_setting/settings'}
                  >
                    <Text
                      style={{
                        color: '#581845',
                        fontSize: '13px',
                        // marginLeft: '5px',
                      }}
                      bold
                    >
                      Add Company Address
                    </Text>
                  </LinkWrapper>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
        <Flex
          marginLeft={20}
          marginRight={20}
          className={styles.line}
          marginBottom={20}
          marginTop={20}
        ></Flex>
        <Flex row>
          <Flex>
            <Flex>
              <Flex marginLeft={18}>
                <Text
                  style={{ marginLeft: 2, fontWeight: 550, fontSize: '14px' }}
                  bold
                >
                  Subscription
                </Text>
              </Flex>
            </Flex>

            <Flex marginLeft={20}>
              <Flex>
                <Text style={{ marginTop: 5, fontSize: '13px' }}>
                  Plan:
                  {plan.plan_id_id === 1 ? (
                    <Text
                      style={{
                        marginBottom: 2,
                        fontSize: '13px',
                        marginLeft: 3,
                      }}
                    >
                      Free Trial
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginBottom: 2,
                        fontSize: '13px',
                        marginLeft: 3,
                      }}
                    >
                      {' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 3
                        ? 'Basic'
                        : 'Pro'}{' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 4
                        ? '(Monthly)'
                        : '(Annual)'}
                    </Text>
                  )}
                </Text>
                <Text style={{ marginTop: 5, fontSize: '13px' }}>
                  Status:{' '}
                  {status === false ? (
                    <Text
                      style={{
                        color: '#FF0000',
                        fontWeight: 600,
                        fontSize: '13px',
                      }}
                    >
                      Expired
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: '#00BE4B',
                        fontWeight: 600,
                        fontSize: '13px',
                      }}
                    >
                      Active
                    </Text>
                  )}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    whiteSpace: 'nowrap',
                    fontSize: '13px',
                  }}
                >
                  Renewal: {getDateString(plan.subscription_valid_till, 'll')}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex marginLeft={87}>
            <Flex row>
              {/* <Flex marginLeft={5} marginTop={5}>
                <SvgCredits />

              </Flex> */}
              <Flex>
                <Text style={{ fontWeight: 550, fontSize: '14px' }} bold>
                  Credits Availability
                </Text>
              </Flex>
            </Flex>
            <Flex row>
              <Flex>
                <Text style={{ marginTop: 5, fontSize: '13px' }}>
                  Contact Credits:
                </Text>
              </Flex>

              <Flex marginLeft={3} marginTop={5}>
                <Text
                  style={{ color: 'black', fontSize: '13px' }}
                  className={styles.textoverflow}
                  title={`${contact_count}`}
                >
                  {contact_count}
                </Text>
              </Flex>
            </Flex>
            <Flex row>
              <Flex marginTop={5}>
                <Text style={{ fontSize: '13px' }}>Jobs:</Text>
              </Flex>
              {/* {console.log("filtercity::",getCity.find((option) => (option.id) === (cityid)).name)} */}
              <Flex marginLeft={3} marginTop={5}>
                <Text
                  style={{ color: 'black', fontSize: '13px' }}
                  className={styles.textoverflow1}
                >
                  {unlimitedHelper(job_count)}
                </Text>
              </Flex>
            </Flex>

            <Flex row>
              <Flex marginTop={5}>
                <Text style={{ fontSize: '13px' }}>Candidates:</Text>
              </Flex>

              <Flex marginLeft={3} marginTop={5}>
                <Text
                  style={{ color: 'black', fontSize: '13px' }}
                  className={styles.textoverflow1}
                >
                  {unlimitedHelper(candidate_count)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          marginLeft={20}
          marginRight={20}
          className={styles.line}
          marginTop={20}
          marginBottom={20}
        ></Flex>
        {/* <Flex row> */}
        {/* <Flex marginLeft={23} className={styles.pointer} marginTop={5}> {permission.includes('create_post') && (
            <LinkWrapper to={jobSelect}>
              <Button style={{ marginBottom: 8 }} className={styles.buttonsize}>Post Job</Button>
            </LinkWrapper>
          )}</Flex> */}

        {permission.includes('create_post') === false ? (
          <Flex marginLeft={12} marginRight={12} marginTop={6} marginBottom={6}>
            <LinkWrapper
              target={isEmpty(career_page_url) ? '_parent' : '_blank'}
              to={
                isEmpty(career_page_url)
                  ? `/account_setting/settings?tab=1`
                  : `/${career_page_url}/careers`
              }
            >
              <Button className={styles.buttonsizeauto}>
                {/* <Flex row center className={styles.pointer} > */}
                {/* <Text bold style={{ color: "white", marginLeft: 123 }} > */}
                Careers Page
                {/* </Text> */}
                {/* </Flex> */}
              </Button>
            </LinkWrapper>
          </Flex>
        ) : (
          <Flex row between style={{ padding: '0 20px' }}>
            <Flex className={styles.pointer}>
              {' '}
              {permission.includes('create_post') && (
                <LinkWrapper to={jobSelect}>
                  <Button className={styles.buttonsize}>Post Job</Button>
                </LinkWrapper>
              )}
            </Flex>
            <Flex>
              <LinkWrapper
                target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                to={
                  isEmpty(career_page_url)
                    ? `/account_setting/settings?tab=1`
                    : `/${career_page_url}/careers`
                }
              >
                <Button className={styles.buttonsize}>
                  {/* <Flex row center className={styles.pointer} > */}
                  {/* <Text bold style={{ color: "white", marginLeft: 10 }} > */}
                  Careers Page
                  {/* </Text> */}
                  {/* </Flex> */}
                </Button>
              </LinkWrapper>
            </Flex>
          </Flex>
        )}
        {/* </Flex> */}
      </Card>
    </Flex>
  );
};

export default ProfileCard;
