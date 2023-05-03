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
import { Button, InputText, LinkWrapper, Loader } from '../../../uikit';
import SvgAdd from '../../../icons/SvgAdd';
import SvgDotMenu from '../../../icons/SvgDotMenu';
import SvgBack from '../../../icons/SvgBack';

import { isEmpty } from '../../../uikit/helper';
import SvgTickBox from '../../../icons/SvgTickBox';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import { AppDispatch, RootState } from '../../../store';
import styles from './templates.module.css';
import JobPipelinePage from './jobPipelinePage';
import { PipelineData, jobPipelineForm } from './templatesPageTypes';
import {
  defaultJobPipelineMiddleWare,
  deleteJobPipelineMiddleWare,
  jobPipelineMiddleWare,
  updatejobPipelineMiddleWare,
} from './store/middleware/pipelinesmiddleware';
const cx = classNames.bind(styles);

const TemplatesPage = () => {
  const [template, setTemplate] = useState(
    sessionStorage.getItem('template') || 0,
  );
  const [pipeline, setPipeline] = useState(
    sessionStorage.getItem('pipeline') || 0,
  );
  const [showbutton, setshowbutton] = useState(0);

  // const [pipelineData, setPipelineData] = useState([
  //   {
  //     id: 1,
  //     name: 'Zita',
  //     default: true,
  //   },
  //   {
  //     id: 2,
  //     name: 'Front end dev',
  //     default: false,
  //   },
  //   {
  //     id: '3',
  //     name: 'Back end dev',
  //     default: false,
  //   },
  // ]);
  const { pipelineData } = useSelector(
    ({ pipelinePageReducers }: RootState) => ({
      isLoading: pipelinePageReducers.isLoading,
      pipelineData: pipelinePageReducers.pipeline,
    }),
  );
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(jobPipelineMiddleWare());
  }, []);
  const selectTemplate = () => {
    setTemplate(1);
  };
  const selectPipeline = () => {
    setPipeline(1);
    setshowbutton(1);
  };

  const configPipeline = () => {
    setPipeline(1);
    setshowbutton(2);
  };
  const backFunction = () => {
    setPipeline(0);
  };
  const handleUpdate = (value: PipelineData) => {
    dispatch(updatejobPipelineMiddleWare(value));
  };
  const handleDelete = (id: string) => {
    dispatch(deleteJobPipelineMiddleWare(id));
  };
  const handleDefault = (id: string) => {
    dispatch(defaultJobPipelineMiddleWare(id));
  };


  if (template === 0) {
    return (
      <Flex row marginTop={'20px'}>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgJobPipeline height={16} width={16} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Job Pipeline
              </Text>
            </Flex>

            <Text style={{ marginTop: '10px' }}>
              Create, modify, reorder, and delete job pipeline stages
            </Text>

            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Pipeline</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgMessages height={16} width={16} />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Message Templates
              </Text>
            </Flex>
            <Text style={{ marginTop: '10px' }}>
              Design and send the custom message{' '}
            </Text>
            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Templates</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={2}>
          <Card className={styles.cardStructure}>
            <Flex row start className={styles.cardHeader}>
              <SvgMessage height={16} width={16} fill="#581845" />
              <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
                Email Templates
              </Text>
            </Flex>
            <Text style={{ marginTop: '10px' }}>
              Easily Create, Analyse and send your Emails{' '}
            </Text>
            <Button className={styles.btn} onClick={() => selectTemplate()}>
              <Text color="theme">Manage Templates</Text>
            </Button>
          </Card>
        </Flex>
        <Flex flex={4}></Flex>
      </Flex>
    );
  }

  return (
    <>
      {pipeline === 0 ? (
        <Flex column>
          <Flex row between className={styles.titleBar}>
            <Flex
              row
              start
              className={styles.title}
              onClick={() => setTemplate(0)}
            >
              <SvgBack height={16} width={16} />
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
          <Flex row marginTop={'10px'}>
            {pipelineData.map((list) => (
              <PipelineCard
                key={list.id}
                list={list}
                onConfig={configPipeline}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onDefault={handleDefault}
              />
            ))}
          </Flex>
        </Flex>
      ) : (
        <JobPipelinePage handleBack={backFunction} buttondata={showbutton} />
      )}
    </>
  );
};
interface PipelineCardPros {
  list: PipelineData;
  onConfig: () => void;
  onUpdate: (value: PipelineData) => void;
  onDelete: (id:string) => void;
  onDefault: (id:string) => void;
}
const PipelineCard: React.FC<PipelineCardPros> = ({
  list,
  onConfig,
  onUpdate,
  onDelete,
  onDefault,
}) => {
  const [renamePipeline, setRenamePipeline] = useState(false);
  const [isLocationLoader, setLocationLoader] = useState(false);
  const initial = {
    title: list.name,
  };
  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};

    if (!isEmpty(values.title) && values.title.length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: initial,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      onUpdate({
        ...list,
        name: form.title,
      });
      handleRename();
    },
  });
  const handleRename = () => {
    setRenamePipeline(!renamePipeline);
    formik.resetForm();
  };
  const renderTitle = () => {
    if (renamePipeline) {
      return (
        <Flex row noWrap>
          <InputText
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            lineInput
            size={12}
            className={styles.input}
          />
          <div className={styles.svgContainer}>
            {isLocationLoader ? (
              <div className={styles.svgTick}>
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: isEmpty(formik.values.title),
                  tickStyle: !isEmpty(formik.values.title),
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
      <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
        {list.name}
      </Text>
    );
  };
  return (
    <Card key={list.id} className={styles.pipelineStructure}>
      <Flex row start between className={styles.rowGroup}>
        <Flex row className={styles.cardHeader}>
          {/* <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
            {list.name}
            
          </Text> */}
          {renderTitle()}
          {list.default === true ? (
            <Text color="yellow" className={styles.default}>
              Default
            </Text>
          ) : (
            ''
          )}
        </Flex>

        <Text>
          <ActionsButton
            disabled={list.disabled}
            onDefault={() =>
              onDefault(list.id)
            }
            onDelete={() => (list.disabled ? undefined : onDelete(list.id))}
            onRename={() => (list.disabled ? undefined : handleRename())}
          />
        </Text>
      </Flex>

      <Button className={styles.btn2} onClick={onConfig}>
        <Text color="theme">Configure Pipeline</Text>
      </Button>
    </Card>
  );
};

const ActionsButton = ({ onRename, onDefault, onDelete, disabled }) => {
  return (
    <>
      <Dropdown className="dropdownButton dropleft">
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

        <Dropdown.Menu style={{ minWidth: '5rem' }}>
          {!disabled && (
            <Dropdown.Item onClick={onRename}>
              <Flex row center className={styles.dropDownListStyle}>
                <Text>Rename</Text>
              </Flex>
            </Dropdown.Item>
          )}
          <Dropdown.Item onClick={onDefault}>
            <Flex row center className={styles.dropDownListStyle}>
              <Text>Set as Default</Text>
            </Flex>
          </Dropdown.Item>
          {!disabled && (
            <Dropdown.Item onClick={onDelete}>
              <Flex row center className={styles.dropDownListStyle}>
                <Text>Delete</Text>
              </Flex>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default TemplatesPage;
