import styles from './dndtitle.module.css';
import DndTitleMap from './DndTitleMap';

type Props = {
  data: {
    title: string;
    left: string;
    borderColor: string;
    total: number;
  }[];
  setSortApplicant: (arg: string) => void;
  setSortSortList: (arg: string) => void;
  setSortInterview: (arg: string) => void;
  setSortSelected: (arg: string) => void;
  setSortRejected: (arg: string) => void;
};
const DndTitle = ({
  data,
  setSortApplicant,
  setSortSortList,
  setSortInterview,
  setSortSelected,
  setSortRejected,
}: Props) => {
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
            key={index + list.title}
          />
        );
      })}
    </div>
  );
};

export default DndTitle;
