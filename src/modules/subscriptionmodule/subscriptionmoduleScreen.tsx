import React from 'react';
import { useState } from 'react';
import { Flex, Text, Modal, Button, Card } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import styles from '../subscriptionmodule/subscriptionscreen.module.css';
import SvgTick from '../../icons/SvgTick';
import { SUCCESS } from '../../uikit/Colors/colors';

type Props = {
  currentplan: any;
  nextplan: any;
  openmodel: boolean;
  setopensubcription:(a:any)=>void;
};
const SubscriptionModal = ({ currentplan, nextplan, openmodel,setopensubcription }: Props) => {
  const [isShowPass, setShowPass] = useState(true);

  return (
    <>
      <Modal open={openmodel}>
        <Flex className={styles.subscriptionmodule}>
          <Flex row between className={styles.bottomborder}>
            <Flex marginBottom={5}>
              <Text bold>Upgrade your plan</Text>
            </Flex>
            <Flex onClick={()=>setopensubcription(false)}>
              <SvgClose
                width={10}
                height={10}
                fill={'#888888'}
                cursor={'pointer'} 
              />
            </Flex>
          </Flex>
          <Flex className={styles.container}>
            <Flex className={styles.section1}>
              <Flex row between>
                <Text bold>Basic</Text>
                <Text>
                  <span style={{ fontWeight: 'bold' }}>$39</span>/month
                </Text>
              </Flex>

              <Flex row marginTop={10}>
                <Flex>
                  <SvgTick fill={SUCCESS} />
                </Flex>
                <Flex marginLeft={20}>
                  Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum ut
                  risus auctor at dolor.
                </Flex>
              </Flex>
              <Flex row marginTop={10}>
                <Flex>
                  <SvgTick fill={SUCCESS} />
                </Flex>
                <Flex marginLeft={20}>
                  Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum ut
                  risus auctor at dolor.
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
                <Text bold>Professional</Text>
                <Text>
                  <span style={{ fontWeight: 'bold' }}>$99</span>/month
                </Text>
              </Flex>

              <Flex row marginTop={10}>
                <Flex>
                  <SvgTick fill={SUCCESS} />
                </Flex>
                <Flex marginLeft={20}>
                  Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum ut
                  risus auctor at dolor.
                </Flex>
              </Flex>

              <Flex row marginTop={10}>
                <Flex>
                  <SvgTick fill={SUCCESS} />
                </Flex>
                <Flex marginLeft={20}>
                  Lorem ipsum dolor sit amet consectetur. Feugiat vestibulum ut
                  risus auctor at dolor.
                </Flex>
              </Flex>

              <Flex className={styles.buttoncenter}>
                <Button>Upgrade Now</Button>
              </Flex>
            </Flex>
          </Flex>
          <Flex marginTop={10} style={{ border: '0.5px solid #C3C3C3' }}></Flex>
          <Flex>
            <Text bold style={{ marginTop: '20px' }}>
              Available Add-on feature.
            </Text>

            <Flex marginTop={20}>
              <Button>Job Credits</Button>
              <Card className={styles.cards}>
                <Flex className={styles.creditcontainer}>
                  <Flex className={styles.creditflex1}>
                    Includes CV Parsing & AI Matching, Unlock Candidate Contact,
                    Complete Zita Profile View,Candidate Portal
                  </Flex>
                  <Flex className={styles.creditflex2}>
                    <Text style={{ marginTop: '10px' }}>
                      <span style={{ fontWeight: 'bold' }}> $ 50</span>/ 5 Job
                      post
                    </Text>
                  </Flex>
                  <Flex className={styles.creditflex3}>
                    <Flex marginTop={15}>
                      <Button>Discover</Button>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default SubscriptionModal;
