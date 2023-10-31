import { useEffect, useRef, useState } from 'react';
import { Button, Card, InputCheckBox, Modal } from '../../uikit';
import SvgClose from '../../icons/SvgClose';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SingleButton from '../common/SingleButton';
import { Comparativeanalysis } from './mock';
import styles from './matchingcriteria.module.css';
import Comparativeanalysismodal from './Comparativeanalysis';

type Props = {
  matchmodel?: any;
  updatemodel?: (val: any, id: any) => void;
  Matching: any;
  job_details: any;
  select_candidate?: (val: any, id: any) => void;
};

const MatchingcriteriaModal = ({
  matchmodel,
  updatemodel,
  Matching,
  job_details,
  select_candidate,
}: Props) => {
  const [cardSelectioncomparative, setCardSelectioncomparative] = useState<any>(
    [],
  );
  const [isData, setData] = useState<any>([]);
  const [Error, setError] = useState('');
  const [Comparative, setComparative] = useState(false);
  const [edit, setedit] = useState(false);
  const [selectedcriteria, setresponsibledateria] = useState<any>();
  const [newedit, setnewedit] = useState(false);
  const [oldisData, setoldisData] = useState<any>([]);
  const update_riteria = (val) => {
    setresponsibledateria(val);
  };

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
    if (edit === true) {
      setError('');
      setnewedit(true);
      setComparative(true);
      setData(oldisData);
    } else {
      setError('');
      setnewedit(false);
      updatemodel(val, 0);
      setData([]);
      setedit(false);
      setoldisData([]);
    }
  };

  const compare = () => {
    if (isData.length !== 0) {
      setError('');
      setnewedit(false);
      updatemodel(false, 0);
      update_alysismodal(true);
    } else {
      setError('Please select at least one criteria to compare.');
    }
  };

  const selectall = () => {
    setError('');
    setData(Comparativeanalysis);
  };

  const edit_function = (val) => {
    // setedit(val);
    // setoldisData(isData);
    setData(val);
  };

  const clear = () => {
    setData([]);
  };

  return (
    <Flex>
      <Modal open={matchmodel}>
        <Flex className={Matching.length <= 5 && styles.modal}>
          <Flex center>
            {/* {Matching.length > 5 ? (
              <>
                <SingleButton
                  btnTitle="OK"
                  title={
                    'only select 5 candidates and access for Comparative Analysis & AI Recommendation'
                  }
                  open={Matching.length > 5}
                  btnOnclick={() => cancelmodel(false)}
                />
              </>
            ) : ( */}
            <>
              <Flex
                style={{
                  borderBottom: '1px solid rgb(195, 195, 195)',
                  paddingBottom: '5px',
                }}
              >
                <Text size={14} bold>
                  Select criteria to compare
                </Text>
              </Flex>
              <Flex>
                <Flex
                  style={{
                    borderBottom: '1px solid rgb(195, 195, 195)',
                  }}
                >
                  <Flex
                    row
                    center
                    wrap
                    style={{
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
                  {Error && (
                    <Flex marginBottom={5}>
                      <Text style={{ color: 'red' }}>{Error}</Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex row between>
                <Flex marginTop={17}>
                  {isData.length === 0 ? (
                    <Button
                      types="secondary"
                      onClick={() => selectall()}
                      width="87px"
                    >
                      Select All
                    </Button>
                  ) : (
                    <Button
                      types="secondary"
                      onClick={() => clear()}
                      width="87px"
                    >
                      Clear All
                    </Button>
                  )}
                </Flex>
                <Flex row end>
                  <Flex
                    center
                    marginRight={20}
                    marginTop={17}
                    className={styles.centerali}
                  >
                    <Button
                      types="close"
                      onClick={() => cancelmodel(false)}
                      width="75px"
                    >
                      Cancel
                    </Button>
                  </Flex>
                  <Flex center marginTop={17} className={styles.centerali}>
                    <Button onClick={() => compare()} width="75px">
                      Analyse
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </>
            {/* )} */}
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
          select_candidate={select_candidate}
          edit={edit}
          edit_function={edit_function}
          selectedcriteria={selectedcriteria}
          update_riteria={update_riteria}
          newedit={newedit}
        />
      )}
    </Flex>
  );
};

export default MatchingcriteriaModal;
