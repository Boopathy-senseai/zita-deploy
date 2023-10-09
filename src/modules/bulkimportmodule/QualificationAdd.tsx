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
import { applicantcandidateMatchMiddleWare,candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
import { qualificationOption } from './bulkImportScreenMock';
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

const QualificationAdd = ({
  value,
  searchValue,
  total_count,
  completed,
  jdId,
  incompleted,
  tabKey,
  pageNumber,
}: Props) => {
  const [isInput, setInput] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const myRef = createRef<any>();
  const dispatch: AppDispatch = useDispatch();

  const checkName: any =
    (value && value.qualification === null) ||
    (value && value.qualification && value.qualification === '')
      ? ''
      : value.qualification;

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
      name: 'qualification',
      value: selectValue,
    });

    axios
      .post(uploadedCandidatesApi, data, config)
      .then(() => {
        dispatch(
          candidateMatchMiddleWare({ 
            can_id:id.toString(),
          }),
        ).then((res)=>{
          if(res.payload.success === false){
Toast('Sorry for the inconvinience, The token has been completed.')
          }
        })
        if (tabKey === 'total') {
           if(jdId === undefined){
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              page: pageNumber + 1,
              total: total_count,
            }),
          ).then(() => { 
            Toast('Qualification updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }else{
           dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              jd_id: jdId,
              page: pageNumber + 1,
              total: total_count,
            }),
          ).then(() => { 
            Toast('Qualification updated successfully', 'LONG', 'success');
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
            Toast('Qualification updated successfully', 'LONG', 'success');
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
            Toast('Qualification updated successfully', 'LONG', 'success');
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
            Toast('Qualification updated successfully', 'LONG', 'success');
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
            Toast('Qualification updated successfully', 'LONG', 'success');
            setInput(false);
            setLoader(false);
          });
        }
        }
      })
      .catch(() => {
        Toast(
          'Qualification updated Request failed. Please try again',
          'SHORT',
          'error',
        );
        setLoader(false);
      }).then(()=>{ 
        setTimeout(() =>  dispatch(
          bulkuploadedCandidatesMiddleWare({
            search: searchValue, 
            jd_id:jdId,
            page: pageNumber ,
          })
        ), 1000);  
      }) 
  };
// close input function
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
              style={{width:'100%'}}
            >
              Add Qualification
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
        <div ref={myRef} className={`width73,${cx('inputOverAll')}` } style={{width:'85px'}}>
          <SelectTag
            id={'qualificationAdd__optional'}
            placeholder={'Optional'}
            options={qualificationOption}
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

export default QualificationAdd;
