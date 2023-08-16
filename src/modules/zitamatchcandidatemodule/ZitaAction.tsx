import classNames from 'classnames/bind';
import SvgDownload from '../../icons/SvgDownload';
import Totalcount from '../../globulization/TotalCount';
import SvgHeart from '../../icons/SvgHeart';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import Text from '../../uikit/Text/Text';
import styles from './zitaaction.module.css';

const cx = classNames.bind(styles);
type Props = {
  total: number;
  filterTotalFav: () => void;
  isTotalFav: boolean;
  handleSelectAll: () => void;
  isCheckAll: boolean;
  hanldeDownload: () => void;
  isCheck: string[];
};
const ZitaAction = ({
  total,
  filterTotalFav,
  isTotalFav,
  isCheckAll,
  handleSelectAll,
  hanldeDownload,
  isCheck,
}: Props) => {
  const downloadCheck = isCheck.length === 0;
  return (
    <Flex row center className={styles.overAll}>
      <InputCheckBox
        label="Bulk"
        onChange={handleSelectAll}
        checked={isCheckAll}
        id="zitaaction__checkbox"
        disabled={total === 0}
      />
      <div
        className={cx({ svgDownload: !downloadCheck, svgNone: downloadCheck })}
        title="Download Resume"
        onClick={hanldeDownload}
        tabIndex={-1}
        role={'button'}
        onKeyPress={() => {}}
      >
        <SvgDownload
          height={18}
          width={18}
          fill={downloadCheck ? GARY_4 : PRIMARY}
        />
      </div>
      <div title="Favourite Candidates" className="pointer">
        <SvgHeart
          height={18}
          width={18}
          onClick={filterTotalFav}
          filled={isTotalFav}
        />
      </div>

    
     <Totalcount name="Total Candidates" numbers={total}/>
    </Flex>
  );
};

export default ZitaAction;
