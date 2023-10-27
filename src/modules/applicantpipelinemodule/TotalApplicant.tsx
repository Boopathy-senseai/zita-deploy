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
import SvgHeart from '../../icons/SvgHeart';
import SvgMove from '../../icons/SvgMove';
import SvgDownload from '../../icons/SvgDownload';
import SvgComparative from '../../icons/Svgcomparative';
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
  moveDisabled: boolean;
  onExport?: () => void;
  onMove?: (stageId: number) => void;
  onCSVDownload?: () => void;
  onComparative?: any;
  Matching?: any;
};

const TotalApplicant = ({
  jd_id,
  columns,
  total,
  filterTotalFav,
  isTotalFav,
  seletedCardsLength,
  moveDisabled,
  onExport,
  onMove,
  onCSVDownload,
  onComparative,
  Matching
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

  return (
    <>
      <Flex row center between className={styles.overAll}>
        <Text color="theme">
          Total Applicants:{' '}
          <Text bold color="theme">
            {total}
          </Text>
        </Text>
        {/* {seletedCardsLength > 1 && ( */}
        <Flex row center>
          <Flex row center className={styles.bulkSelection}>
            {seletedCardsLength <= 1 ?
              <Text color="theme">{`Select atleast two applicants to enable this options`}</Text> :
              <Flex marginRight={15}> 
                <Text color="theme">{`Selected ${seletedCardsLength} applicants`}</Text>
              </Flex>
            }
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
                onClick={!moveDisabled ? handleMoveOpenPipeline : undefined}
              >
                <SvgMove
                  width={12}
                  height={12}
                  fill={moveDisabled || seletedCardsLength <= 1 ? '#AB8BA2' : undefined}
                />
                <Text
                  bold
                  style={{ marginLeft: '10px' }}
                  color={moveDisabled || seletedCardsLength <= 1 ? 'disabled' : 'theme'}
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
                marginRight={10}
              >
                <SvgDownload width={14} height={14} fill={seletedCardsLength <= 1 ? '#AB8BA2' : undefined} />
                <Text bold style={{ marginLeft: '10px' }} color={seletedCardsLength <= 1 ? 'disabled' : 'theme'}>
                  Export Resumes
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
                onClick={seletedCardsLength > 5 || seletedCardsLength <= 1 && onComparative}
                title={(seletedCardsLength > 5 || seletedCardsLength <= 1) && 'You have the option to choose up to five candidates for the Comparative Analysis.'}
              >
                <SvgComparative fill={seletedCardsLength > 5 || seletedCardsLength <= 1 ? '#AB8BA2' : '#581845'} />
                <Text bold style={{ marginLeft: '10px' }} color={seletedCardsLength <= 1 || seletedCardsLength > 5 ? 'disabled' : 'theme'}>
                  Comparative Analysis
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* )} */}
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
              <SvgHeart width={13} height={12} filled={isTotalFav} />
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
                  <SvgEditStages height={16} width={16} fill="#333333" />
                  <Text style={{ marginLeft: 10 }}>Edit Stages</Text>
                </Flex>
              </Dropdown.Item>

              <Dropdown.Item onClick={onCSVDownload}>
                <Flex row center className={styles.dropDownListStyle}>
                  <SvgCsvDownload height={16} width={16} fill={'#1a1a1a'} />
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
