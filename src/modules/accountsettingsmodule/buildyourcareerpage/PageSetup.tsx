import { FormikProps } from 'formik';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { Button, LabelWrapper } from '../../../uikit';
import { formikFormTypes } from './formikTypes';
import { fontSizeOptions, fontStyle } from './mock';
import styles from './pagesetup.module.css';

type Props = {
  formik: FormikProps<formikFormTypes>;
  setReload: () => void;
};
const PageSetup = ({ formik, setReload }: Props) => {
  return (
    // <Card className={styles.overAll}>
    <>
      {/* <Text bold size={14}>
        Page Setup
      </Text> */}
      <Flex row top className={styles.c}>
        <Flex flex={6} className={styles.tagOne}>
          <LabelWrapper label="Font">
            <div style={{ marginTop: 5 }}>
              <SelectTag
                id={'page_setup____font_family'}
                // label=""
                options={fontStyle}
                value={
                  fontStyle
                    ? fontStyle.find(
                        (option) =>
                          option.value === formik.values.pageFontStyle,
                      )
                    : ''
                }
                onChange={(option) => {
                  setReload();
                  formik.setFieldValue('pageFontStyle', option.value);
                }}
              />
            </div>
          </LabelWrapper>
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <LabelWrapper label="Font Size">
            <div style={{ marginTop: 5 }}>
              <SelectTag
                id={'page_setup____font_size'}
                // label="Page Font Size"
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
                  setReload();
                  formik.setFieldValue('pageFontSize', Number(option.value));
                }}
              />
            </div>
          </LabelWrapper>
        </Flex>
        {/* <Button onclick={}>
          preview
        </Button> */}
      </Flex>
    </>
    // </Card>
  );
};

export function PageSetupTitle() {
  return (
    <Text bold size={14}>
      Page Setup
    </Text>
  );
}

export default PageSetup;
