import { FormikProps } from 'formik';
import classNames from 'classnames/bind';
import { createRef, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { dndBoardId } from '../../modules/constValue';
import { enterKeyPress, getBlur, getFocus, isEmpty } from '../helper';
import InputText from '../InputText/InputText';
import styles from './crossareacol.module.css';
import DragList from './DragList';
import type { tagColorType } from './DragList';

const cx = classNames.bind(styles);

export type FromProps = {
  tagValue: string;
};
export type tagList = {
  id: number | string;
  exp: string | number;
  skill: string;
};

type Props = {
  tasks: any;
  columnId: string;
  formik: FormikProps<FromProps>;
  tagColor: tagColorType;
  handleClickDelete: (arg: string | number) => void;
  inputId: number;
  name?: string;
};
const CrossAreaCol = ({
  tasks,
  columnId,
  formik,
  tagColor,
  handleClickDelete,
  inputId,
  name,
}: Props) => {
  const myRef = createRef<any>();

  const handleFocus = () => {
    if (columnId === 'column-2') {
      getFocus(`cross_area_tag_editer__rightTag_${inputId}`);
    }
  };
  const handleClickOutside = (event: any) => {
    getBlur(`cross_area_tag_editer__rightTag_${inputId}`);
    if (
      myRef.current &&
      !myRef.current.contains(event.target) &&
      !isEmpty(formik.values.tagValue) &&
      columnId === 'column-2'
    ) {
      formik.handleSubmit();
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });
  return (
    <div
      tabIndex={-1}
      role={'button'}
      onKeyPress={() => {}}
      className={cx('overAll', {
        rightStyle: columnId === 'column-2',
        leftStyle: columnId === 'column-1',
      })}
      onClick={handleFocus}
      ref={myRef}
    >
      <Droppable droppableId={columnId} type="task">
        {(provided) => (
          <div
            className={styles.taskList}
            ref={provided.innerRef}
            // eslint-disable-next-line
            {...provided.droppableProps}
          >
            {tasks &&
              tasks.items &&
              tasks.items.map(
                (task: any, taskIndex: number) =>
                  !isEmpty(task.skill) && (
                    <DragList
                      key={
                        task.skill +
                        dndBoardId +
                        taskIndex.toString() +
                        task.exp.toString()
                      }
                      task={task}
                      index={taskIndex}
                      columnId={columnId}
                      tagColor={tagColor}
                      handleClickDelete={handleClickDelete}
                    />
                  ),
              )}
            {columnId === 'column-2' && (
              <div style={{ width: '100%' }}>
                <InputText
                  id={`cross_area_tag_editer__rightTag_${inputId}`}
                  value={formik.values.tagValue}
                  onChange={formik.handleChange('tagValue')}
                  onKeyPress={(e) => enterKeyPress(e, formik.handleSubmit)}
                  className={styles.inputStyle}
                  noBorder
                  autoComplete={'off'}
                  name={name}
                />
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CrossAreaCol;
