import { useMemo } from 'react';
import { useState } from 'react';
import { routesPath } from '../../routes/routesPath';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import SvgActive from '../../icons/SvgActive';
import Flex from '../../uikit/Flex/Flex';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import { CANCEL } from '../constValue';
import Tabel from '../../uikit/Table/Table';
import styles from './addedapplicantquestionnaire.module.css';
import { QuestionnaireForJdEntity } from './createJdTypes';
import { questionTitle } from './questionnaireTable';


type Props = {
  tabledata: QuestionnaireForJdEntity[];
  jdId: string;
  ds_role: boolean;
  onPristine: () => void;
  setDraftSave?: any;
};

const AddedApplicantQuestionnaire = ({
  tabledata,
  jdId,
  ds_role,
  setDraftSave,
  onPristine,
}: Props) => {

  const columns = useMemo(() => questionTitle(jdId), [tabledata]);
  return (
    <Flex className={styles.cardOverAll}>
      <Flex columnFlex>
        <Text bold size={14} className={styles.applicantTitle}>
          Added Applicant Questionnaire
        </Text>
        <Text>You can check the added/selected questions below</Text>
        <div className={styles.tableDiv}>
          <Tabel
            empty={'No Questionnaire Added'}
            dataSource={tabledata}
            columns={columns}
          />
        </div>
      </Flex>
      <Flex row center between className={styles.btnContainer}>
        {ds_role === true && (
          <LinkWrapper  to={`/jobs/create_ds_edit/${jdId}`}>
            <Button types="secondary">{'Back'}</Button>
          </LinkWrapper>
        )}
        {ds_role !== true && (
          <LinkWrapper
            
            to={`/jobs/create_non_ds_edit/${jdId}`}
          >
            <Button types="secondary">{'Back'}</Button>
          </LinkWrapper>
        )}

        <Flex row center>
          <LinkWrapper 
          
          onClick = {setDraftSave}

          to={routesPath.MY_JOB_POSTING}>
            <Button types="close">{CANCEL}</Button>
          </LinkWrapper>

          <LinkWrapper
            
            to={routesPath.MY_JOB_POSTING}
          >
            <Button 
          onClick={() => {onPristine()
            setDraftSave(true);
          }}
            types="secondary" className={styles.saveBtn}>
              Save as draft
            </Button>
          </LinkWrapper>

          <LinkWrapper
            onClick={() => onPristine()}
            
            to={`/jobs/preview/${jdId}`}
          >
            <Button>Preview</Button>
          </LinkWrapper>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddedApplicantQuestionnaire;