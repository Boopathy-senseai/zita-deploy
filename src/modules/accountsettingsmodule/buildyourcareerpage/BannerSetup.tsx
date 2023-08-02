import { FormikProps } from 'formik';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import ImageUpload from '../../../uikit/ImageUpload/ImageUpload';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { JOB_TITLE_LIMIT } from '../../constValue';
import { LabelWrapper } from '../../../uikit';
import styles from './bannersetup.module.css';
import { formikFormTypes } from './formikTypes';
import { fontSizeOptions } from './mock';

type Props = {
  formik: FormikProps<formikFormTypes>;
  imgUrl: string | undefined;
  setFile: (a: any) => void;
  setReload: () => void;
  setBtnDisable: (arg: boolean) => void;
};
const BannerSetup = ({
  formik,
  imgUrl,
  setFile,
  setReload,
  setBtnDisable,
}: Props) => {
  return (
    <Card className={styles.overAll}>
      <Text bold size={14}>
        Banner Setup
      </Text>
      <Flex row center className={styles.marginTop16}>
        <Flex flex={6}>
          <Flex>
            <InputText
              style={{ marginTop: '5px' }}
              label="Banner Heading Text"
              value={formik.values.bannerHeadingText}
              onChange={(e) => {
                setReload();
                formik.setFieldValue('bannerHeadingText', e.target.value);
              }}
            />
            {!isEmpty(formik.values.bannerHeadingText) &&
              formik.values.bannerHeadingText.length > 50 && (
                <Text size={12} color="error">
                  {JOB_TITLE_LIMIT}
                </Text>
              )}
          </Flex>
          <Flex className={styles.marginTop16}>
            <LabelWrapper label="Banner Heading Font Size">
              <Flex marginTop={5}>
                <SelectTag
                  id={'banner_setup____banerheading_size'}
                  options={fontSizeOptions}
                  // label="Banner Heading Font Size"
                  value={
                    fontSizeOptions
                      ? fontSizeOptions.find(
                          (option) =>
                            Number(option.value) ===
                            Number(formik.values.bannerHeadingFontSize),
                        )
                      : ''
                  }
                  onChange={(option) => {
                    setReload();

                    formik.setFieldValue('bannerHeadingFontSize', option.value);
                  }}
                />
              </Flex>
            </LabelWrapper>
          </Flex>
          <Flex className={styles.marginTop16}>
            <LabelWrapper label="Banner Text Font Size">
              <Flex marginTop={5}>
                <SelectTag
                  id={'banner_setup____banertext_size'}
                  options={fontSizeOptions}
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
                    setReload();
                    formik.setFieldValue('bannerTextFontSize', option.value);
                  }}
                />
              </Flex>
            </LabelWrapper>
          </Flex>
        </Flex>
        <Flex middle columnFlex center flex={6}>
          <ImageUpload
            setBtnDisable={setBtnDisable}
            borderRadius
            imgUrl={imgUrl}
            setFile={setFile}
          />
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
          style={{marginTop:"5px"}}
          onChange={(e) => {
            setReload();
            formik.setFieldValue('bannerText', e.target.value);
          }}
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
