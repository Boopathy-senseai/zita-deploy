import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import { useFormik } from 'formik';
import Text from '../../uikit/Text';

import {
  PipelineData,
  StageData,
  jobPipelineForm,
} from '../../modules/accountsettingsmodule/templatesmodule/templatesPageTypes';
import { AppDispatch } from '../../store';
import { updateJobPipelineStageMiddleWare } from '../../modules/accountsettingsmodule/templatesmodule/store/middleware/templatesmiddleware';
import { Button, ErrorMessage, Flex, InputText, Loader } from '../../uikit';
import { isEmpty } from '../helper';
import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgDrag from '../../icons/SvgDrag';
import { ColorPallete } from '../ColorPalatte/colorPalatte';
import ColorPicker from '../../modules/accountsettingsmodule/buildyourcareerpage/ColorPicker';
import { SvgEdit } from '../../icons';
import SvgDelete from '../../icons/SvgDelete';
import styles from './stagesCard.module.css';
import DeletePopup from './deletePopup';
import AlertDeletePopup from './alertDeletePopup';

const cx = classNames.bind(styles);

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
  const [deletePopup, setDeletePopup] = useState(false);
  const [showColorPallet, setShowColorPallet] = useState(false);
  const [isBtnColorOpen, setBtnColorOpen] = useState(false);
  const [isStageLoader, setStageLoader] = useState(false);
  const [initial, setInitial] = useState(doc);
  const dispatch: AppDispatch = useDispatch();
  const myRef = createRef<any>();
  const handleJobPipeline = (values: StageData) => {
    const errors: Partial<StageData> = {};

    if (!isEmpty(values.stage_name) && values.stage_name.length > 25) {
      errors.stage_name = 'Stage name should not exceed 25 characters.';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: initial,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      onEdit(form);
      setEdit(!edit);
    },
  });
  const toggleStage = () => {
    setEdit(!edit);
    formik.resetForm();
  };
  const handleDeletePipelinePopup = () => {
    setDeletePopup(false);
    onDelete(doc);
  };
  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };
  const onColorChange = (value: StageData) => {
    dispatch(updateJobPipelineStageMiddleWare(value));
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      if (isBtnColorOpen) {
        setBtnColorOpen(false);
        if (doc.stage_color !== formik.values.stage_color) onColorChange(formik.values);
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
          <Flex column noWrap>
            <InputText
              value={formik.values.stage_name}
              onChange={formik.handleChange('title')}
              lineInput
              size={12}
              className={styles.input}
              // onKeyPress={(e) => enterKeyPress(e, handleLocationSubmit)}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="title"
            />
          </Flex>
          <div className={styles.svgContainer}>
            {isStageLoader ? (
              <div className={styles.svgTick}>
                <Loader withOutOverlay size={'small'} />
              </div>
            ) : (
              <div
                className={cx('svgTickMargin', {
                  svgTickDisable: isEmpty(formik.values.stage_name),
                  tickStyle: !isEmpty(formik.values.stage_name),
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
        </Flex>
      );
    }
    return <Text color="theme" title={doc.stage_name}>{doc.stage_name}</Text>;
  };
  const handleDelete = () => {
    if (edit) {
      toggleStage();
    }
    if (onDelete) {
      setDeletePopup(true);
    }
  };

  return (
    <>
      {/* delete popup without the data */}
      <DeletePopup
        openDeletePopup={deletePopup}
        handleDeletePipelinePopup={handleDeletePipelinePopup}
        handleCloseDeletePopup={handleCloseDeletePopup}
      />
      {/* <AlertDeletePopup
        openDeletePopup={deletePopup}
        handleDeletePipelinePopup={handleDeletePipelinePopup}
        handleCloseDeletePopup={handleCloseDeletePopup}
      /> */}
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
            // disabled={doc.palatteDisabled}
            className={styles.colorCircle}
            style={{ backgroundColor: doc.stage_color }}
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
              colors={{ hex: formik.values.stage_color }}
              onChange={(e: { hex: string }) => {
                formik.setFieldValue('color', e.hex);
                onColorChange({ ...doc, stage_color: e.hex });
              }}
              // onChange={(e) => selectColour(e.hex)}
            />
          </div>
        )}
        <Flex className={styles.rowGroup}>
          <Button
            disabled={doc.is_disabled}
            types="link"
            className={styles.editIcon}
            onClick={() =>
              onEdit && doc.is_disabled === false ? setEdit(!edit) : undefined
            }
          >
            <SvgEdit width={12} height={12} fill={'#581845'} />
          </Button>
          <Button
            disabled={doc.is_disabled}
            types="link"
            className={styles.deleteIcon}
            onClick={() =>
              handleDelete && doc.is_disabled === false
                ? handleDelete()
                : undefined
            }
          >
            <SvgDelete width={16} height={16} fill={'#581845'} />
          </Button>
        </Flex>
      </div>
    </>
  );
};
