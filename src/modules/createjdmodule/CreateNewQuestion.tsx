import { ErrorMessage, FieldArray } from 'formik';
import { ChangeEvent, FormEvent, useEffect } from 'react';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import InputSwitch from '../../uikit/Switch/InputSwitch';
import Text from '../../uikit/Text/Text';
import CreateNewOption from './CreateNewOption';
import styles from './createnewquestion.module.css';
import { questionnaireProps } from './formikTypes';
import { questionFieldType } from './mock';

type Props = {
  values: questionnaireProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleSubmit: (e?: FormEvent<HTMLFormElement> | undefined) => void;
  isValid: boolean;
  dirty: boolean;
  onDirty: () => void;
  onPristine: () => void;
};

const CreateNewQuestion = ({
  values,
  setFieldValue,
  handleChange,
  handleSubmit,
  isValid,
  dirty,
  onDirty,
  onPristine,
}: Props) => {
  useEffect(() => {
    if (
      isEmpty(values.description) &&
      isEmpty(values.question) &&
      isEmpty(values.fieldType)
    ) {
      onPristine();
    }

  }, [values]);
  const handlequestioninput = () =>{
    const errors: Partial<{ question: string}> = {};
      if(isEmpty(values.question) || values.question.trim() === ''){
      errors.question = '';
    }
    return errors
  }
  return (
    <Flex className={styles.overAll}>
      <div className={styles.questionStyle}>
        <InputText
          label="Question"
          required
          value={values.question}
          onChange={(e) => {
            setFieldValue('question', e.target.value);
            onDirty();
          }}
        />

        {!isEmpty(values.question) && values.question.length > 500 && (
          <Text color="error" size={12}>
            Text length should not exceed 500 characters
          </Text>
        )}

      </div>
      <InputText
        className={styles.textArea}
        textarea
        label="Description:"
        value={values.description}
        onChange={(e) => {
          setFieldValue('description', e.target.value);
          onDirty();
        }}
      />
      {!isEmpty(values.description) && values.description.length > 1000 && (
        <Text color="error" size={12}>
          Text length should not exceed 1000 characters
        </Text>
      )}

      <div style={{ position: 'relative' }}>
        <Flex row top className={styles.tagContainer}>
          <div className={styles.selectTag}>
            <SelectTag
              label="Field Type"
              required
              options={questionFieldType}
              onChange={(option) => {
                setFieldValue('fieldType', option.value);
                onDirty();
                setFieldValue('options', [])
              }}
              value={
                values.fieldType === ''
                  ? ''
                  : questionFieldType.find(
                      (option) => option.value === values.fieldType,
                    )
              }
            />
            <div className={styles.errorMessage}>
              <ErrorMessage name={`fieldType`} />
            </div>
          </div>
          <div className={styles.switch}>
            <InputSwitch
              disabled={isEmpty(values.question)}
              label="Mark Question as Required"
              checked={values.required === '1'}
              onClick={() =>
                values.required === '1'
                  ? setFieldValue('required', '0')
                  : setFieldValue('required', '1')
              }
            />
          </div>
        </Flex>

        <FieldArray
          name="options"
          render={(arrayHelpers) => (
            <CreateNewOption
              arrayHelpers={arrayHelpers}
              values={values}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
        />
      </div>
      <Flex columnFlex className={styles.btnContainer}>
        <Button disabled={!(isValid && dirty)} onClick={handleSubmit}>
          Add
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateNewQuestion;
