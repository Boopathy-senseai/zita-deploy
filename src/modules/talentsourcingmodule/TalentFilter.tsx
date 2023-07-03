import { Dispatch, SetStateAction, useEffect,useRef,useState} from 'react';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import SvgRefresh from '../../icons/SvgRefresh';
import SvgIntomark from '../../icons/Intomark';
import styles from './talentfilter.module.css';
import styles1 from "./../mydatabasemodule/switch.module.css"
import { experienceOptions } from './mock';



type experienceOptionsType = {
  value: string;
  label: string;
};

const cx = classNames.bind(styles);

type Props = {
  isBachelors: boolean;
  isDoctorate: boolean;
  isMasters: boolean;
  isAny: boolean;
  setBachelors: (arg: boolean) => void;
  setDoctorate: (arg: boolean) => void;
  setMasters: (arg: boolean) => void;
  setAny: (arg: boolean) => void;
  isRelocate: boolean;
  setRelocate: (arg: boolean) => void;
  isExperience: experienceOptionsType;
  setExperience: Dispatch<SetStateAction<experienceOptionsType>>;
  setInitialPage: (arg: number) => void;
  isOther: boolean;
  setOther: (arg: boolean) => void;
  isInitalCheckBox: boolean;
  handleRefresh:()=>void
};
const TalentFilter = ({
  isBachelors,
  isDoctorate,
  isMasters,
  isAny,
  setBachelors,
  setDoctorate,
  setMasters,
  setAny,
  isRelocate,
  setRelocate,
  isExperience,
  setExperience,
  setInitialPage,
  isOther,
  setOther,
  isInitalCheckBox,
  handleRefresh
}: Props) => {
  const handleBachelor = () => {
    setBachelors(!isBachelors);
    setAny(false);
    setInitialPage(0);
  };
  const handleDoctorate = () => {
    setDoctorate(!isDoctorate);
    setAny(false);
    setInitialPage(0);
  };
  const handleMaster = () => {
    setMasters(!isMasters);
    setAny(false);
    setInitialPage(0);
  };
  const handleOther = () => {
    setAny(false);
    setOther(!isOther);
    setInitialPage(0);
  };
  const handleAny = () => {
    setAny(!isAny);
    setBachelors(false);
    setDoctorate(false);
    setMasters(false);
    setOther(false);
    setInitialPage(0);
  };
  const filterRefresh = () => {
    handleRefresh();
    setRelocate(false);

  };
  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();
  const dropDownRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (!isBachelors && !isDoctorate && !isMasters && !isOther) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isMasters, isOther]);

  const closebachelor=()=>{
    setBachelors(false)
  }
  const closedoctorate=()=>{
    setDoctorate(false)
  }
  const closemasters=()=>{
    setMasters(false)
  }
  const closeother=()=>{
    setOther(false)
  }
  const close=()=>{
    setExperience(experienceOptions[0])
  }

  console.log(experienceOptions,"is exp")

  return (
   <>
     <Text className={""} style={{ color: "#581845" }}>
        Quick Filters :
      </Text>
      {  !isBachelors && !isDoctorate && !isMasters && !isOther ?(
       <Text className={styles.quickfil}>
        {"Any"}
      </Text>
      ): (
        null
      )
      }
      {  isBachelors  ?(
           <Text className={styles.quickfil}>
              {"Bachelors"}{" "}
              <SvgIntomark
                className={styles.stylesvg}
                onClick={() => closebachelor()}
              />
            </Text>
      ): (
        null
      )
      }
      {  isDoctorate  ?(
        <Text className={styles.quickfil}>
           {"Doctorate"}{" "}
           <SvgIntomark
           className={styles.stylesvg}
           onClick={() => closedoctorate()}
         />
         </Text>
   ): (
     null
   )
   }
      
    {  isMasters  ?(
      <Text className={styles.quickfil}>
         {"Masters"}{" "}
         <SvgIntomark
                className={styles.stylesvg}
                onClick={() => closemasters()}
              />
       </Text>
  ): (
   null
  )
  }
  {  isOther  ?(
    <Text className={styles.quickfil}>
       {"Other"}{" "}
       <SvgIntomark
                className={styles.stylesvg}
                onClick={() => closeother()}
              />
     </Text>
): (
 null
)
}

{  isExperience.value !=="all" ?(
  <Text className={styles.quickfil}>
     {isExperience.label}{" "}
     <SvgIntomark
     className={styles.stylesvg}
     onClick={() => close()}
   />
   </Text>
): (
null
)
}



    <div ref={dropDownRef} className={styles.drop_down} style={{ zIndex: 0}}>
    <Flex
      row
      className={styles.drop_down_header}
      onClick={() => {
        setShowDropDown((value) => !value);
      }}
    >
      <Flex>
        <Text
          bold
          className={styles.filtername}
          style={{ cursor: "Pointer",paddingTop:7,fontSize:14 }}
        >
          View Filter
        </Text>
      </Flex>
    
          <Flex title={"Clear Filters"}>
                <SvgRefresh
                  width={18}
                  height={18}
                  onClick={filterRefresh}
                  className={styles.filtersvg}
                />
          </Flex>
    </Flex>
    <div
      className={`${styles.drop_down_menus} ${
        showDropDown ? styles.show : ""
      }`}
    >
 
      <Flex className={styles.mtstyle}>
        <Flex className={styles.skillContainer} >
        <Text type="titleSmall" bold style={{color:'#581845',marginBottom:'2px'}} >Qualification</Text>
        <Flex row top className={cx('checkBoxContainer')}>
          <Flex className={cx('checkBoxContainerOne')}>
            <div className={cx('checkBoxOne')}>
              <InputCheckBox
                checked={isBachelors}
                label={'Bachelors'}
                onChange={handleBachelor}
                disabled={isInitalCheckBox}
              />
            </div>
            <InputCheckBox
              onChange={handleDoctorate}
              checked={isDoctorate}
              label="Doctorate"
              disabled={isInitalCheckBox}
            />
            <div style={{ paddingTop: 3 }}>
              <InputCheckBox
                label={'Others'}
                checked={isOther}
                onChange={handleOther}
                disabled={isInitalCheckBox}
              />
            </div>
          </Flex>
          <Flex style={{marginLeft: '14px'}}>
            <div className={cx('checkBoxOne')}>
              <InputCheckBox
                onChange={handleMaster}
                checked={isMasters}
                label="Masters"
                disabled={isInitalCheckBox}
              />
            </div>
            <InputCheckBox
              onChange={handleAny}
              checked={isAny}
              label="Any"
              disabled={isInitalCheckBox}
            />
          </Flex>
        </Flex>
      </Flex>
      </Flex>
    
      <Flex className={styles.mtstyle}>
      <SelectTag
                id={'talentfilter__experienceId'}
                defaultValue={{
                  value: isExperience.value,
                  label: isExperience.label,
                }}
                value={
                  experienceOptions
                    ? experienceOptions.find(
                        (option) =>
                          option.value === isExperience.value,
                      )
                    : ''
                }
                labelBold
                options={experienceOptions}
                label={'Experience'}
                onChange={(value) => setExperience(value)}
                isDisabled={isInitalCheckBox}
              />
    
      </Flex>
      
      
      <div className={styles.mtstyle}> 
      <Flex row >
        <Flex>
          <label className={styles1.toggleswitch} >
          <input type="checkbox" checked={isRelocate}
          onChange={() => setRelocate(!isRelocate)} disabled={isInitalCheckBox}/>
           <span className={styles1.switch} />
           </label>
      </Flex>
        <Flex style={{marginLeft:'10px',color:'black'}}>
            Willing to Relocate
        </Flex>
      </Flex>
  
      </div>
    
    
    </div>
    </div>
</>
     );
};

