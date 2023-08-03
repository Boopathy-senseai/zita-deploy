import classNames from 'classnames/bind';
import { Dropdown } from 'react-bootstrap';
import SvgDownload from '../../icons/SvgDownload';
import Totalcount from '../../globulization/TotalCount';
import SvgHeart from '../../icons/SvgHeart';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { Button } from '../../uikit';
import SvgFavourites from '../../icons/SvgFavourties';
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
      <Flex>
      {/* <div title="Favourite Candidates" className="pointer">
          <SvgHeart
            height={18}
            width={18}
            onClick={filterTotalFav}
            filled={isTotalFav}
          />
        </div> */}
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
                title={'Favourite Applicants'}
              >
                Favourites
              </Text>
            </Flex>
          </Button>
        </Flex>
        {console.log()}
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

    </Flex>
  );
};

export default ZitaAction;
