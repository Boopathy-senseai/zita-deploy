/* eslint-disable */
import { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Autocomplete from './Autocomplete';
import styles from './editusermodal.module.css';
import LabelWrapper from '../uikit/Label/LabelWrapper';
import SelectTag from '../uikit/SelectTag/SelectTag';
import Loader from '../uikit/Loader/Loader';
import Flex from '../uikit/Flex/Flex';
import Text from '../uikit/Text/Text';
import SvgClose from '../icons/SvgClose';
import Button from '../uikit/Button/Button';
import InputCheckBox from '../uikit/InputCheckbox/InputCheckBox';

const EditUserModal = (props) => {
  const [displayRoles, setDisplayRoles] = useState([]);
  const [displayRolesLoading, setdisplayRolesLoading] = useState(true);
  const [displayDepartments, setDisplayDepartments] = useState([]);
  const [displayPermissions, setdisplayPermissions] = useState([]);
  const [suggestions, setSuggestions] = useState('');
  const [selectedDepartvalue, setSelectedDepartvalue] = useState('');
  const [first_name, setFirst_name] = useState(false);
  const [last_name, setLast_name] = useState(false);
  const [email, setEmail] = useState(false);
  const [isDefaultRole, setDefaultRole] = useState('');
  const [isDefaultContact, setDefaultContact] = useState('');
  const [isDefaultDepart, setDefaultDepart] = useState('');
  const [isDefaultContactValue, setDefaultContactValue] = useState('');
  const [isDefaultDepartValue, setDefaultDepartValue] = useState('');
  const [isAutoDropDown, setAutoDropDown] = useState();
  const myRef = useRef();

  ////////// Form Validation ////////////
  const schema = yup.object().shape({
    department: yup
      .string()
      .required('This field is required')
      .matches(/^[a-zA-Z0-9_ ]*$/, 'Enter a valid department')
      .min(2, 'Must be more then two character'),
    contact: yup
      .string()
      .required('This field is required')
      .max(15, 'Enter a valid contact number')
      .min(10, 'Enter a valid contact number'),

    role: yup.string().required('This field is required'),
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
    data['first_name'] = first_name;
    data['last_name'] = last_name;
    data['email'] = email;
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
    props.OnEdit(data);
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
    props.setReload(true);
    clearErrors('role');
    setdisplayRolesLoading(true);
    GetAllPermissions();
    let RoleId = data;
    setValue('role', RoleId.value);
    // let el = document.getElementById('RoleCheckbox');
    // el.classList.remove('d-none');
    // axios
    //   .get('permissions/role_id/' + RoleId.value)
    //   .then((res) => {
    //     displayPermissions.forEach(function (value) {
    //       document.getElementById(value.codename).disabled = false;
    //       document.getElementById(value.codename).checked = false;
    //       document.getElementById('div' + value.codename).style.pointerEvents =
    //         'fill';
    //       document.getElementById('div' + value.codename).style.opacity = '1';
    //     });
    //     res.data.data.forEach(function (value) {
    //       document.getElementById(value.codename).disabled = true;
    //       document.getElementById(value.codename).checked = true;
    //       document.getElementById('div' + value.codename).style.pointerEvents =
    //         'none';
    //       document.getElementById('div' + value.codename).style.opacity = '0.5';
    //     });
    //     setdisplayRolesLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    props.setReload(true);
    const value = e.target.value;
    setDefaultDepartValue(value);
    setSelectedDepartvalue(value);
    setSuggestions(value);
  };

  ////////// Call Maultiple ////////////
  useEffect(() => {
    if (props.show) {
      let userdata = {
        first_name: props.userData.user[0].first_name,
        last_name: props.userData.user[0].last_name,
        email: props.userData.user[0].email,
        contact: props.userData.user[0].contact_number,
        department: props.userData.user[0].department_name,
      };
      reset(userdata);

      setEmail(props.userData.user[0].email);
      setLast_name(props.userData.user[0].last_name);
      setFirst_name(props.userData.user[0].first_name);

      setValue('role', props.userData.user[0].group_id);
      setDefaultRole(props.userData.user[0].group_id);
      setDefaultContact(props.userData.user[0].contact_number);
      setDefaultContactValue(props.userData.user[0].contact_number);
      setDefaultDepart(props.userData.user[0].department_name);
      setDefaultDepartValue(props.userData.user[0].department_name);
      setSuggestions(props.userData.user[0].department_name);
      setValue('department', props.userData.user[0].department_name, {
        shouldValidate: true,
        shouldDirty: true,
      });

      let el = document.getElementById('RoleCheckbox');
      el.classList.remove('d-none');

      props.userData.permissions.forEach(function (value) {
        document.getElementById(value.codename).checked = true;
      });

      axios
        .get('permissions/role_id/' + props.userData.user[0].group_id, {
          params: { user_id: props.isUserId },
        })
        .then((res) => {
          res.data.data.forEach(function (value) {
            document.getElementById(value.codename).disabled = true;
          });
          setdisplayRolesLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [
    props.show,
    props.userData.permissions,
    props.userData.user,
    reset,
    setValue,
  ]);

  useEffect(() => {
    getDefaultRoles();
    GetAllDepartment();
    GetAllPermissions();
    setSuggestions('');
  }, []);

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

  const getRolename = getValues('role');

  useEffect(() => {
    if (getRolename !== undefined) {
      axios
        .get('permissions/role_id/' + getRolename, {
          params: { user_id: props.isUserId },
        })
        .then((res) => {
          displayPermissions.forEach(function (value) {
            document.getElementById(value.codename).disabled = false;
            document.getElementById(value.codename).checked = false;
            document.getElementById(
              'div' + value.codename,
            ).style.pointerEvents = 'fill';
            document.getElementById('div' + value.codename).style.opacity = '1';
          });
          res.data.data.forEach(function (value) {
            document.getElementById(value.codename).disabled = true;
            document.getElementById(value.codename).checked = true;
            document.getElementById(
              'div' + value.codename,
            ).style.pointerEvents = 'none';
            document.getElementById('div' + value.codename).style.opacity =
              '0.8';
          });
          {
            Number(isDefaultRole) === Number(getRolename) &&
              res.data.permission.forEach(function (value) {
                document.getElementById(value.codename).checked = true;
              });
          }

          setdisplayRolesLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [getRolename]);

  const onCloseModal = () => {
    if (
      props.isReload &&
      window.confirm(
        'Do you want to leave this site? Changes you made may not be saved.',
      )
    ) {
      props.onHide();
    }
    if (!props.isReload) {
      props.onHide();
    }
  };
  useEffect(() => {
    if (
      Number(isDefaultRole) === Number(getRolename) &&
      isDefaultContact === isDefaultContactValue &&
      isDefaultDepart === isDefaultDepartValue
    ) {
      props.setReload(false);
    }
  }, [getRolename, isDefaultContactValue, isDefaultDepartValue]);


  const handleClickOutside = (event) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setAutoDropDown(false);
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
          <div className={styles.popUppad}>
          <Modal.Body>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex row center between>
                <Text bold size={16} color="theme">
                  Edit User
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
                        disabled
                      />
                    </LabelWrapper>
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
                        disabled
                      />
                    </LabelWrapper>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Email ID" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's active email id"
                        type="text"
                        name="email"
                        {...register('email')}
                        disabled
                      />
                    </LabelWrapper>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <LabelWrapper label="Contact Number" required>
                      <input
                        className={styles.inputStyle}
                        placeholder="Enter user's active contact number"
                        name="contact"
                        {...register('contact')}
                        onChange={(e) => {
                          props.setReload(true);
                          setDefaultContactValue(e.target.value);
                          setValue('contact', e.target.value);
                        }}
                      />
                    </LabelWrapper>
                    <Text color="error" size={12}>
                      {errors.contact?.message}
                    </Text>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  ref={myRef}
                  onFocus={() => setAutoDropDown(true)}
                >
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
                    {isAutoDropDown && (
                      <div className="renderSuggestions">
                        <Autocomplete
                          getValue={selectedDepartvalue}
                          parentCallback={handleCallback}
                          options={displayDepartments}
                        />
                      </div>
                    )}

                    <Text color="error" size={12}>
                      {errors.department?.message}
                    </Text>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={styles.marginTop}>
                    <SelectTag
                      options={displayRoles}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      name="role"
                      inputId="role"
                      placeholder="Select a role"
                      defaultValue={
                        displayRoles[
                          props.show ? props.userData.user[0].group_id - 1 : ''
                        ]
                      }
                      onChange={handleRoleSelect}
                      label="Role"
                      required
                    />
                    <Text color="error" size={12}>
                      {errors.role?.message}
                    </Text>
                  </div>
                </div>
                <div
                  id="RoleCheckbox"
                  className="col-12 d-none"
                  style={{ marginTop: '16px' }}
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
                  <div className={displayRolesLoading ? 'card d-none' : 'card'} style={{border:"0px"}}>
                    <div
                      className={styles.cardBody}
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                    >
                      <Flex>
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
                              onChange={() => props.setReload(true)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12" style={{marginTop:"16px"}}>
                  <Button type="submit" style={{ marginBottom: 16 }}>
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
          </div>
        </Modal>
      </>
    )
  );
};

export default EditUserModal;
