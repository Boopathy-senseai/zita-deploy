/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#34cc65',
  width: 24,
  height: 24,
};

const SvgVerificationEmailIcon = ({
  width,
  height,
  fill,
}: typeof defaultProps) => {
  return (
    <svg
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path d="M19 9.062S13.812 8.729 12 11c2-4.896 7-5.938 7-5.938v-2l5 4-5 4.019V9.062zM.026 24h23.947L12 12.393.026 24zm1.673-14L11.99 2.512l3.053 2.218a14.389 14.389 0 0 1 1.953-1.054L11.99.039 0 8.764V21.24l7.352-7.127L1.699 10zm15.753 4.892L24 21.24V9.628l-6.548 5.264z" />{' '}
    </svg>
  );
};
SvgVerificationEmailIcon.defaultProps = defaultProps;

export default SvgVerificationEmailIcon;
