import classNames from 'classnames/bind';
import styles from './stagesChip.module.css';

const cx = classNames.bind(styles);

// Custom chip
interface ChipProps {
  index: number;
  doc: { suggestion_id: number; stage_name: string };
  isActive: boolean;
  onAdd: (value: { suggestion_id: number; stage_name: string }) => void;
  onRemove: (value: { suggestion_id: number; stage_name: string }) => void;
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
        onClick={() => (isActive ? onRemove(doc) : onAdd(doc))}
        className={styles.pillbutton}
        style={{ color: isActive ? '#FFFFFF' : undefined }}
      >
        {doc.stage_name}
      </button>
    </div>
  );
};
