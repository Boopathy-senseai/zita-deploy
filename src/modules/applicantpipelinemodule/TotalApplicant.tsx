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
  StageData,
  jobPipelineForm,
} from '../accountsettingsmodule/templatesmodule/templatesPageTypes';
import { AppDispatch, RootState } from '../../store';
import SvgPlusCircle from '../../icons/SvgAddCircle';

import {
  addJobPipelineStageMiddleWare,
  deleteJobPipelineStageMiddleWare,
  updateJobPipelineStageMiddleWare,
  jobPipelineStagesMiddleWare,
  jobPipelineSuggestionsMiddleWare,
  reorderJobPipelineStageMiddleWare,
} from '../../modules/accountsettingsmodule/templatesmodule/store/middleware/templatesmiddleware';

import SvgTickBox from '../../icons/SvgTickBox';
import SvgCloseBox from '../../icons/SvgCloseBox';
import { isEmpty } from '../../uikit/helper';
import SvgFavourites from '../../icons/SvgFavourties';
import SvgMove from '../../icons/SvgMove';
import SvgDownload from '../../icons/SvgDownload';
import styles from './totalapplicant.module.css';
import MovePipelinePopup from './movepopup';
const cx = classNames.bind(styles);

type Props = {
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
  seletedCardsLength: number;
  onExport?: () => void;
  onMove?: (stageId: string) => void;
};

const TotalApplicant = ({
  total,
  filterTotalFav,
  isTotalFav,
  seletedCardsLength,
  onExport,
  onMove,
}: Props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [movePopup, setMovePopup] = useState(false);
  const [stage, setStage] = useState(false);
  const [isLocationLoader, setLocationLoader] = useState(false);

  const dispatch: AppDispatch = useDispatch();
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
  const initial = {
    title: '',
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
  const isDuplicate = (title: string, data: string[]) => {
    return data
      .map((str) => str.trim().toLowerCase() === title.trim().toLowerCase())
      .includes(true);
  };
  const handleJobPipeline = (values: jobPipelineForm) => {
    const errors: Partial<jobPipelineForm> = {};

    if (!isEmpty(values.title) && values.title.length > 25) {
      errors.title = 'Stage name should not exceed 25 characters.';
    }
    if (
      isDuplicate(
        values.title,
        stages.map((doc) => doc.title),
      )
    ) {
      errors.title = 'Duplicate name';
    }
    return errors;
  };
  const toggleStage = () => {
    setStage(!stage);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: initial,
    validate: handleJobPipeline,
    onSubmit: (form) => {
      addStage({ id: `${new Date().getTime()}`, title: form.title });
      toggleStage();
    },
  });
  const clearTab = () => {
    sessionStorage.setItem('superUserTab', '7');
    sessionStorage.setItem('template', '0');
    sessionStorage.setItem('pipeline', '0');
  };

  const onStageDelete = (doc: StageData) => {
    dispatch(deleteJobPipelineStageMiddleWare(doc.id));
  };
  const isStageExist = (id: string) => {
    return stages.find((doc) => doc.id === id) !== undefined;
  };
  const defaultStage: StageData = {
    id: '1STG',
    color: '#581845',
    title: 'New Applicants',
    disabled: true,
    palatteDisabled: true,
  };
  const onReorderChange = (list: StageData[]) => {
    dispatch(reorderJobPipelineStageMiddleWare(list));
  };
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
                  onClick={handleMoveOpenPipeline}
                >
                  <SvgMove width={12} height={12} />
                  <Text style={{ marginLeft: '10px' }} color="theme">
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
            <Flex row center>
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
          <Button className={styles.btn1Style} types="primary">
            <SvgList width={16} height={16} fill="#581845" />
          </Button>
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
              Edit Stage
            </Text>
          </Flex>
          <Flex row noWrap>
            <Flex flex={1} className={styles.columnGroup}>
              {stage === false ? (
                <Button
                  types="secondary"
                  onClick={() => toggleStage()}
                  className={styles.newBtn}
                >
                  <Flex row center>
                    <SvgPlusCircle fill="#581845" />
                    <Text color="theme" size={16} style={{ marginLeft: '5px' }}>
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
                </Flex>
              )}
              <Flex
                column
                style={{
                  overFlow: 'none',
                  paddingTop: '15px',
                  borderTop: '1px solid #c3c3c3',
                }}
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
                  list={stages}
                  onEdit={onStageEdit}
                  onDelete={onStageDelete}
                  onChange={onReorderChange}
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
            <Button className={styles.update} onClick={() => undefined}>
              Apply
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};
// const ActionsButton = ({ onEditStages, onEditPipeline }) => {
//   return (
//     <>

//     </>
//   );
// };
export default TotalApplicant;
