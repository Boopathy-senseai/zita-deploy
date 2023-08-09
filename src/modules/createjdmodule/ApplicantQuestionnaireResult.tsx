import { useMemo, useState } from 'react';
import SvgAngle from '../../icons/SvgAngle';
import Button from '../../uikit/Button/Button';
import Card from '../../uikit/Card/Card';
import Collapse from '../../uikit/Collapse/Collapse';
import { LINK } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import Table from '../../uikit/Table/Table';
import Text from '../../uikit/Text/Text';
import styles from './applicantquestionnaireresult.module.css';
import { CompanyDetail, Jd, QuestionnaireForJdEntity } from './createJdTypes';
import EEOCompliance from './EEOCompliance';
import { resultTitle } from './questionnaireTable';

type Props = {
  data: QuestionnaireForJdEntity[];
  jdDetails: Jd;
  company_detail: CompanyDetail;
};
const ApplicantQuestionnaireResult = ({
  data,
  jdDetails,
  company_detail,
}: Props) => {
  const columns = useMemo(() => resultTitle(), [data]);
  const [isCollapse, setCollapse] = useState(false);

  return (
    <Card className={styles.cardOverAll}>
      <Flex columnFlex>
        <Text bold size={16} color="primary">
          Applicant Questionnaire:
        </Text>
        <div>
          {data.length === 0 ? (
            <Text color="gray">No questions added for this job</Text>
          ) : (
            <Table
              empty={'No questions added for this job'}
              dataSource={data}
              columns={columns}
              border="overAll"  
            />
          )}
        </div>
        {jdDetails.is_eeo_comp === true && (
          <Flex row center>
            <Button types="link" onClick={() => setCollapse(!isCollapse)}>
              EEO Compliance (USA)
            </Button>
            <Button
              className={styles.svgAngle}
              types="link"
              onClick={() => setCollapse(!isCollapse)}
            >
              <SvgAngle up={isCollapse} width={16} height={16} fill={LINK} />
            </Button>
          </Flex>
        )}

        <Collapse isOpen={isCollapse}>
          <EEOCompliance
            handleCompliance={() => {}}
            isCheck={false}
            company_name={company_detail.company_name}
            isPreview
          />
        </Collapse>
      </Flex>
    </Card>
  );
};
export default ApplicantQuestionnaireResult;
