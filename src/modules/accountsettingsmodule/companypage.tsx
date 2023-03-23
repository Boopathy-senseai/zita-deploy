import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {  useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { AppDispatch, RootState } from '../../store';
import 'react-phone-input-2/lib/style.css';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Loader from '../../uikit/Loader/Loader';
import SelectTag from '../../uikit/SelectTag/SelectTag';
// import {
//   isValidURL,
//   THIS_FIELD_REQUIRED,
//   mediaPath,
//   ENTER_VALID_URL,
// } from '../constValue';
import { FILE_2MB, imageFileAccept, 
 isValidURL,
  THIS_FIELD_REQUIRED,
  mediaPath,
  ENTER_VALID_URL, } from '../../modules/constValue';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
// import ImageUpload from '../../uikit/ImageUpload/ImageUpload';
import Button from '../../uikit/Button/Button';
import Toast from '../../uikit/Toast/Toast';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
// import SvgCloseSmall from '../../icons/SvgCloseSmall';
import SvgUpload from '../../icons/SvgUpload';
import useUnsavedChangesWarning from '../common/useUnsavedChangesWarning';
import { industryType } from './mock';
import styles from './companypage.module.css';
import {
  locationCityMiddleWare,
  locationStateMiddleWare,
  locationMiddleWare,
} from './../createjdmodule/store/middleware/createjdmiddleware';
import {
  companyPageInitalMiddleWare,
  companyPagePostMiddleWare,
} from './store/middleware/accountsettingmiddleware';
import { CountryEntity, StateEntity, CityEntity } from './CompanyPageTypes';


type Props = {
  setKey: (a:string) => void
};


const CompanyPage = ({ setKey }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);

  const [getState, setState] = useState<StateEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [fileurl, setFileurl] = useState<any>([]);
  // const [isContact, setContact] = useState<any>([]);
const [isShow, setShow] = useState(false);
  const [isMb, setMb] = useState(false);
  // const [isbutton, setbuttom] = useState(true);
    const [isload, setload] = useState(false);
    const history = useHistory();




  type CompanyPage = {
    company_name: string;
    company_website: string;
    email: string;
    contact: string;
    industry_type_id: string;
    no_of_emp: string;
    address: string;
    country_id: string;
    state_id: string;
    city_id: string;
    zipcode: string;
    logo: string;
  };

  const initial: CompanyPage = {
    company_name: '',
    company_website: '',
    email: '',
    contact: '',
    industry_type_id: '',
    no_of_emp: '',
    address: '',
    country_id: '',
    state_id: '',
    city_id: '',
    zipcode: '',
    logo: '',
  };


   useEffect(() => {
    dispatch(companyPageInitalMiddleWare());
    dispatch(locationMiddleWare({}));
  }, []);

  const { countryid, isLoading, company_detail,build_career_page  } =
    useSelector(({ companyPageReducers, locationReducers }: RootState) => ({
      countryid: locationReducers.country,
      isLoading: companyPageReducers.isLoading,
      company_detail: companyPageReducers.company_detail,
      build_career_page: companyPageReducers.build_career_page,
    }));
 const handleChangeImag = (e: any) => {
    e.preventDefault();
    var fileExt = e.target.value;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (imageFileAccept.indexOf(fileExt) < 0) {
      alert(
        'Invalid file selected, valid files are of ' +
          imageFileAccept.toString() +
          ' types.',
      );
    } else if (e.target.files && e.target.files[0].size / 1024 / 1024 > 2) {
      setMb(true);
    } else {
      let reader = new FileReader();
      reader.onloadend = () => {
        setFileurl({
          file: e.target.files[0],
          imagePreviewUrl: reader.result,
        });
      };
      formik.setFieldValue('logo', e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      setMb(false);
      // setbuttom(false);
      onDirty()
    }
  };
  const hanldeSubmitform = (values: CompanyPage) => {
    const formData = new FormData();
    setload(true);
    if (fileurl.file !== undefined) {
     formData.append('logo', fileurl.file);
    }
    formData.append('company_name', values.company_name);
    formData.append('company_website', values.company_website);
    formData.append('email', values.email);
    formData.append('contact', values.contact);
    formData.append('industry_type', values.industry_type_id);
    formData.append('no_of_emp', values.no_of_emp);
    formData.append('address', values.address);
    formData.append('country', values.country_id);
    formData.append('state', values.state_id);
    formData.append('city', values.city_id);
    formData.append('zipcode', values.zipcode);
    dispatch(
      companyPagePostMiddleWare({
        formData,
      }),
    );
    onPristine();
     setload(false);
    Toast('Details saved successfully', 'LONG', 'success');
    if(build_career_page === false){

     setKey('1');
    }

  };

  const handleCompanyPageValid = (values: CompanyPage) => {
    const errors: Partial<CompanyPage> = {};

    if (!isEmpty(values.contact) && values.contact.length > 12) {
      errors.contact = 'Contact Number must consist of less than 12 characters';
    }
    if (!isEmpty(values.contact) && values.contact.length < 8) {
      errors.contact =
        'Contact Number must consist of minimum than 8 characters';
    }
    if (isEmpty(values.industry_type_id)) {
      errors.industry_type_id = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.no_of_emp)) {
      errors.no_of_emp = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.address)) {
      errors.address = THIS_FIELD_REQUIRED;
    }
    if (!isEmpty(values.address) && values.address.length > 150) {
      errors.address =
        'Address Number must consist of less than 150 characters';
    }

    if (isEmpty(values.country_id)) {
      errors.country_id = THIS_FIELD_REQUIRED;
    }

    if (isEmpty(values.state_id)) {
      errors.state_id = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.zipcode)) {
      errors.zipcode = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.company_website)) {
      errors.company_website = THIS_FIELD_REQUIRED;
    }
    if (
      !isEmpty(values.company_website) &&
      isValidURL(values.company_website) === false &&
      values.company_website !== 'https://'
    ) {
      errors.company_website = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.city_id)) {
      errors.city_id = THIS_FIELD_REQUIRED;
    }
    if (!isEmpty(values.zipcode) && values.zipcode.length > 6) {
      errors.zipcode = 'Zipcode must consist of less than 6 characters';
    }
    if (!isEmpty(values.no_of_emp) && Number(values.no_of_emp) > 1000) {
      errors.no_of_emp = '';
    }
    if (!isEmpty(values.no_of_emp) && Number(values.no_of_emp) === 0) {
      errors.no_of_emp = '';
    }
    if (isEmpty(values.zipcode)) {
      errors.zipcode = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.contact)) {
      errors.contact = THIS_FIELD_REQUIRED;
    }
    return errors;
  };

 const redirectHome = () => {
    history.push('/');
  };

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeSubmitform(values),
    validate: handleCompanyPageValid,
  });
