import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SvgAngle from '../../../icons/SvgAngle';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import { GARY_4, PRIMARY } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputSwitch from '../../../uikit/Switch/InputSwitch';
import Text from '../../../uikit/Text/Text';
import DetailedFeaturesComparison from './DetailedFeaturesComparison';
import { Subscription } from './manageSubscriptionTypes';
import { basicData, freeData, proData } from './mock';
import styles from './plansandfeatures.module.css';
import PriceCard from './PriceCard';

type Props = {
  subscription?: Subscription;
  totalUserManger: number;
  setTab: (a: string) => void;
  downgrade: number;
};
const PlansandFeatures = ({
  subscription,
  totalUserManger,
  setTab,
  downgrade,
}: Props) => {
  const [isPlan, setPlan] = useState(true);
  const [isShowPrice, setPriceShow] = useState(true);
  const [isCompare, setCompare] = useState(false);
  const [freePlanBtn, setFreePlan] = useState('14 Days Trial');
  const [basicPlanBtn, setBasicPlan] = useState('Choose Plan');
  const [proPlanBtn, setProPlan] = useState('Choose Plan');
  const [isTotalUser, setTotalUser] = useState(0);
  const [isTotalUserBasic, setTotalUserBasic] = useState(0);
  const [isTotalUserPro, setTotalUserPro] = useState(0);
  const history = useHistory();
  const [isCount,setCount]=useState({count:'',key:''})
  const [isDefalutPlan, setDefaultPlan] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const count: any = query.get('count');
  const urlPlanId: any = query.get('key');

  // params based count and plan id updated in inital value
  useEffect(() => {
    if (!isEmpty(count) && !isEmpty(urlPlanId)) {
      setCount({ count, key: urlPlanId });
      if (query.has('count') && query.get('key')) {
        query.delete('count');
        query.delete('key');
        history.replace({
          search: query.toString(),
        });
      }
    }
  }, []);

  useEffect(() => {
    if (subscription) setTotalUser(subscription?.no_of_users);
    if (subscription) setTotalUserBasic(subscription?.no_of_users);

  }, [subscription]);

  // plan id based button condition check 
  useEffect(() => {
    if (subscription && subscription.plan_id_id === 1) {
      setFreePlan('Current Plan');
    }
    if (
      (subscription &&
        subscription.plan_id_id === 2 &&
        Number(isTotalUserBasic) === subscription?.no_of_users &&
        isDefalutPlan === isPlan) ||
      (subscription &&
        subscription.plan_id_id === 3 &&
        Number(isTotalUserBasic) === subscription?.no_of_users &&
        isDefalutPlan === isPlan)
    ) {
      setBasicPlan('Current Plan');
    } else if (
      (subscription &&
        subscription.plan_id_id === 2 &&
        Number(isTotalUserBasic) !== subscription?.no_of_users &&
        isDefalutPlan === isPlan) ||
      (subscription &&
        subscription.plan_id_id === 3 &&
        Number(isTotalUserBasic) !== subscription?.no_of_users &&
        isDefalutPlan === isPlan)
    ) {
      setBasicPlan('Update Users');
    } else {
      setBasicPlan('Choose Plan');
    }

    if (
      (subscription &&
        subscription.plan_id_id === 4 &&
        Number(isTotalUserPro) === subscription?.no_of_users &&
        isDefalutPlan === isPlan) ||
      (subscription &&
        subscription.plan_id_id === 5 &&
        Number(isTotalUserPro) === subscription?.no_of_users &&
        isDefalutPlan === isPlan)
    ) {
      setProPlan('Current Plan');
    } else if (
      (subscription &&
        subscription.plan_id_id === 4 &&
        Number(isTotalUserPro) !== subscription?.no_of_users &&
        isDefalutPlan === isPlan) ||
      (subscription &&
        subscription.plan_id_id === 5 &&
        Number(isTotalUserPro) !== subscription?.no_of_users &&
        isDefalutPlan === isPlan)
    ) {
      setProPlan('Update Users');
    } else {
      setProPlan('Choose Plan');
    }
  }, [subscription, isTotalUser, isPlan, isDefalutPlan,isTotalUserPro,isTotalUserBasic]);

  useEffect(() => {
    if (
      (subscription && subscription.plan_id_id === 2) ||
      (subscription && subscription.plan_id_id === 4)
    ) {
      setPlan(false);
      setDefaultPlan(false);
    } else {
      setPlan(true);
      setDefaultPlan(true);
    }
  }, [subscription]);

  const cancelPlanCheck =
    subscription &&
    subscription?.is_active === true &&
    Number(subscription.subscription_changed_to) === -1;

  return (
    <Card className={styles.overAll} id='plans_and_features__plan'>
      <Flex >
        <Flex row center between>
          <Text size={16} bold>
            Plans and Features
          </Text>
          <div
            tabIndex={-1}
            role="button"
            onKeyDown={() => {}}
            onClick={() => setPriceShow(!isShowPrice)}
          >
            <SvgAngle fill={GARY_4} height={16} width={16} up={isShowPrice} />
          </div>
        </Flex>
        {isShowPrice && (
          <>
            <Flex row center className={styles.switchFlex}>
              <Text >Billed Monthly</Text>
              <div style={{ margin: '0 8px' }}>
                <InputSwitch
                offFill={PRIMARY}
                  checked={isPlan}
                  onClick={() => setPlan(!isPlan)}
                />
              </div>
              <Text >Billed Annually</Text>
            </Flex>
            <Flex columnFlex>
              <Flex row>
                <PriceCard
                  setTab={setTab}
                  isPlan={isPlan}
                  isDefalutPlan={isDefalutPlan}
                  setTotalUser={setTotalUser}
                  btnTitle={freePlanBtn}
                  data={freeData}
                  headerTitle="TRY OUT"
                  price="FREE"
                  days="14 Days Trial"
                  disabled={subscription && subscription.plan_id_id !== 1}
                  freeTotalUser={
                    subscription && subscription.plan_id_id === 1
                      ? subscription?.no_of_users
                      : 0
                  }
                  planId={1}
                  totalUserManger={totalUserManger}
                  subscription={subscription}
                  btnDisabled
                  inputNone
                />
                <div style={{ margin: '0 24px' }}>
                  <PriceCard
                    subscription={subscription}
                    downgrade={downgrade}
                    setTab={setTab}
                    totalUserManger={totalUserManger}
                    isPlan={isPlan}
                    isDefalutPlan={isDefalutPlan}
                    setTotalUser={setTotalUserBasic}
                    btnTitle={basicPlanBtn}
                    data={basicData}
                    headerTitle="BASIC"
                    price={isPlan ? '$25' : '$35'}
                    userPrice
                    days="Per Month"
                    btnDisabled={
                      basicPlanBtn === 'Current Plan' || cancelPlanCheck
                    }
                    basicTotalUser={
                      subscription && subscription.plan_id_id !== 1
                        ? (Number(isCount.key) === 3 ||Number(isCount.key) === 2) && !isEmpty(isCount.count) ? Number(isCount.count):subscription?.no_of_users
                        : 0
                    }
                    planId={isPlan ? 3 : 2}
                  />
                </div>
                <PriceCard
                  subscription={subscription}
                  setTab={setTab}
                  totalUserManger={totalUserManger}
                  isPlan={isPlan}
                  isDefalutPlan={isDefalutPlan}
                  setTotalUser={setTotalUserPro}
                  btnTitle={proPlanBtn}
                  data={proData}
                  headerTitle="PRO"
                  price={isPlan ? '$55' : '$65'}
                  days="Per Month"
                  userPrice
                  btnDisabled={proPlanBtn === 'Current Plan' || cancelPlanCheck}
                  basicTotalUser={
                    subscription && subscription.plan_id_id !== 1
                    ? (Number(isCount.key) === 5 ||Number(isCount.key) === 4) && !isEmpty(isCount.count) ? Number(isCount.count):subscription?.no_of_users
                    : 0
                  }
                  planId={isPlan ? 5 : 4}
                />
              </Flex>
              <Button
                onClick={() => setCompare(!isCompare)}
                types="link"
                style={{ margin: '20px 0' }}
              >
                <Flex row center>
                  {isCompare ?
                    <Text bold color='link' style={{ marginRight: 2, position: 'relative', top: -1 }}>-</Text> :
                    <Text bold color='link' style={{ marginRight: 2 }}>+</Text>

                  }

                  <Text  color='link'>
                    Detailed Features Comparison
                  </Text>
                </Flex>
              </Button>
              {isCompare && <DetailedFeaturesComparison />}
            </Flex>
          </>
        )}
      </Flex>
    </Card>
  );
};

export default PlansandFeatures;
