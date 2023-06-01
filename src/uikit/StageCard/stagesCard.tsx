import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import Text from '../../uikit/Text';

import { jobPipelineForm } from '../../modules/accountsettingsmodule/templatesmodule/templatesPageTypes';
import { AppDispatch } from '../../store';
// import { updateJobPipelineStageMiddleWare } from '../../modules/accountsettingsmodule/templatesmodule/store/middleware/templatesmiddleware';
import { Button, ErrorMessage, Flex, InputText, Loader } from '../../uikit';
import { isEmpty } from '../helper';
import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import SvgDrag from '../../icons/SvgDrag';
import { ColorPallete } from '../ColorPalatte/colorPalatte';
import ColorPicker from '../../modules/accountsettingsmodule/buildyourcareerpage/ColorPicker';
import { SvgEdit } from '../../icons';
import SvgDelete from '../../icons/SvgDelete';
import { StageData } from '../../hooks/useStages/types';
import { useForm } from '../../hooks/useForm';
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
  onDelete?: (value: number) => void;
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
  
  const [initial, setInitial] = useState<StageData>(doc);
  const myRef = createRef<any>();
  const handleJobPipeline = (values: StageData) => {
    const errors: Partial<StageData> = {};
    if(isEmpty(values.stage_name) || values?.stage_name.trim() === ""){
      errors.stage_name = "Enter a valid stage name";
    }

    if (!isEmpty(values.stage_name) && values.stage_name.trim().length > 25) {
      errors.stage_name = 'Stage name should not exceed 25 characters.';
    }
    return errors;
  };
  const formik = useForm<StageData>({
    initialValues: initial, 
    isTrim: false, 
    validate: handleJobPipeline,
    onSubmit: (form) => {
      console.log(form)
      onEdit({...form, stage_name: form.stage_name.trim()});
      // formik.handleChange('stage_name')(form.stage_name.trim());
      setEdit(!edit);
    },
  })
  const toggleStage = () => {
    setEdit(!edit);
    formik.resetForm();
  };
  const handleDeletePipelinePopup = () => {
    setDeletePopup(false);
    onDelete(doc.id);
  };
  const handleCloseDeletePopup = () => {
    setDeletePopup(false);
  };
  const onColorChange = (value: StageData) => {
    onEdit(value);
  };

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      if (isBtnColorOpen) {
        setBtnColorOpen(false);
        if (doc.stage_color !== formik.values.stage_color)
          onColorChange(formik.values);
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

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };
  
  const renderTitle = () => {
    if (edit) {
      return (
        <Flex row noWrap>
          <Flex column noWrap>
            <InputText
              name='stage_name'
              value={formik.values.stage_name}
              onChange={formik.handleChange('stage_name')}
              lineInput
              size={12}
              className={styles.input}
              onKeyPress={handleKeyPress}
              onBlur={formik.handleBlur}
              // onKeyPress={(e) => enterKeyPress(e, handleLocationSubmit)}
            />
            <ErrorMessage
              touched={formik.touched}
              errors={formik.errors}
              name="stage_name"
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
                  formik.handleSubmit();
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
    return (
      <Text color="theme" title={doc.stage_name}>
        {doc.stage_name}
      </Text>
    );
  };

  const handleEdit = () => {
    if (doc.is_disabled) {
      return;
    }
    if (onEdit) {
      setEdit(!edit);
    }
  };
  const handleDelete = () => {
    if (edit) {
      toggleStage();
    }
    if (doc.is_disabled) {
      return;
    }
    if (onDelete) {
      setDeletePopup(true);
    }
  };

  return (
    <>
      {/* delete popup without the data */}
      {doc?.is_associated ? (
        <AlertDeletePopup
          openDeletePopup={deletePopup}
          handleDeletePipelinePopup={handleDeletePipelinePopup}
          handleCloseDeletePopup={handleCloseDeletePopup}
        />
      ) : (
        <DeletePopup
          openDeletePopup={deletePopup}
          handleDeletePipelinePopup={handleDeletePipelinePopup}
          handleCloseDeletePopup={handleCloseDeletePopup}
        />
      )}
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
            onClick={handleEdit}
          >
            <SvgEdit width={12} height={12} fill={'#581845'} />
          </Button>
          <Button
            disabled={doc.is_disabled}
            types="link"
            className={styles.deleteIcon}
            onClick={handleDelete}
          >
            <SvgDelete width={16} height={16} fill={'#581845'} />
          </Button>
        </Flex>
      </div>
    </>
  );
};
