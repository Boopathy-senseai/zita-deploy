import { useDispatch } from 'react-redux';
// import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Chart from '../../uikit/Chart/Chart';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import { pieYValue } from '../common/commonHelper';
import Text from '../../uikit/Text/Text';
import Button from '../../uikit/Button/Button';
import { AppDispatch } from '../../store';
import { CANCEL, colorCode } from '../constValue';
import styles from './rolerecommendation.module.css';
import { ProfileValue } from './createJdTypes';
import {
  dsOrNotMiddleWare,
  duplicateMiddleWare,
  jdProfilePostMiddleWare,
} from './store/middleware/createjdmiddleware';

type Props = {
  isRole: boolean;
  cancel: () => void;
  setMiss: (arg: boolean) => void;
  profile_value: ProfileValue;
  selected_role: string;
  jd_id: string;
  jdProfileLoader: boolean;
  setCancel: (arg: boolean) => void;
};
const RoleRecommendation = ({
  isRole,
  cancel,
  setMiss,
  profile_value,
  selected_role,
  jd_id,
  jdProfileLoader,
  setCancel,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Role Recommendation',
      style: {
        color: PRIMARY,
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>:<br>{point.y} %<br>',
        },
        colors: colorCode,
      },
    },
    series: [
      {
        name: 'Roles',
        data: [
          {
            name: 'Data Analyst',
            y: pieYValue(profile_value.data_analysis),
          },
          {
            name: 'Machine Learning Engineer',
            y: pieYValue(profile_value.machine_learning),
          },
          {
            name: 'Big Data Engineer',
            y: pieYValue(profile_value.data_engineering),
          },
          {
            name: 'Business Intelligence',
            y: pieYValue(profile_value.business_intelligence),
          },
          {
            name: 'Devops Engineer',
            y: pieYValue(profile_value.devops),
          },
          {
            name: 'Others',
            y: pieYValue(profile_value.others),
          },
        ],
      },
    ],
  };
  const getRoleValueObj = {
    a: Number(profile_value.business_intelligence),
    b: Number(profile_value.data_analysis),
    c: Number(profile_value.data_engineering),
    d: Number(profile_value.devops),
    e: Number(profile_value.machine_learning),
    f: Number(profile_value.others),
  };
  let roleArray = Object.values(getRoleValueObj);
  let max = Math.max(...roleArray);

  const optionsOne = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Role Recommendation',
      style: {
        color: PRIMARY,
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>:<br>{point.y} %<br>',
        },
        colors: colorCode,
      },
    },
    series: [
      {
        name: 'Roles',
        data: [
          {
            name: profile_value.recommended_role_id__label_name,
            y: pieYValue(max.toString()),
          },
        ],
      },
    ],
  };
  const questionnairePath = () => {
    return window.location.replace(
      window.origin + `/jobs/questionnaire/${jd_id}`,
    );
  };
  const checkSameRole =
    max === 100 &&
    profile_value.recommended_role_id__label_name === selected_role
      ? true
      : false;

  const hanldeOpenChangeSkill = () => {
    if (jd_id !== '0') {
      dispatch(duplicateMiddleWare({ jd_id: jd_id.toString() }));
    }
    dispatch(
      jdProfilePostMiddleWare({
        jd_id: jd_id.toString(),
        post_recom_role: profile_value.recommended_role_id__label_name,
      }),
    ).then(() => {
      if (profile_value.recommended_role_id__label_name === 'Others') {
        cancel();
        dispatch(dsOrNotMiddleWare({ jdId: jd_id, is_ds_role: '0' })).then(
          () => {
            questionnairePath();
          },
        );
      } else if (profile_value.recommended_role_id__label_name !== 'Others') {
        setMiss(true);
        cancel();
      }
    });
  };
  const hanldeOpenNotChangeSkill = () => {
    if (jd_id !== '0') {
      dispatch(duplicateMiddleWare({ jd_id: jd_id.toString() }));
    }
    dispatch(
      jdProfilePostMiddleWare({
        jd_id: jd_id.toString(),
        do_not_change: selected_role,
      }),
    ).then(() => {
      setMiss(true);
      cancel();
    });
  };
  const equalProfile =
    profile_value.recommended_role_id__label_name === selected_role;
  return (
    <Modal open={isRole}>
      <Flex columnFlex className={styles.overAll}>
        {jdProfileLoader && <Loader />}
        <Chart options={checkSameRole ? optionsOne : options} />
        {!checkSameRole && !equalProfile && (
          <>
            <Text align="center">
              From the role distribution as shown above, we found that the most
              suitable role is{' '}
              <Text color="theme" bold transform="uppercase">
                {profile_value.recommended_role_id__label_name === 'Others'
                  ? 'NON DS JD'
                  : profile_value.recommended_role_id__label_name}
              </Text>
            </Text>
            <Text align="center" className={styles.des1}>
              Do you wish to continue with your choice of role{' '}
              <Text bold transform="uppercase">
                {selected_role}
              </Text>{' '}
              or change it to{' '}
              <Text bold transform="uppercase">
                {profile_value.recommended_role_id__label_name === 'Others'
                  ? 'NON DS JD'
                  : profile_value.recommended_role_id__label_name}{' '}
                ?
              </Text>
            </Text>
          </>
        )}
        {(checkSameRole || equalProfile) && (
          <>
            <Text align="center">
              From the role distribution as shown above, we found that the most
              suitable role is{' '}
              <Text color="theme" bold transform="uppercase">
                {profile_value.recommended_role_id__label_name === 'Others'
                  ? 'NON DS JD'
                  : profile_value.recommended_role_id__label_name}
              </Text>
            </Text>
            <Text align="center" className={styles.des1}>
              {`which you have chosen as a job role. Please click on ‘Next’ to
              continue.`}
            </Text>
          </>
        )}
        <Flex row center middle>
          {/* <LinkWrapper target={'_parent'} to={`/jobs/create_ds_edit/${jd_id}`}> */}
          <Button
            types="secondary"
            onClick={() => {
              setCancel(true);
              cancel();
            }}
          >
            {CANCEL}
          </Button>
          {/* </LinkWrapper> */}

          {!equalProfile ? (
            <>
              {checkSameRole && (
                <Button
                  onClick={hanldeOpenChangeSkill}
                  className={styles.nextBtn}
                >
                  Next
                </Button>
              )}
              {!checkSameRole && (
                <>
                  <Button
                    className={styles.changeBtn}
                    onClick={hanldeOpenChangeSkill}
                  >
                    Change
                  </Button>
                  <Button onClick={hanldeOpenNotChangeSkill}>
                    Do not Change
                  </Button>
                </>
              )}
            </>
          ) : (
            <Button
              onClick={hanldeOpenNotChangeSkill}
              className={styles.nextBtn}
            >
              Next
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};
export default RoleRecommendation;
