import { useEffect, useState } from 'react';
import _ from 'lodash';
import Flex from '../../uikit/Flex/Flex';
import { Pangination } from '../../uikit';
import BulkAction from './BulkAction';
import TalentCardMap from './TalentCardMap';
import { DataEntity } from './talentSourcingTypes';


type experienceOptionsType = {
  value: string;
  label: string;
};

type Props = {
  searchData?: DataEntity[];

  handleUnlockSubmit: (arg: string) => void;
  searchLoader: boolean;
  isBachelors: boolean;
  isDoctorate: boolean;
  isMasters: boolean;
 
  isAny: boolean;
  isRelocate: boolean;
  isExperience: experienceOptionsType;
  handleCandidateView: (hashKey: string) => void;
  source_limit: number;
  setSourceLimit: (arg: number) => void;
  setCandidatesLimit: (arg: string) => void;
  isCandidatesLimit: string;
  setSuccess: (arg: boolean) => void;
  setNoLimit: (arg: boolean) => void;
  setNoPermission: (arg: boolean) => void;
  candi_list?: string[];
  setNoCount: (arg: boolean) => void;
  setCandiList: (arg: string[]) => void;
  setFree: (arg: boolean) => void;
  planID?: number;
  update:any;
  val:any;
  isCheck:any;
  setIsCheck:any;
  isSubmitLoader?:any;
  pageNumber?:any;
  handleSetPage?:any;
  // setUnlockLoader: (arg: boolean) => void;
};

const TalentCardList = ({
  searchData,
 
  handleUnlockSubmit,
  searchLoader,
  isBachelors,
  isDoctorate,
  isMasters,
  isAny,
  isExperience,
  isRelocate,
  handleCandidateView,
  source_limit,
  setSourceLimit,
  setCandidatesLimit,
  isCandidatesLimit,
  setSuccess,
  setNoLimit,
  setNoPermission,
  candi_list,
  setNoCount,
  setCandiList,
  setFree,
  planID,
  update,
  val,
  isCheck,
  setIsCheck,
  isSubmitLoader,
  pageNumber,
  handleSetPage,
}: // setUnlockLoader,
Props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [count, setcount] = useState(0);
  const [stylevalue,setstylevalue]=useState(false);

  const usersPerPage = 15;
  const pagesVisited = pageNumber * usersPerPage;
  const length: any = searchData?.length;
  const pageCount = Math.ceil(length / usersPerPage);
 
  // const [isCheck, setIsCheck] = useState<any>([]);
  // const checkArray = isCheckArray.length === 0 ? false : true;
// select box function
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    update(!val)
    setIsCheck(
      searchData &&
        searchData
          .slice(pagesVisited, pagesVisited + usersPerPage)
          .map((li)=>
          candi_list?.includes(li.id.toString()) ? false : li.candidate_hash,
        ),
    );
    if (isCheckAll) {
      setIsCheck([]);
      setIsCheckAll(false);
      update(false)


    }
   

  };

  const handleClick = (e: { target: { id: string; checked: boolean } }) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item: any) => item !== id));
    }
  };

  


  useEffect(() => {
    const valIndex=sessionStorage.getItem("index");
    const ans=(isCheck.length.toString()===valIndex);
    const styleval= Number(valIndex)>9
    setstylevalue(styleval)

    if (isCheckAll && isCheck.length.toString() !== valIndex) {
      setIsCheckAll(false);
      update(false) 
    }
  }, [isCheck,stylevalue]);

  // useEffect(() => {
  //   setIsCheckAll(false);
  //   setIsCheck([]);
  // }, [
  //   searchLoader,
  //   isAny,
  //   isBachelors,
  //   isMasters,
  //   isDoctorate,
  //   isRelocate,
  //   isExperience,
  // ]);

  if (isCheck.length === searchData?.length && isCheckAll === false) {
    setIsCheckAll(true);
    update(true)
  }
  const handleChange=(int:any)=>{
    // setcount(int+1)
  }


//  const mapfuction=()=>{
//     if(searchData){
//       searchData
//           .slice(pagesVisited, pagesVisited + usersPerPage)
//           .map((dataList, index) => {
          
//             return (
//               <>
//            {console.log("index update value",index)}
//            <p>{index}</p>
//               </>
//             )})
//     }
         
//   }

  
  return (
    <>
    <BulkAction
          // setUnlockLoader={setUnlockLoader}
          setCandiList={setCandiList}
          setNoCount={setNoCount}
          setNoLimit={setNoLimit}
          setNoPermission={setNoPermission}
          setSuccess={setSuccess}
          setCandidatesLimit={setCandidatesLimit}
          isCandidatesLimit={isCandidatesLimit}
          source_limit={source_limit}
          setSourceLimit={setSourceLimit}
          handleSelectAll={handleSelectAll}
          isCheckAll={val}
          searchResult={searchData?.length}
          isCheckArray={isCheck}
          setFree={setFree}
          planID={planID}
          setIsCheck={setIsCheck}
        />
    <Flex  style={{width:'100%',  overflowY: 'scroll',height: !stylevalue?'fit-content':window.innerHeight - 240,padding: '0 0 8px 0',alignContent:'flex-start' }}>
     {console.log("index value",window.innerHeight,stylevalue)}
     <Flex wrap row>
        
        {searchData &&
          searchData
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((dataList, index) => {
              return (
                <TalentCardMap
            
                  candi_list={candi_list}
                  handleCandidateView={handleCandidateView}
                  isCheck={isCheck}
                  handleClick={handleClick}
                  key={dataList.first_name + index}
                  talentList={dataList}
                  index={index}
                  handleUnlockSubmit={handleUnlockSubmit}
                />
              );
          })}
     </Flex>
        <Flex marginBottom={10} style={{paddingTop:'10px'}}>
          {searchData?.length !== 0 &&
            pageCount - 1 !== 0 &&
            searchData !== null && isSubmitLoader !== true && (
              <div style={{alignItems:'center',justifyContent:'center',display:'flex', marginBottom:"10px"}}>
                <Pangination
                  maxPages={pageCount - 1}
                  currentPage={pageNumber}
                  setCurrentPage={handleSetPage}
                />
              </div>
            )}
   
        </Flex>
    </Flex>
    </>
  );
};

export default TalentCardList;
// { mapfuction() }