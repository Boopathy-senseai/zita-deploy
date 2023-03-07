/* eslint-disable @typescript-eslint/no-unused-vars-experimental */
import { FormikProps } from 'formik';
import { createRef, useEffect, useState } from 'react';
import SvgSquare from '../../../icons/SvgSquare';
import Button from '../../../uikit/Button/Button';
import Card from '../../../uikit/Card/Card';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import SelectTag from '../../../uikit/SelectTag/SelectTag';
import Text from '../../../uikit/Text/Text';
import {
  ENTER_VALID_URL,
  isValidURL,
  JOB_TITLE_LIMIT,
  JOB_TITLE_LIMIT_20,
  mediaPath,
  THIS_FIELD_REQUIRED,
} from '../../constValue';
import { CompanyDetail } from './buildCareerPageTypes';
import ColorPicker from './ColorPicker';
import { formikFormTypes } from './formikTypes';
import styles from './headersetup.module.css';
import { fontSizeOptions } from './mock';

type Props = {
  formik: FormikProps<formikFormTypes>;
  company_detail: CompanyDetail;
};

const HeaderSetup = ({ formik, company_detail }: Props) => {
  const [isColorOpen, setColorOpen] = useState(false);
  const myRef = createRef<any>();

  const handleClickOutside = (event: { target: any }) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      setColorOpen(false);
    }
  };

  useEffect(() => {
    if (typeof Window !== 'undefined') {
      document.addEventListener('click', handleClickOutside, true);
    }
    return () => {
      if (myRef) {
        if (typeof Window !== 'undefined') {
          document.removeEventListener('click', handleClickOutside, true);
        }
      }
    };
  });

  return (
    <Card className={styles.overAll}>
      <Text color="theme" bold size={16}>
        Header Setup
      </Text>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <SelectTag
            options={fontSizeOptions}
            label="Header Font Size"
            value={
              fontSizeOptions
                ? fontSizeOptions.find(
                    (option) => option.value === formik.values.headerFontSize,
                  )
                : ''
            }
            onChange={(option) => {
              formik.setFieldValue('headerFontSize', option.value);
            }}
          />
        </Flex>
        <div className={styles.colorInput} ref={myRef}>
          <InputText
            value={formik.values.headerColor.hex}
            label="Header Color"
            required
            onChange={formik.handleChange('headerColor.hex')}
            actionRight={() => (
              <Button types="link" onClick={() => setColorOpen(!isColorOpen)}>
                <SvgSquare fill={formik.values.headerColor.hex} />
              </Button>
            )}
          />
          {isColorOpen && (
            <div className={styles.colorPicker}>
              <ColorPicker
                colors={formik.values.headerColor}
                onChange={(e: { hex: string }) =>
                  formik.setFieldValue('headerColor.hex', e.hex)
                }
              />
            </div>
          )}
          {!isEmpty(formik.values.headerColor.hex) &&
            formik.values.headerColor.hex.length > 20 && (
              <Text size={12} color="error">
                {JOB_TITLE_LIMIT_20}
              </Text>
            )}
          {isEmpty(formik.values.headerColor.hex) && (
            <Text size={12} color="error">
              {THIS_FIELD_REQUIRED}
            </Text>
          )}
        </div>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Header Menu 1"
            value={formik.values.menu1}
            onChange={formik.handleChange('menu1')}
          />
          {!isEmpty(formik.values.menu1) && formik.values.menu1.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
          {isEmpty(formik.values.menu1) &&
            !isEmpty(formik.values.menu1Url) &&
            formik.values.menu1Url !== 'https://' &&
            !isEmpty(formik.values.menu1Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Header Menu 1 URL"
            value={formik.values.menu1Url}
            onChange={formik.handleChange('menu1Url')}
          />
          {!isEmpty(formik.values.menu1) &&
            isValidURL(formik.values.menu1Url) === false &&
            formik.values.menu1Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu1) &&
            formik.values.menu1Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Header Menu 2"
            value={formik.values.menu2}
            onChange={formik.handleChange('menu2')}
          />
          {isEmpty(formik.values.menu2) &&
            !isEmpty(formik.values.menu2Url) &&
            formik.values.menu2Url !== 'https://' &&
            !isEmpty(formik.values.menu2Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
          {!isEmpty(formik.values.menu2) && formik.values.menu2.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Header Menu 2 URL"
            value={formik.values.menu2Url}
            onChange={formik.handleChange('menu2Url')}
          />
          {!isEmpty(formik.values.menu2) &&
            isValidURL(formik.values.menu2Url) === false &&
            formik.values.menu2Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu2) &&
            !isEmpty(formik.values.menu2Url) &&
            formik.values.menu2Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row top className={styles.marginTop16}>
        <Flex flex={6} className={styles.tagOne}>
          <InputText
            label="Header Menu 3"
            value={formik.values.menu3}
            onChange={formik.handleChange('menu3')}
          />
          {isEmpty(formik.values.menu3) &&
            formik.values.menu3Url !== 'https://' &&
            !isEmpty(formik.values.menu3Url) && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
          {!isEmpty(formik.values.menu3) && formik.values.menu3.length > 50 && (
            <Text size={12} color="error">
              {JOB_TITLE_LIMIT}
            </Text>
          )}
        </Flex>
        <Flex flex={6} className={styles.tagTwo}>
          <InputText
            label="Header Menu 3 URL"
            value={formik.values.menu3Url}
            onChange={formik.handleChange('menu3Url')}
          />
          {!isEmpty(formik.values.menu3) &&
            isValidURL(formik.values.menu3Url) === false &&
            formik.values.menu3Url !== 'https://' && (
              <Text size={12} color="error">
                {ENTER_VALID_URL}
              </Text>
            )}
          {!isEmpty(formik.values.menu3) &&
            formik.values.menu3Url === 'https://' && (
              <Text size={12} color="error">
                {THIS_FIELD_REQUIRED}
              </Text>
            )}
        </Flex>
      </Flex>
      <Flex row center className={styles.marginTop16}>
        <img
          className={styles.imgStyle}
          src={mediaPath + company_detail.logo}
          alt="logo"
        />
        <Text>Company Logo</Text>
      </Flex>
    </Card>
  );
};
export default HeaderSetup;
