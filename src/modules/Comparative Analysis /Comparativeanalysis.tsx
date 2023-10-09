import { useEffect, useRef, useState } from 'react';

import { Card, Modal, Button } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgClose from '../../icons/SvgClose';
import styles from './Recommendationscreen.module.css';
import Addcandidatesmodal from './addcandidatesmodel';

const ComparativeanalysisModal = () => {
  const [addmodel, setaddmodel] = useState(false);

  const openaddmodel = (val) => {
    setaddmodel(val);
  };
  return (
    <Flex>
      <Modal open={true}>
        <Flex columnFlex className={styles.overAll}>
          <Flex row end>
            <SvgClose
              width={10}
              height={10}
              fill={'#888888'}
              cursor={'pointer'}
            />
          </Flex>
          <Flex style={{ marginTop: '10px' }}>
            <Card className={styles.card}>
              <Flex className={styles.cardheader}>
                <Text style={{ color: 'white', padding: ' 5px 0px 0px 20px' }}>
                  {' '}
                  AI Recommendation{' '}
                </Text>
              </Flex>
              <Flex className={styles.container}>
                <Flex className={styles.part1}>
                  <Flex style={{ justifyContent: 'center' }}>
                    <img
                      className={styles.profile}
                      alt=""
                      height={19}
                      width={45}
                      src="https://i.ibb.co/fFSqFCW/new.png"
                    />
                    <Text style={{ padding: ' 2px 0px 0px 5px' }}>
                      John Doe
                    </Text>
                  </Flex>
                </Flex>
                <Flex className={styles.part2}></Flex>
                <Flex className={styles.part3}>
                  <Text style={{ marginTop: '15px' }}>
                    {' '}
                    Lorem ipsum dolor sit amet consectetur. Ac ac ornare enim id
                    in. Ipsum vitae tempus amet quam quam vehicula velit.
                    Tincidunt quisque lectus gravida eget magna. Mi ultrices
                    facilisi velit quam metus{' '}
                  </Text>
                </Flex>
              </Flex>
              <Button onClick={() => openaddmodel(true)}>click</Button>
            </Card>
          </Flex>
        </Flex>
      </Modal>
      <Addcandidatesmodal model={addmodel} openfunction={openaddmodel} />
    </Flex>
  );
};

export default ComparativeanalysisModal;
