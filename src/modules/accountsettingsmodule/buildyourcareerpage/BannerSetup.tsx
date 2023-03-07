import { FormikProps } from 'formik';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import ImageUpload from '../../../uikit/ImageUpload/ImageUpload';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { JOB_TITLE_LIMIT } from '../../constValue';
import styles from './bannersetup.module.css';
import { formikFormTypes } from './formikTypes';
import { fontSizeOptions } from './mock';

type Props = {
  formik: FormikProps<formikFormTypes>;
  imgUrl: string | undefined;
  setFile: (a: any) => void;
};
const BannerSetup = ({ formik, imgUrl, setFile }: Props) => {
  return (
    <Card className={styles.overAll}>
      <Text color="theme" bold size={16}>
        Banner Setup
      </Text>
      <Flex row center className={styles.marginTop16}>
        <Flex flex={6}>
          <Flex>
            <InputText
              label="Banner Heading Text"
              value={formik.values.bannerHeadingText}
              onChange={formik.handleChange('bannerHeadingText')}
            />
            {!isEmpty(formik.values.bannerHeadingText) &&
              formik.values.bannerHeadingText.length > 50 && (
                <Text size={12} color="error">
                  {JOB_TITLE_LIMIT}
                </Text>
              )}
          </Flex>
          <Flex className={styles.marginTop16}>
            <SelectTag
              options={fontSizeOptions}
              label="Banner Heading Font Size"
              value={
                fontSizeOptions
                  ? fontSizeOptions.find(
                      (option) =>
                        Number(option.value) === Number(formik.values.bannerHeadingFontSize),
                    )
                  : ''
              }
              onChange={(option) => {
                formik.setFieldValue('bannerHeadingFontSize', option.value);
              }}
            />
          </Flex>
          <Flex className={styles.marginTop16}>
            <SelectTag
              options={fontSizeOptions}
              label="Banner Text Font Size"
              value={
                fontSizeOptions
                  ? fontSizeOptions.find(
                      (option) =>
                        Number(option.value) ===
                        Number(formik.values.bannerTextFontSize),
                    )
                  : ''
              }
              onChange={(option) => {
                formik.setFieldValue('bannerTextFontSize', option.value);
              }}
            />
          </Flex>
        </Flex>
        <Flex middle columnFlex center flex={6}>
          <ImageUpload borderRadius imgUrl={imgUrl} setFile={setFile} />
          <Text size={12} style={{ marginTop: 12 }} color="gray">
            Recommended image size :1920px X 1280px
          </Text>
          <Text size={12} color="gray">
            File size must be less than 2MB
          </Text>
        </Flex>
      </Flex>

      <Flex className={styles.marginTop16}>
        <InputText
          className={styles.textArea}
          value={formik.values.bannerText}
          textarea
          label="Banner Text"
          onChange={formik.handleChange('bannerText')}
        />
        {!isEmpty(formik.values.bannerText) &&
          formik.values.bannerText.length <= 150 && (
            <Text color="error" size={12}>
              Text length should have minimum 150 characters
            </Text>
          )}
        {!isEmpty(formik.values.bannerText) &&
          formik.values.bannerText.length > 500 && (
            <Text color="error" size={12}>
              Text length should have maximum 500 characters
            </Text>
          )}
      </Flex>
    </Card>
  );
};
export default BannerSetup;
