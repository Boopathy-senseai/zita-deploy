import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import SvgTickBox from '../../icons/SvgTickBox';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import { isEmpty, mailformat } from '../../uikit/helper';
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
  mail: string;
};

type Props = {
  value: EmpPoolEntity;
  searchValue: string;
  total_count: number;
  completed: number;
  incompleted: number;
  jdId?:string,
  tabKey: string;
  pageNumber: number;
};

const EmailAdd = ({
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
  const [isError, setError] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [isEmailId,setEmailId]=useState(false)
  const myRef = createRef<any>();

  const checkName: any =
    (value && value.email === null) || (value && value.email === '')
      ? ''
      : value.email;

  const initial: FormProps = {
    mail: checkName,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  // email submit function
  const handleCellSubmit = (event: any, id: number) => {
    if (formik.values.mail.match(mailformat)) {
      setLoader(true);
      event.preventDefault();

      const data = querystring.stringify({
        pk: id,
        name: 'email',
        value: formik.values.mail,
      });

      axios
        .post(uploadedCandidatesApi, data, config)
        .then((response) => {
          if (tabKey === 'total') {
            if(jdId === undefined){

            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
            }else{
               dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                jd_id:jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
            }
          }

          if (tabKey === 'completed') {
              if(jdId === undefined){
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
          }else{
             dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                jd_id:jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
          }
          }

          if (tabKey === 'inCompleted') {
              if(jdId === undefined){
            dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                incompleted,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
          }else{
              dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                incompleted,
                jd_id:jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              if (response.data.success === true) {
                setEmailId(false)
                Toast('Email updated successfully', 'LONG', 'success');
                setInput(false);
              }
              setLoader(false);
            });
          }
          }

          if (response.data.success === false) {
            setEmailId(true)
          }
        })
        .catch(() => {
          setLoader(false);
          Toast(
            'Email udated request failed. Please try again',
            'SHORT',
            'error',
          );
        });
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (formik.values.mail && formik.values.mail.match(mailformat)) {
      setError(false);
    }
  }, [formik.values.mail]);
 // open input function
  const handleOpenInput = () => {
    setInput(true);
  };
 // close input function
  const handleCloseInput = () => {
    formik.setFieldValue('mail', value.email);
    setInput(false);
    formik.resetForm();
    setEmailId(false)
  };
// outside close input function
  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      formik.setFieldValue('mail', value.email);
      setEmailId(false)
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
// enter key contact submit function
  const handleKeyPress = (event: { key: string }, id: number) => {
    if (event.key === 'Enter' && formik.values.mail !== '') {
      handleCellSubmit(event, id);
    }
  };

  return (
    <div className={styles.overAll}>
      {isEmpty(formik.values.mail) ? (
        <>
          {!isInput && (
            <Text
              size={13}
              color="link"
              textStyle="underline"
              onClick={handleOpenInput}
            >
              Add Email
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
                {formik.values.mail}
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
            id="emailAdd__emailID"
            placeholder={'Required'}
            // eslint-disable-next-line
            autoFocus
            value={formik.values.mail}
            onChange={formik.handleChange('mail')}
            lineInput
            size={13}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
            style={{width:'67%'}}
          />
          {isError && (
            <Text style={{
              display: "flex",
              alignSelf: 'flex-start'
            }} size={10} color="error" align='left'>
              Enter valid email
            </Text>
          )}
          {
            !isEmpty(formik.values.mail) && isEmailId &&
            <Text  style={{
              display: "flex",
              alignSelf: 'flex-start'
            }} size={10} color="error" align='left'>
              Email already exists
            </Text>
          }

          <div
            className={styles.svgContainer}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              zIndex: 11
            }}
          >
           
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {isLoader ? (
                <div className={styles.svgTick}>
                  <Loader withOutOverlay size={'small'} />
                </div>
              ) : (
                <div
                  className={cx('svgTickMargin', {
                    svgTickDisable: isEmpty(formik.values.mail),
                    tickStyle: !isEmpty(formik.values.mail),
                  })}
                  onClick={(e) => handleCellSubmit(e, value.id)}
                  tabIndex={-1}
                  role={'button'}
                  onKeyPress={() => {}}
                >
                  <SvgTickBox />
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
        </div>
      )}
    </div>
  );
};
export default EmailAdd;
