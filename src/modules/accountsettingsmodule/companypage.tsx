import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { AppDispatch, RootState } from '../../store';
import 'react-phone-input-2/lib/style.css';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import Card from '../../uikit/Card/Card';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import Png from '../../assets/images/Png.png';
import Jpg from '../../assets/images/Jpg.png';
import Loader from '../../uikit/Loader/Loader';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import SvgUserdetail from '../../icons/SvgUserdetail';
import SvgCompanyprofile from '../../icons/SvgCompanyprofile';
import SvgCloseSmal from '../../icons/SvgClosesmal';
import SvgIntomark from '../../icons/Intomark';
//import Tooltipcompany from './tooltipimage/tooltipcompany';
import SvgModuleicon from '../../icons/SvgModuleicon';
import Modal from '../../uikit/Modal/Modal';
import {
  FILE_2MB,
  imageFileAccept,
  isValidURL,
  checkUpperCase,
  THIS_FIELD_REQUIRED,
  mediaPath,
  specialCharacter,
  ENTER_VALID_URL,
  space,
} from '../../modules/constValue';
import ErrorMessage from '../../uikit/ErrorMessage/ErrorMessage';
import Button from '../../uikit/Button/Button';
// import { ErrorMessages } from '../../Login/SetNewPassword';
import { ErrorMessages } from '../Login/SetNewPassword';
// import SvgCloseSmall from '../..//../icons/SvgCloseSmall';
import { SvgCloseSmall } from '../../icons';
// import SvgUpload from '../..//../icons/SvgUpload';
// import SvgView from '../../../icons/SvgView';
import SvgPicupload from '../../icons/SvgPicupload';
import SvgView from '../../icons/SvgView';
import Toast from '../../uikit/Toast/Toast';
import LabelWrapper from '../../uikit/Label/LabelWrapper';
import SvgUpload from '../../icons/SvgUpload';
import { industryType } from './mock';
import styles from './companypage.module.css';

// import SvgPicupload from '../../icons/SvgPicupload';
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

import {
  userProfileMiddleWare,
  userProfilePostMiddleWare,
  
} from './userprofilemodule/store/middleware/userprofilemiddleware';
// import SvgPicupload from '../../icons/SvgPicupload';

