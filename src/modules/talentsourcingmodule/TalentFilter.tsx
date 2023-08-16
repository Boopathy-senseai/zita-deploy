import { Dispatch, SetStateAction, useEffect,useRef,useState} from 'react';
import classNames from 'classnames/bind';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import { Button } from '../../uikit';
import InputSwitch from '../../uikit/Switch/InputSwitch'
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
  apply:boolean;
  setapply:any;
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
  updatechckbox:any;
  setchange?:any;
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
  apply,
  setapply,
  isInitalCheckBox,
  updatechckbox,
  setchange,  
  handleRefresh
}: Props) => {
  const handleBachelor = () => {
    setBachelors(!isBachelors);
    setAny(false);
    setchange(true)
    setInitialPage(0);
  };
  const handleDoctorate = () => {
    setDoctorate(!isDoctorate);
    setAny(false);
    setchange(true)
    setInitialPage(0);
  };
  const handleMaster = () => {
    setMasters(!isMasters);
    setAny(false);
    setchange(true)
    setInitialPage(0);
    };
  const handleOther = () => {
        setAny(false);
    setOther(!isOther);
    setchange(true)
    setInitialPage(0);
         };
  const handleAny = () => { 
    setAny(!isAny);
    setBachelors(false);
    setDoctorate(false);
    setMasters(false);
    setOther(false);
    setchange(true)
    setInitialPage(0);

  };
  const filterRefresh = () => {
 
    handleRefresh();
    setRelocate(false);
    setnewexperience(null);
    setnewBachelors1(false);
    setnewmaster1(false);
    setnewDoctorate1(false);
    setnewothers1(false);
    setnewrelocate(false);
  };
  const selectInputRef = useRef<any>();
  const myRef = useRef<any>();
  const dropDownRef = useRef(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [apply1,setapply1]=useState(false)
  const [newexperience,setnewexperience]=useState(null)
  const [NewBachelors1,setnewBachelors1]=useState(false)
  const [Newmaster1,setnewmaster1]=useState(false)
  const [NewDoctorate1,setnewDoctorate1]=useState(false)
  const [Newothers1,setnewothers1]=useState(false)
  const [newrelocate,setnewrelocate]=useState(false)
  useEffect(() => {
    if (!isBachelors && !isDoctorate && !isMasters && !isOther) {
      setAny(true);
    }
  }, [isBachelors, isDoctorate, isMasters, isOther]);

  const closebachelor=()=>{
    setBachelors(false)
    setnewBachelors1(false)
    setchange(false)
  }
  const closedoctorate=()=>{
    setDoctorate(false)
    setnewDoctorate1(false)
    setchange(false)
  }
  const closemasters=()=>{
    setMasters(false)
    setnewmaster1(false)
    setchange(false)
  }
  const closeother=()=>{
    setOther(false)
    setnewothers1(false)
    setchange(false)
  }
  const closerelocate=()=>{
    setRelocate(false)
    setnewrelocate(false)
    setchange(false)
  }
  const close=()=>{
    setExperience(experienceOptions[0])
    setnewexperience(experienceOptions[0])
    setchange(false)
  }
   const handlechange=()=>{
    updatechckbox()
    setapply(true)
    setShowDropDown(false)
    setapply1(true)
    setnewBachelors1(isBachelors)
    setnewDoctorate1(isDoctorate)
    setnewmaster1(isMasters)
    setnewothers1(isOther)
    setnewexperience(isExperience)
    setnewrelocate(isRelocate)
    setchange(false)
   }
   const changeexperience=()=>{
    setchange(true)
   }
   const handlerelocate=()=>{
    setRelocate(!isRelocate)
    setchange(true)
   }
   

  return (
   <>
   {console.log("Experience",newexperience)}
     <Text className={""} style={{ color: "#581845" }}>
        Quick Filters :
      </Text>
      {  !NewBachelors1 && !NewDoctorate1 && !Newmaster1 && !Newothers1 ?(
       <Text className={styles.quickfil} style={{cursor:'default'}}>
        {"Any"}
      </Text>
      ): (
        null
      )
      }
      { 
        ((newexperience !==null)) ?(
          (newexperience.value !=="all")?(
          <Text className={styles.quickfil}>
             {isExperience.label}{" "}
             <SvgIntomark
             className={styles.stylesvg}
             onClick={() => close()}
           />
           </Text>):(null)
        ): (
        null
        ) 
      }
      
      { NewBachelors1 ?(
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
      { NewDoctorate1  ?(
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
      
    { Newmaster1  ?(
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
  {Newothers1 ?(
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
{newrelocate ?(
  <Text className={styles.quickfil}>
     {"Willing to Relocate"}{" "}
     <SvgIntomark
              className={styles.stylesvg}
              onClick={() => closerelocate()}
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
    
    >
      <Flex style={{width:'90%'}}  onClick={() => {
        setShowDropDown((value) => !value);
      }}>
        <Text
          bold
          className={styles.filtername}
          style={{ cursor: "Pointer",paddingTop:7,fontSize:14 }}
        >
          View Filter
        </Text>
      </Flex>
    
          <Flex title={"Clear Filters"} >
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
                onChange={(value) => (setExperience(value),
                  setchange(true))
                 }
                isDisabled={isInitalCheckBox}
              />
    
      </Flex>

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
              disabled={isAny}
            />
          </Flex>
        </Flex>
       </Flex>
      </Flex>
      
      
      <div className={styles.mtstyle}> 
      <Flex row >
        <Flex>
        <InputSwitch
        checked={isRelocate}
        onClick={handlerelocate}
        disabled={isInitalCheckBox}
        />
      </Flex>
        <Flex style={{marginLeft:'5px',color:'#581845',fontSize:'14px',fontWeight:'bold'}}>
            Willing to Relocate
        </Flex>
      </Flex>
  
      </div>
      <div style={{padding:'6px',display:'flex',justifyContent: 'center',alignItems:'center'}}>
      <Button
      className={styles.buyBtn}
      onClick={handlechange}
    >
     Apply
    </Button>
    </div>

      
    
    </div>
    </div>
</>
     );
};

export default TalentFilter;

// <Button
//       className={styles.buyBtn}
//       onClick={handlechange}
//     >
//      Apply
//     </Button>


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