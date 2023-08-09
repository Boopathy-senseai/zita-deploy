import { Flex } from '../../../uikit';
import Button from '../../../uikit/Button/Button';
import { getDateString, isEmpty } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import styles from './subscriptionplan.module.css';

export type tableDataTypes = {
  plan: number | undefined;
  invoice: string | undefined;
  billing: string;
  plan_price: number;
  totalUser: number;
  total_price: number;
  next_billing: string | undefined;
  current_status: boolean | undefined;
  subscription_changed_to: any;
  free_expired: any;
};
type Props = {
  data:any;
};
const PlanTable =  ( data : Props)  => {
  console.log("++++++++++++",data.data[0].current_status,data.data[0])
  return (
    <Flex row style={{paddingBottom: '10px',paddingLeft: '10px'}}>
      <Flex center className={styles.boxshadow}>
      <Text>Subscription Plan</Text>
      <Text className={styles.textstyle}>
      {data.data[0].plan === 1 && <Text bold style={{color:"#581845"}}>Free Trial</Text>}
      {(data.data[0].plan === 2 || data.data[0].plan === 3) && <Text bold  style={{color:"#581845"}}>BASIC</Text>}
      {(data.data[0].plan === 4 || data.data[0].plan === 5) && <Text bold  style={{color:"#581845"}}>PRO</Text>}
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Invoice Date</Text>
      <Text className={styles.textstyle}>
      <Text bold style={{color:"#581845"}}>{getDateString(data.data[0].invoice , 'll')}</Text>
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Billing Frequency</Text>
      <Text className={styles.textstyle}>
       {data.data[0].plan === 1 && <Text bold style={{color:"#581845"}}>-</Text>}
       {(data.data[0].plan === 2 || data.data[0].plan === 4) && <Text bold style={{color:"#581845"}}>Monthly</Text>}
       {(data.data[0].plan === 3 || data.data[0].plan === 5) && <Text bold style={{color:"#581845"}}>Annual</Text>}
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Billing Frequency</Text>
      <Text className={styles.textstyle}>
       {data.data[0].plan === 1 && <Text bold style={{color:"#581845"}}>-</Text>}
       {(data.data[0].plan === 2 || data.data[0].plan === 4) && <Text bold style={{color:"#581845"}}>Monthly</Text>}
       {(data.data[0].plan === 3 || data.data[0].plan === 5) && <Text bold style={{color:"#581845"}}>Annual</Text>}
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Plan Price</Text>
      <Text className={styles.textstyle}>
      <Text bold style={{color:"#581845"}} >{data.data[0].plan !== 1 ? `$ ${data.data[0].plan_price}` : 'Free'}</Text>
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Total Users</Text>
      <Text className={styles.textstyle}>
      <Text bold style={{color:'#581845'}}>{data.data[0].totalUser}</Text>
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Total Price</Text>
      <Text className={styles.textstyle}>
      <Text bold style={{color:'#581845'}}>${data.data[0].total_price}</Text>
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Next Billing Date</Text>
      <Text className={styles.textstyle}>
      <Text bold style={{color:'#581845'}}>{getDateString(data.data[0].next_billing, 'll')}</Text>
      </Text>
      </Flex>
      <Flex center className={styles.boxshadow}>
      <Text>Next Billing Date</Text>
      <Text className={styles.textstyle}>
      
          {data.data[0].current_status === true &&
            isEmpty(data.data[0].subscription_changed_to) &&
            data.data[0].plan !== 1 && (
                <Text bold style={{color:"#00BE4B"}}> Active </Text>
            )}
          {data.data[0].plan === 1 && (
            <>
              {data.data[0].plan === 1 && data.data[0].free_expired === 0 ? (
                <Text  bold style={{color:"red"}} >Expired</Text>
              ) : (
                
                <Text bold style={{color:"#00BE4B"}}>Active </Text>
               
              )}
            </>
          )}

          {data.data[0].current_status === false && data.data[0].free_expired !== 0 && (
            <Text bold style={{color:"red"}}>Inactive</Text>
          )}
          {data.data[0].current_status === true &&
            Number(data.data[0].subscription_changed_to) === -1 &&
            data.data[0].plan !== 1 && (
            
                <Text  bold style={{color:"yellow"}}>Cancelled</Text>
            
            )}
          {data.data[0].current_status === true &&
            Number(data.data[0].subscription_changed_to) === -2 &&
            data.data[0].plan !== 1 && (
              
                <Text  bold style={{color:"red"}}>Expired</Text>
             
            )}
        
      </Text>
      </Flex>
   
    </Flex>
  )
}
export default PlanTable;

