import React, { useEffect, useState } from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import classNames, { Value } from 'classnames/bind';
import { useFormik } from 'formik';
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
import styles from './templates.module.css';
import JobPipelinePage from './jobPipelinePage';
import {
  deleteJobPipelineMiddleWare,
  getPipelineDataMiddleWare,
  updatejobPipelineMiddleWare,
} from './store/middleware/pipelinesmiddleware';
import DeletePopup from './deletePopup';
const cx = classNames.bind(styles);

const TemplatesPage = () => {
  const [template, setTemplate] = useState(
    parseInt(sessionStorage.getItem('template')) || 0,
  );
  const [pipeline, setPipeline] = useState(
    parseInt(sessionStorage.getItem('pipeline')) || 0,
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

  useEffect(()=>{
    if(message) Toast(message, 'LONG');
  },[message])

  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getPipelineDataMiddleWare());
  }, []);
  const selectTemplate = () => {
    setTemplate(1);
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
  };
  const backFunction = () => {
    setPipeline(0);
  };
  const handleUpdate = (value: PipelineData) => {
    setSubmitLoader(true);
    dispatch(updatejobPipelineMiddleWare(value)).then(() => {
      setSubmitLoader(false);
      Toast('Changes saved successfully.', 'LONG');
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

  if (template === 0) {
    return (
      <>
        {isLoading && <Loader />}

        <Flex row marginTop={'20px'}>
          <Flex flex={2}>
            <Card className={styles.cardStructure}>
              <Flex row start className={styles.cardHeader}>
                <SvgJobPipeline height={16} width={16} fill="#333333" />
                <Text
                  color="black2"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Job Pipeline
                </Text>
              </Flex>

              <Text style={{ marginTop: '10px' }}>
                Create, modify, reorder, and delete job pipeline stages.
              </Text>

              <Button className={styles.btn} onClick={() => selectTemplate()}>
                <Text bold color="theme">
                  Manage Pipeline
                </Text>
              </Button>
            </Card>
          </Flex>
          <Flex flex={2}>
            <Card className={styles.cardStructure}>
              <Flex row start className={styles.cardHeader}>
                <SvgMessages height={16} width={16} />
                <Text
                  color="black2"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Message Templates
                </Text>
              </Flex>
              <Text style={{ marginTop: '10px' }}>
                Design and send the custom message{' '}
              </Text>
              <Button className={styles.btn} onClick={() => {}}>
                <Text bold color="theme">
                  Manage Templates
                </Text>
              </Button>
            </Card>
          </Flex>
          <Flex flex={2}>
            <Card className={styles.cardStructure}>
              <Flex row start className={styles.cardHeader}>
                <SvgMessage height={16} width={16} fill="'#33333'" />
                <Text
                  color="black2"
                  bold
                  size={16}
                  style={{ marginLeft: '10px' }}
                >
                  Email Templates
                </Text>
              </Flex>
              <Text style={{ marginTop: '10px' }}>
                Easily Create, Analyse and send your Emails{' '}
              </Text>
              <Button className={styles.btn} onClick={() => {}}>
                <Text bold color="theme">
                  Manage Templates
                </Text>
              </Button>
            </Card>
          </Flex>
          <Flex flex={4}></Flex>
        </Flex>
      </>
    );
  }
  return (
    <>
      {pipeline === 0 ? (
        <Flex column>
          {deletePopup && (
            <DeletePopup
              onClose={handleClose}
              onDelete={handleDelete}
              data={deletePopup.data}
              visible={deletePopup.visible}
            />
          )}

          {isSubmitLoader && <Loader />}

          <Flex row between className={styles.titleBar}>
            <Flex
              row
              start
              className={styles.title}
              onClick={() => setTemplate(0)}
            >
              <SvgBack height={14} width={14} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Job Pipeline
              </Text>
            </Flex>

            <Button onClick={() => selectPipeline()}>
              <Flex row center className={styles.pointer}>
                <SvgAdd height={10} width={10} fill="#FFFFFF" />
                <Text color="white" size={16} style={{ marginLeft: '10px' }}>
                  Add Pipeline
                </Text>
              </Flex>
            </Button>
          </Flex>
          <Flex row wrap marginTop={'10px'}>
            {pipelineData.map((list, index) => (
              <PipelineCard
                key={`${list.wk_id}-${index}`}
                list={list}
                index={index}
                onConfig={configPipeline}
                onUpdate={handleUpdate}
                onDelete={showDeletePopup}
                onDefault={handleDefault}
              />
            ))}
          </Flex>
        </Flex>
      ) : (
        <JobPipelinePage
          handleBack={backFunction}
          buttondata={showbutton}
          wk_id={workId}
        />
      )}
    </>
  );
};
interface PipelineCardPros {
  list: PipelineData;
  index: number;
  onConfig: (id: number) => void;
  onUpdate: (value: PipelineData) => void;
  onDelete: (value: PipelineData) => void;
  onDefault: (value: PipelineData) => void;
}
const PipelineCard: React.FC<PipelineCardPros> = ({
  list,
  index,
  onConfig,
  onUpdate,
  onDelete,
  onDefault,
}) => {
  const [renamePipeline, setRenamePipeline] = useState(false);
  const [isPipelineLoader, setPipelineLoader] = useState(false);
  const [form, setForm] = useState(list);
  const handleJobPipeline = (values: PipelineData) => {
    const errors: Partial<PipelineData> = {};

    if (!isEmpty(values.pipeline_name) && values.pipeline_name.length > 25) {
      errors.pipeline_name = 'Stage name should not exceed 25 characters.';
    }
    return errors;
  };
  useEffect(() => {
    setForm(list);
  }, [list, index]);
  const formik = useFormik({
    initialValues: form,
    enableReinitialize: true,
    validate: handleJobPipeline,
    onSubmit: (value) => {
      onUpdate(value);
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
  const renderTitle = () => {
    if (renamePipeline) {
      return (
        <Flex row noWrap>
          <InputText
            value={formik.values.pipeline_name}
            onChange={formik.handleChange('pipeline_name')}
            lineInput
            size={12}
            className={styles.input}
            onKeyPress={handleKeyPress}
          />
          <div className={styles.svgContainer}>
            {isPipelineLoader ? (
              <div className={styles.svgTick}>
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: isEmpty(formik.values.pipeline_name),
                  tickStyle: !isEmpty(formik.values.pipeline_name),
                })}
                tabIndex={-1}
                role={'button'}
                onClick={() => {
                  formik.submitForm();
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
        size={16}
        title={list.pipeline_name}
        className={styles.titleText}
        style={{ marginLeft: '10px' }}
      >
        {list.pipeline_name}
      </Text>
    );
  };
  return (
    <Card key={list.wk_id} className={styles.pipelineStructure}>
      <Flex row start between className={styles.rowGroup}>
        <Flex row className={styles.cardHeader}>
          {renderTitle()}
          {list.set_as_default === true ? (
            <Text color="yellow" className={styles.default}>
              Default
            </Text>
          ) : (
            ''
          )}
        </Flex>

        <Text>
          <ActionsButton
            disabled={list.is_active}
            defaults={list.set_as_default}
            onDefault={() =>
              list.set_as_default
                ? undefined
                : onDefault({ ...list, set_as_default: true })
            }
            onDelete={() => (list.is_active ? undefined : onDelete(list))}
            onRename={() => (list.is_active ? undefined : handleRename())}
          />
        </Text>
      </Flex>

      <Button className={styles.btn2} onClick={() => onConfig(list.wk_id)}>
        <Text bold color="theme">
          Configure Pipeline
        </Text>
      </Button>
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

export default TemplatesPage;
