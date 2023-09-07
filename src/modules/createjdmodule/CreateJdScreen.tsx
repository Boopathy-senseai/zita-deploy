/* eslint max-len: ["error", { "code": 50000 }] */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { jobCreateDs, jobCreateNonDs } from '../../appRoutesPath';
import SvgRight from '../../icons/SvgRight';
import SingleButton from '../common/SingleButton';
import SvgInfo from '../../icons/SvgInfo';
import { AppDispatch, RootState } from '../../store';
import { WARNING } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import styles from './createjdscreen.module.css';
import JdSelectCard from './JdSelectCard';
import { selectDsorNonDsMiddleWare } from './store/middleware/createjdmiddleware';

const CreateJdScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const [isOpenPlanDetails, setOpenPlanDetails]= useState(false)

  // initial api call
  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    dispatch(selectDsorNonDsMiddleWare());
  }, []);


  const { loader, feature, is_plan, super_user } = useSelector(
    ({ selectDsorNonDsReducers, permissionReducers }: RootState) => {
      return {
        loader: selectDsorNonDsReducers.isLoading,
        feature: selectDsorNonDsReducers.feature,
        is_plan: permissionReducers.is_plan,
        super_user: permissionReducers.super_user,

      };
    },
  );

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  if (loader) {
    return <Loader />;
  }

  return (
    <Flex columnFlex>
      <div>
        <Flex row className={styles.titleContainer}>
          {/* <SvgJobPost width={15.71} height={16} /> */}
          <Flex row>
          <Text
            bold
            size={16}
            style={{ marginLeft: 8, color: '#581845' }}
            className={styles.postingcl}
          >
            Job Postings
          </Text>
          <Flex marginTop={7} marginLeft={7} marginRight={2}>
            <SvgRight fill={'#581845'} ></SvgRight></Flex>
          <Flex marginTop={1} marginLeft={3}>
            <Text size={16} bold color="theme" >
              Post Jobs</Text>
          </Flex>
          </Flex>
          <div className={styles.triangle}></div>
        </Flex>
      </div>
      {feature === 0 && (
        <Flex middle columnFlex center>
            <Flex row center className={styles.warningFlex}>
              <Flex style={{position:"relative", bottom: "10px"}}><SvgInfo height={16} width={16} fill={'#2E6ADD'} /></Flex>
              <Text
                style={{color:"#333333"}}
                className={styles.warningText}
              >
            <Text style={{color:'#2E6ADD',marginRight:'3px',fontSize:'13px'}} bold >Heads Up!{' '}</Text>
            You’ve reached the number of job postings for your current plan 
          but you can keep new job descriptions in Draft. Please 
          {super_user===false ?
            <Flex style={{display: "contents"}}
                onClick={() => 
                  setOpenPlanDetails(true)
                }
              >
                <Text size={13} bold color="link">
                  {` `}upgrade {' '}
                </Text>
              </Flex>
              :
              <LinkWrapper
              target={'_parent'}
              onClick={()=> sessionStorage.setItem('superUserTab', '2')} 
              to="/account_setting/settings?planFocus=focus"
            >
              <Text size={13} bold color="link">
                {` `}upgrade {' '}
              </Text>
            </LinkWrapper>
            }
              plan or inactivate at least one existing active job to publish a new job
            </Text>
            </Flex>
          </Flex>
        )} 
      
        <SingleButton
          btnTitle="OK"
          title={
            'Please contact your company admin to upgrade you plan'
          }
          open={isOpenPlanDetails}
          btnOnclick={() => setOpenPlanDetails(false)}
        />
      <Flex columnFlex>
        <Text
          className={styles.chooseText}
          align="center"
          size={16}
          bold
          color="black"
        >
          Choose your Job category
        </Text>
        <Flex row center middle>
          <div className={styles.leftCard}> 
            <JdSelectCard
              title={'Data Science Jobs'}
              des={`Take your first step to create your data science and AI jobs with
          customized fields and skills recommendations to hit the targeted
          candidates for the data science domain.`}
              buttonTitle={'Create Job'}
              exTitle="Ex: Data Analyst, ML Engineer, DevOps Engineer ..."
              path={jobCreateDs}
              onClick={() => {}}
            />
          </div>
          <div className={styles.rightCard}>
            <JdSelectCard
              title={'All Other Jobs'}
              des={`Take your first step to create your jobs for IT, NON-IT and other 
            domains with our customized form and make your hiring easier and
             reach the best candidates for your job.`}
              buttonTitle={'Create Job'}
              exTitle="Ex: Web Developer, Software Engineer, System Engineer, Accountant ..."
              path={jobCreateNonDs}
              onClick={() => {}}
            />
          </div>
        </Flex>                   
      </Flex>
    </Flex>
  );
};

export default CreateJdScreen;
