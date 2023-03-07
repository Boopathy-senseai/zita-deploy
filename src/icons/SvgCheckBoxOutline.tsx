/* eslint max-len: ["error", { "code": 2000 }] */
import { memo } from 'react';
import styles from '../uikit/CheckBox/checkbox.module.css';

const defaultProps = {
  fill: '#cccccc',
  width: 18,
  height: 18,
};
const SvgCheckBoxOutline = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={styles.svgCheckBox}
  >
    <path
      fill={fill}
      d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
    />
  </svg>
);

SvgCheckBoxOutline.defaultProps = defaultProps;

export default memo(SvgCheckBoxOutline);
