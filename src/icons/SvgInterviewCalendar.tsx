interface Props {
  size?: number;
  fill?: string;
}

const SvgInterviewCalendarIcon = ({ size, fill }: Props) => (
  // <div
  //   style={{
  //     width: size || 24,
  //     height: size || 24,
  //   }}
  // >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    style={{
      fill: fill || 'var(--color-primary)',
    }}
  >
    <path
      d="M17 3V1a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0zM5 4a1 1 0 0 0 1-1V1a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1zm13 
      13v-3h-1v4h3v-1h-2zm-5 .5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5-4.5 2.019-4.5 4.5zm11 
      0a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0zM9.763 21H2V8h19v1.763c.727.33 1.399.757 2 1.268V2h-3v1a2.007 2.007 0 
      0 1-2.658 1.894C16.511 4.626 16 3.783 16 2.91V2H7v1a2.007 2.007 0 0 1-2.658 1.894C3.511 4.626 3 3.783 3 2.91V2H0v21h11.031a8.525 
      8.525 0 0 1-1.268-2z"
    />
  </svg>
  // </div>
);
export default SvgInterviewCalendarIcon;
