import * as React from 'react'; 
const defaultProps = {
  fill: '#581845',
  width: 14,
  height: 14,
};     
const SvgQualification = ({ width, height, fill }: typeof defaultProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width={width}
    height={height}
    viewBox="0 0 11 8"

  >
    <path
      fill="#581845"
      d="M5.017 0 0 1.881 5.017 4.39l2.39-1.195-2.242-.685a.344.344 
      0 1 1-.148-.654l-.057.185.398.122v.002l.588.18 3.346 1.029v.26a.344.344 
      0 0 0 .007.573c-.157.59-.157 1.933-.157 2.462.344.223.344.231.687 
      0 0-.53 0-1.87-.156-2.462a.344.344 0 0 0 .006-.573v-.546l-1.275-.392 
      1.63-.815L5.017 0Zm-2.93 3.424-.282 1.692c.562.074 1.235.4 
      1.853.787.352.22.682.461.95.695.163.143.3.28.409.416a3.45 3.45 
      0 0 1 .41-.416c.267-.234.597-.475.948-.695.619-.387 1.291-.713 
      1.854-.787l-.282-1.692h-.134L5.017 4.822 2.22 3.424h-.134Z"
    />
  </svg>
);
export default SvgQualification;