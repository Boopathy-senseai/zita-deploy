import SvgHeart from '../../icons/SvgHeart';
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
    <Flex row center className={styles.overAll}>
      <Text color="black">Total Applicants: {total}</Text>
      <div
        tabIndex={-1}
        role={'button'}
        onKeyPress={() => {}}
        title="Favourite Applicants"
        onClick={filterTotalFav}
        className={styles.svgStyle}
      >
        <SvgHeart filled={isTotalFav} height={20} width={20} />
      </div>
    </Flex>
  );
};
export default TotalApplicant;
