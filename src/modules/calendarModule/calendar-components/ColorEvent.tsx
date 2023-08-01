import { getColor } from '../colors';
import { formatEventTitle } from '../util';
import styles from '../styles/CalendarComponents.module.css';

const ColorEvent = ({ event }: any) => {
  let color = getColor(event.userId);
  return (
    <div
      style={{
        // backgroundColor: color.backgroundColor,
        // borderLeft: `4px solid ${color.borderColor}`,
        color: 'black',
        height: '100%',
        marginBottom: 0,
        padding: '5px',
        zIndex: 100,
      }}
    >
      {formatEventTitle(event)}
    </div>
  );
};

export default ColorEvent;
