/* eslint max-len: ["error", { "code": 2000 }] */

const defaultProps = {
  fill: '#581845',
  width: 24,
  height: 24,
  viewBox:"0 0 24 24"
};

const SvgAppliedIcon = ({ width, height, fill, viewBox }: typeof defaultProps) => {
  return (
      <svg
        width={width}
        height={height}
        viewBox={viewBox}
        fill={fill}
        xmlns="http://www.w3.org/2000/svg">

        <path d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM7.53075 12.75L4.15575 9.51075L5.202 8.4345L7.512 10.6372L12.7778 5.25L13.8442 6.30675L7.53075 12.75Z" fill="#34CC65"/>

      </svg>

  );
};
SvgAppliedIcon.defaultProps = defaultProps;

export default SvgAppliedIcon;
