import { useEffect, useState } from 'react';
import { StageData, SuggestionData } from './types';

export const useStages = (stages: StageData[]) => {
  const [localStages, setLocalStages] = useState<StageData[]>([]);

  useEffect(() => {
    if (stages && stages.length !== 0) {
      setLocalStages(stages);
    }
  }, [stages]);

  const onEditStage = (value: StageData) => {
    setLocalStages((prevStages) => {
      const index = prevStages?.findIndex((data) => data.id === value.id);
      if (index === -1) {
        return prevStages;
      }
      return prevStages.map((doc) => {
        if (doc.id === value.id) {
          return value;
        }
        return doc;
      });
    });
  };

  const onAddStage = (doc: StageData) => {
    setLocalStages((prevStages) => {
      const index = prevStages?.findIndex((data) => data.id === doc.id);
      if (index !== -1) {
        return prevStages;
      }
      const newStages = [...prevStages, doc];
      return [...newStages];
    });
  };

  const onAddStageFromSuggestion = (doc: SuggestionData) => {
    setLocalStages((prevStages) => {
      const newStage: StageData = {
        id: doc.suggestion_id,
        stage_name: doc.stage_name,
        stage_order: doc.stage_order,
        stage_color: doc.stage_color,
        stage_id_id: doc.suggestion_id,
        is_disabled: false,
      };
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

  const onReorder = (list: StageData[]) => {
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
      localStages.find((doc) => {
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
};
