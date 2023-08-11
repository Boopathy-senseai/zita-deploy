/* eslint max-len: ["error", { "code": 2000 }] */
const defaultProps = {
  fill: '#581845',
  width: 17,
  height: 16,
};

const SvgNotesOne = ({ width, height, fill }: typeof defaultProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      fill={fill}
      viewBox="0 0 17 16 "
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d= "M3.42574 14C3.06153 14 2.74964 13.8693 2.49006 13.608C2.23048 13.3467 2.10091 13.0329 2.10135 12.6667V3.33334C2.10135 2.96667 2.23114 2.65267 2.49072 2.39133C2.7503 2.13 3.06197 1.99956 3.42574 2H12.6964C13.0606 2 13.3725 2.13067 13.6321 2.392C13.8917 2.65333 14.0213 2.96711 14.0208 3.33334V7.8C13.8111 7.7 13.5959 7.61378 13.3752 7.54134C13.1545 7.46889 12.9282 7.41623 12.6964 7.38334V3.33334H3.42574V12.6667H7.432C7.46511 12.9111 7.51765 13.1445 7.58961 13.3667C7.66156 13.5889 7.74699 13.8 7.84587 14H3.42574Z"/>
      <path d= "M3.42574 12V12.6667V3.33334V7.38334V7.33334V12Z"/>
      <path d= "M4.75012 10.6667C4.75012 10.8556 4.81369 11.014 4.94083 11.142C5.06797 11.27 5.22514 11.3338 5.41232 11.3333H7.44856C7.48167 11.1 7.5342 10.8722 7.60616 10.65C7.67812 10.4278 7.75802 10.2111 7.84587 10H5.41232C5.22469 10 5.06731 10.064 4.94017 10.192C4.81303 10.32 4.74968 10.4782 4.75012 10.6667Z"/>
      <path d= "M4.75012 8C4.75012 8.18889 4.81369 8.34734 4.94083 8.47534C5.06797 8.60334 5.22514 8.66712 5.41232 8.66667H8.7895C9.14267 8.33334 9.53734 8.05556 9.9735 7.83334C10.4097 7.61112 10.8758 7.46112 11.3721 7.38334C11.2727 7.36112 11.1624 7.34712 11.041 7.34134C10.9196 7.33556 10.8092 7.33289 10.7099 7.33334H5.41232C5.22469 7.33334 5.06731 7.39734 4.94017 7.52534C4.81303 7.65334 4.74968 7.81156 4.75012 8Z"/>
      <path d= "M4.75012 5.33334C4.75012 5.52223 4.81369 5.68067 4.94083 5.80867C5.06797 5.93667 5.22514 6.00045 5.41232 6H10.7099C10.8975 6 11.0549 5.936 11.182 5.808C11.3091 5.68 11.3725 5.52178 11.3721 5.33334C11.3721 5.14445 11.3085 4.986 11.1813 4.858C11.0542 4.73 10.897 4.66623 10.7099 4.66667H5.41232C5.22469 4.66667 5.06731 4.73067 4.94017 4.85867C4.81303 4.98667 4.74968 5.14489 4.75012 5.33334Z"/>
      <path d= "M12.0342 15.3333C11.1182 15.3333 10.3373 15.0082 9.69141 14.358C9.04555 13.7078 8.72284 12.9218 8.72328 12C8.72328 11.0778 9.04621 10.2916 9.69207 9.64134C10.3379 8.99112 11.1187 8.66623 12.0342 8.66667C12.9503 8.66667 13.7312 8.99178 14.3771 9.64201C15.0229 10.2922 15.3457 11.0782 15.3452 12C15.3452 12.9222 15.0223 13.7085 14.3764 14.3587C13.7306 15.0089 12.9498 15.3338 12.0342 15.3333Z"/>
      <path d= "M11.7031 12.3333V13.6667C11.7031 13.7556 11.7363 13.8333 11.8025 13.9C11.8687 13.9667 11.946 14 12.0342 14C12.1225 14 12.1998 13.9667 12.266 13.9C12.3322 13.8333 12.3653 13.7556 12.3653 13.6667V12.3333H13.6897C13.778 12.3333 13.8553 12.3 13.9215 12.2333C13.9877 12.1667 14.0208 12.0889 14.0208 12C14.0208 11.9111 13.9877 11.8333 13.9215 11.7667C13.8553 11.7 13.778 11.6667 13.6897 11.6667H12.3653V10.3333C12.3653 10.2445 12.3322 10.1667 12.266 10.1C12.1998 10.0333 12.1225 10 12.0342 10C11.946 10 11.8687 10.0333 11.8025 10.1C11.7363 10.1667 11.7031 10.2445 11.7031 10.3333V11.6667H10.3788C10.2905 11.6667 10.2132 11.7 10.147 11.7667C10.0808 11.8333 10.0477 11.9111 10.0477 12C10.0477 12.0889 10.0808 12.1667 10.147 12.2333C10.2132 12.3 10.2905 12.3333 10.3788 12.3333H11.7031Z"/>
    </svg>
  );
};
SvgNotesOne.defaultProps = defaultProps;

export default SvgNotesOne;
