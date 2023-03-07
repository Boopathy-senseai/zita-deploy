import classNames from 'classnames/bind';
import { useState } from 'react';
import SvgBoxEdit from '../../icons/SvgBoxEdit';
import SvgTrash from '../../icons/SvgTrash';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, notSpecified } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import CancelAndDeletePopup from '../common/CancelAndDeletePopup';
import { CANCEL } from '../constValue';
import AddandUpdateWorkExperienceEdit from './AddandUpdateWorkExperienceEdit';
import { Obj } from './candidateProfileTypes';
import styles from './workexperienceaddandcard.module.css';
const cx = classNames.bind(styles);

type Props = {
  obj?: Obj;
};
const WorkExperienceAddandCard = ({ obj }: Props) => {
  const [isDelete, setDelete] = useState(false);
  // const [isGetId, setGetId] = useState('0');
  const [isworkExpEdit, setworkExpEdit] = useState(false);
  // const [isworkExpAdd, setworkExpAdd] = useState(false);
  const [isUpdateId, setUpdateId] = useState('0');

  const handleDelete = () => {
    setDelete(false);
    // dispatch(educationDeleteMiddleWare({ eduId: isGetId })).then(() => {
    //   setDelete(false);
    // });
  };

  const handleWorkUdateOpen = (expId: string) => {
    setworkExpEdit(true);
    setUpdateId(expId);
  };

  return (
    <>
      <AddandUpdateWorkExperienceEdit
        open={isworkExpEdit}
        cancel={() => setworkExpEdit(false)}
        obj={obj}
        isUpdateId={isUpdateId}
        isUpdate
      />
      <CancelAndDeletePopup
        btnCancel={() => setDelete(false)}
        btnDelete={handleDelete}
        open={isDelete}
        btnRight={CANCEL}
        title={
          <Flex columnFlex className={styles.statusFlex}>
            <Text>
              {`This experience details will be deleted permanently.`}
            </Text>
            <Text>Are your sure to proceed?</Text>
          </Flex>
        }
      />
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
                  <Text color="theme" bold>
                    {notSpecified(list.org)}
                  </Text>
                  {!isEmpty(list.from_exp) ? (
                    <Text color="theme" className={styles.yearText}>
                      {list.from_exp} - {list.to_exp}
                    </Text>
                  ) : (
                    <Text color="theme" className={styles.yearText}>
                      {notSpecified(list.from_exp)}
                    </Text>
                  )}

                  <Text color="theme" className={styles.yearText}>
                    {notSpecified(list.loc)}
                  </Text>
                </Flex>
              </div>
              <Flex columnFlex className={styles.rightConatiner} flex={1}>
                <Flex row center between>
                  <Text bold>{notSpecified(list.domain)}</Text>
                  <Flex row center>
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
                      onClick={() => setDelete(true)}
                    >
                      <SvgTrash width={16} height={16} />
                    </div>
                  </Flex>
                </Flex>
                <Text className={styles.roleText} bold>
                  {notSpecified(list.des)}
                </Text>
                <ul className={styles.listStyle}>
                  {list.roles?.map(
                    (roleList) =>
                      !isEmpty(roleList) && (
                        <li key={roleList}>
                          <Text align="justify" className={styles.techText}>
                            {roleList}
                          </Text>
                        </li>
                      ),
                  )}
                </ul>

                <Flex row className={styles.toolsText}>
                  <Text bold style={{ whiteSpace: 'nowrap' }}>
                    Tools and Programming Languages:
                  </Text>
                  <Text style={{ marginLeft: 8 }}>
                    {notSpecified(list.exp_tools)}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={18} bold>
              Add Work Experience
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default WorkExperienceAddandCard;
