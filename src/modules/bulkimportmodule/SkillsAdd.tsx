import axios from 'axios';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import SvgTickBox from '../../icons/SvgTickBox';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { config } from '../constValue';
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

const SkillsAdd = ({
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
    (value && value.skills === null) ||
    (value && value.skills && value.skills === '')
      ? ''
      : value.skills;

  const initial: FormProps = {
    name: checkName,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  const handleCellSubmit = (event: any, id: number) => {
    event.preventDefault();
    setLoader(true);
    const data = querystring.stringify({
      pk: id,
      name: 'skills',
      value: formik.values.name,
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
            Toast('Skills updated successfully', 'LONG', 'success');
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
            Toast('Skills updated successfully', 'LONG', 'success');
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
            Toast('Skills updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
      })
      .catch(() => {
        Toast(
          'Skills updated request failed. Please try again',
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

  const handleKeyPress = (event: { key: string }, id: number) => {
    if (event.key === 'Enter' && formik.values.name !== '') {
      handleCellSubmit(event, id);
    }
  };

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
              Add Skills
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
                {formik.values.name}
              </Text>
              <div className={styles.svgEdit}>
                <SvgEdit height={14} width={14} />
              </div>
            </div>
          )}
        </>
      )}
      {isInput && (
        <div
          ref={myRef}
          style={{ display: 'inline-grid', position: 'relative' }}
        >
          <InputText
            id="skillsAdd__skillId"
            // eslint-disable-next-line
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            lineInput
            size={12}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
          />
          <div className={styles.svgContainer}>
            {isLoader ? (
              <div className={styles.svgTick}>
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: isEmpty(formik.values.name),
                  tickStyle: !isEmpty(formik.values.name),
                })}
                onClick={(e) => handleCellSubmit(e, value.id)}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
              >
                <SvgTickBox className={styles.tickStyle} />
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

export default SkillsAdd;
