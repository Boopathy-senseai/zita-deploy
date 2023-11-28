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
import { Loader } from '../../uikit';
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
  const [isBtnLoader, setBtnLoader] = useState(false)
  const [isCancelLoader, setCancelLoader] = useState(false)
  const [isPreviewLoader, setPreviewLoader] = useState(false)
  const columns = useMemo(() => questionTitle(jdId), [tabledata]);
  return (
    <Flex className={styles.cardOverAll}>
      <Flex columnFlex style={{justifyContent:'left'}}>
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
            
            to={`/jobs/weightagematching/${jdId}`}
          >
            <Button types="secondary">{'Back'}</Button>
          </LinkWrapper>
        )}

        <Flex row center>
        {isCancelLoader||isBtnLoader||isPreviewLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
          <>
          <LinkWrapper 
          onClick = {setDraftSave}
          to={routesPath.MY_JOB_POSTING}>
            <Button types="close" onClick={()=>{setCancelLoader(true)}}>{CANCEL}</Button>
          </LinkWrapper>
          <LinkWrapper   
            to={routesPath.MY_JOB_POSTING}
            onClick={()=>{
              setBtnLoader(true);
            }}
          >
            <Button 
          // onClick={() => {onPristine()
          //   setDraftSave(true);
          // }}
       
            types="secondary" className={styles.saveBtn}>
              Save as draft
            </Button>
          </LinkWrapper>

          <LinkWrapper
            onClick={() =>{ onPristine();
            setPreviewLoader(true);}
            }
            
            to={`/jobs/preview/${jdId}`}
          >
            <Button>Preview</Button>
          </LinkWrapper>
          </>
          )}

      
                 {/* {isBtnLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
            <LinkWrapper   
            to={routesPath.MY_JOB_POSTING}
            onClick={()=>{
              setBtnLoader(true);
            }}
          >
            <Button 
          // onClick={() => {onPristine()
          //   setDraftSave(true);
          // }}
       
            types="secondary" className={styles.saveBtn}>
              Save as draft
            </Button>
          </LinkWrapper>)} */}

          {/* {isPreviewLoader ? (
            <Flex className={styles.updateBtnLoader}>
              <Loader size="small" withOutOverlay />
            </Flex>
          ) : (
          <LinkWrapper
            onClick={() =>{ onPristine();
            setPreviewLoader(true);}
            }
            
            to={`/jobs/preview/${jdId}`}
          >
            <Button>Preview</Button>
          </LinkWrapper>)} */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AddedApplicantQuestionnaire;