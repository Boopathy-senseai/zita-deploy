import { useSelector } from 'react-redux';
import { jobSelect } from '../../../appRoutesPath';
import SvgCompany from '../../../icons/SvgCompany';
import SvgNewTab from '../../../icons/SvgNewTab';
import SvgMail from '../../../icons/SvgMail';
import SvgLocation from '../../../icons/SvgLocation';
import SvgSubscription from '../../../icons/SvgSubscription';

import SvgDot from '../../../icons/SvgDot';
import SvgCreditsavailable from '../../../icons/SvgCreditsavailable';
import SvgCredits from '../../../icons/SvgCredits';
import SvgLocationicon from '../../../icons/SvgLocationicon';
import SvgMobile from '../../../icons/SvgMobile';
import SvgGlobe from '../../../icons/SvgGlobe';

import { RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { BLACK, PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString, isEmpty, unlimitedHelper } from '../../../uikit/helper';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import { mediaPath } from '../../constValue';
import styles from './profilecard.module.css';


const ProfileCard = () => {

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
    status
  } = useSelector(({ dashboardEmpReducers, permissionReducers, companyPageReducers }: RootState) => {
    return {

      address: companyPageReducers.company_detail.address,
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
    };
  });

  const logoPath = isEmpty(null) ? 'logo.png' : logo;

  
  // const clearTab = () => {
  //   sessionStorage.removeItem('superUserTab');
  //   sessionStorage.removeItem('superUserFalseTab');
  // };

  return (




    <Flex marginLeft={5} marginTop={10}>

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
          <Text align="center" >
            Last Login on :{' '}
            {getDateString(user_info?.last_login, 'll hh:mm A')}
            {console.log("userinfo",user_info.last_login)}
          </Text>

        </Flex>

        <Flex marginLeft={20} marginRight={20} className={styles.line} marginBottom={5} marginTop={15}>

        </Flex>
        

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
                 {console.log("status",status)}
                <Text style={{ marginTop: 5 }}>Status: {
                  status === false ? (<Text style={{ color: "#FF0000" }}>Expired</Text>) : (<Text style={{ color: "#00BE4B" }}>Active</Text>)
                }
                </Text>
                <Text style={{ marginTop: 5 }}>
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
                <Text style={{ fontWeight: 550}} bold>
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

            <Flex row>
              <Flex marginTop={5}>
                <Text >
                  Job:
                </Text >
              </Flex>

              <Flex marginLeft={5} marginTop={5}>
                <Text style={{ color: 'black'}}className={styles.textoverflow1}>{unlimitedHelper(job_count)}
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
          <Flex marginTop={10}>
            {mobile_no !== "" ? <Flex row ><Flex marginRight={5}><SvgMobile height={20} width={20} fill={BLACK} /></Flex>
              <Flex marginLeft={5}><Text>{mobile_no}</Text></Flex></Flex> : ""}
          </Flex>
          <Flex marginTop={10}>
            {user_info.email !== null ? <Flex row> <Flex marginRight={5}><SvgGlobe height={20} width={20} fill={BLACK} /></Flex>
              <Flex marginLeft={5}><Text style={{ marginBottom: "4px",textDecoration:"underline" }}>{user_info.email}</Text></Flex></Flex> :  
              <Flex row marginTop={7}>
                <Flex marginRight={5} >
                  <SvgGlobe height={30} width={30} fill={BLACK} />
                </Flex>
                <Flex >
                <LinkWrapper
                  // onClick={clearTab}
                  to={ '/account_setting/settings'}
                >
                  <Text style={{color:"#581845",textDecoration:"underline"}}>
                    Add Company Web Url
                  </Text>
                </LinkWrapper>
               </Flex>
              </Flex>}
          </Flex>
          <Flex marginTop={10}>
            {address !== null ? <Flex row><Flex marginRight={5}><SvgLocationicon height={30} width={30} fill={BLACK} /></Flex>
              <Flex ><Text>{address}</Text></Flex></Flex> :
              <Flex row >
                <Flex marginRight={5}>
                  <SvgLocationicon height={30} width={30} fill={BLACK} />
                </Flex>
                <Flex >


                <LinkWrapper
                  // onClick={clearTab}
                  to={ '/account_setting/settings'}
                >
                  <Text style={{color:"#581845",textDecoration:"underline"}}>
                    Add Address
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
        <Flex row between marginTop={8}>
          {/* <Flex marginLeft={23} className={styles.pointer} marginTop={5}> {permission.includes('create_post') && (
            <LinkWrapper to={jobSelect}>
              <Button style={{ marginBottom: 8 }} className={styles.buttonsize}>Post Job</Button>
            </LinkWrapper>
          )}</Flex> */}

          {permission.includes('create_post')===false?(
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
          ):(
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
