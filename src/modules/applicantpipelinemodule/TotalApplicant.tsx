import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikProps, useFormik } from 'formik';
import classNames, { Value } from 'classnames/bind';
import _ from 'lodash';
import SvgList from '../../icons/SvgList';
import SvgSetting from '../../icons/SvgSetting';
import {
  Button,
  ErrorMessage,
  InputCheckBox,
  InputText,
  LinkWrapper,
  Loader,
  Modal,
  SelectTag,
  Toast,
} from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgEditPipeline from '../../icons/SvgEditPipeline';
import SvgEditStages from '../../icons/SvgEditStages';
import { StageCard } from '../../uikit/StageCard/stagesCard';
import ReorderStage from '../accountsettingsmodule/templatesmodule/reorder';
import { jobPipelineForm } from '../accountsettingsmodule/templatesmodule/templatesPageTypes';
import { AppDispatch, RootState } from '../../store';
import SvgPlusCircle from '../../icons/SvgAddCircle';

import {
  // addJobPipelineStageMiddleWare,
  // deleteJobPipelineStageMiddleWare,
  // updateJobPipelineStageMiddleWare,
  getTemplateDataMiddleWare,
  // reorderJobPipelineStageMiddleWare,
} from '../../modules/accountsettingsmodule/templatesmodule/store/middleware/templatesmiddleware';

import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import { isEmpty } from '../../uikit/helper';
import SvgFavourites from '../../icons/SvgFavourties';
import SvgMove from '../../icons/SvgMove';
import SvgDownload from '../../icons/SvgDownload';
import { useStages } from '../../hooks/useStages';
import { StageData } from '../../hooks/useStages/types';
import { useForm } from '../../hooks/useForm';
import SvgCsvDownload from '../../icons/SvgCsvDownload';
import styles from './totalapplicant.module.css';
import MovePipelinePopup from './movepopup';
import { updateKanbanStagesMiddleware } from './store/middleware/applicantpipelinemiddleware';
import { columnTypes } from './dndBoardTypes';

const cx = classNames.bind(styles);

type Props = {
  jd_id: number;
  columns: columnTypes;
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
  seletedCardsLength: number;
  allColumnsItemsLength: number;
  onExport?: () => void;
  onMove?: (stageId: number) => void;
  onCSVDownload?: () => void;
};

