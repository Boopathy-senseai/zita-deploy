import { FormikProps } from 'formik';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Flex from '../../uikit/Flex/Flex';
import { getBlur, getFocus } from '../../uikit/helper';
import Pangination from '../../uikit/Pagination/Pangination';
import SvgNomessage from '../../icons/SvgNomessage';
import SvgNotinterests from '../../icons/SvgNotinterests';
import Text from '../../uikit/Text/Text';
import SvgAdd from '../../icons/SvgAdd';
import SvgNotInterested from '../../icons/SvgNotInterested';
import MyDataBaseBulkAction from './MyDataBaseBulkAction'; // eslint-disable-line
import MyDataBaseCard from './MyDataBaseCard'; // eslint-disable-line
import { MyDataFormProps } from './MyDataBaseScreen'; // eslint-disable-line
import { DataEntity } from './myDataBaseTypes';
import styles from './mydatabaselist.module.css';


type Props = {
  data: DataEntity[];
  tabKey: string;
  totalCount: number;
  filterFormik: FormikProps<MyDataFormProps>;
  qaValue: string;
  skillsOptionsList: any;
  jobId: string | boolean;
  hanldeInvite: (arg: number) => void;
  isFav: boolean;
  handleFav: () => void;
  handleSelectAll: () => void;
  isCheckAll: boolean;
  isCheck: string[];
  handleCheckBoxClick: (e: {
    target: { id: string; checked: boolean };
  }) => void;
  hanldeDownload: () => void;
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
  isPage: number;
  setPage: (arg: number) => void;
  addFavFilter: string;
};

const MyDataBaseList = ({
  data,
  tabKey,
  totalCount,
  filterFormik,
  qaValue,
  skillsOptionsList,
  jobId,
  hanldeInvite,
  isFav,
  handleFav,
  isCheckAll,
  isCheck,
  handleSelectAll,
  handleCheckBoxClick,
  hanldeDownload,
  isSortOptions,
  setSortOptions,
  isPage,
  setPage,
  addFavFilter,
}: Props) => {
  const usersPerPage = 15;
  const pageCount = Math.ceil(totalCount / usersPerPage);
  const sidebar=sessionStorage.getItem("EmpToggle");
const size=sidebar==="1"
// pagination function
  const handleSetPagination = (a: number) => {
    setPage(a);
    if (data.length !== 0) {
      getFocus(data[0].id.toString());
      getBlur(data[0].id.toString());
    }
  };
  useEffect(()=>{

  },[])
  // const getHeight = jobId === false ? 293 : 303;
  const getHeight = jobId === false ? 271 : 303
  return (
    <div>
      <MyDataBaseBulkAction
        totalCount={totalCount}
        filterFormik={filterFormik}
        isFav={isFav}
        handleFav={handleFav}
        handleSelectAll={handleSelectAll}
        isCheckAll={isCheckAll}
        hanldeDownload={hanldeDownload}
        isCheck={isCheck}
        setSortOptions={setSortOptions}
        isSortOptions={isSortOptions}
        tabKey={tabKey}
        addFavFilter={addFavFilter}
        qaValue={qaValue}
        skillsOptionsList={skillsOptionsList}
        isPage={isPage}
      />

      <div
        style={{
          height: window.innerHeight - 260,
          overflowY: 'scroll',
          overflowX:"hidden",
          paddingRight: 0,
          paddingTop: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
        }}
      >
        {data && data.length === 0 && (
          <Flex flex={1} center middle height={'100%'} style={{display:"flex"}}>
            <SvgNotinterests style={{marginBottom:"15px",filter:"opacity(0.5)"}}/>
            <Text color="gray" style={{ position: 'relative', bottom: 16 }}>
              No candidate found
            </Text>
          </Flex>
        )}
        {data &&
          data.map((dataList, index) => {
            return (
              <MyDataBaseCard
                index={index}
                key={dataList.first_name + index}
                dataList={dataList}
                qaValue={qaValue}
                skillsOptionsList={skillsOptionsList}
                tabKey={tabKey}
                filterFormik={filterFormik}
                jobId={jobId}
                hanldeInvite={hanldeInvite}
                isFav={isFav}
                isCheck={isCheck}
                handleCheckBoxClick={handleCheckBoxClick}
                isSortOptions={isSortOptions}
                isPage={isPage}
                addFavFilter={addFavFilter}
              />
            );
          })}
          <Flex center middle className={styles.pagination}>
        {totalCount > 15 && (
          <Flex>
            <Pangination
              maxPages={pageCount - 1}
              currentPage={isPage}
              setCurrentPage={handleSetPagination}
            />
          </Flex>
        )}
        </Flex>
      </div>

    </div>
  );
};

export default MyDataBaseList;