export default TalentFilter;



// <Card className={cx('cardConatiner')}>
//       <Flex row center className={styles.filterFlex}>
//         <Text type="titleMedium" className={cx('filterTextStyle')}>
//           Filters
//         </Text>
//         <div
//           title={'Reset Filters'}
//           onClick={handleRefresh}
//           className={styles.pointer}
//           tabIndex={-1}
//           role={'button'}
//           onKeyPress={() => {}}
//         >
//           <SvgRefresh />
//         </div>
//       </Flex>
//       <Flex className={cx('qualificationConatiner')}>
//         <Text type="titleSmall">Qualification</Text>
//         <Flex row top className={cx('checkBoxContainer')}>
//           <Flex className={cx('checkBoxContainerOne')}>
//             <div className={cx('checkBoxOne')}>
//               <InputCheckBox
//                 checked={isBachelors}
//                 label={'Bachelors'}
//                 onChange={handleBachelor}
//                 disabled={isInitalCheckBox}
//               />
//             </div>
//             <InputCheckBox
//               onChange={handleDoctorate}
//               checked={isDoctorate}
//               label="Doctorate"
//               disabled={isInitalCheckBox}
//             />
//             <div style={{ paddingTop: 16 }}>
//               <InputCheckBox
//                 label={'Others'}
//                 checked={isOther}
//                 onChange={handleOther}
//                 disabled={isInitalCheckBox}
//               />
//             </div>
//           </Flex>
//           <Flex>
//             <div className={cx('checkBoxOne')}>
//               <InputCheckBox
//                 onChange={handleMaster}
//                 checked={isMasters}
//                 label="Masters"
//                 disabled={isInitalCheckBox}
//               />
//             </div>
//             <InputCheckBox
//               onChange={handleAny}
//               checked={isAny}
//               label="Any"
//               disabled={isInitalCheckBox}
//             />
//           </Flex>
//         </Flex>
//       </Flex>
//       <div className={styles.padding16}>
//         <SelectTag
//           id={'talentfilter__experienceId'}
//           defaultValue={{
//             value: isExperience.value,
//             label: isExperience.label,
//           }}
//           value={
//             experienceOptions
//               ? experienceOptions.find(
//                   (option) =>
//                     option.value === isExperience.value,
//                 )
//               : ''
//           }
//           labelBold
//           options={experienceOptions}
//           label={'Experience'}
//           onChange={(value) => setExperience(value)}
//           isDisabled={isInitalCheckBox}
//         />
//         <div className={styles.showCheckBox}>
//           <InputCheckBox
//             onChange={() => setRelocate(!isRelocate)}
//             checked={isRelocate}
//             label={'Show candidates willing to relocate'}
//             disabled={isInitalCheckBox}
//           />
//         </div>
//       </div>
//     </Card>
//   );
// };