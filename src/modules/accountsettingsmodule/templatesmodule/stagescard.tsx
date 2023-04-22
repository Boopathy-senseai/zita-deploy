import React, { createRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import { useFormik } from 'formik';
import { SvgEdit } from '../../../icons';
import SvgCloseBox from '../../../icons/SvgCloseBox';
import SvgDelete from '../../../icons/SvgDelete';
import SvgDrag from '../../../icons/SvgDrag';
import SvgTickBox from '../../../icons/SvgTickBox';
import { AppDispatch } from '../../../store';
import { Button, Flex, InputText, Loader } from '../../../uikit';
import { isEmpty } from '../../../uikit/helper';
import ColorPicker from '../buildyourcareerpage/ColorPicker';
import Text from '../../../uikit/Text';
import SvgTickOne from '../../../icons/SvgTickOne';
import SvgPicker from '../../../icons/SvgPicker';
import styles from './jobPipelinePage.module.css';
import {
  deleteJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
} from './store/middleware/templatesmiddleware';
import { StageData } from './templatesPageTypes';


const cx = classNames.bind(styles);
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
          <div >
            <SvgPicker height={30} width={30} fill="#581845" />
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
            disabled={doc.palatteDisabled}
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
            disabled={doc.disabled}
            types="link"
            className={styles.editIcon}
            onClick={() =>
              onEdit && doc.disabled === false ? setEdit(!edit) : undefined
            }
          >
            <SvgEdit width={12} height={12} fill={'#581845'} />
          </Button>
          <Button
            disabled={doc.disabled}
            types="link"
            className={styles.deleteIcon}
            onClick={() =>
              handleDelete && doc.disabled === false ? handleDelete() : undefined
            }
          >
            <SvgDelete width={16} height={16} fill={'#581845'} />
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
