import classNames from 'classnames/bind';
import styles from './stagesChip.module.css';

const cx = classNames.bind(styles);

// Custom chip
interface ChipProps {
  index: number;
  doc: { id: string; title: string };
  isActive: boolean;
  onAdd: (value: { id: string; title: string }) => void;
  onRemove: (value: { id: string; title: string }) => void;
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
        {doc.title}
      </button>
    </div>
  );
};
