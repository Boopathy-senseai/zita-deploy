import { ErrorMessage, FieldArrayRenderProps } from 'formik';
import { memo, useEffect, useRef, useState } from 'react';
import SvgTrash from '../../icons/SvgTrash';
import Button from '../../uikit/Button/Button';
import { GARY_4, PRIMARY } from '../../uikit/Colors/colors';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import SelectTag from '../../uikit/SelectTag/SelectTag';
import Text from '../../uikit/Text/Text';
import useDebounce from '../common/useDebounce';
import { JOB_TITLE_LIMIT } from '../constValue';
import { dsFormProps } from './formikTypes';
import { qualificationData, industryType } from './mock';
import styles from './qulificationadd.module.css';

type Props = {
  index: number;
  values: dsFormProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  arrayHelpers: FieldArrayRenderProps;
  requiredOptions: any;
  updateQualification: any;
};

const QualificationFieldArray = ({
  index,
  setFieldValue,
  values,
  arrayHelpers,
  requiredOptions,
  updateQualification,
}: Props) => {
  const myRef = useRef<any>();
  const [isValue, setValue] = useState('');
  const [isValueOne, setValueOne] = useState('');
  const [isValueTwo, setValueTwo] = useState('');
  const [isValueThree, setValueThree] = useState('');
  const [isValueFour, setValueFour] = useState('');

  const debouncedValue = useDebounce(isValue, 1000);
  const debouncedValueOne = useDebounce(isValueOne, 1000);
  const debouncedValueTwo = useDebounce(isValueTwo, 1000);
  const debouncedValueThree = useDebounce(isValueThree, 1000);
  const debouncedValueFour = useDebounce(isValueFour, 1000);

  // free fill initial value
  useEffect(() => {
    if (updateQualification.length === 1) {
      setValue(updateQualification[0].specialization);
    }
    if (updateQualification.length === 2) {
      setValue(updateQualification[0].specialization);
      setValueOne(updateQualification[1].specialization);
    }
    if (updateQualification.length === 3) {
      setValue(updateQualification[0].specialization);
      setValueOne(updateQualification[1].specialization);
      setValueTwo(updateQualification[2].specialization);
    }
    if (updateQualification.length === 4) {
      setValue(updateQualification[0].specialization);
      setValueOne(updateQualification[1].specialization);
      setValueTwo(updateQualification[2].specialization);
      setValueThree(updateQualification[3].specialization);
    }
    if (updateQualification.length === 5) {
      setValue(updateQualification[0].specialization);
      setValueOne(updateQualification[1].specialization);
      setValueTwo(updateQualification[2].specialization);
      setValueThree(updateQualification[3].specialization);
      setValueFour(updateQualification[4].specialization);
    }
  }, [updateQualification]);

  useEffect(() => {
    if (myRef && myRef.current && myRef.current.value) {
      if (myRef.current.id === `add___specialization_0`) {
        setFieldValue(
          `qualification[${0}].specialization`,
          myRef.current.value,
        );
      }
    }
  }, [debouncedValue]);
  useEffect(() => {
    if (myRef && myRef.current && myRef.current.value) {
      if (myRef.current.id === `add___specialization_1`) {
        setFieldValue(
          `qualification[${1}].specialization`,
          myRef.current.value,
        );
      }
    }
  }, [debouncedValueOne]);
  useEffect(() => {
    if (myRef && myRef.current && myRef.current.value) {
      if (myRef.current.id === `add___specialization_2`) {
        setFieldValue(
          `qualification[${2}].specialization`,
          myRef.current.value,
        );
      }
    }
  }, [debouncedValueTwo]);
  useEffect(() => {
    if (myRef && myRef.current && myRef.current.value) {
      if (myRef.current.id === `add___specialization_3`) {
        setFieldValue(
          `qualification[${3}].specialization`,
          myRef.current.value,
        );
      }
    }
  }, [debouncedValueThree]);
  useEffect(() => {
    if (myRef && myRef.current && myRef.current.value) {
      if (myRef.current.id === `add___specialization_4`) {
        setFieldValue(
          `qualification[${4}].specialization`,
          myRef.current.value,
        );
      }
    }
  }, [debouncedValueFour]);

  return (
    <Flex row top key={index} className={styles.containerOne}>
      <Flex flex={3} className={styles.margin16}>
        <SelectTag
          options={requiredOptions}
          label="Qualification"
          required
          onChange={(option) => {
            setFieldValue(`qualification[${index}].education`, option.value);
          }}
          value={
            qualificationData
              ? qualificationData.find(
                  (option) =>
                    option.value === values.qualification[index].education,
                )
              : ''
          }
        />
        <div className={styles.errorMessage}>
          <ErrorMessage name={`qualification[${index}].education`} />
        </div>
      </Flex>
      <Flex flex={3} className={styles.margin16}>
        {index === 0 && (
          <>
            <InputText
              ref={myRef}
              id={`add___specialization_${index}`}
              label="Specialization"
              value={isValue}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            {!isEmpty(isValue) && isValue.length > 50 && (
              <Text color="error" size={12}>
                {JOB_TITLE_LIMIT}
              </Text>
            )}
          </>
        )}
        {index === 1 && (
          <>
            <InputText
              ref={myRef}
              id={`add___specialization_${index}`}
              label="Specialization"
              value={isValueOne}
              onChange={(e) => {
                setValueOne(e.target.value);
              }}
            />
            {!isEmpty(isValueOne) && isValueOne.length > 50 && (
              <Text color="error" size={12}>
                {JOB_TITLE_LIMIT}
              </Text>
            )}
          </>
        )}
        {index === 2 && (
          <>
            <InputText
              ref={myRef}
              id={`add___specialization_${index}`}
              label="Specialization"
              value={isValueTwo}
              onChange={(e) => {
                setValueTwo(e.target.value);
              }}
            />
            {!isEmpty(isValueTwo) && isValueTwo.length > 50 && (
              <Text color="error" size={12}>
                {JOB_TITLE_LIMIT}
              </Text>
            )}
          </>
        )}
        {index === 3 && (
          <>
            <InputText
              ref={myRef}
              id={`add___specialization_${index}`}
              label="Specialization"
              value={isValueThree}
              onChange={(e) => {
                setValueThree(e.target.value);
              }}
            />
            {!isEmpty(isValueThree) && isValueThree.length > 50 && (
              <Text color="error" size={12}>
                {JOB_TITLE_LIMIT}
              </Text>
            )}
          </>
        )}
        {index === 4 && (
          <>
            <InputText
              ref={myRef}
              id={`add___specialization_${index}`}
              label="Specialization"
              value={isValueFour}
              onChange={(e) => {
                setValueFour(e.target.value);
              }}
            />
            {!isEmpty(isValueFour) && isValueFour.length > 50 && (
              <Text color="error" size={12}>
                {JOB_TITLE_LIMIT}
              </Text>
            )}
          </>
        )}
      </Flex>

      {index === 0 && (
        <Flex flex={3} className={styles.margin16}>
          <SelectTag
            options={industryType}
            label="Industry Type"
            value={
              industryType
                ? industryType.find(
                    (option) => option.value === values.industryType,
                  )
                : ''
            }
            onChange={(option) => {
              setFieldValue('industryType', option.value);
            }}
          />
        </Flex>
      )}
      {values.qualification.length > 1 && index !== 0 && (
        <Button
          onClick={() => arrayHelpers.remove(index)}
          types="link"
          className={styles.svgTrash}
        >
          <SvgTrash fill={PRIMARY} />
        </Button>
      )}
      <Flex flex={3}>
        <></>
      </Flex>
      {index !== 0 && (
        <Flex flex={3}>
          <></>
        </Flex>
      )}
    </Flex>
  );
};

export default memo(QualificationFieldArray);
