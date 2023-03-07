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
};
const CareersPageURL = ({ formik, career_page, setInput, isInput }: Props) => {
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
                    {process.env.REACT_APP_HOME_URL}
                  </Text>
                  <div className={styles.inputStyle}>
                    <InputText
                      value={formik.values.pagaeUrl}
                      onChange={formik.handleChange('pagaeUrl')}
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
                  </div>
                  <Text className={styles.careerText}>/careers</Text>
                </>
              ) : (
                <LinkWrapper
                  target={'_blank'}
                  replace
                  to={`/${career_page.career_page_url}/careers`}
                >
                  <Text color="link">
                    {process.env.REACT_APP_HOME_URL}
                    {formik.values.pagaeUrl}/careers
                  </Text>
                </LinkWrapper>
              )}
              {/* {career_page && !isEmpty(career_page.career_page_url) && (
                <LinkWrapper
                  target={'_blank'}
                  replace
                  to={`/${career_page.career_page_url}/careers`}
                >
                  <div
                    title="View careers page in new tab"
                    className={styles.svgTab}
                  >
                    <SvgNewTab height={18} width={18} />
                  </div>
                </LinkWrapper>
              )} */}
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