console.log('formik.isValid',formik.isValid,formik.errors);
  useEffect(() => {
    if (countryid && countryid.length !== 0) {
      setCountry(countryid);
    }
  }, [countryid]);

  useEffect(() => {
    if (!isEmpty(formik.values.country_id)) {
      dispatch(
        locationStateMiddleWare({
          country: formik.values.country_id.toString(),
        }),
      ).then((res) => {
        if (res.payload.states && res.payload.states.length !== 0) {
          setState(res.payload.states);
        }
      });
    }
  }, [formik.values.country_id]);

  useEffect(() => {
    if (!isEmpty(formik.values.state_id)) {
      dispatch(
        locationCityMiddleWare({ state: formik.values.state_id.toString() }),
      ).then((res) => {
        if (res.payload.city && res.payload.city.length !== 0) {
          setCity(res.payload.city);
        }
      });
    }
  }, [formik.values.state_id]);

  useEffect(() => {

    if (company_detail) {
      formik.setFieldValue('company_name', company_detail.company_name);
      formik.setFieldValue('email', company_detail.email);
      formik.setFieldValue('contact', company_detail.contact);
      if(company_detail.company_website === null){
        formik.setFieldValue('company_website', 'https://');
      }else{

      formik.setFieldValue('company_website', company_detail.company_website);
      }
      if( Number(company_detail.no_of_emp) === 0){
        formik.setFieldValue('no_of_emp', '');
      }else{
      formik.setFieldValue('no_of_emp', company_detail.no_of_emp);
      }
      formik.setFieldValue('address', company_detail.address);
      if (!isEmpty(company_detail.country_id)) {
        formik.setFieldValue('country_id', company_detail.country_id);
      } else {
        formik.setFieldValue('country_id', '231');
      }
      if (!isEmpty(company_detail.industry_type_id)) {
        formik.setFieldValue('industry_type_id', company_detail.industry_type_id);
      } else {
        formik.setFieldValue('industry_type_id', '1');
      }
      formik.setFieldValue('state_id', company_detail.state_id);
      formik.setFieldValue('city_id', company_detail.city_id);
      formik.setFieldValue('zipcode', company_detail.zipcode);
      formik.setFieldValue('logo', company_detail.logo);
    }
  }, [company_detail]);

  const logoUrl =
    company_detail && company_detail.logo && company_detail.logo
      ? company_detail.logo
      : '';
  const imgUrl =
    fileurl.imagePreviewUrl === undefined
      ? `${mediaPath + logoUrl}`
      : fileurl.imagePreviewUrl;
  const handleOnChange = (value: any) => {
    onDirty();
      formik.setFieldValue('contact', value);
    // setContact(value);
  };
    const { routerPrompt, onDirty, onPristine } = useUnsavedChangesWarning();
  return (
    <Card className={styles.overAll}>
      {(isLoading || isload) && <Loader />}
      <Flex row className={styles.companyrow}>
        <Flex flex={4}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Company Name"
            required
            disabled
            value={formik.values.company_name}
            onChange={formik.handleChange('company_name')}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="company_name"
          />
        </Flex>
        <Flex flex={4}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Work Email"
            required
            disabled
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="email"
          />
        </Flex>
        <Flex flex={4}>
          <LabelWrapper label="Contact Number" required>
            <PhoneInput
              inputClass={styles.phoneInput}
              dropdownClass={styles.dropDownStyle}
              country={'us'}
              value={formik.values.contact}
              onChange={handleOnChange}
            />
          </LabelWrapper>

          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="contact"
          />
        </Flex>
      </Flex>
      <Flex row className={styles.companyrow}>
        <Flex flex={4}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Company Website URL"
            required
            value={formik.values.company_website}
            onChange={(e) => {
              formik.setFieldValue('company_website', e.target.value);
               onDirty();
                         }}
          />
          {!isEmpty(formik.values.company_website) &&
            isValidURL(formik.values.company_website) === false &&
            formik.values.company_website !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {/* {isEmpty(formik.values.company_website) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}*/}
        </Flex>
        <Flex flex={4}>
          <div className={styles.with80}>
            <SelectTag
              label="Industry Type"
              required
              options={industryType}
              value={
                industryType
                  ? industryType.find(
                      (option) =>
                        Number(option.value) ===
                        Number(formik.values.industry_type_id),
                    )
                  : ''
              }
              placeholder="Select"
              onChange={(option) => {
                formik.setFieldValue('industry_type_id', option.value);
                 onDirty();
              }}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="industry_type_id"
            />
          </div>
        </Flex>
        <Flex flex={4}>
          <InputText
            inputConatinerClass={styles.with80}
            label="No of Employees"
            required
            onChange={(event) => {
              formik.handleChange('no_of_emp')(
                event.target.value.replace(/\D/g, ''),
              );
              onDirty();
            }}
            value={formik.values.no_of_emp}
          />
           {!isEmpty(formik.values.no_of_emp) &&
               Number(formik.values.no_of_emp) > 1000 && (
              <Text size={12} color="error">
                No of Employees must consist of less than 1000 characters
              </Text>
            )}
               {!isEmpty(formik.values.no_of_emp) &&
               Number(formik.values.no_of_emp) === 0 && (
              <Text size={12} color="error">
                No of Employees must consist of more than 0 characters
              </Text>
            )}
        </Flex>
      </Flex>

      <Flex row className={styles.companyrow}>
        <Flex flex={8}>
          <InputText
            inputConatinerClass={styles.width90}
            label="Adderss"
            required
            value={formik.values.address}
            onChange={(e) => {
              formik.setFieldValue('address', e.target.value);
               onDirty();
               console.log(e);

            }}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="address"
          />
        </Flex>

        <Flex flex={4}>
          <div className={styles.with80}>
            <SelectTag
              label="Country"
              required
              isSearchable
              options={isGetCountry}
              placeholder="Select"
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              value={
                isGetCountry
                  ? isGetCountry.find(
                      (option) =>
                        Number(option.id) === Number(formik.values.country_id),
                    )
                  : ''
              }
              onChange={(option) => {
                formik.setFieldValue('country_id', option.id);

               onDirty();
                        }}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="country_id"
            />
          </div>
        </Flex>
      </Flex>
      <Flex row className={styles.companyrow}>
        <Flex flex={4}>
          <div className={styles.with80}>
            <SelectTag
              inputId="jobdetails___state"
              isSearchable
              options={getState}
              label="State"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              value={
                getState
                  ? getState.find(
                      (option) => option.id === Number(formik.values.state_id),
                    )
                  : ''
              }
              onChange={(option) => {
                formik.setFieldValue('state_id', option.id);
                onDirty();
              }}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="state_id"
            />
          </div>
        </Flex>
        <Flex flex={4}>
          <div className={styles.with80}>
            <SelectTag
              inputId="jobdetails___city"
              isSearchable
              options={getCity}
              label="City"
              required
              getOptionValue={(option: { id: number }) => `${option.id}`}
              getOptionLabel={(option: { name: string }) => option.name}
              value={
                getCity
                  ? getCity.find(
                    (option) => option.id === Number(formik.values.city_id),
                    )
                  : ''
              }
              onChange={(option) => {
                formik.setFieldValue('city_id', option.id);
                onDirty();
              }}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="city_id"
            />
          </div>
        </Flex>
        <Flex flex={4}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Zip Code"
            required
            value={formik.values.zipcode}
            onChange={(e) => {
               formik.setFieldValue('zipcode', e.target.value);
               onDirty();
               console.log(e);

            }}
          />
          {!isEmpty(formik.values.zipcode) &&
               formik.values.zipcode.length > 6 && (
              <Text size={12} color="error">
                Zipcode must consist of less than 6 characters
              </Text>
            )}
               {!isEmpty(formik.values.zipcode) &&
               formik.values.zipcode.length < 4 && (
              <Text size={12} color="error">
                Zipcode must consist of more than 4 characters
              </Text>
            )}
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="zipcode"
          />
        </Flex>
      </Flex>

      <Flex row className={styles.companyrow}>
        <Flex flex={1}>
        
           <Flex columnFlex>
              {imgUrl.length === 0 || imgUrl === `${mediaPath}` ? (
                <label htmlFor="bannersetip__img" className={styles.btnStyle}>
                  <Flex className={styles.imgContainer}>
                    <Flex height={121} width={131} className={styles.imgStyle}>
                      <Flex
                        columnFlex
                        center
                        middle
                        className={styles.changeStyle1}
                      >
                        <SvgUpload />
                        <Text color="black" className={styles.text}>
                          Upload Your Logo
                        </Text>
                      </Flex>
                    </Flex>
                    {isShow && (
                      <Flex
                        columnFlex
                        center
                        middle
                        className={styles.changeStyle}
                      >
                       
                        <SvgUpload />
                        <Text color="black" className={styles.text}>
                         Upload Your Logo
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </label>
              ) : (
                <Flex>
                  <label
                    htmlFor="bannersetip__img"
                    className={styles.btnStyle}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                  >
                    <Flex className={styles.imgContainer}>
                      <img
                        height={125}
                        width={145}
                        src={imgUrl}
                        alt="Banner Img"
                        className={styles.imgStyle}
                      />
                      {isShow && (
                        <Flex
                          columnFlex
                          center
                          middle
                          className={styles.changeStyle}
                        >
                         
                          <SvgUpload />
                          <Text color="black" className={styles.text}>
                            Change Logo
                          </Text>
                        </Flex>
                      )}
                    </Flex>
                  </label>
                </Flex>
              )}
              {isMb && (
                <Text size={12} color="error">
                  {FILE_2MB}
                </Text>
              )}
              <input
                id="bannersetip__img"
                type="file"
                onChange={handleChangeImag}
                accept="image/*"
                className={styles.fileStyle}
              />
            </Flex>
          
        </Flex>
        <Flex flex={6}>
        <div style={{marginLeft:30,marginTop:32}} >
        <Flex >
          <Text className={styles.gray_color}>Recommended logo dimension:</Text>
          <Text className={styles.gray_color}>Square: 120px * 120px, Rectangle: 500px * 230px</Text>
          <Text className={styles.gray_color}>File size must be less than 2MB</Text>
          <Text  style={{ marginTop: 5 }}>
            Note: This logo will be used in your careers page created by Zita.
          </Text>
        </Flex>
        </div>
        </Flex>
        <Flex flex={2}>
          <Flex end className={styles.savebutton}>
            {company_detail && company_detail.no_of_emp === null ? (
              <Button onClick={formik.handleSubmit} disabled={!formik.isValid}>
                Save & Continue
              </Button>
            ) : (
            <Flex row>
              <Button  className={styles.cancel}  onClick={redirectHome} types={'secondary'}>
                Cancel
              </Button>
              <Button onClick={formik.handleSubmit} disabled={!formik.isValid  }>
                Save
              </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    {routerPrompt}
    </Card>
  );
};

export default CompanyPage;