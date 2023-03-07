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
  pageNumber: number;
};

const ExperienceAdd = ({
  value,
  searchValue,
  total_count,
  completed,
  incompleted,
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
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              total: total_count,
            }),
          ).then(() => {
            Toast('Experience Updated Successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        if (tabKey === 'completed') {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              completed,
            }),
          ).then(() => {
            Toast('Experience Updated Successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        if (tabKey === 'inCompleted') {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              incompleted,
            }),
          ).then(() => {
            Toast('Experience Updated Successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
      })
      .catch(() => {
        Toast(
          'Experience Updated Request failed. Please try again',
          'SHORT',
          'error',
        );
        setLoader(false);
      });
  };

  const handleOpenInput = () => {
    setInput(true);
  };
  const handleCloseInput = () => {
    setInput(false);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setInput(false);
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

  const workYear = !isEmpty(formik.values.name)
    ? formik.values.name !== '0 - 1'
      ? `${formik.values.name} Years`
      : `${formik.values.name} Year`
    : '';

  return (
    <div className={styles.overAll}>
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Text
              size={12}
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
                size={12}
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
        <div ref={myRef} className={`width100,${cx('inputOverAll')}`}>
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
      )}
    </div>
  );
};
export default ExperienceAdd;
