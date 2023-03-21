import { FormikProps } from 'formik';
import SvgBoxEdit from '../../../icons/SvgBoxEdit';
import SvgHelp from '../../../icons/SvgHelp';
import SvgInfo from '../../../icons/SvgInfo';
import Card from '../../../uikit/Card/Card';
import { GARY_4, PRIMARY } from '../../../uikit/Colors/colors';
import ErrorMessage from '../../../uikit/ErrorMessage/ErrorMessage';
import Flex from '../../../uikit/Flex/Flex';
import { isEmpty } from '../../../uikit/helper';
import InputText from '../../../uikit/InputText/InputText';
import LinkWrapper from '../../../uikit/Link/LinkWrapper';
import Text from '../../../uikit/Text/Text';
import { nameRegex } from '../../constValue';
import { CareerPageEntityEntity } from './buildCareerPageTypes';
import styles from './careerspageurl.module.css';
import { formikFormTypes } from './formikTypes';

type Props = {
  formik: FormikProps<formikFormTypes>;
  career_page: CareerPageEntityEntity;
  isInput: boolean;
  setInput: (a: boolean) => void;
  setReload: () => void;
  isUrlError: boolean;
};
const CareersPageURL = ({
  formik,
  career_page,
  setInput,
  isInput,
  setReload,
  isUrlError,
}: Props) => {
  const careerUrl =
    career_page && career_page.career_page_url
      ? career_page.career_page_url
      : '';
  return (
    <Card className={styles.overAll}>
      <Flex columnFlex>
        <Flex>
          <Flex>
            <Flex row center>
              <Text color="theme" bold size={16} className={styles.urlText}>
                Your Careers Page URL (by Zita)*
              </Text>
              <div
                title={`To keep this as your company's careers page, copy this URL and paste it in your website careers page link.`}
              >
                <SvgHelp fill={GARY_4} height={18} width={18} />
              </div>
            </Flex>

            <Flex row center className={styles.paddingTopFlex}>
              {!isInput && (
                <div
                  tabIndex={-1}
                  onClick={() => setInput(true)}
                  role={'button'}
                  onKeyDown={() => {}}
                  className={styles.svgBox}
                  title="Edit URL"
                >
                  <SvgBoxEdit fill={PRIMARY} />
                </div>
              )}
              {isInput ? (
                <>
                  <Text className={styles.appText}>
                    {window.location.origin}/
                  </Text>
                  <div className={styles.inputStyle}>
                    <InputText
                    id='CareersPageURL___urlInput'
                      value={formik.values.pagaeUrl}
                      onChange={(e) => {
                        formik.setFieldValue('pagaeUrl', e.target.value);
                        setReload();
                      }}
                      className={styles.inputWidthStyle}
                    />
                    {!isEmpty(formik.values.pagaeUrl) &&
                      !nameRegex.test(formik.values.pagaeUrl) && (
                        <Text
                          className={styles.errorMsg}
                          size={12}
                          color="error"
                        >
                          {'Enter a valid url'}
                        </Text>
                      )}
                    <div className={styles.errorMsg}>
                      <ErrorMessage
                        name="pagaeUrl"
                        touched={formik.touched}
                        errors={formik.errors}
                      />
                    </div>
                    {isUrlError && (
                      <Text className={styles.errorMsg} size={12} color="error">
                        This URL already exist
                      </Text>
                    )}
                  </div>
                  <Text className={styles.careerText}>/careers</Text>
                </>
              ) : (
                <LinkWrapper
                  target={'_blank'}
                  replace
                  to={`/${careerUrl}/careers`}
                >
                  <Text color="link">
                    {window.location.origin}/{formik.values.pagaeUrl}/careers
                  </Text>
                </LinkWrapper>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex row center className={styles.bottomFlex}>
          <SvgInfo height={16} width={16} />
          <Text className={styles.learnText}>Learn how to</Text>
          <a
            rel="noreferrer"
            href="https://www.youtube.com/watch?v=LUIzrimnTq0"
            target={'_blank'}
          >
            <Text color="link">
              connect the jobs with your company’s careers page.
            </Text>
          </a>
        </Flex>
      </Flex>
    </Card>
  );
};
export default CareersPageURL;
