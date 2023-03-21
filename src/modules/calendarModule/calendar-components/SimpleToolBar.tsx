import { Navigate, ToolbarProps, View } from 'react-big-calendar';
import LeftChevron from '../../../icons/LeftChevron';
import RightChevron from '../../../icons/RightChevron';
import styles from '../styles/CalendarComponents.module.css';

const SimpleToolbar = ({
  label,
  localizer: { messages },
  onNavigate,
  onView,
  view,
  views,
}: ToolbarProps) => {
  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.buttonContainer}>
          <div className={styles.navButtonContainer}>
            <button
              className={`${styles.navButton} ${styles.left_button}`}
              onClick={() => onNavigate(Navigate.PREVIOUS)}
            >
              <div>
                <LeftChevron />
              </div>
            </button>
            <button
              className={`${styles.navButton} ${styles.right_button}`}
              onClick={() => onNavigate(Navigate.NEXT)}
            >
              <div>
                <RightChevron />
              </div>
            </button>
          </div>
          <button
            className={styles.todayButton}
            onClick={() => onNavigate(Navigate.TODAY)}
          >
            Today
          </button>
        </div>
        <div className={styles.label}>
          <p>{label}</p>
        </div>
        <div className={styles.simpleTimesButtonWrapper}>
          <>
            {(views as View[]).map((name) => (
              <button
                type="button"
                key={name}
                className={view === name ? styles.active : ''}
                onClick={() => onView(name)}
              >
                {messages[name]}
              </button>
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default SimpleToolbar;
