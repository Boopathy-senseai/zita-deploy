import classNames from 'classnames/bind';
import { ErrorMessage } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import InputText from '../../uikit/InputText/InputText';
import Text from '../../uikit/Text/Text';
import styles from './createnewquestion.module.css';
import { questionnaireProps } from './formikTypes';

const cx = classNames.bind(styles);
type Props = {
  arrayHelpers: any;
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
};
const CreateNewOption = ({
  arrayHelpers,
  values,
  handleChange,
  setFieldValue,
}: Props) => {
  const [isAddCheck, setAddCheck] = useState(false);

  const optionsLength = values.options.length;
  useEffect(() => {
    if (
      values.fieldType === '5' ||
      values.fieldType === '6' ||
      values.fieldType === '7'
    ) {
      setAddCheck(true);
      arrayHelpers.push({ list: '' });
      arrayHelpers.push({ list: '' });
    } else {
      setAddCheck(false);
      setFieldValue('options', []);
    }
  }, [values.fieldType]);
  return (
    <Flex row center wrap>
      {isAddCheck && (
        <Button
          className={cx('addBtn')}
          types="link"
          onClick={() => {
            arrayHelpers.push({ list: '' });
          }}
          disabled={optionsLength === 4}
        >
          <Flex
            row
            center
            className={cx({
              pointerNone: optionsLength === 4,
              pointer: optionsLength !== 4,
            })}
          >
            <div style={{ marginRight: 8 }}>
              <SvgRoundAdd />
            </div>
            <Text color="info" bold>
              Add Options
            </Text>
          </Flex>
        </Button>
      )}

      {values.options.length > 0 &&
        values.options.map((optList, index) => (
          <Flex
            width={'50%'}
            columnFlex
            key={index}
            className={cx('containerOne', {
              marginRight: index % 2 === 0,
            })}
          >
            <InputText
              maxLength={50}
              required
              label={`Option ${index + 1}`}
              value={optList.list}
              onChange={handleChange(`options[${index}].list`)}
            />
            <div className={styles.errorMessage}>
              <ErrorMessage name={`options[${index}].list`} />
            </div>
          </Flex>
        ))}
    </Flex>
  );
};

export default CreateNewOption;
