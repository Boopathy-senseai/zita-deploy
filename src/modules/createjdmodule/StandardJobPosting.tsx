import SvgCheckBox from '../../icons/SvgCheckBox';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { BACK, manageLocation } from '../constValue';
import styles from './standardjobposting.module.css';

type Props = {
  jdId: string;
  hanldePulish: () => void;
  ds_role: boolean;
  feature: number;
};

const StandardJobPosting = ({
  jdId,
  hanldePulish,
  ds_role,
  feature,
}: Props) => {
  return (
    <Card className={styles.cardOverAll}>
      <Flex columnFlex>
        <Text color="theme" bold>
          Standard Job Posting
        </Text>
        <Text className={styles.defaultText}>
          Your job will be posted in the following site by default
        </Text>
        <div className={styles.checkBox}>
          <Flex row center>
            <div style={{ opacity: 0.5, marginRight: 8 }}>
              <SvgCheckBox fill={PRIMARY} />
            </div>
            <Text bold color="theme">
              Company Website Career Page
            </Text>
          </Flex>
        </div>
        <Flex row center between>
          <LinkWrapper target={'_parent'} to={`/jobs/questionnaire/${jdId}`}>
            <Button types="secondary">{BACK}</Button>
          </LinkWrapper>

          <Flex row center>
            <LinkWrapper target={'_parent'} to={routesPath.MY_JOB_POSTING}>
              <Button types="secondary">Save as draft</Button>
            </LinkWrapper>
            {ds_role === true && (
              <LinkWrapper
                target={'_parent'}
                to={`/jobs/create_ds_edit/${jdId}`}
              >
                <Button types="secondary" className={styles.editBtn}>
                  Edit
                </Button>
              </LinkWrapper>
            )}
            {ds_role !== true && (
              <LinkWrapper
                target={'_parent'}
                to={`/jobs/create_non_ds_edit/${jdId}`}
              >
                <Button types="secondary" className={styles.editBtn}>
                  Edit
                </Button>
              </LinkWrapper>
            )}
            {feature === 0 ? (
              <Button onClick={manageLocation}>Upgrade</Button>
            ) : (
              <Button onClick={hanldePulish}>Publish</Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
export default StandardJobPosting;
