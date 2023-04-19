import React, { useState, useEffect, useRef, createRef } from 'react';
import { Card } from 'react-bootstrap';
import classNames, { Value } from 'classnames/bind';
import { FormikProps, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Reorder, { reorder } from 'react-reorder';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import SvgBack from '../../../icons/SvgBack';
import Flex from '../../../uikit/Flex/Flex';
import InputText from '../../../uikit/InputText/InputText';

import Text from '../../../uikit/Text';

import { enterKeyPress, isEmpty } from '../../../uikit/helper';
import SvgTickBox from '../../../icons/SvgTickBox';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import { SvgEdit } from '../../../icons';
import SvgDrag from '../../../icons/SvgDrag';
import SvgDelete from '../../../icons/SvgDelete';

import { Button, LinkWrapper, Loader } from '../../../uikit';
import SvgAdd from '../../../icons/SvgAdd';
import { AppDispatch, RootState } from '../../../store';
import SvgTick from '../../../icons/SvgTick';
import ColorPicker from '../buildyourcareerpage/ColorPicker';
import SvgTickOne from '../../../icons/SvgTickOne';
import SvgPlusCircle from '../../../icons/SvgAddCircle';
import { StageData, jobPipelineForm } from './templatesPageTypes';
import {
  addJobPipelineStageMiddleWare,
  deleteJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
  jobPipelineStagesMiddleWare,
  jobPipelineSuggestionsMiddleWare,
  reorderJobPipelineStageMiddleWare,
  updateColourMiddleWare,
} from './store/middleware/templatesmiddleware';

import styles from './jobPipelinePage.module.css';

const cx = classNames.bind(styles);
type FormProps = {
  handleBack: () => void;
  //location: string;
};

const JobPipelinePage = ({ handleBack }: FormProps) => {
  const reorderRef = useRef<Reorder>(null);
  const [stage, setStage] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(jobPipelineStagesMiddleWare());
    dispatch(jobPipelineSuggestionsMiddleWare());
  }, []);

  const { stages, suggestions, isLoading } = useSelector(
    ({ templatePageReducers }: RootState) => ({
      isLoading: templatePageReducers.isLoading,
      stages: templatePageReducers.stages,
      suggestions: templatePageReducers.suggestions,
    }),
  );

  const onStageEdit = (value: StageData) => {  
    dispatch(updateJobPipelineStageMiddleWare(value));
  };

  const onStageDelete = (doc: StageData) => {
    dispatch(deleteJobPipelineStageMiddleWare(doc.id));
  };

  const addStage = (doc: { id: string; title: string }) => {
    dispatch(
      addJobPipelineStageMiddleWare({
        id: doc.id,
        color: 'gray',
        title: doc.title,
        disabled: false,
      }),
    );
  };

  const toggleStage = () => {
    setStage(!stage);
    formik.resetForm();
  };
  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};

    if (!isEmpty(values.title) && values.title.length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    return errors;
  };
  const [isLocationLoader, setLocationLoader] = useState(false);

  const initial = {
    title: '',
    pipelineTitle: '',
  };
  const formik = useFormik({
    initialValues: initial,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      addStage({ id: `${new Date().getTime()}`, title: form.title });
      formik.resetForm();
    },
  });

  const isStageExist = (id: string) => {
    return stages.find((doc) => doc.id === id) !== undefined;
  };
  const defaultStage = {
    id: '1STG',
    color: '#581845',
    title: 'New Applicants',
    disabled: true,
  };

  const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
    dispatch(
      reorderJobPipelineStageMiddleWare(
        reorder(stages, previousIndex, nextIndex),
      ),
    );
  };

  return (
    <Flex>
      <Flex row start className={styles.title} onClick={handleBack}>
        <SvgBack height={16} width={16} />
        <Text color="theme" bold size={16} style={{ marginLeft: '10px' }}>
          Back to Pipeline
        </Text>
      </Flex>
      <Flex column className={styles.bottomBorder}>
        <Flex flex={1} marginBottom={30}>
          <InputText
            inputConatinerClass={styles.with80}
            label="Pipeline Title"
            required
            value={formik.values.pipelineTitle}
            style={{ width: 'fit-content' }}
            onChange={formik.handleChange('pipelineTitle')}
          />
        </Flex>
        <Flex row noWrap>
          <Flex
            flex={4}
            className={`${styles.columnGroup} ${styles.borderRightLine}`}
          >
            <Flex column start marginBottom={20}>
              <Text color="theme" size={16}>
                Pipeline Stages
              </Text>
              <Text color="black2">
                Create, Rename, reorder and delete job pipeline stages.
              </Text>
            </Flex>
            <Flex column style={{overFlow: "none"}}>
              <StageCard
                doc={defaultStage}
                index={-1}
                isColorPicker={false}
                isDrag={false}
                // onEdit={onStageEdit}
                //onDelete={onStageDelete}
              />
              <Reorder
                reorderId="stages"
                getRef={reorderRef}
                component="ul"
                placeholderClassName="placeholder"
                draggedClassName="dragged"
                lock="horizontal"
                holdTime={500}
                touchHoldTime={500}
                mouseHoldTime={200}
                onReorder={onReorder}
                autoScroll={true}
                disabled={false}
                disableContextMenus={true}
                placeholder={<div className="custom-placeholder" />}
              >
                {stages.map((doc, index) => (
                  <li key={`${doc.id}-${index}`}>
                    <StageCard
                      key={index}
                      doc={doc}
                      index={index}
                      onEdit={onStageEdit}
                      onDelete={onStageDelete}
                    />
                  </li>
                ))}
              </Reorder>
            </Flex>
          </Flex>
          <Flex
            flex={4}
            className={`${styles.columnGroup} ${styles.paddingLeft}`}
          >
            <Flex column start marginBottom={20}>
              <Text color="theme" size={16}>
                Proposed Stages
              </Text>
            </Flex>
            <Flex row wrap className={styles.borderLine}>
              {suggestions.map((doc, index) => {
                const isActive = isStageExist(doc.id);
                return (
                  <Chip
                    key={index}
                    isActive={isActive}
                    doc={doc}
                    index={index}
                    onAdd={addStage}
                  />
                );
              })}
            </Flex>
            {stage === false ? (
              <Button
                types="secondary"
                onClick={() => toggleStage()}
                width="100%"
                className={styles.newBtn}
              >
                <Flex row center>
                  <SvgAdd height={16} width={10} fill="#581845" />
                  <Text color="theme" size={14} style={{ marginLeft: '10px' }}>
                    Create a new stage
                  </Text>
                </Flex>
              </Button>
            ) : (
              <>
                <Flex>
                  <InputText
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    lineInput
                    size={12}
                    className={styles.input}
                  />
                  <ErrorMessage
                    touched={formik.touched}
                    errors={formik.errors}
                    name="title"
                  />
                </Flex>

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
                      //  onClick={handleLocationSubmit}
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
                    onClick={toggleStage}
                    tabIndex={-1}
                    role={'button'}
                    // onClick={() => formik.resetForm()}
                  >
                    <SvgCloseBox className={styles.tickStyle} />
                  </div>
                </div>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex row end marginTop={50} marginBottom={20}>
        <Button
          className={styles.cancel}
          // onClick={redirectHome}
          types={'primary'}
        >
          Cancel
        </Button>
        <Button onClick={() => undefined} disabled={!formik.isValid}>
          Update
        </Button>
      </Flex>
    </Flex>
  );
};

interface ColorPalletProps {
  data: StageData;
  onChange: (value: StageData) => void;
  onMoreColour: () => void;
}
export const ColorPallete: React.FC<ColorPalletProps> = (props) => {
  const { data, onChange, onMoreColour } = props;
  const colors = [
    '#19BEBE',
    '#E7A3D2',
    '#FFA8A7',
    '#EBCBA2',
    '#F0926A',
    '#F1F181',
    '#C4F7C3',
    '#F4C5CD',
    '#3AE7B2',
  ];

  return (
    <Flex row wrap className={styles.colorMenu}>
      {colors.map((doc, index) => (
        <Button
          types="link"
          key={index}
          onClick={() => onChange({ ...data, color: doc })}
          className={styles.colorButton}
          style={{ backgroundColor: doc }}
        >
          {data.color === doc && (
            <div>
              <SvgTickOne fill="white" />
            </div>
          )}
        </Button>
      ))}
      <Button
        types="link"
        onClick={() => onMoreColour()}
        className={styles.colorButton}
      >
        <div style={{ width: '16px', height: '16px' }}>
          <SvgPlusCircle height={16} width={16} fill="#581845" />
        </div>
      </Button>
    </Flex>
  );
};

// Stage card
interface StageCardProps {
  index?: number;
  isDrag?: boolean;
  isColorPicker?: boolean;
  doc: StageData;
  onEdit?: (value: StageData) => void;
  onDelete?: (value: StageData) => void;
}

export const StageCard: React.FC<StageCardProps> = (props) => {
  const {
    index,
    isDrag = true,
    isColorPicker = true,
    doc,
    onEdit,
    onDelete,
  } = props;
  const [edit, setEdit] = useState(false);
  const [showColorPallet, setShowColorPallet] = useState(false);
  const [isBtnColorOpen, setBtnColorOpen] = useState(false);
  const [isLocationLoader, setLocationLoader] = useState(false);
  const [initial, setInitial] = useState(doc);
  const dispatch: AppDispatch = useDispatch();

  const myRef = createRef<any>();
  const formik = useFormik({
    initialValues: initial,

    onSubmit: (form) => {
      onEdit(form);
      setEdit(!edit);
    },
  });
  const toggleStage = () => {
    setEdit(!edit);
    formik.resetForm();
  };
  const onColorChange = (value: StageData) => {
    dispatch(updateJobPipelineStageMiddleWare(value));
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      if (isBtnColorOpen) {
        setBtnColorOpen(false);
        if (doc.color !== formik.values.color) onColorChange(formik.values);
      } else {
        setShowColorPallet(false);
        setBtnColorOpen(false);
      }
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
  useEffect(() => {
    setInitial(doc);
  }, [index, doc]);
  const renderTitle = () => {
    if (edit) {
      return (
        <Flex row noWrap>
          <InputText
            value={formik.values.title}
            onChange={formik.handleChange('title')}
            lineInput
            size={12}
            className={styles.input}
            // onKeyPress={(e) => enterKeyPress(e, handleLocationSubmit)}
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
                //  onClick={handleLocationSubmit}
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
              onClick={toggleStage}
            >
              <SvgCloseBox className={styles.tickStyle} />
            </div>
          </div>
        </Flex>
      );
    }
    return (
      <Text color="theme" size={16}>
        {doc.title}
      </Text>
    );
  };
  const handleDelete = () => {
    if (edit) {
      toggleStage();
    }
    if (onDelete) {
      onDelete(doc);
    }
  };

  return (
    <div ref={myRef} className={styles.pipelineCard}>
      <div className={styles.rowGroup}>
        <Button types="link" className={styles.drgIcon}>
          <SvgDrag
            width={16}
            height={16}
            fill={isDrag ? '#581845' : '#AC8BA2'}
          />
        </Button>
        <button
          className={styles.colorCircle}
          style={{ backgroundColor: doc.color }}
          onClick={() =>
            isColorPicker ? setShowColorPallet(!showColorPallet) : undefined
          }
        ></button>
        {renderTitle()}
      </div>
      {showColorPallet && (
        <ColorPallete
          data={doc}
          onChange={onColorChange}
          onMoreColour={() => {
            setBtnColorOpen(!isBtnColorOpen);
          }}
        />
      )}
      {showColorPallet && isBtnColorOpen && (
        <div className={styles.colorPicker}>
          <ColorPicker
            colors={{ hex: formik.values.color }}
            onChange={(e: { hex: string }) => {
              formik.setFieldValue('color', e.hex);
              onColorChange({ ...doc, color: e.hex });
            }}
            // onChange={(e) => selectColour(e.hex)}
          />
        </div>
      )}
      <Flex className={styles.rowGroup}>
        <Button
          types="link"
          className={styles.editIcon}
          onClick={() =>
            onEdit && doc.disabled === false ? setEdit(!edit) : undefined
          }
        >
          <SvgEdit
            width={12}
            height={12}
            fill={onEdit && doc.disabled === false ? '#581845' : '#AC8BA2'}
          />
        </Button>
        <Button
          types="link"
          className={styles.deleteIcon}
          onClick={() =>
            handleDelete && doc.disabled === false ? handleDelete() : undefined
          }
        >
          <SvgDelete
            width={16}
            height={16}
            fill={
              handleDelete && doc.disabled === false ? '#581845' : '#AC8BA2'
            }
          />
        </Button>
      </Flex>
    </div>
  );
};

// Custom chip
interface ChipProps {
  index: number;
  doc: { id: string; title: string };
  isActive: boolean;
  onAdd: (value: { id: string; title: string }) => void;
}
export const Chip: React.FC<ChipProps> = (props) => {
  const { index, doc, isActive, onAdd } = props;
  return (
    <div
      className={styles.pillStyle}
      style={{
        backgroundColor: isActive ? '#581845' : undefined,
      }}
    >
      <button
        onClick={() => onAdd(doc)}
        className={styles.pillbutton}
        style={{ color: isActive ? '#FFF' : undefined }}
      >
        {doc.title}
      </button>
    </div>
  );
};
export default JobPipelinePage;