type Props = {
  setReloadProfile: (a: boolean) => void;
  setKey: (a: string) => void;
  setReload: (arg: boolean) => void;
};
// type Props = {
//   setKey: (a: string) => void;
//   setReload: (arg: boolean) => void;
// };
const CompanyPage = ({ setKey, setReload, setReloadProfile }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const ref = useRef<any>([]);
  const [fileurl, setFileurl] = useState<any>([]);
  const [fileurls, setFileurls] = useState<any>([]);
  const [islogo, setlogo] = useState<any>([]);
  const [logos, setlogos] = useState<any>([]);
  const [isShowNewPass, setShowNewPass] = useState(false);
  const [isShowNewPass1, setShowNewPass1] = useState(false);
  const [isShowOldPass, setShowOldPass] = useState(false);
  const [isShow, setShow] = useState(false);
  const [isShows, setShows] = useState(false);
  const [isError, setError] = useState(false);
  const [isGetCountry, setCountry] = useState<CountryEntity[]>([]);
  const [getState, setState] = useState<StateEntity[]>([]);
  const [getCity, setCity] = useState<CityEntity[]>([]);
  const [isload, setload] = useState(false);
  const [isPassButton, setPassButton] = useState(true);
  const [isButton, setButton] = useState(true);
  const [isMb, setMb] = useState(false);
  const [modelopen, setmodelopen] = useState(false);
  const [openpopup, setopenpopup] = useState(false);
  const [openpopuptwo, setopenpopuptwo] = useState(false);
  const [imgtype,setimgtype] = useState(false);
  const [imgtypes,setimgtypes] = useState(false);
  const [imgsetup, setImgsetup] = useState(false);
  const [imgsetups, setImgsetups] = useState(false);
  const[imgchange,setImgchange] = useState("");
  const history = useHistory();

  useEffect(() => {
    dispatch(userProfileMiddleWare()) 
  }, []);
  useEffect(() => {
    dispatch(companyPageInitalMiddleWare());
    dispatch(locationMiddleWare({}));
  }, []);

  

  const { countryid, isLoading,user, company_detail,profile,build_career_page } =
    useSelector(({ companyPageReducers, locationReducers, userProfileReducers }: RootState) => ({
      countryid: locationReducers.country,
      isLoading: companyPageReducers.isLoading,
      profile: userProfileReducers.profile,
      Loading: userProfileReducers.isLoading,
      user: userProfileReducers.user,
      company_detail: companyPageReducers.company_detail,
      build_career_page: companyPageReducers.build_career_page,
    }));
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
    zipcod: '',
    logo: '',
    logos: '',
    firstname: '',
    lastname: '',
    username: '',
    profilepicture: '',
  };

  type Password = {
    oldpassword: string;
    newpassword1: string;
    newpassword2: string;
  };

  const initialPassword: Password = {
    oldpassword: '',
    newpassword1: '',
    newpassword2: '',
  };
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
    zipcod: string;
    logo: string;
    logos: string;
    firstname: string;
    lastname: string;
    username: string;
    profilepicture: string;
  };
  

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
      setReload(true);
    }
  };
  const handleChangeImageprofile = (e: any) => {
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
        setFileurls({
          file: e.target.files[0],
          value: e.target.value,
          imagePreviewUrl: reader.result,
        });
      };
      
      reader.readAsDataURL(e.target.files[0]);
      setMb(false);
      setReload(true);

      // onDirty();
    }
  };
  
 
  const handleCompanyPageValid = (values: CompanyPage) => { 
    const errors: Partial<CompanyPage> = {};
  
    if (isEmpty(values.firstname.trim())) {
      errors.firstname = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.lastname.trim())) {
      errors.lastname =THIS_FIELD_REQUIRED;
    }
    
    if (!isEmpty(values.contact) && values.contact.length > 12) {
      errors.contact = 'Contact Number must consist of less than 12 characters';
    }
    if (!isEmpty(values.contact) && values.contact.length < 8) {
      errors.contact =
        'Contact Number must consist of minimum than 8 characters';
    }
    if (isEmpty(values.no_of_emp)) {
      errors.no_of_emp = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.industry_type_id)) {
      errors.industry_type_id = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.no_of_emp)) {
      errors.no_of_emp = THIS_FIELD_REQUIRED;
    }
     
    if (isEmpty(values.address) ||isEmpty(values.address.trim()) ) {
      
        errors.address= THIS_FIELD_REQUIRED;
     
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
      errors.zipcode = ' ';
    }
    if (!isEmpty(values.zipcode) && (values.zipcode.length > 4)) {
         errors.zipcode = THIS_FIELD_REQUIRED;
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
    if (!emtysp) {
      errors.zipcod = 'Space is not a character';
    }
    if ((values.company_website.length === 5)) {
      errors.zipcode = THIS_FIELD_REQUIRED;
    }
    // if (isEmpty(values.zipcode.trim())) {
    //   errors.zipcode = THIS_FIELD_REQUIRED;
    // }
    if (isEmpty(values.contact)) {
      errors.contact = THIS_FIELD_REQUIRED;
    } 
    return errors;
  };
  const handlePasswordValid = (values: Password) => {
    const errors: Partial<Password> = {};

    if (isEmpty(values.oldpassword)) {
      errors.oldpassword = THIS_FIELD_REQUIRED;
    }
    if (isEmpty(values.newpassword1)) {
      errors.newpassword1 = '';
    }
    if (isEmpty(values.newpassword2)) {
      errors.newpassword2 = THIS_FIELD_REQUIRED;
    }
    if (values.newpassword1 !== values.newpassword2) {
      errors.newpassword2 = `The two password fields didn't match.`;
    }

    return errors;
  };
  

  const formik = useFormik({
    initialValues: initial,
    onSubmit: (values) => hanldeSubmitform(values),
    validate: handleCompanyPageValid,
  });
  
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
      if (company_detail.company_website === null) {
        formik.setFieldValue('company_website', 'https://');
      } else {
        formik.setFieldValue('company_website', company_detail.company_website);
      }
      if (Number(company_detail.no_of_emp) === 0) {
        formik.setFieldValue('no_of_emp', '');
      } else {
        formik.setFieldValue('no_of_emp', company_detail.no_of_emp);
      }
      formik.setFieldValue('address', company_detail.address);
      if (!isEmpty(company_detail.country_id)) {
        formik.setFieldValue('country_id', company_detail.country_id);
      } else {
        formik.setFieldValue('country_id', '231');
      }
      if (!isEmpty(company_detail.industry_type_id)) {
        formik.setFieldValue(
          'industry_type_id',
          company_detail.industry_type_id,
        );
      } else {
        formik.setFieldValue('industry_type_id', '1');
      }
      formik.setFieldValue('state_id', company_detail.state_id);
      formik.setFieldValue('city_id', company_detail.city_id);
      formik.setFieldValue('zipcode', company_detail.zipcode);
      formik.setFieldValue('logo', company_detail.logo);
      
    }
  }, [company_detail]);
  useEffect(() => {
    if (user) {
      formik.setFieldValue('firstname', user.first_name);
      formik.setFieldValue('lastname', user.last_name);
      formik.setFieldValue('username', user.username);
    }
  }, [user]);
  const logoUrls = profile && profile !== 'default.jpg' ? profile : '';

