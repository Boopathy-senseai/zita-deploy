import { useEffect, useRef, useState } from 'react';
import { Button, Card, InputCheckBox, Modal } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SingleButton from '../common/SingleButton';
import { Comparativeanalysis } from './mock';
import styles from './matchingcriteria.module.css';

type Props = {
  editmodal?: any;
  editdata?: any;
  Edit_data?: (val: any, id: any) => void;
  edit_close?: (val: any) => void;
  dispatchcomparativeApi?: (val: any, id: any, value: any) => void;
  Matching: any;
};

const MatchingcriteriaModal = ({
  editmodal,
  editdata,
  Edit_data,
  edit_close,
  dispatchcomparativeApi,
  Matching,
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
  const [message, setmessage] = useState('edit');

  const handleInputChangepass = (e) => {
    const isValueExist = editdata.some((item) => item.value === e.value);
    setError('');
    if (!isValueExist) {
      // Add the new data
      Edit_data(e, 0);
    } else {
      // Remove the existing data with the same value
      const updatedData = editdata.filter((item) => item.value !== e.value);
      Edit_data(updatedData, 1);
    }
  };

  const selectall = () => {
    setError('');
    Edit_data(Comparativeanalysis, 1);
  };

  const clear = () => {
    Edit_data([], 1);
  };

  const cancelmodel = (val) => {
    edit_close(val);
    setError('');
  };

  const compare = () => {
    if (editdata.length !== 0) {
      edit_close(false);
      dispatchcomparativeApi(Matching, editdata, message);
    } else {
      setError('Please select at least one criteria to compare.');
    }
  };

  return (
    <Flex>
      <Modal open={editmodal}>
        <Flex className={styles.modal}>
          <Flex center>
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
                          checked={editdata.some(
                            (item) => item.value === e.value,
                          )}
                          onChange={() => handleInputChangepass(e)}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
                <Flex>
                  <Text style={{ color: 'red' }}>{Error}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex row between>
              <Flex marginTop={17}>
                {editdata.length === 0 ? (
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
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};

export default MatchingcriteriaModal;
