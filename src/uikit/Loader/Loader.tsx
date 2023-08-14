import classNames from 'classnames/bind';
import styles from './loader.module.css';

const cx = classNames.bind(styles);

type Props = {
  size?: 'large' | 'medium' | 'small';
  withOutOverlay?: boolean;
  customsize?:boolean;
};
const Loader = ({ size, withOutOverlay,customsize }: Props) => {
  return !withOutOverlay ? (
    <div className={styles.loaderConatiner}>
      <div className={cx('content')}>
        <div
          className={cx('spinner', {
            spinnerLarge: size === 'large',
            spinnerSmall: size === 'small',
            spinnerMedium: size === 'medium',
          })}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="8" cy="8" r="7" strokeWidth="2" />
          </svg>
         
        </div>  
      </div>
    </div>
  ) : (
    !customsize?(
    <div className={cx('contentOne')}>
      <div
        className={cx('spinner', {
          spinnerLarge: size === 'large',
          spinnerSmall: size === 'small',
          spinnerMedium: size === 'medium',
        })}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" strokeWidth="2" />
        </svg>
      
       
      </div>  <div className={styles.loadertext}></div>
    </div>
    ):(
      <div className={cx('contentOne1')}>
      <div
        className={cx('spinner', {
          spinnerLarge: size === 'large',
          spinnerSmall: size === 'small',
          spinnerMedium: size === 'medium',
        })}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" strokeWidth="2" />
        </svg>
      
       
      </div>  <div className={styles.loadertext}></div>
    </div>
    )
  );
};

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  size: 'large',
};

Loader.defaultProps = defaultProps;
export default Loader;
