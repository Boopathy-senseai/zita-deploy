import { useEffect, useState } from 'react';

export type UseStages<T> = {
  localStages: Array<T>;
  setLocalStages: React.Dispatch<React.SetStateAction<T[]>>;
  onEditStage: (value: T) => void;
  onAddStage: (value: T) => void;
  onAddStageFromSuggestion: (value: any) => void;
  onRemoveStage: (id: number) => void;
  onReorder: (list: Array<T>) => void;
  isStageDuplicate: (title: string) => boolean;
  isStageExist: (name: string) => boolean;
};

export function useStages<
  T extends {
    id?: number;
    workflow_id_id?: number;
    stage_id_id?: number;
    stage_name?: string;
    stage_order?: number;
    stage_color?: string;
    created_at?: string;
    is_disabled?: boolean;
  },
>(stages: Array<T>): UseStages<T> {
  const [localStages, setLocalStages] = useState<Array<T>>([]);

  useEffect(() => {
    if (stages && stages.length !== 0) {
      setLocalStages(stages);
    }
  }, [stages]);

  const onEditStage = (value: T) => {
    setLocalStages((prevStages) => {
      const index = prevStages?.findIndex((data) => data?.id === value?.id);
      if (index === -1) {
        return prevStages;
      }
      return prevStages.map((doc) => {
        if (doc?.id === value?.id) {
          return value;
        }
        return doc;
      });
    });
  };

  const onAddStage = (doc: T) => {
    setLocalStages((prevStages) => {
      const index = prevStages?.findIndex((data) => data.id === doc.id);
      if (index !== -1) {
        return prevStages;
      }
      const newStages = [...prevStages, doc];
      return [...newStages];
    });
  };

  const onAddStageFromSuggestion = (doc: any) => {
    setLocalStages((prevStages) => {
      const newStage: T = {
        id: doc.suggestion_id,
        stage_name: doc.stage_name,
        stage_order: doc.stage_order,
        stage_color: doc.stage_color,
        stage_id_id: doc.suggestion_id,
        is_disabled: false,
      } as T;
      const index = prevStages?.findIndex((data) => data.id === newStage.id);
      if (index !== -1) {
        return prevStages;
      }
      const newStages = [...prevStages, newStage];
      return [...newStages];
    });
  };

  const onRemoveStage = (id: number) => {
    setLocalStages((prevStages) => {
      const newStages = [...prevStages];
      const index = newStages?.findIndex((data) => data.id === id);
      if (index !== -1) {
        newStages.splice(index, 1);
        return newStages;
      }
      return prevStages;
    });
  };

  const onReorder = (list: Array<T>) => {
    setLocalStages(list);
  };

  const isStageDuplicate = (title: string) => {
    const tilteMap = localStages.map((doc) =>
      doc.stage_name.trim().toLowerCase(),
    );
    return tilteMap
      .map((str) => str === title.trim().toLowerCase())
      .includes(true);
  };

  const isStageExist = (name: string) => {
    return (
      localStages.find((doc: any) => {
        return (
          doc.stage_name.toLowerCase().trim() === name.toLowerCase().trim()
        );
      }) !== undefined
    );
  };

  return {
    localStages,
    setLocalStages,
    onEditStage,
    onAddStage,
    onAddStageFromSuggestion,
    onRemoveStage,
    onReorder,
    isStageDuplicate,
    isStageExist,
  };
}
