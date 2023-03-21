import React from 'react';
import style from './TopLineLoader.module.css';

interface Props {
  show: boolean;
}

const TopLineLoader = ({ show }: Props) => {
  return (
    <>
      <div
        className={style.loaderContainer}
        style={{
          display: show ? 'block' : 'none',
        }}
      >
        <div className={style.loader}></div>
      </div>
    </>
  );
};

export default TopLineLoader;
