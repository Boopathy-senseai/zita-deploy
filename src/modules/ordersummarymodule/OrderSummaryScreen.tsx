import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { AppDispatch, RootState } from '../../store';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import { billingPortalMiddleWare } from '../accountsettingsmodule/managesubscription/store/managesubscriptionmiddleware';
import styles from './ordersummaryscreen.module.css';
import {
  backendProcessMiddleWare,
  orderSummaryMiddleWare,
  orderSummaryPostMiddleWare,
} from './store/ordersummarymiddleware';

const OrderSummaryScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isPageLoader, setPageLoader] = useState(true);
  const [isPromoError, setPromoError] = useState(false);
  const [isDisCount, setDisCount] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const history = useHistory();
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const planId: any = query.get('key');
  const count: any = query.get('count');
// initial api call based on url params
  useEffect(() => {
    dispatch(
      orderSummaryMiddleWare({
        key: planId.toString(),
        count: count.toString(),
      }),
    ).then(() => {
      setPageLoader(false);
    });
  }, []);

  const {
    palnDeatils,
    local_sub,
    un_used,
    subtotal,
    final,
    available_balance,
    discount_added,
    isLoading,
    stripe_balance,
    new_price,
    is_plan,
    total_discount_amounts
  } = useSelector(
    ({ orderSummaryReducers, permissionReducers }: RootState) => ({
      local_sub: orderSummaryReducers.local_sub,
      palnDeatils: orderSummaryReducers.plan,
      un_used: orderSummaryReducers.un_used,
      subtotal: orderSummaryReducers.subtotal,
      final: orderSummaryReducers.final,
      available_balance: orderSummaryReducers.available_balance,
      discount_added: orderSummaryReducers.discount_added,
      isLoading: orderSummaryReducers.isLoading,
      stripe_balance: orderSummaryReducers.stripe_balance,
      new_price: orderSummaryReducers.new_price,
      is_plan: permissionReducers.is_plan,
      total_discount_amounts: orderSummaryReducers.total_discount_amounts,

    }),
  );

  useEffect(() => {
    if (!is_plan) {
      sessionStorage.setItem('superUserTab', '2');
      history.push('/account_setting/settings');
    }
  });

  // form submit
  const handleFormikSubmit = (values: any) => {
    setLoader(true);
    dispatch(
      orderSummaryPostMiddleWare({
        discounts: values.value,
        key: palnDeatils.plan_id.toString(),
        count,
      }),
    ).then((res) => {
      if (res.payload.msg) {
        setDisCount(false);
        setPromoError(true);
      } else {
        setPromoError(false);
      }
      if (res.payload.discounts) {
        setDisCount(true);
        dispatch(
          orderSummaryMiddleWare({
            key: palnDeatils.plan_id.toString(),
            count,
            discounts: res.payload.discounts,
          }),
        );
      }
      setLoader(false);
    });
  };

  const formik = useFormik({
    initialValues: { value: '' },
    onSubmit: handleFormikSubmit,
  });

  const chekcUpdateUser = palnDeatils.plan_id === local_sub.plan_id_id;
  const checkPlanChange = palnDeatils.plan_id !== local_sub.plan_id_id;

  // pay now submit fuction
  const handlePayNow = () => {
    setLoader(true);
    dispatch(
      orderSummaryPostMiddleWare({
        update: 'update',
        key: palnDeatils.plan_id.toString(),
        count,
        discounts:
          discount_added && discount_added.discount_code
            ? discount_added.discount_code
            : '',
      }),
    ).then((res) => {
      if (res.payload.update) {
        dispatch(backendProcessMiddleWare({})).then((endRes) => {
          if (endRes.payload.success && checkPlanChange) {
            history.push('/account_setting/settings?modal_popup=plan_changed');
          }
          if (endRes.payload.user_count === 'user_ase') {
            history.push('/account_setting/settings?modal_popup=user_ase');
          }
          if (endRes.payload.user_count === 'user_dec') {
            history.push('/account_setting/settings?modal_popup=user_dec');
          }
          setLoader(false);
        });
      }
    });
  };
// paymentinfo form submit
  const handleUpdatePaymentInfo = () => {
    setLoader(true);
    dispatch(
      billingPortalMiddleWare({ order_summary: window.location.href }),
    ).then((res) => {
      setLoader(false);
      window.location.replace(res.payload.url);
    });
  };
