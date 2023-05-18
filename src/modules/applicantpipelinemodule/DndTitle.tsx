import { columnTypes, IStageColumn } from './dndBoardTypes';
import styles from './dndtitle.module.css';
import DndTitleMap from './DndTitleMap';

type Props = {
  data: IStageColumn[];
  setSortApplicant: (arg: string) => void;
  setSortSortList: (arg: string) => void;
  setSortInterview: (arg: string) => void;
  setSortSelected: (arg: string) => void;
  setSortRejected: (arg: string) => void;
  onSelectAll?: (data: IStageColumn) => void;
  onUnselectAll?: (data: IStageColumn) => void;
  cardSelectionMap: Map<string, { task: any; section: string }>;
};
const DndTitle = ({
  data,
  setSortApplicant,
  setSortSortList,
  setSortInterview,
  setSortSelected,
  setSortRejected,
  onSelectAll,
  onUnselectAll,
  cardSelectionMap,
}: Props) => {
  const isColumnSelected = (cardData: {
    title: string;
    left: string;
    borderColor: string;
    total: number;
    section: string;
  }) => {
    const arrValue = Array.from(cardSelectionMap.values()).filter(
      (doc) => doc.section === cardData?.section,
    )?.length;
    if (arrValue === cardData?.total) {
      return true;
    }
    return false;
  };

  console.log(data);
  return (
    <div className={styles.col}>
      {data.map((list, index) => {
        return (
          <DndTitleMap
            list={list}
            setSortApplicant={setSortApplicant}
            setSortSortList={setSortSortList}
            setSortInterview={setSortInterview}
            setSortSelected={setSortSelected}
            setSortRejected={setSortRejected}
            index={index}
            key={index + `${list?.title}`}
            onSelectAll={onSelectAll}
            onUnselectAll={onUnselectAll}
            columnSelected={isColumnSelected(list)}
          />
        );
      })}
    </div>
  );
};

export default DndTitle;
