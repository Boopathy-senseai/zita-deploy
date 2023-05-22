import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  SUNRAY,
  AERO,
  MEDIUM_PURPLE,
  PISTACHIO,
  CANDY_PINK,
  GRAY_BLACK,
} from '../../uikit/Colors/colors';
import { dndBoardId } from '../constValue';
import { GoogleEntity, ICardSelectionData, ICardSelectionMap, JobDetailsEntity } from './applicantPipeLineTypes';
import MultiTask from './MultiTask';
import styles from './dndboardcol.module.css';
import { IStageColumn } from './dndBoardTypes';

type Props = {
  column: IStageColumn;
  index: number;
  isDropDisabled: boolean;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
  job_details: JobDetailsEntity;
  onClick?: (data: ICardSelectionData) => void;
  // selectedCardList: {
  //   task: any;
  //   index: number;
  //   columnId: string;
  //   job_details: JobDetailsEntity;
  // }[];
  cardSelectionMap: ICardSelectionMap;
};
const DndBoardCol = ({
  column,
  index,
  isDropDisabled,
  google,
  outlook,
  job_details,
  onClick,
  cardSelectionMap,
}: Props) => {
  const [isBorder, setBorder] = useState(SUNRAY);
  // for card color set condition
  useEffect(() => {
    if (index === 0) {
      setBorder(SUNRAY);
    } else if (index === 1) {
      setBorder(AERO);
    } else if (index === 2) {
      setBorder(MEDIUM_PURPLE);
    } else if (index === 3) {
      setBorder(PISTACHIO);
    } else if (index === 4) {
      setBorder(CANDY_PINK);
    } else if (index === 5) {
      setBorder(GRAY_BLACK);
    }
  }, [index]);

  const checkSelection = (id: number) => {
    const taskIndex = cardSelectionMap.has(id);
    return taskIndex;
  };

  return (
    <div className={styles.overAll}>
      <Droppable
        // isDropDisabled={isDropDisabled}
        droppableId={`${column.columnId}`}
        type="task"
      >
        {(provided) => (
          <div
            className={styles.taskList}
            style={{
              minHeight: window.innerHeight - 278,
            }}
            ref={provided.innerRef}
            // eslint-disable-next-line
            {...provided.droppableProps}
          >
            {column.items.map((task, taskIndex) => (
              <MultiTask
                key={task.id.toString() + dndBoardId}
                task={task}
                column={column}
                index={taskIndex}
                isBorder={column?.stage_color || isBorder}
                outlook={outlook}
                google={google}
                job_details={job_details}
                onClick={onClick}
                isSelected={checkSelection(task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DndBoardCol;