// promo close function
  const handleClosePromo = () => {
    setLoader(true);
    dispatch(
      orderSummaryMiddleWare({
        key: palnDeatils.plan_id.toString(),
        count,
        discounts: '',
      }),
    ).then(() => {
      setLoader(false);
      setDisCount(false);
    });
  };

  if (isPageLoader) {
    return <Loader />;
  }

  return (
    <Flex center className={styles.mainStyle} height={window.innerHeight - 72}>
      <Flex className={styles.overAll} marginTop={30}>
        {(isLoader || isLoading) && <Loader />}
        <Text size={20} bold>
          Order Summary
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Review your order before proceeding with your payment
        </Text>
        <Card className={styles.cardOverAll}>
          <Flex row center between className={styles.borderBottom}>
            {chekcUpdateUser && <Text bold>Update User</Text>}
            {checkPlanChange && <Text bold>Plan Change</Text>}
            <LinkWrapper
              target={'_parent'}
              to={`/account_setting/settings?count=${count}&planFocus=true&key=${planId}`}
            >
              <Button types="link">Edit</Button>
            </LinkWrapper>
          </Flex>
          <Flex className={styles.planFlex}>
            <Flex row center between marginBottom={8}>
              {(palnDeatils.plan_id === 2 || palnDeatils.plan_id === 3) && (
                <Text size={16} bold>
                  Basic Plan
                </Text>
              )}
              {(palnDeatils.plan_id === 4 || palnDeatils.plan_id === 5) && (
                <Text size={16} bold>
                  Pro Plan
                </Text>
              )}

              <Text size={16} bold>
                ${palnDeatils.price} Per User
              </Text>
            </Flex>
            <Flex row center between marginBottom={8}>
              {(palnDeatils.plan_id === 2 || palnDeatils.plan_id === 4) && (
                <Text>Monthly Subscription</Text>
              )}
              {(palnDeatils.plan_id === 3 || palnDeatils.plan_id === 5) && (
                <Text>Annual Subscription</Text>
              )}
              <Text>Total Users: {count}</Text>
            </Flex>
            {chekcUpdateUser && (
              <Text>{`Users ${local_sub.no_of_users} --> ${count}`}</Text>
            )}
          </Flex>

          {/* plan change */}

          {checkPlanChange && (
            <Flex className={styles.detailsFlex}>
              <Text bold size={16}>
                Details
              </Text>
              <Flex row between marginTop={8} marginBottom={8}>
                <Flex>
                  <Text style={{ marginBottom: 8 }}>
                    Subscription Charges for{' '}
                    <b>
                      {palnDeatils.plan_id === 4 || palnDeatils.plan_id === 5
                        ? 'Pro'
                        : 'Basic'}{' '}
                      Plan (
                      {palnDeatils.plan_id === 3 || palnDeatils.plan_id === 5
                        ? 'Annual'
                        : 'Monthly'}
                      )
                    </b>
                  </Text>
                  <Text>Users {count}</Text>
                </Flex>
                <Text>${palnDeatils.price * Number(count)}.00</Text>
              </Flex>
              <Flex row between marginTop={8} marginBottom={8}>
                <Flex>
                  <Text style={{ marginBottom: 8 }}>
                    Unused Credits from Previous{' '}
                    <b>
                      {local_sub.plan_id_id === 4 || local_sub.plan_id_id === 5
                        ? 'Pro'
                        : 'Basic'}{' '}
                      Plan (
                      {local_sub.plan_id_id === 3 || local_sub.plan_id_id === 5
                        ? 'Annual'
                        : 'Monthly'}
                      )
                    </b>
                  </Text>
                  <Text>{`Users ${local_sub.no_of_users}`}</Text>
                </Flex>
                <Text>-${un_used.toString().replace('-', '')}</Text>
              </Flex>
              <Flex
                row
                between
                center
                className={styles.totalBorder}
                marginTop={8}
              >
                <Text bold>Subtotal</Text>
                <Text bold>${subtotal}</Text>
              </Flex>
              {!isEmpty(available_balance) &&
                (available_balance !== 0 || stripe_balance !== 0) &&
                checkPlanChange && (
                  <Flex row center between marginTop={16}>
                    {available_balance !== 0 ? (
                      <Text>Available Balance Credits</Text>
                    ) : (
                      <Text>Applied Balance Credits </Text>
                    )}
                    {available_balance !== 0 ? (
                      <Text>
                        ${available_balance.toString().replace('-', '')}
                      </Text>
                    ) : (
                      <Text>${stripe_balance.toString().replace('-', '')}</Text>
                    )}
                  </Flex>
                )}

              {discount_added && (
                <Flex row center between marginTop={16}>
                  {discount_added?.discount_type === 'Fixed' ? (
                    <Text>
                      {discount_added?.discount_name} (with $
                      {discount_added?.discount_value} off)
                    </Text>
                  ) : (
                    <Text>
                      {discount_added?.discount_name} (with{' '}
                      {discount_added?.discount_value}% off)
                    </Text>
                  )}
                  <Text>-${total_discount_amounts}</Text>
                </Flex>
              )}
              <Flex row center between marginTop={16}>
                <Text bold>Amount Due Today</Text>
                <Text bold>${Math.round(Number(final) * 100) / 100}</Text>
              </Flex>
            </Flex>
          )}

          {/* update user */}
          {chekcUpdateUser && (
            <Flex className={styles.detailsFlex}>
              <Text bold size={16}>
                Details
              </Text>
              <Flex row between marginTop={8} marginBottom={8}>
                <Flex>
                  <Text style={{ marginBottom: 8 }}>
                    Prorated Charges for{' '}
                    <b>
                      {palnDeatils.plan_id === 4 || palnDeatils.plan_id === 5
                        ? 'Pro'
                        : 'Basic'}{' '}
                      Plan (
                      {palnDeatils.plan_id === 3 || palnDeatils.plan_id === 5
                        ? 'Annual'
                        : 'Monthly'}
                      )
                    </b>
                  </Text>
                  <Text>{`Users ${local_sub.no_of_users} --> ${count}`}</Text>
                </Flex>
                <Text>${new_price}</Text>
              </Flex>

              <Flex row between marginTop={8} marginBottom={8}>
                <Flex>
                  <Text style={{ marginBottom: 8 }}>
                    Unused Credits from Previous{' '}
                    <b>
                      {local_sub.plan_id_id === 4 || local_sub.plan_id_id === 5
                        ? 'Pro'
                        : 'Basic'}{' '}
                      Plan (
                      {local_sub.plan_id_id === 3 || local_sub.plan_id_id === 5
                        ? 'Annual'
                        : 'Monthly'}
                      )
                    </b>
                  </Text>
                  <Text>{`Users ${local_sub.no_of_users}`}</Text>
                </Flex>
                <Text>-${un_used.toString().replace('-', '')}</Text>
              </Flex>

              <Flex
                row
                between
                center
                className={styles.totalBorder}
                marginTop={8}
              >
                <Text bold>Subtotal</Text>
                <Text bold>${subtotal}</Text>
              </Flex>
              {!isEmpty(available_balance) &&
                (available_balance !== 0 || stripe_balance !== 0) &&
                checkPlanChange && (
                  <Flex row center between marginTop={16}>
                    {available_balance !== 0 ? (
                      <Text>Available Balance Credits</Text>
                    ) : (
                      <Text>Applied Balance Credits </Text>
                    )}
                    {/* <Text>Available Balance Credits</Text> */}
                    {available_balance !== 0 ? (
                      <Text>
                        ${available_balance.toString().replace('-', '')}
                      </Text>
                    ) : (
                      <Text>${stripe_balance.toString().replace('-', '')}</Text>
                    )}
                  </Flex>
                )}

              {!isEmpty(available_balance) &&
                (available_balance !== 0 || stripe_balance !== 0) &&
                Number(count) < local_sub.no_of_users && (
                  <Flex row center between marginTop={16}>
                    {available_balance !== 0 ? (
                      <Text>Available Balance Credits</Text>
                    ) : (
                      <Text>Applied Balance Credits </Text>
                    )}
                    {/* <Text>Available Balance Credits</Text> */}
                    {available_balance !== 0 ? (
                      <Text>
                        ${available_balance.toString().replace('-', '')}
                      </Text>
                    ) : (
                      <Text>${stripe_balance.toString().replace('-', '')}</Text>
                    )}
                  </Flex>
                )}
              {discount_added && (
                <Flex row center between marginTop={16}>
                  {discount_added?.discount_type === 'Fixed' ? (
                    <Text>
                      {discount_added?.discount_name} (with $
                      {discount_added?.discount_value} off)
                    </Text>
                  ) : (
                    <Text>
                      {discount_added?.discount_name} (with{' '}
                      {discount_added?.discount_value}% off)
                    </Text>
                  )}
                  <Text>-${total_discount_amounts}</Text>
                </Flex>
              )}
              <Flex row center between marginTop={16}>
                <Text bold>Amount Due Today</Text>
                <Text bold>${Math.round(Number(final) * 100) / 100}</Text>
              </Flex>
            </Flex>
          )}

          <Flex row top marginTop={20} marginBottom={30}>
            <div>
              <InputText
                value={formik.values.value}
                onChange={formik.handleChange('value')}
                placeholder="Enter Promo Code"
                disabled={isDisCount}
                actionRight={() =>
                  isDisCount && (
                    <div
                      tabIndex={-1}
                      role="button"
                      onKeyDown={() => {}}
                      onClick={() => {
                        formik.setFieldValue('value', '');
                        handleClosePromo();
                      }}
                    >
                      <SvgCloseSmall />
                    </div>
                  )
                }
              />
              {isPromoError && (
                <Text size={12} color="error">
                  This Promo Code is invalid.
                </Text>
              )}
            </div>
            {!isDisCount && (
              <Button
                style={{ marginLeft: 16 }}
                disabled={isEmpty(formik.values.value)}
                onClick={formik.handleSubmit}
              >
                Apply
              </Button>
            )}
          </Flex>
          <Flex columnFlex center marginBottom={10}>
            <Flex row center>
              <Button
                onClick={handleUpdatePaymentInfo}
                style={{ marginRight: 16 }}
              >
                Update Payment Info
              </Button>
              <Button onClick={handlePayNow}>Pay Now</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default OrderSummaryScreen;
