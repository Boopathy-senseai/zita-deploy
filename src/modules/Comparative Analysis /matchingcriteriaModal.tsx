import { useEffect, useRef, useState } from 'react';
import { Button, Card, InputCheckBox, Modal } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { Comparativeanalysis } from './mock';
import styles from './matchingcriteria.module.css';

const MatchingcriteriaModal = () => {
  const [cardSelectioncomparative, setCardSelectioncomparative] = useState<any>(
    [],
  );
  const [isData, setData] = useState<any>([]);
  const handleInputChangepass = (e) => {
    const isValueExist = isData.some((item) => item.value === e.value);
    if (!isValueExist) {
      // Add the new data
      setData([...isData, e]);
    } else {
      // Remove the existing data with the same value
      const updatedData = isData.filter((item) => item.value !== e.value);
      setData(updatedData);
    }
  };
  return (
    <Flex>
      <Modal open={false}>
        <Flex className={styles.modal}>
          <Flex center>
            <Flex
              style={{
                borderBottom: '1px solid rgb(195, 195, 195)',
                paddingBottom: '5px',
              }}
            >
              <Text size={14}>Comparative Analysis & AI Recommendation</Text>
            </Flex>
            <Flex row>
              <Flex
                row
                center
                wrap
                style={{
                  borderBottom: '1px solid rgb(195, 195, 195)',
                  paddingBottom: '10px',
                }}
              >
                {Comparativeanalysis.map((e) => {
                  return (
                    <Flex
                      key={e.value}
                      className={styles.matchRadioStyle}
                      column
                    >
                      <InputCheckBox
                        label={e.label}
                        checked={isData.some((item) => item.value === e.value)}
                        onChange={() => handleInputChangepass(e)}
                      />
                    </Flex>
                  );
                })}
              </Flex>
            </Flex>
            <Flex row end>
              <Flex
                center
                marginRight={10}
                marginTop={10}
                className={styles.centerali}
              >
                <Button>Cancel</Button>
              </Flex>
              <Flex center marginTop={10} className={styles.centerali}>
                <Button>Compare</Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default MatchingcriteriaModal;