// export const planTable = () => [
//   {
//     title: 'Subscription Plan',
//     dataIndex: 'plan',
//     key: 'plan',
//     render: (_a: number, value: tableDataTypes) => {
//       return (
//         <div>
//           {value.plan === 1 && <Text bold>Free Trial</Text>}
//           {(value.plan === 2 || value.plan === 3) && <Text bold>BASIC</Text>}
//           {(value.plan === 4 || value.plan === 5) && <Text bold>PRO</Text>}
//         </div>
//       );
//     },
//   },
//   {
//     title: 'Invoice Date',
//     dataIndex: 'invoice',
//     key: 'invoice',
//     render: (a: string) => {
//       return <Text>{getDateString(a, 'll')}</Text>;
//     },
//   },
//   {
//     title: 'Billing Frequency',
//     dataIndex: 'billing',
//     key: 'billing',
//     render: (_a: string, value: tableDataTypes) => {
//       return (
//         <div>
//           {value.plan === 1 && <Text>-</Text>}
//           {(value.plan === 2 || value.plan === 4) && <Text>Monthly</Text>}
//           {(value.plan === 3 || value.plan === 5) && <Text>Annual</Text>}
//         </div>
//       );
//     },
//   },
//   {
//     title: 'Plan Price',
//     dataIndex: 'plan_price',
//     key: 'plan_price',
//     render: (price: string, value: tableDataTypes) => {
//       return <Text>{value.plan !== 1 ? `$ ${price}` : 'Free'}</Text>;
//     },
//   },
//   {
//     title: 'Total Users',
//     dataIndex: 'totalUser',
//     key: 'totalUser',
//     render: (total: number) => {
//       return <Text>{total}</Text>;
//     },
//   },
//   {
//     title: 'Total Price',
//     dataIndex: 'total_price',
//     key: 'total_price',
//     render: (total_price: number, value: tableDataTypes) => {
//       return <Text>{value.plan !== 1 ? `$ ${total_price}` : 'Free'}</Text>;
//     },
//   },
//   {
//     title: 'Next Billing Date',
//     dataIndex: 'next_billing',
//     key: 'next_billing',
//     render: (next_billing: number) => {
//       return <Text>{getDateString(next_billing, 'll')}</Text>;
//     },
//   },
//   {
//     title: 'Current Status',
//     dataIndex: 'current_status',
//     key: 'current_status',
//     render: (_a: any, value: tableDataTypes) => {
//       return (
//         <div>
//           {value.current_status === true &&
//             isEmpty(value.subscription_changed_to) &&
//             value.plan !== 1 && (
//               <Button className={styles.active} types="success">
//                 <Text> Active </Text>
//               </Button>
//             )}
//           {value.plan === 1 && (
//             <>
//               {value.plan === 1 && value.free_expired === 0 ? (
//                 <Button disabled>Expired</Button>
//               ) : (
//                 <Button className={styles.active} types="success">
//                   <Text> Active </Text>
//                 </Button>
//               )}
//             </>
//           )}

//           {value.current_status === false && value.free_expired !== 0 && (
//             <Button className={styles.Inactive}><Text>Inactive</Text></Button>
//           )}
//           {value.current_status === true &&
//             Number(value.subscription_changed_to) === -1 &&
//             value.plan !== 1 && (
//               <Button className={styles.Inactive}>
//                 <Text>Cancelled</Text>
//               </Button>
//             )}
//           {value.current_status === true &&
//             Number(value.subscription_changed_to) === -2 &&
//             value.plan !== 1 && (
//               <Button disabled>
//                 <Text>Expired</Text>
//               </Button>
//             )}
//         </div>
//       );
//     },
//   },
// ];
