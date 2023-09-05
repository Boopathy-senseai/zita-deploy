import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import SvgTickBox from '../../icons/SvgTickBox';
// import SvgView from '../../icons/SvgView';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
// import { LINK } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { config } from '../constValue';
import { candidateMatchMiddleWare } from '../applicantprofilemodule/store/middleware/applicantProfileMiddleware';
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
  jdId?: string;
  completed: number;
  incompleted: number;
  tabKey: string;
  pageNumber: number;
};

const ValueAddName = ({
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
    (value && value.first_name === null) || (value && value.first_name === '')
      ? ''
      : value.first_name;

  const initial: FormProps = {
    name: checkName,
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: () => {},
    enableReinitialize: true,
  });
  // form submit function
  const handleCellSubmit = (event: any, id: number) => {
    event.preventDefault();
    setLoader(true);

    const data = querystring.stringify({
      pk: id,
      name: 'username',
      value: formik.values.name,
    });

    axios.post(uploadedCandidatesApi, data, config).then((res) => {
      if (res.data.email === true) {
        dispatch(
          candidateMatchMiddleWare({
            can_id: id.toString(),
          }),
        );
      }
      if (tabKey === 'total') {
        if (jdId === undefined) {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              total: total_count,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setLoader(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        } else {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              total: total_count,
              jd_id: jdId,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setLoader(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        }
      }
      if (tabKey === 'completed') {
        if (jdId === undefined) {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              completed,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setInput(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        } else {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              completed,
              jd_id: jdId,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setInput(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        }
      }
      if (tabKey === 'inCompleted') {
        if (jdId === undefined) {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              incompleted,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setLoader(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        } else {
          dispatch(
            bulkuploadedCandidatesMiddleWare({
              search: searchValue,
              incompleted,
              jd_id: jdId,
              page: pageNumber + 1,
            }),
          )
            .then(() => {
              Toast('Name updated successfully', 'LONG', 'success');
              setLoader(false);
              setInput(false);
            })
            .catch(() => {
              Toast(
                'Name updated request failed. Please try again',
                'SHORT',
                'error',
              );
              setLoader(false);
            });
        }
      }
    }).then(()=>{
      dispatch(
        bulkuploadedCandidatesMiddleWare({
          search: searchValue, 
          jd_id:jdId,
          page: pageNumber + 1,
        }),
      )
    })
  };
  // open input function
  const handleOpenInput = () => {
    setInput(true);
  };
  // close input function
  const handleCloseInput = () => {
    setInput(false);
    formik.setFieldValue('name', value.first_name);
  };
  // outside close input function
  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      formik.setFieldValue('name', value.first_name);
      setInput(false);
    }
  };
  // outside close input function
  // useEffect(() => {
  //   if (typeof Window !== 'undefined') {
  //     document.addEventListener('click', handleClickOutside, true);
  //   }
  //   return () => {
  //     if (myRef) {
  //       if (typeof Window !== 'undefined') {
  //         document.removeEventListener('click', handleClickOutside, true);
  //       }
  //     }
  //   };
  // });
  // enter key submit function
  const [inputLengthError, setInputLengthError] = useState(false);
  const handleKeyPress = (event: { key: string }, id: number) => {
    if(inputLengthError===false){
    if (event.key === 'Enter' && formik.values.name !== '') {
      handleCellSubmit(event, id);
    }}
  };


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = event.target.value.length;

    // Check if input length exceeds 50 characters
    if (inputLength > 50) {
      setInputLengthError(true);
    } else {
      setInputLengthError(false);
      formik.handleChange('name')(event); // Update the formik value
    }
  };
  return (
    <div className={styles.overAll} style={{ paddingRight: 8 }}>
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Flex>
              <Text
                size={13}
                color="link"
                textStyle="underline"
                onClick={handleOpenInput}
              >
                Add Name
              </Text>
            </Flex>
          )}
        </>
      ) : (
        <>
          {!isInput && (
            <div className={styles.textContainerName}>
              <Text
                size={13}
                onClick={handleOpenInput}
                className={styles.nameStyle}
                style={{ marginRight: 18 }}
              >
                {formik.values.name}
              </Text>
              <div className={styles.svgEditName}>
                <SvgEdit height={14} width={14} />
              </div>
            </div>
          )}
        </>
      )}

      {isInput && (
        <div ref={myRef} className={styles.inputOverAll}>
          <InputText
            id="valueAddName__nameId"
            // eslint-disable-next-line
            autoFocus
            value={formik.values.name}
          //  onChange={formik.handleChange('name')}
          onChange={handleInputChange}
            lineInput
            size={13}
            placeholder={'Required'}
            onKeyPress={(e) => handleKeyPress(e, value.id)}
            style={{ width: '67%' }}
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
          {inputLengthError && (
            <Text
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
              }}
              size={10}
              color="error"
              align="left"
            >
              Email should be a maximum of 50 characters
            </Text>
          )}
        </div>
      )}
    </div>
  );
};

export default ValueAddName;
