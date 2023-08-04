import { fi } from "date-fns/locale";

const defaultProps = {
  fill: '#979797',
  width: 30,
  height: 30,
};

const SvgAddToCalendar = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6842 25.5H2.36842C1.71053 25.5 1.15132 25.2812 0.69079 24.8438C0.230263 24.4062 0 23.875 0 23.25V5.25C0 4.625 0.230263 4.09375 0.69079 3.65625C1.15132 3.21875 1.71053 3 2.36842 3H4.73684V0H7.10526V3H18.1579V0H20.5263V3H22.8947C23.5526 3 24.1118 3.21875 24.5724 3.65625C25.0329 4.09375 25.2632 4.625 25.2632 5.25V15.45C25.0526 15.425 24.8553 15.4062 24.6711 15.3937C24.4868 15.3812 24.2895 15.375 24.0789 15.375C23.8684 15.375 23.6711 15.3812 23.4868 15.3937C23.3026 15.4062 23.1053 15.425 22.8947 15.45V9.75H2.36842V23.25H14.6842C14.6579 23.45 14.6382 23.6375 14.625 23.8125C14.6118 23.9875 14.6053 24.175 14.6053 24.375C14.6053 24.575 14.6118 24.7625 14.625 24.9375C14.6382 25.1125 14.6579 25.3 14.6842 25.5ZM22.8947 30V25.5H18.1579V23.25H22.8947V18.75H25.2632V23.25H30V25.5H25.2632V30H22.8947Z"
        fill="#581845"
      />
    </svg>
  );
};
SvgAddToCalendar.defaultProps = SvgAddToCalendar;

export default SvgAddToCalendar;