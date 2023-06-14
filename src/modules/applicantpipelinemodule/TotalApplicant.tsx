import { Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames, { Value } from 'classnames/bind';
import _ from 'lodash';
import SvgSetting from '../../icons/SvgSetting';
import { Button, Loader } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import SvgEditStages from '../../icons/SvgEditStages';
import { AppDispatch, RootState } from '../../store';

import {
  // addJobPipelineStageMiddleWare,
  // deleteJobPipelineStageMiddleWare,
  // updateJobPipelineStageMiddleWare,
  getTemplateDataMiddleWare,
  // reorderJobPipelineStageMiddleWare,
} from '../../modules/accountsettingsmodule/templatesmodule/store/middleware/templatesmiddleware';

import SvgFavourites from '../../icons/SvgFavourties';
import SvgMove from '../../icons/SvgMove';
import SvgDownload from '../../icons/SvgDownload';
import SvgCsvDownload from '../../icons/SvgCsvDownload';
import styles from './totalapplicant.module.css';
import MovePipelinePopup from './movepopup';
import { columnTypes } from './dndBoardTypes';
import EditStagesModal from './EditStages';

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

  const dispatch: AppDispatch = useDispatch();

  const { stages, isLoading, updateLoading } = useSelector(
    ({ kanbanStagesReducers }: RootState) => ({
      isLoading: kanbanStagesReducers.isLoading,
      stages: kanbanStagesReducers.stages,
      updateLoading: kanbanStagesReducers.update.isLoading,
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
  };
  useEffect(() => {
    dispatch(getTemplateDataMiddleWare());
  }, []);

  const clearTab = () => {
    sessionStorage.setItem('superUserTab', '7');
    sessionStorage.setItem('template', '1');
    sessionStorage.setItem('pipeline', '1');
    sessionStorage.setItem('button', '0');
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
                <Text color="theme">{`Selected ${seletedCardsLength} applicants`}</Text>
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
              title="Settings"
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
      <EditStagesModal
        open={showPopup}
        jd_id={jd_id}
        stages={stages}
        columns={columns}
        handleClosePopup={handleClosePopup}
      />
      {updateLoading && <Loader />}
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
