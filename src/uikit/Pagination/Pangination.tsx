import classNames from 'classnames/bind';
import SvgLeft from '../../icons/SvgLeft';
import SvgRight from '../../icons/SvgRight';
import Text from '../Text/Text';
import styles from './pagination.module.css';

const cx = classNames.bind(styles);

type Props = {
  currentPage: number;
  setCurrentPage: (arg: number) => void;
  maxPages: number;
};
const Pangination = ({ currentPage, setCurrentPage, maxPages }: Props) => {
  let items = [];
  let leftSide;
  let rightSide;

  if (maxPages <= 5) {
    leftSide = 0;
    rightSide = maxPages;
  } else {
    if (currentPage <= 3) {
      leftSide = 0;
      rightSide = 4;
    } else if (currentPage + 2 >= maxPages) {
      leftSide = maxPages - 4;
      rightSide = maxPages;
    } else {
      leftSide = currentPage - 2;
      rightSide = currentPage + 2;
    }
  }

  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <div
        key={number}
        className={cx('roundEffect', { active: number === currentPage })}
        onClick={() => {
          setCurrentPage(number);
          window.scrollTo({top: 0})
        }}
        tabIndex={-1}
        role={'button'}
        onKeyPress={() => {}}
      >
        {number + 1}
      </div>,
    );
  }
  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({top: 0})
    }
  };

  const prevPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({top: 0})
    }
  };
  const handleFirst = () => {
    setCurrentPage(0);
    window.scrollTo({top: 0})
  };
  const handleLast = () => {
    setCurrentPage(maxPages);
    window.scrollTo({top: 0})
  };
  const disabledFirst = currentPage === 0;
  const disabledLast = currentPage === maxPages;

  const paginationRender = (
    <div className={styles.renderContainer} >
      <Text
        onClick={handleFirst}
        bold
        className={cx('first', {
          notAllowd: disabledFirst,
          pointer: !disabledFirst,
        })}
        size={14}
        color={disabledFirst ? 'gray' : 'theme'}
      >
        First
      </Text>
      <div
        className={cx('svgLeft', {
          notAllowd: disabledFirst,
          pointer: !disabledFirst,
        })}
        onClick={prevPage}
        tabIndex={-1}
       
        role={'button'}
        onKeyPress={() => { }}
      >
        <SvgLeft fill={disabledFirst ? '#979797' : '#424242'} />
      </div>
      {items}
      <div
        className={cx('svgRight', {
          notAllowd: disabledLast,
          pointer: !disabledLast,
        })}
        onClick={nextPage}
        tabIndex={-1}
        role={'button'}
        onKeyPress={() => {}}
      >
        <SvgRight fill={disabledLast ? '#979797' : '#424242'} />
      </div>
      <Text
        onClick={handleLast}
        bold
        className={cx('last', {
          notAllowd: disabledLast,
          pointer: !disabledLast,
        })}
        color={disabledLast ? 'gray' : 'theme'}
      >
        Last
      </Text>
    </div>
  );
  return paginationRender;
};

export default Pangination;
