import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { config } from '../constValue';
import { experienceOption } from './bulkImportScreenMock';
import { EmpPoolEntity } from './bulkImportTypes';
import { bulkuploadedCandidatesMiddleWare } from './store/middleware/bulkImportMiddleware';
import styles from './valueAddName.module.css';

const cx = classNames.bind(styles);

var querystring = require('querystring');

type FormProps = {
  name: string;
};

type Props = {
  value: EmpPoolEntity;
  searchValue: string;
  total_count: number;
  completed: number;
  incompleted: number;
  tabKey: string;
  jdId?: string;
  pageNumber: number;
};

const ExperienceAdd = ({
  value,
  searchValue,
  total_count,
  completed,
  incompleted,
  jdId,
  tabKey,
  pageNumber,
}: Props) => {
  const [isInput, setInput] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const myRef = createRef<any>();
  const dispatch: AppDispatch = useDispatch();

  const checkName: any =
    (value && value.work_exp === null) ||
    (value && value.work_exp && value.work_exp === '')
      ? ''
      : value.work_exp;

  const initial: FormProps = {
    name: checkName,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });
// form submit function
  const handleCellSubmit = (id: number, selectValue: string) => {
    setLoader(true);
    const data = querystring.stringify({
      pk: id,
      name: 'experience',
      value: selectValue,
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then(() => {
        if (tabKey === 'total') {
           if(jdId === undefined){

          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              total: total_count,
            }),
          ).then(() => {
            Toast('Experience updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
           dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id:jdId,
              page: pageNumber + 1,
              total: total_count,
            }),
          ).then(() => {
            Toast('Experience updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        }
        if (tabKey === 'completed') {
            if(jdId === undefined){
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              completed,
            }),
          ).then(() => {
            Toast('Experience updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id:jdId,
              page: pageNumber + 1,
              completed,
            }),
          ).then(() => {
            Toast('Experience updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        }
        if (tabKey === 'inCompleted') {
          if(jdId === undefined){
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              incompleted,
            }),
          ).then(() => {
            Toast('Experience spdated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id: jdId,
              page: pageNumber + 1,
              incompleted,
            }),
          ).then(() => {
            Toast('Experience spdated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        }
      })
      .catch(() => {
        Toast(
          'Experience updated request failed. Please try again',
          'SHORT',
          'error',
        );
        setLoader(false);
      });
  };

  // open input function
  const handleOpenInput = () => {
    setInput(true);
  };
  // close input function
  const handleCloseInput = () => {
    setInput(false);
  };
// outside close input function
  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setInput(false);
    }
  };
// outside close input function
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

  const workYear = !isEmpty(formik.values.name)
    ? formik.values.name !== '0 - 1'
      ? `${formik.values.name} Years`
      : `${formik.values.name} Year`
    : '';

  return (
    <div className={styles.overAll} style={{width:'90%'}}>
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Text
              size={13}
              color="link"
              textStyle="underline"
              onClick={handleOpenInput}
            >
              Add Experience
            </Text>
          )}
        </>
      ) : (
        <>
          {!isInput && (
            <div className={styles.textContainer}>
              <Text
                size={13}
                onClick={handleOpenInput}
                className={styles.nameStyle}
              >
                {workYear}
              </Text>
              <div className={styles.svgEdit}>
                <SvgEdit height={14} width={14} />
              </div>
            </div>
          )}
        </>
      )}
      {isInput && (
        <div ref={myRef} className={`width100,${cx('inputOverAll')}`} style={{width:'85px'}}>
          <SelectTag
            id={'experienceAdd__optional'}
            placeholder={'Optional'}
            options={experienceOption}
            onChange={(option) => {
              formik.setFieldValue('name', option.value);
              handleCellSubmit(value.id, option.value);
            }}
            lineStyle
          />
          <div className={styles.svgContainer1}>
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
      )}
    </div>
  );
};
export default ExperienceAdd;
