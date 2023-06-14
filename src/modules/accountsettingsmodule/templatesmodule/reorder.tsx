import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StageCard } from '../../../uikit/StageCard/stagesCard';
import { StageData } from '../../../hooks/useStages/types';
import AlertDeletePopup from '../../../uikit/StageCard/alertDeletePopup';
import DeletePopup from '../../../uikit/StageCard/deletePopup';

// a little function to help us with reordering the result
const reorder = (list: StageData[], startIndex, endIndex): StageData[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result.map((doc, index) => {
    return { ...doc, stage_order: index };
  });
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'white' : 'white',
  //   padding: grid,
  //   width: 250,
});

interface Props {
  list: StageData[];
  onEdit?: (value: StageData) => void;
  onDelete?: (value: number) => void;
  onChange: (value: StageData[]) => void;
}
const ReorderStage: React.FC<Props> = (props) => {
  const { list, onEdit, onDelete, onChange } = props;
  const [state, setState] = useState({
    items: list || [],
  });

  const [deletePopup, setDeletePopup] = useState<
    { data: StageData; visible: boolean } | undefined
  >();

  const handleDeletePipelinePopup = (doc: StageData) => {
    setDeletePopup(undefined);
    onDelete(doc.id);
  };
  const handleCloseDeletePopup = () => {
    setDeletePopup(undefined);
  };

  useEffect(() => {
    onChange(state.items);
  }, [state.items]);

  useEffect(() => {
    setState({
      items: list,
    });
  }, [list]);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index,
    );

    setState({
      items,
    });
  };
  return (
    <>
      {deletePopup && deletePopup?.data && deletePopup?.data?.is_associated ? (
        <AlertDeletePopup
          openDeletePopup={deletePopup?.visible}
          handleDeletePipelinePopup={() =>
            handleDeletePipelinePopup(deletePopup?.data)
          }
          handleCloseDeletePopup={handleCloseDeletePopup}
        />
      ) : (
        <DeletePopup
          openDeletePopup={deletePopup?.visible}
          handleDeletePipelinePopup={() =>
            handleDeletePipelinePopup(deletePopup?.data)
          }
          handleCloseDeletePopup={handleCloseDeletePopup}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.items.map((item, index) => (
                <Draggable
                  key={`${item.id}-${index}`}
                  draggableId={`${item.id}-${index}`}
                  index={index}
                >
                  {(providedD, snapshotD) => (
                    <div
                      ref={providedD.innerRef}
                      {...providedD.draggableProps}
                      {...providedD.dragHandleProps}
                      style={getItemStyle(
                        snapshotD.isDragging,
                        providedD.draggableProps.style,
                      )}
                    >
                      <StageCard
                        list={list.filter((doc) => doc.id !== item.id)}
                        doc={item}
                        index={index}
                        onEdit={onEdit}
                        onDelete={(data) => setDeletePopup({ data, visible: true})}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default ReorderStage;
