import { Navigate, ToolbarProps } from 'react-big-calendar';
import LeftChevron from '../../../icons/LeftChevron';
import RightChevron from '../../../icons/RightChevron';
import styles from '../styles/CalendarComponents.module.css';
import { Button } from '../../../uikit';
import TimeLineButton from './TimeLineButton';

const ToolBar = ({
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
          
          <Button
            types={'secondary'}
            // className={styles.todayButton}
            onClick={() => onNavigate(Navigate.TODAY)}
          >
            Today
          </Button>
          
        </div>
        <div className={styles.navButtonContainer}>
            <button
              className={`${styles.navButton} ${styles.left_button}`}
              onClick={() => onNavigate(Navigate.PREVIOUS)}
            >
              <div>
                <LeftChevron />
              </div>
            </button>
            <div className={styles.label}>
          <p>{label}</p>
        </div>
            <button
              className={`${styles.navButton} ${styles.right_button}`}
              onClick={() => onNavigate(Navigate.NEXT)}
            >
              <div>
                <RightChevron />
              </div>
            </button>
          </div>
        
        <TimeLineButton
          view={view}
          views={views}
          messages={messages}
          onView={onView}
        />
      </div>
    </>
  );
};

export default ToolBar;
