/* eslint-disable */
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FormikProps, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ErrorMessage } from '../../uikit';
import { enterKeyPress, isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import { config } from '../constValue';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import Toast from '../../uikit/Toast/Toast';
import { AppDispatch } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import { workYear } from '../common/commonHelper';
import { DataEntity } from './myDataBaseTypes';
import { MyDataFormProps } from './MyDataBaseScreen';
import { experienceOptionAdd } from './mock';
import { useForm } from '../../hooks/useForm';
import styles from './locationcontainer.module.css';
import { myDataBaseDataMiddleWare } from './store/middleware/mydatabasemiddleware';

const cx = classNames.bind(styles);

var querystring = require('querystring');

export type FormProps = {
  location: string;
  experience: string;
};

type Props = {
  dataList: DataEntity;
  filterFormik: FormikProps<MyDataFormProps>;
  qaValue: string;
  skillsOptionsList: any;
  tabKey: string;
  isFav: boolean;
  isSortOptions: {
    value: string;
    label: string;
  };
  isPage: number;
};



const LocationContainer = ({
  dataList,
  filterFormik,
  qaValue,
  skillsOptionsList,
  tabKey,
  isFav,
  isSortOptions,
  isPage,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLocationInput, setLocationInput] = useState(false);
  const [isExperienceInput, setExperienceInput] = useState(false);
  const [isLocationLoader, setLocationLoader] = useState(false);
  const [isExperienceLoader, setExperienceLoader] = useState(false);

  const myRefLocation = createRef<any>();
  const myRefExperience = createRef<any>();
  const addFav = isFav ? 'add' : '';

  const handleOpenLocationInput = (values: { location: string }) => {
    setLocationInput(true);
    const errors: Partial<{ location: string }> = {};
    if (isEmpty(values.location) || values?.location.trim() === '') {
      errors.location = '';
    }
    return errors;
  };
  const toggleStage = () => {
    setLocationInput(true);
    formik.resetForm();
  };

  const handleCloseLocationInput = () => {
    setLocationInput(false);
  };

  const handleCloseExperienceInput = () => {
    setExperienceInput(false);
  };
  
  const handleClickOutside = (event: { target: any }) => {
    if (
      myRefLocation.current &&
      !myRefLocation.current.contains(event.target)
    ) {
      handleCloseLocationInput();
    }
  };
  const handleClickOutsideExp = (event: { target: any }) => {
    if (
      myRefExperience.current &&
      !myRefExperience.current.contains(event.target)
    ) {
      handleCloseExperienceInput();
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRefLocation) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutsideExp, true);
    }
    return () => {
      if (myRefExperience) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutsideExp, true);
        }
      }
    };
  });

  const initial: FormProps = {
    location: dataList.location,
    experience: dataList.work_exp,
  };

  const formik = useFormik<{ location: string }>({
    initialValues: initial,
    validate: handleOpenLocationInput,
    onSubmit: (dataList) => {
      location:dataList.location.trim()
    toggleStage();
    }
  });

  // Location from submit function
  const handleLocationSubmit = () => {
    if (formik.values.location !== '') {
      setLocationLoader(true);
      const data = querystring.stringify({
        pk: dataList.id,
        name: 'location',
        value: formik.values.location,
      });

      axios
        .post(uploadedCandidatesApi, data, config)
        .then(() => {
          setLocationLoader(false);
          dispatch(
            myDataBaseDataMiddleWare({
              jobTitle: filterFormik.values.jobTitle,
              fav: addFav,
              experience: filterFormik.values.experience.value,
              educationLevel: qaValue,
              typeofJob: filterFormik.values.jobType,
              location: filterFormik.values.locationSearch,
              skill_match: skillsOptionsList,
              relocate: filterFormik.values.reLocateValue,
              candidate: filterFormik.values.searchValue,
              userType: tabKey,
              sort: isSortOptions.value,
              page: isPage + 1,
              applicant_only: filterFormik.values.applicantOnly,
            }),
          ).then(() => {
            handleCloseLocationInput();
            Toast('Location updated successfully', 'LONG', 'success');
          });
        })
        .catch(() => {
          setLocationLoader(false);
          Toast(
            'Location updated request failed. Please try again',
            'SHORT',
            'error',
          );
        });
    }
  };
  // Experience from submit function
  const handleExperienceSubmit = (id: number, selectValue: string) => {
    setExperienceLoader(true);
    const data = querystring.stringify({
      pk: id,
      name: 'experience',
      value: selectValue,
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then(() => {
        setExperienceLoader(false);
        dispatch(
          myDataBaseDataMiddleWare({
            jobTitle: filterFormik.values.jobTitle,
            fav: addFav,
            experience: filterFormik.values.experience.value,
            educationLevel: qaValue,
            typeofJob: filterFormik.values.jobType,
            location: filterFormik.values.locationSearch,
            skill_match: skillsOptionsList,
            relocate: filterFormik.values.reLocateValue,
            candidate: filterFormik.values.searchValue,
            userType: tabKey,
            sort: isSortOptions.value,
            page: isPage + 1,
            applicant_only: filterFormik.values.applicantOnly,
          }),
        ).then(() => {
          handleCloseExperienceInput();
          Toast('Experience updated successfully', 'LONG', 'success');
        });
      })
      .catch(() => {
        Toast(
          'Experience Updated Request failed. Please try again',
          'SHORT',
          'error',
        );
        setExperienceLoader(false);
      });
  };

  return (
    <>
      {dataList.can_source_id !== 1 && (
        <>
          {dataList.work_exp === 'Not Specified' ? (
            <Text
              textStyle="ellipsis"
              size={11}
              color="black_1"
              className={styles.marginTop}
              title= {`Location: ${dataList?.location}`}
            >
              {notSpecified(dataList.location)}
            </Text>
          ) : (
            <Flex row center className={styles.marginTop}>
              <Text
                size={11}
                color="black_1"
                className={styles.locationtab}
                title= {`Location: ${dataList?.location}`}
              >
                {notSpecified(dataList.location)}
              </Text>
            </Flex>
          )}
        </>
      )}

      {dataList.can_source_id === 1 && (
        <Flex row center className={cx('marginTop', 'width85')}>
          {!isLocationInput ? (
            <>
              {isEmpty(dataList.location) ? (
                <Text
                  size={11}
                  color="link"
                  textStyle="ellipsis"
                  underLine
                  onClick={handleOpenLocationInput}
                >
                  Add Location
                </Text>

              ) : (
                <Text
                  title={`Location: ${dataList.location}`}
                  textStyle="ellipsis"
                  size={11}
                  color="primary"
                  onClick={handleOpenLocationInput}
                  underLine
                  className={styles.locationStyle}
                >
                  {dataList.location}
                </Text>
              )}
            </>
          ) : (
            <>
              <div ref={myRefLocation} className={styles.inputOverAll}>
                <InputText
                  autoFocus
                  className={styles.locationinput}
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange('location')}
                  lineInput
                  size={11}
                  // onKeyPress={(e) => enterKeyPress(e, handleLocationSubmit)}
                  // onKeyPress={handleKeyPress}
                  onBlur={formik.handleBlur}
                />
              <ErrorMessage
                      touched={formik.touched}
                      errors={formik.errors}
                      name="location"
                    />
                {/* <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {isLocationLoader ? (
                    <div>
                      <div className={styles.locationloader}><Loader withOutOverlay size={'small'} /></div>
                    </div>
                  ) : (
                    <div
                      className={cx('svgTickMargin', {
                        svgTickDisable: !formik.isValid,
                        tickStyle: !isEmpty(formik.values.location),
                      })}
                      onClick={handleLocationSubmit}
                      tabIndex={-1}
                      role={'button'}
                    >
                      <SvgTickBox />
                    </div>
                  )}

                  <div
                    className={styles.svgClose}
                    onClick={handleCloseLocationInput}
                    tabIndex={-1}
                    role={'button'}
                    onKeyPress={() => { }}
                  >
                    <SvgCloseBox className={styles.tickStyle} />
                  </div>
                </div> */}
              <div className={styles.svgContainer}>
              {isLocationLoader ? (
                <div className={styles.svgTick}>
                  <Loader withOutOverlay size={'small'} />
                </div>
              ) : (
                <div
                className={cx('svgTickMargin', {
                  svgTickDisable: !formik.isValid,
                  tickStyle: !isEmpty(formik.values.location),
                  })}
                  onClick={handleLocationSubmit}
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                >
                  <SvgTickBox />
                </div>
              )} 
              <div
                className={styles.svgClose}
                tabIndex={-1}
                onClick={handleCloseLocationInput}
                role={'button'}
                onKeyPress={() => {}}
              >
                <SvgCloseBox className={styles.tickStyle} />
              </div>
              </div>
              </div>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default LocationContainer;
