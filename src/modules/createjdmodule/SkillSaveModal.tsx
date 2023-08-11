import { FormikProps } from 'formik';
import Button from '../../uikit/Button/Button';
import Flex from '../../uikit/Flex/Flex';
import { isEmpty, lowerCase } from '../../uikit/helper';
import InputText from '../../uikit/InputText/InputText';
import LinkWrapper from '../../uikit/Link/LinkWrapper';
import Loader from '../../uikit/Loader/Loader';
import Modal from '../../uikit/Modal/Modal';
import Text from '../../uikit/Text/Text';
import Toast from '../../uikit/Toast/Toast';
import styles from './skillsavemodal.module.css';

type Props = {
  open: boolean;
  close: () => void;
  formik: FormikProps<any>;
  isMissSkill?: boolean;
  handleSubmit: () => void;
  jd_id?: string;
  isLoader: boolean;
};
const SkillSaveModal = ({
  open,
  close,
  formik,
  isMissSkill,
  handleSubmit,
  jd_id,
  isLoader,
}: Props) => {
  const handleClose = () => {
    formik.resetForm();
    close();
  };
  const re = /^[0-9\b]+$/;

  return (
    <Modal open={open}>
      <Flex columnFlex className={styles.overAll}>
        {isLoader && <Loader />}
        {/* <Text align="center" color="theme" bold>
          Skill-based experience
        </Text>
        <Text align="center" className={styles.addText}>
          Please add experience (no. of years) for each skill
        </Text> */}
        <Text size={14} color="primary" bold>
          Skill-based experience
        </Text>
        <Text className={styles.addText}>
          Please add experience (no. of years) for each skill
        </Text>
        <Flex columnFlex style= {{alignItems: "center"}}className={styles.skillstableoverall}>
          <Flex columnFlex className={styles.borderStyle}>
            <Flex row center between className={styles.headerStyle}>
              <Flex flex={5}>
                <Text size={14} align="center" bold>
                  Skills
                </Text>
              </Flex>
              <Flex flex={7} className={styles.inputBorder}>
                <Text size={14} align="center" bold>
                  Skill-based experience (in years)
                </Text>
              </Flex>
            </Flex>
            <Flex
              columnFlex
              maxHeight={window.innerHeight - 300}
              className={styles.scroll}
            >
              {formik.values.data.dataBaseTags.map(
                (dataBaseList: any, dataIndex: number) => {
                  if (
                    Number(formik.values.data.dataBaseTags[dataIndex].exp) > 15
                  ) {
                    Toast('Maximum experience 15 years', 'LONG', 'error');
                    formik.setFieldValue(
                      `data.dataBaseTags[${dataIndex}].exp`,
                      0,
                    );
                  }
                  return (
                    !isEmpty(dataBaseList.skill) && (
                      <Flex
                        row
                        between
                        center
                        key={dataBaseList.skill + dataIndex}
                        className={styles.dataBase}
                      >
                        <Flex flex={5}>
                          <Text
                            transform="capitalize"
                            style={{ paddingLeft: 16 }}
                          >
                            {lowerCase(dataBaseList.skill)}
                          </Text>
                        </Flex>
                        <Flex flex={7} className={styles.inputBorder}>
                          <InputText
                            maxLength={2}
                            noBorder
                            className={styles.inputStyle}
                            align="center"
                            value={formik.values.data.dataBaseTags[
                              dataIndex
                            ].exp.toString()}
                            onChange={(e) => {
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                formik.setFieldValue(
                                  `data.dataBaseTags[${dataIndex}].exp`,
                                  e.target.value,
                                );
                              }
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  );
                },
              )}

              {formik.values.data.toolsTags.map(
                (dataBaseList: any, dataIndex: number) => {
                  if (
                    Number(formik.values.data.toolsTags[dataIndex].exp) > 15
                  ) {
                    Toast('Maximum experience 15 years', 'LONG', 'error');
                    formik.setFieldValue(`data.toolsTags[${dataIndex}].exp`, 0);
                  }
                  return (
                    !isEmpty(dataBaseList.skill) && (
                      <Flex
                        row
                        between
                        center
                        key={dataBaseList.skill + dataIndex}
                        className={styles.dataBase}
                      >
                        <Flex flex={5}>
                          <Text
                            transform="capitalize"
                            style={{ paddingLeft: 16 }}
                          >
                            {lowerCase(dataBaseList.skill)}
                          </Text>
                        </Flex>
                        <Flex flex={7} className={styles.inputBorder}>
                          <InputText
                            maxLength={2}
                            noBorder
                            className={styles.inputStyle}
                            align="center"
                            value={dataBaseList.exp}
                            onChange={(e) => {
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                formik.setFieldValue(
                                  `data.toolsTags[${dataIndex}].exp`,
                                  e.target.value,
                                );
                              }
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  );
                },
              )}
              {formik.values.data.programTags.map(
                (dataBaseList: any, dataIndex: number) => {
                  if (
                    Number(formik.values.data.programTags[dataIndex].exp) > 15
                  ) {
                    Toast('Maximum experience 15 years', 'LONG', 'error');
                    formik.setFieldValue(
                      `data.programTags[${dataIndex}].exp`,
                      0,
                    );
                  }
                  return (
                    !isEmpty(dataBaseList.skill) && (
                      <Flex
                        row
                        between
                        center
                        key={dataBaseList.skill + dataIndex}
                        className={styles.dataBase}
                      >
                        <Flex flex={5}>
                          <Text
                            transform="capitalize"
                            style={{ paddingLeft: 16 }}
                          >
                            {lowerCase(dataBaseList.skill)}
                          </Text>
                        </Flex>
                        <Flex flex={7} className={styles.inputBorder}>
                          <InputText
                            maxLength={2}
                            noBorder
                            className={styles.inputStyle}
                            align="center"
                            value={dataBaseList.exp}
                            onChange={(e) => {
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                formik.setFieldValue(
                                  `data.programTags[${dataIndex}].exp`,
                                  e.target.value,
                                );
                              }
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  );
                },
              )}
              {formik.values.data.platformsTags.map(
                (dataBaseList: any, dataIndex: number) => {
                  if (
                    Number(formik.values.data.platformsTags[dataIndex].exp) > 15
                  ) {
                    Toast('Maximum experience 15 years', 'LONG', 'error');
                    formik.setFieldValue(
                      `data.platformsTags[${dataIndex}].exp`,
                      0,
                    );
                  }
                  return (
                    !isEmpty(dataBaseList.skill) && (
                      <Flex
                        row
                        between
                        center
                        key={dataBaseList.skill + dataIndex}
                        className={styles.dataBase}
                      >
                        <Flex flex={5}>
                          <Text
                            transform="capitalize"
                            style={{ paddingLeft: 16 }}
                          >
                            {lowerCase(dataBaseList.skill)}
                          </Text>
                        </Flex>
                        <Flex flex={7} className={styles.inputBorder}>
                          <InputText
                            maxLength={2}
                            noBorder
                            className={styles.inputStyle}
                            align="center"
                            value={dataBaseList.exp}
                            onChange={(e) => {
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                formik.setFieldValue(
                                  `data.platformsTags[${dataIndex}].exp`,
                                  e.target.value,
                                );
                              }
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  );
                },
              )}
              {formik.values.data.othersTags.map(
                (dataBaseList: any, dataIndex: number) => {
                  if (
                    Number(formik.values.data.othersTags[dataIndex].exp) > 15
                  ) {
                    Toast('Maximum experience 15 years', 'LONG', 'error');
                    formik.setFieldValue(
                      `data.othersTags[${dataIndex}].exp`,
                      0,
                    );
                  }
                  return (
                    !isEmpty(dataBaseList.skill) && (
                      <Flex
                        row
                        between
                        center
                        key={dataBaseList.skill + dataIndex}
                        className={styles.dataBase}
                      >
                        <Flex flex={5}>
                          <Text
                            transform="capitalize"
                            style={{ paddingLeft: 16 }}
                          >
                            {lowerCase(dataBaseList.skill)}
                          </Text>
                        </Flex>
                        <Flex flex={7} className={styles.inputBorder}>
                          <InputText
                            maxLength={2}
                            noBorder
                            className={styles.inputStyle}
                            align="center"
                            value={dataBaseList.exp}
                            onChange={(e) => {
                              if (
                                e.target.value === '' ||
                                re.test(e.target.value)
                              ) {
                                formik.setFieldValue(
                                  `data.othersTags[${dataIndex}].exp`,
                                  e.target.value,
                                );
                              }
                            }}
                          />
                        </Flex>
                      </Flex>
                    )
                  );
                },
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex row center middle className={styles.btnContainer}>
          <Button
            types="close"
            onClick={handleClose}
            className={styles.closeBtn}
          >
            Cancel
          </Button>
          {isMissSkill && (
            <LinkWrapper target={'_parent'} to={`/jobs/questionnaire/${jd_id}`}>
              <Button onClick={handleSubmit}>Submit</Button>
            </LinkWrapper>
          )}
          {!isMissSkill && (
            <Button onClick={handleSubmit} className={styles.saveBtn}>
              Save
            </Button>
          )}
        </Flex>
      </Flex>
    </Modal>
  );
};

export default SkillSaveModal;
