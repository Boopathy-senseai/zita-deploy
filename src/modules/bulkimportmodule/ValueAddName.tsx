import axios from 'axios';
import classNames from 'classnames/bind';
import { useFormik } from 'formik';
import { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgEdit from '../../icons/SvgEdit';
import SvgExternal from '../../icons/SvgExternal';
import SvgTickBox from '../../icons/SvgTickBox';
import { uploadedCandidatesApi } from '../../routes/apiRoutes';
import { AppDispatch } from '../../store';
import Flex from '../../uikit/Flex/Flex';
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
  hanldeProfileView: (arg: number) => void;
  searchValue: string;
  total_count: number;
  completed: number;
  incompleted: number;
  tabKey: string;
  pageNumber: number;
};

const ValueAddName = ({
  value,
  hanldeProfileView,
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

  const handleCellSubmit = (event: any, id: number) => {
    event.preventDefault();
    setLoader(true);

    const data = querystring.stringify({
      pk: id,
      name: 'username',
      value: formik.values.name,
    });

    axios.post(uploadedCandidatesApi, data, config).then(() => {
      if (tabKey === 'total') {
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
      }
      if (tabKey === 'completed') {
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
      }
      if (tabKey === 'inCompleted') {
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
      }
    });
  };

  const handleOpenInput = () => {
    setInput(true);
  };

  const handleCloseInput = () => {
    setInput(false);
    formik.setFieldValue('name', value.first_name);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      formik.setFieldValue('name', value.first_name);
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
    <div className={styles.overAll} style={{ paddingRight: 8 }}>
      {isEmpty(formik.values.name) ? (
        <>
          {!isInput && (
            <Flex row between>
              <Text
                size={12}
                color="link"
                textStyle="underline"
                onClick={handleOpenInput}
              >
                Add Name
              </Text>
              <div
                title="Open profile in a new window"
                className={styles.svgExternal}
                onClick={() => {
                  hanldeProfileView(value.id);
                }}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
              >
                <SvgExternal width={14} height={14} />
              </div>
            </Flex>
          )}
        </>
      ) : (
        <>
          {!isInput && (
            <div className={styles.textContainerName}>
              <Text
                size={12}
                onClick={handleOpenInput}
                className={styles.nameStyle}
                style={{ marginRight: 18 }}
              >
                {formik.values.name}
              </Text>
              <div className={styles.svgEditName}>
                <SvgEdit height={14} width={14} />
              </div>
              <div
                title="Open profile in a new window"
                onClick={(e) => {
                  e.preventDefault();
                  hanldeProfileView(value.id);
                }}
                className={styles.svgExternal}
                tabIndex={-1}
                role={'button'}
                onKeyPress={() => {}}
              >
                <SvgExternal width={14} height={14} />
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
            onChange={formik.handleChange('name')}
            lineInput
            size={12}
            placeholder={'Required'}
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
      )}
    </div>
  );
};

export default ValueAddName;
