const defaultProps = {
  fill: '#581845',
};

const SvgComparative = ({ fill }: typeof defaultProps) => {
  return (
    <svg width="16" height="19" viewBox="0 2 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path   d="M8.20873 0.145552C8.13154 -0.0485175 7.86846 -0.0485175 7.79127 0.145552L7.35119 1.2519L6.20821 1.34768C6.00789 1.36452 5.92661 1.62596 6.07931 1.76272L6.94984 2.54252L6.68387 3.70819C6.63722 3.91257 6.85004 4.07421 7.02174 3.96461L8 3.33991L8.9785 3.96461C9.14996 4.07421 9.36278 3.91257 9.31613 3.70819L9.05016 2.54252L9.92069 1.76272C10.0734 1.62596 9.99211 1.36452 9.79179 1.34793L8.64905 1.2519L8.20873 0.145552Z" fill={ fill }/>
    <path d="M0.75 11.7241C0.75 11.586 0.861929 11.4741 1 11.4741H3.41379C3.55186 11.4741 3.66379 11.5861 3.66379 11.7241V18C3.66379 18.1381 3.55186 18.25 3.41379 18.25H1C0.861929 18.25 0.75 18.1381 0.75 18V11.7241Z" fill= { fill } stroke={ fill }  />
    <path d="M12.3362 10.7783C12.3362 10.6402 12.4481 10.5283 12.5862 10.5283H15C15.138 10.5283 15.25 10.6402 15.25 10.7783V18C15.25 18.1381 15.138 18.25 15 18.25H12.5862C12.4481 18.25 12.3362 18.1381 12.3362 18V10.7783Z" fill= { fill } stroke={ fill }  />
    <path d="M6.54321 6.28564C6.54321 6.14757 6.65514 6.03564 6.79321 6.03564H9.20701C9.34508 6.03564 9.45701 6.14757 9.45701 6.28564V17.9999C9.45701 18.138 9.34508 18.2499 9.20701 18.2499H6.79321C6.65514 18.2499 6.54321 18.138 6.54321 17.9999V6.28564Z" fill= { fill } stroke={ fill }  />
    </svg>
    
  );
};
SvgComparative.defaultProps = defaultProps;

export default SvgComparative;