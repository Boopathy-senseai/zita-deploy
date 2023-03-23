import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../store';
import Flex from '../../../uikit/Flex/Flex';
import Loader from '../../../uikit/Loader/Loader';
import Pangination from '../../../uikit/Pagination/Pangination';
import CareerNavBar from './CareerNavBar';
import CareerViewBanner from './CareerViewBanner';
import { careerViewPageMiddleWare } from './store/middleware/buildyourcareerpagemiddleware';
import styles from './careerviewscreen.module.css';
import CareerViewFooter from './CareerViewFooter';

type ParamsType = {
  pageUrl: string;
};

const CareerViewScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const { pageUrl } = useParams<ParamsType>();
  const [isPage, setPage] = useState(0);

  useEffect(() => {
    dispatch(careerViewPageMiddleWare({ pageUrl, page: isPage + 1 }));
  }, [isPage]);

  const {
    isLoading,
    career_page_setting,
    company_detail,
    jd_form,
    total,
    jd_active,
  } = useSelector(({ careerViewPageReducers }: RootState) => {
    return {
      isLoading: careerViewPageReducers.isLoading,
      career_page_setting: careerViewPageReducers.career_page_setting,
      company_detail: careerViewPageReducers.company_detail,
      jd_form: careerViewPageReducers.jd_form,
      total: careerViewPageReducers.total,
      jd_active: careerViewPageReducers.jd_active,
    };
  });
  const usersPerPage = 20;
  const pageCount = Math.ceil(40 / usersPerPage);

  const handleSetPagination = (a: number) => {
    setPage(a);
  };

  const handleSubmit = (values: any) => {
    dispatch(
      careerViewPageMiddleWare({
        pageUrl,
        job_title: values.job_title,
        job_location: values.job_location,
      }),
    );
  };
  const formik = useFormik({
    initialValues: { job_title: '', job_location: '' },
    onSubmit: handleSubmit,
  });
if(isLoading){
  return <Loader />
}
  return (
    <Flex columnFlex>
      {/* { && <Loader />} */}
      <CareerNavBar
        career_page_setting={career_page_setting}
        company_detail={company_detail}
      />
      <div
        style={{
          height: window.innerHeight - 71,
          overflowY: 'scroll',
          justifyContent: 'space-between',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div>
          <CareerViewBanner
            career_page_setting={career_page_setting}
            jd_form={jd_form}
            total={total}
            formik={formik}
            jd_active={jd_active}
          />
          {total > 20 && (
            <Flex middle className={styles.pagination}>
              <Pangination
                maxPages={pageCount - 1}
                currentPage={isPage}
                setCurrentPage={handleSetPagination}
              />
            </Flex>
          )}
        </div>
        <CareerViewFooter
          career_page_setting={career_page_setting}
          company_detail={company_detail}
        />
      </div>
    </Flex>
  );
};

export default CareerViewScreen;
