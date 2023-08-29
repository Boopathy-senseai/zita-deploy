import Flex from '../../uikit/Flex/Flex';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import styles from './eeocompliance.module.css';
import {
  disabilitiesData,
  q1Data,
  q2Data,
  q3Data,
  q4Data,
  q5Data,
  raceFive,
  raceFour,
  raceOne,
  raceThree,
  raceTwo,
  selftOne,
  selfTwo,
} from './mock';

type RadioProps = {
  data: {
    value: string;
  }[];
  title: string;
};
const QustionRadio = ({ data, title }: RadioProps) => {
  return (
    <Flex>
      <Text size={14} bold className={styles.radioTitle}>
        {title}
      </Text>
      {data.map((list, index) => {
        return (
          <div key={index + list.value} className={styles.radioDiv}>
            <InputRadio disabled label={list.value} />
          </div>
        );
      })}
    </Flex>
  );
};
type Props = {
  handleCompliance: () => void;
  isCheck: boolean;
  company_name: string;
  country?: string;
  isPreview?: boolean;
};
const EEOCompliance = ({
  handleCompliance,
  isCheck,
  company_name,
  country,
  isPreview,
}: Props) => {
  return (
    <Flex>
      <div className={styles.checkBox}>
        {!isPreview && (
          <>
            {country?.toLowerCase() === 'usa' ? (
              <div className={styles.checkBoxDisable}>
                <InputCheckBox
                  disabled
                  checked={true}
                  label="Compliance questionnaire is mandatory for jobs in the USA"
                />
              </div>
            ) : (
              <InputCheckBox
                onChange={handleCompliance}
                checked={isCheck}
                label="Compliance questionnaire is mandatory for jobs in the USA"
              />
            )}
          </>
        )}
      </div>
      <Flex columnFlex className={styles.flexOverAll}>
        <Text size={14} bold>
          Equal Employment Opportunity (EEO) Information for the U.S.
          (Completion is voluntary for Applicants)
        </Text>
        <Text style={{ paddingTop: 8 }} align="justify">
          Individuals seeking employment at {company_name} are considered
          without regard to race, color, religion, national origin, age, sex,
          marital status, ancestry, physical or mental disability, veteran
          status, gender identity, or sexual orientation. You are being given
          the opportunity to provide the following information in order to help
          us comply with federal and state Equal Employment
          Opportunity/Affirmative Action record keeping, reporting, and other
          legal requirements.
        </Text>
        <Text style={{ paddingTop: 8 }} align="justify">
          Completion of the form is entirely <b>voluntary</b>. Whatever your
          decision, it will not be considered in the hiring process or
          thereafter. Any information that you do provide will be recorded and
          maintained in a confidential file.
        </Text>
        {!isPreview && (
          <>
            <QustionRadio data={q1Data} title="Q1. Gender:" />
            <QustionRadio data={q2Data} title="Q2. Are you Hispanic/Latino?" />
            <QustionRadio
              data={q3Data}
              title="Q3. Please identify your race:"
            />
          </>
        )}
        {isPreview && (
          <>
            <div className={styles.selectTagStyle} style={{ marginTop: 16 }}>
              <Text size={13} color="primary" bold> Q1. Gender</Text>
              <SelectTag
                value={''}
                options={q1Data}
                // label="Q1. Gender:"
                // labelBold
              />
            </div>
            <div className={styles.selectTagStyle}>
            <Text size={13} color="primary" bold>Q2. Are you Hispanic/Latino?</Text>
              <SelectTag
                options={q2Data}
                // label="Q2. Are you Hispanic/Latino?"
                // labelBold
                value={''}
              />
            </div>
            <div className={styles.selectTagStyle}>
            <Text size={13} color="primary" bold>Q3. Please identify your race:</Text>
              <SelectTag
                options={q3Data}
                // label="Q3. Please identify your race:"
                // labelBold
                value={''}
              />
            </div>
          </>
        )}

        <Text bold className={styles.raceTitle}>
          {`Race & Ethnicity Definitions:`}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {raceOne}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {raceTwo}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {raceThree}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {raceFour}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {raceFive}
        </Text>
        {!isPreview && (
          <QustionRadio data={q4Data} title="Q4. Veteran Status" />
        )}
        {isPreview && (
          <div className={styles.selectTagStyle} style={{ marginTop: 16 }}>
            <Text size={13} color="primary" bold>Q4. Veteran Status</Text>
            <SelectTag
              value={''}
              options={q4Data}
              // label="Q4. Veteran Status"
              // labelBold
            />
          </div>
        )}

        <div className={styles.hrLine} />
        <Flex end>
          <Text>Form CC-305 OMB</Text>
          <Text style={{ margin: '4px 0px' }}>Control Number 1250-0005</Text>
          <Text>Expires 05/31/2023 </Text>
        </Flex>
        <Text bold align="center" style={{ marginTop: 16 }}>
          Voluntary Self-Identification of Disability
        </Text>
        <Text bold style={{ marginTop: 16 }}>
          Why are you being asked to complete this form?
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {selftOne}
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          {selfTwo}
          <a target={'_blank'} rel="noreferrer" href="http://www.dol.gov/ofccp">
            <Text bold color="link">
              http://www.dol.gov/ofccp
            </Text>
          </a>
        </Text>
        <Text bold style={{ marginTop: 16 }}>
          How do you know if you have a disability?
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          You are considered to have a disability if you have a physical or
          mental impairment or medical condition that substantially limits a
          major life activity, or if you have a history or record of such an
          impairment or medical condition.
        </Text>
        <Text style={{ marginTop: 8, marginBottom: 8 }}>
          Disabilities include, but are not limited to:
        </Text>
        {disabilitiesData.map((list) => {
          return (
            <ul key={list.value} className={styles.ulTag}>
              <li>
                <Text>{list.value}</Text>
              </li>
            </ul>
          );
        })}
        {isPreview && (
          <div className={styles.selectTagStyle} style={{ marginTop: 16 }}>
            <Text size={13} color="primary" bold>Q1. Disability Status:</Text>
            <SelectTag
              value={''}
              options={q5Data}
              // label="Q1. Disability Status:"
              // labelBold
            />
          </div>
        )}
        {!isPreview && (
          <QustionRadio data={q5Data} title="Q1. Disability Status:" />
        )}
        <Text style={{ marginTop: 8 }} align="justify">
          {`1Section 503 of the Rehabilitation Act of 1973, as amended. For more
          information about this form or the equal employment obligations of
          Federal contractors, visit the U.S. Department of Labor's Office of
          Federal Contract Compliance Programs (OFCCP) website at`}
          <a target={'_blank'} rel="noreferrer" href="http://www.dol.gov/ofccp">
            <Text color="link" bold>
              {' http://www.dol.gov/ofccp'}
            </Text>
          </a>
        </Text>
        <Text style={{ marginTop: 8 }} align="justify">
          PUBLIC BURDEN STATEMENT: According to the Paperwork Reduction Act of
          1995 no persons are required to respond to a collection of information
          unless such collection displays a valid OMB control number. This
          survey should take about 5 minutes to complete.
        </Text>
      </Flex>
    </Flex>
  );
};

export default EEOCompliance;
