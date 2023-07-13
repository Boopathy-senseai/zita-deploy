const defaultProps = {
    fill: '#666666',
    width: 24,
    height: 24,
  };
  
  const SvgNotesyet = ({ width, height, fill }: typeof defaultProps) => {
    return (
        <svg width="24" height="24" viewBox="0 0 10 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M15.9833 8.4L14 6.41667L15.33 5.08667L17.3133 7.07L15.9833 8.4ZM8.4 14V12.0167L13.3467 7.07L15.33 
        9.05333L10.3833 14H8.4ZM0
         9.33333V7.46667H6.53333V9.33333H0ZM0 5.6V3.73333H10.2667V5.6H0ZM0 1.86667V0H10.2667V1.86667H0Z" fill={fill}/>
        </svg>
        
      
    );
  };
  SvgNotesyet.defaultProps = defaultProps;
  
  export default SvgNotesyet;