console.log()
  useEffect(() => {
     if(profile&& profile !== 'default.jpg'){
      const userlogo = profile.substring(profile.lastIndexOf('/') + 1);
    // setlogo(userlogo);
      setlogos(userlogo);
     } 
     else{ setlogos('')
    }
       }, [logoUrls]);
  
  const logoUrl =
    company_detail && company_detail.logo && company_detail.logo
      ? company_detail.logo
      : '';
  useEffect(() => {
   const companylogo = logoUrl.substring(logoUrl.lastIndexOf('/') + 1);
    setlogo(companylogo);
  }, [logoUrl]);

  
  const imgUrls =
    fileurls.file === undefined ? `${mediaPath + logoUrls}` : fileurls.file.name;
  const imgUrl =
    fileurl.file === undefined ? `${mediaPath + islogo}` : fileurl.file.name;
  const errorMsg = `The two password fields didn't match.`;

 const  hanldeSubmitform = (values: CompanyPage) => {
    setload(true);
    const formProfile = new FormData();
    const formData = new FormData();
     

    if (fileurl.file !== undefined) {
      formData.append('logo', fileurl.file)  
    } else if (islogo.length === 0) {
      formData.append('logo',"");
    }



  
    if (fileurls.file !== undefined) {
      formProfile.append('image',fileurls.file);
        } else if (logos.length === 0) {
          formProfile.append('image_null', logos);
         
        }   
    formProfile.append('first_name', values.firstname);
    formProfile.append('last_name', values.lastname);
   formProfile .append('username', values.username);    
    formData.append('company_name', values.company_name);
    formData.append('company_website', values.company_website);
    formData.append('contact', values.contact);
    formData.append('industry_type', values.industry_type_id);
    formData.append('no_of_emp', values.no_of_emp);
    formData.append('address', values.address);
    formData.append('country', values.country_id);
    formData.append('state', values.state_id);
    formData.append('city', values.city_id);
    formData.append('zipcode', values.zipcode);
    formData.append('email', values.email);
    dispatch(
      userProfilePostMiddleWare({
        formData:formProfile
       }),
     ).then(() => {
            dispatch(userProfileMiddleWare());
            dispatch(
              companyPagePostMiddleWare({
                
                formData,
              }),
            )  .then((res: any) => {  if (res.payload.data.success) 
              {
                setReload(false);
                setload(false);
                Toast('Details saved successfully', 'LONG', 'success');
                if (build_career_page === false) {
                  setKey('1');
                }
            }}) ;
            
           
          })
    
   
  };
   

  const emtysp = space.test(formik.values.zipcode);
  const emtysps = space.test(formik.values.address);


  const hanldePasswordSubmitform = (values: Password) => {
    setload(true);
    const formData = new FormData();
    formData.append('old_password', values.oldpassword);
    formData.append('new_password1', values.newpassword1);
    formData.append('new_password2', values.newpassword2);

     
  };
  
    //     // onPristine();
  

  const formikPassword = useFormik({
    initialValues: initialPassword,
    onSubmit: (values) => hanldePasswordSubmitform(values),
    validate: handlePasswordValid,
  });
  const checkOne =
    !isEmpty(formikPassword.values.newpassword1) &&
    !checkUpperCase.test(formikPassword.values.newpassword1);

  const checkTwo =
    !isEmpty(formikPassword.values.newpassword1) &&
    (formikPassword.values.newpassword1.length < 8 ||
      formikPassword.values.newpassword1.length > 12);

  const isCheckThre =
    !isEmpty(formikPassword.values.newpassword1) &&
    !specialCharacter.test(formikPassword.values.newpassword1);

  const isValid =
    checkOne === false && checkTwo === false && isCheckThre === false
      ? false
      : true;

  useEffect(() => {
    if (
      formikPassword.values.newpassword1.length > 0 ||
      formikPassword.values.newpassword2.length > 0 ||
      formikPassword.values.oldpassword.length > 0
    )
      setPassButton(false);
  }, [formikPassword.values]);

  const reset = () => {
    ref.current.value = '';
    setlogo('');
    setButton(false);
    setFileurl("");
setImgchange("")
    setShow(false);
    
  };
  const resets = () => {
    ref.current.value = '';
    setFileurls("");
    setlogos('');
    // setButton(false);
  };
 

  const redirectHome = () => {
    history.push('/');
  }; 
  const redirectbuiltcarrer = () =>{
    history.push('/')
  }
   var jpg=imgUrl.slice(-3)
  var jps=logoUrl.slice(-3)
  
 let jpgs= jps.toUpperCase(); 
