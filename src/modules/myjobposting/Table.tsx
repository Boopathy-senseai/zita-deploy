import { useSelector } from 'react-redux';
// import { map } from 'highcharts';
// import SvgLocation from '../../icons/SvgLocation';
import SvgCopy from '../../icons/SvgCopy';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
// import { isEmpty } from '../../uikit/helper';
// import Flex from '../../uikit/Flex/Flex';
// import MyJobsPostingData from './MyJobsPostingData';
import Flex from '../../uikit/Flex/Flex';
import { getDateString, isEmpty } from '../../uikit/helper';

import SvgMetrics from '../../icons/SvgMetrics';
import Toast from '../../uikit/Toast/Toast'; // eslint-disable-line
import styles from './myjobpostingscreen.module.css';
import MyJobPostingScreenStatus from './MyJobPostingScreenStatus';
import { FinalListEntity } from './myJobPostingTypes';



// import { myJobPostingDataReducers } from './store/reducer/myjobpostingreducer';

// import { FinalListEntity } from './myJobPostingTypes';
// import classNames from 'classnames';



export const copyToClipboard = (text: string, message?: string) => {
  if (typeof Window === 'undefined') return;
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  Toast(`${message}`, 'LONG', 'success');
};


export interface DateEntity {
    label: string;
    value: string;
  }
export type MyJobFormProps = {
    jobTitle: string;
    jobId: string;
    postedOn: DateEntity;
    jobType: string;
    location: string;
  };
const MyJobPostingScreen = () => {

    const {
        location_list,
        job_ids,
        job_title,
        final_list,
        Jobs_List,
        // is_loadingone,
        // len_list,
        // is_loading,
        career_page_url,
        domain,
        // Permission,
      } = useSelector(
        ({
          myJobPosingReducers,
          myJobPostingDataReducers,
          permissionReducers,
        }: RootState) => ({
          Jobs_List: myJobPostingDataReducers.Jobs_List,
          location_list: myJobPosingReducers.location_list,
          job_ids: myJobPosingReducers.job_ids,
          job_title: myJobPosingReducers.job_title,
          final_list: myJobPostingDataReducers.final_list,
          len_list: myJobPostingDataReducers.len_list,
          is_loading: myJobPostingDataReducers.isLoading,
          is_loadingone: myJobPosingReducers.isLoading,
          career_page_url: myJobPostingDataReducers.career_page_url,
          domain: myJobPostingDataReducers.domain,
          Permission: permissionReducers.Permission,
          
        }),
      );

      type Props = {
        list: FinalListEntity;
      };
      const MyJobsPostingCount = ({ list }: Props) => {
      const zita_match = isEmpty(list.zita_match) ? '0' : list.zita_match;
      const invite_to_apply = isEmpty(list.invite_to_apply)
        ? '0'
        : list.invite_to_apply;
      const applicant = isEmpty(list.applicant) ? '0' : list.applicant;
      }

    

  return (
   
   <div className="table-responsisssve ">
        <div className={styles.fixTableHead}>
          <table className="table">
            <thead className='container'>
              <tr >
                <th>
                  <Text color="theme" bold>
                    Job Title
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold>
                    Job Id
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold>
                    Location
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold>
                    Zita Match
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold >
                    Invited to Apply 
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold >
                    Applicants
                  </Text>
                </th>
                <th  >
                  <Text color="theme" bold>
                    Screening Status
                  </Text>
                </th>
                <th >
                  <Text color="theme" bold>
                    Status
                  </Text>
                </th>
                {/* <th className="text-center" scope="col">
                  <Text color="theme" bold>
                    Metric
                  </Text>
                </th> */}
                
                <th >
                <Text color="theme" bold>
                    Posted on
                  </Text>
                </th>
              </tr>
            </thead>

          <tbody >
           
              {final_list && Jobs_List && location_list &&  job_ids&& job_title&&
                final_list.map((list) => {
                  
                  return (
                   <>
                  <tr> 
                <td>
                 <Flex row top className={styles.hellothere}>
            <LinkWrapper to={`/job_view/${list.id}`}>   
        {list.job_title}  
        </LinkWrapper>
        <div
              role={'button'}
             className={styles.svgstyle}
              title="Copy Job Posting URL"
              onClick={() => copyToClipboard(`${domain}/career_job_view/${career_page_url}/${list.id}/${list.job_title}` ,'Link Copied')} 
              
            >
        <SvgCopy width={15} height={15}  fill={'#FFC203'} />
        </div>
        </Flex>
            </td>
           <td>
            { list.job_id}
            </td>
              <td>
                {list.location}
                </td>
                 <td > 
            <LinkWrapper target={'_parent'} to={`/zita_match_candidate/${list.id}`} className={styles.zitamatch}>
                    {isEmpty(list.zita_match) ? '0' : list.zita_match}
                     </LinkWrapper>
          </td>
               <td >
            <LinkWrapper target={'_parent'} to={`/zita_match_candidate/${list.id}`} className={styles.zitamatch}>
         
            {isEmpty(list.invite_to_apply)
        ? '0'
        : list.invite_to_apply}
        </LinkWrapper>
            </td>
            <td > 
            <LinkWrapper target={'_parent'} to={`/zita_match_candidate/${list.id}`} className={styles.zitamatch}>
          
              {isEmpty(list.applicant) ? '0' : list.applicant} 

        </LinkWrapper>
        </td>
           
               <td>  
           <MyJobPostingScreenStatus 
           list={list} />
              </td>
              
            
            <td> 
              {list.jd_status__label_name === "Active" ?(<div style={{color:"green"}}>{list.jd_status__label_name} </div>):("")}
            {list.jd_status__label_name === "Draft" ?(<div style={{color:"#FCC203"}}>{list.jd_status__label_name} </div>):("")}
            {list.jd_status__label_name === "Preview" ?(<div style={{color:"#FF0000"}}>{list.jd_status__label_name} </div>):("")}
            {list.jd_status__label_name === "Inactive" ?(<div style={{color:"red"}}>{list.jd_status__label_name} </div>):("")}
            </td> 
            {/* <td>  <LinkWrapper to={`/job_view/${list.id}`}>
           <SvgMetrics width={21} height={21} fill={'#FCC203'} />
        </LinkWrapper></td> */}
            <td>{getDateString(list.job_posted_on_date, 'll')}</td>
            </tr>
            </>

)})}    
</tbody>
      </table>
      </div>
             </div>
           
                 
                    
                        )}; 
                        
                       
export default MyJobPostingScreen;
                     
          
            
            
                
                  
                            
                                        
                                
            
                       
           
