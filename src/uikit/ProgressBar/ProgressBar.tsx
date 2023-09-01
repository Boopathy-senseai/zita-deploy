import { CSSProperties } from 'react';
import classNames from 'classnames/bind';
import Text from '../Text/Text';
import styles from './progressbar.module.css';

/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  strokeWidth: 8,
  verticalWidth: '100%',
  roundProgressHeight: 100,
};
const cx = classNames.bind(styles);
type Props = {
  percentage: number;
  type?: 'hr' | 'round';
  verticalWidth?: string | number;
  matchingpercentage?:string | number;
} & typeof defaultProps;

const ProgressBar = ({
  strokeWidth,
  percentage,
  matchingpercentage,
  type = 'round',
  verticalWidth,
  roundProgressHeight,
}: Props) => {
  const verticalPercentage = percentage;
  const radius = 50 - strokeWidth / 2;
  const pathDescription = `
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `;

  const diameter = Math.PI * 2 * radius;
  const progressStyle: CSSProperties = { 
    strokeLinecap: 'round',
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
  };

  
  return type === 'round' ? (
    <svg
      className={styles.CircularProgressbar}
      viewBox="0 0 100 100"
      width={roundProgressHeight}
      height={roundProgressHeight}
    >
      <path
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: '#d6d6d6',
        }}
       
      />

      <path
        d={pathDescription}
        strokeWidth={strokeWidth}
        className={cx({
          countStyle1:(verticalPercentage< 40),
          countStyle2:(verticalPercentage >= 40 && verticalPercentage < 69),
          countStyle3:(verticalPercentage > 69  )})}
        fillOpacity={0}
        style={progressStyle}
      />

      <text
        x={50}
        y={50}
        style={{
          fill: '#424242',
          fontSize: '24px',
          dominantBaseline: 'central',
          textAnchor: 'middle',
          fontWeight: 'bold',
        }}
      >
        {`${ matchingpercentage? matchingpercentage:percentage}%`}
      </text>
    </svg>
  ) : (
    <div className={styles.progressVertical} style={{ width: verticalWidth }}>
      <div
        style={{ width: `${verticalPercentage}%` }}
        className={styles.progress}
      />
      <Text
        bold
        color="black"
        className={styles.percentText}
      >{`${ matchingpercentage? matchingpercentage:verticalPercentage}%`}</Text>
    </div>
  );
};

ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
