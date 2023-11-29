import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { lowerCase } from 'lodash';
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
  // const words =  notes[0]?.updated_by?.split(' ')
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
          <Text
            bold
            size={16}
            color="white"
            align="center"
            style={{ textTransform: 'uppercase' }}
          >
            {dataList?.first_name &&
            `${dataList?.first_name[0][0]}${
              dataList?.last_name ? dataList?.last_name[0][0] : ''
            }`}

            {/* {firstNameChar(dataList.first_name)}{dataList.last_name?.charAt(0)} */}
            {/* {dataList.first_name.charAt(0)} */}
            {/* {dataList.last_name?.charAt(0)} */}
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
          // className={cx({
          //   percentageStyleError: isEmpty(dataList.match),
          //   percentageStyle: !isEmpty(dataList.match), 
          // })}
          className={cx({
            percentageStyleError: dataList.match < 40,
            percentageStyleAvg: dataList.match >= 40 && dataList.match < 69, 
            percentageStyle: dataList.match > 69, 
          })}
        >
          <Text
            className={styles.percentagefont}
            bold
            // color={isEmpty(dataList.match) ? 'white' : 'black'}
            color='white'
          >
            {!isEmpty(dataList.match) ? dataList.match : '0'}%
          </Text>
        </div>
      )}
    </div>
  );
};

export default ProfileWithPercentage;
