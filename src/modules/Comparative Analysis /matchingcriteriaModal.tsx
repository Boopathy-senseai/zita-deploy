import { useEffect, useRef, useState } from 'react';
import { Button, Card, InputCheckBox, Modal } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import { Comparativeanalysis } from './mock';
import styles from './matchingcriteria.module.css';
import Comparativeanalysismodal from './Comparativeanalysis';

type Props = {
  matchmodel?: any;
  updatemodel?: (val: any, id: any) => void;
  Matching: any;
  job_details: any;
};

const MatchingcriteriaModal = ({
  matchmodel,
  updatemodel,
  Matching,
  job_details,
}: Props) => {
  const [cardSelectioncomparative, setCardSelectioncomparative] = useState<any>(
    [],
  );
  const [isData, setData] = useState<any>([]);
  const [Error, setError] = useState('');
  const [Comparative, setComparative] = useState(false);

  const update_alysismodal = (val) => {
    setComparative(val);
  };

  const handleInputChangepass = (e) => {
    const isValueExist = isData.some((item) => item.value === e.value);
    setError('');
    if (!isValueExist) {
      // Add the new data
      setData([...isData, e]);
    } else {
      // Remove the existing data with the same value
      const updatedData = isData.filter((item) => item.value !== e.value);
      setData(updatedData);
    }
  };

  const resetdata = () => {
    setData([]);
  };

  const cancelmodel = (val) => {
    updatemodel(val, 0);
    setData([]);
  };

  const compare = () => {
    if (isData.length !== 0) {
      update_alysismodal(true);
    } else {
      setError('Select one or more criteria to compare');
    }
  };

  const selectall = () => {
    setData(Comparativeanalysis);
  };

  const clear = () => {
    setData([]);
  };

  return (
    <Flex>
      <Modal open={matchmodel}>
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
            <Flex>
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
                          checked={isData.some(
                            (item) => item.value === e.value,
                          )}
                          onChange={() => handleInputChangepass(e)}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
              <Flex>
                <Text style={{ color: 'red' }}>{Error}</Text>
              </Flex>
            </Flex>
            <Flex row between >
              <Flex marginTop={10}>
                {isData.length === 0 ? (
                  <Button types="secondary" onClick={() => selectall()}>
                    Select All
                  </Button>
                ) : (
                  <Button types="secondary" onClick={() => clear()}>
                    Clear
                  </Button>
                )}
              </Flex>
              <Flex row end>
                <Flex
                  center
                  marginRight={10}
                  marginTop={10}
                  className={styles.centerali}
                >
                  <Button types="secondary" onClick={() => cancelmodel(false)}>
                    Cancel
                  </Button>
                </Flex>
                <Flex center marginTop={10} className={styles.centerali}>
                  <Button onClick={() => compare()}>Analyse</Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Modal>
      {Comparative && (
        <Comparativeanalysismodal
          Comparative={Comparative}
          update_alysismodal={update_alysismodal}
          resetdata={resetdata}
          updatemodel={updatemodel}
          Matching={Matching}
          job_details={job_details}
          isData={isData}
        />
      )}
    </Flex>
  );
};

export default MatchingcriteriaModal;
