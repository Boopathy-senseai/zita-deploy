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
  onMove: (stageId: number) => void;
};

const MovePipelinePopup = ({
  openMovePopup,
  handleClosePipelinePopup,
  onMove,
}: Props) => {
  const [isCheckedRadio, setCheckedRadio] = useState<number | null>(null);
  const { stages } = useSelector(({ kanbanStagesReducers }: RootState) => ({
    stages: kanbanStagesReducers.stages,
  }));
  const handleCancel = () => {
    setCheckedRadio(null);
    handleClosePipelinePopup();
  };
  const handleMove = () => {
    if (isCheckedRadio) {
      onMove(isCheckedRadio);
    }
    setCheckedRadio(null);
  };
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
              <Flex row key={list.stage_name} className={styles.matchRadioStyle}>
                <InputRadio
                  label={list.stage_name}
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={!isCheckedRadio}
            className={styles.update}
            onClick={handleMove}
          >
            Move
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
export default MovePipelinePopup;
