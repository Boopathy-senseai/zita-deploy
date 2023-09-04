import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
// import { ref } from 'yup';

import SvgIntomark from '../../icons/Intomark';

// import { Button, DropdownButton } from 'react-bootstrap';
import { Button, InputCheckBox, InputRadio } from '../../uikit';
// import Dropdown from 'react-bootstrap';
import SvgRefresh from '../../icons/SvgRefresh';
import Flex from '../../uikit/Flex/Flex';
import InputSearch from '../../uikit/InputSearch/InputSearch';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { postedOn, jobTypeData } from './mock';
import styles from './myjobpostingfilter.module.css';

// import classNames from "classnames";
// import { Pointer } from "highcharts";
// import Placeholder from "react-select/dist/declarations/src/components/Placeholder";

// import { any } from 'prop-types';
export interface DateEntity {
  label: string;
  value: string;
  // placeholder:string;
}
export type MyJobFormProps = {
  jobId: string;
  postedOn: DateEntity;
  jobType: string;
  location: string;
  jobTitle: string;
};

type Props = {
  formik: FormikProps<MyJobFormProps>;
  location_list: string[];
  job_title: string[];
  job_ids: string[];
  setchange?: any;
};

const MyJobsPostingFilter = ({
  formik,
  location_list,
  job_ids,
  job_title,
  setchange,
}: Props) => {
  const [data, setdata] = useState('');
  const [done, setdone] = useState('');
  const [date, setdate] = useState('');
  const [Title, setTitle] = useState('');
  const [locationdata, setlocationdata] = useState('');

  const [jobid1, setjobid1] = useState('');
  const [jobstatus1, setjobstatus1] = useState('');
  const [jobposted1, setjobposted1] = useState('');
  const [jobtitle, setjobtitle] = useState('');
  const [location, setlocation] = useState('');
  const inputRef = useRef<any>();

  const pageReload = () => {
    // location.reload( );
    setjobid1('');
    setlocation('');
    setjobstatus1('');
    setjobtitle('');
    setjobposted1('');
    setdata('');
    setdate('');
    setTitle('');
    setlocationdata('');
    formik.resetForm();
    formik.setFieldValue('jobTitle', '');
    formik.setFieldValue('jobId', '');
    formik.setFieldValue('postedOn', {
      value: '',
    });
    formik.setFieldValue('jobType', '');
    formik.setFieldValue('location', '');
    inputRef.current.autowhatever.input.value = null;
  };
  useEffect(() => {
    if (formik.values.jobType === 'All') {
      setdata('');
      setdate('');
      setTitle('');
      setlocationdata('');
    }
  }, [formik.values.jobType]);
  useEffect(() => {
    if (formik.values.jobType === '1') {
      setdone('Active');
    } else if (formik.values.jobType === '4') {
      setdone('Inactive');
    } else if (formik.values.jobType === '2,5,6') {
      setdone('Draft');
    } else if (formik.values.jobType === '') {
      setdone('All');
      setdata('');
      setdate('');
      setTitle('');
      setlocationdata('');
    }

    if (formik.values.jobId !== '' && formik.values.jobType === '') {
      setdata(formik.values.jobId);
      // setdone("");
    } else {
      setdata(formik.values.jobId);
    }

    if (formik.values.postedOn.value === '1') {
      setdate('Last 24 hours');
    } else if (formik.values.postedOn.value === '3') {
      setdate('Last 3 days');
    } else if (formik.values.postedOn.value === '7') {
      setdate('Last 7 days');
    } else if (formik.values.postedOn.value === '14') {
      setdate('Last 14 days');
    } else if (formik.values.postedOn.value === '30') {
      setdate('Last 30 days');
    } else if (formik.values.postedOn.value === '90') {
      setdate('Last 90 days');
    } else if (formik.values.postedOn.value === '365') {
      setdate('Last year');
    } else if (formik.values.postedOn.value === '') {
      setdate('');
    }

    setTitle(formik.values.jobTitle);
    setlocationdata(formik.values.location);
  }, [
    formik.values.jobId,
    formik.values.jobType,
    formik.values.postedOn.value,
    formik.values.jobTitle,
    formik.values.location,
  ]);

  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef(null);

  // const closeDropDown = (e: any) => {
  //   if (
  //     dropDownRef.current &&
  //     showDropDown &&
  //     !dropDownRef.current.contains(e.target)
  //   ) {
  //     setShowDropDown(false);

  //   }

  // };

  //    useEffect(() =>{
  //     if (typeof Window !== 'undefined') {
  //       document.addEventListener('click',closeDropDown);
  //     }
  //   })
  //   const onchek = localStorage.getItem('oncheck')
  //   useEffect(() => {
  //     if(onchek === 'false'){
  //     if (typeof Window !== 'undefined') {
  //       document.addEventListener('click', closeDropDown);
  //     }}
  //     else{

  //   }
  //     return () => {
  //       if (dropDownRef) {
  //         if (typeof Window === 'undefined') {
  //           document.removeEventListener('click',closeDropDown,false);
  //         }
  //       }
  //     };}
  //   );

  //  useEffect(()=>{
  // setShowDropDown(true)
  //  },[formik.values])

  const closestatus = () => {
    setdone('');
    setjobstatus1('');
    formik.setFieldValue('jobType', '');
    setchange(false);
  };
  const close = () => {
    setchange(false);
    setdata('');
    setjobid1('');
    formik.setFieldValue('jobId', '');
  };

  const closedate = () => {
    setchange(false);
    setdate('');
    setjobposted1('');
    formik.setFieldValue('postedOn', { value: '', label: 'All' });
  };

  const closetitle = () => {
    setchange(false);
    setTitle('');
    setjobtitle('');
    formik.setFieldValue('jobTitle', '');
  };
  const closelocationdata = () => {
    setchange(false);
    setlocationdata('');
    setlocation('');
    formik.setFieldValue('location', '');
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   });
  // };

  const [offset, setOffset] = useState(0);

  const handlechange = () => {
    setchange(false);
    setShowDropDown(false);
    setjobid1(data);
    setjobstatus1(done);
    setjobposted1(date);
    setlocation(locationdata);
    setjobtitle(Title);
  };

  const handlechange1 = (event) => {
    formik.setFieldValue('jobId', event.target.value);
    setchange(true);
  };
  const handlechange2 = (event) => {
    formik.setFieldValue('jobTitle', event.target.value);
    setchange(true);
  };
  const handlechange3 = (event) => {
    formik.setFieldValue('location', event.target.value);
    setchange(true);
  };

  // const MyDataBaseSearchAction = ({ jobTitle, formik,isSearchValue,setSearchValue }: Props) => {
  const isDefaultFilter = () => {
    if (
      location === '' &&
      jobid1 === '' &&
      jobtitle === '' &&
      jobposted1 === '' &&
      (jobstatus1 === 'All' || jobstatus1 === '')
    ) {
      return true;
    }
    return false;
  };

  return (
    <Flex row style={{ justifyContent: 'space-between' }}>
      <Flex row className={styles.quickFilters}>
      <Text size={13} style={{ whiteSpace: 'nowrap', marginTop: '3px' }}>
        Quick Filters :
      </Text>
      {jobtitle !== '' ? (
        <Text className={styles.quickfil}>
          {jobtitle}{' '}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closetitle()}
            style={{cursor:"pointer"}}
          />
        </Text>
      ) : (
        ''
      )}

      {jobid1 !== '' ? (
        <Text className={styles.quickfil}>
          {jobid1}{' '}
          <SvgIntomark className={styles.stylesvg} onClick={() => close()} style={{cursor:"pointer"}}/>
        </Text>
      ) : (
        ' '
      )}
      {isDefaultFilter() ? (
        <Text className={styles.quickfil}>All</Text>
      ) : jobstatus1 !== 'All' && jobstatus1 !== '' ? (
        <Text className={styles.quickfil}>
          {' '}
          {jobstatus1}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closestatus()}
            style={{cursor:"pointer"}}
          />
        </Text>
      ) : (
        ''
      )}

      {jobposted1 !== '' ? (
        <Text className={styles.quickfil}>
          {jobposted1}{' '}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closedate()}
            style={{cursor:"pointer"}}
          />
        </Text>
      ) : (
        ' '
        // " "
      )}

      {location !== '' ? (
        <Text className={styles.quickfil}>
          {location}{' '}
          <SvgIntomark
            className={styles.stylesvg}
            onClick={() => closelocationdata()}
            style={{cursor:"pointer"}}
          />
        </Text>
      ) : (
        ''
      )}

      </Flex>
     

      <Flex>
        <div ref={dropDownRef} className={styles.drop_down}>
          <Flex row className={styles.drop_down_header}>
            <Flex
              onClick={() => {
                setShowDropDown((value) => !value);
              }}
            >
              <Text
                bold
                className={styles.filtername}
                style={{
                  cursor: 'Pointer',
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 13,
                  paddingRight: '120px',
                }}
              >
                View Filter
              </Text>
            </Flex>

            {/* <div
         tabIndex={-1}
         role={'button'}
          onClick={pageReload}
         onKeyPress={() => { } } 
       > */}
            <Flex title={'Clear Filters'}>
              <SvgRefresh
                width={18}
                height={18}
                onClick={pageReload}
                className={styles.filtersvg}
              />
            </Flex>
            {/* </div> */}
          </Flex>
          <div
            className={`${styles.drop_down_menus} ${
              showDropDown ? styles.show : ''
            }`}
          >
            <Flex className={styles.mtstyle}>
              <div>
                <Text className={styles.jobTextStyle}>Job Title</Text>

                <Flex className={styles.hoverbox}>
                  <InputSearch
                    initialValue={formik.values.jobTitle}
                    setFieldValue={formik.setFieldValue}
                    options={job_title}
                    placeholder="Enter a job title"
                    style={styles.boxstyle}
                    name="jobTitle"
                    onChange={(event) => {
                      formik.setFieldValue('jobTitle', event.target.value);
                      setchange(true);
                    }}
                  />
                </Flex>
              </div>
            </Flex>
            <Flex className={styles.mtstyle}>
              <Text className={styles.jobTextStyle}>Job ID</Text>

              <InputSearch
                style={styles.boxstyle}
                initialValue={formik.values.jobId}
                options={job_ids}
                placeholder="Enter a job id"
                // labelBold
                setFieldValue={formik.setFieldValue}
                inputRef={inputRef}
                name="jobId"
                // // eslint-disable-next-line jsx-a11y/no-autofocus
                // autoFocus
                onChange={(event) => (
                  formik.setFieldValue('jobId', event.target.value),
                  setchange(true)
                )}
              />
            </Flex>

            <Flex className={styles.mtstyle}>
              <div className={styles.skillContainer}>
                <Text className={styles.jobTextStyle}>Job Status</Text>
                <Flex marginTop={5} className={styles.matchRadioStyling}>
                  {jobTypeData.map((jobList) => {
                    return (
                      <Flex
                        key={jobList.value}
                        width={jobList.width}
                        className={styles.matchRadioStyle}
                      >
                        <InputRadio
                          // className={styles.checkbox}
                          label={jobList.value}
                          checked={jobList.label === formik.values.jobType}
                          onClick={() => (
                            formik.setFieldValue('jobType', jobList.label),
                            setchange(true)
                          )}
                        />
                      </Flex>
                    );
                  })}
                </Flex>
              </div>
            </Flex>

            <Flex className={styles.mtstyle}>
              <div className={styles.inputmargin}>
                <Text className={styles.jobTextStyle}>Job posted on</Text>
                <div className={styles.selectoptions}>
                  <SelectTag
                    linechange
                    value={
                      postedOn
                        ? postedOn.find(
                            (option) =>
                              option.value === formik.values.postedOn.value,
                          )
                        : ' '
                    }
                    options={postedOn}
                    onChange={(options) => (
                      formik.setFieldValue('postedOn', options), setchange(true)
                    )}
                  />
                </div>
              </div>
            </Flex>

            <Flex className={styles.mtstyle}>
              <div>
                <Text className={styles.jobTextStyle}>Location</Text>
                <InputSearch
                  initialValue={formik.values.location}
                  placeholder="Enter job location"
                  options={location_list}
                  setFieldValue={formik.setFieldValue}
                  name="location"
                  style={styles.boxstyle}
                  onChange={(event) => {
                    handlechange3(event);
                  }}
                />
              </div>
            </Flex>
            <div className={styles.filterContainers}
            // style={{
            //   padding: '6px',
            //   display: 'flex',
            //   justifyContent: 'center',
            //   alignItems: 'center',
            // }}
            >
              <Button className={styles.buyBtn} onClick={handlechange}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
};

export default MyJobsPostingFilter;
