import { loadStripe } from '@stripe/stripe-js';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SvgTickOne from '../../../icons/SvgTickOne';
import { AppDispatch, RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import CancelAndDeletePopup from '../../common/CancelAndDeletePopup';
import SingleButton from '../../common/SingleButton';
import { DELETE, onlyNumber } from '../../constValue';
import { stripeMiddleWare } from '../../talentsourcingmodule/store/middleware/talentSoucringMiddleware';
import { Subscription } from './manageSubscriptionTypes';
import styles from './pricecard.module.css';
import { createCheckoutSubscriptionMiddleWare } from './store/managesubscriptionmiddleware';
const cx = classNames.bind(styles);

type Props = {
  headerTitle: string;
  price: string;
  days: string;
  data: {
    value: string;
    normalVlaue: string;
  }[];
  btnTitle: string;
  userPrice?: boolean;
  disabled?: boolean;
  btnDisabled?: boolean;
  setTotalUser: (a: number) => void;
  basicTotalUser?: number;
  freeTotalUser?: number;
  planId: number;
  isPlan: boolean;
  isDefalutPlan: boolean;
  totalUserManger: number;
  setTab: (a: string) => void;
  downgrade?: number;
  subscription?: Subscription;
  inputNone?:boolean
};

const PriceCard = ({
  headerTitle,
  price,
  days,
  data,
  btnTitle,
  userPrice,
  disabled,
  btnDisabled,
  setTotalUser,
  basicTotalUser,
  freeTotalUser,
  planId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  isDefalutPlan,
  isPlan,
  totalUserManger,
  setTab,
  downgrade,
  subscription,
  inputNone
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isInvite, setInvite] = useState(false);
  const [isChangePlan, setChangePlan] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isCheckPlan, setCheckPlan] = useState('');
  const { basic_month, basic_year, pro_month, pro_year } = useSelector(
    ({ manageSubscriptionReducers }: RootState) => ({
      basic_month: manageSubscriptionReducers.basic_month,
      basic_year: manageSubscriptionReducers.basic_year,
      pro_month: manageSubscriptionReducers.pro_month,
      pro_year: manageSubscriptionReducers.pro_year,
    }),
  );

  useEffect(() => {
    if (isPlan === true) {
      if (planId === 3) {
        setCheckPlan(basic_year);
      }
      if (planId === 5) {
        setCheckPlan(pro_year);
      }
    } else if (!isPlan) {
      if (planId === 2) {
        setCheckPlan(basic_month);
      }
      if (planId === 4) {
        setCheckPlan(pro_month);
      }
    }
  }, [isPlan, planId, pro_month, pro_month, basic_month, basic_year]);

  // price card submit function
  const handleSubmit = async (values: any) => {
    setLoader(true);
    dispatch(
      createCheckoutSubscriptionMiddleWare({
        plan: isCheckPlan,
        count: values.value,
        plan_name: planId.toString(),
      }),
    ).then((response) => {
      dispatch(stripeMiddleWare()).then(async (stripRes) => {
        const stripe = await loadStripe(stripRes.payload.publicKey);
        if (response.payload.sessionId) {
          stripe
            ?.redirectToCheckout({
              sessionId: response.payload.sessionId,
            })
            .then(() => {
              setLoader(false);
            });
        }
      });
    });
  };
  const formik = useFormik({
    initialValues: { value: '1' },
    onSubmit: handleSubmit,
  });

  // count increment condition
  const handleIncrement = () => {
    const getValue = Number(formik.values.value) + 1;
    formik.setFieldValue('value', getValue);
  };

    // count Decrement condition
  const handleDecrement = () => {
    const getValue = Number(formik.values.value) - 1;
    if (getValue >= 1) {
      formik.setFieldValue('value', getValue);
    }
  };
  useEffect(() => {
    if (
      (basicTotalUser !== 0 && headerTitle === 'BASIC') ||
      (headerTitle === 'PRO' && basicTotalUser !== 0)
    ) {
      formik.setFieldValue('value', basicTotalUser?.toString());
      formik.setFieldValue('value', basicTotalUser?.toString());
    }
    if (
      headerTitle === 'TRY OUT' &&
      freeTotalUser !== 0
      // isDefalutPlan === isPlan
    ) {
      formik.setFieldValue('value', freeTotalUser?.toString());
    }
  }, [basicTotalUser, freeTotalUser]);

  useEffect(() => {
    if (
      (basicTotalUser !== 0 && headerTitle === 'BASIC') ||
      (headerTitle === 'PRO' && basicTotalUser !== 0)
    ) {
      setTotalUser(Number(formik.values.value));
    }
    if (headerTitle === 'TRY OUT' && freeTotalUser !== 0) {
      setTotalUser(Number(formik.values.value));
    }
  }, [formik.values.value]);

  return (
    <>
      {isLoader && <Loader />}
      <CancelAndDeletePopup
        title={
          <Flex marginLeft={16}>
            <Text>You currently have {totalUserManger} invited users. </Text>
            <Text>
              To remove license, Please delete the existing user accounts.
            </Text>
          </Flex>
        }
        btnDelete={() => setTab('3')}
        btnCancel={() => setInvite(false)}
        btnRight={DELETE}
        open={isInvite}
      />

      <SingleButton
        btnTitle="OK"
        title={
          <Flex marginLeft={16}>
            <Text>
              Please maintain the allowed 3 active jobs and 15,000 candidate
              storage for
            </Text>
            <Text>the BASIC Plan. Until that you cannot change your plan.</Text>
          </Flex>
        }
        open={isChangePlan}
        btnOnclick={() => setChangePlan(false)}
      />

      <div style={{ position: 'relative' }}>
        {disabled && <div className={styles.disabled} />}
        <Card className={styles.overAll}>
          <Flex style={{margin:'25px 0px 0px 25px'}}>
              <Text bold size={16}>
              {headerTitle}
              </Text>
            <Flex row >
              
              <Text              
                color="theme"
                size={14}
                bold
                style={{ marginBottom: 4 }}
              >
                {price}
              </Text>
              {userPrice && <Text >/user -</Text>}
              <Text align="center" size={16} textStyle="italic">
                {days}
              </Text>
            </Flex>              
          </Flex>
          <Flex columnFlex className={styles.priceList} marginTop={24}>
            {data.map((list, index) => (
              <Flex row center key={list.value + index} marginBottom={12}>
                <div style={{ marginRight: 8 }}>
                  <SvgTickOne />
                </div>
                {!isEmpty(list.value) && (
                  <Text bold style={{ marginRight: 3 }}>
                    {list.value}
                  </Text>
                )}
                <Text>{list.normalVlaue}</Text>
              </Flex>
            ))}
          </Flex>
          <Flex row center marginLeft={8} marginTop={30}>
            <Text bold style={{ marginRight: 16 }}>
              Total Users:
            </Text>
            <Flex row center className={cx({pointerNone:inputNone})}>
              <div
                onClick={handleDecrement}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
                className={styles.decrementStyles}
              >
                <Text align="center" size={20}>
                  -
                </Text>
              </div>
              <InputText
                id="plans_and_features__focus"
                align="center"
                value={formik.values.value}
                onChange={(e) => {
                  if (
                    e.target.value === '' ||
                    (onlyNumber.test(e.target.value) &&
                      Number(e.target.value) >= 1)
                  ) {
                    formik.setFieldValue(`value`, e.target.value);
                  }
                }}
                className={styles.inputStyle}
              />
              <div
                onClick={handleIncrement}
                tabIndex={-1}
                role="button"
                onKeyDown={() => {}}
                className={styles.incrementStyles}
              >
                <Text align="center" size={20}>
                  +
                </Text>
              </div>
            </Flex>
          </Flex>
          {subscription === null ||
          (subscription && subscription.plan_id_id === 1) ? (
            <Flex center middle marginBottom={20} marginTop={20}>
              <Button disabled={btnDisabled} onClick={formik.handleSubmit}>{btnTitle}</Button>
            </Flex>
          ) : (
            <>
              {totalUserManger > Number(formik.values.value) ? (
                <Flex center middle marginBottom={20} marginTop={20}>
                  <Button
                    onClick={() => setInvite(true)}
                    disabled={btnDisabled}
                  >
                    {btnTitle}
                  </Button>
                </Flex>
              ) : (
                <Flex center middle marginBottom={20} marginTop={20}>
                  {btnDisabled ? (
                    <Button disabled={btnDisabled}>{btnTitle}</Button>
                  ) : (
                    <>
                      {headerTitle === 'BASIC' && downgrade === 1 ? (
                        <Button
                          onClick={() => setChangePlan(true)}
                          disabled={btnDisabled}
                        >
                          {btnTitle}
                        </Button>
                      ) : (
                        <LinkWrapper
                          // target={'_parent'}
                          to={`/order_summary?key=${planId}&count=${formik.values.value}`}
                        >
                          <Button disabled={btnDisabled}>{btnTitle}</Button>
                        </LinkWrapper>
                      )}
                    </>
                  )}
                </Flex>
              )}
            </>
          )}
        </Card>
      </div>
    </>
  );
};

export default PriceCard;
