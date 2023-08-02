import { FormikProps } from 'formik';
import { createRef, memo, useEffect, useState } from 'react';
import SvgSquare from '../../../icons/SvgSquare';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import Text from '../../../uikit/Text/Text';
import { JOB_TITLE_LIMIT_20, THIS_FIELD_REQUIRED } from '../../constValue';
import ColorPicker from './ColorPicker';
import styles from './footersetup.module.css';
import { formikFormTypes } from './formikTypes';

type Props = {
  formik: FormikProps<formikFormTypes>;
  setReload: () => void;
};

const FooterSetup = ({ formik, setReload }: Props) => {
  const [isBtnColorOpen, setBtnColorOpen] = useState(false);
  const [isHeaderColorOpen, setHeaderColorOpen] = useState(false);
  const myRefBtn = createRef<any>();
  const myRefHeader = createRef<any>();

  // mouse outside click to close color picker
  const handleClickOutside = (event: { target: any }) => {
    if (myRefBtn.current && !myRefBtn.current.contains(event.target)) {
      setBtnColorOpen(false);
    }
    if (myRefHeader.current && !myRefHeader.current.contains(event.target)) {
      setHeaderColorOpen(false);
    }
  };

  // mouse outside click to close color picker
  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRefBtn) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
      if (myRefHeader) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

  return (
    <Card className={styles.overAll}>
      <Text bold size={14}>
        Button & Footer Setup
      </Text>
      <Flex row top className={styles.marginTop16}>
        <div className={styles.tagOne} ref={myRefBtn}>
          <InputText
            value={formik.values.btnColor.hex}
            label="Button Color"
            style={{marginTop:"5px"}}
            required
            actionRight={() => (
              <Button
                types="link"
                onClick={() => setBtnColorOpen(!isBtnColorOpen)}
              >
                <SvgSquare fill={formik.values.btnColor.hex} />
              </Button>
            )}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('btnColor.hex', e.target.value);
            }}
          />
          {isBtnColorOpen && (
            <div className={styles.colorPicker}>
              <ColorPicker
                colors={formik.values.btnColor}
                onChange={(e: { hex: string }) => {
                  setReload();
                  formik.setFieldValue('btnColor.hex', e.hex);
                }}
              />
            </div>
          )}
          {!isEmpty(formik.values.btnColor.hex) &&
            formik.values.btnColor.hex.length > 20 && (
              <Text size={12} color="error">
                {JOB_TITLE_LIMIT_20}
              </Text>
            )}
          {isEmpty(formik.values.btnColor.hex) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </div>
        <div className={styles.tagTwo} ref={myRefHeader}>
          <InputText
            required
            style={{marginTop:"5px"}}
            onChange={(e) => {
              setReload();
              formik.setFieldValue('footerColor.hex', e.target.value);
            }}
            value={formik.values.footerColor.hex}
            label="Footer Color"
            actionRight={() => (
              <Button
                types="link"
                onClick={() => setHeaderColorOpen(!isHeaderColorOpen)}
                className={styles.svgSquare}
              >
                <SvgSquare fill={formik.values.footerColor.hex} />
              </Button>
            )}
          />
          {isHeaderColorOpen && (
            <div className={styles.colorPicker}>
              <ColorPicker
                colors={formik.values.footerColor}
                onChange={(e: { hex: string }) => {
                  setReload();
                  formik.setFieldValue('footerColor.hex', e.hex);
                }}
              />
            </div>
          )}
          {!isEmpty(formik.values.footerColor.hex) &&
            formik.values.footerColor.hex.length > 20 && (
              <Text size={12} color="error">
                {JOB_TITLE_LIMIT_20}
              </Text>
            )}
          {isEmpty(formik.values.footerColor.hex) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </div>
      </Flex>
      <Flex className={styles.marginTop16}>
        <InputText
          value={formik.values.aboutText}
          label="About Us"
          style={{marginTop:"5px"}}
          textarea
          className={styles.textArea}
          onChange={(e) => {
            setReload();
            formik.setFieldValue('aboutText', e.target.value);
          }}
        />
        {!isEmpty(formik.values.aboutText) &&
          formik.values.aboutText.length <= 150 && (
            <Text color="error" size={12}>
              Text length should have minimum 150 characters
            </Text>
          )}
        {!isEmpty(formik.values.aboutText) &&
          formik.values.aboutText.length > 500 && (
            <Text color="error" size={12}>
              Text length should have maximum 500 characters
            </Text>
          )}
        <ErrorMessage
          touched={formik.touched}
          errors={formik.errors}
          name="aboutText"
        />
      </Flex>
    </Card>
  );
};
export default memo(FooterSetup);
