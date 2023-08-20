import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import Text from '../../uikit/Text';
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
import { useStages } from '../../hooks/useStages';
import styles from './stagesCard.module.css';


const cx = classNames.bind(styles);

// Stage card
interface StageCardProps {
  index?: number;
  isDrag?: boolean;
  isColorPicker?: boolean;
  list?: StageData[];
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
    list = [],
    onEdit,
    onDelete,
  } = props;
  const [edit, setEdit] = useState(false);
  // const [deletePopup, setDeletePopup] = useState(false);
  const [showColorPallet, setShowColorPallet] = useState(false);
  const [isBtnColorOpen, setBtnColorOpen] = useState(false);
  const [isStageLoader, setStageLoader] = useState(false);

  const [initial, setInitial] = useState<StageData>(doc);
  const myRef = createRef<any>();
  const { isStageDuplicate } = useStages(list);

  const handleJobPipeline = (values: StageData) => {
    const errors: Partial<StageData> = {};
    if (isEmpty(values.stage_name) || values?.stage_name.trim() === '') {
      errors.stage_name = 'Enter a valid stage name';
    }
    if (!isEmpty(values.stage_name) && values.stage_name.trim().length > 25) {
      errors.stage_name = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.stage_name)) {
      errors.stage_name = 'Stage name already exist.';
    }
    return errors;
  };
  const formik = useForm<StageData>({
    initialValues: initial,
    isTrim: false,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      onEdit({ ...form, stage_name: form.stage_name.trim() });
      // formik.handleChange('stage_name')(form.stage_name.trim());
      setEdit(!edit);
    },
  });

  const toggleStage = () => {
    setEdit(!edit);
    formik.resetForm();
  };
  // const handleDeletePipelinePopup = () => {
  //   setDeletePopup(false);
  //   onDelete(doc.id);
  // };
  // const handleCloseDeletePopup = () => {
  //   setDeletePopup(false);
  // };
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
              name="stage_name"
              value={formik.values.stage_name}
              onChange={formik.handleChange('stage_name')}
              lineInput
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
                  svgTickDisable: !formik.isValid,
                  tickStyle: !isEmpty(formik.values.stage_name.trim()),
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
      <Text  size={13}color="theme" title={doc.stage_name} style={{ whiteSpace: "pre"}}>
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
      onDelete(doc);
    }
  };

  return (
    <>
      <div ref={myRef} className={styles.pipelineCard}>
        <div className={styles.rowGroup}>
          <Button
            types="link"
            style={{ cursor: isDrag ? 'pointer' : 'default' }}
            className={styles.drgIcon}
          >
            <SvgDrag
              width={16}
              height={16}
              fill={isDrag ? '#581845' : '#AC8BA2'}
            />
          </Button>
          <button
            // disabled={doc.palatteDisabled}
            className={styles.colorCircle}
            style={{
              backgroundColor: doc.stage_color,
              cursor: isColorPicker ? 'pointer' : 'default',
            }}
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
            disabled={doc.is_disabled || edit}
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
