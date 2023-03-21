import { ErrorMessage, FieldArrayRenderProps, FormikProps } from 'formik';
// import { number, string } from 'prop-types';
import { useEffect } from 'react';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputCheckBox from '../../../uikit/InputCheckbox/InputCheckBox';
import InputRadio from '../../../uikit/InputRadio/InputRadio';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { QuestionnaireForJdEntity } from '../../createjdmodule/createJdTypes';
import styles from './applicantqustionssubmit.module.css';

export type applicationFormikForms = {
  qualification: string;
  aboutUs: string;
  gender: string;
  hispanic: string;
  veteran: string;
  disability: string;
  
  map: any;
  coverLetter: string;
  identify_race:string
};

type Props = {
  value: QuestionnaireForJdEntity;
  formik: FormikProps<applicationFormikForms>;
  arrayHelpers: FieldArrayRenderProps;
  index: number;
  isRequired?: boolean;
  // showButtonHandler : () => void,
};

const ApplicantQustionsSubmit = ({
  value,
  formik,
  arrayHelpers,
  isRequired,
  index,
  // showButtonHandler,
}: Props) => {
  // for applicant multi option data
  const dropDown = [
    { value: value.option1, label: value.option1 },
    { value: value.option2, label: value.option2 },
    { value: value.option3, label: value.option3 },
    { value: value.option4, label: value.option4 },
  ];
  // const [length,setLength] = useState(0);
  const dropDownFilter = dropDown.filter((x) => !isEmpty(x.value));
// Dynamic push initial objects for formik submit
  useEffect(() => {
    arrayHelpers.push({
      id: value.id,
      result: '',
      required: value.is_required ? '1' : '0',
    });
  }, []);

  useEffect(() => {
    if (
      value.field_type_id === 5 &&
      formik.values.map &&
      !isEmpty(formik.values.map[index].result)
    ) {
      formik.setFieldValue(`map[${index}].required`, '0');
    } else if (
      value.field_type_id === 5 &&
      formik.values.map &&
      isEmpty(formik.values.map[index].result)
    ) {
      if(isRequired===true){

      formik.setFieldValue(`map[${index}].required`, '0');
      }else{
      formik.setFieldValue(`map[${index}].required`, '1');

      }
    }
  }, [
    value.field_type_id === 5 &&
      formik.values.map &&
      formik.values.map[index].result,
  ]);
  useEffect(() => {
    if (
      value.field_type_id === 1 &&
      formik.values.map &&
      !isEmpty(formik.values.map[index].result)
    ) {
      formik.setFieldValue(`map[${index}].required`, '0');
    } else if (
      value.field_type_id === 1 &&
      formik.values.map &&
      isEmpty(formik.values.map[index].result)
    ) {
       if(isRequired===true){

      formik.setFieldValue(`map[${index}].required`, '0');
      }else{
      formik.setFieldValue(`map[${index}].required`, '1');

      }
    }
  }, [
    value.field_type_id === 1 &&
      formik.values.map &&
      formik.values.map[index].result,
  ]);

  useEffect(() => {
    if (
      value.field_type_id === 2 &&
      formik.values.map &&
      !isEmpty(formik.values.map[index].result)
    ) {
      formik.setFieldValue(`map[${index}].required`, '0');
    } else if (
      value.field_type_id === 2 &&
      formik.values.map &&
      isEmpty(formik.values.map[index].result)
    ) {
       if(isRequired===true){

      formik.setFieldValue(`map[${index}].required`, '0');
      }else{
      formik.setFieldValue(`map[${index}].required`, '1');

      }
    }
  }, [
    value.field_type_id === 2 &&
      formik.values.map &&
      formik.values.map[index].result,
  ]);
  return (
    formik.values.map &&
    formik.values.map.length !== 0 && (
      <Flex className={styles.overAll}>
       {isRequired === true ?
         <Text bold className={styles.marginTopStyle}>
          {value.question} 
        </Text>
        :
        <Text bold className={styles.marginTopStyle}>
          {value.question} {value.is_required ? '*' : ''}
        </Text>
      }
       {/* <Text bold className={styles.marginTopStyle}>
          {value.question} {value.is_required ? '*' : ''}
        </Text>*/}
        {!isEmpty(value.description) && <Text>{value.description}</Text>}

        <div className={styles.fieldDiv}>
          {value.field_type_id === 1 && (
            <InputText
              className={styles.inputStyle}
              value={formik.values.map[index].result}
              onChange={(event) => {
                formik.setFieldValue(
                  `map[${index}].result`,
                  event.target.value,
                );
                formik.setFieldValue(`map[${index}].required`, '0');
              }}
              id={`applicant_qustions_submit___error_${index}`}
            />
          )}
          {value.field_type_id === 2 && (
            <InputText
              className={styles.textAreainputStyle}
              value={formik.values.map[index].result}
              onChange={(event) => {
                formik.setFieldValue(
                  `map[${index}].result`,
                  event.target.value,
                );
                formik.setFieldValue(`map[${index}].required`, '0');
              }}
              id={`applicant_qustions_submit___error_${index}`}
            />
          )}
          {value.field_type_id === 3 && (
            <Flex row center>
              <div className={styles.radioDiv}>
                <InputRadio
                  label="Yes"
                  checked={formik.values.map[index].result === '1'}
                  onClick={() => {
                    formik.setFieldValue(`map[${index}].result`, '1');
                    formik.setFieldValue(`map[${index}].required`, '0');
                  }}
                />
              </div>
              <InputRadio
                label="No"
                checked={formik.values.map[index].result === '0'}
                onClick={() => {
                  formik.setFieldValue(`map[${index}].result`, '0');
                  formik.setFieldValue(`map[${index}].required`, '0');
                }}
              />
              <input
                placeholder="error"
                className={styles.inputError}
                id={`applicant_qustions_submit___error_${index}`}
              />
            </Flex>
          )}
          {value.field_type_id === 4 && (
            <InputCheckBox
              id={`applicant_qustions_submit___error_${index}`}
              checked={formik.values.map[index].result === '1'}
              onChange={() => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                formik.values.map[index].result === '1'
                  ? (formik.setFieldValue(`map[${index}].result`, '0'),
                    formik.setFieldValue(`map[${index}].required`, '1'))
                  : (formik.setFieldValue(`map[${index}].result`, '1'),
                    formik.setFieldValue(`map[${index}].required`, '0'));
              }}
            />
          )}

          {value.field_type_id === 5 && (
            <Flex row>
              <div style={{ marginRight: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option1) && (
                    <InputCheckBox
                      label={value.option1}
                      checked={formik.values.map[index].result.includes(
                        `,${value.option1}`,
                      )}
                      onClick={() =>
                        formik.values.map[index].result.includes(
                          `,${value.option1}`,
                        )
                          ? formik.setFieldValue(
                              `map[${index}].result`,
                              formik.values.map[index].result.replace(
                                `,${value.option1}`,
                                '',
                              ),
                            )
                          : formik.setFieldValue(
                              `map[${index}].result`,
                              formik.values.map[index].result +
                                ',' +
                                value.option1,
                            )
                      }
                    />
                  )}
                </div>
                {!isEmpty(value.option2) && (
                  <InputCheckBox
                    label={value.option2}
                    checked={formik.values.map[index].result.includes(
                      `,${value.option2}`,
                    )}
                    onClick={() =>
                      formik.values.map[index].result.includes(
                        `,${value.option2}`,
                      )
                        ? formik.setFieldValue(
                            `map[${index}].result`,
                            formik.values.map[index].result.replace(
                              `,${value.option2}`,
                              '',
                            ),
                          )
                        : formik.setFieldValue(
                            `map[${index}].result`,
                            formik.values.map[index].result +
                              ',' +
                              value.option2,
                          )
                    }
                  />
                )}
              </div>
              <Flex>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option3) && (
                    <InputCheckBox
                      label={value.option3}
                      checked={formik.values.map[index].result.includes(
                        `,${value.option3}`,
                      )}
                      onClick={() =>
                        formik.values.map[index].result.includes(
                          `,${value.option3}`,
                        )
                          ? formik.setFieldValue(
                              `map[${index}].result`,
                              formik.values.map[index].result.replace(
                                `,${value.option3}`,
                                '',
                              ),
                            )
                          : formik.setFieldValue(
                              `map[${index}].result`,
                              formik.values.map[index].result +
                                ',' +
                                value.option3,
                            )
                      }
                    />
                  )}
                </div>
                {!isEmpty(value.option4) && (
                  <InputCheckBox
                    label={value.option4}
                    checked={formik.values.map[index].result.includes(
                      `,${value.option4}`,
                    )}
                    onClick={() =>
                      formik.values.map[index].result.includes(
                        `,${value.option4}`,
                      )
                        ? formik.setFieldValue(
                            `map[${index}].result`,
                            formik.values.map[index].result.replace(
                              `,${value.option4}`,
                              '',
                            ),
                          )
                        : formik.setFieldValue(
                            `map[${index}].result`,
                            formik.values.map[index].result +
                              ',' +
                              value.option4,
                          )
                    }
                  />
                )}
              </Flex>
              <input
                placeholder="error"
                className={styles.inputError}
                id={`applicant_qustions_submit___error_${index}`}
              />
            </Flex>
          )}
          {value.field_type_id === 6 && (
            <Flex row>
              <div style={{ marginRight: 16 }}>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option1) && (
                    <InputRadio
                      label={value.option1}
                      checked={
                        formik.values.map[index].result === value.option1
                      }
                      onClick={() => {
                        formik.setFieldValue(
                          `map[${index}].result`,
                          value.option1,
                        );
                        formik.setFieldValue(`map[${index}].required`, '0');
                      }}
                    />
                  )}
                </div>
                {!isEmpty(value.option2) && (
                  <InputRadio
                    label={value.option2}
                    checked={formik.values.map[index].result === value.option2}
                    onClick={() => {
                      formik.setFieldValue(
                        `map[${index}].result`,
                        value.option2,
                      );
                      formik.setFieldValue(`map[${index}].required`, '0');
                    }}
                  />
                )}
              </div>
              <Flex>
                <div style={{ marginBottom: 8 }}>
                  {!isEmpty(value.option3) && (
                    <InputRadio
                      label={value.option3}
                      checked={
                        formik.values.map[index].result === value.option3
                      }
                      onClick={() => {
                        formik.setFieldValue(
                          `map[${index}].result`,
                          value.option3,
                        );
                        formik.setFieldValue(`map[${index}].required`, '0');
                      }}
                    />
                  )}
                </div>
                {!isEmpty(value.option4) && (
                  <InputRadio
                    label={value.option4}
                    checked={formik.values.map[index].result === value.option4}
                    onClick={() => {
                      formik.setFieldValue(
                        `map[${index}].result`,
                        value.option4,
                      );
                      formik.setFieldValue(`map[${index}].required`, '0');
                    }}
                  />
                )}
              </Flex>
              <input
                placeholder="error"
                className={styles.inputError}
                id={`applicant_qustions_submit___error_${index}`}
              />
            </Flex>
          )}
          {value.field_type_id === 7 && (
            <div className={styles.inputStyle}>
              <SelectTag
                options={dropDownFilter}
                onChange={(options) => {
                  formik.setFieldValue(`map[${index}].result`, options.value);
                  formik.setFieldValue(`map[${index}].required`, '0');
                }}
                inputId={`applicant_qustions_submit___error_${index}`}
              />
            </div>
          )}
        </div>
        <Text color="error" size={12} style={{ marginTop: 4 }}>
          <ErrorMessage name={`map[${index}].required`} />
        </Text>
      </Flex>
    )
  );
};
export default ApplicantQustionsSubmit;
