import SvgHeart from '../../icons/SvgFav';
import SvgList from '../../icons/SvgList';
import SvgSetting from '../../icons/SvgSetting';
import { Button } from '../../uikit';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import styles from './totalapplicant.module.css';

type Props = {
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
};
const TotalApplicant = ({ total, filterTotalFav, isTotalFav }: Props) => {
  return (
    <Flex row center between className={styles.overAll}>
      <Text color="theme">Total Applicants: <Text bold color="theme">{total}</Text></Text>
      <Flex row center marginRight={10}>
      <Button className={styles.btnStyle} types="primary">
        <Flex row center >
          <SvgHeart filled={isTotalFav} />
          <Text style={{marginLeft: "5px"}} color="theme">Favourites</Text>
        </Flex>
      </Button>
      <SvgSetting width={16} height={16} fill='#581845'/>
      <Flex marginLeft={10}></Flex>
      <SvgList  width={16} height={16} fill='#581845'/>

      </Flex>
      
    </Flex>
  );
};
export default TotalApplicant;
