import { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  SUNRAY,
  AERO,
  MEDIUM_PURPLE,
  PISTACHIO,
  CANDY_PINK,
} from '../../uikit/Colors/colors';
import { dndBoardId } from '../constValue';
import { GoogleEntity } from './applicantPipeLineTypes';
import MultiTask from './MultiTask';
import styles from './dndboardcol.module.css';

type Props = {
  tasks: any;
  columnId: string;
  index: number;
  isDropDisabled: boolean;
  outlook?: GoogleEntity[];
  google?: GoogleEntity[];
};
const DndBoardCol = ({
  tasks,
  columnId,
  index,
  isDropDisabled,
  google,
  outlook,
}: Props) => {
  const [isBorder, setBorder] = useState(SUNRAY);
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
    }
  }, [index]);

  return (
    <div className={styles.overAll}>
      <Droppable
        isDropDisabled={isDropDisabled}
        droppableId={columnId}
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
            {tasks.items.map((task: any, taskIndex: number) => (
              <MultiTask
                key={task.id.toString() + dndBoardId}
                task={task}
                index={taskIndex}
                isBorder={isBorder}
                columnId={columnId}
                outlook={outlook}
                google={google}
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
