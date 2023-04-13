import { HeaderProps } from 'react-big-calendar';

const WeekHeader = ({ date, localizer }: HeaderProps) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '3px 10px',
        }}
      >
        <p style={{ marginBottom: '3px' }}>
          {localizer?.format(date, 'DD MMMM')}
        </p>
        <p style={{  }}>{localizer?.format(date, 'dddd')}</p>
      </div>
    </>
  );
};

export default WeekHeader;
