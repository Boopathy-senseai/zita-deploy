const defaultProps = {
  fill: '#581845',
  width: 16,
  height: 16,
};
const SvgJobTitles = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
      viewBox=" 0 0 16 16"
    >
      <path
        fill={fill}
        d="M8 0c2.21 0 4 1.591 4 3.556C12 5.52 10.21 7.11 8 7.11S4 5.52 4 3.556C4 1.59 5.79
    
  0 8 0Zm4 9.369c0 .942-.28 3.138-2.19 5.591L9 10.667l.94-1.671A19.4 19.4 0 0
    
  0 8 8.889c-.67 0-1.32.044-1.94.107l.94 1.67-.81 4.294C4.28 12.507 4
    
  10.311 4 9.369c-2.39.622-4 1.742-4 3.075V16h16v-3.556c0-1.333-1.6-2.453-4-3.075Z"
      />
    </svg>
  );
};
SvgJobTitles.defaultProps = defaultProps;

export default SvgJobTitles;
