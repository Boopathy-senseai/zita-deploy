import { useState } from 'react';
import classNames from 'classnames/bind';
import Star from './Star';
import styles from './starrating.module.css';

const cx = classNames.bind(styles);

type Props = {
  setRating: (a: number) => void;
  rating: number;
  pointer?: boolean;
};
const StarRating = ({ setRating, rating, pointer }: Props) => {
  const [selection, setSelection] = useState(0);

  const hoverOver = (event: any) => {
    let starId = 0;
    if (event && event.target && event.target.getAttribute('star-id')) {
      starId = event.target.getAttribute('star-id');
    }
    setSelection(starId);
  };

  return (
    <div // eslint-disable-line
      className={cx({ none: pointer })}
      onMouseOver={hoverOver}
      onMouseOut={() => hoverOver(null)}
      tabIndex={-1}
      role={'button'}
      onKeyPress={() => {}}
      onClick={(event: any) => setRating(event.target.getAttribute('star-id'))}
    >
      {Array.from({ length: 5 }, (_v, i) => (
        <Star
          key={i}
          starId={i + 1}
          marked={selection ? selection > i : rating > i}
        />
      ))}
    </div>
  );
};

export default StarRating;
