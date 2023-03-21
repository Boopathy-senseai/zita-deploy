import ContentLoader from 'react-content-loader';
import style from './styles/CalendarLoaderScreen.module.css';

const CalendarScreenLoader = () => {
  return (
    <>
      <div className={style.calendar}>
        <div className={style.calendarMenu}>
          <div>
            <ContentLoader
              width={'100%'}
              height={'100%'}
              speed={2}
              viewBox="0 0 100% 100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="20" y="0" rx="5" ry="5" width="40" height="100%" />
              <rect x="80" y="0" rx="5" ry="5" width="120" height="100%" />
            </ContentLoader>
          </div>
          <div>
            <ContentLoader
              width={'420px'}
              height={'100%'}
              speed={2}
              viewBox="0 0 100% 100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="5" ry="5" width="120" height="100%" />
              <rect x="140" y="0" rx="5" ry="5" width="120" height="100%" />
              <rect x="280" y="0" rx="5" ry="5" width="120" height="100%" />
            </ContentLoader>
          </div>
        </div>
        <div className={style.calendarToolbar}>
          <div>
            <ContentLoader
              width={'100%'}
              height={'100%'}
              speed={2}
              viewBox="0 0 100% 100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="20" y="0" rx="3" ry="3" width="40" height="100%" />
              <rect x="62" y="0" rx="3" ry="3" width="40" height="100%" />
              <rect x="110" y="0" rx="5" ry="5" width="120" height="100%" />
            </ContentLoader>
          </div>
          <div>
            <ContentLoader
              width={'300px'}
              style={{ marginRight: '20px' }}
              height={'100%'}
              speed={2}
              viewBox="0 0 100% 100%"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
            </ContentLoader>
          </div>
        </div>
        <div className={style.calendarScreen}>
          <ContentLoader
            width={'100%'}
            height={'100%'}
            speed={2}
            viewBox="0 0 100% 100%"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="20" y="0" rx="5" ry="5" width="98%" height="100%" />
          </ContentLoader>
        </div>
      </div>
    </>
  );
};

export default CalendarScreenLoader;
