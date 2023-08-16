const defaultProps = {
  fill: '#979797',
  width: 30,
  height: 30,

};
const SvgConflicts = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5949 27.7136V25.6351H27.7215V10.739H4.93671V18.3603H2.65823V4.15704C2.65823 3.60277 2.88608 3.11778 3.34177 2.70208C3.79747 2.28637 4.32911 2.07852 4.93671 2.07852H7.40506V0H9.87342V2.07852H22.7848V0H25.2532V2.07852H27.7215C28.3291 2.07852 28.8608 2.28637 29.3165 2.70208C29.7722 3.11778 30 3.60277 30 4.15704V25.6351C30 26.1894 29.7722 26.6744 29.3165 27.0901C28.8608 27.5058 28.3291 27.7136 27.7215 27.7136H19.5949ZM10.2532 30L8.65823 28.545L12.9494 24.5958H0V22.5173H12.9494L8.65823 18.5681L10.2532 17.1132L17.3165 23.5566L10.2532 30ZM4.93671 8.66051H27.7215V4.15704H4.93671V8.66051ZM4.93671 8.66051V4.15704V8.66051Z"
        fill="#581845"
      />
    </svg>
  );
};

SvgConflicts.defaultProps = defaultProps;

export default SvgConflicts;