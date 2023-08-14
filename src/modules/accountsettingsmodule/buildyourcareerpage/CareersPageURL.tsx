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
import SvgModuleicon from '../../../icons/SvgModuleicon';
import SvgGlobal from '../../../icons/SvgGlobe';
import { SvgEdit } from '../../../icons';
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
    // <Card className={styles.overAll}>
    <Flex columnFlex>
      <Flex>
        <Flex>
          {/* <Flex row center>
              <Text bold size={14} className={styles.urlText}>
                {`Your Careers Page URL (by Zita)*`}
              </Text>
              <Flex marginTop={1} style={{cursor:"pointer"}}
                title={`To keep this as your company's careers page, copy this URL and paste it in your website careers page link.`}
              >
                <SvgHelp fill="#581845" height={16} width={16} />
              </Flex>
            </Flex> */}
          <Flex row center className={styles.paddingTopFlex}>
            <div tabIndex={-1} className={styles.svgBox}>
              <SvgGlobal fill={PRIMARY} width={14} height={14} />
            </div>
            {isInput ? (
              <Flex row center marginBottom={7}>
                <Text className={styles.appText}>
                  {window.location.origin}/
                </Text>
                <div className={styles.inputStyle}>
                  <InputText
                    id="CareersPageURL___urlInput"
                    value={formik.values.pagaeUrl}
                    onChange={(e) => {
                      formik.setFieldValue('pagaeUrl', e.target.value);
                      setReload();
                    }}
                    className={styles.inputWidthStyle}
                  />
                  {!isEmpty(formik.values.pagaeUrl) &&
                    !nameRegex.test(formik.values.pagaeUrl) && (
                      <Text className={styles.errorMsg} size={12} color="error">
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
              </Flex>
            ) : (
              <LinkWrapper
                target={'_blank'}
                replace
                to={`/${careerUrl}/careers`}
              >
                <Text color="link" bold style={{ marginTop: '2px' }}>
                  {window.location.origin}/{formik.values.pagaeUrl}/careers
                </Text>
              </LinkWrapper>
            )}
            {!isInput && (
              <div
                tabIndex={-1}
                onClick={() => setInput(true)}
                role={'button'}
                onKeyDown={() => {}}
                className={styles.svgBox}
                style={{ marginLeft: 10 }}
                title="Edit URL"
              >
                {/* <SvgBoxEdit fill={PRIMARY} /> */}
                <SvgEdit fill={PRIMARY} width={12} height={12} />
              </div>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex row center className={styles.bottomFlex}>
        <SvgModuleicon fill="#581845" height={16} width={16} />
        <Text size={13} className={styles.learnText}>
          Learn how to
        </Text>
        <a
          rel="noreferrer"
          href="https://www.youtube.com/watch?v=LUIzrimnTq0"
          target={'_blank'}
        >
          <Text size={13} color="link" bold>
            connect the jobs with your company’s careers page.
          </Text>
        </a>
      </Flex>
    </Flex>
    // </Card>
  );
};

export const CareerTitle: React.FC = () => {
  return (
    <Flex row center>
      <Text bold size={14} className={styles.urlText}>
        {`Your Careers Page URL (by Zita)*`}
      </Text>
      <Flex
        marginTop={1}
        style={{ cursor: 'pointer' }}
        title={`To keep this as your company's careers page, copy this URL and paste it in your website careers page link.`}
      >
        <SvgHelp fill="#581845" height={16} width={16} />
      </Flex>
    </Flex>
  );
};
export default CareersPageURL;
