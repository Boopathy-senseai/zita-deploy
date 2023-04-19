const defaultProps = {
    fill: '#424242',
    width: 13,
    height: 13,
};
const SvgMessages = ({ width, height, fill }: typeof defaultProps) => {
    return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <path
        fill="#581845"
        d="M1.6 1.6h12.8v9.6H2.536l-.936.936V1.6Zm0-1.6C.72 
        0 .008.72.008 1.6L0 16l3.2-3.2h11.2c.88 
        0 1.6-.72 1.6-1.6V1.6c0-.88-.72-1.6-1.6-1.6H1.6Zm1.6 8h9.6v1.6H3.2V8Zm0-2.4h9.6v1.6H3.2V5.6Zm0-2.4h9.6v1.6H3.2V3.2Z"
      />
    </svg>
  );
    };
    SvgMessages.defaultProps = defaultProps;

  export default SvgMessages;