import {
  ICardSelectionMap,
} from './applicantPipeLineTypes';
import { IStageColumn } from './dndBoardTypes';
import styles from './dndtitle.module.css';
import DndTitleMap from './DndTitleMap';

type Props = {
  columns: IStageColumn[];
  setSortApplicant: (columnId: number, arg: string) => void;
  onSelectAll?: (data: IStageColumn) => void;
  onUnselectAll?: (data: IStageColumn) => void;
  cardSelectionMap: ICardSelectionMap;
};
const DndTitle = ({
  columns,
  setSortApplicant,
  onSelectAll,
  onUnselectAll,
  cardSelectionMap,
}: Props) => {
  const isColumnSelected = (cardData: IStageColumn) => {
    const arrValue = Array.from(cardSelectionMap.values()).filter(
      (doc) => doc.section === cardData?.section,
    )?.length;
    if (arrValue === cardData?.total) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.col}>
      {columns.map((column, index) => {
        return (
          <DndTitleMap
            column={column}
            setSortApplicant={setSortApplicant}
            index={index}
            key={index + `${column?.title}`}
            onSelectAll={onSelectAll}
            onUnselectAll={onUnselectAll}
            columnSelected={isColumnSelected(column)}
          />
        );
      })}
    </div>
  );
};

export default DndTitle;
