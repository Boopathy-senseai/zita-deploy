import { FormikProps } from 'formik';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import SvgSearch from '../../icons/SvgSearch';
import SvgLocation from '../../icons/SvgLocation';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import Totalcount from '../../globulization/TotalCount';
import SvgInfinity from '../../icons/SvgInfinity';
import SvgIntomark from '../../icons/Intomark';
import { enterKeyPress } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
import { isEmpty } from '../../uikit/helper';
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line
import styles from './mydatabasesearchaction.module.css';
import { JobTitleEntity } from './myDataBaseTypes';


type Props = {
  jobTitle: JobTitleEntity[];
  formik: FormikProps<MyDataFormProps>;
  isSearchValue:any;
  setSearchValue:any;
  closesearch: () => void;
};

const MyDataBaseSearchAction = ({ jobTitle, formik,isSearchValue,setSearchValue ,closesearch}: Props) => {
  const selectInputRef = useRef<any>();

  const hanldeSearch = () => {
    formik.setFieldValue('searchValue', isSearchValue);
  };

  const customFilter = (option: { label: string }, inputValue: string) => {
    const result = option.label
      .toLocaleLowerCase()
      .includes(inputValue.toLocaleLowerCase());
    return result;
  };

  const getOptionLabel = (option: { job_title: string }) =>
    ` ${option.job_title}`;
  const getOptionValue = (option: { id: any }) => option.id;

  const getValue=jobTitle
  ? jobTitle.find(
      (option) =>
        Number(option.id) === Number(formik.values.jobTitle),
    )
  : ''

  const {
    candidate_available,
  } = useSelector(
    ({ myDataBaseInitalReducers }: RootState) => {
      return {
        candidate_available: myDataBaseInitalReducers.candidate_available,
      };
    },
  );
  const myRef=useRef<any>();
  return (
    <Flex row between marginBottom={15} className={styles.screenrow}>
    <Flex
      row
      style={{ position: 'relative', overFlowX: 'auto' }}
      className={styles.searchbox}
    >
      <Flex row className={styles.searchstyle}>
        <Text className={styles.jobstext}>Job Title</Text>
        <Flex row className={styles.searchboxoverall}>
           <Flex className={styles.boxstyle} >
                    <SelectTag
                      value={
                        typeof getValue ==='undefined' ? '': getValue
                      }
                      stylechangess
                      isSearchable={true}
                      ref={selectInputRef}
                      options={jobTitle}
                      placeholder="Select job to find match & invite profiles"
                      getOptionLabel={getOptionLabel}
                      getOptionValue={getOptionValue}
                      onChange={(options) => {
                        formik.setFieldValue('jobTitle', options.id.toString());
                      }}
                      noOptionsMessage={({}) => 'You have no posted jobs to display.'}
                      filterOption={customFilter}
                    />

                </Flex>

          <Flex className={styles.middleline}></Flex>

          <Flex className={styles.locationicon}>

            <SvgLocation

              width={18}

              height={18}

              fill={'#581845'}

            />

          </Flex>

          <InputText
                      className={styles.boxstyle2}
                      placeholder="Search candidate by name or email"
                      value={isSearchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                     
                      onKeyPress={(e) => enterKeyPress(e, hanldeSearch)}
                    />

                {isSearchValue.trim() !== '' && (
                    <button
                      className={styles.crossIcon}
                       onClick={closesearch}
                    >
                      <SvgIntomark width={14} height={14} fill="#888888" />
                    </button>
                  )}


          <Flex className={styles.searchicons}>
          <Button
                      types="link"
                      onClick={hanldeSearch}
                      onKeyDown={() => {}}
                    >
                    <div style={{marginTop: '-20px'}}>
                      <SvgSearch width={12} height={12} fill="#ffffff" />
                    </div>
                    </Button>

            

          </Flex>

        </Flex>

      </Flex>

    </Flex>

    <Flex row center className={styles.infiStyle}>
                      <Totalcount
                          name="Candidates Limit"
                          numbers={candidate_available}
                      />
                        {isEmpty(candidate_available) && (
                        <div
                          className={styles.svgInfy}
                          title="Unlimited Candidate Storage"
                        >
                        <SvgInfinity />
                        </div>
                       )}
                        </Flex>
    </Flex>
  );
};

export default MyDataBaseSearchAction;


// <Flex className={styles.overAll}>
//       <Text bold size={20}>
//         My Database
//       </Text>
//       <Flex row center className={styles.jobTitleFlex}>
//         <Flex row center flex={7}>
//           <Text className={styles.jobTitleText}>Job Title</Text>
//           <div style={{ width: '100%' }}>
//             <SelectTag
//               value={
//                 typeof getValue ==='undefined' ? '': getValue
//               }
//               isSearchable={true}
//               ref={selectInputRef}
//               options={jobTitle}
//               placeholder="Select job to find match & invite profiles"
//               getOptionLabel={getOptionLabel}
//               getOptionValue={getOptionValue}
//               onChange={(options) => {
//                 formik.setFieldValue('jobTitle', options.id.toString());
//               }}
//               noOptionsMessage={({}) => 'You have no posted jobs to display.'}
//               filterOption={customFilter}
//             />
//           </div>
//         </Flex>

//         <Flex flex={5} className={styles.inputStyle}>
//           <InputText
//             placeholder="Search candidate by name or email"
//             value={isSearchValue}
//             onChange={(event) => setSearchValue(event.target.value)}
//             actionRight={() => <SvgSearch />}
//             onKeyPress={(e) => enterKeyPress(e, hanldeSearch)}
//           />
//         </Flex>

//         <Flex>
//           <Button
//             disabled={isSearchValue.length === 0 ? true : false}
//             className={styles.btnStyle}
//             onClick={hanldeSearch}
//           >
//             Find Candidates
//           </Button>
//         </Flex>
//       </Flex>
//     </Flex>
