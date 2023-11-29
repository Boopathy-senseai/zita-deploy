import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { Flex, Text, Modal, Button, Card } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import SvgTick from '../../icons/SvgTick';
import { SUCCESS } from '../../uikit/Colors/colors';
import { SubsriptionMiddleWare } from '../navbar/empnavbar/store/navbarmiddleware';
import styles from '../subscriptionmodule/subscriptionscreen.module.css';
type Props = {
  currentplan?: any;
  nextplan?: any;
  openmodel: boolean;
  setopensubcription: (a: any) => void;
  addon_name?: any;
};
const SubscriptionModal = ({
  currentplan,
  nextplan,
  openmodel,
  setopensubcription,
  addon_name
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isShowPass, setShowPass] = useState(true);
  const [oldplan, setoldplan] = useState(null);
  const [Nextplan, setnextplan] = useState(null);
  console.log(addon_name, 'addon_idaddon_id')
  const {
    current_plan,
    current_jd_count,
    total_plan,
    isLoading,
    add_on_plans,
  } = useSelector(({ SubscriptionReducers }: RootState) => ({
    current_plan: SubscriptionReducers.current_plan,
    current_jd_count: SubscriptionReducers.current_jd_count,
    total_plan: SubscriptionReducers.total_plan,
    isLoading: SubscriptionReducers.isLoading,
    add_on_plans: SubscriptionReducers.add_on_plans,
  }));
  useEffect(() => {
    get_currentplan();
    get_nextplan();
  }, [current_plan]);

  const get_currentplan = () => {
    const foundPlan = total_plan.find((plan) => plan.plan_id === current_plan);
    console.log('?', total_plan);
    console.log('/', foundPlan);
    setoldplan(foundPlan);
  };

  const get_nextplan = () => {
    const foundPlan = total_plan.find(
      (plan) => plan.plan_id === current_plan + 1,
    );
    console.log('//', foundPlan);
    setnextplan(foundPlan);
  };

  console.log('aaaa', current_plan, current_jd_count, total_plan, isLoading);

  return (
    <>
      {console.log('11111', oldplan,)}
      {console.log('222222', add_on_plans)}
      <Modal open={openmodel}>
        <Flex className={styles.subscriptionmodule}>
          <Flex row between className={styles.bottomborder}>
            <Flex marginBottom={5}>
              <Text bold>Upgrade your plan</Text>
            </Flex>
            <Flex
              onClick={() => setopensubcription(false)}
              style={{ cursor: 'pointer' }}
            >
              <SvgClose
                width={10}
                height={10}
                fill={'#888888'}
                cursor={'pointer'}
              />
            </Flex>
          </Flex>
          {oldplan !== null && Nextplan !== null ? (
            <Flex className={styles.container}>
              <Flex className={styles.section1}>
                <Flex row between>
                  <Text bold>{oldplan.plan_name}</Text>
                  <Text>
                    <span style={{ fontWeight: 'bold' }}>${oldplan.price}</span>
                    /month
                  </Text>
                </Flex>

                <Flex row marginTop={10}>
                  <Flex>
                    <SvgTick fill={SUCCESS} />
                  </Flex>
                  <Flex marginLeft={20}>
                    Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum
                    ut risus auctor at dolor.
                  </Flex>
                </Flex>
                <Flex row marginTop={10}>
                  <Flex>
                    <SvgTick fill={SUCCESS} />
                  </Flex>
                  <Flex marginLeft={20}>
                    Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum
                    ut risus auctor at dolor.
                  </Flex>
                </Flex>

                <Flex className={styles.buttoncenter}>
                  <Button disabled>Current Plan</Button>
                </Flex>
              </Flex>
              <Flex className={styles.section2}>
                <Flex className={styles.line}> </Flex>{' '}
              </Flex>
              <Flex className={styles.section3}>
                <Flex row between>
                  <Text bold>{Nextplan.plan_name}</Text>
                  <Text>
                    <span style={{ fontWeight: 'bold' }}>
                      ${Nextplan.price}
                    </span>
                    /month
                  </Text>
                </Flex>

                <Flex row marginTop={10}>
                  <Flex>
                    <SvgTick fill={SUCCESS} />
                  </Flex>
                  <Flex marginLeft={20}>
                    Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum
                    ut risus auctor at dolor.
                  </Flex>
                </Flex>

                <Flex row marginTop={10}>
                  <Flex>
                    <SvgTick fill={SUCCESS} />
                  </Flex>
                  <Flex marginLeft={20}>
                    Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum
                    ut risus auctor at dolor.
                  </Flex>
                </Flex>

                <Flex className={styles.buttoncenter}>
                  <Button>Upgrade Now</Button>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            ''
          )}

          <Flex marginTop={10} style={{ border: '0.5px solid #C3C3C3' }}></Flex>
          <Flex>
            <Text bold style={{ marginTop: '20px' }}>
              Available Add-on feature.
            </Text>


            {add_on_plans && add_on_plans?.filter(item => addon_name?.includes(item?.addon_id__name)).map((val, index) => (
              <Flex marginTop={20} key={index}>
                <Button>{val.addon_id__name}</Button> 
                <>
                  <Card className={styles.cards}>
                    <Flex className={styles.creditcontainer}>
                      <Flex className={styles.creditflex1}>
                        Includes CV Parsing & AI Matching, Unlock Candidate
                        Contact, Complete Zita Profile View,Candidate Portal
                      </Flex>
                      <Flex className={styles.creditflex2}>
                        <Text style={{ marginTop: '10px' }}>
                          <span style={{ fontWeight: 'bold' }}>
                            {' '}
                            $ {val.price}
                          </span>
                          / {val.value} Job post
                        </Text>
                      </Flex>
                      <Flex className={styles.creditflex3}>
                        <Flex marginTop={15}>
                          <Button>Discover</Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                </>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
