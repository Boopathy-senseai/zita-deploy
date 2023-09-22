import { useState, useEffect } from 'react';
import image1 from '../../assets/images/login1.png';
import image2 from '../../assets/images/login2.png';
import image3 from '../../assets/images/login3.png';
import image4 from '../../assets/images/login4.png';
import image5 from '../../assets/images/login5.png';
import image6 from '../../assets/images/login6.png';
import image7 from '../../assets/images/login7.png';
import image8 from '../../assets/images/login8.png';
import image9 from '../../assets/images/login9.png';
import Flex from '../../uikit/Flex/Flex';
import styles from './loginscreen.module.css';
const Loginslidercandidate = () => {
  const [currentCount, setCount] = useState(1);
  const [seconds, setSeconds] = useState(1000);
  
  const timer = () => setCount(currentCount + 1);

  useEffect(() => {
    if (currentCount >3) {
      const interval = setInterval(() => {
        setSeconds(seconds + 1);
      }, 2500);
      setCount(1)
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
            <img src={image8} alt="log" />
          </>
        ) : (
          ''
        )}
        {currentCount === 2 ? (
          <>
            <img src={image9} alt="log" />
          </>
        ) : (
          ''
        )}
        {currentCount === 3 ? (
          <>
            <img src={image6} alt="log" />
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

export default Loginslidercandidate;
