import classNames from 'classnames/bind';
import { Draggable } from 'react-beautiful-dnd';
import SvgCloseSmall from '../../icons/SvgCloseSmall';
import { dndBoardId } from '../../modules/constValue';
import Text from '../../uikit/Text/Text';
import Flex from '../Flex/Flex';
import { lowerCase } from '../helper';
import styles from './draglist.module.css';
// const { uuid } = require('uuidv4');

const cx = classNames.bind(styles);

export type tagColorType = 'sky' | 'yellow' | 'green' | 'theme' | 'red';
type Props = {
  task: any;
  index: number;
  columnId: string;
  tagColor: tagColorType;
  handleClickDelete: (arg: string | number) => void;
};
const DragList = ({
  task,
  index,
  tagColor,
  handleClickDelete,
  columnId,
}: Props) => {
  const tagClassName = cx('taskList', {
    [`tagColor-${tagColor}`]: tagColor,
    borderRightStyle: columnId === 'column-2',
    borderLeftStyle: columnId === 'column-1',
  });

  return (
    <Flex row center className={styles.overAll}>
      <Draggable
        draggableId={
          task.skill + dndBoardId + index.toString() + task.exp.toString()
        }
        index={index}
      >
        {(provided) => (
          <div
            className={styles.container}
            ref={provided.innerRef}
            // eslint-disable-next-line
            {...provided.dragHandleProps}
            // eslint-disable-next-line
            {...provided.draggableProps}
          >
            <div className={tagClassName}>
              <Text transform="capitalize">{lowerCase(task.skill)}</Text>
            </div>
            {columnId === 'column-2' && (
              <div
                className={styles.closeStyle}
                onClick={() => handleClickDelete(task.id)}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
              >
                <div style={{position:"relative", bottom:4, right:4}}>
                <SvgCloseSmall width={18} height={18} />
                </div>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </Flex>
  );
};

export default DragList;