const TotalApplicant = ({
  jd_id,
  columns,
  total,
  filterTotalFav,
  isTotalFav,
  seletedCardsLength,
  allColumnsItemsLength,
  onExport,
  onMove,
  onCSVDownload,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [movePopup, setMovePopup] = useState(false);
  const [stage, setStage] = useState(false);
  const [isStageLoader, setStageLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { stages, isLoading, updateLoading } = useSelector(
    ({ kanbanStagesReducers }: RootState) => ({
      isLoading: kanbanStagesReducers.isLoading,
      stages: kanbanStagesReducers.stages,
      updateLoading: kanbanStagesReducers.update.isLoading,
      // suggestions: kanbanStagesReducers.suggestion,
    }),
  );

  const {
    localStages,
    onEditStage,
    onAddStageFromSuggestion,
    onAddStage,
    onRemoveStage,
    onReorder,
    isStageDuplicate,
    isEqual,
    resetStages,
    NEW_APPLICANT_STAGE,
  } = useStages(stages, columns);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };
  const handleMoveOpenPipeline = () => {
    setMovePopup(true);
  };
  const handleMoveClosePipeline = () => {
    setMovePopup(false);
  };

  const handleClosePopup = () => {
    resetStages();
    setShowPopup(false);
    setStage(false);
  };
  useEffect(() => {
    dispatch(getTemplateDataMiddleWare());
  }, []);

  const initial = {
    title: '',
  };

  const handleJobPipeline = (values: { title: string }) => {
    const errors: Partial<{ title: string }> = {};
    if (isEmpty(values.title) || values?.title.trim() === '') {
      errors.title = 'Enter a valid stage name';
    }

    if (!isEmpty(values.title.trim()) && values.title.trim().length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (isStageDuplicate(values.title)) {
      errors.title = 'Already stage name exists';
    }
    return errors;
  };
  const toggleStage = () => {
    setStage(!stage);
    formik.resetForm();
  };

  const formik = useForm<{ title: string }>({
    initialValues: initial,
    isTrim: false,
    // enableReinitialize: true,
    validate: handleJobPipeline,
    onSubmit: (data) => {
      // formik.handleChange("stage_name")(data.title.trim());
      onAddStageFromSuggestion({
        stage_name: data.title.trim(),
        // stage_order: suggestions.length + 1,
        stage_order: (localStages || [])?.length + 1,
        stage_color: '#888888',
        suggestion_id: new Date().getTime(),
        wk_id_id: new Date().getTime(),
        is_disabled: false,
      });
      toggleStage();
    },
  });

  const isFormDirty = () => {
    if (stages && stages.length !== localStages.length) {
      return true;
    }
    if (stages && !isEqual(stages)) {
      return true;
    }
    return false;
  };

  const clearTab = () => {
    sessionStorage.setItem('superUserTab', '7');
    sessionStorage.setItem('template', '1');
    sessionStorage.setItem('pipeline', '1');
    sessionStorage.setItem('button', '0');
  };

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') {
      formik.handleSubmit();
    }
  };

  const disableMove = allColumnsItemsLength === seletedCardsLength;

  return (
    <>
      <Flex row center between className={styles.overAll}>
        <Text color="theme">
          Total Applicants:{' '}
          <Text bold color="theme">
            {total}
          </Text>
        </Text>
        {seletedCardsLength > 1 && (
          <Flex row center>
            <Flex row center className={styles.bulkSelection}>
              <Flex marginRight={30}>
                <Text color="theme">{`Selected ${seletedCardsLength} candidates`}</Text>
              </Flex>

              <Flex row className={styles.bulkButton}>
                <Flex
                  row
                  center
                  marginRight={20}
                  style={{
                    paddingLeft: '5px',
                    borderLeft: '1px solid #581845',
                    cursor: 'pointer',
                  }}
                  onClick={!disableMove ? handleMoveOpenPipeline : undefined}
                >
                  <SvgMove
                    width={12}
                    height={12}
                    fill={disableMove ? '#AB8BA2' : undefined}
                  />
                  <Text
                    style={{ marginLeft: '10px' }}
                    color={disableMove ? 'disabled' : 'theme'}
                  >
                    Move
                  </Text>
                </Flex>
                <Flex
                  row
                  center
                  style={{
                    paddingLeft: '5px',
                    borderLeft: '1px solid #581845',
                    cursor: 'pointer',
                  }}
                  onClick={onExport}
                >
                  <SvgDownload width={14} height={14} />
                  <Text style={{ marginLeft: '10px' }} color="theme">
                    Export
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )}
        <MovePipelinePopup
          openMovePopup={movePopup}
          handleClosePipelinePopup={handleMoveClosePipeline}
          onMove={(id) => {
            onMove(id);
            handleMoveClosePipeline();
          }}
        />

        <Flex row center marginRight={10} style={{ alignItems: 'center' }}>
          <Button
            className={styles.btnStyle}
            types="primary"
            onClick={filterTotalFav}
          >
            <Flex row center style={{ cursor: 'pointer' }}>
              <SvgFavourites filled={isTotalFav} />
              <Text
                style={{ marginLeft: '5px' }}
                color="theme"
                title={'Favourite Applicants'}
              >
                Favourites
              </Text>
            </Flex>
          </Button>
          <Dropdown className="dropdownButton dropleft">
            <Dropdown.Toggle
              // onClick={handleOpenPopup}
              style={{
                borderColor: 'unset',
                backgroundColor: 'unset',
                boxShadow: 'none',
                padding: '0px',
                marginRight: '5px',
              }}
              title="Edit Stages"
              id="dropdown-basic"
            >
              {/* <SvgEditStages height={16} width={16} /> */}
              <SvgSetting width={16} height={16} fill="#581845" />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: '5rem' }}>
              <Dropdown.Item onClick={handleOpenPopup}>
                <Flex row center className={styles.dropDownListStyle}>
                  <SvgEditStages height={16} width={16} />
                  <Text style={{ marginLeft: 10 }}>Edit Stages</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item onClick={onCSVDownload}>
                <Flex row center className={styles.dropDownListStyle}>
                  <SvgCsvDownload height={16} width={16} />
                  <Text style={{ marginLeft: 10 }}>Download CSV</Text>
                </Flex>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Button className={styles.btn1Style} types="primary">
            <SvgList width={16} height={16} fill="#581845" />
          </Button> */}
        </Flex>
      </Flex>
      <Modal open={showPopup}>
        <Flex flex={6} columnFlex className={styles.Popup}>
          <Flex row center className={styles.insertStyles}>
            <Flex marginBottom={5}>
              {' '}
              <SvgEditStages fill="#333333" />
            </Flex>
            <Text
              size={16}
              style={{ marginLeft: '10px', marginBottom: '5px' }}
              bold
              color="theme"
            >
              Edit Stages
            </Text>
          </Flex>
          <Flex row noWrap>
            <Flex flex={1} className={styles.columnGroup}>
              <Flex style={{ borderBottom: '1px solid #c3c3c3' }}>
                {stage === false ? (
                  <Button
                    types="secondary"
                    onClick={() => toggleStage()}
                    className={styles.newBtn}
                  >
                    <Flex row center>
                      <SvgPlusCircle fill="#581845" />
                      <Text
                        color="theme"
                        size={16}
                        style={{ marginLeft: '5px' }}
                      >
                        Create a new stage
                      </Text>
                    </Flex>
                  </Button>
                ) : (
                  <Flex row noWrap marginBottom={15} width={'100%'}>
                    <Flex column flex={1}>
                      <InputText
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        lineInput
                        size={14}
                        className={styles.input}
                        onKeyPress={handleKeyPress}
                        onBlur={formik.handleBlur}
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
                            svgTickDisable: !formik.isValid,
                            tickStyle: !isEmpty(formik.values.title.trim()),
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
                )}
              </Flex>
              <Flex
                column
                className={styles.stagesCard}
                // style={{
                //   overFlow: 'none',
                //   paddingTop: '15px',
                //   borderTop: '1px solid #c3c3c3',
                // }}
              >
                <StageCard
                  doc={NEW_APPLICANT_STAGE}
                  index={-1}
                  isColorPicker={false}
                  isDrag={false}
                  // onEdit={onStageEdit}
                  //onDelete={onStageDelete}
                />
                <ReorderStage
                  list={localStages}
                  onEdit={onEditStage}
                  onDelete={onRemoveStage}
                  onChange={onReorder}
                />
              </Flex>
            </Flex>
          </Flex>

          <Flex row end marginTop={20} className={styles.borderLine}>
            <Button
              className={styles.cancel}
              types={'primary'}
              onClick={handleClosePopup}
            >
              Cancel
            </Button>
            <Button
              className={styles.update}
              onClick={handleUpdateStages}
              disabled={!isFormDirty()}
            >
              Apply
            </Button>
          </Flex>
        </Flex>
      </Modal>
      {updateLoading && <Loader />}
    </>
  );

  function handleUpdateStages() {
    if (jd_id) {
      dispatch(
        updateKanbanStagesMiddleware({
          jd_id,
          // workflow_id: workflowId,
          stages: localStages,
        }),
      ).then(() => {
        Toast('Changes saved successfully', 'LONG');
        handleClosePopup();
      });
    } else {
      console.log('workflow id not there');
    }
  }
};
// const ActionsButton = ({ onEditStages, onEditPipeline }) => {
//   return (
//     <>

//     </>
//   );
// };
export default TotalApplicant;
