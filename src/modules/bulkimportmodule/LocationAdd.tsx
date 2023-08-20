import axios from 'axios';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
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
import { applicantcandidateMatchMiddleWare, candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
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

const LocationAdd = ({
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
  const [hasBeenModified, setHasBeenModified] = useState(false);
  const myRef = createRef<any>();
  const dispatch: AppDispatch = useDispatch();

  const checkName: any =
    (value && value.location === null) ||
    (value && value.location && value.location === '')
      ? ''
      : value.location;

  const initial: FormProps = {
    name: checkName,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });

  // from submit function
  const handleCellSubmit = (event: any, id: number) => {
 
    event.preventDefault();
    setLoader(true);

    var datas = formik.values.name.trim()
    if(datas.length !== 0){
    
     const data = querystring.stringify({
      pk: id,
      name: 'location',
      value: formik.values.name.trim(),
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then(() => {
        dispatch(
          candidateMatchMiddleWare({ 
            can_id: id.toString(),
          }),
        )
        if (tabKey === 'total') {
           if(jdId === undefined){
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              total:total_count
            }),
          ).then(() => {
            Toast('Location updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
              dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id:jdId,
              page: pageNumber + 1,
              total:total_count
            }),
          ).then(() => {
            Toast('Location updated successfully', 'LONG', 'success');
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
            Toast('Location updated successfully', 'LONG', 'success');
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
            Toast('Location updated successfully', 'LONG', 'success');
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
            Toast('Location updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id:jdId,
              page: pageNumber + 1,
              incompleted,
            }),
          ).then(() => {
            Toast('Location updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        }
      })
      .catch(() => {
        Toast(
          'Location updated request failed. Please try again',
          'SHORT',
          'error',
        );
        setLoader(false);
      });
    }else{
      formik.setFieldValue("name",datas)
    }
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
// enter key contact submit function
  const handleKeyPress = (event: { key: string }, id: number) => {
    if (event.key === 'Enter' && formik.values.name !== '') {
      handleCellSubmit(event, id);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;

    if (!hasBeenModified && newValue.trim() === '') {
      return; // Don't update the input if it's just an initial space
    }

    formik.setFieldValue("name",newValue)
    setHasBeenModified(true);
  };

 

  return (
    <div className={styles.overAll}>
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Text
              size={13}
              color="link"
              textStyle="underline"
              onClick={handleOpenInput}
            >
              Add Location
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
            id="locationAdd__locationId"
            // eslint-disable-next-line
            autoFocus
            value={formik.values.name}
            onChange={(e)=>handleInputChange(e)}
            lineInput
            size={13}
            placeholder={'Optional'}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
            style={{width:'67%'}}
          />
          <div className={styles.svgContainer}>
            {isLoader ? (
              <div className={styles.svgTick}> 
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: isEmpty(formik.values.name.trim()),
                  tickStyle: !isEmpty(formik.values.name.trim()),
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
export default LocationAdd;
