import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import { AppDispatch } from '../../store';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { DELETE } from '../constValue';
import AddandUpdateWorkExperienceEdit from './AddandUpdateWorkExperienceEdit';
import { ExperiencesEntity, Obj } from './candidateProfileTypes';
import {
  experienceDeleteMiddleWare,
  profileEditMiddleWare,
} from './store/middleware/candidateprofilemiddleware';
import styles from './workexperienceaddandcard.module.css';
const cx = classNames.bind(styles);

type Props = {
  obj?: Obj;
  experiences?: ExperiencesEntity[];
  isProfileView?: boolean;
};

const WorkExperienceAddandCard = ({
  obj,
  experiences,
  isProfileView,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isDelete, setDelete] = useState(false);
  const [isGetId, setGetId] = useState('0');
  const [isworkExpEdit, setworkExpEdit] = useState(false);
  const [isUpdateId, setUpdateId] = useState('0');
  const [isLoader, setLoader] = useState(false);
  // delete function
  const handleDelete = () => {
    setLoader(true);
    dispatch(experienceDeleteMiddleWare({ id: isGetId })).then((res) => {
      if (res.payload.success) {
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
      }
      setLoader(false);
      setDelete(false);
    });
  };

  const handleWorkUdateOpen = (expId: string) => {
    setworkExpEdit(true);
    setUpdateId(expId);
  };

  return (
    <>
      {!isProfileView && (
        <>
          <AddandUpdateWorkExperienceEdit
            open={isworkExpEdit}
            cancel={() => setworkExpEdit(false)}
            obj={obj}
            isUpdateId={isUpdateId}
            isUpdate
            experiences={experiences}
          />
          <CancelAndDeletePopup
            loader={isLoader}
            btnCancel={() => setDelete(false)}
            btnDelete={handleDelete}
            open={isDelete}
            btnRight={DELETE}
            title={
              <Flex columnFlex className={styles.statusFlex}>
                <Text>
                  {`This experience details will be deleted permanently.`}
                </Text>
                <Text>Are you sure to proceed?</Text>
              </Flex>
            }
          />
        </>
      )}

      <Card className={styles.overAll}>
        {Array.isArray(obj?.exp) && obj?.exp.length !== 0 ? (
          obj?.exp.map((list, index) => (
            <Flex
              row
              key={list.domain + index}
              className={cx('borderFlex', {
                borderBottom: index + 1 !== obj?.exp?.length,
              })}
            >
              <div style={{ alignSelf: 'center' }}>
                <Flex columnFlex className={styles.leftConatiner}>
                  {!isEmpty(list.org) && (
                    <Text color="theme" bold>
                      {list.org}
                    </Text>
                  )}

                  {!isEmpty(list.from_exp) && (
                    <Text color="theme" className={styles.yearText}>
                      {list.from_exp} - { !list.is_present ? list.to_exp: 'Till Date'}
                    </Text>
                  )}
                  {!isEmpty(list.loc) && (
                    <Text color="theme" className={styles.yearText}>
                      {list.loc}
                    </Text>
                  )}
                </Flex>
              </div>
              <div className={styles.vrLine} />

              <Flex columnFlex className={styles.rightConatiner} flex={1}>
                {!isProfileView && (
                  <Flex row center className={styles.trashFlex}>
                    <div
                      className={styles.svgTrash}
                      onClick={() =>
                        handleWorkUdateOpen(list.exp_id.toString())
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
                        setGetId(list.exp_id.toString());
                      }}
                    >
                      <SvgTrash width={16} height={16} />
                    </div>
                  </Flex>
                )}
                {!isEmpty(list.domain) && <Text bold>{list.domain}</Text>}

                <Text className={styles.roleText} bold>
                  {list.des}
                </Text>
                <ul className={styles.listStyle}>
                  {list.roles?.map(
                    (roleList) =>
                      !isEmpty(roleList) && (
                        <li key={roleList} style={{ overflowWrap: 'anywhere', width: '92%' }}>
                          <Text align="justify" className={styles.techText}>
                            {roleList}
                          </Text>
                        </li>
                      ),
                  )}
                </ul>
                {!isEmpty(list.exp_tools) && (
                  <Flex row className={styles.toolsText}>
                    <Text bold style={{ whiteSpace: 'nowrap' }}>
                      Tools and Programming Languages:
                    </Text>
                    <Text style={{ marginLeft: 8 }}>{list.exp_tools}</Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={16} bold>
              Add Work Experience
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default WorkExperienceAddandCard;
