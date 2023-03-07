import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import { AppDispatch } from '../../store';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { lowerCase, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { CANCEL } from '../constValue';
import { Obj } from './candidateProfileTypes';
import styles from './qualificationcard.module.css';
import { educationDeleteMiddleWare } from './store/middleware/candidateprofilemiddleware';
const cx = classNames.bind(styles);

type Props = {
  handleQualificationEdit: (updateId: string) => void;
  obj?: Obj;
};
const QualificationCard = ({ handleQualificationEdit, obj }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isDelete, setDelete] = useState(false);
  const [isGetId, setGetId] = useState('0');

  const handleDelete = () => {
    dispatch(educationDeleteMiddleWare({ eduId: isGetId })).then(() => {
      setDelete(false);
    });
  };

  return (
    <>
      <CancelAndDeletePopup
        btnCancel={() => setDelete(false)}
        btnDelete={handleDelete}
        open={isDelete}
        btnRight={CANCEL}
        title={
          <Flex columnFlex className={styles.statusFlex}>
            <Text>
              {`This qualification details will be deleted permanently.`}
            </Text>
            <Text>Are your sure to proceed?</Text>
          </Flex>
        }
      />
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
                    {notSpecified(lowerCase(list.qual_title))}
                  </Text>
                  <Text color="theme" className={styles.yearText}>
                    {notSpecified(list.year)}
                  </Text>
                </Flex>
              </div>
              <Flex columnFlex className={styles.rightConatiner} flex={1}>
                <Flex row center between>
                  <Text bold>{list.title_spec}</Text>
                  <Flex row center>
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
                </Flex>
                <Text className={styles.techText}>
                  {lowerCase(list.inst_name)}
                </Text>
                <Text className={styles.techText}>
                  {lowerCase(list.inst_loc)}
                </Text>
                <Flex row center className={styles.percentageStyle}>
                  <Text bold>Percentage/CGPA:</Text>
                  <Text>{notSpecified(list.percentage)}</Text>
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={18} bold>
              Add Qualification
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default QualificationCard;
