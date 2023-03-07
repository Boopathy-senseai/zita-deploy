import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Flex from '../../uikit/Flex/Flex';
import {
  getDateString,
  isEmpty,
  lowerCase,
  notSpecified,
} from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import styles from './experiencetab.module.css';

type LableProps = {
  boldText: string;
  text: string;
  className?: string;
};

const LableBold = ({ boldText, text, className }: LableProps) => {
  return (
    <Flex row className={className}>
      <Text bold style={{ marginRight: 4 }}>
        {boldText}
      </Text>
      <Text>{text}</Text>
    </Flex>
  );
};

const ExperienceTab = () => {
  const { experience, ac_project, fresher, mainProject, personalInfo } =
    useSelector(({ applicantProfileInitalReducers }: RootState) => {
      return {
        experience: applicantProfileInitalReducers.experience,
        ac_project: applicantProfileInitalReducers.ac_project,
        fresher: applicantProfileInitalReducers.fresher,
        mainProject: applicantProfileInitalReducers.project,
        personalInfo: applicantProfileInitalReducers.personalInfo,
      };
    });

  return (
    <Flex
      columnFlex
      className={styles.overAll}
      height={window.innerHeight - 230}
    >
      <Flex
        row={notSpecified(personalInfo[0].career_summary) === 'Not Specified'}
        center
        className={styles.careerStyle}
      >
        <Text bold color="theme">
          Career Summary:
        </Text>
        <Text
          className={styles.careerDes}
          style={{
            marginLeft: 2,
            marginTop:
              notSpecified(personalInfo[0].career_summary) === 'Not Specified'
                ? 0
                : 8,
          }}
          align="justify"
        >
          {notSpecified(personalInfo[0].career_summary)}
        </Text>
      </Flex>
      {experience.length === 0 &&
        mainProject.length === 0 &&
        ac_project.length === 0 &&
        fresher.length === 0 && (
          <Flex middle center flex={1}>
            <Text color="gray">Not Specified</Text>
          </Flex>
        )}
      <Flex>
        {experience.length !== 0 && (
          <>
            <Text bold color="theme" className={styles.workStyle}>
              Work Experience:
            </Text>
            {experience.map((list, listIindex) => {
              const toDate = isEmpty(list.to_exp)
                ? 'Till Date'
                : getDateString(list.to_exp, 'll');
              return (
                <Flex
                  key={list.organisations + listIindex}
                  columnFlex
                  className={styles.workContainer}
                >
                  <Flex row between>
                    <Text bold transform="uppercase" style={{ width: '70%' }}>
                      {notSpecified(list.designation)}
                      {isEmpty(list.organisations)
                        ? ''
                        : ` - ${list.organisations}`}
                    </Text>
                    {!isEmpty(list.from_exp) && (
                      <Text bold>
                        {getDateString(list.from_exp, 'll')} - {toDate}
                      </Text>
                    )}
                  </Flex>
                  <Text style={{ paddingTop: 8, paddingBottom: 8 }}>
                    {list.work_location}
                  </Text>
                  <Text align="justify">{list.work_role}</Text>
                  {!isEmpty(list.work_tools) && (
                    <>
                      <Text bold color="theme" className={styles.workStyle}>
                        Tools and Programming Languages:
                      </Text>
                      <Flex row center wrap className={styles.statusContainer}>
                        {list.work_tools
                          .replace(',,', ',')
                          .split(',')
                          .map((splitList, splitIndex) => {
                            return (
                              splitList !== ' ' && (
                                <Flex
                                  key={splitList + splitIndex}
                                  className={styles.status}
                                >
                                  <Status label={lowerCase(splitList)} />
                                </Flex>
                              )
                            );
                          })}
                      </Flex>
                    </>
                  )}
                </Flex>
              );
            })}
          </>
        )}
        {mainProject.length !== 0 && (
          <>
            <Text color="theme" bold className={styles.projectText}>
              Projects:
            </Text>
            {mainProject &&
              mainProject.map((acList, actIndex) => {
                return (
                  <Flex
                    key={acList.work_proj_name + actIndex}
                    columnFlex
                    className={styles.workContainer}
                  >
                    <Flex row between>
                      <Text bold transform="uppercase" style={{ width: '70%' }}>
                        {notSpecified(acList.work_proj_name)}
                        {isEmpty(acList.work_proj_desig)
                          ? ''
                          : ` - ${acList.work_proj_desig}`}
                      </Text>
                      <Text bold>{acList.work_proj_duration}</Text>
                    </Flex>
                    <Text className={styles.location}>
                      {acList.work_proj_location}
                    </Text>
                    <LableBold
                      text={acList.work_proj_domain}
                      boldText={'Domain:'}
                      className={styles.domainLable}
                    />
                    <LableBold
                      text={acList.work_proj_describe}
                      boldText={'Description:'}
                      className={styles.domainLable}
                    />
                    <Text align="justify">{acList.work_proj_role}</Text>
                    {!isEmpty(acList.work_proj_skills) && (
                      <>
                        <Text bold color="theme" className={styles.workStyle}>
                          Tools and Programming Languages:
                        </Text>
                        <Flex
                          row
                          center
                          wrap
                          className={styles.statusContainer}
                        >
                          {acList.work_proj_skills
                            .replace(',,', ',')
                            .split(',')
                            .map((splitList, listOneIndex) => {
                              return (
                                splitList !== ' ' && (
                                  <Flex
                                    key={splitList + listOneIndex}
                                    className={styles.status}
                                  >
                                    <Status label={lowerCase(splitList)} />
                                  </Flex>
                                )
                              );
                            })}
                        </Flex>
                      </>
                    )}
                  </Flex>
                );
              })}
          </>
        )}

        {ac_project.length !== 0 && (
          <>
            <Text color="theme" bold className={styles.projectText}>
              Academic Projects:
            </Text>
            {ac_project &&
              ac_project.map((acList, acOneIndex) => {
                return (
                  <Flex
                    key={acList.work_proj_name + acOneIndex}
                    columnFlex
                    className={styles.workContainer}
                  >
                    <Flex row between>
                      <Text bold transform="uppercase" style={{ width: '70%' }}>
                        {notSpecified(acList.work_proj_name)}
                        {isEmpty(acList.work_proj_desig)
                          ? ''
                          : ` - ${acList.work_proj_desig}`}
                      </Text>
                      <Text bold>{acList.work_proj_duration}</Text>
                    </Flex>
                    <Text className={styles.location}>
                      {acList.work_proj_location}
                    </Text>
                    <LableBold
                      text={acList.work_proj_domain}
                      boldText={'Domain:'}
                      className={styles.domainLable}
                    />
                    <LableBold
                      text={acList.work_proj_describe}
                      boldText={'Description:'}
                      className={styles.domainLable}
                    />
                    <Text align="justify">{acList.work_proj_role}</Text>
                    {!isEmpty(acList.work_proj_skills) && (
                      <>
                        <Text bold color="theme" className={styles.workStyle}>
                          Tools and Programming Languages:
                        </Text>
                        <Flex
                          row
                          center
                          wrap
                          className={styles.statusContainer}
                        >
                          {acList.work_proj_skills
                            .replace(',,', ',')
                            .split(',')
                            .map((splitList, workindex) => {
                              return (
                                splitList !== ' ' && (
                                  <Flex
                                    key={splitList + workindex}
                                    className={styles.status}
                                  >
                                    <Status label={lowerCase(splitList)} />
                                  </Flex>
                                )
                              );
                            })}
                        </Flex>
                      </>
                    )}
                  </Flex>
                );
              })}
          </>
        )}
        {fresher.length !== 0 && (
          <>
            <Flex>
              <Text color="theme" bold className={styles.internShipText}>
                Internship:
              </Text>
              {fresher &&
                fresher.map((list, fresherIndex) => {
                  return (
                    <Flex
                      key={list.intern_domain + fresherIndex}
                      className={styles.workContainer}
                    >
                      <Flex row between>
                        <Text bold transform="uppercase" style={{ width: '70%' }}>
                          {notSpecified(list.intern_project)}
                          {isEmpty(list.intern_role)
                            ? ''
                            : ` - ${list.intern_role}`}
                        </Text>
                        <Text bold>{list.intern_duration}</Text>
                      </Flex>
                      <Text className={styles.location}>
                        {list.intern_location}
                      </Text>
                      <LableBold
                        className={styles.domainLable}
                        text={list.intern_domain}
                        boldText={'Domain:'}
                      />
                      <Text align="justify">{list.intern_proj_describe}</Text>
                      {!isEmpty(list.intern_tools_prg_lng) && (
                        <>
                          <Text bold color="theme" className={styles.workStyle}>
                            Tools and Programming Languages:
                          </Text>
                          <Flex
                            row
                            center
                            wrap
                            className={styles.statusContainer}
                          >
                            {list.intern_tools_prg_lng
                              .replace(',,', ',')
                              .split(',')
                              .map((splitList, internIndex) => {
                                return (
                                  splitList !== ' ' && (
                                    <Flex
                                      key={splitList + internIndex}
                                      className={styles.status}
                                    >
                                      <Status label={lowerCase(splitList)} />
                                    </Flex>
                                  )
                                );
                              })}
                          </Flex>
                        </>
                      )}
                    </Flex>
                  );
                })}
            </Flex>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default ExperienceTab;
