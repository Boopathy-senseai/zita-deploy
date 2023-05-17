import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { StageCard } from '../../../uikit/StageCard/stagesCard';
import { StageData } from './templatesPageTypes';

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
                      doc={item}
                      index={index}
                      onEdit={onEdit}
                      onDelete={onDelete}
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
  );
};

export default ReorderStage;

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: getItems(10),
//     };
//     this.onDragEnd = this.onDragEnd.bind(this);
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index,
//     );

//     this.setState({
//       items,
//     });
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style,
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     );
//   }
// }

// // Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById('root'));
