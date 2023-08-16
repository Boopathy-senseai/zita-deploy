import { FieldArray } from 'formik';
import { memo, useEffect, useMemo } from 'react';
import SvgRoundAdd from '../../icons/SvgRoundAdd';
import SvgAdd from '../../icons/SvgAdd';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty } from '../../uikit/helper';
import Text from '../../uikit/Text/Text';
import { QualificationEntity } from './createJdTypes';
import { dsFormProps } from './formikTypes';
import { qualificationData } from './mock';
import styles from './qulificationadd.module.css';
import QualificationFieldArray from './QulificationFieldArray';

type Props = {
  values: dsFormProps;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  updateQualification: QualificationEntity[];
};

const QulificationAdd = ({
  values,
  setFieldValue,
  updateQualification,
}: Props) => {
  const qulificationLength = values.qualification.length;

  const updateQuali = useMemo(
    () =>
      updateQualification.map((qualificationList) => {
        return {
          education: qualificationList.qualification,
          specialization: qualificationList.specialization,
        };
      }),
    [updateQualification],
  );

  useEffect(() => {
    if (updateQuali.length !== 0) setFieldValue('qualification', updateQuali);
  }, [updateQualification]);
  
  return (
    <div>
      <FieldArray
        name="qualification"
        render={(arrayHelpers) => (
          <div>
            {values.qualification.length > 0 &&
              values.qualification.map((paramList, index) => {                
                return (
                  <QualificationFieldArray
                    key={index + paramList.education}
                    values={values}
                    setFieldValue={setFieldValue}
                    index={index}
                    arrayHelpers={arrayHelpers}
                    requiredOptions={qualificationData}
                    updateQualification={updateQuali}
                  />
                );
              })}
            {qulificationLength < 4 ? (
              <Button
                className={styles.addBtn}
                types="link"
                onClick={() =>
                  arrayHelpers.push({ education: '', specialization: '' })
                }
                disabled={isEmpty(
                  values.qualification[qulificationLength - 1].education,
                )}
              >
                <Flex row center>
                  <div className={styles.svgadd} style={{ marginRight: 8 , bottom:1}}>
                  <SvgAdd width={12} height={12} fill="#581854" />
                  </div>
                  <Text color="link" bold>
                    Add Qualification
                  </Text>
                </Flex>
              </Button>
               ):(
                <Button
                className={styles.addBtn}
                types="link"
                disabled={true}
                >
                <Flex row center>
                  <div className={styles.svgadd} style={{ marginRight: 8 }}>
                  <SvgAdd width={12} height={12} fill="#581854" />
                  </div>
                  <Text color="link" bold>
                    Add Qualification
                  </Text>
                </Flex>
                </Button>
               )}
          </div>
        )}
      />
    </div>
  );
};

export default memo(QulificationAdd);
