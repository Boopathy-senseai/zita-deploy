import { useSelector } from 'react-redux';
// import { map } from 'highcharts';
// import SvgLocation from '../../icons/SvgLocation';
import SvgCopy from '../../icons/SvgCopy';
// import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { RootState } from '../../store';
// import Flex from '../../uikit/Flex/Flex';
// import MyJobsPostingData from './MyJobsPostingData';
import Flex from '../../uikit/Flex/Flex';
// import SvgMetrics from '../../icons/SvgMetrics';
import Toast from '../../uikit/Toast/Toast'; // eslint-disable-line
import styles from './myjobpostingscreen.module.css';
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

  
const MyJobPostingScreen = () => {

    const {
        // location_list,
        // job_ids,
        // job_title,
        final_list,
        // Jobs_List,
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


     
  return (
   
   <div className="table-responsisssve table_min_height topic ">
        
          <table className="table ">
            <thead >
              <tr >
                <th scope="col">
                  <Text color="theme" bold>
                    Job Title
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Job Id
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Location
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Zita Match
                  </Text>
                </th>
                <th scope="col" style={{ textAlign: 'center' }}>
                  <Text color="theme" bold align="center">
                    Invited to Applly 
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Applicants
                  </Text>
                </th>
                <th className="text-center" scope="col">
                  <Text color="theme" bold>
                    Screening Status
                  </Text>
                </th>
                <th scope="col">
                  <Text color="theme" bold>
                    Status
                  </Text>
                </th>
                {/* <th className="text-center" scope="col">
                  <Text color="theme" bold>
                    Metric
                  </Text>
                </th> */}
                
                <th className="text-center" scope="col">
                  <Text color="theme" bold>
                    Posted on
                  </Text>
                </th>
              </tr>
            </thead>
          <tbody>
           
              
              {final_list &&
                final_list.map((list) => {
console.log(final_list)
                  return (
                   
                   <>
               <tr> 
                <td>
                  <div style={{float:'right'}} >
               <SvgCopy width={15} height={15}  fill={'#FFC203'} />
               </div>
               <div
              tabIndex={0}
              role={'button'}
              style={{ marginLeft: 8}} 
              title="Copy Job Posting URL"
              onClick={() => copyToClipboard(`${domain}/career_job_view/${career_page_url}/${list.id}/${list.job_title}` ,'Link Copied')} 
              onKeyDown={() => {}}
            >
            <Flex className={styles.hellothere}>
        {list.job_title} 
        </Flex>
               {/* <  SvgCopy width={15} height={15}  fill={'#581845'}/> */}</div>
            
            </td>
           

            <td>  {list.job_id}</td>
            <td>  {list.location}</td>
            <td> 04</td>
            <td> 04</td>
            <td> 100</td>
            <td>
              <ul>
              <li>10  Offered</li>
              <li>01  shortlisted</li>
              <li>60  Rejected</li>
              </ul>
            </td>
            <td> {list.jd_status__label_name === "Active" ?(<div style={{color:"green"}}>{list.jd_status__label_name} </div>):("")}
            {list.jd_status__label_name === "Draft" ?(<div style={{color:"#FCC203"}}>{list.jd_status__label_name} </div>):("")}
            {list.jd_status__label_name === "Preview" ?(<div style={{color:"#FF0000"}}>{list.jd_status__label_name} </div>):("")}

           </td> 
           
            {/* <td>  <LinkWrapper to={`/job_view/${list.id}`}>
           <SvgMetrics width={21} height={21} />
        </LinkWrapper></td> */}
            
            <td>{list.job_posted_on_date}</td>
            </tr>
            </>

)})}    
</tbody>
         </table>
             </div>
           
                 
                    
                        )}; 
export default MyJobPostingScreen;
                     
          
            
            
                
                  
                            
                                        
                                
            
                       
           
