import SvgClose from '../../../icons/SvgClose';
import styles from './CrossButton.module.css';

interface Props {
  onClick?: Function;
  variant?: 'red-button' | 'simple-gray';
  style?: React.CSSProperties;
  size?: string | number;
  fill? : string;
}

const CrossButton = ({
  onClick,
  variant = 'simple-gray',
  style,
  size = '24px',
  fill,
}: Props) => {
  if (variant === 'red-button') {
    return (
      <div
        onClick={() => (onClick ? onClick() : null)}
        className={styles.buttonContainer}
        role="button"
      >
        <div className={styles.spanContainer}>
          <span className={styles.spanOne}></span>
          <span className={styles.spanTwo}></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <button
        style={{ width: size, height: size, ...style }}
        className={styles.svgWrapper}
        onClick={() => (onClick ? onClick() : null)}
      >
        <SvgClose width={size} height={size} fill={fill} />
      </button>
    </>
  );
};

export default CrossButton;
