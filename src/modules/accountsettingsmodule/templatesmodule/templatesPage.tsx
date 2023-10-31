import React, { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import classNames, { Value } from 'classnames/bind';
// import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Flex from '../../../uikit/Flex/Flex';
import Text from '../../../uikit/Text';
import SvgJobPipeline from '../../../icons/SvgJobPipeline';
import SvgMessages from '../../../icons/SvgMessages';
import SvgMessage from '../../../icons/SvgMessage';
import {
  Button,
  ErrorMessage,
  InputText,
  LinkWrapper,
  Loader,
  Toast,
} from '../../../uikit';
import SvgAdd from '../../../icons/SvgAdd';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import SvgBack from '../../../icons/SvgBack';

import { isEmpty } from '../../../uikit/helper';
import SvgTickBox from '../../../icons/SvgTickBox';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import { AppDispatch, RootState } from '../../../store';
import { PipelineData } from '../../../hooks/useStages/types';
import { useForm } from '../../../hooks/useForm/useForm';
import styles from './templates.module.css';
import JobPipelinePage from './jobPipelinePage';
import {
  deleteJobPipelineMiddleWare,
  getPipelineDataMiddleWare,
  updatejobPipelineMiddleWare,
} from './store/middleware/pipelinesmiddleware';
import Emailtemplatescreen from './emailtemplates/emailtemplateScreen';
import DeletePopup from './deletePopup';
const cx = classNames.bind(styles);

const TemplatesPage = () => {
  const [template, setTemplate] = useState(
    parseInt(sessionStorage.getItem('template')) || 0,
  );
  const [pipeline, setPipeline] = useState(
    parseInt(sessionStorage.getItem('pipeline')) || 0,
  );
  const [workflow, setworkflow] = useState(
    parseInt(sessionStorage.getItem('workflow')) || 0,
  );
  const [isSubmitLoader, setSubmitLoader] = useState(false);
  const [deletePopup, setDeletePopup] = useState<{
    visible: boolean;
    data: PipelineData;
  } | null>(null);

  const [workId, setWorkId] = useState<number | undefined>(
    parseInt(sessionStorage.getItem('wk_id')) || undefined,
  );
  const [showbutton, setshowbutton] = useState(
    parseInt(sessionStorage.getItem('button')) || 0,
  );

  const { pipelineData, isLoading, isTemplateLoading, message } = useSelector(
    ({ pipelinePageReducers, templatePageReducers }: RootState) => ({
      message: templatePageReducers.message,
      isLoading: pipelinePageReducers.isLoading,
      isTemplateLoading: templatePageReducers.isLoading,
      pipelineData: pipelinePageReducers.pipeline,
    }),
  );

  // useEffect(() => {
  //   if (message) Toast('Pipeline created successfully', 'LONG');
  // }, [message]);

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getPipelineDataMiddleWare());
  }, []);
  const selectTemplate = () => {
    setTemplate(1);
    sessionStorage.setItem('template', '1');
  };
  const selectPipeline = () => {
    setWorkId(undefined);
    setPipeline(1);
    setshowbutton(1);
    // dispatch(getTemplateDataMiddleWare());
  };

  const configPipeline = (id: number) => {
    setWorkId(id);
    setPipeline(1);
    setshowbutton(2);
    sessionStorage.setItem('template', '1');
    sessionStorage.setItem('pipeline', '1');
    sessionStorage.setItem('wk_id', JSON.stringify(id));
  };
  const backFunction = () => {
    setPipeline(0);
    sessionStorage.setItem('pipeline', '0');
    sessionStorage.setItem('button', '0');
  };
  const handleUpdate = (value: PipelineData) => {
    setSubmitLoader(true);
    dispatch(updatejobPipelineMiddleWare(value)).then(() => {
      setSubmitLoader(false);
      Toast('Changes saved successfully', 'LONG');
    });
  };
  const showDeletePopup = (data: PipelineData) => {
    setDeletePopup({
      visible: true,
      data,
    });
  };
  const handleClose = () => {
    setDeletePopup(null);
  };

  const handleDelete = (data: PipelineData) => {
    setSubmitLoader(true);
    dispatch(deleteJobPipelineMiddleWare(data.wk_id)).then(() => {
      setSubmitLoader(false);
      Toast('Pipeline deleted successfully', 'LONG');
    });
    handleClose();
  };
  const handleDefault = (data: PipelineData) => {
    dispatch(updatejobPipelineMiddleWare(data));
  };

  const selectjd = () => {
    setPipeline(2);
    setTemplate(1);
    // sessionStorage.setItem('template', '1');
  };

  const selectmail = () => {
    setPipeline(3);
    setTemplate(1);
    // sessionStorage.setItem('template', '1');
  };
  const backtemplate = () => {
    setPipeline(0);
    setTemplate(0);
    setworkflow(2);
  };

  if (template === 0) {
    return (
      <>
        {isLoading && <Loader />}

        <Flex className={styles.overflowContainer}>
          <>
            {workflow === 0 ? (
              <Flex>
                <Flex row marginTop={'10px'} marginLeft={'16px'}>
                  <Flex
                    flex={2}
                    height={'unset'}
                    minWidth={200}
                    marginRight={20}
                  >
                    <TemplateCard
                      icon={
                        <SvgJobPipeline height={16} width={16} fill="#333333" />
                      }
                      title={'Workflow'}
                      subTitle={''}
                      btnName={'Manage Workflow'}
                      onClick={() => selectTemplate()}
                    />
                  </Flex>

                  <Flex
                    flex={2}
                    height={'unset'}
                    minWidth={200}
                    marginRight={20}
                  >
                    <TemplateCard
                      icon={
                        <SvgJobPipeline height={16} width={16} fill="#333333" />
                      }
                      title={'Templates'}
                      subTitle={''}
                      btnName={'Manage Templates'}
                      onClick={() => setworkflow(2)}
                    />
                  </Flex>
                  <Flex flex={6}></Flex>
                </Flex>
              </Flex>
            ) : (
              ''
            )}
          </>

          {/* {workflow === 1 ? (
            <Flex row marginTop={'10px'} marginLeft={'16px'}>
              <Flex flex={2} height={'unset'} minWidth={200} marginRight={20}>
                <TemplateCard
                  icon={
                    <SvgJobPipeline height={16} width={16} fill="#333333" />
                  }
                  title={'Job Pipeline'}
                  subTitle={
                    'Create, modify, reorder, and delete job pipeline stages'
                  }
                  btnName={'Manage Pipeline'}
                  onClick={() => selectTemplate()}
                />
              </Flex>
              <Flex flex={8}></Flex>
            </Flex>
          ) : (
            ''
          )} */}

          {workflow === 2 ? (
            <>
              <Flex className={styles.titleBar}>
                <Flex
                  row
                  center
                  marginLeft={10}
                  className={styles.title}
                  onClick={() => setworkflow(0)}
                >
                  <SvgBack height={14} width={14} />
                  <Text
                    color="theme"
                    bold
                    size={13}
                    style={{ marginLeft: '5px' }}
                  >
                    Templates
                  </Text>
                </Flex>
                <Flex row marginTop={'10px'} marginLeft={'16px'}>
                  <Flex
                    flex={2}
                    height={'unset'}
                    minWidth={200}
                    marginRight={20}
                  >
                    <TemplateCard
                      icon={<SvgMessages height={16} width={16} />}
                      title={'Jd Templates'}
                      subTitle={'Design and send the custom message'}
                      btnName={'Manage Templates'}
                      onClick={() => selectjd()}
                    />
                  </Flex>
                  <Flex
                    flex={2}
                    height={'unset'}
                    minWidth={200}
                    marginRight={20}
                  >
                    <TemplateCard
                      icon={
                        <SvgMessage height={16} width={16} fill="#333333" />
                      }
                      title={'Email Templates'}
                      subTitle={'Easily Create, Analyse and send your Emails'}
                      btnName={'Manage Templates'}
                      onClick={() => selectmail()}
                    />
                  </Flex>
                  <Flex flex={6}></Flex>
                </Flex>
              </Flex>
            </>
          ) : (
            ''
          )}
        </Flex>
      </>
    );
  }
  return (
    <>
      {pipeline === 0 ? (
        <>
          {deletePopup && (
            <DeletePopup
              onClose={handleClose}
              onDelete={handleDelete}
              data={deletePopup.data}
              visible={deletePopup.visible}
            />
          )}

          {isSubmitLoader && <Loader />}
          <Flex
            column
            className={styles.overflowContainer}
            style={{ padding: '0px 10px' }}
          >
            <Flex row between className={styles.titleBar}>
              <Flex
                row
                center
                className={styles.title}
                onClick={() => {
                  setTemplate(0);
                  sessionStorage.setItem('template', '0');
                }}
              >
                <SvgBack height={14} width={14} />
                <Text
                  color="theme"
                  bold
                  size={13}
                  style={{ marginLeft: '5px' }}
                >
                  Job Pipeline
                </Text>
              </Flex>

              <Button onClick={() => selectPipeline()}>
                <Flex row center className={styles.pointer}>
                  <SvgAdd height={10} width={10} fill="#FFFFFF" />
                  <Text
                    bold
                    color="white"
                    size={13}
                    style={{ marginLeft: '10px' }}
                  >
                    Add Pipeline
                  </Text>
                </Flex>
              </Button>
            </Flex>
            <Flex row wrap marginTop={'10px'}>
              {pipelineData.map((item, index) => (
                <PipelineCard
                  key={`${item.wk_id}-${index}`}
                  item={item}
                  index={index}
                  list={pipelineData}
                  onConfig={configPipeline}
                  onUpdate={handleUpdate}
                  onDelete={showDeletePopup}
                  onDefault={handleDefault}
                />
              ))}
            </Flex>
          </Flex>
        </>
      ) : (
        ''
      )}

      {pipeline === 1 ? (
        <Flex className={styles.overflowContainer}>
          <JobPipelinePage
            handleBack={backFunction}
            buttondata={showbutton}
            wk_id={workId}
          />
        </Flex>
      ) : (
        ''
      )}
      {pipeline === 2 ? <Emailtemplatescreen handleBack={backtemplate} /> : ''}
      {pipeline === 3 ? <Emailtemplatescreen handleBack={backtemplate} /> : ''}
    </>
  );
};
interface PipelineCardPros {
  item: PipelineData;
  index: number;
  list: PipelineData[];
  onConfig: (id: number) => void;
  onUpdate: (value: PipelineData) => void;
  onDelete: (value: PipelineData) => void;
  onDefault: (value: PipelineData) => void;
}
const PipelineCard: React.FC<PipelineCardPros> = ({
  item,
  index,
  list,
  onConfig,
  onUpdate,
  onDelete,
  onDefault,
}) => {
  const [renamePipeline, setRenamePipeline] = useState(false);
  const [isPipelineLoader, setPipelineLoader] = useState(false);
  const [form, setForm] = useState(item);
  const isPipelineDuplicate = (title: string) => {
    const trimTitle = title.trim().toLowerCase();
    const newList = list
      ? list.filter(
          (doc) =>
            doc.pipeline_name.trim().toLowerCase() !==
            item?.pipeline_name.trim().toLowerCase(),
        )
      : list;
    const tilteMap = [...newList].map((doc) =>
      doc.pipeline_name.trim().toLowerCase(),
    );
    return tilteMap.map((str) => str === trimTitle).includes(true);
  };

  const handleJobPipeline = (values: PipelineData) => {
    const errors: Partial<PipelineData> = {};

    if (isEmpty(values.pipeline_name) || values?.pipeline_name.trim() === '') {
      errors.pipeline_name = 'Enter a valid Pipeline title';
    }

    if (
      !isEmpty(values.pipeline_name) &&
      values.pipeline_name.trim().length > 25
    ) {
      errors.pipeline_name = 'Pipeline title should not exceed 25 characters.';
    }
    if (isPipelineDuplicate(values.pipeline_name)) {
      errors.pipeline_name = 'Pipeline title already exist';
    }
    return errors;
  };
  useEffect(() => {
    setForm(item);
  }, [item, index]);

  const formik = useForm<PipelineData>({
    initialValues: form,
    isTrim: false,
    initialValidation: true,
    // enableReinitialize: true,
    validate: handleJobPipeline,
    onSubmit: (value) => {
      // formik.handleChange('pipeline_name')(value.pipeline_name.trim());
      onUpdate({ ...value, pipeline_name: value.pipeline_name.trim() });
      handleRename();
    },
  });

  const handleRename = () => {
    setRenamePipeline(!renamePipeline);
    formik.resetForm();
  };
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };
  const handleInputLength = (e, fieldName) => {
    const maxLength = 26; // Maximum length allowed

    if (e.target.value.length >= maxLength) {
      e.preventDefault(); // Prevent further input
      const truncatedValue = e.target.value.slice(0, maxLength);
      formik.setFieldValue(fieldName, truncatedValue); // Update the field value
    }
    if (e.key === 'Enter') {
      formik.handleSubmit();
    }
  };
  const renderTitle = () => {
    if (renamePipeline) {
      return (
        <Flex row noWrap>
          <Flex column start>
            <InputText
              name="pipeline_name"
              value={formik.values.pipeline_name}
              onChange={formik.handleChange('pipeline_name')}
              onKeyPress={(e) => handleInputLength(e, 'password1')}
              lineInput
              size={14}
              className={styles.input}
              //  onKeyPress={handleKeyPress}
              onBlur={formik.handleBlur}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="pipeline_name"
            />
          </Flex>

          <div className={styles.svgContainer}>
            {isPipelineLoader ? (
              <div className={styles.svgTick}>
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: !formik.isValid,
                  tickStyle: !isEmpty(formik.values.pipeline_name.trim()),
                })}
                tabIndex={-1}
                role={'button'}
                onClick={() => {
                  formik.handleSubmit();
                }}
              >
                <SvgTickBox className={styles.tickStyle} />
              </div>
            )}

            <div
              className={styles.svgClose}
              // onClick={handleCloseLocationInput}
              tabIndex={-1}
              role={'button'}
              onClick={handleRename}
            >
              <SvgCloseBox className={styles.tickStyle} />
            </div>
          </div>
        </Flex>
      );
    }
    return (
      <Text
        color="black2"
        bold
        size={13}
        title={item.pipeline_name}
        className={styles.titleText}
        style={{
          marginLeft: '10px',
          maxWidth: item.set_as_default ? '105px' : '200px',
        }}
      >
        {item.pipeline_name}
      </Text>
    );
  };
  return (
    <Card key={item.wk_id} className={styles.pipelineStructure}>
      <Flex row start between className={styles.rowGroup}>
        <Flex row className={styles.cardHeader} marginBottom={7}>
          {renderTitle()}
          {item.set_as_default === true && (
            <Text color="yellow" className={styles.default}>
              Default
            </Text>
          )}
        </Flex>

        {/* <Text> */}
        <ActionsButton
          disabled={item.is_active}
          defaults={item.set_as_default}
          onDefault={() =>
            item.set_as_default
              ? undefined
              : onDefault({ ...item, set_as_default: true })
          }
          onDelete={() => (item.is_active ? undefined : onDelete(item))}
          onRename={() => (item.is_active ? undefined : handleRename())}
        />
        {/* </Text> */}
      </Flex>
      <Flex
        column
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: 10,
          borderTop: '1px solid #c3c3c3',
        }}
      >
        {/* <hr className={styles.borderLine} /> */}
        <Button className={styles.btn2} onClick={() => onConfig(item.wk_id)}>
          <Text bold color="theme">
            Configure Pipeline
          </Text>
        </Button>
      </Flex>
    </Card>
  );
};

