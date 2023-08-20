/* eslint-disable */
import classNames from 'classnames/bind';
import { FormikProps } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgDownload from '../../icons/SvgDownload';
import SvgHeart from '../../icons/SvgHeart';
import { AppDispatch } from '../../store';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { sortOptions } from './mock';
import Totalcount from '../../globulization/TotalCount';
import styles from './mydatabasebulkaction.module.css';
import { MyDataFormProps } from './MyDataBaseScreen';
import { myDataBaseDataMiddleWare } from './store/middleware/mydatabasemiddleware';

const cx = classNames.bind(styles);

type Props = {
  totalCount: number;
  filterFormik: FormikProps<MyDataFormProps>;
  isFav: boolean;
  handleFav: () => void;
  handleSelectAll: () => void;
  isCheckAll: boolean;
  hanldeDownload: () => void;
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
  tabKey: string;
  addFavFilter: string;
  qaValue: string;
  skillsOptionsList: any;
  isPage: number;
};
const MyDataBaseBulkAction = ({
  totalCount,
  filterFormik,
  isFav,
  handleFav,
  isCheckAll,
  handleSelectAll,
  hanldeDownload,
  isCheck,
  isSortOptions,
  setSortOptions,
  tabKey,
  addFavFilter,
  skillsOptionsList,
  qaValue,
  isPage,
}: Props) => {
  const [isCheckbox, setCheckBox] = useState(false);
  const checkValue = isCheck.length === 0;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      myDataBaseDataMiddleWare({
        applicant_only: isCheckbox ? '1' : '0',
        jobTitle: filterFormik.values.jobTitle,
        fav: addFavFilter,
        experience: filterFormik.values.experience.value,
        educationLevel: qaValue,
        typeofJob: filterFormik.values.jobType,
        location: filterFormik.values.locationSearch,
        skill_match: skillsOptionsList,
        relocate: filterFormik.values.reLocateValue,
        candidate: filterFormik.values.searchValue,
        userType: tabKey,
        sort: isSortOptions.value,
        page: isPage + 1,
      }),
    );
  }, [isCheckbox]);
  const chklen=isCheck.length>0

  return (
    <Flex row between center className={styles.overAll}>
      <Flex row center className={styles.totalcandidatescheckbox}>
        <InputCheckBox
          checked={isCheckAll}
          onChange={handleSelectAll}
          id="mydatabasebulkaction__input"
        />

        <div
          className={cx('svgDownload', { svgDownloadNone: checkValue })}
          >
          <Flex className={styles.totalcandidatescount}>
          <Totalcount 
          name="Total Candidates"
          numbers={totalCount}
        />
          </Flex>
          {/* <Text className={styles.totalCount}>
          {totalCount}
          </Text> */}
        </div>
          

          
        {!isEmpty(filterFormik.values.jobTitle) && (
        <Flex row center>
          {tabKey === '3' && (
            <InputCheckBox
              label="Show only applied candidates"
              onClick={() => setCheckBox(!isCheckbox)}
              checked={isCheckbox}
            />
          )}
        </Flex>
      )}
              <Flex>
          
          {chklen && (
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
            )}
            </Flex>
      </Flex>
      <Flex>
        <Flex className={styles.favandsort}>
        {!isEmpty(filterFormik.values.jobTitle) && (
      <Flex className={styles.sortbybar}>
      <Text className={styles.sortText}>Sort By:</Text>
          <div className={styles.selectTagStyle}>
            <SelectTag
              stylechangess1 
              id="mydatabasebulkaction__sort"
              value={isSortOptions}
              options={sortOptions}
              onChange={(options) => {
                setSortOptions(options);
              }}
            />
          </div>
          <Flex width={5}></Flex>
          <div
            onClick={handleFav}
            title="Favourite Candidates"
            className={styles.pointer}
            // tabIndex={-1}
            role={'button'}
            onKeyPress={() => {}}
          >
            <div className={styles.svgHeart}>
              <SvgHeart width={13} height={13} filled={isFav} />
            </div>
              <div 
                className={styles.favourites}
                >
                  Favourites
                </div>
          </div> 
          </Flex>
        )}
      </Flex>
    </Flex>
    </Flex>    
  );
};
export default MyDataBaseBulkAction;
