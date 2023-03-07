import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import { getBlur, getFocus, unlimitedHelper } from '../../uikit/helper';
import Loader from '../../uikit/Loader/Loader';
import { AppDispatch, RootState } from '../../store';
import Title from '../common/Title';
import { ERROR_MESSAGE } from '../constValue';
import {
  bulkImportMiddleWare,
  bulkuploadedCandidatesMiddleWare,
} from './store/middleware/bulkImportMiddleware';
import BulkImportTabs from './BulkImportTabs';
import styles from './bulkimport.module.css';

export type FormProps = {
  searchValue: string;
};
const initial: FormProps = {
  searchValue: '',
};

const BulkImportScreen = () => {
  const [isFeaturesBalance, setFeaturesBalance] = useState<any>(null);
  const [isSearch, setSearch] = useState(1);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(bulkImportMiddleWare());
    dispatch(bulkuploadedCandidatesMiddleWare({}));
  }, []);

  const {
    emp_pool,
    total_count,
    completed,
    incompleted,
    bulkInitalLoader,
    features_balance,
    upDateloader
  } = useSelector(
    ({ bulkUploadedCandidatesReducers, bulkImportReducers }: RootState) => {
      return {
        emp_pool: bulkUploadedCandidatesReducers.emp_pool,
        total_count: bulkUploadedCandidatesReducers.total_count,
        completed: bulkUploadedCandidatesReducers.completed,
        incompleted: bulkUploadedCandidatesReducers.incompleted,
        bulkInitalLoader: bulkImportReducers.isLoading,
        features_balance: bulkImportReducers.features_balance,
        upDateloader: bulkUploadedCandidatesReducers.isLoading,

      };
    },
  );

  useEffect(() => {
    setFeaturesBalance(features_balance);
  }, [features_balance]);

  // Search Submit Function
  const handleSubmit = (values: FormProps) => {
    dispatch(bulkuploadedCandidatesMiddleWare({ search: values.searchValue }))
      .then((response) => {
        setSearch(response.payload.search);
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  // Filter Total Candidates
  const handleTotal = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        total: total_count,
        search: formik.values.searchValue,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  // Filter Completed Candidates
  const handleCompleted = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        completed,
        search: formik.values.searchValue,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };

  // Filter InCompeleted Candidates
  const handleInCompeleted = () => {
    dispatch(
      bulkuploadedCandidatesMiddleWare({
        incompleted,
        search: formik.values.searchValue,
        page: pageNumber + 1,
      }),
    )
      .then(() => {
        getFocus('candidates__input');
        setPageNumber(0);
        getBlur('candidates__input');
      })
      .catch(() => {
        Toast(ERROR_MESSAGE, 'LONG', 'error');
      });
  };
  return (
    <div
      className={styles.overAllContainer}
      style={{ height: window.innerHeight - 86 }}
    >
      <Flex className={styles.overAlll}>
        {bulkInitalLoader && <Loader />}
        <Title
          title={'Bulk Import Candidates'}
          des={
            'Import the resumes and create your own database to match candidates with the posted jobs. You can Import up to 500 resumes at a time.'
          }
        />
        <Flex className={styles.tabFlex}>
          <Text bold className={styles.candidatesText}>
            Candidates Limit: {unlimitedHelper(isFeaturesBalance)}
          </Text>
          <BulkImportTabs
            emp_pool={emp_pool}
            total_count={total_count}
            completed={completed}
            incompleted={incompleted}
            handleTotal={handleTotal}
            handleSubmit={formik.handleSubmit}
            handleCompleted={handleCompleted}
            handleInCompeleted={handleInCompeleted}
            searchValue={formik.values.searchValue}
            searchHandleChange={formik.handleChange('searchValue')}
            features_balance={isFeaturesBalance}
            setFeaturesBalance={setFeaturesBalance}
            isSearch={isSearch}
            formik={formik}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            upDateloader={upDateloader}
          />
        </Flex>
      </Flex>
    </div>
  );
};

export default BulkImportScreen;
