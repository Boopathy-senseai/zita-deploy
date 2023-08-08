import classNames from 'classnames/bind';
import { Dropdown } from 'react-bootstrap';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SvgDownload from '../../icons/SvgDownload';
import Totalcount from '../../globulization/TotalCount';
import SvgHeart from '../../icons/SvgHeart';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { Button } from '../../uikit';
import {SelectTag} from '../../uikit';
import SvgFavourites from '../../icons/SvgFavourties';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import Text from '../../uikit/Text/Text';
import { sortOptions } from './mock';
import styles from './zitaaction.module.css';

const cx = classNames.bind(styles);
type Props = {
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
  handleSelectAll: () => void;
  isCheckAll: boolean;
  hanldeDownload: () => void;
  handlesortby: (selectedValue: string) => void;
  isCheck: string[];
  isSortOptions: {
    value: string;
    label: string;
  };
  setSortOptions: Dispatch<
    SetStateAction<{
      value: string;
      label: string;
    }>
  >;
};
const ZitaAction = ({
  total,
  filterTotalFav,
  isTotalFav,
  isCheckAll,
  handleSelectAll,
  hanldeDownload,
  isCheck,
  setSortOptions,
  isSortOptions,
  handlesortby
}: Props) => {
  const downloadCheck = isCheck.length === 0;
  return (
    <Flex row center between className={styles.overAll}>
      <Flex row>
           <Flex marginTop={2}> 
      <InputCheckBox
          onChange={handleSelectAll}
          checked={isCheckAll}
          id="zitaaction__checkbox"
          disabled={total === 0}
        /></Flex>
        <Flex marginLeft={5}>
        <Totalcount name="Total Candidates" numbers={total} /></Flex>
      </Flex>
      
      {/* <div title="Favourite Candidates" className="pointer">
          <SvgHeart
            height={18}
            width={18}
            onClick={filterTotalFav}
            filled={isTotalFav}
          />
        </div> */}
        <Flex>
         {downloadCheck ===false &&
          
          //   <SvgDownload
          //   height={18}
          //   width={18}
          //   fill={downloadCheck ? GARY_4 : PRIMARY}
          // />
         <Flex row center className={styles.bulktab}>
           <Flex row center className={styles.bulkSelection}>
           <Flex marginRight={0}>
               <Text color="theme">{`Selected ${isCheck.length} Candidates`}</Text>
             </Flex>

             <Flex row className={styles.bulkButton}>
         <Flex
             row
                 center
                 style={{
               paddingLeft: '5px',
               borderLeft: '1px solid #581845',
               cursor: 'pointer',
             }}
             onClick={hanldeDownload}
             title="Download Resumes"
               >
                 <SvgDownload width={14} height={14} />
                 <Text style={{ marginLeft: '10px' }} color="theme">
                    Export Resumes
                 </Text>
               </Flex>
              </Flex>
           </Flex>
         </Flex>
        //   <Flex row center className={styles.bulktab}>
        //   <Flex row center className={styles.bulkSelection}>
        //     <Flex marginRight={0}>
        //       <Text color="theme">{`Selected ${isCheck.length} Candidates`}</Text>
        //     </Flex>

        //     <Flex row className={styles.bulkButton}>
        //       <Flex
        //         row
        //         center
        //         style={{
        //           paddingLeft: '5px',
        //           borderLeft: '1px solid #581845',
        //           cursor: 'pointer',
        //         }}
        //         onClick={hanldeDownload}
        //         title="Download Resumes"
        //       >
        //         <SvgDownload width={14} height={14} />
        //         <Text style={{ marginLeft: '10px' }} color="theme">
        //             Export Resumes
        //         </Text>
        //       </Flex>
        //     </Flex>
        //   </Flex>
        // </Flex>
          }
        </Flex>
        <Flex row>
        <Flex  className={styles.sortbybar}>
      <Text className={styles.sortText}>Sort By:</Text>
          <div className={styles.selectTagStyle}>
            <SelectTag
              stylechangess1
              id="mydatabasebulkaction__sort"
              value={isSortOptions}
              options={sortOptions}
              onChange={(options) => {
                setSortOptions(options);
                handlesortby(options.value);
              }}
              isSearchable
            />
          </div>
          </Flex>
          <Flex>
        <Button
            className={styles.btnStyle}
            types="primary"
            onClick={filterTotalFav}
          >
            <Flex row center style={{ cursor: 'pointer' }}>
              <SvgHeart filled={isTotalFav} />
              <Text
                style={{ marginLeft: '5px' }}
                color="theme"
                title={'Favourite Candidates'}
              >
                Favourites
              </Text>
            </Flex>
          </Button></Flex>
        </Flex>
        
{/*        
     
        <div
          className={cx({ svgDownload: !downloadCheck, svgNone: downloadCheck })}
          title="Download Resume"
          onClick={hanldeDownload}
          tabIndex={-1}
          role={'button'}
          onKeyPress={() => { }}
        >
          <SvgDownload
            height={18}
            width={18}
            fill={downloadCheck ? GARY_4 : PRIMARY}
          />
        </div> */}
     
      

    </Flex>
  );
};

export default ZitaAction;
