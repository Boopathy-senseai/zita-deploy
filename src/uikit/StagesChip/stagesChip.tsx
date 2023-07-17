import classNames from 'classnames/bind';
import { SuggestionData } from '../../hooks/useStages/types';
import SvgIntomark from '../../icons/Intomark';
import styles from './stagesChip.module.css';

const cx = classNames.bind(styles);

// Custom chip
interface ChipProps {
  index: number;
  doc: SuggestionData;
  isActive: boolean;
  onAdd: (value: SuggestionData) => void;
  onRemove: (value: number) => void;
  onDeleteSuggestion?: (value: SuggestionData) => void;
}
export const Chip: React.FC<ChipProps> = (props) => {
  const { index, doc, isActive, onAdd, onRemove, onDeleteSuggestion } = props;
  return (
    <div
      className={styles.pillStyle}
      style={{
        backgroundColor: isActive ? '#581845' : undefined,
      }}
    >
      <button
        onClick={() => (isActive ? onRemove(doc.suggestion_id) : onAdd(doc))}
        className={styles.pillbutton}
        style={{ color: isActive ? '#FFFFFF' : undefined , whiteSpace:"pre"}}
      >
        {doc.stage_name}
      </button>
      {onDeleteSuggestion && (
        <button
          className={styles.crossIcon}
          onClick={() => onDeleteSuggestion(doc)}
        >
          <SvgIntomark fill="#888888" style={{cursor:"pointer"}}/>
        </button>
      )}
    </div>
  );
};

