import Card from '../../uikit/Card/Card';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase } from '../../uikit/helper';
import Status from '../../uikit/Status/Status';
import Text from '../../uikit/Text/Text';
import {
  Jd,
  LocationEntity,
  Profile,
  QualificationEntity,
  SkillsEntity,
} from './createJdTypes';
import JdDetails from './JdDetails';
import styles from './previewtitle.module.css';
import RolesandResponsibilities from './RolesandResponsibilities';

type Props = {
  jdDetails: Jd | any;
  profile: Profile | any;
  jd_view?: boolean;
  location: LocationEntity | any;
  qualification: QualificationEntity[] | any;
  skills: SkillsEntity[] | any;
};
const PreviewTitle = ({
  profile,
  jdDetails,
  location,
  jd_view,
  qualification,
  skills,
}: Props) => {
  return jd_view ? (
    <Flex >
      <Flex columnFlex>
        <JdDetails
          jdDetails={jdDetails}
          location={location}
          qualification={qualification}
        />
        <Flex className={styles.cardOverAll}>
        {profile && jdDetails.is_ds_role === true ? (
          <RolesandResponsibilities jdDetails={jdDetails} profile={profile} />
        ) : (
          <td
            className={styles.des}
            dangerouslySetInnerHTML={{
              __html: jdDetails.richtext_job_description,
            
            }}
          
          />
        )}
     
        {skills && (
          <Flex>
            <Text
              bold
              
              style={{ paddingTop: 16 ,color:"#333333"}}
              className={styles.borderbottomline}
            >
              Required Skills
            </Text>
            <Flex row center wrap className={styles.statusContainer}>
              {skills.map((skillList: any, index: number) => {
                const exp =
                  Number(skillList.experience) === 0
                    ? ''
                    : Number(skillList.experience) === 1
                    ? `- ${skillList.experience} Year`
                    : `- ${skillList.experience} Years`;
                return (
                  <>
                    {!isEmpty(skillList.skill) && (
                      <div
                        key={index + skillList.skill}
                        className={styles.statusList}
                      >
                        <Status label={lowerCase(skillList.skill) + exp} />
                      </div>
                    )}
                  </>
                );
              })}
            </Flex>
          </Flex>
        )}
      </Flex></Flex>
    </Flex>
  ) : (
    <Card className={styles.cardOverAll}>
      <Flex columnFlex>
        <Text bold color="theme" size={16} className={styles.title}>
          {jdDetails.job_title}
        </Text>
        <JdDetails
          jdDetails={jdDetails}
          location={location}
          qualification={qualification}
        />
        {profile && jdDetails.is_ds_role === true ? (
          <RolesandResponsibilities jdDetails={jdDetails} profile={profile} />
        ) : (
          <td
            className={styles.des}
            dangerouslySetInnerHTML={{
              __html: jdDetails.richtext_job_description,
            }}
          />
        )}

        {skills && (
          <Flex>
            <Flex  className={styles.borderbottomline}>
            <Text
            
              
              className={styles.requiredskil}
          
            >
              Required Skills
            </Text></Flex>
            <Flex row center wrap className={styles.statusContainer}>
              {skills.map((skillList: any, index: number) => {
                const exp =
                  Number(skillList.experience) === 0
                    ? ''
                    : Number(skillList.experience) === 1
                    ? ` - ${skillList.experience} Year`
                    : ` - ${skillList.experience} Years`;
                return (
                  <>
                    {!isEmpty(skillList.skill) && (
                      <div
                        key={index + skillList.skill}
                        className={styles.statusList}
                      >
                        <Status label={lowerCase(skillList.skill) + exp} />
                      </div>
                    )}
                  </>
                );
              })}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Card>
  );
};

export default PreviewTitle;
