import { useState } from 'react';
import SvgCheckBox from '../../icons/SvgCheckBox';
import Svgwhatjobs from '../../icons/Svgwhatjobs';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import ExternalSwitch from '../../uikit/externalswitch/Externalswitch';
import { PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Text from '../../uikit/Text/Text';
import { BACK } from '../constValue';
import styles from './standardjobposting.module.css';

type Props = {
  jdId: string;
  hanldePulish: () => void;
  ds_role: boolean;
  feature: number;
  whatjob: any;
};

const StandardJobPosting = ({
  jdId,
  hanldePulish,
  ds_role,
  feature,
  whatjob,
}: Props) => {
  const [extarajobpost, setextarajobpost] = useState('1');

  const extarajob = () => {
    if (extarajobpost === '0') {
      setextarajobpost('1');
      whatjob(1);
    } else {
      setextarajobpost('0');
      whatjob(0);
    }
  };
  const manageLocation = () => {
    sessionStorage.setItem('superUserTab', '2');
  };
  return (
    <Flex>
      <Flex columnFlex>
        <Card className={styles.cardOverAll}>
          <Text color="primary" bold>
            Standard Job Posting
          </Text>
          <Text className={styles.defaultText}>
            Your job will be posted in the following site by default
          </Text>
          <Flex>
            <div className={styles.checkBox}>
              <Flex row center>
                <div style={{ opacity: 0.5, marginRight: 8 }}>
                  <SvgCheckBox fill={PRIMARY} />
                </div>
                <Text bold className={styles.textstyleinjobpost}>
                  Company Website Career Page
                </Text>
              </Flex>
            </div>
            <Text color="theme" bold>
              Other Job Boards
            </Text>
            <Flex row center>
              <ExternalSwitch
                checked={extarajobpost === '1'}
                onClick={() => extarajob()}
              />
              <div className={styles.checkBoxs}>
                <div style={{ opacity: 0.5, marginRight: 8 }}></div>
                <Svgwhatjobs />
              </div>
            </Flex>
          </Flex>
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
                <LinkWrapper
                  onClick={manageLocation}
                  to="/account_setting/settings?planFocus=focus"
                >
                  <Button>Upgrade</Button>
                </LinkWrapper>
              ) : (
                <Button onClick={hanldePulish} id={extarajobpost}>
                  Publish
                </Button>
              )}
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};
export default StandardJobPosting;
