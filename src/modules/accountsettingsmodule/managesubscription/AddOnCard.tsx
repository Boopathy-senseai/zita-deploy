import { loadStripe } from '@stripe/stripe-js';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import Toast from '../../../uikit/Toast/Toast';
import { ERROR_MESSAGE, onlyNumber } from '../../constValue';
import { createCheckoutMiddleWare, stripeMiddleWare } from '../../talentsourcingmodule/store/middleware/talentSoucringMiddleware';
import styles from './addoncard.module.css';

const AddOnCard = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);

  const {
    subscription,
    available,
  } = useSelector(({ manageSubscriptionReducers }: RootState) => ({
    subscription: manageSubscriptionReducers.subscription,
    available: manageSubscriptionReducers.available,
  }));

  // formik validation
  const handleValidation = (values: any) => {
    const errors: Partial<any> = {};
    if (Number(values.value) < 5) {
      errors.value = 'Minimum Candidate 5';
    }
    return errors;
  };

  // formik submit function
  const handleSubmit = async (values: any) => {
    setLoader(true);
    dispatch(
      createCheckoutMiddleWare({
        can_count: values.value,
        amount: totalAmount,
        manage_sub:'/account_setting/settings'
      }),
    )
      .then((response) => {
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
      })
      .catch(() => {
        setLoader(false);
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const formik = useFormik({
    initialValues: { value: '5' },
    onSubmit: handleSubmit,
    validate: handleValidation,
  });

  const disPlayValue = Number(formik.values.value) * 2;

  const totalAmount: string = disPlayValue.toString();

  return (
    <>
      {isLoader && <Loader />}
      <Card className={styles.overAll}>
        <Flex row center between>
          <Text size={16} bold>
            Add-On
          </Text>
          <Text size={16} bold>
            Available Credits: {available}
          </Text>
        </Flex>
        <Text style={{ marginTop: 8, marginBottom: 20 }}>
          * You must have any of the premium plan to avail this candidate
          contact credits
        </Text>

        <Card className={styles.contactCard}>
          {subscription && subscription.plan_id_id === 1 && (
            <div className={styles.disabled} />
          )}
          {subscription === null && <div className={styles.disabled} />}

          <Flex middle center className={styles.headerStyle}>
            <Text color="white" bold size={16} transform="uppercase">
              {'Contact CREDITS'}
            </Text>
          </Flex>
          <Flex row middle>
            <Text
              align="center"
              color="theme"
              size={30}
              bold
              style={{ marginBottom: 4 }}
            >
              {'$2'}
            </Text>
            <Text style={{ alignSelf: 'center' }}>/Contact Credits</Text>
          </Flex>
          <Flex columnFlex marginTop={8}>
            <Text align="center">Unlock Candidate Contact, Includes CV,</Text>
            <Text align="center">
              Parsing & AI Matching, Complete Zita Profile View
            </Text>
            <Text align="center">Candidate Portal</Text>
          </Flex>
          <Flex
            row
            center
            between
            className={styles.inputBorder}
          >
            <Flex row center>
              <Text bold style={{ marginRight: 8 }}>
                Contacts:
              </Text>
              <div>
                <InputText
                  align="center"
                  value={formik.values.value}
                  onChange={(e) => {
                    if (
                      e.target.value === '' ||
                      (onlyNumber.test(e.target.value) &&
                        Number(e.target.value) >= 5)
                    ) {
                      formik.setFieldValue(`value`, e.target.value);
                    }
                  }}
                  className={styles.inputStyle}
                />
                <ErrorMessage
                  errors={formik.errors}
                  touched={formik.touched}
                  name="value"
                />
              </div>
            </Flex>
            <Text bold>Total: ${totalAmount}</Text>
          </Flex>
          <Flex middle marginBottom={24} marginTop={8}>
            <Button disabled={(subscription && subscription.plan_id_id === 1) ||  subscription === null} onClick={formik.handleSubmit}>Buy Now</Button>
          </Flex>
        </Card>
      </Card>
    </>
  );
};

export default AddOnCard;
