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
  document.title = 'Careers';

  useEffect(() => {
    localStorage.setItem('freeCheck', 'true');
  }, []);
  const getLoginUserId: any =
    localStorage.getItem('loginUserId') !== null
      ? localStorage.getItem('loginUserId')
      : '0';

  useEffect(() => {
    dispatch(
      careerViewPageMiddleWare({
        pageUrl,
        page: isPage + 1,
        user_id: getLoginUserId,
      }),
    );
  }, [isPage]);

  const {
    isLoading,
    career_page_setting,
    company_detail,
    jd_form,
    total,
    jd_active,
    login_user,
    user_detail,
    image,
  } = useSelector(({ careerViewPageReducers }: RootState) => {
    return {
      isLoading: careerViewPageReducers.isLoading,
      career_page_setting: careerViewPageReducers.career_page_setting,
      company_detail: careerViewPageReducers.company_detail,
      jd_form: careerViewPageReducers.jd_form,
      total: careerViewPageReducers.total,
      jd_active: careerViewPageReducers.jd_active,
      login_user: careerViewPageReducers.login_user,
      user_detail: careerViewPageReducers.user_detail,
      image: careerViewPageReducers.image,
    };
  });

  const usersPerPage = 20;
  const pageCount = Math.ceil(40 / usersPerPage);

  const handleSetPagination = (a: number) => {
    setPage(a);
  };

  // formik submit
  const handleSubmit = (values: any) => {
    dispatch(
      careerViewPageMiddleWare({
        pageUrl,
        job_title: values.job_title,
        job_location: values.job_location,
        user_id: getLoginUserId,
      }),
    );
  };
  const formik = useFormik({
    initialValues: { job_title: '', job_location: '' },
    onSubmit: handleSubmit,
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Flex columnFlex>
      <CareerNavBar
        career_page_setting={career_page_setting}
        company_detail={company_detail}
        loginUser={login_user ? false : true}
        fName={user_detail && user_detail.first_name}
        lName={user_detail && user_detail.last_name}
        image={image}
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
