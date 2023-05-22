import classNames from 'classnames/bind';
import { SuggestionData } from '../../hooks/useStages/types';
import styles from './stagesChip.module.css';

const cx = classNames.bind(styles);

// Custom chip
interface ChipProps {
  index: number;
  doc: SuggestionData ;
  isActive: boolean;
  onAdd: (value: SuggestionData) => void;
  onRemove: (value: number) => void;
}
export const Chip: React.FC<ChipProps> = (props) => {
  const { index, doc, isActive, onAdd, onRemove } = props;
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
        style={{ color: isActive ? '#FFFFFF' : undefined }}
      >
        {doc.stage_name}
      </button>
    </div>
  );
};

