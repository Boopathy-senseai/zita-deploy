import { useState } from 'react';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { getDateString } from '../../../uikit/helper';
import Text from '../../../uikit/Text/Text';
import { FILE_2MB } from '../../constValue';
import { UserInfo } from './candidateDashBoardTypes';
import UploadProfile from './UploadProfile';
import styles from './uploadprofilecard.module.css';

type Props = {
  user_info?: UserInfo;
  profile: string;
};
const UploadProfileCard = ({ user_info, profile }: Props) => {
  const [isMb, setMb] = useState(false);

  return (
    <Card className={styles.overAll}>
      <Flex row between>
        <Flex row>
          <div className={styles.profileContainer}>
            <UploadProfile profile={profile} setMb={setMb} />
            {isMb && (
              <Text size={12} color="error" className={styles.fileErrorText}>
                {FILE_2MB}
              </Text>
            )}
          </div>
          <Flex columnFlex>
            <Text size={12} color="gray" className={styles.pictureStyle}>
              Recommended profile picture dimension:
            </Text>
            <Text size={12} color="gray" className={styles.squareStyle}>
              Square : 120px * 120px, Rectangle : 500px * 230px
            </Text>
            <Text size={12} color="gray">
              File size must be less than 2MB
            </Text>
          </Flex>
        </Flex>
        <Flex columnFlex>
          <Text align="right" size={18} bold className={styles.pictureStyle}>
            {user_info?.first_name} {user_info?.last_name}
          </Text>
          <Text align="right" className={styles.emailStyle}>
            {user_info?.email}
          </Text>
          <Text align="right">
            Last Login on :{' '}
            {getDateString(user_info?.last_login, 'll hh:mm A')}
          </Text>
          <Text align="right">
           Timezone: UTC
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default UploadProfileCard;
