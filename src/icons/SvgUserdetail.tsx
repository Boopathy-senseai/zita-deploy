const defaultProps = {
    fill: '#333333',
    width:' 16px',
    height: '16px',
  };
  
  const SvgUserdetail = ({ width, height,fill }: typeof defaultProps) => {
    return (
      <svg width={width} height={height} viewBox="0 0 8 8" fill= {fill} xmlns="http://www.w3.org/2000/svg">
      <g >
      <path d="M4.00009 4.97947C3.68089 4.98007 3.36868 4.88597 3.10298 4.70907C2.83728 4.53217 2.63003 4.28041
       2.50746 3.98568C2.38489 3.69094 2.35252 3.36648 2.41442 3.05334C2.47633 2.74019 2.62973 2.45245 2.85523
        2.22652C3.08073 2.0006 3.36818 1.84665 3.68121 1.78415C3.99424 1.72166 4.31877 1.75343 4.61374 1.87544C4.9087
        1.99746 5.16084 2.20423 5.33824 2.4696C5.51564 2.73496 5.61033 3.04699 5.61033 3.3662C5.61023 3.79351 5.44066
         4.20333 5.13879 4.50577C4.83692 4.80821 4.4274 4.97857 4.00009 4.97947ZM4.00009 2.04039C3.73785 2.03979
          3.48134 2.11701 3.26301 2.26226C3.04467 2.40751 2.87434 2.61428 2.77357 2.85638C2.6728 3.09848 2.64612 
          3.36504 2.69692 3.62231C2.74771 3.87958 2.87368 4.116 3.0589 4.30164C3.24411 4.48728 3.48024 4.6138 3.7374 
          4.66518C3.99455 4.71657 4.26118 4.6905 4.50351 4.59028C4.74584 4.49007 4.953 4.32022 5.09875 4.10222C5.24451
           3.88422 5.3223 3.62787 5.3223 3.36563C5.3222 3.01476 5.18295 2.67827 4.93508 2.42994C4.68721 2.1816 4.35096 
           2.04172 4.00009 2.04097V2.04039Z" fill="#333333"/>
      <path d="M4.00003 5.0273C3.6714 5.02794 3.34997 4.93107 3.07642 4.74896C2.80287 4.56685 2.58949 4.30769 2.46329
       4.00426C2.33709 3.70083 2.30374 3.36679 2.36746 3.0444C2.43118 2.72201 2.58911 2.42576 2.82125 2.19317C3.0534
        1.96057 3.34933 1.80206 3.6716 1.73772C3.99386 1.67337 4.32797 1.70607 4.63164 1.83168C4.93532 1.95729 5.1949
         2.17017 5.37754 2.44337C5.56018 2.71657 5.65767 3.0378 5.65767 3.36643C5.65757 3.80633 5.483 4.22824 5.17225
          4.5396C4.86149 4.85096 4.43993 5.02635 4.00003 5.0273ZM4.00003 1.80038C3.69015 1.79974 3.38705 1.89104 3.12909
           2.06273C2.87113 2.23443 2.66991 2.47879 2.55089 2.76489C2.43186 3.05099 2.40039 3.36598 2.46045 3.66998C2.52051
            3.97397 2.66941 4.25332 2.8883 4.47266C3.10719 4.692 3.38622 4.84147 3.69009 4.90216C3.99396 4.96285
             4.30901 4.93202 4.59536 4.81359C4.88171 4.69515 5.12649 4.49442 5.29871 4.23682C5.47093 3.97921 5.56286
              3.6763 5.56286 3.36643C5.56281 2.95166 5.39825 2.55385 5.10526 2.26026C4.81228 1.96667 4.4148 1.80128
               4.00003 1.80038ZM4.00003 4.73946C3.72841 4.7401 3.46271 4.66013 3.23655 4.50969C3.0104 4.35925
                2.83396 4.1451 2.72957 3.89434C2.62518 3.64358 2.59754 3.36748 2.65014 3.101C2.70274 2.83453
                 2.83322 2.58965 3.02506 2.39735C3.2169 2.20506 3.46148 2.07401 3.72783 2.02078C3.99419 1.96755 
                 4.27034 1.99455 4.52135 2.09834C4.77236 2.20214 4.98693 2.37808 5.1379 2.60388C5.28887 2.82968
                  5.36946 3.09519 5.36946 3.36681C5.36936 3.73024 5.22513 4.07879 4.96842 4.33604C4.7117 4.59328 
                  4.36345 4.73823 4.00003 4.73908V4.73946ZM4.00003 2.08897C3.74716 2.08833 3.49979 2.16274 3.28922
                  2.30277C3.07866 2.44279 2.91438 2.64213 2.81717 2.87557C2.71996 3.109 2.69419 3.36603 2.74313
                   3.61412C2.79207 3.86221 2.91351 4.0902 3.09209 4.26923C3.27067 4.44827 3.49836 4.57029 3.74633 
                   4.61986C3.99429 4.66943 4.25138 4.64431 4.48507 4.54769C4.71875 4.45107 4.91851 4.28729 5.05906
                    4.07708C5.19961 3.86687 5.27465 3.61968 5.27465 3.36681C5.2748 3.02838 5.14067 2.70373 4.90171
                     2.46409C4.66274 2.22445 4.33845 2.0894 4.00003 2.0886V2.08897Z" fill="#333333"/>
      <path d="M6.1854 6.10271H5.89718C5.89707 5.97791 5.84747 5.85823 5.75923 5.76997C5.671 5.6817 5.55135
       5.63203 5.42654 5.63188H2.57354C2.44873 5.63203 2.3291 5.6817 2.24086 5.76997C2.15263 5.85823 2.10301 
       5.97791 2.10291 6.10271H1.8147C1.81505 5.90166 1.89506 5.70894 2.03723 5.56677C2.1794 5.42461 2.37212 
       5.34459 2.57317 5.34424H5.42616C5.62736 5.34434 5.82031 5.42425 5.96265 5.56645C6.10499 5.70865 6.1851 
       5.90151 6.1854 6.10271Z" fill="#333333"/>
      <path d="M6.23284 6.15005H5.85001V6.10265C5.84986 5.99041 5.80519 5.88282 5.72581 5.80347C5.64644 5.72413
       5.53882 5.67951 5.42658 5.67941H2.57358C2.46137 5.67951 2.35378 5.72414 2.27443 5.80349C2.19508 5.88284
        2.15046 5.99043 2.15036 6.10265V6.15005H1.76733V6.10265C1.76758 5.88889 1.85261 5.68396 2.00376 5.53281C2.1549
         5.38166 2.35983 5.29664 2.57358 5.29639H5.42658C5.64034 5.29664 5.84528 5.38166 5.99642 5.53281C6.14757
          5.68396 6.23259 5.88889 6.23284 6.10265V6.15005ZM5.94254 6.05524H6.13652C6.12418 5.8753 6.04404 5.70673
           5.91229 5.58356C5.78053 5.46038 5.60695 5.39178 5.42658 5.39158H2.57358C2.39324 5.39178 2.21969 5.46039 
           2.08796 5.58357C1.95623 5.70675 1.87614 5.87532 1.86384 6.05524H2.05764C2.06963 5.92665 2.12915 5.80715
            2.22456 5.72011C2.31998 5.63307 2.44443 5.58475 2.57358 5.5846H5.42658C5.55574 5.58475 5.68019 5.63307
             5.7756 5.72011C5.87102 5.80715 5.93055 5.92665 5.94254 6.05524Z" fill="#333333"/>
      <path d="M3.99996 7.95304C3.21821 7.95304 2.45401 7.72123 1.80401 7.28691C1.15401 6.85259 0.647404 6.23528
       0.348241 5.51303C0.0490784 4.79079 -0.0291996 3.99607 0.123312 3.22934C0.275824 2.46261 0.652273 1.75831 
       1.20505 1.20553C1.75783 0.652753 2.46212 0.276315 3.22885 0.123803C3.99557 -0.0287083 4.79031 0.0495581
        5.51255 0.348721C6.2348 0.647883 6.85211 1.1545 7.28643 1.8045C7.72075 2.4545 7.95256 3.2187 7.95256
         4.00045C7.95135 5.04837 7.53454 6.05303 6.79354 6.79402C6.05255 7.53502 5.04788 7.95183 3.99996 7.95304ZM3.99996 
         0.336071C3.27516 0.336033 2.56663 0.550928 1.96397 0.953581C1.3613 1.35623 0.891572 1.92856 0.614186
          2.59818C0.3368 3.2678 0.264218 4.00464 0.40561 4.71551C0.547002 5.42638 0.896027 6.07936 1.40854
           6.59187C1.92105 7.10438 2.57402 7.4534 3.2849 7.5948C3.99577 7.73619 4.7326 7.66361 5.40222
           7.38622C6.07184 7.10883 6.64417 6.6391 7.04683 6.03644C7.44948 5.43378 7.66437 4.72525 7.66434 
           4.00045C7.66328 3.02888 7.27688 2.09741 6.58992 1.41037C5.90296 0.723335 4.97152 0.336843 3.99996 
           0.335689V0.336071Z" fill="#333333"/>
      <path d="M3.99997 7.99994C3.2086 7.99994 2.43502 7.76526 1.77704 7.32558C1.11906 6.8859 0.606261
       6.26098 0.303472 5.52983C0.00068284 4.79869 -0.0784845 3.99418 0.0759852 3.21804C0.230455 2.4419 
       0.611623 1.729 1.17128 1.1695C1.73094 0.610004 2.44393 0.229035 3.22012 0.0747861C3.9963 -0.0794629 
       4.8008 -6.44701e-05 5.53185 0.302932C6.26291 0.605929 6.88769 1.11892 7.32719 1.77702C7.76668 2.43513
        8.00115 3.20877 8.00092 4.00013C7.99972 5.06077 7.57776 6.07762 6.82767 6.8275C6.07757 7.57738 5.06061
         7.99904 3.99997 7.99994ZM3.99997 0.0947502C3.2274 0.0947502 2.4722 0.323844 1.82984 0.753056C1.18748 
         1.18227 0.68681 1.79232 0.391163 2.50608C0.0955168 3.21983 0.0181655 4.00523 0.168885 4.76295C0.319604
          5.52066 0.691624 6.21667 1.23791 6.76295C1.78419 7.30924 2.4802 7.68126 3.23792 7.83198C3.99563 7.9827
           4.78103 7.90534 5.49478 7.6097C6.20854 7.31405 6.81859 6.8134 7.24781 6.17103C7.67702 5.52867 7.90611
            4.77346 7.90611 4.0009C7.90516 2.96522 7.49331 1.97223 6.76097 1.23989C6.02863 0.507554 5.03565 0.0957041
             3.99997 0.0947502ZM3.99997 7.71192C3.26579 7.71195 2.54809 7.49428 1.93763 7.08642C1.32717 6.67856
              0.851374 6.09883 0.5704 5.42055C0.289427 4.74226 0.215907 3.99589 0.359128 3.27582C0.502349 2.55575 
              0.855877 1.89432 1.37502 1.37518C1.89416 0.856044 2.55559 0.502516 3.27566 0.359295C3.99573 0.216074
               4.7421 0.289593 5.42038 0.570567C6.09866 0.851541 6.67839 1.32734 7.08625 1.9378C7.49411 2.54826
                7.71179 3.26596 7.71175 4.00013C7.71049 4.98417 7.31904 5.92756 6.62321 6.62338C5.92739 7.3192 4.98401
                 7.71066 3.99997 7.71192ZM3.99997 0.382974C3.28455 0.382936 2.58519 0.59505 1.99033 0.992486C1.39546
                  1.38992 0.931814 1.95483 0.658011 2.61578C0.384207 3.27673 0.31255 4.00402 0.452097 4.70569C0.591645
                   5.40737 0.936131 6.05191 1.44199 6.55779C1.94785 7.06368 2.59237 7.4082 3.29404 7.54778C3.9957 
                   7.68737 4.723 7.61574 5.38396 7.34197C6.04492 7.0682 6.60985 6.60459 7.00732 6.00975C7.40479 5.4149 
              7.61694 4.71555 7.61694 4.00013C7.61573 3.0412 7.23428 2.1219 6.55624 1.44381C5.87819 0.765731 
              4.95889 0.384228 3.99997 0.382974Z" fill="#333333"/>
      </g>
      {/* <defs>
      <clipPath id="clip0_1220_297">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs> */}
      </svg>
      
        
    );
  };
  SvgUserdetail.defaultProps = defaultProps;
  
  export default SvgUserdetail;
  