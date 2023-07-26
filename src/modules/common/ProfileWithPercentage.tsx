import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { firstNameChar, isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { colorCode } from '../constValue';
import styles from './profilewithpercentage.module.css';
const cx = classNames.bind(styles);

type Props = {
  index: number;
  dataList: any;
  isPercentage?: boolean;
};

const ProfileWithPercentage = ({ index, dataList, isPercentage }: Props) => {
  const [isColor, setColor] = useState<string[]>([]);
  useEffect(() => {
    setColor(colorCode);
  }, []);
  return (
    <div className={styles.profileDiv}>
      <div
        className={styles.profile}
        style={{
          backgroundColor:
            isEmpty(dataList.image) || dataList.image === 'default.jpg'
              ? isColor[index % isColor.length]
              : 'transparent',
        }}
      >
        {isEmpty(dataList.image) || dataList.image === 'default.jpg' ? (
          <Text bold size={16} color="white" align="center">
            {firstNameChar(dataList.first_name)}
          </Text>
        ) : (
          <img
            alt=""
            className={styles.profile}
            src={`${process.env.REACT_APP_HOME_URL}media/${dataList.image}`}
          />
        )}
      </div>
      {isPercentage && (
        <div
          className={cx({
            percentageStyleError: isEmpty(dataList.match),
            percentageStyle: !isEmpty(dataList.match),
          })}
        >
          <Text className={styles.percentagefont} bold color={isEmpty(dataList.match) ? 'white' : 'black'}>
            {!isEmpty(dataList.match) ? dataList.match : '0'}%
          </Text>
        </div>
      )}
    </div>
  );
};

export default ProfileWithPercentage;
