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
  jdId?: string;
  pageNumber: number;
};

const ContactAdd = ({
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
  const [isError, setError] = useState(false);
  const [inputLengthError, setInputLengthError] = useState(false);

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

  // contact submit function
  const handleCellSubmit = (event: any, id: number) => {
    event.preventDefault();

    if (
      formik.values.name.length >= 7 ||
      formik.values.name.length <= 15 &&
      numberFormat.test(formik.values.name)
    ) {
      setError(false);
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
             if(jdId === undefined){
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
          }else{
                dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                total: total_count,
                jd_id: jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
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
                completed,
                page: pageNumber + 1,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
              setInput(false);
              setLoader(false);
            });
          }else{
             dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                completed,
                jd_id: jdId,
                page: pageNumber + 1,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
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
              Toast('Contact updated successfully', 'LONG', 'success');
              setInput(false);
              setLoader(false);
            });
          }else{
              dispatch(
              bulkuploadedCandidatesMiddleWare({
                search: searchValue,
                page: pageNumber + 1,
                jd_id:jdId,
                incompleted,
              }),
            ).then(() => {
              Toast('Contact updated successfully', 'LONG', 'success');
              setInput(false);
              setLoader(false);
            });
          }
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

  // open input function
  const handleOpenInput = () => {
    setInput(true);
    formik.resetForm();
    setError(false);
  };
  // close input function
  const handleCloseInput = () => {
    setInput(false);
    formik.resetForm();
  };
  // outside close input function

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      let contactValue = value.contact;
  
      if (contactValue === null) {
        contactValue = '';
      }
      if (contactValue !== null) {
        formik.setFieldValue('name', contactValue);
      }
  
      setInput(false);
    }
  }
  
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
    if(inputLengthError===false){
    if (event.key === 'Enter' && formik.values.name !== '') {
      handleCellSubmit(event, id);
    }}
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

  // const numberchange=(e:any)=>{
  //   const newValue = e.target.value;
  //   // Apply your validation rules
  //   if (/^\d{0,15}$/.test(newValue)) {
  //   formik.setFieldValue("name",newValue)
  //   setInputLengthError(false)
  //   }
  //   else{
  //     //setInputLengthError(true)
  //   }
  //}
  

//   const numberchange = (e: any) => {
//     let newValue = e.target.value;
//     console.log(newValue);
    
//     if (newValue && typeof newValue === 'string') {
//       newValue = newValue.replace('+91 -', '');
//     }
//     const cleanValue = newValue.replace(/\D/g, '');

//     formik.setFieldValue("name", cleanValue);
  
//     const isOnlyDigits = /^\d+$/.test(cleanValue);

//     const isWithinMaxLength = cleanValue.length <= 15;
    
//     if (isOnlyDigits && isWithinMaxLength) {
//       setInputLengthError(false);
//     } else {
//       setInputLengthError(true);
//     }
// };

const numberchange = (e: any) => {
  let newValue = e.target.value;
  console.log(newValue);

  if (!newValue || typeof newValue !== 'string' || newValue === '+91 -') {
    setInputLengthError(false);
    formik.setFieldValue("name", "");
    return;
  }
  
  newValue = newValue.replace('+91 -', '');
  const cleanValue = newValue.replace(/\D/g, '');

  formik.setFieldValue("name", cleanValue);

  const isOnlyDigits = /^\d+$/.test(cleanValue);
  const isWithinMaxLength = cleanValue.length <= 15;

  if (isOnlyDigits && isWithinMaxLength) {
    setInputLengthError(false);
  } else {
    setInputLengthError(true);
  }
};




  return (
    <div className={styles.overAll}>
      {console.log(formik.values.name,"ˇˇǚformik.values.nameformik.values.nameformik.values.name")}
      {console.log("front",value)}
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Text
              size={13}
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
                size={13}
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
            maxLength={16}
            value={formik.values.name}
            onChange={(e)=>numberchange(e)}
            lineInput
            size={13}
            placeholder={'Optional'}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
            id="contactAdd__contactId"
            style={{width:'66%'}}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              zIndex: 11
            }}
            className={styles.svgContainer}
          >
            
            <div style={{ display: 'flex', flexDirection: 'row' }}>
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
        </div>
      )}
         {inputLengthError && (
        <Text style={{
          display: "flex",
          alignSelf: 'flex-start'
        }} size={10} color="error">
          Contact should be a maximum of 15 characters
        </Text>
      )}
      {isError && (
              <Text style={{
                display: "flex",
                alignSelf: 'flex-start'
              }} size={10} color="error">
                Enter valid contact
              </Text>
            )}
    </div>
  );
};

export default ContactAdd;