let jpgchange=jpg.toUpperCase(); 

   useEffect(()=>{
    if( jpgchange ==="JPG" || jpgs ===  "JPG" ){     
      setimgtype(true) 
    } 
    else if(  jpgchange === "PEG" ||  jpgs  === "PEG"
    ){
      setimgtype(true) 
    } 
    else{
      setimgtype(false) 
    }  
   },[logoUrl,imgUrl])

   var jpg1=imgUrls.slice(-3)
   var jps1=logoUrls.slice(-3)
   
  let jpgs1= jps1.toUpperCase(); 
 let jpgchange1=jpg1.toUpperCase(); 
 
    useEffect(()=>{
     if( jpgchange1 ==="JPG" || jpgs1 ===  "JPG" ){     
       setimgtypes(true) 
     } 
     else if(  jpgchange1 === "PEG" ||  jpgs1  === "PEG"
     ){
       setimgtypes(true) 
     } 
     else{
       setimgtypes(false) 
     }  
    },[logoUrls,imgUrls])
    console.log(emtysp,'cxvznmg,.h/hglkfujyhtgrfd')
  return (
    <Flex className={styles.overAll}>
      {/* <Flex row className={styles.companyuserheading}>
        <Flex>
          <SvgCompanyprofile></SvgCompanyprofile>
        </Flex>
        <Flex className={styles.profilehead}>Company Profile</Flex>
      </Flex> */}
      {(isLoading || isload) && <Loader />}
      <Flex row className={styles.companyrow}>
        <Flex  >
          <InputText
            label="Company Name"
            inputConatinerClass={styles.with80}
            required
            disabled
            className={styles.inputheight}
            value={formik.values.company_name}
            onChange={formik.handleChange('company_name')}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="company_name"
          />
        </Flex>
        <Flex  >
          <InputText
            inputConatinerClass={styles.with80}
            label="Work Email"
            required
            disabled
            className={styles.inputheight}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="email"
          />
        </Flex>
        <Flex  >
          <LabelWrapper label="Contact Number" required>
            <PhoneInput
              containerClass={styles.phoneInputs}
              inputClass={styles.phoneInput}
              dropdownClass={styles.dropDownStyle}
              country={'us'}
              value={formik.values.contact}
              onChange={formik.handleChange('contact')}
              //onChange={handleOnChange}
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
        <Flex  >
          <InputText
            inputConatinerClass={styles.with80}
            label="Company Website URL"
            required
            className={styles.inputheight}
            value={formik.values.company_website}
            onChange={(e) => {
              formik.setFieldValue('company_website', e.target.value);
              setReload(true);
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
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="company_website"
          />
        </Flex>
        <Flex >
          <LabelWrapper label="Industry Type" required>
            <div className={styles.with80} style={{ marginTop: 5 }}>
              <SelectTag
                id={'company_profile__industry_type'}
                required
                linechange
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
                  setReload(true);
                }}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="industry_type_id"
              />
            </div>
          </LabelWrapper>
        </Flex>
        <Flex>
          <InputText
            inputConatinerClass={styles.with80}
            label="No of Employees"
            required
            className={styles.inputheight}
            onChange={(event) => {
              formik.handleChange('no_of_emp')(
                event.target.value.replace(/\D/g, ''),
              );
              setReload(true);
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
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="no_of_emp"
          />
        </Flex>
      </Flex>

      <Flex row className={styles.companyrow}>
        <Flex  >
          <InputText
            inputConatinerClass={styles.width80}
            label="Street Address"
            required
            className={styles.inputheight}
            value={formik.values.address}
            onChange={(e) => {
              formik.setFieldValue('address', e.target.value);
              setReload(true);
            }}
          />
          <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="address"
          />
        </Flex>

        <Flex  >
          <LabelWrapper label="Country" required>
            <div className={styles.with80} style={{ marginTop: 5 }}>
              <SelectTag
                id={'company_profile__country'}
                required
                linechange
                isSearchable
                options={isGetCountry}
                placeholder="Select"
                getOptionValue={(option: { id: number }) => `${option.id}`}
                getOptionLabel={(option: { name: string }) => option.name}
                value={
                  isGetCountry
                    ? isGetCountry.find(
                        (option) =>
                          Number(option.id) ===
                          Number(formik.values.country_id),
                      )
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('country_id', option.id);
                  formik.setFieldValue('state_id', '');
                  formik.setFieldValue('city_id', '');
                  setReload(true);
                }}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="country_id"
              />
            </div>
          </LabelWrapper>
        </Flex>
        <Flex  >
          <LabelWrapper label="State" required>
            <div className={styles.with80} style={{ marginTop: 5 }}>
              <SelectTag
                id={'company_profile__state'}
                // inputId="jobdetails___state"
                isSearchable
                options={getState}
                required
                linechange
                getOptionValue={(option: { id: number }) => `${option.id}`}
                getOptionLabel={(option: { name: string }) => option.name}
                value={
                  !isEmpty(formik.values.state_id)
                    ? getState
                      ? getState.find(
                          (option) =>
                            option.id === Number(formik.values.state_id),
                        )
                      : ''
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('state_id', option.id);
                  formik.setFieldValue('city_id', '');
                  setReload(true);
                }}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="state_id"
              />
            </div>
          </LabelWrapper>
        </Flex>
      </Flex>
      <Flex row className={styles.companyrow} flex={12}>
        <Flex  >
          <LabelWrapper label="City" required>
            <div className={styles.with80} style={{ marginTop: 5 }}>
              <SelectTag
                id={'company_profile__city'}
                isSearchable
                options={getCity}
                required
                linechange
                getOptionValue={(option: { id: number }) => `${option.id}`}
                getOptionLabel={(option: { name: string }) => option.name}
                value={
                  !isEmpty(formik.values.city_id)
                    ? getCity
                      ? getCity.find(
                          (option) =>
                            option.id === Number(formik.values.city_id),
                        )
                      : ''
                    : ''
                }
                onChange={(option) => {
                  formik.setFieldValue('city_id', option.id);
                  setReload(true);
                }}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="city_id"
              />
            </div>
          </LabelWrapper>
        </Flex>
        <Flex  >
          <InputText
            inputConatinerClass={styles.with80}
            label="Zip Code"
            required
            className={styles.inputheight}
            value={formik.values.zipcode}
            onChange={(e) => {
              formik.setFieldValue('zipcode', e.target.value);
              setReload(true);
            }}
          />
          {console.log(emtysp,'manoj')}
          {emtysp && !isEmpty(formik.values.zipcode) && formik.values.zipcode.trim().length > 6 ?(
            <Text size={12} color="error">
              Zip Code should not exceed 6 characters
            </Text>
          ):('')}
          {emtysp && !isEmpty(formik.values.zipcode) && formik.values.zipcode.trim().length < 4 ? (
            <Text size={12} color="error">
              Zip Code should have atleast 4 characters
            </Text>
          ):('')}
          {!emtysp? (
            <Text size={12} color="error">
              Space is not a character
            </Text>
          ):('')}
          {emtysp? <ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            name="zipcode"
          /> : '' }
        </Flex>
        <Flex flex={4}></Flex>
      </Flex>

      <Flex row className={styles.companyrow9}>
        {/* <Flex   className={styles.companyrow1}> */}

        {fileurl.length === 0 && islogo.length === 0   ? (
          <Flex row flex={12}>
            <Flex  >
              <LabelWrapper label="Company Logo" >
                <Flex
                  height={'35px'}
                  className={styles.imgStyle}
                  row
                  center
                  flex={1}
                  style={{ marginTop: 5 }}
                >
                  <label
                    htmlFor="company_profile___img"
                    className={styles.btnStyle}
                  >
                    <Flex className={styles.openpopup1}>
                      {' '}
                      <SvgPicupload />
                    </Flex>
                  </label>
                  <Flex center className={styles.openpopup2} flex={11}>
                    <label
                      htmlFor="company_profile___img"
                      className={styles.btnStyle}
                    >
                      Upload or drag a logo
                    </label>
                  </Flex>
                  <Flex
                    // className={styles.openpopup3  }
                    // columnFlex
                    center
                    middle

                    flex={1}
                    // onMouseEnter={() => setShow(true)}
                  >
                    <label
                      onMouseEnter={() => setopenpopup(true)}
                      onMouseLeave={() => setopenpopup(false)}
                      className={styles.changeStyle11}
                    >
                      <SvgModuleicon />
                    </label>
                  </Flex>
                </Flex>
              </LabelWrapper>
            </Flex>
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="Company Logo"
            />

          
            <Flex flex={5} style={{ margintop: '-2vh' }}>
              {openpopup === true ? (
                <Card className={styles.cardfront1}>
                  <Flex row center>
                    <SvgModuleicon />{' '}
                    <Text className={styles.moreinformation}>
                      More Information
                    </Text>{' '}
                  </Flex>
                  <Flex  className={styles.tooltipcontent}>
                    <Text className={styles.gray_color}>
                      Dimension:{' '}
                      <Text className={styles.gray_color}>
                        {' '}
                        Square: 120px X 120px, Rectangle: 500px X 230px
                      </Text>
                    </Text>
                    {/* <Text >
                Square: 120px * 120px, Rectangle: 500px * 230px
              </Text> */}
                    <Text className={styles.gray_color}>
                    File size should not exceed 2MB.
                    </Text>
                    <Text style={{ marginTop: 5 ,fontSize:'13px'}}>
                      Note:
                      <Text style={{ marginLeft: 3,fontSize:'13px' }}>
                         This logo will be used in your career page created by
                        zita.
                      </Text>
                    </Text>
                  </Flex>
                </Card>
              ) : (
                ''
              )}
            </Flex>
            <Flex flex={3}></Flex>
            <input
          id="company_profile___img"
          type="file"
          onChange={handleChangeImag}
          accept="image/*"
          className={styles.fileStyle}
        />
          </Flex>
          
        ) : (
          <Flex column flex={12}>
            <Flex row flex={12}>
              <Flex  >
                <LabelWrapper label="Company Logo"  >
                  <Flex
                    height={'35px'}
                    className={styles.imgStyle}
                    row
                    center
                    flex={1}
                    style={{ marginTop: 5 }}
                  >
                    <label
                      htmlFor="company_profile___img"
                      className={styles.btnStyle}
                    >
                      <Flex className={styles.openpopup1}>
                        <div  >
                        {' '}
                        {imgtype === true?( <img
                            src={ Jpg
                            }
                            className={styles.pngsize}
                            alt="logo"
                          />):( <img
                            src={  Png 
                            }
                            className={styles.pngsize}
                            alt="logo"
                          />)}
                        
                         
                       
                        </div>
                      </Flex>
                    </label>
                    <Flex className={styles.openpopup2} flex={6}>
                      <label
                        htmlFor="company_profile___img"
                        onMouseEnter={() => setShows(true)}
                        onMouseLeave={() => setShows(false)}
                        className={styles.companyprofileimg}
                      >
                        {' '}
                        {fileurl.length === 0 ?(  <Text className={styles.urlimagefile} title={islogo} >
                          {islogo}
                        </Text> ):(<Text className={styles.urlimagefile} title={imgUrl} >
                          {imgUrl}
                        </Text>)}
                      
                        
                      </label>
                    </Flex>
                    <Flex 
                      className={styles.changeStyle111}
                      center
                      middle
                      flex={1}
                      onClick={reset}
                      title="Remove Logo"
                      // onClick={() => cancelselect()}
                      // onMouseEnter={() => setShow(true)}
                    >
                      <SvgCloseSmal />
                    </Flex>
                  </Flex>
                  
                </LabelWrapper>
              </Flex>
              <Flex flex={4}></Flex>
              <Flex flex={4}></Flex>

             
            </Flex>
            <Flex row flex={12} className={styles.merginghover}>
              <Flex >
                {isShows && (
                  <Flex center middle className={styles.changeimgfile1}>
                    <label
                      htmlFor="company_profile___img"
                      onMouseEnter={() => setShows(true)}
                      onMouseLeave={() => setShows(false)}
                      className={styles.merginghover1}
                    >
                      <Flex middle center className={styles.changelogo}>
                        Change Logo
                      </Flex>
                    </label>
                  </Flex>
                )}
              </Flex>
              <Flex flex={4}></Flex>
              <Flex flex={4}></Flex>
            </Flex>
          </Flex>
        )}
        {isMb && (
          <Text size={12} color="error">
            {FILE_2MB}
          </Text>
        )}
        <input
          id="company_profile___img"
          type="file"
          onChange={handleChangeImag}
          accept="image/*"
          className={styles.fileStyle}
        />

      
      </Flex>
       
      
      {/* <Flex marginTop={"-10px"}><ErrorMessage
            touched={formik.touched}
            errors={formik.errors}
            
            name="logos"
          /></Flex> */}
      <Flex>
        {(isLoading || isload) && <Loader />}
        <Flex className={styles.margintopline}></Flex>
        {/* <Flex row center>
          <Flex center>
            <SvgUserdetail />
          </Flex>
          <Flex>
            <Text bold size={16} className={styles.headingcontent}>
            User Profile
            </Text>
          </Flex>
        </Flex> */}

       
        <Flex className={styles.companyrow}>
          <Flex row flex={12}>
          <Flex  >
              <InputText
                inputConatinerClass={styles.with80}
                label="User Name"
                required
                disabled
                value={formik.values.username}
                className={styles.inputheight}
                onChange={formik.handleChange('username')}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="username"
              />
            </Flex>
            <Flex >
              <div>
                {' '}
                <InputText
                  inputConatinerClass={styles.with80}
                  label="First Name"
                  required
                  value={formik.values.firstname}
                  className={styles.inputheight}
                  onChange={(e) => {
                    formik.setFieldValue('firstname', e.target.value);
                    setButton(false);
                    // onDirty();
                   
                  }}
                />
                <ErrorMessage
                  touched={formik.touched}
                  errors={formik.errors}
                  name="firstname"
                />
              </div>
            </Flex>
            <Flex >
              <InputText
                inputConatinerClass={styles.with80}
                label="Last Name"
                required
                value={formik.values.lastname}
                className={styles.inputheight}
                onChange={(e) => {
                  formik.setFieldValue('lastname', e.target.value);
                  setButton(false);
                  // onDirty();
                  
                }}
              />
              <ErrorMessage
                touched={formik.touched}
                errors={formik.errors}
                name="lastname"
              />
            </Flex>
           
          </Flex>
         
        </Flex>


        <Flex>
          <Flex columnFlex>
            {fileurls.length === 0 && logos.length === 0 ?(
            
              <Flex row flex={12}>
                
                <Flex  >
                  <LabelWrapper label="Profile Picture"  >
                    <Flex
                      height={'35px'}
                      className={styles.imgStylebanner}
                      row
                      center
                      flex={1}
                      style={{ marginTop: 5 }}
                    >
                      <label
                        htmlFor="bannersetip_user__img"
                        className={styles.btnStyle}
                      >
                        <Flex className={styles.openpopup1}>
                          {' '}
                          <SvgPicupload />
                        </Flex>
                      </label>
                      <Flex center className={styles.openpopup2} flex={11}>
                        <label
                          htmlFor="bannersetip_user__img"
                          className={styles.btnStyle}
                        >
                         upload or drag a photo
                        </label>
                      </Flex>
                      <Flex
                        // className={styles.openpopup3  }
                        // columnFlex
                        center
                        // middle

                        flex={1}
                        // onMouseEnter={() => setShow(true)}
                      >
                        <label
                          onMouseEnter={() => setopenpopuptwo(true)}
                          onMouseLeave={() => setopenpopuptwo(false)}
                          className={styles.changeStyle11}
                        >
                          <SvgModuleicon />
                        </label>
                      </Flex>
                    </Flex>
                  </LabelWrapper>
                </Flex>

                {/* {isShow && (
                  <Flex columnFlex center middle className={styles.changeStyle}>
                    <SvgUpload />
                    <Text color="black" className={styles.text}>
                      Upload Your Logo
                    </Text>

                    <Flex
                      columnFlex
                      center
                      middle
                      className={styles.changeStyle}
                    >
                      <div
                        className={styles.svgCloseStyle}
                        tabIndex={-1}
                        role="button"
                        onKeyDown={() => {}}
                        title={'Remove'}
                        onClick={() => {
                          setFileurl({ value: null });
                          setShow(false);
                        }}
                      >
                        <SvgCloseSmall />
                      </div>
                      <SvgUpload />
                      <Text color="black" className={styles.text}>
                        Upload Your Profile Picture
                      </Text>
                    </Flex>
                  </Flex>
                )} */}

                <Flex flex={4}>
                  {openpopuptwo === true ? (
                    <Card className={styles.cardfront}>
                      <Flex row center>
                        <SvgModuleicon />{' '}
                        <Text className={styles.moreinformation}>
                          More Information
                        </Text>{' '}
                      </Flex>
                      <Flex className={styles.tooltipcontent}>
                        <Text className={styles.gray_color11}>
                          Dimension:{' '}
                          <Text className={styles.gray_color}>
                            {' '}
                            Square: 120px X 120px, Rectangle: 500px X 230px
                          </Text>
                        </Text>
                        <Text className={styles.gray_color}>
                        File size should not exceed 2MB.
                        </Text>
                      </Flex>
                    </Card>
                  ) : (
                    ''
                  )}
                </Flex>
                <Flex flex={4}></Flex>
              </Flex>
            ) : (
              <Flex>
                <Flex row flex={12}>
                  <Flex >
                    <LabelWrapper label="Profile Picture" >
                      <Flex
                        height={'35px'}
                        className={styles.imgStylebanner}
                        row
                        center
                        flex={1}
                        style={{ marginTop: 5 }}
                      >
                <label
                          htmlFor="bannersetip_user__img"
                          className={styles.btnStyle}
                          onMouseEnter={() => setShow(true)}
                          onMouseLeave={() => setShow(false)}
                        >
                          <Flex className={styles.openpopup1}>
                            {' '}
                            <div>
                            {imgtypes === true?( <img
                            src={ Jpg
                            }
                            className={styles.pngsize}
                            alt="logo"
                          />):( <img
                            src={  Png 
                            }
                            className={styles.pngsize}
                            alt="logo"
                          />)}
                          </div>
                          </Flex>
                        </label>
                        <Flex center className={styles.openpopup2} flex={6}>
                          <label
                            htmlFor="bannersetip_user__img"
                            className={styles.urlimagefile1}
                            onMouseEnter={() => setShow(true)}
                            onMouseLeave={() => setShow(false)}
                            
                          >
                            {' '}
                            {fileurls.length === 0 ?(<Text className={styles.urlimagefile1} title={logos}>
                               {logos} 
                            </Text>): (<Text className={styles.urlimagefile1} title={imgUrls}>
                               {imgUrls} 
                            </Text>)}
                          </label>
                        </Flex>
                        <Flex
                          // className={styles.openpopup3  }
                          // columnFlex
                          center
                          middle
                          className={styles.changeStyle111}
                         
                          flex={1}
                          onClick={resets}
                          title="Change Profile Picture"
                          // onClick={() => cancelselect()}
                          // onMouseEnter={() => setShow(true)}
                        >
                          <SvgCloseSmal />
                        </Flex>
                      </Flex>
                    </LabelWrapper>
                  </Flex>
                  <Flex flex={4}></Flex>
                  <Flex flex={4}></Flex>                 
                </Flex>
                <Flex row flex={12} className={styles.merginghover}>
                  <Flex  >
                    {isShow && (
                      <Flex center middle className={styles.changeimgfile}>
                        <label
                          htmlFor="bannersetip_user__img"
                          onMouseEnter={() => setShow(true)}
                          onMouseLeave={() => setShow(false)}
                          className={styles.merginghover1}
                        >
                          <Flex middle center className={styles.changelogo}>
                          Change Profile Picture
                          </Flex>
                        </label>
                      </Flex>
                    )}
                  </Flex>
                  <Flex flex={4}></Flex>
                  <Flex flex={4}></Flex>
                </Flex>
              </Flex>
            )}
            {isMb && (
              <Text size={12} color="error">
                {FILE_2MB}
              </Text>
            )}
            <input
              id="bannersetip_user__img"
              type="file"
              ref={ref}
              onChange={handleChangeImageprofile}
              accept="file/*"
              className={styles.fileStyle}
            />
          </Flex>
           
        </Flex>
        
        <Flex className={styles.bottomline}></Flex>

        <Flex className={styles.savecontinuebutton} end>
          {' '}
          {company_detail && company_detail.no_of_emp === null ? (
            <Button onClick={formik.handleSubmit} >
              Save & Continue
            </Button>
          ) : (
            <Flex row>
              <Button
                className={styles.cancel}
                onClick={redirectHome}
                types={'close'}
              >
                Cancel
              </Button>
              <div>
              <Button
                onClick={formik.handleSubmit}
                
                // disabled={!formik.isValid}
                className={styles.cancelsave}
              >
                Save
              </Button></div>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CompanyPage;
