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
import { Obj, ProjectsEntityOne } from './candidateProfileTypes';
import ProjectsAddandUpdateEdit from './ProjectsAddandUpdateEdit';
import {
  profileEditMiddleWare,
  projectDeleteMiddleWare,
} from './store/middleware/candidateprofilemiddleware';
import styles from './workexperienceaddandcard.module.css';
const cx = classNames.bind(styles);

type Props = {
  projects: ProjectsEntityOne[];
  obj?: Obj;
  isProfileView?: boolean;
};

const ProjectsCard = ({ projects, obj, isProfileView }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [isProjectUpdate, setProjectUpdate] = useState(false);
  const [isUpdateId, setUpdateId] = useState('0');
  const [isGetId, setGetId] = useState('0');
  const [isDelete, setDelete] = useState(false);
  const [isLoader, setLoader] = useState(false);

  const handleProjectUpdateOpen = (id: string) => {
    setUpdateId(id);
    setProjectUpdate(true);
  };
// delete function
  const handleDelete = () => {
    setLoader(true);
    dispatch(projectDeleteMiddleWare({ id: isGetId })).then((res) => {
      if (res.payload.success) {
        dispatch(profileEditMiddleWare({jd_id:localStorage.getItem('careerJobViewJobId')}));
      }
      setLoader(false);
      setDelete(false);
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
                <Text>{`This project details will be deleted permanently.`}</Text>
                <Text>Are you sure to proceed?</Text>
              </Flex>
            }
          />
          <ProjectsAddandUpdateEdit
            obj={obj}
            projects={projects}
            open={isProjectUpdate}
            cancel={() => setProjectUpdate(false)}
            isUpdateId={isUpdateId}
            isUpdate
          />
        </>
      )}

      <Card className={styles.overAll}>
        {Array.isArray(projects) && projects.length !== 0 ? (
          projects.map((list, index) => (
            <Flex
              row
              key={list.project_id + index}
              className={cx('borderFlex', {
                borderBottom: index + 1 !== projects.length,
              })}
            >
              <div style={{ alignSelf: 'center' }}>
                <Flex columnFlex className={styles.leftConatiner}>
                  <Text color="theme" bold>
                    {list.work_proj_name}
                  </Text>

                  {!isEmpty(list.work_proj_location) && (
                    <Text color="theme" className={styles.yearText}>
                      {list.work_proj_location}
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
                        handleProjectUpdateOpen(list.project_id.toString())
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
                        setGetId(list.project_id.toString());
                      }}
                    >
                      <SvgTrash width={16} height={16} />
                    </div>
                  </Flex>
                )}
                {!isEmpty(list.work_proj_domain) && (
                  <Text bold>{list.work_proj_domain}</Text>
                )}
                {!isEmpty(list.work_proj_desig) && (
                  <Text className={styles.roleText} bold>
                    {list.work_proj_desig}
                  </Text>
                )}
                <ul className={styles.listStyle}>
                  {list.work_proj_role.split('\n')?.map(
                    (roleList) =>
                      !isEmpty(roleList) && (
                        <li
                          key={roleList}
                          style={{ overflowWrap: 'anywhere', width: '92%' }}
                        >
                          <Text align="justify" className={styles.techText}>
                            {roleList}
                          </Text>
                        </li>
                      ),
                  )}
                </ul>
                {!isEmpty(list.work_proj_skills) && (
                  <Flex row className={styles.toolsText}>
                    <Text bold style={{ whiteSpace: 'nowrap' }}>
                      Tools and Programming Languages:
                    </Text>
                    <Text style={{ marginLeft: 8 }}>
                      {list.work_proj_skills}
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          ))
        ) : (
          <Flex center middle className={styles.noValues}>
            <Text size={16} bold>
              Add Projects
            </Text>
          </Flex>
        )}
      </Card>
    </>
  );
};

export default ProjectsCard;
