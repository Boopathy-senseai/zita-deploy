import { getColor } from '../colors';
import { formatEventTitle } from '../util';

const ColorEvent = ({ event }: any) => {
  let color = getColor(event.userId);
  return (
    <div
      style={{
        backgroundColor: color.backgroundColor,
        borderLeft: `4px solid ${color.borderColor}`,
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
