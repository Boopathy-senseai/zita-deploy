import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import { AppDispatch } from '../../store';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { DELETE } from '../constValue';
import { Obj } from './candidateProfileTypes';
import CertificationsAddandUpdateEdit, {  } from './CertificationsAddandUpdateEdit';
import styles from './certificationsorcoursecard.module.css';
import {
  courseDeleteMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';

const cx = classNames.bind(styles);

type Props = {
  obj?: Obj;
  isProfileView?: boolean;
};
const CertificationsOrCourseCard = ({ obj, isProfileView }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isUpdateId, setUpdateId] = useState('0');
  const [isOpen, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const [isDelete, setDelete] = useState(false);

  const hanldeOpen = (id: string) => {
    setUpdateId(id);
    setOpen(true);
  };
  const handleDelete = () => {
    setLoader(true);
    dispatch(courseDeleteMiddleWare({ id: isUpdateId })).then((res) => {
      if (res.payload.success) {
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
      }
      setDelete(false);
      setLoader(false);
    });
  };

  return (
    <>
      {!isProfileView && (
        <>
          <CancelAndDeletePopup
            loader={isLoader}
            btnCancel={() => setDelete(false)}
            btnDelete={handleDelete}
            open={isDelete}
            btnRight={DELETE}
            title={
              <Flex columnFlex className={styles.statusFlex}>
                <Text>
                  {`This certification  details will be deleted permanently.`}
                </Text>
                <Text>Are you sure to proceed?</Text>
              </Flex>
            }
          />
          <CertificationsAddandUpdateEdit
            isUpdate
            isUpdateId={isUpdateId}
            open={isOpen}
            cancel={() => setOpen(false)}
            obj={obj}
          />
        </>
      )}

      <Card className={styles.overAll}>
        {Array.isArray(obj?.certi) && obj?.certi.length !== 0 ? (
          obj?.certi.map((list, index) => (
            <Flex
              row
              key={list.cert_id + index}
              className={cx('borderFlex', {
                borderBottom: index + 1 !== obj?.certi?.length,
              })}
            >
              <div style={{ alignSelf: 'center' }}>
                <Flex columnFlex className={styles.leftConatiner}>
                  <Text color="theme" bold>
                    {list.certification_name}
                  </Text>
                  <Text color="theme" className={styles.yearText}>
                    {list.certificate_year}
                  </Text>
                </Flex>
              </div>
              <div className={styles.vrLine} />
              <Flex columnFlex className={styles.rightConatiner} flex={1}>
                {!isProfileView && (
                  <Flex row center className={styles.trashFlex}>
                    <div
                      className={styles.svgTrash}
                      onClick={() => hanldeOpen(list.cert_id.toString())}
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
                        setUpdateId(list.cert_id.toString());
                      }}
                    >
                      <SvgTrash width={16} height={16} />
                    </div>
                  </Flex>
                )}
                <Text>
                  {list.certificate_by}
                </Text>
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={16} bold>
              Add Certifications/Course
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default CertificationsOrCourseCard;
