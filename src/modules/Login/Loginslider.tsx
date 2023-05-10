import { useState, useEffect } from 'react';
import image1 from '../../assets/images/login1.png';
import image2 from '../../assets/images/login2.png';
import image3 from '../../assets/images/login3.png';

import Flex from '../../uikit/Flex/Flex';
import styles from './loginscreen.module.css';
const Loginslider = () => {
  const [currentCount, setCount] = useState(1);
  const timer = () => setCount(currentCount + 1);

  useEffect(() => {
    if (currentCount >= 3) {
      return;
    }
    const id = setInterval(timer, 2500);
    return () => clearInterval(id);
  }, [Image, currentCount]);

  const select = (val: number) => {
    setCount(val);
  };

  return (
    <>
      <Flex>
        {currentCount === 1 ? (
          <>
            <img src={image1} alt="log" />
          </>
        ) : (
          ''
        )}
        {currentCount === 2 ? (
          <>
            <img src={image2} alt="log" />
          </>
        ) : (
          ''
        )}
        {currentCount === 3 ? (
          <>
            <img src={image3} alt="log" />
          </>
        ) : (
          ''
        )}
      </Flex>
      <Flex middle row>
        <button
          className={
            currentCount === 1 ? styles.sliderbutton : styles.sliderbuttonoff
          }
          onClick={() => select(1)}
        ></button>
        <button
          className={
            currentCount === 2 ? styles.sliderbutton : styles.sliderbuttonoff
          }
          onClick={() => select(2)}
        ></button>
        <button
          className={
            currentCount === 3 ? styles.sliderbutton : styles.sliderbuttonoff
          }
          onClick={() => select(3)}
        ></button>
      </Flex>
    </>
  );
};

export default Loginslider;
