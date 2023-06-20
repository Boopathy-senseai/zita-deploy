import { useEffect, useState } from 'react';
import _ from 'lodash';
import { columnTypes } from '../../modules/applicantpipelinemodule/dndBoardTypes';
import { Toast } from '../../uikit';
import { SuggestionData } from './types';

export type UseSuggestions<T> = {
  localSuggestions: Array<T>;
  setLocalSuggestions: React.Dispatch<React.SetStateAction<T[]>>;
  onEditSuggestion: (value: T) => void;
  onAddSuggestion: (value: T) => void;
  onRemoveSuggestion: (id: number) => void;
  onReorder: (list: Array<T>) => void;
  isSuggestionDuplicate: (title: string) => boolean;
  isSuggestionExist: (name: string) => boolean;
  isEqual: (value: T[]) => boolean;
  resetSuggestion: () => void;
  removedSuggestions: T[];
};

export function useSuggestions<
  T extends {
    suggestion_id?: number;
    wk_id_id?: number;
    stage_name?: string;
    stage_order?: number;
    stage_color?: string;
    is_disabled?: boolean;
  },
>(list: Array<T>): UseSuggestions<T> {
  const [local, setLocal] = useState<Array<T>>([]);
  useEffect(() => {
    if (list && list.length !== 0) {
      initialize();
    }
  }, [list]);

  const initialize = () => {
    setLocal(list);
  };

  const onEdit = (value: T) => {
    setLocal((prev) => {
      const index = prev?.findIndex((data) => data?.suggestion_id === value?.suggestion_id);
      if (index === -1) {
        return prev;
      }
      return prev.map((doc) => {
        if (doc?.suggestion_id === value?.suggestion_id) {
          return value;
        }
        return doc;
      });
    });
  };

  const onAdd = (doc: T) => {
    setLocal((prevStages) => {
      const index = prevStages?.findIndex((data) => data.suggestion_id === doc.suggestion_id);
      if (index !== -1) {
        return prevStages;
      }
      const newStages = [...prevStages, doc];
      return [...newStages];
    });
  };



  const onRemove = (id: number) => {
    setLocal((prevStages) => {
      const newStages = [...prevStages];
      const index = newStages?.findIndex((data) => data.suggestion_id === id);
      if (index !== -1) {
        newStages.splice(index, 1);
        return newStages;
      }
      return prevStages;
    });
    Toast('Suggestion removed successfully');
  };

  const onReorder = (docs: Array<T>) => {
    setLocal(docs);
  };

  const isDuplicate = (title: string) => {
    const tilteMap = [...local].map((doc) =>
      doc.stage_name.trim().toLowerCase(),
    );
    return tilteMap
      .map((str) => str === title.trim().toLowerCase())
      .includes(true);
  };

  const isExist = (name: string) => {
    return (
      local.find((doc: any) => {
        return (
          doc.stage_name.toLowerCase().trim() === name.toLowerCase().trim()
        );
      }) !== undefined
    );
  };


  const isEqual = (docs: T[]) => {
    return _.isEqual(_.sortBy(docs), _.sortBy(local));
  };

  const reset = () => {
    initialize();
  };

  const removed: T[] =  list.filter(doc => !local.includes(doc));

  return {
    localSuggestions: local,
    setLocalSuggestions: setLocal,
    onEditSuggestion: onEdit,
    onAddSuggestion: onAdd,
    onRemoveSuggestion: onRemove,
    onReorder,
    isSuggestionDuplicate: isDuplicate,
    isSuggestionExist: isExist,
    isEqual,
    resetSuggestion: reset,
    removedSuggestions: removed,
  };
}
