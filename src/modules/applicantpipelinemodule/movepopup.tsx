import { useSelector } from 'react-redux';
import { useState } from 'react';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import { InputRadio } from '../../uikit';
import Button from '../../uikit/Button/Button';
import SvgMove from '../../icons/SvgMove';
import { RootState } from '../../store';
import styles from './movepopup.module.css';

type Props = {
  openMovePopup: boolean;
  handleClosePipelinePopup: () => void;
  onMove: (stageId: string) => void;
};

const MovePipelinePopup = ({
  openMovePopup,
  handleClosePipelinePopup,
  onMove,
}: Props) => {
  const [isCheckedRadio, setCheckedRadio] = useState<string | null>(null);
  const { stages } = useSelector(({ templatePageReducers }: RootState) => ({
    stages: templatePageReducers.stages,
  }));
  return (
    <Modal open={openMovePopup}>
      <Flex flex={6} columnFlex className={styles.overAll}>
        <Flex row center className={styles.insertStyles}>
          <Flex marginBottom={5}>
            <SvgMove />
          </Flex>
          <Text
            size={16}
            style={{ marginLeft: '10px', marginBottom: '5px' }}
            bold
            color="theme"
          >
            Move Column
          </Text>
        </Flex>
        <Flex column start>
          {stages.map((list) => {
            return (
              <Flex row key={list.title} className={styles.matchRadioStyle}>
                <InputRadio
                  label={list.title}
                  checked={list.id === isCheckedRadio}
                  onClick={() => setCheckedRadio(list.id)}
                />
              </Flex>
            );
          })}
        </Flex>

        <Flex row end marginTop={20} className={styles.borderLine}>
          <Button
            className={styles.cancel}
            types={'primary'}
            onClick={handleClosePipelinePopup}
          >
            Cancel
          </Button>
          <Button
            className={styles.update}
            onClick={() => onMove(isCheckedRadio)}
          >
            Move
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default MovePipelinePopup;
