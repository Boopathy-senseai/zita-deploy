import { isEmpty } from '../../../uikit/helper';
import { isValidURL, nameRegex, THIS_FIELD_REQUIRED } from '../../constValue';
import { formikFormTypes } from './formikTypes';

export const handleLoginValid = (values: formikFormTypes) => {
  const errors: Partial<formikFormTypes> = {};
  if (!isEmpty(values.pagaeUrl) && !nameRegex.test(values.pagaeUrl)) {
    errors.pagaeUrl = '';
  }
  // header setup
  if (!isEmpty(values.headerColor.hex) && values.headerColor.hex.length > 20) {
    errors.headerColor = { hex: '' };
  }
  if (isEmpty(values.headerColor.hex)) {
    errors.headerColor = { hex: THIS_FIELD_REQUIRED };
  }
  if (!isEmpty(values.menu1) && values.menu1.length > 50) {
    errors.menu1 = '';
  }
  if (
    isEmpty(values.menu1) &&
    !isEmpty(values.menu1Url) &&
    values.menu1Url !== 'https://'
  ) {
    errors.menu1 = '';
  }
  if (!isEmpty(values.menu2) && values.menu2.length > 50) {
    errors.menu2 = '';
  }
  if (
    isEmpty(values.menu2) &&
    !isEmpty(values.menu2Url) &&
    values.menu2Url !== 'https://'
  ) {
    errors.menu2 = '';
  }
  if (!isEmpty(values.menu3) && values.menu3.length > 50) {
    errors.menu3 = '';
  }
  if (
    isEmpty(values.menu3) &&
    !isEmpty(values.menu3Url) &&
    values.menu3Url !== 'https://'
  ) {
    errors.menu3 = '';
  }
  if (
    !isEmpty(values.menu1) &&
    isValidURL(values.menu1Url) === false &&
    values.menu1Url !== 'https://'
  ) {
    errors.menu1Url = '';
  }
  if (!isEmpty(values.menu1) && values.menu1Url === 'https://') {
    errors.menu1Url = '';
  }

  if (
    !isEmpty(values.menu2) &&
    isValidURL(values.menu2Url) === false &&
    values.menu2Url !== 'https://'
  ) {
    errors.menu2Url = '';
  }
  if (!isEmpty(values.menu2) && values.menu2Url === 'https://') {
    errors.menu2Url = '';
  }

  if (
    !isEmpty(values.menu3) &&
    isValidURL(values.menu3Url) === false &&
    values.menu3Url !== 'https://'
  ) {
    errors.menu3Url = '';
  }
  if (!isEmpty(values.menu3) && values.menu3Url === 'https://') {
    errors.menu3Url = '';
  }
  // BannerSetup
  if (
    !isEmpty(values.bannerHeadingText) &&
    values.bannerHeadingText.length > 50
  ) {
    errors.bannerHeadingText = '';
  }
  if (!isEmpty(values.bannerText) && values.bannerText.length <= 150) {
    errors.bannerText = '';
  }
  if (!isEmpty(values.bannerText) && values.bannerText.length > 500) {
    errors.bannerText = '';
  }

  // FooterSetup

  if (!isEmpty(values.btnColor.hex) && values.btnColor.hex.length > 20) {
    errors.btnColor = { hex: '' };
  }
  if (isEmpty(values.btnColor.hex)) {
    errors.btnColor = { hex: THIS_FIELD_REQUIRED };
  }
  if (!isEmpty(values.footerColor.hex) && values.footerColor.hex.length > 20) {
    errors.footerColor = { hex: '' };
  }
  if (isEmpty(values.footerColor.hex)) {
    errors.footerColor = { hex: THIS_FIELD_REQUIRED };
  }
  if (!isEmpty(values.aboutText) && values.aboutText.length <= 150) {
    errors.aboutText = '';
  }
  if (!isEmpty(values.aboutText) && values.aboutText.length > 500) {
    errors.aboutText = '';
  }
  return errors;
};
