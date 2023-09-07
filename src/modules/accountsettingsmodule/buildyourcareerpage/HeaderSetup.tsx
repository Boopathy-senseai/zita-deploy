/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { FormikProps } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { createRef, useEffect, useState } from 'react';
import { AppDispatch } from '../../../store';
import SvgSquare from '../../../icons/SvgSquare';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import {
  ENTER_VALID_URL,
  FILE_2MB,
  imageFileAccept,
  isValidURL,
  JOB_TITLE_LIMIT,
  JOB_TITLE_LIMIT_20,
  mediaPath,
  THIS_FIELD_REQUIRED,
} from '../../constValue';
import { LabelWrapper, Loader, Toast } from '../../../uikit';
import { companyPagePostMiddleWare } from '../store/middleware/accountsettingmiddleware';
import { dashBoardMiddleWare } from '../../dashboardmodule/empdashboard/store/dashboardmiddleware';
import SvgUpload from '../../../icons/SvgUpload';
import { CompanyDetail } from './buildCareerPageTypes';
import ColorPicker from './ColorPicker';
import { formikFormTypes } from './formikTypes';
import styles from './headersetup.module.css';
import { fontSizeOptions } from './mock';
import { buildCareerMiddleWare } from './store/middleware/buildyourcareerpagemiddleware';

type Props = {
  formik: FormikProps<formikFormTypes>;
  company_detail: CompanyDetail;
  setReload: () => void;
};

