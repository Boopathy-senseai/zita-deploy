/* eslint max-len: ["error", { "code": 2000 }] */
import { memo } from 'react';
import styles from '../uikit/CheckBox/checkbox.module.css';

const defaultProps = {
  fill: '#581845',
  width: 18,
  height: 18,
};

const SvgCheckBox = ({ fill, width, height }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    className={styles.checkBox}
  >
    <path
      fill={fill}
      d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"
    />
  </svg>
);

SvgCheckBox.defaultProps = defaultProps;

export default memo(SvgCheckBox);
