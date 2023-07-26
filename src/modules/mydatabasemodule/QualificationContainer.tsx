import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { FormikProps, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import Loader from '../../uikit/Loader/Loader';
import Toast from '../../uikit/Toast/Toast';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import SvgCloseBox from '../../icons/SvgCloseBox';
import { isEmpty, notSpecified } from '../../uikit/helper';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import { Flex } from '../../uikit';
import Text from '../../uikit/Text/Text';
import { config } from '../constValue';
import { qualificationOption } from '../bulkimportmodule/bulkImportScreenMock';
import { workYear } from '../common/commonHelper';
import { experienceOptionAdd } from './mock';
import { DataEntity } from './myDataBaseTypes';
import styles from './qualificationcontainer.module.css';
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line
import { myDataBaseDataMiddleWare } from './store/middleware/mydatabasemiddleware';


var querystring = require('querystring');

const cx = classNames.bind(styles);


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

type FormProps = {
  name: string;
  experience: string;
};

const QualificationContainer = ({
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
  const [isInput, setInput] = useState(false);
  const myRef = createRef<any>();
  const myRefExperience = createRef<any>();
  const [isLoader, setLoader] = useState(false);
  const addFav = isFav ? 'add' : '';
  const [isExperienceInput, setExperienceInput] = useState(false);
  const [isExperienceLoader, setExperienceLoader] = useState(false);

  const handleOpenExperienceInput = () => {
    setExperienceInput(true);
  };
  const handleCloseExperienceInput = () => {
    setExperienceInput(false);
  };
  const handleOpenInput = () => {
    setInput(true);
  };
  const handleCloseInput = () => {
    setInput(false);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      handleCloseInput();
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

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
    name: dataList.qualification,
    experience: dataList.work_exp,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });

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

// qulification form submit function
  const handleCellSubmit = (id: number, selectValue: string) => {
    setLoader(true);
    const data = querystring.stringify({
      pk: id,
      name: 'qualification',
      value: selectValue,
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then(() => {
        handleCloseInput();
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
          Toast('Qualification updated successfully', 'LONG', 'success');
        });
      })
      .catch(() => {
        Toast(
          'Qualification updated Request failed. Please try again',
          'SHORT',
          'error',
        );
        setLoader(false);
      });
  };

  return (
    <>
      {dataList.can_source_id !== 1 && (
        <>
          <Flex row center className={styles.marginTop}>
              <Text
                // textStyle="ellipsis"
                size={11}
                color="gray"
                className={styles.cardaqualification}
                title={`Qualification: ${dataList.qualification}`}
              >
              {notSpecified(dataList.qualification)}
              </Text>
              <Text className={styles.slace} size={11} color="gray" >
                |
              </Text>
              <Text 
                title={`Experience: ${workYear(dataList.work_exp)}`}
                className={styles.textworkexp} size={11} color="gray" >
                {notSpecified(workYear(dataList.work_exp))}
              </Text>
          </Flex>
        </>
      )}
        {isInput ? (
          <div ref={myRef} className={cx('inputOverAll')} >
            <SelectTag
              id={'qualificationAdd__optional'}
              placeholder={'Optional'}
              options={qualificationOption}
              onChange={(option) => {
                formik.setFieldValue('name', option.value);
                handleCellSubmit(dataList.id, option.value);
              }}
              lineStyle
            />
            <div className={styles.svgContainer}>
              {isLoader && (
                <div className={styles.svgTick}>
                  <Loader withOutOverlay size={'small'} />
                </div>
              )}
              <div
                className={styles.svgClose}
                onClick={handleCloseInput}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
              >
                <SvgCloseBox className={styles.tickStyle} />
              </div>
            </div>
          </div>
        ) : (
          <>
            {dataList.can_source_id === 1 && (
              <Flex row center className={cx('marginTop', 'width85')}>
              {isEmpty(dataList.qualification) ? (
                <Text
                  size={11}
                  color="link"
                  underLine
                  className={styles.marginTop}
                  onClick={handleOpenInput}
                >
                  Add Qualification
                </Text>
              ) : (
                <Text
                  textStyle="ellipsis"
                  size={11}
                  color="gray"
                  className={`pointer {cx('marginTop')}`}
                  underLine
                  onClick={handleOpenInput}
                >
                  {dataList.qualification}
                </Text>
                
                )}
                <Text size={11} color="gray" className={styles.slace}>
                  |
                </Text>
                {!isExperienceInput ? (
            <>
            <div style={{width:'fit-content'}}>
              {isEmpty(dataList.work_exp) ? (
                <Text
                  underLine
                  size={11}
                  color="link"
                  className={styles.experienceinput}
                  onClick={handleOpenExperienceInput}
                  textStyle="ellipsis"
                >
                  Add Experience
                </Text>
              ) : (
                <div style={{width:'70px'}}>
                <Text
                  // textStyle="ellipsis"
                  size={11}
                  color="gray"
                  onClick={handleOpenExperienceInput}
                  underLine
                  className={'pointer'}
                >
                  {workYear(dataList.work_exp)}
                </Text>
                </div>
              )}              
              </div>
            </>
          ) : (
            <div
              ref={myRefExperience}
              style={{ width:'', right:"90px" }}
              className={cx('inputOverAll')}
            >
              <SelectTag
                id={'experienceAdd__optional'}
                placeholder={'Optional'}
                options={experienceOptionAdd}
                onChange={(option) => {
                  formik.setFieldValue('name', option.value);
                  handleExperienceSubmit(dataList.id, option.value);
                }}
                lineStyle
              />
              <div className={styles.svgContainer}>
                {isExperienceLoader && (
                  <div className={styles.svgTick}>
                    <Loader withOutOverlay size={'small'} />
                  </div>
                )}

                <div
                 style={{marginTop: '0px', marginRight: '7px'}}
                  className={styles.svgClose}
                  onClick={handleCloseExperienceInput}
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                >
                  <SvgCloseBox className={styles.tickStyle} />
                </div>
              </div>
            </div>
          )}
        </Flex>
      )}
    </>
  )}
</>
  );
}; 

export default QualificationContainer;
