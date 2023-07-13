import { saveAs } from 'file-saver';
import { DropResult } from 'react-beautiful-dnd';
import Toast from '../../uikit/Toast/Toast';
import { columnTypes, setColumn, setIndexProps } from './dndBoardTypes';

export const onDragEnd = (
  result: DropResult,
  columns: columnTypes,
  setColumns: setColumn,
  setIndex: setIndexProps,
) => {
  setIndex(null);
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  }
};

export const handleDownload = (file: string, filename?: string) => {
  if (file) {
    saveAs(`${process.env.REACT_APP_HOME_URL}media/${file}`, `${filename || file}`);
    Toast('Resume downloaded successfully', 'LONG', 'success');
  }
};

