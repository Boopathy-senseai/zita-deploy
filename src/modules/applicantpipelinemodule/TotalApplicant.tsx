import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormikProps, useFormik } from 'formik';
import classNames, { Value } from 'classnames/bind';
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
} from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgEditPipeline from '../../icons/SvgEditPipeline';
import SvgEditStages from '../../icons/SvgEditStages';
import { StageCard } from '../../uikit/StageCard/stagesCard';
import ReorderStage from '../accountsettingsmodule/templatesmodule/reorder';
import {
  jobPipelineForm,
} from '../accountsettingsmodule/templatesmodule/templatesPageTypes';
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
import styles from './totalapplicant.module.css';
import MovePipelinePopup from './movepopup';
import { updateKanbanStagesMiddleware } from './store/middleware/applicantpipelinemiddleware';

const cx = classNames.bind(styles);

type Props = {
  jd_id: number;
  // workflowId: number;
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
  seletedCardsLength: number;
  allColumnsItemsLength: number;
  onExport?: () => void;
  onMove?: (stageId: number) => void;
};

const TotalApplicant = ({
  jd_id,
  // workflowId,
  total,
  filterTotalFav,
  isTotalFav,
  seletedCardsLength,
  allColumnsItemsLength,
  onExport,
  onMove,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [movePopup, setMovePopup] = useState(false);
  const [stage, setStage] = useState(false);
  const [isStageLoader, setStageLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const { stages, isLoading } = useSelector(
    ({ kanbanStagesReducers }: RootState) => ({
      isLoading: kanbanStagesReducers.isLoading,
      stages: kanbanStagesReducers.stages,
      // suggestions: kanbanStagesReducers.suggestion,
    }),
  );

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
    setShowPopup(false);
    setStage(false);
  };
  useEffect(() => {
    dispatch(getTemplateDataMiddleWare());
  }, []);

  const {
    localStages,
    onEditStage,
    onAddStageFromSuggestion,
    onAddStage,
    onRemoveStage,
    onReorder,
    isStageDuplicate,
  } = useStages(stages);

  const initial = {
    title: '',
  };

  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};

    if (!isEmpty(values.title) && values.title.length > 25) {
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

  const formik = useFormik({
    initialValues: initial,
    enableReinitialize: true,
    validate: handleJobPipeline,
    onSubmit: (data) => {
      onAddStageFromSuggestion({
        stage_name: data.title,
        // stage_order: suggestions.length + 1,
        stage_order: (localStages || [])?.length + 1,
        stage_color: 'gray',
        suggestion_id: new Date().getTime(),
        wk_id_id: new Date().getTime(),
        is_disabled: false,
      });
      toggleStage();
    },
  });
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

  const defaultStage: StageData = {
    // id: 1ST,
    stage_color: '#581845',
    stage_name: 'New Applicants',
    is_disabled: true,
    // palatteDisabled: true,
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
              <Text style={{ marginLeft: '5px' }} color="theme">
                Favourites
              </Text>
            </Flex>
          </Button>
          <Dropdown className="dropdownButton dropleft">
            <Dropdown.Toggle
              style={{
                borderColor: 'unset',
                backgroundColor: 'unset',
                boxShadow: 'none',
                padding: '0px',
                marginRight: '5px',
              }}
              title="Settings"
              id="dropdown-basic"
            >
              <SvgSetting width={16} height={16} fill="#581845" />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: '5rem' }}>
              <Dropdown.Item onClick={handleOpenPopup}>
                <Flex row center className={styles.dropDownListStyle}>
                  <SvgEditStages height={16} width={16} />
                  <Text style={{ marginLeft: 10 }}>Edit Stages</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item>
                <LinkWrapper onClick={clearTab} to="/account_setting/settings">
                  <Flex row center className={styles.dropDownListStyle}>
                    <SvgEditPipeline height={16} width={16} />
                    <Text style={{ marginLeft: 10 }}>Edit Pipeline</Text>
                  </Flex>
                </LinkWrapper>
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
                        value={formik.values.title}
                        onChange={formik.handleChange('title')}
                        lineInput
                        size={12}
                        className={styles.input}
                        onKeyPress={handleKeyPress}
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
                  doc={defaultStage}
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
            <Button className={styles.update} onClick={handleUpdateStages}>
              Apply
            </Button>
          </Flex>
        </Flex>
      </Modal>
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
