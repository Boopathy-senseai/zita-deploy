/* eslint max-len: ["error", { "code": 50000 }] */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { jobCreateDs, jobCreateNonDs } from '../../appRoutesPath';
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

  // initial api call
  useEffect(() => {
    localStorage.setItem('freeCheck','true');
    dispatch(selectDsorNonDsMiddleWare());
  }, []);

  const { loader, feature, is_plan } = useSelector(
    ({ selectDsorNonDsReducers, permissionReducers }: RootState) => {
      return {
        loader: selectDsorNonDsReducers.isLoading,
        feature: selectDsorNonDsReducers.feature,
        is_plan: permissionReducers.is_plan,
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
      {feature !== 0 && (
        <Flex middle columnFlex center>
          <Flex middle row center className={styles.warningFlex}>
            <SvgInfo fill={'#2E6ADD'} className={styles.warninginfoo} />
            <Text     style={{color:"#333333"}}  className={styles.warningText}>
            <Text style={{color:'#2E6ADD',marginRight:'3px',fontSize:'13px'}} bold >Heads Up!{' '}</Text>
              {`You’ve reached the number of job postings for your current plan 
          but you can keep new job descriptions in Draft. Please `}
              <LinkWrapper
                target={'_parent'}
                onClick={() => {
                  sessionStorage.setItem('superUserTab', '2');
                }}
                to="/account_setting/settings?planFocus=focus"
              >
                <Text style={{fontSize:"13px"}} bold color="link">
                  upgrade{' '}
                </Text>
              </LinkWrapper>
              plan or inactivate at least one existing active job to publish a
              new job
            </Text>
          </Flex>
        </Flex>
        )} 
      <Flex columnFlex>
        <Text
          className={styles.chooseText}
          align="center"
          size={20}
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
          customized fields and skills recommendation to hit the targeted
          candidates for data science domain.`}
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
             reach to the best candidates for your job.`}
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
