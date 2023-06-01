import { useEffect, useState } from 'react';
import _ from 'lodash';
import { columnTypes } from '../../modules/applicantpipelinemodule/dndBoardTypes';
import { SuggestionData } from './types';

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
  getDefaultStages: (value: SuggestionData[]) => SuggestionData[];
  addDefaultStages: (value: SuggestionData[]) => void;
  isEqual: (value: T[]) => boolean;
  resetStages: () => void;
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
>(stages: Array<T>, columns?: columnTypes): UseStages<T> {
  const [localStages, setLocalStages] = useState<Array<T>>([]);
  const defaultStageNames = [
    { name: 'Shortlisted', color: '#80C0D0' },
    { name: 'Offered', color: '#00BE4B' },
    { name: 'Rejected', color: '#ED4857' },
  ];
  useEffect(() => {
    if (stages && stages.length !== 0) {
      initializeStages();
    }
  }, [stages, columns]);

  const initializeStages = () => {
    setLocalStages(() => {
      if (!columns) {
        return stages;
      }

      return [...stages].map((doc) => {
        if (columns[doc.id]) {
          return {
            ...doc,
            is_associated:
              columns[doc.id]?.items && columns[doc.id]?.items.length !== 0,
          };
        }
        return { ...doc, is_associated: false };
      });
    });
  }

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

  const getDefaultStages = (suggestions?: SuggestionData[]) => {
    return suggestions.filter((doc) =>
      // defaultStageNames.includes(doc.stage_name),
      defaultStageNames.map((value) => value.name).includes(doc.stage_name),
    );
  };

  const addDefaultStages = (suggestions?: SuggestionData[] | undefined) => {
    if (suggestions) {
      getDefaultStages(suggestions).forEach((doc) => {
        onAddStageFromSuggestion(doc);
      });
    } else {
      const newStage: T[] = defaultStageNames.map(
        (doc, index) =>
          ({
            id: new Date().getTime() + index,
            stage_name: doc.name,
            stage_order: index + 1,
            stage_color: doc.color,
            stage_id_id: new Date().getTime() + index,
            is_disabled: true,
          } as T),
      );

      setLocalStages(newStage);
      // newStage.forEach((doc) => {
      //   onAddStage(doc);
      // });
    }
  };


  const isEqual = (list: T[]) => {
    if(!columns){
      return _.isEqual(_.sortBy(list), _.sortBy(localStages));
    }
    const local = localStages.map(doc => _.omit(doc, "is_associated"));
    return _.isEqual(_.sortBy(list), _.sortBy(local));
  }

  const resetStages = () => {
    initializeStages();
  }

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
    getDefaultStages,
    addDefaultStages,
    isEqual,
    resetStages,
  };
}
