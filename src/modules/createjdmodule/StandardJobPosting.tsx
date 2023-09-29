import { useEffect, useState } from 'react';
import SvgCheckBox from '../../icons/SvgCheckBox';
import Svgwhatjobs from '../../icons/Svgwhatjobs';
import SingleButton from '../common/SingleButton';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import ExternalSwitch from '../../uikit/externalswitch/Externalswitch';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { BACK } from '../constValue';
import { Loader } from '../../uikit';
import styles from './standardjobposting.module.css';

type Props = {
  jdId: string;
  hanldePulish: () => void;
  ds_role: boolean;
  feature: number;
  whatjob: any;
  super_user: boolean;
  postLoader: any;
  iswhatjobs?: any;
};

const StandardJobPosting = ({
  jdId,
  super_user,
  hanldePulish,
  ds_role,
  feature,
  whatjob,
  postLoader,
  iswhatjobs
}: Props) => {
  const [extarajobpost, setextarajobpost] = useState('1');
  const [isOpenPlanDetails, setOpenPlanDetails] = useState(false);
  const [isBtnLoader, setBtnLoader] = useState(false);
  const [isEditLoader, setEditLoader] = useState(false)
  const [isUpgradeLoader, setUpgradeLoader] = useState(false)
  useEffect(() => {
    if (iswhatjobs === true) {
      setextarajobpost('0')
    }
    else {
      setextarajobpost('1')
    }
  }, [iswhatjobs])
  const extarajob = () => {
    if (extarajobpost === '0') {
      setextarajobpost('1');
      whatjob(1);
    } else {
      setextarajobpost('0');
      whatjob(0);
    }
  };
  const manageLocation = () => {
    sessionStorage.setItem('superUserTab', '2');
  };
  return (
    <Flex>
      <Flex columnFlex>
        <Card className={styles.cardOverAll}>
          <Text color="primary" bold>
            Standard Job Posting
          </Text>
          <Text className={styles.defaultText}>
            Your job will be posted in the following site by default
          </Text>
          <Flex>
            <div className={styles.checkBox}>
              <Flex row center>
                <div style={{ opacity: 0.5, marginRight: 8 }}>
                  <SvgCheckBox fill={PRIMARY} />
                </div>
                <Text bold className={styles.textstyleinjobpost}>
                  Company Website Career Page
                </Text>
              </Flex>
            </div>
            <Text color="primary" bold>
              Other Job Boards
            </Text>
            <Flex row center>
              <ExternalSwitch
                checked={extarajobpost === '1'}
                onClick={
                  () => extarajob()
                }
              />
              <div className={styles.checkBoxs}>
                <div style={{ opacity: 0.5, marginRight: 8 }}></div>
                <Svgwhatjobs />
              </div>
            </Flex>
          </Flex>
        </Card>
        <Flex style={{ height: 15 }}></Flex>
        <Flex row center between className={styles.btnContainer}>
          <LinkWrapper target={'_parent'} to={`/jobs/questionnaire/${jdId}`}>
            <Button types="secondary" >{BACK}</Button>
          </LinkWrapper>

          <Flex row center>
            {isBtnLoader ? (
              <Flex className={styles.updateBtnLoader}>
                <Loader size="small" withOutOverlay />
              </Flex>
            ) : (
              <LinkWrapper target={'_parent'} to={routesPath.MY_JOB_POSTING} onClick={() => { setBtnLoader(true) }}>
                <Button types="secondary">Save as draft</Button>
              </LinkWrapper>)}
            {ds_role === true && (


              <LinkWrapper
                target={'_parent'}
                to={`/jobs/create_ds_edit/${jdId}`}
                onClick={() => setEditLoader(true)}
              >
                {isEditLoader ? (
                  <Flex className={styles.updateBtnLoader}>
                    <Loader size="small" withOutOverlay />
                  </Flex>
                ) : (
                  <Button types="secondary" className={styles.editBtn}>
                    Edit
                  </Button>)}
              </LinkWrapper>
            )}
            {ds_role !== true && (
              <LinkWrapper
                target={'_parent'}
                to={`/jobs/create_non_ds_edit/${jdId}`}
                onClick={() => setEditLoader(true)}
              >
                {isEditLoader ? (
                  <Flex className={styles.updateBtnLoader}>
                    <Loader size="small" withOutOverlay />
                  </Flex>
                ) : (
                  <Button types="secondary" className={styles.editBtn}>
                    Edit
                  </Button>)}
              </LinkWrapper>
            )}
            {feature === 0 ? (
              super_user === false ?
                <Flex>
                  {isUpgradeLoader ? (
                    <Flex className={styles.updateBtnLoader}>
                      <Loader size="small" withOutOverlay />
                    </Flex>
                  ) : (
                    <Button
                      onClick={() => {
                        if (super_user === false) {
                          setUpgradeLoader(true)
                          setOpenPlanDetails(true)
                        }
                      }
                      }
                    >Upgrade</Button>)}

                </Flex>
                :
                <LinkWrapper
                  to="/account_setting/settings?planFocus=focus"
                >
                  {isUpgradeLoader ? (
                    <Flex className={styles.updateBtnLoader}>
                      <Loader size="small" withOutOverlay />
                    </Flex>
                  ) : (
                    <Button
                      onClick={() => {
                        manageLocation();
                        setUpgradeLoader(true)
                      }}
                    >Upgrade</Button>)}
                </LinkWrapper>

            ) : (
              <>
                {postLoader ? (
                  <Flex className={styles.updateBtnLoader}>
                    <Loader size="small" withOutOverlay />
                  </Flex>
                ) : (
                  <Button onClick={() => {
                    hanldePulish();
                  }} id={extarajobpost}>
                    Publish
                  </Button>)}</>
            )}
            <SingleButton
              btnTitle="OK"
              title={
                'Please contact your company admin to upgrade you plan'
              }
              open={isOpenPlanDetails}
              btnOnclick={() => setOpenPlanDetails(false)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default StandardJobPosting;
