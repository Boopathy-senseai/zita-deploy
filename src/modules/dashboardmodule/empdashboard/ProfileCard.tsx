import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import PhoneInput from 'react-phone-input-2';
import { useState, useEffect } from "react";
import { jobSelect } from '../../../appRoutesPath';
import SvgCompany from '../../../icons/SvgCompany';
import SvgNewTab from '../../../icons/SvgNewTab';
import SvgMail from '../../../icons/SvgMail';
import SvgLocation from '../../../icons/SvgLocation';
import { AppDispatch, RootState } from '../../../store';
import SvgSubscription from '../../../icons/SvgSubscription';

import SvgDot from '../../../icons/SvgDot';
import {
  locationCityMiddleWare,
  locationStateMiddleWare,
  locationMiddleWare,
} from '../../createjdmodule/store/middleware/createjdmiddleware';
import SvgCreditsavailable from '../../../icons/SvgCreditsavailable';
import SvgCredits from '../../../icons/SvgCredits';
import SvgLocationicon from '../../../icons/SvgLocationicon';
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
import { mediaPath } from '../../constValue';

import styles from './profilecard.module.css';
import { CountryEntity, StateEntity, CityEntity } from './Companytype';



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


  } = useSelector(({ dashboardEmpReducers, permissionReducers, companyPageReducers, locationReducers }: RootState) => {
    return {
      company: companyPageReducers,
      countryidfin: locationReducers.country,
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
  });


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
    // dispatch(companyPageInitalMiddleWare());
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
      dispatch(
        locationCityMiddleWare({ state: stateid.toString() }),
      ).then((res) => {
        if (res.payload.city && res.payload.city.length !== 0) {
          setCity(res.payload.city);
        }
      });
    }
  }, [stateid]);

  const [state, setstate] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  useEffect(() => {

    cityhand()
    statehand()
    countryhand()
  }, [getCity, getState, isGetCountry]);

  function cityhand() {
    if (getCity.length !== 0) {
      {

        { setcity(getCity.find((option) => (option.id) === (cityid)).name) }
      }
    }
  }
  function countryhand() {
    if (isGetCountry.length !== 0) {
      { setcountry(isGetCountry.find((option) => (option.id) === countryid).name) }
    }
  }

  function statehand() {
    if (getState.length !== 0) {
      console.log("notempty", getState.length)
      { setstate(getState.find((option) => (option.id) === (stateid)).name) }
    }
  }

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
    console.log("filterstate::", getState)
    console.log("countryid", countryid)
    //   const filtered = getCity.filter(obj => {
    //   return obj.id === cityid;
    // });
    // console.log("filter",filtered)
    //console.log("cityname",getCity.find((option) => (option.id) === (cityid)).name)}{
    //console.log("statename",getState.find((option) => (option.id) === (stateid)).name)}
  }
  return (




    <Flex marginLeft={5} marginTop={10}>
      {console.log("countryfin", isGetCountry)}
      <Card className={styles.profileCardMain}>
        <Flex marginLeft={140} marginTop={15} center>

          {logoPath === 'logo' ? <Button>a</Button> : <img
            style={{ objectFit: 'contain' }}

            alt="LOGO HERE"

            src={mediaPath + logoPath}
            className={styles.profileImg}
          />}
        </Flex>
        <Flex marginTop={12}>

          <Text bold align="center" size={16} className={styles.companyColor} >
            {company_name}
          </Text>


          <Text style={{ marginBottom: 7 }} align="center">
            {user_info.email}
          </Text>
          <Text align="center" bold>
            Last Login on :{' '}
            {getDateString(user_info?.last_login, 'll hh:mm A')}
            {console.log("userinfo", user_info.last_login)}
          </Text>

        </Flex>

        <Flex marginLeft={20} marginRight={20} className={styles.line} marginBottom={5} marginTop={15}>

        </Flex>


        {console.log("dashboardempreducer", data2)}
        {console.log("permissionreducer", data3)
        }
        <Flex row>
          <Flex>
            <Flex >
              {/* <Flex marginLeft={20}>

                <Flex marginTop={5} ><SvgSubscription height={30} width={30} >
                </SvgSubscription>
                </Flex>

              </Flex> */}
              <Flex marginTop={10} marginLeft={18}>
                <Text style={{ marginLeft: 2, fontWeight: 550 }} bold >
                  Subscription
                </Text>
              </Flex>
            </Flex>


            <Flex marginLeft={20} >


              <Flex>
                <Text style={{ marginTop: 5 }}>Plan:
                  {plan.plan_id_id === 1 ? (
                    <Text style={{ marginBottom: 2 }}>Free Trial</Text>
                  ) : (
                    <Text style={{ marginBottom: 2 }}>
                      {' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 3
                        ? 'Basic'
                        : 'Pro'}{' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 4
                        ? '(Monthly)'
                        : '(Annual)'}
                    </Text>
                  )}</Text>
                {console.log("status", status)}
                <Text style={{ marginTop: 5 }}>Status: {
                  status === false ? (<Text style={{ color: "#FF0000" }}>Expired</Text>) : (<Text style={{ color: "#00BE4B" }}>Active</Text>)
                }
                </Text>
                <Text style={{ marginTop: 5, whiteSpace: "nowrap" }}>
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
              <Flex marginTop={10} >
                <Text style={{ fontWeight: 550 }} bold>
                  Credits Availability
                </Text></Flex>
            </Flex>
            <Flex row>
              <Flex>
                <Text style={{ marginTop: 5 }}>
                  Contact Credits:
                </Text >
              </Flex>

              <Flex marginLeft={5} marginTop={5}>
                <Text style={{ color: 'black' }} className={styles.textoverflow}>{contact_count}
                </Text>
              </Flex>

            </Flex>
            {console.log("error", getState)}
            <Flex row>
              <Flex marginTop={5}>
                <Text >
                  Job:
                </Text >
              </Flex>
              {/* {console.log("filtercity::",getCity.find((option) => (option.id) === (cityid)).name)} */}
              <Flex marginLeft={5} marginTop={5}>
                <Text style={{ color: 'black' }} className={styles.textoverflow1}>{unlimitedHelper(job_count)}
                </Text>
              </Flex>

            </Flex>

            <Flex row>
              <Flex marginTop={5}>
                <Text >
                  Candidates:
                </Text >
              </Flex>

              <Flex marginLeft={5} marginTop={5}>
                <Text style={{ color: 'black' }} className={styles.textoverflow1}>{unlimitedHelper(candidate_count)}
                </Text>
              </Flex>

            </Flex>


          </Flex>
        </Flex>



        {/* <Flex row marginTop={10}>
          <Flex row marginLeft={20}>
            <Flex>
              <Flex className={styles.circleflexicon}>
                <Flex marginTop={5} marginLeft={5}><SvgSubscription height={30} width={30} >
                </SvgSubscription>
                </Flex>
              </Flex>
            </Flex>
            <Flex marginTop={10} marginLeft={5}>
              <Text style={{ marginLeft: 2, fontWeight: 550 }} size={14} >
                Subscription
              </Text>
            </Flex>
          </Flex>
          <Flex marginLeft={113}>

            <Flex className={styles.circleflexicon}><Flex marginLeft={5}>
              <SvgCredits />
            </Flex>
            </Flex>
            <Text style={{ marginLeft: 2, fontWeight: 550 }} size={14}>
              Credits Availability
            </Text>
          </Flex> */}
        {/* <Flex marginLeft={113} row>
          
            
                <Flex>
                  {plan.plan_id_id === 1 ? (
                    <Text style={{ marginBottom: 2 }}>Plan: Free Trial</Text>
                  ) : (
                    <Text style={{ marginBottom: 2 }}>
                      {' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 3
                        ? 'Basic'
                        : 'Pro'}{' '}
                      {plan.plan_id_id === 2 || plan.plan_id_id === 4
                        ? '(Monthly)'
                        : '(Annual)'}
                    </Text>
                  )}

                  <Text>
                    Exp: {getDateString(plan.subscription_valid_till, 'll')}
                  </Text>
                </Flex>
              
            
          </Flex> */}

        {/* </Flex>




        <Flex row marginTop={15}> */}
        {/* <Flex marginLeft={20}>

            <Flex className={styles.circleflexicon}><Flex marginLeft={5}>
              <SvgCredits />
            </Flex>
            </Flex>
            <Text style={{ marginLeft: 2, fontWeight: 550 }} size={14}>
              Credits Availability
            </Text>
          </Flex> */}
        {/* <Flex marginLeft={20} row>


            <Flex>
              {plan.plan_id_id === 1 ? (
                <Text style={{ marginBottom: 2 }}>Plan: Free Trial</Text>
              ) : (
                <Text style={{ marginBottom: 2 }}>
                  {' '}
                  {plan.plan_id_id === 2 || plan.plan_id_id === 3
                    ? 'Basic'
                    : 'Pro'}{' '}
                  {plan.plan_id_id === 2 || plan.plan_id_id === 4
                    ? '(Monthly)'
                    : '(Annual)'}
                </Text>
              )}

              <Text>
                Exp: {getDateString(plan.subscription_valid_till, 'll')}
              </Text>
            </Flex> */}


        {/* </Flex>

          <Flex marginLeft={60}>
            <table className={styles.tablestyle}>
              <tr>
                <td className={styles.tdstyle}><Text style={{ marginRight: 10, marginBottom: 10 }}>
                  contact
                </Text ></td>
                <td><Text style={{ marginBottom: 10, marginRight: 10, marginLeft: 10 }}>
                  Job
                </Text></td>
                <td><Text style={{ marginBottom: 10, marginLeft: 5 }}>
                  Candidates
                </Text></td>
              </tr>
              <tr>
                <td className={styles.tdstyle}>
                  <Flex className={styles.circleflex} marginLeft={8} marginRight={16}>
                    <Text style={{ color: 'black' }}>{unlimitedHelper(job_count)}
                    </Text>
                  </Flex>
                </td>
                <td className={styles.tdstyle}>
                  <Flex className={styles.circleflex} marginLeft={7} marginRight={5}>
                    <Text style={{ color: 'black' }}>{contact_count}</Text>
                  </Flex>
                </td>
                <td className={styles.tdstyle}>
                  <Flex className={styles.circleflex} marginLeft={22} marginRight={23}>
                    <Text style={{ color: 'black' }}>{unlimitedHelper(candidate_count)}</Text>
                  </Flex></td>
              </tr>
            </table>
          </Flex>

        </Flex> */}


        <Flex marginLeft={20} marginRight={20} className={styles.line} marginBottom={10} marginTop={15}>

        </Flex>
        <Flex marginLeft={20}>

          {/*                  
                 {user_info.email !==null ?  <Text>{user_info.email}</Text>:""}
                 {mobile_no !== "" ? <Text>{mobile_no}</Text>:""}
                {address !=="" ? <Text>{address}</Text>:""} */}
          <Flex marginTop={5}>
            {mobile_no !== "" ? <Flex row ><Flex marginRight={5} marginTop={8}><SvgMobile height={20} width={20} fill={BLACK} /></Flex>
              <Flex marginLeft={9}><Text>
                <PhoneInput value={mobile_no}
                  inputStyle={{ border: "none", padding: "inherit" }}
                  showDropdown={false}
                  defaultErrorMessage='false'
                  disableDropdown={true}
                  disableSearchIcon={true}
                  country={null}
                  disabled={true}
                  buttonStyle={{ display: "none" }}
                  dropdownStyle={{ display: "none" }}



                />
              </Text></Flex></Flex> : ""}
          </Flex>
          <Flex marginTop={10}>

            {console.log("weburl", weburl)}

            {weburl !== null ? <Flex row> <Flex marginRight={5}><SvgGlobe height={20} width={20} fill={BLACK} /></Flex>
              <Flex marginLeft={9}><Text style={{ marginBottom: "4px", textDecoration: "underline" }} >{weburl}</Text></Flex></Flex> :
              <Flex row marginTop={7}>
                <Flex marginRight={5} >
                  <SvgGlobe height={30} width={30} fill={BLACK} />
                </Flex>
                <Flex >
                  <LinkWrapper
                    // onClick={clearTab}
                    to={'/account_setting/settings'}
                  >
                    <Text style={{ color: "#581845", textDecoration: "underline" }} bold>
                      Add Website URL
                    </Text>
                  </LinkWrapper>
                </Flex>
              </Flex>}
          </Flex>
          <Flex marginTop={16}>


            {address !== null ? <Flex row><Flex marginRight={1} ><SvgLocationicon height={30} width={30} fill={BLACK} /></Flex>
              <Flex marginLeft={4}>{address}
                ,{city},{state},{country}
                ,{zipcode}

              </Flex></Flex> :
              <Flex row >
                <Flex marginRight={5}>
                  <SvgLocationicon height={30} width={30} fill={BLACK} />
                </Flex>
                <Flex >


                  <LinkWrapper
                    // onClick={clearTab}
                    to={'/account_setting/settings'}
                  >
                    <Text style={{ color: "#581845", textDecoration: "underline" }} bold>
                      Add Company Address
                    </Text>
                  </LinkWrapper>
                </Flex>
              </Flex>
            }
          </Flex>
          {/* <Text>{user_info.email}</Text>
                   <Text>{mobile_no}</Text>
                   <Text>{address}</Text> */}

        </Flex>

        <Flex marginLeft={20} marginRight={20} className={styles.line} marginTop={10} marginBottom={10}>

        </Flex>
        <Flex row between >
          {/* <Flex marginLeft={23} className={styles.pointer} marginTop={5}> {permission.includes('create_post') && (
            <LinkWrapper to={jobSelect}>
              <Button style={{ marginBottom: 8 }} className={styles.buttonsize}>Post Job</Button>
            </LinkWrapper>
          )}</Flex> */}

          {permission.includes('create_post') === false ? (
            <Flex marginLeft={20} marginTop={10}>
              <LinkWrapper
                target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                to={
                  isEmpty(career_page_url)
                    ? `/account_setting/settings?tab=1`
                    : `/${career_page_url}/careers`
                }
              >
                <Button className={styles.buttonsizeauto} >
                  <Flex row center className={styles.pointer} >
                    <Text bold style={{ color: "white", marginLeft: 123 }} >
                      Careers Page
                    </Text>

                  </Flex>
                </Button>
              </LinkWrapper>
            </Flex>
          ) : (
            <Flex row>
              <Flex marginLeft={20} className={styles.pointer} marginTop={5}> {permission.includes('create_post') && (
                <LinkWrapper to={jobSelect}>
                  <Button style={{ marginBottom: 8 }} className={styles.buttonsize}>Post Job</Button>
                </LinkWrapper>
              )}</Flex>
              <Flex marginLeft={98} marginTop={5} marginRight={23}>
                <LinkWrapper
                  target={isEmpty(career_page_url) ? '_parent' : '_blank'}
                  to={
                    isEmpty(career_page_url)
                      ? `/account_setting/settings?tab=1`
                      : `/${career_page_url}/careers`
                  }
                >
                  <Button className={styles.buttonsize}>
                    <Flex row center className={styles.pointer} >
                      <Text bold style={{ color: "white", marginLeft: 10 }} >
                        Careers Page
                      </Text>

                    </Flex>
                  </Button>
                </LinkWrapper>
              </Flex></Flex>)}

        </Flex>

      </Card>
    </Flex>







  );
};

export default ProfileCard;
