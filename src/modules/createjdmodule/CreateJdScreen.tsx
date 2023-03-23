/* eslint max-len: ["error", { "code": 50000 }] */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCreateDs, jobCreateNonDs } from '../../appRoutesPath';
import SvgInfo from '../../icons/SvgInfo';
import { AppDispatch, RootState } from '../../store';
import { WARNING } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { manageLocation } from '../constValue';
import styles from './createjdscreen.module.css';
import JdSelectCard from './JdSelectCard';
import { selectDsorNonDsMiddleWare } from './store/middleware/createjdmiddleware';

const CreateJdScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(selectDsorNonDsMiddleWare());
  }, []);

  const { loader, feature } = useSelector(
    ({ selectDsorNonDsReducers }: RootState) => {
      return {
        loader: selectDsorNonDsReducers.isLoading,
        feature: selectDsorNonDsReducers.feature,
      };
    },
  );
  if (loader) {
    return <Loader />;
  }
  return (
    <Flex columnFlex>
      {feature === 0 && (
        <Flex middle columnFlex center>
          <Flex middle row center className={styles.warningFlex}>
            <SvgInfo fill={WARNING} />
            <Text size={12} bold color="warning" className={styles.warningText}>
              {`You’ve reached the number of job postings for your current plan 
          but you can keep new job descriptions in Draft. Please `}
              <Text size={12} onClick={manageLocation} bold color="link">
                upgrade{' '}
              </Text>
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
