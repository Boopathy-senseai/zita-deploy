import { FormikProps } from 'formik';
import { useState } from 'react';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import ImageUpload from '../../../uikit/ImageUpload/ImageUpload';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import { JOB_TITLE_LIMIT } from '../../constValue';
import { LabelWrapper } from '../../../uikit';
import SvgModuleicon from '../../../icons/SvgModuleicon';
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
  const [openPopup, setOpenPopuptwo] = useState<boolean>(false);
  const [openpopup, setopenpopup] = useState(false);

  return (
    <>
      {/* <Text bold size={14}>
        Banner Setup
      </Text> */}
      <Flex row>
        <Flex flex={6}>
          <Flex className={styles.marginTop16}>
            <InputText
             
              label="Heading Text"
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
            <LabelWrapper label="Heading Font Size">
              <Flex >
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
            <LabelWrapper label="Subheading Font Size">
              <Flex >
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
        <Flex marginLeft={16} flex={6}>
          <Flex row center style={{ marginBottom: '2px' }}>
            <Text size={14} color="theme">
              Background Image
            </Text>
            <label
              onMouseEnter={() => setopenpopup(true)}
              onMouseLeave={() => setopenpopup(false)}
              // title={'Recommended image size :1920px X 1280px \n  File size must be less than 2MB'}
              className={styles.changeStyle11}
            >
              <SvgModuleicon />
            </label>
          </Flex>
          <Flex flex={5} style={{ margintop: '-2vh' }}>
            {openpopup === true ? (
              <Card className={styles.cardfront}>
                <Flex row center>
                  <SvgModuleicon />{' '}
                  <Text className={styles.moreinformation}>
                    More Information
                  </Text>{' '}
                </Flex>
                <Flex marginTop={5} className={styles.tooltipcontent}>
                  <Text className={styles.gray_color}>
                    Recommended image size :1920px X 1280px
                  </Text>
                  <Text className={styles.gray_color}>
                    File size must be less than 2MB
                  </Text>
                </Flex>
              </Card>
            ) : (
              ''
            )}
          </Flex>

          <ImageUpload
            setBtnDisable={setBtnDisable}
            borderRadius
            imgUrl={imgUrl}
            setFile={setFile}
            height={98}
          />
        </Flex>
      </Flex>

      <Flex className={styles.marginTop16}>
        <InputText
          className={styles.textArea}
          value={formik.values.bannerText}
          textarea
          label="Subheading Text"
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
    </>
  );
};

export function BannerSetupTitle() {
  return (
    <Text bold size={14}>
      Banner Setup
    </Text>
  );
}
export default BannerSetup;
