/* eslint max-len: ["error", { "code": 2000 }] */
import styles from './svgStyles.module.css';

const defaultProps = {
  fill: '#000',
  width: 16,
  height: 16,
};

const SvgSquare = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      className={styles.svgSquare}
    >
      <path d="M24 5c0-2.761-2.238-5-5-5h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14z" />
    </svg>
  );
};
SvgSquare.defaultProps = defaultProps;

export default SvgSquare;
