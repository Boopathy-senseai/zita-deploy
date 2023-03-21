import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import { AppDispatch } from '../../store';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { CANCEL, DELETE } from '../constValue';
import { Obj } from './candidateProfileTypes';
import styles from './qualificationcard.module.css';
import {
  educationDeleteMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const cx = classNames.bind(styles);

type Props = {
  handleQualificationEdit: (updateId: string) => void;
  obj?: Obj;
  isProfileView?: boolean;
};
const QualificationCard = ({
  handleQualificationEdit,
  obj,
  isProfileView,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isDelete, setDelete] = useState(false);
  const [isGetId, setGetId] = useState('0');
  const [isDeleteLoader, setDeleteLoader] = useState(false);
  // delete function
  const handleDelete = () => {
    setDeleteLoader(true);
    dispatch(educationDeleteMiddleWare({ eduId: isGetId })).then((res) => {
      if (res.payload.success) {
        setDelete(false);
        setDeleteLoader(false);
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
      } else {
        setDelete(false);
        setDeleteLoader(false);
      }
    });
  };

  return (
    <>
      {!isProfileView && (
        <CancelAndDeletePopup
          btnLeft={CANCEL}
          btnCancel={() => setDelete(false)}
          btnDelete={handleDelete}
          open={isDelete}
          btnRight={DELETE}
          title={
            <Flex columnFlex className={styles.statusFlex}>
              <Text>
                {`This qualification details will be deleted permanently.`}
              </Text>
              <Text>Are you sure to proceed?</Text>
            </Flex>
          }
          loader={isDeleteLoader}
        />
      )}

      <Card className={styles.overAll}>
        {Array.isArray(obj?.edu) && obj?.edu.length !== 0 ? (
          obj?.edu.map((list, index) => (
            <Flex
              row
              key={list.qual_title + index}
              className={cx('borderFlex', {
                borderBottom: index + 1 !== obj?.edu?.length,
              })}
            >
              <div style={{ alignSelf: 'center' }}>
                <Flex columnFlex className={styles.leftConatiner}>
                  <Text color="theme" bold>
                    {notSpecified(list.qual_title)}
                  </Text>
                  <Text color="theme" className={styles.yearText}>
                    {notSpecified(list.year)}
                  </Text>
                </Flex>
              </div>
              <div className={styles.vrLine} />
              <Flex columnFlex className={styles.rightConatiner} flex={1}>
                {!isProfileView && (
                  <Flex row center className={styles.trashFlex}>
                    <div
                      className={styles.svgTrash}
                      onClick={() =>
                        handleQualificationEdit(list.edu_id.toString())
                      }
                      tabIndex={-1}
                      role="button"
                      onKeyDown={() => {}}
                    >
                      <SvgBoxEdit fill={PRIMARY} />
                    </div>

                    <div
                      className={styles.svgTrash}
                      tabIndex={-1}
                      role="button"
                      onKeyDown={() => {}}
                      onClick={() => {
                        setDelete(true);
                        setGetId(list.edu_id.toString());
                      }}
                    >
                      <SvgTrash width={16} height={16} />
                    </div>
                  </Flex>
                )}

                {!isEmpty(list.title_spec) && (
                  <Text bold>{list.title_spec}</Text>
                )}
                <Text className={styles.techText}>{list.inst_name}</Text>
                {!isEmpty(list.inst_loc) && (
                  <Text className={styles.techText}>{list.inst_loc}</Text>
                )}

                {!isEmpty(list.percentage) && (
                  <Flex row center className={styles.percentageStyle}>
                    <Text>Percentage/CGPA:</Text>
                    <Text style={{ marginLeft: 2 }}>{list.percentage}</Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={16} bold>
              Add Qualification
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default QualificationCard;
