import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LabelWrapper from '../uikit/Label/LabelWrapper';
import SelectTag from '../uikit/SelectTag/SelectTag';
import Text from '../uikit/Text/Text';
import SvgClose from '../icons/SvgClose';
import Button from '../uikit/Button/Button';
import Loader from '../uikit/Loader/Loader';
import Flex from '../uikit/Flex/Flex';
import InputCheckBox from '../uikit/InputCheckbox/InputCheckBox';
import { isEmpty } from '../uikit/helper';
import { emailMiddleWare } from '../modules/Login/store/middleware/loginMiddleWare';
import styles from './invitemodal.module.css';
import Autocomplete from './Autocomplete';

const InviteModal = (props) => {
  const dispatch = useDispatch();
  const [displayRoles, setDisplayRoles] = useState([]);
  const [displayRolesLoading, setdisplayRolesLoading] = useState(true);
  const [displayDepartments, setDisplayDepartments] = useState([]);
  const [displayPermissions, setdisplayPermissions] = useState([]);
  const [suggestions, setSuggestions] = useState('');
  const [selectedDepartvalue, setSelectedDepartvalue] = useState('');
  const [isEmailValid, setEmailValid] = useState(false);
  const [isGetMail, setMail] = useState('');
  ////////// Form Validation ////////////
  const schema = yup.object().shape({
    first_name: yup
      .string()
      .trim()
      .required('This field is required')
      .matches(/^[aA-zZ\s]+$/, 'Enter a valid Name')
      .min(2, 'Must be more then one character'),
    last_name: yup
      .string()
      .trim()
      .required('This field is required')
      .matches(/^[aA-zZ\s]+$/, 'Enter a valid Name')
      .min(2, 'Must be more then one character'),
    email: yup
      .string()
      .required('This field is required')
      .email('Enter a valid email'),
    role: yup.string().required('This field is required'),
    contact: yup
      .string()
      .required('This field is required')
      // .max(10, 'Enter a valid contact number')
      .min(10, 'Enter a valid contact number'),
      
    department: yup
      .string()
      .required('This field is required')
      .matches(/^[a-zA-Z0-9_ ]*$/, 'Enter a valid department')
      .min(2, 'Must be more then two character'),
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    setValue,
    formState: { touchedFields, errors },
    getValues,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });
  ////////// Submit Form ////////////
  const onSubmit = (data) => {
    var checkedValue = [];
    var inputElements = document.getElementsByClassName(
      'custom-control-inputs',
    );
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        checkedValue.push(inputElements[i].value);
      }
    }
    data['permissions'] = checkedValue;
    props.onInviteSend(data);
  };

  ////////// Get Role ////////////
  const getDefaultRoles = () => {
    axios
      .get('roles')
      .then((res) => {
        const roleOpction = res.data.data.map((value) => ({
          value: value.id,
          label: value.name,
        }));
        setDisplayRoles(roleOpction);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////// Get all Department ////////////
  const GetAllDepartment = () => {
    axios
      .get('departments')
      .then((res) => {
        const departments = res.data.data.map((value) => [value.name]);
        setDisplayDepartments(departments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  ////////// Call When Select A Role ////////////
  const handleRoleSelect = (data) => {
    clearErrors('role');
    setdisplayRolesLoading(true);
    GetAllPermissions();
    let RoleId = data;
    setValue('role', RoleId.value);
    let el = document.getElementById('RoleCheckbox');
    el.classList.remove('d-none');

    axios
      .get('permissions/role_id/' + RoleId.value)
      .then((res) => {
        displayPermissions.forEach(function (value) {
          document.getElementById(value.codename).disabled = false;
          document.getElementById(value.codename).checked = false;
          document.getElementById('div' + value.codename).style.pointerEvents =
            'fill';
          document.getElementById('div' + value.codename).style.opacity = '1';
        });
        res.data.data.forEach(function (value) {
          document.getElementById(value.codename).disabled = true;
          document.getElementById(value.codename).checked = true;
          document.getElementById('div' + value.codename).style.pointerEvents =
            'none';
          document.getElementById('div' + value.codename).style.opacity = '0.8';
        });
        setdisplayRolesLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////// Get all Permissions ////////////
  const GetAllPermissions = () => {
    axios
      .get('permissions')
      .then((res) => {
        setdisplayPermissions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////////// Call Once ////////////
  const onDepartmentSearch = (e) => {
    // eslint-disable-next-line prefer-destructuring
    const value = e.target.value;
    setSelectedDepartvalue(value);
    setSuggestions(value);
    clearErrors('department');
  };

  ////////// Call Maultiple ////////////
  useEffect(() => {
    getDefaultRoles();
    GetAllDepartment();
    GetAllPermissions();
    reset({
      first_name: '',
      role: '',
      last_name: '',
      email: '',
      contact: '',
      department: '',
    });
    setSuggestions('');
    setSelectedDepartvalue('');
  }, [props.show, reset]);

  useEffect(() => {
    if (props.clearData) {
      props.modalCloseCheck(touchedFields);
    }
  }, [props, props.clearData, touchedFields]);

  ////////// Display Error Message ////////////
  const displayMessage = () => {
    if (props.message !== undefined) {
      const cls = 'alert mb-5 py-2 mt-0 alert-' + props.messageClass;
      return <div className={cls}>{props.message}</div>;
    } else {
      return '';
    }
  };

  const handleCallback = (childData) => {
    setSuggestions(childData[0]);
    setSelectedDepartvalue('');
    setValue('department', childData[0], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const getFname = getValues('first_name');
  const getLname = getValues('last_name');
  const getEmail = getValues('email');
  const getRolename = getValues('role');
  const getContact = getValues('contact');
  const getDepartment = getValues('department');

  const checkValue =
    !isEmpty(getFname) &&
    !isEmpty(getLname) &&
    !isEmpty(getEmail) &&
    !isEmpty(getRolename) &&
    !isEmpty(getContact) &&
    !isEmpty(getDepartment);

  const checkFillValue =
    isEmpty(getFname) &&
    isEmpty(getLname) &&
    isEmpty(getEmail) &&
    isEmpty(getRolename) &&
    isEmpty(getContact) &&
    isEmpty(getDepartment);
  const onCloseModal = () => {
    if (
      !checkFillValue &&
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      )
    ) {
      props.onHide();
    }
    if (checkFillValue) {
      props.onHide();
    }
  };

  useEffect(() => {
    dispatch(emailMiddleWare({ email: isGetMail })).then((res) => {
      if (res.payload.success === true) {
        setEmailValid(true);
      }
      if (res.payload.success === false) {
        setEmailValid(false);
      }
    });
  }, [isGetMail]);

  return (
    props.show && (
      <>
        <Modal
          show={props.show}
          onHide={onCloseModal}
          size={props.size}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex row center between>
                <Text bold size={16} color="theme">
                  Invite New User
                </Text>

                <Button types="link" onClick={onCloseModal}>
                  <SvgClose fill={'#979797'} height={14} width={14} />
                </Button>
              </Flex>
              <div className="row">
                <div className="col-12">
                  {props.clearData === false ? displayMessage() : ''}
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="First Name" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's first name"
                        name="first_name"
                        type="text"
                        {...register('first_name')}
                      />
                    </LabelWrapper>
                    <Text size={12} color="error">
                      {errors.first_name?.message}
                    </Text>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Last Name" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's last name"
                        type="text"
                        name="last_name"
                        {...register('last_name')}
                      />
                    </LabelWrapper>
                    <Text size={12} color="error">
                      {errors.last_name?.message}
                    </Text>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Email" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's active email id"
                        type="text"
                        name="email"
                        {...register('email')}
                        onChange={(e) => {
                          setMail(e.target.value);
                        }}
                      />
                    </LabelWrapper>
                    <Text size={12} color="error">
                      {errors.email?.message}
                    </Text>
                    {!isEmpty(isGetMail) && isEmailValid && (
                      <Text size={12} color="error">
                        This email id already exist
                      </Text>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Contact Number" required>
                      {/* <PhoneInput
                        inputClass={styles.phoneInput}
                        dropdownClass={styles.dropDownStyle}
                        country={'us'}
                        // value={formik.values.contact_no}
                        {...register('contact')}
                        onChange={(phone) => setValue('contact', phone)}
                      /> */}
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's active contact number"
                        name="contact"
                        {...register('contact')}
                      />
                    </LabelWrapper>
                    <Text size={12} color="error">
                      {errors.contact?.message}
                    </Text>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Department" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's department of work"
                        name="department"
                        {...register('department')}
                        onChange={onDepartmentSearch}
                        type="text"
                        value={suggestions}
                        autoComplete={'off'}
                      />
                    </LabelWrapper>
                    <div className="renderSuggestions">
                      <Autocomplete
                        getValue={selectedDepartvalue}
                        parentCallback={handleCallback}
                        options={displayDepartments}
                      />
                    </div>
                    <Text size={12} color="error">
                      {errors.department?.message}
                    </Text>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <SelectTag
                      inputId="role"
                      options={displayRoles}
                      onChange={handleRoleSelect}
                      placeholder="Select a role"
                      label="Role"
                      required
                      name="role"
                    />
                    <Text size={12} color="error">
                      {errors.role?.message}
                    </Text>
                  </div>
                </div>
                <div
                  id="RoleCheckbox"
                  className="col-12 d-none"
                  style={{ marginTop: '30px' }}
                >
                  <div
                    className={
                      displayRolesLoading ? 'card p-4' : 'card p-4 d-none'
                    }
                  >
                    <Flex center middle>
                      <Loader size="small" withOutOverlay />
                    </Flex>
                  </div>
                  <div className={displayRolesLoading ? 'card d-none' : 'card'}>
                    <div
                      className="card-body"
                      style={{ paddingBottom: 8, paddingTop: 8 }}
                    >
                      <Flex columnFlex>
                        <Text bold>User Privileges</Text>
                        <Text>
                          You cannot remove the default access of the user, but
                          you can grant more features
                        </Text>
                      </Flex>

                      <div className="row mt-3">
                        {displayPermissions.map((value) => (
                          <div
                            key={value.id}
                            className="col-md-6"
                            id={'div' + value.codename}
                            style={{ paddingBottom: 8 }}
                          >
                            <InputCheckBox
                              name={value.codename}
                              id={value.codename}
                              value={value.id}
                              label={value.name}
                              className="custom-control-inputs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 mt-4" style={{ marginBottom: 16 }}>
                  <Flex row center>
                    <Button
                      disabled={!checkValue || isEmailValid}
                      type="submit"
                      style={{ marginRight: 16 }}
                    >
                      Send Invite
                    </Button>
                    {props.inviteBtnLoader && (
                      <Loader size="small" withOutOverlay />
                    )}
                  </Flex>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </>
    )
  );
};

export default InviteModal;
