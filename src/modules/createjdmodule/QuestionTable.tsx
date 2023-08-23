import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputCheckBox from '../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../uikit/InputRadio/InputRadio';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import { QuestionnaireForJdEntity } from './createJdTypes';
import styles from './questiontable.module.css';

type Props = {
  value: QuestionnaireForJdEntity;
  index: number;
};
const QuestionTable = ({ value, index }: Props) => {
  const dropDown = [
    { value: value.option1, label: value.option1 },
    { value: value.option2, label: value.option2 },
    { value: value.option3, label: value.option3 },
    { value: value.option4, label: value.option4 },
  ];
  const dropDownFilter = dropDown.filter((x) => !isEmpty(x.value));
  return (
    <Flex row top>
      <Text style={{ width: 90, paddingLeft: 12, paddingTop: 2 }}>
        {index + 1}
      </Text>
      <Flex width={'90%'}>
        <Text>
          {value.question} {value.is_required ? '*' : ''}
        </Text>
        {!isEmpty(value.description) && <Text>{value.description}</Text>}

        <div className={styles.fieldDiv}>
          {value.field_type_id === 1 && (
            <InputText disabled className={styles.inputStyle} />
          )}
          {value.field_type_id === 2 && (
            <InputText disabled className={styles.textAreainputStyle} />
          )}
          {value.field_type_id === 3 && (
            <Flex row center>
              <div className={styles.radioDiv}>
                <InputRadio disabled label="Yes" />
              </div>
              <InputRadio disabled label="No" />
            </Flex>
          )}
          {value.field_type_id === 4 && (
            <InputCheckBox disabled checked={false} />
          )}
          {value.field_type_id === 5 && (
            <Flex row>
              <div style={{ marginRight: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option1) && (
                    <InputCheckBox disabled label={value.option1} />
                  )}
                </div>
                {!isEmpty(value.option2) && (
                  <InputCheckBox disabled label={value.option2} />
                )}
              </div>
              <Flex>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option3) && (
                    <InputCheckBox disabled label={value.option3} />
                  )}
                </div>
                {!isEmpty(value.option4) && (
                  <InputCheckBox disabled label={value.option4} />
                )}
              </Flex>
            </Flex>
          )}
          {value.field_type_id === 6 && (
            <Flex row>
              <div style={{ marginRight: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option1) && (
                    <InputRadio disabled label={value.option1} />
                  )}
                </div>
                {!isEmpty(value.option2) && (
                  <InputRadio disabled label={value.option2} />
                )}
              </div>
              <Flex>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option3) && (
                    <InputRadio disabled label={value.option3} />
                  )}
                </div>
                {!isEmpty(value.option4) && (
                  <InputRadio disabled label={value.option4} />
                )}
              </Flex>
            </Flex>
          )}
          {value.field_type_id === 7 && (
            <div className={styles.inputStyle}>
              <SelectTag options={dropDownFilter} value={''} />
            </div>
          )}
        </div>
      </Flex>
    </Flex>
  );
};
export default QuestionTable;