const HeaderSetup = ({ formik, company_detail, setReload }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isColorOpen, setColorOpen] = useState(false);
  const [isFontColorOpen, setFontColorOpen] = useState(false);
  const myRef = createRef<any>();

  // mouse outside click to close color picker
  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setColorOpen(false);
      setFontColorOpen(false)
    }
  };
  
  const [isShow, setShow] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isMb, setMb] = useState(false);
{console.log("sssssssssss",company_detail)}
  // mouse outside click to close color picker
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
  const handleChangeImag = (e: any) => {
    e.preventDefault();
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));

    if (imageFileAccept.indexOf(fileExt) < 0) {
      if (!isEmpty(fileExt)) {
        alert(
          'Invalid file selected, valid files are of ' +
            imageFileAccept.toString() +
            ' types.',
        );
      }
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
      
    } else {
      
      setLoader(true);
      const formData = new FormData();
      if (e.target.files[0] !== undefined) {
        formData.append('logo', e.target.files[0]);
        formData.append('company_name', company_detail.company_name);
        formData.append('company_website',company_detail.company_website);
        formData.append('contact', company_detail.contact);
        formData.append('industry_type', company_detail.industry_type_id.toString());
        formData.append('no_of_emp', company_detail.no_of_emp.toString());
        formData.append('address', company_detail.address);
        formData.append('country', company_detail.country_id.toString());
        formData.append('state', company_detail.state_id.toString());
        formData.append('city', company_detail.city_id.toString());
        formData.append('zipcode', company_detail.zipcode);
        formData.append('email', company_detail.email);
   
      } else {
        formData.append('image_null', '');
      }
      
      dispatch(
        companyPagePostMiddleWare({
          formData,
        }),
      )
      .then((res: any) => {
        dispatch(dashBoardMiddleWare());
        dispatch(buildCareerMiddleWare())
        if (res.payload.data.success) {
            setLoader(false);
            Toast('Company logo saved successfully', 'LONG', 'success');
          setShow(false);
         // dispatch(companyPageInitalMiddleWare());
        }
      });
      setMb(false);
    }
  };


  const logo =
    company_detail && !isEmpty(company_detail.logo)
      ? company_detail.logo
      : 'logo.png';
  return (
    // <Card className={styles.overAll}>
    <>
      {/* <Text bold size={14}>
        Header Setup
      </Text> */}
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <LabelWrapper label="Font Size">
            <div>
              <SelectTag
                id={'header_setup____headerheading_size'}
                options={fontSizeOptions}
                value={
                  fontSizeOptions
                    ? fontSizeOptions.find(
                        (option) =>
                          option.value === formik.values.headerFontSize,
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('headerFontSize', option.value);
                  setReload();
                }}
              />
            </div>
          </LabelWrapper>
        </Flex>
        <Flex flex={6} className={styles.colorInput} ref={myRef} marginLeft={8}>
          <InputText
            value={formik.values.fontColor.hex}
            label="Font Color"
            required
            onChange={formik.handleChange('fontColor.hex')}
            actionRight={() => (
              <Flex marginTop={-2.5}>
                <Button types="link" onClick={() => setFontColorOpen(!isFontColorOpen)}>
                  <SvgSquare fill={formik.values.fontColor.hex} />
                </Button>
              </Flex>
            )}
          />
          {isFontColorOpen && (
            <div className={styles.colorPicker}>
              <ColorPicker
                colors={formik.values.fontColor}
                onChange={(e: { hex: string }) => {
                  formik.setFieldValue('fontColor.hex', e.hex);
                  setReload();
                }}
              />
            </div>
          )}
          {!isEmpty(formik.values.fontColor.hex) &&
            formik.values.fontColor.hex.length > 20 && (
              <Text size={12} color="error">
                {JOB_TITLE_LIMIT_20}
              </Text>
            )}
          {isEmpty(formik.values.fontColor.hex) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Menu 1"
            value={formik.values.menu1}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu1', e.target.value);
            }}
          />
          {!isEmpty(formik.values.menu1) && formik.values.menu1.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
          {isEmpty(formik.values.menu1) &&
            !isEmpty(formik.values.menu1Url) &&
            formik.values.menu1Url !== 'https://' &&
            !isEmpty(formik.values.menu1Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Menu 1 URL"
            value={formik.values.menu1Url}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu1Url', e.target.value);
            }}
          />
          {!isEmpty(formik.values.menu1) &&
            isValidURL(formik.values.menu1Url) === false &&
            formik.values.menu1Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu1) &&
            formik.values.menu1Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Menu 2"
            value={formik.values.menu2}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu2', e.target.value);
            }}
          />
          {isEmpty(formik.values.menu2) &&
            !isEmpty(formik.values.menu2Url) &&
            formik.values.menu2Url !== 'https://' &&
            !isEmpty(formik.values.menu2Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
          {!isEmpty(formik.values.menu2) && formik.values.menu2.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Menu 2 URL"
            value={formik.values.menu2Url}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu2Url', e.target.value);
            }}
          />
          {!isEmpty(formik.values.menu2) &&
            isValidURL(formik.values.menu2Url) === false &&
            formik.values.menu2Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu2) &&
            !isEmpty(formik.values.menu2Url) &&
            formik.values.menu2Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Menu 3"
            value={formik.values.menu3}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu3', e.target.value);
            }}
          />
          {isEmpty(formik.values.menu3) &&
            formik.values.menu3Url !== 'https://' &&
            !isEmpty(formik.values.menu3Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
          {!isEmpty(formik.values.menu3) && formik.values.menu3.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Menu 3 URL"
            value={formik.values.menu3Url}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('menu3Url', e.target.value);
            }}
          />
          {!isEmpty(formik.values.menu3) &&
            isValidURL(formik.values.menu3Url) === false &&
            formik.values.menu3Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu3) &&
            formik.values.menu3Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} marginRight={8} className={styles.colorInput} ref={myRef} >
          <InputText
            value={formik.values.headerColor.hex}
            label="Header Color"
            required
            onChange={formik.handleChange('headerColor.hex')}
            actionRight={() => (
              <Flex marginTop={-2.5}>
                <Button types="link" onClick={() => setColorOpen(!isColorOpen)}>
                  <SvgSquare fill={formik.values.headerColor.hex} />
                </Button>
              </Flex>
            )}
          />
          {isColorOpen && (
            <div className={styles.headerColorPicker}>
              <ColorPicker
                colors={formik.values.headerColor}
                onChange={(e: { hex: string }) => {
                  formik.setFieldValue('headerColor.hex', e.hex);
                  setReload();
                }}
              />
            </div>
          )}
          {!isEmpty(formik.values.headerColor.hex) &&
            formik.values.headerColor.hex.length > 20 && (
              <Text size={12} color="error">
                {JOB_TITLE_LIMIT_20}
              </Text>
            )}
          {isEmpty(formik.values.headerColor.hex) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </Flex>
        
        <Flex flex={6} marginLeft={8}>
        <Text size={14} color="theme" style={{ marginBottom: '2px' }}>
          {company_detail && !isEmpty(company_detail.logo)
            ? 'Company Logo'
            : 'Add logo in your company profile'}
        </Text>
        <Flex>
        {/* <img
          style={{ objectFit: 'contain' }}
          className={styles.imgStyle}
          src={mediaPath + logo}
          alt="logo"
        /> */}

<>
                 <label
                 htmlFor="upload_profile___bannersetip__img"
                 onMouseEnter={() => setShow(true)}
                 onMouseLeave={() => setShow(false)}
                 style={{ margin: 0 }}
               >
                 <input
                   id="upload_profile___bannersetip__img"
                   type="file"
                   onChange={handleChangeImag}
                   accept="image/*"
                   className={styles.fileStyle}
                 />
                 <Flex className={styles.imgContainer}>
                   {isEmpty(logo) || logo=== 'logo.png' ? (
                     <>
                       {isLoader ? (
                         <Flex center middle>
                           <Loader withOutOverlay size="medium" />
                         </Flex>
                       ) : (
                         <Flex columnFlex center middle>
                           <SvgUpload />
                           <Text
                             color="black"
                             align="center"
                             style={{ paddingLeft: 4, paddingRight: 4 }}
                           >
                             Upload Your Company Logo
                           </Text>
                         </Flex>
                       )}
                     </>
                   ) : (
                     <>
                       {isLoader ? (
                         <Flex center middle>
                           <Loader withOutOverlay size="medium" />
                         </Flex>
                       ) : (
                         <img
                         style={{objectFit: 'cover'}}
                           className={styles.imgStyle}
                           src={mediaPath + logo}
                           alt="profile"
                           //key={Math.random().toString()}
                         />
                       )}
                     </>
                   )}
         
                   {isShow && (
                     <Flex columnFlex center middle className={styles.changeStyle}>
                       <SvgUpload />
                       <Text
                         color="black"
                         align="center"
                         style={{ paddingLeft: 4, paddingRight: 4 }}
                       >
                         {isEmpty(logo) || logo === 'logo.png'
                           ? 'Upload Your Company Logo'
                           : 'Change Company Logo'}
                       </Text>
                     </Flex>
                   )}
                 </Flex>
               </label>
                 {isMb && (
                  <Text size={12} color="error">
                    {FILE_2MB}
                  </Text>
                )}</>

        </Flex>
        
        </Flex>
        
       
      </Flex>
    </>
    // </Card>
  );
};
export function HeaderSetupTitle() {
  return (
    <Text bold size={14}>
      Header Setup
    </Text>
  );
}
export default HeaderSetup;


