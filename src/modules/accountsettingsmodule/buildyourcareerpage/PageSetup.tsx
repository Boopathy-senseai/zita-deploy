import { FormikProps } from 'formik';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { formikFormTypes } from './formikTypes';
import { fontSizeOptions, fontStyle } from './mock';
import styles from './pagesetup.module.css';

type Props = {
  formik: FormikProps<formikFormTypes>;
};
const PageSetup = ({ formik }: Props) => {
  return (
    <Card className={styles.overAll}>
      <Text color="theme" bold size={16}>
        Page Setup
      </Text>
      <Flex row top className={styles.flexContainer}>
        <Flex flex={6} className={styles.tagOne}>
          <SelectTag
            label="Page Font"
            options={fontStyle}
            value={
              fontStyle
                ? fontStyle.find(
                    (option) => option.value === formik.values.pageFontStyle,
                  )
                : ''
            }
            onChange={(option) => {
              formik.setFieldValue('pageFontStyle', option.value);
            }}
          />
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <SelectTag
            label="Page Font Size"
            options={fontSizeOptions}
            value={
              fontSizeOptions
                ? fontSizeOptions.find(
                    (option) =>
                      Number(option.value) ===
                      Number(formik.values.pageFontSize),
                  )
                : ''
            }
            onChange={(option) => {
              formik.setFieldValue('pageFontSize', Number(option.value));
            }}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default PageSetup;