const ActionsButton = ({
  defaults,
  onRename,
  onDefault,
  onDelete,
  disabled,
}) => {
  return (
    <>
      <Dropdown className="dropdownButton dropleft">
        {(!defaults || !disabled) && (
          <Dropdown.Toggle
            style={{
              borderColor: 'unset',
              backgroundColor: 'unset',
              boxShadow: 'none',
            }}
            id="dropdown-basic"
          >
            <SvgDotMenu height={10} width={10} fill="#581845" />
          </Dropdown.Toggle>
        )}

        {(!defaults || !disabled) && (
          <Dropdown.Menu style={{ minWidth: '5rem' }}>
            {!disabled && (
              <Dropdown.Item onClick={onRename}>
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Rename</Text>
                </Flex>
              </Dropdown.Item>
            )}
            {!defaults && (
              <Dropdown.Item onClick={onDefault}>
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Set as Default</Text>
                </Flex>
              </Dropdown.Item>
            )}
            {!disabled && !defaults && (
              <Dropdown.Item onClick={onDelete}>
                <Flex row center className={styles.dropDownListStyle}>
                  <Text>Delete</Text>
                </Flex>
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </>
  );
};

interface TemplateCardProps {
  title: string;
  subTitle: string;
  btnName: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = (props) => {
  const { title, subTitle, btnName, icon, onClick } = props;
  return (
    <Card className={styles.cardStructure}>
      <Flex column start className={styles.cardContent}>
        <Flex row start className={styles.cardHeader}>
          {icon}
          <Text color="black2" bold size={13} style={{ marginLeft: '10px' }}>
            {title}
          </Text>
        </Flex>
        <Text size={13} style={{ marginTop: '10px' }}>
          {subTitle}{' '}
        </Text>
      </Flex>
      <Flex
        column
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: 10,
          borderTop: '1px solid #c3c3c3',
        }}
      >
        <Button className={styles.btn} onClick={onClick}>
          <Text bold color="theme">
            {btnName}
          </Text>
        </Button>
      </Flex>
    </Card>
  );
};

export default TemplatesPage;
