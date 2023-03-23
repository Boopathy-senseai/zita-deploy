import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import SvgTickBox from '../../icons/SvgTickBox';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { isEmpty, numberFormat } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { config } from '../constValue';
import { EmpPoolEntity } from './bulkImportTypes';
import styles from './valueAddName.module.css';
import { bulkuploadedCandidatesMiddleWare } from './store/middleware/bulkImportMiddleware';

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

const ContactAdd = ({
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
  const [isError, setError] = useState(false);

  const myRef = createRef<any>();
  const dispatch: AppDispatch = useDispatch();

  const checkName: any =
    (value && value.contact === null) || (value && value.contact === '')
      ? ''
      : value.contact;

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

    if (
      formik.values.name.length >= 7 &&
      numberFormat.test(formik.values.name)
    ) {
      setLoader(true);
      const data = querystring.stringify({
        pk: id,
        name: 'contact',
        value: formik.values.name,
      });

      axios
        .post(uploadedCandidatesApi, data, config)
        .then(() => {
          if (tabKey === 'total') {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                page: pageNumber + 1,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
              setInput(false);
              setLoader(false);
            });
          }
          if (tabKey === 'completed') {
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                page: pageNumber + 1,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
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
              Toast('Contact updated successfully', 'LONG', 'success');
              setInput(false);
              setLoader(false);
            });
          }
        })
        .catch(() => {
          Toast(
            'Contact updated request failed. Please try again',
            'SHORT',
            'error',
          );
          setLoader(false);
        });
    } else {
      setError(true);
    }
  };

  const handleOpenInput = () => {
    setInput(true);
  };
  const handleCloseInput = () => {
    setInput(false);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      formik.setFieldValue('name', value.contact);
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

  useEffect(() => {
    if (
      formik.values.name.length >= 7 &&
      formik.values &&
      numberFormat.test(formik.values.name)
    ) {
      setError(false);
    }
  }, [formik.values.name]);

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
              Add Contact
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
        <div ref={myRef} className={styles.inputOverAll}>
          <InputText
            // eslint-disable-next-line
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            lineInput
            size={12}
            placeholder={'Optional'}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
            id="contactAdd__contactId"
          />
          {isError && (
            <Text size={10} color="error">
              Enter valid contact
            </Text>
          )}
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

export default ContactAdd;
