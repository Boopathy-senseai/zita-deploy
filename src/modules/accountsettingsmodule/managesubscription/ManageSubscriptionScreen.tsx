/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SvgInfo from '../../../icons/SvgInfo';
import { AppDispatch, RootState } from '../../../store';
import { WARNING } from '../../../uikit/Colors/colors';
import Flex from '../../../uikit/Flex/Flex';
import {
  getDateString,
  isEmpty,
} from '../../../uikit/helper';
import Loader from '../../../uikit/Loader/Loader';
import Text from '../../../uikit/Text/Text';
import { Button } from '../../../uikit';
import SingleButton from '../../common/SingleButton';
import { permissionMiddleWare } from '../../Login/store/middleware/loginMiddleWare';
import {
  backendProcessMiddleWare,
  creditsPurchaseMiddleWare,
} from '../../ordersummarymodule/store/ordersummarymiddleware';
import AddOnCard from './AddOnCard';
import styles from './managesubscriptionscreen.module.css';
import PlansandFeatures from './PlansandFeatures';
import {
  billingPortalMiddleWare,
  manageSubscriptionMiddleWare,
  renewSubscriptionMiddleWare,
} from './store/managesubscriptionmiddleware';
import SubscriptionPlan from './SubscriptionPlan';



type Props = {
  setTab: (a: string) => void;
};
const ManageSubscriptionScreen = ({ setTab }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoader, setLoader] = useState(false);
  const [isPlanChanged, setPlanChanged] = useState(false);
  const [isNewUser, setNewUser] = useState(false);
  const [isRemoveUser, setRemoveUser] = useState(false);
  const [isRenew, setRenew] = useState(false);
  const [isCancelOne, setCancelOne] = useState(false);
  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const modal_popup: any = query.get('modal_popup');
  const session_id: any = query.get('session_id');
  const planFocus: any = query.get('planFocus');
  const session: any = query.get('session');

  // url based api call trigger ofr stripe update
  useEffect(() => {
    if (!isEmpty(session_id)) {
      setLoader(true);
      dispatch(backendProcessMiddleWare({ session_id })).then(() => {
        dispatch(manageSubscriptionMiddleWare()).then(() => {
          if (query.has('session_id')) {
            query.delete('session_id');
            history.replace({
              search: query.toString(),
            });
          }
          setLoader(false);
        }).then(()=>{
          dispatch(permissionMiddleWare());
        })
      });
    }
    if (!isEmpty(session)) {
      setLoader(true);

      dispatch(creditsPurchaseMiddleWare({ session })).then(() => {
        dispatch(manageSubscriptionMiddleWare()).then(() => {
          if (query.has('session')) {
            query.delete('session');
            history.replace({
              search: query.toString(),
            });
          }
          setLoader(false);
        }).then(()=>{
          dispatch(permissionMiddleWare());

        })
      });
    }
  }, []);
  useEffect(()=>{
    if (!isEmpty(planFocus)) {
      var elmnt:any = document.getElementById('plans_and_features__plan');
      elmnt.scrollIntoView();
      if (query.has('planFocus')) {
        query.delete('planFocus');
        history.replace({
          search: query.toString(),
        });
      }
    }
  })

  // url based show popup
  useEffect(() => {
    if (isEmpty(session_id) && isEmpty(session)) {
      dispatch(manageSubscriptionMiddleWare()).then(() => {
        if (modal_popup === 'plan_changed') {
          setPlanChanged(true);
        }
        if (modal_popup === 'user_ase') {
          setNewUser(true);
        }
        if (modal_popup === 'user_dec') {
          setRemoveUser(true);
        }
      });
    }
  }, []);

  const { subscription, totalUserManger, downgrade, free_expired } =
    useSelector(({ manageSubscriptionReducers }: RootState) => ({
      subscription: manageSubscriptionReducers.subscription,
      available: manageSubscriptionReducers.available,
      totalUserManger: manageSubscriptionReducers.total_user,
      downgrade: manageSubscriptionReducers.downgrade,
      free_expired: manageSubscriptionReducers.free_expired,
    }));

  const getPlanId: any = subscription && subscription?.plan_id_id.toString();

  // renew button function
  const hanldeRenew = () => {
    setLoader(true);
    dispatch(
      renewSubscriptionMiddleWare({
        key: getPlanId,
      }),
    ).then(() => {
      setLoader(false);
      dispatch(manageSubscriptionMiddleWare()).then(() => {
        setRenew(true);
      });
    });
  };
  const handleInvoice = () => {
    setLoader(true);
    dispatch(billingPortalMiddleWare({})).then((res) => {
      window.location.replace(res.payload.url);
      setLoader(false);
    });
  };

  // plan card function
  const handleFocus = () => {
    var elmnt:any = document.getElementById('plans_and_features__plan');
    elmnt.scrollIntoView();
  };
  if (isLoader) {
    return <Loader />;
  }
  return (
    <Flex className={styles.overAll} style={{overflowY:'scroll',maxHeight:window.innerHeight-100,paddingRight:'10px'}}>
      <Flex row center between className={styles.titleStyle}>
        <Flex>
          <Text size={14} bold>
          Subscription
          </Text>
        </Flex>
        <Flex row>
        {subscription &&
          subscription.is_active === true &&subscription.plan_id_id !== 1&&
          isEmpty(subscription.subscription_changed_to) ? (
            <Button  onClick={() => setCancelOne(true)}  types='secondary'>
              Cancel Subscription
            </Button>
          ) : (
            (subscription && subscription.plan_id_id !== 1 )?(
              <Button  onClick={hanldeRenew} types='primary' >
              Renew Subscription
            </Button>
            ):('')
            
          )}
          <Button onClick={handleInvoice} style={{marginLeft:'15px'}}>Invoices & Payment Info</Button>        
        </Flex>
      </Flex>
      {/*{subscription && subscription?.plan_id_id === 1 &&
        subscription?.subscription_remains_days <= 0 && (
          <Flex columnFlex>
            <Flex middle row center className={styles.warningFlex}>
              <SvgInfo fill={'#2E6ADD'} />
              <Text
                size={12}
                bold
                color="warning"
                className={styles.warningText}
              >
                {`Your free trial expired. Please`}
                <Text style={{marginLeft:2}} size={12} bold color="link" onClick={handleFocus}>
                  upgrade{' '}
                </Text>
                to access plan features
              </Text>
            </Flex>
          </Flex>
        )}*/}

      {subscription && subscription.plan_id_id === 1 && free_expired === 1 && (
        <Flex columnFlex>
          <Flex middle row center className={styles.warningFlex1}>
          <SvgInfo height={16} width={16} fill={'#2E6ADD'} />
          <Text style={{color:'#2E6ADD',marginRight:'3px',fontSize:'13px',marginLeft:"7px"}} bold >Heads Up!{' '}</Text>
            <Text size={13}   className={styles.warningText1}>
              {`Your free trial ends on ${getDateString(
                subscription?.subscription_end_ts,
                'll',
              )}. Please `}
              <Text size={13} bold color="link" onClick={handleFocus}>
                upgrade{' '}
              </Text>
              to a paid plan to get uninterrupted access and enjoy more zita
              platform features along with your branded careers page.
            </Text>
          </Flex>
        </Flex>
    )} 

      {subscription &&
        subscription.is_active === true &&
        !isEmpty(subscription.subscription_changed_to) &&
        subscription.plan_id_id !== 1 &&
        Number(subscription.subscription_changed_to) !== -2 && (
          <Flex columnFlex>
            <Flex middle row center className={styles.warningFlex1}>
              <SvgInfo fill={'#2E6ADD'} height={16} width={16}/>
              <Text
                size={13}
                
              
                className={styles.warningText1}
              >
                {`You have cancelled  your subscription on  ${getDateString(
                  subscription.subscription_start_ts,
                  'll',
                )}. You have ${
                  subscription.subscription_remains_days === 1
                    ? subscription.subscription_remains_days + ' day'
                    : subscription.subscription_remains_days + ' days'
                } left to use the platform until your current subscription ends. Please click to `}
                <Text onClick={hanldeRenew} style={{fontSize:"13px"}} bold color="link">
                  renew{' '}
                </Text>
                your subscription.
              </Text>
            </Flex>
          </Flex>
        )}

      {subscription &&
        subscription.is_active === true &&
        free_expired === 0 &&
        subscription.plan_id_id === 1 && (
          <Flex columnFlex>
            <Flex middle row center className={styles.warningFlex1}>
              <SvgInfo fill={'#2E6ADD'} height={16} width={16} />
              <Text
                size={13}
                
                
                className={styles.warningText1}
                
              >
                {`Your free trial expired. Please `}
                <Text size={13} bold color="link" onClick={handleFocus}>
                  upgrade{' '}
                </Text>
                to access plan features.
              </Text>
            </Flex>
          </Flex>
        )}

      {subscription &&
        subscription.is_active === true &&
        Number(subscription.subscription_changed_to) === -2 &&
        subscription.plan_id_id !== 1 && (
          <Flex columnFlex>
            <Flex middle row center className={styles.warningFlex1}>
              <SvgInfo fill={'#2E6ADD'} height={16} width={16}/>
              <Text
                size={13}             
              
                className={styles.warningText1}
              >
                {`Your subscription expired. Please `}
                <Text size={13} bold color="link" onClick={handleFocus}>
                  renew{' '}
                </Text>
                your subscription to access plan features
              </Text>
            </Flex>
          </Flex>
        )}
      <SingleButton
        btnTitle="OK"
        title={`User removed successfully. Total users for this subscription is ${
          subscription && subscription.no_of_users
        }`}
        open={isRemoveUser}
        btnOnclick={() => {
          setRemoveUser(false);
          if (query.has('modal_popup')) {
            query.delete('modal_popup');
            history.replace({
              search: query.toString(),
            });
          }
        }}
        svgTick
      />

      <SingleButton
        btnTitle="OK"
        title={'Payment Successfull. Your plan has been changed successfully.'}
        open={isPlanChanged}
        btnOnclick={() => {
          setPlanChanged(false);
          if (query.has('modal_popup')) {
            query.delete('modal_popup');
            history.replace({
              search: query.toString(),
            });
          }
        }}
        svgTick
      />
        <SingleButton
          btnTitle="OK"
          title={'Subscription renewed successfully.'}
          open={isRenew}
          btnOnclick={() => setRenew(false)}
          svgTick
        />

      <SingleButton
        btnTitle="OK"
        title={
          <Flex marginLeft={16}>
            <Text>Payment Successful. New users purchased successfully.</Text>
            <Text>Total Users: {subscription && subscription.no_of_users}</Text>
          </Flex>
        }
        open={isNewUser}
        btnOnclick={() => {
          setNewUser(false);
          if (query.has('modal_popup')) {
            query.delete('modal_popup');
            history.replace({
              search: query.toString(),
            });
          }
        }}
        svgTick
      />
      {subscription !== null && (
        <SubscriptionPlan 
        setCancelOne={setCancelOne}
        isCancelOne={isCancelOne}
        setRenew={() => setRenew(true)} 
        />
      )}
      <PlansandFeatures
        subscription={subscription}
        totalUserManger={totalUserManger}
        setTab={setTab}
        downgrade={downgrade}
      />
      <AddOnCard />
    </Flex>
  );
};

export default ManageSubscriptionScreen;
